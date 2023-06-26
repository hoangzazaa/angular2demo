/**
 * Contain balance of stock (imported by batch)
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrderItem_model_1 = require("./OrderItem.model");
var BaseModel_model_1 = require("./BaseModel.model");
var BalanceOfStock = (function (_super) {
    __extends(BalanceOfStock, _super);
    function BalanceOfStock() {
        _super.apply(this, arguments);
    }
    BalanceOfStock.prototype.setBalanceOfStock = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.orderItemId = data["orderItemId"];
        this.value = data["value"];
        this.type = data["type"];
        if (data["OrderItem"] !== undefined) {
            this.OrderItem = new OrderItem_model_1.OrderItem();
            this.OrderItem.setOrderItem(data["OrderItem"]);
        }
    };
    return BalanceOfStock;
}(BaseModel_model_1.BaseModel));
exports.BalanceOfStock = BalanceOfStock;
//# sourceMappingURL=BalanceOfStock.model.js.map