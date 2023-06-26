/**
 * Contain master shipping cost
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var MstShippingCost = (function (_super) {
    __extends(MstShippingCost, _super);
    function MstShippingCost() {
        _super.apply(this, arguments);
    }
    MstShippingCost.prototype.setMstShippingCost = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.distance = data["distance"];
        this.weight = data["weight"];
        this.cost = data["cost"];
        this.factoryId = data["factoryId"];
    };
    return MstShippingCost;
}(BaseModel_model_1.BaseModel));
exports.MstShippingCost = MstShippingCost;
//# sourceMappingURL=MstShippingCost.model.js.map