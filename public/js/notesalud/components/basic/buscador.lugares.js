
/* global notesalud */

jQuery(document).ready(function () {
    
    // Atributos del buscador de Lugares
        
    var $lugares, $firstLugar, $lastLugar, $executeSearch, _filter, _event, $barrio = { id : 0 };
    
    if (notesalud.resources.lugar) {
        jQuery('#lugares-empty').view(false); jQuery('#list-lugares').view(true);
    } // No se han cargado lista de lugares
    
    // Funciones para estructurar Objetos
    
    $inputSuccess = function (input, text) {
        input.value(text); input.parent().inputSuccess();
    };
    
    $creatorLugar = function (index, lugar) {
        var _text = lugar.nombre + ' (' + lugar.ciudad + ')';
        
        return new HtmlComponent('li').
            addClass(['collection-item','sel-lugar','justify-align']).
            addAttribute('value',index).
            addAttribute('tabindex',(index + 1)).
            setText(_text).create(); // Creando componente
    };
    
    $selectorLugar = function () {
        var $index = jQuery(this).attr('value'); notesalud.container.component.sideNav('hide');
        if (notesalud.selector.lugar) { notesalud.selector.lugar($lugares[$index]); }
    };
    
    jQuery('#txt-filter-lugar').keyup(function () {
        if (_filter !== jQuery(this).val().toLowerCase() && jQuery(this).val().full()) {
            _filter = jQuery(this).val().toLowerCase();
        
            if ($executeSearch) { clearTimeout($executeSearch); }

            $executeSearch = setTimeout(function () {
                notesalud.database.search({
                    type : 'filter',
                    filter : '%' + _filter + '%',
                    table : 'lugar',
                    column : 'nombre',
                    setList : function (ciudades) {
                        jQuery('#list-lugares').empty(); $lugares = ciudades; 

                        if (!$lugares.isEmpty()) {
                            jQuery.each($lugares, function (index, lugar) {
                                jQuery('#list-lugares').append($creatorLugar(index,lugar));
                            });

                            jQuery('.sel-lugar').click($selectorLugar);
                            $firstLugar = jQuery('#list-lugares li').first();
                            $lastLugar = jQuery('#list-lugares li').last();
                        }

                        else { 
                            notesalud.toast('No se encontraton lugares con la busqueda establecida'); 
                        }
                    }
                });
            },750);
        }
        
        else { if ($executeSearch) clearTimeout($executeSearch); }
    });
    
    jQuery('#buscador-lugares').keydown(function(ev) {
        var _keyCode = ev.keyCode, $component = jQuery(':focus');
        
        if (_keyCode === 27) { 
            jQuery('#sidenav-overlay').click(); return; 
        } // Esc
        
        if ($lugares && $lugares.length > 0) {
            switch (_keyCode) {
                case (40) : // Flecha hacia abajo
                    if ($component.attr('id') === 'txt-filter-lugar') { $firstLugar.focus(); }
                    
                    else {
                        if ($component.attr('value') === $lastLugar.attr('value')) { 
                            jQuery('#txt-filter-lugar').focus();
                        }
                        
                        else { $component.next().focus(); }
                    }
                break;
                
                case (38) : // Flecha hacia arriba
                    if ($component.attr('value') === $firstLugar.attr('value')) {
                        jQuery('#txt-filter-lugar').focus();
                    }
                    
                    else if ($component.attr('id') === 'txt-filter-lugar') { $lastLugar.focus(); }
                    
                    else{ $component.prev().focus(); }
                break;
                    
                case (13) : // Enter
                    ev.preventDefault(); // Cancelando evento previo del Enter sobre contenedor
                    
                    if ($component.hasClass('collection-item')) { $component.click(); }
                    
                    else if ($component.attr('id')==='txt-filter-lugar') { $firstLugar.focus(); }
                break;
            }
        }
    });
    
    jQuery('#btn-event-lugar').click(function () { 
        var $icon = jQuery(this).find('i'); _event = jQuery(this).data('event');
        
        switch (_event) {
            case ('search') :
                $icon.html('add'); // Cambiando el icono para registrar
                jQuery('.register-lugar').view(false); jQuery('.search-lugar').view(true); 
                jQuery('#txt-filter-lugar').focus(); jQuery(this).data('event','save');
            break;
            
            case ('save') :
                $icon.html('search'); // Cambiando el icono para buscar
                jQuery('.register-lugar').view(true); jQuery('.search-lugar').view(false); 
                jQuery('#txt-nombre-lugar').focus(); jQuery(this).data('event','search');
            break;
        }
    });
    
    jQuery('#txt-barrio-lugar').focus(function () {
        notesalud.sidenav.lugar.hide(); // Ocultando componente
        
        notesalud.selector.barrio = function (barrio) { 
            notesalud.sidenav.lugar.show(); $barrio = barrio; 
            var _barrio = $barrio.nombre + ' (' + $barrio.ciudad + ')';
            $inputSuccess(jQuery('#txt-barrio-lugar'),_barrio); 
        };
    });
    
    jQuery('#txt-barrio-lugar').sideNav({ menuWidth: 320, edge: 'right' });
    
    jQuery('#btn-register-lugar').click(function () {
        var $btnRegistrarLugar = jQuery(this); // Botón del evento
        
        var $validate = jQuery('.input-field.register-lugar').validateInput();
        
        if ($validate.success) {
            $btnRegistrarLugar.enabled(false); // Desactivando botón
            
            notesalud.http.post({
                url : notesalud.getRouteServices('lugar'),
                data : {
                    nombre : jQuery('#txt-nombre-lugar').valtrim(),
                    direccion : jQuery('#txt-direccion-lugar').valtrim(),
                    id_barrio : $barrio.id
                },
                success : function (result) {
                    if (result.success) {
                        notesalud.database.add({ table : 'lugar', object : result.data });
                        jQuery('.input-field.register-lugar').clean();
                        $barrio = { id : 0 }; notesalud.toast(result.message);
                    } // Barrio registrada correctamente

                    else {
                        notesalud.toast('Ocurrio un error al registrar el barrio');
                    } // Barrio no registrada correctamente
                    
                    $btnRegistrarLugar.enabled(true); // Activando botón
                },
                failed : function (jqXHR) {
                    $btnRegistrarLugar.enabled(true); // Activando botón
                    
                    notesalud.httpFailed({
                        jqXHR : jqXHR, text : 'Ocurrio un error al registrar lugar'
                    });
                }
            });
        }
    });
    
    jQuery('#txt-filter-lugar').focus(); jQuery('.text-control').textControl();
});