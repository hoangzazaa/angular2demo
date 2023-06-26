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
var SF00501_Deal_model_1 = require("../model/SF00501_Deal.model");
var SF00501_page_1 = require("../SF00501.page");
/**
 * Created by manhnv on 3/28/2017.
 */
var SF0050107Component = (function () {
    function SF0050107Component(page) {
        this.page = page;
        this.deal = new SF00501_Deal_model_1.DealModel();
        this.deal.productIds = [];
        this.deal.products = [];
    }
    SF0050107Component.prototype.ngOnInit = function () {
        var _this = this;
        //1. Get list products by productIds
        this.deal.products = this.page.pageData.products.filter(function (item) {
            // check item productId in productId
            return $.inArray(item.id, _this.deal.productIds) >= 0;
        }) || [];
        //2. Sort theo updatedDate
        this.deal.products.sort(function (item1, item2) {
            if (item1.updatedDate > item2.updatedDate) {
                return -1;
            }
            else if (item1.updatedDate == item2.updatedDate) {
                return 0;
            }
            else {
                return 1;
            }
        });
        this.productInfo = new ProductInfo_model_1.ProductInfoModel();
        //3.1 check highlightFlag
        this.productInfo = this.deal.products.find(function (product) {
            return product.id === _this.deal.selectedProductId;
        });
        //3.2 else one array
        if (!this.productInfo && this.deal.products.length > 0) {
            this.productInfo = this.deal.products[0];
        }
        else if (!this.productInfo) {
            this.productInfo = new ProductInfo_model_1.ProductInfoModel();
        }
    };
    SF0050107Component.prototype.requestViewDetailDeal = function () {
        this.page.dealDetail(this.deal.dealId);
    };
    SF0050107Component.prototype.getDealStatus = function (deal) {
        return deal.isClosed ? "終了" : data_util_1.default.getData(mst_data_type_1.DEAL_STATUS, constants_1.Constants.BLANK, deal.dealStatus);
    };
    SF0050107Component.prototype.getDealType = function () {
        return data_util_1.default.getData(mst_data_type_1.DEAL_TYPE, constants_1.Constants.BLANK, this.deal.dealType);
    };
    /*Format dimension display as 'size x depth x height'*/
    SF0050107Component.prototype.getDimension = function (product) {
        return product.getDimension();
    };
    /*Get the name of print method based on the key*/
    SF0050107Component.prototype.getPrintMethod = function (product) {
        return product.getPrintMethod();
    };
    /*Format name of paper display as 'paper name + paper-weight'*/
    SF0050107Component.prototype.getPaperName = function (product) {
        if (!!product)
            return product.getPaperName(this.page.pageData.mstLaminations);
        return null;
    };
    SF0050107Component.prototype.getLot = function (orderItem) {
        var lot = 0;
        this.deal.products.forEach(function (product) {
            if (orderItem.productId == product.id) {
                lot = product.lot;
            }
        });
        return lot;
    };
    SF0050107Component.prototype.getEstimatedUnitPrice = function (orderItem) {
        var estimatedUnitPrice = 0;
        this.deal.products.forEach(function (product) {
            if (orderItem.productId == product.id) {
                estimatedUnitPrice = product.estimatedUnitPrice;
            }
        });
        return estimatedUnitPrice;
    };
    SF0050107Component.prototype.getProductName = function (orderItem) {
        var productName = "";
        this.deal.products.forEach(function (product) {
            if (orderItem.productId == product.id) {
                productName = product.productName;
            }
        });
        return productName;
    };
    SF0050107Component.prototype.getQuantityStock = function (item) {
        var quantityStock = 0;
        this.deal.products.forEach(function (product) {
            if (item.productId == product.id) {
                quantityStock = product.quantityStock;
            }
        });
        return quantityStock;
    };
    SF0050107Component.prototype.countDelayDate = function (item) {
        var miniSecondsPerDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*miniSeconds
        var updateDate = new Date(item.updatedDate);
        var currentDate = new Date();
        return Math.round(Math.abs((currentDate.getTime() - updateDate.getTime()) / (miniSecondsPerDay)));
    };
    SF0050107Component.prototype.getDescription = function () {
        return this.productInfo.getProductDescription(this.page.pageData.mstLaminations);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0050107Component.prototype, "index", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00501_Deal_model_1.DealModel)
    ], SF0050107Component.prototype, "deal", void 0);
    SF0050107Component = __decorate([
        core_1.Component({
            selector: "[sf0050107]",
            templateUrl: "SF0050107.Deal.component.html",
            styleUrls: ["SF0050107.Deal.component.css"]
        }), 
        __metadata('design:paramtypes', [SF00501_page_1.SF00501Page])
    ], SF0050107Component);
    return SF0050107Component;
}());
exports.SF0050107Component = SF0050107Component;
//# sourceMappingURL=SF0050107.Deal.component.js.map