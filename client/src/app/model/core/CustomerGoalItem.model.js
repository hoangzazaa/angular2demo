/**
 * Contain customer goal items
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomerGoal_model_1 = require("./CustomerGoal.model");
var BaseModel_model_1 = require("./BaseModel.model");
var CustomerGoalItem = (function (_super) {
    __extends(CustomerGoalItem, _super);
    function CustomerGoalItem() {
        _super.apply(this, arguments);
    }
    CustomerGoalItem.prototype.setCustomerGoalItem = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.type = data["type"];
        this.goal = data["goal"];
        this.month = data["month"];
        this.customerGoalId = data["customerGoalId"];
        this.customerType = data["customerType"];
        if (data["customerGoal"] !== undefined) {
            this.customerGoal = new CustomerGoal_model_1.CustomerGoal();
            this.customerGoal.setCustomerGoal(data["customerGoal"]);
        }
    };
    return CustomerGoalItem;
}(BaseModel_model_1.BaseModel));
exports.CustomerGoalItem = CustomerGoalItem;
//# sourceMappingURL=CustomerGoalItem.model.js.map