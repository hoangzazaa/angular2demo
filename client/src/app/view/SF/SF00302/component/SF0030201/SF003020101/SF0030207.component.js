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
var data_util_1 = require("../../../../../../util/data-util");
var master_option_1 = require("../../../helper/master-option");
var math_util_1 = require("../../../../../../util/math-util");
var paper_model_1 = require("../../../model/paper.model");
var util_1 = require("util");
var format_util_1 = require("../../../../../../util/format-util");
var PAPER_3 = 3, PAPER_5 = 5, BATCH_USER = 272;
var TYPE_FRONT = 100, TYPE_B = 101, TYPE_MEDIUM = 102, TYPE_A = 103, TYPE_BACK = 104;
var SF0030207Component = (function () {
    function SF0030207Component() {
        //3007
        this.laminationFluteOption = data_util_1.default.toSelectBoxDataSource(master_option_1.PAPER_LAMINATION_FLUTE);
        this.laminationFirstOption = data_util_1.default.toSelectBoxDataSource(master_option_1.PAPER_LAMINATION_FIRST_OPTION);
        this.laminationSecondOption = data_util_1.default.toSelectBoxDataSource(master_option_1.PAPER_LAMINATION_SECOND_OPTION);
    }
    SF0030207Component.prototype.ngOnInit = function () {
        this.pageData.paperTmp3 = new paper_model_1.PaperModel();
        this.pageData.paperTmp5 = new paper_model_1.PaperModel();
        // init data
        this.initDataMst();
    };
    Object.defineProperty(SF0030207Component.prototype, "stateProductLamination", {
        /**
         * Get state if Product Lamination Accordion is filled with data or not
         * */
        get: function () {
            if ((this.pageData.product.laminationNumber != undefined
                && this.pageData.product.laminationWidth != undefined
                && this.pageData.product.laminationCuttingFlow != undefined
                && this.pageData.product.laminationNumber.toString() != ""
                && this.pageData.product.laminationWidth.toString() != ""
                && this.pageData.product.laminationCuttingFlow.toString() != ""
                && this.pageData.product.laminationFlute != undefined) || this.pageData.product.laminationFlute == 1) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030207Component.prototype, "paperTmp3", {
        get: function () {
            return this.pageData.paperTmp3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030207Component.prototype, "paperTmp5", {
        get: function () {
            return this.pageData.paperTmp5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030207Component.prototype, "isRequestDesign", {
        get: function () {
            return this.pageData.isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030207Component.prototype, "isView", {
        get: function () {
            if (this.isRequestDesign) {
                return false;
            }
            else {
                return this.pageData.isView;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030207Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.pageData.isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    SF0030207Component.prototype.isHighlighted = function (input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030207Component.prototype, "laminationFlute", {
        get: function () {
            if (this.pageData.product.laminationFlute == undefined) {
                this.pageData.product.laminationFlute = 1;
            }
            return this.pageData.product.laminationFlute;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('laminationFlute');
            this.pageData.product.laminationFlute = value;
            this.helper.calcLaminationUnitPrice();
            this.helper.calcLaminationSheetCost();
            this.helper.calcLaminationTotalCost();
            this.helper.calcWindowTotalCost();
            this.helper.calcDieCuttingBasicCost();
            this.helper.calcDieCuttingThroughWage();
            this.helper.calcPasteBasicCost();
            this.helper.calcPasteThroughWage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030207Component.prototype, "laminationMediumBasicWeight", {
        get: function () {
            if (this.pageData.product.laminationMediumBasicWeight == undefined) {
                if (this.pageData.product.laminationPaperTypeMedium != 8 && this.pageData.product.laminationPaperTypeMedium != 0) {
                    this.pageData.product.laminationMediumBasicWeight = +Object.keys(this._laminationWeightMediumOption)[0];
                }
                else {
                    this.pageData.product.laminationMediumBasicWeight = undefined;
                }
            }
            return this.pageData.product.laminationMediumBasicWeight;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
            this.setLaminationMediumBasicWeightConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030207Component.prototype.setLaminationMediumBasicWeightConcealed = function (value) {
        this.pageData.product.laminationMediumBasicWeight = value;
        if (this.pageData.product.laminationPaperTypeMedium != 0) {
            if (!util_1.isNullOrUndefined(this._laminationWeightMediumOption)) {
                this.setLaminationMediumThroughWageConcealed(math_util_1.default.checkNaN(this._laminationWeightMediumOption[value]["throughWage"]));
            }
            else {
                this.setLaminationMediumThroughWageConcealed(0);
            }
        }
        this.helper.calcLaminationUnitPrice();
    };
    Object.defineProperty(SF0030207Component.prototype, "laminationMediumThroughWage", {
        get: function () {
            return format_util_1.FormatUtil.isNaN(this.pageData.product.laminationMediumThroughWage);
        },
        set: function (value) {
            this.setLaminationMediumThroughWageConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030207Component.prototype, "laminationBackBasicWeight", {
        get: function () {
            if (this.pageData.product.laminationBackBasicWeight == undefined) {
                if (this.pageData.product.laminationPaperTypeBack != 8 && this.pageData.product.laminationPaperTypeBack != 0) {
                    this.pageData.product.laminationBackBasicWeight = +Object.keys(this._laminationWeightBackOption)[0];
                }
                else {
                    this.pageData.product.laminationBackBasicWeight = undefined;
                }
            }
            return this.pageData.product.laminationBackBasicWeight;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('laminationBackBasicWeight');
            this.setLaminationBackBasicWeightConcealned(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030207Component.prototype.setLaminationBackBasicWeightConcealned = function (value) {
        this.pageData.product.laminationBackBasicWeight = value;
        if (this.pageData.product.laminationPaperTypeBack != 0) {
            if (!util_1.isNullOrUndefined(this._laminationWeightBackOption)) {
                this.setLaminationBackThroughWageConcealed(math_util_1.default.checkNaN(this._laminationWeightBackOption[value]["throughWage"]));
            }
            else {
                this.setLaminationBackThroughWageConcealed(0);
            }
        }
        this.helper.calcLaminationUnitPrice();
    };
    SF0030207Component.prototype.setLaminationBackThroughWageConcealed = function (value) {
        this.pageData.product.laminationBackThroughWage = value;
        this.helper.calcLaminationUnitPrice();
    };
    SF0030207Component.prototype.setLaminationMediumThroughWageConcealed = function (value) {
        this.pageData.product.laminationMediumThroughWage = value;
        this.helper.calcLaminationUnitPrice();
    };
    Object.defineProperty(SF0030207Component.prototype, "laminationBackThroughWage", {
        get: function () {
            return format_util_1.FormatUtil.isNaN(this.pageData.product.laminationBackThroughWage);
        },
        set: function (value) {
            this.setLaminationBackThroughWageConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030207Component.prototype, "laminationNumber", {
        get: function () {
            this.pageData.product.laminationNumber = math_util_1.default.checkNaN(this.pageData.product.laminationNumber);
            return this.pageData.product.laminationNumber;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('laminationNumber');
            this.pageData.product.laminationNumber = value;
            this.helper.calcLaminationSheetCost();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030207Component.prototype, "laminationWidth", {
        get: function () {
            this.pageData.product.laminationWidth = math_util_1.default.checkNaN(this.pageData.product.laminationWidth);
            return this.pageData.product.laminationWidth;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('laminationWidth');
            this.pageData.product.laminationWidth = value;
            this.helper.calcLaminationSheetCost();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030207Component.prototype, "laminationCuttingFlow", {
        get: function () {
            this.pageData.product.laminationCuttingFlow = math_util_1.default.checkNaN(this.pageData.product.laminationCuttingFlow);
            return this.pageData.product.laminationCuttingFlow;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('laminationCuttingFlow');
            this.pageData.product.laminationCuttingFlow = value;
            this.helper.calcLaminationSheetCost();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030207Component.prototype, "laminationPaperTypeBack", {
        get: function () {
            if (this.pageData.product.id && this.pageData.product.laminationPaperTypeBack == TYPE_BACK) {
                this._laminationWeightBackOption = this.pageData.product.laminationPaperTypeBack;
                return this.pageData.product.laminationPaperTypeBack;
            }
            if (this.pageData.product.laminationPaperTypeBack != undefined) {
                this._laminationWeightBackOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeBack];
                return this.pageData.product.laminationPaperTypeBack;
            }
            this.pageData.product.laminationPaperTypeBack = 0;
            return 0;
        },
        set: function (value) {
            if (value == 8) {
                this.inputPaperOption = PAPER_5;
                this.idSelectedTmp = data_util_1.default.cloneObject(this.pageData.product).laminationPaperTypeBack;
                this.modalShow();
            }
            else {
                this.pageData.highlightedTracker.touch('laminationBackBasicWeight');
                this.setLaminationPaperTypeBackConcealed(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0030207Component.prototype.setLaminationPaperTypeBackConcealed = function (value) {
        this.pageData.product.laminationPaperTypeBack = value;
        if (value != 8 && value != 0) {
            this._laminationWeightBackOption = this.pageData.mstData.mstLamination[value];
            if (!util_1.isNullOrUndefined(this._laminationWeightBackOption)) {
                this.setLaminationBackBasicWeightConcealned(+Object.keys(this._laminationWeightBackOption)[0]);
            }
            else {
                this.setLaminationBackBasicWeightConcealned(0);
                this.setLaminationBackThroughWageConcealed(0);
            }
        }
        else {
            this.setLaminationBackBasicWeightConcealned(0);
            this.setLaminationBackThroughWageConcealed(0);
        }
    };
    Object.defineProperty(SF0030207Component.prototype, "laminationWeightBackOption", {
        get: function () {
            if (this._laminationWeightBackOption != undefined) {
                //TODO: hard code to display only one data
                if (this.pageData.product.laminationPaperTypeBack == TYPE_BACK) {
                    var result_1 = [];
                    result_1.push(this.pageData.product.laminationBackBasicWeight);
                    return result_1;
                }
                else if (this.pageData.product.laminationPaperTypeBack == 4) {
                    return Object.keys(this._laminationWeightBackOption).splice(0, 4);
                }
                else if (this.pageData.product.laminationPaperTypeBack == 5) {
                    return Object.keys(this._laminationWeightBackOption).splice(0, 2);
                }
                else {
                    return Object.keys(this._laminationWeightBackOption);
                }
            }
            var result = [];
            result.push(0);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030207Component.prototype, "laminationPaperTypeMedium", {
        get: function () {
            if (this.pageData.product.id && this.pageData.product.laminationPaperTypeMedium == TYPE_MEDIUM) {
                this._laminationWeightMediumOption = this.pageData.product.laminationPaperTypeMedium;
                return this.pageData.product.laminationPaperTypeMedium;
            }
            if (this.pageData.product.laminationPaperTypeMedium != undefined) {
                this._laminationWeightMediumOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeMedium];
                return this.pageData.product.laminationPaperTypeMedium;
            }
            this.pageData.product.laminationPaperTypeMedium = 0;
            return 0;
        },
        set: function (value) {
            if (value == 8) {
                this.inputPaperOption = PAPER_3;
                this.idSelectedTmp = data_util_1.default.cloneObject(this.pageData.product).laminationPaperTypeMedium;
                this.modalShow();
            }
            else {
                this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
                this.setLaminationPaperTypeMediumConcealed(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0030207Component.prototype.setLaminationPaperTypeMediumConcealed = function (value) {
        this.pageData.product.laminationPaperTypeMedium = value;
        if (value != 8 && value != 0) {
            this._laminationWeightMediumOption = this.pageData.mstData.mstLamination[value];
            if (!util_1.isNullOrUndefined(this._laminationWeightMediumOption)) {
                this.setLaminationMediumBasicWeightConcealed(+Object.keys(this._laminationWeightMediumOption)[0]);
            }
            else {
                this.setLaminationMediumBasicWeightConcealed(0);
                this.setLaminationMediumThroughWageConcealed(0);
            }
        }
        else {
            this.setLaminationMediumBasicWeightConcealed(0);
            this.setLaminationMediumThroughWageConcealed(0);
        }
    };
    Object.defineProperty(SF0030207Component.prototype, "laminationWeightMediumOption", {
        get: function () {
            if (this._laminationWeightMediumOption != undefined) {
                if (this.pageData.product.laminationPaperTypeMedium == TYPE_MEDIUM) {
                    var result_2 = [];
                    result_2.push(this.pageData.product.laminationMediumBasicWeight);
                    return result_2;
                }
                else if (this.pageData.product.laminationPaperTypeMedium == 4) {
                    return Object.keys(this._laminationWeightMediumOption).splice(0, 4);
                }
                else if (this.pageData.product.laminationPaperTypeMedium == 5) {
                    return Object.keys(this._laminationWeightMediumOption).splice(0, 2);
                }
                else {
                    return Object.keys(this._laminationWeightMediumOption);
                }
            }
            var result = [];
            result.push(0);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    // TODO:start http://fridaynight.vnext.vn/issues/2408
    SF0030207Component.prototype.setPaperModalResult = function (paperModel) {
        //1. set option input
        paperModel.optionId = this.inputPaperOption;
        paperModel.factoryId = this.pageData.product.factoryId;
        // input list paper new
        if (!!paperModel.paperId && !paperModel.isNew) {
            switch (this.inputPaperOption) {
                //表中芯（g/㎡）
                case PAPER_3:
                    this.laminationPaperTypeMedium = paperModel.paperId;
                    this.laminationMediumBasicWeight = paperModel.basicWeight;
                    break;
                //裏ライナ （g/㎡）
                case PAPER_5:
                    this.laminationPaperTypeBack = paperModel.paperId;
                    this.laminationBackBasicWeight = paperModel.basicWeight;
                    break;
                default:
                    break;
            }
        }
        else {
            this.addNewPaper(paperModel);
            //2 check input option
            switch (this.inputPaperOption) {
                //表中芯（g/㎡）
                case PAPER_3:
                    // get data tmp
                    this.pageData.paperTmp3 = paperModel;
                    this.pageData.product.laminationMediumId = paperModel.id;
                    this.pageData.product.laminationPaperTypeMedium = TYPE_MEDIUM;
                    this.setLaminationMediumBasicWeightConcealed(paperModel.basicWeight);
                    this.setLaminationMediumThroughWageConcealed(paperModel.normValue);
                    this.pageData.addPaperModel(paperModel, TYPE_MEDIUM);
                    break;
                //裏ライナ （g/㎡）
                case PAPER_5:
                    // get data tmp
                    this.pageData.paperTmp5 = paperModel;
                    this.pageData.product.laminationBackId = paperModel.id;
                    this.pageData.product.laminationPaperTypeBack = TYPE_BACK;
                    this.setLaminationBackBasicWeightConcealned(paperModel.basicWeight);
                    this.setLaminationBackThroughWageConcealed(paperModel.normValue);
                    this.pageData.addPaperModel(paperModel, TYPE_BACK);
                    break;
                default:
                    break;
            }
        }
        //2 hide modal
        this.modalHide();
        //3.set highlightedTracker
        switch (this.inputPaperOption) {
            //表中芯（g/㎡）
            case PAPER_3:
                // Dong thoi neu da chon thi phai xu ly phan highlightedTracker.touch
                this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
                break;
            //裏ライナ （g/㎡）
            case PAPER_5:
                // Dong thoi neu da chon thi phai xu ly phan highlightedTracker.touch
                this.pageData.highlightedTracker.touch('laminationBackBasicWeight');
                break;
            default:
                break;
        }
    };
    SF0030207Component.prototype.modalShow = function () {
        this.getDataMstLaminations();
        setTimeout(function () {
            //scoll userPic
            $('.table-body-paperOther').scrollTop(0);
        }, 300);
        $("#paperModal_2").modal('show');
        $('.modal-body').css('overflow-y', 'auto');
        $('.modal-body').css('max-height', $(window).height() * 0.86);
    };
    SF0030207Component.prototype.modalHide = function () {
        $("#paperModal_2").modal('hide');
    };
    SF0030207Component.prototype.closedModal = function () {
        switch (this.inputPaperOption) {
            //中芯（g/㎡）
            case PAPER_3:
                this.pageData.product.laminationPaperTypeMedium = this.idSelectedTmp;
                break;
            //裏ライナ （g/㎡）
            case PAPER_5:
                this.pageData.product.laminationPaperTypeBack = this.idSelectedTmp;
                break;
            default:
                break;
        }
        this.modalHide();
    };
    SF0030207Component.prototype.getDataMstLaminations = function () {
        // reset paper model
        this.pageData.paperModel = new paper_model_1.PaperModel();
        this.pageData.mstPapersBackgroundTab1 = [];
        var papers = this.pageData.mstLaminations;
        //1. role admin map normValue
        if (this.pageData.product.paperHeadApprovalFlag == 1) {
            papers = this.pageData.mstLaminationsHeader;
        }
        //2. filter data by factoryId
        this.pageData.mstPapersBackgroundTab1 = papers.filter(function (item) {
            // nếu paperId != null -> by theo factoryId và createdUser
            if (!!!item.paperId) {
                return item.createdUser == BATCH_USER && item.hiddenFlag != 1;
            }
            else {
                return item.hiddenFlag != 1;
            }
        }).map(function (item) {
            var paper = data_util_1.default.cloneObject(item);
            return paper;
        });
        // update status selectbox
        switch (this.inputPaperOption) {
            //中芯（g/㎡）
            case PAPER_3:
                this.pageData.product.laminationPaperTypeMedium = 8;
                break;
            //裏ライナ （g/㎡）
            case PAPER_5:
                this.pageData.product.laminationPaperTypeBack = 8;
                break;
            default:
                break;
        }
    };
    Object.defineProperty(SF0030207Component.prototype, "mstPapersBackground", {
        get: function () {
            return this.pageData.mstPapersBackgroundTab1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030207Component.prototype, "pageData", {
        get: function () {
            return this.helper.getSF00302Data();
        },
        enumerable: true,
        configurable: true
    });
    SF0030207Component.prototype.addNewPaper = function (paperModel) {
        // nếu nó khác thì sẽ push thêm vào list, nếu nó đã có thì cập nhật vào list paperModel
        var index = this.pageData.paperModelNews.findIndex(function (item) {
            return paperModel.optionId == item.optionId;
        });
        // nếu không có -> sẽ add vào list new
        if (index < 0 && !!paperModel.isNew) {
            this.pageData.paperModelNews.push(paperModel);
        }
        else if (index > 0) {
            // thay thế thằng cũ tại vị trí index, thay thế 1, và paperModel
            this.pageData.paperModelNews.splice(index, 1, paperModel);
        }
    };
    // init data
    SF0030207Component.prototype.initDataMst = function () {
        var _this = this;
        if (this.pageData.product.id) {
            if (this.pageData.product.laminationPaperTypeMedium == TYPE_MEDIUM) {
                var paperModel = this.pageData.mstLaminations.find(function (item) {
                    return item.id == _this.pageData.product.laminationMediumId;
                });
                if (!!paperModel) {
                    this.pageData.paperTmp3.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_MEDIUM);
                }
            }
            if (this.pageData.product.laminationPaperTypeBack == TYPE_BACK) {
                var paperModel = this.pageData.mstLaminations.find(function (item) {
                    return item.id == _this.pageData.product.laminationBackId;
                });
                if (!!paperModel) {
                    this.pageData.paperTmp5.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_BACK);
                }
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030207Component.prototype, "helper", void 0);
    SF0030207Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030207.component.html",
            selector: 'sf0030207'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030207Component);
    return SF0030207Component;
}());
exports.SF0030207Component = SF0030207Component;
//# sourceMappingURL=SF0030207.component.js.map