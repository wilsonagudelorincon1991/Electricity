$(document).ready(function(){
    var proyecto_id = '';
    /* Buscar detalle del proyecto */
    function buscar_proyecto_detalle(nombre) {
       var url = 'http://'+domain+'/Electricity/public/proyecto',
            $data = {nombre: nombre, tipo_busqueda: 'actualizar_proyecto'};   
            ajaxConsultar(url, $data, resultBusqueda);
    }
   
    /* Motodo ajax consultar */
    function ajaxConsultar(url, data, funcion) { 
        $.ajax({
            type: 'get',
            url: url,
            data: data,
            success: function(response) {  
                funcion(response);
                $('#btnBuscar').attr('disabled', false);
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
                $('#btnBuscar').attr('disabled', false);
            }
        }); 
    }
    
    /* Set detalles del proyecto */
    function resultBusqueda(lista) {
        var component = '';
        if (lista.length > 0) {
            for (var i = 0; i <= lista.length - 1; i++) {
                if (lista[i].cantidad_actual !== 0) { var inputCantidad = "<input id="+lista[i].proyecto_apu_id+" type='text' value='0' style='width: 50; text-align: center; margin-top: -10px'>";}
                else { var inputCantidad = "<input id="+lista[i].proyecto_apu_id+" type='text' value='0' readonly='true' style='width: 50; text-align: center; margin-top: -10px'>"; }
                
                component += "<tr class='fila'><td id="+lista[i].proyecto_apu_id+">"+lista[i].apu+"</td><td id="+lista[i].precio+"><center>"
                          +lista[i].cantidad_inicial+"</center></td><td><center>"+lista[i].cantidad_actual+"</center></td><td style='padding: 5px 0px'><center>"+inputCantidad+"</center></td></tr>";
            }
            $('#tbBodyApu').html(component);
        } else {
            $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
            //alert('No se encontraron resultados');
        }
    }
    
    /* Buscar proyecto */
    function buscar_proyecto() { 
        var nombre = $('#txtNombreProyecto').val(),
            url = 'http://'+domain+'/Electricity/public/proyecto';        
        if (nombre !== '') {
            $data = {nombre: nombre, estado: 'ACTIVO', filtro: 'nombre_estado',tipo_busqueda: 'buscar_proyecto'};
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
            //alert('No ha digitado nada'); 
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
        $("#nombreLiquidacion").addClass("hidden");
        $("#tbBodyApu").html(""); $("#projectSelect").text("");
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
        buscar_proyecto_detalle(nombre);
        $('#projectSelect').text(nombre);
        $('#nombreLiquidacion').removeClass();
        $("#tbBodyProyecto").html("");
    });    
    
    var listaApu = new Array();
    /* Liquidar proyecto */
    $('#btnActualizar').click(function() {
        var _fecha = new Date(),
                month = _fecha.getMonth()+1,
                day = _fecha.getDate(),
                fecha = _fecha.getFullYear() + '/' +
                        (month<10 ? '0' : '') + month + '/' +
                        (day<10 ? '0' : '') + day,
                nombre = $('#txtNombreLiquidacion').val().toUpperCase();
        $liquidacion = {proyecto_id: proyecto_id, fecha: fecha, nombre: nombre};        
        var url = 'http://'+domain+'/Electricity/public/proyecto';
        if (validar_cantidad() && validar_cantidad_diferente_cero()) {
            cargar_apu();
            cargar_liquidacion();
            if ( listaApu.length > 0 && nombre !== '') {
                $data = {proyecto_apu: listaApu, liquidacion: $liquidacion, proyecto_liquidacion: lista_apu_liquidar, tipo_actualizar: 'actualizar_proyecto_apu'};
                ajaxActualizar(url, $data);
                $('#nombreLiquidacion').addClass('hidden'); $('#projectSelect').text(''); listaApu.length = 0;
                $("#tbBodyProyecto").html("");
            } else {
                $("#text-modal").text('No ha digitado el nombre de la lquidacion o realizado ninguna busqueda de proyecto');
                    $('#modal1').openModal();
                //alert('No ha digitado el nombre de la lquidacion o realizado ninguna busqueda de proyecto');
            }
        } else { 
            $("#text-modal").text('Verifique que la cantidad digitada no sea mayor que la cantidad actual o sea mayor que 0.');
                    $('#modal1').openModal();
                    //alert('Verifique que la cantidad digitada no sea mayor que la cantidad actual o sea mayor que 0.');
        }
    });
    /* Cargar apu*/
    function cargar_apu() {
        var id, cantidad_actual, cantidad;
        $("#tbBodyApu tr").each(function (index) {
        $(this).children("td").each(function (index) 
        {
            switch (index) 
            {
                case 0: id = $(this).attr('id');
                        break;
                case 2: cantidad_actual = $(this).text();
                        break;
                case 3: cantidad = $(this).find("#"+id+"").val();
                        break;        
            }
        });
            cantidad_actual = cantidad_actual - cantidad;
            listaApu.push({id: id, cantidad_actual: cantidad_actual});
        });
    }
    /* Validar que la cantidad sea menor o igual a la actual */
    validar_cantidad = function () {
        var id, cantidad_actual, cantidad, estado = true;
        $("#tbBodyApu tr").each(function (index) {
        $(this).children("td").each(function (index) 
        {
            switch (index) 
            {
                case 0: id = $(this).attr('id');
                        break;
                case 2: cantidad_actual = $(this).text();
                        break;
                case 3: cantidad = $(this).find("#"+id+"").val();
                        break;        
            }
        });
            if ((cantidad_actual - cantidad) < 0) { 
                estado = false;
            }
        });
        return estado;
    };
    
    
    validar_cantidad_diferente_cero = function () {
        var id, cantidad_actual, cantidad, estado = false;
        $("#tbBodyApu tr").each(function (index) {
        $(this).children("td").each(function (index) 
        {
            switch (index) 
            {
                case 0: id = $(this).attr('id');
                        break;
                case 2: cantidad_actual = $(this).text();
                        break;
                case 3: cantidad = $(this).find("#"+id+"").val();
                        break;        
            }
        });
            if (cantidad !== '0') { 
                estado = true;
            }
        });
        return estado;
    };
    
    /* Motodo ajax actualizar */
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
    
    var lista_apu_liquidar = new Array();
    function cargar_liquidacion() {
        var nombre_apu, cantidad, precio, id;
        $("#tbBodyApu tr").each(function (index) {
        $(this).children("td").each(function (index) 
        {
            switch (index) 
            {
                case 0: id = $(this).attr('id');
                        nombre_apu = $(this).text();
                        break;
                case 1: precio = $(this).attr('id');
                        break;
                case 3: cantidad = $(this).find("#"+id+"").val();
                        break;        
            }
        });
            if (cantidad !== '0') {
                lista_apu_liquidar.push({liquidacion_id: -1, nombre_apu: nombre_apu, cantidad: cantidad, precio: precio});
            }    
        });
    }
    
    $('#tbBodyApu').on('keypress', 'input', function(e) { 
        if ( e.which!==8 && e.which!==0 && (e.which<48 || e.which>57)) {
            return false;
        }
    });
    
    function clearForm() {
        $("#tbBodyApu").html("");
        listaApu.length = 0;
    }
});

