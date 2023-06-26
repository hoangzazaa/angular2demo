"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
/**
 * Created by ASUS on 6/5/2017.
 */
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        _super.apply(this, arguments);
    }
    UserModel.prototype.setUser = function (data) {
        if (!!data) {
            this.setData(data);
            this.username = data["username"];
            this.enableFlag = data["enableFlag"];
            this.role = data["role"];
            this.email = data["email"];
            this.departmentId = data["departmentId"];
            this.departmentCode = data["departmentCode"];
            this.deleteFlag = data["deleteFlag"];
            this.userCode = data["userCode"];
        }
    };
    return UserModel;
}(BaseModel_model_1.BaseModel));
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map