"use strict";
var ShippingDestinationModal_data_1 = require("./ShippingDestinationModal.data");
var ShippingDestinationModalModel = (function () {
    function ShippingDestinationModalModel() {
        this.data = new ShippingDestinationModal_data_1.ShippingDestinationModalData();
    }
    ShippingDestinationModalModel.prototype.saveDestination = function (destination) {
        return Promise.resolve();
    };
    ShippingDestinationModalModel.PROVIDER = "ShippingDestinationModal";
    return ShippingDestinationModalModel;
}());
exports.ShippingDestinationModalModel = ShippingDestinationModalModel;
//# sourceMappingURL=ShippingDestinationModal.model.js.map