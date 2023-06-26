"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var SF00301_User_model_1 = require("./SF00301_User.model");
var SF00301_Department = (function (_super) {
    __extends(SF00301_Department, _super);
    function SF00301_Department() {
        _super.apply(this, arguments);
    }
    SF00301_Department.prototype.hasUser = function (user) {
        if (!user || !user.id)
            return false;
        return (this.users || []).findIndex(function (usr) { return usr.id === user.id; }) >= 0;
    };
    SF00301_Department.prototype.setDepartment = function (data) {
        var _this = this;
        if (!data)
            return;
        this.setData(data);
        this.departmentName = data["departmentName"];
        this.departmentCode = data["departmentCode"];
        this.users = (data["users"] || []).map(function (item) {
            var user = new SF00301_User_model_1.SF00301_User();
            user.setUser(item);
            user.department = _this;
            return user;
        });
    };
    return SF00301_Department;
}(BaseModel_model_1.BaseModel));
exports.SF00301_Department = SF00301_Department;
//# sourceMappingURL=SF00301_Department.model.js.map