"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var SF00301_Customer = (function (_super) {
    __extends(SF00301_Customer, _super);
    function SF00301_Customer() {
        _super.apply(this, arguments);
    }
    SF00301_Customer.prototype.setCustomer = function (data) {
        if (!data)
            return;
        //set basic info & binding value to properties
        this.setData(data);
        this.customerName = data["customerName"];
        this.customerCode = data["customerCode"];
    };
    return SF00301_Customer;
}(BaseModel_model_1.BaseModel));
exports.SF00301_Customer = SF00301_Customer;
//# sourceMappingURL=SF00301_Customer.model.js.map