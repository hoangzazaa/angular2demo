"use strict";
var math_util_1 = require("../../../../../../util/math-util");
var data_util_1 = require("../../../../../../util/data-util");
var format_util_1 = require("../../../../../../util/format-util");
var util_1 = require("util");
/**
 * Created by VuPT on 5/10/2017.
 */
var SF003020201Helper = (function () {
    function SF003020201Helper() {
    }
    SF003020201Helper.prototype.calcAdditionFare = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            var productOutput = _this.sf00302Data.productOutput;
            var product = _this.sf00302Data.product;
            if (productOutput.lot != 0 && product.requiredAdditionalWork == 1) {
                var condition = math_util_1.default.checkNaN(productOutput.lot / product.takenNumber
                    * product.blankPaperSizeH * product.blankPaperSizeW / 1000 / 1000);
                if (condition < 500) {
                    result = 5000;
                }
                else {
                    result = 10000;
                }
            }
            _this.sf00302Data.productOutput.cartonSpecialFare = result;
        });
        this.calcTotalCarton();
    };
    SF003020201Helper.prototype.calcPacking = function () {
    };
    SF003020201Helper.prototype.calcDimension = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            if (_this.getSF00302Data().productOutput.lot != 0) {
                if (_this.getSF00302Data().product.laminationFlute != 0) {
                    result = _this.getSF00302Data().product.sizeD + _this.getSF00302Data().product.sizeW;
                    if (_this.getSF00302Data().product.sizeW >= 3) {
                        result = result + math_util_1.default.checkNaN(_this.getSF00302Data().product.sizeW - 3);
                    }
                    if (_this.getSF00302Data().product.laminationFlute == 1) {
                        result = result + _this.getSF00302Data().product.sizeD - 3 + 35;
                    }
                    else if (_this.getSF00302Data().product.laminationFlute == 2) {
                        result = result + _this.getSF00302Data().product.sizeD - 2 + 30;
                    }
                    else if (_this.getSF00302Data().product.laminationFlute == 3) {
                        result = result + _this.getSF00302Data().product.sizeD - 4 + 40;
                    }
                    else if (_this.getSF00302Data().product.laminationFlute == 4) {
                        result = result + _this.getSF00302Data().product.sizeD - 4 + 35;
                    }
                    var factor = _this.getSF00302Data().product.sizeH + _this.getSF00302Data().product.upperFlap + _this.getSF00302Data().product.lowerFlap;
                    if (_this.getSF00302Data().product.laminationFlute == 1) {
                        result = math_util_1.default.roundDecimal(math_util_1.default.checkNaN(result / 1000 * factor / 1000), 4);
                    }
                    else if (_this.getSF00302Data().product.laminationFlute == 2) {
                        result = math_util_1.default.roundDecimal(math_util_1.default.checkNaN(result / 1000 * factor / 1000), 4);
                    }
                    else if (_this.getSF00302Data().product.laminationFlute == 3) {
                        result = math_util_1.default.roundDecimal(math_util_1.default.checkNaN(result / 1000 * factor / 1000 * 1.5), 4);
                    }
                    else if (_this.getSF00302Data().product.laminationFlute == 4) {
                        result = math_util_1.default.roundDecimal(math_util_1.default.checkNaN(result / 1000 * factor / 1000), 4);
                    }
                }
            }
            _this.sf00302Data.productOutput.dimension = math_util_1.default.checkNaN(result);
        });
    };
    SF003020201Helper.prototype.calcSubmittedTotal = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var submittedTotal = 0;
            if (_this.sf00302Data.indexOffer.unitPrice != 0) {
                submittedTotal = math_util_1.default.checkNaN(_this.sf00302Data.indexOffer.unitPrice * _this.sf00302Data.productOutput.lot);
            }
            _this.sf00302Data.indexOffer.total = submittedTotal;
        });
    };
    SF003020201Helper.prototype.getOtherFeeTotalCost = function () {
        return (+this.getProductOutputOtherFee1()) + (+this.getProductOutputOtherFee2()) + (+this.getProductOutputOtherFee3());
    };
    SF003020201Helper.prototype.getSF00302Data = function () {
        return this.sf00302Data;
    };
    /** @inheritDoc */
    SF003020201Helper.prototype.calcMaterialSizeCarton = function () {
        if (this.getSF00302Data().product.laminationFlute != undefined && this.getSF00302Data().product.laminationFlute != 0) {
            var lengthWidthSize = void 0;
            var heightWidthSize = void 0;
            lengthWidthSize = (math_util_1.default.checkNaN(this.getSF00302Data().product.sizeD)
                + math_util_1.default.checkNaN(this.getSF00302Data().product.sizeW)) * 2
                + (+data_util_1.default.getData(this.getSF00302Data().mstData.mstCartonFlute, 0, this.getSF00302Data().product.laminationFlute, "long"));
            heightWidthSize = (math_util_1.default.checkNaN(this.getSF00302Data().product.sizeH)
                + math_util_1.default.checkNaN(this.getSF00302Data().product.sizeD))
                + (+data_util_1.default.getData(this.getSF00302Data().mstData.mstCartonFlute, 0, this.getSF00302Data().product.laminationFlute, "short"));
            return math_util_1.default.checkNaN(lengthWidthSize / 1000 * heightWidthSize / 1000);
        }
        return 0;
    };
    SF003020201Helper.prototype.calcMaterialCostCarton = function () {
        var result = 0;
        if (this.getSF00302Data().productOutput.lot != 0) {
            result = math_util_1.default.checkNaN(math_util_1.default.checkNaN(this.getSF00302Data().product.laminationBackBasicWeight * this.getSF00302Data().product.laminationBackThroughWage / 1000)
                + math_util_1.default.checkNaN(this.getSF00302Data().product.laminationFrontBasicWeight * this.getSF00302Data().product.laminationFrontThroughWage / 1000));
            if (this.getSF00302Data().product.laminationFlute == 3) {
                result = result + math_util_1.default.checkNaN(this.getSF00302Data().product.laminationABasicWeight * this.getSF00302Data().product.laminationAThroughWage / 1000 * 1.5)
                    + math_util_1.default.checkNaN(this.getSF00302Data().product.laminationBBasicWeight * this.getSF00302Data().product.laminationBThroughWage / 1000 * 1.5);
            }
        }
        if (this.getSF00302Data().product.laminationFlute != 3) {
            result = math_util_1.default.checkNaN(result + math_util_1.default.checkNaN(this.getSF00302Data().product.laminationMediumBasicWeight * this.getSF00302Data().product.laminationMediumThroughWage / 1000 * 1.5));
        }
        else {
            result = math_util_1.default.checkNaN(result + math_util_1.default.checkNaN(this.getSF00302Data().product.laminationMediumBasicWeight * this.getSF00302Data().product.laminationMediumThroughWage / 1000));
        }
        return result;
    };
    SF003020201Helper.prototype.calcMaterialCostTotalCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.getSF00302Data().productOutput.cartonMaterialCost = math_util_1.default.checkNaN(_this.calcMaterialCostCarton() * _this.calcMaterialSizeCarton());
        });
        this.calcTotalCarton();
    };
    SF003020201Helper.prototype.calcMaterialLossCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            if (_this.getSF00302Data().product.laminationFlute != undefined && _this.getSF00302Data().product.laminationFlute != 0 && _this.getSF00302Data().product.cartonShippingType != undefined && _this.getSF00302Data().product.cartonShippingType != 0) {
                _this.getSF00302Data().productOutput.cartonMaterialLoss = math_util_1.default.checkNaN(_this.calcMaterialCostCarton() * (+data_util_1.default.getData(_this.getSF00302Data().mstData.mstCartonFlute, 0, _this.getSF00302Data().product.laminationFlute, _this.getSF00302Data().product.cartonShippingType, "loss")));
            }
        });
        this.calcMaterialUnitPriceCarton();
        this.calcTotalCarton();
    };
    SF003020201Helper.prototype.calcMaterialLaminationCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            if (_this.getSF00302Data().product.laminationFlute != undefined && _this.getSF00302Data().product.cartonShippingType != undefined && _this.getSF00302Data().product.cartonShippingType != 0 && _this.getSF00302Data().product.laminationFlute != 0) {
                _this.getSF00302Data().productOutput.cartonMaterialLamination = math_util_1.default.checkNaN(data_util_1.default.getData(_this.getSF00302Data().mstData.mstCartonFlute, 0, _this.getSF00302Data().product.laminationFlute, _this.getSF00302Data().product.cartonShippingType, "pasteWage"));
            }
        });
        this.calcMaterialUnitPriceCarton();
        this.calcTotalCarton();
    };
    SF003020201Helper.prototype.calcMaterialUnitPriceCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            if (_this.getSF00302Data().productOutput.lot != 0) {
                result = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.cartonMaterialCost + (_this.getSF00302Data().productOutput.cartonMaterialLoss + _this.getSF00302Data().productOutput.cartonMaterialLamination) * _this.calcMaterialSizeCarton());
            }
            _this.getSF00302Data().productOutput.cartonMaterialUnitPrice = result;
        });
        this.calcMaterialTotalCostCarton();
    };
    SF003020201Helper.prototype.calcMaterialTotalCostCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            if (_this.getSF00302Data().productOutput.lot != 0) {
                result = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.cartonMaterialUnitPrice * _this.getSF00302Data().productOutput.lot);
            }
            _this.getSF00302Data().productOutput.cartonMaterialTotalCost = result;
        });
    };
    /** @inheritDoc */
    SF003020201Helper.prototype.calcShipFareCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            if (_this.getSF00302Data().product.shippingCostId != undefined && _this.getSF00302Data().product.shippingCostId != 0) {
                var fluteType = 1;
                if (_this.getSF00302Data().product.laminationFlute == 3) {
                    fluteType = 3;
                }
                var distance = _this.getSF00302Data().product.shippingCostId;
                var factor = 1;
                if (!util_1.isNullOrUndefined(_this.sf00302Data.product.laminationFlute)) {
                    if (_this.sf00302Data.product.laminationFlute == 2) {
                        factor = 0.8;
                    }
                    else if (_this.sf00302Data.product.laminationFlute == 3) {
                        factor = 1.5;
                    }
                    else if (_this.sf00302Data.product.laminationFlute == 4) {
                        factor = 0.9;
                    }
                }
                _this.getSF00302Data().productOutput.cartonShipFare = math_util_1.default.checkNaN(data_util_1.default.getData(_this.getSF00302Data().mstData.mstCartonShipping, 0, fluteType, distance)) * factor;
            }
        });
        this.calcShipTotalCarton();
    };
    /**
     * @inheritDoc
     * @see SF003020202Helper#getAdditionalSipFareCarton 同じコード
     */
    SF003020201Helper.prototype.getAdditionalSipFareCarton = function () {
        var productOutput = this.getSF00302Data().productOutput;
        var product = this.getSF00302Data().product;
        var mm_v = product.blankPaperSizeH * product.blankPaperSizeW / 1e6;
        return ((mm_v * productOutput.lot) <= 500) ? 7 : 0;
    };
    /**
     * 運賃合計を計算する
     */
    SF003020201Helper.prototype.calcShipTotalCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var productOutput = _this.getSF00302Data().productOutput;
            var product = _this.getSF00302Data().product;
            if (productOutput.cartonShipFare != undefined) {
                var add_fare = _this.getAdditionalSipFareCarton(); // 割増運賃
                productOutput.cartonShipTotal = math_util_1.default.checkNaN((productOutput.cartonShipFare + add_fare) * _this.calcMaterialSizeCarton() * productOutput.lot);
            }
        });
        this.calcTotalCarton();
    };
    SF003020201Helper.prototype.calcUsageColorCostCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.getSF00302Data().productOutput.cartonUsageColorCost = math_util_1.default.checkNaN(data_util_1.default.getData(_this.getSF00302Data().mstData.mstColor, 0, _this.getSF00302Data().product.colorIdF - 1, "basicCost"));
        });
        this.calcProcessingUnitPriceCarton();
    };
    SF003020201Helper.prototype.calcTapeCutCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.getSF00302Data().productOutput.cartonTapeCut = math_util_1.default.checkNaN(_this.getSF00302Data().product.cartonTapeCutting / 1000 * 3);
        });
        this.calcProcessingUnitPriceCarton();
    };
    SF003020201Helper.prototype.calcLinerCutCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.getSF00302Data().productOutput.cartonLinerCut = math_util_1.default.checkNaN(_this.getSF00302Data().product.cartonLinerCutting * 12);
        });
        this.calcProcessingUnitPriceCarton();
    };
    SF003020201Helper.prototype.calcCartonHandProcessingCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            if (_this.getSF00302Data().product.handProcessingFlag == 1) {
                _this.getSF00302Data().productOutput.cartonHandProcessing = 1000;
            }
            else {
                _this.getSF00302Data().productOutput.cartonHandProcessing = 0;
            }
        });
        this.calcProcessingTotalCarton();
    };
    SF003020201Helper.prototype.calcWaterRepellentCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            if (_this.getSF00302Data().product.waterRepellentFlag == 0) {
                _this.getSF00302Data().productOutput.cartonWaterRepellent = 0;
            }
            else if (_this.getSF00302Data().product.waterRepellentFlag == 1 || _this.getSF00302Data().product.waterRepellentFlag == 2) {
                _this.getSF00302Data().productOutput.cartonWaterRepellent = 3;
            }
            else {
                _this.getSF00302Data().productOutput.cartonWaterRepellent = 6;
            }
        });
        this.calcProcessingUnitPriceCarton();
    };
    SF003020201Helper.prototype.calcProcessingUnitPriceCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.getSF00302Data().productOutput.cartonProcessingUnitPrice = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.cartonUsageColorCost + _this.getSF00302Data().productOutput.cartonTapeCut + _this.getSF00302Data().productOutput.cartonLinerCut + _this.getSF00302Data().productOutput.cartonWaterRepellent);
        });
        this.calcProcessingTotalCarton();
        this.calcTotalCarton();
    };
    SF003020201Helper.prototype.calcProcessingTotalCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.getSF00302Data().productOutput.cartonProcessingTotalCost = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.cartonProcessingUnitPrice * _this.getSF00302Data().productOutput.lot * _this.calcMaterialSizeCarton() + _this.getSF00302Data().productOutput.cartonHandProcessing);
        });
    };
    SF003020201Helper.prototype.calcUnitPriceCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.getSF00302Data().productOutput.estimatedUnitPrice = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.estimatedTotal / _this.getSF00302Data().productOutput.lot);
        });
    };
    SF003020201Helper.prototype.calcTotalCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var productOutput = _this.getSF00302Data().productOutput;
            // ロット単位で計算する項目: 材料代・加工代
            var unitPricePerLot = productOutput.cartonMaterialCost
                + (productOutput.cartonMaterialLoss + productOutput.cartonMaterialLamination) * _this.calcMaterialSizeCarton();
            // ロットとは別に計算する項目: 配送代、別加工代, その他, 特別費用
            var priceOthers = productOutput.cartonShipTotal // 配送代
                + productOutput.cartonProcessingTotalCost // 別加工代
                + _this.getProductOutputOtherFee1() // その他1
                + _this.getProductOutputOtherFee2() // その他2
                + _this.getProductOutputOtherFee3() // その他3
                + math_util_1.default.checkNaN(productOutput.cartonSpecialFare) // 特別運賃(助手手当など)
                + productOutput.cartonLotGap;
            // 見積金額
            var estimatedTotal = unitPricePerLot * productOutput.lot + priceOthers;
            productOutput.estimatedTotal = math_util_1.default.checkNaN(estimatedTotal);
        });
        this.calcUnitPriceCarton();
    };
    SF003020201Helper.prototype.calcEstimateDiffCarton = function (type) {
        var _this = this;
        if (this.getSF00302Data().product.shapeId != this.getSF00302Data().DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var estimatedDiff = 0;
                if (type == 1 && _this.getSF00302Data().product.shapeId != _this.getSF00302Data().DECORATIVE_ID) {
                    if (_this.getSF00302Data().indexOffer.total != 0) {
                        _this.getSF00302Data().indexOffer.profitRate = math_util_1.default.checkNaN(math_util_1.default.checkNaN(math_util_1.default.roundDecimal((_this.getSF00302Data().indexOffer.unitPrice - _this.getSF00302Data().productOutput.estimatedUnitPrice) / _this.getSF00302Data().productOutput.estimatedUnitPrice * 100, 2)));
                    }
                    else {
                        _this.getSF00302Data().indexOffer.profitRate = 0;
                    }
                }
            });
        }
    };
    SF003020201Helper.prototype.calculateAllOutput = function (doSth) {
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
    SF003020201Helper.prototype.getProductOutputOtherFee1 = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.product.otherUnitType1 == 1 ? this.sf00302Data.product.otherWage1 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage1);
    };
    SF003020201Helper.prototype.getProductOutputOtherFee2 = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.product.otherUnitType2 == 1 ? this.sf00302Data.product.otherWage2 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage2);
    };
    SF003020201Helper.prototype.getProductOutputOtherFee3 = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.product.otherUnitType3 == 1 ? this.sf00302Data.product.otherWage3 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage3);
    };
    SF003020201Helper.prototype.calcOtherFee = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.calcSubTotal();
            _this.calcTotalCarton();
            _this.getSF00302Data().productOutput.estimatedTotal = _this.getSF00302Data().productOutput.estimatedTotal + _this.getProductOutputOtherFee1();
            _this.getSF00302Data().productOutput.estimatedTotal = _this.getSF00302Data().productOutput.estimatedTotal + _this.getProductOutputOtherFee2();
            _this.getSF00302Data().productOutput.estimatedTotal = _this.getSF00302Data().productOutput.estimatedTotal + _this.getProductOutputOtherFee3();
            _this.calcTotalCarton();
        });
    };
    SF003020201Helper.prototype.calcSubTotal = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var firstSubtotal = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.laminationTotalCost + _this.getSF00302Data().productOutput.colorPrintTotalCostF + _this.getSF00302Data().productOutput.colorPrintTotalCostB +
                _this.getSF00302Data().productOutput.surfaceTreatmentTotalCostF + _this.getSF00302Data().productOutput.surfaceTreatmentTotalCostB +
                _this.getSF00302Data().productOutput.embossingTotalCost + _this.getSF00302Data().productOutput.dieCuttingTotalCost +
                _this.getSF00302Data().productOutput.stampingTotalCost + _this.getSF00302Data().productOutput.windowTotalCost + _this.getSF00302Data().productOutput.pasteTotalCost + _this.getProductOutputOtherFee1() + _this.getProductOutputOtherFee2() + +_this.getProductOutputOtherFee3());
            var subtotal = 0;
            subtotal = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.packing + firstSubtotal + _this.getSF00302Data().productOutput.inspection);
            _this.getSF00302Data().productOutput.subtotal = subtotal;
        });
        this.calcManagementCost();
        this.calcTotalCarton();
    };
    /**
     * Calculate for attributes: managementCost of product output
     */
    SF003020201Helper.prototype.calcManagementCost = function () {
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
    SF003020201Helper.prototype.calcEstimateDiff = function (type) {
        var _this = this;
        this.calculateAllOutput(function () {
            var estimatedDiff = 0;
            if (type == 1 && _this.getSF00302Data().product.shapeId == _this.getSF00302Data().DECORATIVE_ID) {
                if (_this.getSF00302Data().indexOffer.total != 0) {
                    _this.getSF00302Data().indexOffer.profitRate = math_util_1.default.checkNaN(math_util_1.default.roundDecimal((_this.getSF00302Data().indexOffer.unitPrice - _this.getSF00302Data().productOutput.estimatedUnitPrice) / _this.getSF00302Data().productOutput.estimatedUnitPrice * 100, 2));
                }
                else {
                    _this.getSF00302Data().indexOffer.profitRate = 0;
                }
            }
        });
    };
    SF003020201Helper.prototype.calcFlap = function (cartonType, flute, sizeD) {
        if (math_util_1.default.checkNaN(sizeD) == 0) {
            return 0;
        }
        if (cartonType == 2) {
            if (flute == 1) {
                return math_util_1.default.floorDecimal(math_util_1.default.checkNaN(sizeD / 2 + 2), 0);
            }
            else if (flute == 2 || flute == 4) {
                return math_util_1.default.floorDecimal(math_util_1.default.checkNaN(sizeD / 2 + 1.5), 0);
            }
            else if (flute == 3) {
                return math_util_1.default.floorDecimal(math_util_1.default.checkNaN(sizeD / 2 + 3), 0);
            }
            else {
                return 0;
            }
        }
    };
    SF003020201Helper.prototype.validateForm = function () {
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
        if (!!this.getSF00302Data().product.id) {
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
            if (this.getSF00302Data().product.laminationFlute == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveFlute = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveFlute = false;
            }
            // 製品寸法（mm)
            if (this.getSF00302Data().product.sizeW == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveSizeW = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveSizeW = false;
            }
            if (this.getSF00302Data().product.sizeD == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveSizeD = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveSizeD = false;
            }
            if (this.getSF00302Data().product.sizeH == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveSizeH = true;
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveSizeH = false;
            }
            // 裏ライナ（g/㎡）
            if (this.getSF00302Data().product.laminationPaperTypeFront == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeFront = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeFront = false;
            }
            if (this.getSF00302Data().product.laminationPaperTypeFront == 0) {
                if (this.getSF00302Data().product.laminationFrontBasicWeight == 0
                    || this.getSF00302Data().product.laminationFrontBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationFrontBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationFrontBasicWeight = false;
                }
            }
            else if (this.getSF00302Data().product.laminationPaperTypeFront == 99) {
                if (this.getSF00302Data().product.laminationFrontBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationFrontBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationFrontBasicWeight = false;
                }
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationFrontBasicWeight = false;
            }
            if (this.getSF00302Data().product.laminationPaperTypeFront == 99) {
                if (this.getSF00302Data().product.laminationFrontThroughWage == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationFrontThroughWage = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationFrontThroughWage = false;
                }
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationFrontThroughWage = false;
            }
            // 中芯（g/㎡）
            if (this.getSF00302Data().product.laminationPaperTypeMedium == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeMedium = true;
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeMedium = false;
            }
            if (this.getSF00302Data().product.laminationPaperTypeMedium == 0) {
                if (this.getSF00302Data().product.laminationMediumBasicWeight == 0
                    || this.getSF00302Data().product.laminationMediumBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            }
            else if (this.getSF00302Data().product.laminationPaperTypeMedium == 99) {
                if (this.getSF00302Data().product.laminationMediumBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = false;
            }
            if (this.getSF00302Data().product.laminationPaperTypeMedium == 99) {
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
            // 裏ライナ（g/㎡）
            if (this.getSF00302Data().product.laminationPaperTypeBack == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeBack = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeBack = false;
            }
            if (this.getSF00302Data().product.laminationPaperTypeBack == 0) {
                if (this.getSF00302Data().product.laminationBackBasicWeight == 0
                    || this.getSF00302Data().product.laminationBackBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            }
            else if (this.getSF00302Data().product.laminationPaperTypeBack == 99) {
                if (this.getSF00302Data().product.laminationBackBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackBasicWeight = false;
                }
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationBackBasicWeight = false;
            }
            if (this.getSF00302Data().product.laminationPaperTypeBack == 99) {
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
            //取数
            if (format_util_1.FormatUtil.isNaN(this.getSF00302Data().product.takenNumber) == 0) {
                this.getSF00302Data().productRequiredItem.isSaveTakenNumber = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveTakenNumber = false;
            }
        }
        if (this.checkProcessCase()) {
            this.getSF00302Data().productRequiredItem.isSaveFlute = false;
        }
        return isValidate;
    };
    SF003020201Helper.prototype.checkProcessCase = function () {
        var createDate = this.getSF00302Data().product.createdDate;
        var updateDate = this.getSF00302Data().product.updatedDate;
        if (createDate != undefined
            && updateDate != undefined
            && createDate.getTime() == updateDate.getTime()) {
            return true;
        }
        else {
            return false;
        }
    };
    /** @return 見積金額単価 (円/㎡) */
    SF003020201Helper.prototype.calcEstimatedM2PriceCarton = function () {
        //return MathUtil.checkNaN(MathUtil.roundDecimal(this.getSF00302Data().productOutput.estimatedTotal,2) / this.calcMaterialSizeCarton());
        return math_util_1.default.checkNaN(this.getSF00302Data().productOutput.estimatedTotal / this.calcMaterialSizeCarton() / this.getSF00302Data().productOutput.lot);
    };
    // check data on change in product info area - follow 3057
    SF003020201Helper.prototype.checkChangeDataProduct = function () {
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
            else if (!this.isEquals(currentProduct.laminationFlute, oldProduct.laminationFlute)) {
                // フルート
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.takenNumber, oldProduct.takenNumber)) {
                // 取数
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.cartonShippingType, oldProduct.cartonShippingType)) {
                // 製品寸法
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
            else if (!this.isEquals(currentProduct.sizeW, oldProduct.sizeW)) {
                // 製品寸法 - sizeW
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.upperFlap, oldProduct.upperFlap)) {
                // 上フラップ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.lowerFlap, oldProduct.lowerFlap)) {
                // 上フラップ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.blankPaperSizeW, oldProduct.blankPaperSizeW)) {
                // 上フラップ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.blankPaperSizeH, oldProduct.blankPaperSizeH)) {
                // 下フラップ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationFrontId, oldProduct.laminationFrontId)) {
                // 表ライナー
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationFrontBasicWeight, oldProduct.laminationFrontBasicWeight)) {
                // 表ライナー
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationFrontThroughWage, oldProduct.laminationFrontThroughWage)) {
                //  表ライナー
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationBId, oldProduct.laminationBId)) {
                //  原紙サイズ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationBBasicWeight, oldProduct.laminationBBasicWeight)) {
                //  原紙サイズ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationBThroughWage, oldProduct.laminationBThroughWage)) {
                //  断裁サイズ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationAId, oldProduct.laminationAId)) {
                //  断裁サイズ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationABasicWeight, oldProduct.laminationABasicWeight)) {
                //  取数
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationAThroughWage, oldProduct.laminationAThroughWage)) {
                //  取数
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationMediumId, oldProduct.laminationMediumId)) {
                //  断裁サイズ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationMediumBasicWeight, oldProduct.laminationMediumBasicWeight)) {
                //  取数
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationMediumThroughWage, oldProduct.laminationMediumThroughWage)) {
                //  取数
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationBackId, oldProduct.laminationBackId)) {
                //  断裁サイズ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationBackBasicWeight, oldProduct.laminationBackBasicWeight)) {
                //  取数
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationBackThroughWage, oldProduct.laminationBackThroughWage)) {
                //  面付数
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.bindingMethod, oldProduct.bindingMethod)) {
                //  結束
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.bindingNumber, oldProduct.bindingNumber)) {
                //  結束
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.stringColor, oldProduct.stringColor)) {
                //  ヒモ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.stringNumber, oldProduct.stringNumber)) {
                //  ヒモ
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.packingId, oldProduct.packingId)) {
                //  梱包方法
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.shippingCostId, oldProduct.shippingCostId)) {
                //  納入先距離
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.colorIdF, oldProduct.colorIdF)) {
                // 色数
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
            else if (!this.isEquals(currentProduct.cartonTapeCutting, oldProduct.cartonTapeCutting)) {
                //  テープカット
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.cartonLinerCutting, oldProduct.cartonLinerCutting)) {
                //  ライナーカット(㎡)
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.handProcessingFlag, oldProduct.handProcessingFlag)) {
                //  手穴加工
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.handPosition, oldProduct.handPosition)) {
                //  手穴位置
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.handType, oldProduct.handType)) {
                //  形状
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.handSize, oldProduct.handSize)) {
                //  寸法
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.waterRepellentFlag, oldProduct.waterRepellentFlag)) {
                //  撥水加工
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.otherMethod1, oldProduct.otherMethod1)) {
                //  その地
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.otherMethod2, oldProduct.otherMethod2)) {
                //  その地
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
            else if (!this.isEquals(currentProduct.requiredAdditionalWork, oldProduct.requiredAdditionalWork)) {
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
    SF003020201Helper.prototype.checkChangeDataProductOutput = function () {
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
    SF003020201Helper.prototype.checkChangeDataOffer = function () {
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
    SF003020201Helper.prototype.isEquals = function (a, b) {
        return Object.is(a, b);
    };
    /** @inheritDoc */
    SF003020201Helper.prototype.calcCartonLotGap = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            // ロット格差 ・・・ 300枚未満は準備費(3000円一律)を見積もりに含める
            var lotGap = 0;
            var productOutput = _this.sf00302Data.productOutput;
            var product = _this.sf00302Data.product;
            if (productOutput.lot != 0 && math_util_1.default.checkNaN(productOutput.lot) < 300) {
                lotGap = 3000;
            }
            _this.sf00302Data.productOutput.cartonLotGap = lotGap;
        });
        this.calcTotalCarton();
    };
    return SF003020201Helper;
}());
exports.SF003020201Helper = SF003020201Helper;
//# sourceMappingURL=SF003020201.helper.js.map