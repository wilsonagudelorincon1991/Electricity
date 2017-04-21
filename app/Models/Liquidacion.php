<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Liquidacion extends Model {
    
    protected $table = 'liquidaciones';
    
    static function register($liquidacion) {
        return Liquidacion::insertGetId($liquidacion);
    }
    
    static function search($nombre, $fecha_inicio, $fecha_final, $opcion) {
        $columns = ['proyectos.id as id', 'proyectos.nombre as nombre', 'proyectos.estado'];
        switch($opcion) {
            case 'nombre':
                return Liquidacion::
                    select($columns)
                    ->join('proyectos', 'proyecto_id', '=', 'proyectos.id')
                    ->where('proyectos.nombre', 'like', '%'.$nombre.'%')
                    ->get();
            case 'fecha':
                return Liquidacion::
                    select('*')
                    ->join('proyectos', 'proyecto_id', '=', 'proyectos.id')
                    ->where('fecha', '>=', $fecha_inicio)
                    ->where('fecha', '<=', $fecha_final)
                    ->get();
            case 'nombre_fecha':    
                return Liquidacion::
                    select('*')
                    ->join('proyectos', 'proyecto_id', '=', 'proyectos.id')
                    ->where('proyectos.nombre', 'like', '%'.$nombre.'%')
                    ->where('fecha', '>=', $fecha_inicio)
                    ->where('fecha', '<=', $fecha_final)
                    ->get();
        }
        
    }
    
    static function _search($proyecto_id) {
        return Liquidacion::
                select('id', 'fecha', 'nombre as liquidacion')
                ->where('proyecto_id', '=', $proyecto_id)
                ->get();
    }
}
