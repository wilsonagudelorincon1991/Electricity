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
                /*anio = fechaSelect.getFullYear();
                mes = (fechaSelect.getMonth() + 1);
                dia = fechaSelect.getDate();*/
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
                /*anio = fechaSelect.getFullYear();
                mes = (fechaSelect.getMonth() + 1);
                dia = fechaSelect.getDate();*/
            }
        }
    });
    
    function buscar_egresos() {
        var url = 'http://'+domain+'/Electricity/public/egreso';
        $data = {fecha_inicio: fecha_inicio, fecha_final: fecha_final};
        if (fecha_inicio !== '' && fecha_final !== '') {
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'json',
                data: $data,
                success: function(response) { 
                    if(response.length) {
                        generar_tabla_egreso(response);
                    } else {
                        $("#text-modal").text('No se encontraron resultados');
                            $('#modal1').openModal();
                        //alert('No se encontraron resultados');
                        $('#tbBodyEgreso').html("");
                    }
                }
                ,
                error : function (j) {
                    alert(JSON.stringify(j));
                }
            });
        } else {
            $("#text-modal").text('Seleccione la fecha de inicio y fecha final');
                            $('#modal1').openModal();
        }
    }
    
    function generar_tabla_egreso(lista) {
        var component;
        for (var i = 0; i <= lista.length - 1; i++) {
            component += "<tr><td>"+lista[i].persona+"</td><td>"+lista[i].concepto+"</td><td>"+lista[i].ciudad+"</td><td>"+lista[i].fecha+"</td><td>"+lista[i].valor+"</td></tr>";
        }
        $("#tbBodyEgreso").html(component);
    }
    
    $('#btnBuscar').click(function () {
        buscar_egresos();
    });
    
});
