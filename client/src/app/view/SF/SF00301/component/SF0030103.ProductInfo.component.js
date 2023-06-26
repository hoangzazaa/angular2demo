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
var SF00301_Deal_model_1 = require("../model/SF00301_Deal.model");
var SF00301_Product_model_1 = require("../model/SF00301_Product.model");
var SF00301_service_1 = require("../SF00301.service");
var SF0030103Component = (function () {
    function SF0030103Component(sf00301Service) {
        this.sf00301Service = sf00301Service;
        this.requestDetachProduct = new core_1.EventEmitter();
        this.requestViewProductInfo = new core_1.EventEmitter();
        this.requestHighlightFlag = new core_1.EventEmitter();
    }
    SF0030103Component.prototype.ngOnInit = function () {
        var _this = this;
        if (this.orderItems) {
            this.orderItems = this.orderItems.filter(function (item) {
                return item.productId == _this.item.id;
            });
        }
    };
    SF0030103Component.prototype.viewProductInfo = function () {
        if (!this.canViewDetailed)
            return;
        this.requestViewProductInfo.emit(this.item);
    };
    SF0030103Component.prototype.detachMe = function () {
        this.requestDetachProduct.emit(this.item);
    };
    SF0030103Component.prototype.updateHighlightFlag = function () {
        this.requestHighlightFlag.emit(this.item);
    };
    SF0030103Component.prototype.countDelayDate = function (item) {
        var milisecondsPerDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var updateDate = new Date(item.updatedDate);
        var currentDate = new Date();
        return Math.round(Math.abs((currentDate.getTime() - updateDate.getTime()) / (milisecondsPerDay)));
    };
    /*Format name of paper display as 'paper name + paper-weight'*/
    SF0030103Component.prototype.getPaperName = function (product) {
        return product.getPaperName(this.mstLaminations);
    };
    SF0030103Component.prototype.productLabel = function (product) {
        if (product.productType == 0 && product.shapeId == 98) {
            return "美粧";
        }
        else if (product.productType == 0 && product.shapeId == 100) {
            return "片段";
        }
        else if (product.productType == 1 && product.cartonShippingType == 1) {
            return "A式以外段ボール";
        }
        else if (product.productType == 1) {
            return "段ボール";
        }
        else {
            return "紙器・貼合";
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00301_Product_model_1.SF00301_Product)
    ], SF0030103Component.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SF0030103Component.prototype, "canRemove", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SF0030103Component.prototype, "canViewDetailed", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0030103Component.prototype, "index", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00301_Deal_model_1.SF00301_Deal)
    ], SF0030103Component.prototype, "deal", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SF0030103Component.prototype, "orderItems", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SF0030103Component.prototype, "mstLaminations", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030103Component.prototype, "requestDetachProduct", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030103Component.prototype, "requestViewProductInfo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030103Component.prototype, "requestHighlightFlag", void 0);
    SF0030103Component = __decorate([
        core_1.Component({
            selector: "div[sf0030103-dealProductInfo]",
            templateUrl: "SF0030103.ProductInfo.component.html"
        }), 
        __metadata('design:paramtypes', [SF00301_service_1.SF00301Service])
    ], SF0030103Component);
    return SF0030103Component;
}());
exports.SF0030103Component = SF0030103Component;
//# sourceMappingURL=SF0030103.ProductInfo.component.js.map