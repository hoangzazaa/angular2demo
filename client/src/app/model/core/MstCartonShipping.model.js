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
var MstCartonShipping = (function (_super) {
    __extends(MstCartonShipping, _super);
    function MstCartonShipping() {
        _super.apply(this, arguments);
    }
    MstCartonShipping.prototype.setMstCartonShipping = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.distance = data["distance"];
        this.fluteType = data["fluteType"];
        this.cost = data["cost"];
    };
    return MstCartonShipping;
}(BaseModel_model_1.BaseModel));
exports.MstCartonShipping = MstCartonShipping;
//# sourceMappingURL=MstCartonShipping.model.js.map