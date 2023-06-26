"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var constants_1 = require("../../../../helper/constants");
var SF00301_CommentFile_model_1 = require('./SF00301_CommentFile.model');
var SF00301_Comment = (function (_super) {
    __extends(SF00301_Comment, _super);
    function SF00301_Comment() {
        _super.apply(this, arguments);
        this.commentFiles = [];
    }
    SF00301_Comment.prototype.setComment = function (data) {
        if (!data)
            return;
        //set basic info & binding value to properties
        this.setData(data);
        this.title = data["title"];
        this.value = data["value"];
        this.userId = data["userId"];
        this.dealId = data["dealId"];
        this.username = (data["departmentName"] == undefined ? '' : data["departmentName"] + constants_1.Constants.SLASH_JP) + data["username"];
        if (data['commentFiles']) {
            for (var _i = 0, _a = data['commentFiles']; _i < _a.length; _i++) {
                var commentFileData = _a[_i];
                var commentFile = new SF00301_CommentFile_model_1.SF00301_CommentFile();
                commentFile.setCommentFile(commentFileData);
                this.commentFiles.push(commentFile);
            }
        }
    };
    SF00301_Comment.prototype.shortenValue = function () {
        if (this.value.length <= 40)
            return this.value;
        return this.value.substring(0, 37) + "...";
    };
    return SF00301_Comment;
}(BaseModel_model_1.BaseModel));
exports.SF00301_Comment = SF00301_Comment;
//# sourceMappingURL=SF00301_Comment.model.js.map