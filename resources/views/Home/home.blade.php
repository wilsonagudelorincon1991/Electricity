<!DOCTYPE html>
<html>
    <head>
        <title>Electricidad</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <link href="{{ asset('/css/notesalud.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('/css/materialize.0.9.7.css') }}" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <style>
            #logo > img{
                width: 300px; 
                height: 240px;
            }
            
        </style>
    </head>
    
    <body>
        <!-- Barra de navegacion (Header)-->
        <header>
            <nav class="blue darken-1 nav-wrapper ">
                <a id="btn-test" class="brand-logo center">NG2.SAS</a>
                
                <ul id="sidenav-traslados" class="side-nav fixed">
                    <div id="logo"><img src="../../public/img/electricidad.jpg"></div>
                    <!-- Registros basicos -->
                    <ul class="collapsible collapsible-accordeon">
                        <li id="menu-basico" class="menu">
                            <a class="collapsible-header waves-effect">Gestiones basicas</a>
                            <div class="collapsible-body">
                                <ul>
                                    <li class="submenu size">
                                        <a class="item-home" id="registroMaterial">Material</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="registroPersonal">Mano de obra</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="registroHerramienta">Herramienta</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="registroCategoria">Categoria</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="registroCliente">Cliente</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="registrarProyecto">Proyecto</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <!-- Otros registros-->        
                        <li id="menu-coordinacion" class="menu">
                            <a class="collapsible-header waves-effect">Otros registros</a>
                            <div class="collapsible-body">
                                <ul>
                                    <li class="submenu">
                                        <a class="item-home" id="registroEmpleado">Registrar empleado</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="registroEgreso">Control diario</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="registroCompra">Orden de compra</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="generarNomina">Generar nomina</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <!-- Registros avanzados-->
                        <li id="menu-coordinacion" class="menu">
                            <a class="collapsible-header waves-effect">Registros avanzados</a>
                            <div class="collapsible-body">
                                <ul>
                                    <li class="submenu">
                                        <a class="item-home" id="registrarAPU">Registrar APU</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="cotizarProyecto">Cotizar Proyecto</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="liquidarProyecto">Liquidar Proyecto</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="estadoProyecto">Estado proyecto</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        
                        <li id="menu-coordinacion" class="menu">
                            <a class="collapsible-header waves-effect">Informes</a>
                            <div class="collapsible-body">
                                <ul>
                                    <li class="submenu">
                                        <a class="item-home" id="consultarProyecto">Consultar Proyecto</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="consultarLiquidacion">Consultar Liquidacion</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="consultarNomina">Consultar nomina</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <!-- Consultas basicas -->
                        <li id="menu-coordinacion" class="menu">
                            <a class="collapsible-header waves-effect">Consultas basicas</a>
                            <div class="collapsible-body">
                                <ul>
                                    <li class="submenu">
                                        <a class="item-home" id="consultarMaterial">Material</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="consultarHerramienta">Herramienta</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="consultarManoObra">Mano de obra</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="consultarCliente">Cliente</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="consultarAPU">APU</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <!-- Otras consultas -->
                        <li id="menu-coordinacion" class="menu">
                            <a class="collapsible-header waves-effect">Otras consultas</a>
                            <div class="collapsible-body">
                                <ul>
                                    <li class="submenu">
                                        <a class="item-home" id="consultarControlDiario">Control diario</a>
                                    </li>
                                    <li class="submenu">
                                        <a class="item-home" id="consultarOrdenCompra">Orden de compra</a>
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
        
        <!-- Contenido de la página (Content)-->
        <div style="margin-left: 240px">
            <div id="container-form"><div style="margin: 10px">
                    <img src='{{ asset('/img/bg.png') }}' style="border-radius: 25px; height: 85%; width: 78%">
            </div></div>
        </div>
        
        <!--Script de la página principal-->
        <script src="{{ asset('/js/libs/jquery-2.1.4.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/js/libs/materialize-0.9.4.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/js/Electricity/Home/home.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/js/Electricity/electricity.js') }}" type="text/javascript"></script>
        
    </body>
</html>