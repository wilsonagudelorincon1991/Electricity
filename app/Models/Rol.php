<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model {
    
    protected $table = 'roles';
    
    static function register($rol) {
        return Rol::insert($rol);
    }
    
    static function search() {
        return Rol::select('*')
                        ->get();
    }
    
    
}


