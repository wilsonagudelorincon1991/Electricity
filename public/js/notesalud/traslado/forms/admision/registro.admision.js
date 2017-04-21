
/* global notesalud, softtion, routes */

jQuery(document).ready(function () {
    // Atributos del paciente para Registro de Admisión
    var _idPaciente, _tipoDocumento = 'CC', _sexo = false, $barrio = { id : 0 }, $eps;
    
    // Atributos para realizar Busqueda de Paciente
    var $executeSearch, _documento = '', isSearcher = false, $paciente, _nombrePaciente; 
    
    // Atributos del traslado para Registro de Admisión
    var _alcance = 'LOCAL', $tiposTraslados = [], $tipoTraslado, $sede;
    var _tipoLugar = 'origen', $origen, $destino, _via = 'TERRESTRE';
    var $serviciosTraslado = [], $servicioTraslado, _estadoNap = 'PENDIENTE';
    var $entidadAutorizacion, $fechaTraslado, $horaTraslado, _tipoEdad = 'AÑOS';
    
    // Atributos para manejo de Horario del Admisionista
    var $horarios, $fechaHorario = new Date(), $sedeHorario, _jornada = 0, $horario;
    
    $inputSuccess = function (input, text) {
        input.value(text); input.parent().inputSuccess();
    };
    
    //<editor-fold defaultstate="collapsed" desc="Métodos para gestionar registro de Admisión">
    
    $setPaciente = function (paciente) {
        $paciente = paciente; // Estableciendo paciente encontrado
        _idPaciente = paciente.id; jQuery('.paciente').valueJSON($paciente);
        jQuery('#slt-documento').selectItem($paciente.tipo_documento);
        jQuery('#slt-sexo').selectItem(($paciente.sexo) ? 'F' : 'M');
        $barrio = $paciente.barrio; $eps = $paciente.entidad_afiliacion;
        jQuery('#txt-barrio-paciente').value($barrio.nombre + ' (' + $barrio.ciudad + ')');
    };
    
    $validateDataAdmision = function () {
        var $resultValidate = jQuery('.validate input').validateInput();
        var _message = "No se ha establecido este campo"; // Mensaje de error
        
        if ($resultValidate.success) {
            var _success = true; // Variable para ratificar validación
            
            if (!$eps) {
                _success = false; jQuery('#txt-entidad-afiliacion').parent().inputError(_message);
            } // No ha establecido Entidad de afilifacion del Paciente
            
            if (!$tipoTraslado) {
                _success = false; jQuery('#txt-tipo-traslado').parent().inputError(_message);
            } // No ha establecido Tipo de traslado
            
            if (!$servicioTraslado) {
                _success = false; jQuery('#txt-motivo-traslado').parent().inputError(_message);
            } // No ha establecido Motivo de traslado
            
            if (!$entidadAutorizacion) {
                _success = false; jQuery('#txt-entidad-autorizacion').parent().inputError(_message);
            } // No ha establecido Entidad que autoriza traslado
            
            if (!$fechaTraslado) {
                _success = false; jQuery('#dtp-fecha-traslado').parent().inputError(_message);
            } // No ha establecido Fecha de traslado
            
            if (!$horaTraslado) {
                _success = false; jQuery('#clk-hora-traslado').parent().inputError(_message);
            } // No ha establecido Hora de traslado
            
            if (!$origen) {
                _success = false; jQuery('#txt-origen').parent().inputError(_message);
            } // No ha establecido Origen de traslado
            
            if (!$destino) {
                _success = false; jQuery('#txt-destino').parent().inputError(_message);
            } // No ha establecido Destino de traslado
            
            return _success;
        } // Paso validación de datos textuales requeridos
        
        else { 
            $resultValidate.input.focus(); return false;
        } // Error en llenar los datos del formulario
    };
    
    $cleanDataAdmision = function () {
        _idPaciente = undefined; $barrio = { id : 0 }; $eps = undefined; 
        
        $tipoTraslado = undefined; $servicioTraslado = undefined; 
        $entidadAutorizacion = undefined; 
        $origen = undefined; $destino = undefined;
        $fechaTraslado = undefined; $horaTraslado = undefined;
        
        jQuery('.paciente').clean(); jQuery('.admision').clean();
        softtion.startPage(); // Volver al comienzo de la Página
    };
    
    $executeRegistroAdmision = function () {
        var $pacienteSend = undefined, $admision, _nap, $fechahoraTraslado;
        
        if (!_idPaciente) {
            $pacienteSend = jQuery.extend({}, {
                tipo_documento : _tipoDocumento,
                id_entidad_afiliacion :$eps.id,
                sexo : _sexo,
                id_barrio : $barrio.id
            }, jQuery('.paciente').createJSON());
        }
        
        else { 
            $pacienteSend = $paciente; $pacienteSend['id_barrio'] = $barrio.id;
            $pacienteSend['id_entidad_afiliacion'] = $eps.id;
        }
            
        _nombrePaciente = $pacienteSend.nombres + " " + $pacienteSend.primer_apellido;
        _nombrePaciente += " " + $pacienteSend.segundo_apellido; _nombrePaciente = _nombrePaciente.trim();
        
        _nap = (_estadoNap === 'Pendiente') ? '' : jQuery('#txt-nap').valtrim();
        $fechahoraTraslado = softtion.DateTime.merge($fechaTraslado,$horaTraslado).php();
        var _edadPaciente = (_tipoDocumento === 'D') ? 'Desconocida' : 
            jQuery('#txt-edad-paciente').val() + ' ' + _tipoEdad;
                
        $admision = jQuery.extend({}, {
            edad_paciente : _edadPaciente,
            id_traslado_servicio : $servicioTraslado.id,
            id_entidad_autorizacion : $entidadAutorizacion.id,
            nap : _nap,
            estado_nap : _estadoNap,
            alcance : _alcance,
            via : _via,
            origen : $origen.id,
            destino : $destino.id,
            id_sede : $sede.id
        }, jQuery('.admision').createJSON());
        
        notesalud.verify.open({ 
            text : '¿Desea ejecutar el proceso de registro de Admisión de Traslado?',
            accept : function () {
                var _idProcess = notesalud.process.add({
                    icon : 'action',
                    text : 'Registrando admisión de traslado para el paciente ' + _nombrePaciente
                });
                
                notesalud.http.post({
                    url : notesalud.getRouteServices('trasladoAdmision'),
                    data : {
                        paciente : $pacienteSend, 
                        admision : $admision,
                        triage : $servicioTraslado.triage,
                        id_paciente : _idPaciente,
                        fechahora_traslado : $fechahoraTraslado
                    },
                    success : function (result) {
                        if (result.success) {
                            notesalud.toast('Se registró admisión de traslado para el paciente ' + _nombrePaciente);
                            $cleanDataAdmision(); $addNewTraslado(result.data);
                        } // Admision registrada correctamente
                        
                        else {
                            notesalud.toast('No se registró admisión para el paciente ' + _nombrePaciente);
                        } // Admision no registrada correctamente
                            
                        notesalud.process.finish({
                            id: _idProcess, text : result.message, result : result.success
                        });
                    },
                    failed : function (jqXHR) {
                        notesalud.httpFailed({
                            idProcess : _idProcess, jqXHR : jqXHR,
                            text : 'Ocurrio un error al registrar admisión para el paciente ' + _nombrePaciente
                        });
                    }
                });
            }
        });
    };
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Métodos para gestionar el horario de Servicios">
    
    $downloadHorario = function () {
        notesalud.http.get({
            url : notesalud.getRouteServices('trasladoAdmision'),
            data : { fecha_horario : $fechaHorario.php() },
            success : function (result) { 
                if (result.success) {
                    $horarios = result.data; $horario = $horarios[$sedeHorario.id]; $paintHorario(); 
                } // Horario de admisión cargado exitosamente

                else {
                    notesalud.toast('No se pudo descargar Horario de Traslados');
                } // Horario de admisión error al descargar
                
                jQuery('#lod-horario').view(false); jQuery('#lst-horario').view(true);
            },
            failed : function (jqXHR) {
                jQuery('#lod-horario').view(false); jQuery('#lst-horario').view(true);
                
                notesalud.httpFailed({
                    idProcess : undefined, jqXHR : jqXHR,
                    text : 'Ocurrio un error al tratar de descargar Horario de Traslados'
                });
            }
        });
    };
    
    $paintHorario = function () {
        jQuery('#lst-horario').empty(); // Limpiando componente
                
        var _numeroTraslados = parseInt($sedeHorario.interdepartamental);
        _numeroTraslados = _numeroTraslados + parseInt($sedeHorario.intermunicipal);
        _numeroTraslados = _numeroTraslados + parseInt($sedeHorario.local);
        
        jQuery('#lst-horario').append(
            notesalud.creator({
                type : 'horarioAdmision',
                horario : $horario,
                jornada : _jornada, 
                numeroTraslados : _numeroTraslados
            })
        ); // Agregando horario en el Componente
        
        jQuery('#lst-horario ul').collapsible(); // Evento 
    };
    
    $addNewTraslado = function (data) {
        var $admision = data.admision; // Datos del nuevo traslado Admisionado
        var $fechaHoraAdmision = $admision.fechahora_traslado;
        var $fechaTraslado = softtion.DateTime.createOfPHP($fechaHoraAdmision);
        
        if ($fechaHorario.equalsDate($fechaTraslado)) {
            var _hour = $fechaTraslado.getHours(); // Hora
            $horarios[data.sede][_hour].push($admision);
            if ($sede.id === data.sede) { $paintHorario(); }
        }
    };
    
    //</editor-fold>
    
    var registroAdmision = {
        start : function () {
            notesalud.database.search({
                type : 'tipo_traslado_of_alcance', 
                alcance : _alcance,
                setList : function (tiposTraslados) { 
                    $tiposTraslados = tiposTraslados; 
                }
            });
            
            $sede = notesalud.session.sedes[0]; $sedeHorario = notesalud.session.sedes[0];
            
            notesalud.session.sedes.forEach(function (sede) {
                var nombreSede = sede.nombre + " - " + sede.ciudad;
                jQuery('#slt-sede').selectOption(nombreSede);
                jQuery('#slt-sede-horario').selectOption(nombreSede);
            });
            
            $downloadHorario(); jQuery('.text-control').textControl();
            jQuery('.validate input').blur(function() { jQuery(this).validateInput(); });
            jQuery('#txt-origen').click(function () { _tipoLugar = 'origen'; });
            jQuery('#txt-destino').click(function () { _tipoLugar = 'destino'; });

            jQuery('.searcher').each(function (index, input) {
                var _sideNav = jQuery(input).data('sidenav'), _id = jQuery(input).data('activates');
                notesalud.sidenav[_sideNav] = jQuery('#pane-admision').containerNoteSalud({ id : _id });
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
            
            // Componentes para captura de datos de autorización
            
            jQuery('#slt-sede').select(function (item) {
                $sede = notesalud.session.sedes[item.index];
            });
            
            //<editor-fold defaultstate="collapsed" desc="Componentes para captura de datos del paciente">
            
            jQuery('#slt-documento').select(function (item) {
                _tipoDocumento = item.value; // Tipo de documento del paciente
                
                if (_tipoDocumento === 'D') {
                    jQuery('#txt-documento').removeClass('required-field');
                    jQuery('#txt-edad-paciente').removeClass('required-field');
                } // Numero de documento no es requerido
                
                else {
                    jQuery('#txt-documento').addClass('required-field');
                    jQuery('#txt-edad-paciente').addClass('required-field');
                } // Numero de documento no es requerido
            });
            
            jQuery('#txt-documento').keyup(function () {
                var $input = jQuery(this); // Componente de texto para documento
                
                if (_documento !== $input.val() && $input.val().full()) {
                    if (isSearcher) { return; } // Se esta realizando una busqueda
                    
                    if ($executeSearch) { clearTimeout($executeSearch); }
                    
                    $executeSearch = setTimeout(function () {
                        _documento = $input.val(); isSearcher = true;
                        
                        notesalud.http.get({
                            url: notesalud.getRouteServices('paciente') + '/' + _documento,
                            success: function (result) {
                                isSearcher = false; // Finalizado busqueda de paciente
                                
                                if (result.success) {
                                    $setPaciente(result.data);
                                } // Cargando paciente
                                
                                else { _idPaciente = undefined; }
                            }
                        });
                    },750);
                }

                else { if ($executeSearch) clearTimeout($executeSearch); }
            });
            
            jQuery('#slt-edad').select(function (item) {
                _tipoEdad = item.text; 
            });
            
            jQuery('#slt-sexo').select(function (item) {
                switch (item.index) {
                    case (0) : _sexo = false; break;    // Masculino
                    case (1) : _sexo = true; break;     // Femenino
                }
            });
            
            notesalud.selector.barrio = function (barrio) { 
                $barrio = barrio; // Barrio seleccionado
                var _barrio = $barrio.nombre + ' (' + $barrio.ciudad + ')';
                $inputSuccess(jQuery('#txt-barrio-paciente'),_barrio); 
            };
            
            notesalud.selector.eps = function (eps) {
                $eps = eps; $inputSuccess(jQuery('#txt-entidad-afiliacion'),$eps.nombre);
            };
            
            //</editor-fold>
            
            //<editor-fold defaultstate="collapsed" desc="Componentes para captura de descripción del traslado">
            
            jQuery('#slt-alcance').select(function (item) {
                _alcance = item.text; // Nuevo alcance seleccionado
                $tipoTraslado = undefined; $tiposTraslados = [];
                $serviciosTraslado = []; $servicioTraslado = undefined;
                jQuery('#txt-tipo-traslado').clean(); // Limpiando
                jQuery('#txt-motivo-traslado').clean(); // Limpiando
                
                notesalud.database.search({
                    type : 'tipo_traslado_of_alcance', 
                    alcance : _alcance,
                    setList : function (tiposTraslados) { $tiposTraslados = tiposTraslados; }
                });
            });
            
            jQuery('#slt-via').select(function (item) {
                _via = item.text; // Nuevo vía seleccionada
            });
            
            jQuery('#txt-tipo-traslado').autoComplete({
                minChars: 1,
                source: function (filter, suggest) {
                    filter = filter.toLowerCase(); var matches = [], indexs = [];
                    
                    jQuery.each($tiposTraslados, function (index, tipoTraslado) {
                        if (~tipoTraslado.nombre_abreviado.toLowerCase().indexOf(filter)) {
                            matches.push(tipoTraslado.nombre_abreviado); indexs.push(index); 
                        }
                    });
                    
                    suggest(matches, indexs); // Definiendo lista para Autocompletar
                },
                onSelect : function (index) { 
                    $tipoTraslado = $tiposTraslados[index]; // Tipos de traslados
                    $serviciosTraslado = []; $servicioTraslado = undefined;
                    jQuery('#txt-motivo-traslado').clean(); // Limpiando
                    
                    notesalud.database.search({
                        type : 'motivo_traslado_of_tipo_and_alcance', 
                        alcance : _alcance,
                        idTipo : $tipoTraslado.id,
                        setList : function (serviciosTraslado) { 
                            jQuery('#txt-motivo-traslado').focus(); $serviciosTraslado = serviciosTraslado; 
                        }
                    });
                }
            });
            
            jQuery('#txt-tipo-traslado').focusout(function () {
                if ($tipoTraslado) $inputSuccess(jQuery(this),$tipoTraslado.nombre_abreviado);
            });
            
            jQuery('#txt-motivo-traslado').autoComplete({
                minChars: 1,
                source: function (filter, suggest) {
                    filter = filter.toLowerCase(); var matches = [], indexs = [];
                    
                    jQuery.each($serviciosTraslado, function (index, servicioTraslado) {
                        var _data = servicioTraslado.motivoTraslado.nombre;
                        if (~_data.toLowerCase().indexOf(filter)) { matches.push(_data); indexs.push(index); }
                    });
                    
                    suggest(matches, indexs); // Definiendo lista para Autocompletar
                },
                onSelect : function (index) { 
                    $servicioTraslado = $serviciosTraslado[index]; 
                }
            });
            
            jQuery('#txt-motivo-traslado').focusout(function () {
                if ($servicioTraslado) $inputSuccess(jQuery(this),$servicioTraslado.motivoTraslado.nombre);
            });
            
            notesalud.selector.entidad = function (entidad) { 
                $entidadAutorizacion = entidad; // Entidad de autorización
                
                if ($entidadAutorizacion.id === 0) {
                    jQuery('#slt-nap').siblings('input').enabled(false);
                    jQuery('#slt-nap').selectItem('PAGO EN EFECTIVO');
                } // La entidad que autoriza es particular
                
                else {
                    jQuery('#slt-nap').siblings('input').enabled(true);
                } // La entidad que autoriza no es particular
                
                $inputSuccess(jQuery('#txt-entidad-autorizacion'),$entidadAutorizacion.nombre);
            };
            
            jQuery('#slt-nap').select(function (item) {
                _estadoNap = item.text; // Estado de NAP
                
                switch (item.index) {
                    case (1) : 
                        jQuery('#txt-nap').addClass('required-field');
                        jQuery('#txt-valor-nap').removeClass('required-field');
                    break; // Autorizado
                    
                    case (3) : 
                        jQuery('#txt-nap').removeClass('required-field');
                        jQuery('#txt-valor-nap').addClass('required-field');
                    break; // Copago
                    
                    case (4) : 
                        jQuery('#txt-nap').removeClass('required-field');
                        jQuery('#txt-valor-nap').addClass('required-field');
                    break; // Particular
                    
                    default : 
                        jQuery('#txt-nap').removeClass('required-field');
                        jQuery('#txt-valor-nap').removeClass('required-field');
                    break; // Pendiente ó Físico
                }
            });
            
            jQuery('#dtp-fecha-traslado').date({ 
                selectMonths: true, selectYears: true,
                onSet: function (date) {
                    if (date.select) {
                        jQuery('#dtp-fecha-traslado').parent().inputSuccess();
                        $fechaTraslado = new Date(date.select); this.close();
                    }
                }
            });
            
            jQuery('#clk-hora-traslado').clock({
                setTime : function (time) { 
                    $horaTraslado = time; jQuery('#clk-hora-traslado').parent().inputSuccess();
                }
            });
            
            notesalud.selector.lugar = function (lugar) { 
                var _text = lugar.nombre + ' (' + lugar.ciudad + ')';
                
                switch (_tipoLugar) {
                    case ('origen') : 
                        $origen = lugar; $inputSuccess(jQuery('#txt-origen'),_text); 
                    break;
                    
                    case ('destino') :
                        $destino = lugar; $inputSuccess(jQuery('#txt-destino'),_text); 
                    break;
                }
            };
            
            //</editor-fold>
            
            //<editor-fold defaultstate="collapsed" desc="Componentes para manejo de horario de admisionista">
            
            jQuery('#slt-sede-horario').select(function (item) {
                $sedeHorario = notesalud.session.sedes[item.index]; // Seleccionando sede
                if ($horarios) { $horario = $horarios[$sedeHorario.id]; $paintHorario(); }
            });
            
            jQuery('#slt-alcance-horario').select(function (item) {
                _alcanceHorario = item.text; // Nuevo alcance seleccionado
            });
            
            jQuery('#slt-jornada').select(function (item) {
                _jornada = item.index; if ($horarios) { $paintHorario(); }
            });
            
            jQuery('#dtp-fecha-horario').date({ 
                selectMonths: true, selectYears: true,
                onSet: function (date) {
                    if (date.select && $horarios) {
                        jQuery('#dtp-fecha-horario').parent().inputSuccess();
                        $fechaHorario = new Date(date.select); this.close(); 
                        $horarios = undefined; jQuery('#lod-horario').view(true); 
                        jQuery('#lst-horario').view(false); $downloadHorario();
                    }
                },
                onStart: function() { this.set('select', new Date()); }
            });
            
            //</editor-fold>
            
            notesalud.socket.admision.newAdmision = function (notification) {
                notesalud.toast('Se ha registrado un nuevo traslado');
                $addNewTraslado(notification.data); // Agregando traslado
            };
        },
        
        sendAdmision : function () {
            if ($validateDataAdmision()) $executeRegistroAdmision();
        },
        
        cancelAdmision : function () {
            notesalud.verify.open({ 
                text : '¿Desea cancelar el proceso de registro de Admisión de Traslado?',
                accept : $cleanDataAdmision
            });
        }
    };
    
    notesalud.start.form(registroAdmision.start); // Inicializando página
    jQuery('#btn-send-admision').click(registroAdmision.sendAdmision);
    jQuery('#btn-cancel-admision').click(registroAdmision.cancelAdmision);
});