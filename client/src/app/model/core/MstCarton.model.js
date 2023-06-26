"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
/**
 * Created by VuPT on 5/11/2017.
 */
var MstCarton = (function (_super) {
    __extends(MstCarton, _super);
    function MstCarton() {
        _super.apply(this, arguments);
    }
    MstCarton.prototype.setMstCarton = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.cartonLong = data["cartonLong"];
        this.cartonShort = data["cartonShort"];
        this.shippingType = data["shippingType"];
        this.shippingLoss = data["shippingLoss"];
        this.pasteWage = data["pasteWage"];
        this.shipFare = data["shipFare"];
    };
    return MstCarton;
}(BaseModel_model_1.BaseModel));
exports.MstCarton = MstCarton;
//# sourceMappingURL=MstCarton.model.js.map