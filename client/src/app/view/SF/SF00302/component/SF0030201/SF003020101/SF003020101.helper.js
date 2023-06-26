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
var message_1 = require("../../../../../../helper/message");
var data_util_1 = require("../../../../../../util/data-util");
var math_util_1 = require("../../../../../../util/math-util");
var format_util_1 = require("../../../../../../util/format-util");
/**
 * 紙器の製品情報入力フォームのヘルパー
 *
 * Component class to binding data on SF003-02 screen.
 * @author DungTQ
 */
var SF003020101Helper = (function () {
    function SF003020101Helper() {
    }
    SF003020101Helper.prototype.getSF00302Data = function () {
        return this.sf00302Data;
    };
    /** @deprecated Unused? */
    SF003020101Helper.prototype.validateProductName = function () {
        if (!this.sf00302Data.product.productName) {
            var $err = $("#productName-error");
            if ($err.length > 0) {
                return false;
            }
            $err = jQuery('<div/>', {
                id: "productName-error",
                text: message_1.MSG.SF00302.ERR013
            })
                .addClass("help-block text-right animated fadeInDown");
            var $productNameCol = $("#productName").parent().parent();
            $productNameCol.append($err);
            $productNameCol.parent().addClass("has-error");
            return false;
        }
        else if (this.sf00302Data.product.productName.length > 30) {
            var $err = $("#productName-error");
            if ($err.length > 0) {
                return false;
            }
            $err = jQuery('<div/>', {
                id: "productName-error",
                text: message_1.MSG.SF00302.ERR014
            })
                .addClass("help-block text-right animated fadeInDown");
            var $productNameCol = $("#productName").parent().parent();
            $productNameCol.append($err);
            $productNameCol.parent().addClass("has-error");
            return false;
        }
        else {
            this.clearProductNameErrMsg();
            return true;
        }
    };
    SF003020101Helper.prototype.clearProductNameErrMsg = function () {
        var errEl = $("#productName-error");
        errEl.parent().parent().removeClass("has-error");
        errEl.remove();
    };
    Object.defineProperty(SF003020101Helper.prototype, "isRequestDesign", {
        get: function () {
            return this.sf00302Data.product.requestDesignFlag == 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calculate for attributes: normValue of product output
     */
    SF003020101Helper.prototype.calcNormValue = function (type) {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            var result = 0;
            if (this.sf00302Data.mstData != undefined && this.sf00302Data.product.paperNameId != undefined) {
                result = data_util_1.default.getData(this.sf00302Data.mstData.mstPaper, 0, this.sf00302Data.product.factoryId, this.sf00302Data.product.paperNameId, this.sf00302Data.product.paperWeight, "normValue");
            }
            if (type != 1) {
                result = result * 0.8;
            }
            return result;
        }
    };
    /**
     * Calculate for attributes: this.calcThroughNumber() of product output
     */
    SF003020101Helper.prototype.calcThroughNumber = function () {
        return math_util_1.default.checkNaN(math_util_1.default.ceilDecimal(this.sf00302Data.productOutput.lot / this.sf00302Data.product.impositionNumber, 0));
    };
    /**
     * Calculate for attributes: paperActualWeight of product output
     */
    SF003020101Helper.prototype.calcPaperActualWeight = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var paperActualWeight = 0;
                if (_this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.paperNameId != undefined) {
                    paperActualWeight = math_util_1.default.checkNaN(math_util_1.default.roundDecimal(math_util_1.default.floorDecimal(_this.sf00302Data.product.paperWeight * _this.sf00302Data.product.paperSizeH * _this.sf00302Data.product.paperSizeW / 10000000, 1) * 2, 0) / 2);
                }
                _this.sf00302Data.productOutput.paperActualWeight = paperActualWeight;
            });
            this.calcPaperUnitPrice();
            this.calcPaperTotalCost();
        }
    };
    /**
     * Calculate for attributes: paperUnitPrice of product output
     */
    SF003020101Helper.prototype.calcPaperUnitPrice = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var paperUnitPrice = 0;
                if (_this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.paperNameId != undefined) {
                    paperUnitPrice = math_util_1.default.checkNaN(math_util_1.default.ceilDecimal(_this.sf00302Data.productOutput.paperActualWeight * _this.calcNormValue(1) / 100, 2));
                }
                _this.sf00302Data.productOutput.paperUnitPrice = paperUnitPrice;
            });
            this.calcPaperTotalCost();
            if (this.sf00302Data.product.printMethod != 2) {
                this.calcColorPrintLoss(2);
                this.calcColorPrintLoss(1);
            }
            this.calcManagementCost();
        }
    };
    /**
     * Calculate for attributes: paperTotalCost of product output
     */
    SF003020101Helper.prototype.calcPaperTotalCost = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var paperTotalCost = 0;
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0) {
                    if (_this.sf00302Data.productOutput.paperActualWeight != 0) {
                        paperTotalCost = math_util_1.default.checkNaN(math_util_1.default.ceilDecimal(_this.sf00302Data.productOutput.paperUnitPrice * _this.sf00302Data.productOutput.lot / _this.sf00302Data.product.takenNumber, 0));
                    }
                }
                _this.sf00302Data.productOutput.paperTotalCost = paperTotalCost;
            });
            this.calcDieCuttingLoss();
            this.calcSubTotal();
        }
    };
    /**
     * Calculate for attributes: laminationUnitPrice of product output
     */
    SF003020101Helper.prototype.calcLaminationUnitPrice = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var laminationUnitPrice = 0;
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.laminationFlute != 1) {
                    if (_this.sf00302Data.product.laminationFlute != 0) {
                        var fluteFactor = void 0;
                        if (_this.sf00302Data.product.laminationFlute == 3) {
                            fluteFactor = 1.4;
                        }
                        else {
                            fluteFactor = 1.3;
                        }
                        laminationUnitPrice = math_util_1.default.checkNaN(math_util_1.default.roundDecimal(fluteFactor * _this.productLaminationMediumBasicWeight * _this.productLaminationMediumThroughWage / 1000
                            + _this.productLaminationBackBasicWeight * _this.productLaminationBackThroughWage / 1000, 2));
                    }
                }
                _this.sf00302Data.productOutput.laminationUnitPrice = laminationUnitPrice;
            });
            this.calcLaminationSheetCost();
            this.calcLaminationTotalCost();
        }
    };
    /**
     * Calculate for attributes: laminationSheetCost of product output
     */
    SF003020101Helper.prototype.calcLaminationSheetCost = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var laminationSheetCost = 0;
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.laminationFlute != 1) {
                    if (math_util_1.default.checkNaN(_this.sf00302Data.product.laminationFlute)) {
                        var laminationNumberFactor1 = void 0;
                        var laminationNumberCondition = _this.sf00302Data.productOutput.lot / _this.productLaminationNumber;
                        if (laminationNumberCondition > 10000) {
                            laminationNumberFactor1 = 1.1;
                        }
                        else {
                            laminationNumberFactor1 = 1.07;
                        }
                        var laminationNumberFactor2 = void 0;
                        //3029-comment 24
                        if (laminationNumberCondition <= 1000) {
                            laminationNumberFactor2 = 35;
                        }
                        else if (laminationNumberCondition <= 2000) {
                            laminationNumberFactor2 = 27;
                        }
                        else if (laminationNumberCondition <= 3000) {
                            laminationNumberFactor2 = 24;
                        }
                        else if (laminationNumberCondition <= 5000) {
                            laminationNumberFactor2 = 22;
                        }
                        else if (laminationNumberCondition <= 7000) {
                            laminationNumberFactor2 = 21.5;
                        }
                        else {
                            laminationNumberFactor2 = 19;
                        }
                        laminationSheetCost = math_util_1.default.checkNaN(math_util_1.default.ceilDecimal((laminationNumberFactor1 * _this.sf00302Data.productOutput.laminationUnitPrice
                            + laminationNumberFactor2) * _this.productLaminationWidth * _this.productLaminationCuttingFlow / 1000000 / _this.productLaminationNumber, 2));
                    }
                }
                _this.sf00302Data.productOutput.laminationSheetCost = laminationSheetCost;
            });
            this.calcLaminationTotalCost();
        }
    };
    /**
     * Calculate for attributes: laminationTotalCost of product output
     */
    SF003020101Helper.prototype.calcLaminationTotalCost = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var laminationTotalCost = 0;
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.laminationFlute != 1) {
                    if (math_util_1.default.checkNaN(_this.sf00302Data.product.laminationFlute)) {
                        laminationTotalCost = math_util_1.default.checkNaN(_this.sf00302Data.productOutput.laminationSheetCost * _this.sf00302Data.productOutput.lot / _this.sf00302Data.product.impositionNumber);
                    }
                }
                _this.sf00302Data.productOutput.laminationTotalCost = math_util_1.default.roundDecimal(laminationTotalCost, 2);
            });
            this.calcDieCuttingLoss();
            this.calcSubTotal();
        }
    };
    /**
     * Calculate for attributes: colorPlateCost of product output
     * @param {number} id: define calculate front or back color
     */
    SF003020101Helper.prototype.calcColorPlateCost = function (id) {
        var _this = this;
        if (this.sf00302Data.product.shapeId == this.sf00302Data.DECORATIVE_ID) {
        }
        else {
            this.calculateAllOutput(function () {
                var result = 0, unit_price_of_plate = 4000, product = _this.sf00302Data.product, productOutput = _this.sf00302Data.productOutput;
                if (productOutput.lot != undefined && productOutput.lot != 0) {
                    if (product.printMethod == 0 && (product.surfaceTreatmentIdF > 18 || product.surfaceTreatmentIdF == 8 || product.surfaceTreatmentIdF == 17)) {
                        product.colorIdF = 1;
                    }
                    if (product.printMethod == 0 && (product.surfaceTreatmentIdB > 18 || product.surfaceTreatmentIdB == 8 || product.surfaceTreatmentIdB == 17)) {
                        product.colorIdB = 1;
                    }
                    if (id == 1 && product.colorIdF > 0) {
                        if (!(product.surfaceTreatmentIdF == 8 || product.surfaceTreatmentIdF == 17
                            || product.surfaceTreatmentIdF > 18)) {
                            if (product.printMethod != 2) {
                                result = (product.colorIdF - 1) * unit_price_of_plate;
                            }
                            else {
                                result = 0;
                            }
                        }
                        else {
                            if (product.printMethod != 2) {
                                result = product.colorIdF * unit_price_of_plate;
                            }
                            else {
                                result = unit_price_of_plate;
                            }
                        }
                    }
                    else if (id == 2 && product.colorIdB > 0) {
                        if (!(product.surfaceTreatmentIdB == 8 || product.surfaceTreatmentIdB == 17
                            || product.surfaceTreatmentIdB > 18)) {
                            if (product.printMethod != 2) {
                                result = (product.colorIdB - 1) * unit_price_of_plate;
                            }
                            else {
                                result = 0;
                            }
                        }
                        else {
                            if (product.printMethod != 2) {
                                result = product.colorIdB * unit_price_of_plate;
                            }
                            else {
                                result = unit_price_of_plate;
                            }
                        }
                    }
                }
                result = math_util_1.default.checkNaN(result);
                if (id != 1) {
                    productOutput.colorPlateCostB = result;
                }
                else {
                    productOutput.colorPlateCostF = result;
                }
            });
            this.calcColorTotalCost(id);
        }
    };
    /**
     * Calculate for attributes: colorPrintLoss of product output
     * @param {number} id: define calculate front or back color
     * @param {number} this.calcThroughNumber(): value of through number of current product output
     */
    SF003020101Helper.prototype.calcColorPrintLoss = function (id) {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                var factor;
                var productOutput = _this.sf00302Data.productOutput;
                var product = _this.sf00302Data.product;
                if (_this.sf00302Data.product.printMethod == 0 && (_this.sf00302Data.product.surfaceTreatmentIdF > 18 || _this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 17)) {
                    _this.sf00302Data.product.colorIdF = 2;
                }
                if (_this.sf00302Data.product.printMethod == 0 && (_this.sf00302Data.product.surfaceTreatmentIdB > 18 || _this.sf00302Data.product.surfaceTreatmentIdB == 8 || _this.sf00302Data.product.surfaceTreatmentIdB == 17)) {
                    _this.sf00302Data.product.colorIdB = 2;
                }
                if (_this.sf00302Data.product.printMethod != 2) {
                    if (id == 1) {
                        factor = _this.sf00302Data.product.colorIdF - 1;
                    }
                    else {
                        factor = _this.sf00302Data.product.colorIdB - 1;
                    }
                }
                else {
                    factor = 0;
                }
                if (factor >= 0) {
                    if ((id == 1 && (_this.getSF00302Data().product.surfaceTreatmentIdF == 8 || _this.getSF00302Data().product.surfaceTreatmentIdF == 9 || _this.sf00302Data.product.surfaceTreatmentIdF == 17
                        || _this.getSF00302Data().product.surfaceTreatmentIdF > 18))
                        || (id == 2 && (_this.getSF00302Data().product.surfaceTreatmentIdB == 8 || _this.getSF00302Data().product.surfaceTreatmentIdB == 9 || _this.sf00302Data.product.surfaceTreatmentIdB == 17
                            || _this.getSF00302Data().product.surfaceTreatmentIdB > 18))) {
                        factor++;
                    }
                    if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && factor != 0) {
                        if (_this.calcThroughNumber() >= 30000) {
                            result = _this.calcThroughNumber() * _this.sf00302Data.productOutput.paperUnitPrice * factor * 0.01;
                        }
                        else if (_this.calcThroughNumber() >= 10000) {
                            result = _this.calcThroughNumber() * _this.sf00302Data.productOutput.paperUnitPrice * factor * 0.015;
                        }
                        else {
                            var rate = math_util_1.default.checkNaN((product.cutPaperSizeW * product.cutPaperSizeH) / (product.paperSizeW * product.paperSizeH));
                            result = math_util_1.default.ceilDecimal(_this.sf00302Data.productOutput.paperUnitPrice * (factor * 100) * rate, 0);
                        }
                    }
                }
                result = math_util_1.default.checkNaN(math_util_1.default.round(result, 2));
                if (id == 1) {
                    _this.sf00302Data.productOutput.colorPrintLossF = result;
                }
                else {
                    _this.sf00302Data.productOutput.colorPrintLossB = result;
                }
            });
            this.calcColorTotalCost(id);
        }
    };
    /**
     * Calculate for attributes: colorBasicCost of product output
     * @param {number} id: define calculate front or back color
     */
    SF003020101Helper.prototype.calcColorBasicCost = function (id) {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                var condition = 0;
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.mstData != undefined) {
                    if (_this.sf00302Data.product.printMethod == 0 && (_this.sf00302Data.product.surfaceTreatmentIdF > 18 || _this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 17)) {
                        _this.sf00302Data.product.colorIdF = 1;
                    }
                    if (_this.sf00302Data.product.printMethod == 0 && (_this.sf00302Data.product.surfaceTreatmentIdB > 18 || _this.sf00302Data.product.surfaceTreatmentIdB == 8 || _this.sf00302Data.product.surfaceTreatmentIdB == 17)) {
                        _this.sf00302Data.product.colorIdB = 1;
                    }
                    if (id == 1 && _this.sf00302Data.product.colorIdF != 0 && _this.sf00302Data.product.colorIdF > 0) {
                        condition = _this.sf00302Data.product.colorIdF;
                        if (!(_this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 17
                            || _this.sf00302Data.product.surfaceTreatmentIdF > 18)) {
                            condition = _this.sf00302Data.product.colorIdF - 1;
                        }
                        if (_this.sf00302Data.product.printMethod == 2) {
                            condition = 1;
                        }
                        result = data_util_1.default.getData(_this.sf00302Data.mstData.mstColor, 0, condition, "basicCost");
                    }
                    else if (id == 2 && _this.sf00302Data.product.colorIdB != 0 && _this.sf00302Data.product.colorIdB > 0) {
                        condition = _this.sf00302Data.product.colorIdB;
                        if (!(_this.sf00302Data.product.surfaceTreatmentIdB == 8 || _this.sf00302Data.product.surfaceTreatmentIdB == 17
                            || _this.sf00302Data.product.surfaceTreatmentIdB > 18)) {
                            condition = _this.sf00302Data.product.colorIdB - 1;
                        }
                        if (_this.sf00302Data.product.printMethod == 2) {
                            condition = 1;
                        }
                        result = data_util_1.default.getData(_this.sf00302Data.mstData.mstColor, 0, condition, "basicCost");
                    }
                }
                result = math_util_1.default.checkNaN(result);
                if (id == 1) {
                    _this.sf00302Data.productOutput.colorPrintBasicCostF = result;
                }
                else {
                    _this.sf00302Data.productOutput.colorPrintBasicCostB = result;
                }
            });
            this.calcColorTotalCost(id);
        }
    };
    SF003020101Helper.prototype.calcDigitalBasicCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            var condition = 0;
            if (math_util_1.default.checkNaN(_this.sf00302Data.productOutput.lot) != 0 && _this.sf00302Data.mstData != undefined) {
                if (_this.sf00302Data.product.colorIdF == 1 && _this.sf00302Data.product.colorIdB == 1 && _this.sf00302Data.product.printMethod == 2) {
                    condition = 0;
                }
                else if ((_this.sf00302Data.product.colorIdF == 1 && _this.sf00302Data.product.colorIdB == 9) || (_this.sf00302Data.product.colorIdF == 9 && _this.sf00302Data.product.colorIdB == 1)) {
                    condition = 8;
                }
                else if ((_this.sf00302Data.product.colorIdF == 1 && _this.sf00302Data.product.colorIdB == 10) || (_this.sf00302Data.product.colorIdF == 10 && _this.sf00302Data.product.colorIdB == 1)) {
                    condition = 9;
                }
                else if (_this.sf00302Data.product.colorIdF == 9 && _this.sf00302Data.product.colorIdB == 9) {
                    condition = 10;
                }
                else if ((_this.sf00302Data.product.colorIdF == 10 && _this.sf00302Data.product.colorIdB == 9) || (_this.sf00302Data.product.colorIdF == 9 && _this.sf00302Data.product.colorIdB == 10)) {
                    condition = 11;
                }
                else if (_this.sf00302Data.product.colorIdF == 10 && _this.sf00302Data.product.colorIdB == 10) {
                    condition = 12;
                }
                else if ((_this.sf00302Data.product.colorIdF == 1 && _this.sf00302Data.product.colorIdB == 11) || (_this.sf00302Data.product.colorIdF == 11 && _this.sf00302Data.product.colorIdB == 1)) {
                    condition = 13;
                }
                else if ((_this.sf00302Data.product.colorIdF == 11 && _this.sf00302Data.product.colorIdB == 9) || (_this.sf00302Data.product.colorIdF == 9 && _this.sf00302Data.product.colorIdB == 11)) {
                    condition = 14;
                }
                else if ((_this.sf00302Data.product.colorIdF == 11 && _this.sf00302Data.product.colorIdB == 10) || (_this.sf00302Data.product.colorIdF == 10 && _this.sf00302Data.product.colorIdB == 11)) {
                    condition = 15;
                }
                else if ((_this.sf00302Data.product.colorIdF == 11 && _this.sf00302Data.product.colorIdB == 11) || (_this.sf00302Data.product.colorIdF == 11 && _this.sf00302Data.product.colorIdB == 11)) {
                    condition = 16;
                }
                result = data_util_1.default.getData(_this.sf00302Data.mstData.mstColor, 0, condition, "basicCost");
            }
            _this.sf00302Data.productOutput.digitalBasicCost = result;
            _this.calcDigitalTotalCost();
        });
    };
    /**
     * Calculate for attributes: colorThroughWage of product output
     * @param {number} id: define calculate front or back color
     */
    SF003020101Helper.prototype.calcColorThroughWage = function (id) {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0, condition = 0, productOutput = _this.sf00302Data.productOutput, product = _this.sf00302Data.product;
                if (productOutput.lot != undefined && productOutput.lot != 0 && _this.sf00302Data.mstData != undefined) {
                    if (product.printMethod == 0 && (product.surfaceTreatmentIdF > 18 || product.surfaceTreatmentIdF == 8 || product.surfaceTreatmentIdF == 17)) {
                        product.colorIdF = 1;
                    }
                    if (product.printMethod == 0 && (product.surfaceTreatmentIdB > 18 || product.surfaceTreatmentIdB == 8 || product.surfaceTreatmentIdB == 17)) {
                        product.colorIdB = 1;
                    }
                    if (id == 1 && product.colorIdF != 0 && product.colorIdF > 0) {
                        condition = product.colorIdF;
                        if (!(product.surfaceTreatmentIdF == 8 || product.surfaceTreatmentIdF == 17 || product.surfaceTreatmentIdF > 18)) {
                            condition = product.colorIdF - 1;
                        }
                        if (product.printMethod == 2) {
                            condition = 1;
                        }
                        result = data_util_1.default.getData(_this.sf00302Data.mstData.mstColor, 0, condition, "throughWage");
                        if (_this.sf00302Data.product.surfaceTreatmentIdF == 9) {
                            // For 水性ニス
                            // 水性ニスの場合は2色価格(2.5円)×3色分
                            var up = result / condition;
                            result = up * (condition + 1);
                        }
                    }
                    else if (id == 2 && product.colorIdB != 0 && product.colorIdB > 0) {
                        condition = product.colorIdB;
                        if (!(product.surfaceTreatmentIdB == 8 || product.surfaceTreatmentIdB == 17 || product.surfaceTreatmentIdB > 18)) {
                            condition = product.colorIdB - 1;
                        }
                        if (product.printMethod == 2) {
                            condition = 1;
                        }
                        result = data_util_1.default.getData(_this.sf00302Data.mstData.mstColor, 0, condition, "throughWage");
                        if (_this.sf00302Data.product.surfaceTreatmentIdB == 9) {
                            // For 水性ニス
                            // 水性ニスの場合は2色価格(2.5円)×3色分
                            var up = result / condition;
                            result = up * (condition + 1);
                        }
                    }
                }
                result = math_util_1.default.checkNaN(result);
                if (id == 1) {
                    productOutput.colorPrintThroughWageF = result;
                }
                else {
                    productOutput.colorPrintThroughWageB = result;
                }
            });
            this.calcColorSpecial(id);
            this.calcColorTotalCost(id);
        }
    };
    SF003020101Helper.prototype.calcDigitalThroughWage = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            var condition = 0;
            if (_this.sf00302Data.product.colorIdF == 1 && _this.sf00302Data.product.colorIdB == 1 && _this.sf00302Data.product.printMethod == 2) {
                condition = 0;
            }
            else if ((_this.sf00302Data.product.colorIdF == 1 && _this.sf00302Data.product.colorIdB == 9) || (_this.sf00302Data.product.colorIdF == 9 && _this.sf00302Data.product.colorIdB == 1)) {
                condition = 8;
            }
            else if ((_this.sf00302Data.product.colorIdF == 1 && _this.sf00302Data.product.colorIdB == 10) || (_this.sf00302Data.product.colorIdF == 10 && _this.sf00302Data.product.colorIdB == 1)) {
                condition = 9;
            }
            else if (_this.sf00302Data.product.colorIdF == 9 && _this.sf00302Data.product.colorIdB == 9) {
                condition = 10;
            }
            else if ((_this.sf00302Data.product.colorIdF == 10 && _this.sf00302Data.product.colorIdB == 9) || (_this.sf00302Data.product.colorIdF == 9 && _this.sf00302Data.product.colorIdB == 10)) {
                condition = 11;
            }
            else if (_this.sf00302Data.product.colorIdF == 10 && _this.sf00302Data.product.colorIdB == 10) {
                condition = 12;
            }
            else if ((_this.sf00302Data.product.colorIdF == 1 && _this.sf00302Data.product.colorIdB == 11) || (_this.sf00302Data.product.colorIdF == 11 && _this.sf00302Data.product.colorIdB == 1)) {
                condition = 13;
            }
            else if ((_this.sf00302Data.product.colorIdF == 11 && _this.sf00302Data.product.colorIdB == 9) || (_this.sf00302Data.product.colorIdF == 9 && _this.sf00302Data.product.colorIdB == 11)) {
                condition = 14;
            }
            else if ((_this.sf00302Data.product.colorIdF == 11 && _this.sf00302Data.product.colorIdB == 10) || (_this.sf00302Data.product.colorIdF == 10 && _this.sf00302Data.product.colorIdB == 11)) {
                condition = 15;
            }
            else if ((_this.sf00302Data.product.colorIdF == 11 && _this.sf00302Data.product.colorIdB == 11) || (_this.sf00302Data.product.colorIdF == 11 && _this.sf00302Data.product.colorIdB == 11)) {
                condition = 16;
            }
            result = data_util_1.default.getData(_this.sf00302Data.mstData.mstColor, 0, condition, "throughWage");
            _this.sf00302Data.productOutput.digitalThroughWage = result;
            _this.calcDigitalTotalCost();
        });
    };
    /**
     * Calculate for attributes: colorSpecial of product output
     * @param {number} id: define calculate front or back color
     */
    SF003020101Helper.prototype.calcColorSpecial = function (id) {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                var condition = 0;
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0) {
                    if (_this.sf00302Data.product.printMethod == 0 && (_this.sf00302Data.product.surfaceTreatmentIdF > 18 || _this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 17)) {
                        _this.sf00302Data.product.colorIdF = 1;
                    }
                    if (_this.sf00302Data.product.printMethod == 0 && (_this.sf00302Data.product.surfaceTreatmentIdB > 18 || _this.sf00302Data.product.surfaceTreatmentIdB == 8 || _this.sf00302Data.product.surfaceTreatmentIdB == 17)) {
                        _this.sf00302Data.product.colorIdB = 1;
                    }
                    if (id == 1 && _this.sf00302Data.product.specialColorF != 0 && _this.sf00302Data.product.specialColorF != undefined) {
                        condition = _this.sf00302Data.product.colorIdF;
                        if (!(_this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 9 || _this.sf00302Data.product.surfaceTreatmentIdF == 17 || _this.sf00302Data.product.surfaceTreatmentIdF > 18)) {
                            condition = _this.sf00302Data.product.colorIdF - 1;
                        }
                        if (_this.sf00302Data.product.printMethod == 2) {
                            condition = 1;
                        }
                        result = _this.sf00302Data.productOutput.colorPrintThroughWageF / condition * (_this.sf00302Data.product.specialColorF - 1);
                    }
                    else if (id == 2 && _this.sf00302Data.product.specialColorB != 0 && _this.sf00302Data.product.specialColorB != undefined) {
                        condition = _this.sf00302Data.product.colorIdB;
                        if (!(_this.sf00302Data.product.surfaceTreatmentIdB == 8 || _this.sf00302Data.product.surfaceTreatmentIdB == 9 || _this.sf00302Data.product.surfaceTreatmentIdB == 17 || _this.sf00302Data.product.surfaceTreatmentIdF > 18)) {
                            condition = _this.sf00302Data.product.colorIdB - 1;
                        }
                        if (_this.sf00302Data.product.printMethod == 2) {
                            condition = 1;
                        }
                        result = _this.sf00302Data.productOutput.colorPrintThroughWageB / condition * (_this.sf00302Data.product.specialColorB - 1);
                    }
                }
                result = math_util_1.default.checkNaN(math_util_1.default.round(result, 2));
                if (id == 1) {
                    _this.sf00302Data.productOutput.colorPrintSpecialCostF = result;
                }
                else {
                    _this.sf00302Data.productOutput.colorPrintSpecialCostB = result;
                }
            });
            this.calcColorTotalCost(id);
        }
    };
    /**
     * Calculate for attributes: colorCostPerPacket of product output
     * @param {number} id: define calculate front or back color
     */
    SF003020101Helper.prototype.calcColorCostPerPacket = function (id) {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                var condition = 0;
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.mstData != undefined) {
                    if (_this.sf00302Data.product.printMethod == 0 && (_this.sf00302Data.product.surfaceTreatmentIdF > 18 || _this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 17)) {
                        _this.sf00302Data.product.colorIdF = 1;
                    }
                    if (_this.sf00302Data.product.printMethod == 0 && (_this.sf00302Data.product.surfaceTreatmentIdB > 18 || _this.sf00302Data.product.surfaceTreatmentIdB == 8 || _this.sf00302Data.product.surfaceTreatmentIdB == 17)) {
                        _this.sf00302Data.product.colorIdB = 1;
                    }
                    if (id == 1 && _this.sf00302Data.product.colorIdF != 0 && _this.sf00302Data.product.colorIdF > 0) {
                        condition = _this.sf00302Data.product.colorIdF;
                        if (!(_this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 9 || _this.sf00302Data.product.surfaceTreatmentIdF == 17 || _this.sf00302Data.product.surfaceTreatmentIdF > 18)) {
                            condition = _this.sf00302Data.product.colorIdF - 1;
                        }
                        if (_this.sf00302Data.product.printMethod == 2) {
                            condition = 1;
                        }
                        result = data_util_1.default.getData(_this.sf00302Data.mstData.mstColor, 0, condition, "costPerPacket");
                    }
                    else if (id == 2 && _this.sf00302Data.product.colorIdB != 0 && _this.sf00302Data.product.colorIdB > 0) {
                        condition = _this.sf00302Data.product.colorIdB;
                        if (!(_this.sf00302Data.product.surfaceTreatmentIdB == 8 || _this.sf00302Data.product.surfaceTreatmentIdB == 9 || _this.sf00302Data.product.surfaceTreatmentIdB == 17 || _this.sf00302Data.product.surfaceTreatmentIdB > 18)) {
                            condition = _this.sf00302Data.product.colorIdB - 1;
                        }
                        if (_this.sf00302Data.product.printMethod == 2) {
                            condition = 1;
                        }
                        result = data_util_1.default.getData(_this.sf00302Data.mstData.mstColor, 0, condition, "costPerPacket");
                    }
                }
                result = math_util_1.default.checkNaN(result);
                if (id == 1) {
                    _this.sf00302Data.productOutput.colorPrintPerPacketCostF = result;
                }
                else {
                    _this.sf00302Data.productOutput.colorPrintPerPacketCostB = result;
                }
            });
            this.calcColorTotalCost(id);
        }
    };
    SF003020101Helper.prototype.calcDigitalTotalCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            result = _this.sf00302Data.productOutput.digitalBasicCost + _this.sf00302Data.productOutput.digitalThroughWage * _this.calcThroughNumber();
            _this.sf00302Data.productOutput.digitalTotalCost = result;
            _this.calcDieCuttingLoss();
            _this.calcSubTotal();
        });
    };
    /**
     * Calculate for attributes: colorTotalCost of product output
     * @param {number} id: define calculate front or back color
     * @param {number} this.calcThroughNumber(): value of through number of current product output
     */
    SF003020101Helper.prototype.calcColorTotalCost = function (id) {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0) {
                    if (id == 1) {
                        var condition = _this.sf00302Data.productOutput.colorPrintBasicCostF + (_this.sf00302Data.productOutput.colorPrintThroughWageF + _this.sf00302Data.productOutput.colorPrintSpecialCostF) * _this.calcThroughNumber() + _this.sf00302Data.productOutput.colorPrintLossF;
                        if (condition > _this.sf00302Data.productOutput.colorPrintPerPacketCostF) {
                            result = condition + _this.sf00302Data.productOutput.colorPlateCostF;
                        }
                        else {
                            result = _this.sf00302Data.productOutput.colorPrintPerPacketCostF + _this.sf00302Data.productOutput.colorPlateCostF;
                        }
                    }
                    else {
                        var condition = _this.sf00302Data.productOutput.colorPrintBasicCostB + (_this.sf00302Data.productOutput.colorPrintThroughWageB + _this.sf00302Data.productOutput.colorPrintSpecialCostB) * _this.calcThroughNumber() + _this.sf00302Data.productOutput.colorPrintLossB;
                        if (condition > _this.sf00302Data.productOutput.colorPrintPerPacketCostB) {
                            result = condition + _this.sf00302Data.productOutput.colorPlateCostB;
                        }
                        else {
                            result = _this.sf00302Data.productOutput.colorPrintPerPacketCostB + _this.sf00302Data.productOutput.colorPlateCostB;
                        }
                    }
                }
                result = math_util_1.default.checkNaN(math_util_1.default.round(result, 2));
                if (id == 1) {
                    _this.sf00302Data.productOutput.colorPrintTotalCostF = result;
                }
                else if (id == 2) {
                    _this.sf00302Data.productOutput.colorPrintTotalCostB = result;
                }
            });
            this.calcDieCuttingLoss();
            this.calcSubTotal();
        }
    };
    /**
     * Calculate for attributes: surfaceBasicCost of product output
     * @param {number} id: define calculate front or back or embossing
     */
    SF003020101Helper.prototype.calcSurfaceBasicCost = function (id) {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = "0";
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.mstData != undefined) {
                    var size = 1;
                    if (_this.sf00302Data.product.cutPaperSizeH * _this.sf00302Data.product.cutPaperSizeW <= 220000) {
                        size = 5;
                    }
                    else if (_this.sf00302Data.product.cutPaperSizeH * _this.sf00302Data.product.cutPaperSizeW <= 308750) {
                        size = 4;
                    }
                    else if (_this.sf00302Data.product.cutPaperSizeH * _this.sf00302Data.product.cutPaperSizeW <= 440000) {
                        size = 3;
                    }
                    else if (_this.sf00302Data.product.cutPaperSizeH * _this.sf00302Data.product.cutPaperSizeW <= 617500) {
                        size = 2;
                    }
                    var throughNumber = 1;
                    if (id != 3) {
                        if (_this.sf00302Data.productOutput.lot / _this.sf00302Data.product.impositionNumber <= 400 &&
                            ((id == 1 && (_this.sf00302Data.product.surfaceTreatmentIdF == 4 || _this.sf00302Data.product.surfaceTreatmentIdF == 12 || _this.sf00302Data.product.surfaceTreatmentIdF == 13 || _this.sf00302Data.product.surfaceTreatmentIdF == 18))
                                || (id == 2 && (_this.sf00302Data.product.surfaceTreatmentIdB == 4 || _this.sf00302Data.product.surfaceTreatmentIdB == 12 || _this.sf00302Data.product.surfaceTreatmentIdB == 13 || _this.sf00302Data.product.surfaceTreatmentIdB == 18)))) {
                            throughNumber = 3;
                        }
                        else if (_this.sf00302Data.productOutput.lot / _this.sf00302Data.product.impositionNumber <= 1000) {
                            throughNumber = 2;
                        }
                    }
                    else {
                        if (_this.sf00302Data.productOutput.lot / _this.sf00302Data.product.impositionNumber <= 1000) {
                            throughNumber = 2;
                        }
                    }
                    if (id == 1) {
                        if (_this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 9 || _this.sf00302Data.product.surfaceTreatmentIdF == 17) {
                            result = "印刷代に含む";
                        }
                        else if (_this.sf00302Data.product.surfaceTreatmentIdF == 0) {
                            result = "0";
                        }
                        else {
                            var id_1 = _this.sf00302Data.product.surfaceTreatmentIdF;
                            if (id_1 == 15 || id_1 > 18) {
                                id_1 = 6;
                            }
                            else if (id_1 == 16) {
                                id_1 = 7;
                            }
                            result = data_util_1.default.getData(_this.sf00302Data.mstData.mstSurfaceTreatment, 0, id_1, size, throughNumber, "basicCost");
                        }
                    }
                    else if (id == 2) {
                        if (_this.sf00302Data.product.surfaceTreatmentIdB == 8 || _this.sf00302Data.product.surfaceTreatmentIdB == 9 || _this.sf00302Data.product.surfaceTreatmentIdB == 17) {
                            result = "印刷代に含む";
                        }
                        else if (_this.sf00302Data.product.surfaceTreatmentIdB == 0) {
                            result = "0";
                        }
                        else {
                            var id_2 = _this.sf00302Data.product.surfaceTreatmentIdB;
                            if (id_2 == 15 || id_2 > 18) {
                                id_2 = 6;
                            }
                            else if (id_2 == 16) {
                                id_2 = 7;
                            }
                            result = data_util_1.default.getData(_this.sf00302Data.mstData.mstSurfaceTreatment, 0, id_2, size, throughNumber, "basicCost");
                        }
                    }
                    else {
                        if (math_util_1.default.checkNaN(_this.sf00302Data.product.embossingID) && _this.sf00302Data.product.embossingCode.startsWith("EB")) {
                            result = data_util_1.default.getData(_this.sf00302Data.mstData.mstSurfaceTreatment, 0, 5, size, throughNumber, "basicCost");
                        }
                        else {
                            result = "0";
                        }
                    }
                }
                if (id == 1) {
                    _this.sf00302Data.productOutput.surfaceTreatmentBasicCostF = result;
                }
                else if (id == 2) {
                    _this.sf00302Data.productOutput.surfaceTreatmentBasicCostB = result;
                }
                else {
                    _this.sf00302Data.productOutput.embossingBasicCost = (+result);
                }
            });
            this.calcSurfaceTotalCost(id);
        }
    };
    /**
     * Calculate for attributes: surfaceThroughWage of product output
     * @param {number} id: define calculate front or back or embossing
     */
    SF003020101Helper.prototype.calcSurfaceThroughWage = function (id) {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = "0";
                var size = 1;
                if (_this.sf00302Data.product.cutPaperSizeH * _this.sf00302Data.product.cutPaperSizeW <= 220000) {
                    size = 5;
                }
                else if (_this.sf00302Data.product.cutPaperSizeH * _this.sf00302Data.product.cutPaperSizeW <= 308750) {
                    size = 4;
                }
                else if (_this.sf00302Data.product.cutPaperSizeH * _this.sf00302Data.product.cutPaperSizeW <= 440000) {
                    size = 3;
                }
                else if (_this.sf00302Data.product.cutPaperSizeH * _this.sf00302Data.product.cutPaperSizeW <= 617500) {
                    size = 2;
                }
                var throughNumber = 1;
                if (id != 3) {
                    if (_this.sf00302Data.productOutput.lot / _this.sf00302Data.product.impositionNumber <= 400 &&
                        ((id == 1 && (_this.sf00302Data.product.surfaceTreatmentIdF == 4 || _this.sf00302Data.product.surfaceTreatmentIdF == 12 || _this.sf00302Data.product.surfaceTreatmentIdF == 13 || _this.sf00302Data.product.surfaceTreatmentIdF == 18))
                            || (id == 2 && (_this.sf00302Data.product.surfaceTreatmentIdB == 4 || _this.sf00302Data.product.surfaceTreatmentIdB == 12 || _this.sf00302Data.product.surfaceTreatmentIdB == 13 || _this.sf00302Data.product.surfaceTreatmentIdB == 18)))) {
                        throughNumber = 3;
                    }
                    else if (_this.sf00302Data.productOutput.lot / _this.sf00302Data.product.impositionNumber <= 1000) {
                        throughNumber = 2;
                    }
                }
                else {
                    if (_this.sf00302Data.productOutput.lot / _this.sf00302Data.product.impositionNumber <= 1000) {
                        throughNumber = 2;
                    }
                }
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.mstData != undefined) {
                    if (id == 1) {
                        if (_this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 9 || _this.sf00302Data.product.surfaceTreatmentIdF == 17) {
                            result = "印刷代に含む";
                        }
                        else if (_this.sf00302Data.product.surfaceTreatmentIdF == 0) {
                            result = "0";
                        }
                        else {
                            var id_3 = _this.sf00302Data.product.surfaceTreatmentIdF;
                            if (id_3 == 15 || id_3 > 18) {
                                id_3 = 6;
                            }
                            else if (id_3 == 16) {
                                id_3 = 7;
                            }
                            result = data_util_1.default.getData(_this.sf00302Data.mstData.mstSurfaceTreatment, 0, id_3, size, throughNumber, "throughWage");
                        }
                    }
                    else if (id == 2) {
                        if (_this.sf00302Data.product.surfaceTreatmentIdB == 8 || _this.sf00302Data.product.surfaceTreatmentIdB == 9 || _this.sf00302Data.product.surfaceTreatmentIdB == 17) {
                            result = "印刷代に含む";
                        }
                        else if (_this.sf00302Data.product.surfaceTreatmentIdB == 0) {
                            result = "0";
                        }
                        else {
                            var id_4 = _this.sf00302Data.product.surfaceTreatmentIdB;
                            if (id_4 == 15 || id_4 > 18) {
                                id_4 = 6;
                            }
                            else if (id_4 == 16) {
                                id_4 = 7;
                            }
                            result = data_util_1.default.getData(_this.sf00302Data.mstData.mstSurfaceTreatment, 0, id_4, size, throughNumber, "throughWage");
                        }
                    }
                    else {
                        if (math_util_1.default.checkNaN(_this.sf00302Data.product.embossingID)) {
                            result = data_util_1.default.getData(_this.sf00302Data.mstData.mstSurfaceTreatment, 0, 5, size, throughNumber, "throughWage");
                        }
                        else {
                            result = "0";
                        }
                    }
                }
                if (id == 1) {
                    _this.sf00302Data.productOutput.surfaceTreatmentThroughWageF = result;
                }
                else if (id == 2) {
                    _this.sf00302Data.productOutput.surfaceTreatmentThroughWageB = result;
                }
                else {
                    _this.sf00302Data.productOutput.embossingThroughWage = +result;
                }
            });
            this.calcSurfaceTotalCost(id);
        }
    };
    /**
     * Calculate for attributes: surfaceTotalCost of product output
     * @param {number} id: define calculate front or back or embossing
     */
    SF003020101Helper.prototype.calcSurfaceTotalCost = function (id) {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                var product = _this.sf00302Data.product;
                var productOutput = _this.sf00302Data.productOutput;
                if (productOutput.lot != undefined && productOutput.lot != 0) {
                    if (id == 1 || id == 2) {
                        var surfaceTreatmentId = void 0, surfaceTreatmentBasicCost = void 0, surfaceTreatmentThroughWage = void 0;
                        if (id == 1) {
                            surfaceTreatmentId = product.surfaceTreatmentIdF;
                            surfaceTreatmentBasicCost = productOutput.surfaceTreatmentBasicCostF;
                            surfaceTreatmentThroughWage = productOutput.surfaceTreatmentThroughWageF;
                        }
                        else if (id == 2) {
                            surfaceTreatmentId = product.surfaceTreatmentIdB;
                            surfaceTreatmentBasicCost = productOutput.surfaceTreatmentBasicCostB;
                            surfaceTreatmentThroughWage = productOutput.surfaceTreatmentThroughWageB;
                        }
                        if (surfaceTreatmentId != 8 && surfaceTreatmentId != 9 && surfaceTreatmentId != 0 && _this.isEnableSurfaceOption(product.factoryId, surfaceTreatmentId)) {
                            result = (+surfaceTreatmentBasicCost) + (+surfaceTreatmentThroughWage) * _this.calcThroughNumber();
                            result = math_util_1.default.checkNaN(result);
                        }
                    }
                    else {
                        if (math_util_1.default.checkNaN(_this.sf00302Data.product.embossingID)) {
                            result = productOutput.embossingBasicCost + productOutput.embossingThroughWage * productOutput.lot / product.impositionNumber;
                        }
                    }
                }
                if (id == 1) {
                    productOutput.surfaceTreatmentTotalCostF = result;
                }
                else if (id == 2) {
                    productOutput.surfaceTreatmentTotalCostB = result;
                }
                else {
                    productOutput.embossingTotalCost = result;
                }
            });
            this.calcDieCuttingLoss();
            this.calcSubTotal();
        }
    };
    //
    /**
     * 表面加工の選択値がその工場で利用可能かを返却
     * 取り急ぎ現状は、小野工場のPR貼り不可の件に対応するため実装
     * @param {factory_id} id: FACTORY on mst-data-type.js
     * @param {surface_id} id: SURFACE_TREATMENT on mst-data-type.js
     */
    SF003020101Helper.prototype.isEnableSurfaceOption = function (factory_id, surface_id) {
        if (factory_id == 2 && surface_id == 4)
            return false;
        return true;
    };
    /**
     * Calculate stampingFoildNumber of productOutputs
     */
    SF003020101Helper.prototype.calcStampingPointsNumber = function () {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            //new stamping points number's place holder
            var result_1 = 0;
            //stamping points number only valid when stamping mode is Foil Stamping
            if (this.sf00302Data.product.stampingId != 0 && this.isEnableStampingType()) {
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
                        result_1++;
                    }
                });
            }
            //set result to all product output
            this.sf00302Data.product.stampingPointsNumber = result_1;
        }
    };
    /**
     * Calculate for attributes: stampingBasicCost of product output
     */
    SF003020101Helper.prototype.calcStampingBasicCost = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                var big = 0;
                var small = 0;
                if (_this.sf00302Data.product.blankPaperSizeH > math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeW)) {
                    big = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeH);
                    small = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeW);
                }
                else {
                    small = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeH);
                    big = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeW);
                }
                var blankSize = 1;
                if (big <= 550 && small <= 400) {
                    blankSize = 3;
                }
                else if (big < 800 && small < 551) {
                    blankSize = 2;
                }
                if (_this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.stampingId != undefined && _this.sf00302Data.mstData != undefined && _this.isEnableStampingType()) {
                    result = data_util_1.default.getData(_this.sf00302Data.mstData.mstStamping, 0, _this.sf00302Data.product.stampingId, blankSize, "basicCost");
                }
                _this.sf00302Data.productOutput.stampingBasicCost = result;
            });
            this.calcStampingTotalCost();
        }
    };
    /**
     * Calculate for attributes: stampingThroughWage of product output
     */
    SF003020101Helper.prototype.calcStampingThroughWage = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                var big = 0;
                var small = 0;
                if (_this.sf00302Data.product.blankPaperSizeH > math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeW)) {
                    big = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeH);
                    small = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeW);
                }
                else {
                    small = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeH);
                    big = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeW);
                }
                var blankSize = 1;
                if (big <= 550 && small <= 400) {
                    blankSize = 3;
                }
                else if (big < 800 && small < 551) {
                    blankSize = 2;
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
                if (_this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.mstData != undefined && _this.isEnableStampingType()) {
                    if (_this.sf00302Data.product.stampingId != 0) {
                        result = data_util_1.default.getData(_this.sf00302Data.mstData.mstStamping, 0, _this.sf00302Data.product.stampingId, blankSize, "throughWage");
                        if (_this.sf00302Data.product.stampingId == 1 || _this.sf00302Data.product.stampingId == 2) {
                            result = result + math_util_1.default.checkNaN(sumSize);
                        }
                        if (_this.sf00302Data.product.stampingPointsNumber > 1) {
                            result = result + (_this.sf00302Data.product.stampingPointsNumber - 1) * 0.8;
                        }
                    }
                }
                result = math_util_1.default.checkNaN(math_util_1.default.round(result, 2));
                _this.sf00302Data.productOutput.stampingThroughWage = result;
            });
            this.calcStampingTotalCost();
        }
    };
    /**
     * Calculate for attributes: stampingTotalCost of product output
     */
    SF003020101Helper.prototype.calcStampingTotalCost = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                _this.sf00302Data.productOutput.stampingTotalCost = math_util_1.default.checkNaN(_this.sf00302Data.productOutput.stampingBasicCost + _this.sf00302Data.productOutput.stampingThroughWage * _this.sf00302Data.productOutput.lot);
            });
            this.calcSubTotal();
        }
    };
    //
    /**
     * 箔押しの選択値がその工場で利用可能かを返却
     * 取り急ぎ現状は、小野工場のPR貼り不可の件に対応するため実装
     */
    SF003020101Helper.prototype.isEnableStampingType = function () {
        if (this.sf00302Data.product.factoryId == 2 && this.sf00302Data.product.stampingId == 1)
            return false;
        return true;
    };
    Object.defineProperty(SF003020101Helper.prototype, "useDieCuttingFlatFee", {
        get: function () {
            return this.throughNumber <= 1000;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calculate for attributes: dieCuttingLoss of product output
     */
    SF003020101Helper.prototype.calcDieCuttingLoss = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            // 一律料金を使用する場合はロスを0とする
            if (this.useDieCuttingFlatFee) {
                this.sf00302Data.productOutput.dieCuttingLoss = 0;
            }
            else {
                this.calculateAllOutput(function () {
                    var result = 0;
                    if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.dieCuttingThroughNumber != 0
                        && _this.sf00302Data.product.dieCuttingFlag == 1) {
                        result = math_util_1.default.checkNaN(_this.sf00302Data.productOutput.paperTotalCost)
                            + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.surfaceTreatmentTotalCostF)
                            + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.surfaceTreatmentTotalCostB)
                            + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.embossingTotalCost)
                            + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.laminationTotalCost);
                        if (_this.sf00302Data.product.printMethod != 2) {
                            result = result + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.colorPrintTotalCostB) + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.colorPrintTotalCostF);
                        }
                        else {
                            result = result + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.digitalTotalCost);
                            if (_this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 17 || _this.sf00302Data.product.surfaceTreatmentIdF > 18) {
                                result = result + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.colorPrintTotalCostF);
                            }
                            if (_this.sf00302Data.product.surfaceTreatmentIdB == 8 || _this.sf00302Data.product.surfaceTreatmentIdB == 17 || _this.sf00302Data.product.surfaceTreatmentIdB > 18) {
                                result = result + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.colorPrintTotalCostB);
                            }
                        }
                        result = math_util_1.default.checkNaN(math_util_1.default.ceilDecimal(result * 0.01, 0));
                    }
                    _this.sf00302Data.productOutput.dieCuttingLoss = result;
                });
            }
            this.calcDieCuttingTotalCost();
            this.calcPasteLoss();
        }
    };
    /**
     * Calculate for attributes: dieCuttingBasicCost of product output
     */
    SF003020101Helper.prototype.calcDieCuttingBasicCost = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                if (_this.sf00302Data.product.dieCuttingFlag == 1) {
                    var size = 1;
                    if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0) {
                        var condition = _this.sf00302Data.product.cutPaperSizeH * _this.sf00302Data.product.cutPaperSizeW;
                        if (condition < 309000) {
                            size = 3;
                        }
                        else if (condition <= 617500) {
                            size = 2;
                        }
                    }
                    var number = 1;
                    if (_this.sf00302Data.productOutput.lot / _this.sf00302Data.product.dieCuttingThroughNumber <= 1000) {
                        number = 2;
                    }
                    if (_this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.dieCuttingThroughNumber != 0 && _this.sf00302Data.mstData != undefined
                        && _this.sf00302Data.product.dieCuttingFlag == 1) {
                        result = data_util_1.default.getData(_this.sf00302Data.mstData.mstDieCutting, 0, _this.sf00302Data.product.laminationFlute, size, _this.sf00302Data.product.dieCuttingThroughNumber, number, "basicCost");
                    }
                }
                _this.sf00302Data.productOutput.dieCuttingBasicCost = result;
            });
            this.calcDieCuttingTotalCost();
        }
    };
    /**
     * Calculate for attributes: dieCuttingThroughWage of product output
     */
    SF003020101Helper.prototype.calcDieCuttingThroughWage = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            // 一律料金を使用する場合はロスを0とする
            if (this.useDieCuttingFlatFee) {
                this.sf00302Data.productOutput.dieCuttingThroughWage = 0;
            }
            else {
                this.calculateAllOutput(function () {
                    var result = 0;
                    var size = 1;
                    if (_this.sf00302Data.product.dieCuttingFlag == 1) {
                        if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0) {
                            var condition = _this.sf00302Data.product.cutPaperSizeH * _this.sf00302Data.product.cutPaperSizeW;
                            if (condition < 309000) {
                                size = 3;
                            }
                            else if (condition <= 617500) {
                                size = 2;
                            }
                            0;
                        }
                        var number = 1;
                        if (_this.throughNumber <= 1000) {
                            number = 2;
                        }
                        if (_this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.dieCuttingThroughNumber != 0 && _this.sf00302Data.mstData != undefined
                            && _this.sf00302Data.product.dieCuttingFlag == 1) {
                            result = data_util_1.default.getData(_this.sf00302Data.mstData.mstDieCutting, 0, _this.sf00302Data.product.laminationFlute, size, _this.sf00302Data.product.dieCuttingThroughNumber, number, "throughWage");
                            if (_this.sf00302Data.product.dieCuttingWeight == 1) {
                                result = result * 1.2;
                            }
                            else if (_this.sf00302Data.product.dieCuttingWeight == 2) {
                                result = result * 1.5;
                            }
                            else if (_this.sf00302Data.product.dieCuttingWeight == 3) {
                                result = result * 2;
                            }
                        }
                    }
                    _this.sf00302Data.productOutput.dieCuttingThroughWage = result;
                });
            }
            this.calcDieCuttingTotalCost();
        }
    };
    /**
     * Calculate for attributes: dieCuttingTotalCost of product output
     */
    SF003020101Helper.prototype.calcDieCuttingTotalCost = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.dieCuttingThroughNumber != 0
                    && _this.sf00302Data.product.dieCuttingFlag == 1) {
                    result = math_util_1.default.checkNaN(_this.sf00302Data.productOutput.dieCuttingLoss + _this.sf00302Data.productOutput.dieCuttingBasicCost + _this.sf00302Data.productOutput.dieCuttingThroughWage * _this.throughNumber);
                }
                _this.sf00302Data.productOutput.dieCuttingTotalCost = math_util_1.default.roundDecimal(result, 0);
            });
            this.calcPasteLoss();
            this.calcSubTotal();
        }
    };
    /**
     * Calculate for attributes: pasteLoss of product output
     */
    SF003020101Helper.prototype.calcPasteLoss = function () {
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
    SF003020101Helper.prototype.calcPasteBasicCost = function () {
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
    SF003020101Helper.prototype.calcPasteThroughWage = function () {
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
    SF003020101Helper.prototype.calcPasteTotalCost = function () {
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
    /**
     * Calculate for attributes: windowMaterialFee of product output
     */
    SF003020101Helper.prototype.calcWindowMaterialFee = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.product.windowSizeW != 0 && _this.sf00302Data.product.windowSizeW != undefined) {
                    var condition = (+_this.sf00302Data.product.windowSizeW + 40) * (+_this.sf00302Data.product.windowSizeH + 40) * 20 / 1000000;
                    if (condition < 0.7) {
                        result = 0.7;
                    }
                    else {
                        result = 1;
                    }
                }
                _this.sf00302Data.productOutput.windowMaterialFee = math_util_1.default.checkNaN(result);
            });
            this.calcWindowTotalCost();
        }
    };
    /**
     * Calculate for attributes: windowTotalCost of product output
     */
    SF003020101Helper.prototype.calcWindowTotalCost = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                var big = 0;
                var small = 0;
                if (_this.sf00302Data.product.blankPaperSizeH > math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeW)) {
                    big = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeH);
                    small = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeW);
                }
                else {
                    small = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeH);
                    big = math_util_1.default.checkNaN(_this.sf00302Data.product.blankPaperSizeW);
                }
                var size = 2;
                if (big > 400 || small > 350) {
                    size = 1;
                }
                var lot = 2;
                if (_this.sf00302Data.productOutput.lot <= 1000) {
                    lot = 1;
                }
                var material = 2;
                if (_this.sf00302Data.product.laminationFlute == 1) {
                    material = 1;
                }
                if (_this.sf00302Data.productOutput.lot != undefined
                    && _this.sf00302Data.productOutput.lot != 0
                    && _this.sf00302Data.mstData != undefined
                    && _this.sf00302Data.product.windowSizeW != 0
                    && _this.sf00302Data.product.windowSizeW != undefined) {
                    result = math_util_1.default.checkNaN((+data_util_1.default.getData(_this.sf00302Data.mstData.mstWindow, 0, size, lot, material, "windowPreparationFee"))
                        + ((+data_util_1.default.getData(_this.sf00302Data.mstData.mstWindow, 0, size, lot, material, "windowThroughWage"))
                            + (+_this.sf00302Data.productOutput.windowMaterialFee)) * _this.sf00302Data.productOutput.lot);
                }
                _this.sf00302Data.productOutput.windowTotalCost = math_util_1.default.checkNaN(result);
            });
            this.calcSubTotal();
        }
    };
    /**
     * Calculate for attributes: inspection of product output
     */
    SF003020101Helper.prototype.calcInspection = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var tmp = 0;
                if (_this.sf00302Data.product.inspectionId == 2) {
                    tmp = 1;
                }
                else if (_this.sf00302Data.product.inspectionId == 3) {
                    tmp = 0.5;
                }
                else if (_this.sf00302Data.product.inspectionId == 4) {
                    tmp = 0.3;
                }
                _this.sf00302Data.productOutput.inspection = math_util_1.default.checkNaN(tmp * _this.sf00302Data.productOutput.lot);
            });
            this.calcEstimateTotal();
        }
    };
    /**
     * Calculate for attributes: packing of product output
     */
    SF003020101Helper.prototype.calcPacking = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var firstSubtotal = math_util_1.default.checkNaN(_this.sf00302Data.productOutput.paperTotalCost +
                    _this.sf00302Data.productOutput.surfaceTreatmentTotalCostF + _this.sf00302Data.productOutput.surfaceTreatmentTotalCostB +
                    _this.sf00302Data.productOutput.embossingTotalCost + _this.sf00302Data.productOutput.laminationTotalCost + _this.sf00302Data.productOutput.dieCuttingTotalCost +
                    _this.sf00302Data.productOutput.stampingTotalCost + _this.sf00302Data.productOutput.windowTotalCost
                    + _this.getProductOutputOtherFee1() + _this.getProductOutputOtherFee2() + _this.getProductOutputOtherFee3()
                    + _this.sf00302Data.productOutput.pasteTotalCost);
                if (_this.sf00302Data.product.printMethod != 2) {
                    firstSubtotal = firstSubtotal + _this.sf00302Data.productOutput.colorPrintTotalCostB + _this.sf00302Data.productOutput.colorPrintTotalCostF;
                }
                else {
                    firstSubtotal = firstSubtotal + _this.sf00302Data.productOutput.digitalTotalCost;
                    if (_this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 17 || _this.sf00302Data.product.surfaceTreatmentIdF > 18) {
                        firstSubtotal = firstSubtotal + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.colorPrintTotalCostF);
                    }
                    if (_this.sf00302Data.product.surfaceTreatmentIdB == 8 || _this.sf00302Data.product.surfaceTreatmentIdB == 17 || _this.sf00302Data.product.surfaceTreatmentIdB > 18) {
                        firstSubtotal = firstSubtotal + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.colorPrintTotalCostB);
                    }
                }
                if (_this.sf00302Data.mstData != undefined) {
                    var lot = 2;
                    if (_this.calcThroughNumber() > 1000) {
                        lot = 1;
                    }
                    var packing = math_util_1.default.checkNaN(data_util_1.default.getData(_this.sf00302Data.mstData.mstPacking, 0, _this.sf00302Data.product.packingId, lot, "percent") * (firstSubtotal + _this.sf00302Data.productOutput.inspection));
                    _this.sf00302Data.productOutput.packing = math_util_1.default.round(packing, 2);
                }
            });
            this.calcSubTotal();
            this.calcEstimateTotal();
        }
    };
    /**
     * Calculate for attributes: managementCost of product output
     */
    SF003020101Helper.prototype.calcManagementCost = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var result = 0;
                if (_this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.subtotal != undefined && _this.sf00302Data.productOutput.subtotal != 0) {
                    if (_this.sf00302Data.productOutput.paperUnitPrice == 0) {
                        result = 0.3 * _this.sf00302Data.productOutput.subtotal;
                    }
                    else {
                        result = 0.15 * _this.sf00302Data.productOutput.subtotal;
                    }
                    if (result <= 10000 && result != 0) {
                        result = 10000;
                    }
                }
                _this.sf00302Data.productOutput.managementCost = math_util_1.default.checkNaN(math_util_1.default.roundDecimal(result, 2));
            });
        }
    };
    /**
     * Calculate for attributes: subTotal of product output
     */
    SF003020101Helper.prototype.calcSubTotal = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var firstSubtotal = math_util_1.default.checkNaN(_this.sf00302Data.productOutput.paperTotalCost +
                    _this.sf00302Data.productOutput.surfaceTreatmentTotalCostF + _this.sf00302Data.productOutput.surfaceTreatmentTotalCostB +
                    _this.sf00302Data.productOutput.embossingTotalCost + _this.sf00302Data.productOutput.laminationTotalCost + _this.sf00302Data.productOutput.dieCuttingTotalCost +
                    _this.sf00302Data.productOutput.stampingTotalCost + _this.sf00302Data.productOutput.windowTotalCost + _this.sf00302Data.productOutput.pasteTotalCost + _this.getProductOutputOtherFee1() + _this.getProductOutputOtherFee2() + +_this.getProductOutputOtherFee3()
                    + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.cartonSpecialFare));
                if (_this.sf00302Data.product.printMethod != 2) {
                    firstSubtotal = firstSubtotal + _this.sf00302Data.productOutput.colorPrintTotalCostB + _this.sf00302Data.productOutput.colorPrintTotalCostF;
                }
                else {
                    firstSubtotal = firstSubtotal + _this.sf00302Data.productOutput.digitalTotalCost;
                    if (_this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 17 || _this.sf00302Data.product.surfaceTreatmentIdF > 18) {
                        firstSubtotal = firstSubtotal + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.colorPrintTotalCostF);
                    }
                    if (_this.sf00302Data.product.surfaceTreatmentIdB == 8 || _this.sf00302Data.product.surfaceTreatmentIdB == 17 || _this.sf00302Data.product.surfaceTreatmentIdB > 18) {
                        firstSubtotal = firstSubtotal + math_util_1.default.checkNaN(_this.sf00302Data.productOutput.colorPrintTotalCostB);
                    }
                }
                var subtotal = 0;
                subtotal = math_util_1.default.checkNaN(_this.sf00302Data.productOutput.packing + firstSubtotal + _this.sf00302Data.productOutput.inspection);
                _this.sf00302Data.productOutput.subtotal = subtotal;
            });
            this.calcManagementCost();
            this.calcEstimateTotal();
        }
    };
    /**
     * Calculate for attributes: estimatedTotal of product output
     */
    SF003020101Helper.prototype.calcEstimateTotal = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                _this.sf00302Data.productOutput.estimatedTotal = math_util_1.default.checkNaN((+_this.sf00302Data.productOutput.subtotal) + (+_this.sf00302Data.productOutput.managementCost));
                if (_this.sf00302Data.productOutput.fareLineService != undefined) {
                    _this.sf00302Data.productOutput.estimatedTotal = _this.sf00302Data.productOutput.estimatedTotal + math_util_1.default.checkNaN(+_this.sf00302Data.productOutput.fareLineService);
                }
                _this.sf00302Data.productOutput.estimatedTotal = math_util_1.default.roundDecimal(_this.sf00302Data.productOutput.estimatedTotal, 2);
            });
            this.calcEstimateUnitPrice();
        }
    };
    /**
     * Calculate for attributes: estimatedUnitPrice of product output
     */
    SF003020101Helper.prototype.calcEstimateUnitPrice = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var unitPrice = 0;
                if (_this.sf00302Data.productOutput.estimatedTotal != 0) {
                    unitPrice = math_util_1.default.checkNaN(math_util_1.default.ceilDecimal(_this.sf00302Data.productOutput.estimatedTotal / _this.sf00302Data.productOutput.lot, 2));
                }
                _this.sf00302Data.productOutput.estimatedUnitPrice = +unitPrice.toFixed(2);
            });
            this.calcEstimateDiff(1);
            this.calcEstimateDiff(2);
        }
    };
    /**
     * Calculate for attributes: submittedTotal of product output
     */
    SF003020101Helper.prototype.calcSubmittedTotal = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var submittedTotal = 0;
            if (_this.sf00302Data.indexOffer.unitPrice != 0) {
                submittedTotal = math_util_1.default.checkNaN(_this.sf00302Data.indexOffer.unitPrice * _this.sf00302Data.productOutput.lot);
            }
            _this.sf00302Data.indexOffer.total = submittedTotal;
        });
    };
    /**
     * Calculate for attributes: operatingMargin of product output
     */
    SF003020101Helper.prototype.calcEstimateDiff = function (type) {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var estimatedDiff = 0;
                if (type == 1 && _this.sf00302Data.product.shapeId != _this.sf00302Data.DECORATIVE_ID) {
                    if (_this.sf00302Data.indexOffer.total != 0) {
                        _this.sf00302Data.indexOffer.profitRate = math_util_1.default.checkNaN(math_util_1.default.roundDecimal((_this.sf00302Data.indexOffer.unitPrice - _this.sf00302Data.productOutput.estimatedUnitPrice) / _this.sf00302Data.productOutput.estimatedUnitPrice * 100, 2));
                    }
                    else {
                        _this.sf00302Data.indexOffer.profitRate = 0;
                    }
                }
            });
        }
    };
    /**
     * Calculate for mold fee of product common fee
     */
    SF003020101Helper.prototype.calcMoldFee = function () {
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
    SF003020101Helper.prototype.calcOtherFee = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                _this.calcSubTotal();
                _this.calcEstimateTotal();
                _this.sf00302Data.productOutput.estimatedTotal = _this.sf00302Data.productOutput.estimatedTotal + _this.getProductOutputOtherFee1();
                _this.sf00302Data.productOutput.estimatedTotal = _this.sf00302Data.productOutput.estimatedTotal + _this.getProductOutputOtherFee2();
                _this.sf00302Data.productOutput.estimatedTotal = _this.sf00302Data.productOutput.estimatedTotal + _this.getProductOutputOtherFee3();
                _this.calcEstimateTotal();
            });
        }
    };
    SF003020101Helper.prototype.getProductOutputOtherFee1 = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.product.otherUnitType1 == 1 ?
            this.sf00302Data.product.otherWage1 * this.sf00302Data.productOutput.lot / this.sf00302Data.product.impositionNumber :
            this.sf00302Data.product.otherWage1);
    };
    SF003020101Helper.prototype.getProductOutputOtherFee2 = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.product.otherUnitType2 == 1 ? this.sf00302Data.product.otherWage2 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage2);
    };
    SF003020101Helper.prototype.getProductOutputOtherFee3 = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.product.otherUnitType3 == 1 ? this.sf00302Data.product.otherWage3 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage3);
    };
    SF003020101Helper.prototype.getColorPrintTotalCost = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostF) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostB);
    };
    SF003020101Helper.prototype.getSurfaceTreatmentTotalCost = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.productOutput.surfaceTreatmentTotalCostF) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.surfaceTreatmentTotalCostB) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.embossingTotalCost);
    };
    SF003020101Helper.prototype.getInspectionPackingFareLineTotalCost = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.productOutput.inspection) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.packing) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.fareLineService);
    };
    SF003020101Helper.prototype.getDieCuttingPasteTotalCost = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.productOutput.dieCuttingTotalCost) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.pasteTotalCost);
    };
    SF003020101Helper.prototype.getOtherFeeTotalCost = function () {
        return (+this.getProductOutputOtherFee1()) + (+this.getProductOutputOtherFee2()) + (+this.getProductOutputOtherFee3());
    };
    SF003020101Helper.prototype.calcShippingCost = function () {
        var _this = this;
        var options = [10, 20, 30, 40, 60, 80, 100, 120, 140, 160, 180, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
        this.sf00302Data.checkOverWeight = false;
        this.calculateAllOutput(function () {
            var weight = Math.ceil((_this.sf00302Data.product.blankPaperSizeH * _this.sf00302Data.product.blankPaperSizeW * _this.sf00302Data.product.paperWeight * _this.sf00302Data.productOutput.lot / 1000 / 1000 / 1000 + 1) / 10) * 10;
            var index = 0;
            while (index < options.length) {
                if (options[index] >= weight) {
                    weight = options[index];
                    index = options.length + 1;
                }
                else {
                    index++;
                }
            }
            if (_this.sf00302Data.product.factoryId == 1) {
                // Saga factory
                if (_this.sf00302Data.product.laminationFlute == 1) {
                    // FIXME: 4500あたりがあやしい。4t = 4000が正解なのでは？
                    _this.sf00302Data.productOutput.fareLineService = 0;
                    if (weight < 4500 && +_this.sf00302Data.product.shippingCostId > 0 && +_this.sf00302Data.product.shippingCostId < 150) {
                        _this.sf00302Data.productOutput.fareLineService = _this.sf00302Data.product.blankPaperSizeH * _this.sf00302Data.product.blankPaperSizeW * _this.sf00302Data.product.paperWeight * _this.sf00302Data.productOutput.lot / 1000 / 1000 / 1000 * 10;
                    }
                    else if (weight < 4500 && +_this.sf00302Data.product.shippingCostId >= 150) {
                        var condition = Math.min(+_this.sf00302Data.product.shippingCostId, 450);
                        _this.sf00302Data.productOutput.fareLineService = _this.sf00302Data.product.blankPaperSizeH * _this.sf00302Data.product.blankPaperSizeW * _this.sf00302Data.product.paperWeight * _this.sf00302Data.productOutput.lot / 1000 / 1000 / 1000 * data_util_1.default.getData(_this.sf00302Data.mstData.mstShippingCost, 0, 0, condition, 4000, "cost");
                    }
                }
                else {
                    // EF / GF / BF
                    var size = (_this.sf00302Data.product.blankPaperSizeW * _this.sf00302Data.product.blankPaperSizeH) / 1e6; // ㎜ to ㎡
                    var cost_base = size * _this.sf00302Data.productOutput.lot * _this.shippingEfCostPoint(_this.sf00302Data.product.laminationFlute);
                    var max_capacity = 4500;
                    if (size < max_capacity && +_this.sf00302Data.product.shippingCostId > 0 && +_this.sf00302Data.product.shippingCostId < 150) {
                        _this.sf00302Data.productOutput.fareLineService = cost_base * 10;
                    }
                    else if (size < max_capacity && +_this.sf00302Data.product.shippingCostId >= 150) {
                        var condition = Math.min(+_this.sf00302Data.product.shippingCostId, 450);
                        _this.sf00302Data.productOutput.fareLineService = cost_base * data_util_1.default.getData(_this.sf00302Data.mstData.mstShippingCost, 0, 0, condition, 4000, "cost");
                    }
                }
            }
            else {
                var distanceOptions = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
                var distance = _this.sf00302Data.product.shippingCostId;
                if (distance == 0) {
                    _this.sf00302Data.productOutput.fareLineService = 0;
                }
                else {
                    var index_1 = 0;
                    while (index_1 < distanceOptions.length) {
                        if (distanceOptions[index_1] >= distance) {
                            distance = distanceOptions[index_1];
                            index_1 = distanceOptions.length + 1;
                        }
                        else {
                            index_1++;
                        }
                    }
                    _this.sf00302Data.productOutput.fareLineService = math_util_1.default.checkNaN(data_util_1.default.getData(_this.sf00302Data.mstData.mstShippingCost, 0, 1, distance, weight, "cost"));
                }
            }
            if (_this.sf00302Data.product.blankPaperSizeH * _this.sf00302Data.product.blankPaperSizeW * _this.sf00302Data.product.paperWeight * _this.sf00302Data.productOutput.lot / 1000 / 1000 / 1000 > 4500) {
                _this.sf00302Data.checkOverWeight = true;
            }
        });
        this.calcSubTotal();
    };
    SF003020101Helper.prototype.shippingEfCostPoint = function (laminationFluteValue) {
        if (laminationFluteValue == 3)
            return 0.9; //BF
        // Maybe EF or GF
        return 0.6;
    };
    SF003020101Helper.prototype.calculateAllOutput = function (doSth) {
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
    SF003020101Helper.prototype.calcDieCuttingWeight = function () {
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
    Object.defineProperty(SF003020101Helper.prototype, "productLaminationBackBasicWeight", {
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
    Object.defineProperty(SF003020101Helper.prototype, "productLaminationMediumBasicWeight", {
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
    Object.defineProperty(SF003020101Helper.prototype, "productLaminationFrontBasicWeight", {
        get: function () {
            if (this.sf00302Data.product.laminationFlute == 1) {
                return 0;
            }
            else {
                return this.sf00302Data.product.laminationFrontBasicWeight;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020101Helper.prototype, "productLaminationBackThroughWage", {
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
    Object.defineProperty(SF003020101Helper.prototype, "productLaminationMediumThroughWage", {
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
    Object.defineProperty(SF003020101Helper.prototype, "productLaminationFrontThroughWage", {
        get: function () {
            if (this.sf00302Data.product.laminationFlute == 1) {
                return 0;
            }
            else {
                return this.sf00302Data.product.laminationFrontThroughWage;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020101Helper.prototype, "productLaminationCuttingFlow", {
        get: function () {
            if (this.sf00302Data.product.laminationFlute == 1) {
                return 0;
            }
            else {
                return this.sf00302Data.product.laminationCuttingFlow;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020101Helper.prototype, "productLaminationWidth", {
        get: function () {
            if (this.sf00302Data.product.laminationFlute == 1) {
                return 0;
            }
            else {
                return this.sf00302Data.product.laminationWidth;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020101Helper.prototype, "productLaminationNumber", {
        get: function () {
            if (this.sf00302Data.product.laminationFlute == 1) {
                return 0;
            }
            else {
                return this.sf00302Data.product.laminationNumber;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020101Helper.prototype, "productStampingSizeW1", {
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
    Object.defineProperty(SF003020101Helper.prototype, "productStampingSizeW2", {
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
    Object.defineProperty(SF003020101Helper.prototype, "productStampingSizeW3", {
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
    Object.defineProperty(SF003020101Helper.prototype, "productStampingSizeW4", {
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
    Object.defineProperty(SF003020101Helper.prototype, "productStampingSizeH1", {
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
    Object.defineProperty(SF003020101Helper.prototype, "productStampingSizeH2", {
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
    Object.defineProperty(SF003020101Helper.prototype, "productStampingSizeH3", {
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
    Object.defineProperty(SF003020101Helper.prototype, "productStampingSizeH4", {
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
    SF003020101Helper.prototype.validateForm = function () {
        var isValidate = true;
        // http://fridaynight.vnext.vn/issues/3369
        if (this.sf00302Data.product.requestDesignFlag == 1) {
            return true;
        }
        // check deal name
        if (!this.getSF00302Data().product.productName) {
            this.getSF00302Data().productRequiredItem.isSaveProductName = true;
            // check validate false
            isValidate = false;
        }
        else {
            this.getSF00302Data().productRequiredItem.isSaveProductName = false;
        }
        if (!!this.getSF00302Data().product.id) {
            if (!this.getSF00302Data().product.factoryId) {
                this.getSF00302Data().productRequiredItem.isSaveFactoryId = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveFactoryId = false;
            }
            if (this.getSF00302Data().productOutput.lot == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveLot = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveLot = false;
            }
            "";
            if (this.getSF00302Data().indexOffer.unitPrice == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice = false;
            }
            if (this.getSF00302Data().product.paperNameId == undefined) {
                this.getSF00302Data().productRequiredItem.isSavePaperName = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSavePaperName = false;
            }
            if (this.getSF00302Data().product.paperWeight == undefined) {
                this.getSF00302Data().productRequiredItem.isSavePaperWeight = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSavePaperWeight = false;
            }
            if (this.getSF00302Data().product.paperSizeW == undefined) {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeW = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeW = false;
            }
            if (this.getSF00302Data().product.paperSizeH == undefined) {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeH = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeH = false;
            }
            if (this.getSF00302Data().product.cutPaperSizeW == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeW = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeW = false;
            }
            if (this.getSF00302Data().product.cutPaperSizeH == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeH = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeH = false;
            }
            //取数（丁）
            if (this.getSF00302Data().product.takenNumber == undefined || format_util_1.FormatUtil.isNaN(this.getSF00302Data().product.takenNumber) == 0) {
                this.getSF00302Data().productRequiredItem.isSaveTakenNumber = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveTakenNumber = false;
            }
            //面付数（丁）
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
    SF003020101Helper.prototype.validateFormOutput = function () {
        var isValidate = true;
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
        return isValidate;
    };
    // check data on change in product info area - follow 3057
    SF003020101Helper.prototype.checkChangeDataProduct = function () {
        var currentProduct = this.getSF00302Data().product;
        var oldProduct = this.getSF00302Data().productOld;
        if (oldProduct.id) {
            // I. Over view area
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
            else if (!this.isEquals(this.getSF00302Data().paperNormValue, this.getSF00302Data().paperNormValueOld)) {
                // Paper Norm Value
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
            else if (!this.isEquals(currentProduct.takenNumber, oldProduct.takenNumber)) {
                //  取数
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.impositionNumber, oldProduct.impositionNumber)) {
                //  面付数
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
    SF003020101Helper.prototype.checkChangeDataProductOutput = function () {
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
    SF003020101Helper.prototype.checkChangeDataOffer = function () {
        var currentOffers = this.getSF00302Data().offers;
        var oldOffers = this.getSF00302Data().offersOld;
        if (oldOffers.length > 0) {
            for (var i = 0; i < currentOffers.length; i++) {
                if (!this.isEquals(currentOffers[i].unitPrice, oldOffers[i].unitPrice)) {
                    this.getSF00302Data().checkOutputSave = true;
                }
            }
        }
        else {
            this.getSF00302Data().checkOutputSave = false;
        }
    };
    SF003020101Helper.prototype.isEquals = function (a, b) {
        return Object.is(a, b);
    };
    SF003020101Helper.prototype.calcAdditionFare = function () {
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
    Object.defineProperty(SF003020101Helper.prototype, "throughNumber", {
        /**
         * 通し数 (lot / 打ち抜き面付け数)
         */
        get: function () {
            var n = this.sf00302Data.product.dieCuttingThroughNumber || 1;
            if (!this.sf00302Data.productOutput.lot)
                return 0;
            return math_util_1.default.checkNaN(math_util_1.default.ceilDecimal(this.sf00302Data.productOutput.lot / n, 0));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * シートサイズ選択ボックスを生成する
     *
     * @return { sheetSizes: サイズの選択肢, selectedIndex: 選択されたサイズの添字 (null: その他のサイズ) }
     */
    SF003020101Helper.prototype.createSheetSizeList = function () {
        var paperId;
        var pageData = this.sf00302Data;
        var product = pageData.product;
        var majorPaper = product.paperNameId != 100;
        var sheetSizes;
        var paperModel = pageData.paperTmp;
        var sheetSizeId = product.sheetSizeId;
        // ■原紙 ID
        if (majorPaper) {
            // よく使われる原紙から選択されている場合
            // = paperNameId と坪量 で paper を、原紙サイズより sheet_size を解決する
            paperId = data_util_1.default.getData(pageData.mstData.mstPaper, 0, product.factoryId, product.paperNameId, product.paperWeight, "paperId");
        }
        else {
            // モーダルで原紙が選択されている場合
            // paperId より paper, sheetSizeId より sheet_size を解決する
            paperId = paperModel ? paperModel.id : null;
        }
        // ■シートサイズ選択ボックスの選択肢を用意する
        if (majorPaper || !(paperModel && paperModel.tabNumber == 2)) {
            // 特殊原紙以外
            sheetSizes = pageData.mstSheetSizes.filter(function (item) {
                return item.paperId == paperId;
            });
        }
        else {
            // 特殊原紙の場合 ... サイズは一意に決まる
            sheetSizes = [paperModel.toMstSheetSize()];
        }
        // ■既選択サイズを決定する
        var index = -1;
        if (product.specialSizeFlag) {
        }
        else if (majorPaper) {
            // よく使われる原紙の場合
            // 寸法より選択されているサイズを選択する
            index = sheetSizes.findIndex(function (item) { return product.paperSizeW == item.width && product.paperSizeH == item.height; });
        }
        else {
            // 一般原紙、特殊原紙の場合
            // sheetSizeId より選択されているサイズを選択する
            index = sheetSizes.findIndex(function (item) { return item.id == sheetSizeId; });
        }
        // 戻り値
        return {
            sheetSizes: sheetSizes,
            selectedIndex: index >= 0 ? index : null
        };
    };
    SF003020101Helper.prototype.calcCartonLotGap = function () {
    };
    SF003020101Helper = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SF003020101Helper);
    return SF003020101Helper;
}());
exports.SF003020101Helper = SF003020101Helper;
//# sourceMappingURL=SF003020101.helper.js.map