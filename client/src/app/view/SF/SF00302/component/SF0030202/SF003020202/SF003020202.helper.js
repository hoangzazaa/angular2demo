"use strict";
var format_util_1 = require("../../../../../../util/format-util");
var math_util_1 = require("../../../../../../util/math-util");
var data_util_1 = require("../../../../../../util/data-util");
/**
 * 段ボール A式以外の製品登録画面ヘルパー
 */
var SF003020202Helper = (function () {
    function SF003020202Helper() {
    }
    SF003020202Helper.prototype.calcAdditionFare = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            var productOutput = _this.sf00302Data.productOutput;
            var product = _this.sf00302Data.product;
            if (productOutput.lot != 0 && product.requiredAdditionalWork == 1) {
                var condition = math_util_1.default.checkNaN(productOutput.lot / product.takenNumber
                    * product.blankPaperSizeH * product.blankPaperSizeW / 1e6);
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
    SF003020202Helper.prototype.calcMaterialCostTotalCarton = function () {
    };
    SF003020202Helper.prototype.calcMaterialLossCarton = function () {
    };
    SF003020202Helper.prototype.calcTapeCutCarton = function () {
    };
    SF003020202Helper.prototype.calcLinerCutCarton = function () {
    };
    SF003020202Helper.prototype.calcCartonHandProcessingCarton = function () {
    };
    SF003020202Helper.prototype.calcFlap = function (cartonType, flute, sizeD) {
    };
    SF003020202Helper.prototype.calcDieCuttingWeight = function () {
    };
    SF003020202Helper.prototype.calcDieCuttingLoss = function () {
    };
    SF003020202Helper.prototype.calcDieCuttingBasicCost = function () {
        // ロット格差を計算する
        this.calcCartonLotGap();
    };
    SF003020202Helper.prototype.calcDieCuttingTotalCost = function () {
    };
    SF003020202Helper.prototype.calcPasteLoss = function () {
    };
    SF003020202Helper.prototype.calcOtherFee = function () {
        this.calcTotalCarton();
    };
    SF003020202Helper.prototype.calcSubTotal = function () {
    };
    SF003020202Helper.prototype.calcDimension = function () {
    };
    SF003020202Helper.prototype.getDieCuttingPasteTotalCost = function () {
    };
    /** @inheritDoc */
    SF003020202Helper.prototype.calcCartonLotGap = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var result = 0;
            // 1,000 通し未満は ¥10,000 円を枚数で割って、単価に上乗せする。
            // 500 通し未満は ¥15,000 円を枚数で割って、単価に上乗せする。
            // 打抜きなしの場合はロット格差発生しない　(打ち抜きの最低工賃的な考え方)
            // 通し数 = ロット数 / 面付数
            var productOutput = _this.sf00302Data.productOutput;
            var product = _this.sf00302Data.product;
            var numberOfThrough = math_util_1.default.checkNaN(productOutput.lot / _this.dieCuttingThroughNumber);
            if (numberOfThrough != 0 && product.dieCuttingFlag == 1 /*打抜きあり*/) {
                if (numberOfThrough < 500) {
                    result = 15000;
                }
                else if (numberOfThrough < 1000) {
                    result = 10000;
                }
            }
            _this.sf00302Data.productOutput.cartonLotGap = result;
        });
        this.calcTotalCarton();
    };
    /**
     * 加工代 (基本工賃 = 打抜き + 梱包) (円/㎡) を計算
     */
    SF003020202Helper.prototype.calcDieCuttingThroughWage = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var productOutput = _this.sf00302Data.productOutput;
            productOutput.dieCuttingThroughWage = productOutput.lot != 0 ? _this.dieCuttingThroughWage : 0;
        });
        this.calcTotalCarton();
    };
    /**
     * 貼り加工 基本料 (円/案件) を計算する
     */
    SF003020202Helper.prototype.calcPasteBasicCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var productOutput = _this.sf00302Data.productOutput;
            productOutput.pasteBasicCost = productOutput.lot > 0 ? _this.pasteBasicCost : 0;
        });
        this.calcPasteTotalCost();
    };
    /**
     * 貼り加工 工賃 (円/製品) を計算する
     */
    SF003020202Helper.prototype.calcPasteThroughWage = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var productOutput = _this.sf00302Data.productOutput;
            _this.sf00302Data.productOutput.pasteThroughWage = productOutput.lot > 0 ? _this.pasteThroughWage : 0;
        });
        this.calcPasteTotalCost();
    };
    /**
     * サックマシーン工賃基準表から基本料と工賃を含む価格情報を取得する
     *
     * @returns 価格情報
     */
    SF003020202Helper.prototype.getTargetDataFromMstPaste = function () {
        var product = this.sf00302Data.product;
        if (this.sf00302Data.mstData == undefined) {
            return null;
        }
        var mst_data = data_util_1.default.getData(this.sf00302Data.mstData.mstPaste, 0, 5, product.pasteId);
        if (!mst_data) {
            return null;
        }
        var key = this.getUsingPasteKey();
        return key != null ? mst_data[key] : null;
    };
    /**
     * サックマシーン工賃基準表で使用する行(ブランクの長い方) を取得する  (mm)
     */
    SF003020202Helper.prototype.getUsingPasteKey = function () {
        var product = this.sf00302Data.product;
        if (this.sf00302Data.mstData == undefined || product.pasteId == undefined && product.pasteId == 0)
            return null;
        var mst_data = data_util_1.default.getData(this.sf00302Data.mstData.mstPaste, 0, 5, product.pasteId);
        if (!mst_data)
            return null;
        var big = this.largerBlankSize;
        var options = Object.keys(mst_data).map(function (v) {
            var res = parseInt(v, 10);
            return isNaN(res) ? 0 : res;
        });
        var index = 0;
        for (var index_1 = 0; index_1 < options.length; ++index_1) {
            if (options[index_1] >= big) {
                return options[index_1];
            }
        }
        return null;
    };
    /**
     * 貼り加工代合計 (円) を計算
     */
    SF003020202Helper.prototype.calcPasteTotalCost = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var productOutput = _this.sf00302Data.productOutput;
            var product = _this.sf00302Data.product;
            var pasteTotalCost = 0;
            if (productOutput.lot != undefined && productOutput.lot != 0 && product.pasteId) {
                // ■基本料
                // 基本料 (円) (割増も含む)
                var pasteBasicCost = _this.pasteBasicCost + _this.getSpecialPasteBasicCost();
                // ■工賃
                // 工賃 (円/製品) (割増も含む)
                var pasteThroughWage = _this.pasteThroughWage + _this.getSpecialPasteThroughWage();
                // 工賃 (円)
                var wage = pasteThroughWage * productOutput.lot;
                // ■貼りロス
                // 貼りロスは1%で固定
                var lossRate = 0.01;
                // 貼りロス (シート代, 加工代(撥水加工, 印刷, 基本工賃) の 1%) (円)
                var loss = _this.getEstimatedTotalUntilPaste() * lossRate;
                // ■貼り加工代合計を計算
                pasteTotalCost = pasteBasicCost + wage + loss;
            }
            _this.sf00302Data.productOutput.pasteTotalCost = pasteTotalCost;
        });
        this.calcTotalCarton();
    };
    SF003020202Helper.prototype.validateForm = function () {
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
            if (this.getSF00302Data().product.laminationFlute == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveFlute = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveFlute = false;
            }
            // 原紙寸法（mm）
            if (this.getSF00302Data().product.paperSizeW == undefined) {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeW = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeW = false;
            }
            // シート寸法（mm）
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
            // 展開寸法（mm）
            if (this.getSF00302Data().product.blankPaperSizeW == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveBlankSizeW = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveBlankSizeW = false;
            }
            if (this.getSF00302Data().product.blankPaperSizeH == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveBlankSizeH = true;
                // check validate false
                isValidate = false;
            }
            else {
                this.getSF00302Data().productRequiredItem.isSaveBlankSizeH = false;
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
        return isValidate;
    };
    SF003020202Helper.prototype.checkChangeDataProduct = function () {
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
            else if (!this.isEquals(currentProduct.paperSizeW, oldProduct.paperSizeW)) {
                // 原紙寸法 W
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.cutPaperSizeW, oldProduct.cutPaperSizeW)) {
                // シート寸法 W
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.cutPaperSizeH, oldProduct.cutPaperSizeH)) {
                // シート法 H
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.blankPaperSizeW, oldProduct.blankPaperSizeW)) {
                // 展開寸法 W
                this.getSF00302Data().checkInputSave = true;
            }
            else if (!this.isEquals(currentProduct.blankPaperSizeH, oldProduct.blankPaperSizeH)) {
                // 展開寸法 H
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
    SF003020202Helper.prototype.checkChangeDataProductOutput = function () {
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
    SF003020202Helper.prototype.checkChangeDataOffer = function () {
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
    SF003020202Helper.prototype.calcSubmittedTotal = function () {
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
     * 原紙代を計算する
     *
     * @return 原紙代 (円/㎡)
     */
    SF003020202Helper.prototype.calcMaterialCostCarton = function () {
        var product = this.getSF00302Data().product;
        var productOutput = this.getSF00302Data().productOutput;
        if (productOutput.lot == 0) {
            return 0; // ロット入力なし
        }
        /*
            原紙代 =
                <表ライナー単価> * <表ライナー坪量/1000>
                + <B中芯単価> * <B中芯坪量/1000*1.5>
                + <中芯単価> * <中芯坪量/1000*(IF(D9="WF",1,1.5))>
                + <A中芯単価> * <A中芯坪量/1000*1.5>
                + <裏ライナー単価> * <裏ライナー坪量/1000>
        */
        var result = 0;
        // 表ライナー, 裏ライナー
        result = math_util_1.default.checkNaN(product.laminationBackBasicWeight * product.laminationBackThroughWage / 1000)
            + math_util_1.default.checkNaN(product.laminationFrontBasicWeight * product.laminationFrontThroughWage / 1000);
        // B中芯, A中芯 (WF のみ)
        if (product.laminationFlute == 3) {
            result += math_util_1.default.checkNaN(product.laminationABasicWeight * product.laminationAThroughWage / 1000 * 1.5)
                + math_util_1.default.checkNaN(product.laminationBBasicWeight * product.laminationBThroughWage / 1000 * 1.5);
        }
        // 中芯
        var rate = 1;
        if (product.laminationFlute != 3) {
            rate = 1.5;
        }
        result += math_util_1.default.checkNaN(product.laminationMediumBasicWeight * product.laminationMediumThroughWage / 1000 * rate);
        return result;
    };
    /**
     * 運賃 (円/㎡) を計算
     */
    SF003020202Helper.prototype.calcShipFareCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.getSF00302Data().productOutput.cartonShipFare = _this.cartonShipFare;
        });
        this.calcShipTotalCarton();
        // this.calcTotalCarton();
    };
    /**
     * @inheritDoc
     * @see SF003020201Helper#getAdditionalSipFareCarton 同じコード
     */
    SF003020202Helper.prototype.getAdditionalSipFareCarton = function () {
        var productOutput = this.getSF00302Data().productOutput;
        var product = this.getSF00302Data().product;
        var mm_v = this.productBlankSize;
        return ((mm_v * productOutput.lot) <= 500) ? 7 : 0;
    };
    /**
     * 運賃を計算する
     */
    SF003020202Helper.prototype.calcShipTotalCarton = function () {
        var _this = this;
        // (<運賃（＠㎡）>+<割増運賃（＠㎡）※500㎡以下>)*<㎡数（展開寸法　横ｘ縦）>*<ロット>
        this.calculateAllOutput(function () {
            var productOutput = _this.getSF00302Data().productOutput;
            var product = _this.getSF00302Data().product;
            if (productOutput.cartonShipFare != undefined) {
                var mm_v = product.blankPaperSizeH * product.blankPaperSizeW / 1e6;
                var add_fare = _this.getAdditionalSipFareCarton();
                productOutput.cartonShipTotal = math_util_1.default.checkNaN((productOutput.cartonShipFare + add_fare) * mm_v * productOutput.lot);
            }
        });
        this.calcTotalCarton();
    };
    /**
     * 印刷代 (円/㎡) を計算
     */
    SF003020202Helper.prototype.calcUsageColorCostCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.getSF00302Data().productOutput.cartonUsageColorCost = _this.cartonUsageColor;
        });
        this.calcTotalCarton();
    };
    /**
     * 撥水加工賃 (円/㎡) を計算
     */
    SF003020202Helper.prototype.calcWaterRepellentCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var productOutput = _this.getSF00302Data().productOutput;
            productOutput.cartonWaterRepellent = _this.cartonWaterRepellent;
        });
        this.calcTotalCarton();
    };
    SF003020202Helper.prototype.calcUnitPriceCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            _this.sf00302Data.productOutput.estimatedUnitPrice = math_util_1.default.checkNaN(_this.sf00302Data.productOutput.estimatedTotal / _this.sf00302Data.productOutput.lot);
        });
    };
    SF003020202Helper.prototype.calcEstimatedM2PriceCarton = function () {
        // 原紙代(@㎡） + 打抜き＋梱包（＠㎡） + 印刷（＠㎡） + 運賃（＠㎡） + 撥水加工賃（＠㎡） + 梱包代（＠㎡）
        var productOutput = this.sf00302Data.productOutput;
        return math_util_1.default.checkNaN(this.calcMaterialCostCarton() //原紙代
            + productOutput.dieCuttingThroughWage //
            + productOutput.cartonUsageColorCost //印刷（＠㎡）
            + productOutput.cartonShipFare //運賃（＠㎡）
            + productOutput.cartonWaterRepellent //撥水加工賃（＠㎡）
            + productOutput.packing //梱包代（＠㎡）
        );
    };
    /**
     * 見積り金額 (円) を計算する
     */
    SF003020202Helper.prototype.calcTotalCarton = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var product = _this.sf00302Data.product;
            var productOutput = _this.sf00302Data.productOutput;
            var lot = productOutput.lot;
            // シート代 (円), 加工代（撥水加工賃）, 加工代（印刷）, 加工代（基本工賃）
            var estimatedTotalUntilPaste = _this.getEstimatedTotalUntilPaste();
            // 貼り加工
            var pasteTotalCost = productOutput.pasteTotalCost;
            // 結束・梱包
            var cartonPackingCost = _this.cartonPackingCostPerProduct * lot;
            // 運賃
            var cartonFareCost = productOutput.cartonShipTotal;
            // その他
            var otherFeeTotalCost = _this.getOtherFeeTotalCost();
            // 特別費用 (= ロット格差 + 特別運賃)
            var additionalTotalCarton = _this.getAdditionalTotalCarton();
            _this.sf00302Data.productOutput.estimatedTotal = math_util_1.default.checkNaN(estimatedTotalUntilPaste
                + pasteTotalCost
                + cartonPackingCost
                + cartonFareCost
                + otherFeeTotalCost
                + additionalTotalCarton);
        });
        this.calcUnitPriceCarton();
    };
    SF003020202Helper.prototype.calcEstimateDiffCarton = function (type) {
        var _this = this;
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
    };
    SF003020202Helper.prototype.calculateAllOutput = function (doSth) {
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
    /** その他 項目 1 (円) */
    SF003020202Helper.prototype.getProductOutputOtherFee1 = function () {
        var product = this.sf00302Data.product;
        var lot = this.sf00302Data.productOutput.lot;
        return math_util_1.default.checkNaN(product.otherUnitType1 == 1 ? product.otherWage1 * lot : product.otherWage1);
    };
    /** その他 項目 2 (円) */
    SF003020202Helper.prototype.getProductOutputOtherFee2 = function () {
        var product = this.sf00302Data.product;
        var lot = this.sf00302Data.productOutput.lot;
        return math_util_1.default.checkNaN(product.otherUnitType2 == 1 ? product.otherWage2 * lot : product.otherWage2);
    };
    /** その他 項目 3 (円) */
    SF003020202Helper.prototype.getProductOutputOtherFee3 = function () {
        var product = this.sf00302Data.product;
        var lot = this.sf00302Data.productOutput.lot;
        return math_util_1.default.checkNaN(product.otherUnitType3 == 1 ? product.otherWage3 * lot : product.otherWage3);
    };
    /** その他 合計 (円) */
    SF003020202Helper.prototype.getOtherFeeTotalCost = function () {
        return (+this.getProductOutputOtherFee1()) + (+this.getProductOutputOtherFee2()) + (+this.getProductOutputOtherFee3());
    };
    /**
     * Calculate for attributes: managementCost of product output
     */
    SF003020202Helper.prototype.getSF00302Data = function () {
        return this.sf00302Data;
    };
    SF003020202Helper.prototype.isEquals = function (a, b) {
        return Object.is(a, b);
    };
    Object.defineProperty(SF003020202Helper.prototype, "productLaminationMediumBasicWeight", {
        get: function () {
            return this.sf00302Data.product.laminationMediumBasicWeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "productLaminationBackBasicWeight", {
        get: function () {
            return this.sf00302Data.product.laminationBackBasicWeight;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 結束・梱包代 (円/㎡) を計算する
     */
    SF003020202Helper.prototype.calcPacking = function () {
        var _this = this;
        this.calculateAllOutput(function () {
            var productOutput = _this.sf00302Data.productOutput;
            productOutput.packing = productOutput.lot != 0 ? _this.packing : 0;
        });
        this.calcTotalCarton();
    };
    Object.defineProperty(SF003020202Helper.prototype, "cartonBasePaperSize", {
        /**
         * シート断裁前の原紙サイズ (㎡) = 原紙巾 x 流れ
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            return math_util_1.default.checkNaN(product.cutPaperSizeH * product.paperSizeW / 1e6);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "cartonSheetSize", {
        /**
         * シートサイズ (㎡) = シート巾 x 流れ
         *
         * <p>productOutput 非依存
         * <p><code>cartonBasePaperSize() ≒ cartonSheetSize() * 取数</code>
         */
        get: function () {
            var product = this.getSF00302Data().product;
            return this.cartonBasePaperSize / this.takenNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "productBlankSize", {
        /**
         * 展開寸サイズ (㎡) = 展開寸巾 x 展開寸流れ
         *
         * <p>productOutput 非依存
         * <p><code>cartonSheetSize() ≒ productBlankSize() * 面付数</code>
         */
        get: function () {
            var product = this.getSF00302Data().product;
            return product.blankPaperSizeH * product.blankPaperSizeW / 1e6;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "takenNumber", {
        /**
         * 取数 (原紙の幅方向に何分割するか)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            var takenNumber = math_util_1.default.checkNaN(product.takenNumber);
            return takenNumber > 0 ? takenNumber : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "dieCuttingThroughNumber", {
        /**
         * 面付数 (シートに何製品面付けするか)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            var dieCuttingThroughNumber;
            if (product.dieCuttingFlag == 1) {
                dieCuttingThroughNumber = math_util_1.default.checkNaN(product.dieCuttingThroughNumber);
            }
            else {
                dieCuttingThroughNumber = 1;
            }
            return dieCuttingThroughNumber > 0 ? dieCuttingThroughNumber : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "cartonLotGapPerSheet", {
        get: function () {
            var productOutput = this.sf00302Data.productOutput;
            return math_util_1.default.checkNaN(productOutput.cartonLotGap / productOutput.lot);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "cartonSheetCostPerProduct", {
        /**
         * 1 製品あたりのシート代 (円/製品)
         *
         *  <pre>
         * シート代 　= (
         *      (<原紙巾 mm > /1000/<取り数>) * <シート流れ>/1000*(<原紙代>+<貼合料>))*(1+<貼合ロス>)*<ロット数 / 面付数 >
         * </pre>
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            // シートサイズ (㎡)  = 原紙サイズ(㎡) / 取数
            var size = this.cartonSheetSize;
            // シート単価 (円/㎡) = 原紙代 + 貼合料
            var unitPrice = this.calcMaterialCostCarton() + this.laminationM2Cost;
            // 貼合ロスを考慮して係数を算出
            var factor = 1 + this.laminationLoss;
            // 1 製品あたりのシート代
            return size * unitPrice * factor / this.dieCuttingThroughNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "laminationM2Cost", {
        /**
         * 貼合料 (円/㎡)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            return product.laminationFlute == 3 ? 17 : 13; // 貼合料（＠㎡）WF or others
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "laminationLoss", {
        /**
         * 貼合ロス% (0.0〜1.0)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            return product.laminationFlute == 3 ? 0.05 : 0.03; // WF or others
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "cartonWaterRepellent", {
        /**
         * 撥水加工賃 (円/㎡)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            var waterRepellentFlag = product.waterRepellentFlag;
            if (waterRepellentFlag == 1 /*片面（表）*/ || waterRepellentFlag == 2 /*片面（裏）*/) {
                return 3;
            }
            else if (waterRepellentFlag == 3 /*両面*/) {
                return 6;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "cartonWaterRepellentCostPerProduct", {
        /**
         * 1 製品あたりの 撥水加工賃 (円/製品)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            // シートサイズ (㎡)
            var size = this.cartonSheetSize;
            // 撥水加工賃単価 (円/㎡)
            var unitPrice = this.cartonWaterRepellent;
            // 1 製品あたりの 撥水加工賃 (円/製品)
            return size * unitPrice / this.dieCuttingThroughNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "cartonUsageColor", {
        /**
         * 印刷代 (円/㎡)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            var mstColor = this.getSF00302Data().mstData.mstColor;
            return math_util_1.default.checkNaN(data_util_1.default.getData(mstColor, 0, product.colorIdF - 1, "basicCost"));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "cartonUsageColorCostPerProduct", {
        /**
         * 1 製品あたりの印刷代 (円/製品)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            // シートサイズ (㎡)
            var size = this.cartonSheetSize;
            // 印刷代 (円/㎡)
            var unitPrice = this.cartonUsageColor;
            // 1 製品あたりの 印刷代 (円/製品)
            return size * unitPrice / this.dieCuttingThroughNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "dieCuttingThroughWage", {
        /**
         * 加工代（基本工賃）= 打抜き＋梱包 (円/㎡)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.sf00302Data.product;
            // 打抜+梱包
            // 40円/㎡ を加工賃とする  (打抜きあり、なしに関わらず)
            // ※ WF については加工賃を +10.00円加算する
            if (product.laminationFlute != null && product.laminationFlute != 0) {
                if (product.laminationFlute != 3) {
                    // WF 以外
                    return 40;
                }
                else {
                    // WF
                    return 50;
                }
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "dieCuttingTotalCostPerProduct", {
        /**
         * 1 製品あたりの加工代（基本工賃 = 打抜き＋梱包） (円/製品)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            // シートサイズ (㎡)
            var size = this.cartonSheetSize;
            // 加工代（基本工賃 = 打抜き＋梱包） (円/㎡)
            var unitPrice = this.dieCuttingThroughWage;
            // 1 製品あたりの 加工代（基本工賃 = 打抜き＋梱包） (円/製品)
            return size * unitPrice / this.dieCuttingThroughNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "largerBlankSize", {
        /**
         * ブランクの長い方  (展開寸法（流れ）)  (mm)
         *
         * <p>貼り加工計算用
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            return Math.max(math_util_1.default.checkNaN(product.blankPaperSizeW), math_util_1.default.checkNaN(product.blankPaperSizeH));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "pasteBasicCost", {
        /**
         * 貼り加工 基本料 (円/案件)     (割増工賃は含みません)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var mst = this.getTargetDataFromMstPaste();
            return mst ? math_util_1.default.checkNaN(mst.basicCost) : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "pasteThroughWage", {
        /**
         * 貼り加工 工賃 (円/製品)      (割増工賃は含みません)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var mst = this.getTargetDataFromMstPaste();
            return mst ? math_util_1.default.checkNaN(mst.throughWage) : 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 貼り加工 割増工賃割増率
     *
     * <p>productOutput に依存します
     */
    SF003020202Helper.prototype.getSpecialPasteFactor = function () {
        var product = this.getSF00302Data().product;
        var lot = this.getSF00302Data().productOutput.lot;
        var factor = 1; // 割増率
        // 1000通以下(製品個数に関係なし) は基本料、糊付工賃との一律30%アップする。 (サックマシーン工賃基準表より)
        if (lot <= 1000) {
            factor *= 1.3;
        }
        // 基本形態であっても特殊形状が部分的に含まれるものは基本料、工賃とも20%〜30%アップする。 (サックマシーン工賃基準表より)
        if (math_util_1.default.checkNaN(product.pasteSpecialFormFlag) == 1) {
            factor *= 1.2;
        }
        return factor;
    };
    /**
     * 貼り加工 割増工賃(基本料) (円/案件)
     *
     * <p>productOutput に依存します
     */
    SF003020202Helper.prototype.getSpecialPasteBasicCost = function () {
        return Math.ceil(this.pasteBasicCost * (this.getSpecialPasteFactor() - 1));
    };
    /**
     * 貼り加工 割増工賃(工賃) (円/製品)
     *
     * <p>productOutput に依存します
     */
    SF003020202Helper.prototype.getSpecialPasteThroughWage = function () {
        return this.pasteThroughWage * (this.getSpecialPasteFactor() - 1);
    };
    Object.defineProperty(SF003020202Helper.prototype, "packing", {
        /**
         * 結束・梱包代 (円/㎡)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            if (product.packingId != null && product.packingId != 0) {
                if (product.packingId > 0 && product.packingId < 5) {
                    return 10;
                }
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "cartonPackingCostPerProduct", {
        /**
         * 1 製品あたりの結束・梱包代 (円/製品)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            // シートサイズ (㎡)
            var size = this.cartonSheetSize;
            // 結束・梱包代 (円/㎡)
            var unitPrice = this.packing;
            // 1 製品あたりの 結束・梱包代 (円/製品)
            return size * unitPrice / this.dieCuttingThroughNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Helper.prototype, "cartonShipFare", {
        /**
         * 運賃 (円/㎡)
         *
         * <p>productOutput 非依存
         */
        get: function () {
            var product = this.getSF00302Data().product;
            if (product.shippingCostId != undefined && product.shippingCostId != 0) {
                var fluteType = 1;
                if (this.getSF00302Data().product.laminationFlute == 3) {
                    fluteType = 3;
                }
                var distance = product.shippingCostId;
                return math_util_1.default.checkNaN(data_util_1.default.getData(this.getSF00302Data().mstData.mstCartonShipping, 0, fluteType, distance));
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 特別費用 (円)
     *
     * <p>productOutput に依存します。
     */
    SF003020202Helper.prototype.getAdditionalTotalCarton = function () {
        var productOutput = this.getSF00302Data().productOutput;
        return math_util_1.default.checkNaN(productOutput.cartonLotGap) + math_util_1.default.checkNaN(productOutput.cartonSpecialFare);
    };
    /**
     * 貼り工程までの見積り金額を計算します
     *
     * <p>貼り工程での貼りロス計算に使用します。
     * <p>productOutput に依存します。
     *
     * @returns 貼り工程までの見積り金額 (円)
     */
    SF003020202Helper.prototype.getEstimatedTotalUntilPaste = function () {
        var product = this.sf00302Data.product;
        var productOutput = this.sf00302Data.productOutput;
        var lot = productOutput.lot;
        // シート代 (円)
        var cartonSheetCost = this.cartonSheetCostPerProduct * lot;
        // 加工代（撥水加工賃）
        var cartonWaterRepellentCost = this.cartonWaterRepellentCostPerProduct * lot;
        // 加工代（印刷）
        var cartonUsageColorTotal = this.cartonUsageColorCostPerProduct * lot;
        // 加工代（基本工賃）
        var dieCuttingTotalCost = this.dieCuttingTotalCostPerProduct * lot;
        return cartonSheetCost + cartonWaterRepellentCost + cartonUsageColorTotal + dieCuttingTotalCost;
    };
    SF003020202Helper.prototype.calcColorBasicCost = function (id) {
    };
    SF003020202Helper.prototype.calcColorPrintLoss = function (id) {
    };
    SF003020202Helper.prototype.calcLaminationTotalCost = function () {
    };
    SF003020202Helper.prototype.calcPaperTotalCost = function () {
    };
    return SF003020202Helper;
}());
exports.SF003020202Helper = SF003020202Helper;
//# sourceMappingURL=SF003020202.helper.js.map