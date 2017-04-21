<!DOCTYPE html>
<html lang="es">
<head>
        <meta name="theme-color" content="#43a047">
	<link rel="icon" type="image/png" href="img/favicon/iconlogin.png">
	<title>Iniciar Sesion</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<link rel="stylesheet" type="text/css" href="../../public/css/login/alertify.min.css">
	<link rel="stylesheet" type="text/css" href="../../public/css/login/themes/default.min.css">
	<link rel="stylesheet" type="text/css" href="{{ asset('/css/login/materialize.min.css') }}">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
 
<body style="background-image : url('{{ asset('/img/bg.png') }}'); background-size: cover;">
	<div class="">
	
		<div class="row">
			<div class="col s12  l4 offset-l4 m6 offset-m3">
				<div class="card-panel" style="margin-top: 30px">
				<!--	<form method="" action="">
					<!-<h3 class="center-align">Inicio de sesion</h3>-->

					<div class="row">
						<div class="col s1 l1 m1">
							<a href="{{ asset('index') }}" class="btn-floating green darken-1 waves-effect waves-light">
                                                            <i class="material-icons small">arrow_back</i>
                                                        </a>
						</div>
					</div>

					<div class="row">
						<div class="col s4 l4 m4 offset-s4 offset-l4 offset-m4">
							<img class="circle" src="{{ asset('img/avatar.png') }}" width="100px" height="100px">
						</div>
					</div>

					<div class="divider"></div>
	

						<div class="input-field col s10 offset-s1">
							<input type="text" name="user" id="txtUser" required>
							<label for="txtUser">Usuario</label>
						</div>
						<div class="input-field col s10 offset-s1">
							<input type="password" name="pass" id="txtPassword" required>
							<label for="txtPassword">Contraseña</label>
						</div>
						<div class="row"></div>
						<div class="col s6 l6 offset-s3 offset-l3">
							<button id="btnIngresar" class="col s12 waves-effect waves-light btn green">Ingresar</button>	
						</div>
						<!--<div class="col s6 l6">
							<button class="col s12 waves-effect waves-light btn green" onclick="limpiar()">Limpiar</button>	
						</div>-->
						
						<div class="row"></div>
						
						
				<!--	</form>-->
				</div>
			</div>
		</div>
	</div>

   
    
    
<div class="row"></div>

<footer class="page-footer green darken-1">
          <div class="container">
            <div class="row">
                <div class="col s8 white-text">
                    <h4>NG2.SAS INGENIERIA ELECTRICA</h4>
                <ul>
                    <li>Nit Departamento del Cesar: 892399999-1</li>
                    <li>Dirección: Calle 16 # 12-120 Valledupar</li>
                    <li>Telefono: (575)-5709866 | Correo: contactenos@cesar.gov.co</li>
                    <li>Horario de Atención: Lunes a Viernes de 07:45am - 12:45pm y 02:45pm - 05:45pm
                    </li>
                    <li>Linea de Atencion: 018000954099 | Código Postal: 200001</li>               
                </ul>
                </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
              <div class="row">
                <div class="col s12 m6 offset-m4 offset-l5">
                  © 2016 Todos los derechos reservados
                </div>
              </div>
            </div>
          </div>
  </footer>
 <!-- Modal Structure -->
                <div id="modal1" class="modal">
                    <div class="modal-header" style="background: #4db6ac; padding: 1%;">
                        <h5>NG.2SAS - Mensaje de proceso</h5>
                    </div>
                <div class="modal-content">
                    
                    <h6 id="text-modal">EL proceso fue registrado correctamente en la plataforma</h6>
                </div>
                    <div class="modal-footer" style="background: #80cbc4">
                        <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
                    </div>
                </div>
  
<!--scripts-->
<script src="{{ asset('/js/login/jquery.min.js') }}"></script>
<script src="{{ asset('/js/libs/materialize-0.9.4.js') }}" type="text/javascript"></script>
<script src="{{ asset('/js/login/alertify.min.js') }}"></script>
<script src="{{ asset('/js/Electricity/electricity.js') }}" type="text/javascript"></script>
<script>
    var domain = electricity.domain();
    
    $('#btnIngresar').click(function () { 
        var user = $('#txtUser').val(),
            password = $('#txtPassword').val();
            if(user !== '' && password !== '') {
                validar_session({user: user, password: password});
            } else {
                $("#text-modal").text('Faltan campos por completar');
                $('#modal1').openModal();
            }
    });
    
        var start_session = function (url, data) {
            $.ajax({
                type: 'post',
                url: 'http://'+domain+'/Electricity/public/usuario/session_start',
                data: data,
                success: function(response) {
                    window.location.href = url;
                }
                ,
                error : function (j) {
                    alert(JSON.stringify(j));
                }
            });
        };
        
        
        var validar_session = function (data) {
            $.ajax({
                type: 'get',
                url: 'http://'+domain+'/Electricity/public/validarUsuario',
                data: data,
                success: function(response) {
                    console.log(response);
                    if(response.estado === "next") {
                        var url = "http://"+domain+"/Electricity/public/form/";
                        redirect_home(response.rol, url);
                    } else { 
                        $("#text-modal").text('usuario o contraseña incorrecta');
                        $('#modal1').openModal();
                    }
                }
                ,
                error : function (j) {
                    alert(JSON.stringify(j));
                }
            });
        };
        
        
        var redirect_home = function (rol, url) {
            switch(rol) {
                case "ADMINISTRADOR":
                    start_session(url + "home_administrador", {tipo: 'home_administrador'});
                    break;
                case "GERENTE":
                    start_session(url + "home_gerente", {tipo: 'home_gerente'});
                    break;
                case "COMPRADOR":
                    start_session(url + "home_comprador", {tipo: 'home_comprador'});
                    break;
                case "SECRETARIA":
                    start_session(url + "home_secretaria", {tipo: 'home_secretaria'});    
                    break;
            }
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
//        if(user === 'admin' && password === 'admin') {
//                    var url = "http://"+domain+"/Electricity/public/form/home_administrador";
//                    //window.location.href = url;
//                    start_session(url, {tipo: 'home_administrador'});
//                } else if(user === 'secretaria' && password === 'secretaria') { 
//                    var url = "http://"+domain+"/Electricity/public/form/home_secretaria";
//                    //window.location.href = url;
//                    start_session(url, {tipo: 'home_secretaria'});
//                } else if(user === 'comprador' && password === 'comprador') { 
//                    var url = "http://"+domain+"/Electricity/public/form/home_comprador";
//                    //window.location.href = url;
//                    start_session(url, {tipo: 'home_comprador'});
//                } else if(user === 'gerente' && password === 'gerente') { 
//                    var url = "http://"+domain+"/Electricity/public/form/home_gerente";
//                    //window.location.href = url;
//                    start_session(url, {tipo: 'home_gerente'});    
//                } else {
//                    $("#text-modal").text('Usuario o contraseña incorrecta');
//                    $('#modal1').openModal();
//                    //alert('Usuario o contraseña incorrecta');
//                }
</script>
</body>
</html>		