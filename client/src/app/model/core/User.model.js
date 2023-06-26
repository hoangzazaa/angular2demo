/**
 * Contain user information used to authenticate and authorize
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyboxItem_model_1 = require("./MyboxItem.model");
var Deal_model_1 = require("./Deal.model");
var Comment_model_1 = require("./Comment.model");
var UserPasswordRecover_model_1 = require("./UserPasswordRecover.model");
var Department_model_1 = require("./Department.model");
var BaseModel_model_1 = require("./BaseModel.model");
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.apply(this, arguments);
    }
    User.prototype.setUser = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.username = data["username"];
        this.password = data["password"];
        this.enableFlag = data["enableFlag"];
        this.role = data["role"];
        this.email = data["email"];
        this.departmentId = data["departmentId"];
        this.departmentCode = data["departmentCode"];
        this.deleteFlag = data["deleteFlag"];
        this.userCode = data["userCode"];
        if (data["myboxItems"] !== undefined) {
            this.myboxItems = [];
            for (var i = 0; i < data["myboxItems"].length; i++) {
                var tmp = new MyboxItem_model_1.MyboxItem();
                tmp.setMyboxItem(data["myboxItems"][i]);
                this.myboxItems.push(tmp);
            }
        }
        if (data["deals"] !== undefined) {
            this.deals = [];
            for (var i = 0; i < data["deals"].length; i++) {
                var tmp = new Deal_model_1.Deal();
                tmp.setDeal(data["deals"][i]);
                this.deals.push(tmp);
            }
        }
        if (data["comments"] !== undefined) {
            this.comments = [];
            for (var i = 0; i < data["comments"].length; i++) {
                var tmp = new Comment_model_1.Comment();
                tmp.setComment(data["comments"][i]);
                this.comments.push(tmp);
            }
        }
        if (data["userPasswordRecovers"] !== undefined) {
            this.userPasswordRecovers = [];
            for (var i = 0; i < data["userPasswordRecovers"].length; i++) {
                var tmp = new UserPasswordRecover_model_1.UserPasswordRecover();
                tmp.setUserPasswordRecover(data["userPasswordRecovers"][i]);
                this.userPasswordRecovers.push(tmp);
            }
        }
        if (data["salesDeals"] !== undefined) {
            this.salesDeals = [];
            for (var i = 0; i < data["salesDeals"].length; i++) {
                var tmp = new Deal_model_1.Deal();
                tmp.setDeal(data["salesDeals"][i]);
                this.salesDeals.push(tmp);
            }
        }
        if (data["department"] !== undefined) {
            this.department = new Department_model_1.Department();
            this.department.setDepartment(data["department"]);
        }
    };
    return User;
}(BaseModel_model_1.BaseModel));
exports.User = User;
//# sourceMappingURL=User.model.js.map