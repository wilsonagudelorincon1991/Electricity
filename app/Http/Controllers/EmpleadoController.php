<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Empleado;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class EmpleadoController extends Controller{
    
        public function index()
	{
            return Empleado::search();
        }

	
	public function create()
	{
		//
	}

	
	public function store(Request $request)
	{
            try {
                $empleado = (array)$request->empleado;
                Empleado::register($empleado);
                return 'Registrado correctamente';
            } catch (QueryException $ex) {
                return 'Error al registrar'.$ex;
                //return \Result::create(1, false, $ex->getMessage());
            }
	}

	
	public function show($apellido)
	{
           return Empleado::searchByApellido($apellido);
	}

	
	public function edit($id)
	{
		//
	}

	
	public function update($id, Request $request)
	{ 
            $empleado = (array)$request->empleado; 
            Empleado::modify($empleado, $id);
            return 'Modificado correctamente';
	}

	
	public function destroy($id)
	{
		//
	}
}
