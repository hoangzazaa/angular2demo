/**
 * Contain information of file of deal
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Deal_model_1 = require("./Deal.model");
var File_model_1 = require("./File.model");
var BaseModel_model_1 = require("./BaseModel.model");
var DealFile = (function (_super) {
    __extends(DealFile, _super);
    function DealFile() {
        _super.apply(this, arguments);
    }
    DealFile.prototype.setDealFile = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.fileId = data["fileId"];
        this.originalName = data["originalName"];
        this.dealId = data["dealId"];
        this.dealFileId = data["dealFileId"];
        this.dealFileName = data["dealFileName"];
        this.memo = data["memo"];
        this.highlightFlag = data["highlightFlag"];
        if (data["deal"] !== undefined) {
            this.deal = new Deal_model_1.Deal();
            this.deal.setDeal(data["deal"]);
        }
        if (data["file"] !== undefined) {
            this.file = new File_model_1.File();
            this.file.setFile(data["file"]);
        }
    };
    return DealFile;
}(BaseModel_model_1.BaseModel));
exports.DealFile = DealFile;
//# sourceMappingURL=DealFile.model.js.map