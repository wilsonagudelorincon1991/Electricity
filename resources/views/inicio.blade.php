<!DOCTYPE html>
<html>
    <head>
        <title>NoteSalud+ Traslados - Sesión iniciada</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <!--<link href="../css/notesalud.css" rel="stylesheet" type="text/css"/>-->
        <!--<link href="../../public/css/notesalud.css" rel="stylesheet" type="text/css"/>-->
    </head>
    
    <body class="hidden">
        <!-- Barra de navegacion (Header)-->
        <h1>Adrian</h1>
        <header>
            <nav class="blue darken-1 nav-wrapper ">
                <a id="error-notesalud" class="hidden" data-activates="sidenav-error-notesalud"></a>
                <a id="btn-test" class="brand-logo center">NoteSalud+</a>
                <a class="button-collapse hidden-l" data-activates="sidenav-traslados"><i class="material-icons">view_headline</i></a>
                <a id="main-notesalud" class="right btn-main"><i class="material-icons">more_vert</i></a>
                <a id="main-status-resource" class="right btn-main"><i class="material-icons">arrow_drop_down_circle</i></a>
                <a id="main-download-resource" class="right btn-main hidden"><i class="material-icons">file_download</i></a>
                
                <ul id="sidenav-traslados" class="side-nav fixed">
                    <div class="logo"><img src="../images/icon.svg"></div>
                    
                    <ul class="collapsible collapsible-accordeon">
                        <li id="menu-admision" class="menu">
                            <a class="collapsible-header waves-effect">Admisión</a>
                            <div class="collapsible-body">
                                <ul>
                                    <li class="submenu">
                                        <a class="item-home" data-form="registroAdmision">Registro de traslados</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li id="menu-coordinacion" class="menu">
                            <a class="collapsible-header waves-effect">Coordinación</a>
                            <div class="collapsible-body">
                                <ul>
                                    <li class="submenu">
                                        <a class="item-home" data-form="registroAsignacion">Asignación de traslados</a>
                                        <a class="item-home" data-form="seguimientoTraslado">Seguimiento de traslados</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        
                        <li id="menu-administrativo" class="menu">
                            <a class="collapsible-header waves-effect">Administración</a>
                            <div class="collapsible-body">
                                <ul>
                                    <li class="submenu">
                                        <a class="item-home" data-form="reporteTraslado">Reportes de traslados</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        
                        <li id="menu-sistemas" class="menu">
                            <a class="collapsible-header waves-effect">Sistemas</a>
                            <div class="collapsible-body">
                                <ul>
                                    <li class="submenu">
                                        <a id="item-clean-database">Limpiar base de datos local</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        
                        <li class="menu resource">
                            <a id="item-gestion-bd" class="collapsible-header waves-effect">
                                <i class="material-icons hidden">report</i>Gestionar base de datos local
                            </a>
                            <div class="collapsible-body">
                                <ul>
                                    <li class="submenu">
                                        <a id="item-resource-ciudad" class="item-resource" data-resource="ciudad">
                                            <i class="material-icons hidden">report</i>Ciudades
                                        </a>
                                        <a id="item-resource-barrio"class="item-resource" data-resource="barrio">
                                            <i class="material-icons hidden">report</i>Barrios
                                        </a>
                                        <a id="item-resource-lugar" class="item-resource" data-resource="lugar">
                                            <i class="material-icons hidden">report</i>Lugares
                                        </a>
                                        <a id="item-resource-entidad_autorizacion" class="item-resource" data-resource="entidad_autorizacion">
                                            <i class="material-icons hidden">report</i>Entidades de autorización
                                        </a>
                                        <a id="item-resource-tipo_traslado" class="item-resource" data-resource="tipo_traslado">
                                            <i class="material-icons hidden">report</i>Tipos de traslados
                                        </a>
                                        <a id="item-resource-motivo_traslado" class="item-resource" data-resource="motivo_traslado">
                                            <i class="material-icons hidden">report</i>Motivos de traslados
                                        </a>
                                        <a id="item-resource-servicio_traslado" class="item-resource" data-resource="servicio_traslado">
                                            <i class="material-icons hidden">report</i>Servicios de traslados
                                        </a>
                                        <a id="item-resource-entidad_afiliacion" class="item-resource" data-resource="entidad_afiliacion">
                                            <i class="material-icons hidden">report</i>Entidades de afiliacion
                                        </a>
                                        <a id="item-resource-farmacia_traslado" class="item-resource" data-resource="farmacia_traslado">
                                            <i class="material-icons hidden">report</i>Inventario de farmacia
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        
                        <li class="menu">
                            <a id="item-status-socket" class="collapsible-header waves-effect">Socket sin conexión</a>
                            <div class="collapsible-body">
                                <ul>
                                    <li class="submenu">
                                        <a id="item-connect-socket">Conectar</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        
                        <li class="menu">
                            <a id="item-close-session" class="collapsible-header waves-effect">Cerrar sesión</a>
                        </li>
                    </ul>
                </ul>
            </nav>
        </header>
        
         Contenido de la página (Content)
        <div class="row container">
            <div id="container-form" data-component=""></div>
            
            <div id="container-component" class="col side-nav right-aligned" data-component="">
                <center>
                    <div class="preloader-component hidden">
                        <div class="preloader-wrapper active" style="margin: 20px 0px 10px 0px;">
                            <div class="spinner-layer spinner-blue-only">
                                <div class="circle-clipper left"><div class="circle"></div></div>
                                <div class="gap-patch"><div class="circle"></div></div>
                                <div class="circle-clipper right"><div class="circle"></div></div>
                            </div>
                        </div>
                        <p>Cargando componente</p>
                    </div>
                </center>
                
                <div class="component"></div>
            </div>
        </div>
        
        <div id="error-server" class="error-server-500 hidden">
            <div class="row">
                <h5 class="title">Servidor NoteSalud+<i id="close-error-message" class="material-icons right">close</i></h5>
                
                <div id="error-server-content"></div>
            </div>
        </div>
        
        <!--Script de la página principal-->
<!--        <script src="../../public/js/libs/jquery-2.1.4.min.js" type="text/javascript"></script>
        <script src="../../public/js/libs/softtion-1.0.4.js" type="text/javascript"></script>
        <script src="../../public/js/libs/softtion.jquery-1.0.5.js" type="text/javascript"></script>
        
        <script src="../../public/js/libs/softtion.override-1.0.1.js" type="text/javascript"></script>
        <script src="../../public/js/libs/softtion.query-0.4.2.js" type="text/javascript"></script>
        <script src="../../public/js/libs/softtion.components-1.0.1.js" type="text/javascript"></script>
        <script src="../../public/js/libs/materialize-0.9.4.js" type="text/javascript"></script>
        <script src="../../public/js/libs/materialize.clock-0.1.1.js" type="text/javascript"></script>
        <script src="../../public/js/notesalud/libs/notesalud-0.0.1.js" type="text/javascript"></script>
        <script src="../../public/js/notesalud/libs/notesalud.components-0.0.1.js" type="text/javascript"></script>
        <script src="../../public/js/notesalud/libs/notesalud.creator-0.0.1.js" type="text/javascript"></script>
        -->
    </body>
</html>