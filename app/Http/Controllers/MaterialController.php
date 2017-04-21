<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Material;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class MaterialController extends Controller {

	
	public function index()
	{
            return Material::listar();
	}

	public function create()
	{
		//
	}

	
	public function store(Request $request)
	{
            try {
                $material = (array)$request->material;
                Material::register($material);
                return 'Registrado correctamente';
            } catch (QueryException $ex) {
                return 'Error al registrar';
                //return \Result::create(1, false, $ex->getMessage());
            }
	}

	public function show($nombre)
	{
            return Material::search($nombre);
	}

	
	public function edit($id)
	{
		//
	}

	
	public function update($id, Request $request)
	{ 
            $material = (array)$request->material; 
            Material::modify($material, $id);
            return 'Modificado correctamente';
	}

	
	public function destroy($id)
	{
		//
	}

}
