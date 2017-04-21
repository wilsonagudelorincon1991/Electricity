
/* 
 * ==============================================
 * NoteSalud+ Creator v0.0.1
 * ==============================================
 * Author: Daniel Andres Castillo Pedroza
 * Author: Fabián Andrés Urrego Bohórquez
 * Created: 17 de septiembre de 2015
 * Location: Valledupar, Cesar, Colombia
 * ==============================================
 */

/* global notesalud, softtion */

(function (notesalud) {
    
    $triageBackground = function (triage) {
        switch (triage) {
            case ('1') : return 'red lighten-3';
            case ('2') : return 'orange lighten-3';
            case ('3') : return 'yellow lighten-3';
            case ('4') : return 'green lighten-3';
            case ('5') : return 'blue lighten-3';
        }
    };
    
    $timeResponse = function (timestamp) {
        var _difference = timestamp - new Date().getTime();
        console.log(_difference/1000);
        
        if (_difference > 600000) { return 'previous'; }
        
        else if (_difference > -600000) { return 'just'; }
        
        else { return 'later'; }
    };
    
    $countServiciosColor = function (cantidadServicios, serviciosPermitidos) {
        if (cantidadServicios === 0) { 
            return 'grey-text'; 
        } // 0%, Se dispone de todos los cupos
        
        else if (cantidadServicios <= (serviciosPermitidos / 2)) {
            return 'blue-text'; 
        } // 50%, La mitad de los cupos estan completados
        
        else if (cantidadServicios < serviciosPermitidos) { 
            return 'green-text'; 
        } // 75%, Más de la mitad de los cupos estan completados
        
        else { 
            return 'red-text'; 
        } // 100%, No hay cupos disponibles
    };
    
    $nombreJornada = function (hora) {
        var _hour = softtion.character.addBefore({ 
            word : hora, character : '0', size : 2 
        });
        
        return _hour + ':00 - ' + _hour + ':59';
    };
    
    $creatorTrasladoAdmision = function (traslado) {
        var $horaTraslado = softtion.DateTime.createOfPHP(traslado.fechahora_traslado);
        
        var $component = new HtmlComponent('li').
            addClass(['collection-item', $triageBackground(traslado.triage)]);
        
        $component.addComponent(
            new HtmlComponent('p').setText('Ficha: ' + traslado.id).
                addComponent(
                    new HtmlComponent('span').
                        setText(traslado.paciente).addClass(['right', 'in-line'])
                )
        ); // Id, fecha y hora del Traslado

        $component.addComponent(
            new HtmlComponent('p').setText(traslado.tipo_traslado + ' - ' + traslado.alcance).
                addComponent(
                    new HtmlComponent('span').setText($horaTraslado.description('hh:ii')).
                        addClass(['right', 'in-line'])
                )
        ); // Tipo y alcance del traslado
        
        return $component; // Placa de traslado
    };
    
    $creatorJornadaAdmision = function (options) {
        var _color = $countServiciosColor(options.traslados.length,(options.numeroTraslados || 0));
        
        var $component = new HtmlComponent('li').
            addComponent(
                new HtmlComponent('div').
                    addClass(['collapsible-header', 'grey-text', 'text-darken-3']).
                    addComponent(
                        new HtmlComponent('i').
                            addClass(['material-icons', _color, 'text-darken-3']).
                            setText('access_time')
                    ).
                    addComponent(
                        new HtmlComponent('span').
                            addClass(['right']).
                            setText(options.traslados.length + ' servicio (s)')
                    ).
                    setText(options.nombre)
            );
            
        if (!options.traslados.isEmpty()) {
            var $body = new HtmlComponent('div').addClass('collapsible-body');
            var $list = new HtmlComponent('ul').addClass('collection');
            
            
            options.traslados.forEach(function (traslado) {
                $list.addComponent($creatorTrasladoAdmision(traslado)); 
            });
            
            $body.addComponent($list); $component.addComponent($body);
        }
        
        return $component; // Retornando servicio de Jornada
    };
    
    $createHorarioAdmision = function (options) {
        var $horario = new HtmlComponent('ul'); // Inicio de horario
        $horario.addClass(['collapsible','popout','collapsible-accordeon']);
            
        switch (options.jornada) {
            case (0) :
                for (var _index = 5; _index < 18; _index++) {
                    var $countTraslados = options.horario[_index].length;
                    
                    if ($countTraslados > 0) {
                        $horario.addComponent($creatorJornadaAdmision({
                            traslados : options.horario[_index],
                            nombre : $nombreJornada(_index),
                            numeroTraslados : options.numeroServicios
                        }));
                    } // Existen servicios en esa hora del Día
                }
            break;
            
            case (1) :
                for (var _index = 18; _index < 24; _index++) {
                    var $countTraslados = options.horario[_index].length;
                    
                    if ($countTraslados > 0) {
                        $horario.addComponent($creatorJornadaAdmision({
                            traslados : options.horario[_index],
                            nombre : $nombreJornada(_index),
                            numeroTraslados : options.numeroServicios
                        }));
                    } // Existen servicios en esa hora del Día
                }
                
                for (var _index = 0; _index < 6; _index++) {
                    var $countTraslados = options.horario[_index].length;
                    
                    if ($countTraslados > 0) {
                        $horario.addComponent($creatorJornadaAdmision({
                            traslados : options.horario[_index],
                            nombre : $nombreJornada(_index),
                            numeroTraslados : options.numeroServicios
                        }));
                    } // Existen servicios en esa hora del Día
                }
            break;
            
            case (2) :
                for (var _index = 0; _index < 24; _index++) {
                    var $countTraslados = options.horario[_index].length;
                    
                    if ($countTraslados > 0) {
                        $horario.addComponent($creatorJornadaAdmision({
                            traslados : options.horario[_index],
                            nombre : $nombreJornada(_index),
                            numeroTraslados : options.numeroServicios
                        }));
                    } // Existen servicios en esa hora del Día
                }
            break;
        }

        return $horario.create(); // Componente de Horario
    };
    
    function CreatorComponent (options) {
        switch (options.type) {
            // Creando horario de Admision
            case ('horarioAdmision') : return $createHorarioAdmision(options);
        }
    };
    
    notesalud.creator = CreatorComponent;
})(notesalud);