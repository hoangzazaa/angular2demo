"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Contain information about quotations of deals
 * @author vupt
 */
var Deal_model_1 = require("./Deal.model");
var QuotationPrintTemplate_model_1 = require("./QuotationPrintTemplate.model");
var QuotationItem_model_1 = require("./QuotationItem.model");
var BaseModel_model_1 = require("./BaseModel.model");
var Quotation = (function (_super) {
    __extends(Quotation, _super);
    function Quotation() {
        _super.apply(this, arguments);
        this.title = 1;
    }
    Quotation.prototype.setQuotation = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.dealId = data["dealId"];
        this.printTemplateId = data["printTemplateId"];
        this.interestRate = data["interestRate"];
        this.quotationStatus = data["quotationStatus"];
        this.totalCost = data["totalCost"];
        this.memo = data["memo"];
        this.remark = data["remark"];
        this.estimateDate = data["estimateDate"] != undefined ? new Date(data["estimateDate"]) : undefined;
        this.invoiceDeliveryDate = data["invoiceDeliveryDate"];
        this.invoiceDeliveryPlace = data["invoiceDeliveryPlace"];
        this.invoicePaymentTerm = data["invoicePaymentTerm"];
        this.deliveryMethod = data["deliveryMethod"];
        this.invoiceCustomerName = data["invoiceCustomerName"];
        this.invoiceDeptName = data["invoiceDeptName"];
        this.invoicePic = data["invoicePic"];
        this.invoiceAddress = data["invoiceAddress"];
        this.invoiceMailAddress = data["invoiceMailAddress"];
        this.invoicePhoneNumber = data["invoicePhoneNumber"];
        this.invoiceExpirationDate = data["invoiceExpirationDate"] != undefined ? new Date(data["invoiceExpirationDate"]) : undefined;
        this.quotationCode = data["quotationCode"];
        this.quotationType = data["quotationType"];
        this.subject = data["subject"];
        this.consumptionTax = data["consumptionTax"];
        this.totalExcludedTax = data["totalExcludedTax"];
        this.highlightFlag = data["highlightFlag"];
        this.stereoType1Flag = data["stereoType1Flag"];
        this.stereoType2Flag = data["stereoType2Flag"];
        this.stereoType3Flag = data["stereoType3Flag"];
        this.stereoType4Flag = data["stereoType4Flag"];
        this.title = data["title"];
        if (data["deal"] !== undefined) {
            this.deal = new Deal_model_1.Deal();
            this.deal.setDeal(data["deal"]);
        }
        if (data["quotationPrintTemplate"] !== undefined) {
            this.quotationPrintTemplate = new QuotationPrintTemplate_model_1.QuotationPrintTemplate();
            this.quotationPrintTemplate.setQuotationPrintTemplate(data["quotationPrintTemplate"]);
        }
        if (data["quotationItems"] !== undefined) {
            this.quotationItems = [];
            for (var i = 0; i < data["quotationItems"].length; i++) {
                var tmp = new QuotationItem_model_1.QuotationItem();
                tmp.setQuotationItem(data["quotationItems"][i]);
                this.quotationItems.push(tmp);
            }
        }
    };
    return Quotation;
}(BaseModel_model_1.BaseModel));
exports.Quotation = Quotation;
//# sourceMappingURL=Quotation.model.js.map