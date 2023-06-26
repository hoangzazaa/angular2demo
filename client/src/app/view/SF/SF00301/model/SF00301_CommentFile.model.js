"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var SF00301_CommentFile = (function (_super) {
    __extends(SF00301_CommentFile, _super);
    function SF00301_CommentFile() {
        _super.apply(this, arguments);
    }
    SF00301_CommentFile.prototype.setCommentFile = function (data) {
        if (!data)
            return;
        //set basic info & binding value to properties
        this.setData(data);
        this.originalName = data['originalName'];
        this.fileId = data['fileId'];
        this.commentId = data['commentId'];
        this.srcImg = data['srcImg'];
    };
    return SF00301_CommentFile;
}(BaseModel_model_1.BaseModel));
exports.SF00301_CommentFile = SF00301_CommentFile;
//# sourceMappingURL=SF00301_CommentFile.model.js.map