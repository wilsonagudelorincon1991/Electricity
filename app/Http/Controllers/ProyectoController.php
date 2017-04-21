<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\ProyectoApu;
use App\Models\Proyecto;
use App\Models\Liquidacion;
use App\Models\ProyectoLiquidacion;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class ProyectoController extends Controller {
        
    
        public function index(Request $request)
	{
            //return Proyecto::search_cotizacion('REDES ELÉCTRICAS DE  MEDIA Y BAJA TENSIÓN PARA ALTOS DE EL BANCO MAGDALENA');
            /*if ($request->tipo_busqueda == 'actualizar_estado') {
                return Proyecto::search_for_modify_estado($request->nombre);
            } else {
                return Proyecto::search_for_modify($request->nombre);
            }*/
            switch ($request->tipo_busqueda) {
                case 'actualizar_estado': return Proyecto::search_for_modify_estado($request->nombre);
                case 'actualizar_proyecto': return Proyecto::search_for_modify($request->nombre);
                case 'buscar_proyecto' : return Proyecto::search($request->nombre, $request->estado, $request->filtro);        
                case 'cotizar_proyecto' : return Proyecto::search_cotizacion($request->id);    
                case 'liquidacion_proyecto' : return Liquidacion::search($request->nombre, $request->fecha_inicio, $request->fecha_final, $request->filtro);        
                case 'liquidacion_proyecto_detalle' : 
                    $liquidaciones = Liquidacion::_search($request->id);
                    return ProyectoLiquidacion::search($liquidaciones);        
            }
        }

	
	public function create()
	{
		//
	}

	public function store(Request $request)
	{            
            try {
                $opcion = (array)$request->opcion;
                if ($opcion['process'] == 'proyecto') {
                    $proyecto = (array)$request->proyecto;
                    Proyecto::register($proyecto);
                } else { 
                    $apus = (array)$request->apus;
                    $data = (array)$request->data;
                    $proyecto_id = $data['proyecto_id'];
                    //return array('proyecto_id' => $proyecto_id, 'data' => $apus);
                    ProyectoApu::register($proyecto_id, $apus); 
                }
                return 'Registrado correctamente ';
            } catch (QueryException $ex) {
                return $ex->getMessage();
                //return \Result::create(1, false, $ex->getMessage());
            }
	}

	//@param $nombre_apu
	public function show($nombre)
	{
           //return Apu::search($nombre_apu);
            return Proyecto::searchAll($nombre);
            //return Proyecto::getApu(12);
        }

	public function edit($id)
	{
		
	}

	public function update(Request $request)
	{
            switch ($request->tipo_actualizar) {
                case 'actualizar_estado':
                    $id = $request->id;
                    $proyecto = ['estado' => $request->estado];
                    try {
                        Proyecto::modify($id, $proyecto);
                        return 'Modificado correctamente';
                    } catch (QueryException $ex) {
                        return $ex;
                    }
                    break;
                case 'actualizar_proyecto_apu':
                    try {
                        $proyectos_apus = (array)$request->proyecto_apu;
                        ProyectoApu::modify($proyectos_apus);
                        $liquidacion_id = Liquidacion::register($request->liquidacion);
                        ProyectoLiquidacion::register($liquidacion_id, $request->proyecto_liquidacion);
                        return 'Liquidado correctamente';
                    } catch (QueryException $ex) {
                        return $ex;
                    }
                    break;
            }
        }
        
	
	public function reporteProyectoPDF(Request $request)
	{   
            $reporte = $this->generar_reporte($request->reporte);
            $view = view("reportes.reporte_proyecto", [ 
                "apus" => $reporte, "data" => $request->data
            ])->render();
            
            $pdf = new \mPDF(); 
            $pdf->SetHeader("Informe de proyecto||NG2.SAS");

            $pdf->WriteHTML($view); $pdf->Output();
	}
        
        
        public function generar_reporte($data) {
            $i = 0; $categoria = '';
            foreach ($data as &$reporte) { 
                if ($i == 0) {
                    $categoria = $reporte['categoria'];
                } else if ($categoria !== $reporte['categoria']) {
                    $categoria = $reporte['categoria'];
                } else {
                    $reporte['categoria'] = 'null';
                } 
                $i = $i + 1;
            } return $data;
        }

        public function reporteLiquidacionPDF(Request $request)
	{ 
            $view = view("reportes.reporte_liquidacion", [ 
                "apus" => $request->liquidacion_detalle, "data" => $request->data,
                "liquidacion" => $request->liquidacion
            ])->render();
            
            $pdf = new \mPDF(); 
            $pdf->SetHeader("Informe liquidacion de proyecto||NG2.SAS");

            $pdf->WriteHTML($view); $pdf->Output();
	}
        
        public function destroy($id)
	{
            return 'update';
	}
}
