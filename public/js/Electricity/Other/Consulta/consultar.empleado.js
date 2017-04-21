$(document).ready(function(){
    var domain = 'localhost:1016';
    function listar_empleados() {
        var url = 'http://'+domain+'/Electricity/public/empleado';
        $.ajax({
            type: 'get',
            url: url,
            success: function(response) { 
                //if(response['estado']) {
                if(response) {
                    generar_tabla_empleado(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                        $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $('#tbBodyEmpleado').html("");
                }
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
            }
        });
    }
    
    function buscar_empleado() {
        var apellido = $('#txtApellido').val(),
            url = 'http://'+domain+'/Electricity/public/empleado/'+apellido;
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function(response) {
                if(response) {
                    generar_tabla_empleado(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                        $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $('#tbBodyEmpleado').html("");
                }
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
            }
        });
    }
    
    function generar_tabla_empleado(lista) {
        var component;
        for (var i = 0; i <= lista.length - 1; i++) {
            component += "<tr><td>"+lista[i].identificacion+"</td><td>"+lista[i].nombres+" "+lista[i].primer_apellido+" "+lista[i].segundo_apellido+"</td><td>"+lista[i].cargo+"</td><td>"+lista[i].salario_basico+"</td><td>"+lista[i].telefono+"</td><td>"+lista[i].email+"</td></tr>";
        }
        $("#tbBodyEmpleado").html(component);
    }
    //listar_empleados();
    $('#btnBuscar').click(function() {  
        buscar_empleado(); 
    });
});
