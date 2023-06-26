import {SF00302Data} from "../../../SF00302.data";
import {SF0030201Helper} from "../../common/SF0030201.helper";
import {SF0030224Helper} from "../../SF0030201/SF003020103/SF0030224.helper";
import {SF0030218Helper} from "../SF0030218.helper";
import {SF0030219Helper} from "../SF0030219.helper";
import {SF0030220Helper} from "../SF0030220.helper";
import {SF0030212Helper} from "../../SF0030201/SF0030212.helper";
import {SF0030223Helper} from "../../common/SF0030223.helper";
import {SF0030214Helper} from "../../common/SF0030214.helper";
import {SF0030205Helper} from "../../common/SF0030205.helper";
import {SF0030226Helper} from "./SF0030226.helper";
import {FormatUtil} from "../../../../../../util/format-util";
import MathUtil from "../../../../../../util/math-util";
import DataUtil from "../../../../../../util/data-util";
import {isNullOrUndefined} from "util";
import {SF0030225Helper} from "./SF0030225.helper";
import { ProductOutput } from "../../../../../../model/core/ProductOutput.model";
import { Product } from "../../../../../../model/core/Product.model";

/**
 * 段ボール A式以外の製品登録画面ヘルパー
 */
export class SF003020202Helper implements SF0030201Helper, SF0030218Helper, SF0030219Helper, SF0030220Helper, SF0030212Helper, SF0030223Helper, SF0030214Helper, SF0030205Helper, SF0030226Helper, SF0030225Helper {
    calcAdditionFare() {
        this.calculateAllOutput(() => {
            let result = 0;
            let productOutput:ProductOutput = this.sf00302Data.productOutput;
            let product:Product = this.sf00302Data.product;
            if (productOutput.lot != 0 && product.requiredAdditionalWork == 1) {
                let condition = MathUtil.checkNaN(productOutput.lot / product.takenNumber
                    * product.blankPaperSizeH * product.blankPaperSizeW / 1e6);
                if (condition < 500) {
                    result = 5000;
                } else {
                    result = 10000;
                }
            }
            this.sf00302Data.productOutput.cartonSpecialFare = result;
        });
        this.calcTotalCarton();
    }

    calcMaterialCostTotalCarton() {
    }

    calcMaterialLossCarton() {
    }

    calcTapeCutCarton() {
    }

    calcLinerCutCarton() {
    }

    calcCartonHandProcessingCarton() {
    }

    calcFlap(cartonType: number, flute: number, sizeD: number) {
    }

    calcDieCuttingWeight() {
    }

    calcDieCuttingLoss() {
    }

    calcDieCuttingBasicCost() {
        // ロット格差を計算する
        this.calcCartonLotGap();
    }

    calcDieCuttingTotalCost() {
    }

    calcPasteLoss() {
    }

    calcOtherFee() {
        this.calcTotalCarton();
    }

    calcSubTotal() {
    }

    calcDimension() {
    }

    getDieCuttingPasteTotalCost() {
    }

    /** @inheritDoc */
    public calcCartonLotGap(): void {
        this.calculateAllOutput(() => {
            let result = 0;
            // 1,000 通し未満は ¥10,000 円を枚数で割って、単価に上乗せする。
            // 500 通し未満は ¥15,000 円を枚数で割って、単価に上乗せする。
            // 打抜きなしの場合はロット格差発生しない　(打ち抜きの最低工賃的な考え方)
            // 通し数 = ロット数 / 面付数
            let productOutput = this.sf00302Data.productOutput;
            let product = this.sf00302Data.product;
            let numberOfThrough = MathUtil.checkNaN(productOutput.lot / this.dieCuttingThroughNumber);
            if (numberOfThrough != 0 && product.dieCuttingFlag == 1/*打抜きあり*/) {
                if (numberOfThrough < 500) {
                    result = 15000;
                } else if (numberOfThrough < 1000) {
                    result = 10000;
                }
            }
            this.sf00302Data.productOutput.cartonLotGap = result;
        });
        this.calcTotalCarton();
    }


    /**
     * 加工代 (基本工賃 = 打抜き + 梱包) (円/㎡) を計算
     */
    calcDieCuttingThroughWage() {
        this.calculateAllOutput(() => {
            let productOutput = this.sf00302Data.productOutput;
            productOutput.dieCuttingThroughWage = productOutput.lot != 0 ? this.dieCuttingThroughWage : 0;
        });
        this.calcTotalCarton();
    }


    /**
     * 貼り加工 基本料 (円/案件) を計算する
     */
    calcPasteBasicCost() {
        this.calculateAllOutput(() => {
            let productOutput = this.sf00302Data.productOutput;
            productOutput.pasteBasicCost = productOutput.lot > 0 ? this.pasteBasicCost : 0;
        });

        this.calcPasteTotalCost();
    }

    /**
     * 貼り加工 工賃 (円/製品) を計算する
     */
    calcPasteThroughWage() {
        this.calculateAllOutput(() => {
            let productOutput = this.sf00302Data.productOutput;
            this.sf00302Data.productOutput.pasteThroughWage = productOutput.lot > 0 ? this.pasteThroughWage : 0;
        });

        this.calcPasteTotalCost();
    }

    /**
     * サックマシーン工賃基準表から基本料と工賃を含む価格情報を取得する
     *
     * @returns 価格情報
     */
    getTargetDataFromMstPaste() {
        let product = this.sf00302Data.product;
        if (this.sf00302Data.mstData == undefined) {
            return null;
        }

        let mst_data = DataUtil.getData(this.sf00302Data.mstData.mstPaste, 0, 5, product.pasteId);
        if (!mst_data) {
            return null;
        }

        let key = this.getUsingPasteKey();
        return key != null ? mst_data[key] : null;
    }

    /**
     * サックマシーン工賃基準表で使用する行(ブランクの長い方) を取得する  (mm)
     */
    getUsingPasteKey(): number {
        let product = this.sf00302Data.product;
        if (this.sf00302Data.mstData == undefined || product.pasteId == undefined && product.pasteId == 0) return null;

        let mst_data = DataUtil.getData(this.sf00302Data.mstData.mstPaste, 0, 5, product.pasteId);
        if (!mst_data) return null;

        let big = this.largerBlankSize;
        let options = Object.keys(mst_data).map((v) => {
            let res = parseInt(v, 10); return isNaN(res) ? 0 : res;
        });
        let index = 0;
        for (let index = 0; index < options.length; ++index) {
            if (options[index] >= big) {
                return options[index];
            }
        }
        return null;
    }


    /**
     * 貼り加工代合計 (円) を計算
     */
    calcPasteTotalCost() {
        this.calculateAllOutput(() => {
            let productOutput:ProductOutput = this.sf00302Data.productOutput;
            let product:Product = this.sf00302Data.product;
            let pasteTotalCost = 0;
            if (productOutput.lot != undefined && productOutput.lot != 0 && product.pasteId) {
                // ■基本料
                // 基本料 (円) (割増も含む)
                let pasteBasicCost = this.pasteBasicCost + this.getSpecialPasteBasicCost();

                // ■工賃
                // 工賃 (円/製品) (割増も含む)
                let pasteThroughWage = this.pasteThroughWage + this.getSpecialPasteThroughWage();
                // 工賃 (円)
                let wage = pasteThroughWage * productOutput.lot;

                // ■貼りロス
                // 貼りロスは1%で固定
                let lossRate = 0.01;
                // 貼りロス (シート代, 加工代(撥水加工, 印刷, 基本工賃) の 1%) (円)
                let loss = this.getEstimatedTotalUntilPaste() * lossRate;

                // ■貼り加工代合計を計算
                pasteTotalCost = pasteBasicCost + wage + loss;
            }
            this.sf00302Data.productOutput.pasteTotalCost = pasteTotalCost;
        });
        this.calcTotalCarton();
    }


    validateForm() {
        let isValidate = true;

        // http://fridaynight.vnext.vn/issues/3369
        if (this.sf00302Data.product.requestDesignFlag == 1) {
            return true;
        }

        if (!this.getSF00302Data().product.productName) {
            this.getSF00302Data().productRequiredItem.isSaveProductName = true;
            // check validate false
            isValidate = false;
        } else {
            this.getSF00302Data().productRequiredItem.isSaveProductName = false;
        }

        if (this.getSF00302Data().product.id) {

            if (this.getSF00302Data().productOutput.lot == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveLot = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveLot = false;
            }

            if (this.getSF00302Data().indexOffer.unitPrice == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice = false;
            }
            // フルート
            if (this.getSF00302Data().product.laminationFlute == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveFlute = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveFlute = false;
            }

            // 原紙寸法（mm）
            if (this.getSF00302Data().product.paperSizeW == undefined) {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeW = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeW = false;
            }

            // シート寸法（mm）
            if (this.getSF00302Data().product.cutPaperSizeW == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeW = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeW = false;
            }

            if (this.getSF00302Data().product.cutPaperSizeH == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeH = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeH = false;
            }

            // 展開寸法（mm）
            if (this.getSF00302Data().product.blankPaperSizeW == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveBlankSizeW = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveBlankSizeW = false;
            }

            if (this.getSF00302Data().product.blankPaperSizeH == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveBlankSizeH = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveBlankSizeH = false;
            }

            // 裏ライナ（g/㎡）
            if (this.getSF00302Data().product.laminationPaperTypeFront == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeFront = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeFront = false;
            }

            if (this.getSF00302Data().product.laminationPaperTypeFront == 0) {
                if (this.getSF00302Data().product.laminationFrontBasicWeight == 0
                    || this.getSF00302Data().product.laminationFrontBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationFrontBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationFrontBasicWeight = false;
                }
            } else if (this.getSF00302Data().product.laminationPaperTypeFront == 99) {
                if (this.getSF00302Data().product.laminationFrontBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationFrontBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationFrontBasicWeight = false;
                }
            } else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationFrontBasicWeight = false;
            }

            if (this.getSF00302Data().product.laminationPaperTypeFront == 99) {
                if (this.getSF00302Data().product.laminationFrontThroughWage == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationFrontThroughWage = true;
                    // check validate false
                    isValidate = false;
                } else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationFrontThroughWage = false;
                }
            } else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationFrontThroughWage = false;
            }

            // 中芯（g/㎡）
            if (this.getSF00302Data().product.laminationPaperTypeMedium == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeMedium = true;
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeMedium = false;
            }

            if (this.getSF00302Data().product.laminationPaperTypeMedium == 0) {
                if (this.getSF00302Data().product.laminationMediumBasicWeight == 0
                    || this.getSF00302Data().product.laminationMediumBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            } else if (this.getSF00302Data().product.laminationPaperTypeMedium == 99) {
                if (this.getSF00302Data().product.laminationMediumBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            } else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = false;
            }

            if (this.getSF00302Data().product.laminationPaperTypeMedium == 99) {
                if (this.getSF00302Data().product.laminationMediumThroughWage == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumThroughWage = true;
                    // check validate false
                    isValidate = false;
                } else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumThroughWage = false;
                }
            } else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationMediumThroughWage = false;
            }

            // 裏ライナ（g/㎡）
            if (this.getSF00302Data().product.laminationPaperTypeBack == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeBack = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeBack = false;
            }

            if (this.getSF00302Data().product.laminationPaperTypeBack == 0) {
                if (this.getSF00302Data().product.laminationBackBasicWeight == 0
                    || this.getSF00302Data().product.laminationBackBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            } else if (this.getSF00302Data().product.laminationPaperTypeBack == 99) {
                if (this.getSF00302Data().product.laminationBackBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackBasicWeight = false;
                }
            } else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationBackBasicWeight = false;
            }

            if (this.getSF00302Data().product.laminationPaperTypeBack == 99) {
                if (this.getSF00302Data().product.laminationBackThroughWage == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackThroughWage = true;
                    // check validate false
                    isValidate = false;
                } else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackThroughWage = false;
                }
            } else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationBackThroughWage = false;
            }

            //取数
            if (FormatUtil.isNaN(this.getSF00302Data().product.takenNumber) == 0) {
                this.getSF00302Data().productRequiredItem.isSaveTakenNumber = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveTakenNumber = false;
            }
        }

        return isValidate;
    }

    checkChangeDataProduct() {
        let currentProduct = this.getSF00302Data().product;
        let oldProduct = this.getSF00302Data().productOld;
        if (oldProduct.id) {
            // I. Over view area
            if (!this.isEquals(currentProduct.productName, oldProduct.productName)) {
                // 製品名
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.itemCode, oldProduct.itemCode)) {
                // 品目C
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.productType, oldProduct.productType)) {
                // 製品種類
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.factoryId, oldProduct.factoryId)) {
                // 製造依頼先
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.sampleNo, oldProduct.sampleNo)) {
                // サンプルNo
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.filmCode, oldProduct.filmCode)) {
                // フィルムNo
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.customerProductCode, oldProduct.customerProductCode)) {
                // 得意先製品番号
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.woodenCode, oldProduct.woodenCode)) {
                // 木型No
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.woodenCode2, oldProduct.woodenCode2)) {
                // 木型No
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.shareWoodenFlag1, oldProduct.shareWoodenFlag1)) {
                // 木型No
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.shareWoodenFlag2, oldProduct.shareWoodenFlag2)) {
                // 木型No
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.application, oldProduct.application)) {
                // 用途
                this.getSF00302Data().checkInputSave = true;

                // II. 製品仕様/ Product specifications area
            } else if (!this.isEquals(currentProduct.laminationFlute, oldProduct.laminationFlute)) {
                // フルート
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.takenNumber, oldProduct.takenNumber)) {
                // 取数
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.paperSizeW, oldProduct.paperSizeW)) {
                // 原紙寸法 W
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.cutPaperSizeW, oldProduct.cutPaperSizeW)) {
                // シート寸法 W
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.cutPaperSizeH, oldProduct.cutPaperSizeH)) {
                // シート法 H
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.blankPaperSizeW, oldProduct.blankPaperSizeW)) {
                // 展開寸法 W
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.blankPaperSizeH, oldProduct.blankPaperSizeH)) {
                // 展開寸法 H
                this.getSF00302Data().checkInputSave = true;

                // II. 材料 - material area
            } else if (!this.isEquals(currentProduct.laminationFrontId, oldProduct.laminationFrontId)) {
                // 表ライナー
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationFrontBasicWeight, oldProduct.laminationFrontBasicWeight)) {
                // 表ライナー
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationFrontThroughWage, oldProduct.laminationFrontThroughWage)) {
                //  表ライナー
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationBId, oldProduct.laminationBId)) {
                //  原紙サイズ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationBBasicWeight, oldProduct.laminationBBasicWeight)) {
                //  原紙サイズ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationBThroughWage, oldProduct.laminationBThroughWage)) {
                //  断裁サイズ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationAId, oldProduct.laminationAId)) {
                //  断裁サイズ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationABasicWeight, oldProduct.laminationABasicWeight)) {
                //  取数
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationAThroughWage, oldProduct.laminationAThroughWage)) {
                //  取数
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationBackId, oldProduct.laminationBackId)) {
                //  断裁サイズ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationBackBasicWeight, oldProduct.laminationBackBasicWeight)) {
                //  取数
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationBackThroughWage, oldProduct.laminationBackThroughWage)) {
                //  面付数
                this.getSF00302Data().checkInputSave = true;

                /// III.   梱包・配送/ Packing / delivery
            } else if (!this.isEquals(currentProduct.bindingMethod, oldProduct.bindingMethod)) {
                //  結束
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.bindingNumber, oldProduct.bindingNumber)) {
                //  結束
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.stringColor, oldProduct.stringColor)) {
                //  ヒモ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.stringNumber, oldProduct.stringNumber)) {
                //  ヒモ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.packingId, oldProduct.packingId)) {
                //  梱包方法
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.shippingCostId, oldProduct.shippingCostId)) {
                //  納入先距離
                this.getSF00302Data().checkInputSave = true;

                // IV.  別加工/ Different processing
            } else if (!this.isEquals(currentProduct.colorIdF, oldProduct.colorIdF)) {
                // 色数
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.colorFText1, oldProduct.colorFText1)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.colorFText2, oldProduct.colorFText2)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.colorFText3, oldProduct.colorFText3)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.cartonTapeCutting, oldProduct.cartonTapeCutting)) {
                //  テープカット
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.cartonLinerCutting, oldProduct.cartonLinerCutting)) {
                //  ライナーカット(㎡)
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.handProcessingFlag, oldProduct.handProcessingFlag)) {
                //  手穴加工
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.handPosition, oldProduct.handPosition)) {
                //  手穴位置
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.handType, oldProduct.handType)) {
                //  形状
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.handSize, oldProduct.handSize)) {
                //  寸法
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.waterRepellentFlag, oldProduct.waterRepellentFlag)) {
                //  撥水加工
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.dieCuttingFlag, oldProduct.dieCuttingFlag)) {
                //  打抜き
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.dieCuttingThroughNumber, oldProduct.dieCuttingThroughNumber)) {
                //  打抜面付数
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.pasteId, oldProduct.pasteId)) {
                //  貼り
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.pasteSpecialFormFlag, oldProduct.pasteSpecialFormFlag)) {
                //  特殊形態
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.otherMethod1, oldProduct.otherMethod1)) {
                //  その地
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.otherMethod2, oldProduct.otherMethod2)) {
                //  その地
                this.getSF00302Data().checkInputSave = true;

                // V. 備考（製造仕様書に表示）/ memo area
            } else if (!this.isEquals(currentProduct.memo1, oldProduct.memo1)) {
                //  備考1
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.memo2, oldProduct.memo2)) {
                //  備考2
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.memo3, oldProduct.memo3)) {
                //  備考3
                this.getSF00302Data().checkInputSave = true;

                // VI.その他（製造単価に含める特殊加工工賃等）/ ohther area
            } else if (!this.isEquals(currentProduct.otherExpense1, oldProduct.otherExpense1)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.otherWage1, oldProduct.otherWage1)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.otherUnitType1, oldProduct.otherUnitType1)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.otherExpense2, oldProduct.otherExpense2)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.otherWage2, oldProduct.otherWage2)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.otherUnitType2, oldProduct.otherUnitType2)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.otherExpense3, oldProduct.otherExpense3)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.otherWage3, oldProduct.otherWage3)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.otherUnitType3, oldProduct.otherUnitType3)) {
                //  その他
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.requiredAdditionalWork, oldProduct.requiredAdditionalWork)) {
                this.getSF00302Data().checkInputSave = true;
            } else {
                this.getSF00302Data().checkInputSave = false;
            }
        } else {
            this.getSF00302Data().checkInputSave = false;
        }
    }

    // check data on change in lot/offer unit price area - follow 3057
    checkChangeDataProductOutput() {
        let currentProductOutPuts = this.getSF00302Data().productOutputs;
        let oldProductOutPuts = this.getSF00302Data().productOutputsOld;
        if (oldProductOutPuts.length > 0) {
            for (let i = 0; i < currentProductOutPuts.length; i++) {
                if (!this.isEquals(currentProductOutPuts[i].lot, oldProductOutPuts[i].lot)) {
                    this.getSF00302Data().checkOutputSave = true;
                }
            }
        } else {
            this.getSF00302Data().checkOutputSave = false;
        }
    }

    checkChangeDataOffer() {
        let currentOffers = this.getSF00302Data().offers;
        let oldOffers = this.getSF00302Data().offersOld;
        if (oldOffers.length > 0) {
            for (let i = 0; i < currentOffers.length; i++) {
                if (!this.isEquals(currentOffers[i].unitPrice, oldOffers[i].unitPrice)) {
                    this.getSF00302Data().checkOutputSave = true;
                }
            }
        } else {
            this.getSF00302Data().checkOutputSave = false;
        }
    }


    calcSubmittedTotal() {
        this.calculateAllOutput(() => {
            let submittedTotal = 0;
            if (this.sf00302Data.indexOffer.unitPrice != 0) {
                submittedTotal = MathUtil.checkNaN(this.sf00302Data.indexOffer.unitPrice * this.sf00302Data.productOutput.lot);
            }
            this.sf00302Data.indexOffer.total = submittedTotal;
        });
    }


    sf00302Data: SF00302Data;


    /**
     * 原紙代を計算する
     *
     * @return 原紙代 (円/㎡)
     */
    calcMaterialCostCarton(): number {
        let product = this.getSF00302Data().product;
        let productOutput = this.getSF00302Data().productOutput;

        if (productOutput.lot == 0) {
            return 0;       // ロット入力なし
        }

        /*
            原紙代 =
                <表ライナー単価> * <表ライナー坪量/1000>
                + <B中芯単価> * <B中芯坪量/1000*1.5>
                + <中芯単価> * <中芯坪量/1000*(IF(D9="WF",1,1.5))>
                + <A中芯単価> * <A中芯坪量/1000*1.5>
                + <裏ライナー単価> * <裏ライナー坪量/1000>
        */
        let result = 0;
        // 表ライナー, 裏ライナー
        result = MathUtil.checkNaN(product.laminationBackBasicWeight * product.laminationBackThroughWage / 1000)
            + MathUtil.checkNaN(product.laminationFrontBasicWeight * product.laminationFrontThroughWage / 1000);

        // B中芯, A中芯 (WF のみ)
        if (product.laminationFlute == 3) {
            result += MathUtil.checkNaN(product.laminationABasicWeight * product.laminationAThroughWage / 1000 * 1.5)
                + MathUtil.checkNaN(product.laminationBBasicWeight * product.laminationBThroughWage / 1000 * 1.5);
        }

        // 中芯
        let rate = 1;
        if (product.laminationFlute != 3) {
            rate = 1.5;
        }
        result += MathUtil.checkNaN(product.laminationMediumBasicWeight * product.laminationMediumThroughWage / 1000 * rate);
        return result;
    }

    /**
     * 運賃 (円/㎡) を計算
     */
    calcShipFareCarton() {
        this.calculateAllOutput(() => {
            this.getSF00302Data().productOutput.cartonShipFare = this.cartonShipFare;
        });
        this.calcShipTotalCarton();
        // this.calcTotalCarton();
    }


    /**
     * @inheritDoc
     * @see SF003020201Helper#getAdditionalSipFareCarton 同じコード
     */
    public getAdditionalSipFareCarton(): number {
        let productOutput = this.getSF00302Data().productOutput;
        let product = this.getSF00302Data().product;
        let mm_v = this.productBlankSize;
        return ((mm_v * productOutput.lot) <= 500) ? 7 : 0;
    }

    /**
     * 運賃を計算する
     */
    public calcShipTotalCarton(): void {
        // (<運賃（＠㎡）>+<割増運賃（＠㎡）※500㎡以下>)*<㎡数（展開寸法　横ｘ縦）>*<ロット>
        this.calculateAllOutput(() => {
            let productOutput = this.getSF00302Data().productOutput;
            let product = this.getSF00302Data().product;
            if (productOutput.cartonShipFare != undefined) {
                let mm_v = product.blankPaperSizeH * product.blankPaperSizeW / 1e6;
                let add_fare = this.getAdditionalSipFareCarton();
                productOutput.cartonShipTotal = MathUtil.checkNaN((productOutput.cartonShipFare + add_fare) * mm_v * productOutput.lot);
            }
        });
        this.calcTotalCarton();
    }


    /**
     * 印刷代 (円/㎡) を計算
     */
    calcUsageColorCostCarton() {
        this.calculateAllOutput(() => {
            this.getSF00302Data().productOutput.cartonUsageColorCost = this.cartonUsageColor;
        });
        this.calcTotalCarton();
    }


    /**
     * 撥水加工賃 (円/㎡) を計算
     */
    calcWaterRepellentCarton() {
        this.calculateAllOutput(() => {
            let productOutput = this.getSF00302Data().productOutput;
            productOutput.cartonWaterRepellent = this.cartonWaterRepellent;
        });
        this.calcTotalCarton();
    }


    calcUnitPriceCarton() {
        this.calculateAllOutput(() => {
            this.sf00302Data.productOutput.estimatedUnitPrice = MathUtil.checkNaN(this.sf00302Data.productOutput.estimatedTotal / this.sf00302Data.productOutput.lot);
        });
    }

    calcEstimatedM2PriceCarton(): number {
        // 原紙代(@㎡） + 打抜き＋梱包（＠㎡） + 印刷（＠㎡） + 運賃（＠㎡） + 撥水加工賃（＠㎡） + 梱包代（＠㎡）
        let productOutput = this.sf00302Data.productOutput;
        return MathUtil.checkNaN(
            this.calcMaterialCostCarton() //原紙代
            + productOutput.dieCuttingThroughWage　//
            + productOutput.cartonUsageColorCost //印刷（＠㎡）
            + productOutput.cartonShipFare //運賃（＠㎡）
            + productOutput.cartonWaterRepellent //撥水加工賃（＠㎡）
            + productOutput.packing //梱包代（＠㎡）
        );
    }

    /**
     * 見積り金額 (円) を計算する
     */
    calcTotalCarton() {
        this.calculateAllOutput(() => {
            let product = this.sf00302Data.product;
            let productOutput = this.sf00302Data.productOutput;
            let lot = productOutput.lot;

            // シート代 (円), 加工代（撥水加工賃）, 加工代（印刷）, 加工代（基本工賃）
            let estimatedTotalUntilPaste = this.getEstimatedTotalUntilPaste();
            // 貼り加工
            let pasteTotalCost = productOutput.pasteTotalCost;
            // 結束・梱包
            let cartonPackingCost = this.cartonPackingCostPerProduct * lot;
            // 運賃
            let cartonFareCost = productOutput.cartonShipTotal;
            // その他
            let otherFeeTotalCost = this.getOtherFeeTotalCost();
            // 特別費用 (= ロット格差 + 特別運賃)
            let additionalTotalCarton = this.getAdditionalTotalCarton();

            this.sf00302Data.productOutput.estimatedTotal = MathUtil.checkNaN(
                estimatedTotalUntilPaste
                + pasteTotalCost
                + cartonPackingCost
                + cartonFareCost
                + otherFeeTotalCost
                + additionalTotalCarton
            );
        });
        this.calcUnitPriceCarton();
    }

    calcEstimateDiffCarton(type: number) {
        this.calculateAllOutput(() => {
            let estimatedDiff = 0;
            if (type == 1 && this.getSF00302Data().product.shapeId != this.getSF00302Data().DECORATIVE_ID) {
                if (this.getSF00302Data().indexOffer.total != 0) {
                    this.getSF00302Data().indexOffer.profitRate = MathUtil.checkNaN(MathUtil.checkNaN(MathUtil.roundDecimal((this.getSF00302Data().indexOffer.unitPrice - this.getSF00302Data().productOutput.estimatedUnitPrice) / this.getSF00302Data().productOutput.estimatedUnitPrice * 100, 2)));
                } else {
                    this.getSF00302Data().indexOffer.profitRate = 0;
                }
            }
        });
    }

    calculateAllOutput(doSth: () => void): void {
        // iterate output to do sth
        for (let i = 0; i < 5; i++) {
            this.sf00302Data.productOutput = this.sf00302Data.productOutputs[i];
            this.sf00302Data.indexOffer = this.sf00302Data.offers[i];

            doSth.call(this);
        }

        // restore output
        this.sf00302Data.productOutput = this.sf00302Data.productOutputs[this.sf00302Data.indexOutput];
        this.sf00302Data.indexOffer = this.sf00302Data.offers[this.sf00302Data.indexOutput];
    }

    /** その他 項目 1 (円) */
    getProductOutputOtherFee1(): number {
        let product = this.sf00302Data.product;
        let lot = this.sf00302Data.productOutput.lot;
        return MathUtil.checkNaN(product.otherUnitType1 == 1 ? product.otherWage1 * lot : product.otherWage1);
    }

    /** その他 項目 2 (円) */
    getProductOutputOtherFee2(): number {
        let product = this.sf00302Data.product;
        let lot = this.sf00302Data.productOutput.lot;
        return MathUtil.checkNaN(product.otherUnitType2 == 1 ? product.otherWage2 * lot : product.otherWage2);
    }

    /** その他 項目 3 (円) */
    getProductOutputOtherFee3(): number {
        let product = this.sf00302Data.product;
        let lot = this.sf00302Data.productOutput.lot;
        return MathUtil.checkNaN(product.otherUnitType3 == 1 ? product.otherWage3 * lot : product.otherWage3);
    }

    /** その他 合計 (円) */
    getOtherFeeTotalCost(): number {
        return (+this.getProductOutputOtherFee1()) + (+this.getProductOutputOtherFee2()) + (+this.getProductOutputOtherFee3());
    }


    /**
     * Calculate for attributes: managementCost of product output
     */


    getSF00302Data(): SF00302Data {
        return this.sf00302Data;
    }

    isEquals(a: any, b: any) {
        return Object.is(a, b);
    }

    get productLaminationMediumBasicWeight() {
        return this.sf00302Data.product.laminationMediumBasicWeight;
    }


    get productLaminationBackBasicWeight() {
        return this.sf00302Data.product.laminationBackBasicWeight;
    }

    /**
     * 結束・梱包代 (円/㎡) を計算する
     */
    calcPacking() {
        this.calculateAllOutput(() => {
            let productOutput = this.sf00302Data.productOutput;
            productOutput.packing = productOutput.lot != 0 ? this.packing : 0;
        });
        this.calcTotalCarton();
    }

    /**
     * シート断裁前の原紙サイズ (㎡) = 原紙巾 x 流れ
     *
     * <p>productOutput 非依存
     */
    get cartonBasePaperSize(): number {
        let product = this.getSF00302Data().product;
        return MathUtil.checkNaN(product.cutPaperSizeH * product.paperSizeW / 1e6);
    }

    /**
     * シートサイズ (㎡) = シート巾 x 流れ
     *
     * <p>productOutput 非依存
     * <p><code>cartonBasePaperSize() ≒ cartonSheetSize() * 取数</code>
     */
    get cartonSheetSize(): number {
        let product = this.getSF00302Data().product;
        return this.cartonBasePaperSize / this.takenNumber;
    }

    /**
     * 展開寸サイズ (㎡) = 展開寸巾 x 展開寸流れ
     *
     * <p>productOutput 非依存
     * <p><code>cartonSheetSize() ≒ productBlankSize() * 面付数</code>
     */
    get productBlankSize(): number {
        let product = this.getSF00302Data().product;
        return product.blankPaperSizeH * product.blankPaperSizeW / 1e6;
    }


    /**
     * 取数 (原紙の幅方向に何分割するか)
     *
     * <p>productOutput 非依存
     */
    get takenNumber(): number {
        let product = this.getSF00302Data().product;
        let takenNumber = MathUtil.checkNaN(product.takenNumber);
        return takenNumber > 0 ? takenNumber : 1;
    }

    /**
     * 面付数 (シートに何製品面付けするか)
     *
     * <p>productOutput 非依存
     */
    get dieCuttingThroughNumber(): number {
        let product = this.getSF00302Data().product;
        let dieCuttingThroughNumber;
        if (product.dieCuttingFlag == 1) {
            dieCuttingThroughNumber = MathUtil.checkNaN(product.dieCuttingThroughNumber);
        } else {
            dieCuttingThroughNumber = 1;
        }
        return dieCuttingThroughNumber > 0 ? dieCuttingThroughNumber : 1;
    }

    get cartonLotGapPerSheet () {
        let productOutput = this.sf00302Data.productOutput;
        return MathUtil.checkNaN(productOutput.cartonLotGap / productOutput.lot);
    }

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
    get cartonSheetCostPerProduct(): number {
        let product = this.getSF00302Data().product;

        // シートサイズ (㎡)  = 原紙サイズ(㎡) / 取数
        let size = this.cartonSheetSize;

        // シート単価 (円/㎡) = 原紙代 + 貼合料
        let unitPrice = this.calcMaterialCostCarton() + this.laminationM2Cost;

        // 貼合ロスを考慮して係数を算出
        let factor = 1 + this.laminationLoss;

        // 1 製品あたりのシート代
        return size * unitPrice * factor / this.dieCuttingThroughNumber;
    }

    /**
     * 貼合料 (円/㎡)
     *
     * <p>productOutput 非依存
     */
    get laminationM2Cost(): number {
        let product = this.getSF00302Data().product;

        return product.laminationFlute == 3 ? 17 : 13; // 貼合料（＠㎡）WF or others
    }

    /**
     * 貼合ロス% (0.0〜1.0)
     *
     * <p>productOutput 非依存
     */
    get laminationLoss(): number {
        let product = this.getSF00302Data().product;

        return product.laminationFlute == 3 ? 0.05 : 0.03; // WF or others
    }

    /**
     * 撥水加工賃 (円/㎡)
     *
     * <p>productOutput 非依存
     */
    get cartonWaterRepellent(): number {
        let product = this.getSF00302Data().product;
        let waterRepellentFlag = product.waterRepellentFlag;
        if (waterRepellentFlag == 1/*片面（表）*/ || waterRepellentFlag == 2/*片面（裏）*/) {
            return 3;
        } else if (waterRepellentFlag == 3/*両面*/) {
            return 6;
        } else {
            return 0;
        }
    }

    /**
     * 1 製品あたりの 撥水加工賃 (円/製品)
     *
     * <p>productOutput 非依存
     */
    get cartonWaterRepellentCostPerProduct(): number {
        let product = this.getSF00302Data().product;

        // シートサイズ (㎡)
        let size = this.cartonSheetSize;

        // 撥水加工賃単価 (円/㎡)
        let unitPrice = this.cartonWaterRepellent;

        // 1 製品あたりの 撥水加工賃 (円/製品)
        return size * unitPrice / this.dieCuttingThroughNumber;
    }

    /**
     * 印刷代 (円/㎡)
     *
     * <p>productOutput 非依存
     */
    get cartonUsageColor(): number {
        let product = this.getSF00302Data().product;
        let mstColor = this.getSF00302Data().mstData.mstColor

        return MathUtil.checkNaN(DataUtil.getData(mstColor, 0, product.colorIdF - 1, "basicCost"));
    }

    /**
     * 1 製品あたりの印刷代 (円/製品)
     *
     * <p>productOutput 非依存
     */
    get cartonUsageColorCostPerProduct(): number {
        let product = this.getSF00302Data().product;

        // シートサイズ (㎡)
        let size = this.cartonSheetSize;

        // 印刷代 (円/㎡)
        let unitPrice = this.cartonUsageColor;

        // 1 製品あたりの 印刷代 (円/製品)
        return size * unitPrice / this.dieCuttingThroughNumber;
    }

    /**
     * 加工代（基本工賃）= 打抜き＋梱包 (円/㎡)
     *
     * <p>productOutput 非依存
     */
    get dieCuttingThroughWage(): number {
        let product = this.sf00302Data.product;

        // 打抜+梱包
        // 40円/㎡ を加工賃とする  (打抜きあり、なしに関わらず)
        // ※ WF については加工賃を +10.00円加算する
        if (product.laminationFlute != null && product.laminationFlute != 0) {
            if (product.laminationFlute != 3) {
                // WF 以外
                return 40;
            } else {
                // WF
                return 50;
            }
        }

        return 0;
    }

    /**
     * 1 製品あたりの加工代（基本工賃 = 打抜き＋梱包） (円/製品)
     *
     * <p>productOutput 非依存
     */
    get dieCuttingTotalCostPerProduct(): number {
        let product = this.getSF00302Data().product;

        // シートサイズ (㎡)
        let size = this.cartonSheetSize;

        // 加工代（基本工賃 = 打抜き＋梱包） (円/㎡)
        let unitPrice = this.dieCuttingThroughWage;

        // 1 製品あたりの 加工代（基本工賃 = 打抜き＋梱包） (円/製品)
        return size * unitPrice / this.dieCuttingThroughNumber;
    }

    /**
     * ブランクの長い方  (展開寸法（流れ）)  (mm)
     *
     * <p>貼り加工計算用
     * <p>productOutput 非依存
     */
    get largerBlankSize() {
        let product = this.getSF00302Data().product;
        return Math.max(MathUtil.checkNaN(product.blankPaperSizeW), MathUtil.checkNaN(product.blankPaperSizeH));
    }

    /**
     * 貼り加工 基本料 (円/案件)     (割増工賃は含みません)
     *
     * <p>productOutput 非依存
     */
    get pasteBasicCost(): number {
        let mst = this.getTargetDataFromMstPaste();
        return mst ? MathUtil.checkNaN(mst.basicCost) : 0;
    }

    /**
     * 貼り加工 工賃 (円/製品)      (割増工賃は含みません)
     *
     * <p>productOutput 非依存
     */
    get pasteThroughWage(): number {
        let mst = this.getTargetDataFromMstPaste();
        return mst ? MathUtil.checkNaN(mst.throughWage) : 0;
    }

    /**
     * 貼り加工 割増工賃割増率
     *
     * <p>productOutput に依存します
     */
    private getSpecialPasteFactor(): number {
        let product = this.getSF00302Data().product;
        let lot = this.getSF00302Data().productOutput.lot;
        let factor = 1;     // 割増率

        // 1000通以下(製品個数に関係なし) は基本料、糊付工賃との一律30%アップする。 (サックマシーン工賃基準表より)
        if (lot <= 1000) {
            factor *= 1.3;
        }

        // 基本形態であっても特殊形状が部分的に含まれるものは基本料、工賃とも20%〜30%アップする。 (サックマシーン工賃基準表より)
        if (MathUtil.checkNaN(product.pasteSpecialFormFlag) == 1) {
            factor *= 1.2;
        }

        return factor;
    }

    /**
     * 貼り加工 割増工賃(基本料) (円/案件)
     *
     * <p>productOutput に依存します
     */
    getSpecialPasteBasicCost(): number {
        return Math.ceil(this.pasteBasicCost * (this.getSpecialPasteFactor() - 1));
    }

    /**
     * 貼り加工 割増工賃(工賃) (円/製品)
     *
     * <p>productOutput に依存します
     */
    getSpecialPasteThroughWage(): number {
        return this.pasteThroughWage * (this.getSpecialPasteFactor() - 1);
    }

    /**
     * 結束・梱包代 (円/㎡)
     *
     * <p>productOutput 非依存
     */
    get packing(): number {
        let product = this.getSF00302Data().product;

        if (product.packingId != null && product.packingId != 0) {
            if (product.packingId > 0 && product.packingId < 5) {
                return 10;
            }
        }

        return 0;
    }

    /**
     * 1 製品あたりの結束・梱包代 (円/製品)
     *
     * <p>productOutput 非依存
     */
    get cartonPackingCostPerProduct(): number {
        let product = this.getSF00302Data().product;

        // シートサイズ (㎡)
        let size = this.cartonSheetSize;

        // 結束・梱包代 (円/㎡)
        let unitPrice = this.packing;

        // 1 製品あたりの 結束・梱包代 (円/製品)
        return size * unitPrice / this.dieCuttingThroughNumber;
    }

    /**
     * 運賃 (円/㎡)
     *
     * <p>productOutput 非依存
     */
    get cartonShipFare(): number {
        let product = this.getSF00302Data().product;
        if (product.shippingCostId != undefined && product.shippingCostId != 0) {
            let fluteType = 1;
            if (this.getSF00302Data().product.laminationFlute == 3) {
                fluteType = 3;
            }
            let distance = product.shippingCostId;
            return MathUtil.checkNaN(DataUtil.getData(this.getSF00302Data().mstData.mstCartonShipping, 0, fluteType, distance));
        } else {
            return 0;
        }
    }

    /**
     * 特別費用 (円)
     *
     * <p>productOutput に依存します。
     */
    getAdditionalTotalCarton(): number {
        let productOutput = this.getSF00302Data().productOutput;
        return MathUtil.checkNaN(productOutput.cartonLotGap) + MathUtil.checkNaN(productOutput.cartonSpecialFare);
    }

    /**
     * 貼り工程までの見積り金額を計算します
     *
     * <p>貼り工程での貼りロス計算に使用します。
     * <p>productOutput に依存します。
     *
     * @returns 貼り工程までの見積り金額 (円)
     */
    private getEstimatedTotalUntilPaste(): number {
        let product = this.sf00302Data.product;
        let productOutput = this.sf00302Data.productOutput;
        let lot = productOutput.lot;

        // シート代 (円)
        let cartonSheetCost = this.cartonSheetCostPerProduct * lot;
        // 加工代（撥水加工賃）
        let cartonWaterRepellentCost = this.cartonWaterRepellentCostPerProduct * lot;
        // 加工代（印刷）
        let cartonUsageColorTotal = this.cartonUsageColorCostPerProduct * lot;
        // 加工代（基本工賃）
        let dieCuttingTotalCost = this.dieCuttingTotalCostPerProduct * lot;

        return cartonSheetCost + cartonWaterRepellentCost + cartonUsageColorTotal + dieCuttingTotalCost;
    }

    calcColorBasicCost(id: number) {
    }

    calcColorPrintLoss(id: number) {
    }

    calcLaminationTotalCost() {
    }

    calcPaperTotalCost() {
    }
}
