
/* global notesalud, softtion */

jQuery(document).ready(function() {
    
    var $component, $tiposTraslado, $sidenavRangeDate;
    
    $statusTraslado = function (estado) {
        switch (estado) {
            case ('1') : return 'PENDIENTE';
            case ('2') : return 'ASIGNADO';
            case ('3') : return 'EN PROCESO';
            case ('4') : return 'PENDIENTE HISTORIA';
            case ('5') : return 'PENDIENTE RETORNO';
            case ('6') : return 'PENDIENTE TOTALMENTE';
            case ('7') : return 'EXITOSO';
            case ('8') : return 'CANCELADO';
            case ('9') : return 'FALLIDO';
            default : return 'DESCONOCIDO';
        }
    }; 
    
    $downloadTraslados = function (fechaInicial, fechaFinal) {
        notesalud.http.get({
            url : notesalud.getRouteServices('trasladoCoordinacion') + '/seguimiento',
            data : {
                fecha_inicial : fechaInicial.php(), fecha_final : fechaFinal.php()
            },
            success : function (result) { 
                if (result.success) {
                    $component.set('traslados',result.data); $component.paint(); 
                    jQuery('#lst-traslados').view(true); setInterval(function(){ $component.paint(); }, 60000); 
                } // Lista de traslados para asignar

                else {
                    notesalud.toast('Ocurrio un error al tratar de descargar Traslados');
                }

                jQuery('#preloader-coordinador').view(false);
            },
            failed : function (jqXHR) { 
                jQuery('#preloader-coordinador').view(false);

                notesalud.httpFailed({
                    idProcess : undefined, jqXHR : jqXHR,
                    text : 'Ocurrio un error al tratar de descargar Traslados'
                });
            }
        });
    };
    
    $eventsComponent = function () {
        
    };
    
    var $seguimientoTraslado = {
        start : function () {
            notesalud.database.search({
                table : 'tipo_traslado', type : 'all', 
                setList : function (tiposTraslados) { $tiposTraslado = tiposTraslados; }
            });
            
            $component = jQuery('#lst-traslados').trasladosCoordinacion();
            $component.set('sede',notesalud.session.sedes[0]);
            $component.set('alcance','TODOS LOS SERVICIOS'); $component.set('tipo',undefined);
            $component.set('lugar',undefined); $component.set('estado','A');
            
            $sidenavRangeDate = jQuery('#pane-seguimiento').containerNoteSalud({ id : 'sidenav-range-date' });
            $sidenavRangeDate.deployComponent({ nameComponent : 'selectorRangoFecha' }); 
            
            $eventsComponent(); jQuery('.tooltipped').tooltip();
            setTimeout(function () { $downloadTraslados(new Date(), new Date()); },1000); 
            jQuery('#item-range-date').sideNav({ menuWidth: 320, edge: 'right' }); 
            
            notesalud.session.sedes.forEach(function (sede) {
                var nombreSede = sede.nombre + " - " + sede.ciudad;
                jQuery('#slt-sede').selectOption(nombreSede);
            });
            
            jQuery('#slt-sede').select(function (item) {
                $component.set('sede',notesalud.session.sedes[item.index]); $component.paint();
            }); 
            
            jQuery('#slt-traslado').select(function (item) {
                $component.set('estado',item.value); $component.paint();
            });
            
            jQuery('#slt-alcance').select(function (item) {
                $component.set('alcance',item.text); $component.paint();
            });
            
            jQuery('.searcher').each(function (index, input) {
                var _sideNav = jQuery(input).data('sidenav'), _id = jQuery(input).data('activates');
                notesalud.sidenav[_sideNav] = jQuery('#pane-seguimiento').containerNoteSalud({ id : _id });
            });
            
            jQuery('.searcher').sideNav({ menuWidth: 320, edge: 'right', closeOnClick: true });
            
            jQuery('.searcher').focusin(function () { 
                var $sideNav = jQuery(this).data('sidenav'); jQuery(this).click(); 
                var _nameComponent = jQuery(this).data('component');
                notesalud.sidenav[$sideNav].deployComponent({ 
                    nameComponent : _nameComponent,
                    trigger : jQuery(this).attr('id'),
                    isLoad : function (component) { jQuery(component).find('input:first').focus(); }
                }); 
            });
            
            notesalud.selector.lugar = function (lugar) { 
                notesalud.inputSuccess(jQuery('#txt-lugar-filtro'),lugar.nombre); 
                jQuery('#btn-clean-lugar').view(true); 
                $component.set('lugar',lugar); $component.paint();
            };
            
            notesalud.selector.rangoFecha = function (inicial, final) {
                if (inicial.getTime() > final.getTime()) {
                    notesalud.toast('La fecha inicial no debe ser superior a la final'); return;
                } // Fecha inicial es mayor a la final en el Rango
                
                $sidenavRangeDate.hide(); jQuery('#preloader-coordinador').view(true);
                jQuery('#lst-traslados').view(false); $downloadTraslados(inicial, final); 
            };
            
            jQuery('#txt-tipo-filtro').autoComplete({
                minChars: 1,
                source: function (filter, suggest) {
                    filter = filter.toLowerCase(); var matches = [], indexs = [];
                    
                    jQuery.each($tiposTraslado, function (index, tipoTraslado) {
                        if (~tipoTraslado.nombre_abreviado.toLowerCase().indexOf(filter)) {
                            matches.push(tipoTraslado.nombre_abreviado); indexs.push(index); 
                        }
                    });
                    
                    suggest(matches, indexs); // Definiendo lista para Autocompletar
                },
                onSelect : function (index) { 
                    jQuery('#btn-clean-tipo').view(true); $component.set('tipo',$tiposTraslado[index]); $component.paint();
                }
            });
            
            notesalud.socket.coordinacion.newAdmision = function (notification) {
                notesalud.toast('Notificación: se ha registrado un nuevo traslado');
                $component.newAdmission(notification.data); // Nuevo traslado
            };
            
            notesalud.socket.coordinacion.newAsignacion = function (notification) {
                notesalud.toast('Notificación: se ha realizado asignación traslado');
                $component.newAssign(notification.data); // Nueva asignación
            };
            
            notesalud.socket.coordinacion.updateTraslado = function (notification) {
                $component.updateTraslado(notification.data); // Cambio de estado
            };
        },
        
        cleanLugar : function () {
            jQuery(this).view(false); jQuery('#txt-lugar-filtro').clean();
            $component.set('lugar',undefined); $component.paint();
        },
        
        cleanTipo : function () {
            jQuery(this).view(false); jQuery('#txt-tipo-filtro').clean();
            $component.set('tipo',undefined); $component.paint();
        }
    };
    
    notesalud.start.form($seguimientoTraslado.start); // Inicializando página
    jQuery('#btn-clean-tipo').click($seguimientoTraslado.cleanTipo);
    jQuery('#btn-clean-lugar').click($seguimientoTraslado.cleanLugar);
});