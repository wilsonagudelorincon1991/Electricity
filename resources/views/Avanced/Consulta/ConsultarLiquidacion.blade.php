<style>
    td, th {
        padding: 5px 5px;
        border-radius: 0px;
    }
    
    .alinear-right {
        text-align: right;
    }
</style>
<div style="margin-left: 2%; margin-right: 2%" id="reporte">
    <div class="card" style="padding: 20px">
        <h4 align='center'>Consultar liquidacion</h4>
        <div class="row" style="margin-top: -10px">
            <div class="col s4" style="margin-left: 8%">
                <div class="input-field col s12">
                    <!--<i class="mdi-action-perm-identity prefix"></i>-->
                    <input id="txtNombreProyecto" type="text">
                    <label for="txtNombreProyecto" id="txtNameLabel">Nombre del proyecto</label>
                </div>
            </div>
            
            <div class="input-field col 2" >
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtFechaInicio" type="date" class="datepicker">
                <label for="txtFechaInicio">Fecha inicio</label>
            </div>
            
            <div class="input-field col s2">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtFechaFinal" type="date" class="datepicker">
                <label for="txtFechaFinal">Fecha final</label>
            </div>
            
            <div class="col s2" style="margin-top: 5px">
                <button id="btnBuscar" class="btn" style="float: right; margin-top:20px">Buscar</button> 
            </div>
        </div>
        <div class="divider"></div>
        <table id="tbProyecto" class="highlight bordered">
            <thead>
                <tr><th>Nombre</th></tr>
            </thead>
            <tbody id="tbBodyProyecto"></tbody>
        </table>
        <div class="divider"></div>
        <h6 align="center">Proyecto seleccionado</h6>
        <h5 id="projectSelect" align="center"></h5>
        <div id="content-liquidacion">
        
        </div>
        
    </div>
</div>

<script src="../../public/js/Electricity/Avanced/consulta/consultar.liquidacion.js" type="text/javascript"></script>
