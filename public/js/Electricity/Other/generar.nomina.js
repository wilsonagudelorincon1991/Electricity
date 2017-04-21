$(document).ready(function(){
    /* Variables globales */
    var empleados = new Array(),
        index = 0, total_valor = 0;
    
    /* Inicializando componente */
    var fecha_menor = '', fecha_mayor = '', anioMenor = 0, mesMenor = 0, 
                diaMenor = 0, anioMayor = 0, mesMayor = 0, diaMayor = 0;
    
    $('#txtFechaMenor').pickadate({
        selectMonths: true, // Creates a dropdown to control monthan
        selectYears: 15, // Creates a dropdown of 15 years to control year
        onSet : function (x) {
            if (x.select) {
                var fechaSelect = new Date(x.select);
                fecha_menor = fechaSelect.getFullYear();
                fecha_menor += '-' + (fechaSelect.getMonth() + 1); 
                fecha_menor += '-' + fechaSelect.getDate();
                anioMenor = fechaSelect.getFullYear();
                mesMenor = (fechaSelect.getMonth() + 1);
                diaMenor = fechaSelect.getDate();
            }
        }
    });
    
    $('#txtFechaMayor').pickadate({
        selectMonths: true, // Creates a dropdown to control monthan
        selectYears: 15, // Creates a dropdown of 15 years to control year
        onSet : function (x) {
            if (x.select) {
                var fechaSelect = new Date(x.select);
                fecha_mayor = fechaSelect.getFullYear();
                fecha_mayor += '-' + (fechaSelect.getMonth() + 1); 
                fecha_mayor += '-' + fechaSelect.getDate();
                anioMayor = fechaSelect.getFullYear();
                mesMayor = (fechaSelect.getMonth() + 1);
                diaMayor = fechaSelect.getDate();
            }
        }
    });
    /* Evento click buscar empleado */
    $('#btnBuscar').click(function() { 
        buscar_empleado();
    });
    
    function buscar_empleado() {
        var apellido = $('#txtApellido').val(),
            url = 'http://'+domain+'/Electricity/public/empleado/'+apellido;
            if (apellido !== '') {
        $('#btnBuscar').attr('disabled', true);
        $.ajax({
            type: 'get',
            url: url,
            success: function(response) {
                if (response.length > 0) { //alert(JSON.stringify(response)); return;
                    empleados = response;
                    set_empleado(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $('#tbBodyEmpleado').html("");
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
            $("#text-modal").text('No ha digitado nada');
                    $('#modal1').openModal();
        }
    }
        
    /* */
    function set_empleado(lista) {
        var component = '';
        for (var i = 0; i <= lista.length - 1; i++) {
            component += "<tr class='fila'><td id="+i+">"+lista[i].identificacion+"</td><td>"+lista[i].nombres+" "+lista[i].primer_apellido+" "+lista[i].segundo_apellido+"</td><td>"+lista[i].salario_basico+"</td><td>"+lista[i].auxilio_transporte+"</td></tr>";
        }
        $('#tbBodyEmpleado').html(component);
    }
    
    /* */
    /* Agregar elemento a la tabla */
    $('#tbEmpleado #tbBodyEmpleado').on('dblclick', '.fila', function() { 
        var identificacion, empleado, salario_basico;
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: identificacion = $(this).text();
                        index = $(this).attr('id');
                        break;
                case 1: empleado = $(this).text();
                        break;
                case 2: salario_basico = $(this).text();
                        break;
            }
            
        });
        $('#lbEmpleado').text(empleado);
    });
    
    /* Evento click agregar*/
    $('#btnAgregar').click(function() { 
        agregar();
    });
    
    /* Agregar fila */
    function agregar() {
        var empleado = $('#lbEmpleado').text(),
            dias_liquidados = $('#txtDiasLiquidados').val(),
            //auxilio_transporte = $('#txtAuxilioTransporte').val(),
            comision = $('#txtComision').val(),
            horas_extras = $('#txtHorasExtras').val();
            
        if (empleado !== 'Empleado' && dias_liquidados !== '' && comision !== '' && horas_extras !== '') {    
            var salario_basico = empleados[index].salario_basico,
            basico = Math.round((salario_basico/30)*dias_liquidados),
            auxilio_transporte = (parseInt(empleados[index].auxilio_transporte)/30)*dias_liquidados,
            total_devengado = parseInt(basico) + auxilio_transporte + parseInt(comision) + parseInt(horas_extras),
            salud = Math.round(basico*0.04),
            pension = Math.round(basico*0.04),
            total_deducciones = parseInt(salud) + parseInt(pension),
            neto_pagado = total_devengado - total_deducciones,
            component = '', idFila = 'fila'+index, identificacion = empleados[index].identificacion;
        
            if (validate("empleado"+index, 'tbBodyNomina')) {
                var btnQuitar = "<center><button id="+index+" class='btnQuitar btn-floating btn-small waves-effect waves-light teal lighten-1'><i class='material-icons'>delete</i></button></center>";
                component = "<tr id="+idFila+"><td id=empleado"+index+">"+empleado+"</td><td id="+identificacion+">"+salario_basico+"</td><td>"+dias_liquidados+"</td><td>"+basico+"</td><td>"+auxilio_transporte+"</td><td>"+horas_extras+"</td><td>"+comision+"</td><td>"+total_devengado+"</td><td>"+salud+"</td><td>"+pension+"</td><td>"+total_deducciones+"</td><td>"+neto_pagado+"</td><td>"+btnQuitar+"</td></tr>";    
                $('.fila_total').remove();
                $("#tbBodyNomina").append(component);
                calcular_totales();
            }
        } else {
            $("#text-modal").text('Faltan campos por completar o no a realizado ninguna busqueda de empleado');
                    $('#modal1').openModal();
            //alert('Faltan campos por completar o no a realizado ninguna busqueda de empleado');
        }
    }
    
    /* Validar que no se agregue a la tabla un dato igual */
    function validate(id, nametBody) {
        var ide = 0,
            estado = true;
        $("#"+nametBody+ " tr").each(function (index) {
            $(this).children("td").each(function (index2) 
            {
                switch (index2) 
                {
                    case 0: ide = $(this).attr('id');
                            if (ide === id) { 
                                estado = false;
                            }
                        break;
                }
            });
        });
        return estado;
    }
    
    /* Quitar fila*/
    $('#tbBodyNomina').on('click', '.btnQuitar', function(e) {
        var id = $(this).attr('id');
        $("#fila"+id).remove(); $('.fila_total').remove();
        calcular_totales();
    });
    
    /* Evento click registrar */
    $('#btnRegistrar').click(function() { 
        registrar();
    });
    
    /* Registrar */
    function registrar() {
        var nombre = $('#txtNombre').val();
        
        if (nombre === '' || fecha_menor === '' || fecha_mayor === '') {
            $("#text-modal").text('Faltan campos por completar');
                $('#modal1').openModal();
            //alert('Faltan campos por completar');
        } else { // alcular_totales();
            $('#btnRegistrar').attr('disabled', true);
            getNomina();    
            $parameters = {nomina: {nombre: nombre, fecha_menor: fecha_menor, fecha_mayor: fecha_mayor,
                           valor_total: total_valor}, nomina_detalle: nomina};
                   console.log(nomina);
            $.ajax({
                type: 'post',
                url: 'http://'+domain+'/Electricity/public/nomina',
                data:  $parameters, 
                success: function(response) {
                    $("#text-modal").text(response);
                    //$('#modal1').openModal();
                    //alert(response);
                    console.log(response);
                    //clearForm();
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
    var nomina = new Array(); 
    /* Obtener datos de los productos */
    function getNomina() {
        var identificacion, empleado, salario_basico, basico, dias_liq, aux_transp, comision, horas_extras, total_devengado, salud,
            pension, total_deducciones, neto_pagado;
        $("#tbBodyNomina tr").each(function (index) {
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: empleado = $(this).text();
                        break;
                case 1: salario_basico = $(this).text();
                        identificacion = $(this).attr('id');
                        break;        
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
        total_valor += parseInt(neto_pagado);
            if (empleado !== "Totales") { 
                    nomina.push({identificacion: identificacion, empleado: empleado, salario_basico: salario_basico, dias_liquidados: dias_liq, basico: basico, auxilio_transporte: aux_transp, comision: comision,
                                 horas_extras: horas_extras, total_devengado: total_devengado, salud: salud, pension: pension, total_deducciones: total_deducciones, neto_pagado: neto_pagado, nomina_id: -1});
            }
        });
    }
    
    calcular_totales = function () {
        var basico, dias_liq, aux_transp, comision, horas_extras, total_devengado, salud,
            pension, total_deducciones, neto_pagado, total_basico = 0, total_dias_liq = 0,  total_aux_transp = 0, total_comision = 0,
            total_horas_extras = 0, total_total_devengado = 0, total_salud = 0,
            total_pension = 0, total_total_deducciones = 0, total_neto_pagado = 0;
        $("#tbBodyNomina tr").each(function (index) { 
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
        $("#tbBodyNomina").append(component);
    }
    
    function clearForm() {
        $('input').each(function (i) {
            $(this).val("");
            $(this).focusout();
        });
        $("#tbBodyNomina").html("");
        $("#tbBodyEmpleado").html("");
        $('#lbEmpleado').text('Empleado');
        nomina.length = 0;
    }
    electricity.onlyNumber('.only-number');
    electricity.onlyLetter('.only-letter');
});

