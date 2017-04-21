<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Personal;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class PersonalController extends Controller {

	
	public function index()
	{
              //return Personal::listar();
            //return 'gym';
            
        }

	
	public function create()
	{
		//
	}

	
	public function store(Request $request)
	{
            try {
                $personal = (array)$request->personal;
                Personal::register($personal);
                return 'Registrado correctamente';
            } catch (QueryException $ex) {
                return 'Error al registrar';
                //return \Result::create(1, false, $ex->getMessage());
            }
	}

	
	public function show($nombre)
	{
            return Personal::search($nombre);
	}

	
	public function edit($id)
	{
		//
	}

	
	public function update($id, Request $request)
	{   
            $mano_obra = (array)$request->mano_obra; 
            Personal::modify($mano_obra, $id);
            return 'Modificado correctamente';
	}

	
	public function destroy($id)
	{
		//
	}

}
