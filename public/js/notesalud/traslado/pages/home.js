
/* global notesalud, softtion, WebSocket */

var routes = notesalud.getNameServices(); // Rutas de Servicios de la Aplicación

jQuery(document).ready(function () {
    
    var $resources = [
        'ciudad', 'barrio', 'lugar', 'entidad_autorizacion', 'tipo_traslado', 
        'motivo_traslado', 'servicio_traslado', 'entidad_afiliacion', 
        'farmacia_traslado' /*, 'capitulo_cie10', 'subcapitulo_cie10', 'cie10' */
    ];
    
    var $resourcesCie10 = [ 'capitulo_cie10', 'subcapitulo_cie10', 'cie10' ];
    
    $downloadResource = function (index) {
        if (index < $resources.length) {
            if (!notesalud.resources[$resources[index]]) {
                var _idProcess = notesalud.process.add({
                    icon : 'download', text : 'Solicitando recurso "' + $resources[index] + '" en la plataforma NoteSalud+'
                });
                                
                notesalud.http.get({
                    url: notesalud.getRouteServices($resources[index]),
                    success: function (result) {
                        if (result.success) {
                            notesalud.database.set({ 
                                table: $resources[index], 
                                objects : result.data,
                                index : index,
                                idProcess : _idProcess,
                                download : $downloadResource,
                                cie10 : $resourcesCie10.indexOf($resources[index]) !== -1
                            });
                        }
                    },
                    failed: function (jqXHR) { 
                        notesalud.httpFailed({
                            idProcess : _idProcess, jqXHR : jqXHR,
                            text : 'Ocurrio un problema descargando datos de ' + $resources[index]
                        });
                    }
                });
            }
            
            else { $downloadResource((index + 1)); }
        }
    };
    
    $existsSessionServer = function () {
        jQuery('#notesalud-main').click(notesalud.process.open);
        notesalud.database.tables('create'); jQuery('.dropdown-button').dropdown(); 
        
        jQuery('.button-collapse').sideNav({ 
            menuWidth: 240, edge: 'left', closeOnClick: true 
        });

        (localStorage['resource_notesalud']) ?
            notesalud.resources = JSON.parse(localStorage['resource_notesalud']) :
            localStorage.setItem('resource_notesalud',JSON.stringify(notesalud.resources));

        $downloadResource(0); // Inicio de descarga de los Recursos
    };
    
    $processAllowed = function (permisos) {
        // No tiene permiso a los procesos del Administrativo
        if (!permisos.administrativo) jQuery('#menu-administrativo').remove();
        
        // No tiene permiso a los procesos del Admisionista
        if (!permisos.admision) jQuery('#menu-admision').remove();
        
        // No tiene permiso a los procesos del Coordinador
        if (!permisos.coordinacion) jQuery('#menu-coordinacion').remove();
        
        // No tiene permiso a los procesos del Ingeniero
        if (!permisos.sistemas) jQuery('#menu-sistemas').remove();
    };
    
    var $home = {
        start : function () {
            notesalud.startComponent(); // Inicializando componentes
            
            notesalud.http.get({
                url: notesalud.getRouteServices('trasladoOnline'),
                success: function (result) {
                    if (result.success) {
                        jQuery.ajaxSetup({ headers: { 'X-CSRF-TOKEN' : result.data.token } });
                        
                        notesalud.session = result.data; jQuery('body').view(true); 
                        var $permisos = notesalud.session.permisos; 
                        $processAllowed($permisos); $existsSessionServer(); 
                        
                        if ($permisos.admision || $permisos.coordinacion) {
                            notesalud.websocket.connection();
                        } // Debe enlazarse con el Socket de la Plataforma
                    }
                    
                    else {
                        softtion.redirect(notesalud.getRouteForms('traslado_accesscontrol'));
                    } // No tiene sesión iniciada en la Plataforma
                },
                failed: function () { 
                    softtion.redirect(notesalud.getRouteForms('traslado_accesscontrol'));
                }
            });
        },
        
        close : function () { 
            jQuery('#error-server').view(false); jQuery('body').css({ overflow : 'visible'});
        },
        
        closeSession : function () {
            notesalud.http.delete({
                url: notesalud.getRouteServices('trasladoAccess'),
                success: function (result) {
                    if (result.success) {
                        notesalud.websocket.disconnection();
                        softtion.redirect(notesalud.getRouteForms('traslado_accesscontrol'));
                    } // No tiene sesión iniciada en la Plataforma
                },
                failed: function () { 
                    notesalud.websocket.disconnection();
                    softtion.redirect(notesalud.getRouteForms('traslado_accesscontrol'));
                }
            });
        },
        
        cleanDatabase : function () {
            notesalud.database.tables('clean'); localStorage.removeItem('resource_notesalud');
            notesalud.toast('Base de datos Local limpiada exitosamente');
        },
        
        connectSocket : function () {
            if (!notesalud.websocket.isConnect()) {
                if (notesalud.websocket.readyState() !== WebSocket.CONNECTING) {
                    notesalud.websocket.connection();
                } // Realizando conexión con el Servidor Socket
                
                else {
                    notesalud.toast('Actualmente se esta tratando de conectarse con el Socket');
                } // Se esta intentando conectar con el Socket
            } // Cliente no esta conectado al Socket
            
            else {
                notesalud.toast('Actualmente ya existe una conexión establecida con el Socket');
            } // Cliente esta conectado al Socket
        }
    };

    notesalud.start.form($home.start); // Iniciando página
    jQuery('#close-error-message').click($home.close);
    jQuery('#item-close-session').click($home.closeSession);
    jQuery('#item-clean-database').click($home.cleanDatabase);
    jQuery('.item-home').click(notesalud.deploy.form);
    jQuery('#item-connect-socket').click($home.connectSocket);
    
    jQuery(document).on('keyup', '.notesalud .collapsible-body textarea', 
        function () {
            var _countCharacter = jQuery(this).val().length; // Cantidad de carácteres
            jQuery(this).parent().parent().prev().find('span').html(_countCharacter);
        }
    );
});