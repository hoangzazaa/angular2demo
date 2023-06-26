/**
 * Contain window creating master data used for simulation
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var MstWindow = (function (_super) {
    __extends(MstWindow, _super);
    function MstWindow() {
        _super.apply(this, arguments);
    }
    MstWindow.prototype.setMstWindow = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.windowSize = data["windowSize"];
        this.windowLot = data["windowLot"];
        this.windowMaterial = data["windowMaterial"];
        this.windowPreparationFee = data["windowPreparationFee"];
        this.windowThroughWage = data["windowThroughWage"];
    };
    return MstWindow;
}(BaseModel_model_1.BaseModel));
exports.MstWindow = MstWindow;
//# sourceMappingURL=MstWindow.model.js.map