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
var data_util_1 = require("../../../../../../util/data-util");
var format_util_1 = require("../../../../../../util/format-util");
var SF003020103Helper = (function () {
    function SF003020103Helper() {
    }
    SF003020103Helper.prototype.getDieCuttingPasteTotalCost = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.productOutput.dieCuttingTotalCost) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.pasteTotalCost);
    };
    SF003020103Helper.prototype.validateForm = function () {
        var isValidate = true;
        // http://fridaynight.vnext.vn/issues/3369
        if (this.sf00302Data.product.requestDesignFlag == 1) {
            return true;
        }
        if (!this.getSF00302Data().product.productName) {
            this.getSF00302Data().productRequiredItem.isSaveProductName = true;
            // check validate false
            isValidate = false;
        }
        else {
            this.getSF00302Data().productRequiredItem.isSaveProductName = false;
        }
        if (this.getSF00302Data().product.id) {
            if (this.getSF00302Data().productOutput.lot == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveLot = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveLot = false;
            }
            if (this.getSF00302Data().indexOffer.unitPrice == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice = false;
            }
            // フルート
            if (this.getSF00302Data().product.laminationFlute == undefined || this.getSF00302Data().product.laminationFlute == 1) {
                this.getSF00302Data().productRequiredItem.isSaveFlute = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveFlute = false;
            }
            // シート寸法 (mm)
            if (!this.getSF00302Data().product.paperSizeW) {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeW = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeW = false;
            }
            // シート寸法 (mm)
            if (!this.getSF00302Data().product.cutPaperSizeW) {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeW = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeW = false;
            }
            if (!this.getSF00302Data().product.cutPaperSizeH) {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeH = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeH = false;
            }
            // 中芯（g/㎡）
            if (this.getSF00302Data().product.laminationPaperTypeMedium == undefined || this.getSF00302Data().product.laminationPaperTypeMedium == 0) {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeMedium = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeMedium = false;
            }
            // validate laminationMediumBasicWeight
            if (this.getSF00302Data().product.laminationPaperTypeMedium == 0) {
                if (this.getSF00302Data().product.laminationMediumBasicWeight == undefined
                    || this.getSF00302Data().product.laminationMediumBasicWeight == 0) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            }
            else {
                if (this.getSF00302Data().product.laminationMediumBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            }
            if (this.getSF00302Data().product.laminationPaperTypeMedium == 8) {
                if (this.getSF00302Data().product.laminationMediumThroughWage == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumThroughWage = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumThroughWage = false;
                }
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationMediumThroughWage = false;
            }
            // 裏ライナー（g/㎡）
            if (this.getSF00302Data().product.laminationPaperTypeBack == undefined || this.getSF00302Data().product.laminationPaperTypeBack == 0) {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeBack = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeBack = false;
            }
            // validate laminationBackBasicWeight
            if (this.getSF00302Data().product.laminationPaperTypeBack == 0) {
                if (this.getSF00302Data().product.laminationBackBasicWeight == undefined
                    || this.getSF00302Data().product.laminationBackBasicWeight == 0) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            }
            else {
                if (this.getSF00302Data().product.laminationBackBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackBasicWeight = false;
                }
            }
            if (this.getSF00302Data().product.laminationPaperTypeBack == 8) {
                if (this.getSF00302Data().product.laminationBackThroughWage == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackThroughWage = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackThroughWage = false;
                }
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationBackThroughWage = false;
            }
            // 取数（丁）
            if (this.getSF00302Data().product.takenNumber == undefined || format_util_1.FormatUtil.isNaN(this.getSF00302Data().product.takenNumber) == 0) {
                this.getSF00302Data().productRequiredItem.isSaveTakenNumber = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveTakenNumber = false;
            }
            // 面付数（丁）
            if (this.getSF00302Data().product.impositionNumber == undefined || format_util_1.FormatUtil.isNaN(this.getSF00302Data().product.impositionNumber) == 0) {
                this.getSF00302Data().productRequiredItem.isSaveImpositionNumber = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveImpositionNumber = false;
            }
        }
        return isValidate;
    };
    SF003020103Helper.prototype.checkChangeDataOffer = function () {
    };
    /**
     * Calculate for attributes: windowMaterialFee of product output
     */
    SF003020103Helper.prototype.calcWindowMaterialFee = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().product.windowSizeW != 0 && _this.getSF00302Data().product.windowSizeW != undefined) {
                var condition = (+_this.getSF00302Data().product.windowSizeW + 40) * (+_this.getSF00302Data().product.windowSizeH + 40) * 20 / 1000000;
                if (condition < 0.7) {
                    result = 0.7;
                }
                else {
                    result = 1;
                }
            }
            _this.getSF00302Data().productOutput.windowMaterialFee = math_util_1.default.checkNaN(result);
        });
        this.calcWindowTotalCost();
    };
    /**
     * Calculate for attributes: windowTotalCost of product output
     */
    SF003020103Helper.prototype.calcWindowTotalCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            var big = 0;
            var small = 0;
            if (_this.getSF00302Data().product.cutPaperSizeH > _this.getSF00302Data().product.cutPaperSizeW) {
                big = _this.getSF00302Data().product.cutPaperSizeH;
                small = _this.getSF00302Data().product.cutPaperSizeW;
            }
            else {
                small = _this.getSF00302Data().product.cutPaperSizeH;
                big = _this.getSF00302Data().product.cutPaperSizeW;
            }
            var size = 2;
            if (big > 400 || small > 350) {
                size = 1;
            }
            var lot = 2;
            if (_this.getSF00302Data().productOutput.lot <= 1000) {
                lot = 1;
            }
            var material = 2;
            if (_this.getSF00302Data().product.laminationFlute == 1) {
                material = 1;
            }
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().mstData != undefined && _this.getSF00302Data().product.windowSizeW != 0 && _this.getSF00302Data().product.windowSizeW != undefined) {
                result = math_util_1.default.checkNaN((+data_util_1.default.getData(_this.getSF00302Data().mstData.mstWindow, 0, size, lot, material, "windowPreparationFee")) + ((+data_util_1.default.getData(_this.getSF00302Data().mstData.mstWindow, 0, size, lot, material, "windowThroughWage")) + (+_this.getSF00302Data().productOutput.windowMaterialFee)) * _this.getSF00302Data().productOutput.lot);
            }
            _this.getSF00302Data().productOutput.windowTotalCost = math_util_1.default.checkNaN(result);
        });
        this.calcSubTotal();
    };
    SF003020103Helper.prototype.calcSurfaceBasicCost = function (id) {
    };
    SF003020103Helper.prototype.calcSurfaceThroughWage = function (id) {
    };
    SF003020103Helper.prototype.calcSurfaceTotalCost = function (id) {
    };
    SF003020103Helper.prototype.calcColorPlateCost = function (id) {
    };
    SF003020103Helper.prototype.calcColorPrintLoss = function (id) {
    };
    SF003020103Helper.prototype.calcColorCostPerPacket = function (id) {
    };
    SF003020103Helper.prototype.calcColorBasicCost = function (id) {
    };
    SF003020103Helper.prototype.calcColorThroughWage = function (id) {
    };
    SF003020103Helper.prototype.calcColorSpecial = function (id) {
    };
    SF003020103Helper.prototype.calcSubmittedTotal = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var submittedTotal = 0;
            if (_this.sf00302Data.indexOffer.unitPrice != 0) {
                submittedTotal = math_util_1.default.checkNaN(_this.sf00302Data.indexOffer.unitPrice * _this.sf00302Data.productOutput.lot);
            }
            _this.sf00302Data.indexOffer.total = submittedTotal;
        });
    };
    SF003020103Helper.prototype.calcEstimateDiff = function (id) {
        var _this = this;
        this.calculateAllOutput(function () {
            var estimatedDiff = 0;
            if (id == 1 && _this.getSF00302Data().product.shapeId == _this.getSF00302Data().DECORATIVE_ID) {
                if (_this.getSF00302Data().indexOffer.total != 0) {
                    _this.getSF00302Data().indexOffer.profitRate = math_util_1.default.checkNaN(math_util_1.default.roundDecimal((_this.getSF00302Data().indexOffer.unitPrice - _this.getSF00302Data().productOutput.estimatedUnitPrice) / _this.getSF00302Data().productOutput.estimatedUnitPrice * 100, 2));
                }
                else {
                    _this.getSF00302Data().indexOffer.profitRate = 0;
                }
            }
        });
    };
    SF003020103Helper.prototype.getProductOutputOtherFee1 = function () {
        var divisor = this.sf00302Data.product.dieCuttingFlag == 1 ? this.sf00302Data.product.dieCuttingThroughNumber : 1;
        return math_util_1.default.checkNaN(this.sf00302Data.product.otherUnitType1 == 1 ? this.sf00302Data.product.otherWage1 * this.sf00302Data.productOutput.lot / divisor : this.sf00302Data.product.otherWage1);
    };
    SF003020103Helper.prototype.getProductOutputOtherFee2 = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.product.otherUnitType2 == 1 ? this.sf00302Data.product.otherWage2 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage2);
    };
    SF003020103Helper.prototype.getProductOutputOtherFee3 = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.product.otherUnitType3 == 1 ? this.sf00302Data.product.otherWage3 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage3);
    };
    SF003020103Helper.prototype.calcMoldFee = function () {
        // 金型の自動計算取り止めのため、コメントアウト
        // let moldFee = 0;
        // if (this.sf00302Data.product.stampingId != 0) {
        //     let size1 = 0;
        //     let size2 = 0;
        //     let size3 = 0;
        //     let size4 = 0;
        //     if (this.productStampingSizeH1 != 0 && this.productStampingSizeW1 != 0) {
        //         size1 = MathUtil.checkNaN((this.productStampingSizeH1 + 20) * (this.productStampingSizeW1 + 20) / 100 * 40);
        //     }
        //     if (this.productStampingSizeH2 != 0 && this.productStampingSizeW2 != 0) {
        //         size2 = MathUtil.checkNaN((this.productStampingSizeH2 + 20) * (this.productStampingSizeW2 + 20) / 100 * 40);
        //     }
        //     if (this.productStampingSizeH3 != 0 && this.productStampingSizeW3 != 0) {
        //         size3 = MathUtil.checkNaN((this.productStampingSizeH3 + 20) * (this.productStampingSizeW3 + 20) / 100 * 40);
        //     }
        //     if (this.productStampingSizeH4 != 0 && this.productStampingSizeW4 != 0) {
        //         size4 = MathUtil.checkNaN((this.productStampingSizeH4 + 20) * (this.productStampingSizeW4 + 20) / 100 * 40);
        //     }
        //     moldFee = size1 + size2 + size3 + size4;
        //     if (this.sf00302Data.product.stampingId != 1) {
        //         moldFee = moldFee * 1.45;
        //     }
        // }
        // this.sf00302Data.productCommonFee.moldFee = moldFee;
    };
    SF003020103Helper.prototype.calcDieCuttingWeight = function () {
        var result = 0;
        var condition = this.sf00302Data.product.paperWeight + this.productLaminationMediumBasicWeight + this.productLaminationBackBasicWeight;
        if (condition < 150) {
            result = 3;
        }
        else if (condition > 150 && condition < 200) {
            result = 2;
        }
        else if (condition > 550) {
            result = 1;
        }
        this.sf00302Data.product.dieCuttingWeight = result;
    };
    /**
     * Calculate for attributes: dieCuttingLoss of product output
     */
    SF003020103Helper.prototype.calcDieCuttingLoss = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().product.dieCuttingThroughNumber != 0
                && _this.sf00302Data.product.dieCuttingFlag == 1) {
                result = math_util_1.default.checkNaN(math_util_1.default.ceilDecimal((math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.paperTotalCost)
                    + math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.laminationTotalCost)) * 0.01, 0));
            }
            _this.getSF00302Data().productOutput.dieCuttingLoss = result;
        });
        this.calcPasteLoss();
        this.calcDieCuttingTotalCost();
    };
    SF003020103Helper.prototype.calcInspection = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var tmp = 0;
            if (_this.getSF00302Data().product.inspectionId == 2) {
                tmp = 1;
            }
            else if (_this.getSF00302Data().product.inspectionId == 3) {
                tmp = 0.5;
            }
            else if (_this.getSF00302Data().product.inspectionId == 4) {
                tmp = 0.3;
            }
            _this.getSF00302Data().productOutput.inspection = math_util_1.default.checkNaN(tmp * _this.getSF00302Data().productOutput.lot);
        });
        this.calcEstimateTotal();
    };
    SF003020103Helper.prototype.calcOtherFee = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.calcSubTotal();
            _this.calcEstimateTotal();
            _this.getSF00302Data().productOutput.estimatedTotal = _this.getSF00302Data().productOutput.estimatedTotal + _this.getProductOutputOtherFee1();
            _this.getSF00302Data().productOutput.estimatedTotal = _this.getSF00302Data().productOutput.estimatedTotal + _this.getProductOutputOtherFee2();
            _this.getSF00302Data().productOutput.estimatedTotal = _this.getSF00302Data().productOutput.estimatedTotal + _this.getProductOutputOtherFee3();
            _this.calcEstimateTotal();
        });
    };
    SF003020103Helper.prototype.calcPaperTotalCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var paperTotalCost = 0;
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().product.laminationFlute != 1) {
                if (_this.getSF00302Data().product.laminationFlute != 0) {
                    var fluteFactor = void 0;
                    if (_this.getSF00302Data().product.laminationFlute == 3) {
                        fluteFactor = 1.4;
                    }
                    else {
                        fluteFactor = 1.3;
                    }
                    paperTotalCost = math_util_1.default.checkNaN(math_util_1.default.roundDecimal(fluteFactor * _this.productLaminationMediumBasicWeight * _this.productLaminationMediumThroughWage / 1000
                        + _this.productLaminationBackBasicWeight * _this.productLaminationBackThroughWage / 1000, 2));
                }
            }
            _this.getSF00302Data().productOutput.paperTotalCost = paperTotalCost;
            _this.calcLaminationUnitPrice();
        });
    };
    SF003020103Helper.prototype.calcLaminationSize = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().product.laminationFlute != 1) {
                var longValue = _this.getSF00302Data().product.paperSizeW;
                if (_this.getSF00302Data().product.paperSizeH > _this.getSF00302Data().product.paperSizeW) {
                    longValue = _this.getSF00302Data().product.paperSizeH;
                }
                var shortCutValue = _this.getSF00302Data().product.cutPaperSizeW;
                var longCutValue = _this.getSF00302Data().product.cutPaperSizeH;
                if (_this.getSF00302Data().product.cutPaperSizeH < _this.getSF00302Data().product.cutPaperSizeW) {
                    shortCutValue = _this.getSF00302Data().product.cutPaperSizeH;
                    longCutValue = _this.getSF00302Data().product.cutPaperSizeW;
                }
                result = math_util_1.default.checkNaN(longValue / 1000 / (math_util_1.default.floorDecimal(longValue / shortCutValue, 0)) * longCutValue / 1000);
            }
            _this.getSF00302Data().productOutput.laminationSize = result;
            _this.calcLaminationUnitPrice();
        });
    };
    SF003020103Helper.prototype.calcLaminationUnitPrice = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().product.laminationFlute != 1) {
                result = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.laminationSize * _this.getSF00302Data().productOutput.paperTotalCost);
            }
            _this.getSF00302Data().productOutput.laminationUnitPrice = result;
            _this.calcLaminationTotalCost();
        });
    };
    SF003020103Helper.prototype.calcLaminationTotalCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var laminationTotalCost = 0;
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().product.laminationFlute != 1) {
                if (_this.getSF00302Data().product.laminationFlute != 0) {
                    laminationTotalCost = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.laminationUnitPrice * _this.calcThroughNumber());
                }
            }
            _this.getSF00302Data().productOutput.laminationTotalCost = laminationTotalCost;
            _this.calccartonMaterialLoss();
            _this.calcDieCuttingLoss();
            _this.calcPacking();
            _this.calcSubTotal();
        });
    };
    SF003020103Helper.prototype.calcDieCuttingBasicCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            var size = 1;
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0) {
                var condition = _this.getSF00302Data().product.cutPaperSizeH * _this.getSF00302Data().product.cutPaperSizeW;
                if (condition < 309000) {
                    size = 3;
                }
                else if (condition <= 617500) {
                    size = 2;
                }
            }
            var number = 1;
            if (_this.getSF00302Data().productOutput.lot / _this.getSF00302Data().product.takenNumber <= 1000) {
                number = 2;
            }
            if (_this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().product.dieCuttingThroughNumber != 0 && _this.getSF00302Data().mstData != undefined
                && _this.getSF00302Data().product.dieCuttingFlag == 1) {
                result = data_util_1.default.getData(_this.getSF00302Data().mstData.mstDieCutting, 0, _this.getSF00302Data().product.laminationFlute, size, _this.getSF00302Data().product.dieCuttingThroughNumber, number, "basicCost");
            }
            _this.getSF00302Data().productOutput.dieCuttingBasicCost = result;
        });
        this.calcDieCuttingTotalCost();
    };
    /**
     * Calculate for attributes: dieCuttingThroughWage of product output
     */
    SF003020103Helper.prototype.calcDieCuttingThroughWage = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            var size = 1;
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0) {
                var condition = _this.getSF00302Data().product.cutPaperSizeH * _this.getSF00302Data().product.cutPaperSizeW;
                if (condition < 309000) {
                    size = 3;
                }
                else if (condition <= 617500) {
                    size = 2;
                }
            }
            var number = 1;
            if (_this.getSF00302Data().productOutput.lot / _this.getSF00302Data().product.takenNumber <= 1000) {
                number = 2;
            }
            if (_this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().product.dieCuttingThroughNumber != 0 && _this.getSF00302Data().mstData != undefined
                && _this.getSF00302Data().product.dieCuttingFlag == 1) {
                result = data_util_1.default.getData(_this.getSF00302Data().mstData.mstDieCutting, 0, _this.getSF00302Data().product.laminationFlute, size, _this.getSF00302Data().product.dieCuttingThroughNumber, number, "throughWage");
                if (_this.getSF00302Data().product.dieCuttingWeight == 1) {
                    result = result * 1.2;
                }
                else if (_this.getSF00302Data().product.dieCuttingWeight == 2) {
                    result = result * 1.5;
                }
                else if (_this.getSF00302Data().product.dieCuttingWeight == 3) {
                    result = result * 2;
                }
            }
            _this.getSF00302Data().productOutput.dieCuttingThroughWage = result;
        });
        this.calcDieCuttingTotalCost();
    };
    SF003020103Helper.prototype.calccartonMaterialLoss = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var cartonMaterialLoss = 0;
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().product.laminationFlute != 1) {
                var conditions = [1000, 2000, 3000, 5000, 7000, 10000, 20000];
                var index = 0;
                var condition = 1000;
                while (index < conditions.length) {
                    if (conditions[index] >= _this.getSF00302Data().productOutput.lot) {
                        condition = conditions[index];
                        index = conditions.length + 1;
                    }
                    else {
                        index++;
                    }
                }
                if (_this.getSF00302Data().productOutput.lot >= 20000) {
                    condition = 20000;
                }
                cartonMaterialLoss = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.paperTotalCost * data_util_1.default.getData(_this.getSF00302Data().mstData.mstDecorative, 0, condition, "lossPercent"));
            }
            _this.getSF00302Data().productOutput.cartonMaterialLoss = cartonMaterialLoss;
            _this.calclaminationSheetCost();
        });
    };
    SF003020103Helper.prototype.calcPasteStepWage = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var pasteStepWage = 0;
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().product.laminationFlute != 1) {
                var conditions = [1000, 2000, 3000, 5000, 7000, 10000, 20000];
                var index = 0;
                var condition = 1000;
                while (index < conditions.length) {
                    if (conditions[index] >= _this.getSF00302Data().productOutput.lot) {
                        condition = conditions[index];
                        index = conditions.length + 1;
                    }
                    else {
                        index++;
                    }
                }
                if (_this.getSF00302Data().productOutput.lot >= 20000) {
                    condition = 20000;
                }
                pasteStepWage = math_util_1.default.checkNaN(data_util_1.default.getData(_this.getSF00302Data().mstData.mstDecorative, 0, condition, "stepWage"));
            }
            _this.getSF00302Data().productOutput.pasteStepWage = pasteStepWage;
            _this.calclaminationSheetCost();
        });
    };
    SF003020103Helper.prototype.calclaminationSheetCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var laminationSheetCost = 0;
            _this.getSF00302Data().productOutput.laminationSheetCost = math_util_1.default.checkNaN((+_this.getSF00302Data().productOutput.cartonMaterialLoss + (+_this.getSF00302Data().productOutput.pasteStepWage)) * _this.getSF00302Data().productOutput.lot);
            _this.calcSubTotal();
        });
    };
    SF003020103Helper.prototype.calcDieCuttingTotalCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().product.dieCuttingThroughNumber != 0
                && _this.sf00302Data.product.dieCuttingFlag == 1) {
                result = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.dieCuttingLoss + _this.getSF00302Data().productOutput.dieCuttingBasicCost + _this.getSF00302Data().productOutput.dieCuttingThroughWage * _this.getSF00302Data().productOutput.lot / _this.getSF00302Data().product.takenNumber);
            }
            _this.getSF00302Data().productOutput.dieCuttingTotalCost = math_util_1.default.roundDecimal(result, 0);
        });
        this.calcSubTotal();
    };
    SF003020103Helper.prototype.calcPacking = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var firstSubtotal = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.paperTotalCost + _this.getSF00302Data().productOutput.colorPrintTotalCostF + _this.getSF00302Data().productOutput.colorPrintTotalCostB +
                _this.getSF00302Data().productOutput.surfaceTreatmentTotalCostF + _this.getSF00302Data().productOutput.surfaceTreatmentTotalCostB +
                _this.getSF00302Data().productOutput.embossingTotalCost + _this.getSF00302Data().productOutput.laminationTotalCost + _this.getSF00302Data().productOutput.dieCuttingTotalCost +
                _this.getSF00302Data().productOutput.stampingTotalCost + _this.getSF00302Data().productOutput.windowTotalCost + _this.getProductOutputOtherFee1() + _this.getProductOutputOtherFee2() + _this.getProductOutputOtherFee3() + _this.getSF00302Data().productOutput.laminationSheetCost);
            if (_this.getSF00302Data().mstData != undefined) {
                var lot = 2;
                if (_this.calcThroughNumber() > 1000) {
                    lot = 1;
                }
                var packing = math_util_1.default.checkNaN(data_util_1.default.getData(_this.getSF00302Data().mstData.mstPacking, 0, _this.getSF00302Data().product.packingId, lot, "percent") * (firstSubtotal + _this.getSF00302Data().productOutput.inspection));
                _this.getSF00302Data().productOutput.packing = math_util_1.default.round(packing, 2);
            }
        });
        this.calcSubTotal();
        this.calcEstimateTotal();
    };
    /**
     * Calculate stampingFoildNumber of productOutputs
     */
    SF003020103Helper.prototype.calcStampingPointsNumber = function () {
        //new stamping points number's place holder
        var result = 0;
        //stamping points number only valid when stamping mode is Foil Stamping
        if (this.getSF00302Data().product.stampingId != 0) {
            //prepare a speadsheet for counting
            var stampingSizes = [
                { w: this.productStampingSizeW1, h: this.productStampingSizeH1 },
                { w: this.productStampingSizeW2, h: this.productStampingSizeH2 },
                { w: this.productStampingSizeW3, h: this.productStampingSizeH3 },
                { w: this.productStampingSizeW4, h: this.productStampingSizeH4 }
            ];
            //counting stamping points number
            stampingSizes.forEach(function (item) {
                if (item.w != null && item.w > 0 && item.h != null && item.h > 0) {
                    result++;
                }
            });
        }
        //set result to all product output
        this.getSF00302Data().product.stampingPointsNumber = result;
    };
    /**
     * Calculate for attributes: stampingBasicCost of product output
     */
    SF003020103Helper.prototype.calcStampingBasicCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            var big = 0;
            var small = 0;
            if (_this.getSF00302Data().product.cutPaperSizeH > _this.getSF00302Data().product.cutPaperSizeW) {
                big = _this.getSF00302Data().product.cutPaperSizeH;
                small = _this.getSF00302Data().product.cutPaperSizeW;
            }
            else {
                small = _this.getSF00302Data().product.cutPaperSizeH;
                big = _this.getSF00302Data().product.cutPaperSizeW;
            }
            var cutSize = 1;
            if (big <= 550 && small <= 400) {
                cutSize = 3;
            }
            else if (big < 800 && small < 551) {
                cutSize = 2;
            }
            if (_this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().product.stampingId != undefined && _this.getSF00302Data().mstData != undefined) {
                result = data_util_1.default.getData(_this.getSF00302Data().mstData.mstStamping, 0, _this.getSF00302Data().product.stampingId, cutSize, "basicCost");
            }
            _this.getSF00302Data().productOutput.stampingBasicCost = result;
        });
        this.calcStampingTotalCost();
    };
    /**
     * Calculate for attributes: stampingThroughWage of product output
     */
    SF003020103Helper.prototype.calcStampingThroughWage = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            var big = 0;
            var small = 0;
            if (_this.getSF00302Data().product.cutPaperSizeH > _this.getSF00302Data().product.cutPaperSizeW) {
                big = _this.getSF00302Data().product.cutPaperSizeH;
                small = _this.getSF00302Data().product.cutPaperSizeW;
            }
            else {
                small = _this.getSF00302Data().product.cutPaperSizeH;
                big = _this.getSF00302Data().product.cutPaperSizeW;
            }
            var cutSize = 1;
            if (big <= 550 && small <= 400) {
                cutSize = 3;
            }
            else if (big < 800 && small < 551) {
                cutSize = 2;
            }
            var size1 = 0;
            var size2 = 0;
            var size3 = 0;
            var size4 = 0;
            if (_this.productStampingSizeH1 != 0 && _this.productStampingSizeW1 != 0) {
                size1 = math_util_1.default.checkNaN((_this.productStampingSizeH1 + 10) * (_this.productStampingSizeW1 + 10) / 100 / 100 * 2.4);
            }
            if (_this.productStampingSizeH2 != 0 && _this.productStampingSizeW2 != 0) {
                size2 = math_util_1.default.checkNaN((_this.productStampingSizeH2 + 10) * (_this.productStampingSizeW2 + 10) / 100 / 100 * 2.4);
            }
            if (_this.productStampingSizeH3 != 0 && _this.productStampingSizeW3 != 0) {
                size3 = math_util_1.default.checkNaN((_this.productStampingSizeH3 + 10) * (_this.productStampingSizeW3 + 10) / 100 / 100 * 2.4);
            }
            if (_this.productStampingSizeH4 != 0 && _this.productStampingSizeW4 != 0) {
                size4 = math_util_1.default.checkNaN((_this.productStampingSizeH4 + 10) * (_this.productStampingSizeW4 + 10) / 100 / 100 * 2.4);
            }
            var sumSize = size1 + size2 + size3 + size4;
            if (_this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().mstData != undefined) {
                if (_this.getSF00302Data().product.stampingId != 0) {
                    result = data_util_1.default.getData(_this.getSF00302Data().mstData.mstStamping, 0, _this.getSF00302Data().product.stampingId, cutSize, "throughWage");
                    if (_this.getSF00302Data().product.stampingId == 1 || _this.getSF00302Data().product.stampingId == 2) {
                        result = result + math_util_1.default.checkNaN(sumSize);
                    }
                    if (_this.getSF00302Data().product.stampingPointsNumber > 1) {
                        result = result + (_this.getSF00302Data().product.stampingPointsNumber - 1) * 0.8;
                    }
                }
            }
            result = math_util_1.default.checkNaN(math_util_1.default.round(result, 2));
            _this.getSF00302Data().productOutput.stampingThroughWage = result;
        });
        this.calcStampingTotalCost();
    };
    /**
     * Calculate for attributes: stampingTotalCost of product output
     */
    SF003020103Helper.prototype.calcStampingTotalCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.getSF00302Data().productOutput.stampingTotalCost = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.stampingBasicCost + _this.getSF00302Data().productOutput.stampingThroughWage * _this.getSF00302Data().productOutput.lot);
        });
        this.calcSubTotal();
    };
    SF003020103Helper.prototype.calcShippingCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var conditions = [1000, 2000, 3000, 5000, 7000, 10000, 20000];
            var index = 0;
            var condition = 1000;
            while (index < conditions.length) {
                if (conditions[index] >= _this.getSF00302Data().productOutput.lot) {
                    condition = conditions[index];
                    index = conditions.length + 1;
                }
                else {
                    index++;
                }
            }
            if (_this.getSF00302Data().productOutput.lot >= 20000) {
                condition = 20000;
            }
            var flute = _this.getSF00302Data().product.laminationFlute;
            if (flute == 4) {
                flute = 2;
            }
            var factor = data_util_1.default.getData(_this.getSF00302Data().mstData.mstDecorative, 0, condition, flute, "fare");
            var result = 0;
            if (_this.getSF00302Data().product.shippingCostId.toString() != "0") {
                if (_this.getSF00302Data().product.laminationFlute == 3) {
                    factor = factor * 0.9;
                }
                else if (_this.getSF00302Data().product.laminationFlute == 2) {
                    factor = factor * 0.6;
                }
                else if (_this.getSF00302Data().product.laminationFlute == 4) {
                    factor = factor * 0.4;
                }
                result = math_util_1.default.checkNaN(factor * _this.getSF00302Data().product.cutPaperSizeH * _this.getSF00302Data().product.cutPaperSizeW / 1000 / 1000 * _this.getSF00302Data().productOutput.lot);
            }
            _this.getSF00302Data().productOutput.fareLineService = result;
            _this.calcSubTotal();
        });
    };
    SF003020103Helper.prototype.checkChangeDataProduct = function () {
        var currentProduct = this.getSF00302Data().product;
        var oldProduct = this.getSF00302Data().productOld;
        if (oldProduct.id) {
            // I. Over view area
            if (!this.isEquals(currentProduct.productName, oldProduct.productName)) {
                // 製品名
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.itemCode, oldProduct.itemCode)) {
                // 品目C
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.productType, oldProduct.productType)) {
                // 製品種類
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.factoryId, oldProduct.factoryId)) {
                // 製造依頼先
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.sampleNo, oldProduct.sampleNo)) {
                // サンプルNo
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.filmCode, oldProduct.filmCode)) {
                // フィルムNo
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.customerProductCode, oldProduct.customerProductCode)) {
                // 得意先製品番号
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.woodenCode, oldProduct.woodenCode)) {
                // 木型No
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.woodenCode2, oldProduct.woodenCode2)) {
                // 木型No
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.shareWoodenFlag1, oldProduct.shareWoodenFlag1)) {
                // 木型No
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.shareWoodenFlag2, oldProduct.shareWoodenFlag2)) {
                // 木型No
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.application, oldProduct.application)) {
                // 用途
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.shapeId, oldProduct.shapeId)) {
                // 紙器タイプ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.sizeW, oldProduct.sizeW)) {
                // 製品寸法 - sizeW
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.sizeD, oldProduct.sizeD)) {
                // 製品寸法 - sizeD
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.sizeH, oldProduct.sizeH)) {
                // 製品寸法 - sizeH
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.blankPaperSizeW, oldProduct.blankPaperSizeW)) {
                // 展開寸法 - blank paper size W
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.blankPaperSizeH, oldProduct.blankPaperSizeH)) {
                // 展開寸法 - blank paper size H
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.paperNameId, oldProduct.paperNameId)) {
                // 原紙名
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.paperWeight, oldProduct.paperWeight)) {
                // 坪量
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.paperHeadApprovalFlag, oldProduct.paperHeadApprovalFlag)) {
                //  部門長建値を使用
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.paperSizeW, oldProduct.paperSizeW)) {
                //  原紙サイズ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.paperSizeH, oldProduct.paperSizeH)) {
                //  原紙サイズ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.cutPaperSizeW, oldProduct.cutPaperSizeW)) {
                //  断裁サイズ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.cutPaperSizeH, oldProduct.cutPaperSizeH)) {
                //  断裁サイズ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationFlute, oldProduct.laminationFlute)) {
                //  フルート
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationWidth, oldProduct.laminationWidth)) {
                //  片段断寸
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationCuttingFlow, oldProduct.laminationCuttingFlow)) {
                //  片段断寸
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationMediumId, oldProduct.laminationMediumId)) {
                //  中芯
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationMediumBasicWeight, oldProduct.laminationMediumBasicWeight)) {
                //  中芯
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationMediumThroughWage, oldProduct.laminationMediumThroughWage)) {
                //  中芯
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationBackId, oldProduct.laminationBackId)) {
                //  裏ライナ （g/㎡）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationBackBasicWeight, oldProduct.laminationBackBasicWeight)) {
                //  裏ライナ （g/㎡）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationBackThroughWage, oldProduct.laminationBackThroughWage)) {
                //  裏ライナ （g/㎡）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationNumber, oldProduct.laminationNumber)) {
                //  片段取数
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.takenNumber, oldProduct.takenNumber)) {
                //  取数
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.impositionNumber, oldProduct.impositionNumber)) {
                //  面付数
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.printMethod, oldProduct.printMethod)) {
                //  印刷方法
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorIdF, oldProduct.colorIdF)) {
                //  印刷方法
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.specialColorF, oldProduct.specialColorF)) {
                //  特殊色数（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorFText1, oldProduct.colorFText1)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorFText2, oldProduct.colorFText2)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorFText3, oldProduct.colorFText3)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorFText4, oldProduct.colorFText4)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorFText5, oldProduct.colorFText5)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorFText6, oldProduct.colorFText6)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorFText7, oldProduct.colorFText7)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorFText8, oldProduct.colorFText8)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorIdB, oldProduct.colorIdB)) {
                //  印刷方法
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.specialColorB, oldProduct.specialColorB)) {
                //  特殊色数（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorBText1, oldProduct.colorBText1)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorBText2, oldProduct.colorBText2)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorBText3, oldProduct.colorBText3)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorBText4, oldProduct.colorBText4)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.surfaceTreatmentIdF, oldProduct.surfaceTreatmentIdF)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.surfaceTreatmentIdB, oldProduct.surfaceTreatmentIdB)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.embossingCode, oldProduct.embossingCode)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.foilColor1, oldProduct.foilColor1)) {
                //  箔色
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.foilColor2, oldProduct.foilColor2)) {
                //  箔色
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.foilColor3, oldProduct.foilColor3)) {
                //  箔色
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.stampingId, oldProduct.stampingId)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.stampingNumber, oldProduct.stampingNumber)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.stampingSizeH1, oldProduct.stampingSizeH1)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.stampingSizeW1, oldProduct.stampingSizeW1)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.stampingSizeH2, oldProduct.stampingSizeH2)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.stampingSizeW2, oldProduct.stampingSizeW2)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.stampingSizeH3, oldProduct.stampingSizeH3)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.stampingSizeW3, oldProduct.stampingSizeW3)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.windowSizeH, oldProduct.windowSizeH)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.windowSizeW, oldProduct.windowSizeW)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.dieCuttingFlag, oldProduct.dieCuttingFlag)) {
                //  打抜き
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.dieCuttingThroughNumber, oldProduct.dieCuttingThroughNumber)) {
                //  打抜面付数
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.pasteId, oldProduct.pasteId)) {
                //  貼り
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.pasteSpecialFormFlag, oldProduct.pasteSpecialFormFlag)) {
                //  特殊形態
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.inspectionId, oldProduct.inspectionId)) {
                //  検品
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.packingId, oldProduct.packingId)) {
                //  梱包
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.packingInputNumber, oldProduct.packingInputNumber)) {
                //  入り数
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.passageNo, oldProduct.passageNo)) {
                //  通函No
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.packingNote, oldProduct.packingNote)) {
                //  梱包備考
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.shippingCostId, oldProduct.shippingCostId)) {
                //  納入先距離
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.memo1, oldProduct.memo1)) {
                //  備考1
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.memo2, oldProduct.memo2)) {
                //  備考2
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.memo3, oldProduct.memo3)) {
                //  備考3
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.otherExpense1, oldProduct.otherExpense1)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.otherWage1, oldProduct.otherWage1)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.otherUnitType1, oldProduct.otherUnitType1)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.otherExpense2, oldProduct.otherExpense2)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.otherWage2, oldProduct.otherWage2)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.otherUnitType2, oldProduct.otherUnitType2)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.otherExpense3, oldProduct.otherExpense3)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.otherWage3, oldProduct.otherWage3)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.otherUnitType3, oldProduct.otherUnitType3)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            }
            else {
                this.getSF00302Data().checkInputSave = false;
            }
        }
        else {
            this.getSF00302Data().checkInputSave = false;
        }
    };
    // check data on change in lot/offer unit price area - follow 3057
    SF003020103Helper.prototype.checkChangeDataProductOutput = function () {
        var currentProductOutPuts = this.getSF00302Data().productOutputs;
        var oldProductOutPuts = this.getSF00302Data().productOutputsOld;
        if (oldProductOutPuts.length > 0) {
            for (var i = 0; i < currentProductOutPuts.length; i++) {
                if (!this.isEquals(currentProductOutPuts[i].lot, oldProductOutPuts[i].lot)) {
                    this.getSF00302Data().checkOutputSave = true;
                }
            }
        }
        else {
            this.getSF00302Data().checkOutputSave = false;
        }
    };
    SF003020103Helper.prototype.getSF00302Data = function () {
        return this.sf00302Data;
    };
    SF003020103Helper.prototype.calculateAllOutput = function (doSth) {
        // iterate output to do sth
        for (var i = 0; i < 5; i++) {
            this.sf00302Data.productOutput = this.sf00302Data.productOutputs[i];
            this.sf00302Data.indexOffer = this.sf00302Data.offers[i];
            doSth.call(this);
        }
        // restore output
        this.sf00302Data.productOutput = this.sf00302Data.productOutputs[this.sf00302Data.indexOutput];
        this.sf00302Data.indexOffer = this.sf00302Data.offers[this.sf00302Data.indexOutput];
    };
    Object.defineProperty(SF003020103Helper.prototype, "productLaminationBackBasicWeight", {
        get: function () {
            if (this.sf00302Data.product.laminationFlute == 1) {
                return 0;
            }
            else {
                return this.sf00302Data.product.laminationBackBasicWeight;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020103Helper.prototype, "productLaminationMediumBasicWeight", {
        get: function () {
            if (this.sf00302Data.product.laminationFlute == 1) {
                return 0;
            }
            else {
                return this.sf00302Data.product.laminationMediumBasicWeight;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020103Helper.prototype, "productLaminationBackThroughWage", {
        get: function () {
            if (this.sf00302Data.product.laminationFlute == 1) {
                return 0;
            }
            else {
                return this.sf00302Data.product.laminationBackThroughWage;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020103Helper.prototype, "productLaminationMediumThroughWage", {
        get: function () {
            if (this.sf00302Data.product.laminationFlute == 1) {
                return 0;
            }
            else {
                return this.sf00302Data.product.laminationMediumThroughWage;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calculate for attributes: subTotal of product output
     */
    SF003020103Helper.prototype.calcSubTotal = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var firstSubtotal = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.laminationTotalCost + _this.getSF00302Data().productOutput.dieCuttingTotalCost +
                _this.getSF00302Data().productOutput.stampingTotalCost + _this.getSF00302Data().productOutput.windowTotalCost + _this.getSF00302Data().productOutput.pasteTotalCost + _this.getSF00302Data().productOutput.laminationSheetCost + _this.getProductOutputOtherFee1() + _this.getProductOutputOtherFee2() + +_this.getProductOutputOtherFee3()
                + math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.cartonSpecialFare));
            var subtotal = 0;
            subtotal = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.packing
                + firstSubtotal
                + _this.getSF00302Data().productOutput.inspection);
            _this.getSF00302Data().productOutput.subtotal = subtotal;
        });
        this.calcManagementCost();
        this.calcEstimateTotal();
    };
    SF003020103Helper.prototype.calcThroughNumber = function () {
        return math_util_1.default.checkNaN(math_util_1.default.ceilDecimal(this.sf00302Data.productOutput.lot / this.sf00302Data.product.takenNumber, 0));
    };
    /**
     * Calculate for attributes: managementCost of product output
     */
    SF003020103Helper.prototype.calcManagementCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            if (_this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.subtotal != undefined && _this.getSF00302Data().productOutput.subtotal != 0) {
                //TODO: wait for confirm
                //if (this.getSF00302Data().productOutput.paperUnitPrice == 0) {
                result = 0.3 * _this.getSF00302Data().productOutput.subtotal;
                // } else {
                //     result = 0.15 * this.getSF00302Data().productOutput.subtotal;
                // }
                if (result <= 10000 && result != 0) {
                    result = 10000;
                }
            }
            _this.getSF00302Data().productOutput.managementCost = math_util_1.default.checkNaN(math_util_1.default.roundDecimal(result, 2));
        });
    };
    /**
     * Calculate for attributes: estimatedTotal of product output
     */
    SF003020103Helper.prototype.calcEstimateTotal = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.getSF00302Data().productOutput.estimatedTotal = math_util_1.default.checkNaN((+_this.getSF00302Data().productOutput.subtotal) + (+_this.getSF00302Data().productOutput.managementCost));
            if (_this.getSF00302Data().productOutput.fareLineService != undefined) {
                _this.getSF00302Data().productOutput.estimatedTotal = _this.getSF00302Data().productOutput.estimatedTotal + math_util_1.default.checkNaN(+_this.getSF00302Data().productOutput.fareLineService);
            }
            _this.getSF00302Data().productOutput.estimatedTotal = math_util_1.default.roundDecimal(_this.getSF00302Data().productOutput.estimatedTotal, 2);
        });
        this.calcEstimateUnitPrice();
    };
    /**
     * Calculate for attributes: estimatedUnitPrice of product output
     */
    SF003020103Helper.prototype.calcEstimateUnitPrice = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var unitPrice = 0;
            if (_this.getSF00302Data().productOutput.estimatedTotal != 0) {
                unitPrice = math_util_1.default.checkNaN(math_util_1.default.ceilDecimal(_this.getSF00302Data().productOutput.estimatedTotal / _this.getSF00302Data().productOutput.lot, 2));
            }
            _this.getSF00302Data().productOutput.estimatedUnitPrice = unitPrice;
        });
        this.calcEstimateDiff(1);
        this.calcEstimateDiff(2);
    };
    Object.defineProperty(SF003020103Helper.prototype, "productStampingSizeW1", {
        get: function () {
            if (this.sf00302Data.product.stampingId == 0) {
                return 0;
            }
            else {
                return this.sf00302Data.product.stampingSizeW1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020103Helper.prototype, "productStampingSizeW2", {
        get: function () {
            if (this.sf00302Data.product.stampingId == 0) {
                return 0;
            }
            else {
                return this.sf00302Data.product.stampingSizeW2;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020103Helper.prototype, "productStampingSizeW3", {
        get: function () {
            if (this.sf00302Data.product.stampingId == 0) {
                return 0;
            }
            else {
                return this.sf00302Data.product.stampingSizeW3;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020103Helper.prototype, "productStampingSizeW4", {
        get: function () {
            if (this.sf00302Data.product.stampingId == 0) {
                return 0;
            }
            else {
                return this.sf00302Data.product.stampingSizeW4;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020103Helper.prototype, "productStampingSizeH1", {
        get: function () {
            if (this.sf00302Data.product.stampingId == 0) {
                return 0;
            }
            else {
                return this.sf00302Data.product.stampingSizeH1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020103Helper.prototype, "productStampingSizeH2", {
        get: function () {
            if (this.sf00302Data.product.stampingId == 0) {
                return 0;
            }
            else {
                return this.sf00302Data.product.stampingSizeH2;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020103Helper.prototype, "productStampingSizeH3", {
        get: function () {
            if (this.sf00302Data.product.stampingId == 0) {
                return 0;
            }
            else {
                return this.sf00302Data.product.stampingSizeH3;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020103Helper.prototype, "productStampingSizeH4", {
        get: function () {
            if (this.sf00302Data.product.stampingId == 0) {
                return 0;
            }
            else {
                return this.sf00302Data.product.stampingSizeH4;
            }
        },
        enumerable: true,
        configurable: true
    });
    SF003020103Helper.prototype.getInspectionPackingFareLineTotalCost = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.productOutput.inspection) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.packing) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.fareLineService);
    };
    SF003020103Helper.prototype.getOtherFeeTotalCost = function () {
        return (+this.getProductOutputOtherFee1()) + (+this.getProductOutputOtherFee2()) + (+this.getProductOutputOtherFee3());
    };
    /**
     * Calculate for attributes: pasteLoss of product output
     */
    SF003020103Helper.prototype.calcPasteLoss = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.pasteId != undefined && _this.sf00302Data.product.pasteId != 0) {
                    result = math_util_1.default.checkNaN(math_util_1.default.ceilDecimal((math_util_1.default.checkNaN(_this.sf00302Data.productOutput.dieCuttingLoss) * 100 + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.dieCuttingTotalCost)) * 0.01, 0));
                }
                _this.sf00302Data.productOutput.pasteLoss = result;
            });
            this.calcPasteTotalCost();
        }
    };
    /**
     * Calculate for attributes: pasteBasicCost of product output
     */
    SF003020103Helper.prototype.calcPasteBasicCost = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var big = 0;
                if (_this.sf00302Data.product.blankPaperSizeH > math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeW)) {
                    big = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeH);
                }
                else {
                    big = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeW);
                }
                var result = 0;
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.pasteId != undefined && _this.sf00302Data.product.pasteId != 0 && _this.sf00302Data.mstData != undefined) {
                    result = data_util_1.default.getData(_this.sf00302Data.mstData.mstPaste, 0, _this.sf00302Data.product.laminationFlute, _this.sf00302Data.product.pasteId, math_util_1.default.checkNaN(math_util_1.default.ceilDecimal(big * 2, -2) / 2).toString(), "basicCost");
                    if (_this.sf00302Data.productOutput.lot / _this.sf00302Data.product.impositionNumber <= 1000) {
                        result = result * 1.3;
                    }
                    if (_this.sf00302Data.product.pasteSpecialFormFlag == 1) {
                        result = result * 1.2;
                    }
                }
                _this.sf00302Data.productOutput.pasteBasicCost = math_util_1.default.checkNaN(result);
            });
            this.calcPasteTotalCost();
        }
    };
    /**
     * Calculate for attributes: pasteThroughWage of product output
     */
    SF003020103Helper.prototype.calcPasteThroughWage = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var big = 0;
                if (_this.sf00302Data.product.blankPaperSizeH > math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeW)) {
                    big = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeH);
                }
                else {
                    big = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeW);
                }
                var result = 0;
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.pasteId != undefined && _this.sf00302Data.product.pasteId != 0 && _this.sf00302Data.mstData != undefined) {
                    result = data_util_1.default.getData(_this.sf00302Data.mstData.mstPaste, 0, _this.sf00302Data.product.laminationFlute, _this.sf00302Data.product.pasteId, math_util_1.default.checkNaN(math_util_1.default.ceilDecimal(big * 2, -2) / 2).toString(), "throughWage");
                    if (_this.sf00302Data.productOutput.lot / _this.sf00302Data.product.impositionNumber <= 1000) {
                        result = result * 1.3;
                    }
                    if (_this.sf00302Data.product.pasteSpecialFormFlag == 1) {
                        result = result * 1.2;
                    }
                }
                _this.sf00302Data.productOutput.pasteThroughWage = math_util_1.default.checkNaN(math_util_1.default.round(result, 1));
            });
            this.calcPasteTotalCost();
        }
    };
    /**
     * Calculate for attributes: pasteTotalCost of product output
     */
    SF003020103Helper.prototype.calcPasteTotalCost = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0) {
                    result = math_util_1.default.checkNaN(_this.sf00302Data.productOutput.pasteBasicCost + _this.sf00302Data.productOutput.pasteLoss + _this.sf00302Data.productOutput.pasteThroughWage * _this.sf00302Data.productOutput.lot);
                }
                _this.sf00302Data.productOutput.pasteTotalCost = result;
            });
            this.calcSubTotal();
        }
    };
    SF003020103Helper.prototype.isEquals = function (a, b) {
        return Object.is(a, b);
    };
    SF003020103Helper.prototype.calcAdditionFare = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            if (_this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.requiredAdditionalWork == 1) {
                result = 10000;
            }
            _this.sf00302Data.productOutput.cartonSpecialFare = result;
        });
        this.calcSubTotal();
    };
    SF003020103Helper.prototype.calcCartonLotGap = function () {
    };
    SF003020103Helper = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SF003020103Helper);
    return SF003020103Helper;
}());
exports.SF003020103Helper = SF003020103Helper;
//# sourceMappingURL=SF003020103.helper.js.map