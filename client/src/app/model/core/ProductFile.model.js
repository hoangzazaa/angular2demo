/**
 * Contain information of file of product
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Product_model_1 = require("./Product.model");
var File_model_1 = require("./File.model");
var BaseModel_model_1 = require("./BaseModel.model");
var ProductFile = (function (_super) {
    __extends(ProductFile, _super);
    function ProductFile() {
        _super.apply(this, arguments);
    }
    ProductFile.prototype.setProductFile = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.fileId = data["fileId"];
        this.originalName = data["originalName"];
        this.productId = data["productId"];
        this.productFileId = data["productFileId"];
        this.productFileName = data["productFileName"];
        this.primaryFlag = data["primaryFlag"];
        this.memo = data["memo"];
        this.type = data["type"];
        this.srcImg = data["srcImg"];
        if (data["product"] !== undefined) {
            this.product = new Product_model_1.Product();
            this.product.setProduct(data["product"]);
        }
        if (data["file"] !== undefined) {
            this.file = new File_model_1.File();
            this.file.setFile(data["file"]);
        }
    };
    return ProductFile;
}(BaseModel_model_1.BaseModel));
exports.ProductFile = ProductFile;
//# sourceMappingURL=ProductFile.model.js.map