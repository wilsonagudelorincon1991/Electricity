$(document).ready(function(){ 
   // $('select').material_select();
   $('ul.tabs').tabs();
    /* Variables globales */
    var apu_array_index = new Array();
    var apu_array_data = new Array();
    var index, proyecto_id = '';
    
    var entro_tabla = function (tabla, event) {
        var $posXMin = tabla.offset().left, $posXMax = $posXMin + tabla.innerWidth();
        var $posYMin = tabla.offset().top, $posYMax = $posYMin + tabla.innerHeight();
            
        $posXMin -= 10; $posYMin -= 10; $posXMax += 10; $posYMax += 10;
            
        if ($posXMin < event.pageX && $posXMax > event.pageX) {
            if ($posYMin < event.pageY && $posYMax > event.pageY) {
                return true;
            }
        }
        
        return false; // No esta sobre el componente
    };
    
    /* Cargar categorias*/
    function cargar_categorias() {
        $.ajax({
            type: 'get',
            url: 'http://'+domain+'/Electricity/public/categoria',
            success: function(response) {
                if (response) {
                    set_cbox_categoria(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                }
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
            }
        });
    }
    
    function set_cbox_categoria(lista) { 
        var component = '';
        component += "<option value=-1>No aplica</option>";
        for (var i = 0; i <= lista.length - 1; i++) { 
            component += "<option value="+lista[i].id+">"+lista[i].nombre+"</option>";
        }
        $('#cboxCategoria').html(component); $('select').material_select();
    }
    
    /* Cargar categorias */
    cargar_categorias();
    
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
                    $('#btnBuscarProyecto').attr('disabled', false);
                } else {
                    $("#tbBodyProyecto").html("");
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $('#btnBuscarProyecto').attr('disabled', false);
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
        }
    }
    
    /* Generar tabla proyecto */
    function generar_tabla_proyecto(lista) {
        var component = '';
        for (var i = 0; i <= lista.length - 1; i++) {
            if (lista[i].estado === 'EN ESPERA') {
                component += "<tr class='filaProyecto'><td id="+lista[i].id+">"+lista[i].nombre+"</td><td><center>"+lista[i].estado+"</center></td></tr>";
            }
        }
        $("#tbBodyProyecto").html(component);
    }
    
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
        $('#selectProyecto').text(nombre); $("#tbBodyProyecto").html("");
    });    
    
    /* Buscar apu */
    function buscar_apu() {
        $('#content-apu').fadeOut();
        var descripcion = $('#txtDescripcionAPU').val(),
            categoria = $('#cboxCategoria').val(),  
            tipo_busqueda = 'apu',
            url = 'http://'+domain+'/Electricity/public/apu';    
        $data = {descripcion_apu: descripcion, categoria: categoria, tipo_busqueda: tipo_busqueda};
        $('#btnBuscar').attr('disabled', true);
        $.ajax({
            type: 'get',
            url: url,
            data: $data,
            success: function(response) { 
                if(response.length) {
                    apu_array_data = response;
                    generar_tabla_apu(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $("#tbBodyAPU").html('');
                }
                $('#btnBuscar').attr('disabled', false);
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
                $('#btnBuscar').attr('disabled', true);
            }
        });
    }
    
    /* Generar tabla apu */
    function generar_tabla_apu(lista) {
        var component = '';
        for (var i = 0; i <= lista.length - 1; i++) {
            //component += "<tr class='fila'><td id="+lista[i].id+">"+lista[i].descripcion+"</td><td>"+lista[i].v_unitario+"</td><td style='padding: 5px 0px'><img src="+lista[i].img+"></td></tr>";
            component += "<tr class='fila'><td id="+lista[i].id+">"+lista[i].descripcion+"</td><td>"+lista[i].v_unitario+"</td><td id="+i+" class='obj-draggable' style='padding: 5px 0px'><img src="+lista[i].foto+"></td></tr>";
        }
        $("#tbBodyResult").html(component);
        
        $(".obj-draggable").draggable({
            drag: function (event) { 
                if (entro_tabla($('#x'), event)) { 
                    $('#x').addClass('blue lighten-4');
                } else {
                    $('#x').removeClass('blue lighten-4');
                }
            },
            stop: function (event) { 
                if (entro_tabla($('#x'), event)) { 
                    $('#x').removeClass('blue lighten-4'); 
                    add_table_proyecto_apu(apu_array_data);
                }
            },
            revert: true, revertDuration: 100
        });
        $("td").mousedown(function() { index = $(this).attr('id'); }); 
    }
    
    function add_table_proyecto_apu(lista) {
        var ide = lista[index].id,
            nombre = lista[index].descripcion,
            costo_total =lista[index].v_unitario;
        if (validate(ide, 'tbBodyApu')) {
            var inputCantidad = "<input id="+ide+" type='text' value='1' style='width: 50; text-align: center; margin-top: -10px'>",    
            idFila = "fila"+ide,
            btnQuitar = "<center><button id="+idFila+" class='btnQuitar btn-floating btn-small waves-effect waves-light teal lighten-1'><i class='material-icons'>delete</i></button></center>",
            idTotalCosto = "totalCosto"+ide,             
            component = "<tr id="+idFila+"><td id="+ide+">"+nombre+"</td><td id=costo"+ide+">"+costo_total+"</td><td><center>"+inputCantidad+"</center></td><td id="+idTotalCosto+">"+costo_total+"</td><td>"+btnQuitar+"</td></tr>"
            $('#tbBodyApu').append(component); //Agregar fila a la tabla
            calcularPresupuesto();
        }
    }
    
    /* Buscar APU */
    $('#btnBuscar').click(function (){
        var descripcion = $('#txtDescripcionAPU').val(),
            categoria = $('#cboxCategoria').val();  
        if (descripcion !== '') {
            buscar_apu();
        } else { 
            if(categoria !== '-1') {
                buscar_apu();
            } else {
                $("#text-modal").text('Para no digitar la descripcion de la APU, al menos seleccione una categoria');
                    $('#modal1').openModal();
                //alert('Para no digitar la descripcion de la APU, al menos seleccione una categoria');
            } 
        }
    });
    
    /*$('#btnBuscarq').click(function() { 
       var  nombre = $('#txtNombreBuscar').val(),
            url = 'http://'+domain+'/Electricity/public/apu/'+nombre; 
            ajaxConsultar(url, resultBusqueda)
    });
    
    //Metodo ajax consultar
    /*function ajaxConsultar(url, funcion) { 
        $('#btnBuscar').attr('disabled', true);
        $.ajax({
            type: 'get',
            url: url,
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
    
    //Resultado de la busqueda
    function resultBusqueda(lista) {
        var component = '';
        if (lista.length > 0) {
            for (var i = 0; i <= lista.length - 1; i++) {
                component += "<tr class='fila'><td id="+lista[i].id+">"+lista[i].descripcion+"</td><td>"+lista[i].v_unitario+"</td></tr>";
            }
            $('#tbBodyResult').html(component);
        } else {
            $('#tbBodyResult').html("");
            alert('No se encontraron resultados');
        }    
    }*/
    
    //Evento doble click sobre la fila
    /*$('#tbResult #tbBodyResult').on('dblclick', '.fila', function() { 
        var nombre, costo_total, ide;
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: nombre = $(this).text();
                        ide = $(this).attr('id');
                        break;
                case 1: costo_total = $(this).text();
                        break;
            }
        })
        if (validate(ide, 'tbBodyApu')) {
            var inputCantidad = "<input id="+ide+" type='text' value='1' style='width: 50; text-align: center; margin-top: -10px'>",    
            idFila = "fila"+ide,
            //btnQuitar = "<center><button id="+idFila+" class='btnQuitar btn'>Quitar</button></center>",        
            btnQuitar = "<center><button id="+idFila+" class='btnQuitar btn-floating btn-small waves-effect waves-light teal lighten-1'><i class='material-icons'>delete</i></button></center>",
            idTotalCosto = "totalCosto"+ide,             
            component = "<tr id="+idFila+"><td id="+ide+">"+nombre+"</td><td id=costo"+ide+">"+costo_total+"</td><td><center>"+inputCantidad+"</center></td><td id="+idTotalCosto+">"+costo_total+"</td><td>"+btnQuitar+"</td></tr>"
            $('#tbBodyApu').append(component); //Agregar fila a la tabla
            calcularPresupuesto();
        }
    });*/
    
    /* Valida si ya se encuentra en la tabla */
    function validate(id, nametBody) {
        var ide = 0,
            estado = true;
        $("#"+nametBody+ " tr").each(function (index) {
            $(this).children("td").each(function (index2) 
            {
                switch (index2) 
                {
                    case 0: ide = $(this).attr('id');
                            if (parseInt(ide) === id) {
                                estado = false;
                            }
                        break;
                }
            });
        });
        return estado;
    }
    
    var apus = new Array();
    //Obtener los datos del personal
    function getApu() {
        var apu_id, cantidad, costo_total;
        $("#tbBodyApu tr").each(function (index) {
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: apu_id = $(this).attr('id');
                        break;
                case 1: costo_total = $(this).text();
                        break;
                case 2: cantidad = $(this).find("#"+apu_id+"").val();
                        break;
            }
        });
        costo_total = cantidad*costo_total;
        //costo_total_apu += costo_total;
        apus.push({proyecto_id: -1, apu_id: apu_id, cantidad_inicial: cantidad, cantidad_actual: cantidad, costo_total: costo_total});
        });
    }
    
    /* Registrar proyecto */
    $("#btnRegistrar").click(function () {
            getApu();
            if (proyecto_id !== '' && apus.length > 0) {
                $data = {apus: apus, opcion: {process: 'proyecto_apu'}, data: {proyecto_id: proyecto_id}};
                ajaxRegistrar($data);
            } else {
                $("#text-modal").text('Falta campos por completar, o no ha agregado ninguna APU');
                $('#modal1').openModal();
                //alert('Falta campos por completar, o no ha agregado ninguna APU');
            }
    });
    
    /* Proceso ajax registrar */
    function ajaxRegistrar(data) {
        $('#btnRegistrar').attr('disabled', true);
        $.ajax({
            type: 'post',
            url: 'http://'+domain+'/Electricity/public/proyecto',
            data: data,
            success: function(response) { $('#btnRegistrar').attr('disabled', false);
                $("#text-modal").text(response);
                $('#modal1').openModal();
                //alert(response);
                $('#btnRegistrar').attr('disabled', false);
                clearForm(); 
                proyecto_id = '';
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
                $('#btnRegistrar').attr('disabled', false);
            }
        }); 
    }
    
    //Validar solo numeros en input de la tabla
    $('#tbBodyApu').on('keypress', 'input', function(e) {
        var ide = $(this).attr('id'),
            costo = $("#costo"+ide).text();
       if ( e.which!==8 && e.which!==0 && (e.which<48 || e.which>57)) {
            return false;
        } else { 
            var caracter = String.fromCharCode(e.which),
                cadena = $(this).val()+caracter;
                $("#totalCosto"+ide).text(cadena*costo);
                calcularPresupuesto();
            return true;
        }
    });
    
    $('#tbBodyApu').on('focusout', 'input', function(e) {
        var cantidad = $(this).val(),
        ide = $(this).attr('id'),
        costo = $("#costo"+ide).text();
        if (cantidad === '') {$(this).val(1); $("#totalCosto"+ide).text(costo); calcularPresupuesto();}
    });
    
    //Evento click btn quitar tabla
    $('#tbBodyApu').on('click', '.btnQuitar', function(e) {
        var id = $(this).attr('id');
        $("#"+id).remove();
        calcularPresupuesto();
    });
    
    //Calcular presupuesto
    function calcularPresupuesto() {
        var costo_total = 0, total_presupuesto = 0;
        $("#tbBodyApu tr").each(function (index) {
            $(this).children("td").each(function (index2) 
            {
                switch (index2) 
                {
                    case 3: costo_total = parseInt($(this).text());
                            break;
                }
            });
            total_presupuesto += costo_total;
        });
        $("#txtPresupuesto").val(total_presupuesto);
    }
    
    /* Evento de arrastrar imagen*/
    /*$(".obj-draggable").draggable({
        drag: function (event) { 
            if (entro_tabla($('#x'), event)) { 
                $('#x').addClass('blue lighten-4');
            } else {
                $('#x').removeClass('blue lighten-4');
            }
        },
        stop: function (event) { 
            if (entro_tabla($('#x'), event)) { $('#x').removeClass('blue lighten-4'); console.log('Entro en la tabla'); }
        },
        revert: true, revertDuration: 100
    });*/
    var apu_id;
    /* Seleccionar img de la apu */
    //$('td').click(function() { 
    
    
    //Borrar campos del formulario
    function clearForm() {
        $('input').each(function (i) {
            $(this).val("");
            $(this).focusout();
        });
        apus.length = 0;
        $('#tbBodyResult').html("");
        $('#tbBodyApu').html("");
        $('#tbBodyProyecto').html("");
        $('#selectProyecto').text("");
    }
    
});

