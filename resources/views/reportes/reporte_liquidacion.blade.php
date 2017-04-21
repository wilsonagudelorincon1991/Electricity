<style>
        table {
      border-collapse: collapse;
      border-spacing: 0; }

    td, th {
      padding: 0; }
    
    table, th, td {
  border: none; }

table {
  width: 100%;
  display: table; }
  table.bordered > thead > tr, table.bordered > tbody > tr {
    border-bottom: 1px solid #d0d0d0; }
  table.striped > tbody > tr:nth-child(odd) {
    background-color: #f2f2f2; }
  table.striped > tbody > tr > td {
    border-radius: 0px; }
  table.highlight > tbody > tr {
    -webkit-transition: background-color .25s ease;
    -moz-transition: background-color .25s ease;
    -o-transition: background-color .25s ease;
    -ms-transition: background-color .25s ease;
    transition: background-color .25s ease; }
    table.highlight > tbody > tr:hover {
      background-color: #f2f2f2; }
  table.centered thead tr th, table.centered tbody tr td {
    text-align: center; }

thead {
  border-bottom: 1px solid #d0d0d0; }

td, th {
  padding: 15px 5px;
  display: table-cell;
  text-align: left;
  vertical-align: middle;
  border-radius: 2px; }

h1, h2, h3, h4, h5, h6, td, th {
    font-family: sans-serif;
}

td, th {
        padding: 5px 5px;
        border-radius: 0px;
    }
    h4 {
        margin: 1%;
    }
    
    .alinear-right {
        text-align: right;
    }
</style>
<div id="content-proyecto">
    <h2 align="center">NG2.SAS</h2>
    <h4 align="center">CALLE 9A NO. 13-35 BARRIO SAN JOAQUIN. TELEFONO: 5831943 - 3184153950</h4>
    <h4 align="center">INGENIERIA ELECTRICA</h4>
    <h4 align="center">VALLEDUPAR-CESAR-COLOMBIA</h4>
    <h4 id="selectCliente" align="center">{{$liquidacion["fecha"]}}</h4>
    <h4 id="selectProject" align="center" style="color: #ff9800">{{$liquidacion["liquidacion"]}}</h4>
    
    <table class="highlight bordered">
        <thead>
            <tr style="background: #ffb74d"><th>ITEM</th><th>DESCRIPCION</th><th>UN</th><th>CANT.</th><th class="alinear-right">VR. UNITARIO</th><th class="alinear-right">VR. PARCIAL</th></tr>
        </thead>

        <tbody id="tbBodyApu">
            @foreach ($apus as $key => $apu) 
            <tr style='background: #fff3e0'>
                <td>#</td>
                <td>{{ $apu["nombre_apu"] }}</td>
                <td>UN</td>
                <td>{{ $apu["cantidad"] }}</td>
                <td class="alinear-right">{{ $apu["precio"] }}</td>
                <td class="alinear-right">{{ $apu["cantidad"]*$apu["precio"] }}</td>
            </tr>
            @endforeach
            <tr style='background: #ffcc80'><td>#</td><td>SUBTOTAL DE LOS TRABAJOS REALIZADOS</td><td></td><td></td><td></td><td class="alinear-right">{{$data["subTotal"]}}</td></tr>
            <tr style='background: #ffcc80'><td>#</td><td>ADMINISTRACION (8%)</td><td></td><td></td><td></td><td class="alinear-right">{{$data["administracion"]}}</td></tr>
            <tr style='background: #ffcc80'><td>#</td><td>IMPREVISTOS (3%)</td><td></td><td></td><td></td><td class="alinear-right">{{$data["imprevistos"]}}</td></tr>
            <tr style='background: #ffcc80'><td>#</td><td>UTILIDAD (4%)</td><td></td><td></td><td></td><td class="alinear-right">{{$data["utilidad"]}}</td></tr>
            <tr style='background: #ffcc80'><td>#</td><td>IVA 16% UTILIDAD</td><td></td><td></td><td></td><td class="alinear-right">{{$data["iva"]}}</td></tr>
            <tr style='background: #ffcc80'><td>#</td><td>VALOR FINAL TRABAJOS A REALIZAR</td><td></td><td></td><td></td><td class="alinear-right">{{$data["valor_final"]}}</td></tr>
        </tbody>
    </table>
</div>


