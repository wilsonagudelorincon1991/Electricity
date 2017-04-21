$(document).ready(function(){
    $('#btnModificar').attr('disabled', true);
    $('#btnRegistrar').click(function() {
        registrar();
    });
    
    function registrar() {
        var identificacion = $('#txtId').val(),
            nombres = $('#txtNombres').val().toUpperCase(),
            primer_apellido = $('#txtPrimerApellido').val().toUpperCase(),
            segundo_apellido = $('#txtSegundoApellido').val().toUpperCase(),
            email= $('#txtEmail').val(),
            telefono = $('#txtTelefono').val(),
            cargo = $('#txtCargo').val().toUpperCase(),
            salario = $('#txtSalario').val(),
            auxilio_transporte = $('#txtAuxTransp').val();
        
        
        
        if (identificacion === '' || nombres === '' || primer_apellido === '' ||
            email === '' || telefono === '') {
            $("#text-modal").text('Faltan campos por completar');
                $('#modal1').openModal();    
            //alert('Faltan campos por completar');
        } else {
                $parameters = {empleado: {identificacion: identificacion,nombres: nombres, primer_apellido: primer_apellido, 
                                 segundo_apellido: segundo_apellido, email: email, telefono: telefono, cargo: cargo, salario_basico: salario,
                                 auxilio_transporte: auxilio_transporte}};
            $('#btnRegistrar').attr('disabled', true);
            $.ajax({
                type: 'post',
                url: 'http://'+domain+'/Electricity/public/empleado',
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
            url = 'http://'+domain+'/Electricity/public/empleado/'+nombre;
            ajaxConsultar(url, resultBusqueda);
        }
    });
    
    var lista_empleados;
    /* Proceso ajax consultar */
    function ajaxConsultar(url, funcion) { 
        $('#btnBuscar').attr('disabled', true);
        $.ajax({
            type: 'get',
            url: url,
            success: function(response) { //alert(JSON.stringify(response));
                lista_empleados = response; funcion(response); 
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
                    component += "<tr class='fila'><td id="+i+"><center>"+lista[i].nombres+"</center></td></tr>";
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
        $('#txtNombres').val(lista_empleados[i].nombres);
        $('#txtPrimerApellido').val(lista_empleados[i].primer_apellido);
        $('#txtId').val(lista_empleados[i].identificacion);
        $('#txtSegundoApellido').val(lista_empleados[i].segundo_apellido);
        $('#txtTelefono').val(lista_empleados[i].telefono);
        $('#txtEmail').val(lista_empleados[i].email);
        $('#txtCargo').val(lista_empleados[i].cargo);
        $('#txtAuxTransp').val(lista_empleados[i].auxilio_transporte);
        $('#txtSalario').val(lista_empleados[i].salario_basico);
        $('#txtDireccion').val(lista_empleados[i].direccion);
        
        $('#txtDireccion').focus();
        $('#txtNombres').focus();
        $('#txtPrimerApellido').focus();
        $('#txtSegundoApellido').focus();
        $('#txtId').focus();
        $('#txtTelefono').focus();
        $('#txtEmail').focus();
        $('#txtCargo').focus();
        $('#txtAuxTransp').focus();
        $('#txtSalario').focus();
        $('#btnRegistrar').attr('disabled', true);
        $('#btnModificar').attr('disabled', false);
    });
    
    $('#btnNuevo').click(function() {
        $('#btnRegistrar').attr('disabled', false);
        $('#btnModificar').attr('disabled', true);
        $("#tbBodyResult").html("");
        clearForm();
    });
    
    $('#btnModificar').click(function() {
        var identificacion = $('#txtId').val(),
            nombres = $('#txtNombres').val().toUpperCase(),
            primer_apellido = $('#txtPrimerApellido').val().toUpperCase(),
            segundo_apellido = $('#txtSegundoApellido').val().toUpperCase(),
            email= $('#txtEmail').val(),
            telefono = $('#txtTelefono').val(),
            cargo= $('#txtCargo').val().toUpperCase(),
            salario = $('#txtSalario').val(),
            auxilio_transporte = $('#txtAuxTransp').val();
        
        $parameters = {empleado: {identificacion: identificacion,nombres: nombres, primer_apellido: primer_apellido, 
                                 segundo_apellido: segundo_apellido, email: email, telefono: telefono, cargo: cargo, salario_basico: salario,
                                 auxilio_transporte: auxilio_transporte}};
        $.ajax({
            type: 'put',
            url: 'http://'+domain+'/Electricity/public/empleado/'+lista_empleados[i].id,
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

