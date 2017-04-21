<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Nomina;
use App\Models\NominaDetalle;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class NominaController extends Controller{
    
        public function index(Request $request)
	{
            $tipo_busqueda = (array)$request->tipo_busqueda;
            $tipo = $tipo_busqueda['tipo'];
            if ($tipo == 'nomina') {
                $nomina = (array)$request->nomina;
                return Nomina::search($nomina['nombre'], $nomina['fecha_menor'], $nomina['fecha_mayor'], $nomina['opcion']);
            } else {
                $nomina_detalle = (array)$request->nominaDetalle;
                return Nomina::searchDetalle($nomina_detalle['id']);
            }
        }

	
	public function create()
	{
		//
	}

	
	public function store(Request $request)
	{
            try {
                $nomina = (array)$request->nomina;
                $nomina_detalle = (array)$request->nomina_detalle;
                //return $nomina;
                //return $nomina_detalle; 
                $nomina_id = Nomina::register($nomina);
                //$nomina_id = 25;
                NominaDetalle::register($nomina_detalle, $nomina_id);
                return 'Registrado correctamente';
            } catch (QueryException $ex) {
                return 'Error al registrar'.$ex;
                //return \Result::create(1, false, $ex->getMessage());
            }
	}

	
	public function show($data, Request $request)
	{
            switch ($request->filtro) {
                case 'Estado':
                    return Nomina::searchByEstado();
                case 'Detalle':    
                    return Nomina::searchDetalle($data);
            }
            
	}
        
	public function edit($id)
	{
		//
	}

	
	public function update(Request $request, $id)
	{
            $nomina = (array)$request->nomina;    
            Nomina::modify($id, $nomina);
            return 'Modificado correctamente';
	}

	
	public function destroy($id)
	{
		//
	}
}

