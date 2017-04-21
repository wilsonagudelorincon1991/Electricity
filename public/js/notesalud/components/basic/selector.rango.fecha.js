
/* global notesalud */

jQuery(document).ready(function () {
    var $fechaInicial, $fechaFinal; // Fechas del rango
    
    jQuery('#dtp-fecha-inicial-rango').date({ 
        selectMonths: true, selectYears: true,
        container : 'body',
        onSet: function (date) {
            if (date.select) {
                jQuery('#dtp-fecha-inicial-rango').parent().inputSuccess();
                $fechaInicial = new Date(date.select); this.close();
            }
        },
        onStart : function () {
            this.set('select',new Date());
        }
    });
    
    jQuery('#dtp-fecha-final-rango').date({ 
        selectMonths: true, selectYears: true,
        container : 'body',
        onSet: function (date) {
            if (date.select) {
                jQuery('#dtp-fecha-final-rango').parent().inputSuccess();
                $fechaFinal = new Date(date.select); this.close();
            }
        },
        onStart : function () {
            this.set('select',new Date());
        }
    });
    
    jQuery('#btn-set-rango-fecha').click(function () {
        if (notesalud.selector.rangoFecha) {
            notesalud.selector.rangoFecha($fechaInicial, $fechaFinal);
        } // Se envian las fechas del rango seleccionada
    });
});