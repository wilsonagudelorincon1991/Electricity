<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Egreso extends Model {
    
    protected $table = 'egresos';
    
    static function register($egreso) {
        return Egreso::insert($egreso);
    }
    
    static function searchByFecha($fecha_inicio, $fecha_final) {
        return Egreso::select('*')
                        ->where('fecha', '>=', $fecha_inicio)
                        ->where('fecha', '<=', $fecha_final)
                        ->get();
    }
}