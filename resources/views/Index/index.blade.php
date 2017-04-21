<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"/>
  <title>NG2.SAS</title>

  <!-- CSS  -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="{{ asset('/css/login/materialize.min.css') }}">
  
  <style>
      nav ul a,
        nav .brand-logo {
          color: #444;
        }

        p {
          line-height: 2rem;
        }

        .button-collapse {
          color: #26a69a;
        }

        .parallax-container {
          min-height: 380px;
          line-height: 0;
          height: auto;
          color: rgba(255,255,255,.9);
        }
          .parallax-container .section {
            width: 100%;
          }

        @media only screen and (max-width : 992px) {
          .parallax-container .section {
            position: absolute;
            top: 40%;
          }
          #index-banner .section {
            top: 10%;
          }
        }

        @media only screen and (max-width : 600px) {
          #index-banner .section {
            top: 0;
          }
        }

        .icon-block {
          padding: 0 15px;
        }
        .icon-block .material-icons {
          font-size: inherit;
        }

        footer.page-footer {
          margin: 0;
        }
  </style>
  
  <style>
      body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    }

    main {
        flex: 1 0 auto;
    }
  </style>
   
</head>
<body>
  <nav class="white" role="navigation">
    <div class="nav-wrapper container">
      <a id="logo-container" href="#" class="brand-logo">NG2.SAS</a>
      <ul class="right hide-on-med-and-down">
          <li><a id="acceso" href="#">Acceso</a></li>
      </ul>

      <ul id="nav-mobile" class="side-nav">
        <li><a href="#">Navbar Link</a></li>
      </ul>
      <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
    </div>
  </nav>
    
  <div id="index-banner" class="parallax-container">
    <div class="section no-pad-bot">
      <div class="container">
        <br><br>
        <!--<h1 class="header center teal-text text-lighten-2">Parallax Template</h1>-->
        <div class="row center">
          <!--<h5 class="header col s12 light">A modern responsive front-end framework based on Material Design</h5>-->
        </div>
        <div class="row center">
          <!--<a href="http://materializecss.com/getting-started.html" id="download-button" class="btn-large waves-effect waves-light teal lighten-1">Get Started</a>-->
        </div>
        <br><br>
        
      </div>
    </div>
      
    <div class="parallax"><img src="{{ asset('img/img8.png') }}" alt="Unsplashed background img 1"></div>
  </div>


  <div class="container">
    <div class="section">

      <!--   Icon Section   -->
      <!--<div class="row">-->
        <div class="col s12 m4">
          <div class="icon-block">
            <!--<h2 class="center brown-text"><i class="material-icons">flash_on</i></h2>-->
            <h5 class="center">Mision</h5>

            <p class="light" style="text-align: justify;">Tenemos como misión el desarrollo integral socioeconómico del País y principalmente de nuestra región caribe, a través del Diseño, Gestión, planeación y ejecución de Obras Eléctricas y Civiles asociadas, y  en general Programas y Proyectos de ingeniería que permitan el desarrollo sostenible de las comunidades de nuestro país, el apoyo y el fortalecimiento al comercio y a la industria para hacer de Colombia un  país más próspero.</p>
          </div>
        </div>

        <div class="col s12 m4">
          <div class="icon-block">
            <!--<h2 class="center brown-text"><i class="material-icons">group</i></h2>-->
            <h5 class="center">Vision</h5>

            <p class="light" style="text-align: justify;">Convertir nuestra empresa de ingeniería en la mejor opción económica,  técnica y  eficiente de las diferentes personas y empresas que cotidianamente necesitan de los servicios eléctricos y civiles  que prestamos.
                Nuestra idea principal es cubrir con este proyecto el Departamento de Cesar sede principal de nuestra compañía y abrigar posteriormente los Departamentos y Ciudades más importantes de la Costa y el  país. 
            </p>
          </div>
        </div>

        <div class="col s12 m4">
          <div class="icon-block">
            <!--<h2 class="center brown-text"><i class="material-icons">settings</i></h2>-->
            <h5 class="center">Ideologia</h5>

            <p class="light" style="text-align: justify;">Cuarenta y Seis Años de experiencia en el área de la Ingeniería Eléctrica,  como pilares fundamentales del desarrollo de obras de construcción eléctricas del departamento que  nos ha llevado a desarrollar las capacidades de liderazgo y organización en beneficio de las comunidades, mediante el desarrollo de programas y proyectos en las áreas del diseño Eléctrico, Mantenimiento Preventivo y Correctivo, construcción de redes de Media y Baja tensión, Construcción de redes internas,  Proyectos de iluminación interna  y externa, Construcción y mantenimiento de Subestaciones eléctricas de 13,8 y 34 KV, Apantallamiento y coordinación de protecciones eléctricas, Interventoría e Inspección de obras eléctricas, Consultoría y asesorías técnicas profesionales  para el desarrollo de obras de alta ingeniería, control de calidad eléctrico y eficiencia energética y disminución de perdidas técnicas de las instalaciones todo esto encaminado o dirigido  tanto para la empresa pública como privada.</p>
          </div>
        </div>
      <!--</div>-->

    </div>
  </div>


  <div class="parallax-container valign-wrapper">
    <div class="section no-pad-bot">
      <div class="container">
        <div class="row center">
          <!--<h5 class="header col s12 light">A modern responsive front-end framework based on Material Design</h5>-->
        </div>
      </div>
    </div>
    <div class="parallax"><img src="{{ asset('img/img5.jpg') }}" alt="Unsplashed background img 2"></div>
  </div>

  <div class="container">
    <div class="section">

      <div class="row">
        <div class="col s12 center">
          <h3><i class="mdi-content-send brown-text"></i></h3>
          <h4>Quienes somos</h4>
          <p class="left-align light" style="text-align: justify;">La empresa N.G.2 . INGENIERÍA ELÉCTRICA, es una firma de ingeniería familiar que surge de la unión de varias empresas familiares de ingeniería que  desde hace 46 años trabajan en la  ciudad de Valledupar, el ingeniero NOITIER ALBERTO GRANADOS VICENT y sus hijos, todos ingenieros en diferentes ramos de la Ingeniería. Somos pioneros en este ramo de la construcción eléctrica en el Dpto. del Cesar y somos tal vez la empresa de más experiencia e innovación en prestación de  servicios eléctricos y civiles asociados a estos proyectos.</p>
        </div>
      </div>

    </div>
  </div>


  <div class="parallax-container valign-wrapper">
    <div class="section no-pad-bot">
      <div class="container">
        <div class="row center">
          <!--<h5 class="header col s12 light">A modern responsive front-end framework based on Material Design</h5>-->
        </div>
      </div>
    </div>
    <div class="parallax"><img src="{{ asset('img/img7.png') }}" alt="Unsplashed background img 3"></div>
  </div>

  <footer class="page-footer teal">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Empresa NG2 SAS</h5>
          <p class="grey-text text-lighten-4" style="text-align: justify;">La empresa N.G.2 . INGENIERÍA ELÉCTRICA, es una firma de ingeniería familiar que surge de la unión de varias empresas familiares de ingeniería que  desde hace 46 años trabajan en la  ciudad de Valledupar, el ingeniero NOITIER ALBERTO GRANADOS VICENT y sus hijos, todos ingenieros en diferentes ramos de la Ingeniería. Somos pioneros en este ramo de la construcción eléctrica en el Dpto. del Cesar y somos tal vez la empresa de más experiencia e innovación en prestación de  servicios eléctricos y civiles asociados a estos proyectos.</p>


        </div>
        <div class="col l3 s12">
          <h5 class="white-text"></h5>
          <ul>
            <li><a class="white-text" href="#!"></a></li>
            <li><a class="white-text" href="#!"></a></li>
          </ul>
        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Contactenos</h5>
          <ul>	
            <li><a class="white-text" href="#!">Direccion: Calle 6ª No. 19b4-34</a></li>
            <li><a class="white-text" href="#!">Telefono oficina: 095 5887352  </a></li>
            <li><a class="white-text" href="#!">Telefono celular: 318-4095626 - 3184153950  </a></li>
            <li><a class="white-text" href="#!">Email: ngranadosa@gmail.com</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
      <!--Made by <a class="brown-text text-lighten-3" href="http://materializecss.com">Materialize</a>-->
      </div>
    </div>
  </footer>


  <!--  Scripts-->
  <script src="{{ asset('/js/login/jquery.min.js') }}"></script>
<script src="{{ asset('/js/libs/materialize-0.9.4.js') }}" type="text/javascript"></script>
  <script>
  (function($){
  $(function(){

        $('.button-collapse').sideNav();
        $('.parallax').parallax();

      }); // end of document ready
    })(jQuery); // end of jQuery name space
  </script>
  
  <script>
    $('#acceso').click(function (){
        var url = 'http://localhost:1016/Electricity/public/login';
        window.location.href = url;
    });
</script>
  </body>
</html>