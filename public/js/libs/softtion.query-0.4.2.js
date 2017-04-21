
/* ============================================================
 * Softtion Query v0.4.2
 * Version proceso: Softtion Query v0.6.1
 * ============================================================
 * Author: Daniel Andrés Castillo Pedroza
 * Author: Fabián Andrés Urrego Bohórquez
 * Created: 13 de octubre de 2015
 * Updated: 07 de enero de 2016
 * Location: Valledupar, Cesar, Colombia
 * ============================================================
 */

if (typeof jQuery === 'undefined') {
    throw new Error('Softtion Query requiere jQuery');
} // Validando que JQuery este Cargado

var Database = (function (window) {
    var $database; // Objeto para gestionar Base de datos 
    
    $openDatabase = function (options) {
        var _name = options.name;                   // Nombre de Base de Datos
        var _version = options.version;             // Versión de Base de Datos
        var _description = options.description;     // Descripción de Base de Datos
        var _size = options.size;                   // Tamaño de Base de Datos
        
        return window.openDatabase(_name,_version,_description,_size);
    };
    
    var commandCreator = {
        createTable : function (options) {
            var _command = "CREATE TABLE "; // Inicio del comando
            if (!options.exists) { _command += "IF NOT EXISTS "; }
            
            _command += options.name + " ("; // Nombre de tabla
            
            var _index = options.columns.length - 1; // Index columna 
            
            options.columns.forEach(function (column) {
                _command += options.columns[_index] === column ? column : column + ",";
            });
            
            return _command + ");"; // Retornando comando final
        }
    };
    
    return {
        set : function (options) {
            var $default = {
                name : 'SofttionQuery', description : 'Database default',
                version : '1.0.0', size : 1024 * 1024 * 50
            };
            
            $database = $openDatabase(jQuery.extend({},$default,options));
        },
        
        get : function () { return $database; },
        
        table : {
            create : function (options, callbackResult, database) {
                var _command = commandCreator.createTable(options);
                var $databaseSelect = database || $database;
                
                if ($databaseSelect) {
                    $databaseSelect.transaction(function (sqlTransaction) {
                        sqlTransaction.executeSql(_command, [], 
                            function (sqlTransaccion) { 
                                if (callbackResult) callbackResult(true); 
                            },
                            function (sqlTransaccion, sqlError) {
                                $sqlError(sqlError); if (callbackResult) callbackResult(false);
                            }
                        );
                    });
                }
            },
            
            drop : function (table, callbackResult, database) {
                var $databaseSelect = database || $database, _command = "DROP TABLE " + table; 
                
                if ($databaseSelect) {
                    $databaseSelect.transaction(function (sqlTransaction) {
                        sqlTransaction.executeSql(_command, [], 
                            function (sqlTransaccion) { 
                                if (callbackResult) callbackResult(true); 
                            },
                            function (sqlTransaccion, sqlError) {
                                $sqlError(sqlError); if (callbackResult) callbackResult(false);
                            }
                        );
                    });
                }
            }
        }
    };
})(window);

var Query = (function () {
    
    $createFilterWhere = function (where, command) {
        var _filter_where = "("; // Inicio del filtro
        
        switch (where.type) {
            case ('condition') :
                _filter_where += where.column + " " + where.operator + " ?)"; 
                command.values.push(where.value); // Agregando valor
            break;
            
            case ('like') :
                _filter_where += where.column + " LIKE ?)"; command.values.push(where.value);
            break;
            
            case ('in') :
                _filter_where += where.column + " IN ("; var _index = where.values.length - 1;
                
                where.values.forEach(function (value) {
                    _filter_where += where.values[_index] === value ? '?' : '?,';
                    command.values.push(value); // Agregando valor
                });
                
                _filter_where += "))"; // Cerrando filtro in
            break;
            
            case ('between') :
                _filter_where += where.column + " BETWEEN ? AND ?)";
                command.values.push(where.since); // Agregando valor
                command.values.push(where.until); // Agregando valor
            break;
        }
        
        if (where.connector) { _filter_where += " " + where.connector + " "; }
        
        return _filter_where; // Retornando filtro del Where
    };
    
    var $commandCreator = {
        insert : function (options) {
            var _sentence = "INSERT INTO " + options.table; // Iniciando sentencia
            
            if (options.columns !== undefined && options.columns.length > 0) {
                _sentence += " ("; var _index_final = options.columns.length - 1;
                
                options.columns.forEach(function (column) {
                    _sentence += options.columns[_index_final] === column ? column + ")" : column + ",";
                });
            } // Se establecieron los nombres de las columnas
            
            _sentence += " VALUES ("; // Cargando los valores a insertar
            
            for (var _index = 0; _index < options.values.length; _index++) {
                _sentence += _index === (options.values.length - 1) ? "?)" : "?,";
            }
            
            return _sentence;
        },
        
        select : function (command) {
            var _sentence = "SELECT" + (command.distinct ? " DISTINCT " : " ");
            
            if (command.columns.length > 0) {
                var _index = command.columns.length - 1; // Ultimo elemento
                
                command.columns.forEach(function (column) {
                    _sentence += command.columns[_index] === column ? column : column + ",";
                });
            }
            
            else { _sentence += "*"; } // No tiene columnas, se treran todas
            
            _sentence += " FROM " + command.table; // Cargando tabla de consulta
            
            if (command.wheres.length > 0) {
                _sentence += " WHERE ("; // Iniciando creación del WHERE
                
                command.wheres.forEach(function (where) { 
                    _sentence += $createFilterWhere(where,command); 
                });
                
                _sentence += ")"; // Cerrando creación del WHERE
            }
            
            return _sentence; // Retornando sentencia UPDATE
        },
        
        update : function (command) {
            var _sentence = "UPDATE " + command.table + " SET "; // Iniciando sentencia
            
            if (command.columns !== undefined && command.columns.length > 0) {
                var _index = command.columns.length - 1;
                
                command.columns.forEach(function (column) {
                    _sentence += command.columns[_index] === column ? column + "=?" : column + "=?,";
                });
            }
            
            if (command.wheres.length > 0) {
                _sentence += " WHERE ("; // Iniciando creación del WHERE
                
                command.wheres.forEach(function (where) { 
                    _sentence += $createFilterWhere(where,command); 
                });
                
                _sentence += ")"; // Cerrando creación del WHERE
            }
            
            return _sentence; // Retornando sentencia UPDATE
        },
        
        delete : function (command) {
            var _sentence = "DELETE FROM " + command.table; // Iniciando sentencia
            
            if (command.wheres.length > 0) {
                _sentence += " WHERE ("; // Iniciando creación del WHERE
                
                command.wheres.forEach(function (where) { 
                    _sentence += $createFilterWhere(where,command); 
                });
                
                _sentence += ")"; // Cerrando creación del WHERE
            }
            
            return _sentence; // Retornando sentencia DELETE
        }
    };
    
    $sqlError = function (sqlError) {
        console.log('Código (' + sqlError.code + '): ' + sqlError.message);
    };
    
    $getRelationObject = function (select, object, index, callbackResult) {
        var $relation = select.relations[index];
        
        var $process = Query.select({
            table : $relation.table
        }).where({
            column : $relation.foreign, operator : '=', value : object[$relation.local]
        });
        
        switch ($relation.type) {
            case ('hasMany') :
                $process.list(function (datas) {
                    object[$relation.variable || $relation.table] = datas; index++;

                    if (index < select.relations.length) {
                        $getRelationObject(select,object,index,callbackResult);
                    }

                    else { if (callbackResult) callbackResult(object); }
                });
            break;
            
            default : 
                $process.get(function (data) {
                    object[$relation.variable || $relation.table] = data; index++;

                    if (index < select.relations.length) {
                        $getRelationObject(select,object,index,callbackResult);
                    }

                    else { if (callbackResult) callbackResult(object); }
                });
            break;
        }
    };
    
    $getRelationObjects = function (select, list, indexList, index, callbackResult) {
        var $object = list[indexList], $relation = select.relations[index];
        
        var $process = Query.select({
            table : $relation.table
        }).where({
            column : $relation.foreign, operator : '=', value : $object[$relation.local]
        });

        switch ($relation.type) {
            case ('hasMany') :
                $process.list(function (datas) {
                    $object[$relation.variable || $relation.table] = datas; index++;
            
                    if (index < select.relations.length) {
                        $getRelationObjects(select,list,indexList,index,callbackResult);
                    }
                    else {
                        index = 0; indexList++; // Siguiente objeto de la lista

                        if (indexList < list.length) {
                            $getRelationObjects(select,list,indexList,index,callbackResult);
                        }

                        else { if (callbackResult) callbackResult(list); }
                    }
                });
            break;
            
            default : 
                $process.get(function (data) {
                    $object[$relation.variable || $relation.table] = data; index++;
            
                    if (index < select.relations.length) {
                        $getRelationObjects(select,list,indexList,index,callbackResult);
                    }
                    
                    else {
                        index = 0; indexList++; // Siguiente objeto de la lista

                        if (indexList < list.length) {
                            $getRelationObjects(select,list,indexList,index,callbackResult);
                        }

                        else { if (callbackResult) callbackResult(list); }
                    }
                });
            break;
        }
    };
    
    function ClauseWhere() { this.wheres = []; };
    
    ClauseWhere.prototype.where = function (options) {
        var $default = { 
            column : undefined, value : '?', operator : undefined, connector : undefined
        };
        
        var $options = jQuery.extend({},$default,options);
        this.wheres.push(jQuery.extend({},$options,{type : 'condition'}));
        
        return this; // Retornando objeto de comando que invoca
    };
    
    ClauseWhere.prototype.like = function (options) {
        var $default = { column : undefined, value : '?', connector : undefined };
        var $options = jQuery.extend({},$default,options);
        this.wheres.push(jQuery.extend({},$options,{type : 'like'}));
        
        return this; // Retornando objeto de comando que invoca
    };
    
    ClauseWhere.prototype.in = function (options) {
        var $default = { 
            column : undefined, values : [], connector : undefined
        };
        
        var $options = jQuery.extend({},$default,options);
        this.wheres.push(jQuery.extend({},$options,{type : 'in'}));
        
        return this; // Retornando objeto de comando que invoca
    };
    
    ClauseWhere.prototype.between = function (options) {
        var $default = { 
            column : undefined, since : undefined, until : undefined, connector : undefined  
        };
        var $options = jQuery.extend({},$default,options);
        this.wheres.push(jQuery.extend({},$options,{type : 'between'}));
        
        return this; // Retornando objeto de comando que invoca
    };
    
    //<editor-fold defaultstate="collapsed" desc="Objeto del modelo para gestionar Comando INSERT">
    
    function Insert(options) {
        this.options = jQuery.extend({},{ 
                    columns : [], 
                    values : [], 
                    database : undefined 
                    },
                options
            );
    };
    
    Insert.prototype.execute = function (callbackResult) {
        if (!(this.options.values instanceof Array)) {
            var $json = this.options.values, $columns = [], $values = [];

            jQuery.each($json, function (key, value) { $columns.push(key); $values.push(value); });
            
            this.options.columns = $columns; this.options.values = $values;
        } // Se establecio un objeto JSON para los Valores
        
        var _sentence = $commandCreator.insert(this.options), $values = this.options.values;
        var $database = this.options.database || Database.get();
                
        $database.transaction(function (sqlTransaction) {
            sqlTransaction.executeSql(_sentence, $values, 
                function (sqlTransaccion) { 
                    if (callbackResult) callbackResult(true); 
                },
                function (sqlTransaccion, sqlError) {
                    $sqlError(sqlError); if (callbackResult) callbackResult(false);
                }
            );
        });
    };
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Objeto del modelo para gestionar Comando SELECT">
    
    function Select(options) {
        var $options = jQuery.extend({},{
                    values : [], 
                    columns : [], 
                    distinct : false,
                    database : undefined
                }
                ,options
            );
    
        this.table = $options.table; this.columns = $options.columns;
        this.values = $options.values || []; this.wheres = [];
        this.distinct = $options.distinct; this.relations = [];
        this.database = $options.database; // Base de Datos por Defecto
    };
    
    Select.prototype = new ClauseWhere();
    Select.prototype.constructor = Select;
    
    Select.prototype.relation = function (options) {
        var $default = {
            table : undefined,      // Tabla de la relación
            local : undefined,      // Nombre de la columna local
            foreign : undefined,    // Nombre de la columna foranéa
            type : undefined,       // Tipo de relación
            variable : undefined    // Nombre de la variable
        };
        
        this.relations.push(jQuery.extend({},$default,options)); return this;
    };
    
    Select.prototype.hasOne = function (options) {
        return this.relation(jQuery.extend({},{ type : 'hasOne' },options));
    };
    
    Select.prototype.hasMany = function (options) {
        return this.relation(jQuery.extend({},{ type : 'hasMany' },options));
    };
    
    Select.prototype.get = function (callbackResult) {
        var _sentence = $commandCreator.select(this);
        var $select = this, $values = this.values, $relations = this.relations;
        var $database = this.database || Database.get();
        
        $database.transaction(function (sqlTransaction) {
            sqlTransaction.executeSql(_sentence, $values,
                function (sqlTransaccion, sqlResultSet) { 
                    var $object = (sqlResultSet.rows.length === 0) ? undefined : sqlResultSet.rows[0];
                    
                    if ($object !== undefined && !$relations.isEmpty()) {
                        $getRelationObject($select,$object,0,callbackResult);
                    }
                    
                    else { if (callbackResult) callbackResult($object); }
                },
                function (sqlTransaccion, sqlError) {
                    $sqlError(sqlError); if (callbackResult) callbackResult(undefined);
                }
            );
        });
    };
    
    Select.prototype.list = function (callbackResult) {
        var _sentence = $commandCreator.select(this);
        var $select = this, $values = this.values, $relations = this.relations;
        var $database = this.database || Database.get();
        
        $database.transaction(function (sqlTransaction) {
            sqlTransaction.executeSql(_sentence, $values,
                function (sqlTransaccion, sqlResultSet) {
                    var $objects = []; // Lista de objetos resultante de Consulta
                    
                    if (sqlResultSet.rows.length !== 0) {
                        jQuery.each(sqlResultSet.rows, function (key, object) {
                            $objects.push(object); 
                        });
                    } // Se encontraron resultados en la Consulta
                    
                    if (!$objects.isEmpty() && !$relations.isEmpty()) {
                        $getRelationObjects($select,$objects,0,0,callbackResult);
                    }
                    
                    else { if (callbackResult) callbackResult($objects); }
                },
                function (sqlTransaccion, sqlError) {
                    $sqlError(sqlError); if (callbackResult) callbackResult(undefined);
                }
            );
        });
    };
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Objeto del modelo para gestionar Comando UPDATE">
    
    function Update(options) {
        var $options = jQuery.extend({},{
                        values : [], 
                        columns : [],
                        database : undefined
                    },
                options
            ); 
    
        this.table = $options.table; this.values = $options.values;
        this.columns = $options.columns; this.wheres = []; 
        this.database = $options.database; // Base de Datos por Defecto
    };
    
    Update.prototype = new ClauseWhere();
    Update.prototype.constructor = Update;
    
    Update.prototype.execute = function (callbackResult) {
        var _sentence = $commandCreator.update(this); 
        var $values = this.values; // Array de valores de la Sentencia
        var $database = this.database || Database.get();
        
        $database.transaction(function (sqlTransaction) {
            sqlTransaction.executeSql(_sentence, $values,
                function (sqlTransaccion, sqlResultSet) { 
                    if (callbackResult) callbackResult(sqlResultSet.rowsAffected);
                },
                function (sqlTransaccion, sqlError) {
                    $sqlError(sqlError); if (callbackResult) callbackResult(0);
                }
            );
        });
    };
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Objeto del modelo para gestionar Comando DELETE">
    
    function Delete(options) {
        var $options = jQuery.extend({},{
                        values : [],
                        database : undefined
                    },
                options
            );
    
        this.table = $options.table; this.values = $options.values; this.wheres = [];
        this.database = $options.database; // Base de Datos por Defecto
    };
    
    Delete.prototype = new ClauseWhere();
    Delete.prototype.constructor = Delete;
    
    Delete.prototype.execute = function (callbackResult) {
        var _sentence = $commandCreator.delete(this); var $values = this.values; 
        var $database = this.database || Database.get();
        
        $database.transaction(function (sqlTransaction) {
            sqlTransaction.executeSql(_sentence, $values,
                function (sqlTransaccion, sqlResultSet) { 
                    if (callbackResult) callbackResult(sqlResultSet.rowsAffected);
                },
                function (sqlTransaccion, sqlError) {
                    $sqlError(sqlError); if (callbackResult) callbackResult(0);
                }
            );
        });
    };
    
    //</editor-fold>
    
    return {
        insert : function (options) { return new Insert(options); },
        
        select : function (options) { return new Select(options); },
        
        update : function (options) { return new Update(options); },
        
        delete : function (options) { return new Delete(options); }
    };
})(window);