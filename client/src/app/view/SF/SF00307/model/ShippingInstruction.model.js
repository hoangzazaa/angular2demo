"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var ShippingInstructionModel = (function (_super) {
    __extends(ShippingInstructionModel, _super);
    function ShippingInstructionModel() {
        _super.apply(this, arguments);
    }
    ShippingInstructionModel.prototype.setShipdate = function (date) {
        this.shipDate = date;
    };
    return ShippingInstructionModel;
}(BaseModel_model_1.BaseModel));
exports.ShippingInstructionModel = ShippingInstructionModel;
//# sourceMappingURL=ShippingInstruction.model.js.map