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
var SF00301_ProductFile_model_1 = require("../model/SF00301_ProductFile.model");
var SF0030108Component = (function () {
    function SF0030108Component() {
        this.requestRemoveProductFile = new core_1.EventEmitter();
        this.requestViewProductInfo = new core_1.EventEmitter();
    }
    SF0030108Component.prototype.viewInfo = function () {
        if (!this.canViewDetailed || !this.canRemove)
            return;
        this.requestViewProductInfo.emit(this.item);
    };
    SF0030108Component.prototype.removeProductFile = function () {
        this.requestRemoveProductFile.emit(this.item);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0030108Component.prototype, "index", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00301_ProductFile_model_1.SF00301_ProductFile)
    ], SF0030108Component.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SF0030108Component.prototype, "canRemove", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SF0030108Component.prototype, "canViewDetailed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030108Component.prototype, "requestRemoveProductFile", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030108Component.prototype, "requestViewProductInfo", void 0);
    SF0030108Component = __decorate([
        core_1.Component({
            selector: "div[sf0030108-productFileInfo]",
            templateUrl: "SF0030108.ProductFileInfo.component.html"
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030108Component);
    return SF0030108Component;
}());
exports.SF0030108Component = SF0030108Component;
//# sourceMappingURL=SF0030108.ProductFileInfo.component.js.map