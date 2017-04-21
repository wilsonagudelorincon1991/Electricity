<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empleado extends Model {
    
    protected $table = 'empleados';
    public $timestamps = false;
    
    static function register($empleado) {
        return Empleado::insert($empleado);
    }
    
    static function modify($empleado, $id) {
        Empleado::
                where('id', $id)
                ->update($empleado);
    }
    
    static function search() {
        return Empleado::select('*')
                        ->get();
    }
    static function searchByApellido($apelldio) {
        return Empleado::select('*')
                        ->where('primer_apellido', 'like', '%'.$apelldio.'%')
                        ->orWhere('segundo_apellido', 'like', '%'.$apelldio.'%')
                        ->get();
    }
    
}
