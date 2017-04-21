<div class="container">
    <div class="card" style="padding: 20px">
        <h5 style="margin-left:10px" align="center">Consultar control de dia</h5>
        <div  class="row">
            <div class="input-field col 3" style="margin-left: 18%">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtFechaInicio" type="date" class="datepicker">
                <label for="txtFechaInicio">Fecha inicio</label>
            </div>
            
            <div class="input-field col s3">
                <!--<i class="mdi-image-timer-auto prefix"></i>-->
                <input id="txtFechaFinal" type="date" class="datepicker">
                <label for="txtFechaFinal">Fecha final</label>
            </div>
            
            <div class="col s2" style="margin-top: 5px">
                <button id="btnBuscar" class="btn" style="float: right; margin-top:20px">Buscar</button> 
            </div>
        </div>
        <table class="highlight bordered">
            <thead>
                <tr><th>Persona</th><th>Concepto</th><th>Ciudad</th><th>Fecha</th><th>Valor</th></tr>
            </thead>

            <tbody id="tbBodyEgreso">

            </tbody>
        </table>
        
        <br>
        
    </div>
</div>

<script src="../../public/js/Electricity/Other/Consulta/consultar.egreso.js"></script>