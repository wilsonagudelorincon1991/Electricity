
/* ============================================================
 * Softtion v1.0.4 
 * Version proceso: Softtion v1.0.8
 * ============================================================
 * Author: Daniel Andrés Castillo Pedroza
 * Author: Fabián Andrés Urrego Bohórquez
 * Created: 02 de septiembre de 2015
 * Location: Valledupar, Cesar, Colombia
 * ============================================================
 */

/* global define, module */

if (typeof jQuery === 'undefined') {
    throw new Error('Softtion JavaScript requiere jQuery');
} // Validando que JQuery este Cargado

var Softtion = function () {};

var softtion = new Softtion();

(function (softtion) {
    softtion.isUndefined = function (object) {
        return (object === undefined || object === null);
    };
    
    softtion.isFunction = function (varFunction) {
        return (typeof varFunction === "function");
    };
    
    softtion.isEmpty = function (object) {
        return (this.isUndefined(object) || object.length === 0);
    };
    
    softtion.character = {
        addBefore : function (options) {
            var $optionsDefault = { word : undefined, character : undefined, size : 0 };
            var $options = jQuery.extend({},$optionsDefault,options);
            
            var _word = String($options.word); // Estableciendo palabra actual 
            
            if ($options.character) {
                for (var index = _word.length; index < $options.size; index++) { 
                    _word = $options.character + _word; 
                } /* Cargando caracteres restantes por delante de la Palabra */
            };

            return _word; /* Retornando nueva palabra generada completa */
        },
        
        addAfter : function (options) {
            var $optionsDefault = { word : undefined, character : undefined, size : 0 };
            var $options = jQuery.extend({},$optionsDefault,options);
            
            var _word = String($options.word); // Estableciendo palabra actual 
            
            if ($options.character) {
                for (var index = _word.length; index < $options.size; index++) { 
                    _word = _word + $options.character; 
                } /* Cargando caracteres restantes por delante de la Palabra */
            };

            return _word; /* Retornando nueva palabra generada completa */
        }
    };
        
    softtion.redirect = function (url, milliseconds) { 
        setTimeout(function () { location.href = url; }, milliseconds || 0);
    };
    
    softtion.startPage = function (speed) {
        jQuery('html, body').animate({ scrollTop: 0 },speed || 0);
    };
    
    softtion.print = function (title, html, css) {
        var docPrint = window.open('', (title || ''), 'width=600,height=400');
        docPrint.document.write("<html><head><title>" + (title || '') + "</title>");
        
        if (css) {
            docPrint.document.write(css);
        } // '<link rel="stylesheet" href="main.css" type="text/css"/>'
            
        docPrint.document.write("</head><body>");
        docPrint.document.write(html);
        docPrint.document.write("</body></html>");
        
        docPrint.document.close(); // necessary for IE >= 10
        docPrint.focus(); // necessary for IE >= 10
        
        docPrint.print(); docPrint.close(); return true;
    };
})(softtion);

/* ========================================================================
 * Softtion : DescribeNumber v1.0.1
 * Proceso para representar los numeros en palabras
 * ========================================================================
 * Author: Daniel Andres Castillo Pedroza
 * Created: 11 de agosto de 2015
 * Location: Valledupar, Cesar, Colombia
 * ========================================================================
 */

(function (softtion) {
    
    creatorCifras = function () {
        var $cifras = new Array(); /* Declarando el array para contener cifras */

        $cifras[0] = ''; $cifras[1] = 'UN'; $cifras[2] = 'DOS'; 
        $cifras[3] = 'TRÉS'; $cifras[4] = 'CUATRO'; $cifras[5] = 'CINCO';
        $cifras[6] = 'SEíS'; $cifras[7] = 'SIETE'; $cifras[8] = 'OCHO'; 
        $cifras[9] = 'NUEVE'; $cifras[10] = 'DÍEZ'; $cifras[11] = 'ONCE'; 
        $cifras[12] = 'DOCE'; $cifras[13] = 'TRECE'; $cifras[14] = 'CATORCE'; 
        $cifras[15] = 'QUINCE'; $cifras[16] = 'DIECISÉIS'; 
        $cifras[17] = 'DIECISIETE'; $cifras[18] = 'DIECIOCHO'; 
        $cifras[19] = 'DIECINUEVE'; $cifras[20] = 'VEINTE'; 
        $cifras[21] = 'VIENTIUNO'; $cifras[22] = 'VIENTIDOS';
        $cifras[23] = 'VEINTITRÉS'; $cifras[24] = 'VEINTICUATRO'; 
        $cifras[25] = 'VEINTICINCO'; $cifras[26] = 'VEINTISEÍS'; 
        $cifras[27] = 'VEINTISIETE'; $cifras[28] = 'VEINTIOCHO'; 
        $cifras[29] = 'VEINTINUEVE'; $cifras[30] = 'TREINTA'; 
        $cifras[40] = 'CUARENTA'; $cifras[50] = 'CINCUENTA';
        $cifras[60] = 'SESENTA'; $cifras[70] = 'SETENTA'; 
        $cifras[80] = 'OCHENTA'; $cifras[90] = 'NOVENTA'; $cifras[100] = 'CIEN'; 
        $cifras[200] = 'DOSCIENTOS'; $cifras[300] = 'TRECIENTOS'; 
        $cifras[400] = 'CUATROCIENTOS'; $cifras[500] = 'QUINIENTOS'; 
        $cifras[600] = 'SEISCIENTOS'; $cifras[700] = 'SETECIENTOS';
        $cifras[800] = 'OCHOCIENTOS'; $cifras[900] = 'NOVECIENTOS';

        return $cifras; /* Retornando las cifras en un Array */
    };

    creatorCantidades = function () {
        var $cantidades = new Array(); /* Declarando el array para contener cantidades */

        $cantidades[1] = 'MIL'; $cantidades[10] = 'MIL';
        $cantidades[2] = 'MILLÓN'; $cantidades[20] = 'MILLÓNES'; 
        $cantidades[3] = 'MIL'; $cantidades[30] = 'MIL'; 
        $cantidades[4] = 'BILLÓN'; $cantidades[40] = 'BILLÓNES';
        $cantidades[5] = 'MIL'; $cantidades[50] = 'MIL'; 
        $cantidades[6] = 'TRILLÓN'; $cantidades[60] = 'TRILLONES';
        $cantidades[7] = 'MIL'; $cantidades[70] = 'MIL'; 

        return $cantidades; /* Retornando las cantidades en un Array */
    };
    
    softtion.processNumber = {
        getMonetaryExpression : function (number) {
            var _number = '', length = number.length, contador = 0;
            
            for (var index = 1; index <= length; index++) {
                if (contador === 3) { _number = '.' + _number; contador = 0; }
                
                _number = number.charAt(length - index) + _number; contador++; 
            } /* Recorriendo el número expresarlo monetariamente  */
            
            return _number; // Retornando expresado monetariamente
        },
        
        getThreeDigits : function (number) {
            try {
                if ((number.length > 3) || (number.length < 1)) {
                    throw 'el número establecido para proceso no es de tres cifras.';
                } /* Excepción */
                
                number = softtion.character.addBefore({word : number, character : '0', size : 3}); 
                var $cifras = creatorCifras(), _cifraDescrita = '';
                var _centena = parseInt(number.substring(0,1));
                var _decenaUnidad = parseInt(number.substring(1,3));
                
                if (_centena !== 0) {
                    _cifraDescrita = _cifraDescrita + $cifras[_centena * 100];
                    
                    if (_centena === 1 && _decenaUnidad !== 0) {
                        _cifraDescrita = _cifraDescrita + 'TO ';
                    } /* Añadimos caracteres en caso de ser Centana de 100 */
                    
                    else { _cifraDescrita = _cifraDescrita + ' '; } /* Agregamos espacio descripción */
                }
                
                if (_decenaUnidad !== 0) {
                    var temporal = $cifras[_decenaUnidad]; 
                
                    if (temporal) {
                        if (temporal.length > 0) {
                            _cifraDescrita = _cifraDescrita + temporal;
                        } /* La cifra es diferente de Cero */
                    }

                    else {
                        var decena = parseInt(number.substring(1,2)) * 10;
                        var unidad = parseInt(number.substring(2,3));

                        _cifraDescrita = _cifraDescrita + $cifras[decena];
                        _cifraDescrita = _cifraDescrita + " Y " + $cifras[unidad];
                    } /* Se desgloza el número para realizar descripción */
                }
                
                return _cifraDescrita.trim(); /* Retornando cifra de tres dígitos */
            }
            
            catch (err) { 
                console.error('Softtion - Uncaught TypeError: ' + err); return null; 
            } /* Error generado */
        },
        
        getDescription : function (number) {
            try {
                if (softtion.isEmpty(number)) {
                    throw 'el número puede no estar definido, instanciado ó no contiene caracteres.';
                } /* Excepción */
                
                if (parseInt(number) !== 0) {
                    number = String(parseInt(number)); /* Removiendo ceros */
                    var _numeroDescrito = '', _posicionFinal = number.length, _index = 0; 

                    while (_posicionFinal > 0) {
                        var _posicionInicial = _posicionFinal - 3; /* Posición inicial del corte */

                        if (_posicionInicial < 0) { _posicionInicial = 0; } /* Controlando desbordamiento */

                        var $cantidades = creatorCantidades(); // Descripcion de Cantidades
                        var _cifraNumerica = number.substring(_posicionInicial,_posicionFinal);
                        var _cifraDescrita = softtion.processNumber.getThreeDigits(_cifraNumerica);

                        if (_cifraDescrita.length > 0) {
                            if (_index > 0) {
                                if (parseInt(_cifraNumerica) > 1) {
                                    _cifraDescrita = _cifraDescrita + ' ' + $cantidades[_index * 10];
                                } /* La cifra a describir es plural */

                                else {
                                    /* Solo se requiere descriptor de cantidad */
                                    if (_index%2 !== 0) { _cifraDescrita = $cantidades[_index]; }

                                    /* Se requiere descriptor de cantidad y cifra */
                                    else { _cifraDescrita = _cifraDescrita + ' ' + $cantidades[_index]; }
                                } /* La cifra a describir es singular */
                            } /* La cifra pertenece a unidades de mil ó superiores */

                            _numeroDescrito = _cifraDescrita + ' ' + _numeroDescrito;
                        } /* La cifra no contiene descripción */

                        else if ((_index > 1) && (_index%2 === 0)) {
                            _numeroDescrito = $cantidades[_index * 10] + ' ' +  _numeroDescrito;
                        } /* Se requiere descrición plural de la sección del número */

                        _index++; _posicionFinal = _posicionInicial; /* Reconfigurando variables */
                    }

                    return _numeroDescrito.trim(); /* Retornando descripción del número */
                }
                
                else { return 'CERO'; } /* El número a describir es cero */
            } /* Describiendo número */
            
            catch (err) { 
                console.error('Softtion - Uncaught TypeError: ' + err); return null; 
            } /* Error generado */
        }
    };
})(softtion);

/* ========================================================================
 * Softtion : SHA1 v1.0.1
 * Proceso para encriptar cadenas en SHA1
 * ========================================================================
 * Author: Daniel Andres Castillo Pedroza
 * Created: 11 de agosto de 2015
 * Location: Valledupar, Cesar, Colombia
 * ======================================================================== 
 */

(function (softtion) {
    f = function(s, x, y, z)  {
        switch (s) {
            case 0: return (x & y) ^ (~x & z);           // Ch()
            case 1: return  x ^ y  ^  z;                 // Parity()
            case 2: return (x & y) ^ (x & z) ^ (y & z);  // Maj()
            case 3: return  x ^ y  ^  z;                 // Parity()
        }
    };
    
    ROTL = function(x, n) {
        return (x<<n) | (x>>>(32-n));
    };
    
    toHexStr = function(n) {
        // note can't use toString(16) as it is implementation-dependant,
        // and in IE returns signed numbers when used on full words
        var s = "", v;
        
        for (var i = 7; i >= 0; i--) {
            v = (n>>>(i*4)) & 0xf; s += v.toString(16); 
        }
        return s;
    };
    
    softtion.SHA1 = function (value) {
        // convert string to UTF-8, as SHA only deals with byte-streams
        value = value.utf8Encode();

        // constants [§4.2.1]
        var K = [ 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6 ];

        // PREPROCESSING

        value += String.fromCharCode(0x80);  // add trailing '1' bit (+ 0's padding) to string [§5.1.1]

        // convert string msg into 512-bit/16-integer blocks arrays of ints [§5.2.1]
        var l = value.length/4 + 2; // length (in 32-bit integers) of msg + ‘1’ + appended length
        var N = Math.ceil(l/16);  // number of 16-integer-blocks required to hold 'l' ints
        var M = new Array(N);

        for (var i=0; i<N; i++) {
            M[i] = new Array(16);
            for (var j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
                M[i][j] = (value.charCodeAt(i*64+j*4)<<24) | (value.charCodeAt(i*64+j*4+1)<<16) |
                    (value.charCodeAt(i*64+j*4+2)<<8) | (value.charCodeAt(i*64+j*4+3));
            } // note running off the end of msg is ok 'cos bitwise ops on NaN return 0
        }
        // add length (in bits) into final pair of 32-bit integers (big-endian) [§5.1.1]
        // note: most significant word would be (len-1)*8 >>> 32, but since JS converts
        // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
        M[N-1][14] = ((value.length-1) * 8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14]);
        M[N-1][15] = ((value.length-1) * 8) & 0xffffffff;

        // set initial hash value [§5.3.1]
        var H0 = 0x67452301;
        var H1 = 0xefcdab89;
        var H2 = 0x98badcfe;
        var H3 = 0x10325476;
        var H4 = 0xc3d2e1f0;

        // HASH COMPUTATION [§6.1.2]

        var W = new Array(80); var a, b, c, d, e;
        for (var i=0; i<N; i++) {

            // 1 - prepare message schedule 'W'
            for (var t=0;  t<16; t++) W[t] = M[i][t];
            for (var t=16; t<80; t++) W[t] = ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);

            // 2 - initialise five working variables a, b, c, d, e with previous hash value
            a = H0; b = H1; c = H2; d = H3; e = H4;

            // 3 - main loop
            for (var t=0; t<80; t++) {
                var s = Math.floor(t/20); // seq for blocks of 'f' functions and 'K' constants
                var T = (ROTL(a,5) + f(s,b,c,d) + e + K[s] + W[t]) & 0xffffffff;
                e = d;
                d = c;
                c = ROTL(b, 30);
                b = a;
                a = T;
            }

            // 4 - compute the new intermediate hash value (note 'addition modulo 2^32')
            H0 = (H0+a) & 0xffffffff;
            H1 = (H1+b) & 0xffffffff;
            H2 = (H2+c) & 0xffffffff;
            H3 = (H3+d) & 0xffffffff;
            H4 = (H4+e) & 0xffffffff;
        }

        return toHexStr(H0) + toHexStr(H1) + toHexStr(H2) + toHexStr(H3) + toHexStr(H4);
    };
})(softtion);

/* ========================================================================
 * Softtion : Device v1.0.1
 * Proceso para conocer el dispositivo en el que estamos
 * ========================================================================
 * Author: Daniel Andres Castillo Pedroza
 * Created: 11 de agosto de 2015
 * Location: Valledupar, Cesar, Colombia
 * ======================================================================== 
 */

(function (softtion) {
    var _userAgent = window.navigator.userAgent.toLowerCase();
    
    $find = function (plataform) {
        return _userAgent.indexOf(plataform) !== -1;
    };
    
    softtion.device = {
        windows : function () { 
            return $find('windows'); 
        },
        
        windowsPhone : function () {
            return softtion.device.windows() && $find('phone');
        },

        windowsTablet : function () {
            return softtion.device.windows() && ($find('touch') && !softtion.device.windowsPhone());
        },

        ipod : function () {
            return $find('ipod');
        },
        
        ipad : function () {
            return $find('ipad');
        },

        iphone : function () {
            return !softtion.device.windows() && $find('iphone');
        },
        
        ios : function () {
            return softtion.device.iphone() || softtion.device.ipod() || softtion.device.ipad();
        },
        
        android : function () {
            return !softtion.device.windows() && $find('android');
        },
                
        androidPhone : function () {
            return softtion.device.android() && $find('mobile');
        },
        
        androidTablet : function () {
            return softtion.device.android() && !$find('mobile');
        },

        fxos : function () {
            return ($find('(mobile;') || $find('(tablet;')) && $find('; rv:');
        },
        
        fxosPhone : function () {
            return softtion.device.fxos() && $find('mobile');
        },
        
        fxosTablet : function () {
            return softtion.device.fxos() && $find('tablet');
        },

        cordova : function () {
            return window.cordova && location.protocol === 'file:';
        },

        nodeWebkit : function () {
            return typeof window.process === 'object';
        },

        mobile : function () {
            return softtion.device.androidPhone() || softtion.device.iphone() || softtion.device.ipod() || softtion.device.windowsPhone() || softtion.device.fxosPhone();
        },
        
        tablet : function () {
            return softtion.device.ipad() || softtion.device.androidTablet() || softtion.device.windowsTablet() || softtion.device.fxosTablet();
        },
        
        desktop : function () {
            return !softtion.device.tablet() && !softtion.device.mobile();
        },

        // Conocer orientación del Dispostivo

        portrait : function () {
            return (window.innerHeight / window.innerWidth) > 1;
        },
        
        landscape : function () {
            return (window.innerHeight / window.innerWidth) < 1;
        }
    };
})(softtion);

/* ========================================================================
 * Softtion : DateTime v1.0.1
 * Proceso para gestionar fechas y horas
 * ========================================================================
 * Author: Daniel Andres Castillo Pedroza
 * Created: 11 de agosto de 2015
 * Location: Valledupar, Cesar, Colombia
 * ======================================================================== 
 */

(function (softtion) {
    
    isDate = function (date) {
        return !(softtion.isUndefined(date) || !(date instanceof Date));
    };
    
    softtion.DateTime = {
        daysOfWeek : new Array('Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'),
        
        monthsOfYear : new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo' ,'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre' ,'Diciembre'),
        
        isLeapYear : function (year) {
            return ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0));
        },
        
        getNumberDaysOfMonths : function (year) {
            var numberDays = new Array(); numberDays.push(31); // Enero
            numberDays.push(softtion.DateTime.isLeapYear(year) ? 29 : 28); // Febrero
            numberDays.push(31); numberDays.push(30); // Marzo y Abril
            numberDays.push(31); numberDays.push(30); // Mayo y Junio
            numberDays.push(31); numberDays.push(31); // Julio y Agosto
            numberDays.push(30); numberDays.push(31); // Septiembre y Octubre
            numberDays.push(30); numberDays.push(31); // Noviembre y Diciembre

            return numberDays; // Retornando los dias de los meses
        },
        
        getNumberDaysOfYear : function (year) { 
            return softtion.DateTime.isLeapYear(year) ? 366 : 365;
        },
        
        difference : function (dateInitial, dateFinal) {
            try {
                if (!isDate(dateInitial)) {
                    throw 'el objeto establecido para la fecha inicial no está definido, instanciado ó no es de tipo Date.';
                } /* Excepción */

                if (!isDate(dateFinal)) {
                    throw 'el objeto establecido para la fecha final no está definido, instanciado ó no es de tipo Date.';
                } /* Excepción */
                
                var _initial = dateInitial.getDateJSON(), _final = dateFinal.getDateJSON();
                var _numberDays = undefined, _years = 0, _months = 0, _days = 0, _daysTotals = 0;

                if (_final.year > _initial.year) {
                    _numberDays = softtion.DateTime.getNumberDaysOfMonths(_initial.year);
                    _daysTotals = _numberDays[_initial.month - 1] - _initial.day;

                    for (var i = _initial.month + 1; i <= 12; i++) {
                        _daysTotals = _daysTotals + _numberDays[i - 1]; 
                    } // Calculando tiempo transcurrido en el Año inicial

                    for (var j = _initial.year + 1; j < _final.year; j++) {
                        _daysTotals = _daysTotals + softtion.DateTime.getNumberDaysOfYear(j); _years++;
                    } // Calculando tiempo transcurrido entre año inicial y final

                    _numberDays = softtion.DateTime.getNumberDaysOfMonths(_final.year);

                    for (var h = 1; h < _final.month; h++) {
                        _daysTotals = _daysTotals + _numberDays[h - 1];
                    } // Calculando tiempo transcurrido en el Año final

                    _daysTotals = _daysTotals + _final.day; // Dias finales

                    if (_final.month > _initial.month) {
                        _years++; _months = _final.month - _initial.month - 1;
                        if (_final.day >= _initial.day) { _months++; _days = _final.day - _initial.day; }
                        else { _days = _numberDays[_final.month - 2] - _initial.day + _final.day; }
                    }

                    else if (_final.month === _initial.month) {
                        if (_final.day >= _initial.day) { _years++; _days = _final.day - _initial.day; }
                        else { _days = _numberDays[_final.month - 2] - _initial.day + _final.day; _months = 11;}
                    }

                    else {
                        _months = 11 - _initial.month + _final.month;
                        if (_final.day >= _initial.day) { _months++; _days = _final.day - _initial.day; }
                        else { _days = _numberDays[_final.month - 2] - _initial.day + _final.day; }
                    }
                } // El año de la fecha final es mayor al de fecha inicial

                else if (_final.year === _initial.year) {
                    if (_final.month > _initial.month) {
                        _numberDays = softtion.DateTime.getNumberDaysOfMonths(_initial.year);
                        _daysTotals = _numberDays[_initial.month - 1] - _initial.day;

                        for (var i = _initial.month + 1; i < _final.month; i++) {
                            _daysTotals = _daysTotals + _numberDays[i - 1]; _months++; 
                        } // Recorriendo la cantidad de Meses de diferencia

                        _daysTotals = _daysTotals + _final.day;

                        if (_final.day >= _initial.day) { _months++; _days = _final.day - _initial.day; } 

                        else {
                            _days = _numberDays[_final.month - 2] - _initial.day + _final.day;
                            if (_days < 0) { _days = 0;} // Controlando desborde de los dias
                        }
                    } // El mes de la fecha final es mayor al de fecha inicial

                    else if (_final.month === _initial.month) {
                        if (_final.day > _initial.day) { 
                            _days = _final.day - _initial.day; _daysTotals = _final.day - _initial.day;
                        } // El dia de la fecha final es mayor al de fecha inicial
                    } // El mes de la fecha final es igual al de fecha inicial
                } // El año de la fecha final es igual al de fecha inicial

                return {
                    years : _years, months : _months, days : _days,
                    daysTotals : _daysTotals, monthsTotals : (_years * 12) + _months
                };
            }
            
            catch (err) {
                console.error('Softtion DateTime - Uncaught TypeError: ' + err); 
            }
        },
        
        getDescription : function (descripcion) {
            var $optionsDefault = { years : 0, months : 0, days : 0 };
            var $options = jQuery.extend({},$optionsDefault,descripcion);
            var _description = "0 dias"; // Descripción de tiempo Transcurrido

            if ($options.years > 0) {
                _description = $options.years + " año (s)"; // Años que pasaron
                if ($options.months > 0) { _description += " con " + $options.months + " mes (es)"; }
                else if ($options.days > 0) { _description += " con " + $options.days + " dia (s)"; }
            }

            else if ($options.months > 0) {
                _description = $options.months + " mes (es)"; // Meses que pasaron
                if ($options.days > 0) { _description += " con " + $options.days + " dia (s)"; }
            }

            else if ($options.days > 0) { _description = $options.days + " dia (s)"; }

            return _description; // Retornando descripción
        },
    
        createDate : function (date) {
            return new Date(date.year,date.month - 1,date.day);
        },
        
        createTime : function (time) {
            return new Date(1900,0,1,time.hour,time.minute,time.second,0);
        },
        
        createDateTime : function (dateTime) {
            var date = dateTime.date, time = dateTime.time; // Fecha y hora establecida en JSON
            return new Date(date.year,date.month - 1,date.day,time.hour,time.minute,time.second,0);
        },
        
        createOfPHP : function (timestamp) { return new Date(timestamp * 1000); },
        
        merge : function (date, time) {
            var $datetime = date; $datetime.setHours(time.getHours());
            $datetime.setMinutes(time.getMinutes()); $datetime.setSeconds(time.getSeconds());
            
            return $datetime; // Retornar fecha y hora fusionadas
        }
    };
})(softtion);

if (typeof module !== 'undefined' && module.exports) { module.exports = softtion; }
if (typeof define === 'function' && define.amd) { define([], function() { return softtion; }); }

//<editor-fold defaultstate="collapsed" desc="Métodos para crear componentes HTML">

/* 
 * =========================================
 * HtmlAttribute y HtmlComponent v1.0.1
 * =========================================
 */

var HtmlAttribute = function (name, value) {
    this.name = name; this.value = value;
};

HtmlAttribute.prototype = {    
    getName : function () { 
        return this.name; 
    },
    
    getValue : function () { 
        return this.value; 
    },
    
    isCorrect : function () {
        return (this.name !== undefined && this.name !== null && this.name !== "");
    }
};

var HtmlComponent = function (tag, isClosed) {
    this.tag = tag;             // Tipo de etiqueta del Componente
    this.id = undefined;        // Id del componente
    this.classes = [];          // Clases de componente
    this.attributes = [];       // Atributos del componente
    this.text = '';             // Texto del componente
    this.components = [];       // Lista de componentes
    
    this.isClosed = (isClosed !== undefined) ? isClosed : true; 
};

HtmlComponent.prototype = {
    setId : function (id) { this.id = id; return this; },
    
    addClass : function (newClass) { 
        if (newClass instanceof Array) {
            this.classes.merge(newClass); return this;
        } // Cargando lista Atributos
        
        this.classes.push(newClass); return this;
    },
    
    addAttribute : function (attribute, value) {
        try {
            if (softtion.isUndefined(attribute)) {
                throw 'el atributo establecido no esta definido ó instanciado.';
            } // Objeto undefined
            
            if (typeof attribute === 'string') {
                this.attributes.push(new HtmlAttribute(attribute,value)); return this;
            } // Objeto es de tipo String
            
            if (!(attribute instanceof HtmlAttribute)) { 
                throw 'el atributo establecido no es de tipo HtmlAttribute.';
            } // Objeto no es de tipo HtmlAttribute
            
            this.attributes.push(attribute); return this;
        } 
        
        catch (err) { 
            console.error('Softtion Component - Uncaught TypeError: ' + err); 
        } // Error generado 
    },
    
    setText : function (text) { this.text = text; return this; },
    
    append : function (text) { this.text += text; return this; },
    
    addComponent : function (component) {
        try {
            if (softtion.isUndefined(component)) {
                throw 'el componente establecido no esta definido ó instanciado.';
            } // Objeto undefined
            
            if (!(component instanceof HtmlComponent)) {
                throw 'el componente establecido no es de tipo HtmlComponent.';
            } // Objeto no es de tipo HtmlComponent
            
            this.components.push(component); return this;
        } 
        
        catch (err) { 
            console.error('Softtion Component - Uncaught TypeError: ' + err); 
        } // Error generado
    },
    
    create : function () {
        try {
            if (!this.tag) {
                throw 'no ha establecido el tipo de etiqueta del Componente.';
            } // No definio correctamente la etiqueta
            
            var $component = "<" + this.tag; // Iniciando etiqueta de configuración
            
            if (this.id) $component += " id='" + this.id + "'"; // Se estableció identificador de Componente

            if (!this.classes.isEmpty()) {
                $component += " class='"; // Iniciando definicion de Clases
                this.classes.forEach(function (newClass) { $component += newClass + " "; });
                
                $component = $component.trim() + "'"; 
            } // Se establecieron clases para el Componente

            if (!this.attributes.isEmpty()) {
                this.attributes.forEach(function (attribute) { 
                    if (attribute.isCorrect()) {
                        $component += " " + attribute.getName() + "='" + attribute.getValue() + "'";
                    }
                });
            } // Se establecieron atributos para el Componente

            $component += ">"; // Cerrando etiqueta de configuración

            if (this.text) $component += this.text; // Se estableció texto de Componente
            
            if (!this.components.isEmpty()) {
                this.components.forEach(function (component) { $component += component.create(); });
            } // Se establecieron componentes hijos en el Componente */

            if (this.isClosed) $component +=  "</" + this.tag + ">"; // Cerrando su etiqueta
            
            return $component; // Retornando configuración del componente
        } 
        
        catch (err) { 
            console.error('Softtion Component - Uncaught TypeError: ' + err); 
        } // Error generado
    }
};

//</editor-fold>