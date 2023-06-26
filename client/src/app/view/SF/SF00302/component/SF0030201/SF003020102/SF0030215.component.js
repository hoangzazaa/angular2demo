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
var math_util_1 = require("../../../../../../util/math-util");
var master_option_1 = require("../../../helper/master-option");
var data_util_1 = require("../../../../../../util/data-util");
var paper_model_1 = require("../../../model/paper.model");
var util_1 = require("util");
/**
 * Created by VuPT on 3/15/2017.
 */
var PAPER_1 = 1, PAPER_2 = 2, PAPER_3 = 3, BATCH_USER = 272;
var TYPE_FRONT = 100, TYPE_B = 101, TYPE_MEDIUM = 102, TYPE_A = 103, TYPE_BACK = 104;
var SF0030215Component = (function () {
    function SF0030215Component() {
        //3007
        this.laminationFirstOption = data_util_1.default.toSelectBoxDataSource(master_option_1.PAPER_LAMINATION_FIRST_OPTION);
        this.laminationSecondOption = data_util_1.default.toSelectBoxDataSource(master_option_1.PAPER_LAMINATION_SECOND_OPTION);
    }
    SF0030215Component.prototype.ngOnInit = function () {
        this.pageData.paperTmp1 = new paper_model_1.PaperModel();
        this.pageData.paperTmp3 = new paper_model_1.PaperModel();
        this.pageData.paperTmp5 = new paper_model_1.PaperModel();
        // init value data
        this.initDataMst();
    };
    Object.defineProperty(SF0030215Component.prototype, "paperTmp1", {
        get: function () {
            return this.pageData.paperTmp1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "paperTmp3", {
        get: function () {
            return this.pageData.paperTmp3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "paperTmp5", {
        get: function () {
            return this.pageData.paperTmp5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "laminationFlute", {
        get: function () {
            if (this.pageData.product.laminationFlute != 2) {
                this.pageData.product.laminationFlute = 3;
            }
            return this.pageData.product.laminationFlute;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('laminationFlute');
            this.pageData.product.laminationFlute = value;
            this.helper.calcPaperTotalCost();
            this.helper.calcLaminationSize();
            this.helper.calcLaminationUnitPrice();
            this.helper.calcLaminationTotalCost();
            this.helper.calcWindowTotalCost();
            this.helper.calcDieCuttingBasicCost();
            this.helper.calcDieCuttingThroughWage();
            if (this.shapeId == 98) {
                this.helper.calcPasteLoss();
            }
            else {
                this.helper.calccartonMaterialLoss();
            }
            this.helper.calcShippingCost();
            this.helper.calcPasteThroughWage();
            //this.helper.validateForm();
        },
        enumerable: true,
        configurable: true
    });
    SF0030215Component.prototype.isHighlighted = function (input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030215Component.prototype, "laminationMediumBasicWeight", {
        get: function () {
            if (this.pageData.product.laminationMediumBasicWeight == undefined) {
                if (this.pageData.product.laminationPaperTypeMedium != 8
                    && this.pageData.product.laminationPaperTypeMedium != TYPE_MEDIUM
                    && this.pageData.product.laminationPaperTypeMedium != 0) {
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
    SF0030215Component.prototype.setLaminationMediumBasicWeightConcealed = function (value) {
        this.pageData.product.laminationMediumBasicWeight = value;
        if (this.pageData.product.laminationPaperTypeMedium != 0) {
            if (!util_1.isNullOrUndefined(this._laminationWeightMediumOption)) {
                this.setLaminationMediumThroughWageConcealed(math_util_1.default.checkNaN(this._laminationWeightMediumOption[value]["throughWage"]));
            }
            else {
                this.setLaminationMediumThroughWageConcealed(0);
            }
        }
        this.helper.calcPaperTotalCost();
    };
    Object.defineProperty(SF0030215Component.prototype, "laminationMediumThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.pageData.product.laminationMediumThroughWage);
        },
        set: function (value) {
            this.setLaminationMediumThroughWageConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "laminationBackBasicWeight", {
        get: function () {
            if (this.pageData.product.laminationBackBasicWeight == undefined) {
                if (this.pageData.product.laminationPaperTypeBack != 8
                    && this.pageData.product.laminationPaperTypeBack != TYPE_BACK
                    && this.pageData.product.laminationPaperTypeBack != 0) {
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
    SF0030215Component.prototype.setLaminationBackBasicWeightConcealned = function (value) {
        this.pageData.product.laminationBackBasicWeight = value;
        if (this.pageData.product.laminationPaperTypeBack != 0) {
            if (!util_1.isNullOrUndefined(this._laminationWeightBackOption)) {
                this.setLaminationBackThroughWageConcealed(math_util_1.default.checkNaN(this._laminationWeightBackOption[value]["throughWage"]));
            }
            else {
                this.setLaminationBackThroughWageConcealed(0);
            }
        }
        this.helper.calcPaperTotalCost();
    };
    SF0030215Component.prototype.setLaminationBackThroughWageConcealed = function (value) {
        this.pageData.product.laminationBackThroughWage = value;
        this.helper.calcPaperTotalCost();
    };
    SF0030215Component.prototype.setLaminationMediumThroughWageConcealed = function (value) {
        this.pageData.product.laminationMediumThroughWage = value;
        this.helper.calcPaperTotalCost();
    };
    Object.defineProperty(SF0030215Component.prototype, "laminationBackThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.pageData.product.laminationBackThroughWage);
        },
        set: function (value) {
            this.setLaminationBackThroughWageConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "laminationPaperTypeBack", {
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
            //FIXME: 2408
            if (value == 8) {
                this.inputPaperOption = PAPER_3;
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
    SF0030215Component.prototype.setLaminationPaperTypeBackConcealed = function (value) {
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
    Object.defineProperty(SF0030215Component.prototype, "laminationWeightBackOption", {
        get: function () {
            if (this._laminationWeightBackOption != undefined) {
                if (this._laminationWeightBackOption != TYPE_BACK) {
                    //TODO: hard code to display only one data
                    if (this.pageData.product.laminationPaperTypeBack == 4) {
                        return Object.keys(this._laminationWeightBackOption).splice(0, 4);
                    }
                    else if (this.pageData.product.laminationPaperTypeBack == 5) {
                        return Object.keys(this._laminationWeightBackOption).splice(0, 2);
                    }
                    else {
                        return Object.keys(this._laminationWeightBackOption);
                    }
                }
                else {
                    var result_1 = [];
                    result_1.push(this.pageData.product.laminationBackBasicWeight);
                    return result_1;
                }
            }
            var result = [];
            result.push(0);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "laminationPaperTypeMedium", {
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
            //FIXME: 2408
            if (value == 8) {
                this.inputPaperOption = PAPER_2;
                this.idSelectedTmp = data_util_1.default.cloneObject(this.pageData.product).laminationPaperTypeMedium;
                this.modalShow();
            }
            else {
                this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
                this.setLaminationPaperTypeMediumConcealed(value);
            }
            //this.helper.validateForm();
        },
        enumerable: true,
        configurable: true
    });
    SF0030215Component.prototype.setLaminationPaperTypeMediumConcealed = function (value) {
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
    Object.defineProperty(SF0030215Component.prototype, "laminationWeightMediumOption", {
        get: function () {
            if (this._laminationWeightMediumOption != undefined) {
                if (this._laminationWeightMediumOption != TYPE_MEDIUM) {
                    //TODO: hard code to display only one data
                    if (this.pageData.product.laminationPaperTypeMedium == 4) {
                        return Object.keys(this._laminationWeightMediumOption).splice(0, 4);
                    }
                    else if (this.pageData.product.laminationPaperTypeMedium == 5) {
                        return Object.keys(this._laminationWeightMediumOption).splice(0, 2);
                    }
                    else {
                        return Object.keys(this._laminationWeightMediumOption);
                    }
                }
                else {
                    var result_2 = [];
                    result_2.push(this.pageData.product.laminationMediumBasicWeight);
                    return result_2;
                }
            }
            var result = [];
            result.push(0);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "paperSizeW", {
        get: function () {
            return this.pageData.product.paperSizeW;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('paperSize');
            this.setPaperSizeWConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030215Component.prototype.setPaperSizeWConcealed = function (value) {
        if (this.pageData.product.paperSizeW !== value) {
            this.pageData.product.specialSizeFlag = 1;
        }
        this.pageData.product.paperSizeW = value;
        this.helper.calcLaminationSize();
        if (this.pageData.product.printMethod == 3) {
            this.helper.calcColorPlateCost(1);
            this.helper.calcColorPrintLoss(1);
            this.helper.calcColorCostPerPacket(1);
            this.helper.calcColorBasicCost(1);
            this.helper.calcColorThroughWage(1);
            this.helper.calcColorSpecial(1);
        }
    };
    Object.defineProperty(SF0030215Component.prototype, "paperSizeH", {
        get: function () {
            return this.pageData.product.paperSizeH;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('paperSize');
            this.setPaperSizeHConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030215Component.prototype.setPaperSizeHConcealed = function (value) {
        if (this.pageData.product.paperSizeH !== value) {
            this.pageData.product.specialSizeFlag = 1;
        }
        this.pageData.product.paperSizeH = value;
        this.helper.calcLaminationSize();
        if (this.pageData.product.printMethod == 3) {
            this.helper.calcColorPlateCost(1);
            this.helper.calcColorPrintLoss(1);
            this.helper.calcColorCostPerPacket(1);
            this.helper.calcColorBasicCost(1);
            this.helper.calcColorThroughWage(1);
            this.helper.calcColorSpecial(1);
        }
    };
    Object.defineProperty(SF0030215Component.prototype, "cutPaperSizeW", {
        get: function () {
            return this.pageData.product.cutPaperSizeW;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('cutPaperSize');
            this.pageData.product.cutPaperSizeW = value;
            this.helper.calcLaminationSize();
            this.helper.calcSurfaceBasicCost(1);
            this.helper.calcSurfaceBasicCost(2);
            this.helper.calcSurfaceBasicCost(3);
            this.helper.calcSurfaceThroughWage(1);
            this.helper.calcSurfaceThroughWage(2);
            this.helper.calcSurfaceThroughWage(3);
            this.helper.calcStampingBasicCost();
            this.helper.calcStampingThroughWage();
            this.helper.calcDieCuttingBasicCost();
            this.helper.calcDieCuttingThroughWage();
            this.helper.calcWindowTotalCost();
            this.helper.calcShippingCost();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "cutPaperSizeH", {
        get: function () {
            return this.pageData.product.cutPaperSizeH;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('cutPaperSize');
            this.pageData.product.cutPaperSizeH = value;
            this.helper.calcLaminationSize();
            this.helper.calcSurfaceBasicCost(1);
            this.helper.calcSurfaceBasicCost(2);
            this.helper.calcSurfaceBasicCost(3);
            this.helper.calcSurfaceThroughWage(1);
            this.helper.calcSurfaceThroughWage(2);
            this.helper.calcSurfaceThroughWage(3);
            this.helper.calcStampingBasicCost();
            this.helper.calcStampingThroughWage();
            this.helper.calcDieCuttingBasicCost();
            this.helper.calcDieCuttingThroughWage();
            this.helper.calcWindowTotalCost();
            this.helper.calcShippingCost();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "blankPaperSizeW", {
        get: function () {
            return this.pageData.product.blankPaperSizeW;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('blankPaperSize');
            this.pageData.product.blankPaperSizeW = value;
            this.onChangePaperSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "blankPaperSizeH", {
        get: function () {
            return this.pageData.product.blankPaperSizeH;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('blankPaperSize');
            this.pageData.product.blankPaperSizeH = value;
            this.onChangePaperSize();
        },
        enumerable: true,
        configurable: true
    });
    SF0030215Component.prototype.onChangePaperSize = function () {
        // コール関数要精査
        this.helper.calcLaminationSize();
        this.helper.calcSurfaceBasicCost(1);
        this.helper.calcSurfaceBasicCost(2);
        this.helper.calcSurfaceBasicCost(3);
        this.helper.calcSurfaceThroughWage(1);
        this.helper.calcSurfaceThroughWage(2);
        this.helper.calcSurfaceThroughWage(3);
        this.helper.calcStampingBasicCost();
        this.helper.calcStampingThroughWage();
        this.helper.calcDieCuttingBasicCost();
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcWindowTotalCost();
        this.helper.calcShippingCost();
    };
    Object.defineProperty(SF0030215Component.prototype, "impositionNumber", {
        get: function () {
            this.pageData.product.impositionNumber = math_util_1.default.checkNaN(this.pageData.product.impositionNumber);
            return this.pageData.product.impositionNumber;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('impositionNumber');
            this.pageData.product.impositionNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "isRequestDesign", {
        get: function () {
            return this.pageData.isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.pageData.isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "takenNumber", {
        get: function () {
            this.pageData.product.takenNumber = math_util_1.default.checkNaN(this.pageData.product.takenNumber);
            return this.pageData.product.takenNumber;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('takenNumber');
            this.pageData.product.takenNumber = value;
            this.helper.calcSurfaceBasicCost(1);
            this.helper.calcSurfaceThroughWage(1);
            this.helper.calcSurfaceTotalCost(1);
            this.helper.calcSurfaceBasicCost(2);
            this.helper.calcSurfaceThroughWage(2);
            this.helper.calcSurfaceTotalCost(2);
            this.helper.calcSurfaceBasicCost(3);
            this.helper.calcSurfaceThroughWage(3);
            this.helper.calcSurfaceTotalCost(3);
            this.helper.calcDieCuttingBasicCost();
            this.helper.calcDieCuttingThroughWage();
            this.helper.calcDieCuttingTotalCost();
            this.helper.calcPasteBasicCost();
            this.helper.calcLaminationTotalCost();
            this.helper.calcPacking();
            if (this.pageData.product.printMethod == 3) {
                this.helper.calcColorBasicCost(1);
                this.helper.calcColorThroughWage(1);
                this.helper.calcColorSpecial(1);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "laminationPaperTypeFront", {
        get: function () {
            if (this.pageData.product.id && this.pageData.product.laminationPaperTypeFront == TYPE_FRONT) {
                this._laminationWeightFrontOption = this.pageData.product.laminationPaperTypeFront;
                return this.pageData.product.laminationPaperTypeFront;
            }
            if (this.pageData.product.laminationPaperTypeFront != undefined) {
                this._laminationWeightFrontOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeFront];
                return this.pageData.product.laminationPaperTypeFront;
            }
            this.pageData.product.laminationPaperTypeFront = 0;
            return 0;
        },
        set: function (value) {
            //FIXME: 2409
            if (value == 8) {
                this.inputPaperOption = PAPER_1;
                this.idSelectedTmp = data_util_1.default.cloneObject(this.pageData.product).laminationPaperTypeFront;
                this.modalShow();
            }
            else {
                this.pageData.highlightedTracker.touch('laminationFrontBasicWeight');
                this.setLaminationPaperTypeFrontConcealed(value);
            }
            //this.helper.validateForm();
        },
        enumerable: true,
        configurable: true
    });
    SF0030215Component.prototype.setLaminationPaperTypeFrontConcealed = function (value) {
        this.pageData.product.laminationPaperTypeFront = value;
        if (value != 8 && value != 0) {
            this._laminationWeightFrontOption = this.pageData.mstData.mstLamination[value];
            if (!util_1.isNullOrUndefined(this._laminationWeightFrontOption)) {
                this.setLaminationFrontBasicWeightConcealed(+Object.keys(this._laminationWeightFrontOption)[0]);
            }
            else {
                this.setLaminationFrontBasicWeightConcealed(0);
                this.setLaminationFrontThroughWageConcealed(0);
            }
        }
        else {
            this.setLaminationFrontBasicWeightConcealed(0);
            this.setLaminationFrontThroughWageConcealed(0);
        }
    };
    Object.defineProperty(SF0030215Component.prototype, "laminationWeightFrontOption", {
        get: function () {
            if (this._laminationWeightFrontOption != undefined) {
                if (this._laminationWeightFrontOption != TYPE_FRONT) {
                    //TODO: hard code to display only one data
                    if (this.pageData.product.laminationPaperTypeFront == 4) {
                        return Object.keys(this._laminationWeightFrontOption).splice(0, 4);
                    }
                    else if (this.pageData.product.laminationPaperTypeFront == 5) {
                        return Object.keys(this._laminationWeightFrontOption).splice(0, 2);
                    }
                    else {
                        return Object.keys(this._laminationWeightFrontOption);
                    }
                }
                else {
                    var result_3 = [];
                    result_3.push(this.pageData.product.laminationFrontBasicWeight);
                    return result_3;
                }
            }
            var result = [];
            result.push(0);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "laminationFrontBasicWeight", {
        get: function () {
            if (this.pageData.product.laminationFrontBasicWeight == undefined) {
                if (this.pageData.product.laminationPaperTypeFront != 8
                    && this.pageData.product.laminationPaperTypeFront != TYPE_FRONT
                    && this.pageData.product.laminationPaperTypeFront != 0) {
                    this.pageData.product.laminationFrontBasicWeight = +Object.keys(this._laminationWeightFrontOption)[0];
                }
                else {
                    this.pageData.product.laminationFrontBasicWeight = undefined;
                }
            }
            return this.pageData.product.laminationFrontBasicWeight;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('laminationFrontBasicWeight');
            this.setLaminationFrontBasicWeightConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030215Component.prototype.setLaminationFrontBasicWeightConcealed = function (value) {
        this.pageData.product.laminationFrontBasicWeight = value;
        if (this.pageData.product.laminationPaperTypeFront != 0) {
            if (!util_1.isNullOrUndefined(this._laminationWeightFrontOption)) {
                this.setLaminationFrontThroughWageConcealed(math_util_1.default.checkNaN(this._laminationWeightFrontOption[value]["throughWage"]));
            }
            else {
                this.setLaminationFrontThroughWageConcealed(0);
            }
        }
        this.helper.calcPaperTotalCost();
    };
    Object.defineProperty(SF0030215Component.prototype, "laminationFrontThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.pageData.product.laminationFrontThroughWage);
        },
        set: function (value) {
            this.setLaminationFrontThroughWageConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030215Component.prototype.setLaminationFrontThroughWageConcealed = function (value) {
        this.pageData.product.laminationFrontThroughWage = value;
        this.helper.calcPaperTotalCost();
    };
    Object.defineProperty(SF0030215Component.prototype, "stateLamination", {
        get: function () {
            if (this.pageData.product.paperSizeW != undefined && this.pageData.product.paperSizeH != undefined
                && this.pageData.product.cutPaperSizeH != undefined && this.pageData.product.cutPaperSizeW != undefined
                && this.pageData.product.takenNumber != undefined && this.pageData.product.impositionNumber != undefined) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "isView", {
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
    Object.defineProperty(SF0030215Component.prototype, "checkImposition", {
        get: function () {
            if (math_util_1.default.checkNaN(this.pageData.productOutput.lot / this.pageData.product.impositionNumber) >= 10000) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "laminationFluteOption", {
        get: function () {
            if (this.pageData.product.shapeId == 98) {
                return master_option_1.PAPER_LAMINATION_FLUTE_2745;
            }
            else {
                return master_option_1.ONE_STAGE_FLUTE;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderLaminationFlute", {
        // フルート
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveFlute) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderPaperSizeW", {
        // シート寸法 (mm)
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSavePaperSizeW) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderPaperSizeH", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSavePaperSizeH) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderCutPaperSizeW", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveCutSizeW) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderCutPaperSizeH", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveCutSizeH) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderBlankPaperSizeW", {
        // 展開寸法（mm） * SF0030217Componentを参照
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveBlankSizeW) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderBlankPaperSizeH", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveBlankSizeH) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderLaminationPaperTypeFront", {
        get: function () {
            // 表ライナー（g/㎡）
            if (this.shapeId != 100) {
                if (this.pageData.zCheck) {
                    return this.pageData.defaultFieldBorderCss;
                }
                else {
                    if (this.pageData.yCheck) {
                        if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeFront) {
                            return this.pageData.errFieldBorderCss;
                        }
                        else {
                            if (this.pageData.xCheck) {
                                return this.pageData.defaultFieldBorderCss;
                            }
                            else {
                                return this.pageData.noneFieldBorderCss;
                            }
                        }
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
            }
            else {
                return this.pageData.noneFieldBorderCss;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderLaminationFrontBasicWeight", {
        get: function () {
            if (this.shapeId != 100) {
                if (this.pageData.zCheck) {
                    return this.pageData.defaultFieldBorderCss;
                }
                else {
                    if (this.pageData.yCheck) {
                        if (this.pageData.productRequiredItem.isSaveLaminationFrontBasicWeight) {
                            return this.pageData.errFieldBorderCss;
                        }
                        else {
                            if (this.pageData.xCheck) {
                                return this.pageData.defaultFieldBorderCss;
                            }
                            else {
                                return this.pageData.noneFieldBorderCss;
                            }
                        }
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
            }
            else {
                return this.pageData.noneFieldBorderCss;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderLaminationFrontThroughWage", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveLaminationFrontThroughWage) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderLaminationPaperTypeMedium", {
        // 中芯（g/㎡）
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeMedium) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderLaminationMediumBasicWeight", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveLaminationMediumBasicWeight) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderLaminationMediumThroughWage", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveLaminationMediumThroughWage) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderLaminationPaperTypeBack", {
        // 裏ライナー（g/㎡）
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeBack) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderLaminationBackBasicWeight", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveLaminationBackBasicWeight) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderLaminationBackThroughWage", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveLaminationBackThroughWage) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderTakenNumber", {
        // 取数（丁）
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveTakenNumber) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "checkBorderImpositionNumber", {
        // 面付数（丁）
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveImpositionNumber) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    // TODO:start http://fridaynight.vnext.vn/issues/2409
    SF0030215Component.prototype.setPaperModalResult = function (paperModel) {
        //1. set option input
        paperModel.optionId = this.inputPaperOption;
        paperModel.factoryId = this.pageData.product.factoryId;
        //2. add paper
        if (!!paperModel.paperId && !paperModel.isNew) {
            switch (this.inputPaperOption) {
                //表ライナー
                case 1:
                    this.laminationPaperTypeFront = paperModel.paperId;
                    this.laminationFrontBasicWeight = paperModel.basicWeight;
                    break;
                //中芯
                case 2:
                    this.laminationPaperTypeMedium = paperModel.paperId;
                    this.laminationMediumBasicWeight = paperModel.basicWeight;
                    break;
                //B中芯
                case 3:
                    this.laminationPaperTypeBack = paperModel.paperId;
                    this.laminationBackBasicWeight = paperModel.basicWeight;
                    break;
                default:
                    break;
            }
        }
        else {
            // input list paper new
            this.addNewPaper(paperModel);
            // check input option
            switch (this.inputPaperOption) {
                //表ライナー
                case 1:
                    // get data tmp
                    this.pageData.paperTmp1 = paperModel;
                    this.pageData.product.laminationFrontId = paperModel.id;
                    this.pageData.product.laminationPaperTypeFront = TYPE_FRONT;
                    this.setLaminationFrontBasicWeightConcealed(paperModel.basicWeight);
                    this.setLaminationFrontThroughWageConcealed(paperModel.normValue);
                    // add to mst data
                    this.pageData.addPaperModel(paperModel, TYPE_FRONT);
                    break;
                //中芯
                case 2:
                    // get data tmp
                    this.pageData.paperTmp3 = paperModel;
                    this.pageData.product.laminationMediumId = paperModel.id;
                    this.pageData.product.laminationPaperTypeMedium = TYPE_MEDIUM;
                    this.setLaminationMediumBasicWeightConcealed(paperModel.basicWeight);
                    this.setLaminationMediumThroughWageConcealed(paperModel.normValue);
                    // add to mst data
                    this.pageData.addPaperModel(paperModel, TYPE_MEDIUM);
                    break;
                //B中芯
                case 3:
                    // get data tmp
                    this.pageData.paperTmp5 = paperModel;
                    this.pageData.product.laminationBackId = paperModel.id;
                    this.pageData.product.laminationPaperTypeBack = TYPE_BACK;
                    this.setLaminationBackBasicWeightConcealned(paperModel.basicWeight);
                    this.setLaminationBackThroughWageConcealed(paperModel.normValue);
                    // add to mst data
                    this.pageData.addPaperModel(paperModel, TYPE_BACK);
                    break;
                default:
                    break;
            }
        }
        //2 hide modal
        this.modalHide();
        //3. highlightedTracker
        switch (this.inputPaperOption) {
            //表ライナー
            case 1:
                // Dong thoi neu da chon thi phai xu ly phan highlightedTracker.touch
                this.pageData.highlightedTracker.touch('laminationFrontBasicWeight');
                break;
            //中芯
            case 2:
                // Dong thoi neu da chon thi phai xu ly phan highlightedTracker.touch
                this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
                break;
            //B中芯
            case 3:
                // Dong thoi neu da chon thi phai xu ly phan highlightedTracker.touch
                this.pageData.highlightedTracker.touch('laminationBackBasicWeight');
                break;
            default:
                break;
        }
    };
    SF0030215Component.prototype.modalShow = function () {
        this.getDataMstLaminations();
        setTimeout(function () {
            //scoll userPic
            $('.table-body-paperOther').scrollTop(0);
        }, 300);
        $("#paperModal").modal('show');
        $('.modal-body').css('overflow-y', 'auto');
        $('.modal-body').css('max-height', $(window).height() * 0.86);
    };
    SF0030215Component.prototype.modalHide = function () {
        $("#paperModal").modal('hide');
    };
    SF0030215Component.prototype.closedModal = function () {
        switch (this.inputPaperOption) {
            //表ライナー
            case PAPER_1:
                this.pageData.product.laminationPaperTypeFront = this.idSelectedTmp;
                break;
            //B中芯
            case PAPER_2:
                this.pageData.product.laminationPaperTypeMedium = this.idSelectedTmp;
                break;
            //中芯
            case PAPER_3:
                this.pageData.product.laminationPaperTypeBack = this.idSelectedTmp;
                break;
            default:
                break;
        }
        this.modalHide();
    };
    SF0030215Component.prototype.getDataMstLaminations = function () {
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
            var flag_base = (item.hiddenFlag != 1 && item.commonFlag != 1 && item.commonFlag != undefined);
            if (!!!item.paperId) {
                return item.createdUser == BATCH_USER && flag_base;
            }
            return flag_base;
        }).map(function (item) {
            var paper = data_util_1.default.cloneObject(item);
            return paper;
        });
        // update status selectbox
        switch (this.inputPaperOption) {
            //表ライナー
            case PAPER_1:
                this.pageData.product.laminationPaperTypeFront = 8;
                break;
            //B中芯
            case PAPER_2:
                this.pageData.product.laminationPaperTypeMedium = 8;
                break;
            //中芯
            case PAPER_3:
                this.pageData.product.laminationPaperTypeBack = 8;
                break;
            default:
                break;
        }
    };
    Object.defineProperty(SF0030215Component.prototype, "mstPapersBackground", {
        get: function () {
            return this.pageData.mstPapersBackgroundTab1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030215Component.prototype, "pageData", {
        get: function () {
            return this.helper.getSF00302Data();
        },
        enumerable: true,
        configurable: true
    });
    SF0030215Component.prototype.addNewPaper = function (paperModel) {
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
    SF0030215Component.prototype.initDataMst = function () {
        var _this = this;
        if (this.pageData.product.id) {
            if (this.pageData.product.laminationPaperTypeFront == TYPE_FRONT) {
                var paperModel = this.pageData.mstLaminations.find(function (item) {
                    return item.id == _this.pageData.product.laminationFrontId;
                });
                if (!!paperModel) {
                    this.pageData.paperTmp1.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_FRONT);
                }
            }
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
    Object.defineProperty(SF0030215Component.prototype, "shapeId", {
        // TODO:end http://fridaynight.vnext.vn/issues/2409
        get: function () {
            if (this.helper.getSF00302Data().product.shapeId == undefined) {
                return 0;
            }
            return this.helper.getSF00302Data().product.shapeId;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030215Component.prototype, "helper", void 0);
    SF0030215Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030215.component.html",
            selector: 'sf0030215'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030215Component);
    return SF0030215Component;
}());
exports.SF0030215Component = SF0030215Component;
//# sourceMappingURL=SF0030215.component.js.map