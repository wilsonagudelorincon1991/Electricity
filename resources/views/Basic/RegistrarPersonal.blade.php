<style>
    td, th {
        padding: 8px 8px;
        border-radius: 0px;
    }
</style>
<div style="padding: 1%">
        <div class="row">
            <div class="col s8">
                <div class="card" style="padding: 5px">
                <h4 align="center">Gestionar mano de obra</h4>
                <div class="col s6">
                    <div class="input-field col s12">
                    <!--<i class="mdi-image-timer-auto prefix"></i>-->
                    <input id="txtNombre" type="text" class="validate">
                    <label for="txtNombre">Nombre</label>
                </div>

                <div class="input-field col s12">
                    <input id="txtDescripcion" type="text" class="validate">
                    <label for="txtDescripcion">Descripcion</label>
                </div>
                </div>
                <div class="col s6">
                    <div class="input-field col s12">
                        <!--<i class="mdi-image-timer-auto prefix"></i>-->
                        <input id="txtUnidadMedida" type="text">
                        <label for="txtUnidadMedida">Unidad de medida</label>
                    </div>

                    <div class="input-field col s12">
                        <!--<i class="mdi-action-perm-identity prefix"></i>-->
                        <input id="txtPagoHora" type="text" class="only-number">
                        <label for="txtPagoHora">Valor unitario</label>
                    </div>
                </div>
                <div class="row">
                        <div class="col s4">
                            <button id="btnNuevo" class="btn" style="margin-left: 50%; margin-top: 2%">Nuevo</button> 
                        </div>
                        <div class="col s4">
                            <button id="btnRegistrar" class="btn" style="margin-left: 10%; margin-top: 2%">Registrar</button> 
                        </div>
                        <div class="col s4">
                            <button id="btnModificar" class="btn" style="margin-left: -20%; margin-top: 2%">Modificar</button> 
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col s4">
                <div class="card" style="padding: 5px">
                    <h5 style="margin-left:10px">Buscador</h5>
                    <div class="input-field col s12">
                        <!--<i class="mdi-action-perm-identity prefix"></i>-->
                        <input id="txtNombreBuscar" type="text" class="validate">
                        <label id="lbNombre" for="txtNombreBuscar">Nombre del mano de obra</label>
                    </div>

                    <button id="btnBuscar" class="btn" style="margin-left: 35%; margin-top: 2%;">Buscar</button> 



                    <table id="tbResult" class="highlight bordered">
                        <thead id="tbHeadResult">
                            <tr><th><center>Nombre</center></th></tr>
                        </thead>

                        <tbody id="tbBodyResult">
                            <!--<tr><td id="tdNombre">Obrero</td><td id="tdPrecio"><input id="idInput" type="text" value="2"></td></tr>-->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
</div>
            
<script src="../../public/js/Electricity/Basic/registrar.personal.js" type="text/javascript"></script>
           
