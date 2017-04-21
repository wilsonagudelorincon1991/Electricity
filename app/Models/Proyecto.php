<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Apu;

class Proyecto extends Model {
    
    protected $table = 'proyectos';
    public $timestamps = false;

    static function register($proyecto) {
        return Proyecto::insertGetId($proyecto);
    }
    
    static function search($nombre, $estado, $opcion) {
        $columns = ['proyectos.id as id', 'proyectos.nombre as nombre', 'ubicacion', 'estado', 'tipo',
                     'clientes.nombre as cliente'];
        switch($opcion) {
            case 'nombre':
                return Proyecto::
                    select($columns)
                    ->join('clientes', 'clientes.id', '=', 'cliente_id')
                    ->where('proyectos.nombre', 'like', '%'.$nombre.'%')
                    ->get();
            case 'estado':
                return Proyecto::
                    select($columns)
                    ->join('clientes', 'clientes.id', '=', 'cliente_id')
                    ->where('estado', '=', $estado)
                    ->get();
            case 'nombre_estado':    
                return Proyecto::
                    select($columns)
                    ->join('clientes', 'clientes.id', '=', 'cliente_id')
                    ->where('proyectos.nombre', 'like', '%'.$nombre.'%')
                    ->where('estado', '=', $estado)
                    ->get();
        }
        
    }
    
    static function search_for_modify($nombre) {
        $columns = ['proyectos.id', 'proyectos.nombre as proyecto', 'ubicacion', 'tipo', 
                    'proyectos_apus.id as proyecto_apu_id', 'apu.descripcion as apu', 'cantidad_inicial', 'cantidad_actual', 'apu.costo_total as precio'];
        return Proyecto::
                    select($columns)
                    ->join('proyectos_apus', 'proyecto_id', '=', 'proyectos.id')
                    ->join('apu', 'apu_id', '=', 'apu.id')    
                    ->where('estado', '=', 'ACTIVO')
                    ->where('proyectos.nombre', '=', $nombre)
                    ->get();
        //->where('proyectos.nombre', 'like', $nombre.'%')
    }
    
    static function search_for_modify_estado($nombre) {
        return Proyecto::
                    select('*')
                    ->where('proyectos.nombre', 'like', $nombre.'%')
                    ->get();
    }
    
    static function modify($id, $proyecto) {
        Proyecto::
                where('id', $id)
                ->update($proyecto);
        
    }
    
    static function search_cotizacion($id) {
        $project = [];  
        $proyecto = Proyecto::
                    select('*')
                    ->where('proyectos.id', '=', $id)
                    ->get();
        $proyecto_apu = Proyecto::
                        select('categorias.nombre as categoria', 'apu.descripcion', 'cantidad_inicial','cantidad_actual as cantidad', 'apu.costo_total as v_unitario','proyectos_apus.costo_total as v_parcial')
                        ->join('proyectos_apus', 'proyectos_apus.proyecto_id', '=', 'proyectos.id')
                        ->join('apu', 'apu.id', '=', 'proyectos_apus.apu_id')
                        ->join('categorias', 'categorias.id', '=', 'categoria_id')
                        ->where('proyectos.id', '=', $id)
                        ->orderBy('categorias.nombre')
                        ->get();
        $project['proyecto'] = $proyecto;
        $project['proyecto_apu'] = $proyecto_apu;
        return $project;
    }
    
    static function searchAll($nombre) {
        $proyecto = Proyecto::
                    select('*')
                    ->where('proyectos.nombre', 'like', $nombre.'%')
                    ->get();
        $proyecto_apu = Proyecto::
                        select('apu_id', 'apu.nombre')
                        ->join('proyectos_apus', 'proyectos_apus.proyecto_id', '=', 'proyectos.id')
                        ->join('apu', 'apu.id', '=', 'proyectos_apus.apu_id')
                        ->where('proyectos.nombre', 'like', $nombre.'%')
                        ->get();
        $aux_proyecto_apu = Proyecto::
                        select('apu_id')
                        ->join('proyectos_apus', 'proyectos_apus.proyecto_id', '=', 'proyectos.id')
                        ->where('proyectos.nombre', 'like', $nombre.'%')
                        ->get();
                $apus = [];        
                
                //Recortar en la funcion
                foreach ($aux_proyecto_apu as $apu) {
                    $id = $apu['apu_id'];

                    $apu_personal = Apu::
                            select('personal.nombre')
                            ->join('apu_personal', 'apu_personal.apu_id', '=', 'apu.id')
                            ->join('personal', 'personal.id', '=', 'personal_id')
                            ->where('apu.id', '=', $id)
                            ->get();
                    $apu_herramientas = Apu::
                            select('herramientas.nombre')
                            ->join('apu_herramientas', 'apu_herramientas.apu_id', '=', 'apu.id')
                            ->join('herramientas', 'herramientas.id', '=', 'herramienta_id')
                            ->where('apu.id', '=', $id)
                            ->get();
                    $apu_materiales = Apu::
                            select('materiales.nombre')
                            ->join('apu_materiales', 'apu_materiales.apu_id', '=', 'apu.id')
                            ->join('materiales', 'materiales.id', '=', 'material_id')
                            ->where('apu.id', '=', $id)
                            ->get();
                    $apus[$id] = ['apu_personal' => $apu_personal, 'apu_herramientas' => $apu_herramientas, 'apu_materiales' => $apu_materiales];;
                }
    return ['proyecto' => $proyecto, 'proyecto_apu' => $proyecto_apu, 'apus_detalle' => $apus];
    }
    
    static function getApu($id) {
        $apu_personal = Apu::
                select('personal.nombre')
                ->join('apu_personal', 'apu_personal.apu_id', '=', 'apu.id')
                ->join('personal', 'personal.id', '=', 'personal_id')
                ->where('apu.id', '=', $id)
                ->get();
        $apu_herramientas = Apu::
                select('herramientas.nombre')
                ->join('apu_herramientas', 'apu_herramientas.apu_id', '=', 'apu.id')
                ->join('herramientas', 'herramientas.id', '=', 'herramienta_id')
                ->where('apu.id', '=', $id)
                ->get();
        $apu_materiales = Apu::
                select('materiales.nombre')
                ->join('apu_materiales', 'apu_materiales.apu_id', '=', 'apu.id')
                ->join('materiales', 'materiales.id', '=', 'material_id')
                ->where('apu.id', '=', $id)
                ->get();
        return ['apu_personal' => $apu_personal, 'apu_herramientas' => $apu_herramientas, 'apu_materiales' => $apu_materiales];
    }
}
