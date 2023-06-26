/**
 * Contain information about common fees of a deal product
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Product_model_1 = require("./Product.model");
var BaseModel_model_1 = require("./BaseModel.model");
var ProductCommonFee = (function (_super) {
    __extends(ProductCommonFee, _super);
    function ProductCommonFee() {
        _super.apply(this, arguments);
    }
    ProductCommonFee.prototype.setProductCommonFee = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.designFee = data["designFee"];
        this.plateMakingFee = data["plateMakingFee"];
        this.woodenFee = data["woodenFee"];
        this.moldFee = data["moldFee"];
        this.resinFee = data["resinFee"];
        this.productId = data["productId"];
        if (data["product"] !== undefined) {
            this.product = new Product_model_1.Product();
            this.product.setProduct(data["product"]);
        }
    };
    return ProductCommonFee;
}(BaseModel_model_1.BaseModel));
exports.ProductCommonFee = ProductCommonFee;
//# sourceMappingURL=ProductCommonFee.model.js.map