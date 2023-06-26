"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var SF00301_DealFile = (function (_super) {
    __extends(SF00301_DealFile, _super);
    function SF00301_DealFile() {
        _super.apply(this, arguments);
    }
    SF00301_DealFile.prototype.setDealFile = function (data) {
        if (!data)
            return;
        //set basic info & binding value to properties
        this.setData(data);
        this.fileId = data["fileId"];
        this.originalName = data["originalName"];
        this.dealId = data["dealId"];
        this.dealFileId = data["dealFileId"];
        this.dealFileName = data["dealFileName"];
        this.memo = data["memo"];
        this.highlightFlag = data["highlightFlag"];
        this.srcImg = data["srcImg"];
    };
    return SF00301_DealFile;
}(BaseModel_model_1.BaseModel));
exports.SF00301_DealFile = SF00301_DealFile;
//# sourceMappingURL=SF00301_DealFile.model.js.map