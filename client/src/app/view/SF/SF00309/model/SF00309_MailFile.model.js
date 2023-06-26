"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var SF00309_MailFile = (function (_super) {
    __extends(SF00309_MailFile, _super);
    function SF00309_MailFile() {
        _super.apply(this, arguments);
    }
    SF00309_MailFile.prototype.setProductFile = function (data) {
        if (!data)
            return;
        //set basic info & binding value to properties
        this.setData(data);
        this.fileId = data["fileId"];
        this.fileType = data["fileType"];
        this.memo = data["memo"];
        this.originalName = data["originalName"];
        this.srcImg = data["srcImg"];
        this.commentId = data["commentId"];
        this.mailFileId = data["mailFileId"];
        this.mailFileName = data["mailFileName"];
    };
    return SF00309_MailFile;
}(BaseModel_model_1.BaseModel));
exports.SF00309_MailFile = SF00309_MailFile;
//# sourceMappingURL=SF00309_MailFile.model.js.map