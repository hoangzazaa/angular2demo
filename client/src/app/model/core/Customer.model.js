/**
 * Contain all customer infos.
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Deal_model_1 = require("./Deal.model");
var ShippingDestination_model_1 = require('./ShippingDestination.model');
var BaseModel_model_1 = require('./BaseModel.model');
var Customer = (function (_super) {
    __extends(Customer, _super);
    function Customer() {
        _super.apply(this, arguments);
    }
    Customer.prototype.setCustomer = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.name = data["name"];
        this.deptName = data["deptName"];
        this.salerName = data["salerName"];
        this.hpInfo = data["hpInfo"];
        this.memo = data["memo"];
        this.customerCode = data["customerCode"];
        this.deleteFlag = data["deleteFlag"];
        this.abbreviation = data["abbreviation"];
        this.furigana = data["furigana"];
        this.abbrFurigana = data["abbrFurigana"];
        this.customerRep = data["customerRep"];
        this.customerContact = data["customerContact"];
        this.picCode = data["picCode"];
        if (data["deal"] !== undefined) {
            this.deal = [];
            for (var i = 0; i < data["deal"].length; i++) {
                var tmp = new Deal_model_1.Deal();
                tmp.setDeal(data["deal"][i]);
                this.deal.push(tmp);
            }
        }
        if (data["shippingDestinations"] !== undefined) {
            this.shippingDestinations = [];
            for (var i = 0; i < data["shippingDestinations"].length; i++) {
                var tmp = new ShippingDestination_model_1.ShippingDestination();
                tmp.setShippingDestination(data["shippingDestinations"][i]);
                this.shippingDestinations.push(tmp);
            }
        }
    };
    return Customer;
}(BaseModel_model_1.BaseModel));
exports.Customer = Customer;
//# sourceMappingURL=Customer.model.js.map