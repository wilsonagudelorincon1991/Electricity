$(document).ready(function(){
    var domain = 'localhost:1016';
    function listar_herramientas() {
        var url = 'http://'+domain+'/Electricity/public/herramienta';
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function(response) {
                //if(response['estado']) {
                if(response) {
                    generar_tabla_material(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $('#tbBodyMaterial').html("");
                }
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
            }
        });
    }
    
    function buscar_herramienta() {
        var nombre = $('#txtNombre').val(),
            url = 'http://'+domain+'/Electricity/public/herramienta/'+nombre;
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function(response) {
                if(response) {
                    generar_tabla_material(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $('#tbBodyMaterial').html("");
                }
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
            }
        });
    }
    
    function generar_tabla_material(lista) {
        var component;
        for (var i = 0; i <= lista.length - 1; i++) {
            component += "<tr><td>"+lista[i].nombre+"</td><td>"+lista[i].descripcion+"</td><td>"+lista[i].unidad_medida+"</td><td>"+lista[i].v_unitario+"</td></tr>";
        }
        $("#tbBodyMaterial").html(component);
    }
    //listar_herramientas();
    $('#btnBuscar').click(function() {
        var nombre = $('#txtNombre').val();
        if (nombre !== '') { buscar_herramienta(); }
        else { listar_herramientas(); }
    });
});



