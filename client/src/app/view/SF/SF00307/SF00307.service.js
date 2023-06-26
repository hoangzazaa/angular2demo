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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var common_service_1 = require("../../../service/common.service");
var SF00307_data_1 = require("./SF00307.data");
var DealModel_1 = require("../COMMON/dealinfo/model/DealModel");
var Quotation_model_1 = require("./model/Quotation.model");
var ProductBox_model_1 = require("./model/ProductBox.model");
var ProductInfo_model_1 = require("../COMMON/productinfo/model/ProductInfo.model");
var Transaction_model_1 = require("../COMMON/productinfo/model/Transaction.model");
var Inventory_model_1 = require("../COMMON/productinfo/model/Inventory.model");
var ShippingDestination_model_1 = require("./model/ShippingDestination.model");
var ShippingInstruction_model_1 = require("./model/ShippingInstruction.model");
var mst_data_type_1 = require("../../../helper/mst-data-type");
var SF00307Service = (function (_super) {
    __extends(SF00307Service, _super);
    function SF00307Service(http, router) {
        _super.call(this, http, router);
    }
    Object.defineProperty(SF00307Service.prototype, "pageData", {
        get: function () {
            return this._pageData;
        },
        enumerable: true,
        configurable: true
    });
    //1. get init data
    SF00307Service.prototype.initData = function (dealCode) {
        var _this = this;
        return this.getApi("SF0030701/" + dealCode).then(function (res) {
            _this._pageData = new SF00307_data_1.SF00307Data();
            var data = res.data;
            //1. deal info
            var dealInfo = data['deal'];
            _this.pageData.dealInfo = new DealModel_1.DealInfoModel();
            if (dealInfo) {
                _this.pageData.dealInfo.dealId = dealInfo["id"];
                _this.pageData.dealInfo.dealName = dealInfo["dealName"];
                _this.pageData.dealInfo.dealCode = dealInfo["dealCode"];
                _this.pageData.dealInfo.dealType = dealInfo["dealType"];
                _this.pageData.dealInfo.estimateTotal = dealInfo["estTotalDeal"];
                _this.pageData.dealInfo.dealStatus = dealInfo["dealStatus"];
                _this.pageData.dealInfo.deliveryDate = !!dealInfo["deliveryDate"] ? new Date(dealInfo["deliveryDate"]) : undefined;
                _this.pageData.dealInfo.templateFlag = dealInfo["templateFlag"];
                _this.pageData.dealInfo.closedFlag = dealInfo["closedFlag"];
                _this.pageData.dealInfo.customerName = dealInfo["customerName"];
                _this.pageData.dealInfo.customerCode = dealInfo["customerCode"];
                _this.pageData.dealInfo.saleName = dealInfo["salerName"];
            }
            //2. get list quotations by dealId
            var quotations = data['quotations'];
            _this.pageData.quotations = [];
            if (quotations) {
                for (var _i = 0, quotations_1 = quotations; _i < quotations_1.length; _i++) {
                    var quotation = quotations_1[_i];
                    var quotationTmp = new Quotation_model_1.QuotationModel();
                    quotationTmp.id = quotation['id'];
                    quotationTmp.interestRate = quotation['interestRate'];
                    quotationTmp.memo = quotation['memo'];
                    quotationTmp.quotationCode = quotation['quotationCode'];
                    quotationTmp.subject = quotation['subject'];
                    quotationTmp.lot = quotation['lot'];
                    quotationTmp.unitPrice = quotation['unitPrice'];
                    quotationTmp.totalCost = quotation['totalCost'];
                    _this.pageData.quotations.push(quotationTmp);
                }
            }
            //6.  mst shipping detination
            _this.pageData.shippingHistory = (data["shippingHistory"] || [])
                .map(function (item) {
                var shippingParse = new ShippingDestination_model_1.ShippingDestinationModel();
                shippingParse.setShippingDestination(item);
                if (!shippingParse.timePermission) {
                    shippingParse.timePermission = 10;
                }
                return shippingParse;
            });
            if (_this.pageData.shippingHistory.length > 0) {
                _this.selectShippingDestination(_this.pageData.shippingHistory[0]);
                _this.pageData._selectShipment = _this.pageData.shippingHistory[0];
            }
            else {
                _this.selectShippingDestination(null);
                _this.pageData._selectShipment = null;
            }
            //3. product box
            var productBoxes = data['productBoxes'];
            _this.pageData.productBoxs = [];
            if (productBoxes) {
                for (var _a = 0, productBoxes_1 = productBoxes; _a < productBoxes_1.length; _a++) {
                    var productB = productBoxes_1[_a];
                    var productBox = new ProductBox_model_1.ProductBoxModel();
                    //1.product info
                    var pd = new ProductInfo_model_1.ProductInfoModel();
                    var product = productB['product'];
                    pd.id = product["id"];
                    pd.updatedDate = product["updatedDate"] == null ? null : new Date(product["updatedDate"]);
                    pd.productName = product["productName"];
                    pd.sizeW = product["sizeW"];
                    pd.sizeD = product["sizeD"];
                    pd.sizeH = product["sizeH"];
                    pd.paperNameId = product["paperNameId"];
                    pd.paperWeight = product["paperWeight"];
                    pd.customerProductCode = product["customerProductCode"];
                    pd.productCode = product["productCode"];
                    pd.originalName = product["originalName"];
                    pd.lot = product["lot"];
                    pd.memo = product["memo"];
                    pd.srcImg = product["srcImg"];
                    pd.unitPrice = product["unitPrice"];
                    pd.woodenCode = product["woodenCode"];
                    pd.factoryId = product["factoryId"];
                    pd.productType = product["productType"];
                    pd.totalCost = product["totalCost"];
                    pd.shapeId = product["shapeId"];
                    pd.requestProduction = product["requestProduction"];
                    productBox.product = pd;
                    //2.transactions
                    var transactions = productB['transactions'];
                    productBox.transactions = [];
                    for (var _b = 0, transactions_1 = transactions; _b < transactions_1.length; _b++) {
                        var transaction = transactions_1[_b];
                        var transactionTmp = new Transaction_model_1.TransactionModel();
                        transactionTmp.updatedDate = transaction["updatedDate"] == null ? null : new Date(transaction["updatedDate"]);
                        transactionTmp.dealName = transaction["dealName"];
                        transactionTmp.quantity = transaction["quantity"];
                        transactionTmp.submittedPrice = transaction["submittedPrice"];
                        transactionTmp.total = transaction["total"];
                        productBox.transactions.push(transactionTmp);
                    }
                    //3. inventory
                    var inventory = productB['inventory'];
                    var invenModel = new Inventory_model_1.InventoryModel();
                    invenModel.productName = inventory['productName'];
                    invenModel.quantity = inventory['quantity'];
                    invenModel.unitPrice = inventory['unitPrice'];
                    invenModel.days = inventory['days'];
                    productBox.inventory = invenModel;
                    // parse data
                    _this.pageData.productBoxs.push(productBox);
                }
                // check unitPrice
                _this.pageData.shippingInstructions = [];
                if (_this.pageData.productBoxs.length == 1 && !!_this.pageData.productBoxs[0].product.unitPrice) {
                    _this.pageData.productBoxs[0].checked = true;
                    //5. get request oder shipping
                    _this.addProductShippingInstruction(_this.pageData.productBoxs[0]);
                }
            }
        }).catch(function (err) {
            throw err;
        });
    };
    //2. request order
    SF00307Service.prototype.requestOrder = function () {
        var self = this;
        var req = {
            dealId: this.pageData.dealInfo.dealId,
            shippingDestination: this.pageData.shippingModel,
            shippingInstructions: this.pageData.shippingInstructions
        };
        return this.postApi("/SF0030704", req)
            .then(function (res) {
            self.pageData.fallbackDeal = res.data.dealCode;
            self.pageData.dealInfo.dealStatus = mst_data_type_1.DEAL_STATUS_VALUES.ORDER_CONFIRMED;
        })
            .catch(function (err) {
            throw err;
        });
    };
    //3. find list productList by quotationId
    SF00307Service.prototype.findProductList = function (quotationId, dealId) {
        var _this = this;
        var request = {
            quotationId: quotationId,
            dealId: dealId
        };
        return this.postApi('SF0030703', request).then(function (res) {
            var data = res.data;
            //3. product box
            var productBoxes = data['productBoxes'];
            _this._pageData.productBoxs = [];
            if (productBoxes) {
                for (var _i = 0, productBoxes_2 = productBoxes; _i < productBoxes_2.length; _i++) {
                    var productB = productBoxes_2[_i];
                    var productBox = new ProductBox_model_1.ProductBoxModel();
                    //1.product info
                    var pd = new ProductInfo_model_1.ProductInfoModel();
                    var product = productB['product'];
                    if (!!product) {
                        pd.setData(product);
                    }
                    productBox.product = pd;
                    //2.transactions
                    var transactions = productB['transactions'];
                    productBox.transactions = [];
                    for (var _a = 0, transactions_2 = transactions; _a < transactions_2.length; _a++) {
                        var transaction = transactions_2[_a];
                        var transactionTmp = new Transaction_model_1.TransactionModel();
                        transactionTmp.updatedDate = transaction["updatedDate"] == null ? null : new Date(transaction["updatedDate"]);
                        transactionTmp.dealName = transaction["dealName"];
                        transactionTmp.quantity = transaction["quantity"];
                        transactionTmp.submittedPrice = transaction["submittedPrice"];
                        transactionTmp.total = transaction["total"];
                        productBox.transactions.push(transactionTmp);
                    }
                    //3. inventory
                    var inventory = productB['inventory'];
                    var invenModel = new Inventory_model_1.InventoryModel();
                    invenModel.productName = inventory['productName'];
                    invenModel.quantity = inventory['quantity'];
                    invenModel.unitPrice = inventory['unitPrice'];
                    invenModel.days = inventory['days'];
                    productBox.inventory = invenModel;
                    // parse data
                    _this._pageData.productBoxs.push(productBox);
                }
                // check unitPrice
                _this.pageData.shippingInstructions = [];
                if (_this.pageData.productBoxs.length == 1 && !!_this.pageData.productBoxs[0].product.unitPrice) {
                    _this.pageData.productBoxs[0].checked = true;
                    //5. get request oder shipping
                    _this.addProductShippingInstruction(_this.pageData.productBoxs[0]);
                }
            }
        }).catch(function (err) {
            throw err;
        });
    };
    SF00307Service.prototype.exportProduction = function (productId, dealCode) {
        var shippingInstruction = this.pageData.shippingInstructions.find(function (item) { return item.productId === productId; });
        var req = {
            productId: productId,
            shippingInstruction: shippingInstruction,
            dealCode: dealCode
        };
        return this.postApi("/SF0030702", req)
            .then(function (res) {
            return { fileName: res.data.fileName, filePath: res.data.filePath };
        })
            .catch(function (err) {
            throw err;
        });
    };
    SF00307Service.prototype.addProductShippingInstruction = function (box) {
        // check list shipping instruction undefined
        var shippingInstruction = new ShippingInstruction_model_1.ShippingInstructionModel();
        shippingInstruction.productId = box.product.id;
        shippingInstruction.productCode = box.product.productCode;
        shippingInstruction.productName = box.product.productName;
        shippingInstruction.loadingAddressId = 1; // TODO: remove this harded-code
        shippingInstruction.quantity = box.product.lot;
        shippingInstruction.submittedPrice = box.product.unitPrice;
        shippingInstruction.shipTime = !!this.pageData.shippingModel
            ? this.pageData.shippingModel.timePermission : 10;
        shippingInstruction.shipDate = this.pageData.dealInfo.deliveryDate ?
            new Date(this.pageData.dealInfo.deliveryDate.getTime() - 24 * 60 * 60 * 1000) : null;
        shippingInstruction.defaultShipDate = shippingInstruction.shipDate;
        var COMPANY = 1;
        shippingInstruction.shippingCompanyId = COMPANY; // refer SHIPPING_COMPANY
        var ALL_NONE = 4;
        shippingInstruction.limitQuantity = ALL_NONE; // refer LIMIT_QUANTITY
        this.pageData.shippingInstructions.push(shippingInstruction);
    };
    SF00307Service.prototype.removeProductShippingInstruction = function (box) {
        var itemIndex = this.pageData.shippingInstructions
            .findIndex(function (item) { return item.productId === box.product.id; });
        if (itemIndex >= 0)
            this.pageData.shippingInstructions.splice(itemIndex, 1);
    };
    SF00307Service.prototype.selectShippingDestination = function (source) {
        var target = new ShippingDestination_model_1.ShippingDestinationModel();
        if (!!source) {
            target.deliveryName = source.deliveryName;
            target.deliveryAddress1 = source.deliveryAddress1;
            target.tel = source.tel;
            target.fax = source.fax;
            target.availableVehicleSize = source.availableVehicleSize;
            target.requiredTime = source.requiredTime;
            target.extraWork = source.extraWork;
            target.extraMethod = source.extraMethod;
            target.memo1 = source.memo1;
            target.saveToDennoFlag = 0;
            target.customerId = source.customerId;
            target.districtCode = source.districtCode;
            target.abbreviation = source.abbreviation;
            target.furigana = source.furigana;
            target.abbrFurigana = source.abbrFurigana;
            target.postalCode = source.postalCode;
            target.deliveryAddress2 = source.deliveryAddress2;
            target.extension = source.extension;
            target.timePermission = source.timePermission;
            target.defaultFlag = 0;
            target.deptName = source.deptName;
            target.salerName = source.salerName;
            target.formNameId = source.formNameId;
            target.dennoPartnerCode = source.dennoPartnerCode;
        }
        this.pageData.shippingModel = target;
        this.setShiptimeForAllShippingInstructions(this.pageData.shippingModel.timePermission);
    };
    SF00307Service.prototype.setShiptimeForAllShippingInstructions = function (val) {
        (this.pageData.shippingInstructions || []).forEach(function (item) { return item.shipTime = val; });
    };
    SF00307Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00307Service);
    return SF00307Service;
}(common_service_1.CommonService));
exports.SF00307Service = SF00307Service;
//# sourceMappingURL=SF00307.service.js.map