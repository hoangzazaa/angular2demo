"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var SF00301_Quotation = (function (_super) {
    __extends(SF00301_Quotation, _super);
    function SF00301_Quotation() {
        _super.apply(this, arguments);
    }
    // /* quotationItems */
    // public quotationItems: SF00301_QuotationItem[] = [];
    SF00301_Quotation.prototype.setQuotation = function (data) {
        if (!data)
            return;
        //set basic info & binding value to properties
        this.setData(data);
        this.dealId = data["dealId"];
        this.quotationCode = data["quotationCode"];
        this.subject = data["subject"];
        this.lot = data["lot"]; //this.quotationItems[0].dealProduct.offers[0].productOutput.lot;
        this.unitPrice = data["unitPrice"]; //return this.quotationItems[0].dealProduct.offers[0].unitPrice;
        this.totalCost = data["totalCost"]; //return this.quotationItems[0].dealProduct.offers[0].total;
        this.interestRate = data["interestRate"];
        this.memo = data["memo"];
        this.highlightFlag = data["highlightFlag"];
        this.srcImg = data["srcImg"];
    };
    return SF00301_Quotation;
}(BaseModel_model_1.BaseModel));
exports.SF00301_Quotation = SF00301_Quotation;
//# sourceMappingURL=SF00301_Quotation.model.js.map