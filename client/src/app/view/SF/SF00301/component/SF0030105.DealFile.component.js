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
var SF00301_DealFile_model_1 = require("../model/SF00301_DealFile.model");
var SF0030105Component = (function () {
    function SF0030105Component() {
        this.requestRemoveDealFile = new core_1.EventEmitter();
        this.requestViewDealFileInfo = new core_1.EventEmitter();
    }
    SF0030105Component.prototype.removeDealFile = function () {
        this.requestRemoveDealFile.emit(this.item);
    };
    SF0030105Component.prototype.viewDetailDealFile = function () {
        if (!this.canViewDetailed || !this.canRemove)
            return;
        this.requestViewDealFileInfo.emit(this.item);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0030105Component.prototype, "index", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00301_DealFile_model_1.SF00301_DealFile)
    ], SF0030105Component.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SF0030105Component.prototype, "canRemove", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SF0030105Component.prototype, "canViewDetailed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030105Component.prototype, "requestRemoveDealFile", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030105Component.prototype, "requestViewDealFileInfo", void 0);
    SF0030105Component = __decorate([
        core_1.Component({
            selector: "div[sf0030105-dealFile]",
            templateUrl: "SF0030105.DealFile.component.html"
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030105Component);
    return SF0030105Component;
}());
exports.SF0030105Component = SF0030105Component;
//# sourceMappingURL=SF0030105.DealFile.component.js.map