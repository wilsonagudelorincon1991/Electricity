$(document).ready(function(){
    $('select').material_select();
    var proyecto_id = '';
    /* Buscar proyecto */
    function buscar_proyecto() {
        var nombre = $('#txtNombreProyecto').val(),
            url = 'http://'+domain+'/Electricity/public/proyecto';        
        
        if (nombre !== '') {
        $data = {nombre: nombre, filtro: 'nombre', tipo_busqueda: 'buscar_proyecto'};
        $('#btnBuscarProyecto').attr('disabled', true);
        $.ajax({
            type: 'get',
            url: url,
            data: $data,
            success: function(response) { 
                if(response) {
                    generar_tabla_proyecto(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                }
                $('#btnBuscarProyecto').attr('disabled', false);
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
                $('#btnBuscarProyecto').attr('disabled', false);
            }
        });
        } else {
            $("#text-modal").text('No ha digitado nada');
            $('#modal1').openModal();
        }
    }
    
    /* Generar tabla proyecto */
    function generar_tabla_proyecto(lista) {
        var component = '';
        for (var i = 0; i <= lista.length - 1; i++) {
            component += "<tr class='filaProyecto'><td id="+lista[i].id+">"+lista[i].nombre+"</td><td><center>"+lista[i].estado+"</center></td></tr>";
        }
        $("#tbBodyProyecto").html(component);
    }
    
    /* Buscar proyecto*/
    $('#btnBuscarProyecto').click(function (){ 
        buscar_proyecto();
    });
    
    /* Seleccionar proyecto */
    $('#tbProyecto #tbBodyProyecto').on('dblclick', '.filaProyecto', function() { 
        var nombre, estado, ide;
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: nombre = $(this).text();
                        proyecto_id = $(this).attr('id');
                        break;
                case 1: estado = $(this).text();
                        break;
            }
        });
        $('#txtProyecto').focus();
        $('#txtProyecto').val(nombre);
        $('#txtEstado').focus();
        $('#txtEstado').val(estado);
    }); 
    
    /* Actualizar proyecto*/
    $('#btnActualizar').click(function() { 
        var url = 'http://'+domain+'/Electricity/public/proyecto';
        var id = proyecto_id,
            estado = $("#cboxEstado option:selected").html();
        $data = {id: id, estado: estado, tipo_actualizar: 'actualizar_estado'};
        if (id !== '') {
            ajaxActualizar(url, $data);
        } else {
            $("#text-modal").text('No ha seleccionado ningun proyecto');
            $('#modal1').openModal();
        }
    });
    
    //Motodo ajax actualizar
    function ajaxActualizar(url, data) { 
        $('#btnActualizar').attr('disabled', true);
        $.ajax({
            type: 'put',
            url: url,
            data: data,
            success: function(response) {
                $("#text-modal").text(response);
                    $('#modal1').openModal();
                //alert(response);
                clearForm();
                $('#btnActualizar').attr('disabled', false);
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
                $('#btnActualizar').attr('disabled', false);
            }
        }); 
    }
    
    function clearForm() {
        $('.proyecto').each(function (i) {
            $(this).val("");
            $(this).focusout();
        });
        $('#tbBodyProyecto').html('');
    }
});    
