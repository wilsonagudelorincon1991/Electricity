
<div style="margin-left: 5%; margin-right: 2%">
    <div class="card row" style="padding: 10px 20px 30px 20px">
        <h4 style="margin-left:15px" align="center">Generar Nomina</h4>
        <div class="row">
            <div class="input-field col s6">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtNombre" type="text" class="validate">
                <label for="txtNombre">Nombre</label>
            </div>


            <div class="input-field col s3">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtFechaMenor" type="date" class="datepicker">
                <label for="txtFechaMenor">Fecha inicio</label>
            </div>  
            
            <div class="input-field col s3">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtFechaMayor" type="date" class="datepicker">
                <label for="txtFechaMayor">Fecha final</label>
            </div>
        </div>
        <div class="divider"></div>
        <h5 align="center">Buscar empleado</h5>
        <div  class="row">
            <div class="col s4" style="margin-left: 25%">
                <div class="input-field col s12">
                    <!--<i class="mdi-action-perm-identity prefix"></i>-->
                    <input id="txtApellido" type="text" class="validate">
                    <label for="txtApellido">Apellido</label>
                </div>
            </div>

            <div class="col s2" style="margin-top: 5px">
                <button id="btnBuscar" class="btn" style="float: right; margin-top:20px">Buscar</button> 
            </div>
        </div>
        
        <table id="tbEmpleado" class="highlight">
            <thead>
                <tr><th>Identificacion</th><th>Nombres y apellidos</th><th>Salario basico</th><th>Auxilio de transporte</th></tr>
            </thead>

            <tbody id="tbBodyEmpleado"></tbody>
        </table>
        <br>
        <div class="divider"></div>
        <h5 align="center">Nomina</h5>
        
        <h5 id="lbEmpleado" align="center">Empleado</h5>
        <div class="row" style="margin-left: 30%">
            <div class="input-field col s2 ">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtDiasLiquidados" type="text" class="only-number">
                <label for="txtDiasLiquidados">Dias liquidados</label>
            </div>
        
            <div class="input-field col s2">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtComision" type="text" class="only-number">
                <label for="txtComision">Comision</label>
            </div>
        
            <div class="input-field col s2">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtHorasExtras" type="text" class="only-number">
                <label for="txtHorasExtras">Horas extras</label>
            </div>
            
            <div class="col s1" style="margin-top: 3%"><button id="btnAgregar" class='btn-floating btn-small waves-effect waves-light teal lighten-1'><i class='material-icons'>done</i></button></div>
        </div>    
        
        <table id="tbNomina" class="highlight">
            <thead>
                <tr><th>Empleado</th><th>Salario basico</th><th>Dias liq.</th><th>Basico</th><th>Aux de transp.</th><th>Horas extras</th><th>Comosiones</th><th>Total devengado</th><th>Salud</th><th>Pension</th><th>Total deducciones</th><th>Neto pagado</th><th><center>Quitar</center></th></tr>
            </thead>

            <tbody id="tbBodyNomina">
                <!--<tr><th>ADRIAN RAFAEL CASTILLO PEDROZA</th><th>800000</th><th>15</th><th>400000</th><th>75000</th><th>95000</th><th>135000</th><th>475000</th><th>16000</th><th>16000</th><th>32000</th><th>507000</th><th><center>Quitar</center></th></tr>-->
            </tbody>
        </table>
        <button id="btnRegistrar" class="btn" style="float: right; margin-top:20px">Registrar</button> 
    </div>
</div>

<script src="../../public/js/Electricity/Other/generar.nomina.js" type="text/javascript"></script>
