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
require("rxjs/add/operator/toPromise");
var QuotationItem_model_1 = require("../../../model/core/QuotationItem.model");
var common_service_1 = require("../../../service/common.service");
var DealProduct_model_1 = require("../../../model/core/DealProduct.model");
var SF00303_data_1 = require("./SF00303.data");
var SF0030301Req_1 = require("../../../model/request/SF0030301Req");
var MstLamination_model_1 = require("../COMMON/model/MstLamination.model");
/**
 * SF00303 quotation call service api
 * Created by hoangtd on 26/10/2016.
 */
var SF00303Service = (function (_super) {
    __extends(SF00303Service, _super);
    function SF00303Service(http, router) {
        _super.call(this, http, router);
    }
    /**
     * Get data quotation info
     * @return quotation data
     * */
    SF00303Service.prototype.getQuotationInfo = function (dealCode, quotationCode) {
        return this.getApi("/SF0030300/" + dealCode + "/" + quotationCode).then(function (request) {
            var res = request.data;
            // data
            var sf00303Data = new SF00303_data_1.SF00303Data();
            // read deal parse json
            sf00303Data.deal.setDeal(res["deal"]);
            // read quotation parse json
            sf00303Data.quotation.setQuotation(res["quotation"]);
            sf00303Data.defaultEstimateDate = sf00303Data.quotation.estimateDate;
            sf00303Data.defaultInvoiceExpirationDate = sf00303Data.quotation.invoiceExpirationDate;
            // read quotation item parse json
            for (var i = 0; i < res["quotationItems"].length; i++) {
                var quotationItem = new QuotationItem_model_1.QuotationItem();
                quotationItem.setQuotationItem(res["quotationItems"][i]);
                sf00303Data.quotationItems.push(quotationItem);
            }
            // read dealProduct parse json
            for (var i = 0; i < res["dealProducts"].length; i++) {
                var dealProduct = new DealProduct_model_1.DealProduct();
                dealProduct.setDealProduct(res["dealProducts"][i]);
                sf00303Data.dealProducts.push(dealProduct);
            }
            // read saleByCustomer parse json
            if (res["saleByCustomer"]) {
                sf00303Data.saleByCustomer.setUser(res["saleByCustomer"]);
            }
            // read departmentByCustomer parse json
            if (res["departmentByCustomer"]) {
                sf00303Data.departmentByCustomer.setDepartment(res["departmentByCustomer"]);
            }
            //read mst lamination
            if (res["laminationJsons"]) {
                sf00303Data.mstLaminations = [];
                for (var i = 0; i < res["laminationJsons"].length; i++) {
                    var mstLamination = new MstLamination_model_1.MstLamination();
                    mstLamination.setData(res["laminationJsons"][i]);
                    sf00303Data.mstLaminations.push(mstLamination);
                }
            }
            return sf00303Data;
        }).catch(function (err) {
            throw err;
        });
    };
    /**
     * Save quotation call service api SF0030301
     */
    SF00303Service.prototype.saveQuotation = function (quotation, quotationItems) {
        var sf0030301Request = new SF0030301Req_1.SF0030301Req();
        sf0030301Request.quotation = quotation;
        sf0030301Request.quotationItems = quotationItems.map(SF00303Service.prettyQuotationItemForRequest);
        // post send request
        return this.postApi("/SF0030301", sf0030301Request).then(function (request) {
            var res = request.data;
            var sf00303Data = new SF00303_data_1.SF00303Data();
            // read quotation parse json
            sf00303Data.quotation.setQuotation(res["quotation"]);
            sf00303Data.defaultEstimateDate = sf00303Data.quotation.estimateDate;
            sf00303Data.defaultInvoiceExpirationDate = sf00303Data.quotation.invoiceExpirationDate;
            // read quotation item parse json
            for (var i = 0; i < res["quotationItems"].length; i++) {
                var quotationItem = new QuotationItem_model_1.QuotationItem();
                quotationItem.setQuotationItem(res["quotationItems"][i]);
                sf00303Data.quotationItems.push(quotationItem);
            }
            return sf00303Data;
        }).catch(function (err) {
            throw err;
        });
    };
    /**
     * Duplicate quotation call service api SF0030302
     */
    SF00303Service.prototype.duplicateQuotation = function (quotation, quotationItems) {
        var sf0030301Request = new SF0030301Req_1.SF0030301Req();
        sf0030301Request.quotation = quotation;
        sf0030301Request.quotationItems = quotationItems.map(SF00303Service.prettyQuotationItemForRequest);
        // post send request
        return this.postApi("/SF0030302", sf0030301Request).then(function (request) {
            var res = request.data;
            var sf00303Data = new SF00303_data_1.SF00303Data();
            // read quotation json
            sf00303Data.quotation.setQuotation(res['quotation']);
            sf00303Data.defaultEstimateDate = sf00303Data.quotation.estimateDate;
            sf00303Data.defaultInvoiceExpirationDate = sf00303Data.quotation.invoiceExpirationDate;
            // read quotation item parse json
            for (var i = 0; i < res["quotationItems"].length; i++) {
                var quotationItem = new QuotationItem_model_1.QuotationItem();
                quotationItem.setQuotationItem(res["quotationItems"][i]);
                sf00303Data.quotationItems.push(quotationItem);
            }
            return sf00303Data;
        }).catch(function (err) {
            throw err;
        });
    };
    /**
     * QuotationItem を要求形式の電文に変換する
     *
     * @param item 見積もり明細
     * @returns 見積もり明細 (要求電文形式)
     */
    SF00303Service.prettyQuotationItemForRequest = function (item) {
        var prettyItem = new QuotationItem_model_1.QuotationItem();
        prettyItem.setQuotationItem(item);
        prettyItem.identity = undefined;
        if (prettyItem.productType > 0) {
            prettyItem.productTypeName = undefined;
        }
        else {
            prettyItem.productType = undefined;
            if (prettyItem.productTypeName.length == 0) {
                // 単位が空欄の場合
                prettyItem.quantity = null;
                prettyItem.submittedPrice = null;
                prettyItem.total = null;
            }
        }
        return prettyItem;
    };
    /**
     * Remove quotation call service api SF0030303
     */
    SF00303Service.prototype.deleteQuotation = function (quotationCode) {
        return this.getApi("/SF0030303/" + quotationCode).then(function (request) {
            return request;
        }).catch(function (err) {
            throw err;
        });
    };
    SF00303Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00303Service);
    return SF00303Service;
}(common_service_1.CommonService));
exports.SF00303Service = SF00303Service;
//# sourceMappingURL=SF00303.service.js.map