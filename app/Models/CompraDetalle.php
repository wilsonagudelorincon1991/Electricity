<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompraDetalle extends Model {
    
    protected $table = 'compras_detalles';
    
    static function register($compra_detalle, $compra_id) {
        foreach ($compra_detalle as &$detalle) {
            $detalle['compra_id'] = $compra_id;
        }
        CompraDetalle::insert($compra_detalle);
    }
    
    static function search() {
        return CompraDetalle::select('*')
                        ->get();
    }
}

