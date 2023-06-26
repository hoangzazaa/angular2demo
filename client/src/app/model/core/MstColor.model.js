/**
 * Contain color master data used for simulation
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var MstColor = (function (_super) {
    __extends(MstColor, _super);
    function MstColor() {
        _super.apply(this, arguments);
    }
    MstColor.prototype.setMstColor = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.colorOption = data["colorOption"];
        this.basicCost = data["basicCost"];
        this.throughWage = data["throughWage"];
        this.costPerPacket = data["costPerPacket"];
        this.throughWageBranch = data["throughWageBranch"];
        this.productType = data["productType"];
        this.throughNumber = data["throughNumber"];
    };
    return MstColor;
}(BaseModel_model_1.BaseModel));
exports.MstColor = MstColor;
//# sourceMappingURL=MstColor.model.js.map