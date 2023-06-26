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
 * Prevent double click action when action is executing.
 *
 * ### Usage
 *
 * // .html
 * ```
 * <button prevent-dblclick [disable]="isDisable" class="btn btn-minw btn-primary" type="button" (click)="doTest($event)">PreventDoubleClick</button>
 *
 * // .ts
 * ```
 * private isDisable: boolean = false;
 *
 * doTest() {
 *    this.isDisable = true;
 *    this.sf00101Service.doTest().then(res => {
 *      // do something
 *      this.isDisable = false;
 *    });
 * }
 * ```
 *
 * @author manhnv
 */
var PreventDoubleClick = (function () {
    function PreventDoubleClick() {
        this.disabled = false;
    }
    Object.defineProperty(PreventDoubleClick.prototype, "disable", {
        set: function (value) {
            this.disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    PreventDoubleClick.prototype.onClick = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            return;
        }
        this.disabled = false;
    };
    __decorate([
        core_1.HostBinding(), 
        __metadata('design:type', Boolean)
    ], PreventDoubleClick.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], PreventDoubleClick.prototype, "disable", null);
    __decorate([
        core_1.HostListener("click", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], PreventDoubleClick.prototype, "onClick", null);
    PreventDoubleClick = __decorate([
        core_1.Directive({ selector: "[prevent-dblclick]" }), 
        __metadata('design:paramtypes', [])
    ], PreventDoubleClick);
    return PreventDoubleClick;
}());
exports.PreventDoubleClick = PreventDoubleClick;
//# sourceMappingURL=prevent-double-click.directive.js.map