"use strict";
var RevenueModel = (function () {
    function RevenueModel() {
    }
    Object.defineProperty(RevenueModel.prototype, "rlt_salesDate", {
        get: function () {
            return this.salesDate;
        },
        set: function (value) {
            this.salesDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenueModel.prototype, "rlt_salesDateStr", {
        get: function () {
            return this.salesDateStr;
        },
        set: function (value) {
            this.salesDateStr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenueModel.prototype, "rlt_dealCode", {
        get: function () {
            return this.product.dealCode;
        },
        set: function (value) {
            this.product.dealCode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenueModel.prototype, "rlt_itemCode", {
        get: function () {
            return this.product.itemCode;
        },
        set: function (value) {
            this.product.itemCode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenueModel.prototype, "rlt_productName", {
        get: function () {
            return this.product.name;
        },
        set: function (value) {
            this.product.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenueModel.prototype, "rlt_productDescription", {
        get: function () {
            return this.product.description;
        },
        set: function (value) {
            this.product.description = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenueModel.prototype, "rlt_quantity", {
        get: function () {
            return this.product.quantity;
        },
        set: function (value) {
            this.product.quantity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenueModel.prototype, "rlt_unitPrice", {
        get: function () {
            return this.product.unitPrice;
        },
        set: function (value) {
            this.product.unitPrice = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenueModel.prototype, "rlt_total", {
        get: function () {
            return this.product.total;
        },
        set: function (value) {
            this.product.total = value;
        },
        enumerable: true,
        configurable: true
    });
    return RevenueModel;
}());
exports.RevenueModel = RevenueModel;
//# sourceMappingURL=SFN0402_Revenue.model.js.map