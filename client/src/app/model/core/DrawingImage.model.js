/**
 * Contain drawing image used for SF008
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
var DrawingImage = (function (_super) {
    __extends(DrawingImage, _super);
    function DrawingImage() {
        _super.apply(this, arguments);
    }
    DrawingImage.prototype.setDrawingImage = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.productId = data["productId"];
        this.x = data["x"];
        this.y = data["y"];
        this.rotate = data["rotate"];
        if (data["product"] !== undefined) {
            this.product = new Product_model_1.Product();
            this.product.setProduct(data["product"]);
        }
    };
    return DrawingImage;
}(BaseModel_model_1.BaseModel));
exports.DrawingImage = DrawingImage;
//# sourceMappingURL=DrawingImage.model.js.map