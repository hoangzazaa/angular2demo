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
/**
 * Created by haipt on 9/5/2016.
 */
var core_1 = require("@angular/core");
var FormDirective = (function () {
    function FormDirective(el) {
        this.el = el;
    }
    FormDirective.prototype.ngOnInit = function () {
        $(this.el.nativeElement).children(".form-control").each(function () {
            var input = jQuery(this);
            var parent = input.parent('.form-material');
            if (input.val()) {
                parent.addClass('open');
            }
            input.on('change', function () {
                if (input.val()) {
                    parent.addClass('open');
                }
                else {
                    parent.removeClass('open');
                }
            });
        });
    };
    FormDirective = __decorate([
        core_1.Directive({
            selector: ".form-material.floating",
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], FormDirective);
    return FormDirective;
}());
exports.FormDirective = FormDirective;
//# sourceMappingURL=form.directive.js.map