"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
/**
 * 届け先ファイル
 */
var ShippingDestinationImage = (function (_super) {
    __extends(ShippingDestinationImage, _super);
    function ShippingDestinationImage() {
        _super.apply(this, arguments);
    }
    /**
     * JSON を当モデルに記入
     *
     * @param data JSON
     */
    ShippingDestinationImage.prototype.setShippingDestinationImage = function (data) {
        this.id = data.id;
        this.image = data.image;
        this.temporaryFileName = null;
        this.memo = data.memo;
    };
    /**
     * JSON 形式に変換する
     *
     * @return JSON
     */
    ShippingDestinationImage.prototype.toShippingDestinationImageJson = function () {
        return {
            id: this.id,
            temporaryFileName: this.temporaryFileName,
            memo: this.memo
        };
    };
    return ShippingDestinationImage;
}(BaseModel_model_1.BaseModel));
exports.ShippingDestinationImage = ShippingDestinationImage;
//# sourceMappingURL=ShippingDestinationImage.model.js.map