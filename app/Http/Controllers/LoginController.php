<?php namespace App\Http\Controllers;

class LoginController extends ControllerElectricity {
    
    public function __construct() {
        parent::__construct();
    }
    
    public function login() {
        if (!isset($_SESSION['usuario'])) {
            return view('login/login');
        } 
        
        return redirect('form/'.$_SESSION['usuario']['tipo']);
    }
    
    public function index() {
        return view('Index/index');
    }
    
}   