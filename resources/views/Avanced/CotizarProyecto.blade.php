
<style>
    .fila img {
        max-width: 64px;
        max-height: 64px;
    }
</style>
<style>
    td, th {
        padding: 5px 5px;
        border-radius: 0px;
    }
</style>
<script src="../../public/js/libs/jquery-ui.js" type="text/javascript"></script>    
            
            <!-- <div class="container">-->
            <div style="padding: 2%">
            <div class="card row"  style="padding: 5px 30px 30px 20px">
                <h4 style="margin-left:5px" align="center">Cotizar Proyecto</h4>
                
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
                
                <br>
                <h6 align="center"><strong>Proyecto seleccionado</strong></h6>
                <h5 id="selectProyecto" align="center"></h5>
                <div class="divider"></div>
                <h5 align='center'>Buscador de APU</h5> <br>
                <div class="row" style="margin-top: -10px">
                    <div class="col s4" style="margin-left: 8%">
                        <div class="input-field col s12">
                            <!--<i class="mdi-action-perm-identity prefix"></i>-->
                            <input id="txtDescripcionAPU" type="text">
                            <label for="txtDescripcionAPU">Descripcion de la APU</label>
                        </div>
                    </div>

                    <div class="col s4">
                        <div id="cbox" class="input-field col s12">
                            <select id="cboxCategoria"></select>
                            <label style="margin-top: 10%">Categoria de APU</label>
                        </div>
                    </div>    
                    <div class="col s2" style="margin-top: 5px">
                        <button id="btnBuscar" class="btn" style="float: right; margin-top:20px">Buscar</button> 
                    </div>
                </div>
                
                <table id="tbResult" class="highlight">
                    <thead>
                        <tr><th>Nombre</th><th>Valor unitario</th><th>Imagen</th></tr>
                    </thead>

                    <tbody id="tbBodyResult">
                        <!--<tr><td id="tdNombre">Obrero</td><td id="tdPrecio"><input id="idInput" type="text" value="2"></td></tr>-->
                        <!--<tr><td>LAMPARA DE ALUMBRADO 150 W- 220 VOLTIOS SODIO CON FOTOCELDA</td><td>150000</td><td class="obj-draggable" style="padding: 5px 0px"><img src="../../public/img_apu/apu1.png" alt=""/></td></tr>
                        <tr><td>LAMPARA DE ALUMBRADO 150 W- 220 VOLTIOS SODIO CON FOTOCELDA</td><td>150000</td><td class="obj-draggable" style="padding: 5px 0px"><img src="../../public/img_apu/apu2.png" alt=""/></td></tr>-->
                    </tbody>
                </table>
                
                <h5 align='center'>APU del proyecto</h5> <br>
                <table id="x" class="highlight">
                    <thead>
                        <tr><th>Nombre</th><th>Valor unitario</th><th><center>Cantidad</center></th><th>Valor parcial</th><th><center>Quitar</center></th></tr>
                    </thead>

                    <tbody id="tbBodyApu">

                    </tbody>
                </table>
                
                <div class="input-field col s12" id="presupuesto" style="display: none">
                    <!--<i class="mdi-image-timer-auto prefix"></i>-->
                    <input id="txtPresupuesto" type="text">
                    <label for="txtPresupuesto">Presepuesto del proyecto</label>
                </div>
                
            <button id="btnRegistrar" class="btn" style="float: left; margin-top:20px">Registrar</button>     
            </div>
        </div>
       
        <script src="../../public/js/Electricity/Avanced/cotizar.proyecto.js" type="text/javascript"></script>
