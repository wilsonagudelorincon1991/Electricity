<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="../../public/css/materialize.0.9.7.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        
        <div class="container">
            
            <div class="card row" style="padding: 10px 20px 30px 20px">
                <h4 style="margin-left:15px">Registrar Herramienta</h4>
                <!--subir : <input type="file" name="file">-->
                <form enctype="multipart/form-data" id="formulario">  
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>File</span>
                            <input type="file" name="file">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text">
                        </div>
                    </div>
                </form>    

                <button id="btnRegistrar" class="btn" style="float: right; margin-top:20px">Registrar</button> 
            </div>
        </div>
        <script src="../../public/js/libs/jquery-2.1.4.min.js" type="text/javascript"></script>
        <script src="../../public/js/libs/materialize-0.9.4.js" type="text/javascript"></script>
        <script>
        $('input[name=file]').on('change', function () {  
            var formData = new FormData($('#formulario')[0]);
            $.ajax({
                type: 'post',
                url: 'http://localhost:1016/accesorio_celulares_v2/registrarImgDAO.php',
                data:  formData, 
                contentType: false,
                processData: false,
                success: function(response) {
                    console.log(response);
                }
                ,
                error : function (j) {
                    console.log(j);
                }
            });
        });
        </script>
    </body>
</html>  
