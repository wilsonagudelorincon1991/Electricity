
// Cambio de prueba

_electricity = function () {};

_electricity.prototype.onlyNumber = function (identificador) {
    $(identificador).keypress(function (e) {
        if ( e.which!==8 && e.which!==0 && (e.which<48 || e.which>57)) {
            return false;
        }
    }); 
};

_electricity.prototype.onlyLetter = function (identificador) {
    $(identificador).keypress(function (e) {
        if ((e.charCode < 97 || e.charCode > 122) && (e.charCode < 65 || e.charCode > 90) && (e.charCode != 32)) {
            return false;
        }
    }); 
};

_electricity.prototype.domain = function () {
    return 'localhost:1016';
};

var electricity = new _electricity();


