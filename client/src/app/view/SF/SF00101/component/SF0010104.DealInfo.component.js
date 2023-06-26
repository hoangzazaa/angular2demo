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
var constants_1 = require("../../../../helper/constants");
var mst_data_type_1 = require("../../../../helper/mst-data-type");
var data_util_1 = require("../../../../util/data-util");
var ProductInfo_model_1 = require("../../COMMON/productinfo/model/ProductInfo.model");
var SF001_Deal_1 = require("../model/SF001_Deal");
var SF00101_page_1 = require("../SF00101.page");
var SF0010104DealInfoComponent = (function () {
    function SF0010104DealInfoComponent(page) {
        this.page = page;
    }
    Object.defineProperty(SF0010104DealInfoComponent.prototype, "pageData", {
        get: function () {
            return this.page.pageService.pageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010104DealInfoComponent.prototype, "inprogressDeals", {
        get: function () {
            return this.pageData.inprogressDeals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010104DealInfoComponent.prototype, "updatedDate", {
        get: function () {
            return this.deal.updatedDate;
        },
        enumerable: true,
        configurable: true
    });
    SF0010104DealInfoComponent.prototype.onPageChange = function (pageIndex) {
    };
    Object.defineProperty(SF0010104DealInfoComponent.prototype, "productInfo", {
        get: function () {
            var _this = this;
            var productInfo = new ProductInfo_model_1.ProductInfoModel();
            if (this.deal.products && this.deal.products.length > 0) {
                productInfo = this.deal.products.find(function (product) { return product.id === _this.deal.selectedProductId; });
            }
            return productInfo;
        },
        enumerable: true,
        configurable: true
    });
    SF0010104DealInfoComponent.prototype.requestViewDetailDeal = function (deal) {
        this.page.viewDealDetail(deal.dealCode);
    };
    SF0010104DealInfoComponent.prototype.getDealStatus = function (deal) {
        return data_util_1.default.getData(mst_data_type_1.DEAL_STATUS, constants_1.Constants.BLANK, deal.dealStatus);
    };
    SF0010104DealInfoComponent.prototype.getDealType = function (deal) {
        return data_util_1.default.getData(mst_data_type_1.DEAL_TYPE, constants_1.Constants.BLANK, deal.dealType);
    };
    SF0010104DealInfoComponent.prototype.getDateDeal = function (deal) {
        return deal.updatedDate || deal.createdDate;
    };
    Object.defineProperty(SF0010104DealInfoComponent.prototype, "getDescription", {
        get: function () {
            var productDescription = this.productInfo.getProductDescription(this.pageData.mstLaminations);
            if (productDescription == "印刷なし") {
                return constants_1.Constants.BLANK;
            }
            else
                return productDescription;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0010104DealInfoComponent.prototype, "idx", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF001_Deal_1.DealModel)
    ], SF0010104DealInfoComponent.prototype, "deal", void 0);
    SF0010104DealInfoComponent = __decorate([
        core_1.Component({
            selector: 'sf0010104-dealInfo',
            templateUrl: 'SF0010104.DealInfo.component.html'
        }), 
        __metadata('design:paramtypes', [SF00101_page_1.SF00101Page])
    ], SF0010104DealInfoComponent);
    return SF0010104DealInfoComponent;
}());
exports.SF0010104DealInfoComponent = SF0010104DealInfoComponent;
//# sourceMappingURL=SF0010104.DealInfo.component.js.map