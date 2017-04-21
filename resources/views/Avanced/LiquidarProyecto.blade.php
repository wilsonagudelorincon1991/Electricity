<style>
    .hidden {
        display: none;
    }
    td, th {
        padding: 5px 5px;
        border-radius: 0px;
    }
    
</style>
    
<div style="padding: 2%">
            <div class="card row" style="padding: 5px 30px 30px 20px">
                <h4 align="center">Liquidar Proyecto</h4>
                    
                <div class="row">
                    <div class="row">
                        <h5 style="margin-left:15px" align="center">Buscar del proyecto</h5>
                            <div class="input-field col s4" style="margin-left: 25%">
                                <!--<i class="mdi-action-perm-identity prefix"></i>-->
                                <input id="txtNombreProyecto" type="text" class="validate">
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
                   
                <br>
                <div class="divider"></div>
                    <h6 align="center">Proyecto Seleccionado</h6>
                    <h5 id="projectSelect" align="center"></h5>
                    <div class="row hidden" id="nombreLiquidacion">
                            <div class="input-field col s8" style="margin-left: 15%">
                                <!--<i class="mdi-action-perm-identity prefix"></i>-->
                                <input id="txtNombreLiquidacion" type="text" >
                                <label for="txtNombreLiquidacion" >Nombre de la liquidacion</label>
                            </div>
                    </div>
                <div class="row">
                    <table class="highlight">
                        <thead>
                            <tr><th>Nombre</th><th><center>Cantidad incial</center></th><th><center>Cantidad actual</center></th>
                            <th><center>Cantidad</center></th></tr>
                        </thead>

                        <tbody id="tbBodyApu">

                        </tbody>
                    </table>
                    
                </div>
            <button id="btnActualizar" class="btn" style="float: right; margin-top:20px">Liquidar</button>     
            </div>
        </div>
        <script src="../../public/js/Electricity/Avanced/liquidar.proyecto.js" type="text/javascript"></script>
