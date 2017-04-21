//$(document).ready(function(){
var reporte;
    $('select').material_select();
    var costoDirectoItem = 0, lista_proyectos = new Array();
    /* Buscar proyecto */
    function buscar_proyecto() { 
        $('#content-proyecto').fadeOut();
        var nombre = $('#txtNombreProyecto').val(),
            estado = $('#cboxEstado option:selected').html(),     
            url = 'http://'+domain+'/Electricity/public/proyecto',
            filtro = ''; 
        if (nombre !== '') { filtro = 'nombre' }   
        
        if (estado !== 'No aplica') { filtro = 'estado' }
        
        if (nombre !== '' && estado !== 'No aplica') { filtro = 'nombre_estado' }
        
        $data = {nombre: nombre, estado: estado, filtro: filtro,tipo_busqueda: 'buscar_proyecto'};
        $('#btnBuscar').attr('disabled', true);
        $.ajax({
            type: 'get',
            url: url,
            data: $data,
            success: function(response) { 
                if(response.length > 0) { 
                    lista_proyectos = response;
                    generar_tabla_proyecto(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                }
                $('#btnBuscar').attr('disabled', false);
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
                $('#btnBuscar').attr('disabled', false);
            }
        });
    }
    
    /* Generar tabla proyecto */
    function generar_tabla_proyecto(lista) { 
        var component = '';
        for (var i = 0; i <= lista.length - 1; i++) { 
            component += "<tr class='fila'><td id="+lista[i].id+">"+lista[i].nombre+"</td><td id="+i+">"+lista[i].ubicacion+"</td><td>"+lista[i].estado+"</td><td>"+lista[i].tipo+"</td></tr>";
        }
        $("#tbBodyProyecto").html(component);
    }
    var nombre_proyecto, cliente;
    /* Seleccionar Proyecto */
    $('#tbProyecto #tbBodyProyecto').on('dblclick', '.fila', function() { 
        var ide, nombre = '', index;
        costoDirectoItem = 0;
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: ide = $(this).attr('id'); nombre = $(this).text(); break;
                case 1: index = $(this).attr('id');     
            } 
        });
        buscar_proyecto_detallado(ide); $('#selectProject').text(nombre); $('#selectCliente').text('PRESUPUESTO PRESENTADO A '+lista_proyectos[index].cliente);
        nombre_proyecto = nombre; cliente = 'PRESUPUESTO PRESENTADO A '+lista_proyectos[index].cliente;
        $("#tbBodyProyecto").html("");
    }); 
    
    var proyecto_detallado;
    /* Buscar proyecto detallado*/
    function buscar_proyecto_detallado(_id) {
        var id = _id,
            url = 'http://'+domain+'/Electricity/public/proyecto';        
        $data = {id: id, tipo_busqueda: 'cotizar_proyecto'};
        
        $.ajax({
            type: 'get',
            url: url,
            data: $data,
            success: function(response) { 
                if(response) {
                    proyecto_detallado = response['proyecto_apu'];
                    generar_tabla_proyecto_detalladoInicial(proyecto_detallado);
                    $('#content-proyecto').fadeIn();
                    $("#txtCostoDirectoItem").focus();
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $('#content-proyecto').fadeOut();
                }
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
            }
        });
    }
    
    var datos;
    function generar_tabla_proyecto_detalladoInicial(lista) {
        var lista = lista;
        var component, categoria = '', subTotal = 0, lista_aux = lista, valor_total = 0;
        for (var i = 0; i <= lista.length - 1; i++) {
            valor_total = lista[i].cantidad_inicial*lista[i].v_unitario;
            if (i === 0) {
                categoria = lista[i].categoria; 
                component += "<tr style='background: #ffe0b2'><td>#</td><td>"+lista[i].categoria+"</td><td></td><td></td><td></td><td></td></tr>";
                component += "<tr><td>#</td><td>"+lista[i].descripcion+"</td><td>UN</td><td>"+lista[i].cantidad_inicial+"</td><td class='alinear-right'>"+lista[i].v_unitario+"</td><td class='alinear-right'>"+(lista[i].cantidad_inicial*lista[i].v_unitario)+"</td></tr>";
            } else {
                if (categoria !== lista[i].categoria) {
                    categoria = lista[i].categoria;
                    component += "<tr style='background: #ffe0b2'><td>#</td><td>"+lista[i].categoria+"</td><td></td><td></td><td></td><td></td></tr>";
                    component += "<tr><td>#</td><td>"+lista[i].descripcion+"</td><td>UN</td><td>"+lista[i].cantidad_inicial+"</td><td class='alinear-right'>"+lista[i].v_unitario+"</td><td class='alinear-right'>"+(lista[i].cantidad_inicial*lista[i].v_unitario)+"</td></tr>";
                } else {
                    component += "<tr><td>#</td><td>"+lista[i].descripcion+"</td><td>UN</td><td>"+lista[i].cantidad_inicial+"</td><td class='alinear-right'>"+lista[i].v_unitario+"</td><td class='alinear-right'>"+(lista[i].cantidad_inicial*lista[i].v_unitario)+"</td></tr>";
                    //lista_aux[i].categoria = "null";
                    //lista[i].categoria = "null";
                }
            }
            subTotal += valor_total;
        } reporte = lista_aux; console.log(reporte);
        var admistracion = subTotal*0.08, imprevistos = subTotal*0.03, utilidad = subTotal*0.04, iva = subTotal*0.16,
            valor_final = subTotal + admistracion + imprevistos + utilidad + iva;
        component += "<tr style='background: #81c784'><td>#</td><td>SUBTOTAL DE LOS TRABAJOS REALIZADOS</td><td></td><td></td><td></td><td class='alinear-right'>"+subTotal+"</td></tr>";
        component += "<tr style='background: #81c784'><td>#</td><td>ADMINISTRACION (8%)</td><td></td><td></td><td></td><td class='alinear-right'>"+admistracion+"</td></tr>";
        component += "<tr style='background: #81c784'><td>#</td><td>IMPREVISTOS (3%)</td><td></td><td></td><td></td><td class='alinear-right'>"+imprevistos+"</td></tr>";
        component += "<tr style='background: #81c784'><td>#</td><td>UTILIDAD (4%)</td><td></td><td></td><td></td><td class='alinear-right'>"+utilidad+"</td></tr>";
        component += "<tr style='background: #81c784'><td>#</td><td>IVA 16% UTILIDAD</td><td></td><td></td><td></td><td class='alinear-right'>"+iva+"</td></tr>";
        component += "<tr style='background: #81c784'><td>#</td><td>VALOR FINAL TRABAJOS A REALIZAR</td><td></td><td></td><td></td><td class='alinear-right'>"+valor_final+"</td></tr>";
        datos = {subTotal: subTotal, administracion: admistracion, imprevistos: imprevistos, utilidad: utilidad, iva: iva, valor_final: valor_final,
                 nombre_proyecto: nombre_proyecto, cliente: cliente};
        costoDirectoItem += subTotal;
        $("#tbBodyApu").html(component);
        //$("#txtCostoDirectoItem").val(subTotal);
    }
    
    function generar_tabla_proyecto_detalladoActual(lista) {
        var lista = lista;
        var component, categoria = '', subTotal = 0, lista_aux = lista, valor_total = 0;
        for (var i = 0; i <= lista.length - 1; i++) {
            valor_total = lista[i].cantidad*lista[i].v_unitario;
            if (i === 0) {
                categoria = lista[i].categoria; 
                component += "<tr style='background: #ffe0b2'><td>#</td><td>"+lista[i].categoria+"</td><td></td><td></td><td></td><td></td></tr>";
                component += "<tr><td>#</td><td>"+lista[i].descripcion+"</td><td>UN</td><td>"+lista[i].cantidad+"</td><td class='alinear-right'>"+lista[i].v_unitario+"</td><td class='alinear-right'>"+(lista[i].cantidad*lista[i].v_unitario)+"</td></tr>";
            } else {
                if (categoria !== lista[i].categoria) {
                    categoria = lista[i].categoria;
                    component += "<tr style='background: #ffe0b2'><td>#</td><td>"+lista[i].categoria+"</td><td></td><td></td><td></td><td></td></tr>";
                    component += "<tr><td>#</td><td>"+lista[i].descripcion+"</td><td>UN</td><td>"+lista[i].cantidad+"</td><td class='alinear-right'>"+lista[i].v_unitario+"</td><td class='alinear-right'>"+(lista[i].cantidad*lista[i].v_unitario)+"</td></tr>";
                } else {
                    component += "<tr><td>#</td><td>"+lista[i].descripcion+"</td><td>UN</td><td>"+lista[i].cantidad+"</td><td class='alinear-right'>"+lista[i].v_unitario+"</td><td class='alinear-right'>"+(lista[i].cantidad*lista[i].v_unitario)+"</td></tr>";
                    //lista_aux[i].categoria = "null";
                    //lista_aux[i].categoria = "null";
                }
            }
            subTotal += valor_total;
        } reporte = lista_aux; console.log(reporte);
        var admistracion = subTotal*0.08, imprevistos = subTotal*0.03, utilidad = subTotal*0.04, iva = subTotal*0.16,
            valor_final = subTotal + admistracion + imprevistos + utilidad + iva;
        component += "<tr style='background: #81c784'><td>#</td><td>SUBTOTAL DE LOS TRABAJOS REALIZADOS</td><td></td><td></td><td></td><td class='alinear-right'>"+subTotal+"</td></tr>";
        component += "<tr style='background: #81c784'><td>#</td><td>ADMINISTRACION (8%)</td><td></td><td></td><td></td><td class='alinear-right'>"+admistracion+"</td></tr>";
        component += "<tr style='background: #81c784'><td>#</td><td>IMPREVISTOS (3%)</td><td></td><td></td><td></td><td class='alinear-right'>"+imprevistos+"</td></tr>";
        component += "<tr style='background: #81c784'><td>#</td><td>UTILIDAD (4%)</td><td></td><td></td><td></td><td class='alinear-right'>"+utilidad+"</td></tr>";
        component += "<tr style='background: #81c784'><td>#</td><td>IVA 16% UTILIDAD</td><td></td><td></td><td></td><td class='alinear-right'>"+iva+"</td></tr>";
        component += "<tr style='background: #81c784'><td>#</td><td>VALOR FINAL TRABAJOS A REALIZAR</td><td></td><td></td><td></td><td class='alinear-right'>"+valor_final+"</td></tr>";
        datos = {subTotal: subTotal, administracion: admistracion, imprevistos: imprevistos, utilidad: utilidad, iva: iva, valor_final: valor_final,
                 nombre_proyecto: nombre_proyecto, cliente: cliente};
        costoDirectoItem += subTotal;
        $("#tbBodyApu").html(component);
        //$("#txtCostoDirectoItem").val(subTotal);
    }
    
    
    $('#cboxProyecto').change(function (){
        var value = $(this).val();
        if (value === '0') {
            generar_tabla_proyecto_detalladoInicial(proyecto_detallado);
        } else {
        generar_tabla_proyecto_detalladoActual(proyecto_detallado);
        }
    });
    
    $('#btnBuscar').click(function (){
        var estado = $('#cboxEstado option:selected').html();
        if ($('#txtNombreProyecto').val() !== '' || estado !== 'No aplica') {
            buscar_proyecto();
        } else {
            $("#text-modal").text('No ha digitado nada');
                    $('#modal1').openModal();
            //alert('No ha digitado nada');
        }
    });
    
    $('#btnReporte').click(function (){
        generar_proyecto_reporte();
        $('#btnReporte').attr('disabled', true);
        $data = {reporte: reporte, data: datos};
        $.ajax({
            type: 'get',
            url: 'http://localhost:1016/Electricity/public/reporteProyectoPDF',
            dataType: 'binary',
            data: $data,
            success: function (result) { 
                var $url = URL.createObjectURL(result); 
                
                jQuery('<a/>', { 
                    href: $url, download: 'reporte.pdf' 
                }).hide().appendTo("#reporte")[0].click();
                
                setTimeout(function () { URL.revokeObjectURL($url); }, 10000);
                $('#btnReporte').attr('disabled', false);
            },
            error : function (j) {
                alert(JSON.stringify(j));
                $('#btnReporte').attr('disabled', false);
            }
        });
        
//        console.log(reporte);
//        console.log(datos);
    });
    
    var generar_proyecto_reporte = function () {
        var estado = $("#cboxProyecto").val();
        if (estado === '0') {
            for (var i = 0; i <= reporte.length - 1; i++) {
                reporte[i]["v_parcial"] = reporte[i]["v_unitario"]*reporte[i]["cantidad_inicial"];
            }
        } else {
            for (var i = 0; i <= reporte.length - 1; i++) {
                reporte[i]["v_parcial"] = reporte[i]["v_unitario"]*parseInt(reporte[i]["cantidad"]);
            }    
        }
    };
    
    jQuery.ajaxTransport("+binary", function(options, originalOptions, jqXHR) {
        if (window.FormData && ((options.dataType && (options.dataType === 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob))))) {
            return {
                send: function(_, callback){
                    var xhr = new XMLHttpRequest(), 
                        url = options.url,
                        type = options.type,
                        dataType = options.responseType || "blob",
                        data = options.data || null;

                    xhr.addEventListener('load', function() {
                        var data = {}; data[options.dataType] = xhr.response;
                        callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                    });

                    xhr.open(type,url,true); xhr.responseType = dataType; xhr.send(data);
                },
                abort: function() { jqXHR.abort(); }
            };
        }
    });
    
//});


