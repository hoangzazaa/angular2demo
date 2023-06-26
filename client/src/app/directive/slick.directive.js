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
var SlickDirective = (function () {
    function SlickDirective(el) {
        this.el = el;
    }
    SlickDirective.prototype.ngAfterViewInit = function () {
        $(this.el.nativeElement).slick({
            infinite: false,
            arrows: this.arrows ? this.arrows : false,
            dots: this.dots ? this.dots : false,
            slidesToShow: this.slidesToShow ? this.slidesToShow : 1,
            autoplay: this.autoplay ? this.autoplay : false,
            autoplaySpeed: this.autoplaySpeed ? this.autoplaySpeed : 3000,
            variableWidth: this.variableWidth ? this.variableWidth : false
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SlickDirective.prototype, "arrows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SlickDirective.prototype, "dots", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SlickDirective.prototype, "slidesToShow", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SlickDirective.prototype, "autoplay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SlickDirective.prototype, "autoplaySpeed", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SlickDirective.prototype, "variableWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SlickDirective.prototype, "infinite", void 0);
    SlickDirective = __decorate([
        core_1.Directive({
            selector: ".js-slider"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], SlickDirective);
    return SlickDirective;
}());
exports.SlickDirective = SlickDirective;
//# sourceMappingURL=slick.directive.js.map