
/* ============================================================
 * Softtion Plugin JQuery v1.0.5 
 * Version proceso: Softtion Plugin JQuery v1.0.8
 * ============================================================
 * Author: Daniel Andrés Castillo Pedroza
 * Author: Fabián Andrés Urrego Bohórquez
 * Created: 02 de septiembre de 2015
 * Updated: Undefined
 * Location: Valledupar, Cesar, Colombia
 * ============================================================
 */

/* global softtion */

if (typeof jQuery === 'undefined') {
    throw new Error('Softtion JQuery JavaScript requiere jQuery');
} // Validando que JQuery este Cargado

if (typeof softtion === 'undefined') {
    throw new Error('Softtion JQuery JavaScript requiere softtion');
} // Validando que Softtion este Cargado

(function (softtion) {
    
    softtion.TextControl = {
        ALFABETICOS : 'alphabetic',
        NUMERICOS : 'number',
        TODOS : 'text',
        NINGUNO : 'nothing',
        ALFA_NUMERICOS : 'alphanumber',
        ALFA_SPACE : 'alphaspace',
        ALFA_NUMERICO_SPACE : 'alphanumberspace',
        DECIMALES : 'decimals'
    };
    
    softtion.Animateds = {
        bounce : 'bounce',
        flash : 'flash',
        pulse : 'pulse',
        rubberBand : 'rubberBand',
        shake : 'shake',
        swing : 'swing',
        tada : 'tada',
        wobble : 'wobble',
        jello : 'jello',
        bounceIn : 'bounceIn',
        bounceInDown : 'bounceInDown',
        bounceInLeft : 'bounceInLeft',
        bounceInRight : 'bounceInRight',
        bounceInUp : 'bounceInUp',
        bounceOut : 'bounceOut',
        bounceOutDown : 'bounceOutDown',
        bounceOutLeft : 'bounceOutLeft',
        bounceOutRight : 'bounceOutRight',
        bounceOutUp : 'bounceOutUp',
        fadeIn : 'fadeIn',
        fadeInDown : 'fadeInDown',
        fadeInDownBig : 'fadeInDownBig',
        fadeInLeft : 'fadeInLeft',
        fadeInLeftBig : 'fadeInLeftBig',
        fadeInRight : 'fadeInRight',
        fadeInRightBig : 'fadeInRightBig',
        fadeInUp : 'fadeInUp',
        fadeInUpBig : 'fadeInUpBig',
        fadeOut : 'fadeOut',
        fadeOutDown : 'fadeOutDown',
        fadeOutDownBig : 'fadeOutDownBig',
        fadeOutLeft : 'fadeOutLeft',
        fadeOutLeftBig : 'fadeOutLeftBig',
        fadeOutRight : 'fadeOutRight',
        fadeOutRightBig : 'fadeOutRightBig',
        fadeOutUp : 'fadeOutUp',
        fadeOutUpBig : 'fadeOutUpBig',
        flipInX : 'flipInX',
        flipInY : 'flipInY',
        flipOutX : 'flipOutX',
        flipOutY : 'flipOutY',
        lightSpeedIn : 'lightSpeedIn',
        lightSpeedOut : 'lightSpeedOut',
        rotateIn : 'rotateIn',
        rotateInDownLeft : 'rotateInDownLeft',
        rotateInDownRight : 'rotateInDownRight',
        rotateInUpLeft : 'rotateInUpLeft',
        rotateInUpRight : 'rotateInUpRight',
        rotateOut : 'rotateOut',
        rotateOutDownLeft : 'rotateOutDownLeft',
        rotateOutDownRight : 'rotateOutDownRight',
        rotateOutUpLeft : 'rotateOutUpLeft',
        rotateOutUpRight : 'rotateOutUpRight',
        hinge : 'hinge',
        rollIn : 'rollIn',
        rollOut : 'rollOut',
        zoomIn : 'zoomIn',
        zoomInDown : 'zoomInDown',
        zoomInLeft : 'zoomInLeft',
        zoomInRight : 'zoomInRight',
        zoomInUp : 'zoomInUp',
        zoomOut : 'zoomOut',
        zoomOutDown : 'zoomOutDown',
        zoomOutLeft : 'zoomOutLeft',
        zoomOutRight : 'zoomOutRight',
        zoomOutUp : 'zoomOutUp',
        slideInDown : 'slideInDown',
        slideInLeft : 'slideInLeft',
        slideInRight : 'slideInRight',
        slideInUp : 'slideInUp',
        slideOutDown : 'slideOutDown',
        slideOutLeft : 'slideOutLeft',
        slideOutRight : 'slideOutRight',
        slideOutUp : 'slideOutUp'
    };
})(softtion);

(function (jQuery) {
        
    var $timer = undefined;
    
    isAlfabetico = function (key) { 
        return ((key > 64) && (key < 91))       // Abecedario mayúsculas
            || ((key > 96) && (key < 123))      // Abecedario minúsculas
            || (key === 241) || (key === 209)   // ñ, Ñ
            || (key === 225) || (key === 193)   // á, Á
            || (key === 233) || (key === 201)   // é, É
            || (key === 237) || (key === 205)   // í, Í
            || (key === 243) || (key === 211)   // ó, Ó
            || (key === 250) || (key === 218)   // ú, Ú
            || (key === 252) || (key === 220);  // ü, Ü
    }; 

    isNumerico = function (key) { 
        return (key > 47) && (key < 58); 
    }; 

    isAlfaSpace = function (key) { 
        return isAlfabetico(key) || (key === 32); 
    }; 

    isAlfaNumerico = function (key) { 
        return isAlfabetico(key) || isNumerico(key); 
    }; 

    isAlfaNumericoSpace = function (key) { 
        return isAlfaNumerico(key) || (key === 32); 
    }; 

    isDecimal = function (key, text) { 
        if (key === 46) { return text.indexOf('.') === -1; } return isNumerico(key); 
    }; 
    
    $validateKeyChar = function (attributes) {
        switch (attributes.type) {
            case (softtion.TextControl.ALFABETICOS) : return isAlfabetico(attributes.key); 
                
            case (softtion.TextControl.NUMERICOS) :  return isNumerico(attributes.key); 
                
            case (softtion.TextControl.ALFA_NUMERICOS) : return isAlfaNumerico(attributes.key); 
                
            case (softtion.TextControl.ALFA_SPACE) : return isAlfaSpace(attributes.key);
                
            case (softtion.TextControl.DECIMALES) : return isDecimal(attributes.key,attributes.text); 
                
            case (softtion.TextControl.ALFA_NUMERICO_SPACE) : return isAlfaNumericoSpace(attributes.key); 
                
            case (softtion.TextControl.NINGUNO) : return false; 
            
            default : return true; // Se aceptan cualquier caracter
        }
    };
    
    jQuery.fn.extend({
        /* ============================================================
         * Softtion Plugin JQuery : TextControl v1.0.1
         * Proceso para controlar los caracteres de un Input
         * ============================================================
         * Author: Daniel Andres Castillo Pedroza
         * Created: 11 de agosto de 2015
         * Location: Valledupar, Cesar, Colombia
         * ============================================================
         */
        textControl : function (options) {
            jQuery(this).each(function () {
                var $default = { success : undefined, failed : undefined };
                var $options = jQuery.extend({},$default,options);

                var _type = jQuery(this).data('type');         // Tipo de caracteres
                var $area = jQuery(this).find('textarea');     // TextArea
                var $input = jQuery(this).find('input');       // Input

                if ($input) {
                    var _maxLengthInput = $input.data('max-length');    // MaxLength Input
                    
                    $input.keypress(function (ev) {
                        if (_maxLengthInput > 0 && $input.val().length === _maxLengthInput) {
                            if ($options.failed) { $options.failed(ev.charCode); } return false;
                        } // Ha llegado al máximo de caracteres a permitir

                        var $keyValidate = { type : _type, key : ev.charCode, text : $input.val() };

                        if ($validateKeyChar($keyValidate)) { 
                            if ($options.sucess) { $options.sucess(ev.charCode); } return true;
                        } // El caracter digitado es permitido

                        else { 
                            if ($options.failed) { $options.failed(ev.charCode); } return false; 
                        } // El caracter digitado no es permitido
                    });
                }
                
                if ($area) {
                    var _maxLengthArea = $area.data('max-length'); // Texto máximo en TextArea
                    
                    $area.keypress(function (ev) {
                        if (_maxLengthArea > 0 && $area.val().length === _maxLengthArea) {
                            if ($options.failed) { $options.failed(ev.charCode); } return false;
                        } // Ha llegado al máximo de caracteres a permitir

                        var $keyValidate = { type : _type, key : ev.charCode, text : $area.val() };

                        if ($validateKeyChar($keyValidate)) { 
                            if ($options.sucess) { $options.sucess(ev.charCode); } return true;
                        } // El caracter digitado es permitido

                        else { 
                            if ($options.failed) { $options.failed(ev.charCode); } return false; 
                        } // El caracter digitado no es permitido
                    });
                }
            });
        },
        
        enter : function (eventEnter) {
            var $input = jQuery(this); // Componente que presiona enter
            
            $input.keyup(function (ev) {
                if (ev.which === 13) { if (eventEnter) { eventEnter($input); } }
            });
        },
        
        /* ============================================================
         * Softtion Plugin JQuery : Animated v1.0.1
         * Proceso para realizar animaciones en los componentes
         * ============================================================
         * Author: Daniel Andres Castillo Pedroza
         * Created: 11 de agosto de 2015
         * Location: Valledupar, Cesar, Colombia
         * ============================================================
         */
        animated : function (options) {
            var $default = { animated : softtion.Animateds.bounce, remove : false, event : undefined, time : 1500 };
            var $options = jQuery.extend({},$default,options), $component = jQuery(this); // Componente

            $component.addClass($options.animated).addClass('animated'); // Agregando clases para efecto 

            if ($options.remove) {
                setTimeout(function () {
                    $component.removeClass($options.animated).removeClass('animated');
                    if ($options.event) { event($component); }
                }, $options.time); // Removiendo clases del efecto
            }
        },
        
        /* ============================================================
         * Softtion Plugin JQuery : ValidateInput v1.0.1
         * Proceso que realiza la validación de los componentes de Texto
         * ============================================================
         * Author: Daniel Andres Castillo Pedroza
         * Created: 15 de agosto de 2015
         * Location: Valledupar, Cesar, Colombia
         * ============================================================
         */

        inputSuccess : function() {
            if (jQuery(this).find('input').val()) jQuery(this).find('input').addClass('valid');
            if (jQuery(this).find('textarea').val()) jQuery(this).find('textarea').addClass('valid');
            
            jQuery(this).find('input').removeClass('invalid');
            jQuery(this).find('textarea').removeClass('invalid');
            jQuery(this).find('label').removeClass('red-text'); 
            jQuery(this).find('span').remove();
        },
        
        inputError : function (message) {
            jQuery(this).find('input').removeClass('valid').addClass('invalid');
            jQuery(this).find('textarea').removeClass('valid').addClass('invalid');
            jQuery(this).find('label').addClass('red-text active');
            
            (jQuery(this).find('span').length > 0) ? jQuery(this).find('span').html(message) :
                jQuery(this).append("<span class='input-error truncate'>" + message + "</span>");
        },
        
        validateInput : function () {
            var $val = { 
                success : true,         // Estado de validación
                nameinput : undefined,  // Nombre del campo faltante
                minlength : undefined,  // Longitud minina
                input : undefined,      // Componente con error
                type : 0                // Tipo de error { 0=success, 1=empty, 2=minLength }
            };
            
            jQuery(this).each(function () {
                var $field = jQuery(this).parent();    // Padre del componente
                var $input = jQuery(this);             // Input a validar
                var $label = $field.find('label');     // Label que representa
                
                var _minLength = $input.data('min-length') || 0; $val.type = 0; 
                var $text = $input.val().trim(); $val.minlength = _minLength;
                
                if (softtion.isEmpty($text)) {
                    $val.input = ($val.input) ? $val.input : $input; $val.type = 1; 
                    $val.nameinput = $label.attr('name') || 'Campo desconocido';
                } // No ha diligenciado texto en el Componente
                
                else {
                    if ($text.length < _minLength) {
                        $val.nameinput = $label.attr('name') || 'Campo desconocido'; $val.type = 2;  
                        $val.minlength = _minLength; $val.input = ($val.input) ? $val.input : $input;
                    } // No ha alcanzado longitud mínima de texto en el Componente   
                }
                
                switch ($val.type) {
                    case (0) : 
                        $field.inputSuccess(); 
                    break; // Campo correcto
                    
                    case (1) : 
                        if ($input.hasClass('required-field')) {
                            $val.success = false; $field.inputError('Campo obligatorio'); 
                        }
                        
                        else {
                            $field.inputSuccess(); if ($val.input === $input) $val.input = undefined;
                        }
                    break; // Campo vacío
                    
                    case (2) : 
                        $val.success = false; $field.inputError('Campo debe tener mínimo ' + $val.minlength + ' caracteres.'); 
                    break; // Campo le faltan caracteres
                }
            });
            
            return $val; // Retornando resultado de validación
        },
        
        /* ============================================================
         * Softtion Plugin JQuery : Component Handler v1.0.1
         * Proceso que maneja los componentes del Formulario
         * ============================================================
         * Author: Daniel Andres Castillo Pedroza
         * Created: 21 de agosto de 2015
         * Location: Valledupar, Cesar, Colombia
         * ============================================================
         */
        
        enabled : function (enabled) { 
            if (typeof enabled === "undefined") return jQuery(this).hasClass('disabled');
            (enabled) ? jQuery(this).removeClass('disabled') : jQuery(this).addClass('disabled');
        },
        
        view : function (view) { 
            if (typeof view === "undefined") return jQuery(this).hasClass('hidden');
            (view) ? jQuery(this).removeClass('hidden') : jQuery(this).addClass('hidden');
        },
        
        readOnly : function (readonly) { 
            if (typeof readonly === "undefined") jQuery(this).removeClass('read-only');
            readonly ? jQuery(this).addClass('read-only') : jQuery(this).removeClass('read-only');
        },
        
        checked : function (checks) { 
            if (typeof checks === "undefined") return jQuery(this).prop('checked');
            
            else if (typeof checks === "object") {
                var _check = (jQuery(this).is(':checked'));
                jQuery.each(checks, function(index, check){
                    jQuery(check).prop('checked', false); 
                });
                if(_check) jQuery(this).prop('checked', true);
                return (_check) ? jQuery(this).attr('value') : null;
            }
            else{
                checks ? jQuery(this).prop('checked',true) : jQuery(this).prop('checked',false); 
            }
        },
        
        createJSON : function () {
            var $objectJson = {}; // Definiendo el objeto a retornar
            
            jQuery(this).each(function () {
                var $parameter = jQuery(this).data('json'); // Nombre del parametro
                if ($parameter) $objectJson[$parameter] = jQuery(this).val();
            });
            
            return $objectJson; // Retornando objeto generado
        },
        
        valueJSON : function (object, defaultValue) {
            $getValue = function (attributes, object, defaultValue) {
                if (!object) { return 'Objeto indefinido'; }
                
                var $value = '', $attributes = attributes.split(' ');
                
                jQuery($attributes).each(function (index, attribute) { 
                    $value += object[attribute] ? object[attribute] + ' ' : '';
                }); // Cargando atributos del objeto
                
                return ($value === '') ? (defaultValue) ? defaultValue : 'Desconocido' : $value.trim();
            };
            
            jQuery(this).each(function (index, input) {
                if (jQuery(input).data('key')) {
                    var $objects = jQuery(input).data('key').split('.');

                    if ($objects.length === 1) {
                        jQuery(input).value($getValue($objects[0],object,defaultValue));
                    }

                    else {
                        var $objeto = undefined; // Objeto por defecto

                        for (var _i = 0; _i < ($objects.length - 1); _i++) {
                            $objeto = $objeto ? $objeto[$objects[_i]] : object[$objects[_i]];

                            if (!$objeto) { break; } // Objeto indefindo ó nulo
                        }

                        jQuery(input).value($getValue($objects[$objects.length - 1],$objeto,defaultValue));
                    }
                }
            });
        },
        
        deployComponent : function (options) {
            var $default = {
                before : undefined,     // Proceso antes de cargar HTML
                after : undefined,      // Proceso despues de cargar HTML
                animated : undefined,   // Animación en el componente
                url : undefined,        // URL donde se encuentra recurso
                failed : undefined      // Proceso en caso de Error de cargue
            };
            
            var $component = jQuery(this), $options = jQuery.extend({},$default,options); 
        
            return jQuery.ajax({
                type: 'GET',
                mimeType: 'text/html; charset=utf-8', 
                url: $options.url,
                dataType: 'html',
                async: true,
                success: function (data) {
                    if ($options.before) { $options.before($component); }
                    
                    $component.empty(); /* Limpiando componente */
                    
                    if ($options.animated) {
                        $component.html(data); $component.animated($options.animated);
                    } /* Realizando el efecto de animación */
                    
                    else { $component.html(data); }
                    
                    if ($options.after) { $options.after($component); }
                }, /* Insertando página establecida en URL */
                
                error: function (jqXHR) {
                    if ($options.failed) { $options.failed(jqXHR, $component); }
                } /* Error al tratar de insertar pagina en el componente */
            }); 
        },
        
        value : function (text) {
            jQuery(this).val(text); jQuery(this).next('label').addClass('active');
        },
        
        clean : function () {
            jQuery(this).val(''); jQuery(this).next('label').removeClass('red-text');
            jQuery(this).removeClass('valid'); jQuery(this).parent().find('.input-error').remove();
            jQuery(this).next('label').removeClass('active'); jQuery(this).removeClass('invalid'); 
        },
        
        isEmpty : function () {
            return (jQuery(this).val().length === 0);
        },
        
        valtrim : function () {
            return jQuery(this).val().trim();
        },
        
        selectOption : function (newValue, attrValue) {
            var $option = new HtmlComponent('option').setText(newValue);
            
            if (attrValue) {
                $option.addAttribute('data-value',attrValue);
            } // Se establecio valor para option
            
            jQuery(this).append($option.create()); // Agregando opción
        },
        
        print : function (title, css) {
            return softtion.print(title, jQuery(this).html(), css);
        },
        
        save : function (time) {
            var $obj_value = jQuery(this); 
            var $key = $obj_value.data('key');
            if ($timer) {
                clearTimeout($timer); //cancel the previous timer.
                $timer = null;
            }
            $timer = setTimeout(function(){
                ($obj_value.val().length > 0) ? localStorage[$key] = $obj_value.val() : localStorage.removeItem($key);
            }, time || 500);
        }
    });
})(jQuery);

/* ============================================================
 * Softtion Plugin JQuery : Autocomplet v1.0.1
 * Proceso para autocompletar texto en un Input
 * ============================================================
 * Author: Daniel Andres Castillo Pedroza
 * Author: Fabián Andrés Urrego Bohórquez
 * Created: 02 de septiembre de 2015
 * Location: Valledupar, Cesar, Colombia
 * ============================================================
 */

(function (jQuery) {
    jQuery.fn.autoComplete = function (options) {
        var o = jQuery.extend({}, jQuery.fn.autoComplete.defaults, options);

        // public methods
        if (typeof options === 'string') {
            this.each(function () {
                var that = jQuery(this);
                if (options === 'destroy') {
                    jQuery(window).off('resize.autocomplete', that.updateSC);
                    that.off('blur.autocomplete focus.autocomplete keydown.autocomplete keyup.autocomplete');
                    if (that.data('autocomplete'))
                        that.attr('autocomplete', that.data('autocomplete'));
                    else
                        that.removeAttr('autocomplete');
                    jQuery(that.data('sc')).remove();
                    that.removeData('sc').removeData('autocomplete');
                }
            });
            return this;
        }

        return this.each(function () {
            var that = jQuery(this);
            // sc = 'suggestions container'
            that.sc = jQuery('<div class="autocomplete-suggestions ' + o.menuClass + '"></div>');
            that.data('sc', that.sc).data('autocomplete', that.attr('autocomplete'));
            that.attr('autocomplete', 'off');
            that.cache = {};
            that.last_val = '';

            that.updateSC = function (resize, next) {
                that.sc.css({
                    top: that.offset().top + that.outerHeight(),
                    left: that.offset().left,
                    width: that.outerWidth(),
                    'z-index': o.zIndex
                });
                if (!resize) {
                    that.sc.show();
                    if (!that.sc.maxHeight)
                        that.sc.maxHeight = parseInt(that.sc.css('max-height'));
                    if (!that.sc.suggestionHeight)
                        that.sc.suggestionHeight = jQuery('.autocomplete-suggestion', that.sc).first().outerHeight();
                    if (that.sc.suggestionHeight)
                        if (!next)
                            that.sc.scrollTop(0);
                        else {
                            var scrTop = that.sc.scrollTop(), selTop = next.offset().top - that.sc.offset().top;
                            if (selTop + that.sc.suggestionHeight - that.sc.maxHeight > 0)
                                that.sc.scrollTop(selTop + that.sc.suggestionHeight + scrTop - that.sc.maxHeight);
                            else if (selTop < 0)
                                that.sc.scrollTop(selTop + scrTop);
                        }
                }
            };
            jQuery(window).on('resize.autocomplete', that.updateSC);

            that.sc.appendTo('body');

            that.sc.on('mouseleave', '.autocomplete-suggestion', function () {
                jQuery('.autocomplete-suggestion.selected').removeClass('selected');
            });

            that.sc.on('mouseenter', '.autocomplete-suggestion', function () {
                jQuery('.autocomplete-suggestion.selected').removeClass('selected');
                jQuery(this).addClass('selected');
            });

            that.sc.on('mousedown', '.autocomplete-suggestion', function (event) {
                var item = jQuery(this), value = item.data('val'), index = item.data('index');
                if (value || item.hasClass('autocomplete-suggestion')) { // else outside click
                    that.val(value);
                    o.onSelect(index, value, item, event);
                    that.sc.hide();
                }
            });

            that.on('blur.autocomplete', function () {
                try {
                    over_sb = jQuery('.autocomplete-suggestions:hover').length;
                } catch (e) {
                    over_sb = 0;
                } // IE7 fix :hover
                if (!over_sb) {
                    that.last_val = that.val();
                    that.sc.hide();
                    setTimeout(function () {
                        that.sc.hide();
                    }, 350); // hide suggestions on fast input
                } else if (!that.is(':focus'))
                    setTimeout(function () {
                        that.focus();
                    }, 20);
            });

            if (!o.minChars)
                that.on('focus.autocomplete', function () {
                    that.last_val = '\n';
                    that.trigger('keyup.autocomplete');
                });

            function suggest(datas, indexs) {
                that.parent('.input-field').inputSuccess(); // Campo correcto
                
                if (datas.isEmpty()) {
                    that.parent('.input-field').inputError('No se encontraron coincidencias');
                } // No hay datos para autocompletar
                
                var val = that.val(); that.cache[val] = datas; that.index[val] = indexs;
                
                if (datas.length && val.length >= o.minChars) {
                    var s = '';
                    for (var i = 0; i < datas.length; i++) {
                        var _index = (indexs) ? indexs[i] : -1;
                        s += o.renderItem(datas[i], _index, val);
                    }
                        
                    that.sc.html(s); that.updateSC(0);
                }
                else
                    that.sc.hide();
            }

            that.on('keydown.autocomplete', function (event) {
                // down (40), up (38)
                if ((event.which === 40 || event.which === 38) && that.sc.html()) {
                    var next, sel = jQuery('.autocomplete-suggestion.selected', that.sc);
                    if (!sel.length) {
                        next = (event.which === 40) ? jQuery('.autocomplete-suggestion', that.sc).first() : jQuery('.autocomplete-suggestion', that.sc).last();
                        that.val(next.addClass('selected').data('val'));
                    } else {
                        next = (event.which === 40) ? sel.next('.autocomplete-suggestion') : sel.prev('.autocomplete-suggestion');
                        if (next.length) {
                            sel.removeClass('selected');
                            that.val(next.addClass('selected').data('val'));
                        }
                        else {
                            sel.removeClass('selected');
                            that.val(that.last_val);
                            next = 0;
                        }
                    }
                    that.updateSC(0, next);
                    return false;
                }
                // esc
                else if (event.which === 27)
                    that.val(that.last_val).sc.hide();
                // enter or tab
                else if (event.which === 13 || event.which === 9) {
                    var sel = jQuery('.autocomplete-suggestion.selected', that.sc);
                    if (sel.length && that.sc.is(':visible')) {
                        o.onSelect(sel.data('index'), sel.data('val'), sel, event);
                        setTimeout(function () {
                            that.sc.hide();
                        }, 20);
                    }
                }
            });

            that.on('keyup.autocomplete', function (e) {
                var $input = jQuery(this); // Input para autocompletar
                
                if (!~jQuery.inArray(e.which, [13, 27, 35, 36, 37, 38, 39, 40])) {
                    var val = that.val(); 
                    if (val.length >= o.minChars) {
                        if (val !== that.last_val) {
                            that.last_val = val; clearTimeout(that.timer);
                            that.timer = setTimeout(function () { 
                                o.source(val, suggest, $input); 
                            }, o.delay);
                        }
                    } else {
                        that.last_val = val; that.sc.hide();
                    }
                }
            });
        });
    };

    jQuery.fn.autoComplete.defaults = {
        source: 0,
        minChars: 3,
        delay: 150,
        cache: 1,
        menuClass: '',
        zIndex : 1,
        renderItem: function (item, index, search) {
            // escape special characters
            search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
            return '<div class="autocomplete-suggestion" data-val="' + item + '" data-index="' + index + '">' + item.replace(re, "<b>$1</b>") + '</div>';
        },
        onSelect: function (index, value, item, event) {}
    };
}(jQuery));