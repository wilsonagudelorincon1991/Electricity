<style>
    .view-image {
        margin-top: 10px;
    }
    
    .view-image > img {
        max-height: 64px;
        max-width: 64px;
    }
</style>

<div class="container">
        <br>
            <div class="card row" style="padding: 5px 20px 30px 20px">
                <h4 style="margin-left:10px">Registrar APU</h4>
                    
                <div class="row">
                    <div class="col s6">
                        <h5 style="margin-left:10px">Datos de la APU</h5>
                        <div id="cbox" class="input-field col s12">
                            <select id="cboxCategoria">
                                
                            </select>
                            <label style="margin-top: 5%">Categoria de APU</label>
                        </div>

                        <div class="input-field col s12">
                            <input id="txtDescripcion" type="text">
                            <label for="txtDescripcion">Descripcion</label>
                        </div>
                        
                        <div class="input-field col s12">
                            <input id="txtImg" type="file">
                            <!--<label for="txtImg">Img</label>-->
                        </div>
                        
                        <div id="view-image" class="view-image col s12"></div>
                    </div>
                    
                    <div class="col s6">
                        <h5 style="margin-left:10px">Buscador</h5>
                            <div  class="row">
                                <div class="col s8">
                                    <div class="input-field col s12">
                                        <!--<i class="mdi-action-perm-identity prefix"></i>-->
                                        <input id="txtNombreBuscar" type="text" class="validate">
                                        <label id="lbNombre" for="txtNombreBuscar">Mano de obra</label>
                                    </div>
                                </div>
                                
                                <div class="col s2" style="float: right; margin-top: 5px">
                                    <button id="btnBuscar" class="btn" style="float: right; margin-top:20px">Buscar</button> 
                                </div>
                            </div>
                        
                            <table id="tbResult" class="highlight">
                                <thead id="tbHeadResult">
                                    <tr><th>Nombre</th><th id="thCosto">Valor unitario</th><th>Unidad</th></tr>
                                </thead>
                                
                                <tbody id="tbBodyResult">
                                    <!--<tr><td id="tdNombre">Obrero</td><td id="tdPrecio"><input id="idInput" type="text" value="2"></td></tr>-->
                                </tbody>
                            </table>
                    </div>
                </div>
                   
                <br>
                <div class="row">
                    <div class="col s12">
                        <ul class="tabs">
                            <li id="liPersonal" class="tab col s3"><a class="active" href="#tabsPersonal">Mano de obra</a></li>
                            <li id="liHerramienta" class="tab col s3"><a href="#tabsHerramienta">Herramienta</a></li>
                            <li id="liMaterial" class="tab col s3"><a href="#tabsMaterial">Material</a></li>
                        </ul>
                    </div>
                    
                    <div id="tabsPersonal" class="col s12">
                        <table class="highlight">
                            <thead>
                                <tr><th>Nombre</th><th>Valor unitario</th><th><center>Cantidad/Minutos</center></th><th>Valor parcial</th><th><center>Quitar</center></th></tr>
                            </thead>
                            
                            <tbody id="tbBodyPersonal" class="allTables">
                                
                            </tbody>
                        </table>
                    </div>
                    
                    <div id="tabsHerramienta" class="col s12">
                        <table class="highlight">
                            <thead>
                                <tr><th>Nombre</th><th>Valor unitario</th><th><center>Cantidad/Minutos</center></th><th>Valor parcial</th><th><center>Quitar</center></th></tr>
                            </thead>
                            
                            <tbody id="tbBodyHerramienta" class="allTables">
                                
                            </tbody>
                        </table>
                    </div>
                    
                    <div id="tabsMaterial" class="col s12">
                        <table class="highlight">
                            <thead>
                                <tr><th>Nombre</th><th>Valor unitario</th><th><center>Cantidad</center></th><th>Valor parcial</th><th><center>Quitar</center></th></tr>
                            </thead>
                            
                            <tbody id="tbBodyMaterial" class="allTables">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            <button id="btnRegistrar" class="btn" style="float: left; margin-top:20px">Registrar</button>     
        </div>
        
    </div>
        <script src="../../public/js/Electricity/Avanced/registrar.apu.js" type="text/javascript"></script>
