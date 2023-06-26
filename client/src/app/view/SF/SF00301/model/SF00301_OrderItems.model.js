"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var SF00301_OrderItem = (function (_super) {
    __extends(SF00301_OrderItem, _super);
    function SF00301_OrderItem() {
        _super.apply(this, arguments);
    }
    SF00301_OrderItem.prototype.setOrderItem = function (data) {
        if (!data)
            return;
        //set basic info & binding value to properties
        this.setData(data);
        this.productId = data["productId"];
        this.quantity = data["quantity"];
        this.submittedPrice = data["submittedPrice"];
        this.total = data["total"];
    };
    return SF00301_OrderItem;
}(BaseModel_model_1.BaseModel));
exports.SF00301_OrderItem = SF00301_OrderItem;
//# sourceMappingURL=SF00301_OrderItems.model.js.map