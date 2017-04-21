
//var domain = electricity.domain();
var domain = 'localhost:1016';
/* Registros basicos */
$("#registroPersonal").click(function () {
    $("#container-form").load("http://"+domain+"/Electricity/public/form/personal");
    //$("#container-form").load("http://localhost:1016/Electricity/public/form/informe");
});

$("#registroHerramienta").click(function () {
    $("#container-form").load("http://"+domain+"/Electricity/public/form/herramienta");
});

$("#registroMaterial").click(function () {
    $("#container-form").load("http://"+domain+"/Electricity/public/form/material");
});

$("#registroCliente").click(function () {
    $("#container-form").load("http://"+domain+"/Electricity/public/form/cliente");
});

$("#registroCategoria").click(function () {
    $("#container-form").load("http://"+domain+"/Electricity/public/form/categoria");
});

$("#registrarProyecto").click(function () {
    $("#container-form").load("http://"+domain+"/Electricity/public/form/proyecto");
});

$("#registroEmpleado").click(function () {
    $("#container-form").load("http://"+domain+"/Electricity/public/form/empleado");
});

$("#generarNomina").click(function () {
    $("#container-form").load("http://"+domain+"/Electricity/public/form/nomina");
});

$("#registroEgreso").click(function () {
    $("#container-form").load("http://"+domain+"/Electricity/public/form/egreso");  
});

$("#registroCompra").click(function () {
    $("#container-form").load("http://"+domain+"/Electricity/public/form/compra");  
});

$("#registrarAPU").click(function () {
    $("#container-form").load("http://"+domain+"/Electricity/public/form/apu");
});

$("#cotizarProyecto").click(function () {
    $("#container-form").load("http://"+domain+"/Electricity/public/form/cotizar_proyecto");
});

$("#liquidarProyecto").click(function () {
    $("#container-form").load("http://"+domain+"/Electricity/public/form/liquidar_proyecto");
});

$("#estadoProyecto").click(function () {
    $("#container-form").load("http://"+domain+"/Electricity/public/form/estado_proyecto");
});

/* Informes */
$("#consultarProyecto").click(function () {
    $("#container-form").load('http://'+domain+'/Electricity/public/form/consultar_proyecto');
});

$("#consultarLiquidacion").click(function () {
    $("#container-form").load('http://'+domain+'/Electricity/public/form/consultar_liquidacion');
});

$("#consultarAPU").click(function () {
    $("#container-form").load('http://'+domain+'/Electricity/public/form/consultar_apu');
});

$("#consultarNomina").click(function () {
    $("#container-form").load('http://'+domain+'/Electricity/public/form/consultar_nomina');
});

/* Consultas basicas */
$("#consultarMaterial").click(function () {
    $("#container-form").load('http://'+domain+'/Electricity/public/form/consultar_material');
});

$("#consultarHerramienta").click(function () {
    $("#container-form").load('http://'+domain+'/Electricity/public/form/consultar_herramienta');
});

$("#consultarManoObra").click(function () {
    $("#container-form").load('http://'+domain+'/Electricity/public/form/consultar_mano_obra');
});

$("#consultarCliente").click(function () {
    $("#container-form").load('http://'+domain+'/Electricity/public/form/consultar_cliente');
});

/* Otras consultas*/
$("#consultarControlDiario").click(function () {
    $("#container-form").load('http://'+domain+'/Electricity/public/form/consultar_control_diario');
});

$("#consultarOrdenCompra").click(function () {
    $("#container-form").load('http://'+domain+'/Electricity/public/form/consultar_orden_compra');
});

$("#registrarUsuario").click(function () {
    $("#container-form").load('http://'+domain+'/Electricity/public/form/registrar_usuario');
});

$("#registrarRol").click(function () {
    $("#container-form").load('http://'+domain+'/Electricity/public/form/registrar_rol');
});


/* Cerrar sesion */
$("#cerrarSesion").click(function () { 
    var url = "http://"+domain+"/Electricity/public/login";
    //window.location.href = url;
    destroy_session(url);
});

var destroy_session = function (url) {
    $.ajax({
        type: 'get',
        url: 'http://'+domain+'/Electricity/public/usuario/session_destroy',
        success: function(response) {
            window.location.href = url;
        }
        ,
        error : function (j) {
            alert(JSON.stringify(j));
        }
    });
};
