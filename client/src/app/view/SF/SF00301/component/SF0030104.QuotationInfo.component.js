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
var SF00301_Quotation_model_1 = require("../model/SF00301_Quotation.model");
var SF0030104Component = (function () {
    function SF0030104Component() {
        this.requestRemoveQuotation = new core_1.EventEmitter();
        this.requestViewQuotationInfo = new core_1.EventEmitter();
        this.requestHighlightFlag = new core_1.EventEmitter();
    }
    Object.defineProperty(SF0030104Component.prototype, "interestRate", {
        get: function () {
            return this.item.interestRate || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030104Component.prototype, "submittedTotal", {
        get: function () {
            return this.item.totalCost;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030104Component.prototype, "lot", {
        get: function () {
            return this.item.lot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030104Component.prototype, "submittedUnitPrice", {
        get: function () {
            return this.item.unitPrice;
        },
        enumerable: true,
        configurable: true
    });
    SF0030104Component.prototype.updateHighlightFlag = function () {
        this.requestHighlightFlag.emit(this.item);
    };
    SF0030104Component.prototype.navigateSF00303 = function () {
        if (!this.canViewDetailed)
            return;
        this.requestViewQuotationInfo.emit(this.item);
    };
    SF0030104Component.prototype.removeMe = function () {
        this.requestRemoveQuotation.emit(this.item);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00301_Quotation_model_1.SF00301_Quotation)
    ], SF0030104Component.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0030104Component.prototype, "index", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SF0030104Component.prototype, "canViewDetailed", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SF0030104Component.prototype, "canRemove", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030104Component.prototype, "requestRemoveQuotation", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030104Component.prototype, "requestViewQuotationInfo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030104Component.prototype, "requestHighlightFlag", void 0);
    SF0030104Component = __decorate([
        core_1.Component({
            selector: "div[sf0030104-quotationInfo]",
            templateUrl: "SF0030104.QuotationInfo.component.html"
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030104Component);
    return SF0030104Component;
}());
exports.SF0030104Component = SF0030104Component;
//# sourceMappingURL=SF0030104.QuotationInfo.component.js.map