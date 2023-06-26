"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var SF00301_Department_model_1 = require("./SF00301_Department.model");
var SF00301_User = (function (_super) {
    __extends(SF00301_User, _super);
    function SF00301_User() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SF00301_User.prototype, "isStaff", {
        get: function () {
            return this.role === "2";
        },
        enumerable: true,
        configurable: true
    });
    SF00301_User.prototype.setUser = function (data) {
        if (!data)
            return;
        this.setData(data);
        this.username = data["username"];
        this.userCode = data["userCode"];
        this.role = data["role"];
        if (data["department"]) {
            this.department = new SF00301_Department_model_1.SF00301_Department();
            this.department.setDepartment(data["department"]);
        }
    };
    return SF00301_User;
}(BaseModel_model_1.BaseModel));
exports.SF00301_User = SF00301_User;
//# sourceMappingURL=SF00301_User.model.js.map