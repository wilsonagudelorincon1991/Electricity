<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Egreso;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class EgresoController extends Controller{
    
        public function index(Request $request)
	{
            return Egreso::searchByFecha($request->fecha_inicio, $request->fecha_final);
        }

	
	public function create()
	{
		//
	}

	
	public function store(Request $request)
	{
            try {
                $egreso = (array)$request->egreso;
                Egreso::register($egreso);
                return 'Registrado correctamente';
            } catch (QueryException $ex) {
                return 'Error al registrar'.$ex;
                //return \Result::create(1, false, $ex->getMessage());
            }
	}

	
	public function show($apellido)
	{
            
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
