"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var User_model_1 = require("./User.model");
var Customer_model_1 = require("./Customer.model");
var MyboxItem_model_1 = require("./MyboxItem.model");
var DealProduct_model_1 = require("./DealProduct.model");
var Quotation_model_1 = require("./Quotation.model");
var Comment_model_1 = require("./Comment.model");
var Checklist_model_1 = require("./Checklist.model");
var DealFile_model_1 = require("./DealFile.model");
var Order_model_1 = require("./Order.model");
var BaseModel_model_1 = require("./BaseModel.model");
var mst_data_type_1 = require("../../helper/mst-data-type");
var Deal = (function (_super) {
    __extends(Deal, _super);
    function Deal() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Deal.prototype, "isTemplate", {
        get: function () {
            return this.templateFlag == mst_data_type_1.TEMPLATE_DEAL.TRUE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Deal.prototype, "isClosed", {
        get: function () {
            return !!this.closedFlag;
        },
        enumerable: true,
        configurable: true
    });
    Deal.prototype.setDeal = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.dealName = data["dealName"];
        this.dealCode = data["dealCode"];
        this.dealType = data["dealType"];
        this.salesId = data["salesId"];
        this.estTotalDeal = data["estTotalDeal"];
        this.dealStatus = data["dealStatus"];
        this.customerId = data["customerId"];
        this.customerName = data["customerName"];
        this.userId = data["userId"];
        this.deliveryDate = data["deliveryDate"] != undefined ? new Date(data["deliveryDate"]) : undefined;
        this.templateFlag = data["templateFlag"];
        this.deleteFlag = data["deleteFlag"];
        this.closedFlag = data["closedFlag"];
        if (data["user"] !== undefined) {
            this.user = new User_model_1.User();
            this.user.setUser(data["user"]);
        }
        if (data["customer"] !== undefined) {
            this.customer = new Customer_model_1.Customer();
            this.customer.setCustomer(data["customer"]);
        }
        if (data["myboxItems"] !== undefined) {
            this.myboxItems = [];
            for (var i = 0; i < data["myboxItems"].length; i++) {
                var tmp = new MyboxItem_model_1.MyboxItem();
                tmp.setMyboxItem(data["myboxItems"][i]);
                this.myboxItems.push(tmp);
            }
        }
        if (data["dealProducts"] !== undefined) {
            this.dealProducts = [];
            for (var i = 0; i < data["dealProducts"].length; i++) {
                var tmp = new DealProduct_model_1.DealProduct();
                tmp.setDealProduct(data["dealProducts"][i]);
                this.dealProducts.push(tmp);
            }
        }
        if (data["quotations"] !== undefined) {
            this.quotations = [];
            for (var i = 0; i < data["quotations"].length; i++) {
                var tmp = new Quotation_model_1.Quotation();
                tmp.setQuotation(data["quotations"][i]);
                this.quotations.push(tmp);
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
        if (data["checklist"] !== undefined) {
            this.checklist = [];
            for (var i = 0; i < data["checklist"].length; i++) {
                var tmp = new Checklist_model_1.Checklist();
                tmp.setChecklist(data["checklist"][i]);
                this.checklist.push(tmp);
            }
        }
        if (data["dealFiles"] !== undefined) {
            this.dealFiles = [];
            for (var i = 0; i < data["dealFiles"].length; i++) {
                var tmp = new DealFile_model_1.DealFile();
                tmp.setDealFile(data["dealFiles"][i]);
                this.dealFiles.push(tmp);
            }
        }
        if (data["order"] !== undefined) {
            this.order = new Order_model_1.Order();
            this.order.setOrder(data["order"]);
        }
        if (data["sales"] !== undefined) {
            this.sales = new User_model_1.User();
            this.sales.setUser(data["sales"]);
        }
    };
    return Deal;
}(BaseModel_model_1.BaseModel));
exports.Deal = Deal;
//# sourceMappingURL=Deal.model.js.map