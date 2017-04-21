
/* global notesalud */

jQuery(document).ready(function () {
    
    // Atributos del buscador de EPS de Afiliación
        
    var $epss, $firstEps, $lastEps, $executeSearch, _filter;
    
    if (notesalud.resources.entidad_afiliacion) {
        jQuery('#eps-empty').view(false); jQuery('#list-eps').view(true);
    } // No se han cargado lista de EPS de afiliación
    
    // Funciones para estructurar Objetos
    
    $creatorEps = function (index, eps) {
        return new HtmlComponent('li').
            addClass(['collection-item','sel-eps']).
            addClass(['justify-align','truncate']).
            addAttribute('value',index).
            addAttribute('tabindex',(index + 1)).
            setText(eps.nombre).create(); // Creando componente
    };
    
    $selectorEps = function () {
        var $index = jQuery(this).attr('value'); notesalud.container.component.sideNav('hide');
        if (notesalud.selector.eps) { notesalud.selector.eps($epss[$index]); }
    };
    
    jQuery('#txt-filter-eps').keyup(function () {
        if (_filter !== jQuery(this).val().toLowerCase() && jQuery(this).val().full()) {
            _filter = jQuery(this).val().toLowerCase();
        
            if ($executeSearch) { clearTimeout($executeSearch); }

            $executeSearch = setTimeout(function () {
                notesalud.database.search({
                    type : 'filter',
                    filter : '%' + _filter + '%',
                    table : 'entidad_afiliacion',
                    column : 'nombre',
                    setList : function (eps) {
                        jQuery('#list-eps').empty(); $epss = eps; 

                        if (!$epss.isEmpty()) {
                            jQuery.each($epss, function (index, entidad) {
                                jQuery('#list-eps').append($creatorEps(index,entidad));
                            });

                            jQuery('.sel-eps').click($selectorEps);
                            $firstEps = jQuery('#list-eps li').first();
                            $lastEps = jQuery('#list-eps li').last();
                        }

                        else { 
                            notesalud.toast('No se encontraton EPS con la busqueda establecida'); 
                        }
                    }
                });
            },750);
        }
        
        else { if ($executeSearch) clearTimeout($executeSearch); }
    });
    
    jQuery('#buscador-eps').keydown(function(ev) {
        var _keyCode = ev.keyCode, $component = jQuery(':focus');
        
        if (_keyCode === 27) { jQuery('#sidenav-overlay').click(); return; } // Esc
        
        if ($epss && $epss.length > 0) {
            switch (_keyCode) {
                case (40) : // Flecha hacia abajo
                    if ($component.attr('id') === 'txt-filter-eps') { $firstEps.focus(); }
                    
                    else {
                        if ($component.attr('value') === $lastEps.attr('value')) { 
                            jQuery('#txt-filter-eps').focus();
                        }
                        
                        else { $component.next().focus(); }
                    }
                break;
                
                case (38) : // Flecha hacia arriba
                    if ($component.attr('value') === $firstEps.attr('value')) {
                        jQuery('#txt-filter-eps').focus();
                    }
                    
                    else if ($component.attr('id') === 'txt-filter-eps') { $lastEps.focus(); }
                    
                    else{ $component.prev().focus(); }
                break;
                    
                case (13) : // Enter
                    ev.preventDefault(); // Cancelando evento previo del Enter sobre contenedor
                    
                    if ($component.hasClass('collection-item')) { $component.click(); }
                    
                    else if ($component.attr('id')==='txt-filter-eps') { $firstEps.focus(); }
                break;
            }
        }
    });
    
    jQuery('#txt-filter-eps').focus(); jQuery('.text-control').textControl();
});