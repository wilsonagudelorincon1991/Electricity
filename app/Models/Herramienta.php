<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Herramienta extends Model {

    protected $table = 'herramientas';
    public $timestamps = false;

    static function register($herramienta) {
        Herramienta::insert($herramienta);
    }
    
    static function modify($herramienta, $id) {
        Herramienta::
                where('id', $id)
                ->update($herramienta);
    }
    
    static function search($descripcion) {
        return Herramienta::
                    select('id', 'nombre', 'descripcion', 'costo_hora as v_unitario', 'unidad_medida')
                    ->where('nombre', 'like', $descripcion.'%')
                    ->get();
    }
    
    static function listar() {
        return Herramienta::
                    select('id', 'nombre', 'descripcion', 'costo_hora as v_unitario', 'unidad_medida')
                    ->get();
    }
}
