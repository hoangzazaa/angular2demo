/**
 * Contain department goal
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Department_model_1 = require("./Department.model");
var DepartmentGoalItem_model_1 = require("./DepartmentGoalItem.model");
var BaseModel_model_1 = require("./BaseModel.model");
var DepartmentGoal = (function (_super) {
    __extends(DepartmentGoal, _super);
    function DepartmentGoal() {
        _super.apply(this, arguments);
    }
    DepartmentGoal.prototype.setDepartmentGoal = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.year = data["year"];
        this.activityPolicy = data["activityPolicy"];
        this.departmentId = data["departmentId"];
        if (data["department"] !== undefined) {
            this.department = new Department_model_1.Department();
            this.department.setDepartment(data["department"]);
        }
        if (data["goalItems"] !== undefined) {
            this.goalItems = [];
            for (var i = 0; i < data["goalItems"].length; i++) {
                var tmp = new DepartmentGoalItem_model_1.DepartmentGoalItem();
                tmp.setDepartmentGoalItem(data["goalItems"][i]);
                this.goalItems.push(tmp);
            }
        }
    };
    return DepartmentGoal;
}(BaseModel_model_1.BaseModel));
exports.DepartmentGoal = DepartmentGoal;
//# sourceMappingURL=DepartmentGoal.model.js.map