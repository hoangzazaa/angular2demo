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
var SF00202_Deal_model_1 = require("../model/SF00202_Deal.model");
var SF00202_Product_model_1 = require("../model/SF00202_Product.model");
var SF0020201DealInfoComponent = (function () {
    function SF0020201DealInfoComponent() {
        this.viewDealDetailRequest = new core_1.EventEmitter();
        this.bookmarkDealRequest = new core_1.EventEmitter();
        this.copyDealRequest = new core_1.EventEmitter();
        this.acceptedExtensions = ["JPG", "JPEG", "PNG", "GIF"];
    }
    SF0020201DealInfoComponent.prototype.requestViewDetailDeal = function (deal, isOpeningNewTab) {
        deal.isOpeningNewTab = isOpeningNewTab;
        this.viewDealDetailRequest.emit(deal);
    };
    // 使われない機能のため使用禁止 (trello: 1099)
    SF0020201DealInfoComponent.prototype.requestBookmarkDeal = function (deal) {
        this.bookmarkDealRequest.emit(deal);
    };
    SF0020201DealInfoComponent.prototype.copyAndAddDeal = function (deal) {
        this.copyDealRequest.emit(deal);
    };
    Object.defineProperty(SF0020201DealInfoComponent.prototype, "productInfo", {
        get: function () {
            var _this = this;
            var productInfo = new SF00202_Product_model_1.SF00202_Product();
            if (this.deal.products && this.deal.products.length > 0) {
                productInfo = this.deal.products.find(function (product) { return product.id === _this.deal.selectedProductId; });
            }
            return productInfo;
        },
        enumerable: true,
        configurable: true
    });
    SF0020201DealInfoComponent.prototype.getDealStatus = function (deal) {
        return deal.isClosed ? "終了" : data_util_1.default.getData(mst_data_type_1.DEAL_STATUS, constants_1.Constants.BLANK, deal.dealStatus);
    };
    SF0020201DealInfoComponent.prototype.getDealType = function (deal) {
        return data_util_1.default.getData(mst_data_type_1.DEAL_TYPE, constants_1.Constants.BLANK, deal.dealType);
    };
    SF0020201DealInfoComponent.prototype.getDateDeal = function (deal) {
        return deal.updatedDate || deal.createdDate;
    };
    SF0020201DealInfoComponent.prototype.getDescription = function () {
        return this.productInfo.getProductDescription(this.mstLaminations);
    };
    /*Format dimension display as 'size x depth x height'*/
    SF0020201DealInfoComponent.prototype.getDimension = function (product) {
        return product.getDimension();
    };
    /*Get the name of print method based on the key*/
    SF0020201DealInfoComponent.prototype.getPrintMethod = function (product) {
        return product.getPrintMethod();
    };
    SF0020201DealInfoComponent.prototype.getImpositionNumber = function (product) {
        return product.getImposition();
    };
    /*Format name of paper display as 'paper name + paper-weight'*/
    SF0020201DealInfoComponent.prototype.getPaperName = function (product) {
        return product.getPaperName(this.mstLaminations);
    };
    SF0020201DealInfoComponent.prototype.getColor = function (product) {
        return product.getColor();
    };
    SF0020201DealInfoComponent.prototype.getSurfaceTreatment = function (product) {
        return product.getSurfaceTreatment();
    };
    SF0020201DealInfoComponent.prototype.getLot = function (orderItem) {
        var lot = 0;
        this.deal.products.forEach(function (product) {
            if (orderItem.productId == product.id) {
                lot = product.lot;
            }
        });
        return lot;
    };
    SF0020201DealInfoComponent.prototype.getEstimatedUnitPrice = function (orderItem) {
        var estimatedUnitPrice = 0;
        this.deal.products.forEach(function (product) {
            if (orderItem.productId == product.id) {
                estimatedUnitPrice = product.estimatedUnitPrice;
            }
        });
        return estimatedUnitPrice;
    };
    SF0020201DealInfoComponent.prototype.getProductName = function (orderItem) {
        var productName = "";
        this.deal.products.forEach(function (product) {
            if (orderItem.productId == product.id) {
                productName = product.productName;
            }
        });
        return productName;
    };
    SF0020201DealInfoComponent.prototype.getQuantityStock = function (item) {
        var quantityStock = 0;
        this.deal.products.forEach(function (product) {
            if (item.productId == product.id) {
                quantityStock = product.quantityStock;
            }
        });
        return quantityStock;
    };
    SF0020201DealInfoComponent.prototype.countDelayDate = function (item) {
        var milisecondsPerDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var updateDate = new Date(item.updatedDate);
        var currentDate = new Date();
        return Math.round(Math.abs((currentDate.getTime() - updateDate.getTime()) / (milisecondsPerDay)));
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00202_Deal_model_1.SF00202_Deal)
    ], SF0020201DealInfoComponent.prototype, "deal", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0020201DealInfoComponent.prototype, "idx", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SF0020201DealInfoComponent.prototype, "mstLaminations", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SF0020201DealInfoComponent.prototype, "viewDealDetailRequest", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SF0020201DealInfoComponent.prototype, "bookmarkDealRequest", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SF0020201DealInfoComponent.prototype, "copyDealRequest", void 0);
    SF0020201DealInfoComponent = __decorate([
        core_1.Component({
            selector: "sf0020201-deal-info",
            templateUrl: "SF0020201.DealInfo.component.html",
            styleUrls: ["./SF0020201.component.css"]
        }), 
        __metadata('design:paramtypes', [])
    ], SF0020201DealInfoComponent);
    return SF0020201DealInfoComponent;
}());
exports.SF0020201DealInfoComponent = SF0020201DealInfoComponent;
//# sourceMappingURL=SF0020201.DealInfo.component.js.map