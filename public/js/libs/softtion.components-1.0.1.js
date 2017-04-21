
/* ============================================================
 * Softtion Components v1.0.1 
 * Version proceso: Softtion Components v1.0.1
 * ============================================================
 * Author: Daniel Andrés Castillo Pedroza
 * Author: Fabián Andrés Urrego Bohórquez
 * Created: 05 de noviembre de 2015
 * Location: Valledupar, Cesar, Colombia
 * ============================================================
 */

/* global softtion */

if (typeof jQuery === 'undefined') {
    throw new Error('Softtion Components JavaScript requiere jQuery');
} // Validando que JQuery este Cargado

if (typeof softtion === 'undefined') {
    throw new Error('Softtion Components JavaScript requiere softtion');
} // Validando que Softtion este Cargado

/* 
 * ==============================================
 * Softttion TextArea v1.0.0
 * ============================================== 
 */

(function (jQuery, softtion) {
    
    var _indexArea = 0; // Componentes
    
    $createTextArea = function (options) {
        var $inputField = new HtmlComponent('div').addClass('input-field');
        
        var $textArea = new HtmlComponent('textarea').
            addClass(['materialize-textarea']);
        
        if (options.validate) {
            $inputField.addClass('validate'); // Requiere validación
            
            if (options.requeried) $textArea.addClass('required-field');
            $textArea.addAttribute('data-min-length',options.minLength);
            $textArea.addAttribute('data-min-value',options.minValue);
            $textArea.addAttribute('data-max-length',options.maxLength);
            $textArea.addAttribute('data-max-value',options.maxValue);
        }
        
        $inputField.addAttribute('data-type',options.textControl);
        $inputField.addComponent($textArea); // Componente TextArea
        
        return new HtmlComponent('div').
            setId(options.id).
            addClass(['softtion-textarea','maximize']).
            addComponent(
                new HtmlComponent('div').
                    addClass('header').
                    addComponent(
                        new HtmlComponent('i').addClass([options.icon, 'left'])
                    ).
                    addComponent(
                        new HtmlComponent('span').addClass('right').setText('0')
                    ).
                    setText(options.title)
            ).
            addComponent(
                new HtmlComponent('div').
                    addClass('body').addComponent($inputField)
            ).
            create();
    };
    
    function SofttionTextArea(options) {
        var $component, $header, $span, $inputField, $textArea; // Componentes
        
        // Generando id del Componente
        var _idComponent = 'sofftion-textarea-' + new Date().code('datetime') + _indexArea;
        
        options.component.append($createTextArea(
            jQuery.extend({},{ id : _idComponent },options))
        ); // Creando componente
        
        $component = jQuery('#' + _idComponent);
        $header = $component.find('.header');
        $span = $header.find('span'); 
        $inputField = $component.find('.input-field');
        $textArea = $component.find('textarea');
        
        $textArea.keyup(function () { $span.html(jQuery(this).val().length); });
        
        $header.click(function () {
            if (!jQuery(this).parent().hasClass('maximize')) { 
                jQuery(this).parent().addClass('maximize'); jQuery(this).next().slideDown(200); 
            } // El panel se encuentra maximizado
            
            else { 
                jQuery(this).parent().removeClass('maximize'); jQuery(this).next().slideUp(200); 
            } // El panel se encuentra minimizado
        });
        
        $inputField.textControl(); this.textArea = $textArea; _indexArea++; 
        
        return this; // Retornando objeto en caso de necesitarlo
    };
    
    SofttionTextArea.prototype.val = function () {
        return this.textArea.val();
    };
    
    SofttionTextArea.prototype.value = function (text) {
        return this.textArea.value(text);
    };
    
    jQuery.fn.extend({
        softtionTextArea : function (options) {
            var $default = {
                title : '',
                icon : 'mdi-content-content-paste',
                component : jQuery(this),
                validate : false,
                minLength : -1, 
                maxLength : -1,
                minValue : 'undefined',
                maxValue : 'undefined',
                requeried : false,
                textControl : softtion.TextControl.TODOS
            };
            
            return new SofttionTextArea(jQuery.extend({},$default,options));
        }
    });
})(jQuery, softtion);