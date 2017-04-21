        
<div class="container">
    <div class="card row" style="padding: 10px 20px 30px 20px">
        <h4 align="center">Registrar Egreso</h4>
            <div class="row">
                <div class="col s6">
                    <div class="input-field col s12">
                        <!--<i class="mdi-image-timer-auto prefix"></i>-->
                        <input id="txtCiudad" type="text" class="only-letter">
                        <label for="txtCiudad">Ciudad</label>
                    </div>

                    <div class="input-field col s12">
                        <!--<i class="mdi-image-timer-auto prefix"></i>-->
                        <input id="txtFecha" type="date" class="datepicker">
                        <label for="txtFecha">Fecha</label>
                    </div>
                    
                    <div class="input-field col s12">
                        <!--<i class="mdi-image-timer-auto prefix"></i>-->
                        <input id="txtPersona" type="text" class="only-letter">
                        <label for="txtPersona">Pagado a</label>
                    </div>
                    
                    <div class="input-field col s12">
                        <!--<i class="mdi-image-timer-auto prefix"></i>-->
                        <input id="txtValor" type="text" class="only-number">
                        <label for="txtValor">Valor</label>
                    </div>
                </div>

                <div class="col s6">
                    <div class="input-field col s12">
                         <textarea id="txtConcepto" class="materialize-textarea"></textarea>
                        <label for="txtConcepto">Por concepto de</label>
                    </div>
                    
                    <div class="input-field col s12">
                        <!--<i class="mdi-image-timer-auto prefix"></i>-->
                        <input id="txtValorLetras" type="text" class="only-letter">
                        <label for="txtValorLetras">Valor en letras</label>
                    </div>
                    <button id="btnRegistrar" class="btn" style="margin-left: 30%; margin-top:12%">Registrar</button> 
                </div>
                
            </div>
    </div>
</div>

<script src="../../public/js/Electricity/Other/registrar.egreso.js" type="text/javascript"></script>
