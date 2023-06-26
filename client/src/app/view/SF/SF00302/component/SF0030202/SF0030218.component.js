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
var SF00302_data_1 = require("../../SF00302.data");
var math_util_1 = require("../../../../../util/math-util");
var master_option_1 = require("../../helper/master-option");
var validator_util_1 = require("../../../../../util/validator-util");
var paper_model_1 = require("../../model/paper.model");
var data_util_1 = require("../../../../../util/data-util");
var util_1 = require("util");
var PAPER_1 = 1, PAPER_2 = 2, PAPER_3 = 3, PAPER_4 = 4, PAPER_5 = 5;
var BATCH_USER = 272;
var TYPE_FRONT = 100, TYPE_B = 101, TYPE_MEDIUM = 102, TYPE_A = 103, TYPE_BACK = 104;
var SF0030218Component = (function () {
    function SF0030218Component(sf00302Data) {
        this.sf00302Data = sf00302Data;
    }
    SF0030218Component.prototype.ngOnInit = function () {
        // create contructor
        this.pageData.paperTmp1 = new paper_model_1.PaperModel();
        this.pageData.paperTmp2 = new paper_model_1.PaperModel();
        this.pageData.paperTmp3 = new paper_model_1.PaperModel();
        this.pageData.paperTmp4 = new paper_model_1.PaperModel();
        this.pageData.paperTmp5 = new paper_model_1.PaperModel();
        // init mst data
        this.initDataMst();
    };
    Object.defineProperty(SF0030218Component.prototype, "paperTmp1", {
        get: function () {
            return this.pageData.paperTmp1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "paperTmp2", {
        get: function () {
            return this.pageData.paperTmp2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "paperTmp3", {
        get: function () {
            return this.pageData.paperTmp3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "paperTmp4", {
        get: function () {
            return this.pageData.paperTmp4;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "paperTmp5", {
        get: function () {
            return this.pageData.paperTmp5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "isRequestDesign", {
        get: function () {
            return this.pageData.isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.pageData.isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    SF0030218Component.prototype.isHighlighted = function (input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030218Component.prototype, "laminationMediumBasicWeight", {
        get: function () {
            if (this.pageData.product.laminationMediumBasicWeight == undefined) {
                if (this.pageData.product.laminationPaperTypeMedium < 99 && this.pageData.product.laminationPaperTypeMedium != 0) {
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
    SF0030218Component.prototype.setLaminationMediumBasicWeightConcealed = function (value) {
        this.pageData.product.laminationMediumBasicWeight = value;
        if (this.pageData.product.laminationPaperTypeMedium != 0) {
            if (!util_1.isNullOrUndefined(this._laminationWeightMediumOption)) {
                this.setLaminationMediumThroughWageConcealed(math_util_1.default.checkNaN(this._laminationWeightMediumOption[value]["throughWage"]));
            }
            else {
                this.setLaminationMediumThroughWageConcealed(0);
            }
        }
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    };
    Object.defineProperty(SF0030218Component.prototype, "laminationMediumThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.pageData.product.laminationMediumThroughWage);
        },
        set: function (value) {
            this.setLaminationMediumThroughWageConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "laminationPaperTypeMedium", {
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
            //FIXME: 2409
            if (value == 99) {
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
    SF0030218Component.prototype.setLaminationPaperTypeMediumConcealed = function (value) {
        this.pageData.product.laminationPaperTypeMedium = value;
        if (value != 99 && value != 0) {
            this._laminationWeightMediumOption = this.pageData.mstData.mstLamination[value];
            if (!util_1.isNullOrUndefined(this._laminationWeightMediumOption)) {
                var result = Object.keys(this._laminationWeightMediumOption);
                if (this.pageData.product.laminationPaperTypeMedium == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                this.setLaminationMediumBasicWeightConcealed(+result[0]);
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
    Object.defineProperty(SF0030218Component.prototype, "laminationWeightMediumOption", {
        get: function () {
            if (this._laminationWeightMediumOption != undefined) {
                if (this._laminationWeightMediumOption != TYPE_MEDIUM) {
                    var result_1 = Object.keys(this._laminationWeightMediumOption);
                    if (this.pageData.product.laminationPaperTypeMedium == 6) {
                        result_1.splice(result_1.indexOf("170"), 1);
                    }
                    return result_1;
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
    SF0030218Component.prototype.setLaminationMediumThroughWageConcealed = function (value) {
        this.pageData.product.laminationMediumThroughWage = value;
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    };
    Object.defineProperty(SF0030218Component.prototype, "laminationFrontBasicWeight", {
        get: function () {
            if (this.pageData.product.laminationFrontBasicWeight == undefined) {
                if (this.pageData.product.laminationPaperTypeFront < 99 && this.pageData.product.laminationPaperTypeFront != 0) {
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
            this.helper.validateForm();
        },
        enumerable: true,
        configurable: true
    });
    SF0030218Component.prototype.setLaminationFrontBasicWeightConcealed = function (value) {
        this.pageData.product.laminationFrontBasicWeight = value;
        if (this.pageData.product.laminationPaperTypeFront != 0) {
            if (!util_1.isNullOrUndefined(this._laminationWeightFrontOption)) {
                this.setLaminationFrontThroughWageConcealed(math_util_1.default.checkNaN(this._laminationWeightFrontOption[value]["throughWage"]));
            }
            else {
                this.setLaminationFrontThroughWageConcealed(0);
            }
        }
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    };
    Object.defineProperty(SF0030218Component.prototype, "laminationFrontThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.pageData.product.laminationFrontThroughWage);
        },
        set: function (value) {
            this.setLaminationFrontThroughWageConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "laminationPaperTypeFront", {
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
            if (value == 99) {
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
    SF0030218Component.prototype.setLaminationPaperTypeFrontConcealed = function (value) {
        this.pageData.product.laminationPaperTypeFront = value;
        if (value != 99 && value != 0) {
            this._laminationWeightFrontOption = this.pageData.mstData.mstLamination[value];
            if (!util_1.isNullOrUndefined(this._laminationWeightFrontOption)) {
                var result = Object.keys(this._laminationWeightFrontOption);
                if (this.pageData.product.laminationPaperTypeFront == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                this.setLaminationFrontBasicWeightConcealed(+result[0]);
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
    Object.defineProperty(SF0030218Component.prototype, "laminationWeightFrontOption", {
        get: function () {
            if (this._laminationWeightFrontOption != undefined) {
                if (this._laminationWeightFrontOption != TYPE_FRONT) {
                    var result_3 = Object.keys(this._laminationWeightFrontOption);
                    if (this.pageData.product.laminationPaperTypeFront == 6) {
                        result_3.splice(result_3.indexOf("170"), 1);
                    }
                    return result_3;
                }
                else {
                    var result_4 = [];
                    result_4.push(this.pageData.product.laminationFrontBasicWeight);
                    return result_4;
                }
            }
            var result = [];
            result.push(0);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    SF0030218Component.prototype.setLaminationFrontThroughWageConcealed = function (value) {
        this.pageData.product.laminationFrontThroughWage = value;
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    };
    Object.defineProperty(SF0030218Component.prototype, "laminationBackBasicWeight", {
        get: function () {
            if (this.pageData.product.laminationBackBasicWeight == undefined) {
                if (this.pageData.product.laminationPaperTypeBack < 99 && this.pageData.product.laminationPaperTypeBack != 0) {
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
            this.setLaminationBackBasicWeightConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030218Component.prototype.setLaminationBackBasicWeightConcealed = function (value) {
        this.pageData.product.laminationBackBasicWeight = value;
        if (this.pageData.product.laminationPaperTypeBack != 0) {
            if (!util_1.isNullOrUndefined(this._laminationWeightBackOption)) {
                this.setLaminationBackThroughWageConcealed(math_util_1.default.checkNaN(this._laminationWeightBackOption[value]["throughWage"]));
            }
            else {
                this.setLaminationBackThroughWageConcealed(0);
            }
        }
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    };
    Object.defineProperty(SF0030218Component.prototype, "laminationBackThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.pageData.product.laminationBackThroughWage);
        },
        set: function (value) {
            this.setLaminationBackThroughWageConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "laminationPaperTypeBack", {
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
            //this.helper.validateForm();
            //FIXME: 2409
            if (value == 99) {
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
    SF0030218Component.prototype.setLaminationPaperTypeBackConcealed = function (value) {
        this.pageData.product.laminationPaperTypeBack = value;
        if (value != 99 && value != 0) {
            this._laminationWeightBackOption = this.pageData.mstData.mstLamination[value];
            if (!util_1.isNullOrUndefined(this._laminationWeightBackOption)) {
                var result = Object.keys(this._laminationWeightBackOption);
                if (this.pageData.product.laminationPaperTypeBack == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                this.setLaminationBackBasicWeightConcealed(+result[0]);
            }
            else {
                this.setLaminationBackBasicWeightConcealed(0);
                this.setLaminationBackThroughWageConcealed(0);
            }
        }
        else {
            this.setLaminationBackBasicWeightConcealed(0);
            this.setLaminationBackThroughWageConcealed(0);
        }
    };
    Object.defineProperty(SF0030218Component.prototype, "laminationWeightBackOption", {
        get: function () {
            if (this._laminationWeightBackOption != undefined) {
                if (this._laminationWeightBackOption != TYPE_BACK) {
                    var result_5 = Object.keys(this._laminationWeightBackOption);
                    if (this.pageData.product.laminationPaperTypeBack == 6) {
                        result_5.splice(result_5.indexOf("170"), 1);
                    }
                    return result_5;
                }
                else {
                    var result_6 = [];
                    result_6.push(this.pageData.product.laminationBackBasicWeight);
                    return result_6;
                }
            }
            var result = [];
            result.push(0);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    SF0030218Component.prototype.setLaminationBackThroughWageConcealed = function (value) {
        this.pageData.product.laminationBackThroughWage = value;
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    };
    Object.defineProperty(SF0030218Component.prototype, "laminationABasicWeight", {
        get: function () {
            if (this.pageData.product.laminationABasicWeight == undefined) {
                if (this.pageData.product.laminationPaperTypeA < 99 && this.pageData.product.laminationPaperTypeA != 0) {
                    this.pageData.product.laminationABasicWeight = +Object.keys(this._laminationWeightAOption)[0];
                }
                else {
                    this.pageData.product.laminationABasicWeight = undefined;
                }
            }
            return this.pageData.product.laminationABasicWeight;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('laminationABasicWeight');
            this.setLaminationABasicWeightConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030218Component.prototype.setLaminationABasicWeightConcealed = function (value) {
        this.pageData.product.laminationABasicWeight = value;
        if (this.pageData.product.laminationPaperTypeA != 0) {
            if (!util_1.isNullOrUndefined(this._laminationWeightAOption)) {
                this.setLaminationAThroughWageConcealed(math_util_1.default.checkNaN(this._laminationWeightAOption[value]["throughWage"]));
            }
            else {
                this.setLaminationAThroughWageConcealed(0);
            }
        }
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    };
    Object.defineProperty(SF0030218Component.prototype, "laminationAThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.pageData.product.laminationAThroughWage);
        },
        set: function (value) {
            this.setLaminationAThroughWageConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "laminationPaperTypeA", {
        get: function () {
            if (this.pageData.product.id && this.pageData.product.laminationPaperTypeA == TYPE_A) {
                this._laminationWeightAOption = this.pageData.product.laminationPaperTypeA;
                return this.pageData.product.laminationPaperTypeA;
            }
            if (this.pageData.product.laminationPaperTypeA != undefined) {
                this._laminationWeightAOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeA];
                return this.pageData.product.laminationPaperTypeA;
            }
            this.pageData.product.laminationPaperTypeA = 0;
            return 0;
        },
        set: function (value) {
            //FIXME: 2409
            if (value == 99) {
                this.inputPaperOption = PAPER_4;
                this.idSelectedTmp = data_util_1.default.cloneObject(this.pageData.product).laminationPaperTypeA;
                this.modalShow();
            }
            else {
                this.pageData.highlightedTracker.touch('laminationABasicWeight');
                this.setLaminationPaperTypeAConcealed(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0030218Component.prototype.setLaminationPaperTypeAConcealed = function (value) {
        this.pageData.product.laminationPaperTypeA = value;
        if (value != 99 && value != 0) {
            this._laminationWeightAOption = this.pageData.mstData.mstLamination[value];
            if (!util_1.isNullOrUndefined(this._laminationWeightAOption)) {
                var result = Object.keys(this._laminationWeightAOption);
                //TODO: hard code to display only one data
                // if (this.pageData.product.laminationPaperTypeA == 4) {
                //     result.splice(3, 1);
                //     result.splice(0, 1);
                // } else if (this.pageData.product.laminationPaperTypeA == 5) {
                //     result.splice(0, 2);
                // }
                if (this.pageData.product.laminationPaperTypeA == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                this.setLaminationABasicWeightConcealed(+result[0]);
            }
            else {
                this.setLaminationABasicWeightConcealed(0);
                this.setLaminationAThroughWageConcealed(0);
            }
        }
        else {
            this.setLaminationABasicWeightConcealed(0);
            this.setLaminationAThroughWageConcealed(0);
        }
    };
    Object.defineProperty(SF0030218Component.prototype, "laminationWeightAOption", {
        get: function () {
            if (this._laminationWeightAOption != undefined) {
                if (this._laminationWeightAOption != TYPE_A) {
                    var result_7 = Object.keys(this._laminationWeightAOption);
                    //TODO: hard code to display only one data
                    // if (this.pageData.product.laminationPaperTypeA == 4) {
                    //     result.splice(3, 1);
                    //     result.splice(0, 1);
                    // } else if (this.pageData.product.laminationPaperTypeA == 5) {
                    //     result.splice(0, 2);
                    // }
                    if (this.pageData.product.laminationPaperTypeA == 6) {
                        result_7.splice(result_7.indexOf("170"), 1);
                    }
                    return result_7;
                }
                else {
                    var result_8 = [];
                    result_8.push(this.pageData.product.laminationABasicWeight);
                    return result_8;
                }
            }
            var result = [];
            result.push(0);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    SF0030218Component.prototype.setLaminationAThroughWageConcealed = function (value) {
        this.pageData.product.laminationAThroughWage = value;
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    };
    Object.defineProperty(SF0030218Component.prototype, "laminationBBasicWeight", {
        get: function () {
            if (this.pageData.product.laminationBBasicWeight == undefined) {
                if (this.pageData.product.laminationPaperTypeB < 99 && this.pageData.product.laminationPaperTypeB != 0) {
                    this.pageData.product.laminationBBasicWeight = +Object.keys(this._laminationWeightBOption)[0];
                }
                else {
                    this.pageData.product.laminationBBasicWeight = undefined;
                }
            }
            return this.pageData.product.laminationBBasicWeight;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('laminationBBasicWeight');
            this.setLaminationBBasicWeightConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030218Component.prototype.setLaminationBBasicWeightConcealed = function (value) {
        this.pageData.product.laminationBBasicWeight = value;
        if (this.pageData.product.laminationPaperTypeB != 0) {
            if (!util_1.isNullOrUndefined(this._laminationWeightBOption)) {
                this.setLaminationBThroughWageConcealed(math_util_1.default.checkNaN(this._laminationWeightBOption[value]["throughWage"]));
            }
            else {
                this.setLaminationBThroughWageConcealed(0);
            }
        }
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    };
    Object.defineProperty(SF0030218Component.prototype, "laminationBThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.pageData.product.laminationBThroughWage);
        },
        set: function (value) {
            this.setLaminationBThroughWageConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "laminationPaperTypeB", {
        get: function () {
            if (this.pageData.product.id && this.pageData.product.laminationPaperTypeB == TYPE_B) {
                this._laminationWeightBOption = this.pageData.product.laminationPaperTypeB;
                return this.pageData.product.laminationPaperTypeB;
            }
            if (this.pageData.product.laminationPaperTypeB != undefined) {
                this._laminationWeightBOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeB];
                return this.pageData.product.laminationPaperTypeB;
            }
            this.pageData.product.laminationPaperTypeB = 0;
            return 0;
        },
        set: function (value) {
            //FIXME: 2409
            if (value == 99) {
                this.inputPaperOption = PAPER_2;
                this.idSelectedTmp = data_util_1.default.cloneObject(this.pageData.product).laminationPaperTypeB;
                this.modalShow();
            }
            else {
                this.pageData.highlightedTracker.touch('laminationBBasicWeight');
                this.setLaminationPaperTypeBConcealed(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0030218Component.prototype.setLaminationPaperTypeBConcealed = function (value) {
        this.pageData.product.laminationPaperTypeB = value;
        if (value != 99 && value != 0) {
            this._laminationWeightBOption = this.pageData.mstData.mstLamination[value];
            if (!util_1.isNullOrUndefined(this._laminationWeightBOption)) {
                var result = Object.keys(this._laminationWeightBOption);
                //TODO: hard code to display only one data
                // if (this.pageData.product.laminationPaperTypeB == 4) {
                //     result.splice(3, 1);
                //     result.splice(0, 1);
                // } else if (this.pageData.product.laminationPaperTypeB == 5) {
                //     result.splice(0, 2);
                // }
                if (this.pageData.product.laminationPaperTypeB == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                this.setLaminationBBasicWeightConcealed(+result[0]);
            }
            else {
                this.setLaminationBBasicWeightConcealed(0);
                this.setLaminationBThroughWageConcealed(0);
            }
        }
        else {
            this.setLaminationBBasicWeightConcealed(0);
            this.setLaminationBThroughWageConcealed(0);
        }
    };
    Object.defineProperty(SF0030218Component.prototype, "laminationWeightBOption", {
        get: function () {
            if (this._laminationWeightBOption != undefined) {
                if (this._laminationWeightBOption != TYPE_B) {
                    var result_9 = Object.keys(this._laminationWeightBOption);
                    //TODO: hard code to display only one data
                    // if (this.pageData.product.laminationPaperTypeB == 4) {
                    //     result.splice(3, 1);
                    //     result.splice(0, 1);
                    // } else if (this.pageData.product.laminationPaperTypeB == 5) {
                    //     result.splice(0, 2);
                    // }
                    if (this.pageData.product.laminationPaperTypeB == 6) {
                        result_9.splice(result_9.indexOf("170"), 1);
                    }
                    return result_9;
                }
                else {
                    var result_10 = [];
                    result_10.push(this.pageData.product.laminationBBasicWeight);
                    return result_10;
                }
            }
            var result = [];
            result.push(0);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    SF0030218Component.prototype.setLaminationBThroughWageConcealed = function (value) {
        this.pageData.product.laminationBThroughWage = value;
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    };
    Object.defineProperty(SF0030218Component.prototype, "isView", {
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
    Object.defineProperty(SF0030218Component.prototype, "checkImposition", {
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
    Object.defineProperty(SF0030218Component.prototype, "laminationFlute", {
        get: function () {
            return this.pageData.product.laminationFlute;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "cartonLaminationFirstOption", {
        get: function () {
            return master_option_1.CARTON_LAMINATION_FIRST_OPTION;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "cartonLaminationSecondOption", {
        get: function () {
            return master_option_1.CARTON_LAMINATION_SECOND_OPTION;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "checkBorderLaminationPaperTypeFront", {
        // 表ライナー（g/㎡）
        get: function () {
            if (validator_util_1.default.isNotEmpty(this.helper.sf00302Data.product.id)) {
                if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeFront) {
                    return this.pageData.errFieldBorderCss;
                }
                else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
            else {
                if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeFront) {
                    return this.pageData.errFieldBorderCss;
                }
                else {
                    return this.pageData.defaultFieldBorderCss;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "checkBorderLaminationFrontBasicWeight", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "checkBorderLaminationFrontThroughWage", {
        get: function () {
            if (this.pageData.product.laminationPaperTypeFront == 99) {
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
            }
            else {
                return this.pageData.noneFieldBorderCss;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "checkBorderLaminationPaperTypeMedium", {
        // 中芯（g/㎡）
        get: function () {
            if (validator_util_1.default.isNotEmpty(this.helper.sf00302Data.product.id)) {
                if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeMedium) {
                    return this.pageData.errFieldBorderCss;
                }
                else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
            else {
                if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeMedium) {
                    return this.pageData.errFieldBorderCss;
                }
                else {
                    return this.pageData.defaultFieldBorderCss;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "checkBorderLaminationMediumBasicWeight", {
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
    Object.defineProperty(SF0030218Component.prototype, "checkBorderLaminationPaperTypeBack", {
        // 裏ライナ（g/㎡）
        get: function () {
            if (validator_util_1.default.isNotEmpty(this.helper.sf00302Data.product.id)) {
                if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeBack) {
                    return this.pageData.errFieldBorderCss;
                }
                else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
            else {
                if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeBack) {
                    return this.pageData.errFieldBorderCss;
                }
                else {
                    return this.pageData.defaultFieldBorderCss;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "checkBorderLaminationBackBasicWeight", {
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
    Object.defineProperty(SF0030218Component.prototype, "checkBorderLaminationMediumThroughWage", {
        get: function () {
            if (this.pageData.product.laminationPaperTypeMedium == 99) {
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
            }
            else {
                return this.pageData.noneFieldBorderCss;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "checkBorderLaminationBackThroughWage", {
        get: function () {
            if (this.pageData.product.laminationPaperTypeBack == 99) {
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
            }
            else {
                return this.pageData.noneFieldBorderCss;
            }
        },
        enumerable: true,
        configurable: true
    });
    // TODO:start http://fridaynight.vnext.vn/issues/2409
    SF0030218Component.prototype.setPaperModalResult = function (paperModel) {
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
                //B中芯
                case 2:
                    this.laminationPaperTypeB = paperModel.paperId;
                    this.laminationBBasicWeight = paperModel.basicWeight;
                    break;
                //中芯
                case 3:
                    this.laminationPaperTypeMedium = paperModel.paperId;
                    this.laminationMediumBasicWeight = paperModel.basicWeight;
                    break;
                //A中芯
                case 4:
                    this.laminationPaperTypeA = paperModel.paperId;
                    this.laminationABasicWeight = paperModel.basicWeight;
                    break;
                //裏ライナ
                case 5:
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
                //B中芯
                case 2:
                    // get data tmp
                    this.pageData.paperTmp2 = paperModel;
                    this.pageData.product.laminationBId = paperModel.id;
                    this.pageData.product.laminationPaperTypeB = TYPE_B;
                    this.setLaminationBBasicWeightConcealed(paperModel.basicWeight);
                    this.setLaminationBThroughWageConcealed(paperModel.normValue);
                    // add to mst data
                    this.pageData.addPaperModel(paperModel, TYPE_B);
                    break;
                //中芯
                case 3:
                    // get data tmp
                    this.pageData.paperTmp3 = paperModel;
                    this.pageData.product.laminationMediumId = paperModel.id;
                    this.pageData.product.laminationPaperTypeMedium = TYPE_MEDIUM;
                    this.setLaminationMediumBasicWeightConcealed(paperModel.basicWeight);
                    this.setLaminationMediumThroughWageConcealed(paperModel.normValue);
                    // add to mst data
                    this.pageData.addPaperModel(paperModel, TYPE_MEDIUM);
                    break;
                //A中芯
                case 4:
                    // get data tmp
                    this.pageData.paperTmp4 = paperModel;
                    this.pageData.product.laminationAId = paperModel.id;
                    this.pageData.product.laminationPaperTypeA = TYPE_A;
                    this.setLaminationABasicWeightConcealed(paperModel.basicWeight);
                    this.setLaminationAThroughWageConcealed(paperModel.normValue);
                    // add to mst data
                    this.pageData.addPaperModel(paperModel, TYPE_A);
                    break;
                //裏ライナ
                case 5:
                    // get data tmp
                    this.pageData.paperTmp5 = paperModel;
                    this.pageData.product.laminationBackId = paperModel.id;
                    this.pageData.product.laminationPaperTypeBack = TYPE_BACK;
                    this.setLaminationBackBasicWeightConcealed(paperModel.basicWeight);
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
                this.pageData.highlightedTracker.touch('laminationFrontBasicWeight');
                break;
            //B中芯
            case 2:
                this.pageData.highlightedTracker.touch('laminationBBasicWeight');
                break;
            //中芯
            case 3:
                this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
                break;
            //A中芯
            case 4:
                this.pageData.highlightedTracker.touch('laminationABasicWeight');
                break;
            //裏ライナ
            case 5:
                this.pageData.highlightedTracker.touch('laminationBackBasicWeight');
                break;
            default:
                break;
        }
    };
    SF0030218Component.prototype.modalShow = function () {
        this.getDataMstLaminations();
        setTimeout(function () {
            //scoll userPic
            $('.table-body-paperOther').scrollTop(0);
        }, 300);
        $("#paperModal").modal('show');
        $('.modal-body').css('overflow-y', 'auto');
        $('.modal-body').css('max-height', $(window).height() * 0.86);
    };
    SF0030218Component.prototype.modalHide = function () {
        $("#paperModal").modal('hide');
    };
    SF0030218Component.prototype.closedModal = function () {
        switch (this.inputPaperOption) {
            //表ライナー
            case PAPER_1:
                this.pageData.product.laminationPaperTypeFront = this.idSelectedTmp;
                break;
            //B中芯
            case PAPER_2:
                this.pageData.product.laminationPaperTypeB = this.idSelectedTmp;
                break;
            //中芯
            case PAPER_3:
                this.pageData.product.laminationPaperTypeMedium = this.idSelectedTmp;
                break;
            //A中芯
            case PAPER_4:
                this.pageData.product.laminationPaperTypeA = this.idSelectedTmp;
                break;
            //裏ライナ
            case PAPER_5:
                this.pageData.product.laminationPaperTypeBack = this.idSelectedTmp;
                break;
            default:
                break;
        }
        this.modalHide();
    };
    SF0030218Component.prototype.getDataMstLaminations = function () {
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
            var base_flag = (item.hiddenFlag != 1 && item.commonFlag != 1 && item.commonFlag != undefined);
            if (!!!item.paperId) {
                return item.createdUser == BATCH_USER && base_flag;
            }
            return base_flag;
        }).map(function (item) {
            var paper = data_util_1.default.cloneObject(item);
            return paper;
        });
        // update status selectbox
        switch (this.inputPaperOption) {
            //表ライナー
            case PAPER_1:
                this.pageData.product.laminationPaperTypeFront = 99;
                break;
            //B中芯
            case PAPER_2:
                this.pageData.product.laminationPaperTypeB = 99;
                break;
            //中芯
            case PAPER_3:
                this.pageData.product.laminationPaperTypeMedium = 99;
                break;
            //A中芯
            case PAPER_4:
                this.pageData.product.laminationPaperTypeA = 99;
                break;
            //裏ライナ
            case PAPER_5:
                this.pageData.product.laminationPaperTypeBack = 99;
                break;
            default:
                break;
        }
    };
    Object.defineProperty(SF0030218Component.prototype, "mstPapersBackground", {
        get: function () {
            return this.pageData.mstPapersBackgroundTab1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030218Component.prototype, "pageData", {
        get: function () {
            return this.helper.getSF00302Data();
        },
        enumerable: true,
        configurable: true
    });
    SF0030218Component.prototype.addNewPaper = function (paperModel) {
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
    SF0030218Component.prototype.initDataMst = function () {
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
            if (this.pageData.product.laminationPaperTypeB == TYPE_B) {
                var paperModel = this.pageData.mstLaminations.find(function (item) {
                    return item.id == _this.pageData.product.laminationBId;
                });
                if (!!paperModel) {
                    this.pageData.paperTmp2.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_B);
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
            if (this.pageData.product.laminationPaperTypeA == TYPE_A) {
                var paperModel = this.pageData.mstLaminations.find(function (item) {
                    return item.id == _this.pageData.product.laminationAId;
                });
                if (!!paperModel) {
                    this.pageData.paperTmp4.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_A);
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
    ], SF0030218Component.prototype, "helper", void 0);
    SF0030218Component = __decorate([
        core_1.Component({
            selector: "sf0030218",
            templateUrl: "SF0030218.component.html",
            styles: ["\n        #laminationA .form-control[disabled], #laminationB .form-control[disabled] {\n            background-color: white;\n            color: grey;\n        }"]
        }), 
        __metadata('design:paramtypes', [SF00302_data_1.SF00302Data])
    ], SF0030218Component);
    return SF0030218Component;
}());
exports.SF0030218Component = SF0030218Component;
//# sourceMappingURL=SF0030218.component.js.map