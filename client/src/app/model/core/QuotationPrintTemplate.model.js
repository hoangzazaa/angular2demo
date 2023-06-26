/**
 * Contain quotation template to export PDF
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Quotation_model_1 = require("./Quotation.model");
var BaseModel_model_1 = require("./BaseModel.model");
var QuotationPrintTemplate = (function (_super) {
    __extends(QuotationPrintTemplate, _super);
    function QuotationPrintTemplate() {
        _super.apply(this, arguments);
    }
    QuotationPrintTemplate.prototype.setQuotationPrintTemplate = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.selectOption = data["selectOption"];
        this.path = data["path"];
        this.fileName = data["fileName"];
        this.application = data["application"];
        if (data["quotation"] !== undefined) {
            this.quotation = [];
            for (var i = 0; i < data["quotation"].length; i++) {
                var tmp = new Quotation_model_1.Quotation();
                tmp.setQuotation(data["quotation"][i]);
                this.quotation.push(tmp);
            }
        }
    };
    return QuotationPrintTemplate;
}(BaseModel_model_1.BaseModel));
exports.QuotationPrintTemplate = QuotationPrintTemplate;
//# sourceMappingURL=QuotationPrintTemplate.model.js.map