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
var format_util_1 = require("../../../../util/format-util");
var DealModel_1 = require("../../COMMON/dealinfo/model/DealModel");
var SF0030701QuotationInfor = (function () {
    function SF0030701QuotationInfor() {
        this.emitViewQuotationInfo = new core_1.EventEmitter();
        this.emitFindDataProductInfo = new core_1.EventEmitter();
    }
    SF0030701QuotationInfor.prototype.viewQuotationInfo = function (quotation) {
        this.emitViewQuotationInfo.emit(quotation.quotationCode);
    };
    SF0030701QuotationInfor.prototype.viewDataProductInfo = function (quotation) {
        this.emitFindDataProductInfo.emit(quotation.id);
    };
    SF0030701QuotationInfor.prototype.unitPrice = function (quotation) {
        if (quotation.unitPrice) {
            return '@' + format_util_1.FormatUtil.formatNumber(quotation.unitPrice);
        }
        return '';
    };
    SF0030701QuotationInfor.prototype.totalCost = function (quotation) {
        if (quotation.totalCost) {
            return format_util_1.FormatUtil.formatNumber(quotation.totalCost) + '円';
        }
        return '';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SF0030701QuotationInfor.prototype, "quotations", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', DealModel_1.DealInfoModel)
    ], SF0030701QuotationInfor.prototype, "dealInfo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030701QuotationInfor.prototype, "emitViewQuotationInfo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030701QuotationInfor.prototype, "emitFindDataProductInfo", void 0);
    SF0030701QuotationInfor = __decorate([
        core_1.Component({
            selector: "quotation-information",
            templateUrl: "SF0030701.QuotationInfor.component.html"
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030701QuotationInfor);
    return SF0030701QuotationInfor;
}());
exports.SF0030701QuotationInfor = SF0030701QuotationInfor;
//# sourceMappingURL=SF0030701.QuotationInfor.component.js.map