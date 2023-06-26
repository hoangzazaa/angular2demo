/**
 * Created by manhnv on 6/14/2017.
 */
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
var mst_data_type_1 = require("../../../../helper/mst-data-type");
var data_util_1 = require("../../../../util/data-util");
var CC00100_service_1 = require("../../../CC/CC00100/CC00100.service");
var SF00205_Deal_model_1 = require("../model/SF00205_Deal.model");
var SF00205_Product_model_1 = require("../model/SF00205_Product.model");
var SF00205_service_1 = require("../SF00205.service");
var constants_1 = require("../../../../helper/constants");
var SF0020502DealInfoComponent = (function () {
    function SF0020502DealInfoComponent(authService, service) {
        this.authService = authService;
        this.service = service;
        this.viewDeal = new core_1.EventEmitter();
        this.bookmarkDeal = new core_1.EventEmitter();
        this.copyDeal = new core_1.EventEmitter();
    }
    Object.defineProperty(SF0020502DealInfoComponent.prototype, "pageData", {
        get: function () {
            return this.service.pageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020502DealInfoComponent.prototype, "product", {
        get: function () {
            var _this = this;
            var productInfo = new SF00205_Product_model_1.SF00205Product();
            if (Array.isArray(this.deal.products) && this.deal.products.length > 0) {
                productInfo = this.deal.products.find(function (product) { return product.id === _this.deal.selectedProductId; });
            }
            return productInfo;
        },
        enumerable: true,
        configurable: true
    });
    SF0020502DealInfoComponent.prototype.getDealStatus = function (deal) {
        return data_util_1.default.getData(mst_data_type_1.DEAL_STATUS, null, deal.dealStatus);
    };
    SF0020502DealInfoComponent.prototype.getDealType = function (deal) {
        return data_util_1.default.getData(mst_data_type_1.DEAL_TYPE, constants_1.Constants.BLANK, deal.dealType);
    };
    SF0020502DealInfoComponent.prototype.getDateDeal = function (deal) {
        return deal.updatedDate || deal.createdDate;
    };
    SF0020502DealInfoComponent.prototype.requestViewDetailDeal = function (deal, isOpeningNewTab) {
        deal.isOpeningNewTab = isOpeningNewTab;
        this.viewDeal.emit(deal);
    };
    SF0020502DealInfoComponent.prototype.requestBookmarkDeal = function (deal) {
        this.bookmarkDeal.emit(deal);
    };
    SF0020502DealInfoComponent.prototype.requestCopyDeal = function (deal) {
        this.copyDeal.emit(deal);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0020502DealInfoComponent.prototype, "idx", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00205_Deal_model_1.SF00205Deal)
    ], SF0020502DealInfoComponent.prototype, "deal", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0020502DealInfoComponent.prototype, "viewDeal", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0020502DealInfoComponent.prototype, "bookmarkDeal", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0020502DealInfoComponent.prototype, "copyDeal", void 0);
    SF0020502DealInfoComponent = __decorate([
        core_1.Component({
            selector: "sf0020502-dealInfo",
            templateUrl: "SF0020502DealInfo.component.html"
        }), 
        __metadata('design:paramtypes', [CC00100_service_1.CC00100Service, SF00205_service_1.SF00205Service])
    ], SF0020502DealInfoComponent);
    return SF0020502DealInfoComponent;
}());
exports.SF0020502DealInfoComponent = SF0020502DealInfoComponent;
//# sourceMappingURL=SF0020502DealInfo.component.js.map