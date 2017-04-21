
/* 
 * ==============================================
 * NoteSalud+ DataBase v0.0.1
 * ==============================================
 * Author: Daniel Andres Castillo Pedroza
 * Author: Fabián Andrés Urrego Bohórquez
 * Created: 17 de septiembre de 2015
 * Location: Valledupar, Cesar, Colombia
 * ==============================================
 */

/* global notesalud, Database, Query */

(function (notesalud) {

    var _version = '1.0.0';

    Database.set({
        name : 'NoteSalud',               // Nombre
        description : 'DB NoteSalud+',    // Descripción    
        version : '1.0.0',                // Versión
        size : 52428800                   // Tamaño (1024 * 1024 * 50)
    });
    
    var $databaseCie10 = window.openDatabase('Cie10','Base de Datos de Cie10','1.0.0',52428800);
    var $resourcesCie10 = [ 'capitulo_cie10', 'subcapitulo_cie10', 'cie10' ];

    function DatabaseNoteSalud() {
        
        // Métodos privados de la clase DatabaseTraslados
        
        syncData = function (options) {
            notesalud.resources[options.table] = true; options.download((options.index + 1));
            
            notesalud.process.finish({
                id: options.idProcess, result : true, text : 'Sincronización de "' + options.table + '" completa en el dispositivo'
            });
            
            localStorage.setItem('resource_notesalud',JSON.stringify(notesalud.resources));
        };
        
        $createTables = function () {
            Database.table.create({
                exists : false,
                columns : [
                    'id SMALLINT', 'nombre VARCHAR(50)',
                    'departamento VARCHAR(20)', 'PRIMARY KEY (id)'
                ],
                name : 'ciudad'
            }, function (result) { 
                console.log(result ? 'Ciudades OK!' : 'Ciudades Error!'); 
            });

            Database.table.create({
                exists : false,
                columns : [
                    'id INT', 'nombre VARCHAR(50)',
                    'id_ciudad SMALLINT', 'PRIMARY KEY (id)'
                ],
                name : 'barrio'
            }, function (result) { 
                console.log(result ? 'Barrios OK!' : 'Barrios Error!'); 
            });

            Database.table.create({
                exists : false,
                columns : [
                    'id SMALLINT', 'nombre VARCHAR(60)', 'unidad_medida VARCHAR(15)', 
                    'tipo VARCHAR(20)', 'stock TINYINT','PRIMARY KEY (id)'
                ],
                name : 'farmacia_traslado'
            }, function (result) { 
                console.log(result ? 'Productos de Farmacia OK!' : 'Productos de Farmacia Error!'); 
            });

            Database.table.create({
                exists : false,
                columns : [
                    'id INT', 'nombre VARCHAR(50)', 'direccion VARCHAR(100)', 
                    'id_barrio INT', 'ciudad VARCHAR(50)', 'PRIMARY KEY (id)'
                ],
                name : 'lugar'
            }, function (result) { 
                console.log(result ? 'Lugares OK!' : 'Lugares Error!'); 
            });

            Database.table.create({
                exists : false,
                columns : [
                    'id INT', 'nombre TEXT', 'PRIMARY KEY (id)'
                ],
                name : 'entidad_autorizacion'
            }, function (result) { 
                console.log(result ? 'Entidades de Autorización OK!' : 'Entidades de Autorización Error!'); 
            });

            Database.table.create({
                exists : false,
                columns : [
                    'id INT', 'nombre TEXT', 'PRIMARY KEY (id)'
                ],
                name : 'entidad_afiliacion'
            }, function (result) { 
                console.log(result ? 'Entidades de Afiliación OK!' : 'Entidades de Afiliación  Error!'); 
            });

            Database.table.create({
                exists : false,
                columns : [
                    'id TINYINT', 'nombre VARCHAR(50)',
                    'nombre_abreviado VARCHAR(20)', 'PRIMARY KEY (id)'
                ],
                name : 'tipo_traslado'
            }, function (result) { 
                console.log(result ? 'Tipos de traslado OK!' : 'Tipos de traslado Error!'); 
            });

            Database.table.create({
                exists : false,
                columns : [
                    'id SMALLINT', 'nombre VARCHAR(60)'
                ],
                name : 'motivo_traslado'
            }, function (result) { 
                console.log(result ? 'Motivos de traslado OK!' : 'Motivos de traslado Error!'); 
            });

            Database.table.create({
                exists : false,
                columns : [
                    'id TINYINT', 'id_traslado_tipo TINYINT',
                    'id_traslado_motivo SMALLINT', 'triage TINYINT',
                    'alcance VARCHAR(20)', 'PRIMARY KEY (id)'
                ],
                name : 'servicio_traslado'
            }, function (result) { 
                console.log(result ? 'Servicios de traslado OK!' : 'Servicios de traslado Error!'); 
            });

            Database.table.create({
                exists : false,
                columns : [
                    'id TINYINT', 'titulo TEXT', 'codigos VARCHAR(10)','PRIMARY KEY (id)'
                ],
                name : 'capitulo_cie10'
            }, function (result) { 
                console.log(result ? 'Capitulos de CIE10 OK!' : 'Capitulos de CIE10 Error!'); 
            }, $databaseCie10);

            Database.table.create({
                exists : false,
                columns : [
                    'id SMALLINT', 'titulo TEXT', 'codigos VARCHAR(10)',
                    'id_capitulo_cie10 TINYINT','PRIMARY KEY (id)'
                ],
                name : 'subcapitulo_cie10'
            }, function (result) { 
                console.log(result ? 'SubCapitulos de CIE10 OK!' : 'SubCapitulos de CIE10 Error!'); 
            }, $databaseCie10);

            Database.table.create({
                exists : false,
                columns : [
                    'id SMALLINT', 'codigo VARCHAR(5)', 'nombre_cientifico TEXT',
                    'texto_ayuda TEXT','id_subcapitulo_cie10 SMALLINT','PRIMARY KEY (id)'
                ],
                name : 'cie10'
            }, function (result) { 
                console.log(result ? 'Diagnosticos de CIE10 OK!' : 'Diagnosticos de CIE10 Error!'); 
            }, $databaseCie10);
        };
        
        $dropTable = function (table) {
            var $database = ($resourcesCie10.indexOf(table) !== -1) ? $databaseCie10 : undefined;
            
            Database.table.drop(table, function (result) {
                console.log((result) ? table + ' Drop OK!' : table + ' Drop Error!'); 
            }, $database);
        };
        
        $dropTables = function () {
            $dropTable('cie10'); $dropTable('barrio'); $dropTable('capitulo_cie10');
            $dropTable('tipo_traslado'); $dropTable('motivo_traslado'); 
            $dropTable('ciudad'); $dropTable('lugar'); $dropTable('subcapitulo_cie10'); 
            $dropTable('servicio_traslado'); $dropTable('entidad_afiliacion');
            $dropTable('farmacia_traslado'); $dropTable('entidad_autorizacion'); 
        };
        
        $cleanTable = function (table) {
            var $database = ($resourcesCie10.indexOf(table) !== -1) ? $databaseCie10 : undefined;
            Query.delete({ table : table, database : $database }).execute();
        };
        
        $cleanTables = function () {
            $cleanTable('ciudad'); $cleanTable('barrio'); $cleanTable('capitulo_cie10');
            $cleanTable('tipo_traslado'); $cleanTable('motivo_traslado'); 
            $cleanTable('cie10'); $cleanTable('lugar'); $cleanTable('subcapitulo_cie10'); 
            $cleanTable('servicio_traslado'); $cleanTable('entidad_afiliacion');
            $cleanTable('farmacia_traslado'); $cleanTable('entidad_autorizacion'); 
        };
        
        DatabaseNoteSalud.prototype.tables = function (process, subprocess) {
            switch (process) {
                case ('create') : $createTables(); break;
                
                case ('drop') : 
                    (subprocess) ? $dropTable(subprocess) : $dropTables();
                break;
                
                case ('clean') : 
                    (subprocess) ? $cleanTable(subprocess) : $cleanTables();
                break;
            }
        };
        
        // Métodos públicos de la clase DatabaseTraslados
        
        $getValuesTable = function (object, type) {
            switch (type) {
                case ('ciudad') :
                    return [object.id, object.nombre, object.departamento];
                
                case ('barrio') :
                    return [object.id, object.nombre, object.id_ciudad];
                    
                case ('farmacia_traslado') :
                    return [object.id, object.nombre, object.unidad_medida, object.tipo, object.cantidad];
                 
                case ('lugar') :
                    return [object.id, object.nombre, object.direccion, object.id_barrio, object.ciudad];
                 
                case ('entidad_autorizacion') :
                    return [object.id, object.nombre];
                 
                case ('entidad_afiliacion') :
                    return [object.id, object.nombre];
                 
                case ('tipo_traslado') :
                    return [object.id, object.nombre, object.nombre_abreviado];
                 
                case ('motivo_traslado') :
                    return [object.id, object.nombre];
                 
                case ('servicio_traslado') :
                    return [object.id, object.id_traslado_tipo, object.id_traslado_motivo, object.triage, object.alcance];
                 
                case ('capitulo_cie10') :
                    return [object.id, object.titulo, object.codigos];
                 
                case ('subcapitulo_cie10') :
                    return [object.id, object.titulo, object.codigos, object.id_capitulo_cie10];
                 
                case ('cie10') :
                    return [object.id, object.codigo, object.nombre_cientifico, object.texto_ayuda, object.id_subcapitulo_cie10];
            }
        };
        
        DatabaseNoteSalud.prototype.add = function (options) {
            var $options = jQuery.extend({},{ cie10 : false },options);
            var $database = $options.cie10 ? $databaseCie10 : Database.get();
            
            Query.insert({
                table : $options.table, database : $database,
                values : $getValuesTable($options.object, $options.table)
            }).execute($options.result);
        };
        
        DatabaseNoteSalud.prototype.set = function (options) {
            var $options = jQuery.extend({},{ cie10 : false },options);
            var _count = 1, $lastObject = $options.objects.last();
            var $database = $options.cie10 ? $databaseCie10 : Database.get();
                
            $options.objects.forEach(function (object) {
                Query.insert({
                    table : $options.table, database : $database,
                    values : $getValuesTable(object, $options.table)
                }).execute(function () {
                    var _text = 'Cargando lista de "' + $options.table + '" (' + _count;
                    _text += ' de ' + $options.objects.length + ') en el dispositivo';

                    notesalud.process.update({ id: $options.idProcess, text : _text });
                    
                    _count++; if ($lastObject === object) syncData($options);
                });
            });
        };
        
        DatabaseNoteSalud.prototype.get = function (options) {
            var $options = jQuery.extend({},{ cie10 : false },options);
            var $database = $options.cie10 ? $databaseCie10 : undefined;
            
            Query.select({ 
                table : $options.table, database : $database
            }).list(function (objects) { $options.setList(objects); });
        };
        
        $searchAll = function (options) {
            Query.select({ 
                table : options.table, database : options.database
            }).list(function (objects) { options.setList(objects); });
        };
        
        $searchByEquals = function (options) {
            Query.select({ 
                table : options.table, database : options.database
            }).where({
                column : options.column, operator : '=', value : options.value
            }).list(function (objects) { options.setList(objects); });
        };
        
        $searchByFilter = function (options) {
            Query.select({ 
                table : options.table, database : options.database
            }).like({
                column : options.column, value : options.filter
            }).list(function (objects) { options.setList(objects); });
        };
        
        $searchTipoTrasladoOfAlcance = function (options) {
            Query.select({
                table : 'servicio_traslado', columns : ['id_traslado_tipo'], distinct : true
            }).where({
                column : 'alcance', operator : '=', value : options.alcance
            }).hasOne({
                table : 'tipo_traslado', local : 'id_traslado_tipo', foreign : 'id', variable : 'tipoTraslado'
            }).list(function (serviciosTraslado) {
                var $tiposTraslado = []; // Lista de tipos de Traslados
                
                jQuery.each(serviciosTraslado, function (index, servicio) {
                    $tiposTraslado.push(servicio.tipoTraslado);
                });
                
                options.setList($tiposTraslado); // Retornando lista
            });
        };
        
        $searchServicioTrasladoOfTipo = function (options) {
            Query.select({
                table : 'servicio_traslado'
            }).where({
                column : 'alcance', operator : '=', value : options.alcance, connector : 'AND'
            }).where({
                column : 'id_traslado_tipo', operator : '=', value : options.idTipo
            }).hasOne({
                table : 'motivo_traslado', foreign : 'id', 
                local : 'id_traslado_motivo', variable : 'motivoTraslado'
            }).list(function (serviciosTraslado) { options.setList(serviciosTraslado); });
        };
        
        $searchBarrios = function (options) {
            var $command = Query.select({ table : 'barrio' });
            
            if (options.idCiudad)
                $command.where({
                    column : 'id_ciudad', operator : '=',
                    value : options.idCiudad, connector : 'AND'
                });
            
            $command.like({
                column : 'nombre', value : '%' + options.filter + '%'
            }).list(function (barrios) { options.setList(barrios); });
        };
        
        $searchCie10 = function (options) {
            var $command = Query.select({ table : 'cie10', database : $databaseCie10 });
            
            if (options.subcapitulo) { 
                $command.where({
                    column : 'id_subcapitulo_cie10', operator : '=' ,
                    value : options.subcapitulo.id, connector : 'AND'
                });
            }
            
            else if (options.capitulo) {
                var $subcapitulos = []; // Lista de los subcapitulos del Capitulo
                
                options.subcapitulos.forEach(function (subcapitulo) {
                    $subcapitulos.push(subcapitulo.id);
                });
                
                $command.in({
                    column : 'id_subcapitulo_cie10', values : $subcapitulos, connector : 'AND'
                });
            }
            
            $command.like({
                column : 'nombre_cientifico', value : '%' + options.filter + '%'
            }).list(function (diagnosticos) { options.setList(diagnosticos); });
        };
        
        DatabaseNoteSalud.prototype.search = function (options) {
            var $options = jQuery.extend({},{ cie10 : false },options);
            $options['database'] = $options.cie10 ? $databaseCie10 : undefined;
            
            switch ($options.type) {
                // Busqueda de todos los objetos
                case ('all') : $searchAll($options); break;
                
                // Busqueda por condición de igualdad
                case ('equals') : $searchByEquals($options); break;
                
                // Busqueda por filtro en columna
                case ('filter') : $searchByFilter($options); break;
                
                // Busqueda de Tipos de traslado por Alcance
                case ('tipo_traslado_of_alcance') : 
                    $searchTipoTrasladoOfAlcance($options); break;
                
                // Busqueda de Motivos de Traslado por Tipo y Alcance
                case ('motivo_traslado_of_tipo_and_alcance') : 
                    $searchServicioTrasladoOfTipo($options); break;
                
                // Busqueda de Diagnosticos del Cie10
                case ('barrios') : $searchBarrios($options); break;
                
                // Busqueda de Diagnosticos del Cie10
                case ('cie10') : $searchCie10($options); break;
            }
        };
        
        DatabaseNoteSalud.prototype.version = function () {
            return _version;
        };
    }

    notesalud.database = new DatabaseNoteSalud();
})(notesalud);