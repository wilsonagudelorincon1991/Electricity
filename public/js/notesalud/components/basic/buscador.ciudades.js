
/* global notesalud */

jQuery(document).ready(function () {
    
    // Atributos del buscador de Ciudades
        
    var $ciudades, $firstCiudad, $lastCiudad, $executeSearch, _filter;
    
    if (notesalud.resources.ciudad) {
        jQuery('#ciudades-empty').view(false); jQuery('#list-ciudades').view(true);
    } // No se han cargado lista de ciudades
    
    // Funciones para estructurar Objetos
    
    $creatorCiudad = function (index, ciudad) {
        var _nombre = ciudad.nombre + ' (' + ciudad.departamento + ')';
        
        return new HtmlComponent('li').
            addClass(['collection-item','sel-ciudad','justify-align']).
            addAttribute('value',index).
            addAttribute('tabindex',(index + 1)).
            setText(_nombre).create(); // Creando componente
    };
    
    $selectorCiudad = function () {
        var _index = jQuery(this).attr('value'); notesalud.container.component.sideNav('hide');
        if (notesalud.selector.ciudad) { notesalud.selector.ciudad($ciudades[_index]); } 
    };
    
    jQuery('#txt-filter-ciudad').keyup(function () {
        if (_filter !== jQuery(this).val().toLowerCase() && jQuery(this).val().full()) {
            _filter = jQuery(this).val().toLowerCase();
        
            if ($executeSearch) { clearTimeout($executeSearch); }

            $executeSearch = setTimeout(function () {
                notesalud.database.search({
                    table : 'ciudad',
                    column : 'nombre',
                    filter : _filter + '%',
                    type : 'filter',
                    setList : function (ciudades) {
                        jQuery('#list-ciudades').empty(); $ciudades = ciudades; 

                        if (!$ciudades.isEmpty()) {
                            jQuery.each($ciudades, function (index, ciudad) {
                                jQuery('#list-ciudades').append($creatorCiudad(index,ciudad));
                            });

                            jQuery('.sel-ciudad').click($selectorCiudad);
                            $firstCiudad = jQuery('#list-ciudades li').first();
                            $lastCiudad = jQuery('#list-ciudades li').last();
                        }

                        else { 
                            notesalud.toast('No se encontraton ciudades con la busqueda establecida'); 
                        }
                    }
                });
            },750);
        }
        
        else { if ($executeSearch) clearTimeout($executeSearch); }
    });
    
    jQuery('#buscador-ciudades').keydown(function(ev) {
        var _keyCode = ev.keyCode, $component = jQuery(':focus');
        
        if (_keyCode === 27) { jQuery('#sidenav-overlay').click(); return; } // Esc
        
        if ($ciudades && $ciudades.length > 0) {
            switch (_keyCode) {
                case (40) : // Flecha hacia abajo
                    if ($component.attr('id') === 'txt-filter-ciudad') { $firstCiudad.focus(); }
                    
                    else {
                        if ($component.attr('value') === $lastCiudad.attr('value')) { 
                            jQuery('#txt-filter-ciudad').focus();
                        }
                        
                        else { $component.next().focus(); }
                    }
                break;
                
                case (38) : // Flecha hacia arriba
                    if ($component.attr('value') === $firstCiudad.attr('value')) {
                        jQuery('#txt-filter-ciudad').focus();
                    }
                    
                    else if ($component.attr('id') === 'txt-filter-ciudad') { $lastCiudad.focus(); }
                    
                    else{ $component.prev().focus(); }
                break;
                    
                case (13) : // Enter
                    ev.preventDefault(); // Cancelando evento previo del Enter sobre contenedor
                    
                    if ($component.hasClass('collection-item')) { $component.click(); }
                    
                    else if ($component.attr('id')==='txt-filter-ciudad') { $firstCiudad.focus(); }
                break;
            }
        }
    });
    
    jQuery('#txt-filter-ciudad').focus(); jQuery('.text-control').textControl();
});