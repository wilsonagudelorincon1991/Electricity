$(document).ready(function(){
    /* Inicializar Componentes */
    $('ul.tabs').tabs(); var $foto;
    
    var tabsActive = 'personal';
    
    jQuery('#txtImg').change(function () {
        if ($(this)[0].files.length === 0) { return; }
        
        var reader = new FileReader(); // Instanciando

        reader.onload = function (e) { 
            $foto = e.target.result;
            jQuery('#view-image').html("<img src='" + $foto + "'>");
        };

        reader.readAsDataURL($(this)[0].files[0]);
    });
    
    /* Cargar categorias */
    function cargar_categorias() {
        $.ajax({
            type: 'get',
            url: 'http://'+domain+'/Electricity/public/categoria',
            success: function(response) {
                if (response) {
                    set_cbox_categoria(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                }
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
            }
        });
    }
    
    /* Generar cbox categorias */
    function set_cbox_categoria(lista) { 
        var component = '';
        for (var i = 0; i <= lista.length - 1; i++) { //alert(lista[i].nombre)
            component += "<option value="+lista[i].id+">"+lista[i].nombre+"</option>";
        }
        $('#cboxCategoria').html(component); $('select').material_select();
    }
    
    /* Cargar categorias*/
    cargar_categorias();
    
    /* Buscar Mano de obra - Herremienta - Material*/
    $('#btnBuscar').click(function() { 
        var url,
            nombre = $('#txtNombreBuscar').val();
        if (nombre === '') {
            $("#text-modal").text('No ha digitado nada');
                    $('#modal1').openModal();
            //alert('No ha digitado nada');
        } else {   
            switch (tabsActive) 
            {
                case 'personal': url = 'http://'+domain+'/Electricity/public/personal/'+nombre;
                        break;
                case 'herramienta': url = 'http://'+domain+'/Electricity/public/herramienta/'+nombre;
                        break;
                case 'material': url = 'http://'+domain+'/Electricity/public/material/'+nombre;
                        break;        
            }
            ajaxConsultar(url, resultBusqueda);
        }
    });
    
    /* Proceso ajax consultar */
    function ajaxConsultar(url, funcion) { 
        $('#btnBuscar').attr('disabled', true);
        $.ajax({
            type: 'get',
            url: url,
            success: function(response) {
                funcion(response);
                $('#btnBuscar').attr('disabled', false);
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
                $('#btnBuscar').attr('disabled', false);
            }
        });
    }
    
    /* Resultado de la busqueda */
    function resultBusqueda(lista) {
        var component = '';
        if (lista.length > 0) {
            /*if (tabsActive === 'material') {*/
                for (var i = 0; i <= lista.length - 1; i++) {
                    component += "<tr class='fila'><td id="+lista[i].id+">"+lista[i].nombre+"</td><td>"+lista[i].v_unitario+"</td><td>"+lista[i].unidad_medida+"</td></tr>";
                }
            /*} else {
                for (var i = 0; i <= lista.length - 1; i++) {
                    component += "<tr class='fila'><td id="+lista[i].id+">"+lista[i].nombre+"</td><td>"+lista[i].costo_hora+"</td></tr>";
                }
            } */
            $('#tbBodyResult').html(component);
        } else {
            $('#tbBodyResult').html("");
            $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
            //alert('No se encontraron resultados');
        }    
    }
    
    /* Agregar elemento a la tabla (Personal, Herramienta, Material) */
    $('#tbResult #tbBodyResult').on('dblclick', '.fila', function() { 
        var nombre, precio, unidad, ide;
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: nombre = $(this).text();
                        ide = $(this).attr('id');
                        break;
                case 1: precio = $(this).text();
                        break;
            }
            /*if (tabsActive === 'material') {
                switch (index2) 
                {
                    case 0: nombre = $(this).text();
                            ide = $(this).attr('id');
                            break;
                    case 1: precio = $(this).text();
                            break;
                    case 2: unidad = $(this).text();
                            break;        
                }
            } else {
                switch (index2) 
                {
                    case 0: nombre = $(this).text();
                            ide = $(this).attr('id');
                            break;
                    case 1: precio = $(this).text();
                            break;
                }
            }*/
        });
        var inputCantidad = "<input id="+ide+" type='text' value='1' style='width: 50; text-align: center; margin-top: -10px'>",
            //inputHoras = "<input id="+ide+"horas code="+ide+" type='text' value='1' style='width: 50; text-align: center; margin-top: -10px'>",
            idFila = "fila"+ide, v_unitario = "v_unitario"+ide, v_parcial = "v_parcial"+ide, 
            btnQuitar = "<center><button id="+idFila+" class='btnQuitar btn-floating btn-small waves-effect waves-light teal lighten-1'><i class='material-icons'>delete</i></button></center>";
            var component = "<tr id="+idFila+"><td id="+ide+">"+nombre+"</td><td id="+v_unitario+">"+precio+"</td><td style='padding: 0px'><center>"+inputCantidad+"</center></td><td id="+v_parcial+">"+precio+"</td><td>"+btnQuitar+"</td></tr>";
            
        /* Teniendo en cuenta las horas*/
        if (tabsActive === 'material') {
            //var component = "<tr id="+idFila+"><td id="+ide+">"+nombre+"</td><td>"+precio+"</td><td><center>"+unidad+"</center></td><td><center>"+inputCantidad+"</center></td><td>"+btnQuitar+"</td></tr>"
        } else {
            //var component = "<tr id="+idFila+"><td id="+ide+">"+nombre+"</td><td>"+precio+"</td><td><center>"+inputCantidad+"</center></td><td><center>"+inputHoras+"</center></td><td>"+btnQuitar+"</td></tr>"
        }
        
        switch (tabsActive) 
        {
            case 'personal': 
                    if (validatePersonal(ide)) {
                        $('#tbBodyPersonal').append(component);
                    } 
                break;
            case 'herramienta': 
                    if (validateHerramienta(ide)) {
                        $('#tbBodyHerramienta').append(component);
                    }
                    break;
            case 'material': 
                    if (validateMaterial(ide)) {
                        $('#tbBodyMaterial').append(component);
                    }
                    break;        
        }
    });
    
    //click en tabs
    $('#liPersonal').click(function() {
        if (tabsActive !== 'personal') {
            setCampos('Mano de obra', 'personal');
        }
    });
    
    $('#liHerramienta').click(function() {
        if (tabsActive !== 'herramienta') {
            setCampos('Nombre de la herramienta', 'herramienta');
        }
    });
    
    $('#liMaterial').click(function() {
        if (tabsActive !== 'material') {
            setCampos('Nombre del material', 'material');
        }
    });
    
    function setCampos(lbMsj, tabNombre) {
        $('#lbNombre').text(lbMsj);
        $('#tbBodyResult').html("");
        $('#txtNombreBuscar').val("");
        $('#txtNombreBuscar').focus();
        tabsActive = tabNombre;
    }
    
    //Evento keypress del input cantidad (Tabla personal)
  
    
    //Resgistrar APU
    
    $('#btnRegistrar').click(function() {
       var  descripcion = $('#txtDescripcion').val().toUpperCase(),
            categoria = $('#cboxCategoria').val();
            getPersonal(); 
            getHerramienta();
            getMaterial(); 
            costo_total_apu = costo_total_personal + costo_total_herramienta + costo_total_material;
            
            $apu = {
                categoria_id: categoria, 
                foto: $foto,
                nombre: 'X', 
                descripcion: descripcion, costo_total: costo_total_apu};
            
            $data = {apu: $apu, apu_personal: personal, apu_herramienta: herramientas, apu_material: materiales};
        
        if (personal.length === 0 && herramientas.length === 0 && materiales.length === 0 || descripcion === "") {
            $("#text-modal").text('faltan campos por completar, o no hay realizado ningun tipo de busqueda');
                    $('#modal1').openModal();
            //alert('faltan campos por completar, o no hay realizado ningun tipo de busqueda');
        } else {
            ajaxRegistrar($data); 
            clearForm();
        }
    });
    
    var personal = new Array();
    var herramientas = new Array();
    var materiales = new Array();
    var costo_total_apu = 0,
        costo_total_personal = 0,
        costo_total_herramienta = 0,
        costo_total_material = 0;
    
    //Obtener los datos del personal
    function getPersonal() {
        var personal_id, cantidad, horas = 1, pago_hora, costo_total, v_parcial = 0;
        $("#tbBodyPersonal tr").each(function (index) {
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: personal_id = $(this).attr('id');
                        break;
                case 2: cantidad = $(this).find("#"+personal_id+"").val();
                        break;        
                case 3: v_parcial = parseInt($(this).text());
                        break;        
                /*case 1: pago_hora = $(this).text();
                        break;
                case 2: cantidad = $(this).find("#"+personal_id+"").val();
                        break;
                case 3: horas = $(this).find("#"+personal_id+"horas").val();
                        break;*/
            }
        }); 
        //costo_total = cantidad*horas*pago_hora;
        costo_total = v_parcial;
        costo_total_personal += costo_total; 
        personal.push({apu_id: -1, personal_id: personal_id, cantidad: cantidad, horas: horas, costo_total: costo_total});
        });
    }
    
    //Obtener los datos de las herramientas
    function getHerramienta() {
        var herramienta_id, cantidad, horas = 1, pago_hora, costo_total, v_parcial = 0;
        $("#tbBodyHerramienta tr").each(function (index) {
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: herramienta_id = $(this).attr('id');
                        break;
                case 2: cantidad = $(this).find("#"+herramienta_id+"").val();
                        break;        
                case 3: v_parcial = parseInt($(this).text());
                        break;         
                /*case 1: pago_hora = $(this).text();
                        break;
                case 2: cantidad = $(this).find("#"+herramienta_id+"").val();
                        break;
                //case 3: horas = $(this).find("#"+herramienta_id+"horas").val();
                        break;*/
            }
        }); 
        //costo_total = cantidad*horas*pago_hora;
        costo_total = v_parcial;
        costo_total_herramienta += costo_total;
        herramientas.push({apu_id: -1, herramienta_id: herramienta_id, cantidad: cantidad, horas: horas, costo_total: costo_total});
        });
    }
    
    //Obtener los datos de los materiales
    function getMaterial() {
        var material_id, precio, cantidad, costo_total, v_parcial = 0;
        $("#tbBodyMaterial tr").each(function (index) {
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: material_id = $(this).attr('id');
                        break;
                case 2: cantidad = $(this).find("#"+material_id+"").val();
                        break;        
                case 3: v_parcial = parseInt($(this).text());
                        break;           
                /*case 1: precio = $(this).text();
                        break;        
                case 3: cantidad = $(this).find("#"+material_id+"").val();
                        break;*/
            }
        }); 
        costo_total = v_parcial;
        costo_total_material += costo_total;
        materiales.push({apu_id: -1, material_id: material_id, cantidad: cantidad, costo_total: costo_total});
        });
    }
    
    //Metodo ajax registrar
    function ajaxRegistrar(data) {
        $('#btnRegistrar').attr('disabled', true);
        $.ajax({
            type: 'post',
            url: 'http://'+domain+'/Electricity/public/apu',
            data: data,
            success: function(response) {
                $("#text-modal").text(response);
                    $('#modal1').openModal();
                //alert(response);
                $('#btnRegistrar').attr('disabled', false);
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
                $('#btnRegistrar').attr('disabled', false);
            }
        }); 
    }
    
    
    function validatePersonal(id) {
        return validate(id, 'tbBodyPersonal');
    }
    
    function validateHerramienta(id) {
        return validate(id, 'tbBodyHerramienta');
    }
    
    function validateMaterial(id) {
        return validate(id, 'tbBodyMaterial');
    }
    
    /* Validar que no se agregue a la tabla un dato igual */
    function validate(id, nametBody) {
        var personal_id = 0,
            estado = true;
        $("#"+nametBody+ " tr").each(function (index) {
            $(this).children("td").each(function (index2) 
            {
                switch (index2) 
                {
                    case 0: personal_id = $(this).attr('id');
                            if (personal_id === id) { 
                                estado = false;
                            }
                        break;
                }
            });
        });
        return estado;
    }
    
    /* Evento click btn quitar tabla */
    $('.allTables').on('click', '.btnQuitar', function(e) {
        var id = $(this).attr('id');
        $("#"+id).remove();
        //calcularPresupuesto();
    });
    
    /* Validar solo numeros en input de la tabla */
    $('.allTables').on('keypress', 'input', function(e) { 
        var ide = $(this).attr('id'),
            v_unitario = $("#v_unitario"+ide).text();
        if ( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57)) {
            return false;
        } else { 
            var caracter = String.fromCharCode(e.which),
                cadena = $(this).val()+caracter;
                $("#v_parcial"+ide).text(cadena*v_unitario);
                //calcularPresupuesto();
            return true;
        }
    });
    
    /* Cuando el input pierde el focus */
    $('.allTables').on('focusout', 'input', function(e) { 
        var cantidad = $(this).val(),
        ide = $(this).attr('id'),
        costo = $("#v_unitario"+ide).text();
        if (cantidad === '') {
            $(this).val(1); $("#v_parcial"+ide).text(costo); 
            //calcularPresupuesto();
        } else {
            $("#v_parcial"+ide).text(costo*cantidad); 
        }
    });
    
    
    function clearForm() {
        $('input').each(function (i) {
            $(this).val("");
            $(this).focusout();
        });
        personal.length = 0;
        herramientas.length = 0;
        materiales.length = 0;
        $('#tbBodyResult').html("");
        $('#tbBodyPersonal').html("");
        $('#tbBodyHerramienta').html("");
        $('#tbBodyMaterial').html("");
        costo_total_apu = 0;
        costo_total_personal = 0;
        costo_total_herramienta = 0;
        costo_total_material = 0;
    }
    
});
