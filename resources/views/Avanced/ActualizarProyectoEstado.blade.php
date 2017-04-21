<style>
    td, th {
        padding: 5px 5px;
        border-radius: 0px;
    }
</style>
<div style="margin-left: 5%; margin-right: 2%">
            <div class="card row" style="padding: 5px 20px 30px 20px">
                <h4 align="center">Actualizar Proyecto</h4>
                    
                <div class="row">
                    <div class="row">
                     <div class="row">
                    <h5 style="margin-left:15px" align="center">Buscar del proyecto</h5>
                        <div class="input-field col s4" style="margin-left: 25%">
                            <!--<i class="mdi-action-perm-identity prefix"></i>-->
                            <input id="txtNombreProyecto" type="text" class="proyecto">
                            <label for="txtNombreProyecto">Nombre del proyecto</label>
                        </div>
                        <div class="col s2" style="margin-top: 5px">
                            <button id="btnBuscarProyecto" class="btn" style="margin-top:20px">Buscar</button> 
                        </div>
                </div>
                
                <table id="tbProyecto" class="highlight bordered">
                    <thead>
                        <tr><th>Nombre</th><th><center>Estado</center></th></tr>
                    </thead>

                    <tbody id="tbBodyProyecto"></tbody>
                </table>
                </div>
                    
                    <div class="row">
                        <h5 align="center">Proyecto seleccionado</h5>
                        <div class="input-field col s8">
                            <!--<i class="mdi-image-timer-auto prefix"></i>-->
                            <input id="txtProyecto" type="text" readonly="true" class="proyecto">
                            <label for="txtProyecto">Nombre</label>
                        </div>
                        
                        <div class="input-field col s2">
                            <!--<i class="mdi-image-timer-auto prefix"></i>-->
                                <input id="txtEstado" type="text" readonly="true" class="proyecto">
                            <label for="txtEstado">Estado actual</label>
                        </div>
                        
                        <div id="cbox" class="input-field col s2">
                            <select id="cboxEstado">
                                <option value="1">EN ESPERA</option>
                                <option value="2">ACTIVO</option>
                                <option value="2">CANCELADO</option>
                                <option value="2">RECHAZADO</option>
                                <option value="2">FINALIZADO</option>
                            </select>
                            <label style="margin-top: 15%">Nuevo estado</label>
                        </div>
                    </div>
                </div>
            <button id="btnActualizar" class="btn" style="float: right;">Actualizar</button>     
            </div>
            </div>
        <script src="../../public/js/Electricity/Avanced/actualizar.proyecto.estado.js" type="text/javascript"></script>


