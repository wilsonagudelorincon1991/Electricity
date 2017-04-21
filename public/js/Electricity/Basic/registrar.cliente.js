$(document).ready(function(){
    $('#btnModificar').attr('disabled', true);
    $('#btnRegistrar').click(function() {
        registrar();
    });
    
    function registrar() {
        var identificacion = $('#txtId').val(),
            nombre = $('#txtNombre').val().toUpperCase(),
            email= $('#txtEmail').val(),
            telefono = $('#txtTelefono').val(),
            direccion = $('#txtDireccion').val();
        
        $parameters = {cliente: {identificacion: identificacion, nombre: nombre, email: email, telefono: telefono, direccion: direccion}};
        
        if (identificacion === '' || nombre === '' || email === '' || telefono === '' || direccion === '') {
            $("#text-modal").text('Faltan campos por completar');
                $('#modal1').openModal();
            //alert('Faltan campos por completar');
        } else {
            $('#btnRegistrar').attr('disabled', true);
            $.ajax({
                type: 'post',
                url: 'http://'+domain+'/Electricity/public/cliente',
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
            url = 'http://'+domain+'/Electricity/public/cliente/'+nombre;
            ajaxConsultar(url, resultBusqueda);
        }
    });
    
    var lista_clientes;
    /* Proceso ajax consultar */
    function ajaxConsultar(url, funcion) { 
        $('#btnBuscar').attr('disabled', true);
        $.ajax({
            type: 'get',
            url: url,
            success: function(response) {
                lista_clientes = response; funcion(response); 
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
                    component += "<tr class='fila'><td id="+i+"><center>"+lista[i].nombre+"</center></td></tr>";
                }
            $('#tbBodyResult').html(component);
        } else {
            $('#tbBodyResult').html("");
            $("#text-modal").text('Faltan campos por completar');
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
        $('#txtNombre').val(lista_clientes[i].nombre);
        $('#txtId').val(lista_clientes[i].identificacion);
        $('#txtTelefono').val(lista_clientes[i].telefono);
        $('#txtEmail').val(lista_clientes[i].email);
        $('#txtDireccion').val(lista_clientes[i].direccion);
        $('#txtDireccion').focus();
        $('#txtNombre').focus();
        $('#txtId').focus();
        $('#txtTelefono').focus();
        $('#txtEmail').focus();
        $('#btnRegistrar').attr('disabled', true);
        $('#btnModificar').attr('disabled', false);
    });
    
    $('#btnNuevo').click(function() {
        $('#btnRegistrar').attr('disabled', false);
        $('#btnModificar').attr('disabled', true);
        clearForm(); $("#tbBodyResult").html("");
    });
    
    $('#btnModificar').click(function() {
        var identificacion = $('#txtId').val(),
            nombre = $('#txtNombre').val().toUpperCase(),
            email= $('#txtEmail').val(),
            telefono = $('#txtTelefono').val(),
            direccion = $('#txtDireccion').val();
        
        $parameters = {cliente: {identificacion: identificacion, nombre: nombre, email: email, telefono: telefono, direccion: direccion}};
        $.ajax({
            type: 'put',
            url: 'http://'+domain+'/Electricity/public/cliente/'+lista_clientes[i].id,
            data: $parameters,
            success: function(response) {
                console.log(response);
                $('#btnModificar').attr('disabled', true);
                $('#btnRegistrar').attr('disabled', false);
                clearForm(); lista_clientes = []; $("#tbBodyResult").html("");
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
    electricity.onlyLetter('.only-letter');
});    

