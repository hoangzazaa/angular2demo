"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var SF00301_ProductFile = (function (_super) {
    __extends(SF00301_ProductFile, _super);
    function SF00301_ProductFile() {
        _super.apply(this, arguments);
    }
    SF00301_ProductFile.prototype.setProductFile = function (data) {
        if (!data)
            return;
        //set basic info & binding value to properties
        this.setData(data);
        this.fileId = data["fileId"];
        this.productId = data["productId"];
        this.productFileName = data["productFileName"];
        this.primaryFlag = data["primaryFlag"];
        this.productFileId = data["productFileId"];
        this.fileType = data["fileType"];
        this.productName = data["productName"];
        this.memo = data["memo"];
        this.productCode = data["productCode"];
        this.originalName = data["originalName"];
        this.highlightFlag = data["highlightFlag"];
        this.srcImg = data["srcImg"];
    };
    return SF00301_ProductFile;
}(BaseModel_model_1.BaseModel));
exports.SF00301_ProductFile = SF00301_ProductFile;
//# sourceMappingURL=SF00301_ProductFile.model.js.map