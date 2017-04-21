<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('login', 'LoginController@login');
Route::get('index', 'LoginController@index');
Route::post('usuario/session_start', 'UsuarioController@startSession');
Route::get('usuario/session_destroy', 'UsuarioController@destroySession');
Route::get('reporteProyectoPDF', 'ProyectoController@reporteProyectoPDF'); 
Route::get('reporteLiquidacionPDF', 'ProyectoController@reporteLiquidacionPDF'); 
Route::post('registrarUsuario', 'UsuarioController@store');
Route::get('validarUsuario', 'UsuarioController@search');
Route::get('searchUpdate', 'UsuarioController@searchUpdate');

Route::resource('personal', 'PersonalController'); 

Route::resource('herramienta', 'HerramientaController'); 

Route::resource('material', 'MaterialController');

Route::resource('cliente', 'ClienteController');

Route::resource('apu', 'ApuController');

Route::resource('categoria', 'CategoriaController');

Route::resource('proyecto', 'ProyectoController');
Route::put('proyecto', 'ProyectoController@update');

Route::resource('egreso', 'EgresoController');

Route::resource('empleado', 'EmpleadoController');

Route::resource('compra', 'CompraController');

Route::resource('nomina', 'NominaController');

//Views
Route::resource('form/{name_form}', 'ViewsController');




