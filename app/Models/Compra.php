<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CompraDetalle;

class Compra extends Model {
    
    protected $table = 'compras';
    
    static function register($compra) {
        return Compra::insertGetId($compra);
    }
    
    static function search($empresa, $fecha_inicio, $fecha_final, $opcion) {
        $lista = [];
        switch ($opcion) {
            case 'empresa':
                $_compra = Compra::select('*')
                        ->where('empresa', 'like', '%'.$empresa.'%')
                        ->get();
                foreach ($_compra as $sale) {
                    $compra_id = $sale['id']; 
                    $compra_detalle = CompraDetalle::select('*')
                        ->where('compra_id', '=', $compra_id)
                        ->get();
                    $compra = ['compra' => $sale, 'compra_detalle' => $compra_detalle];
                    array_push($lista, $compra);
                }
                return $lista;
            case 'fecha':
                $_compra = Compra::select('*')
                        ->where('fecha', '>=', $fecha_inicio)
                        ->where('fecha', '<=', $fecha_final)
                        ->get();
                foreach ($_compra as $sale) {
                    $compra_id = $sale['id']; 
                    $compra_detalle = CompraDetalle::select('*')
                        ->where('compra_id', '=', $compra_id)
                        ->get();
                    $compra = ['compra' => $sale, 'compra_detalle' => $compra_detalle];
                    array_push($lista, $compra);
                }
                return $lista;
                
            case 'empresa_fecha':
                $_compra = Compra::select('*')
                        ->where('empresa', 'like', '%'.$empresa.'%')
                        ->where('fecha', '>=', $fecha_inicio)
                        ->where('fecha', '<=', $fecha_final)
                        ->get();
                foreach ($_compra as $sale) {
                    $compra_id = $sale['id']; 
                    $compra_detalle = CompraDetalle::select('*')
                        ->where('compra_id', '=', $compra_id)
                        ->get();
                    $compra = ['compra' => $sale, 'compra_detalle' => $compra_detalle];
                    array_push($lista, $compra);
                }
                return $lista;
        }
    }
    
    
}
