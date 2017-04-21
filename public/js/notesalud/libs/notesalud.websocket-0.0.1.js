

/* 
 * ==============================================
 * NoteSalud+ WebSocket v0.0.1
 * ==============================================
 * Author: Daniel Andres Castillo Pedroza
 * Author: Fabián Andrés Urrego Bohórquez
 * Created: 29 de septiembre de 2015
 * Location: Valledupar, Cesar, Colombia
 * ==============================================
 */

/* global notesalud, WebSocket */

(function (notesalud) {
    
    var socket = undefined; // Objeto para manejar conexión WebSocket
    
    $receiveNotification = function (functionNotification, object) {
        if (functionNotification) functionNotification(object);
    };
    
    // Estructura para definir código de procesos y subprocesos del WebSocket
    
    var CodeProcess = {
        CONNECTION : 1,
        ADMISION : 3,
        COORDINADOR : 4,
        
        Sub : {
            Connection : { 
                ME : 0, USER : 1 
            },
            Admision : {
                NEW_ADMISION : 1
            },
            Coordinador : {
                NEW_ADMISION : 1, 
                NEW_ASIGNACION : 2,
                UPDATE_TRASLADO : 3
            }
        }
    };
    
    $connection = function (notification) {
        switch (notification.sub_process) {
            case (CodeProcess.Sub.Connection.ME) : 
                notesalud.toast(notification.data.message); 
            break;
        
            case (CodeProcess.Sub.Connection.USER) : 
                $receiveNotification(notesalud.socket.connection.user, notification);
            break;
        }
    };
    
    $admision = function (notification) {
        switch (notification.sub_process) {
            case (CodeProcess.Sub.Admision.NEW_ADMISION) :
                $receiveNotification(notesalud.socket.admision.newAdmision, notification);
            break;
        }
    };
    
    $coordinador = function (notification) {
        switch (notification.sub_process) {
            case (CodeProcess.Sub.Coordinador.NEW_ADMISION) : 
                $receiveNotification(notesalud.socket.coordinacion.newAdmision, notification);
            break;
            
            case (CodeProcess.Sub.Coordinador.NEW_ASIGNACION) : 
                $receiveNotification(notesalud.socket.coordinacion.newAsignacion, notification);
            break;
            
            case (CodeProcess.Sub.Coordinador.UPDATE_TRASLADO) : 
                $receiveNotification(notesalud.socket.coordinacion.updateTraslado, notification);
            break;
        }
    };
    
    function NoteSaludWebSocket() {};
    
    NoteSaludWebSocket.prototype.connection = function () {
        var _soppurt = ('MozWebSocket' in window) ? 'MozWebSocket' : ('WebSocket' in window ? 'WebSocket' : null);
        
        if (_soppurt) {
            if (socket === undefined || socket.readyState !== WebSocket.OPEN) {
                jQuery('#item-status-socket').html('Conectando con Socket...');
                socket = new WebSocket('ws://localhost:9091/notesalud-socket');
                //socket = new WebSocket('ws://181.49.36.162:1017/notesalud-socket');
        
                socket.onopen = function () {
                    jQuery('#item-status-socket').html('Socket conectado');
                    
                    var $proceso = {
                        code : '1', // Registrar conexión con el Socket
                        data : {
                            session : {
                                id : notesalud.session.usuario.id,
                                usuario : notesalud.session.usuario.nombre,
                                identificacion : notesalud.session.personal.documento,
                                nombre : notesalud.session.personal.nombre
                            },

                            sedes : notesalud.session.sedes,
                            tipo : 'usuario',
                            permisos : notesalud.session.permisos
                        } // Objeto para establecer conexión
                    };

                    socket.send(JSON.stringify($proceso));
                };

                socket.onmessage = function (event) {
                    console.log(event.data); 
                    var $notification = JSON.parse(event.data); // Notificación del Servidor

                    switch ($notification.code) {
                        case (CodeProcess.CONNECTION) : $connection($notification); break; 
                        
                        case (CodeProcess.ADMISION) : $admision($notification); break;
                            
                        case (CodeProcess.COORDINADOR) : $coordinador($notification); break;
                    }
                };

                socket.onclose = function () {
                    jQuery('#item-status-socket').html('Socket sin conexión');
                    console.log('Servidor a desconectado'); 
                };

                socket.onerror = function () {
                    jQuery('#item-status-socket').html('Socket sin conexión');
                    console.log('Servidor a desconectado por error'); 
                };
            } // El socket no se encuentra en linea
        } 
        
        else {
            notesalud.toast('El navegador del dispositivo no soporta WebSocket');
        }
    };
    
    NoteSaludWebSocket.prototype.send = function (message) {
        if (this.isConnect()) { socket.send(message); }
        
        else { notesalud.toast('No hay conexión con el Socket'); }
    };
    
    NoteSaludWebSocket.prototype.isConnect = function () {
        return (socket !== undefined && socket.readyState === WebSocket.OPEN);
    };
    
    NoteSaludWebSocket.prototype.readyState = function () {
        return socket.readyState;
    };
    
    NoteSaludWebSocket.prototype.disconnection = function () {
        socket.close();
    };
    
    notesalud.websocket = new NoteSaludWebSocket();
})(notesalud);