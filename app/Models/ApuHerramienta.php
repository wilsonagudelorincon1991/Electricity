<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApuHerramienta extends Model {

    protected $table = 'apu_herramientas';
    
    static function register($apu_herramienta, $apu_id) {
        foreach ($apu_herramienta as &$herramienta) {
            $herramienta['apu_id'] = $apu_id;
        }
        ApuHerramienta::insert($apu_herramienta);
    }

}
