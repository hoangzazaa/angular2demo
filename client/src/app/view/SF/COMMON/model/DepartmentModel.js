"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var UserModel_1 = require("./UserModel");
/**
 * Created by ASUS on 6/5/2017.
 */
var DepartmentModel = (function (_super) {
    __extends(DepartmentModel, _super);
    function DepartmentModel() {
        _super.apply(this, arguments);
    }
    DepartmentModel.prototype.setDepartment = function (data) {
        if (!!data) {
            this.setData(data);
            this.department = data["department"];
            this.departmentCode = data["departmentCode"];
            this.type = data["type"];
            this.mailGroupFlag = data["mailGroupFlag"];
            if (data["users"] !== undefined) {
                this.users = [];
                for (var i = 0; i < data["users"].length; i++) {
                    var tmp = new UserModel_1.UserModel();
                    tmp.setUser(data["users"][i]);
                    this.users.push(tmp);
                }
            }
        }
    };
    return DepartmentModel;
}(BaseModel_model_1.BaseModel));
exports.DepartmentModel = DepartmentModel;
//# sourceMappingURL=DepartmentModel.js.map