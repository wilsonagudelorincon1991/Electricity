
/* global notesalud, softtion */

jQuery(document).ready(function() {
    
    var $component, $traslado, $movil, $movilesSede;
    var $movilesCoordinador, $tiposTraslado, $loaderMovil = true;
    
    var $sidenavAssign, $sidenavCancel, $sidenavFailed, $sidenavUpdate;
    var $selectorFecha, $fechaTraslado, $horaTraslado;
    
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
            case ('10') : return 'FALLIDO SIN AUTORIZAR';
            default : return 'DESCONOCIDO';
        }
    }; 
    
    $downloadMoviles = function () {
        jQuery('#item-download-moviles').addClass('failed').removeClass('success');
        
        notesalud.http.get({
            url : notesalud.getRouteServices('trasladoCoordinacion') + '/movil',
            success : function (result) { 
                if (result.success) {
                    $movilesCoordinador = result.data; // Lista de moviles del coordinador
                    jQuery('#item-download-moviles').addClass('success').removeClass('failed');
                } // Lista de móviles de las sedes del Coordinador

                else {
                    notesalud.toast('No se pudo descargar móviles del Coordinador');
                }
            },
            failed : function (jqXHR) { 
                notesalud.httpFailed({
                    idProcess : undefined, jqXHR : jqXHR,
                    text : 'Ocurrio un error al tratar de descargar móviles del Coordinador'
                });
            }
        });
    };   
    
    $downloadTraslados = function () {
        notesalud.http.get({
            url : notesalud.getRouteServices('trasladoCoordinacion'),
            success : function (result) { 
                if (result.success) {
                    jQuery('#item-download-traslados').addClass('success').removeClass('failed');
                    $component.set('traslados',result.data); $component.paint(); 
                    jQuery('#lst-traslados').view(true); setInterval(function(){ $component.paint(); }, 60000); 
                    
                    if ($loaderMovil) { setTimeout($downloadMoviles,3000); }
                } // Lista de traslados para asignar

                else {
                    notesalud.toast('Ocurrio un error al tratar de descargar Traslados');
                }

                jQuery('#preloader-coordinador').view(false); $loaderMovil = false;
            },
            failed : function (jqXHR) { 
                jQuery('#preloader-coordinador').view(false); $loaderMovil = false;

                notesalud.httpFailed({
                    idProcess : undefined, jqXHR : jqXHR,
                    text : 'Ocurrio un error al tratar de descargar Traslados'
                });
            }
        });
    };
    
    $assignMovil = function (traslado, idSede) {
        if ($movilesCoordinador) {
            $movil = undefined; $traslado = traslado; // Traslado seleccionado
            jQuery('#txt-tipo-traslado').value(traslado.tipo_traslado.nombre);
            jQuery('#txt-ficha-traslado').value(traslado.id);
            var _movil = (traslado.movil) ? traslado.movil.nombre : 'S/N';
            jQuery('#txt-movil-traslado').value(_movil);
            jQuery('#txt-movil-assign').value('S/N');
            jQuery('#txt-alcance-traslado').value(traslado.alcance);
            jQuery('#txt-estado-traslado').value($statusTraslado(traslado.estado));

            // Cargando la lista de moviles
            jQuery('#lst-moviles').empty(); $movilesSede = $movilesCoordinador[idSede];

            jQuery.each($movilesSede, function (key, movil) {
                if (movil.tipos_traslado.indexOf(traslado.tipo_traslado.id) !== -1) {
                    var $compMovil = new HtmlComponent('li');
                    $compMovil.addAttribute('data-index',key);
                    $compMovil.addClass(['collection-item','select-movil']);
                    $compMovil.addClass(['waves-effect','waves-blue']);
                    $compMovil.addClass(movil.estado); $compMovil.setText(movil.nombre);

                    jQuery('#lst-moviles').append($compMovil.create());
                } // La móvil puede realizar este tipo de traslado
            });

            jQuery('.select-movil').click(function () {
                var _index = jQuery(this).data('index'); $movil = $movilesSede[_index]; 
                jQuery('#txt-movil-assign').value($movil.nombre); // Movil seleccionada
            });
        } // Ya se han cargado las móviles administradas por el Coordinador
        
        else {
            notesalud.toast('No se han cargado las móviles administradas por el Coordinador');
        } // No se han cargado las móviles administradas por el Coordinador
    };
    
    $cancelTraslado = function (traslado) {
        $traslado = traslado; // Traslado seleccionado para cancelar
        jQuery('#txt-cancel-traslado').value(traslado.id);
        jQuery('#txt-cancel-tipo').value(traslado.tipo_traslado.nombre_abreviado);
    };
    
    $failedTraslado = function (traslado) {
        $traslado = traslado; // Traslado seleccionado para fallar
        jQuery('#btn-cancel-failed').view($traslado.estado === '10');
        
        if ($traslado.estado === '10') {
            jQuery('#txt-failed-persona').value($traslado.fallido.nombre_contacto);
            jQuery('#txt-failed-telefono').value($traslado.fallido.telefono_contacto);
            jQuery('#txt-failed-motivo').value($traslado.fallido.motivo);
        } // Solo se debe confirmar el reporte del Fallido
        
        jQuery('#txt-failed-traslado').value(traslado.id);
        jQuery('#txt-failed-tipo').value(traslado.tipo_traslado.nombre_abreviado);
    };
    
    $updateTraslado = function (traslado) {
        $traslado = traslado; // Traslado seleccionado para actualizar
        var $fechahoraTraslado = softtion.DateTime.createOfPHP(traslado.fechahora_traslado);
        $selectorFecha.set('select',new Date($fechahoraTraslado));
        jQuery('#txt-update-traslado').value(traslado.id);
        jQuery('#txt-update-tipo').value(traslado.tipo_traslado.nombre_abreviado);
        jQuery('#txt-update-fecha').value($fechahoraTraslado.description('ww, dd de mn del aa'));
        jQuery('#txt-update-hora').value($fechahoraTraslado.description('hz:ii zz'));
    };
    
    $eventsComponent = function () {
        jQuery('#pane-asignacion').on('click','#btn-assing-movil', function () {
            if ($traslado.estado === '8') {
                notesalud.toast('No se puede hacer asignación a un Traslado cancelado'); return;
            } // El traslado se encuentra cancelado

            if (!$movil) {
                notesalud.toast('No ha seleccionado móvil para asignar al Traslado'); return;
            } // No ha seleccionado móvil

            if (($traslado.movil) && $movil.id_usuario === $traslado.movil.id) {
                notesalud.toast('La móvil seleccionada es la actual asignada al Traslado'); return;
            } // La móvil seleccionada es la del traslado

            notesalud.verify.open({ 
                text : '¿Desea ejecutar el proceso de asignación de móvil al Traslado?',
                accept : function () {
                    var _idProcess = notesalud.process.add({
                        icon : 'action', 
                        text : 'Asignando traslado ' + $traslado.id + ' a la móvil ' + $movil.nombre
                    });

                    notesalud.http.post({
                        url : notesalud.getRouteServices('trasladoCoordinacion'),
                        data : {
                            asignacion : {
                                id_traslado_admision : $traslado.id,
                                id_movil_usuario : $movil.id_usuario
                            },
                            nombre_movil : $movil.nombre
                        },
                        success : function (result) {
                            if (result.success) {
                                var _is = ['1','2','3'].indexOf($traslado.estado);
                                $traslado.estado = (_is !== -1) ? '2' : $traslado.estado;
                                $traslado.movil = $movil; $component.paint();
                                notesalud.toast('Se realizó la asignación de móvil al traslado ' + $traslado.id);
                            } // Admision registrada correctamente

                            else {
                                notesalud.toast('No se realizó la asignación de móvil al traslado ' + $traslado.id);
                            } // Admision no registrada correctamente

                            notesalud.process.finish({
                                id: _idProcess, text : result.message, result : result.success
                            });
                        },
                        failed : function (jqXHR) {
                            notesalud.httpFailed({
                                idProcess : _idProcess, jqXHR : jqXHR,
                                text : 'Ocurrio un error para asignar móvil al traslado ' + $traslado.id
                            });
                        }
                    });
                }
            });
        });
        
        jQuery('#pane-asignacion').on('click','#btn-assing-cancel', function () { $sidenavAssign.hide(); });
        
        jQuery('#pane-asignacion').on('click','#btn-cancel-traslado', function () {
            if ($traslado.estado === '8') {
                notesalud.toast('El traslado seleccionado ya se encuentra Cancelado'); return;
            } // Ya esta cancelado
            
            var $inputs = jQuery('#component-cancel-traslado .data-cancel');
            var $validate = $inputs.validateInput();
            
            if ($validate.success) {
                var $data = $inputs.createJSON(); 
                
                notesalud.verify.open({ 
                    text : '¿Desea ejecutar proceso para cancelar el Traslado?',
                    accept : function () {
                        $data['proceso'] = 'cancelado'; $data['id_traslado'] = $traslado.id;
                        var _idProcess = notesalud.process.add({
                            icon : 'action', 
                            text : 'Cancelando traslado ' + $traslado.id + ' en la Plataforma'
                        });

                        notesalud.http.put({
                            url : notesalud.getRouteServices('trasladoCoordinacion'),
                            data : $data,
                            success : function (result) {
                                if (result.success) {
                                    $traslado.estado = '8'; $component.paint();
                                    notesalud.toast('Se realizó cancelación de Traslado ' + $traslado.id);
                                } // Se ejecuto asignación de Servicio

                                else {
                                    notesalud.toast('No se realizó cancelación de Traslado ' + $traslado.id);
                                } // No se ejecuto asignación de Servicio

                                notesalud.process.finish({
                                    id: _idProcess, text : result.message, result : result.success
                                });
                            },
                            failed : function (jqXHR) { 
                                notesalud.httpFailed({
                                    idProcess : _idProcess, jqXHR : jqXHR,
                                    text : 'Ocurrio un error al tratar de cancelar Traslado ' + $traslado.id
                                });
                            }
                        });
                    }
                });
            } // Ha pasado la prueba
        });
        
        jQuery('#pane-asignacion').on('click','#btn-close-cancel', function () { $sidenavCancel.hide(); });
        
        jQuery('#pane-asignacion').on('click','#btn-failed-traslado', function () {
            if ($traslado.estado === '9') {
                notesalud.toast('El traslado seleccionado ya se encuentra Fallido'); return;
            } // Ya esta reportado como fallido
            
            var $inputs = jQuery('#component-failed-traslado .data-failed');
            var $validate = $inputs.validateInput();
            
            if ($validate.success) {
                var $data = $inputs.createJSON(); 
                
                notesalud.verify.open({ 
                    text : '¿Desea ejecutar proceso para establecer traslado como fallido?',
                    accept : function () {
                        $data['proceso'] = 'fallido'; $data['id_traslado'] = $traslado.id;
                        var _idProcess = notesalud.process.add({
                            icon : 'action', 
                            text : 'Estableciendo traslado ' + $traslado.id + ' como fallido en la Plataforma'
                        });

                        notesalud.http.put({
                            url : notesalud.getRouteServices('trasladoCoordinacion'),
                            data : $data,
                            success : function (result) {
                                if (result.success) {
                                    $traslado.estado = '9'; $component.paint();
                                    notesalud.toast('Se reportó traslado ' + $traslado.id + ' como fallido');
                                } // Se ejecuto asignación de Servicio

                                else {
                                    notesalud.toast('No se realizó reporte de fallido del Traslado ' + $traslado.id);
                                } // No se ejecuto asignación de Servicio

                                notesalud.process.finish({
                                    id: _idProcess, text : result.message, result : result.success
                                });
                            },
                            failed : function (jqXHR) { 
                                notesalud.httpFailed({
                                    idProcess : _idProcess, jqXHR : jqXHR,
                                    text : 'Ocurrio un error al tratar de reportar como fallido del Traslado ' + $traslado.id
                                });
                            }
                        });
                    }
                });
            } // Ha pasado la prueba
        });
        
        jQuery('#pane-asignacion').on('click','#btn-cancel-failed', function () {
            if ($traslado.estado === '9') {
                notesalud.toast('El traslado seleccionado ya se encuentra Fallido'); return;
            } // Ya esta reportado como fallido
            
            notesalud.verify.open({ 
                text : '¿Desea cancelar proceso para establecer traslado como fallido?',
                accept : function () {
                    var _idProcess = notesalud.process.add({
                        icon : 'action', 
                        text : 'Cancelando proceso de fallido para traslado ' + $traslado.id + ' en la Plataforma'
                    });

                    notesalud.http.put({
                        url : notesalud.getRouteServices('trasladoCoordinacion'),
                        data : {
                            proceso : 'cancelar_fallido', 'id_traslado' : $traslado.id
                        },
                        success : function (result) {
                            if (result.success) {
                                $traslado.estado = result.data; $traslado.fallido = null; $component.paint();
                                notesalud.toast('Se canceló reporte de traslado ' + $traslado.id + ' como fallido');
                            } // Se ejecuto asignación de Servicio

                            else {
                                notesalud.toast('No se realizó cancelación de reporte de fallido del Traslado ' + $traslado.id);
                            } // No se ejecuto asignación de Servicio

                            notesalud.process.finish({
                                id: _idProcess, text : result.message, result : result.success
                            });
                        },
                        failed : function (jqXHR) { 
                            notesalud.httpFailed({
                                idProcess : _idProcess, jqXHR : jqXHR,
                                text : 'Ocurrio un error al tratar de cancelar reporte de fallido del Traslado ' + $traslado.id
                            });
                        }
                    });
                }
            });
        });
        
        jQuery('#pane-asignacion').on('click','#btn-close-failed', function () { $sidenavFailed.hide(); });
        
        jQuery('#pane-asignacion').on('click','#btn-set-fecha-traslado', function () {
            if (softtion.isUndefined($fechaTraslado) || softtion.isUndefined($horaTraslado)) {
                notesalud.toast('Debe seleccionar fecha y hora nueva a asignar'); return;
            } // No ha establecido fecha y hora de traslado nueva a asignar
            
            var $fechahoraNueva = softtion.DateTime.merge($fechaTraslado,$horaTraslado).php();
            
            notesalud.verify.open({ 
                text : '¿Desea actualizar la fecha y hora de atención del traslado?',
                accept : function () {
                    var _idProcess = notesalud.process.add({
                        icon : 'action', 
                        text : 'Actualizando fecha del traslado ' + $traslado.id + ' en la Plataforma'
                    });

                    notesalud.http.put({
                        url : notesalud.getRouteServices('trasladoCoordinacion'),
                        data : {
                            proceso : 'cambiar_fecha', 'id_traslado' : $traslado.id,
                            fechahora_nueva : $fechahoraNueva
                        },
                        success : function (result) {
                            if (result.success) {
                                switch (result.data) {
                                    case ('UDR') :
                                        if (!softtion.isUndefined($traslado.retorno)) 
                                            $traslado.retorno.fechahora_retorno = $fechahoraNueva;
                                    break; // Actualizando la fecha de retorno

                                    case ('UDT') :
                                        $traslado.fechahora_traslado = $fechahoraNueva;
                                    break; // Actualizando la fecha de atencion
                                }
                                
                                
                                $component.paint();
                                notesalud.toast('Se actualizo fecha y hora del ' + $traslado.id + ' exitosamente');
                            } // Se ejecuto asignación de Servicio

                            else {
                                notesalud.toast('No se realizó cambio de fecha y hora del Traslado ' + $traslado.id);
                            } // No se ejecuto asignación de Servicio

                            notesalud.process.finish({
                                id: _idProcess, text : result.message, result : result.success
                            });
                        },
                        failed : function (jqXHR) { 
                            notesalud.httpFailed({
                                idProcess : _idProcess, jqXHR : jqXHR,
                                text : 'Ocurrio un error al tratar de cambiar fecha y hora del Traslado ' + $traslado.id
                            });
                        }
                    });
                }
            });
        });
    };
    
    var $registroAsignacion = {
        start : function () {
            notesalud.database.search({
                table : 'tipo_traslado', type : 'all', 
                setList : function (tiposTraslados) { $tiposTraslado = tiposTraslados; }
            });
            
            $component = jQuery('#lst-traslados').trasladosCoordinacion();
            $component.set('sede',notesalud.session.sedes[0]);
            $component.set('alcance','TODOS LOS SERVICIOS'); $component.set('tipo',undefined);
            $component.set('lugar',undefined); $component.set('estado','T');
            
            $sidenavAssign = jQuery('#pane-asignacion').containerNoteSalud({ id : 'sidenav-assign-traslado' });
            $sidenavAssign.deployComponent({ nameComponent : 'asignarTraslado' }); 
            
            $sidenavCancel = jQuery('#pane-asignacion').containerNoteSalud({ id : 'sidenav-cancel-traslado' });
            $sidenavCancel.deployComponent({ nameComponent : 'cancelarTraslado' }); 
            
            $sidenavFailed = jQuery('#pane-asignacion').containerNoteSalud({ id : 'sidenav-failed-traslado' });
            $sidenavFailed.deployComponent({ nameComponent : 'fallarTraslado' }); 
            
            $sidenavUpdate = jQuery('#pane-asignacion').containerNoteSalud({ id : 'sidenav-update-traslado' });
            $sidenavUpdate.deployComponent({ 
                nameComponent : 'actualizarTraslado',
                after : function () {
                    jQuery('#dtp-act-fecha-traslado').date({ 
                        selectMonths: true, selectYears: true,
                        container : 'body',
                        onSet: function (date) {
                            if (date.select) {
                                jQuery('#dtp-act-fecha-traslado').parent().inputSuccess();
                                $fechaTraslado = new Date(date.select); this.close();
                            }
                        },
                        onStart : function () { $selectorFecha = this; }
                    });
                    
                    jQuery('#clk-act-hora-traslado').clock({
                        setTime : function (time) { 
                            $horaTraslado = time; jQuery('#clk-act-hora-traslado').parent().inputSuccess();
                        }
                    });
                }
            }); 
            
            $eventsComponent(); setTimeout($downloadTraslados,1000); 
            jQuery('#btn-assing').sideNav({ menuWidth: 320, edge: 'right' }); 
            jQuery('#btn-cancel').sideNav({ menuWidth: 320, edge: 'right' }); 
            jQuery('#btn-failed').sideNav({ menuWidth: 320, edge: 'right' }); 
            jQuery('#btn-update').sideNav({ menuWidth: 320, edge: 'right' }); 
            
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
                notesalud.sidenav[_sideNav] = jQuery('#pane-asignacion').containerNoteSalud({ id : _id });
            });
            
            jQuery('.searcher').sideNav({ menuWidth: 320, edge: 'right', closeOnClick: true });
            
            jQuery('.searcher').focusin(function () { 
                var $sideNav = jQuery(this).data('sidenav'); jQuery(this).click(); 
                var _nameComponent = jQuery(this).data('component');
                notesalud.sidenav[$sideNav].deployComponent({ 
                    nameComponent : _nameComponent,
                    trigger : jQuery(this).attr('id'),
                    isLoad : function (component) {
                        jQuery(component).find('input:first').focus();
                    }
                }); 
            });
            
            notesalud.selector.lugar = function (lugar) { 
                notesalud.inputSuccess(jQuery('#txt-lugar-filtro'),lugar.nombre); 
                jQuery('#btn-clean-lugar').view(true); 
                $component.set('lugar',lugar); $component.paint();
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
        
        assignMovil : function () {
            var $traslado = $component.get('traslado'); // Traslado seleccionado
            var _idSede = $component.get('id_sede');    // Id de Sede de Traslado
            
            jQuery('.txt-assign-traslado').clean(); jQuery('#lst-moviles').empty();
            
            if ($traslado !== undefined) { 
                $assignMovil($traslado,_idSede); 
            } // Cargando datos de traslado seleccionado en el componente
            
            else {
                notesalud.toast('No ha seleccionado traslado para realizar Asignación');
            } // No ha seleccionado traslado para hacer asignación
        },
        
        cancelTraslado : function () {
            var $traslado = $component.get('traslado'); jQuery('.txt-cancel-traslado').clean();
            
            if ($traslado !== undefined) {
                $cancelTraslado($traslado);
            } // Cargando datos de traslado seleccionado en el componente
            
            else {
                notesalud.toast('No ha seleccionado traslado para realizar Cancelación');
            } // No ha seleccionado traslado para hacer cancelación
        },
        
        failedTraslado : function () {
            var $traslado = $component.get('traslado'); jQuery('.txt-failed-traslado').clean();
            
            if ($traslado !== undefined) {
                $failedTraslado($traslado);
            } // Cargando datos de traslado seleccionado en el componente
            
            else {
                notesalud.toast('No ha seleccionado traslado para reportar como Fallido');
            } // No ha seleccionado traslado para reportar como fallido
        },
        
        updateTraslado : function () {
            var $traslado = $component.get('traslado'); jQuery('.txt-update-traslado').clean();
            
            if ($traslado !== undefined) {
                $updateTraslado($traslado);
            } // Cargando datos de traslado seleccionado en el componente
            
            else {
                notesalud.toast('No ha seleccionado traslado para actualizarlo');
            } // No ha seleccionado traslado para reportar como fallido
        },
        
        downloadTraslados : function () {
            jQuery('#preloader-coordinador').view(true); 
            jQuery('#lst-traslados').view(false); $downloadTraslados();
        },
        
        downloadMoviles : function () { $downloadMoviles(); },
        
        cleanLugar : function () {
            jQuery(this).view(false); jQuery('#txt-lugar-filtro').clean();
            $component.set('lugar',undefined); $component.paint();
        },
        
        cleanTipo : function () {
            jQuery(this).view(false); jQuery('#txt-tipo-filtro').clean();
            $component.set('tipo',undefined); $component.paint();
        }
    };
    
    notesalud.start.form($registroAsignacion.start); // Inicializando página
    jQuery('#btn-assing').click($registroAsignacion.assignMovil);
    jQuery('#btn-cancel').click($registroAsignacion.cancelTraslado);
    jQuery('#btn-failed').click($registroAsignacion.failedTraslado);
    jQuery('#btn-update').click($registroAsignacion.updateTraslado);
    jQuery('#item-download-traslados').click($registroAsignacion.downloadTraslados);
    jQuery('#item-download-moviles').click($registroAsignacion.downloadMoviles);
    jQuery('#btn-clean-tipo').click($registroAsignacion.cleanTipo);
    jQuery('#btn-clean-lugar').click($registroAsignacion.cleanLugar);
});