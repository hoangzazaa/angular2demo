"use strict";
var math_util_1 = require("../../../../../../util/math-util");
var data_util_1 = require("../../../../../../util/data-util");
var format_util_1 = require("../../../../../../util/format-util");
/**
 * TOP &gt; 案件概況 &gt; 製品情報 (美粧) のヘルパー
 *
 * Created by VuPT on 5/10/2017.
 */
var SF003020102Helper = (function () {
    function SF003020102Helper() {
    }
    Object.defineProperty(SF003020102Helper.prototype, "hasLotValue", {
        get: function () {
            return (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020102Helper.prototype, "isLaminationSelected", {
        get: function () {
            return (this.getSF00302Data().product.laminationFlute != 1 && this.getSF00302Data().product.laminationFlute != 0);
        },
        enumerable: true,
        configurable: true
    });
    // 原紙代単価
    SF003020102Helper.prototype.calcPaperUnitPrice = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var paperUnitPrice = 0;
            var productOutput = _this.getSF00302Data().productOutput;
            var product = _this.getSF00302Data().product;
            if (_this.hasLotValue && _this.isLaminationSelected) {
                // laminationFlute: 1: "なし", 2: "EF", 3: "BF", 4: "GF"
                var fluteFactor = 1.3; //EF
                if (product.laminationFlute == 3)
                    fluteFactor = 1.4; //BF
                else if (product.laminationFlute == 4)
                    fluteFactor = 1.2; //GF
                paperUnitPrice = _this.productLaminationFrontThroughWage * _this.productLaminationFrontBasicWeight / 1000
                    + _this.productLaminationMediumThroughWage * _this.productLaminationMediumBasicWeight / 1000 * fluteFactor
                    + _this.productLaminationBackThroughWage * _this.productLaminationBackBasicWeight / 1000;
            }
            productOutput.paperUnitPrice = paperUnitPrice;
            _this.calcPaperTotalCost();
            _this.calcLaminationUnitPrice();
        });
    };
    // ㎡数（紙巾÷取数ｘシート流れ）
    SF003020102Helper.prototype.calcLaminationSize = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0, productOutput = _this.getSF00302Data().productOutput, product = _this.getSF00302Data().product;
            if (_this.hasLotValue && _this.isLaminationSelected && product.paperSizeW && product.takenNumber && product.cutPaperSizeH) {
                // (D10/1000/D17)*D12/1000
                result = math_util_1.default.checkNaN((product.paperSizeW / 1000 / product.takenNumber) * product.cutPaperSizeH / 1000);
            }
            productOutput.laminationSize = result;
            _this.calcLaminationUnitPrice();
            _this.calcPaperTotalCost();
        });
    };
    // 原紙代合計
    SF003020102Helper.prototype.calcPaperTotalCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var res = 0;
            var productOutput = _this.getSF00302Data().productOutput;
            var product = _this.getSF00302Data().product;
            if (_this.hasLotValue && _this.isLaminationSelected) {
                res = productOutput.paperUnitPrice * productOutput.laminationSize * _this.throughNumber;
            }
            productOutput.paperTotalCost = res;
            _this.calcColorPrintLoss(1);
            _this.calcSubTotal();
        });
    };
    // シート代(@シート）
    SF003020102Helper.prototype.calcLaminationUnitPrice = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0, productOutput = _this.getSF00302Data().productOutput, product = _this.getSF00302Data().product;
            if (_this.hasLotValue) {
                result = productOutput.paperUnitPrice * productOutput.laminationSize;
            }
            productOutput.laminationUnitPrice = result;
            _this.calcLaminationTotalCost();
        });
    };
    Object.defineProperty(SF003020102Helper.prototype, "laminationWage", {
        // 貼合工賃
        // productOutputに値がないのでgetterで定義
        get: function () {
            var ls = this.getSF00302Data().productOutput.laminationSize || 0;
            return 15 * ls * this.throughNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020102Helper.prototype, "laminationLoss", {
        // 貼合ロス
        // productOutputに値がないのでgetterで定義
        get: function () {
            var ptc = this.getSF00302Data().productOutput.paperTotalCost || 0;
            return 0.05 * ptc;
        },
        enumerable: true,
        configurable: true
    });
    // 貼合代
    SF003020102Helper.prototype.calcLaminationTotalCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var laminationTotalCost = 0, productOutput = _this.getSF00302Data().productOutput, product = _this.getSF00302Data().product;
            if (_this.hasLotValue) {
                laminationTotalCost = _this.laminationWage + _this.laminationLoss;
            }
            productOutput.laminationTotalCost = laminationTotalCost;
            _this.calcColorPrintLoss(1);
            _this.calcPasteLoss();
            _this.calcDieCuttingLoss();
            _this.calcPacking();
            _this.calcSubTotal();
        });
    };
    /**
     * 印刷費 基本美粧では表のみの想定する
     * @param {number} id: define calculate front or back color
     */
    SF003020102Helper.prototype.calcColorBasicCost = function (id) {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0, condition = 0, product = _this.sf00302Data.product, productOutput = _this.sf00302Data.productOutput;
            if (_this.hasLotValue && _this.getSF00302Data().mstData != undefined) {
                var range = Object.keys(data_util_1.default.getData(_this.getSF00302Data().mstData.mstColorFlexo, 0, 1));
                var condition_key = range[0];
                var throughNumber = _this.throughNumber;
                var modeVariable = false;
                // データの持ち方が微妙。
                // range値の末尾が"1"のときには、以上のものを対象。それ以外については以下のものを対象とする
                range.some(function (v) {
                    if (v.match(/1$/)) {
                        // v以上
                        if (throughNumber >= Number(v)) {
                            modeVariable = true;
                            condition_key = v;
                        }
                    }
                    else {
                        // v以下
                        if (throughNumber <= Number(v)) {
                            modeVariable = false;
                            condition_key = v;
                            return true;
                        }
                    }
                    return false;
                });
                condition = product.colorIdF;
                if (product.surfaceTreatmentIdF != 8 && product.surfaceTreatmentIdF != 9) {
                    condition = product.colorIdF - 1;
                }
                var key = (modeVariable) ? 'throughWage' : 'basicCost';
                result = data_util_1.default.getData(_this.getSF00302Data().mstData.mstColorFlexo, 0, condition, Number(condition_key), key);
                if (modeVariable) {
                    result = result * throughNumber;
                }
            }
            _this.getSF00302Data().productOutput.colorPrintBasicCostF = result;
        });
        this.calcColorTotalCost(id);
    };
    /**
     * 印刷ロス代 基本美粧では表のみの想定する
     * @param {number} id: define calculate front or back color
     * @param {number} this.calcThroughNumber(): value of through number of current product output
     */
    SF003020102Helper.prototype.calcColorPrintLoss = function (id) {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            var productOutput = _this.sf00302Data.productOutput;
            if (_this.hasLotValue) {
                var colorNumber = _this.sf00302Data.product.colorIdF - 1;
                if (colorNumber > 0) {
                    var materialCost = (productOutput.paperTotalCost + productOutput.laminationTotalCost) / _this.throughNumber;
                    if (_this.throughNumber >= 1000) {
                        var rate = 0.02;
                        if (_this.throughNumber >= 5000)
                            rate = 0.005;
                        result = rate * materialCost * colorNumber * _this.throughNumber;
                    }
                    else {
                        result = 20 * materialCost * colorNumber;
                    }
                }
                result = math_util_1.default.checkNaN(math_util_1.default.round(result, 2));
            }
            _this.sf00302Data.productOutput.colorPrintLossF = result;
        });
        this.calcColorTotalCost(id);
    };
    /**
     * 割増/割引工賃 基本美粧では表のみの想定する
     * @param {number} id: define calculate front or back color
     */
    SF003020102Helper.prototype.calcColorSpecial = function (id) {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0, productOutput = _this.sf00302Data.productOutput;
            if (_this.hasLotValue) {
                if (productOutput.laminationSize >= 0.8) {
                    result = productOutput.colorPrintBasicCostF * 0.2;
                }
                else if (productOutput.laminationSize <= 0.4) {
                    result = -1 * productOutput.colorPrintBasicCostF * 0.1;
                }
            }
            productOutput.colorPrintSpecialCostF = math_util_1.default.checkNaN(math_util_1.default.round(result, 2));
        });
        this.calcColorTotalCost(id);
    };
    /**
     * 印刷合計 基本美粧では表のみの想定する
     * @param {number} id: define calculate front or back color
     * @param {number} this.calcThroughNumber(): value of through number of current product output
     */
    SF003020102Helper.prototype.calcColorTotalCost = function (id) {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0, productOutput = _this.sf00302Data.productOutput, product = _this.sf00302Data.product;
            if (_this.hasLotValue) {
                result = productOutput.colorPrintBasicCostF + productOutput.colorPrintLossF + productOutput.colorPrintSpecialCostF;
            }
            _this.getSF00302Data().productOutput.colorPrintTotalCostF = math_util_1.default.checkNaN(math_util_1.default.round(result, 2));
        });
        this.calcDieCuttingLoss();
        this.calcSubTotal();
    };
    /**
     * 窓貼り加工 材料代
     */
    SF003020102Helper.prototype.calcWindowMaterialFee = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            if (_this.hasLotValue && _this.sf00302Data.product.windowSizeW != 0 && _this.sf00302Data.product.windowSizeW != undefined) {
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
    };
    /**
     * 窓貼り加工 合計
     */
    SF003020102Helper.prototype.calcWindowTotalCost = function () {
        var _this = this;
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
    };
    /**
     * 打抜ロス
     */
    SF003020102Helper.prototype.calcDieCuttingLoss = function () {
        var _this = this;
        // 通し数フラグ生成
        var number = 1;
        if (this.throughNumber <= 1000) {
            number = 2;
        }
        // 通し数が1001以上の場合はロスの値を計算
        if (number == 1) {
            this.calculateAllOutput(function () {
                var result = 0, productOutput = _this.getSF00302Data().productOutput, product = _this.getSF00302Data().product;
                if (_this.hasLotValue && product.dieCuttingFlag == 1 && product.dieCuttingThroughNumber != 0) {
                    result = math_util_1.default.checkNaN((productOutput.paperTotalCost
                        + productOutput.laminationTotalCost
                        + productOutput.colorPrintTotalCostF
                        + productOutput.surfaceTreatmentTotalCostF
                        + productOutput.surfaceTreatmentTotalCostB
                        + productOutput.embossingTotalCost) * 0.01);
                }
                productOutput.dieCuttingLoss = result;
            });
        }
        else {
            this.getSF00302Data().productOutput.dieCuttingLoss = 0;
        }
        this.calcDieCuttingTotalCost();
    };
    /**
     * 打抜き 基本料 (通し数が1000以下の場合は一律料金)
     */
    SF003020102Helper.prototype.calcDieCuttingBasicCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            var size = 1;
            if (_this.getSF00302Data().product.dieCuttingFlag == 1) {
                if (_this.hasLotValue) {
                    var condition = _this.getSF00302Data().product.cutPaperSizeH * _this.getSF00302Data().product.cutPaperSizeW;
                    if (condition < 309000) {
                        size = 3;
                    }
                    else if (condition <= 617500) {
                        size = 2;
                    }
                }
                var number = 1;
                if (_this.getSF00302Data().productOutput.lot / _this.getSF00302Data().product.dieCuttingThroughNumber <= 1000) {
                    number = 2;
                }
                if (_this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().product.dieCuttingThroughNumber != 0 && _this.getSF00302Data().mstData != undefined) {
                    result = data_util_1.default.getData(_this.getSF00302Data().mstData.mstDieCutting, 0, _this.getSF00302Data().product.laminationFlute, size, _this.getSF00302Data().product.dieCuttingThroughNumber, number, "basicCost");
                }
            }
            _this.getSF00302Data().productOutput.dieCuttingBasicCost = result;
        });
        this.calcDieCuttingTotalCost();
    };
    /**
     * 打抜き 通工賃
     */
    SF003020102Helper.prototype.calcDieCuttingThroughWage = function () {
        var _this = this;
        var number = 1;
        if (this.getSF00302Data().productOutput.lot / this.getSF00302Data().product.dieCuttingThroughNumber <= 1000) {
            number = 2;
        }
        // 通し数1001以上の場合は通工賃を使用するため値を計算
        if (number == 1) {
            this.calculateAllOutput(function () {
                var result = 0;
                var size = 1;
                if (_this.getSF00302Data().product.dieCuttingFlag == 1) {
                    if (_this.hasLotValue) {
                        var condition = _this.getSF00302Data().product.cutPaperSizeH * _this.getSF00302Data().product.cutPaperSizeW;
                        if (condition < 309000) {
                            size = 3;
                        }
                        else if (condition <= 617500) {
                            size = 2;
                        }
                    }
                    if (_this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().product.dieCuttingThroughNumber != 0 && _this.getSF00302Data().mstData != undefined) {
                        result = data_util_1.default.getData(_this.getSF00302Data().mstData.mstDieCutting, 0, _this.getSF00302Data().product.laminationFlute, size, _this.getSF00302Data().product.dieCuttingThroughNumber, number, "throughWage");
                    }
                }
            });
        }
        else {
            this.getSF00302Data().productOutput.dieCuttingThroughWage = 0;
        }
        this.calcDieCuttingTotalCost();
    };
    /**
     * 打抜き 打抜代計
     */
    SF003020102Helper.prototype.calcDieCuttingTotalCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            if (_this.hasLotValue && _this.getSF00302Data().product.dieCuttingThroughNumber != 0) {
                result = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.dieCuttingLoss + _this.getSF00302Data().productOutput.dieCuttingBasicCost + _this.getSF00302Data().productOutput.dieCuttingThroughWage * _this.throughNumber);
            }
            _this.getSF00302Data().productOutput.dieCuttingTotalCost = math_util_1.default.roundDecimal(result, 0);
        });
        this.calcPasteLoss();
        this.calcSubTotal();
    };
    /**
     * 貼りロスを計算する
     */
    SF003020102Helper.prototype.calcPasteLoss = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var pasteLoss = 0, productOutput = _this.getSF00302Data().productOutput, product = _this.getSF00302Data().product;
            if (_this.hasLotValue && product.laminationFlute != 1 && product.pasteId) {
                pasteLoss = math_util_1.default.checkNaN((productOutput.paperTotalCost // 材料合計
                    + productOutput.laminationTotalCost // 貼合合計
                    + productOutput.colorPrintTotalCostF // 印刷合計
                    + productOutput.surfaceTreatmentTotalCostF // 美粧では常に 0
                    + productOutput.surfaceTreatmentTotalCostB // 美粧では常に 0
                    + productOutput.embossingTotalCost // 美粧では常に 0
                    + productOutput.dieCuttingTotalCost // 打抜代合計
                ) * 0.01);
            }
            _this.getSF00302Data().productOutput.pasteLoss = pasteLoss;
            _this.calcPasteTotalCost();
        });
    };
    /**
     * 貼基本料
     */
    SF003020102Helper.prototype.calcPasteBasicCost = function () {
        var _this = this;
        if (this.sf00302Data.product.shapeId == this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(function () {
                var big = 0;
                if (_this.sf00302Data.product.blankPaperSizeH > _this.sf00302Data.product.blankPaperSizeW) {
                    big = _this.sf00302Data.product.blankPaperSizeH;
                }
                else {
                    big = _this.sf00302Data.product.blankPaperSizeW;
                }
                var result = 0;
                if (_this.hasLotValue && _this.sf00302Data.product.pasteId != 0 && _this.sf00302Data.mstData != undefined) {
                    result = data_util_1.default.getData(_this.sf00302Data.mstData.mstPaste, 0, _this.sf00302Data.product.laminationFlute, _this.sf00302Data.product.pasteId, math_util_1.default.checkNaN(math_util_1.default.ceilDecimal(big * 2, -2) / 2).toString(), "basicCost");
                    var tmp = 0;
                    if (_this.throughNumber <= 1000) {
                        tmp += result * 0.3;
                    }
                    if (_this.sf00302Data.product.pasteSpecialFormFlag == 1) {
                        tmp += result * 0.2;
                    }
                    result += tmp;
                }
                _this.sf00302Data.productOutput.pasteBasicCost = math_util_1.default.checkNaN(result);
            });
            this.calcPasteTotalCost();
        }
    };
    // 貼工賃
    SF003020102Helper.prototype.calcPasteThroughWage = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var pasteThroughWage = 0, productOutput = _this.getSF00302Data().productOutput, product = _this.getSF00302Data().product;
            if (_this.hasLotValue && _this.isLaminationSelected && _this.sf00302Data.mstData != undefined) {
                var size = Math.max(math_util_1.default.checkNaN(product.blankPaperSizeH), math_util_1.default.checkNaN(product.blankPaperSizeW));
                pasteThroughWage = data_util_1.default.getData(_this.sf00302Data.mstData.mstPaste, 0, product.laminationFlute, _this.sf00302Data.product.pasteId, (math_util_1.default.ceilDecimal(size * 2, -2) / 2).toString(), "throughWage");
                var tmp = 0;
                if (_this.throughNumber <= 1000) {
                    tmp += pasteThroughWage * 0.3;
                }
                if (product.pasteSpecialFormFlag == 1) {
                    tmp += pasteThroughWage * 0.2;
                }
                pasteThroughWage += tmp;
            }
            productOutput.pasteThroughWage = pasteThroughWage;
            _this.calcPasteTotalCost();
        });
    };
    // 貼合計
    SF003020102Helper.prototype.calcPasteTotalCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var pasteTotalCost = 0, productOutput = _this.getSF00302Data().productOutput, product = _this.getSF00302Data().product;
            if (_this.hasLotValue) {
                pasteTotalCost = productOutput.pasteLoss + productOutput.pasteBasicCost + productOutput.pasteThroughWage * _this.throughNumber;
            }
            productOutput.pasteTotalCost = pasteTotalCost;
            _this.calcSubTotal();
        });
    };
    /**
     * 梱包
     */
    SF003020102Helper.prototype.calcPacking = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var productOutput = _this.getSF00302Data().productOutput, product = _this.getSF00302Data().product;
            // INDEX(建値!$G$88:$I$96,MATCH(テストケース!D40,建値!$G$88:$G$96,0),IF(D5 >= 1001, 2, 3))
            if (_this.sf00302Data.mstData != undefined) {
                var lot = 2;
                if (_this.throughNumber > 1000)
                    lot = 1;
                // マスターmstPackingにそんざいするようであるが、
                // this.sf00302Data.mstData.mstPacking, 0, product.packingId, lot, "percent"
                var firstSubtotal = productOutput.paperTotalCost
                    + productOutput.laminationTotalCost
                    + productOutput.colorPrintTotalCostF
                    + productOutput.surfaceTreatmentTotalCostF
                    + productOutput.surfaceTreatmentTotalCostB
                    + productOutput.embossingTotalCost
                    + productOutput.dieCuttingTotalCost
                    + productOutput.stampingTotalCost
                    + productOutput.windowTotalCost
                    + _this.getProductOutputOtherFee1()
                    + _this.getProductOutputOtherFee2()
                    + _this.getProductOutputOtherFee3()
                    + productOutput.pasteTotalCost;
                var rate = data_util_1.default.getData(_this.sf00302Data.mstData.mstPacking, 0, product.packingId, lot, "percent");
                var packing = math_util_1.default.checkNaN(rate * firstSubtotal);
                productOutput.packing = packing;
            }
        });
        this.calcSubTotal();
        this.calcEstimateTotal();
    };
    /**
     * 運賃
     * 紙器と同一内容
     */
    SF003020102Helper.prototype.calcShippingCost = function () {
        var _this = this;
        var options = [10, 20, 30, 40, 60, 80, 100, 120, 140, 160, 180, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
        this.sf00302Data.checkOverWeight = false;
        this.calculateAllOutput(function () {
            var productOutput = _this.getSF00302Data().productOutput, product = _this.getSF00302Data().product;
            var weight = Math.ceil((product.blankPaperSizeH * product.blankPaperSizeW * product.paperWeight * productOutput.lot / 1000 / 1000 / 1000 + 1) / 10) * 10;
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
            if (product.factoryId == 1) {
                // Saga factory
                // EF / GF / BFしか想定しない
                var size = (product.blankPaperSizeW * product.blankPaperSizeH) / 1e6; // ㎜ to ㎡
                var cost_base = size * productOutput.lot * _this.shippingEfCostPoint(product.laminationFlute);
                var max_capacity = 4500;
                if (size < max_capacity && +product.shippingCostId > 0 && +product.shippingCostId < 150) {
                    productOutput.fareLineService = cost_base * 10;
                }
                else if (size < max_capacity && +product.shippingCostId >= 150) {
                    var condition = Math.min(+product.shippingCostId, 450);
                    productOutput.fareLineService = cost_base * data_util_1.default.getData(_this.sf00302Data.mstData.mstShippingCost, 0, 0, condition, 4000, "cost");
                }
            }
            else {
                var distanceOptions = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
                var distance = product.shippingCostId;
                if (distance == 0) {
                    productOutput.fareLineService = 0;
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
                    productOutput.fareLineService = math_util_1.default.checkNaN(data_util_1.default.getData(_this.sf00302Data.mstData.mstShippingCost, 0, 1, distance, weight, "cost"));
                }
            }
            if (product.blankPaperSizeH * product.blankPaperSizeW * product.paperWeight * productOutput.lot / 1000 / 1000 / 1000 > 4500) {
                _this.sf00302Data.checkOverWeight = true;
            }
            _this.calcSubTotal();
        });
    };
    SF003020102Helper.prototype.shippingEfCostPoint = function (laminationFluteValue) {
        if (laminationFluteValue == 3)
            return 0.9; //BF
        // Maybe EF or GF
        return 0.6;
    };
    SF003020102Helper.prototype.calccartonMaterialLoss = function () {
    };
    SF003020102Helper.prototype.calcDigitalBasicCost = function () {
    };
    SF003020102Helper.prototype.calcDigitalThroughWage = function () {
    };
    SF003020102Helper.prototype.calcMoldFee = function () {
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
    SF003020102Helper.prototype.calcDieCuttingWeight = function () {
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
    SF003020102Helper.prototype.calcSubmittedTotal = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var submittedTotal = 0;
            if (_this.sf00302Data.indexOffer.unitPrice != 0) {
                submittedTotal = math_util_1.default.checkNaN(_this.sf00302Data.indexOffer.unitPrice * _this.sf00302Data.productOutput.lot);
            }
            _this.sf00302Data.indexOffer.total = submittedTotal;
        });
    };
    SF003020102Helper.prototype.getOtherFeeTotalCost = function () {
        return (+this.getProductOutputOtherFee1()) + (+this.getProductOutputOtherFee2()) + (+this.getProductOutputOtherFee3());
    };
    SF003020102Helper.prototype.getColorPrintTotalCost = function () {
        if (this.sf00302Data.product.printMethod != 3) {
            return math_util_1.default.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostF) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostB);
        }
        else {
            return math_util_1.default.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostF);
        }
    };
    SF003020102Helper.prototype.getSurfaceTreatmentTotalCost = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.productOutput.surfaceTreatmentTotalCostF) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.surfaceTreatmentTotalCostB) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.embossingTotalCost);
    };
    SF003020102Helper.prototype.getInspectionPackingFareLineTotalCost = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.productOutput.inspection) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.packing) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.fareLineService);
    };
    SF003020102Helper.prototype.getDieCuttingPasteTotalCost = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.productOutput.dieCuttingTotalCost) + math_util_1.default.checkNaN(this.sf00302Data.productOutput.pasteTotalCost);
    };
    SF003020102Helper.prototype.getSF00302Data = function () {
        return this.sf00302Data;
    };
    /**
     * Calculate for attributes: normValue of product output
     */
    SF003020102Helper.prototype.calcNormValue = function (type) {
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
    Object.defineProperty(SF003020102Helper.prototype, "throughNumber", {
        /**
         * 通し数 (lot / 打ち抜き面付け数)
         */
        get: function () {
            var n;
            if (this.sf00302Data.product.dieCuttingFlag == 1) {
                n = this.sf00302Data.product.dieCuttingThroughNumber;
            }
            else {
                n = 1;
            }
            if (!this.sf00302Data.productOutput.lot)
                return 0;
            return math_util_1.default.checkNaN(math_util_1.default.ceilDecimal(this.sf00302Data.productOutput.lot / n, 0));
        },
        enumerable: true,
        configurable: true
    });
    SF003020102Helper.prototype.calcThroughNumber = function () {
        return this.throughNumber;
    };
    SF003020102Helper.prototype.calculateAllOutput = function (doSth) {
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
    /**
     * Calculate for attributes: colorPlateCost of product output
     * @param {number} id: define calculate front or back color
     */
    SF003020102Helper.prototype.calcColorPlateCost = function (id) {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0) {
                if (id == 1 && _this.sf00302Data.product.colorIdF > 1) {
                    if (_this.sf00302Data.product.surfaceTreatmentIdF != 8) {
                        result = (_this.sf00302Data.product.colorIdF - 1) * 3000;
                    }
                    else {
                        result = _this.sf00302Data.product.colorIdF * 3000;
                    }
                }
                else if (id == 2 && _this.sf00302Data.product.colorIdB > 1) {
                    if (_this.sf00302Data.product.surfaceTreatmentIdB != 8) {
                        result = (_this.sf00302Data.product.colorIdB - 1) * 3000;
                    }
                    else {
                        result = _this.sf00302Data.product.colorIdB * 3000;
                    }
                }
            }
            result = math_util_1.default.checkNaN(result);
            if (id == 1) {
                _this.getSF00302Data().productOutput.colorPlateCostF = result;
            }
            else {
                _this.getSF00302Data().productOutput.colorPlateCostB = result;
            }
        });
        this.calcColorTotalCost(id);
    };
    /**
     * Calculate for attributes: colorThroughWage of product output
     * @param {number} id: define calculate front or back color
     */
    SF003020102Helper.prototype.calcColorThroughWage = function (id) {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            var condition = 0;
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0 && _this.getSF00302Data().mstData != undefined) {
                if (_this.getSF00302Data().product.printMethod != 3) {
                    if (id == 1 && _this.getSF00302Data().product.colorIdF != 0 && _this.getSF00302Data().product.colorIdF > 1) {
                        condition = _this.sf00302Data.product.colorIdF;
                        if (!(_this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 9)) {
                            condition = _this.sf00302Data.product.colorIdF - 1;
                        }
                        if (_this.getSF00302Data().product.colorIdF == 1 && _this.getSF00302Data().product.colorIdB == 1) {
                            condition = 0;
                        }
                        else if ((_this.getSF00302Data().product.colorIdF == 1 && _this.getSF00302Data().product.colorIdB == 9) || (_this.getSF00302Data().product.colorIdF == 9 && _this.getSF00302Data().product.colorIdB == 1)) {
                            condition = 8;
                        }
                        else if ((_this.getSF00302Data().product.colorIdF == 1 && _this.getSF00302Data().product.colorIdB == 10) || (_this.getSF00302Data().product.colorIdF == 10 && _this.getSF00302Data().product.colorIdB == 1)) {
                            condition = 9;
                        }
                        else if (_this.getSF00302Data().product.colorIdF == 9 && _this.getSF00302Data().product.colorIdB == 9) {
                            condition = 10;
                        }
                        else if ((_this.getSF00302Data().product.colorIdF == 10 && _this.getSF00302Data().product.colorIdB == 9) || (_this.getSF00302Data().product.colorIdF == 9 && _this.getSF00302Data().product.colorIdB == 10)) {
                            condition = 11;
                        }
                        else if (_this.getSF00302Data().product.colorIdF == 10 && _this.getSF00302Data().product.colorIdB == 10) {
                            condition = 12;
                        }
                        else if ((_this.getSF00302Data().product.colorIdF == 1 && _this.getSF00302Data().product.colorIdB == 11) || (_this.getSF00302Data().product.colorIdF == 11 && _this.getSF00302Data().product.colorIdB == 1)) {
                            condition = 13;
                        }
                        else if ((_this.getSF00302Data().product.colorIdF == 11 && _this.getSF00302Data().product.colorIdB == 9) || (_this.getSF00302Data().product.colorIdF == 9 && _this.getSF00302Data().product.colorIdB == 11)) {
                            condition = 14;
                        }
                        else if ((_this.getSF00302Data().product.colorIdF == 11 && _this.getSF00302Data().product.colorIdB == 10) || (_this.getSF00302Data().product.colorIdF == 10 && _this.getSF00302Data().product.colorIdB == 11)) {
                            condition = 15;
                        }
                        else if ((_this.getSF00302Data().product.colorIdF == 11 && _this.getSF00302Data().product.colorIdB == 11) || (_this.getSF00302Data().product.colorIdF == 11 && _this.getSF00302Data().product.colorIdB == 11)) {
                            condition = 16;
                        }
                        result = data_util_1.default.getData(_this.getSF00302Data().mstData.mstColor, 0, condition, "throughWage");
                    }
                    else if (id == 2 && _this.getSF00302Data().product.colorIdB != 0 && _this.getSF00302Data().product.colorIdB > 1) {
                        condition = _this.sf00302Data.product.colorIdB;
                        if (!(_this.sf00302Data.product.surfaceTreatmentIdB == 8 || _this.sf00302Data.product.surfaceTreatmentIdB == 9)) {
                            condition = _this.sf00302Data.product.colorIdB - 1;
                        }
                        result = data_util_1.default.getData(_this.sf00302Data.mstData.mstColor, 0, condition, "throughWage");
                    }
                }
                else {
                    var number = _this.throughNumber;
                    var conditions = [1000, 2000, 3000, 3001, 5001];
                    var index = 0;
                    var conditionNumber = 1000;
                    while (index < conditions.length) {
                        if (conditions[index] >= number) {
                            conditionNumber = conditions[index];
                            index = conditions.length + 1;
                        }
                        else {
                            index++;
                        }
                    }
                    if (id == 1 && _this.getSF00302Data().product.colorIdF != 0 && _this.getSF00302Data().product.colorIdF > 1) {
                        condition = _this.sf00302Data.product.colorIdF;
                        if (!(_this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 9)) {
                            condition = _this.sf00302Data.product.colorIdF - 1;
                        }
                        result = data_util_1.default.getData(_this.getSF00302Data().mstData.mstColorFlexo, 0, condition, conditionNumber, "throughWage");
                    }
                }
            }
            result = math_util_1.default.checkNaN(result);
            if (id == 1) {
                _this.getSF00302Data().productOutput.colorPrintThroughWageF = result;
            }
            else {
                _this.getSF00302Data().productOutput.colorPrintThroughWageB = result;
            }
        });
        this.calcColorSpecial(id);
        this.calcColorTotalCost(id);
    };
    /**
     * Calculate for attributes: colorCostPerPacket of product output
     * @param {number} id: define calculate front or back color
     */
    SF003020102Helper.prototype.calcColorCostPerPacket = function (id) {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            var condition = 0;
            if (_this.sf00302Data.productOutput.lot != undefined && _this.sf00302Data.productOutput.lot != 0 && _this.sf00302Data.mstData != undefined) {
                if (id == 1 && _this.sf00302Data.product.colorIdF != 0 && _this.sf00302Data.product.colorIdF > 1) {
                    condition = _this.sf00302Data.product.colorIdF;
                    if (!(_this.sf00302Data.product.surfaceTreatmentIdF == 8 || _this.sf00302Data.product.surfaceTreatmentIdF == 9)) {
                        condition = _this.sf00302Data.product.colorIdF - 1;
                    }
                    result = data_util_1.default.getData(_this.sf00302Data.mstData.mstColor, 0, condition, "costPerPacket");
                }
                else if (id == 2 && _this.sf00302Data.product.colorIdB != 0 && _this.sf00302Data.product.colorIdB > 1) {
                    condition = _this.sf00302Data.product.colorIdB;
                    if (!(_this.sf00302Data.product.surfaceTreatmentIdB == 8 || _this.sf00302Data.product.surfaceTreatmentIdB == 9)) {
                        condition = _this.sf00302Data.product.colorIdB - 1;
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
    };
    /**
     * Calculate for attributes: surfaceBasicCost of product output
     * @param {number} id: define calculate front or back or embossing
     */
    SF003020102Helper.prototype.calcSurfaceBasicCost = function (id) {
        // this.calculateAllOutput(() => {
        //     let result = "0";
        //     if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().mstData != undefined) {
        //         let size = 1;
        //         if (this.getSF00302Data().product.cutPaperSizeH * this.getSF00302Data().product.cutPaperSizeW <= 220000) {
        //             size = 5;
        //         } else if (this.getSF00302Data().product.cutPaperSizeH * this.getSF00302Data().product.cutPaperSizeW <= 308750) {
        //             size = 4;
        //         } else if (this.getSF00302Data().product.cutPaperSizeH * this.getSF00302Data().product.cutPaperSizeW <= 440000) {
        //             size = 3;
        //         } else if (this.getSF00302Data().product.cutPaperSizeH * this.getSF00302Data().product.cutPaperSizeW <= 617500) {
        //             size = 2;
        //         }
        //         let throughNumber = 1;
        //         if (id != 3) {
        //             if (this.getSF00302Data().productOutput.lot / this.getSF00302Data().product.takenNumber <= 400 &&
        //                 ((id == 1 && (this.getSF00302Data().product.surfaceTreatmentIdF == 4 || this.getSF00302Data().product.surfaceTreatmentIdF == 12 || this.getSF00302Data().product.surfaceTreatmentIdF == 13))
        //                     || (id == 2 && (this.getSF00302Data().product.surfaceTreatmentIdB == 4 || this.getSF00302Data().product.surfaceTreatmentIdB == 12 || this.getSF00302Data().product.surfaceTreatmentIdB == 13)))) {
        //                 throughNumber = 3;
        //             } else if (this.getSF00302Data().productOutput.lot / this.getSF00302Data().product.dieCuttingThroughNumber <= 1000) {
        //                 throughNumber = 2;
        //             }
        //         } else {
        //             if (this.getSF00302Data().productOutput.lot / this.getSF00302Data().product.dieCuttingThroughNumber <= 1000) {
        //                 throughNumber = 2;
        //             }
        //         }
        //         if (id == 1) {
        //             if (this.getSF00302Data().product.surfaceTreatmentIdF == 8 || this.getSF00302Data().product.surfaceTreatmentIdF == 9) {
        //                 result = "印刷代に含む";
        //             } else if (this.getSF00302Data().product.surfaceTreatmentIdF == 0) {
        //                 result = "0";
        //             } else {
        //                 result = DataUtil.getData(this.getSF00302Data().mstData.mstSurfaceTreatment, 0, this.getSF00302Data().product.surfaceTreatmentIdF, size, throughNumber, "basicCost");
        //             }
        //         } else if (id == 2) {
        //             if (this.getSF00302Data().product.surfaceTreatmentIdB == 8 || this.getSF00302Data().product.surfaceTreatmentIdB == 9) {
        //                 result = "印刷代に含む";
        //             } else if (this.getSF00302Data().product.surfaceTreatmentIdB == 0) {
        //                 result = "0";
        //             } else {
        //                 result = DataUtil.getData(this.getSF00302Data().mstData.mstSurfaceTreatment, 0, this.getSF00302Data().product.surfaceTreatmentIdB, size, throughNumber, "basicCost");
        //             }
        //         } else {
        //             if (MathUtil.checkNaN(this.getSF00302Data().product.embossingID)) {
        //                 result = DataUtil.getData(this.getSF00302Data().mstData.mstSurfaceTreatment, 0, 5, size, throughNumber, "basicCost");
        //             } else {
        //                 result = "0";
        //             }
        //         }
        //     }
        //     if (id == 1) {
        //         this.getSF00302Data().productOutput.surfaceTreatmentBasicCostF = result;
        //     } else if (id == 2) {
        //         this.getSF00302Data().productOutput.surfaceTreatmentBasicCostB = result;
        //     } else {
        //         this.getSF00302Data().productOutput.embossingBasicCost = (+result);
        //     }
        // });
        //
        this.calcSurfaceTotalCost(id);
    };
    /**
     * Calculate for attributes: surfaceThroughWage of product output
     * @param {number} id: define calculate front or back or embossing
     */
    SF003020102Helper.prototype.calcSurfaceThroughWage = function (id) {
        // this.calculateAllOutput(() => {
        //     let result = "0";
        //     let size = 1;
        //     if (this.getSF00302Data().product.cutPaperSizeH * this.getSF00302Data().product.cutPaperSizeW <= 220000) {
        //         size = 5;
        //     } else if (this.getSF00302Data().product.cutPaperSizeH * this.getSF00302Data().product.cutPaperSizeW <= 308750) {
        //         size = 4;
        //     } else if (this.getSF00302Data().product.cutPaperSizeH * this.getSF00302Data().product.cutPaperSizeW <= 440000) {
        //         size = 3;
        //     } else if (this.getSF00302Data().product.cutPaperSizeH * this.getSF00302Data().product.cutPaperSizeW <= 617500) {
        //         size = 2;
        //     }
        //     let throughNumber = 1;
        //     if (id != 3) {
        //         if (this.getSF00302Data().productOutput.lot / this.getSF00302Data().product.takenNumber <= 400 &&
        //             ((id == 1 && (this.getSF00302Data().product.surfaceTreatmentIdF == 4 || this.getSF00302Data().product.surfaceTreatmentIdF == 12 || this.getSF00302Data().product.surfaceTreatmentIdF == 13))
        //                 || (id == 2 && (this.getSF00302Data().product.surfaceTreatmentIdB == 4 || this.getSF00302Data().product.surfaceTreatmentIdB == 12 || this.getSF00302Data().product.surfaceTreatmentIdB == 13)))) {
        //             throughNumber = 3;
        //         } else if (this.getSF00302Data().productOutput.lot / this.getSF00302Data().product.takenNumber <= 1000) {
        //             throughNumber = 2;
        //         }
        //     } else {
        //         if (this.getSF00302Data().productOutput.lot / this.getSF00302Data().product.takenNumber <= 1000) {
        //             throughNumber = 2;
        //         }
        //     }
        //     if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().mstData != undefined) {
        //         if (id == 1) {
        //             if (this.getSF00302Data().product.surfaceTreatmentIdF == 8 || this.getSF00302Data().product.surfaceTreatmentIdF == 9) {
        //                 result = "印刷代に含む";
        //             } else if (this.getSF00302Data().product.surfaceTreatmentIdF == 0) {
        //                 result = "0";
        //             } else {
        //                 result = DataUtil.getData(this.getSF00302Data().mstData.mstSurfaceTreatment, 0, this.getSF00302Data().product.surfaceTreatmentIdF, size, throughNumber, "throughWage");
        //             }
        //         } else if (id == 2) {
        //             if (this.getSF00302Data().product.surfaceTreatmentIdB == 8 || this.getSF00302Data().product.surfaceTreatmentIdB == 9) {
        //                 result = "印刷代に含む";
        //             } else if (this.getSF00302Data().product.surfaceTreatmentIdB == 0) {
        //                 result = "0";
        //             } else {
        //                 result = DataUtil.getData(this.getSF00302Data().mstData.mstSurfaceTreatment, 0, this.getSF00302Data().product.surfaceTreatmentIdB, size, throughNumber, "throughWage");
        //             }
        //         } else {
        //             if (MathUtil.checkNaN(this.getSF00302Data().product.embossingID)) {
        //                 result = DataUtil.getData(this.getSF00302Data().mstData.mstSurfaceTreatment, 0, 5, size, throughNumber, "throughWage");
        //             } else {
        //                 result = "0";
        //             }
        //
        //         }
        //     }
        //     if (id == 1) {
        //         this.getSF00302Data().productOutput.surfaceTreatmentThroughWageF = result;
        //     } else if (id == 2) {
        //         this.getSF00302Data().productOutput.surfaceTreatmentThroughWageB = result;
        //     } else {
        //         this.getSF00302Data().productOutput.embossingThroughWage = +result;
        //     }
        // });
        //
        this.calcSurfaceTotalCost(id);
    };
    /**
     * Calculate for attributes: surfaceTotalCost of product output
     * @param {number} id: define calculate front or back or embossing
     */
    SF003020102Helper.prototype.calcSurfaceTotalCost = function (id) {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            if (_this.getSF00302Data().productOutput.lot != undefined && _this.getSF00302Data().productOutput.lot != 0) {
                if (id == 1) {
                    if (_this.getSF00302Data().product.surfaceTreatmentIdF == 8 || _this.getSF00302Data().product.surfaceTreatmentIdF == 9 ||
                        _this.getSF00302Data().product.surfaceTreatmentIdF == 0) {
                        result = 0;
                    }
                    else {
                        result = (+_this.getSF00302Data().productOutput.surfaceTreatmentBasicCostF) + (+_this.getSF00302Data().productOutput.surfaceTreatmentThroughWageF) * _this.throughNumber;
                    }
                    result = math_util_1.default.checkNaN(result);
                    _this.getSF00302Data().productOutput.surfaceTreatmentTotalCostF = result;
                }
                else if (id == 2) {
                    if (_this.getSF00302Data().product.surfaceTreatmentIdB == 8 || _this.getSF00302Data().product.surfaceTreatmentIdB == 9 ||
                        _this.getSF00302Data().product.surfaceTreatmentIdB == 0) {
                        result = 0;
                    }
                    else {
                        result = (+_this.getSF00302Data().productOutput.surfaceTreatmentBasicCostB) + (+_this.getSF00302Data().productOutput.surfaceTreatmentThroughWageB) * _this.throughNumber;
                    }
                    result = math_util_1.default.checkNaN(result);
                    _this.getSF00302Data().productOutput.surfaceTreatmentTotalCostB = result;
                }
                else {
                    if (math_util_1.default.checkNaN(_this.getSF00302Data().product.embossingID)) {
                        result = _this.getSF00302Data().productOutput.embossingBasicCost + _this.getSF00302Data().productOutput.embossingThroughWage * _this.throughNumber;
                    }
                    else {
                        result = 0;
                    }
                }
            }
            if (id == 1) {
                // TODO
                _this.getSF00302Data().productOutput.surfaceTreatmentTotalCostF = result;
            }
            else if (id == 2) {
                _this.getSF00302Data().productOutput.surfaceTreatmentTotalCostB = result;
            }
            else {
                _this.getSF00302Data().productOutput.embossingTotalCost = result;
            }
        });
        this.calcDieCuttingLoss();
        this.calcSubTotal();
    };
    /**
     * Calculate stampingFoildNumber of productOutputs
     */
    SF003020102Helper.prototype.calcStampingPointsNumber = function () {
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
    SF003020102Helper.prototype.calcStampingBasicCost = function () {
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
    SF003020102Helper.prototype.calcStampingThroughWage = function () {
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
    SF003020102Helper.prototype.calcStampingTotalCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.getSF00302Data().productOutput.stampingTotalCost = math_util_1.default.checkNaN(_this.getSF00302Data().productOutput.stampingBasicCost + _this.getSF00302Data().productOutput.stampingThroughWage * _this.getSF00302Data().productOutput.lot);
        });
        this.calcSubTotal();
    };
    /**
     * Calculate for attributes: inspection of product output
     */
    SF003020102Helper.prototype.calcInspection = function () {
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
    /**
     * Calculate for attributes: managementCost of product output
     */
    SF003020102Helper.prototype.calcManagementCost = function () {
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
     * Calculate for attributes: subTotal of product output
     */
    SF003020102Helper.prototype.calcSubTotal = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var productOutput = _this.getSF00302Data().productOutput;
            var firstSubtotal = math_util_1.default.checkNaN(productOutput.paperTotalCost +
                productOutput.laminationTotalCost +
                productOutput.colorPrintTotalCostF +
                productOutput.surfaceTreatmentTotalCostF +
                productOutput.surfaceTreatmentTotalCostB +
                productOutput.embossingTotalCost +
                productOutput.dieCuttingTotalCost +
                productOutput.stampingTotalCost +
                productOutput.windowTotalCost +
                productOutput.pasteTotalCost +
                _this.getProductOutputOtherFee1() +
                _this.getProductOutputOtherFee2() +
                _this.getProductOutputOtherFee3() +
                math_util_1.default.checkNaN(productOutput.cartonSpecialFare));
            var subtotal = 0;
            subtotal = math_util_1.default.checkNaN(productOutput.packing + firstSubtotal + productOutput.inspection);
            productOutput.subtotal = subtotal;
        });
        this.calcManagementCost();
        this.calcEstimateTotal();
    };
    /**
     * Calculate for attributes: estimatedTotal of product output
     */
    SF003020102Helper.prototype.calcEstimateTotal = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var productOutput = _this.getSF00302Data().productOutput;
            productOutput.estimatedTotal = math_util_1.default.checkNaN((+productOutput.subtotal) + (+productOutput.managementCost));
            if (productOutput.fareLineService != undefined) {
                productOutput.estimatedTotal = productOutput.estimatedTotal + math_util_1.default.checkNaN(+productOutput.fareLineService);
            }
            productOutput.estimatedTotal = math_util_1.default.roundDecimal(productOutput.estimatedTotal, 2);
        });
        this.calcEstimateUnitPrice();
    };
    /**
     * Calculate for attributes: estimatedUnitPrice of product output
     */
    SF003020102Helper.prototype.calcEstimateUnitPrice = function () {
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
    SF003020102Helper.prototype.calcOtherFee = function () {
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
    SF003020102Helper.prototype.calcEstimateDiff = function (type) {
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
    Object.defineProperty(SF003020102Helper.prototype, "productLaminationBackBasicWeight", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productLaminationMediumBasicWeight", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productLaminationFrontBasicWeight", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productLaminationBackThroughWage", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productLaminationMediumThroughWage", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productLaminationFrontThroughWage", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productLaminationCuttingFlow", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productLaminationWidth", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productLaminationNumber", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productStampingSizeW1", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productStampingSizeW2", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productStampingSizeW3", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productStampingSizeW4", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productStampingSizeH1", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productStampingSizeH2", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productStampingSizeH3", {
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
    Object.defineProperty(SF003020102Helper.prototype, "productStampingSizeH4", {
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
    SF003020102Helper.prototype.getProductOutputOtherFee1 = function () {
        var divisor = this.sf00302Data.product.dieCuttingFlag == 1 ? this.sf00302Data.product.dieCuttingThroughNumber : 1;
        return math_util_1.default.checkNaN(this.sf00302Data.product.otherUnitType1 == 1 ? this.sf00302Data.product.otherWage1 * this.sf00302Data.productOutput.lot / divisor : this.sf00302Data.product.otherWage1);
    };
    SF003020102Helper.prototype.getProductOutputOtherFee2 = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.product.otherUnitType2 == 1 ? this.sf00302Data.product.otherWage2 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage2);
    };
    SF003020102Helper.prototype.getProductOutputOtherFee3 = function () {
        return math_util_1.default.checkNaN(this.sf00302Data.product.otherUnitType3 == 1 ? this.sf00302Data.product.otherWage3 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage3);
    };
    SF003020102Helper.prototype.validateForm = function () {
        var isValidate = true, product = this.getSF00302Data().product, productRequiredItem = this.getSF00302Data().productRequiredItem, productOutput = this.getSF00302Data().productOutput, indexOffer = this.getSF00302Data().indexOffer;
        // http://fridaynight.vnext.vn/issues/3369
        if (product.requestDesignFlag == 1) {
            return true;
        }
        if (!product.productName) {
            productRequiredItem.isSaveProductName = true;
            // check validate false
            isValidate = false;
        }
        else {
            productRequiredItem.isSaveProductName = false;
        }
        if (product.id) {
            if (productOutput.lot == undefined) {
                productRequiredItem.isSaveLot = true;
                // check validate false
                isValidate = false;
            }
            else {
                productRequiredItem.isSaveLot = false;
            }
            if (indexOffer.unitPrice == undefined) {
                productRequiredItem.isSaveSubmittedUnitPrice = true;
                // check validate false
                isValidate = false;
            }
            else {
                productRequiredItem.isSaveSubmittedUnitPrice = false;
            }
            // フルート
            if (product.laminationFlute == undefined || this.getSF00302Data().product.laminationFlute == 1) {
                productRequiredItem.isSaveFlute = true;
                // check validate false
                isValidate = false;
            }
            else {
                productRequiredItem.isSaveFlute = false;
            }
            // 原紙巾
            if (!product.paperSizeW) {
                productRequiredItem.isSavePaperSizeW = true;
                // check validate false
                isValidate = false;
            }
            else {
                productRequiredItem.isSavePaperSizeW = false;
            }
            // if (!this.getSF00302Data().product.paperSizeH) {
            //     this.getSF00302Data().productRequiredItem.isSavePaperSizeH = true;
            //     // check validate false
            //     isValidate = false;
            // } else {
            //     this.getSF00302Data().productRequiredItem.isSavePaperSizeH = false;
            // }
            // シート寸法 (mm)
            if (!product.cutPaperSizeW) {
                productRequiredItem.isSaveCutSizeW = true;
                // check validate false
                isValidate = false;
            }
            else {
                productRequiredItem.isSaveCutSizeW = false;
            }
            if (!product.cutPaperSizeH) {
                productRequiredItem.isSaveCutSizeH = true;
                // check validate false
                isValidate = false;
            }
            else {
                productRequiredItem.isSaveCutSizeH = false;
            }
            // 展開寸法 (mm)
            if (!product.blankPaperSizeW) {
                productRequiredItem.isSaveBlankSizeW = true;
                // check validate false
                isValidate = false;
            }
            else {
                productRequiredItem.isSaveBlankSizeW = false;
            }
            if (!product.blankPaperSizeH) {
                productRequiredItem.isSaveBlankSizeH = true;
                // check validate false
                isValidate = false;
            }
            else {
                productRequiredItem.isSaveBlankSizeH = false;
            }
            // 表ライナー（g/㎡）
            if (product.laminationPaperTypeFront == undefined || product.laminationPaperTypeFront == 0) {
                productRequiredItem.isSaveLaminationPaperTypeFront = true;
                // check validate false
                isValidate = false;
            }
            else {
                productRequiredItem.isSaveLaminationPaperTypeFront = false;
            }
            // validate laminationFrontBasicWeight
            if (product.laminationPaperTypeFront == 0) {
                if (product.laminationFrontBasicWeight == undefined
                    || product.laminationFrontBasicWeight == 0) {
                    productRequiredItem.isSaveLaminationFrontBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    productRequiredItem.isSaveLaminationFrontBasicWeight = false;
                }
            }
            else {
                if (product.laminationFrontBasicWeight == undefined) {
                    productRequiredItem.isSaveLaminationFrontBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    productRequiredItem.isSaveLaminationFrontBasicWeight = false;
                }
            }
            if (product.laminationPaperTypeFront == 8) {
                if (product.laminationFrontThroughWage == undefined) {
                    productRequiredItem.isSaveLaminationFrontThroughWage = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    productRequiredItem.isSaveLaminationFrontThroughWage = false;
                }
            }
            else {
                productRequiredItem.isSaveLaminationFrontThroughWage = false;
            }
            // 中芯（g/㎡）
            if (product.laminationPaperTypeMedium == undefined || product.laminationPaperTypeMedium == 0) {
                productRequiredItem.isSaveLaminationPaperTypeMedium = true;
                // check validate false
                isValidate = false;
            }
            else {
                productRequiredItem.isSaveLaminationPaperTypeMedium = false;
            }
            // validate laminationMediumBasicWeight
            if (product.laminationPaperTypeMedium == 0) {
                if (product.laminationMediumBasicWeight == undefined
                    || product.laminationMediumBasicWeight == 0) {
                    productRequiredItem.isSaveLaminationMediumBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            }
            else {
                if (product.laminationMediumBasicWeight == undefined) {
                    productRequiredItem.isSaveLaminationMediumBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            }
            if (product.laminationPaperTypeMedium == 8) {
                if (product.laminationMediumThroughWage == undefined) {
                    productRequiredItem.isSaveLaminationMediumThroughWage = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    productRequiredItem.isSaveLaminationMediumThroughWage = false;
                }
            }
            else {
                productRequiredItem.isSaveLaminationMediumThroughWage = false;
            }
            // 裏ライナー（g/㎡）
            if (product.laminationPaperTypeBack == undefined || product.laminationPaperTypeBack == 0) {
                productRequiredItem.isSaveLaminationPaperTypeBack = true;
                // check validate false
                isValidate = false;
            }
            else {
                productRequiredItem.isSaveLaminationPaperTypeBack = false;
            }
            // validate laminationBackBasicWeight
            if (product.laminationPaperTypeBack == 0) {
                if (product.laminationBackBasicWeight == undefined
                    || product.laminationBackBasicWeight == 0) {
                    productRequiredItem.isSaveLaminationBackBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            }
            else {
                if (product.laminationBackBasicWeight == undefined) {
                    productRequiredItem.isSaveLaminationBackBasicWeight = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    productRequiredItem.isSaveLaminationBackBasicWeight = false;
                }
            }
            if (product.laminationPaperTypeBack == 8) {
                if (product.laminationBackThroughWage == undefined) {
                    productRequiredItem.isSaveLaminationBackThroughWage = true;
                    // check validate false
                    isValidate = false;
                }
                else {
                    productRequiredItem.isSaveLaminationBackThroughWage = false;
                }
            }
            else {
                productRequiredItem.isSaveLaminationBackThroughWage = false;
            }
            // 取数（丁）
            if (product.takenNumber == undefined || format_util_1.FormatUtil.isNaN(product.takenNumber) == 0) {
                productRequiredItem.isSaveTakenNumber = true;
                // check validate false
                isValidate = false;
            }
            else {
                productRequiredItem.isSaveTakenNumber = false;
            }
            // 面付数（丁）
            if (product.impositionNumber == undefined || format_util_1.FormatUtil.isNaN(product.impositionNumber) == 0) {
                productRequiredItem.isSaveImpositionNumber = true;
                // check validate false
                isValidate = false;
            }
            else {
                productRequiredItem.isSaveImpositionNumber = false;
            }
        }
        return isValidate;
    };
    // check data on change in product info area - follow 3057
    SF003020102Helper.prototype.checkChangeDataProduct = function () {
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
            else if (!this.isEquals(currentProduct.laminationFrontId, oldProduct.laminationFrontId)) {
                //  表ライナー（g/㎡）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationFrontBasicWeight, oldProduct.laminationFrontBasicWeight)) {
                //  表ライナー（g/㎡）
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.laminationFrontThroughWage, oldProduct.laminationFrontThroughWage)) {
                //  表ライナー（g/㎡）
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
    SF003020102Helper.prototype.checkChangeDataProductOutput = function () {
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
    SF003020102Helper.prototype.checkChangeDataOffer = function () {
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
    SF003020102Helper.prototype.isEquals = function (a, b) {
        return Object.is(a, b);
    };
    SF003020102Helper.prototype.calcAdditionFare = function () {
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
    SF003020102Helper.prototype.calcCartonLotGap = function () {
    };
    return SF003020102Helper;
}());
exports.SF003020102Helper = SF003020102Helper;
//# sourceMappingURL=SF003020102.helper.js.map