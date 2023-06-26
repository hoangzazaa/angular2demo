/**
 * Contain customer goal
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Customer_model_1 = require("./Customer.model");
var CustomerGoalItem_model_1 = require("./CustomerGoalItem.model");
var User_model_1 = require("./User.model");
var Department_model_1 = require("./Department.model");
var BaseModel_model_1 = require("./BaseModel.model");
var CustomerGoal = (function (_super) {
    __extends(CustomerGoal, _super);
    function CustomerGoal() {
        _super.apply(this, arguments);
    }
    CustomerGoal.prototype.setCustomerGoal = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.year = data["year"];
        this.activityPolicy = data["activityPolicy"];
        this.customerId = data["customerId"];
        this.picId = data["picId"];
        this.departmentId = data["departmentId"];
        if (data["customer"] !== undefined) {
            this.customer = new Customer_model_1.Customer();
            this.customer.setCustomer(data["customer"]);
        }
        if (data["goalItems"] !== undefined) {
            this.goalItems = [];
            for (var i = 0; i < data["goalItems"].length; i++) {
                var tmp = new CustomerGoalItem_model_1.CustomerGoalItem();
                tmp.setCustomerGoalItem(data["goalItems"][i]);
                this.goalItems.push(tmp);
            }
        }
        if (data["user"] !== undefined) {
            this.user = new User_model_1.User();
            this.user.setUser(data["user"]);
        }
        if (data["department"] !== undefined) {
            this.department = new Department_model_1.Department();
            this.department.setDepartment(data["department"]);
        }
    };
    return CustomerGoal;
}(BaseModel_model_1.BaseModel));
exports.CustomerGoal = CustomerGoal;
//# sourceMappingURL=CustomerGoal.model.js.map