/**
 * Contain information of loading address
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrderItem_model_1 = require("./OrderItem.model");
var BaseModel_model_1 = require("./BaseModel.model");
var LoadingAddress = (function (_super) {
    __extends(LoadingAddress, _super);
    function LoadingAddress() {
        _super.apply(this, arguments);
    }
    LoadingAddress.prototype.setLoadingAddress = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.value = data["value"];
        if (data["orderItem"] !== undefined) {
            this.orderItem = [];
            for (var i = 0; i < data["orderItem"].length; i++) {
                var tmp = new OrderItem_model_1.OrderItem();
                tmp.setOrderItem(data["orderItem"][i]);
                this.orderItem.push(tmp);
            }
        }
    };
    return LoadingAddress;
}(BaseModel_model_1.BaseModel));
exports.LoadingAddress = LoadingAddress;
//# sourceMappingURL=LoadingAddress.model.js.map