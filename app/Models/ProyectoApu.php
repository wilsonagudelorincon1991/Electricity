<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProyectoApu extends Model {
    
    protected $table = 'proyectos_apus';
    public $timestamps = false;
    
    static function register($proyecto_id, $apus) {
        foreach ($apus as &$apu) {
            $apu['proyecto_id'] = $proyecto_id;
        }
        ProyectoApu::insert($apus);
    }
    
    static function modify($proyectos_apus) {
        /*ProyectoApu::
                where('id', $id)
                ->update($proyecto_id);*/
        foreach ($proyectos_apus as &$proyecto_apu) {
            ProyectoApu::
                where('id', $proyecto_apu['id'])
                ->update(['cantidad_actual' => $proyecto_apu['cantidad_actual']]);
        }
    }
}
