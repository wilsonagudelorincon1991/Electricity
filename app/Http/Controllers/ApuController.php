<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Apu;
use App\Models\ApuPersonal;
use App\Models\ApuHerramienta;
use App\Models\ApuMaterial;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class ApuController extends Controller {

	
	public function index(Request $request)
	{
            switch ($request->tipo_busqueda) {
               case 'apu': return Apu::search($request->descripcion_apu, $request->categoria);
               case 'all_apu': return Apu::searchAll($request->id);    
            }
            /*$nombre = $request->nombre;
            $apu = Apu::searchAll($nombre);
            return $apu;*/
	}

	
	public function create()
	{
		//
	}

	public function store(Request $request)
	{            
            try {
                $apu = (array)$request->apu;
                $apu_id = Apu::register($apu);
                $apu_personal = (array)$request->apu_personal;
                $apu_herramienta = (array)$request->apu_herramienta;
                $apu_material = (array)$request->apu_material;
                if (!empty($apu_personal)) {
                    ApuPersonal::register($apu_personal, $apu_id);
                }
                if (!empty($apu_herramienta)) {
                    ApuHerramienta::register($apu_herramienta, $apu_id);
                }
                if (!empty($apu_material)) {
                    ApuMaterial::register($apu_material, $apu_id);
                }
                return 'Registrado correctamente';
            } catch (QueryException $ex) {
                return $ex->getMessage();
                //return \Result::create(1, false, $ex->getMessage());
            }
	}

	
	public function show($descripcion)
	{
            return Apu::_search($descripcion);
	}

	public function edit($id)
	{
		//
	}

	public function update($id)
	{
		//
	}

	
	public function destroy($id)
	{
		//
	}

}
