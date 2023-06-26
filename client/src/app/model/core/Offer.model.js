/**
 * Contain offer info
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DealProduct_model_1 = require("./DealProduct.model");
var ProductOutput_model_1 = require("./ProductOutput.model");
var BaseModel_model_1 = require("./BaseModel.model");
var Offer = (function (_super) {
    __extends(Offer, _super);
    function Offer() {
        _super.apply(this, arguments);
    }
    Offer.prototype.setOffer = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.dealProductId = data["dealProductId"];
        this.unitPrice = data["unitPrice"];
        this.total = data["total"];
        this.profitRate = data["profitRate"];
        this.productOutputId = data["productOutputId"];
        if (data["dealProduct"] !== undefined) {
            this.dealProduct = new DealProduct_model_1.DealProduct();
            this.dealProduct.setDealProduct(data["dealProduct"]);
        }
        if (data["productOutput"] !== undefined) {
            this.productOutput = new ProductOutput_model_1.ProductOutput();
            this.productOutput.setProductOutput(data["productOutput"]);
        }
    };
    return Offer;
}(BaseModel_model_1.BaseModel));
exports.Offer = Offer;
//# sourceMappingURL=Offer.model.js.map