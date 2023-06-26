/**
 * Contain master wooden
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var MstWooden = (function (_super) {
    __extends(MstWooden, _super);
    function MstWooden() {
        _super.apply(this, arguments);
    }
    MstWooden.prototype.setMstWooden = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.woodenCode = data["woodenCode"];
        this.woodenTotalNumber = data["woodenTotalNumber"];
        this.woodenExpiredDate = data["woodenExpiredDate"] != undefined ? new Date(data["woodenExpiredDate"]) : undefined;
    };
    return MstWooden;
}(BaseModel_model_1.BaseModel));
exports.MstWooden = MstWooden;
//# sourceMappingURL=MstWooden.model.js.map