"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
/**
 * Created by hoangtd on 4/14/2017.
 */
var OrderItemModel = (function (_super) {
    __extends(OrderItemModel, _super);
    function OrderItemModel() {
        _super.apply(this, arguments);
    }
    OrderItemModel.prototype.setOrderItem = function (data) {
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
    };
    return OrderItemModel;
}(BaseModel_model_1.BaseModel));
exports.OrderItemModel = OrderItemModel;
//# sourceMappingURL=OrderItem.model.js.map