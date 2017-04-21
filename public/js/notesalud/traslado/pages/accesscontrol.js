
/* global notesalud, softtion */

jQuery(document).ready(function () {
    
    $enabledComponents = function (enabled) {
        jQuery('.login-component').readOnly(!enabled); jQuery('#btn-access-control div').view(!enabled); 
        jQuery('#btn-access-control span').view(enabled); 
    };
    
    var $controlAcceso = {
        start : function () { jQuery('.text-control').textControl(); },
        
        startSession : function () {
            var $validate = jQuery('.required-field').validateInput();
            
            if ($validate.success) {
                $enabledComponents(false); // Desactivando componentes
                
                notesalud.http.post({
                    url : notesalud.getRouteServices(notesalud.services.traslado.accessControl),
                    data : jQuery('.usuario').createJSON(),
                    success : function (result) {
                        if (result.success) {
                            softtion.redirect(notesalud.getRouteForms('traslado_home'));
                        } // Iniciando sesión
                        
                        else {
                            notesalud.toast(result.message); $enabledComponents(true);
                        } // Error de contraseña o usuario no existe
                    },
                    failed : function (jqXHR) { 
                        $enabledComponents(true); // Activando componentes
                        
                        notesalud.httpFailed({
                            jqXHR : jqXHR, text : 'Ocurrio un problema al iniciar sesión'
                        });
                    }
                });
            }
        }
    };
    
    notesalud.start.form($controlAcceso.start); // Inicializando página
    jQuery('#btn-access-control').click($controlAcceso.startSession);
});