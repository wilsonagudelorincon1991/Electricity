<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Personal extends Model {
    
    protected $table = 'personal';
    public $timestamps = false;
    
    static function register($personal) {
        Personal::insert($personal);
    }
    
    static function modify($mano_obra, $id) {
        Personal::
                where('id', $id)
                ->update($mano_obra);
    }
    
    static function search($descripcion) {
        return Personal::
                    select('id', 'nombre', 'descripcion', 'costo_hora as v_unitario', 'unidad_medida')
                    ->where('nombre', 'like', $descripcion.'%')
                    ->get();
    }
    
    static function listar() {
        return Personal::
                    select('id', 'nombre', 'descripcion', 'costo_hora as v_unitario', 'unidad_medida')
                    ->get();
    }
}
