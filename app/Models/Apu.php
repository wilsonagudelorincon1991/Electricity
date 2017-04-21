<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Apu extends Model {
    
    protected $table = 'apu';
    
    static function register($apu) {
        return Apu::insertGetId($apu);
    }
    
    static function listar() {
        return Apu::all();
    }
    
    //Informacion basica
    static function search($descripcion_apu, $categoria){
        $data = ['id', 'descripcion', 'costo_total as v_unitario', 'foto'];
        if($categoria != -1) {
            if ($descripcion_apu != '') {
                return Apu::
                    select($data)
                    ->where('categoria_id', '=', $categoria)    
                    ->where('descripcion', 'like', $descripcion_apu.'%')
                    ->get();
            } else {
                return Apu::
                    select($data)
                    ->where('categoria_id', '=', $categoria)    
                    ->get();
            }
        } else {
            return Apu::
                select($data)
                ->where('descripcion', 'like', $descripcion_apu.'%')
                ->get();
        }
        
    }
    
    /* Para asignar a proyetos*/
    static function _search($descripcion_apu){
        return Apu::
                select('id', 'descripcion', 'costo_total as v_unitario')
                ->where('descripcion', 'like', $descripcion_apu.'%')
                ->get();
    }
    
    //Informacion detallada
    static function searchAll($id){
        //->where('nombre', 'like', $nombre_apu.'%')
        $apu = Apu::select('id', 'nombre', 'descripcion', 'costo_total')
                ->where('id', '=', $id)
                ->get();
        $apu_personal = Apu::
                select('personal.nombre', 'unidad_medida', 'cantidad', 'costo_hora', 'apu_personal.costo_total')
                ->join('apu_personal', 'apu_personal.apu_id', '=', 'apu.id')
                ->join('personal', 'personal.id', '=', 'personal_id')
                ->where('apu.id', '=', $id)
                ->get();
        $apu_herramientas = Apu::
                select('herramientas.nombre', 'unidad_medida', 'cantidad', 'costo_hora', 'apu_herramientas.costo_total')
                ->join('apu_herramientas', 'apu_herramientas.apu_id', '=', 'apu.id')
                ->join('herramientas', 'herramientas.id', '=', 'herramienta_id')
                ->where('apu.id', '=', $id)
                ->get();
        $apu_materiales = Apu::
                select('materiales.nombre', 'unidad_medida', 'cantidad', 'costo','apu_materiales.costo_total')
                ->join('apu_materiales', 'apu_materiales.apu_id', '=', 'apu.id')
                ->join('materiales', 'materiales.id', '=', 'material_id')
                ->where('apu.id', '=', $id)
                ->get();
        return ['apu' => $apu, 'apu_personal' => $apu_personal, 'apu_herramientas' => $apu_herramientas, 'apu_materiales' => $apu_materiales];
    }
}
