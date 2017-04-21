$(document).ready(function(){
    var domain = 'localhost:1016';
    function listar_clientes() {
        var url = 'http://'+domain+'/Electricity/public/cliente';
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function(response) {
                //if(response['estado']) {
                if(response) {
                    generar_tabla_cliente(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $('#tbBodyCliente').html("");
                }
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
            }
        });
    }
    
    function buscar_cliente() {
        var nombre = $('#txtNombre').val(),
            url = 'http://'+domain+'/Electricity/public/cliente/'+nombre;
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function(response) {
                if(response) {
                    generar_tabla_cliente(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $('#tbBodyCliente').html("");
                }
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
            }
        });
    }
    
    function generar_tabla_cliente(lista) {
        var component;
        for (var i = 0; i <= lista.length - 1; i++) {
            component += "<tr><td>"+lista[i].identificacion+"</td><td>"+lista[i].nombre+"</td><td>"+lista[i].telefono+"</td><td>"+lista[i].email+"</td></tr>";
        }
        $("#tbBodyCliente").html(component);
    }
    //listar_clientes();
    $('#btnBuscar').click(function() { 
        var nombre = $('#txtNombre').val();
        if (nombre !== '') { buscar_cliente(); }
        else { listar_clientes(); }
    });
});

