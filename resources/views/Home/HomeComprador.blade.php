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
                        
                        <!-- Otros registros-->        
                        <li id="menu-coordinacion" class="menu">
                            <a class="collapsible-header waves-effect">Otros registros</a>
                            <div class="collapsible-body">
                                <ul>
                                    <li class="submenu">
                                        <a class="item-home" id="registroCompra">Orden de compra</a>
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
                                        <a class="item-home" id="consultarOrdenCompra">Orden de compra</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="menu">
                            <a id="cerrarSesion" class="collapsible-header waves-effect">Cerrar sesión</a>
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
        
        <!-- Modal Structure -->
            <div id="modal1" class="modal">
                <div class="modal-header" style="background: #4db6ac; padding: 1%;">
                    <h5>NG.2SAS - Mensaje de proceso</h5>
                </div>
            <div class="modal-content">

                <h6 id="text-modal"></h6>
            </div>
                <div class="modal-footer" style="background: #80cbc4">
                    <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
                </div>
            </div>
        
        <!--Script de la página principal-->
        <script src="{{ asset('/js/libs/jquery-2.1.4.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/js/libs/materialize-0.9.4.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/js/Electricity/electricity.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/js/Electricity/Home/home.js') }}" type="text/javascript"></script>
    </body>
</html>