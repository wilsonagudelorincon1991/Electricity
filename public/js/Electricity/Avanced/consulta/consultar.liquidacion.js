//$(document).ready(function(){
    var fecha_inicio = '', fecha_final = '';
    $('#txtFechaInicio').pickadate({
        selectMonths: true, // Creates a dropdown to control monthan
        selectYears: 15, // Creates a dropdown of 15 years to control year
        onSet : function (x) {
            if (x.select) {
                var fechaSelect = new Date(x.select);
                fecha_inicio = fechaSelect.getFullYear();
                fecha_inicio += '-' + (fechaSelect.getMonth() + 1); 
                fecha_inicio += '-' + fechaSelect.getDate();
            } else { fecha_inicio = ''; }  
        }
    });
    
    $('#txtFechaFinal').pickadate({
        selectMonths: true, // Creates a dropdown to control monthan
        selectYears: 15, // Creates a dropdown of 15 years to control year
        onSet : function (x) {
            if (x.select) {
                var fechaSelect = new Date(x.select);
                fecha_final = fechaSelect.getFullYear();
                fecha_final += '-' + (fechaSelect.getMonth() + 1); 
                fecha_final += '-' + fechaSelect.getDate();
            } else { fecha_final = ''; }
        }
    });
    
    /* Buscar proyecto */
    function buscar_proyecto() { 
        $('#content-liquidacion').fadeOut();
        $('#projectSelect').text('');
        var nombre = $('#txtNombreProyecto').val(),
            estado = $('#cboxEstado option:selected').html(),     
            url = 'http://'+domain+'/Electricity/public/proyecto',
            filtro = ''; 
        if (nombre !== '') { filtro = 'nombre' }   
        
        if (fecha_inicio !== '' && fecha_final !== '') { filtro = 'fecha' }
        
        if (nombre !== '' && fecha_inicio !== '' && fecha_final !== '') { filtro = 'nombre_fecha' }
        
        $data = {nombre: nombre, fecha_inicio: fecha_inicio, fecha_final: fecha_final,estado: estado, filtro: filtro, tipo_busqueda: 'liquidacion_proyecto'};
        if (nombre !== '' || (fecha_inicio !== '' && fecha_final !== '')) {
        $('#btnBuscar').attr('disabled', true);
        $.ajax({
            type: 'get',
            url: url,
            data: $data,
            success: function(response) {
                if(response.length > 0) {
                    generar_tabla_proyecto(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $("#tbBodyProyecto").html('');
                }
                $('#btnBuscar').attr('disabled', false);
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
                $('#btnBuscar').attr('disabled', false);
            }
        });
        } else {
            $("#text-modal").text('No ha digitado ningun nombre de proyecto o seleccionado fecha de inicio y fecha final');
            $('#modal1').openModal();  
        }
    }
    var xd;
    /* Generar tabla proyecto */
    function generar_tabla_proyecto(lista) { xd = lista;
        var component = '';
        lista = del_repeat(lista);
        for (var i = 0; i <= lista.length - 1; i++) {
            //component += "<tr class='fila'><td id="+lista[i].id+">"+lista[i].nombre+"</td><td>"+lista[i].ubicacion+"</td><td>"+lista[i].estado+"</td><td>"+lista[i].tipo+"</td></tr>";
            component += "<tr class='fila'><td id="+lista[i].id+">"+lista[i].nombre+"</td><td>"+lista[i].estado+"</td></tr>";
        }
        $("#tbBodyProyecto").html(component);
    }
    
    var del_repeat = function (lista) {
        var nuevaLista = new Array();
        for (var i = 0; i <= lista.length - 1; i++) {
            nuevaLista.push(lista[i].id);
        }
        nuevaLista = $.unique(nuevaLista);
        var x = buscar_lista(lista, nuevaLista);
        return x;
    };
    
    var buscar_lista = function (lista, xLista) {
        var y = new Array(), data;
        for (var i = 0; i <= xLista.length - 1; i++) {
            for (var j = 0; j <= lista.length - 1; j++) {
                if (xLista[i] === lista[j].id) {
                    data = lista[j];
                }
            } y.push(data);
        } return y;
    };
    
    /* Seleccionar Proyecto */
    $('#tbProyecto #tbBodyProyecto').on('dblclick', '.fila', function() { 
        var ide, nombre;
        cosoDirectoItem = 0;
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: ide = $(this).attr('id'); nombre = $(this).text(); break;
            }
        });
        $('#projectSelect').text(nombre); nombre_proyecto = nombre;
        buscar_liquidacion_detalle(ide);
        $("#tbBodyProyecto").html("");
    }); 
    
    
    /* Buscar proyecto detallado*/
    function buscar_liquidacion_detalle(_id) {
        var id = _id,
            url = 'http://'+domain+'/Electricity/public/proyecto';        
        $data = {id: id, tipo_busqueda: 'liquidacion_proyecto_detalle'};
        
        $.ajax({
            type: 'get',
            url: url,
            data: $data,
            success: function(response) { 
                if(response) { //alert(JSON.stringify(response));return;
                    generar_tabla_liquidacion_detalle(response);
                    $('#content-liquidacion').fadeIn();
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $('#content-liquidacion').fadeOut();
                }
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
            }
        });
    }
     
    var lista_liquidaciones, nombre_proyecto;
    function generar_tabla_liquidacion_detalle(lista) {
        lista_liquidaciones = lista;
        var component = '';
        component += "<ul class='collapsible' data-collapsible='accordion'>";
        for (var i = 0; i <= lista['liquidacion'].length - 1; i++) {  
            var precio_total_liquidacion = 0; 
            var btnReporte = "<button class='btn btnReporte' id="+i+">Reporte</button>";
            //total_precio_ventas += parseInt(lista[i].total_precio);
            component += "<li>";
            //component += "<div class='collapsible-header'><i class='material-icons'>shopping_cart</i><div>Fecha: "+lista[i].fecha+" Total Precio:"+lista[i].total_precio+"</div></div>";
            component += "<div class='collapsible-header'><i class='material-icons'>shopping_cart</i>Fecha de liquidacion: "+getFecha(lista['liquidacion'][i].fecha)+"<a href='#!' class='secondary-content'><i class='material-icons'>send</i></a></div>";
                component += "<div class='collapsible-body container'>";
                component += "<h6 align='center' style='color: #4db6ac; font-weight: bold; margin-top: -1%; margin-bottom: -2%; font-size: 120%;'>"+lista['liquidacion'][i].liquidacion+"</h6><br>";
                    component += "<table class='highlight bordered'>";
                        component += "<thead>";
                        component += "<tr><th>Nombre</th><th><center>Cantidad</center></th><th class='alinear-right'>Precio</th><th class='alinear-right'>Total precio</th></tr>";
                        component += "</thead>";
                        component += "<tbody id='tbBodyProducto'>";
                        for (var j = 0; j <= lista['liquidacion_detalle'][i].length - 1; j++) {
                            var precio = lista['liquidacion_detalle'][i][j].precio, cantidad = lista['liquidacion_detalle'][i][j].cantidad, 
                                precio_total = parseInt(precio)*parseInt(cantidad);
                            component += "<tr><td>"+lista['liquidacion_detalle'][i][j].nombre_apu+"</td><td><center>"+cantidad+"</center></td><td class='alinear-right'>"+precio+"</td><td class='alinear-right'>"+precio_total+"</td></tr>";
                            precio_total_liquidacion += precio_total;
                        }
                        component += "<tr style='background: #b2dfdb'><td>Precio total</td><td></td><td></td><td class='alinear-right'>"+precio_total_liquidacion+"</td></tr>";
                        component += "</tbody>";
                    component += "</table>";
                    component += "<h6 align='right' id=precioTotal"+i+" style='display:none;'>Precio total: "+precio_total_liquidacion+"</h6>";    
                    component += "<br>";
                    component += btnReporte;
            component += "</div>";
            component += "</li>";
        }
        component += "<ul>";
        /*$('#txtTotalPrecioVentas').val(total_precio_ventas);
        $('#inputTotalPrecioVentas').fadeIn();
        $('#txtTotalPrecioVentas').focus();*/
        $('#content-liquidacion').html(component);
        $('.collapsible').collapsible({ accordion : false });
    }
    
    $('#content-liquidacion').on("click", ".btnReporte", function (){
        var index = $(this).attr('id');
        var liquidacion_detalle = lista_liquidaciones['liquidacion_detalle'][index];
            lista_liquidaciones['liquidacion'][index]['fecha'] = getFecha(lista_liquidaciones['liquidacion'][index]['fecha'])
        var liquidacion = lista_liquidaciones['liquidacion'][index];
        console.log(liquidacion_detalle);
        console.log(liquidacion);
        var subTotal = parseInt(($("#precioTotal"+index).text()).split(" ")[2]),
            administracion = subTotal*0.08,
            imprevistos = subTotal*0.03,
            utilidad = subTotal*0.04,
            iva = utilidad*0.16,
            valor_final = subTotal + administracion + imprevistos + utilidad + iva;
        var data = {nombre_proyecto: nombre_proyecto, subTotal: subTotal, administracion: administracion,
                           imprevistos: imprevistos, utilidad: utilidad, iva: iva, valor_final: valor_final};    
                   console.log(data);
        reporte({liquidacion: liquidacion, liquidacion_detalle: liquidacion_detalle,
                 data: data});
    });
    
    var getFecha = function (_fecha) {
        var fecha = _fecha.split("-");
        switch (fecha[1]) {
            case "01":
                return "Enero "+fecha[2]+" "+fecha[0];
            case "02":
                return "Febrero "+fecha[2]+" "+fecha[0];
            case "03":
                return "Marzo "+fecha[2]+" "+fecha[0];
            case "04":
                return "Abril "+fecha[2]+" "+fecha[0];
            case "05":
                return "Mayo "+fecha[2]+" "+fecha[0];
            case "06":
                return "Junio "+fecha[2]+" "+fecha[0];
            case "07":
                return "Julio "+fecha[2]+" "+fecha[0];
            case "08":
                return "Agosto "+fecha[2]+" "+fecha[0];
            case "09":
                return "Septiembre "+fecha[2]+" "+fecha[0];
            case "10":
                return "Octubre "+fecha[2]+" "+fecha[0];
            case "11":
                return "Noviembre "+fecha[2]+" "+fecha[0];
            case "12":    
                return "Diciembre "+fecha[2]+" "+fecha[0];
        }
    };
    
    
    var reporte = function (data) {
        $('.btnReporte').attr('disabled', true);
        $.ajax({
            type: 'get',
            url: "http://localhost:1016/Electricity/public/reporteLiquidacionPDF",
            dataType: 'binary',
            data: data,
            success: function (result) {
                var $url = URL.createObjectURL(result); 
                
                jQuery('<a/>', { 
                    href: $url, download: 'reporte.pdf' 
                }).hide().appendTo("#reporte")[0].click();
                
                setTimeout(function () { URL.revokeObjectURL($url); }, 10000);
                $('.btnReporte').attr('disabled', false);
            },
            error : function (j) {
                alert(JSON.stringify(j));
                $('.btnReporte').attr('disabled', false);
            }
        });
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
    
    var proyectos = new Array();
    function get_distinc(lista) {
        
        /*for (var i = _i; i <= lista.length - 1; i++) {
            for (var j = _j; j <= lista.length - 1; j++) {
        
            }
        }*/ 
    }
    
//});

