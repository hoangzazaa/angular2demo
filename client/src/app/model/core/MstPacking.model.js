/**
 * Contain packing master data used for simulation
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var MstPacking = (function (_super) {
    __extends(MstPacking, _super);
    function MstPacking() {
        _super.apply(this, arguments);
    }
    MstPacking.prototype.setMstPacking = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.method = data["method"];
        this.lot = data["lot"];
        this.percent = data["percent"];
    };
    return MstPacking;
}(BaseModel_model_1.BaseModel));
exports.MstPacking = MstPacking;
//# sourceMappingURL=MstPacking.model.js.map