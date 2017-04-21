<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model {
    
    protected $table = 'categorias';
    public $timestamps = false;
    
    static function register($categoria) {
        return Categoria::insert($categoria);
    }
    
    static function modify($categoria, $id) {
        Categoria::
                where('id', $id)
                ->update($categoria);
    }
    
    static function search() {
        return Categoria::select('*')
                        ->get();
    }
    
    static function searchByNombre($nombre) {
        return Categoria::select('*')
                        ->where('nombre', 'like', '%'.$nombre.'%')
                        ->get();
    }
    
    
}
