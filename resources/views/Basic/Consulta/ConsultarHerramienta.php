<div style="margin-left: 2%; margin-right: 2%">
    <div class="card" style="padding: 20px">
        <h5 style="margin-left:10px" align="center">Buscar Herramienta</h5>
        <div  class="row">
            <div class="input-field col s4" style="margin-left: 25%">
                <!--<i class="mdi-action-perm-identity prefix"></i>-->
                <input id="txtNombre" type="text" class="validate">
                <label for="txtNombre">Herramienta</label>
            </div>
            
            <div class="col s2" style="margin-top: 5px">
                <button id="btnBuscar" class="btn" style="float: right; margin-top:20px">Buscar</button> 
            </div>
        </div>
        <div class="card" style="padding: 20px">
        <table class="highlight bordered">
            <thead>
                <tr><th>Nombre</th><th>Descripcion</th><th>Unidad de medida</th><th>Valor unitario</th></tr>
            </thead>

            <tbody id="tbBodyMaterial">

            </tbody>
        </table>
            </div>
        <br>
        
    </div>
</div>

<script src="../../public/js/Electricity/Basic/Consulta/consultar.herramienta.js"></script>

