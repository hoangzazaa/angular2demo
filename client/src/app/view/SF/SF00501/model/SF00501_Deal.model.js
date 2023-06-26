"use strict";
/**
 * Deal model for SF00501
 */
var DealModel = (function () {
    function DealModel() {
        this.productIds = [];
    }
    Object.defineProperty(DealModel.prototype, "isClosed", {
        get: function () {
            return !!this.closedFlag;
        },
        enumerable: true,
        configurable: true
    });
    return DealModel;
}());
exports.DealModel = DealModel;
var OrderItemModel = (function () {
    function OrderItemModel() {
    }
    return OrderItemModel;
}());
exports.OrderItemModel = OrderItemModel;
//# sourceMappingURL=SF00501_Deal.model.js.map