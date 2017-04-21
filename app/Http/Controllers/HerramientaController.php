<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Herramienta;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class HerramientaController extends Controller {

	
	public function index()
	{
            return Herramienta::listar();
	}

	public function create()
	{
		//
	}

	
	public function store(Request $request)
	{ 
            try {
                $herramienta = (array)$request->herramienta;
                Herramienta::register($herramienta);
                return 'Registrado correctamente';
            } catch (QueryException $ex) {
                return 'Error al registrar';
                //return \Result::create(1, false, $ex->getMessage());
            }
        }

	
	public function show($nombre)
	{
            return Herramienta::search($nombre);
	}

	
	public function edit($id)
	{
		//
	}

	
	public function update($id, Request $request)
	{ 
            $herramienta = (array)$request->herramienta; 
            Herramienta::modify($herramienta, $id);
            return 'Modificado correctamente';
	}

	
	public function destroy($id)
	{
		//
	}

}
