$(document).ready(function(){ 
     $('select').material_select();
     var cliente_id = '';
     /* Funcion buscar cliente */
     function buscar_cliente() {
        var nombre = $('#txtApellido').val(),
            url = 'http://'+domain+'/Electricity/public/cliente/'+nombre;
        if (nombre !== '') {
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'json',
                success: function(response) {
                    if(response.length > 0) {
                        generar_tabla_cliente(response);
                    } else {
                        $("#text-modal").text('No se encontraron resultados');
                            $('#modal1').openModal();
                        //alert('No se encontraron resultados');
                        $('#tbBodyCliente').html("");
                    }
                }
                ,
                error : function (j) {
                    alert(JSON.stringify(j));
                }
            });
        } else { 
            $("#text-modal").text('No ha digitado nada');
                $('#modal1').openModal();
//            alert('No ha digitado nada');
        }    
        
    }
    
    /* Generar tabla cliente */
    function generar_tabla_cliente(lista) {
        var component;
        for (var i = 0; i <= lista.length - 1; i++) {
            component += "<tr class='filaCliente'><td id="+lista[i].id+"><center>"+lista[i].nombre+"</center></td></tr>";
        }
        $("#tbBodyCliente").html(component);
    }
    /* Buscar cleinte */
    $('#btnBuscar').click(function() { 
        buscar_cliente(); 
    });
    
    /* Seleccionar cliente */
    $('#tbCliente #tbBodyCliente').on('dblclick', '.filaCliente', function() { 
        var id, cliente;
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: cliente= $(this).text();
                        id = $(this).attr('id');
                        break;
            }
            
        });
        $('#txtCliente').focus();
        $('#txtCliente').val(cliente);
        cliente_id = id;
    });
    
    /* Registrar proyecto */
    $("#btnRegistrar").click(function () {
        var nombre = $("#txtNombre").val().toUpperCase(),
            ubicacion = $("#txtDireccion").val(),
            tipo = $("#cboxTipo option:selected").html();
            
            if (nombre !== '' && cliente_id !== '') {
                $data = {proyecto : {nombre: nombre, cliente_id: cliente_id, ubicacion: ubicacion, estado: 'EN ESPERA', tipo: tipo}, opcion: {process: 'proyecto'}};
                ajaxRegistrar($data);
                clearForm(); 
            } else {
                $("#text-modal").text('Faltan campos por completar');
                $('#modal1').openModal();
                //alert('Falta campos por completar');
            }
    });
    
    /* Proceso ajax registrar */
    function ajaxRegistrar(data) {
        $('#btnRegistrar').attr('disabled', true);
        $.ajax({
            type: 'post',
            url: 'http://'+domain+'/Electricity/public/proyecto',
            data: data,
            success: function(response) {
                $("#text-modal").text('Registrado correctamente');
                $('#modal1').openModal();
                //alert('Registrado correctamente');
                $('#btnRegistrar').attr('disabled', false);
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
                $('#btnRegistrar').attr('disabled', false);
            }
        }); 
    }
    
    function clearForm() {
        $('input').each(function (i) {
            $(this).val("");
            $(this).focusout();
        });
        cliente_id = '';
        $('#tbBodyCliente').html('');
    }
});    
