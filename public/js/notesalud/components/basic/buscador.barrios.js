
/* global notesalud */

jQuery(document).ready(function () {
    
    // Atributos del buscador de Barrios
    var $barrios, $firstBarrio, $lastBarrio, $ciudades = [];
    var _event = 'search', $ciudad, _filter, $executeSearch;
    
    notesalud.database.search({
        table : 'ciudad', type : 'all',
        setList : function (ciudades) { $ciudades = ciudades; }
    });
    
    if (notesalud.resources.ciudad) {
        jQuery('#ciudades-empty').view(false); 
    } // No se han cargado lista de ciudades
    
    if (notesalud.resources.barrio) {
        jQuery('#barrios-empty').view(false); jQuery('#list-barrios').view(true);
    } // No se han cargado lista de barrios
    
    // Funciones para estructurar Objetos
    
    $creatorBarrio = function (index, barrio) {
        return new HtmlComponent('li').
            addClass(['collection-item','sel-barrio','justify-align']).
            addAttribute('value',index).
            addAttribute('tabindex',(index + 1)).
            setText(barrio.nombre).create(); // Creando componente
    };
    
    $selectorBarrio = function () {
        var _index = jQuery(this).attr('value'); notesalud.sidenav.barrio.hide();
        var $barrio = $barrios[_index]; $barrio['ciudad'] = $ciudad.nombre;
        if (notesalud.selector.barrio) { notesalud.selector.barrio($barrio); }
    };
    
    jQuery('#txt-filter-ciudad').autoComplete({
        minChars: 2, zIndex: 16,
        source: function (filter, suggest) {
            filter = filter.toLowerCase(); var matches = [], indexs = [];
            
            jQuery.each($ciudades, function (index, ciudad) {
                if (~ciudad.nombre.toLowerCase().indexOf(filter)) {
                    matches.push(ciudad.nombre); indexs.push(index); 
                }
            });

            suggest(matches, indexs); // Definiendo lista para Autocompletar
        },
        onSelect : function (index) {
            jQuery('#list-barrios').empty(); $ciudad = $ciudades[index];
        }
    });

    jQuery('#txt-filter-ciudad').focusout(function () {
        if ($ciudad) { jQuery(this).val($ciudad.nombre); }
    });

    jQuery('#txt-filter-barrio').keyup(function () {
        if (_filter !== jQuery(this).val().toLowerCase() && jQuery(this).val().full()) {
            _filter = jQuery(this).val().toLowerCase(); 
        
            if ($executeSearch) { clearTimeout($executeSearch); }

            $executeSearch = setTimeout(function () {
                notesalud.database.search({
                    type : 'barrios',
                    idCiudad : ($ciudad) ? $ciudad.id : undefined,
                    filter : _filter,
                    setList : function (barrios) {
                        jQuery('#list-barrios').empty(); $barrios = barrios; 

                        if (!$barrios.isEmpty()) {
                            jQuery.each($barrios, function (index, barrio) {
                                jQuery('#list-barrios').append($creatorBarrio(index,barrio));
                            });

                            jQuery('.sel-barrio').click($selectorBarrio);
                            $firstBarrio = jQuery('#list-barrios li').first();
                            $lastBarrio = jQuery('#list-barrios li').last();
                        }

                        else { 
                            notesalud.toast('No se encontraton barrios con la busqueda establecida'); 
                        }
                    }
                });
            },750);
        }
        
        else { if ($executeSearch) clearTimeout($executeSearch); }
    });

    jQuery('#buscador-barrios').keydown(function(ev) {
        var _keyCode = ev.keyCode, $component = jQuery(':focus');
        
        if (_keyCode === 27) { jQuery('#sidenav-overlay').click(); return; } // Esc
        
        if ($barrios && $barrios.length > 0) {
            switch (_keyCode) {
                case (40) : // Flecha hacia abajo
                    if ($component.attr('id') === 'txt-filter-barrio') { $firstBarrio.focus(); }
                    
                    else {
                        if ($component.attr('value') === $lastBarrio.attr('value')) { 
                            jQuery('#txt-filter-barrio').focus();
                        }
                        
                        else { $component.next().focus(); }
                    }
                break;
                
                case (38) : // Flecha hacia arriba
                    if ($component.attr('value') === $firstBarrio.attr('value')) {
                        jQuery('#txt-filter-barrio').focus();
                    }
                    
                    else if ($component.attr('id') === 'txt-filter-barrio') { $lastBarrio.focus(); }
                    
                    else{ $component.prev().focus(); }
                break;
                    
                case (13) : // Enter
                    ev.preventDefault(); // Cancelando evento previo del Enter sobre contenedor
                    
                    if ($component.hasClass('collection-item')) { $component.click(); }
                    
                    else if ($component.attr('id')==='txt-filter-barrio') { $firstBarrio.focus(); }
                break;
            }
        }
    });
    
    jQuery('#btn-event-barrio').click(function () { 
        var $icon = jQuery(this).find('i'); _event = jQuery(this).data('event');
        
        switch (_event) {
            case ('search') :
                $icon.html('add'); jQuery('#txt-filter-ciudad').focus(); jQuery(this).data('event','save');
                jQuery('#list-barrios').view(true); jQuery('#input-filter-barrio').view(true);
                jQuery('#btn-register-barrio').view(false); jQuery('#input-register-barrio').view(false);
            break;
            
            case ('save') :
                $icon.html('search'); jQuery('#txt-filter-ciudad').focus(); jQuery(this).data('event','search');
                jQuery('#list-barrios').view(false); jQuery('#input-filter-barrio').view(false);
                jQuery('#btn-register-barrio').view(true); jQuery('#input-register-barrio').view(true);
            break;
        }
    });
    
    jQuery('#btn-register-barrio a').click(function () {
        var $btnRegistrarBarrio = jQuery(this);
        
        if (!$ciudad) {
            notesalud.toast('Debe seleccionar ciudad para registrar barrio'); return;
        } // No ha seleccionado la ciudad del barrio
        
        var $validate = jQuery('#txt-register-barrio').validateInput();
        
        if ($validate.success) {
            $btnRegistrarBarrio.enabled(false); // Desactivando botón
            
            notesalud.http.post({
                url : notesalud.getRouteServices('barrio'),
                data : {
                    id_ciudad : $ciudad.id, 
                    nombre : jQuery('#txt-register-barrio').valtrim()
                },
                success : function (result) {
                    if (result.success) {
                        notesalud.database.add({ table : 'barrio', object : result.data });
                        jQuery('#txt-register-barrio').clean(); notesalud.toast(result.message);
                    } // Barrio registrada correctamente

                    else {
                        notesalud.toast('Ocurrio un error al registrar el barrio');
                    } // Barrio no registrada correctamente
                    
                    $btnRegistrarBarrio.enabled(true); // Activando botón
                },
                failed : function (jqXHR) {
                    notesalud.httpFailed({
                        jqXHR : jqXHR, text : 'Ocurrio un error al registrar barrio'
                    });
                }
            });
        }
    });
    
    jQuery('#txt-filter-ciudad').focus(); jQuery('.text-control').textControl(); 
});