
/* ============================================================
 * Softtion Override v1.0.1 
 * Version proceso: Softtion Override v1.0.4
 * ============================================================
 * Author: Daniel Andrés Castillo Pedroza
 * Author: Fabián Andrés Urrego Bohórquez
 * Created: 14 de octubre de 2015
 * Updated: Undefined
 * Location: Valledupar, Cesar, Colombia
 * ============================================================
 */

/* global softtion */

// Nuevos métodos para la clase Date de JavaScript

Date.prototype.json = function (type) {
    switch (type) {
        case ('date') :
            return { 
                day : this.getDate(), 
                month : this.getMonth() + 1, 
                year : this.getFullYear() 
            };
            
        case ('time') : 
            return { 
                hour : this.getHours(), 
                minute : this.getMinutes(), 
                second : this.getSeconds() 
            };
            
        default :
            return { 
                date : { 
                    day : this.getDate(), 
                    month : this.getMonth() + 1, 
                    year : this.getFullYear() 
                },
                time : { 
                    hour : this.getHours(), 
                    minute : this.getMinutes(), 
                    second : this.getSeconds() 
                }
            };
    }
};

Date.prototype.php = function () {
    return (this.getTime() / 1000).toFixed();
};

Date.prototype.description = function (format) {
    var _desc = format || 'dd-mm-aa hh:ii:ss' /* Formato por defecto */;
    
    $completformat = function (word, size) {
        return softtion.character.addBefore({ 
            word : word, character : '0', size : size || 2
        });
    };
    
    var _zona = (this.getHours() > 11) ? 'PM' : 'AM'; // Zona horaria
    var _hora = (this.getHours() > 12) ? (this.getHours() - 12) : this.getHours();
    
    _desc = _desc.replace('dd',$completformat(this.getDate()));
    _desc = _desc.replace('mm',$completformat(this.getMonth() + 1));
    _desc = _desc.replace('aa',$completformat(this.getFullYear()));
    
    _desc = _desc.replace('mn',softtion.DateTime.monthsOfYear[this.getMonth()]);
    _desc = _desc.replace('ww',softtion.DateTime.daysOfWeek[this.getDay()]);
    
    _desc = _desc.replace('hh',$completformat(this.getHours()));
    _desc = _desc.replace('ii',$completformat(this.getMinutes()));
    _desc = _desc.replace('ss',$completformat(this.getSeconds()));
    _desc = _desc.replace('zz',_zona); _desc = _desc.replace('hz',$completformat(_hora));
    
    return _desc; // Retornando descripción de la Fecha
};

Date.prototype.code = function (type) {
    switch (type) {
        case ('date') : return this.description('aammdd');
        case ('time') : return this.description('hhiiss');
        default : return this.description('aammddhhiiss');
    }
};

Date.prototype.equalsDate = function (date) {
    if ((date !== undefined) && (date instanceof Date)) {
        if (this.getDate() !== date.getDate()) {
            return false;
        } // Comparando dias de las fechas
        
        if (this.getMonth() !== date.getMonth()) {
            return false;
        } // Comparando meses de las fechas
        
        return this.getFullYear() === date.getFullYear();
    } // Comparando atributos de las fechas
    
    return false; // No se puede realizar comparación
};

// Nuevos métodos para la clase Array de JavaScript

Array.prototype.isEmpty = function () { 
    return (this.length === 0); 
};

Array.prototype.first = function () {
    return this.isEmpty() ? undefined : this[0];
};

Array.prototype.last = function () {
    return this.isEmpty() ? undefined : this[this.length - 1];
};

Array.prototype.merge = function (arrayMerge) {
    var $me = this; // Objeto para contener el array
    
    if (arrayMerge instanceof Array) {
        arrayMerge.forEach(function (object) { $me.push(object); });
    }
};

Array.prototype.remove = function (index) {
    this.splice(index,1);
};

// Nuevos métodos para la clase String de JavaScript

String.prototype.full = function () {
    return (this.length > 0); 
};

String.prototype.empty = function () {
    return (this.length === 0); 
};