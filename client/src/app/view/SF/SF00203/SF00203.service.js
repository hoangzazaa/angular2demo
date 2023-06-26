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
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var common_service_1 = require("../../../service/common.service");
var SF00203_data_1 = require("./SF00203.data");
var constants_1 = require("../../../helper/constants");
var SF00203_Deal_model_1 = require("./model/SF00203_Deal.model");
var SF00203_Product_model_1 = require("./model/SF00203_Product.model");
var SF00203_OrderItems_model_1 = require("./model/SF00203_OrderItems.model");
/**
 * Created by hoangtd
 */
var SF00203Service = (function (_super) {
    __extends(SF00203Service, _super);
    function SF00203Service(http, router) {
        _super.call(this, http, router);
        this._sf00203Data = new SF00203_data_1.SF00203Data();
    }
    Object.defineProperty(SF00203Service.prototype, "sf00203Data", {
        get: function () {
            return this._sf00203Data;
        },
        enumerable: true,
        configurable: true
    });
    SF00203Service.prototype.getResults = function (pageIndex) {
        var _this = this;
        var req = {
            indexFrom: ((pageIndex || constants_1.Constants.FIRST_PAGE) - 1) * this._sf00203Data.CONSTANTS.PAGE_SIZE,
            indexTo: this._sf00203Data.CONSTANTS.PAGE_SIZE
        };
        return this.postApi("SF0020301", req)
            .then(function (res) {
            _this._sf00203Data.deals = (res.data.deals || []).map(function (item) { return _this.parseDeal(item); });
            _this._sf00203Data.totalRecords = !!res.data.totalRecords ? res.data.totalRecords : 0;
        });
    };
    SF00203Service.prototype.parseDeal = function (data) {
        var deal = new SF00203_Deal_model_1.SF00203_Deal();
        deal.id = data["id"];
        deal.createdUser = data["createdUser"];
        deal.updatedUser = data["updatedUser"];
        deal.createdDate = data["createdDate"] ? new Date(data["createdDate"]) : undefined;
        deal.updatedDate = data["updatedDate"] ? new Date(data["updatedDate"]) : undefined;
        deal.dealCode = data["dealCode"];
        deal.saleName = data["saleName"];
        deal.dealName = data["dealName"];
        deal.dealType = data["dealType"];
        deal.dealStatus = data["dealStatus"];
        deal.customerName = data["customerName"];
        deal.isInMybox = data["isInMybox"];
        deal.deliveryDate = data["deliveryDate"];
        deal.images = data["images"] || [];
        deal.estTotalDeal = data["estTotalDeal"];
        deal.templateFlag = data["templateFlag"];
        deal.products = (data["products"] || []).map(function (item) { return parseProduct(item); });
        deal.orderItems = (data["orderItems"] || []).map(function (item) { return parseOrderItem(item); });
        return deal;
        function parseProduct(data) {
            var product = new SF00203_Product_model_1.SF00203_Product();
            product.id = data["id"];
            product.createdUser = data["createdUser"];
            product.updatedUser = data["updatedUser"];
            product.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
            product.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
            product.productName = data["productName"];
            product.sizeH = data["sizeH"];
            product.sizeD = data["sizeD"];
            product.sizeW = data["sizeW"];
            product.paperNameId = data["paperNameId"];
            product.lot = data["lot"];
            product.paperWeight = data["paperWeight"];
            product.printMethod = data["printMethod"];
            product.woodenCode = data["woodenCode"];
            product.woodenTotalNumber = data["woodenTotalNumber"];
            product.woodenExpiredDate = data["woodenExpiredDate"];
            product.estimatedUnitPrice = data["estimatedUnitPrice"];
            product.customerProductCode = data["customerProductCode"];
            product.productCode = data["productCode"];
            product.memo = data["memo"];
            product.impositionNumber = data["impositionNumber"];
            product.varnishType = data["surfaceF_varnishType"];
            product.colorFSelect = data["colorFSelect"];
            product.application = data["application"];
            product.quantityStock = data["quantityStock"];
            product.srcImg = data["srcImg"];
            return product;
        }
        function parseOrderItem(data) {
            var orderItem = new SF00203_OrderItems_model_1.SF00203_OrderItem();
            orderItem.id = data["id"];
            orderItem.createdUser = data["createdUser"];
            orderItem.updatedUser = data["updatedUser"];
            orderItem.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
            orderItem.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
            orderItem.productId = data["productId"];
            orderItem.quantity = data["quantity"];
            orderItem.submittedPrice = data["submittedPrice"];
            orderItem.total = data["total"];
            return orderItem;
        }
    };
    SF00203Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00203Service);
    return SF00203Service;
}(common_service_1.CommonService));
exports.SF00203Service = SF00203Service;
//# sourceMappingURL=SF00203.service.js.map