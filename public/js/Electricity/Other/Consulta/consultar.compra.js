$(document).ready(function(){ 
    
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
            } else {
                fecha_inicio = '';
            }
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
            } else {
                fecha_final = '';
            }
        }
    });
    
    $('#btnBuscar').click(function () {
        buscar_orden_compra(); 
    });
    
    function buscar_orden_compra() {
        var url = 'http://'+domain+'/Electricity/public/compra',
            empresa = $('#txtEmpresa').val(),
            opcion = '';
    
            if (empresa !== '') { 
                opcion = 'empresa';
            }
            
            if (fecha_inicio !== '' && fecha_final !== '') { 
                opcion = 'fecha';
            }
            
            if (empresa !== '' && fecha_inicio !== '' && fecha_final !== '') { 
                opcion = 'empresa_fecha';
            }    
        $data = {compra: {empresa: empresa, fecha_inicio: fecha_inicio, fecha_final: fecha_final, opcion: opcion}};
        if (opcion !== '') {
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'json',
                data: $data,
                success: function(response) { 
                    if(response.length > 0) {
                        generar_orden_compra(response);
                    } else {
                        $("#text-modal").text('No se encontraron resultados');
                        $('#modal1').openModal();
                        //alert('No se encontraron resultados');
                        $('#content-compra').html("");
                    }
                }
                ,
                error : function (j) {
                    alert(JSON.stringify(j));
                }
            });
        } else {
            $("#text-modal").text('No ha digitado ningun nombre de empresa, o no ha seleccionado las fechas');
                    $('#modal1').openModal();
            //alert('No ha digitado ningun nombre de empresa, o no seleccionado las fechas');
        } 
    }
    
    function generar_orden_compra(lista) {
        var component = '', precio_total;
        //component = "<h5 align='center'>Cliente: "+lista[0].cliente+"</h5>";
        component += "<ul class='collapsible' data-collapsible='accordion'>";
        for (var i = 0; i <= lista.length - 1; i++) {  
            precio_total = 0;
            //total_precio_ventas += parseInt(lista[i].total_precio);
            component += "<li>";
            //component += "<div class='collapsible-header'><i class='material-icons'>shopping_cart</i><div>Fecha: "+lista[i].fecha+" Total Precio:"+lista[i].total_precio+"</div></div>";
            component += "<div class='collapsible-header'><i class='material-icons'>shopping_cart</i>Empresa: "+lista[i].compra['empresa']+" Fecha: "+lista[i].compra['fecha']+"<a href='#!' class='secondary-content'><i class='material-icons'>send</i></a></div>";
                component += "<div class='collapsible-body container'>";
                component += "<h5 align='center'> Productos</h5>";
                    component += "<table class='highlight bordered'>";
                        component += "<thead>";
                        component += "<tr><th>Nombre</th><th>Precio</th><th><center>Cantidad</center></th><th>Total precio</th></tr>";
                        component += "</thead>";
                        component += "<tbody id='tbBodyProducto'>";
                        for (var j = 0; j <= lista[i].compra_detalle.length - 1; j++) {
                            var valor_total = parseInt(lista[i].compra_detalle[j].valor_unitario)*parseInt(lista[i].compra_detalle[j].cantidad);
                            component += "<tr><td>"+lista[i].compra_detalle[j].descripcion_producto+"</td><td>"+lista[i].compra_detalle[j].valor_unitario+"</td><td><center>"+lista[i].compra_detalle[j].cantidad+"</center></td><td>"+valor_total+"</td></tr>";
                            //precio_total += parseInt(lista[i].productos[j].precio_total);
                        }
                        component += "</tbody>";
                    component += "</table>";
                    //component += "<h6 align='right'>Precio total: "+precio_total+"</h6>";    
            component += "</div>";
            component += "</li>";
        }
        component += "<ul>";
        /*$('#txtTotalPrecioVentas').val(total_precio_ventas);
        $('#inputTotalPrecioVentas').fadeIn();
        $('#txtTotalPrecioVentas').focus();*/
        $('#content-compra').html(component);
        $('.collapsible').collapsible({ accordion : false });
    }
});
