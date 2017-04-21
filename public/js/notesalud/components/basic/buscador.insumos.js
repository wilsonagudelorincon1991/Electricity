
/* global notesalud */

jQuery(document).ready(function () {
    
    // Atributos del buscador de Insumos
        
    var $insumos, $firstInsumo, $lastInsumo, $executeSearch, _filter;
    
    if (notesalud.resources.insumo) {
        jQuery('#insumos-empty').view(false); jQuery('#list-insumos').view(true);
    } // No se han cargado lista de insumos
    
    // Funciones para estructurar Objetos
    
    $creatorInsumo = function (index, insumo) {
        return new HtmlComponent('li').
            addClass(['collection-item','sel-insumo','justify-align']).
            addAttribute('value',index).
            addAttribute('tabindex',(index + 1)).
            setText(insumo.nombre + ' - (' + insumo.tipo + ')').create(); 
    };
    
    $selectorInsumo = function () {
        var _index = jQuery(this).attr('value'); notesalud.container.component.sideNav('hide');
        if (notesalud.selector.insumo) { notesalud.selector.insumo($insumos[_index]); }
    };
    
    jQuery('#txt-filter-insumo').keyup(function () {
        if (_filter !== jQuery(this).val().toLowerCase() && jQuery(this).val().full()) {
            _filter = jQuery(this).val().toLowerCase();
        
            if ($executeSearch) { clearTimeout($executeSearch); }

            $executeSearch = setTimeout(function () {
                notesalud.database.search({
                    type : 'filter',
                    filter : '%' + _filter + '%',
                    table : 'insumo',
                    column : 'nombre',
                    setList : function (insumos) {
                        jQuery('#list-insumos').empty(); $insumos = insumos; 

                        if (!$insumos.isEmpty()) {
                            jQuery.each($insumos, function (index, insumo) {
                                jQuery('#list-insumos').append($creatorInsumo(index,insumo));
                            });

                            jQuery('.sel-insumo').click($selectorInsumo);
                            $firstInsumo = jQuery('#list-insumos li').first();
                            $lastInsumo = jQuery('#list-insumos li').last();
                        }

                        else { 
                            notesalud.toast('No se encontraton insumos con la busqueda establecida'); 
                        }
                    }
                });
            },750);
        }
        
        else { if ($executeSearch) clearTimeout($executeSearch); }
    });
    
    jQuery('#buscador-insumos').keydown(function(ev) {
        var _keyCode = ev.keyCode, $component = jQuery(':focus');
        
        if (_keyCode === 27) { jQuery('#sidenav-overlay').click(); return; } // Esc
        
        if ($insumos && $insumos.length > 0) {
            switch (_keyCode) {
                case (40) : // Flecha hacia abajo
                    if ($component.attr('id') === 'txt-filter-insumo') { $firstInsumo.focus(); }
                    
                    else {
                        if ($component.attr('value') === $lastInsumo.attr('value')) { 
                            jQuery('#txt-filter-insumo').focus();
                        }
                        
                        else { $component.next().focus(); }
                    }
                break;
                
                case (38) : // Flecha hacia arriba
                    if ($component.attr('value') === $firstInsumo.attr('value')) {
                        jQuery('#txt-filter-insumo').focus();
                    }
                    
                    else if ($component.attr('id') === 'txt-filter-insumo') { $lastInsumo.focus(); }
                    
                    else{ $component.prev().focus(); }
                break;
                    
                case (13) : // Enter
                    ev.preventDefault(); // Cancelando evento previo del Enter sobre contenedor
                    
                    if ($component.hasClass('collection-item')) { $component.click(); }
                    
                    else if ($component.attr('id')==='txt-filter-insumo') { $firstInsumo.focus(); }
                break;
            }
        }
    });
    
    jQuery('#txt-filter-entidad').focus(); jQuery('.text-control').textControl();
});