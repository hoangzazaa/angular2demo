/**
 * Contain all order
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Quotation_model_1 = require("./Quotation.model");
var OrderItem_model_1 = require("./OrderItem.model");
var Deal_model_1 = require("./Deal.model");
var BaseModel_model_1 = require("./BaseModel.model");
var Order = (function (_super) {
    __extends(Order, _super);
    function Order() {
        _super.apply(this, arguments);
    }
    Order.prototype.setOrder = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.quotationId = data["quotationId"];
        this.dealId = data["dealId"];
        if (data["quotation"] !== undefined) {
            this.quotation = new Quotation_model_1.Quotation();
            this.quotation.setQuotation(data["quotation"]);
        }
        if (data["orderItems"] !== undefined) {
            this.orderItems = [];
            for (var i = 0; i < data["orderItems"].length; i++) {
                var tmp = new OrderItem_model_1.OrderItem();
                tmp.setOrderItem(data["orderItems"][i]);
                this.orderItems.push(tmp);
            }
        }
        if (data["deal"] !== undefined) {
            this.deal = new Deal_model_1.Deal();
            this.deal.setDeal(data["deal"]);
        }
    };
    return Order;
}(BaseModel_model_1.BaseModel));
exports.Order = Order;
//# sourceMappingURL=Order.model.js.map