<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SessionElectricity {
    
    public function handle(Request $request, Closure $next) {
        if (!isset($_SESSION['usuario'])) { 
            return redirect('login');
            //return view('login/login');
        }
        return $next($request); // Continuando con el proceso de Petición
    }
}