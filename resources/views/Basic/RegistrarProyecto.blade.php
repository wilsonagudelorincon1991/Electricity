<style>
    td, th {
        padding: 5px 5px;
        border-radius: 0px;
    }
</style>
<div class="container">
            <div class="card row" style="padding: 5px 20px 30px 20px">
                <h4 align="center">Registrar Proyecto</h4>
                
                <div class="row">
                    <div class="col s6">
                        <h5 style="margin-left:15px">Datos del proyecto</h5>
                        <div class="input-field col s12">
                            <!--<i class="mdi-image-timer-auto prefix"></i>-->
                            <input id="txtNombre" type="text">
                            <label for="txtNombre">Nombre</label>
                        </div>

                        <div class="input-field col s12">
                            <select id="cboxTipo">
                                <option value="1">EXTERNO</option>
                                <option value="2">INTERNO</option>
                            </select>
                            <label style="margin-top: 5%">Tipo</label>
                        </div>
                        
                        <div class="input-field col s12">
                            <!--<i class="mdi-image-timer-auto prefix"></i>-->
                            <input id="txtDireccion" type="text">
                            <label for="txtDireccion">Direccion</label>
                        </div>
                        
                        <div class="input-field col s12">
                            <!--<i class="mdi-image-timer-auto prefix"></i>-->
                            <input id="txtCliente" type="text" readonly="true">
                            <label for="txtCliente">Cliente</label>
                        </div>
                       
                    </div>
                    
                    <div class="col s6">
                        <h5 style="margin-left:10px">Buscador de cliente</h5>
                            <div  class="row">
                                <div class="col s8">
                                    <div class="input-field col s12">
                                        <!--<i class="mdi-action-perm-identity prefix"></i>-->
                                        <input id="txtApellido" type="text" class="validate">
                                        <label for="txtApellido">Nombre</label>
                                    </div>
                                </div>
                                
                                <div class="col s2" style="float: right; margin-top: 5px">
                                    <button id="btnBuscar" class="btn" style="float: right; margin-top:20px">Buscar</button> 
                                </div>
                            </div>
                            
                            <table id="tbCliente" class="highlight bordered">
                                <thead>
                                    <tr><th><center>Cliente</center></th></tr>
                                </thead>

                                <tbody id="tbBodyCliente"></tbody>
                            </table>
                     </div>
                    
                </div>
                <button id="btnRegistrar" class="btn" style="margin-left: 1%">Registrar</button>     
                
                
                <!-- Modal Trigger -->
                <a class="waves-effect waves-light btn modal-trigger" href="#modal1" style="display: none"></a>

                
            </div>
        </div>
       
        <script src="../../public/js/Electricity/Basic/registrar.proyecto.js" type="text/javascript"></script>
        