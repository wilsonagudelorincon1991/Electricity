
/* 
 * ==============================================
 * NoteSalud+ Components v0.0.1
 * ==============================================
 * Author: Daniel Andres Castillo Pedroza
 * Author: Fabián Andrés Urrego Bohórquez
 * Created: 23 de octubre de 2015
 * Location: Valledupar, Cesar, Colombia
 * ==============================================
 */

/* global notesalud, softtion */

/* 
 * ==============================================
 * ModalMessage NoteSalud+ v1.0.0
 * ============================================== 
 */
(function (jQuery, notesalud) {
    
    var $modal; // Componente Modal para Mensajes
    
    $createModalMessage = function (idModal) {
        // Contenido del modal
        var $content = new HtmlComponent('div').
            addClass('modal-content').
            addComponent(new HtmlComponent('h5')).
            addComponent(new HtmlComponent('p'));
        
        // Footer del modal
        var $footer = new HtmlComponent('div').
            addClass('modal-footer').
            addComponent(
                new HtmlComponent('center').
                    addComponent(
                        new HtmlComponent('center').
                            addComponent(new HtmlComponent('a').
                            addClass(['modal-close','btn-flat']).
                            setText('Cerrar'))
                    )
            );
        
        return new HtmlComponent('div').
            setId(idModal).
            addClass(['modal', 'message']).
            addComponent($content).
            addComponent($footer).
            create(); // Creando componente
    };
    
    function ModalMessage(component) {
        // Generando id del Modal
        var _idModal = 'modal-message-' + new Date().code('datetime');
        
        component.append($createModalMessage(_idModal)); 
        $modal = jQuery('#' + _idModal); // Modal insertado
        
        return this; // Retornando objeto en caso de necesitarlo
    };
    
    ModalMessage.prototype.open = function (options) {
        var $default = {
            title : 'NoteSalud+ Web',               // Título del Modal
            text : 'ModalMessage NoteSalud+ Web'    // Mensaje del Modal
        };
        
        var $options = jQuery.extend({},$default,options);
        $modal.find('.modal-content h5').html($options.title);  
        $modal.find('.modal-content p').html($options.text);  
        
        $modal.openModal(); return this; // Retornando componente
    };
    
    ModalMessage.prototype.close = function () {
        $modal.closeModal(); return this; // Retornando componente
    };
    
    jQuery.fn.extend({
        modalMessage : function () {
            return new ModalMessage(jQuery(this));
        }
    });
})(jQuery, notesalud);

/* 
 * ==============================================
 * ModalVerify NoteSalud+ v1.0.0
 * ============================================== 
 */
(function (jQuery, notesalud) {
    
    var $modal; // Componente Modal para Verificación
    
    $createModalVerify = function (idModal) {
        // Contenido del modal
        var $content = new HtmlComponent('div').
            addClass('modal-content').
            addComponent(new HtmlComponent('h5')).
            addComponent(new HtmlComponent('p')
            );
        
        // Footer del modal
        var $footer = new HtmlComponent('div').
            addClass('modal-footer').
            addComponent(
                new HtmlComponent('a').
                    addClass(['waves-effect','waves-teal','btn-yes','btn-flat','right']).
                    setText('Aceptar')
            ).
            addComponent(
                new HtmlComponent('a').
                    addClass(['waves-effect','waves-teal','btn-no','btn-flat','right']).
                    setText('Rechazar')
            );
        
        return new HtmlComponent('div').
            setId(idModal).
            addClass(['modal', 'verify']).
            addComponent($content).
            addComponent($footer).
            create(); // Creando componente
    };
    
    function ModalVerify(component) {
        // Generando id del Modal
        var _idModal = 'modal-verify-' + new Date().code('datetime');
        
        component.append($createModalVerify(_idModal)); 
        $modal = jQuery('#' + _idModal); // Modal insertado
        
        return this; // Retornando objeto en caso de necesitarlo
    };
    
    ModalVerify.prototype.open = function (options) {
        var $default = {
            title : 'NoteSalud+ Web',               // Título del Modal
            text : 'ModalVerify NoteSalud+ Web',    // Mensaje del Modal
            accept : undefined,                     // Función aceptar
            refuse : undefined                      // Función rechazar
        };
        
        var $options = jQuery.extend({},$default,options);
        $modal.find('.modal-content h5').html($options.title);  
        $modal.find('.modal-content p').html($options.text);
        
        var $btnYes = $modal.find('.modal-footer .btn-yes'); $btnYes.unbind('click'); 
        var $btnNo = $modal.find('.modal-footer .btn-no'); $btnNo.unbind('click'); 
        
        $btnYes.click(function () {
            if ($options.accept && typeof $options.accept === "function") {
                $options.accept();
            } // Se establecio evento para ejecutar Proceso
            
            $modal.closeModal(); // Cerrando el Modal
        });
        
        $btnNo.click(function () {
            if ($options.refuse && typeof $options.refuse === "function") {
                $options.refuse();
            } // Se establecio evento para rechazar Proceso
            
            $modal.closeModal(); // Cerrando el Modal
        });
        
        $modal.openModal({ dismissible: false });  return this; 
    };
    
    ModalVerify.prototype.close = function () {
        $modal.closeModal(); return this; // Retornando componente
    };
    
    jQuery.fn.extend({
        modalVerify : function () {
            return new ModalVerify(jQuery(this));
        }
    });
})(jQuery, notesalud);

/* 
 * ==============================================
 * ModalProcess NoteSalud+ v1.0.0
 * ============================================== 
 */
(function (jQuery, notesalud) {
    
    var $modal, $listProcess, $empty, $btnClose; 
    
    $iconProcess = function (typeProcess) {
        switch (typeProcess) {
            // Descarga de datos
            case ('download') : return 'cloud_download';
            
            // Ejecutando acción
            case ('action') : return 'assignment_turned_in';
            
            // Se desconoce actividad
            default : return 'announcement';
        }
    };
    
    $createModalProcess = function (options, idModal, idCloseModal) {
        // Contenido del modal
        var $content = new HtmlComponent('div').
            addClass('modal-content').
            addComponent(
                new HtmlComponent('p').
                    setText('Actualmente no hay procesos ejecutandose en la aplicación')
            ).
            addComponent(
                new HtmlComponent('ul').addClass('collection')
            );
    
        // Botón para cerrar modal
        var $btnClose = new HtmlComponent('div').
            setId(idCloseModal).
            addClass(['waves-effect', 'waves-teal', 'btn-close']).
            addComponent(
                new HtmlComponent('a').
                    addClass(['btn-flat', 'blue-text']).
                    setText('<i class="material-icons blue-text">face</i>')
            );
        
        var $component = new HtmlComponent('div').
            setId(idModal).
            addClass(['modal', 'bottom-sheet', 'process']).
            addComponent($content); 
    
        if (options.btnClose) { $component.addComponent($btnClose); }
    
        return $component.create(); // Creando componente
    };
    
    function ModalProcess(component, options) {
        // Generando id del Modal
        var _idModal = 'modal-process-' + new Date().code('datetime');
        var _idCloseModal = 'close-' + _idModal; // Id del CloseModal
        
        component.append($createModalProcess(options, _idModal, _idCloseModal)); 
        $modal = jQuery('#' + _idModal); // Modal insertado
        
        $listProcess = $modal.find('.modal-content ul');
        $empty = $modal.find('.modal-content p');
        $btnClose = jQuery('#' + _idCloseModal); $btnClose.click(this.close);
        
        return this; // Retornando objeto en caso de necesitarlo
    };
    
    ModalProcess.prototype.open = function () {
        $modal.openModal();
    };
    
    ModalProcess.prototype.close = function () {
        $modal.closeModal();
    };
    
    ModalProcess.prototype.add = function (options) {
        var $default = { 
            title : 'NoteSalud+ Web', text : '', icon : 'default' 
        };
        
        var $options = jQuery.extend({},$default,options);
        var $datetime = new Date(); // Fecha y hora de registro
        var _idProcess = 'process-' + $datetime.code('datetime');
        var _datetime = $datetime.description('hh:ii:ss');
        
        var $component = new HtmlComponent('li').
            setId(_idProcess).
            addClass(['collection-item','avatar','process-execute']).
            addComponent(
                new HtmlComponent('i').
                    addClass(['material-icons','icon']).
                    setText($iconProcess($options.icon))
            ).
            addComponent(
                new HtmlComponent('span').
                    addClass('title').
                    setText($options.title)
            ).
            addComponent(
                new HtmlComponent('p').
                    addClass(['justify-align','message']).
                    setText($options.text)
            ).
            addComponent(
                new HtmlComponent('p').
                    addClass(['right-align','datetime']).
                    setText("<i class='material-icons'>done</i> " + _datetime)
            );
            
        $listProcess.append($component.create()); $empty.view(false);
        return _idProcess; // Id del proceso para jQuery
    };
    
    ModalProcess.prototype.update = function (options) {
        if (options.id) {
            var $component = $listProcess.find('#' + options.id); // Componente
            $component.removeClass('process-execute').addClass('process-update');
            
            var _text = "<i class='material-icons'>cache</i> ";
            _text += new Date().description('hh:ii:ss'); // Actualizado
            
            $component.find('p.datetime').html(_text); 
            $component.find('p.message').html(options.text); 
        }
    };
    
    ModalProcess.prototype.finish = function (options) { 
        if (options.id) {
            var $component = $listProcess.find('#' + options.id); // Componente
            $component.removeClass('process-execute'); // Quitando clase
            $component.removeClass('process-update').addClass('process-finish');

            var _text = '<i class="material-icons">done_all</i> ';
            _text += new Date().description('hh:ii:ss'); // Finalizando
            
            $component.find('p.datetime').html(_text); 
            $component.find('p.message').html(options.text); 

            (options.result) ?
                $component.find('i.icon').removeClass('error').addClass('success') :
                $component.find('i.icon').removeClass('success').addClass('error');
        }
    };
    
    ModalProcess.prototype.remove = function (options) {
        if (options.id) {
            $listProcess.find('#' + options.id).remove();
        }
    };
    
    jQuery.fn.extend({
        modalProcess : function (options) {
            var $options = jQuery.extend({}, { btnClose : false }, options);
            return new ModalProcess(jQuery(this), $options);
        }
    });
})(jQuery, notesalud);

/* 
 * ==============================================
 * Container NoteSalud+ v1.0.0
 * ============================================== 
 */

(function (jQuery, notesalud) {
    
    $createContainer = function (options) {
        var $container = new HtmlComponent('div').setId(options.id);
        $container.addClass(['col','side-nav','right-aligned']);
        
        var $preloader = new HtmlComponent('center').
            addComponent(
                new HtmlComponent('div').
                    addClass(['preloader-component','hidden']).
                    append("<div class='preloader-wrapper active' style='margin: 20px 0px 10px 0px;'>").
                    append("<div class='spinner-layer spinner-blue-only'>").
                    append("<div class='circle-clipper left'><div class='circle'></div></div>").
                    append("<div class='gap-patch'><div class='circle'></div></div>").
                    append("<div class='circle-clipper right'><div class='circle'></div></div>").
                    append("</div></div><p>Cargando componente</p>")
            );
    
        $container.addComponent($preloader); // Cargando componente
        $container.addComponent(new HtmlComponent('div').addClass('component'));
        return $container.create(); // Retornando componente creado
    };
    
    function ContainerNoteSalud(component, options) {
        component.append($createContainer(options));
        this.container = jQuery('#' + options.id); 
        this.preloader = this.container.find('.preloader-component');
        this.component = this.container.find('.component'); return this;
    };
    
    ContainerNoteSalud.prototype.deployComponent = function (options) {
        var $options = jQuery.extend({}, options, {
            nameComponent : undefined, isLoader : undefined, after : undefined
        });
        
        if (this.container.data('component') !== $options.nameComponent) {
            this.preloader.view(true); this.component.view(false); 
            var $container = this.container; // Contenedor pricipal
            var $preloader = this.preloader, $component = this.component;
            
            this.component.deployComponent({
                url : notesalud.getRouteComponents($options.nameComponent),
                after : $options.after,
                before : function () { 
                    $preloader.view(false); $component.view(true); 
                    $container.data('component',$options.nameComponent);
                    
                    if ($options.trigger) { 
                        $container.data('trigger',$options.trigger);
                    } // Tiene un invocador
                }
            });
        } // El componente para buscar no esta insertado

        else { 
            if ($options.isLoad !== undefined && typeof $options.isLoad === 'function') {
                $options.isLoad(this.container); }
        } // El componente ya se encuentra insertado
    };
    
    ContainerNoteSalud.prototype.insertComponent = function (componentHtml) {
        this.component.html(componentHtml); 
    };
    
    ContainerNoteSalud.prototype.hide = function () {
        this.container.sideNav('hide');
    };
    
    ContainerNoteSalud.prototype.show = function () {
        this.container.sideNav('show');
    };
    
    jQuery.fn.extend({
        containerNoteSalud : function (options) {
            return new ContainerNoteSalud(jQuery(this), options);
        }
    });
})(jQuery, notesalud);

/* 
 * ==============================================
 * MovilCoordinacion NoteSalud+ v1.0.0
 * ============================================== 
 */
(function (jQuery, notesalud) {
    
    var $listMoviles, $selectMovil; // Atributos y funciones del Componente
    
    $createMovilesCoordinacion = function (idList) {
        return new HtmlComponent('ul').
            setId(idList).
            addClass('collection').create();
    };
    
    $paintMovil = function (options) {
        var $movil = options.movil; // Movil a pintar en el Componente
        
        return new HtmlComponent('li').
            setId($movil.placa).
            addClass(['collection-item','select-movil','waves-effect','waves-blue']).
            addAttribute('data-index',options.index).
            addComponent(
                new HtmlComponent('span').
                    setText($movil.nombre)
            ).
            addComponent(
                new HtmlComponent('div').
                    addClass(['movil-connect',$movil.estado])
            ).create();
    };
    
    $eventSelectMovil = function () {
        var _index = jQuery(this).data('index'); // Index del Componente
        if ($selectMovil && typeof $selectMovil === "function") $selectMovil(_index);
    };
    
    function MovilesCoordinacion(component, options) {
        var $default = {
            select : function (index) { console.log(index); }
        };
        
        var $options = jQuery.extend({},$default,options);
        
        // Generando id del Modal
        var _idListMoviles = 'lst-moviles-' + new Date().code('datetime');
        
        component.append($createMovilesCoordinacion(_idListMoviles));
        $listMoviles = jQuery('#' + _idListMoviles); $selectMovil = $options.select;
        
        return this; // Retornando objeto en caso de necesitarlo
    };
    
    MovilesCoordinacion.prototype.paint = function (moviles, estado) {
        $listMoviles.empty(); // Limpiando lista de Móviles
        
        jQuery.each(moviles, function (index, movil) {
            switch (estado) {
                case ('all') :
                    $listMoviles.append($paintMovil({ index : index, movil : movil }));
                break;
                
                default :
                    if (movil.estado === estado) 
                        $listMoviles.append($paintMovil({ index : index, movil : movil }));
                break;
            }
        });

        jQuery('.select-movil').click($eventSelectMovil); // Asignando evento
    };
    
    MovilesCoordinacion.prototype.view = function (isView) {
        $listMoviles.view(isView);
    };
    
    jQuery.fn.extend({
        movilesCoordinacion : function (options) {
            return new MovilesCoordinacion(jQuery(this), options);
        }
    });
})(jQuery, notesalud);

/* 
 * ==============================================
 * ServicioCoordinacion NoteSalud+ v1.0.0
 * ============================================== 
 */
(function (jQuery, notesalud) {
    
    // Atributos para administrar componente
    var $table, $trasladosCoordinador, $sede, $lugar, $tipo;
    var _alcance = 'TODOS LOS SERVICIOS', _estado = 'T', _idSede;
    
    $createTableTraslado = function (idTable) {
        return new HtmlComponent('table').setId(idTable).
            addClass(['material','centered','bordered']).
            addComponent(
                new HtmlComponent('thead').
                    append('<tr><th>Fecha y hora</th>').
                    append('<th>Ficha</th>').
                    append('<th class="view-m">Tipo</th>').
                    append('<th class="view-d">Alcance</th>').
                    append('<th class="view-m">Origen</th>').
                    append('<th class="view-m">Destino</th>').
                    append('<th class="view-m">Paciente</th>').
                    append('<th>Movil</th></tr>')
            ).
            addComponent(
                new HtmlComponent('tbody')
            ).create();
    };
    
    $colorAtencion = function (timestamp) {
        var _timestampLocal = new Date().getTime(); // Time
        
        if ((_timestampLocal) < (timestamp - 600000 )) {
            return 'before';
        } // Faltan más de 10 minutos para el servicio
        
        else if ((_timestampLocal) > (timestamp  + 600000)) {
            return 'after';
        } // Ha superado el servicio por más de 10 minutos
        
        else { 
            return 'between'; 
        } // Esta en un perimetro de 10 minutos el servicio
    };
    
    $colorTriage = function (triage) {
        switch (triage) {
            case ('1') : return 'red white-text';          // Resucitación
            case ('2') : return 'orange white-text';       // Emergencia
            case ('3') : return 'yellow';       // Urgencia
            case ('4') : return 'green white-text';        // Urgencia menor
            default : return 'blue white-text';            // Sin urgencia
        }
    };
    
    $colorEstado = function (estado) {
        switch (estado) {
            case ('1') : return 'red darken-1 white-text';          // Pendiente
            case ('2') : return 'purple darken-1 white-text';       // Asignado
            case ('3') : return 'green darken-1 white-text';        // Descargado
            case ('4') : return 'orange darken-1 white-text';       // Incompleto médico
            case ('5') : return 'orange darken-1 white-text';       // Incompleto retorno
            case ('6') : return 'orange darken-1 white-text';       // Incompleto total
            case ('7') : return 'blue darken-1 white-text';         // Exitoso
            case ('8') : return '';                                 // Cancelado
            case ('9') : return 'blue-grey darken-1 white-text';    // Fallido
            case ('10') : return 'light-green accent-3';            // Fallido no autorizado
        }
    };
    
    $descriptionEstado = function (estado) {
        switch (estado) {
            case ('1') : return 'Asignar urgente';              // Sin móvil
            case ('2') : return 'Asignado';                     // Asignado
            case ('3') : return 'En proceso';                   // En proceso
            case ('4') : return 'Pendiente historia';           // Incompleto médico
            case ('5') : return 'Pendiente retorno';            // Incompleto retorno
            case ('6') : return 'Pendiente historia y retorno'; // Incompleto total
            case ('7') : return 'Exítoso';                      // Exitoso
            case ('8') : return 'Cancelado';                    // Cancelado
            case ('9') : return 'Fallido';                      // Fallido
            case ('10') : return 'Fallido sin autorizar';       // Fallido
            default : return 'Desconocido';                     // Desconocido
        }
    };
    
    $componentTraslado = function (key, traslado) {
        var $fechahoraTraslado = null; // Fecha hora nueva de atención
        
        if (!softtion.isUndefined(traslado.retorno)) {
            $fechahoraTraslado = softtion.DateTime.createOfPHP(traslado.retorno.fechahora_retorno);
        } // Traslado cuenta con hora de retorno
        
        else {
            $fechahoraTraslado = softtion.DateTime.createOfPHP(traslado.fechahora_traslado);
        } // Traslado no cuenta con hora de retorno
        
        var _triage = $colorTriage(traslado.triage);
        var _estado = $colorEstado(traslado.estado);
        var _atencion = $colorAtencion($fechahoraTraslado.getTime());
        var _fechahora = $fechahoraTraslado.description('dd-mm-aa hh:ii');
        var _movil = (traslado.movil) ? traslado.movil.nombre : 'S/M';
            
        var $row = new HtmlComponent('tr').setId(key); // Nuevo traslado
        $row.addAttribute('data-id',key); $row.addAttribute('data-sede',$sede.id);
        
        // Columna Fecha y hora del Traslado
        var $columnDate = new HtmlComponent('td').addClass('fecha-traslado');
        $columnDate.addComponent(
            new HtmlComponent('input',false).setId('t' + traslado.id).
                addAttribute('type','checkbox').addClass(['filled-in','chk-traslados'])
        ).addComponent(
            new HtmlComponent('label').addClass(_atencion).
                addAttribute('for','t' + traslado.id).setText(_fechahora)
        );

        // Columna Numero de ficha y triage del Traslado
        var $columnFicha = new HtmlComponent('td').addComponent(
            new HtmlComponent('p').addClass([_triage,'data-table']).setText(traslado.id)
        );

        // Columna tipo de Traslado
        var $columnTipo = new HtmlComponent('td').addClass('view-m');
        $columnTipo.setText(traslado.tipo_traslado.nombre_abreviado);

        // Columna alcance de Traslado
        var $columnAlcance = new HtmlComponent('td').addClass('view-d').setText(traslado.alcance);

        // Columna origen de Traslado
        var $columnOrigen = new HtmlComponent('td').addClass('view-m');
        $columnOrigen.setText(traslado.origen.nombre + ' (' + traslado.origen.ciudad + ')');

        // Columna destino de Traslado
        var $columnDestino = new HtmlComponent('td').addClass('view-m');
        $columnDestino.setText(traslado.destino.nombre + ' (' + traslado.destino.ciudad + ')');

        // Columna paciente de Traslado
        var $columnPaciente = new HtmlComponent('td').addClass('view-m').setText(traslado.paciente);
        
        // Columna estado del Traslado
        var $columnEstado = new HtmlComponent('td').addClass('tooltipped');
        $columnEstado.addAttribute('data-position','left');
        $columnEstado.addAttribute('data-delay','50');
        $columnEstado.addAttribute('data-tooltip',$descriptionEstado(traslado.estado));        
        $columnEstado.addComponent(
            new HtmlComponent('p').addClass([_estado,'data-table']).setText(_movil)
        );

        // Agregando columnas a la final
        $row.addComponent($columnDate); $row.addComponent($columnFicha);
        $row.addComponent($columnTipo); $row.addComponent($columnAlcance);
        $row.addComponent($columnOrigen); $row.addComponent($columnDestino);
        $row.addComponent($columnPaciente); $row.addComponent($columnEstado);
        
        return $row.create(); // Retornando componente de traslado
    };
    
    $trasladosView = function (trasladosSede) {
        var $traslados = {}; // Lista de traslados a visualizar
        
        jQuery.each(trasladosSede, function (key, traslado) {
            if (_estado === 'T') {
                if (['7','8','9'].indexOf(traslado.estado) !== -1) return;
            } // Se permite visualizar todos los servicios
            
            else if (_estado === 'F') { 
                if (['9','10'].indexOf(traslado.estado) === -1) return; 
            } // Filtrando por estado específico los traslados
            
            else if (_estado !== 'A') { 
                if (traslado.estado !== _estado) return; 
            } // Filtrando por estado específico los traslados
            
            if (_alcance !== 'TODOS LOS SERVICIOS') {
                if (traslado.alcance !== _alcance) return;
            } // Filtrando por alcance específico los traslados
            
            if (!softtion.isUndefined($lugar)) {
                var _idDestino = parseInt(traslado.destino.id);     // Destino
                var _idOrigen = parseInt(traslado.origen.id);       // Origen
                if (!(_idOrigen === $lugar.id || _idDestino === $lugar.id)) return;
            } // Filtrando por lugar específico los traslados
            
            if (!softtion.isUndefined($tipo)) {
                if ($tipo.id !== parseInt(traslado.tipo_traslado.id)) return;
            } // Filtrando por tipo específico los traslados
            
            $traslados[key] = traslado; // Cumple con filtro
        }); // Recorriendo la lista de traslados para verificar
        
        return $traslados; // Retornando traslados que cumplen filtro
    };
    
    $updateAttributeTraslado = function (dataNotification, traslado) {
        switch (dataNotification.evento) {
            case ('UDR') :
                if (!softtion.isUndefined(traslado.retorno)) 
                    traslado.retorno.fechahora_retorno = dataNotification.data.fechahora_nueva;
            break; // Actualizando la fecha de retorno
            
            case ('UDT') :
                traslado.fechahora_traslado = dataNotification.data.fechahora_nueva;
            break; // Actualizando la fecha de atencion
        }
    };
    
    function TrasladosCoordinacion(component) {
        var _idTable = 'table-traslados-' + new Date().code('datetime');
        component.append($createTableTraslado(_idTable)); $table = jQuery('#' + _idTable); 
        
        return this; // Retornando clase TrasladosCoordinacion
    };
    
    TrasladosCoordinacion.prototype.set = function (nameObject, object) {
        switch (nameObject) {
            case ('alcance') : _alcance = object; break;
            case ('sede') : $sede = object; break;
            case ('estado') : _estado = object; break;
            case ('traslados') : $trasladosCoordinador = object; break;
            case ('tipo') : $tipo = object; break;
            case ('lugar') : $lugar = object; break;
        }
    };
    
    TrasladosCoordinacion.prototype.get = function (nameObject) {
        switch (nameObject) {
            case ('id_sede') : return  _idSede; // Sede del traslado
            
            case ('traslado') : 
                var $select = $table.find('tbody').find('.chk-traslados:checked');
                
                if ($select.length) {
                    var $row = $select.parent().parent(); _idSede = $row.data('sede');
                    return $trasladosCoordinador[_idSede][$row.data('id')]; 
                } // Actualmente hay un traslado seleccionado
                
                return undefined; // No hay traslado seleccionado
                
            default : return undefined; // Ningín objeto se retornará
        }
    };
    
    TrasladosCoordinacion.prototype.newAdmission = function (data) {
        var $newTraslado = data.coordinacion, isLast = true; 
        var $trasladosSede = $trasladosCoordinador[data.sede], $traslados = [];
        
        jQuery.each($trasladosSede, function (key, trasladoSede) {
            var $fechahoraTraslado = (softtion.isUndefined(trasladoSede.retorno)) ?
                trasladoSede.retorno.fechahora_retorno : trasladoSede.fechahora_traslado;
            
            if (($fechahoraTraslado > $newTraslado.fechahora_traslado) && isLast) {
                $traslados.push($newTraslado); isLast = false;
            } // Traslado va antes delque se encuentra en la Lista
            
            $traslados.push(trasladoSede); // Agregando traslado actual a la nueva Lista
        });
        
        if (isLast) { $traslados.push($newTraslado); } // Traslado es el último
        
        $trasladosCoordinador[data.sede] = $traslados; if ($sede.id === data.sede) { this.paint(); }
    };
    
    TrasladosCoordinacion.prototype.newAssign = function (data) {
        var $traslados = $trasladosCoordinador[data.sede], $traslado;
        
        jQuery.each($traslados, function (key, traslado) {
            if (traslado.id === data.id_traslado) { $traslado = traslado; return false; }
        });
        
        if ($traslado) {
            var _is = ['1','2','3'].indexOf($traslado.estado);
            $traslado.estado = (_is !== -1) ? '2' : $traslado.estado;
            $traslado.movil = data.movil; // Móvil asignada
            if ($sede.id === data.sede) { this.paint(); } // Repintando traslados
        }
    };
    
    TrasladosCoordinacion.prototype.updateTraslado = function (data) {
        var $traslados = $trasladosCoordinador[data.sede], $traslado;
        
        jQuery.each($traslados, function (key, traslado) {
            if (traslado.id === data.id_traslado) { $traslado = traslado; return false; }
        });
        
        if ($traslado) {
            if (['UDR','UDT'].indexOf(data.evento) !== -1) {
                $updateAttributeTraslado(data,$traslado); 
                
                if ($sede.id === data.sede) { this.paint(); } // Repintando traslados
                return; // Cancelando resto del proceso
            } // Evento no cambia estado del tralado
            
            $traslado.estado = data.evento; // Cambiando estado de Traslado
            
            if (data.evento === '5' || data.evento === '6') {
                $traslado['retorno'] = data.retorno; 
            } // Quedo pendiente paciente por realizar Retorno
            
            if (data.evento === '10') {
                $traslado['fallido'] = data.fallido; 
            } // Quedo pendiente confirmar traslado como fallido
            
            if ($sede.id === data.sede) { this.paint(); } // Repintando traslados
        } // Se encontro traslado en la Sede
    };
    
    TrasladosCoordinacion.prototype.paint = function () {
        var $body = $table.find('tbody'), $selectedId = $body.find('.chk-traslados:checked').attr('id'); 
        var $traslados = $trasladosView($trasladosCoordinador[$sede.id]); $body.empty(); 
        
        jQuery.each($traslados, function (key, traslado) {
            $body.append($componentTraslado(key,traslado)); 
        });
        
        jQuery('.chk-traslados').click(function () {
            jQuery('.chk-traslados').prop('checked',false); jQuery(this).prop('checked',true);
        });
        
        if ($selectedId) { jQuery('#' + $selectedId).click(); } // Existia uno activo antes de limpiar
        
        jQuery('.tooltipped').tooltip(); // Activando visualización del Tooltip
    };
    
    jQuery.fn.extend({
        trasladosCoordinacion : function (options) {
            return new TrasladosCoordinacion(jQuery(this), options);
        }
    });
})(jQuery, notesalud);

/* 
 * ==============================================
 * SignosVitales NoteSalud+ v1.0.0
 * ============================================== 
 */

(function (jQuery, notesalud) {
    
    $createSignosVitales = function () {
        
    };
})(jQuery, notesalud);