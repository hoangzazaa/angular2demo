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
var SF00301_Comment_model_1 = require("../model/SF00301_Comment.model");
var SF00301_data_1 = require("../SF00301.data");
var SF00301_service_1 = require("../SF00301.service");
var SF0030107Component = (function () {
    function SF0030107Component(sf00301Service) {
        this.sf00301Service = sf00301Service;
        this.requestMail = new core_1.EventEmitter();
        this.readyToComment = false;
        this.staging = new SF00301_Comment_model_1.SF00301_Comment();
        this.constantTitle = "【活動履歴】";
    }
    Object.defineProperty(SF0030107Component.prototype, "deal", {
        get: function () {
            return this.sf00301Service.pageData.deal;
        },
        enumerable: true,
        configurable: true
    });
    SF0030107Component.prototype.addComment = function () {
        var _this = this;
        this.staging.title = this.constantTitle;
        this.sf00301Service.addComment(this.staging).then(function () {
            _this.staging = new SF00301_Comment_model_1.SF00301_Comment();
            _this.readyToComment = false;
        });
    };
    SF0030107Component.prototype.showMore = function () {
        this.sf00301Service.showMoreComment().then(null);
    };
    Object.defineProperty(SF0030107Component.prototype, "stagingValue", {
        get: function () {
            return this.staging.value;
        },
        set: function (value) {
            if (value) {
                this.readyToComment = true;
                this.staging.value = value;
            }
            else {
                this.readyToComment = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030107Component.prototype, "noProductHighlight", {
        get: function () {
            // check if no product highlight
            //http://fridaynight.vnext.vn/issues/2288 : 1.Open SF00309
            if (this.sf00301Service.pageData.concernsItems != null) {
                var concernsItems = this.sf00301Service.pageData.concernsItems;
                var index = concernsItems.findIndex(function (item) {
                    var product = item;
                    return product.highlightFlag == 1 && SF00301_data_1.SF00301Data.CATEGORY.PRODUCT == item.category;
                });
                if (index < 0)
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030107Component.prototype, "isDisabled", {
        get: function () {
            return (this.totalRows <= 10 || this.totalRows == (this.history || []).length);
        },
        enumerable: true,
        configurable: true
    });
    SF0030107Component.prototype.sendRequestMail = function (requestType) {
        this.requestMail.emit(requestType);
    };
    SF0030107Component.prototype.fileDownload = function (evt, file) {
        evt.preventDefault();
        this.sf00301Service.downloadCommentFile(file.fileId, file.originalName, file.commentId)
            .then(function (result) {
            var link = document.createElement('a');
            link.setAttribute('download', result.fileName);
            link.href = result.filePath;
            link.click();
        }).catch(function (err) { console.log(err); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SF0030107Component.prototype, "history", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SF0030107Component.prototype, "canShowMore", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0030107Component.prototype, "totalRows", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030107Component.prototype, "requestMail", void 0);
    SF0030107Component = __decorate([
        core_1.Component({
            selector: "sf0030107-comment",
            templateUrl: "SF0030107.Comment.component.html",
            styleUrls: ["SF0030107.Comment.component.css"]
        }), 
        __metadata('design:paramtypes', [SF00301_service_1.SF00301Service])
    ], SF0030107Component);
    return SF0030107Component;
}());
exports.SF0030107Component = SF0030107Component;
//# sourceMappingURL=SF0030107.Comment.component.js.map