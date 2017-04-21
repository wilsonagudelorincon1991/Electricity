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
                    <h4 align="center">Gestionar empleado</h4>
                    <div class="row">
                    <div class="col s6">
                        <div class="input-field col s12">
                        <!--<i class="mdi-image-timer-auto prefix"></i>-->
                            <input id="txtId" type="text" class="only-number">
                            <label for="txtId">Identificacion</label>
                        </div>

                        <div class="input-field col s12">
                            <!--<i class="mdi-image-timer-auto prefix"></i>-->
                            <input id="txtNombres" type="text" class="only-letter">
                            <label for="txtNombres">Nombres</label>
                        </div>

                        <div class="input-field col s12">
                            <input id="txtPrimerApellido" type="text" class="only-letter">
                            <label for="txtPrimerApellido">Primer Apellido</label>
                        </div>

                        <div class="input-field col s12">
                            <input id="txtSegundoApellido" type="text" class="only-letter">
                            <label for="txtSegundoApellido">Segundo Apellido</label>
                        </div>

                        <div class="input-field col s12">
                            <!--<i class="mdi-action-perm-identity prefix"></i>-->
                            <input id="txtTelefono" type="text" class="only-number">
                            <label for="txtTelefono">Telefono</label>
                        </div>
                    </div>
                    
                    <div class="col s6">
                        <div class="input-field col s12">
                            <!--<i class="mdi-action-perm-identity prefix"></i>-->
                            <input id="txtEmail" type="text">
                            <label for="txtEmail">Email</label>
                        </div>

                        <div class="input-field col s12">
                            <!--<i class="mdi-action-perm-identity prefix"></i>-->
                            <input id="txtCargo" type="text" class="only-letter">
                            <label for="txtCargo">Cargo</label>
                        </div>

                        <div class="input-field col s12">
                            <!--<i class="mdi-action-perm-identity prefix"></i>-->
                            <input id="txtSalario" type="text" class="only-number">
                            <label for="txtSalario">Salario</label>
                        </div>
                        
                        <div class="input-field col s12">
                            <!--<i class="mdi-action-perm-identity prefix"></i>-->
                            <input id="txtAuxTransp" type="text" class="only-number">
                            <label for="txtAuxTransp">Auxilio de transporte</label>
                        </div>
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
                        <label id="lbNombre" for="txtNombreBuscar">Nombre del empleado</label>
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

        <script src="../../public/js/Electricity/Other/registrar.empleado.js" type="text/javascript"></script>
   