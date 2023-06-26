"use strict";
/**
 * Product model for SFN0307
 */
var ProductModel = (function () {
    function ProductModel() {
    }
    Object.defineProperty(ProductModel.prototype, "productType", {
        get: function () {
            return this.type;
        },
        enumerable: true,
        configurable: true
    });
    return ProductModel;
}());
exports.ProductModel = ProductModel;
//# sourceMappingURL=Product.model.js.map