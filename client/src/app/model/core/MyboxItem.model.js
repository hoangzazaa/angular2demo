/**
 * Contain all information of items included in my box
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var User_model_1 = require("./User.model");
var Deal_model_1 = require("./Deal.model");
var BaseModel_model_1 = require("./BaseModel.model");
var MyboxItem = (function (_super) {
    __extends(MyboxItem, _super);
    function MyboxItem() {
        _super.apply(this, arguments);
    }
    MyboxItem.prototype.setMyboxItem = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.userId = data["userId"];
        this.dealId = data["dealId"];
        if (data["user"] !== undefined) {
            this.user = new User_model_1.User();
            this.user.setUser(data["user"]);
        }
        if (data["deal"] !== undefined) {
            this.deal = new Deal_model_1.Deal();
            this.deal.setDeal(data["deal"]);
        }
    };
    return MyboxItem;
}(BaseModel_model_1.BaseModel));
exports.MyboxItem = MyboxItem;
//# sourceMappingURL=MyboxItem.model.js.map