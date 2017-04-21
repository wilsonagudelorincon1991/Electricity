<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NominaDetalle extends Model {
    
    protected $table = 'nominas_detalles';
    
    static function register($nomina_detalle, $nomina_id) {
        foreach ($nomina_detalle as &$detalle) {
            $detalle['nomina_id'] = $nomina_id;
        } //return $nomina_detalle;
        NominaDetalle::insert($nomina_detalle);
    }
    
    static function search() {
        return NominaDetalle::select('*')
                        ->get();
    }
    
}