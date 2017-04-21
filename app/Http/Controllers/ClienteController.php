<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Cliente;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class ClienteController extends Controller{
    
        public function index()
	{
            return Cliente::search();
        }

	
	public function create()
	{
		//
	}

	
	public function store(Request $request)
	{
            try {
                $cliente = (array)$request->cliente;
                Cliente::register($cliente);
                return 'Registrado correctamente';
            } catch (QueryException $ex) {
                return 'Error al registrar'.$ex;
                //return \Result::create(1, false, $ex->getMessage());
            }
	}

	
	public function show($nombre)
	{
            return Cliente::searchByNombre($nombre);
	}

	
	public function edit($id)
	{
		//
	}

	
	public function update($id, Request $request)
	{ 
            $cliente = (array)$request->cliente; 
            Cliente::modify($cliente, $id);
            return 'Modificado correctamente';
	}

	
	public function destroy($id)
	{
		//
	}
}
