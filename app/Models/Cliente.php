<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model {
    
    protected $table = 'clientes';
    public $timestamps = false;
    
    static function register($cliente) {
        return Cliente::insert($cliente);
    }
    
    static function modify($cliente, $id) {
        Cliente::
                where('id', $id)
                ->update($cliente);
    }
    
    static function search() {
        return Cliente::select('*')
                        ->get();
    }
    static function searchByNombre($nombre) {
        return Cliente::select('*')
                        ->where('nombre', 'like', '%'.$nombre.'%')
                        ->get();
    }
    
}
