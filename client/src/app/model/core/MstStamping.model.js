/**
 * Contain stamping master data used for simulation
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var MstStamping = (function (_super) {
    __extends(MstStamping, _super);
    function MstStamping() {
        _super.apply(this, arguments);
    }
    MstStamping.prototype.setMstStamping = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.processingType = data["processingType"];
        this.blank = data["blank"];
        this.basicCost = data["basicCost"];
        this.throughWage = data["throughWage"];
    };
    return MstStamping;
}(BaseModel_model_1.BaseModel));
exports.MstStamping = MstStamping;
//# sourceMappingURL=MstStamping.model.js.map