<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Rol;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class ClienteController extends Controller{
    
        public function index()
	{
            return Rol::search();
        }

	
	public function create()
	{
		//
	}

	
	public function store(Request $request)
	{
            try {
                $rol = (array)$request->rol;
                Rol::register($rol);
                return 'Registrado correctamente';
            } catch (QueryException $ex) {
                return 'Error al registrar'.$ex;
                //return \Result::create(1, false, $ex->getMessage());
            }
	}

	
	public function show($apellido)
	{
            return Cliente::searchByApellido($apellido);
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
