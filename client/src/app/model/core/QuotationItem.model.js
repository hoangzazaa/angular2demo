/**
 * Contain information of item in quotation
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Quotation_model_1 = require("./Quotation.model");
var DealProduct_model_1 = require("./DealProduct.model");
var BaseModel_model_1 = require("./BaseModel.model");
var mst_data_type_1 = require("../../helper/mst-data-type");
var QuotationItem = (function (_super) {
    __extends(QuotationItem, _super);
    function QuotationItem() {
        _super.apply(this, arguments);
        this.identity = QuotationItem.identity++;
        /* 単位 */
        this.productType = mst_data_type_1.PRODUCT_UNIT_VALUE.SHEET;
    }
    QuotationItem.prototype.setQuotationItem = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.no = data["no"];
        this.itemIndex = data["itemIndex"];
        this.itemType = data["itemType"];
        this.name = data["name"];
        this.description = data["description"];
        this.submittedPrice = data["submittedPrice"];
        this.quantity = data["quantity"];
        this.total = data["total"];
        this.productType = data["productType"];
        this.productTypeName = data["productTypeName"];
        this.setClosedFlag = data["setClosedFlag"];
        this.parentId = data["parentId"];
        this.quotationId = data["quotationId"];
        this.dealProductId = data["dealProductId"];
        this.interestRate = data["interestRate"];
        if (data["quotation"] !== undefined) {
            this.quotation = new Quotation_model_1.Quotation();
            this.quotation.setQuotation(data["quotation"]);
        }
        if (data["dealProduct"] !== undefined) {
            this.dealProduct = new DealProduct_model_1.DealProduct();
            this.dealProduct.setDealProduct(data["dealProduct"]);
        }
    };
    QuotationItem.identity = 0;
    return QuotationItem;
}(BaseModel_model_1.BaseModel));
exports.QuotationItem = QuotationItem;
//# sourceMappingURL=QuotationItem.model.js.map