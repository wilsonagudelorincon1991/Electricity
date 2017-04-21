<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Usuario;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class UsuarioController extends ControllerElectricity {
        public function __construct() {
            parent::__construct();
        }
        
        public function index()
	{
            return Usuario::search();
        }

	
	public function create()
	{
		//
	}

	
	public function store(Request $request)
	{
            try {
                $usuario = (array)$request->usuario;
                Usuario::register($usuario);
                return 'Registrado correctamente';
            } catch (QueryException $ex) {
                return 'Error al registrar'.$ex;
            }
	}

	
	public function search(Request $request)
	{   
            $user = $request->user;
            $password = $request->password;
            $usuario = Usuario::search($user, $password);
            if ($usuario) {
                return array("estado" => "next", "rol" => $usuario->rol);
            } else {
                return array("estado" => "null", "rol" => null);
            }
        
	}
        
        public function searchUpdate(Request $request)
	{ 
            $user = $request->user;
            return Usuario::searchUpdate($user);
        }
        
        public function startSession(Request $request)
	{   
            $_SESSION['usuario'] = ['tipo' => $request->tipo];
            //$_SESSION['usuario']['tipo'] = $request->tipo;
	}
        
        public function destroySession()
	{
            session_destroy();
            return redirect('login');
        }
}

