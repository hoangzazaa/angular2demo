"use strict";
var ProductInfoBox_data_1 = require("./ProductInfoBox.data");
var ProductInfoBoxModel = (function () {
    function ProductInfoBoxModel() {
        this.data = new ProductInfoBox_data_1.ProductInfoBoxData();
    }
    ProductInfoBoxModel.prototype.viewDetail = function () {
    };
    ProductInfoBoxModel.prototype.exportPdf = function () {
    };
    ProductInfoBoxModel.prototype.addShipping = function (index) {
    };
    ProductInfoBoxModel.prototype.removeShipping = function (index) {
    };
    ProductInfoBoxModel.prototype.saveDestination = function (destination) {
        return Promise.resolve();
    };
    ProductInfoBoxModel.PROVIDER = "ProductInfoBox";
    return ProductInfoBoxModel;
}());
exports.ProductInfoBoxModel = ProductInfoBoxModel;
//# sourceMappingURL=ProductInfoBox.model.js.map