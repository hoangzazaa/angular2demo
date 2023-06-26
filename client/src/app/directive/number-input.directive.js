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
 * This directive use to custom input number format.
 * Demo: <input number-input [(_value)]="x" [numberPrecision]="1"/>
 *
 * @author manhnv
 */
var NumberInputDirective = (function () {
    function NumberInputDirective(el) {
        this.el = el;
        // value change emitter
        this.numberValueChange = new core_1.EventEmitter();
        /* setting input is number */
        this.inputType = "text";
        // check placeholder attribute already defined
        if (this.el.nativeElement.getAttribute("placeholder") != undefined) {
            // get 'placeholder' value
            this.placeholderValue = this.el.nativeElement.getAttribute("placeholder");
        }
        this.isFocus = false;
    }
    Object.defineProperty(NumberInputDirective.prototype, "numberValue", {
        // set input value
        set: function (value) {
            this._value = value;
            if (!this.isFocus) {
                this.onBlur(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    NumberInputDirective.prototype.onFocus = function (value) {
        // set input value
        if (this._value != undefined && this._value != null) {
            this.el.nativeElement.value = this._value;
        }
        else {
            this.el.nativeElement.value = value;
        }
        // set input type
        this.el.nativeElement.type = "number";
        // set min
        if (this.minValue == undefined) {
            this.minValue = 0;
        }
        $(this.el.nativeElement).attr("min", this.minValue);
        // set max
        if (this.maxValue != undefined) {
            $(this.el.nativeElement).attr("max", this.maxValue);
        }
        // set focus-in
        this.isFocus = true;
        $(this.el.nativeElement).select();
    };
    NumberInputDirective.prototype.onBlur = function (value) {
        // set input type
        this.el.nativeElement.type = "text";
        if (validator_util_1.default.isNotEmpty(value) || this.defaultValue != 0) {
            // apply precision
            if (this.precisionNumber != undefined && !isNaN(this._value)) {
                var decimalNumber = Math.pow(10, this.precisionNumber);
                this._value = Math.round(this._value * decimalNumber) / decimalNumber;
                if (this.isFocus) {
                    this.numberValueChange.emit(this._value);
                }
            }
        }
        else {
            this._value = null;
        }
        // format number
        if (this.notFormatNumber != true) {
            this.el.nativeElement.value = this.formatNumber(this._value);
        }
        else {
            this.el.nativeElement.value = this._value;
        }
        // set focus-out
        this.isFocus = false;
    };
    NumberInputDirective.prototype.onKeyDown = function (event) {
        // get keyCode
        var keyCode = event.which;
        // reject "e" character
        if (keyCode == 69) {
            event.stopPropagation();
            return false;
        }
        else if (keyCode == 109 || keyCode == 189) {
            // check minvalue == null or minvalue == 0
            if (this.minValue >= 0 || !this.minValue) {
                event.stopPropagation();
                return false;
            }
        }
    };
    NumberInputDirective.prototype.onInputChange = function (value) {
        if (validator_util_1.default.isEmpty(value)) {
            if (this._value != undefined) {
                /*when element not define placeholder or placeholder value is blank|empty then element's value is
                 default value*/
                if (validator_util_1.default.isEmpty(this.placeholderValue)) {
                    this._value = this.defaultValue;
                }
                else {
                    this._value = null;
                }
                this.numberValueChange.emit(this._value);
                return;
            }
        }
        else if (!isNaN(+value)) {
            value = +value;
            // check max, min
            if (this.minValue != undefined && value < this.minValue) {
                // reset value to minValue
                value = this.minValue;
            }
            else if (this.maxValue != undefined && value > this.maxValue) {
                // reset value to maxValue
                value = this.maxValue;
            }
            if (this._value != value) {
                this._value = value;
                this.numberValueChange.emit(this._value);
                return;
            }
        }
        event.stopPropagation();
        return false;
    };
    NumberInputDirective.prototype.formatNumber = function (value) {
        if (validator_util_1.default.isEmpty(value)) {
            if (validator_util_1.default.isEmpty(this.placeholderValue) && validator_util_1.default.isNotEmpty(this.defaultValue))
                return this.defaultValue.toString();
            return null;
        }
        else {
            if (value == 0)
                return constants_1.Constants.ZERO.toString();
            // n: length of decimal
            var n = this.precisionNumber;
            if (n == undefined)
                n = 0;
            // x: length of sections
            var x = 3;
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
            return value.toFixed(n).replace(new RegExp(re, constants_1.Constants.GROUP), '$&,');
        }
    };
    __decorate([
        core_1.Input("numberPrecision"), 
        __metadata('design:type', Number)
    ], NumberInputDirective.prototype, "precisionNumber", void 0);
    __decorate([
        core_1.Input("maxValue"), 
        __metadata('design:type', Number)
    ], NumberInputDirective.prototype, "maxValue", void 0);
    __decorate([
        core_1.Input("minValue"), 
        __metadata('design:type', Number)
    ], NumberInputDirective.prototype, "minValue", void 0);
    __decorate([
        core_1.Input("defaultValue"), 
        __metadata('design:type', Number)
    ], NumberInputDirective.prototype, "defaultValue", void 0);
    __decorate([
        core_1.Input("notFormatNumber"), 
        __metadata('design:type', Boolean)
    ], NumberInputDirective.prototype, "notFormatNumber", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], NumberInputDirective.prototype, "numberValue", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NumberInputDirective.prototype, "numberValueChange", void 0);
    __decorate([
        core_1.HostBinding("type"), 
        __metadata('design:type', Object)
    ], NumberInputDirective.prototype, "inputType", void 0);
    __decorate([
        core_1.HostListener("focus", ["$event.target.value"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NumberInputDirective.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener("blur", ["$event.target.value"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NumberInputDirective.prototype, "onBlur", null);
    __decorate([
        core_1.HostListener('keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NumberInputDirective.prototype, "onKeyDown", null);
    __decorate([
        core_1.HostListener("input", ["$event.target.value"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NumberInputDirective.prototype, "onInputChange", null);
    NumberInputDirective = __decorate([
        core_1.Directive({ selector: "[number-input]" }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], NumberInputDirective);
    return NumberInputDirective;
}());
exports.NumberInputDirective = NumberInputDirective;
//# sourceMappingURL=number-input.directive.js.map