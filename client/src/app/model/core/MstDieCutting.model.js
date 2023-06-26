/**
 * Contain die cutting master data used for simulation
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var MstDieCutting = (function (_super) {
    __extends(MstDieCutting, _super);
    function MstDieCutting() {
        _super.apply(this, arguments);
    }
    MstDieCutting.prototype.setMstDieCutting = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.paperboardType = data["paperboardType"];
        this.size = data["size"];
        this.impositionNumber = data["impositionNumber"];
        this.throughNumber = data["throughNumber"];
        this.basicCost = data["basicCost"];
        this.throughWage = data["throughWage"];
    };
    return MstDieCutting;
}(BaseModel_model_1.BaseModel));
exports.MstDieCutting = MstDieCutting;
//# sourceMappingURL=MstDieCutting.model.js.map