<?php 
  session_start();
  if (isset($_SESSION['user']) and isset($_SESSION['tipo']) and isset($_SESSION['identificacion'])and isset($_SESSION['nombres'])and isset($_SESSION['apellidos'])and isset($_SESSION['telefono'])){
    if($_SESSION['tipo']=="V"){
      header('Location: FormMenuV.php');
    }else if($_SESSION['tipo']=="TSS"){
      header('Location: FormMenuTSS.php');
    }else if($_SESSION['tipo']=="RH"){
      header('Location: FormMenuRH.php');
    }else if($_SESSION['tipo']=="JD"){
      header('Location: FormMenuJD.php');
    }else if($_SESSION['tipo']=="JM"){
      header('Location: FormMenuJM.php');
    }
    //header('Location: home.php');
  }
?>

<!DOCTYPE html>
<html lang="es">
<head>
        <meta name="theme-color" content="#43a047">
	<link rel="icon" type="image/png" href="img/favicon/iconlogin.png">
	<title>Iniciar Sesion</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<link rel="stylesheet" type="text/css" href="materialize/css/alertify.min.css">
	<link rel="stylesheet" type="text/css" href="materialize/css/themes/default.min.css">
	<link rel="stylesheet" type="text/css" href="materialize/css/materialize.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>

<body style="background-image : url('img/bg.jpg'); background-size: cover;">
	<div class="">
	
		<div class="row">
			<div class="col s12  l4 offset-l4 m6 offset-m3">
				<div class="card-panel" style="margin-top: 30px">
				<!--	<form method="" action="">
					<!-<h3 class="center-align">Inicio de sesion</h3>-->

					<div class="row">
						<div class="col s1 l1 m1">
							<a href="index.html" class="btn-floating green darken-1 waves-effect waves-light">
                                                            <i class="material-icons small">arrow_back</i>
                                                        </a>
						</div>
					</div>

					<div class="row">
						<div class="col s4 l4 m4 offset-s4 offset-l4 offset-m4">
							<img class="circle" src="img/avatar.jpg" width="100px" height="100px">
						</div>
					</div>

					<div class="divider"></div>
	

						<div class="input-field col s10 offset-s1">
							<input type="text" name="user" id="textIdentificacion" required>
							<label for="textIdentificacion">Usuario</label>
						</div>
						<div class="input-field col s10 offset-s1">
							<input type="password" name="pass" id="textPass" required>
							<label for="textPass">Contraseña</label>
						</div>
						<div class="row"></div>
						<div class="col s6 l6 offset-s3 offset-l3">
							<button id="btningresar" class="col s12 waves-effect waves-light btn green">Ingresar</button>	
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
              <div class="col l4 m6 s12 white-text">
                <h4>Gobernacion Del Cesar</h4>
              <ul>
                <li>Nit Departamento del Cesar: 892399999-1</li>
                <li>Dirección: Calle 16 # 12-120 Valledupar</li>
                <li>Telefono: (575)-5709866 | Correo: contactenos@cesar.gov.co</li>
                <li>Horario de Atención: Lunes a Viernes de 07:45am - 12:45pm y 02:45pm - 05:45pm
                </li>
                <li>Linea de Atencion: 018000954099 | Código Postal: 200001</li>               
              </ul>
              </div>
              <div class="col s12 m6 l4 offset-l4 white-text">
                <h4>Encuentranos en</h4>
              <a class="" href="https://www.facebook.com/GobernacionDelCesar/" target="_blank"><img src="img/facebook.png" alt="Facebook"></a>
              <a class="" href="https://twitter.com/luismonsalvo" target="_blank"><img src="img/twitter.png" alt="Twitter"></a>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
              <div class="row">
                <div class="col s12 m6 offset-m4 offset-l5">
                  © 2015 Todos los derechos reservados
                </div>
              </div>
            </div>
          </div>
  </footer>

  
<!--scripts-->
<script src="materialize/js/jquery.min.js"></script>
<script src="materialize/js/materialize.min.js"></script>
<script src="materialize/js/alertify.min.js"></script>
<script src="js/JS_login.js"></script>
</body>
</html>		