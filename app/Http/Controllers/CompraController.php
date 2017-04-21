<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Compra;
use App\Models\CompraDetalle;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class CompraController extends Controller{
    
        public function index(Request $request)
	{
            $compra = (array)$request->compra;
            return Compra::search($compra['empresa'], $compra['fecha_inicio'], $compra['fecha_final'], $compra['opcion']);
        }

	
	public function create()
	{
		//
	}

	
	public function store(Request $request)
	{
            try {
                $compra = (array)$request->compra;
                $compra_id = Compra::register($compra);
                $compra_detalle = (array)$request->compra_detalle;
                CompraDetalle::register($compra_detalle, $compra_id);
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
