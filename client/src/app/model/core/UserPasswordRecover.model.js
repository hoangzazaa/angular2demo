/**
 * Contain information of password recovery
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var UserPasswordRecover = (function (_super) {
    __extends(UserPasswordRecover, _super);
    function UserPasswordRecover() {
        _super.apply(this, arguments);
    }
    UserPasswordRecover.prototype.setUserPasswordRecover = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.tokenKey = data["tokenKey"];
        this.expiredDate = data["expiredDate"] != undefined ? new Date(data["expiredDate"]) : undefined;
        this.usedFlag = data["usedFlag"];
        this.activatedDate = data["activatedDate"] != undefined ? new Date(data["activatedDate"]) : undefined;
        this.userId = data["userId"];
    };
    return UserPasswordRecover;
}(BaseModel_model_1.BaseModel));
exports.UserPasswordRecover = UserPasswordRecover;
//# sourceMappingURL=UserPasswordRecover.model.js.map