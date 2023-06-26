/**
 * Contain information of item in order
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Order_model_1 = require("./Order.model");
var Product_model_1 = require("./Product.model");
var LoadingAddress_model_1 = require("./LoadingAddress.model");
var BalanceOfStock_model_1 = require("./BalanceOfStock.model");
var MstShippingCompany_model_1 = require("./MstShippingCompany.model");
var BaseModel_model_1 = require("./BaseModel.model");
var OrderItem = (function (_super) {
    __extends(OrderItem, _super);
    function OrderItem() {
        _super.apply(this, arguments);
    }
    OrderItem.prototype.setOrderItem = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.orderId = data["orderId"];
        this.productId = data["productId"];
        this.loadingAddressId = data["loadingAddressId"];
        this.deliveryType = data["deliveryType"];
        this.deliveryStatus = data["deliveryStatus"];
        this.quantity = data["quantity"];
        this.shipDate = data["shipDate"];
        this.shippingCompanyId = data["shippingCompanyId"];
        this.shipTime = data["shipTime"];
        this.limitQuantity = data["limitQuantity"];
        this.memo = data["memo"];
        if (data["order"] !== undefined) {
            this.order = new Order_model_1.Order();
            this.order.setOrder(data["order"]);
        }
        if (data["product"] !== undefined) {
            this.product = new Product_model_1.Product();
            this.product.setProduct(data["product"]);
        }
        if (data["loadingAddress"] !== undefined) {
            this.loadingAddress = new LoadingAddress_model_1.LoadingAddress();
            this.loadingAddress.setLoadingAddress(data["loadingAddress"]);
        }
        if (data["balanceOfStocks"] !== undefined) {
            this.balanceOfStocks = [];
            for (var i = 0; i < data["balanceOfStocks"].length; i++) {
                var tmp = new BalanceOfStock_model_1.BalanceOfStock();
                tmp.setBalanceOfStock(data["balanceOfStocks"][i]);
                this.balanceOfStocks.push(tmp);
            }
        }
        if (data["shippingCompany"] !== undefined) {
            this.shippingCompany = new MstShippingCompany_model_1.MstShippingCompany();
            this.shippingCompany.setMstShippingCompany(data["shippingCompany"]);
        }
    };
    return OrderItem;
}(BaseModel_model_1.BaseModel));
exports.OrderItem = OrderItem;
//# sourceMappingURL=OrderItem.model.js.map