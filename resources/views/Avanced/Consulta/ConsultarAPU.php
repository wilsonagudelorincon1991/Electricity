<div class="container">
    <div class="card" style="padding: 20px">
        <h4 align='center'>Consultar APU</h4> <br>
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
        
        <!-- Tablas apu -->
        <table id="tbAPU" class="highlight">
            <thead>
                <tr><th>Descripcion</th><th>Valor unitario</th></tr>
            </thead>

            <tbody id="tbBodyAPU"></tbody>
        </table>
        
        
        <div id="content-apu" style="display: none">
        <h5 id="nombreAPU" align="center"></h5>
        <!--<h5 align="center">Materiales</h5>-->
        <table class="highlight bordered">
            <thead>
                <tr style="background: #81c784"><th>Materiales</th><th>Unidad</th><th>Cantidad</th><th>V/Unitario</th><th>V/Parcial</th></tr>
            </thead>

            <tbody id="tbBodyMaterial"></tbody>
        </table>
        <div class="row">
            <div class="col s3 offset-s9">    
                <div class="input-field col s12">
                    <!--<i class="mdi-image-timer-auto prefix"></i>-->
                    <input id="txtSubTotalMaterial" type="text" readonly="true">
                    <label for="txtSubTotalMaterial">Subtotal Materiales</label>
                </div>
            </div>    
        </div>
        <!--<h5 align="center">Herramientas</h5>-->
        
        <table class="highlight bordered">
            <thead>
                <tr style="background: #81c784"><th>Herramientas</th><th>Unidad</th><th>Cantidad</th><th>V/Unitario</th><th>V/Parcial</th></tr>
            </thead>

            <tbody id="tbBodyHerramienta">

            </tbody>
        </table>
        <div class="row">
            <div class="col s3 offset-s9">    
                <div class="input-field col s12">
                    <!--<i class="mdi-image-timer-auto prefix"></i>-->
                    <input id="txtSubTotalHerramienta" type="text" readonly="true">
                    <label for="txtSubTotalHerramienta">Subtotal Herramientas</label>
                </div>
            </div>    
        </div>
        <!--<h5 align="center">Personal</h5>-->
        <table class="highlight bordered">
            <thead>
                <tr style="background: #81c784"><th>Mano de obra</th><th>Unidad</th><th>Cantidad</th><th>V/Unitario</th><th>V/Parcial</th></tr>
            </thead>

            <tbody id="tbBodyPersonal">

            </tbody>
        </table>
        <div class="row">
            <div class="col s3">    
                <div class="input-field col s12">
                    <!--<i class="mdi-image-timer-auto prefix"></i>-->
                    <input id="txtCostoDirectoItem" type="text" readonly="true">
                    <label for="txtCostoDirectoItem">Costo directo item</label>
                </div>
            </div> 
            <div class="col s3 offset-s6">    
                <div class="input-field col s12">
                    <!--<i class="mdi-image-timer-auto prefix"></i>-->
                    <input id="txtSubTotalPersonal" type="text" readonly="true">
                    <label for="txtSubTotalPersonal">Subtotal Mano de Obra</label>
                </div>
            </div>    
        </div>
        
    </div>
    </div>
</div>

<script src="../../public/js/Electricity/Avanced/consulta/consultar.apu.js" type="text/javascript"></script>
