$(document).ready(function(){
    var cosoDirectoItem = 0;
    
    /* Cargar categorias*/
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
    
    function set_cbox_categoria(lista) { 
        var component = '';
        component += "<option value=-1>No aplica</option>";
        for (var i = 0; i <= lista.length - 1; i++) { 
            component += "<option value="+lista[i].id+">"+lista[i].nombre+"</option>";
        }
        $('#cboxCategoria').html(component); $('select').material_select();
    }
    
    /* Cargar categorias*/
    cargar_categorias();
    
    /* Buscar apu */
    function buscar_apu() {
        $('#content-apu').fadeOut();
        var descripcion = $('#txtDescripcionAPU').val(),
            categoria = $('#cboxCategoria').val(),  
            tipo_busqueda = 'apu',
            url = 'http://'+domain+'/Electricity/public/apu';    
        $data = {descripcion_apu: descripcion, categoria: categoria, tipo_busqueda: tipo_busqueda};
        $.ajax({
            type: 'get',
            url: url,
            data: $data,
            success: function(response) { 
                if(response.length) {
                    generar_tabla_apu(response);
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $("#tbBodyAPU").html('');
                }
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
            }
        });
    }
    
    /* Generar tabla apu */
    function generar_tabla_apu(lista) {
        var component = '';
        for (var i = 0; i <= lista.length - 1; i++) {
            component += "<tr class='fila'><td id="+lista[i].id+">"+lista[i].descripcion+"</td><td>"+lista[i].v_unitario+"</td></tr>";
        }
        $("#tbBodyAPU").html(component);
    }
    
    /* Seleccionar APU */
    $('#tbAPU #tbBodyAPU').on('dblclick', '.fila', function() {  
        var ide;
        cosoDirectoItem = 0;
        $(this).children("td").each(function (index2) 
        {
            switch (index2) 
            {
                case 0: ide = $(this).attr('id'); break;
            }
        });
        buscar_all_apu(ide);
    });    
    
    
    /* Buscar all apu */
    function buscar_all_apu(_id) {
        var id = _id,
            tipo_busqueda = 'all_apu',
            url = 'http://'+domain+'/Electricity/public/apu';    
        $data = {id: id, tipo_busqueda: tipo_busqueda};
        $.ajax({
            type: 'get',
            url: url,
            data: $data,
            success: function(response) { 
                if(response['apu'].length !== 0) {
                    generar_tabla(response);
                    $('#content-apu').fadeIn();
                    $("#txtSubTotalMaterial").focus();
                    $("#txtSubTotalHerramienta").focus();
                    $("#txtSubTotalPersonal").focus();
                    $("#txtCostoDirectoItem").focus();
                } else {
                    $("#text-modal").text('No se encontraron resultados');
                    $('#modal1').openModal();
                    //alert('No se encontraron resultados');
                    $('#content-apu').fadeOut();
                }
            }
            ,
            error : function (j) {
                alert(JSON.stringify(j));
            }
        });
    }
    
    /* Informacion de la APU */
    function generar_tabla(lista) {  
        $('#nombreAPU').text(lista['apu'][0].descripcion);
        generar_tabla_material(lista['apu_materiales']);
        generar_tabla_herramienta(lista['apu_herramientas']);
        generar_tabla_personal(lista['apu_personal']);
        $("#txtCostoDirectoItem").val(cosoDirectoItem);
    }
    
    function generar_tabla_material(lista) {
        var component,
            subTotalMaterial = 0;
        for (var i = 0; i <= lista.length - 1; i++) {
            component += "<tr><td>"+lista[i].nombre+"</td><td>"+lista[i].unidad_medida+"</td><td>"+lista[i].cantidad+"</td><td>"+lista[i].costo+"</td><td>"+lista[i].costo_total+"</td></tr>";
            subTotalMaterial += lista[i].costo_total;
        }
        cosoDirectoItem += subTotalMaterial;
        $("#tbBodyMaterial").html(component);
        $("#txtSubTotalMaterial").val(subTotalMaterial);
        
    }
    
    function generar_tabla_herramienta(lista) {
        var component,
            subTotalHerramienta = 0;
        for (var i = 0; i <= lista.length - 1; i++) {
            component += "<tr><td>"+lista[i].nombre+"</td><td>"+lista[i].unidad_medida+"</td><td>"+lista[i].cantidad+"</td><td>"+lista[i].costo_hora+"</td><td>"+lista[i].costo_total+"</td></tr>";
            subTotalHerramienta += lista[i].costo_total;
        }
        cosoDirectoItem += subTotalHerramienta;
        $("#tbBodyHerramienta").html(component);
        $("#txtSubTotalHerramienta").val(subTotalHerramienta);
    }
    
    function generar_tabla_personal(lista) {
        var component,
            subTotalPersonal = 0;
        for (var i = 0; i <= lista.length - 1; i++) {
            component += "<tr><td>"+lista[i].nombre+"</td><td>"+lista[i].unidad_medida+"</td><td>"+lista[i].cantidad+"</td><td>"+lista[i].costo_hora+"</td><td>"+lista[i].costo_total+"</td></tr>";
            subTotalPersonal += lista[i].costo_total;
        }
        cosoDirectoItem += subTotalPersonal;
        $("#tbBodyPersonal").html(component);
        $("#txtSubTotalPersonal").val(subTotalPersonal);
    }
    
    $('#btnBuscar').click(function (){
        var descripcion = $('#txtDescripcionAPU').val(),
            categoria = $('#cboxCategoria').val();  
        if (descripcion !== '') {
            buscar_apu();
        } else { 
            if(categoria !== '-1') {
                buscar_apu();
            } else {
                $("#text-modal").text('Para no digitar la descripcion de la APU, al menos seleccione una categoria');
                    $('#modal1').openModal();
                //alert('Para no digitar la descripcion de la APU, al menos seleccione una categoria');
            } 
        }
    });
    
});


