<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model {

    protected $table = 'materiales';
    public $timestamps = false;
    
    static function register($material) {
        Material::insert($material);
    }
    
    static function modify($material, $id) {
        Material::
                where('id', $id)
                ->update($material);
    }
    
    static function search($descripcion) {
        return Material::
                    select('id', 'nombre', 'descripcion', 'costo as v_unitario', 'unidad_medida')
                    ->where('nombre', 'like', $descripcion.'%')
                    ->get();
    }
    
    static function listar() {
        return Material::
                    select('id', 'nombre', 'descripcion', 'costo as v_unitario', 'unidad_medida')
                    ->get();
    }
}
