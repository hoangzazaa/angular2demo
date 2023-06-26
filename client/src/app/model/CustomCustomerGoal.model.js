"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomerGoal_model_1 = require("./core/CustomerGoal.model");
var CustomerDataItem_model_1 = require("./CustomerDataItem.model");
var Customer_model_1 = require("./core/Customer.model");
var CustomerGoalItem_model_1 = require("./core/CustomerGoalItem.model");
var User_model_1 = require("./core/User.model");
var Department_model_1 = require("./core/Department.model");
/**
 * Created by hoangtd on 2/18/2017.
 */
var CustomCustomerGoal = (function (_super) {
    __extends(CustomCustomerGoal, _super);
    function CustomCustomerGoal() {
        _super.apply(this, arguments);
        /**
         * 売上実績値
         *
         * 添字: sfr_sf_customer_goal_item.type * 3 + 月  (月は 4月=0, 5月=1, ... 3月=11)
         */
        this.customerDataItems = [];
        /**
         * 新規比率
         *
         * 添字: 月  (月は 4月=0, 5月=1, ... 3月=11)
         */
        this.interestedRateNew = [];
        this.goalType = 0;
    }
    CustomCustomerGoal.prototype.setCustomCustomerGoal = function (data) {
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
        this.goalType = data["goalType"];
        if (data["customer"] !== undefined) {
            this.customer = new Customer_model_1.Customer();
            this.customer.setCustomer(data["customer"]);
        }
        if (data["department"] !== undefined) {
            this.department = new Department_model_1.Department();
            this.department.setDepartment(data["department"]);
        }
        if (data["user"] !== undefined) {
            this.user = new User_model_1.User();
            this.user.setUser(data["user"]);
        }
        if (data["goalItems"] !== undefined) {
            this.goalItems = [];
            for (var i = 0; i < data["goalItems"].length; i++) {
                var tmp = new CustomerGoalItem_model_1.CustomerGoalItem();
                tmp.setCustomerGoalItem(data["goalItems"][i]);
                this.goalItems.push(tmp);
            }
        }
        if (data["customerDataItems"] !== undefined) {
            this.customerDataItems = [];
            for (var i = 0; i < data["customerDataItems"].length; i++) {
                var tmp = new CustomerDataItem_model_1.CustomerDataItem();
                tmp.setCustomerDataItem(data["customerDataItems"][i]);
                this.customerDataItems.push(tmp);
            }
        }
    };
    return CustomCustomerGoal;
}(CustomerGoal_model_1.CustomerGoal));
exports.CustomCustomerGoal = CustomCustomerGoal;
//# sourceMappingURL=CustomCustomerGoal.model.js.map