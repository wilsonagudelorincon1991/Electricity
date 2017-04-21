<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nomina extends Model {
    
    protected $table = 'nominas';
    public $timestamps = false;
    
    static function register($nomina) {
        return Nomina::insertGetId($nomina);
    }
    
    static function modify($id, $nomina) {
        return Nomina::
                    where('id', $id)
                    ->update($nomina);
                
    }
    
    static function search($nombre, $fecha_menor, $fecha_mayor, $opcion) {
        switch ($opcion) {
            case 'nombre':
                return Nomina::select('*')
                        ->where('nombre', 'like', '%'.$nombre.'%')
                        ->get();
            case 'fecha':
                return Nomina::select('*')
                        ->where('fecha_menor', '>=', $fecha_menor)
                        ->where('fecha_mayor', '<=', $fecha_mayor)
                        ->get();
            case 'nombre_fecha':
                return Nomina::select('*')
                        ->where('fecha_menor', '>=', $fecha_menor)
                        ->where('fecha_mayor', '<=', $fecha_mayor)
                        ->where('nombre', 'like', '%'.$nombre.'%')
                        ->get();
        }
    
    }
    
    static function searchDetalle($nomina_id) {
        
        return NominaDetalle::select('*')
                        ->where('nomina_id', '=', $nomina_id)
                        ->get();
    }
    
    static function searchByEstado() {
        return Nomina::select('*')
                        ->where('estado', '=', 'PENDIENTE')
                        ->get();
    }
}


