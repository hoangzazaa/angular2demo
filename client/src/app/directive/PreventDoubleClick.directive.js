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
/**
 * This directive use to custom input number format.
 * Demo: <input number-input [(_value)]="x" [numberPrecision]="1"/>
 *
 * @author manhnv
 */
var PreventDoubleClickDirective = (function () {
    function PreventDoubleClickDirective() {
        this.disabled = false;
    }
    Object.defineProperty(PreventDoubleClickDirective.prototype, "valid", {
        set: function (value) {
            this.disabled = !value;
        },
        enumerable: true,
        configurable: true
    });
    PreventDoubleClickDirective.prototype.onClick = function (event) {
        if (!this.disabled) {
            event.stopPropagation();
            return false;
        }
        this.disabled = true;
    };
    __decorate([
        core_1.HostBinding(), 
        __metadata('design:type', Boolean)
    ], PreventDoubleClickDirective.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], PreventDoubleClickDirective.prototype, "valid", null);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], PreventDoubleClickDirective.prototype, "onClick", null);
    PreventDoubleClickDirective = __decorate([
        core_1.Directive({
            selector: "[preventDC]"
        }), 
        __metadata('design:paramtypes', [])
    ], PreventDoubleClickDirective);
    return PreventDoubleClickDirective;
}());
exports.PreventDoubleClickDirective = PreventDoubleClickDirective;
//# sourceMappingURL=PreventDoubleClick.directive.js.map