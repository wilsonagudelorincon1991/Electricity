<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApuMaterial extends Model {

    protected $table = 'apu_materiales';
    
    static function register($apu_material, $apu_id) {
        foreach ($apu_material as &$material) {
            $material['apu_id'] = $apu_id;
        }
        ApuMaterial::insert($apu_material);
    }

}
