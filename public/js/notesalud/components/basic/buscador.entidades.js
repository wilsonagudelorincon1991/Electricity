
/* global notesalud */

jQuery(document).ready(function () {
    
    // Atributos del buscador de Entidades de Autorización
        
    var $entidades, $firstEntidad, $lastEntidad, $executeSearch, _filter;
    
    if (notesalud.resources.entidad_autorizacion) {
        jQuery('#entidades-empty').view(false); jQuery('#list-entidades').view(true);
    } // No se han cargado lista de entidades de autorización
    
    // Funciones para estructurar Objetos
    
    $creatorEntidad = function (index, entidad) {
        return new HtmlComponent('li').
            addClass(['collection-item','sel-entidad']).
            addClass(['justify-align','truncate']).
            addAttribute('value',index).
            addAttribute('tabindex',(index + 1)).
            setText(entidad.nombre).create(); // Creando componente
    };
    
    $selectorEntidad = function () {
        var $index = jQuery(this).attr('value'); notesalud.container.component.sideNav('hide');
        if (notesalud.selector.entidad) { notesalud.selector.entidad($entidades[$index]); }
    };
    
    jQuery('#txt-filter-entidad').keyup(function () {
        if (_filter !== jQuery(this).val().toLowerCase() && jQuery(this).val().full()) {
            _filter = jQuery(this).val().toLowerCase();
        
            if ($executeSearch) { clearTimeout($executeSearch); }

            $executeSearch = setTimeout(function () {
                notesalud.database.search({
                    type : 'filter',
                    filter : '%' + _filter + '%',
                    table : 'entidad_autorizacion',
                    column : 'nombre',
                    setList : function (entidades) {
                        jQuery('#list-entidades').empty(); $entidades = entidades; 

                        if (!$entidades.isEmpty()) {
                            jQuery.each($entidades, function (index, entidad) {
                                jQuery('#list-entidades').append($creatorEntidad(index,entidad));
                            });

                            jQuery('.sel-entidad').click($selectorEntidad);
                            $firstEntidad = jQuery('#list-entidades li').first();
                            $lastEntidad = jQuery('#list-entidades li').last();
                        }

                        else { 
                            notesalud.toast('No se encontraton entidades con la busqueda establecida'); 
                        }
                    }
                });
            },750);
        }
        
        else { if ($executeSearch) clearTimeout($executeSearch); }
    });
    
    jQuery('#buscador-entidades').keydown(function(ev) {
        var _keyCode = ev.keyCode, $component = jQuery(':focus');
        
        if (_keyCode === 27) { jQuery('#sidenav-overlay').click(); return; } // Esc
        
        if ($entidades && $entidades.length > 0) {
            switch (_keyCode) {
                case (40) : // Flecha hacia abajo
                    if ($component.attr('id') === 'txt-filter-entidad') { $firstEntidad.focus(); }
                    
                    else {
                        if ($component.attr('value') === $lastEntidad.attr('value')) { 
                            jQuery('#txt-filter-entidad').focus();
                        }
                        
                        else { $component.next().focus(); }
                    }
                break;
                
                case (38) : // Flecha hacia arriba
                    if ($component.attr('value') === $firstEntidad.attr('value')) {
                        jQuery('#txt-filter-entidad').focus();
                    }
                    
                    else if ($component.attr('id') === 'txt-filter-entidad') { $lastEntidad.focus(); }
                    
                    else{ $component.prev().focus(); }
                break;
                    
                case (13) : // Enter
                    ev.preventDefault(); // Cancelando evento previo del Enter sobre contenedor
                    
                    if ($component.hasClass('collection-item')) { $component.click(); }
                    
                    else if ($component.attr('id')==='txt-filter-entidad') { $firstEntidad.focus(); }
                break;
            }
        }
    });
    
    jQuery('#txt-filter-entidad').focus(); jQuery('.text-control').textControl();
});