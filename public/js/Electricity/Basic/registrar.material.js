$(document).ready(function(){
    /* Inicializar componentes */
    //$('select').material_select();
    $('#btnModificar').attr('disabled', true);
    $('#btnRegistrar').click(function() {
        registrar();
    });
    
    function registrar() {
        var nombre = $('#txtNombre').val().toUpperCase(),
            descripcion = $('#txtDescripcion').val().toUpperCase(),
            unidad_medida = $('#txtUnidad').val(),
            precio = $('#txtPrecio').val();
        
        $parameters = {material: {nombre: nombre, descripcion: descripcion, unidad_medida: unidad_medida, costo: precio}};
        
        if (nombre === '' || descripcion === '' || precio === '') {
            $("#text-modal").text('Faltan campos por completar');
            $('#modal1').openModal();
            //alert('Faltan campos por completar');
        } else {
            $('#btnRegistrar').attr('disabled', true);
            $.ajax({
                type: 'post',
                url: 'http://'+domain+'/Electricity/public/material',
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
            nombre = $('#txtNombreMaterial').val();
        if (nombre === '') {
            $("#text-modal").text('No ha digitado nada');
            $('#modal1').openModal();
            //alert('No ha digitado nada');
        } else {   
            url = 'http://'+domain+'/Electricity/public/material/'+nombre;
            ajaxConsultar(url, resultBusqueda);
        }
    });
    
    var lista_materiales;
    /* Proceso ajax consultar */
    function ajaxConsultar(url, funcion) { 
        $('#btnBuscar').attr('disabled', true);
        $.ajax({
            type: 'get',
            url: url,
            success: function(response) {
                lista_materiales = response; funcion(response); 
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
    var index = undefined;
    /* Agregar elemento a la tabla (Personal, Herramienta, Material) */
    $('#tbResult #tbBodyResult').on('dblclick', '.fila', function() { 
        var i;
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: i = $(this).attr('id');
                        index = $(this).attr('id');
                        break;
            }
            
        });
        $('#txtNombre').val(lista_materiales[i].nombre);
        $('#txtDescripcion').val(lista_materiales[i].descripcion);
        $('#txtUnidad').val(lista_materiales[i].unidad_medida);
        $('#txtPrecio').val(lista_materiales[i].v_unitario);
        $('#txtNombre').focus();
        $('#txtDescripcion').focus();
        $('#txtUnidad').focus();
        $('#txtPrecio').focus();
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
            unidad_medida = $('#txtUnidad').val(),
            precio = $('#txtPrecio').val();
        
        $parameters = {material: {nombre: nombre, descripcion: descripcion, unidad_medida: unidad_medida, costo: precio}};
        $.ajax({
            type: 'put',
            url: 'http://'+domain+'/Electricity/public/material/'+lista_materiales[index].id,
            data: $parameters,
            success: function(response) {
                console.log(response);
                $('#btnModificar').attr('disabled', true);
                $('#btnRegistrar').attr('disabled', false);
                clearForm(); lista_materiales = []; $("#tbBodyResult").html("");
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
