/**
 * Contain paper master data used for simulation
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var MstPaper = (function (_super) {
    __extends(MstPaper, _super);
    function MstPaper() {
        _super.apply(this, arguments);
    }
    MstPaper.prototype.setMstPaper = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.nameId = data["nameId"];
        this.basicWeight = data["basicWeight"];
        this.normValue = data["normValue"];
        this.factoryId = data["factoryId"];
        this.userRole = data["userRole"];
        this.lsizeTgrain = data["lsizeTgrain"];
        this.lsizeYgrain = data["lsizeYgrain"];
        this.ksizeTgrain = data["ksizeTgrain"];
        this.ksizeYgrain = data["ksizeYgrain"];
        this.name = data["name"];
    };
    return MstPaper;
}(BaseModel_model_1.BaseModel));
exports.MstPaper = MstPaper;
//# sourceMappingURL=MstPaper.model.js.map