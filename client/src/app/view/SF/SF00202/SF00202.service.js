"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var common_service_1 = require("../../../service/common.service");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var SF00202_data_1 = require("./SF00202.data");
var SF00202_Deal_model_1 = require("./model/SF00202_Deal.model");
var constants_1 = require("../../../helper/constants");
var SF00202_Product_model_1 = require("./model/SF00202_Product.model");
var SF00202_OrderItems_model_1 = require("./model/SF00202_OrderItems.model");
var MstLamination_model_1 = require("../COMMON/model/MstLamination.model");
var SF00202Service = (function (_super) {
    __extends(SF00202Service, _super);
    function SF00202Service(http, router) {
        _super.call(this, http, router);
        this._pageData = new SF00202_data_1.SF00202Data();
    }
    Object.defineProperty(SF00202Service.prototype, "pageData", {
        get: function () {
            return this._pageData;
        },
        enumerable: true,
        configurable: true
    });
    SF00202Service.prototype.initData = function () {
        this._pageData = new SF00202_data_1.SF00202Data();
        return this.getResult(constants_1.Constants.FIRST_PAGE);
    };
    SF00202Service.prototype.getResult = function (pageIndex) {
        return this.pageData.advancedSearchFlg || this.pageData.hasAtLeastOneKeyword ?
            this.getSearchResult(pageIndex)
            : this.getLinearResult(pageIndex);
    };
    /**
     * Service to bookmark deal
     * @returns {Promise<void>}
     */
    // 使われない機能のため使用禁止 (trello: 1099)
    SF00202Service.prototype.bookmarkDeal = function (deal) {
        var req = { dealId: deal.id };
        return this.postApi("/SF0020202", req).then(function (res) {
            deal.isInMybox = res.data.myboxId > 0;
        });
    };
    SF00202Service.prototype.getLinearResult = function (page) {
        var self = this;
        var req = {
            indexFrom: ((page || constants_1.Constants.FIRST_PAGE) - 1) * self.pageData.CONSTANTS.PAGE_SIZE,
            indexTo: self.pageData.CONSTANTS.PAGE_SIZE
        };
        App.loader('show');
        return self.postApi("/SF0020201", req).then(function (res) {
            self.pageData.deals = (res.data.deals || []).map(function (dealData) { return self.parseDeal(dealData); });
            self.pageData.totalRecords = res.data.totalRecords || 0;
            self.pageData.currentPage = page;
            self.pageData.mstLaminations = (res.data.mstLaminations || []).map(function (item) {
                var lam = new MstLamination_model_1.MstLamination();
                lam.setData(item);
                return lam;
            });
            App.loader('hide');
        }, function (err) {
            App.loader('hide');
        });
    };
    /**
     * Service to get deals by search key on search input text
     * @returns {Promise<void>}
     */
    SF00202Service.prototype.getSearchResult = function (page) {
        var self = this;
        var req = self.parseToSearchRequest(self.pageData.ruleFilter);
        req.keywords = self.pageData.keywords;
        req.page = page || constants_1.Constants.FIRST_PAGE;
        req.pageSize = self.pageData.CONSTANTS.PAGE_SIZE;
        App.loader('show');
        return self.postApi("/SF0020204", req).then(function (res) {
            self.pageData.deals = (res.data.deals || []).map(function (item) { return self.parseDeal(item); });
            self.pageData.totalRecords = res.data.totalRecords || 0;
            self.pageData.currentPage = page;
            self.pageData.mstLaminations = (res.data.mstLaminations || []).map(function (item) {
                var lam = new MstLamination_model_1.MstLamination();
                lam.setData(item);
                return lam;
            });
            App.loader('hide');
        }, function (err) {
            App.loader('hide');
        });
    };
    SF00202Service.prototype.parseToSearchRequest = function (ruleFilter) {
        return {
            "dealCode": ruleFilter.dealCode,
            "dealName": ruleFilter.dealName,
            "salesName": ruleFilter.salesName,
            "dealType": ruleFilter.dealType,
            "customerCode": ruleFilter.customerCode,
            "customerName": ruleFilter.customerName,
            "contactName": ruleFilter.contactName,
            "productCode": ruleFilter.productCode,
            "productName": ruleFilter.productName,
            "shapeId": ruleFilter.shapeId,
            "productApplication": ruleFilter.productApplication,
            "sizeW": ruleFilter.sizeW,
            "sizeD": ruleFilter.sizeD,
            "sizeH": ruleFilter.sizeH,
            "paperName": ruleFilter.paperName,
            "printMethod": ruleFilter.printMethod,
            "orderValueFrom": ruleFilter.orderValueFrom,
            "orderValueTo": ruleFilter.orderValueTo,
            "orderLotFrom": ruleFilter.lotFrom,
            "orderLotTo": ruleFilter.lotTo,
            "periodType": ruleFilter.periodType,
            "periodFrom": ruleFilter.periodFrom,
            "dealStatus": ruleFilter.dealStatus,
            "periodTo": ruleFilter.periodTo
        };
    };
    SF00202Service.prototype.parseDeal = function (data) {
        var ret = new SF00202_Deal_model_1.SF00202_Deal();
        ret.id = data["id"];
        ret.createdUser = data["createdUser"];
        ret.updatedUser = data["updatedUser"];
        ret.createdDate = data["createdDate"] ? new Date(data["createdDate"]) : undefined;
        ret.updatedDate = data["updatedDate"] ? new Date(data["updatedDate"]) : undefined;
        ret.dealCode = data["dealCode"];
        ret.saleName = data["saleName"];
        ret.dealName = data["dealName"];
        ret.dealType = data["dealType"];
        ret.dealStatus = data["dealStatus"];
        ret.customerName = data["customerName"];
        ret.isInMybox = data["isInMybox"];
        ret.closedFlag = data["closedFlag"];
        ret.deliveryDate = data["deliveryDate"];
        ret.images = data["images"] ? data["images"] : [];
        ret.estTotalDeal = data["estTotalDeal"];
        ret.products = (data["products"] || []).map(function (productData) { return parseProduct(productData); });
        ret.orderItems = (data["orderItems"] || []).map(function (orderData) { return parseOrderItem(orderData); });
        ret.selectedProductId = data["selectedProductId"];
        ret.isEdit = data["isEdit"];
        return ret;
        function parseProduct(data) {
            var ret = new SF00202_Product_model_1.SF00202_Product();
            ret.setData(data);
            return ret;
        }
        function parseOrderItem(data) {
            var ret = new SF00202_OrderItems_model_1.SF00202_OrderItems();
            ret.id = data["id"];
            ret.createdUser = data["createdUser"];
            ret.updatedUser = data["updatedUser"];
            ret.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
            ret.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
            ret.productId = data["productId"];
            ret.quantity = data["quantity"];
            ret.submittedPrice = data["submittedPrice"];
            ret.total = data["total"];
            return ret;
        }
    };
    SF00202Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00202Service);
    return SF00202Service;
}(common_service_1.CommonService));
exports.SF00202Service = SF00202Service;
//# sourceMappingURL=SF00202.service.js.map