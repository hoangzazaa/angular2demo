/**
 * Contain comments of user for each deal
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Deal_model_1 = require("./Deal.model");
var User_model_1 = require("./User.model");
var BaseModel_model_1 = require("./BaseModel.model");
var Comment = (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        _super.apply(this, arguments);
    }
    Comment.prototype.setComment = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.value = data["value"];
        this.userId = data["userId"];
        this.dealId = data["dealId"];
        if (data["deal"] !== undefined) {
            this.deal = new Deal_model_1.Deal();
            this.deal.setDeal(data["deal"]);
        }
        if (data["user"] !== undefined) {
            this.user = new User_model_1.User();
            this.user.setUser(data["user"]);
        }
    };
    return Comment;
}(BaseModel_model_1.BaseModel));
exports.Comment = Comment;
//# sourceMappingURL=Comment.model.js.map