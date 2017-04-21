
<div class="container">
    <div class="card" style="padding: 20px">
        <h5 style="margin-left:10px" align="center">Buscar empleado</h5>
        <div  class="row">
            <div class="input-field col s4" style="margin-left: 25%">
                <!--<i class="mdi-action-perm-identity prefix"></i>-->
                <input id="txtApellido" type="text" class="validate">
                <label for="txtApellido">Apellido</label>
            </div>
            
            <div class="col s2" style="margin-top: 5px">
                <button id="btnBuscar" class="btn" style="float: right; margin-top:20px">Buscar</button> 
            </div>
        </div>
        <div class="card" style="padding: 20px">
        <table class="highlight bordered">
            <thead>
                <tr><th>Id</th><th>Nombres y apellidos</th><th>Cargo</th><th>Salario</th><th>Telefono</th><th>Email</th></tr>
            </thead>

            <tbody id="tbBodyEmpleado">

            </tbody>
        </table>
            </div>
        <br>
        
    </div>
</div>

<script src="../../public/js/Electricity/Other/Consulta/consultar.empleado.js"></script>

