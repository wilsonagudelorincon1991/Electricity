$(document).ready(function(){
    $('#btnModificar').attr('disabled', true);
    $('#btnRegistrar').click(function() {
        registrar();
    });
    
    function registrar() {
        var nombre = $('#txtNombre').val().toUpperCase(),
            descripcion = $('#txtDescripcion').val().toUpperCase(),
            unidad_medida = $('#txtUnidadMedida').val(),
            pago_hora = $('#txtPagoHora').val();
        
        $parameters = {personal: {nombre: nombre, descripcion: descripcion, costo_hora: pago_hora, unidad_medida: unidad_medida}};
        
        if (nombre === '' || descripcion === '' || pago_hora === '' || unidad_medida === '') {
            $("#text-modal").text('Faltan campos por completar');
                $('#modal1').openModal();
            //alert('Faltan campos por completar');
        } else {
            $('#btnRegistrar').attr('disabled', true);
            $.ajax({
                type: 'post',
                url: 'http://'+domain+'/Electricity/public/personal',
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
    /* Buscar Mano de obra - Herremienta - Material*/
    $('#btnBuscar').click(function() { 
        var url,
            nombre = $('#txtNombreBuscar').val();
        if (nombre === '') {
            $("#text-modal").text('No ha digitado nada');
                $('#modal1').openModal();
            //alert('No ha digitado nada');
        } else {   
            url = 'http://'+domain+'/Electricity/public/personal/'+nombre;
            ajaxConsultar(url, resultBusqueda);
        }
    });
    
    var lista_personal;
    /* Proceso ajax consultar */
    function ajaxConsultar(url, funcion) { 
        $('#btnBuscar').attr('disabled', true);
        $.ajax({
            type: 'get',
            url: url,
            success: function(response) {
                lista_personal = response; funcion(response); 
                $('#btnBuscar').attr('disabled', false);
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
                $('#btnBuscar').attr('disabled', false);
            }
        });
    }
    
    /* Resultado de la busqueda */
    function resultBusqueda(lista) {
        var component = '';
        if (lista.length > 0) {
                for (var i = 0; i <= lista.length - 1; i++) {
                    component += "<tr class='fila'><td id="+i+">"+lista[i].nombre+"</td></tr>";
                }
            $('#tbBodyResult').html(component);
        } else {
            $('#tbBodyResult').html("");
            $("#text-modal").text('No se encontraron resultados');
                $('#modal1').openModal();
            //alert('No se encontraron resultados');
        }    
    }
    var i;
    /* Agregar elemento a la tabla (Personal, Herramienta, Material) */
    $('#tbResult #tbBodyResult').on('dblclick', '.fila', function() { 
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: i = $(this).attr('id');
                        break;
            }
            
        });
        $('#txtNombre').val(lista_personal[i].nombre);
        $('#txtDescripcion').val(lista_personal[i].descripcion);
        $('#txtUnidadMedida').val(lista_personal[i].unidad_medida);
        $('#txtPagoHora').val(lista_personal[i].v_unitario);
        $('#txtNombre').focus();
        $('#txtDescripcion').focus();
        $('#txtUnidadMedida').focus();
        $('#txtPagoHora').focus();
        $('#btnRegistrar').attr('disabled', true);
        $('#btnModificar').attr('disabled', false);
    });
    
    $('#btnNuevo').click(function() {
        $('#btnRegistrar').attr('disabled', false);
        $('#btnModificar').attr('disabled', true);
        clearForm(); $("#tbBodyResult").html("");
    });
    
    $('#btnModificar').click(function() {
        var nombre = $('#txtNombre').val().toUpperCase(),
            descripcion = $('#txtDescripcion').val().toUpperCase(),
            unidad_medida = $('#txtUnidadMedida').val(),
            pago_hora = $('#txtPagoHora').val();
        
        $parameters = {mano_obra: {nombre: nombre, descripcion: descripcion, costo_hora: pago_hora, unidad_medida: unidad_medida}};
        $.ajax({
            type: 'put',
            url: 'http://'+domain+'/Electricity/public/personal/'+lista_personal[i].id,
            data: $parameters,
            success: function(response) {
                console.log(response);
                $('#btnModificar').attr('disabled', true);
                $('#btnRegistrar').attr('disabled', false);
                clearForm(); lista_personal = []; $("#tbBodyResult").html("");
                $("#text-modal").text('Modificado correctamente');
                $('#modal1').openModal();
                //alert('Modificado correctamente');
            }
            ,
            error : function (j) {
                clearForm(); 
                alert(JSON.stringify(j));
                $('#btnRegistrar').attr('disabled', false);
            }
        });
    });
    
    function clearForm() {
        $('input').each(function (i) {
            $(this).val("");
            $(this).focusout();
        });
    }
    electricity.onlyNumber('.only-number');
});
