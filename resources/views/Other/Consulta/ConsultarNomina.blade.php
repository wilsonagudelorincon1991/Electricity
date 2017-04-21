<style>
    td, th {
        padding: 5px 5px;
        border-radius: 0px;
    }
</style>   
<div style="margin-left: 2%; margin-right: 2%">
    <div class="card" style="padding: 20px">
        <h4 align='center'>Consultar Nomina</h4> <br>
        <div class="row" style="margin-top: -10px">
                <div class="input-field col s4">
                    <!--<i class="mdi-action-perm-identity prefix"></i>-->
                    <input id="txtNombre" type="text">
                    <label for="txtNombre">Nombre</label>
                </div>
                
                <div id="cbox" class="input-field col s2">
                    <select id="cboxMesInicio">
                        <option value="0">Enero</option>
                        <option value="1">Febrero</option>
                        <option value="2">Marzo</option>
                        <option value="3">Abril</option>
                        <option value="4">Mayo</option>
                        <option value="5">Junio</option>
                        <option value="6">Julio</option>
                        <option value="7">Agosto</option>
                        <option value="8">Septiembre</option>
                        <option value="9">Obtubre</option>
                        <option value="10">Noviembre</option>
                        <option value="11">Diciembre</option>
                    </select>
                    <label style="margin-top: 15%">Mes</label>
                </div>
                
                <div class="input-field col s1">
                    <!--<i class="mdi-action-perm-identity prefix"></i>-->
                    <input id="txtAnioInicio" type="text" class="only-number">
                    <label for="txtAnioInicio">Año inicio</label>
                </div>
            
                <div id="cbox" class="input-field col s2">
                    <select id="cboxMesFinal">
                        <option value="0">Enero</option>
                        <option value="1">Febrero</option>
                        <option value="2">Marzo</option>
                        <option value="3">Abril</option>
                        <option value="4">Mayo</option>
                        <option value="5">Junio</option>
                        <option value="6">Julio</option>
                        <option value="7">Agosto</option>
                        <option value="8">Septiembre</option>
                        <option value="9">Obtubre</option>
                        <option value="10">Noviembre</option>
                        <option value="11">Diciembre</option>
                    </select>
                    <label style="margin-top: 15%">Mes</label>
                </div>
            
                <div class="input-field col s1">
                    <!--<i class="mdi-action-perm-identity prefix"></i>-->
                    <input id="txtAnioFinal" type="text" class="only-number">
                    <label for="txtAnioFinal">Año final</label>
                </div>
            
            <div class="col s2" style="margin-top: 5px">
                <button id="btnBuscar" class="btn" style="float: right; margin-top:20px">Buscar</button> 
            </div>
        </div>
        
            <table id="tbNomina" class="highlight bordered">
                <thead>
                    <tr><th>Nombre</th><th>Fecha</th><th>Total pago neto</th><th>Estado</th></tr>
                </thead>

                <tbody id="tbBodyNomina">

                </tbody>
            </table>
            <div id="content-nomina" style="display: none">
                <h5 id="lbNombreNomina" align="center"></h5>
                <table id="tbNominaDetalle" class="highlight bordered">
                    <thead>
                        <tr><th>Empleado</th><th>Salario basico</th><th>Dias liq.</th><th>Basico</th><th>Aux de transp.</th><th>Horas extras</th><th>Comosiones</th><th>Total devengado</th><th>Salud</th><th>Pension</th><th>Total deducciones</th><th>Neto pagado</th></tr>
                    </thead>

                    <tbody id="tbBodyNominaDetalle">

                    </tbody>
                </table>
            </div>
        <br>
        
    </div>
</div>


<script src="../../public/js/Electricity/Other/Consulta/consultar.nomina.js"></script>

