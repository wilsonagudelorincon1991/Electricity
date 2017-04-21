
/* global notesalud */

jQuery(document).ready(function () {
    
    // Atributos del buscador de Diagnosticos
        
    var $subcapitulos, $capitulos, $allSubcapitulos;
    
    var $capitulo, $subcapitulo, _filter, $executeSearch;
    var $diagnosticos, $firstDiagnostico, $lastDiagnostico;
    
    notesalud.database.get({
        table : 'capitulo_cie10',
        type : 'Capitulos del CIE10',
        cie10 : true,
        setList : function (capitulos) { $capitulos = capitulos; }
    });
    
    notesalud.database.get({
        table : 'subcapitulo_cie10',
        type : 'SubCapitulos del CIE10',
        cie10 : true,
        setList : function (subcapitulos) { 
            $subcapitulos = subcapitulos; $allSubcapitulos = $subcapitulos;
        }
    });
    
    // Funciones para estructurar Objetos
    
    $executeSearchDiagnostico = function () {
        notesalud.database.search({
            type : 'cie10',
            subcapitulos : $subcapitulos,
            capitulo : $capitulo,
            subcapitulo : $subcapitulo,
            filter : _filter,
            setList : function (diagnosticos) {
                jQuery('#txt-filter-diagnostico').enabled(true);
                jQuery('#loading-diagnostico').view(false); 
                jQuery('#txt-filter-diagnostico').focus();
                jQuery('#list-diagnosticos').empty(); $diagnosticos = diagnosticos;

                if ($diagnosticos !== undefined && !$diagnosticos.isEmpty()) {
                    jQuery.each($diagnosticos, function (index, diagnostico) {
                        jQuery('#list-diagnosticos').append($creatorDiagnostico(index,diagnostico));
                    });

                    jQuery('.sel-diagnostico').click(selectorDiagnostico);
                    $firstDiagnostico = jQuery('#list-diagnosticos li').first();
                    $lastDiagnostico = jQuery('#list-diagnosticosli').last();
                }

                else { 
                    notesalud.toast('No se encontraton diagnósticos con la busqueda establecida'); 
                }
            }
        });
    };
    
    $creatorDiagnostico = function (index, diagnostico) {
        var _text = diagnostico.codigo + ', ' + diagnostico.nombre_cientifico;

        return new HtmlComponent('li').
            addClass(['collection-item','sel-diagnostico']).
            addClass('justify-align').
            addAttribute('value',index).
            addAttribute('tabindex',(index + 1)).
            setText(_text).create(); // Creando componente
    };
    
    selectorDiagnostico = function () {
        var _index = jQuery(this).attr('value'); notesalud.container.component.sideNav('hide');
        if (notesalud.selector.diagnostico) { notesalud.selector.diagnostico($diagnosticos[_index]); } 
    };
    
    jQuery('#txt-filter-capitulo').autoComplete({
        minChars: 2,
        source: function (filter, suggest) {
            filter = filter.toLowerCase(); var matches = [], indexs = [];
            
            jQuery.each($capitulos, function (index, capitulo) {
                if (~capitulo.titulo.toLowerCase().indexOf(filter)) {
                    matches.push(capitulo.titulo); indexs.push(index); 
                }
            });

            suggest(matches, indexs); // Enviando lista y sus índices para Autocompletar
        },
        onSelect : function (index) { 
            $capitulo = $capitulos[index]; // Capitulo seleccionado
            
            notesalud.database.search({
                type : 'equals',
                table : 'subcapitulo_cie10',
                column : 'id_capitulo_cie10',
                cie10 : true,
                value : $capitulo.id,
                setList : function (subcapitulos) {
                    jQuery('#txt-filter-subcapitulo').clean(); // Limpiando componente
                    $subcapitulo = undefined; $subcapitulos = subcapitulos;
                }
            });
        }
    });
    
    jQuery('#txt-filter-capitulo').focusout(function () {
        if ($capitulo !== undefined && jQuery(this).val() !== $capitulo.titulo) {
            jQuery(this).clean(); $capitulo = undefined; $subcapitulo = undefined;
            $subcapitulos = $allSubcapitulos; jQuery('#txt-filter-subcapitulo').clean(); 
        }
    });
    
    jQuery('#txt-filter-subcapitulo').autoComplete({
        minChars: 2,
        source: function (filter, suggest) {
            filter = filter.toLowerCase(); var matches = [], indexs = [];
            
            jQuery.each($subcapitulos, function (index, subcapitulo) {
                var _value = subcapitulo.titulo; // Titulo del Capitulo
                if (~_value.toLowerCase().indexOf(filter)) { matches.push(_value); indexs.push(index); }
            });

            suggest(matches, indexs); // Enviando lista y sus índices para Autocompletar
        },
        onSelect : function (index) { 
            $subcapitulo = $subcapitulos[index]; // SubCapitulo seleccionado
        }
    });
    
    jQuery('#txt-filter-subcapitulo').focusout(function () {
        if ($subcapitulo !== undefined && jQuery(this).val() !== $subcapitulo.titulo) {
            jQuery(this).clean(); $subcapitulo = undefined;
        }
    });
    
    jQuery('#txt-filter-diagnostico').keyup(function () {
        if (_filter !== jQuery(this).val().toLowerCase() && jQuery(this).val().full()) {
            _filter = jQuery(this).val().toLowerCase();
        
            if ($executeSearch) { clearTimeout($executeSearch); }

            $executeSearch = setTimeout(function () {
                jQuery('#loading-diagnostico').view(true); jQuery('#txt-filter-diagnostico').blur();
                jQuery('#txt-filter-diagnostico').enabled(false);
                setTimeout(function () { $executeSearchDiagnostico(); }, 500);
            },1000);
        }
        
        else { if ($executeSearch) { clearTimeout($executeSearch); } }
    });
    
    jQuery('#buscador-diagnosticos').keydown(function (ev) {
        var _keyCode = ev.keyCode, $component = jQuery(':focus');
        
        if (_keyCode === 27) { jQuery('#sidenav-overlay').click(); return; } // Esc
        
        if ($diagnosticos && !$diagnosticos.isEmpty()) {
            switch (_keyCode) {
                case (40) : // Flecha hacia abajo
                    if ($component.attr('id') === 'txt-filter-diagnostico') { $firstDiagnostico.focus(); }
                    
                    else {
                        if ($component.attr('value') === $lastDiagnostico.attr('value')) { 
                            jQuery('#txt-filter-diagnostico').focus();
                        }
                        
                        else { $component.next().focus(); }
                    }
                break;
                
                case (38) : // Flecha hacia arriba
                    if ($component.attr('value') === $firstDiagnostico.attr('value')) {
                        jQuery('#txt-filter-diagnostico').focus();
                    }
                    
                    else if ($component.attr('id') === 'txt-filter-diagnostico') { $lastDiagnostico.focus(); }
                    
                    else{ $component.prev().focus(); }
                break;
                    
                case (13) : // Enter
                    ev.preventDefault(); // Cancelando evento previo del Enter sobre contenedor
                    
                    if ($component.hasClass('collection-item')) { $component.click(); }
                    
                    else if ($component.attr('id')==='txt-filter-diagnostico') { $firstDiagnostico.focus(); }
                break;
            }
        }
    });
    
    jQuery('#txt-filter-capitulo').focus(); jQuery('.text-control').textControl();
});