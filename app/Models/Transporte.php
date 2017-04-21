<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transporte extends Model {
    
    protected $table = 'transportes';
    
    static function register($transporte) {
        return Transporte::insert($transporte);
    }
    
    static function search() {
        return Transporte::select('*')
                        ->get();
    }
}
