<html lang="es">
    <body>
        <div>{{$data["nombre"]}}</div>
    </body>
</html>

$view = view("reportes.reporte_proyecto", [ 
                "apus" => [
                    [
                        "descripcion" => "RED DE MEDIA TENSION BIFASICA EN 1/0 ACSR",
                        "unidad" => "UN",
                        "cantidad" => "5",
                        "v_unittacio" => "50000",
                        "v_parcial" => "250000"
                    ],
                    [
                        "descripcion" => "	RED DE MEDIA TENSION BIFASICA EN 1/0 ACSR",
                        "unidad" => "UN",
                        "cantidad" => "5",
                        "v_unittacio" => "50000",
                        "v_parcial" => "250000"
                    ]
                ], data => ["nombre" => "xd"]
            ])->render(); // Datos
            
            @foreach ($apus as $key => $apu)
            <tr>
                <td>#</td>
                <td>{{ $apu["descripcion"] }}</td>
                <td>{{ $apu["unidad"] }}</td>
                <td>{{ $apu["cantidad"] }}</td>
                <td>{{ $apu["v_unitario"] }}</td>
                <td>{{ $apu["v_parcial"] }}</td>
            </tr>
            @endforeach