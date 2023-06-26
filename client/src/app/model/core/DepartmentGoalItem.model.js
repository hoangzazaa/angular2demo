/**
 * Contain department goal item
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DepartmentGoal_model_1 = require("./DepartmentGoal.model");
var BaseModel_model_1 = require("./BaseModel.model");
var DepartmentGoalItem = (function (_super) {
    __extends(DepartmentGoalItem, _super);
    function DepartmentGoalItem() {
        _super.apply(this, arguments);
    }
    DepartmentGoalItem.prototype.setDepartmentGoalItem = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.type = data["type"];
        this.goal = data["goal"];
        this.month = data["month"];
        this.departmentGoalId = data["departmentGoalId"];
        this.customerType = data["customerType"];
        if (data["departmentGoal"] !== undefined) {
            this.departmentGoal = new DepartmentGoal_model_1.DepartmentGoal();
            this.departmentGoal.setDepartmentGoal(data["departmentGoal"]);
        }
    };
    return DepartmentGoalItem;
}(BaseModel_model_1.BaseModel));
exports.DepartmentGoalItem = DepartmentGoalItem;
//# sourceMappingURL=DepartmentGoalItem.model.js.map