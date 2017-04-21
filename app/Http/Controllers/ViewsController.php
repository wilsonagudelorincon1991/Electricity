<?php namespace App\Http\Controllers;

class ViewsController extends ControllerElectricity {
        
        public function __construct() {
            parent::__construct();
            $this->middleware('session');
        }
	
	public function index($name_form)
	{
            switch ($name_form) {
                case 'informe':
                    return view('Avanced/Consulta/InformeCotizacion');
                case 'personal':
                    return view('Basic/RegistrarPersonal');
                
                case 'herramienta':
                    return view('Basic/RegistrarHerramienta');
                
                case 'material':
                    return view('Basic/RegistrarMaterial');
                case 'categoria':
                    return view('Basic/RegistrarCategoria');    
                
                case 'proyecto':
                    return view('Basic/RegistrarProyecto');
                case 'cliente':
                    return view('Basic/RegistrarCliente');
                
                case 'compra':
                    return view('Other/RegistrarCompra');
                
                case 'apu':
                    return view('Avanced/RegistrarApu');
                
                case 'cotizar_proyecto':
                    return view('Avanced/CotizarProyecto');
                
                case 'liquidar_proyecto':
                    return view('Avanced/LiquidarProyecto');
                
                case 'estado_proyecto':
                    return view('Avanced/ActualizarProyectoEstado');
                
                case 'egreso':
                    return view('Other/Egreso');
                case 'empleado':
                    return view('Other/Empleado');    
                
                case 'nomina':
                    return view('Other/GenerarNomina');    
                
                case 'home':
                    return view('Home/home');
                case 'home_administrador':
                    return view('Home/HomeAdministrador');
                case 'home_gerente':
                    return view('Home/HomeGerente');    
                case 'home_comprador':
                    return view('Home/HomeComprador');
                case 'home_secretaria':
                    return view('Home/HomeSecretaria');
                
                    /* Consultas */
                case 'consultar_material':
                    return view('Basic/Consulta/ConsultarMaterial');
                case 'consultar_herramienta':
                    return view('Basic/Consulta/ConsultarHerramienta');
                case 'consultar_mano_obra':
                    return view('Basic/Consulta/ConsultarManoObra');    
                case 'consultar_cliente':
                    return view('Basic/Consulta/ConsultarCliente'); 
                /* Other */
                case 'consultar_empleado':
                    return view('Other/Consulta/ConsultarEmpleado');    
                case 'consultar_nomina':
                    return view('Other/Consulta/ConsultarNomina');    
                case 'consultar_control_diario':
                    return view('Other/Consulta/ConsultarEgreso');        
                case 'consultar_orden_compra':
                    return view('Other/Consulta/ConsultarCompra');
                case 'registrar_usuario':
                    return view('login/RegistrarUsuario');    
                case 'registrar_rol':
                    return view('login/RegistrarRoles');        
                    
                /* */
                case 'consultar_apu':
                    return view('Avanced/Consulta/ConsultarApu');    
                case 'consultar_proyecto':
                    return view('Avanced/Consulta/ConsultarProyecto');        
                case 'consultar_liquidacion':
                    return view('Avanced/Consulta/ConsultarLiquidacion');            
            }
	}
        
        public function inicio() {
            return view('index/index');
        }
}
