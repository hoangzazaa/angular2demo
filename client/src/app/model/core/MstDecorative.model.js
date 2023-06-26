"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by admin on 3/19/2017.
 */
var BaseModel_model_1 = require("./BaseModel.model");
var MstDecorative = (function (_super) {
    __extends(MstDecorative, _super);
    function MstDecorative() {
        _super.apply(this, arguments);
    }
    MstDecorative.prototype.setMstDecorative = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.throughNumber = data["throughNumber"];
        this.lossPercent = data["lossPercent"];
        this.throughWage = data["throughWage"];
        this.stepWage = data["stepWage"];
        this.fare = data["fare"];
    };
    return MstDecorative;
}(BaseModel_model_1.BaseModel));
exports.MstDecorative = MstDecorative;
//# sourceMappingURL=MstDecorative.model.js.map