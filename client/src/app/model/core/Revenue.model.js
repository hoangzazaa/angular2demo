/**
 * Contain revenue imported by batch
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var Revenue = (function (_super) {
    __extends(Revenue, _super);
    function Revenue() {
        _super.apply(this, arguments);
    }
    Revenue.prototype.setRevenue = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.salesSeq = data["salesSeq"];
        this.orderCode = data["orderCode"];
        this.dennoCustomerCode = data["dennoCustomerCode"];
        this.salesDate = data["salesDate"] != undefined ? new Date(data["salesDate"]) : undefined;
        this.invoiceSalesDate = data["invoiceSalesDate"] != undefined ? new Date(data["invoiceSalesDate"]) : undefined;
        this.salesCategory = data["salesCategory"];
        this.salesAmount = data["salesAmount"];
        this.departmentCode = data["departmentCode"];
        this.salesRep = data["salesRep"];
        this.salesNumber = data["salesNumber"];
        this.salesUnitPrice = data["salesUnitPrice"];
        this.manufactureRequest = data["manufactureRequest"];
        this.itemCode = data["itemCode"];
        this.productName = data["productName"];
        this.productType = data["productType"];
    };
    return Revenue;
}(BaseModel_model_1.BaseModel));
exports.Revenue = Revenue;
//# sourceMappingURL=Revenue.model.js.map