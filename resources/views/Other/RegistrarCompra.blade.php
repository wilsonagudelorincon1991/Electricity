<style>
    td, th {
        padding: 5px 5px;
        border-radius: 0px;
    }
</style>        
<div class="container">
    <div class="card row" style="padding: 10px 20px 30px 20px">
        <h4 style="margin-left:15px">Orden Compra</h4>
        <div class="row">
            <div class="input-field col s6">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtCliente" type="text" class="validate">
                <label for="txtCliente">Empresa a comprar</label>
            </div>


            <div class="input-field col s6">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtFecha" type="date" class="datepicker">
                <label for="txtFecha">Fecha</label>
            </div>  
        </div>
        
        <h5 align="center">Producto</h5>
        <div class="row">
            <div class="input-field col s2">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtCodigo" type="text" class="validate">
                <label for="txtCodigo">Codigo</label>
            </div>
        
            <div class="input-field col s4">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtDescripcion" type="text" class="validate">
                <label for="txtDescripcion">Descripcion</label>
            </div>
        
            <div class="input-field col s2">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtCantidad" type="text" class="only-number">
                <label for="txtCantidad">Cantidad</label>
            </div>
        
            <div class="input-field col s3">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtValorUnitario" type="text" class="only-number">
                <label for="txtValorUnitario">Valor Unitario</label>
            </div>
            
            <div class="col s1" style="margin-top: 3%"><button id="btnAgregar" class='btn-floating btn-small waves-effect waves-light teal lighten-1'><i class='material-icons'>done</i></button></div>
        </div>    
        
        <table class="highlight">
            <thead>
                <tr><th>Codigo</th><th>Descripcion</th><th><center>Cantidad</center></th><th>Valor unitario</th><th>Valor total</th><th><center>Quitar</center></th></tr>
            </thead>

            <tbody id="tbBodyProducto"></tbody>
        </table>
        <button id="btnRegistrar" class="btn" style="float: right; margin-top:20px">Registrar</button> 
    </div>
</div>

<script src="../../public/js/Electricity/Other/registrar.compra.js" type="text/javascript"></script>