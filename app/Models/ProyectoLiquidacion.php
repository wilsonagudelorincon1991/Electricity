<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProyectoLiquidacion extends Model {
    
    protected $table = 'proyectos_liquidaciones';
    
    static function register($liquidacion_id, $proyecto_liquidacion) {
        foreach ($proyecto_liquidacion as &$proyecto_liq) {
            $proyecto_liq['liquidacion_id'] = $liquidacion_id;
        }
        ProyectoLiquidacion::insert($proyecto_liquidacion);
    }
    
    static function search($liquidaciones) {
        $lista = []; 
        foreach ($liquidaciones as &$liquidacion) {
            $_liquidacion = ProyectoLiquidacion::select('*')
                            ->where('liquidacion_id', '=', $liquidacion['id'])
                            ->get();
            array_push($lista, $_liquidacion);
        }
        return ['liquidacion' => $liquidaciones, 'liquidacion_detalle' => $lista];
    }    
}
