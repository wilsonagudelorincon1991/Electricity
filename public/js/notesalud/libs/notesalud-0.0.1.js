
/* 
 * ==============================================
 * NoteSalud+ Web v0.0.1
 * ==============================================
 * Author: Daniel Andres Castillo Pedroza
 * Author: Fabián Andrés Urrego Bohórquez
 * Created: 31 de agosto de 2015
 * Location: Valledupar, Cesar, Colombia
 * ==============================================
 */

/* global Materialize, softtion */

var NoteSalud = function () { };

var notesalud = new NoteSalud();

(function (notesalud) {
    
    var $functionFailed = undefined; // Método cuando falla Petición
    
    $httpFailed = function (jqXHR) {
        console.log(jqXHR);
        
        switch (jqXHR.status) {
            case (500) : 
//                jQuery('body').css({ overflow : 'hidden'});
//                jQuery('#error-server-content').html(jqXHR.responseText); 
//                jQuery('#error-server').view(true); // Visualizando error
                var $container = jQuery('#sidenav-error-notesalud').find('.container');
                $container.html(jqXHR.responseText); jQuery('#error-notesalud').click();
            break; // Error interno en el Servidor
            
            case (503) :
                
            break;
            
            default : 
                switch (jqXHR.statusText) {
                    case ('timeout') :
                        notesalud.toast('El tiempo de respuesta de la petición agotado');
                    break;
                }
            break;
        }
        
        if ($functionFailed) { $functionFailed(jqXHR); }
    };
    
    var $ajaxDefault = {
        dataType: 'json',
        async: true,
        timeout : 20000,
        error : $httpFailed
    };
    
    var $optionsDefault = {
        url : undefined,
        data : { }, 
        success : function () {}, 
        failed : function () {}
    };
    
    selectorUndefined = function () {
        return {
            barrio : undefined,
            ciudad : undefined,
            motivoServicio : undefined,
            lugar : undefined,
            entidad : undefined,
            eps : undefined,
            diagnosticoTraslado : undefined,
            diagnostico : undefined,
            insumo : undefined,
            rangoFecha : undefined
        };
    };
    
    socketUndefined = function () {
        return {
            connection : {
                user : undefined
            },
            
            admision : {
                newAdmision : undefined
            },
            
            coordinacion : {
                newAdmision : undefined,
                newAsignacion : undefined,
                updateTraslado : undefined
            },
            
            desconnection : {
                user : undefined
            }
        };
    };
    
    routesNoteSalud = function () {
        return {
            traslado : {
                accessControl : 'trasladoAccess',
                online : 'trasladoOnline',
                movil : 'trasladoMovil',
                servicio : 'trasladoServicio'
            }
        };
    };
    
    //<editor-fold defaultstate="collapsed" desc="Atributos y Métodos para la gestión de API Rest, Formularios y Componentes">
    
    var $serverHost = 'http://localhost:9090/notesalud/public', $serviceV1 = '/api/v1';
    //var $serverHost = 'http://181.49.36.162:1016/notesalud/public', $serviceV1 = '/api/v1';
    
    $generateRouteServices = function () {
        // Préfijos de las rutas de servicios version 1.0
        var $rootV1 = $serverHost + $serviceV1;
        var $resourcesV1 = $serverHost + $serviceV1 + '/resources'; 
        var $trasladoV1 = $serverHost + $serviceV1 + '/traslado';
        
        return {
            // URI para recursos de traslados
            trasladoAccess : $trasladoV1 + '/accesscontrol',
            trasladoOnline : $trasladoV1 + '/accesscontrol/usuario/online',
            trasladoMovil : $trasladoV1 + '/movil',
            trasladoServicio : $trasladoV1,
            trasladoAdmision : $trasladoV1 + '/admision',
            trasladoCoordinacion : $trasladoV1 + '/coordinacion',
            
            // URI para gestionar recursos básicos
            barrio : $resourcesV1 + '/barrio',
            ciudad : $resourcesV1 + '/ciudad',
            entidadAutorizacion : $resourcesV1 + '/entidad_autorizacion',
            entidadAfiliacion : $resourcesV1 + '/entidad_afiliacion',
            farmaciaTraslado : $resourcesV1 + '/farmacia_traslado',
            lugar : $resourcesV1 + '/lugar',
            servicioTraslado : $resourcesV1 + '/servicio_traslado',
            tipoTraslado : $resourcesV1 + '/tipo_traslado',
            motivoTraslado : $resourcesV1 + '/motivo_traslado',
            capituloCie10 : $resourcesV1 + '/cie10/capitulo',
            subcapituloCie10 : $resourcesV1 + '/cie10/subcapitulo',
            cie10 : $resourcesV1 + '/cie10/diagnostico',
            
            paciente : $rootV1 + '/paciente',
            admision : $trasladoV1 + '/admision',
            coordinacion : $trasladoV1 + '/coordinacion'
        };
    };
    
    $generateRouteForms = function () {
        // Préfijos de las rutas para las páginas y formularios
        var $pageTraslado = $serverHost + '/traslado';
        var $formTraslado = $serverHost + '/forms/traslado';
        
        return {
            home : $serverHost, // Página de inicio
            
            // Páginas y formularios para la gestion de traslados
            trasladoAccessControl : $pageTraslado + '/accesscontrol',
            trasladoHome : $pageTraslado + '/home',
            
            registroAdmision : $formTraslado + '/registroadmision',
            
            registroAsignacion : $formTraslado + '/registroasignacion',
            seguimientoTraslado : $formTraslado + '/seguimiento_traslado',
            
            reporteTraslado : $formTraslado + '/reporte_traslado',
            
            gestionLocalDB : $formTraslado + '/gestion_bd_local',
            
            datosBasicosTraslado : $formTraslado + '/datosbasicos'
        };
    };
    
    $generateRouteComponents = function () {
        // Préfijos de las rutas para los componentes
        var _componentNotesalud = $serverHost + '/components/platform'; 
        var _componentTraslado = $serverHost + '/components/traslado'; 
        
        return {
            buscadorBarrios : _componentNotesalud + '/buscador_barrios',
            buscadorCiudades : _componentNotesalud + '/buscador_ciudades',
            buscadorDiagnosticos : _componentNotesalud + '/buscador_diagnosticos',
            buscadorEntidades : _componentNotesalud + '/buscador_entidades',
            buscadorEps : _componentNotesalud + '/buscador_eps',
            buscadorLugares : _componentNotesalud + '/buscador_lugares',
            selectorRangoFecha : _componentNotesalud + '/selector_rango_fecha',
            
            buscadorDiagnosticosTraslado : _componentTraslado + '/buscador_diagnosticos_traslado',
            buscadorInsumos : _componentTraslado + '/buscador_insumos',
            asignarTraslado : _componentTraslado + '/asignar_traslado',
            cancelarTraslado : _componentTraslado + '/cancelar_traslado',
            fallarTraslado : _componentTraslado + '/fallar_traslado',
            actualizarTraslado : _componentTraslado + '/actualizar_traslado'
        };
    };
    
    var $services = $generateRouteServices();       // API Rest
    var $pages = $generateRouteForms();             // Páginas
    var $forms = $generateRouteForms();             // Formularios
    var $components = $generateRouteComponents();   // Componentes
    
    notesalud.getRouteServices = function (service) {
        switch (service) {
            case (notesalud.services.traslado.accessControl) : return $services.trasladoAccess;
            case ('trasladoOnline') : return $services.trasladoOnline;
            case (notesalud.services.traslado.movil) : return $services.trasladoMovil;
            case ('trasladoAdmision') : return $services.trasladoAdmision;
            case ('trasladoCoordinacion') : return $services.trasladoCoordinacion;
            case ('trasladoServicio') : return $services.trasladoServicio;
                
            case ('ciudad') : return $services.ciudad;
            case ('barrio') : return $services.barrio;
            case ('lugar') : return $services.lugar;
            case ('farmacia_traslado') : return $services.farmaciaTraslado;
            case ('entidad_autorizacion') : return $services.entidadAutorizacion;
            case ('entidad_afiliacion') : return $services.entidadAfiliacion;
            case ('tipo_traslado') : return $services.tipoTraslado;
            case ('motivo_traslado') : return $services.motivoTraslado;
            case ('servicio_traslado') : return $services.servicioTraslado;
            case ('capitulo_cie10') : return $services.capituloCie10;
            case ('subcapitulo_cie10') : return $services.subcapituloCie10;
            case ('cie10') : return $services.cie10;
                
            case ('paciente') : return $services.paciente;
            case ('admision') : return $services.admision;
            case ('coordinacion') : return $services.coordinacion;
        }
    };
    
    notesalud.getRouteForms = function (form) { 
        switch (form) {
            case ('home') : return $forms.home; 
            
            case ('traslado_home') : return $forms.trasladoHome; 
            case ('traslado_accesscontrol') : return $forms.trasladoAccessControl; 
            
            case ('registroAdmision') : return $forms.registroAdmision; 
            
            case ('registroAsignacion') : return $forms.registroAsignacion; 
            case ('seguimientoTraslado') : return $forms.seguimientoTraslado; 
            case ('reporteTraslado') : return $forms.reporteTraslado; 
                
            case ('gestionLocalDB') : return $forms.gestionLocalDB; 
                
            case ('datosBasicosTraslado') : return $forms.datosBasicosTraslado; 
        }
    };
    
    notesalud.getRouteComponents = function (component) { 
        switch (component) {
            case ('buscadorBarrios') : return $components.buscadorBarrios; 
            case ('buscadorCiudades') : return $components.buscadorCiudades;
            case ('buscadorInsumos') : return $components.buscadorInsumos;
            case ('buscadorDiagnosticos') : return $components.buscadorDiagnosticos; 
            case ('buscadorEntidades') : return $components.buscadorEntidades; 
            case ('buscadorEps') : return $components.buscadorEps; 
            case ('buscadorDiagnosticosTraslado') : return $components.buscadorDiagnosticosTraslado; 
            case ('buscadorLugares') : return $components.buscadorLugares; 
            case ('buscadorMotivosTraslado') : return $components.buscadorMotivos;
            case ('selectorRangoFecha') : return $components.selectorRangoFecha;
            case ('actualizarTraslado') : return $components.actualizarTraslado;
            
            case ('asignarTraslado') : return $components.asignarTraslado;
            case ('cancelarTraslado') : return $components.cancelarTraslado;
            case ('fallarTraslado') : return $components.fallarTraslado;
        }
    };
    
    //</editor-fold>
    
    notesalud.session = undefined; // Usuario conectado
    
    notesalud.resources = {
        ciudad : false, 
        barrio : false,
        lugar : false,
        farmacia_traslado : false,
        entidad_autorizacion : false,
        entidad_afiliacion : false,
        tipo_traslado : false,
        motivo_traslado : false,
        servicio_traslado : false,
        capitulo_cie10 : false,
        subcapitulo_cie10 : false,
        cie10 : false
    }; // Recursos de NoteSalud
    
    notesalud.sidenav = {
        barrio : undefined,
        eps : undefined,
        entidad_autorizacion : undefined,
        lugar : undefined
    }; // Componentes sidenav de NoteSalud
    
    notesalud.start = {
        form : function (start) {
            // Removiendo componentes innecesarios
            jQuery('.autocomplete-suggestions').remove();
            jQuery('.materialize-clock-frame').remove();
            
            notesalud.selector = selectorUndefined(); 
            notesalud.socket = socketUndefined(); softtion.startPage(); 
        
            if (start) start(); // Cargando Página
        },
        
        component : function (start) {
            if (start) start(); // Cargando Componente
        }
    };
    
    notesalud.http = {
        post : function (options) {
            var $options = jQuery.extend({},$optionsDefault,options); 
            $options = jQuery.extend({},$ajaxDefault,$options); 
            $options = jQuery.extend({},{type: 'POST'},$options); 
            $functionFailed = $options.failed; // Función error
            
            return jQuery.ajax($options); // Ejecutando POST
        },
        
        get : function (options) {
            var $options = jQuery.extend({},$optionsDefault,options); 
            $options = jQuery.extend({},$ajaxDefault,$options); 
            $options = jQuery.extend({},{type: 'GET'},$options); 
            $functionFailed = $options.failed; // Función error
            
            return jQuery.ajax($options); // Ejecutando GET
        },
        
        put : function (options) {
            var $options = jQuery.extend({},$optionsDefault,options); 
            $options = jQuery.extend({},$ajaxDefault,$options); 
            $options = jQuery.extend({},{type: 'PUT'},$options); 
            $functionFailed = $options.failed; // Función error
            
            return jQuery.ajax($options); // Ejecutando PUT
        },
        
        delete : function (options) {
            var $options = jQuery.extend({},$optionsDefault,options); 
            $options = jQuery.extend({},$ajaxDefault,$options); 
            $options = jQuery.extend({},{type: 'DELETE'},$options); 
            $functionFailed = $options.failed; // Función error
            
            return jQuery.ajax($options); // Ejecutando DELETE
        }
    };
    
    notesalud.httpFailed = function (options) {
        if (options.jqXHR.getResponseHeader('error')) {
            var _message = "Error de tipo: " + options.jqXHR.getResponseHeader('error');
            _message += "<br>" + options.jqXHR.responseText + "<br>" + options.text;
            
            notesalud.message.open({ text : _message }); // Mostrando mensaje de error del Servidor
        } // Error capturado en el Servidor
        
        else { 
            notesalud.toast(options.text); // Notificación de proceso
        } // Error generado en el Servidor
        
        if (options.idProcess) {
            notesalud.process.finish({
                id: options.idProcess, result: false, text: options.text
            });
        }
    };
    
    notesalud.toast =  function (message) {
        Materialize.toast(message,4000,'rounded'); 
    };
    
    notesalud.container = {
        form : jQuery('#container-form'),           // Contenedor de formularios
        component : jQuery('#container-component')  // Contenedor de componentes
    };
    
    notesalud.inputSuccess = function (input, text) {
        input.value(text); input.parent().inputSuccess();
    };
    
    notesalud.processPane = jQuery('#background-pane');
    
    notesalud.selector = selectorUndefined();
    
    notesalud.socket = socketUndefined();
    
    notesalud.services = routesNoteSalud();
    
    notesalud.getNameServices = function () { return routesNoteSalud(); };
    
    notesalud.deployComponent = function (options) {
        var $options = jQuery.extend({}, options, {
            nameComponent : undefined, isLoader : undefined, after : undefined
        });
        
        var $container = notesalud.container.component;

        if ($container.data('component') !== $options.nameComponent) {
            var $component = $container.find('.component');
            var $preloader = $container.find('.preloader-component');
            $preloader.view(true); $component.view(false); 

            $component.deployComponent({
                url : notesalud.getRouteComponents($options.nameComponent),
                after : $options.after,
                before : function () { 
                    $preloader.view(false); $component.view(true); 
                    $container.data('component',$options.nameComponent);
                }
            });
        } // El componente para buscar no esta insertado

        else { 
            if ($options.isLoader !== undefined && typeof $options.isLoader === 'function') 
                $options.isLoader($container);
        } // El componente ya se encuentra insertado
    };
    
    notesalud.deploy = {
        form : function () {
            var _nameForm = jQuery(this).data('form'), $container = notesalud.container.form;

            if ($container.data('form') !== _nameForm) {
                $container.view(false); // Ocultando componente

                $container.deployComponent({
                    url : notesalud.getRouteForms(_nameForm),
                    before : function () { 
                        $container.view(true); $container.data('form',_nameForm);
                    }
                });
            } // El componente para buscar no esta insertado

            else { $container.find('input').first().focus(); }
        },
        
        component : function () {
            notesalud.deployComponent({
                nameComponent : jQuery(this).data('component'),
                isLoader : function (container) { 
                    container.find('input').first().focus();
                }
            });
        }
    };
})(notesalud);

/* 
 * ==============================================
 * Componentes de NoteSalud+ Web v1.0.0
 * ==============================================
 */

(function (notesalud) {
    
    // Componentes de la Aplicación NoteSalud+ Web
    
    notesalud.message = undefined;      // Modal para mensajes
    notesalud.verify = undefined;       // Modal para verificaciones
    notesalud.process = undefined;      // Modal para procesos
    notesalud.sideNavError = undefined; // Sidenav para cargar los errores
    
    // Función para inicializar los Componentes de NoteSalud+ Web
    
    notesalud.startComponent = function () {
        notesalud.message = jQuery('body').modalMessage();
        notesalud.verify = jQuery('body').modalVerify();
        notesalud.process = jQuery('body').modalProcess();
        
        notesalud.sideNavError = jQuery('body').containerNoteSalud({
            id : 'sidenav-error-notesalud' 
        }); // Sidenav para mostrar los error de NoteSalud+
        
        var $componentError = new HtmlComponent('div');
        $componentError.setId('div-error-notesalud');
        $componentError.addClass(['notesalud','row']);
        
        var $titleError = new HtmlComponent('div').addClass('header');
        $titleError.addComponent(
            new HtmlComponent('a').addClass(['icon', 'right']).
                addComponent(
                    new HtmlComponent('i').setId('btn-close-error-notesalud').
                        addClass('material-icons').setText('close')
                )
        );
        
        $titleError.addComponent(
            new HtmlComponent('p').addClass('title').setText('Error en el servidor')
        );
        
        $componentError.addComponent($titleError);
        $componentError.addComponent(new HtmlComponent('div').addClass('container'));
        notesalud.sideNavError.insertComponent($componentError.create());
        
        jQuery('#error-notesalud').sideNav({ menuWidth: 320, edge: 'rigth' });
        jQuery('#btn-close-error-notesalud').click(function () { notesalud.sideNavError.hide(); });
    };
})(notesalud);