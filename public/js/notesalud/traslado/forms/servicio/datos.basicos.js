
/* global notesalud */

jQuery(document).ready(function () {
    
    $containValue = function (component) {
        var $span = component.parents('li').find('.collapsible-header span');
        (component.val() === 'Sin datos importantes') ? $span.html('No') : $span.html('Sí');
    };
    
    var $datosBasicos = {
        start : function () {
            jQuery('.collapsible').collapsible(); // Evento para maximizar
    
            jQuery('.notesalud .collapsible-body .antecedentes').blur(function() {
                var $textArea = jQuery(this);  // Componente de Texto
                if ($textArea.isEmpty()) $textArea.val('Sin datos importantes'); 
                $containValue($textArea); // Verificando si tiene Valores
            });

            //jQuery('.input-content input').validateInput();
            jQuery('.input-content-body .clock').clock(); 
        }
    };
    
    notesalud.start.form($datosBasicos.start); // Iniciando la página
});