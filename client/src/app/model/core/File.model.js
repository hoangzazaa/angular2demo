"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require('./BaseModel.model');
var File = (function (_super) {
    __extends(File, _super);
    function File() {
        _super.apply(this, arguments);
    }
    /**
     * JSON をデコード
     * @param data JSON
     */
    File.prototype.setFile = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.fileCode = data["fileCode"];
        this.filePath = data["filePath"];
    };
    /**
     * JSON 形式に変換
     * @return JSON
     */
    File.prototype.toFileJson = function () {
        return {
            id: this.id,
            createdUser: null,
            updatedUser: null,
            createdDate: null,
            updatedDate: null,
            fileCode: this.fileCode,
            filePath: this.filePath
        };
    };
    return File;
}(BaseModel_model_1.BaseModel));
exports.File = File;
//# sourceMappingURL=File.model.js.map