"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShippingDestinationModal_model_1 = require("../../shipping-destination-modal/ShippingDestinationModal.model");
var PIBShippingDestinationModalModel = (function (_super) {
    __extends(PIBShippingDestinationModalModel, _super);
    function PIBShippingDestinationModalModel(component) {
        _super.call(this);
        this.component = component;
        this.data.destinationList = component.data.destinations;
    }
    PIBShippingDestinationModalModel.prototype.saveDestination = function (destination) {
        var _this = this;
        return this.component.model.saveDestination(destination).then(function () {
            _this.component.closeShippingDestination();
        });
    };
    return PIBShippingDestinationModalModel;
}(ShippingDestinationModal_model_1.ShippingDestinationModalModel));
exports.PIBShippingDestinationModalModel = PIBShippingDestinationModalModel;
//# sourceMappingURL=PIBShippingDestinationModal.model.js.map