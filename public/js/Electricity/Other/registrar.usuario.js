$('select').material_select();

$(document).ready(function(){
   $('#btnModificar').attr('disabled', true);
   function registrar() {
        var nombre = $('#txtNombre').val(),
            password = $('#txtPassword').val(),
            repeatPassword = $('#txtRepeatPassword').val(),
            rol = $("#cboxRol option:selected").html(),
            $parameters = {usuario: {user: nombre, password: password, rol: rol}};
        
        if (nombre === '' || password === '' || repeatPassword === '') {
            $("#text-modal").text('Faltan campos por completar');
            $('#modal1').openModal();
        } else if (password === repeatPassword) {
            $('#btnRegistrar').attr('disabled', true);
            $.ajax({
                type: 'post',
                url: 'http://'+domain+'/Electricity/public/registrarUsuario',
                data:  $parameters, 
                success: function(response) {
                    $('#btnRegistrar').attr('disabled', false);
                    $("#text-modal").text(response);
                    $('#modal1').openModal();
                    clearForm();
                }
                ,
                error : function (j) {
                    alert(JSON.stringify(j));
                    $('#btnRegistrar').attr('disabled', false);
                }
            });
        } else {
            $("#text-modal").text('Las contraseñas no son iguales');
            $('#modal1').openModal();
        }
         
    } 
    
    $("#btnRegistrar").click(function () {
        registrar();
    });
    
    
    $('#btnBuscar').click(function() { 
        var url,
            nombre = $('#txtNombreBuscar').val();
        if (nombre === '') {
            $("#text-modal").text('No ha digitado nada');
                $('#modal1').openModal();
            //alert('No ha digitado nada');
        } else {   
            url = 'http://'+domain+'/Electricity/public/searchUpdate';
            ajaxConsultar(url, resultBusqueda);
        }
    });
    var lista_categorias;
    function ajaxConsultar(url, funcion) { 
        $('#btnBuscar').attr('disabled', true);
        $.ajax({
            type: 'get',
            url: url,
            data: {user: $('#txtNombreBuscar').val()},
            success: function(response) { 
                lista_categorias = response; funcion(response); 
                $('#btnBuscar').attr('disabled', false);
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
                $('#btnBuscar').attr('disabled', false);
            }
        });
    }
    
    function resultBusqueda(lista) {
        var component = '';
        if (lista.length > 0) {
                for (var i = 0; i <= lista.length - 1; i++) {
                    component += "<tr class='fila'><td id="+i+"><center>"+lista[i].user+"</center></td></tr>";
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
        $('#txtNombre').val(lista_categorias[i].user);
        $('#txtPassword').val(lista_categorias[i].password);
        $('#txtRepeatPassword').val(lista_categorias[i].password);
        $('#txtNombre').focus();
        $('#txtPassword').focus();
        $('#txtRepeatPassword').focus();
        
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
        var nombre = $('#txtNombre').val().toUpperCase();
        
        $parameters = {categoria: {nombre: nombre}};
        $.ajax({
            type: 'put',
            url: 'http://'+domain+'/Electricity/public/categoria/'+lista_categorias[i].id,
            data: $parameters,
            success: function(response) {
                console.log(response);
                $('#btnModificar').attr('disabled', true);
                $('#btnRegistrar').attr('disabled', false);
                clearForm(); lista_categorias = []; $("#tbBodyResult").html("");
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
});


