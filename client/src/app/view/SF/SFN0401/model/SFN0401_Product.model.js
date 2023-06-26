"use strict";
var ProductModel = (function () {
    function ProductModel() {
    }
    Object.defineProperty(ProductModel.prototype, "plt_productNo", {
        get: function () {
            return this.itemCode;
        },
        set: function (value) {
            this.itemCode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductModel.prototype, "plt_productCode", {
        get: function () {
            return this.code;
        },
        set: function (value) {
            this.code = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductModel.prototype, "plt_productName", {
        get: function () {
            return this.name;
        },
        set: function (value) {
            this.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductModel.prototype, "plt_productDescription", {
        get: function () {
            return this.description;
        },
        set: function (value) {
            this.description = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductModel.prototype, "plt_quantity", {
        get: function () {
            return this.quantity;
        },
        set: function (value) {
            this.quantity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductModel.prototype, "plt_unitPrice", {
        get: function () {
            return this.unitPrice;
        },
        set: function (value) {
            this.unitPrice = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductModel.prototype, "plt_production", {
        get: function () {
            return this.total;
        },
        set: function (value) {
            this.total = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductModel.prototype, "plt_wooden", {
        get: function () {
            return this.wooden;
        },
        set: function (value) {
            this.wooden = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductModel.prototype, "plt_woodenExp", {
        get: function () {
            return this.woodenExpStr;
        },
        set: function (value) {
            this.woodenExpStr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductModel.prototype, "productType", {
        //endregion
        get: function () {
            return this.type;
        },
        enumerable: true,
        configurable: true
    });
    return ProductModel;
}());
exports.ProductModel = ProductModel;
//# sourceMappingURL=SFN0401_Product.model.js.map