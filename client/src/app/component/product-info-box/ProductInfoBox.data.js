"use strict";
var ProductInfoBoxData = (function () {
    function ProductInfoBoxData() {
        this.displayCheck = false;
        this.enableCheck = true;
        this.selectedTab = 1;
        this.exportDisplayed = false;
        this.exportEnabled = false;
        this.isInputLot = false;
        this.isInputPrice = false;
        this.product = {};
        this.manufacture = {};
        this.shippings = [];
        this.destinations = [];
    }
    return ProductInfoBoxData;
}());
exports.ProductInfoBoxData = ProductInfoBoxData;
//# sourceMappingURL=ProductInfoBox.data.js.map