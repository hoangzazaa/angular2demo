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
/**
 * Created by hoangtd on 4/21/2017.
 */
var core_1 = require("@angular/core");
var paper_model_1 = require("../../model/paper.model");
var format_util_1 = require("../../../../../util/format-util");
var data_util_1 = require("../../../../../util/data-util");
var unicode_util_1 = require("../../../../../util/unicode-util");
var PAGE_SIZE = 50;
var SF0030222Component = (function () {
    function SF0030222Component() {
        this.emitClosed = new core_1.EventEmitter();
        this.emitSubmitData = new core_1.EventEmitter();
        this.tabNumber = 1;
        this.pageIndex = 1;
        this.pageIndexTab2 = 1;
        this.createListData();
    }
    Object.defineProperty(SF0030222Component.prototype, "mstPapersBackground", {
        set: function (value) {
            this.papersSearch = value;
            this.dataPaging = this.papersSearch.slice(0, PAGE_SIZE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030222Component.prototype, "mstPapersBackgroundTab2", {
        set: function (value) {
            this.papersSearchTab2 = value;
            this.dataPagingTab2 = this.papersSearchTab2.slice(0, PAGE_SIZE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030222Component.prototype, "pageData", {
        get: function () {
            return this.helper.getSF00302Data();
        },
        enumerable: true,
        configurable: true
    });
    //1.cancel
    SF0030222Component.prototype.closeModal = function () {
        //create data tags;
        this.tags = [];
        //remove class active
        this.pageData.indexPaperTab1 = null;
        //reset list data;
        this.resetListData();
        // reset tab
        this.tabNumber = 1;
        //emit closed
        this.emitClosed.emit();
    };
    //2. click row event emit value to SF00206
    SF0030222Component.prototype.submitData = function () {
        if (!this.isSubmit)
            return;
        //remove class active
        this.pageData.indexPaperTab1 = null;
        //check paperNew
        var paperModelTmp = new paper_model_1.PaperModel();
        if (this.tabNumber == 1) {
            paperModelTmp = this.paperModelTmp;
        }
        else {
            paperModelTmp = this.paperModelTmpTab2;
        }
        var paperModel = this.pageData.paperModel;
        // check product is new
        if (paperModelTmp.paperName == paperModel.paperName
            && paperModelTmp.basicWeight == paperModel.basicWeight
            && paperModelTmp.normValue == paperModel.normValue) {
            paperModel.isNew = false;
        }
        else {
            paperModel.isNew = true;
        }
        // check clone paper
        if (paperModelTmp.paperName == paperModel.paperName
            && paperModelTmp.basicWeight == paperModel.basicWeight
            && paperModelTmp.normValue != paperModel.normValue) {
            paperModel.isPaperClone = 1;
        }
        else {
            paperModel.isPaperClone = 0;
        }
        // reset tab
        this.tabNumber = 1;
        //submit data paperModal
        this.emitSubmitData.emit(paperModel);
        //reset list data;
        this.resetListData();
    };
    //3. apply filter search list key
    SF0030222Component.prototype.onKeywordsChange = function (tags) {
        // search tab 1
        this.tags = tags;
        if (this.tabNumber == 1) {
            // reset index
            this.pageData.indexPaperTab1 = null;
            //
            this.papersSearch = [];
            this.dataPaging = [];
            // check key search
            if (tags.length > 0) {
                this.papersSearch = this.getPaperSearch(this.pageData.mstPapersBackgroundTab1, tags);
                this.dataPaging = this.papersSearch.slice(0, PAGE_SIZE);
            }
            else {
                this.papersSearch = this.pageData.mstPapersBackgroundTab1;
                this.dataPaging = this.papersSearch.slice(0, PAGE_SIZE);
            }
        }
        else {
            // reset index
            this.pageData.indexPaperTab2 = null;
            //
            this.papersSearchTab2 = [];
            this.dataPagingTab2 = [];
            // check key search
            if (tags.length > 0) {
                this.papersSearchTab2 = this.getPaperSearch(this.pageData.mstPapersBackgroundTab2, tags);
                this.dataPagingTab2 = this.papersSearchTab2.slice(0, PAGE_SIZE);
            }
            else {
                this.papersSearchTab2 = this.pageData.mstPapersBackgroundTab2;
                this.dataPagingTab2 = this.papersSearchTab2.slice(0, PAGE_SIZE);
            }
        }
        // reset value
        this.pageData.paperModel = new paper_model_1.PaperModel();
    };
    SF0030222Component.prototype.getPaperSearch = function (targetDdata, tags) {
        var res = [];
        // search by paperName or NormValue or basicWeight
        targetDdata.map(function (item) {
            // 'and' search
            if (item.paperName) {
                var upperItemNameHan = unicode_util_1.default.convertKanaF2H(item.paperName.toUpperCase());
                var upperItemNameFull = unicode_util_1.default.toFullWidth(item.paperName.toUpperCase());
                var hit_count = 0, tag_length = tags.length;
                for (var i = 0; i < tag_length; i++) {
                    var tagHan = unicode_util_1.default.convertKanaF2H(tags[i].toUpperCase());
                    var tagFull = unicode_util_1.default.toFullWidth(tags[i].toUpperCase());
                    if (upperItemNameHan.indexOf(tagHan) >= 0 || upperItemNameFull.indexOf(tagFull) >= 0) {
                        hit_count++;
                    }
                }
                if (hit_count >= tag_length) {
                    res.push(item);
                }
            }
        });
        return res;
    };
    Object.defineProperty(SF0030222Component.prototype, "record", {
        //4. get record
        get: function () {
            if (this.tabNumber == 1) {
                return this.papersSearch.length;
            }
            else {
                return this.papersSearchTab2.length;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030222Component.prototype, "checkShowTab2", {
        get: function () {
            return this.pageData.showModal2903;
        },
        enumerable: true,
        configurable: true
    });
    //5. set active row click
    SF0030222Component.prototype.changeDataRow = function (index) {
        // reset model
        this.pageData.paperModel = new paper_model_1.PaperModel();
        if (this.tabNumber == 1) {
            this.pageData.paperModel = data_util_1.default.cloneObject(this.dataPaging[index]);
            // set paperModelTmp
            this.paperModelTmp = data_util_1.default.cloneObject(this.dataPaging[index]);
            // indexPaper
            this.pageData.indexPaperTab1 = index;
        }
        else {
            this.pageData.paperModel = data_util_1.default.cloneObject(this.dataPagingTab2[index]);
            // set paperModelTmp
            this.paperModelTmpTab2 = data_util_1.default.cloneObject(this.dataPagingTab2[index]);
            // indexPaper
            this.pageData.indexPaperTab2 = index;
        }
    };
    //6. paging by index
    SF0030222Component.prototype.onPageChanged = function (pageIndex) {
        //tab1
        if (this.tabNumber == 1) {
            //page index
            this.pageIndex = pageIndex;
            //reset forcus index
            this.pageData.indexPaperTab1 = null;
            //image loading
            App.loader('show');
            this.dataPaging = [];
            var page = PAGE_SIZE * (pageIndex - 1);
            this.dataPaging = this.papersSearch.slice(page, page + PAGE_SIZE);
            App.loader('hide');
        }
        else {
            //page index
            this.pageIndexTab2 = pageIndex;
            //reset forcus index
            this.pageData.indexPaperTab2 = null;
            //image loading
            App.loader('show');
            this.dataPagingTab2 = [];
            var page = PAGE_SIZE * (pageIndex - 1);
            this.dataPagingTab2 = this.papersSearchTab2.slice(page, page + PAGE_SIZE);
            App.loader('hide');
        }
        // scoll top
        $('.table-fixed tbody').scrollTop(0);
    };
    SF0030222Component.prototype.changeTab = function (value) {
        this.tabNumber = value;
        // reset search
        this.tags = [];
        // update list
        this.resetListData();
        if (value == 1) {
            this.pageData.indexPaperTab1 = null;
        }
        else {
            this.pageData.indexPaperTab2 = null;
        }
    };
    Object.defineProperty(SF0030222Component.prototype, "pageSize", {
        get: function () {
            return PAGE_SIZE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030222Component.prototype, "paperNormValueDisplay", {
        get: function () {
            if (this.pageData.paperModel != undefined) {
                return this.pageData.paperModel.normValue;
            }
        },
        set: function (value) {
            this.pageData.paperModel.normValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030222Component.prototype, "paperWeightDisplay", {
        get: function () {
            if (this.pageData.paperModel != undefined) {
                return this.pageData.paperModel.basicWeight;
            }
        },
        set: function (value) {
            this.pageData.paperModel.basicWeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030222Component.prototype, "paperNameDisplay", {
        get: function () {
            if (this.pageData.paperModel != undefined) {
                return this.pageData.paperModel.paperName;
            }
        },
        set: function (value) {
            this.pageData.paperModel.paperName = value;
        },
        enumerable: true,
        configurable: true
    });
    // reset list item when closed modal and save modal
    SF0030222Component.prototype.resetListData = function () {
        this.createListData();
        //tab1
        this.papersSearch = this.pageData.mstPapersBackgroundTab1;
        this.dataPaging = this.papersSearch.slice(0, PAGE_SIZE);
        //tab2
        this.papersSearchTab2 = this.pageData.mstPapersBackgroundTab2;
        this.dataPagingTab2 = this.papersSearchTab2.slice(0, PAGE_SIZE);
    };
    // create and reset list
    SF0030222Component.prototype.createListData = function () {
        //reset tags
        this.tags = [];
        //tab1
        this.pageIndex = 1;
        this.papersSearch = [];
        this.dataPaging = [];
        //tab2
        this.pageIndexTab2 = 1;
        this.papersSearchTab2 = [];
        this.dataPagingTab2 = [];
        // fix undefined when input data paper new
        this.paperModelTmp = new paper_model_1.PaperModel();
        this.paperModelTmpTab2 = new paper_model_1.PaperModel();
    };
    Object.defineProperty(SF0030222Component.prototype, "isSubmit", {
        // check validate data
        get: function () {
            // check value is submit ok
            if (format_util_1.FormatUtil.isNaN(this.pageData.paperModel.normValue) > 0
                && this.pageData.paperModel.paperName != undefined
                && this.pageData.paperModel.paperName.trim() != ""
                && format_util_1.FormatUtil.isNaN(this.pageData.paperModel.basicWeight) > 0)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030222Component.prototype, "helper", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SF0030222Component.prototype, "tags", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], SF0030222Component.prototype, "mstPapersBackground", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], SF0030222Component.prototype, "mstPapersBackgroundTab2", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030222Component.prototype, "emitClosed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030222Component.prototype, "emitSubmitData", void 0);
    SF0030222Component = __decorate([
        core_1.Component({
            selector: '[paper-modal]',
            templateUrl: 'SF0030222.component.html',
            styleUrls: ['SF0030222.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030222Component);
    return SF0030222Component;
}());
exports.SF0030222Component = SF0030222Component;
//# sourceMappingURL=SF0030222.component.js.map