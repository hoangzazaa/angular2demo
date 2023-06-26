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
 * Created by username on 3/10/2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var format_util_1 = require("../../../../util/format-util");
var SF00203_Deal_model_1 = require("../model/SF00203_Deal.model");
var mst_data_type_1 = require("../../../../helper/mst-data-type");
var data_util_1 = require("../../../../util/data-util");
var constants_1 = require("../../../../helper/constants");
var validator_util_1 = require("../../../../util/validator-util");
var SF00203Component = (function () {
    function SF00203Component(router) {
        this.router = router;
        this.viewDealDetailRequest = new core_1.EventEmitter();
        this.copyDealRequest = new core_1.EventEmitter();
    }
    //TODO - comment at the moment
    // /**
    //  * Method use to rotate image when user click on image.
    //  * @param itemIdx the index of the image
    //  */
    // rotateImg(itemIdx: number) {
    //     let img = $('#img' + itemIdx);
    //     if (img.hasClass('north')) {
    //         img.toggleClass('north west');
    //     } else if (img.hasClass('west')) {
    //         img.toggleClass('west south');
    //     } else if (img.hasClass('south')) {
    //         img.toggleClass('south east');
    //     } else if (img.hasClass('east')) {
    //         img.toggleClass('east north');
    //     }
    // }
    SF00203Component.prototype.getLot = function (orderItem) {
        var lot = 0;
        this.deal.products.forEach(function (product) {
            if (orderItem.productId == product.id) {
                lot = product.lot;
            }
        });
        return lot;
    };
    SF00203Component.prototype.getEstimatedUnitPrice = function (orderItem) {
        var estimatedUnitPrice = 0;
        this.deal.products.forEach(function (product) {
            if (orderItem.productId == product.id) {
                estimatedUnitPrice = product.estimatedUnitPrice;
            }
        });
        return estimatedUnitPrice;
    };
    SF00203Component.prototype.getProductName = function (orderItem) {
        var productName = "";
        this.deal.products.forEach(function (product) {
            if (orderItem.productId == product.id) {
                productName = product.productName;
            }
        });
        return productName;
    };
    SF00203Component.prototype.getDealStatus = function (deal) {
        return data_util_1.default.getData(mst_data_type_1.DEAL_STATUS, constants_1.Constants.BLANK, deal.dealStatus);
    };
    SF00203Component.prototype.getDealType = function (deal) {
        return data_util_1.default.getData(mst_data_type_1.DEAL_TYPE, constants_1.Constants.BLANK, deal.dealType);
    };
    SF00203Component.prototype.getDateDeal = function (deal) {
        return deal.updatedDate || deal.createdDate;
    };
    /*Format dimension display as 'size x depth x height'*/
    SF00203Component.prototype.getDimension = function (product) {
        if (!!product)
            return format_util_1.FormatUtil.formatDimension(constants_1.Constants.X_SEPARATOR, product.sizeW, product.sizeD, product.sizeH);
        return constants_1.Constants.BLANK;
    };
    /*Get the name of print method based on the key*/
    SF00203Component.prototype.getPrintMethod = function (product) {
        return data_util_1.default.getData(mst_data_type_1.PRINT_METHOD, constants_1.Constants.BLANK, product.printMethod);
    };
    /*Format name of paper display as 'paper name + paper-weight'*/
    SF00203Component.prototype.getPaperName = function (product) {
        return format_util_1.FormatUtil.formatPaperName_V1(product);
    };
    SF00203Component.prototype.getImpositionNumber = function (product) {
        if (validator_util_1.default.isNotEmpty(product.impositionNumber))
            return product.impositionNumber + constants_1.Constants.IMPOSITION_SIGN;
        return constants_1.Constants.BLANK;
    };
    SF00203Component.prototype.getColor = function (product) {
        return "オフ表 " + format_util_1.FormatUtil.isNaN(product.colorFSelect - 1) + " 色";
    };
    SF00203Component.prototype.getSurfaceTreatment = function (product) {
        return data_util_1.default.getData(mst_data_type_1.SURFACE_TREATMENT, constants_1.Constants.BLANK, product.varnishType);
    };
    SF00203Component.prototype.requestViewDetailDeal = function (deal) {
        this.viewDealDetailRequest.emit(deal);
    };
    SF00203Component.prototype.copyAndAddDeal = function (deal) {
        this.copyDealRequest.emit(deal);
    };
    SF00203Component.prototype.countDelayDate = function (item) {
        var milisecondsPerDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var updateDate = new Date(item.updatedDate);
        var currentDate = new Date();
        return Math.round(Math.abs((currentDate.getTime() - updateDate.getTime()) / (milisecondsPerDay)));
    };
    SF00203Component.prototype.getQuantityStock = function (item) {
        var quantityStock = 0;
        this.deal.products.forEach(function (product) {
            if (item.productId == product.id) {
                quantityStock = product.quantityStock;
            }
        });
        return quantityStock;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF00203Component.prototype, "idx", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00203_Deal_model_1.SF00203_Deal)
    ], SF00203Component.prototype, "deal", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SF00203Component.prototype, "viewDealDetailRequest", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SF00203Component.prototype, "copyDealRequest", void 0);
    SF00203Component = __decorate([
        core_1.Component({
            selector: "deal-detail",
            templateUrl: "SF00203.component.html",
            styleUrls: ["./SF00203.component.css"]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], SF00203Component);
    return SF00203Component;
}());
exports.SF00203Component = SF00203Component;
//# sourceMappingURL=SF00203.component.js.map