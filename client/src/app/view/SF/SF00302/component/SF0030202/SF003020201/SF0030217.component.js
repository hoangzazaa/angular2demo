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
var message_1 = require("../../../../../../helper/message");
var SF00302_service_1 = require("../../../SF00302.service");
var Product_model_1 = require("../../../../../../model/core/Product.model");
var util_1 = require("util");
var router_1 = require("@angular/router");
var Header_provider_1 = require("../../../../SF00100/Header.provider");
var SF003020201_page_1 = require("./SF003020201.page");
var format_util_1 = require("../../../../../../util/format-util");
var SF0030217Component = (function () {
    function SF0030217Component(page, route, router, headerProvider, sv00302Service) {
        this.page = page;
        this.route = route;
        this.router = router;
        this.headerProvider = headerProvider;
        this.sv00302Service = sv00302Service;
        this.isChanged = false;
        this.isChangedFlap = false;
    }
    Object.defineProperty(SF0030217Component.prototype, "isRequestDesign", {
        get: function () {
            return this.pageData.isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "stateProductSpecCarton", {
        get: function () {
            if (this.pageData.product.upperFlap != undefined && this.pageData.product.lowerFlap != undefined && this.pageData.product.sizeD != undefined && this.pageData.product.sizeW != undefined && this.pageData.product.sizeH != undefined) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "isView", {
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
    Object.defineProperty(SF0030217Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.pageData.isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "laminationFlute", {
        get: function () {
            if (this.pageData.product.laminationFlute == undefined) {
                this.pageData.product.laminationFlute = 1;
            }
            return this.pageData.product.laminationFlute;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('laminationFlute');
            this.pageData.product.laminationFlute = value;
            if (!this.isChanged) {
                this.calcBlankSize(true);
            }
            this.helper.calcMaterialCostTotalCarton();
            this.helper.calcMaterialLossCarton();
            this.helper.calcMaterialLaminationCarton();
            this.helper.calcMaterialUnitPriceCarton();
            this.helper.calcShipFareCarton();
            if (this.pageData.product.specialUpperFlapFlag != 1) {
                this.pageData.product.upperFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
            }
            this._upperFlapTmp = this.pageData.product.upperFlap;
            if (this.pageData.product.specialLowerFlapFlag != 1) {
                this.pageData.product.lowerFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
            }
            this._lowerFlapTmp = this.pageData.product.lowerFlap;
            this._laminationFluteTmp = value;
            for (var i = 1; i < 13; i++) {
                this.calcSize(i);
            }
            this.setOtherNote1();
        },
        enumerable: true,
        configurable: true
    });
    SF0030217Component.prototype.isHighlighted = function (input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    };
    SF0030217Component.prototype.calcBlankSize = function (laminationChange) {
        var size1;
        var size2;
        var defaultFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
        if (this.laminationFlute == 1) {
            size1 = math_util_1.default.checkNaN((this.sizeW + this.sizeD) * 2 + 35);
            size2 = math_util_1.default.checkNaN((this.sizeD + this.sizeH) + 6);
        }
        else if (this.laminationFlute == 2) {
            size1 = math_util_1.default.checkNaN((this.sizeW + this.sizeD) * 2 + 30);
            size2 = math_util_1.default.checkNaN((this.sizeD + this.sizeH) + 4);
        }
        else if (this.laminationFlute == 3) {
            size1 = math_util_1.default.checkNaN((this.sizeW + this.sizeD) * 2 + 40);
            size2 = math_util_1.default.checkNaN((this.sizeD + this.sizeH) + 10);
        }
        else if (this.laminationFlute == 4) {
            size1 = math_util_1.default.checkNaN((this.sizeW + this.sizeD) * 2 + 35);
            size2 = math_util_1.default.checkNaN((this.sizeD + this.sizeH) + 5);
        }
        if (size1 < 0) {
            size1 = 0;
        }
        if (size2 < 0) {
            size2 = 0;
        }
        var upperFlap = this.pageData.product.upperFlap;
        if (util_1.isNullOrUndefined(upperFlap) || laminationChange) {
            upperFlap = defaultFlap;
        }
        var lowerFlap = this.pageData.product.lowerFlap;
        if (util_1.isNullOrUndefined(lowerFlap) || laminationChange) {
            lowerFlap = defaultFlap;
        }
        this.pageData.product.blankPaperSizeW = math_util_1.default.checkNaN(size2 + (upperFlap - defaultFlap) + (lowerFlap - defaultFlap));
        this.pageData.product.blankPaperSizeH = math_util_1.default.checkNaN(size1);
        this.blankPaperSizeWTmp = math_util_1.default.checkNaN(size2 + (upperFlap - defaultFlap) + (lowerFlap - defaultFlap));
        this.blankPaperSizeHTmp = math_util_1.default.checkNaN(size1);
        this.pageData.highlightedTracker.touch('blankPaperSize');
        this.helper.calcDimension();
    };
    Object.defineProperty(SF0030217Component.prototype, "cartonShippingType", {
        get: function () {
            // Bug 1899
            if (this.pageData.product.cartonShippingType == undefined) {
                this.pageData.product.cartonShippingType = 2;
            }
            if (this.pageData.product.cartonShippingType == 2
                && util_1.isNullOrUndefined(this.pageData.product.blankPaperSizeH)
                && util_1.isNullOrUndefined(this.pageData.product.blankPaperSizeW)) {
                this.calcBlankSize(true);
            }
            return this.pageData.product.cartonShippingType;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('shippingType');
            this.pageData.product.cartonShippingType = value;
            this.helper.calcMaterialCostTotalCarton();
            this.helper.calcMaterialLossCarton();
            this.helper.calcMaterialLaminationCarton();
            this.helper.calcMaterialUnitPriceCarton();
            this.helper.calcMaterialTotalCostCarton();
            this.helper.calcShipFareCarton();
            this.helper.calcUsageColorCostCarton();
            this.helper.calcTapeCutCarton();
            this.helper.calcLinerCutCarton();
            this.helper.calcCartonHandProcessingCarton();
            this.helper.calcWaterRepellentCarton();
            this.helper.calcProcessingUnitPriceCarton();
            this.helper.calcProcessingTotalCarton();
            this.helper.calcTotalCarton();
            this.helper.calcUnitPriceCarton();
            this.helper.calcSubTotal();
            this.helper.calcEstimateDiffCarton(1);
            this.helper.calcEstimateDiffCarton(2);
            this.helper.calcDimension();
            this.helper.calcSubmittedTotal();
            if (value == 2) {
                if (this.pageData.product.specialUpperFlapFlag != 1) {
                    this.pageData.product.upperFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
                }
            }
            else {
                this.pageData.product.upperFlap = 0;
            }
            this._upperFlapTmp = this.pageData.product.upperFlap;
            if (value == 2) {
                if (this.pageData.product.specialLowerFlapFlag != 1) {
                    this.pageData.product.lowerFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
                }
            }
            else {
                this.pageData.product.lowerFlap = 0;
            }
            this._lowerFlapTmp = this.pageData.product.lowerFlap;
            // Task: 1918, #1757
            if (value === 1) {
                this.pageData.product.sizeW = null;
                this.pageData.product.sizeD = null;
                this.pageData.product.sizeH = null;
                this._sizeDTmp = null;
                this._sizeHTmp = null;
                this._sizeWTmp = null;
                for (var i = 1; i < 13; i++) {
                    this.calcSize(i);
                }
            }
            else {
                this.isChanged = false;
            }
            this.pageData.product.blankPaperSizeW = null;
            this.pageData.product.blankPaperSizeH = null;
            this.helper.calcDimension();
            this._blankSizeHTmp = null;
            this._blankSizeWTmp = null;
        },
        enumerable: true,
        configurable: true
    });
    SF0030217Component.prototype.setCartonShippingType = function (value) {
        this.cartonShippingType = value;
    };
    SF0030217Component.prototype.setChange = function () {
        this.isChanged = true;
    };
    Object.defineProperty(SF0030217Component.prototype, "sizeW", {
        get: function () {
            return this.pageData.product.sizeW;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('size');
            this.pageData.product.sizeW = value;
            this.calcBlankSize(false);
            this.helper.calcMaterialCostTotalCarton();
            this.helper.calcMaterialUnitPriceCarton();
            this.helper.calcShipTotalCarton();
            this.helper.calcProcessingTotalCarton();
            this._sizeWTmp = value;
            for (var i = 1; i < 13; i++) {
                this.calcSize(i);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "sizeD", {
        get: function () {
            return this.pageData.product.sizeD;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('size');
            this.pageData.product.sizeD = value;
            this.helper.calcMaterialCostTotalCarton();
            this.helper.calcMaterialUnitPriceCarton();
            this.helper.calcShipTotalCarton();
            this.helper.calcProcessingTotalCarton();
            if (this.pageData.product.specialUpperFlapFlag != 1) {
                this.pageData.product.upperFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
            }
            this._upperFlapTmp = this.pageData.product.upperFlap;
            if (this.pageData.product.specialLowerFlapFlag != 1) {
                this.pageData.product.lowerFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
            }
            this._lowerFlapTmp = this.pageData.product.lowerFlap;
            this.calcBlankSize(false);
            this._sizeDTmp = value;
            for (var i = 1; i < 13; i++) {
                this.calcSize(i);
            }
            this.setOtherNote1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "sizeH", {
        get: function () {
            return this.pageData.product.sizeH;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('size');
            this.pageData.product.sizeH = value;
            this.calcBlankSize(false);
            this.helper.calcMaterialCostTotalCarton();
            this.helper.calcMaterialUnitPriceCarton();
            this.helper.calcShipTotalCarton();
            this.helper.calcProcessingTotalCarton();
            this._sizeHTmp = value;
            for (var i = 1; i < 13; i++) {
                this.calcSize(i);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "blankPaperSizeW", {
        get: function () {
            return this.pageData.product.blankPaperSizeW;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('blankPaperSize');
            this.pageData.product.blankPaperSizeW = value;
            if (this.pageData.product.cartonTapeCutting > 0) {
                if (this.pageData.product.blankPaperSizeH > this.pageData.product.blankPaperSizeW) {
                    this.pageData.product.cartonTapeCutting = this.pageData.product.blankPaperSizeH;
                }
                else {
                    this.pageData.product.cartonTapeCutting = this.pageData.product.blankPaperSizeW;
                }
            }
            this.helper.calcDimension();
            this.helper.calcMaterialCostTotalCarton();
            this.helper.calcMaterialUnitPriceCarton();
            this.helper.calcShipTotalCarton();
            this.helper.calcProcessingTotalCarton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "blankPaperSizeH", {
        get: function () {
            return this.pageData.product.blankPaperSizeH;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('blankPaperSize');
            this.pageData.product.blankPaperSizeH = value;
            if (this.pageData.product.cartonTapeCutting > 0) {
                if (this.pageData.product.blankPaperSizeH > this.pageData.product.blankPaperSizeW) {
                    this.pageData.product.cartonTapeCutting = this.pageData.product.blankPaperSizeH;
                }
                else {
                    this.pageData.product.cartonTapeCutting = this.pageData.product.blankPaperSizeW;
                }
            }
            this.helper.calcDimension();
            this.helper.calcMaterialCostTotalCarton();
            this.helper.calcMaterialUnitPriceCarton();
            this.helper.calcShipTotalCarton();
            this.helper.calcProcessingTotalCarton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "cartonFluteOption", {
        get: function () {
            return master_option_1.CARTON_FLUTE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "checkBorderLaminationFulte", {
        // フルート
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                }
                else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "checkBorderSizeW", {
        // 製品寸法（mm)
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveSizeW) {
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
    Object.defineProperty(SF0030217Component.prototype, "checkBorderSizeD", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveSizeD) {
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
    Object.defineProperty(SF0030217Component.prototype, "checkBorderSizeH", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveSizeH) {
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
    Object.defineProperty(SF0030217Component.prototype, "checkBorderBlankPaperSizeW", {
        // 展開寸法（mm）
        get: function () {
            return this.pageData.noneFieldBorderCss;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "checkBorderBlankPaperSizeH", {
        get: function () {
            return this.pageData.noneFieldBorderCss;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "upperFlap", {
        get: function () {
            return this.pageData.product.upperFlap;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('flap');
            var result = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
            if (math_util_1.default.checkNaN(value) == result) {
                this.pageData.product.specialUpperFlapFlag = 0;
                this.pageData.product.upperFlap = result;
                this._upperFlapTmp = this.pageData.product.upperFlap;
            }
            if (this.pageData.product.upperFlap !== value) {
                this.pageData.product.specialUpperFlapFlag = 1;
                this.pageData.product.upperFlap = value;
                this._upperFlapTmp = value;
            }
            this.calcBlankSize(false);
            for (var i = 1; i < 13; i++) {
                this.calcSize(i);
            }
            this.setOtherNote1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "upperFlapTmp", {
        get: function () {
            if (util_1.isUndefined(this._upperFlapTmp)) {
                this._upperFlapTmp = this.pageData.product.upperFlap;
            }
            return this._upperFlapTmp;
        },
        set: function (value) {
            var result = this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
            if (math_util_1.default.checkNaN(value) == result) {
                this.pageData.product.specialUpperFlapFlag = 0;
                this._upperFlapTmp = result;
            }
            if (result != value) {
                this.pageData.product.specialUpperFlapFlag = 1;
                this._upperFlapTmp = value;
            }
            this.calcBlankSizeTmp(false);
            for (var i = 1; i < 13; i++) {
                this.calcSize(i);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "sizeDTmp", {
        get: function () {
            if (util_1.isUndefined(this._sizeDTmp)) {
                this._sizeDTmp = this.sizeD;
            }
            return this._sizeDTmp;
        },
        set: function (value) {
            this._sizeDTmp = value;
            if (this.pageData.product.specialUpperFlapFlag != 1) {
                this._upperFlapTmp = this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
            }
            if (this.pageData.product.specialLowerFlapFlag != 1) {
                this._lowerFlapTmp = this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
            }
            this.calcBlankSizeTmp(false);
            for (var i = 1; i < 13; i++) {
                this.calcSize(i);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "sizeHTmp", {
        get: function () {
            if (util_1.isUndefined(this._sizeHTmp)) {
                this._sizeHTmp = this.sizeH;
            }
            return this._sizeHTmp;
        },
        set: function (value) {
            this._sizeHTmp = value;
            this.calcBlankSizeTmp(false);
            for (var i = 1; i < 13; i++) {
                this.calcSize(i);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "sizeWTmp", {
        get: function () {
            if (util_1.isUndefined(this._sizeWTmp)) {
                this._sizeWTmp = this.sizeW;
            }
            return this._sizeWTmp;
        },
        set: function (value) {
            this._sizeWTmp = value;
            this.calcBlankSizeTmp(false);
            for (var i = 1; i < 13; i++) {
                this.calcSize(i);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "laminationFluteTmp", {
        get: function () {
            if (util_1.isUndefined(this._laminationFluteTmp)) {
                this._laminationFluteTmp = this.laminationFlute;
            }
            return this._laminationFluteTmp;
        },
        set: function (value) {
            this._laminationFluteTmp = value;
            if (this.pageData.product.specialUpperFlapFlag != 1) {
                this._upperFlapTmp = this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
            }
            if (this.pageData.product.specialLowerFlapFlag != 1) {
                this._lowerFlapTmp = this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
            }
            this.calcBlankSizeTmp(true);
            for (var i = 1; i < 13; i++) {
                this.calcSize(i);
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0030217Component.prototype.saveFlap = function () {
        this.saveProduct();
        this.pageData.checkInputSave = false;
    };
    Object.defineProperty(SF0030217Component.prototype, "blankPaperSizeWTmp", {
        get: function () {
            if (util_1.isUndefined(this._blankSizeWTmp)) {
                this._blankSizeWTmp = this.blankPaperSizeW;
            }
            return math_util_1.default.checkNaN(this._blankSizeWTmp);
        },
        set: function (value) {
            this._blankSizeWTmp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "blankPaperSizeHTmp", {
        get: function () {
            if (util_1.isUndefined(this._blankSizeHTmp)) {
                this._blankSizeHTmp = this.blankPaperSizeH;
            }
            return math_util_1.default.checkNaN(this._blankSizeHTmp);
        },
        set: function (value) {
            this._blankSizeHTmp = value;
        },
        enumerable: true,
        configurable: true
    });
    SF0030217Component.prototype.calcBlankSizeTmp = function (laminationChange) {
        var size1;
        var size2;
        var defaultFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
        if (this._laminationFluteTmp == 1) {
            size1 = math_util_1.default.checkNaN((this._sizeWTmp + this._sizeDTmp) * 2 + 35);
            size2 = math_util_1.default.checkNaN((this._sizeDTmp + this._sizeHTmp) + 6);
        }
        else if (this._laminationFluteTmp == 2) {
            size1 = math_util_1.default.checkNaN((this._sizeWTmp + this._sizeDTmp) * 2 + 30);
            size2 = math_util_1.default.checkNaN((this._sizeDTmp + this._sizeHTmp) + 4);
        }
        else if (this._laminationFluteTmp == 3) {
            size1 = math_util_1.default.checkNaN((this._sizeWTmp + this._sizeDTmp) * 2 + 40);
            size2 = math_util_1.default.checkNaN((this._sizeDTmp + this._sizeHTmp) + 10);
        }
        else if (this._laminationFluteTmp == 4) {
            size1 = math_util_1.default.checkNaN((this._sizeWTmp + this._sizeDTmp) * 2 + 35);
            size2 = math_util_1.default.checkNaN((this._sizeDTmp + this._sizeHTmp) + 5);
        }
        if (size1 < 0) {
            size1 = 0;
        }
        if (size2 < 0) {
            size2 = 0;
        }
        var upperFlap = this._upperFlapTmp;
        if (util_1.isNullOrUndefined(upperFlap) || laminationChange) {
            upperFlap = defaultFlap;
        }
        var lowerFlap = this._lowerFlapTmp;
        if (util_1.isNullOrUndefined(lowerFlap) || laminationChange) {
            lowerFlap = defaultFlap;
        }
        this.blankPaperSizeWTmp = math_util_1.default.checkNaN(size2 + (upperFlap - defaultFlap) + (lowerFlap - defaultFlap));
        this.blankPaperSizeHTmp = math_util_1.default.checkNaN(size1);
    };
    Object.defineProperty(SF0030217Component.prototype, "laminationFluteTmpName", {
        get: function () {
            var _this = this;
            if (this._laminationFluteTmp != 0) {
                master_option_1.CARTON_FLUTE.forEach(function (data) {
                    if (data.id == _this._laminationFluteTmp) {
                        return data.name;
                    }
                });
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "calcDimension", {
        get: function () {
            if (this._laminationFluteTmp != 0) {
                var result = this.size01;
                var factor = this.size11;
                if (this._laminationFluteTmp == 1) {
                    return math_util_1.default.roundDecimal(math_util_1.default.checkNaN(result / 1000 * factor / 1000), 4);
                }
                else if (this._laminationFluteTmp == 2) {
                    return math_util_1.default.roundDecimal(math_util_1.default.checkNaN(result / 1000 * factor / 1000), 4);
                }
                else if (this._laminationFluteTmp == 3) {
                    return math_util_1.default.roundDecimal(math_util_1.default.checkNaN(result / 1000 * factor / 1000 * 1.5), 4);
                }
                else if (this._laminationFluteTmp == 4) {
                    return math_util_1.default.roundDecimal(math_util_1.default.checkNaN(result / 1000 * factor / 1000), 4);
                }
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "pageData", {
        get: function () {
            return this.helper.getSF00302Data();
        },
        enumerable: true,
        configurable: true
    });
    SF0030217Component.prototype.saveProduct = function () {
        this.pageData.product.laminationFlute = this._laminationFluteTmp;
        this.pageData.product.sizeD = this._sizeDTmp;
        this.pageData.product.sizeH = this._sizeHTmp;
        this.pageData.product.sizeW = this._sizeWTmp;
        this.pageData.product.upperFlap = this._upperFlapTmp;
        this.pageData.product.lowerFlap = this._lowerFlapTmp;
        this.pageData.product.blankPaperSizeW = this._blankSizeWTmp;
        this.pageData.product.blankPaperSizeH = this._blankSizeHTmp;
        var product = new Product_model_1.Product();
        product.setProduct(this.pageData.product);
        if (product.pasteId == 0) {
            product.pasteId = null;
        }
        if (product.stampingId == 0) {
            product.stampingId = null;
        }
        if (product.paperId == 0) {
            product.paperId = null;
        }
        if (product.surfaceTreatmentIdF == 0) {
            product.surfaceTreatmentIdF = null;
        }
        if (product.surfaceTreatmentIdB == 0) {
            product.surfaceTreatmentIdB = null;
        }
        if (product.packingId == 0) {
            product.packingId = null;
        }
        if (product.shippingCostId == 0) {
            product.shippingCostId = null;
        }
        this.sv00302Service.sv003012UpdateProductInput(product).then(function (res) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00302.INF006) }, { type: 'info' });
        });
        this.setOtherNote1();
        this.closeModal(true);
    };
    SF0030217Component.prototype.closeModal = function (isSave) {
        $("#draw-modal").modal('hide');
        this._sizeHTmp = this.sizeH;
        this._sizeWTmp = this.sizeW;
        this._sizeDTmp = this.sizeD;
        this._laminationFluteTmp = this.laminationFlute;
        this._blankSizeHTmp = this.blankPaperSizeH;
        this._blankSizeWTmp = this.blankPaperSizeW;
        this._upperFlapTmp = this.upperFlap;
        this._lowerFlapTmp = this.lowerFlap;
        this.helper.validateForm();
        if (!isSave) {
            this.pageData.product.specialUpperFlapFlag = this.specialUpperFlapFlag;
            this.pageData.product.specialLowerFlapFlag = this.specialLowerFlapFlag;
        }
    };
    SF0030217Component.prototype.getSize = function (pos) {
        var value = 0;
        switch (pos) {
            case 1:
                value = this.size01;
                break;
            case 2:
                value = this.size02;
                break;
            case 3:
                value = this.size03;
                break;
            case 4:
                value = this.size04;
                break;
            case 5:
                value = this.size05;
                break;
            case 6:
                value = this.size06;
                break;
            case 7:
                value = this.size07;
                break;
            case 8:
                value = this.size08;
                break;
            case 9:
                value = this.size09;
                break;
            case 10:
                value = this.size10;
                break;
            case 11:
                value = this.size11;
                break;
            case 12:
                value = this.size12;
                break;
        }
        if (isNaN(value)) {
            return 0;
        }
        else {
            return value;
        }
    };
    SF0030217Component.prototype.calcSize = function (pos) {
        var value = 0;
        switch (pos) {
            case 1:
                if (!(util_1.isNullOrUndefined(this.size02) && util_1.isNullOrUndefined(this.size03) && util_1.isNullOrUndefined(this.size04))) {
                    value = math_util_1.default.checkNaN(this.size02 + this.size03 + this.size04);
                    this.size01 = value;
                }
                break;
            case 2:
                if (!(util_1.isNullOrUndefined(this.size05) && util_1.isNullOrUndefined(this.size06))) {
                    value = math_util_1.default.checkNaN(this.size05 + this.size06);
                    this.size02 = value;
                    this.calcSize(1);
                }
                break;
            case 3:
                if (!(util_1.isNullOrUndefined(this.size07) && util_1.isNullOrUndefined(this.size08))) {
                    value = math_util_1.default.checkNaN(this.size07 + this.size08);
                    this.size03 = value;
                    this.calcSize(1);
                }
                break;
            case 4:
                if (this.laminationFluteTmp == 1) {
                    value = 35;
                }
                else if (this.laminationFluteTmp == 2) {
                    value = 30;
                }
                else if (this.laminationFluteTmp == 3) {
                    value = 40;
                }
                else if (this.laminationFluteTmp == 4) {
                    value = 35;
                }
                this.size04 = value;
                this.calcSize(1);
                break;
            case 5:
                if (this.sizeWTmp >= 3) {
                    value = math_util_1.default.checkNaN(this.sizeWTmp - 3);
                }
                this.size05 = math_util_1.default.checkNaN(value);
                this.calcSize(2);
                break;
            case 6:
                value = this.sizeDTmp;
                this.size06 = math_util_1.default.checkNaN(value);
                this.calcSize(2);
                break;
            case 7:
                value = this.sizeWTmp;
                this.size07 = math_util_1.default.checkNaN(value);
                this.calcSize(3);
                break;
            case 8:
                if (this.laminationFluteTmp == 1) {
                    value = this.sizeDTmp - 3;
                }
                else if (this.laminationFluteTmp == 2) {
                    value = this.sizeDTmp - 2;
                }
                else if (this.laminationFluteTmp == 3) {
                    value = this.sizeDTmp - 4;
                }
                else if (this.laminationFluteTmp == 4) {
                    value = this.sizeDTmp - 3;
                }
                if (value < 0) {
                    value = 0;
                }
                this.size08 = math_util_1.default.checkNaN(value);
                this.calcSize(3);
                break;
            case 9:
                value = this.upperFlapTmp;
                if (util_1.isNullOrUndefined(value)) {
                    value = this.defaultFlapTmp;
                }
                ;
                this.size09 = math_util_1.default.checkNaN(value);
                this.calcSize(11);
                break;
            case 10:
                value = this.sizeHTmp;
                this.size10 = math_util_1.default.checkNaN(value);
                this.calcSize(11);
                break;
            case 11:
                value = math_util_1.default.checkNaN(this.size10 + this.size09 + this.size12);
                this.size11 = value;
                break;
            case 12:
                value = this.lowerFlapTmp;
                if (util_1.isNullOrUndefined(value)) {
                    value = this.defaultFlapTmp;
                }
                ;
                this.size12 = math_util_1.default.checkNaN(value);
                this.calcSize(11);
                break;
        }
        if (isNaN(value)) {
            return 0;
        }
        else {
            return value;
        }
    };
    Object.defineProperty(SF0030217Component.prototype, "isCreat", {
        get: function () {
            return this.pageData.product == null || this.pageData.product.id == null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "defaultFlap", {
        get: function () {
            return this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "defaultFlapTmp", {
        get: function () {
            return this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "takenNumber", {
        get: function () {
            this.pageData.product.takenNumber = math_util_1.default.checkNaN(this.pageData.product.takenNumber);
            return this.pageData.product.takenNumber;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('takenNumber');
            this.pageData.product.takenNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "checkBorderTakenNumber", {
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
    Object.defineProperty(SF0030217Component.prototype, "upperFlapChange", {
        get: function () {
            var result = math_util_1.default.checkNaN(this.pageData.product.upperFlap - this.defaultFlap);
            if (result > 0) {
                return "+" + format_util_1.FormatUtil.formatNumber(math_util_1.default.round(result, 1), 1);
            }
            else if (result < 0) {
                return format_util_1.FormatUtil.formatNumber(math_util_1.default.round(result, 1), 1);
            }
            return result.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "lowerFlapChange", {
        get: function () {
            var result = math_util_1.default.checkNaN(this.pageData.product.lowerFlap - this.defaultFlap);
            if (result > 0) {
                return "+" + format_util_1.FormatUtil.formatNumber(math_util_1.default.round(result, 1), 1);
            }
            else if (result < 0) {
                return format_util_1.FormatUtil.formatNumber(math_util_1.default.round(result, 1), 1);
            }
            return result.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "upperFlapChangeTmp", {
        get: function () {
            var result = math_util_1.default.checkNaN(this._upperFlapTmp - this.defaultFlapTmp);
            if (result > 0) {
                return "+" + format_util_1.FormatUtil.formatNumber(math_util_1.default.round(result, 1), 1);
            }
            else if (result < 0) {
                return format_util_1.FormatUtil.formatNumber(math_util_1.default.round(result, 1), 1);
            }
            return result.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "lowerFlapChangeTmp", {
        get: function () {
            var result = math_util_1.default.checkNaN(this._lowerFlapTmp - this.defaultFlapTmp);
            if (result > 0) {
                return "+" + format_util_1.FormatUtil.formatNumber(math_util_1.default.round(result, 1), 1);
            }
            else if (result < 0) {
                return format_util_1.FormatUtil.formatNumber(math_util_1.default.round(result, 1), 1);
            }
            return result.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "lowerFlap", {
        get: function () {
            return this.pageData.product.lowerFlap;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('flap');
            var result = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
            if (math_util_1.default.checkNaN(value) == result) {
                this.pageData.product.specialLowerFlapFlag = 0;
                this.pageData.product.lowerFlap = result;
                this._lowerFlapTmp = this.pageData.product.lowerFlap;
            }
            if (this.pageData.product.lowerFlap !== value) {
                this.pageData.product.specialLowerFlapFlag = 1;
                this.pageData.product.lowerFlap = value;
                this._lowerFlapTmp = value;
            }
            this.calcBlankSize(false);
            for (var i = 1; i < 13; i++) {
                this.calcSize(i);
            }
            this.setOtherNote1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030217Component.prototype, "lowerFlapTmp", {
        get: function () {
            if (util_1.isUndefined(this._lowerFlapTmp)) {
                this._lowerFlapTmp = this.pageData.product.lowerFlap;
            }
            return this._lowerFlapTmp;
        },
        set: function (value) {
            var result = this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
            if (math_util_1.default.checkNaN(value) == result) {
                this.pageData.product.specialLowerFlapFlag = 0;
                this._lowerFlapTmp = result;
            }
            if (result != value) {
                this.pageData.product.specialLowerFlapFlag = 1;
                this._lowerFlapTmp = value;
            }
            this.calcBlankSizeTmp(false);
            for (var i = 1; i < 13; i++) {
                this.calcSize(i);
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0030217Component.prototype.cloneValue = function (value) {
        return value;
    };
    SF0030217Component.prototype.autoCalcSize = function () {
        this.specialUpperFlapFlag = this.cloneValue(this.pageData.product.specialUpperFlapFlag);
        this.specialLowerFlapFlag = this.cloneValue(this.pageData.product.specialLowerFlapFlag);
        for (var i = 1; i < 13; i++) {
            this.calcSize(i);
        }
        this.calcBlankSizeTmp(false);
        $("#draw-modal").modal('show');
    };
    SF0030217Component.prototype.openImage = function () {
        window.open("/assets/img/SGSK_cartonMachine_170523.jpg", '_blank');
    };
    SF0030217Component.prototype.setOtherNote1 = function () {
        if (this.pageData.product.specialNote1Flag != 1) {
            var method1 = master_option_1.OTHER_METHOD[this.pageData.product.otherMethod1];
            if (this.pageData.product.otherMethod1 == 4) {
                method1 = method1 + "上" + this.upperFlapChange + "mm" + "下" + this.lowerFlapChange + "mm";
            }
            var method2 = master_option_1.OTHER_METHOD[this.pageData.product.otherMethod2];
            if (this.pageData.product.otherMethod2 == 4) {
                method2 = method2 + "上" + this.upperFlapChange + "mm" + "下" + this.lowerFlapChange + "mm";
            }
            if (method1 == "なし") {
                if (method2 != undefined && method2 != "なし") {
                    this.pageData.product.memo1 = method2;
                }
                else {
                    this.pageData.product.memo1 = "";
                }
            }
            else {
                if (method2 != undefined && method2 != "なし") {
                    this.pageData.product.memo1 = method1 + "／" + method2;
                }
                else {
                    this.pageData.product.memo1 = method1;
                }
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030217Component.prototype, "helper", void 0);
    SF0030217Component = __decorate([
        core_1.Component({
            selector: "sf0030217",
            templateUrl: "SF0030217.component.html",
            styleUrls: ["SF0030217.component.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [SF003020201_page_1.SF003020201Page, router_1.ActivatedRoute, router_1.Router, Header_provider_1.HeaderProvider, SF00302_service_1.SF00302Service])
    ], SF0030217Component);
    return SF0030217Component;
}());
exports.SF0030217Component = SF0030217Component;
//# sourceMappingURL=SF0030217.component.js.map