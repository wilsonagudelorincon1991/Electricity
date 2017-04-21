<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model {
    
    protected $table = 'usuarios';
    
    static function register($usuario) {
        return Usuario::insert($usuario);
    }
    
    static function search($user, $password) {
        return Usuario::select('*')
                        ->where('user', '=', $user)
                        ->where('password', '=', $password)
                        ->first();
    }
    
    static function searchUpdate($user) {
        return Usuario::select('*')
                        ->where('user', 'like', '%'.$user.'%')
                        ->get();
    }
}
