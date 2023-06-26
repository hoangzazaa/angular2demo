/**
 * Contain deal products in deal.
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Deal_model_1 = require("./Deal.model");
var Product_model_1 = require("./Product.model");
var QuotationItem_model_1 = require("./QuotationItem.model");
var Offer_model_1 = require("./Offer.model");
var BaseModel_model_1 = require("./BaseModel.model");
var DealProduct = (function (_super) {
    __extends(DealProduct, _super);
    function DealProduct() {
        _super.apply(this, arguments);
    }
    DealProduct.prototype.setDealProduct = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.dealId = data["dealId"];
        this.productId = data["productId"];
        this.highlightFlag = data["highlightFlag"];
        this.type = data["type"];
        if (data["deal"] !== undefined) {
            this.deal = new Deal_model_1.Deal();
            this.deal.setDeal(data["deal"]);
        }
        if (data["product"] !== undefined) {
            this.product = new Product_model_1.Product();
            this.product.setProduct(data["product"]);
        }
        if (data["quotationItems"] !== undefined) {
            this.quotationItems = [];
            for (var i = 0; i < data["quotationItems"].length; i++) {
                var tmp = new QuotationItem_model_1.QuotationItem();
                tmp.setQuotationItem(data["quotationItems"][i]);
                this.quotationItems.push(tmp);
            }
        }
        if (data["offers"] !== undefined) {
            this.offers = [];
            for (var i = 0; i < data["offers"].length; i++) {
                var tmp = new Offer_model_1.Offer();
                tmp.setOffer(data["offers"][i]);
                this.offers.push(tmp);
            }
        }
    };
    return DealProduct;
}(BaseModel_model_1.BaseModel));
exports.DealProduct = DealProduct;
//# sourceMappingURL=DealProduct.model.js.map