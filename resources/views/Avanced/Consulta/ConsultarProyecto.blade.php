<style>
    td, th {
        padding: 5px 5px;
        border-radius: 0px;
    }
    
    .alinear-right {
        text-align: right;
    }
</style>
    

<div id="reporte" style="margin-left: 2%; margin-right: 2%">
    <div class="card" style="padding: 20px">
        <h5 align='center'>Consultar Proyecto</h5>
        <div class="row" style="margin-top: -10px">
            <div class="col s4" style="margin-left: 15%">
                <div class="input-field col s12">
                    <!--<i class="mdi-action-perm-identity prefix"></i>-->
                    <input id="txtNombreProyecto" type="text">
                    <label for="txtNombreProyecto" id="txtNameLabel">Nombre del proyecto</label>
                </div>
            </div>
            
            <div id="cbox" class="input-field col s2">
                <select id="cboxEstado">
                    <option value="0">No aplica</option>
                    <option value="1">EN ESPERA</option>
                    <option value="2">ACTIVO</option>
                    <option value="3">CANCELADO</option>
                    <option value="4">RECHAZADO</option>
                    <option value="5">FINALIZADO</option>
                </select>
                <label style="margin-top: 15%">Estado</label>
            </div>
            
            <div class="col s2" style="margin-top: 5px">
                <button id="btnBuscar" class="btn" style="float: right; margin-top:20px">Buscar</button> 
            </div>
        </div>
        <div class="divider"></div>
        <table id="tbProyecto" class="highlight bordered">
            <thead>
                <tr><th>Nombre</th><th>Ubicacion</th><th>Estado</th><th>Tipo</th></tr>
            </thead>

            <tbody id="tbBodyProyecto"></tbody>
        </table>
        <br>
        <div id="content-proyecto" style="display: none">
        <h6 align="center">Proyecto seleccionado</h6> 
        <div class="row">
            <div class="col s4 offset-s4">
                <div id="cboxx" class="input-field col s12">
                    <select id="cboxProyecto">
                        <option value="0">Proyecto inicial</option>
                        <option value="1">Proyecto actual</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="divider"></div>
        <h5 align="center">NG2.SAS</h5>
        <h6 align="center">ALLE 9A NO. 13-35 BARRIO SAN JOAQUIN. TELEFONO:5831943-3184153950</h6>
        <h6 align="center">INGENIERIA ELECTRICA</h6>
        <h6 align="center">VALLEDUPAR-CESAR-COLOMBIA</h6>
        <h6 id="selectProject" align="center" style="color: #81c784"></h6>
        <h6 id="selectCliente" align="center"></h6>
        
        
        <!--<h5 align="center">Materiales</h5>-->
        <table class="highlight bordered">
            <thead>
                <tr style="background: #81c784"><th>ITEM</th><th>DESCRIPCION</th><th>UN</th><th>CANT.</th><th class=alinear-right>VR. UNITARIO</th><th class=alinear-right>VR. PARCIAL</th></tr>
            </thead>

            <tbody id="tbBodyApu">
                
            </tbody>
        </table><br>
        <button id="btnReporte" class="btn waves-effect">Reporte</button>
        </div>
        
    </div>
</div>

<script src="../../public/js/Electricity/Avanced/consulta/consultar.proyecto.js" type="text/javascript"></script>