$(document).ready(function(){
    /* Inicializando componente */
    var fecha = '', anio = 0, mes = 0, 
                dia = 0;
    
    $('#txtFecha').pickadate({
        selectMonths: true, // Creates a dropdown to control monthan
        selectYears: 15, // Creates a dropdown of 15 years to control year
        onSet : function (x) {
            if (x.select) {
                var fechaSelect = new Date(x.select);
                fecha = fechaSelect.getFullYear();
                fecha += '-' + (fechaSelect.getMonth() + 1); 
                fecha += '-' + fechaSelect.getDate();
                anio = fechaSelect.getFullYear();
                mes = (fechaSelect.getMonth() + 1);
                dia = fechaSelect.getDate();
            }
        }
    });
    
    /* Evento click agregar*/
    $('#btnAgregar').click(function() { 
        agregar();
    });
    
    /* Agregar fila */
    function agregar() {
        var codigo = $('#txtCodigo').val(),
            descripcion = $('#txtDescripcion').val().toUpperCase(),
            cantidad = $('#txtCantidad').val(),
            valor_unitario = $('#txtValorUnitario').val(),
            valor_total = parseInt(cantidad)*parseInt(valor_unitario),
            component = '', idFila = 'fila'+codigo;
        if (codigo !== '' && descripcion !== '' && cantidad !== '' && valor_unitario !== '') {
            var btnQuitar = "<center><button id="+codigo+" class='btnQuitar btn-floating btn-small waves-effect waves-light teal lighten-1'><i class='material-icons'>delete</i></button></center>";
            component = "<tr id="+idFila+"><td>"+codigo+"</td><td>"+descripcion+"</td><td><center>"+cantidad+"</center></td><td>"+valor_unitario+"</td><td>"+valor_total+"</td><td>"+btnQuitar+"</td></tr>";    
            $("#tbBodyProducto").append(component);
        } else {
            $("#text-modal").text('Faltan campos por completar');
                $('#modal1').openModal();
            //alert('Faltan campos por completar'); 
        }
    }
    
    /* Quitar fila*/
    $('#tbBodyProducto').on('click', '.btnQuitar', function(e) {
        var id = $(this).attr('id');
        $("#fila"+id).remove();
        //calcularPresupuesto();
    });
    
    /* Evento click registrar */
    $('#btnRegistrar').click(function() { 
        registrar();
    });
    
    /* Registrar */
    function registrar() {
        var cliente = $('#txtCliente').val(),
            fecha = anio+'-'+mes+'-'+dia;
        getProducto();    
        $parameters = {compra: {empresa: cliente, fecha: fecha}, compra_detalle: productos};
        
        //alert(JSON.stringify($parameters));
        //alert(JSON.stringify(productos));
        if (fecha === '' || cliente === '') {
            $("#text-modal").text('Faltan campos por completar');
                $('#modal1').openModal();
            //alert('Faltan campos por completar');
        } else {
            $('#btnRegistrar').attr('disabled', true);
            $.ajax({
                type: 'post',
                url: 'http://'+domain+'/Electricity/public/compra',
                data:  $parameters, 
                success: function(response) {
                    $("#text-modal").text(response);
                $('#modal1').openModal();
                    //alert(response);//
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
    var productos = new Array(); 
    /* Obtener datos de los productos */
    function getProducto() {
        var codigo, cantidad, valor_unitario, descripcion;
        $("#tbBodyProducto tr").each(function (index) {
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: codigo = $(this).text();
                        break;
                case 1: descripcion = $(this).text();
                        break;        
                case 2: cantidad = $(this).text();
                        break;         
                case 3: valor_unitario = $(this).text();
                        break;
            }
        }); 
        productos.push({codigo_producto: codigo, descripcion_producto: descripcion, cantidad: cantidad, valor_unitario: valor_unitario, compra_id: -1});
        });
    }
    
    function clearForm() {
        $('input').each(function (i) {
            $(this).val("");
            $(this).focusout();
        });
        $("#tbBodyProducto").html("");
        productos.length = 0;
    }
    
    electricity.onlyNumber('.only-number');
    electricity.onlyLetter('.only-letter');
});

