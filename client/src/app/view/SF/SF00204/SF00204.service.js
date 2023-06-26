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
var constants_1 = require("../../../helper/constants");
var SF00204_data_1 = require("./SF00204.data");
var ProductInfo_model_1 = require("../COMMON/productinfo/model/ProductInfo.model");
var Transaction_model_1 = require("../COMMON/productinfo/model/Transaction.model");
var Inventory_model_1 = require("../COMMON/productinfo/model/Inventory.model");
var ProductBox_model_1 = require("../COMMON/productinfo/model/ProductBox.model");
var MstLamination_model_1 = require("../COMMON/model/MstLamination.model");
var SF00204Service = (function (_super) {
    __extends(SF00204Service, _super);
    function SF00204Service(http, router) {
        _super.call(this, http, router);
    }
    //1. init
    SF00204Service.prototype.initData = function () {
        this.pageData = new SF00204_data_1.SF00204Data();
        return this.getResult(constants_1.Constants.FIRST_PAGE);
    };
    //2. search
    SF00204Service.prototype.getResult = function (pageIndex) {
        // create page data
        return this.pageData.advancedSearchFlg || this.pageData.hasAtLeastOneKeyword ?
            this.getSearchResult(pageIndex)
            : this.getLinearResult(pageIndex);
    };
    //3. add product to deal
    SF00204Service.prototype.addProductToDeal = function (productId, dealCodeBefore, dealCodeAfter) {
        var req = {
            productId: productId,
            dealCodeBefore: dealCodeBefore,
            dealCodeAfter: dealCodeAfter
        };
        return this.postApi("/SF0020403", req).then(function (res) {
        }).catch(function (err) {
            throw err;
        });
    };
    /**
     * Service to get deals by search key on search input text
     * @returns {Promise<void>}
     */
    SF00204Service.prototype.getSearchResult = function (page) {
        var _this = this;
        var self = this;
        var req = self.parseToSearchRequest(self.pageData.ruleFilter);
        req.keywords = self.pageData.keywords;
        req.page = page || constants_1.Constants.FIRST_PAGE;
        req.pageSize = self.pageData.CONSTANTS.PAGE_SIZE;
        return self.postApi("/SF0020402", req)
            .then(function (res) {
            var data = res.data;
            self.pageData.productBoxs = [];
            var productBoxs = data["productBoxes"];
            if (productBoxs) {
                for (var _i = 0, productBoxs_1 = productBoxs; _i < productBoxs_1.length; _i++) {
                    var productBox = productBoxs_1[_i];
                    var productBoxTmp = new ProductBox_model_1.ProductBoxModel();
                    productBoxTmp.product = _this.parseProduct(productBox["product"]);
                    productBoxTmp.transactions = _this.parseTransaction(productBox["transactions"]);
                    productBoxTmp.inventory = _this.parseInventory(productBox["inventory"]);
                    productBoxTmp.dealCode = productBox["dealCode"];
                    self.pageData.productBoxs.push(productBoxTmp);
                }
            }
            self.pageData.totalRecords = data.totalRecords || 0;
            self.pageData.currentPage = page;
            // get list mst lamination
            if (!!data["laminationJsons"]) {
                for (var _a = 0, _b = data["laminationJsons"]; _a < _b.length; _a++) {
                    var lamination = _b[_a];
                    var mstLamination = new MstLamination_model_1.MstLamination();
                    mstLamination.setData(lamination);
                    self.pageData.mstLaminations.push(mstLamination);
                }
            }
        }).catch(function (err) {
            throw err;
        });
    };
    SF00204Service.prototype.getLinearResult = function (page) {
        var _this = this;
        var self = this;
        var req = {
            indexFrom: ((page || constants_1.Constants.FIRST_PAGE) - 1) * self.pageData.CONSTANTS.PAGE_SIZE,
            indexTo: self.pageData.CONSTANTS.PAGE_SIZE
        };
        return self.postApi("/SF0020401", req)
            .then(function (res) {
            var data = res.data;
            self.pageData.productBoxs = [];
            var productBoxs = data["productBoxes"];
            if (productBoxs) {
                for (var _i = 0, productBoxs_2 = productBoxs; _i < productBoxs_2.length; _i++) {
                    var productBox = productBoxs_2[_i];
                    var productBoxTmp = new ProductBox_model_1.ProductBoxModel();
                    productBoxTmp.product = _this.parseProduct(productBox["product"]);
                    productBoxTmp.transactions = _this.parseTransaction(productBox["transactions"]);
                    productBoxTmp.inventory = _this.parseInventory(productBox["inventory"]);
                    productBoxTmp.dealCode = productBox["dealCode"];
                    self.pageData.productBoxs.push(productBoxTmp);
                }
            }
            self.pageData.totalRecords = data.totalRecords || 0;
            self.pageData.currentPage = page;
            // get list mst lamination
            if (!!data["laminationJsons"]) {
                for (var _a = 0, _b = data["laminationJsons"]; _a < _b.length; _a++) {
                    var lamination = _b[_a];
                    var mstLamination = new MstLamination_model_1.MstLamination();
                    mstLamination.setData(lamination);
                    self.pageData.mstLaminations.push(mstLamination);
                }
            }
        }).catch(function (err) {
            throw err;
        });
    };
    SF00204Service.prototype.parseToSearchRequest = function (ruleFilter) {
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
            "periodTo": ruleFilter.periodTo,
            "customerProductCode": ruleFilter.customerProductCode
        };
    };
    SF00204Service.prototype.parseProduct = function (product) {
        var pd = new ProductInfo_model_1.ProductInfoModel();
        if (!!product) {
            pd.setData(product);
        }
        return pd;
    };
    SF00204Service.prototype.parseTransaction = function (transactions) {
        var arrTransactions = [];
        if (transactions) {
            for (var _i = 0, transactions_1 = transactions; _i < transactions_1.length; _i++) {
                var transaction = transactions_1[_i];
                var transactionTmp = new Transaction_model_1.TransactionModel();
                transactionTmp.productId = transaction["productId"];
                transactionTmp.updatedDate = transaction["updatedDate"] == null ? null : new Date(transaction["updatedDate"]);
                transactionTmp.dealName = transaction["dealName"];
                transactionTmp.quantity = transaction["quantity"];
                transactionTmp.submittedPrice = transaction["submittedPrice"];
                transactionTmp.total = transaction["total"];
                arrTransactions.push(transactionTmp);
            }
        }
        return arrTransactions;
    };
    SF00204Service.prototype.parseInventory = function (inventory) {
        var invenModel = new Inventory_model_1.InventoryModel();
        if (inventory) {
            invenModel.productName = inventory['productName'];
            invenModel.quantity = inventory['quantity'];
            invenModel.unitPrice = inventory['unitPrice'];
            invenModel.days = inventory['days'];
        }
        return invenModel;
    };
    SF00204Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00204Service);
    return SF00204Service;
}(common_service_1.CommonService));
exports.SF00204Service = SF00204Service;
//# sourceMappingURL=SF00204.service.js.map