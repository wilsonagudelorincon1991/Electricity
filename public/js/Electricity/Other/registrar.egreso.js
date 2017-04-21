$(document).ready(function(){
    /* Inicializando componente */
    var fecha = '', anio = 0, mes = 0, 
                dia = 0;
    
    $('#txtFecha').pickadate({
        selectMonths: true, // Creates a dropdown to control monthan
        selectYears: 15, // Creates a dropdown of 15 years to control year
        onSet : function (x) {
            if (x.select) {
                var fechaSelect = new Date(x.select);
                fecha = fechaSelect.getFullYear();
                fecha += '-' + (fechaSelect.getMonth() + 1); 
                fecha += '-' + fechaSelect.getDate();
                anio = fechaSelect.getFullYear();
                mes = (fechaSelect.getMonth() + 1);
                dia = fechaSelect.getDate();
            }
        }
    });
  
    $('#btnRegistrar').click(function() { 
        registrar();
    });
    
    function registrar() {
        var ciudad = $('#txtCiudad').val(),
            fecha = anio+'-'+mes+'-'+dia,
            persona = $('#txtPersona').val().toUpperCase(),
            concepto = $('#txtConcepto').val().toUpperCase(),
            valor = $('#txtValor').val(),
            valor_letras = $('#txtValorLetras').val();
        
        $parameters = {egreso: {fecha: fecha, ciudad: ciudad, persona: persona, concepto: concepto, valor: valor, valor_letras: valor_letras}};
        
        if (fecha === '' || ciudad === '' || persona === '' || concepto === '' || valor === '' || valor_letras === '') {
            $("#text-modal").text('Faltan campos por completar');
                $('#modal1').openModal();
            //alert('Faltan campos por completar');
        } else {
            $('#btnRegistrar').attr('disabled', true);
            $.ajax({
                type: 'post',
                url: 'http://'+domain+'/Electricity/public/egreso',
                data:  $parameters, 
                success: function(response) {
                    $("#text-modal").text(response);
                    $('#modal1').openModal();
                    //alert(response);
                    clearForm();
                    $('#btnRegistrar').attr('disabled', false);
                }
                ,
                error : function (j) {
                    alert(JSON.stringify(j));
                    $('#btnRegistrar').attr('disabled', false);
                }
            });
        }
         
    }
    function clearForm() {
        $('input').each(function (i) {
            $(this).val("");
            $(this).focusout();
        });
        $('#txtConcepto').val("");
        $('#txtConcepto').focusout();
    }
    
    electricity.onlyNumber('.only-number');
    electricity.onlyLetter('.only-letter');
});

