"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var constants_1 = require("../helper/constants");
var validator_util_1 = require("../util/validator-util");
/**
 * This pipe use to format number.
 * @author manhnv
 */
var NumberFormatPipe = (function () {
    function NumberFormatPipe() {
        this.DECIMAL_SEPARATOR = constants_1.Constants.PERIOD;
        this.THOUSANDS_SEPARATOR = constants_1.Constants.COMMA;
        this.REG_EXP = /\B(?=(\d{3})+(?!\d))/g;
    }
    NumberFormatPipe.prototype.transform = function (value, precision) {
        if (precision === void 0) { precision = 1; }
        if (validator_util_1.default.isEmpty(value) || !validator_util_1.default.isNumber(value))
            return null;
        if (value == constants_1.Constants.ZERO.toString())
            return constants_1.Constants.ZERO.toString();
        var _a = (value || constants_1.Constants.BLANK).toString()
            .split(constants_1.Constants.PERIOD), integer = _a[0], _b = _a[1], fraction = _b === void 0 ? constants_1.Constants.BLANK : _b;
        fraction = precision > constants_1.Constants.ZERO
            ? this.DECIMAL_SEPARATOR + (fraction + constants_1.Constants.DECIMAL_PADDING).substring(constants_1.Constants.ZERO, precision)
            : constants_1.Constants.BLANK;
        integer = integer.replace(this.REG_EXP, this.THOUSANDS_SEPARATOR);
        var retVal = integer + fraction;
        var decimalPlaces = retVal.split(this.DECIMAL_SEPARATOR);
        if (Array.isArray(decimalPlaces) && validator_util_1.default.isNotEmpty(decimalPlaces[1])
            && decimalPlaces[1].charAt(constants_1.Constants.ZERO) === constants_1.Constants.ZERO.toString()) {
            // if contain zero at decimal place then keep remove it
            return retVal.substring(constants_1.Constants.ZERO, retVal.length - 2);
        }
        return retVal;
    };
    NumberFormatPipe.prototype.parse = function (value, precision) {
        if (precision === void 0) { precision = 1; }
        if (validator_util_1.default.isEmpty(value) || !validator_util_1.default.isNumber(value))
            return null;
        var _a = (value || constants_1.Constants.BLANK).split(this.DECIMAL_SEPARATOR), integer = _a[0], _b = _a[1], fraction = _b === void 0 ? constants_1.Constants.BLANK : _b;
        integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, constants_1.Constants.GROUP), constants_1.Constants.BLANK);
        fraction = parseInt(fraction, 10) > constants_1.Constants.ZERO && precision > constants_1.Constants.ZERO
            ? this.DECIMAL_SEPARATOR + (fraction + constants_1.Constants.DECIMAL_PADDING).substring(constants_1.Constants.ZERO, precision)
            : constants_1.Constants.BLANK;
        return integer + fraction;
    };
    NumberFormatPipe = __decorate([
        core_1.Pipe({ name: "numberFormat" }), 
        __metadata('design:paramtypes', [])
    ], NumberFormatPipe);
    return NumberFormatPipe;
}());
exports.NumberFormatPipe = NumberFormatPipe;
//# sourceMappingURL=number-format.pipe.js.map