/**
 * Contain master shipping company
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var MstShippingCompany = (function (_super) {
    __extends(MstShippingCompany, _super);
    function MstShippingCompany() {
        _super.apply(this, arguments);
    }
    MstShippingCompany.prototype.setMstShippingCompany = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.companyId = data["companyId"];
        this.companyName = data["companyName"];
    };
    return MstShippingCompany;
}(BaseModel_model_1.BaseModel));
exports.MstShippingCompany = MstShippingCompany;
//# sourceMappingURL=MstShippingCompany.model.js.map