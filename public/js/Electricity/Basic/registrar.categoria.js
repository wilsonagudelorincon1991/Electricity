$(document).ready(function(){
   $('#btnModificar').attr('disabled', true);
   function registrar() {
        var nombre = $('#txtNombre').val().toUpperCase(),
        
               $parameters = {categoria: {nombre: nombre}};
        
        if (nombre === '') {
            $("#text-modal").text('Faltan campos por completar');
                $('#modal1').openModal();
            //alert('Faltan campos por completar');
        } else {
            $('#btnRegistrar').attr('disabled', true);
            $.ajax({
                type: 'post',
                url: 'http://'+domain+'/Electricity/public/categoria',
                data:  $parameters, 
                success: function(response) {
                    $('#btnRegistrar').attr('disabled', false);
                    $("#text-modal").text(response);
                        $('#modal1').openModal();
                    //alert(response);
                    clearForm();
                }
                ,
                error : function (j) {
                    alert(JSON.stringify(j));
                    $('#btnRegistrar').attr('disabled', false);
                }
            });
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
            url = 'http://'+domain+'/Electricity/public/categoria/'+nombre;
            ajaxConsultar(url, resultBusqueda);
        }
    });
    var lista_categorias;
    function ajaxConsultar(url, funcion) { 
        $('#btnBuscar').attr('disabled', true);
        $.ajax({
            type: 'get',
            url: url,
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
                    component += "<tr class='fila'><td id="+i+"><center>"+lista[i].nombre+"</center></td></tr>";
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
        $('#txtNombre').val(lista_categorias[i].nombre);
        $('#txtNombre').focus();
        
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


