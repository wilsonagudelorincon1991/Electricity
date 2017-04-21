<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Categoria;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class CategoriaController extends Controller{
    
        public function index()
	{
            return Categoria::search();
        }

	
	public function create()
	{
		//
	}

	
	public function store(Request $request)
	{
            try {
                $categoria = (array)$request->categoria;
                Categoria::register($categoria);
                return 'Registrado correctamente';
            } catch (QueryException $ex) {
                return 'Error al registrar'.$ex;
                //return \Result::create(1, false, $ex->getMessage());
            }
	}

	
	public function show($nombre)
	{
            return Categoria::searchByNombre($nombre);
	}

	
	public function edit($id)
	{
		//
	}

	
	public function update($id, Request $request)
	{ 
            $categoria = (array)$request->categoria; 
            Categoria::modify($categoria, $id);
            return 'Modificado correctamente';
	}

	
	public function destroy($id)
	{
		//
	}
}
