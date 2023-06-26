/**
 * Contain department info
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var User_model_1 = require("./User.model");
var DepartmentGoal_model_1 = require("./DepartmentGoal.model");
var CustomerGoal_model_1 = require("./CustomerGoal.model");
var BaseModel_model_1 = require("./BaseModel.model");
var Department = (function (_super) {
    __extends(Department, _super);
    function Department() {
        _super.apply(this, arguments);
    }
    Department.prototype.setDepartment = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.department = data["department"];
        this.departmentCode = data["departmentCode"];
        this.mailGroupFlag = data["mailGroupFlag"];
        this.type = data["type"];
        if (data["users"] !== undefined) {
            this.users = [];
            for (var i = 0; i < data["users"].length; i++) {
                var tmp = new User_model_1.User();
                tmp.setUser(data["users"][i]);
                this.users.push(tmp);
            }
        }
        if (data["departmentGoals"] !== undefined) {
            this.departmentGoals = [];
            for (var i = 0; i < data["departmentGoals"].length; i++) {
                var tmp = new DepartmentGoal_model_1.DepartmentGoal();
                tmp.setDepartmentGoal(data["departmentGoals"][i]);
                this.departmentGoals.push(tmp);
            }
        }
        if (data["customerGoals"] !== undefined) {
            this.customerGoals = [];
            for (var i = 0; i < data["customerGoals"].length; i++) {
                var tmp = new CustomerGoal_model_1.CustomerGoal();
                tmp.setCustomerGoal(data["customerGoals"][i]);
                this.customerGoals.push(tmp);
            }
        }
    };
    return Department;
}(BaseModel_model_1.BaseModel));
exports.Department = Department;
//# sourceMappingURL=Department.model.js.map