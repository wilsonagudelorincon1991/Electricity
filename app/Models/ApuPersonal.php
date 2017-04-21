<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApuPersonal extends Model {

    protected $table = 'apu_personal';

    static function register($apu_personal, $apu_id) {
        foreach ($apu_personal as &$personal) {
            $personal['apu_id'] = $apu_id;
        }
        ApuPersonal::insert($apu_personal);
    }

}
