$(document).ready(function(){
    var domain = 'localhost:1016';
    
    $('select').material_select(); 
    
    function buscar_nomina() {
        $('#content-nomina').fadeOut();
        var nombre = $('#txtNombre').val(),
            anio_inicio = $('#txtAnioInicio').val(),
            anio_final = $('#txtAnioFinal').val(),
            mes_inicio = get_mes($("#cboxMesInicio option:selected").html()),
            mes_final = get_mes($("#cboxMesFinal option:selected").html()),
            url = 'http://'+domain+'/Electricity/public/nomina',
            opcion = '', fecha_menor = '', fecha_mayor = '';
            
            if (nombre !== '') { 
                opcion = 'nombre';
            }
            
            if (anio_inicio !== '' && anio_final !== '') { 
                opcion = 'fecha';
                fecha_menor = anio_inicio+'-'+mes_inicio+'-01', fecha_mayor = anio_final+'-'+mes_final+'-30';
            }
            
            if (nombre !== '' && anio_inicio !== '' && anio_final !== '') { 
                opcion = 'nombre_fecha';
                fecha_menor = anio_inicio+'-'+mes_inicio+'-01', fecha_mayor = anio_final+'-'+mes_final+'-30';
            }
            
            //alert(fecha_menor+' / '+fecha_mayor);
        if(nombre !== '' || (anio_inicio !== '' && anio_final !== '')) {    
        $data = {nomina: {nombre: nombre, fecha_menor: fecha_menor, fecha_mayor: fecha_mayor, opcion: opcion}, tipo_busqueda: {tipo: 'nomina'}};    
        
            //alert(anio_inicio.length)
        $.ajax({
            type: 'get',
            url: url,
            data: $data,
            dataType: 'json',
            success: function(response) {
                if(response.length > 0) {
                    generar_tabla_nomina(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                        $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $('#tbBodyNomina').html("");
                }
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
            }
        });
        } else {
            $("#text-modal").text('Faltan campos por completar');
                        $('#modal1').openModal();
            //alert('Faltan campos por completar');
        }
    }
    
    function generar_tabla_nomina(lista) {
        var component;
        for (var i = 0; i <= lista.length - 1; i++) {
            component += "<tr class='filaNomina'><td id="+lista[i].id+">"+lista[i].nombre+"</td><td>"+lista[i].fecha_menor+"  -  "+lista[i].fecha_mayor+"</td><td>"+lista[i].valor_total+"</td><td>"+lista[i].estado+"</td></tr>";
        }
        $("#tbBodyNomina").html(component);
    }
    
    $('#btnBuscar').click(function() { 
        buscar_nomina(); 
    });
    
    /* Seleccionar proyecto */
    $('#tbNomina #tbBodyNomina').on('dblclick', '.filaNomina', function() { 
        var nomina_id, nombre, _fecha, ide;
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: nombre = $(this).text();
                        nomina_id = $(this).attr('id');
                        break;
                case 1: _fecha = $(this).text();
                        break;
            }
        });
        $('#lbNombreNomina').text(nombre+' '+_fecha);
        buscar_nomina_detalle(nomina_id); 
        $('#content-nomina').fadeIn();
    }); 
    
    function buscar_nomina_detalle(nomina_id) {
        var url = 'http://'+domain+'/Electricity/public/nomina';
        $data = {nominaDetalle: {id: nomina_id}, tipo_busqueda: {tipo: 'nominaDetalle'}};    
        $.ajax({
            type: 'get',
            url: url,
            data: $data,
            dataType: 'json',
            success: function(response) {
                if(response) {
                    generar_tabla_nomina_detalle(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $('#tbBodyNominaDetalle').html("");
                }
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
            }
        });    
    }
    
    function generar_tabla_nomina_detalle(lista) {
       var component;
        for (var i = 0; i <= lista.length - 1; i++) {
            //component += "<tr><td>"+lista[i].identificacion+"</td><td>"+lista[i].empleado+"</td><td>"+lista[i].salario_basico+"</td><td>"+lista[i].dias_liquidados+"</td><td>"+lista[i].basico+"</td><td>"+lista[i].auxilio_transporte+"</td><td>"+lista[i].horas_extras+"</td><td>"+lista[i].comision+"</td><td>"+lista[i].total_devengado+"</td><td>"+lista[i].salud+"</td><td>"+lista[i].pension+"</td><td>"+lista[i].total_deducciones+"</td><td>"+lista[i].neto_pagado+"</td></tr>";    
            component += "<tr><td>"+lista[i].empleado+"</td><td>"+lista[i].salario_basico+"</td><td>"+lista[i].dias_liquidados+"</td><td>"+lista[i].basico+"</td><td>"+lista[i].auxilio_transporte+"</td><td>"+lista[i].horas_extras+"</td><td>"+lista[i].comision+"</td><td>"+lista[i].total_devengado+"</td><td>"+lista[i].salud+"</td><td>"+lista[i].pension+"</td><td>"+lista[i].total_deducciones+"</td><td>"+lista[i].neto_pagado+"</td></tr>";    
        }
        $("#tbBodyNominaDetalle").html(component); 
        calcular_totales();
    }
    
    calcular_totales = function () {
        var basico, dias_liq, aux_transp, comision, horas_extras, total_devengado, salud,
            pension, total_deducciones, neto_pagado, total_basico = 0, total_dias_liq = 0,  total_aux_transp = 0, total_comision = 0,
            total_horas_extras = 0, total_total_devengado = 0, total_salud = 0,
            total_pension = 0, total_total_deducciones = 0, total_neto_pagado = 0;
        $("#tbBodyNominaDetalle tr").each(function (index) { 
            $(this).children("td").each(function (index2) 
            {
                switch (index2) 
                {
                    case 2: dias_liq = $(this).text();
                            break;         
                    case 3: basico = $(this).text();
                            break;
                    case 4: aux_transp = $(this).text();
                            break;        
                    case 5: horas_extras = $(this).text();
                            break;
                    case 6: comision = $(this).text();
                            break;        
                    case 7: total_devengado = $(this).text();
                            break;         
                    case 8: salud = $(this).text();
                            break;
                    case 9: pension = $(this).text();
                            break;
                    case 10: total_deducciones = $(this).text();
                            break;        
                    case 11: neto_pagado = $(this).text();
                            break;         
                } 
            });  
            total_dias_liq += parseInt(dias_liq);
            total_basico += parseInt(basico);
            total_aux_transp += parseInt(aux_transp);
            total_horas_extras += parseInt(horas_extras);
            total_comision += parseInt(comision);
            total_total_devengado += parseInt(total_devengado);
            total_salud += parseInt(salud);
            total_pension += parseInt(pension);
            total_total_deducciones += parseInt(total_deducciones);
            total_neto_pagado += parseInt(neto_pagado);
        }); 
        var component; 
        component = "<tr class=fila_total><td>Totales</td><td></td><td>"+total_dias_liq+"</td><td>"+total_basico+"</td><td>"+total_aux_transp+"</td><td>"+total_horas_extras+"</td><td>"+total_comision+"</td><td>"+total_total_devengado+"</td><td>"+total_salud+"</td><td>"+total_pension+"</td><td>"+total_total_deducciones+"</td><td>"+total_neto_pagado+"</td><td></td></tr>";    
        $("#tbBodyNominaDetalle").append(component);
    }
    
    function get_mes(mes) {
        switch (mes) {
            case 'Enero':
                return '01';
            case 'Febrero':
                return '02';
            case 'Marzo':
                return '03';
            case 'Abril':
                return '04';
            case 'Mayo':
                return '05';
            case 'Junio':
                return '06';
            case 'Julio':
                return '07';
            case 'Agosto':
                return '08';
            case 'Septiembre':
                return '09';
            case 'Octubre':
                return '10';
            case 'Noviembre':
                return '11';
            case 'Diciembre':
                return '12';    
        }
    }
    electricity.onlyNumber('.only-number');
    $('#txtAnioInicio').keypress(function () {
        var anioInicio = $('#txtAnioInicio').val();
        if (anioInicio.length > 3) {
            return false;
        }
    });
    
    $('#txtAnioFinal').keypress(function () {
        var anioFinal = $('#txtAnioFinal').val();
        if (anioFinal.length > 3) {
            return false;
        }
    });
});

