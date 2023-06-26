"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var File_model_1 = require("../../../model/core/File.model");
var CheckSheet_model_1 = require("../COMMON/checksheet/model/CheckSheet.model");
var SF00301_Deal_model_1 = require("./model/SF00301_Deal.model");
var SF00301_Modal_modal_1 = require("./model/SF00301_Modal.modal");
var SF00301Data = (function () {
    function SF00301Data() {
        /* Deal model */
        this.deal = new SF00301_Deal_model_1.SF00301_Deal();
        /* deal's concern items */
        this.concernsItems = [];
        /* list comment on deal */
        this.comments = [];
        /* rule for filter concern itmes */
        this.filter = SF00301Data.CATEGORY.ANY;
        this.fileUploadInProgress = false;
        this.mstLaminations = [];
        /*deal file*/
        this.stagingFileItem = new SF00301_Modal_modal_1.SF00301_FileItem();
        /*file*/
        this.file = new File_model_1.File();
        this.isUpdated = false;
        // get total comments
        this.totalComments = 0;
    }
    SF00301Data.prototype.answerMap = function (key) {
        // get answer by questionCode = key
        var answer = this.checkSheets[key];
        // check answer undefined => new CheckSheet() with questionCode = key
        if (answer == undefined) {
            answer = new CheckSheet_model_1.CheckSheetModel();
        }
        return answer;
    };
    SF00301Data.prototype.valueItem = function (data) {
        if (data)
            return data.name;
        return '';
    };
    SF00301Data.CATEGORY = {
        ANY: Symbol("SF00301_ConcernItem.Category.ANY"),
        PRODUCT: Symbol("SF00301_ConcernItem.Category.PRODUCT"),
        DEAL_FILE: Symbol("SF00301_ConcernItem.Category.DEAL_FILE"),
        QUOTATION: Symbol("SF00301_ConcernItem.Category.QUOTATION"),
        PRODUCT_FILE: Symbol("SF00301_ConcernItem.Category.PRODUCT_FILE"),
        COMMENT_FILE: Symbol("SF00301_ConcernItem.Category.COMMENT_FILE"),
        ANY_FILE: Symbol("SF00301_ConcernItem.Category.ANY_FILE") // DO NOT assign this category to any item, it's used special for filter
    };
    SF00301Data = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SF00301Data);
    return SF00301Data;
}());
exports.SF00301Data = SF00301Data;
//# sourceMappingURL=SF00301.data.js.map