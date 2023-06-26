import {SF0030201Helper} from "../../common/SF0030201.helper";
import {SF0030203Helper} from "../../common/SF0030203.helper";
import {SF0030204Helper} from "../SF003020101/SF0030204.helper";
import {SF0030205Helper} from "../../common/SF0030205.helper";
import {SF0030208Helper} from "../SF0030208.helper";
import {SF0030209Helper} from "../SF0030209.helper";
import {SF0030210Helper} from "../SF0030210.helper";
import {SF0030211Helper} from "../SF0030211.helper";
import {SF0030212Helper} from "../SF0030212.helper";
import {SF0030213Helper} from "../SF0030213.helper";
import {SF0030214Helper} from "../../common/SF0030214.helper";
import {SF0030215Helper} from "./SF0030215.helper";
import {SF0030216Helper} from "./SF0030216.helper";
import {SF00302Data} from "../../../SF00302.data";
import MathUtil from "../../../../../../util/math-util";
import DataUtil from "../../../../../../util/data-util";
import {FormatUtil} from "../../../../../../util/format-util";
import { PAPER_LAMINATION_FLUTE } from "../../../helper/master-option";


/**
 * TOP &gt; 案件概況 &gt; 製品情報 (美粧) のヘルパー
 *
 * Created by VuPT on 5/10/2017.
 */
export class SF003020102Helper implements SF0030201Helper, SF0030203Helper, SF0030204Helper, SF0030205Helper, SF0030208Helper, SF0030209Helper, SF0030210Helper, SF0030211Helper, SF0030212Helper, SF0030213Helper, SF0030214Helper, SF0030215Helper, SF0030216Helper {

    sf00302Data: SF00302Data;

    get hasLotValue(): boolean {
        return (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0);
    }

    get isLaminationSelected(): boolean {
        return (this.getSF00302Data().product.laminationFlute != 1 && this.getSF00302Data().product.laminationFlute != 0)
    }

    // 原紙代単価
    calcPaperUnitPrice() {
        this.calculateAllOutput(() => {
            let paperUnitPrice = 0;
            let productOutput = this.getSF00302Data().productOutput;
            let product = this.getSF00302Data().product;
            if (this.hasLotValue && this.isLaminationSelected ) {
                // laminationFlute: 1: "なし", 2: "EF", 3: "BF", 4: "GF"
                let fluteFactor = 1.3; //EF
                if (product.laminationFlute == 3) fluteFactor = 1.4; //BF
                else if (product.laminationFlute == 4) fluteFactor = 1.2; //GF

                paperUnitPrice = this.productLaminationFrontThroughWage * this.productLaminationFrontBasicWeight / 1000
                    + this.productLaminationMediumThroughWage * this.productLaminationMediumBasicWeight / 1000 * fluteFactor
                    + this.productLaminationBackThroughWage * this.productLaminationBackBasicWeight / 1000

            }

            productOutput.paperUnitPrice = paperUnitPrice;
            this.calcPaperTotalCost();
            this.calcLaminationUnitPrice();
        });
    }

    // ㎡数（紙巾÷取数ｘシート流れ）
    calcLaminationSize() {
        this.calculateAllOutput(() => {
            let result = 0,
                productOutput = this.getSF00302Data().productOutput,
                product = this.getSF00302Data().product;
            if (this.hasLotValue && this.isLaminationSelected && product.paperSizeW && product.takenNumber && product.cutPaperSizeH) {
                // (D10/1000/D17)*D12/1000
                result = MathUtil.checkNaN((product.paperSizeW / 1000 / product.takenNumber) * product.cutPaperSizeH / 1000);
            }
            productOutput.laminationSize = result;
            this.calcLaminationUnitPrice();
            this.calcPaperTotalCost();
        });
    }

    // 原紙代合計
    calcPaperTotalCost() {
        this.calculateAllOutput(() => {
            let res = 0;
            let productOutput = this.getSF00302Data().productOutput;
            let product = this.getSF00302Data().product;
            if (this.hasLotValue && this.isLaminationSelected) {
                res = productOutput.paperUnitPrice * productOutput.laminationSize * this.throughNumber;
            }
            productOutput.paperTotalCost = res;
            this.calcColorPrintLoss(1);
            this.calcSubTotal();
        });
    }


    // シート代(@シート）
    calcLaminationUnitPrice() {
        this.calculateAllOutput(() => {
            let result = 0,
                productOutput = this.getSF00302Data().productOutput,
                product = this.getSF00302Data().product;
            if (this.hasLotValue) {
                result = productOutput.paperUnitPrice * productOutput.laminationSize;
            }
            productOutput.laminationUnitPrice = result;
            this.calcLaminationTotalCost();
        });
    }

    // 貼合工賃
    // productOutputに値がないのでgetterで定義
    get laminationWage():number {
        const ls = this.getSF00302Data().productOutput.laminationSize || 0;
        return 15 * ls * this.throughNumber;
    }

    // 貼合ロス
    // productOutputに値がないのでgetterで定義
    get laminationLoss(): number {
        const ptc = this.getSF00302Data().productOutput.paperTotalCost || 0;
        return 0.05 * ptc;
    }

    // 貼合代
    calcLaminationTotalCost() {
        this.calculateAllOutput(() => {
            let laminationTotalCost = 0,
                productOutput = this.getSF00302Data().productOutput,
                product = this.getSF00302Data().product;
            if (this.hasLotValue) {
                laminationTotalCost = this.laminationWage + this.laminationLoss;
            }
            productOutput.laminationTotalCost = laminationTotalCost;

            this.calcColorPrintLoss(1);
            this.calcPasteLoss();
            this.calcDieCuttingLoss();
            this.calcPacking();
            this.calcSubTotal();
        });
    }

    /**
     * 印刷費 基本美粧では表のみの想定する
     * @param {number} id: define calculate front or back color
     */
    calcColorBasicCost(id: number) {
        this.calculateAllOutput(() => {
            let result = 0,
                condition = 0,
                product = this.sf00302Data.product,
                productOutput = this.sf00302Data.productOutput;
            if (this.hasLotValue && this.getSF00302Data().mstData != undefined) {

                let range = Object.keys(DataUtil.getData(this.getSF00302Data().mstData.mstColorFlexo, 0, 1));
                var condition_key = range[0];
                var throughNumber = this.throughNumber;
                var modeVariable = false;
                // データの持ち方が微妙。
                // range値の末尾が"1"のときには、以上のものを対象。それ以外については以下のものを対象とする
                range.some((v)=>{
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

                let key = (modeVariable) ? 'throughWage' : 'basicCost';
                result = DataUtil.getData(this.getSF00302Data().mstData.mstColorFlexo, 0, condition, Number(condition_key), key);

                if (modeVariable) {
                    result = result * throughNumber;
                }

            }
            this.getSF00302Data().productOutput.colorPrintBasicCostF = result;
        });
        this.calcColorTotalCost(id);
    }

    /**
     * 印刷ロス代 基本美粧では表のみの想定する
     * @param {number} id: define calculate front or back color
     * @param {number} this.calcThroughNumber(): value of through number of current product output
     */
    calcColorPrintLoss(id: number) {
        this.calculateAllOutput(() => {
            let result = 0;
            let productOutput = this.sf00302Data.productOutput;
            if (this.hasLotValue) {
                let colorNumber = this.sf00302Data.product.colorIdF - 1;

                if (colorNumber > 0) {
                    let materialCost = (productOutput.paperTotalCost + productOutput.laminationTotalCost) / this.throughNumber;
                    if (this.throughNumber >= 1000) {
                        let rate = 0.02;
                        if (this.throughNumber >= 5000) rate = 0.005;
                        result = rate * materialCost * colorNumber * this.throughNumber;
                    }
                    else {
                        result = 20 * materialCost * colorNumber;
                    }

                }
                result = MathUtil.checkNaN(MathUtil.round(result, 2));
            }
            this.sf00302Data.productOutput.colorPrintLossF = result;
        });
        this.calcColorTotalCost(id);
    }

    /**
     * 割増/割引工賃 基本美粧では表のみの想定する
     * @param {number} id: define calculate front or back color
     */
    calcColorSpecial(id: number) {
        this.calculateAllOutput(() => {
            let result = 0,
                productOutput = this.sf00302Data.productOutput;
            if (this.hasLotValue) {
                if ( productOutput.laminationSize >= 0.8 ) {
                    result = productOutput.colorPrintBasicCostF * 0.2;
                }
                else if (productOutput.laminationSize <= 0.4 ) {
                    result = -1 * productOutput.colorPrintBasicCostF * 0.1;
                }
            }
            productOutput.colorPrintSpecialCostF = MathUtil.checkNaN(MathUtil.round(result, 2));
        });
        this.calcColorTotalCost(id);
    }

    /**
     * 印刷合計 基本美粧では表のみの想定する
     * @param {number} id: define calculate front or back color
     * @param {number} this.calcThroughNumber(): value of through number of current product output
     */
    calcColorTotalCost(id: number) {
        this.calculateAllOutput(() => {
            let result = 0,
                productOutput = this.sf00302Data.productOutput,
                product = this.sf00302Data.product;
            if (this.hasLotValue) {
                result = productOutput.colorPrintBasicCostF + productOutput.colorPrintLossF + productOutput.colorPrintSpecialCostF;
            }
            this.getSF00302Data().productOutput.colorPrintTotalCostF = MathUtil.checkNaN(MathUtil.round(result, 2));
        });
        this.calcDieCuttingLoss();
        this.calcSubTotal();
    }

    /**
     * 窓貼り加工 材料代
     */
    calcWindowMaterialFee() {
        this.calculateAllOutput(() => {
            let result = 0;
            if (this.hasLotValue && this.sf00302Data.product.windowSizeW != 0 && this.sf00302Data.product.windowSizeW != undefined) {
                let condition = (+this.sf00302Data.product.windowSizeW + 40) * (+this.sf00302Data.product.windowSizeH + 40) * 20 / 1000000;
                if (condition < 0.7) {
                    result = 0.7;
                } else {
                    result = 1;
                }
            }
            this.sf00302Data.productOutput.windowMaterialFee = MathUtil.checkNaN(result);
        });

        this.calcWindowTotalCost();
    }

    /**
     * 窓貼り加工 合計
     */
    calcWindowTotalCost() {
        this.calculateAllOutput(() => {
            let result = 0;
            let big = 0;
            let small = 0;
            if (this.sf00302Data.product.blankPaperSizeH > MathUtil.checkNaN(this.sf00302Data.product.blankPaperSizeW)) {
                big = MathUtil.checkNaN(this.sf00302Data.product.blankPaperSizeH);
                small = MathUtil.checkNaN(this.sf00302Data.product.blankPaperSizeW);
            } else {
                small = MathUtil.checkNaN(this.sf00302Data.product.blankPaperSizeH);
                big = MathUtil.checkNaN(this.sf00302Data.product.blankPaperSizeW);
            }
            var size = 2;
            if (big > 400 || small > 350) {
                size = 1;
            }
            let lot = 2;
            if (this.sf00302Data.productOutput.lot <= 1000) {
                lot = 1;
            }
            let material = 2;
            if (this.sf00302Data.product.laminationFlute == 1) {
                material = 1;
            }
            if (this.sf00302Data.productOutput.lot != undefined
                && this.sf00302Data.productOutput.lot != 0
                && this.sf00302Data.mstData != undefined
                && this.sf00302Data.product.windowSizeW != 0
                && this.sf00302Data.product.windowSizeW != undefined) {
                result = MathUtil.checkNaN((+DataUtil.getData(this.sf00302Data.mstData.mstWindow, 0, size, lot, material, "windowPreparationFee"))
                    + ((+DataUtil.getData(this.sf00302Data.mstData.mstWindow, 0, size, lot, material, "windowThroughWage"))
                        + (+this.sf00302Data.productOutput.windowMaterialFee)) * this.sf00302Data.productOutput.lot);
            }
            this.sf00302Data.productOutput.windowTotalCost = MathUtil.checkNaN(result);
        });

        this.calcSubTotal();
    }

    /**
     * 打抜ロス
     */
    calcDieCuttingLoss() {

        // 通し数フラグ生成
        let number = 1;
        if ( this.throughNumber <= 1000) {
            number = 2;
        }

        // 通し数が1001以上の場合はロスの値を計算
        if(number == 1){
            this.calculateAllOutput(() => {
                let result = 0,
                    productOutput = this.getSF00302Data().productOutput,
                    product = this.getSF00302Data().product;
                if (this.hasLotValue && product.dieCuttingFlag == 1 && product.dieCuttingThroughNumber != 0) {
                    result = MathUtil.checkNaN(
                        (productOutput.paperTotalCost
                            + productOutput.laminationTotalCost
                            + productOutput.colorPrintTotalCostF
                            + productOutput.surfaceTreatmentTotalCostF
                            + productOutput.surfaceTreatmentTotalCostB
                            + productOutput.embossingTotalCost
                        ) * 0.01);
                }
                productOutput.dieCuttingLoss = result;
            });

        // 通し数が1000以下の場合は一律料金を使用するため0として計算
        } else {
            this.getSF00302Data().productOutput.dieCuttingLoss = 0;
        }

        this.calcDieCuttingTotalCost();
    }

    /**
     * 打抜き 基本料 (通し数が1000以下の場合は一律料金)
     */
    calcDieCuttingBasicCost() {
        this.calculateAllOutput(() => {
            let result = 0;
            let size = 1;
            if (this.getSF00302Data().product.dieCuttingFlag == 1) {
                if (this.hasLotValue) {
                    let condition = this.getSF00302Data().product.cutPaperSizeH * this.getSF00302Data().product.cutPaperSizeW;
                    if (condition < 309000) {
                        size = 3;
                    } else if (condition <= 617500) {
                        size = 2;
                    }
                }
                let number = 1;
                if (this.getSF00302Data().productOutput.lot / this.getSF00302Data().product.dieCuttingThroughNumber <= 1000) {
                    number = 2;
                }
                if (this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().product.dieCuttingThroughNumber != 0 && this.getSF00302Data().mstData != undefined) {
                    result = DataUtil.getData(this.getSF00302Data().mstData.mstDieCutting, 0, this.getSF00302Data().product.laminationFlute, size, this.getSF00302Data().product.dieCuttingThroughNumber, number, "basicCost");
                }
            }
            this.getSF00302Data().productOutput.dieCuttingBasicCost = result;
        });
        this.calcDieCuttingTotalCost();
    }

    /**
     * 打抜き 通工賃
     */
    calcDieCuttingThroughWage() {

        let number = 1;
        if (this.getSF00302Data().productOutput.lot / this.getSF00302Data().product.dieCuttingThroughNumber <= 1000) {
            number = 2;
        }

        // 通し数1001以上の場合は通工賃を使用するため値を計算
        if(number == 1){
            this.calculateAllOutput(() => {
                let result = 0;
                let size = 1;
                if (this.getSF00302Data().product.dieCuttingFlag == 1) {
                    if (this.hasLotValue) {
                        let condition = this.getSF00302Data().product.cutPaperSizeH * this.getSF00302Data().product.cutPaperSizeW;
                        if (condition < 309000) {
                            size = 3;
                        } else if (condition <= 617500) {
                            size = 2;
                        }
                    }
                    if (this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().product.dieCuttingThroughNumber != 0 && this.getSF00302Data().mstData != undefined) {
                        result = DataUtil.getData(this.getSF00302Data().mstData.mstDieCutting, 0, this.getSF00302Data().product.laminationFlute, size, this.getSF00302Data().product.dieCuttingThroughNumber, number, "throughWage");
                    }
                }
            });

        // 通し数1000以下の場合は一律料金を使用するため通工賃を0として計算
        } else {
            this.getSF00302Data().productOutput.dieCuttingThroughWage = 0;
        }

        this.calcDieCuttingTotalCost();
    }

    /**
     * 打抜き 打抜代計
     */
    calcDieCuttingTotalCost() {
        this.calculateAllOutput(() => {
            let result = 0;
            if (this.hasLotValue && this.getSF00302Data().product.dieCuttingThroughNumber != 0) {
                result = MathUtil.checkNaN(this.getSF00302Data().productOutput.dieCuttingLoss + this.getSF00302Data().productOutput.dieCuttingBasicCost + this.getSF00302Data().productOutput.dieCuttingThroughWage *  this.throughNumber);
            }
            this.getSF00302Data().productOutput.dieCuttingTotalCost = MathUtil.roundDecimal(result, 0);
        });

        this.calcPasteLoss();
        this.calcSubTotal();
    }

    /**
     * 貼りロスを計算する
     */
    calcPasteLoss(): void {
        this.calculateAllOutput(() => {
            let pasteLoss = 0,
                productOutput = this.getSF00302Data().productOutput,
                product = this.getSF00302Data().product;
            if (this.hasLotValue && product.laminationFlute != 1 && product.pasteId) {
                pasteLoss = MathUtil.checkNaN(
                    (productOutput.paperTotalCost                       // 材料合計
                        + productOutput.laminationTotalCost             // 貼合合計
                        + productOutput.colorPrintTotalCostF            // 印刷合計
                        + productOutput.surfaceTreatmentTotalCostF      // 美粧では常に 0
                        + productOutput.surfaceTreatmentTotalCostB      // 美粧では常に 0
                        + productOutput.embossingTotalCost              // 美粧では常に 0
                        + productOutput.dieCuttingTotalCost             // 打抜代合計
                    ) * 0.01);
            }
            this.getSF00302Data().productOutput.pasteLoss = pasteLoss;
            this.calcPasteTotalCost();
        });
    }

    /**
     * 貼基本料
     */
    calcPasteBasicCost() {
        if (this.sf00302Data.product.shapeId == this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let big = 0;
                if (this.sf00302Data.product.blankPaperSizeH > this.sf00302Data.product.blankPaperSizeW) {
                    big = this.sf00302Data.product.blankPaperSizeH;
                } else {
                    big = this.sf00302Data.product.blankPaperSizeW;
                }
                let result = 0;
                if (this.hasLotValue  && this.sf00302Data.product.pasteId != 0 && this.sf00302Data.mstData != undefined) {
                    result = DataUtil.getData(this.sf00302Data.mstData.mstPaste, 0, this.sf00302Data.product.laminationFlute, this.sf00302Data.product.pasteId, MathUtil.checkNaN(MathUtil.ceilDecimal(big * 2, -2) / 2).toString(), "basicCost");

                    let tmp = 0;
                    if (this.throughNumber <= 1000) {
                        tmp += result * 0.3;
                    }
                    if (this.sf00302Data.product.pasteSpecialFormFlag == 1) {
                        tmp += result * 0.2;
                    }
                    result += tmp;
                }
                this.sf00302Data.productOutput.pasteBasicCost = MathUtil.checkNaN(result);
            });

            this.calcPasteTotalCost();
        }
    }

    // 貼工賃
    calcPasteThroughWage() {
        this.calculateAllOutput(() => {
            let pasteThroughWage = 0,
                productOutput = this.getSF00302Data().productOutput,
                product = this.getSF00302Data().product;
            if (this.hasLotValue && this.isLaminationSelected && this.sf00302Data.mstData != undefined) {

                let size = Math.max(MathUtil.checkNaN(product.blankPaperSizeH), MathUtil.checkNaN(product.blankPaperSizeW));

                pasteThroughWage = DataUtil.getData(this.sf00302Data.mstData.mstPaste, 0, product.laminationFlute, this.sf00302Data.product.pasteId, (MathUtil.ceilDecimal(size * 2, -2) / 2).toString(), "throughWage");

                let tmp = 0;
                if (this.throughNumber <= 1000) {
                    tmp += pasteThroughWage * 0.3;
                }
                if (product.pasteSpecialFormFlag == 1) {
                    tmp += pasteThroughWage * 0.2;
                }
                pasteThroughWage += tmp;

            }
            productOutput.pasteThroughWage = pasteThroughWage;
            this.calcPasteTotalCost();
        });
    }

    // 貼合計
    calcPasteTotalCost() {
        this.calculateAllOutput(() => {
            let pasteTotalCost = 0,
                productOutput = this.getSF00302Data().productOutput,
                product = this.getSF00302Data().product;

            if (this.hasLotValue) {
                pasteTotalCost = productOutput.pasteLoss + productOutput.pasteBasicCost + productOutput.pasteThroughWage * this.throughNumber;
            }
            productOutput.pasteTotalCost = pasteTotalCost;
            this.calcSubTotal();
        });
    }

    /**
     * 梱包
     */
    calcPacking() {
        this.calculateAllOutput(() => {
            let productOutput = this.getSF00302Data().productOutput,
                product = this.getSF00302Data().product;

            // INDEX(建値!$G$88:$I$96,MATCH(テストケース!D40,建値!$G$88:$G$96,0),IF(D5 >= 1001, 2, 3))
            if (this.sf00302Data.mstData != undefined) {
                let lot = 2;
                if (this.throughNumber > 1000) lot = 1;
                // マスターmstPackingにそんざいするようであるが、
                // this.sf00302Data.mstData.mstPacking, 0, product.packingId, lot, "percent"

                let firstSubtotal = productOutput.paperTotalCost
                    + productOutput.laminationTotalCost
                    + productOutput.colorPrintTotalCostF
                    + productOutput.surfaceTreatmentTotalCostF
                    + productOutput.surfaceTreatmentTotalCostB
                    + productOutput.embossingTotalCost
                    + productOutput.dieCuttingTotalCost
                    + productOutput.stampingTotalCost
                    + productOutput.windowTotalCost
                    + this.getProductOutputOtherFee1()
                    + this.getProductOutputOtherFee2()
                    + this.getProductOutputOtherFee3()
                    + productOutput.pasteTotalCost;
                let rate = DataUtil.getData(this.sf00302Data.mstData.mstPacking, 0, product.packingId, lot, "percent");
                let packing = MathUtil.checkNaN(rate * firstSubtotal);
                productOutput.packing = packing;
            }
        });
        this.calcSubTotal();
        this.calcEstimateTotal();
    }

    /**
     * 運賃
     * 紙器と同一内容
     */
    calcShippingCost() {
        let options = [10, 20, 30, 40, 60, 80, 100, 120, 140, 160, 180, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
        this.sf00302Data.checkOverWeight = false;
        this.calculateAllOutput(() => {
            let productOutput = this.getSF00302Data().productOutput,
                product = this.getSF00302Data().product;

            let weight = Math.ceil((product.blankPaperSizeH * product.blankPaperSizeW * product.paperWeight * productOutput.lot / 1000 / 1000 / 1000 + 1) / 10) * 10;

            let index = 0;
            while (index < options.length) {
                if (options[index] >= weight) {
                    weight = options[index];
                    index = options.length + 1;
                } else {
                    index++;
                }
            }
            if (product.factoryId == 1) {
                // Saga factory
                // EF / GF / BFしか想定しない
                let size = (product.blankPaperSizeW * product.blankPaperSizeH) / 1e6;　// ㎜ to ㎡
                let cost_base = size * productOutput.lot * this.shippingEfCostPoint(product.laminationFlute);
                let max_capacity = 4500;
                if (size < max_capacity && +product.shippingCostId > 0 && +product.shippingCostId < 150) {
                    productOutput.fareLineService = cost_base * 10;
                }
                else if (size < max_capacity && +product.shippingCostId >= 150) {
                    let condition = Math.min(+product.shippingCostId, 450);
                    productOutput.fareLineService = cost_base * DataUtil.getData(this.sf00302Data.mstData.mstShippingCost, 0, 0, condition, 4000, "cost");
                }
            } else {
                let distanceOptions = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
                let distance = product.shippingCostId;
                if (distance == 0) {
                    productOutput.fareLineService = 0;
                } else {
                    let index = 0;
                    while (index < distanceOptions.length) {
                        if (distanceOptions[index] >= distance) {
                            distance = distanceOptions[index];
                            index = distanceOptions.length + 1;
                        } else {
                            index++;
                        }
                    }
                    productOutput.fareLineService = MathUtil.checkNaN(DataUtil.getData(this.sf00302Data.mstData.mstShippingCost, 0, 1, distance, weight, "cost"));
                }
            }
            if (product.blankPaperSizeH * product.blankPaperSizeW * product.paperWeight * productOutput.lot / 1000 / 1000 / 1000 > 4500) {
                this.sf00302Data.checkOverWeight = true;
            }
            this.calcSubTotal();
        });
    }

    shippingEfCostPoint(laminationFluteValue): number {
        if (laminationFluteValue == 3) return 0.9; //BF
        // Maybe EF or GF
        return 0.6;
    }

    calccartonMaterialLoss() {
    }

    calcDigitalBasicCost() {
    }

    calcDigitalThroughWage() {
    }

    calcMoldFee() {
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
    }


    calcDieCuttingWeight() {
        let result = 0;
        let condition = this.sf00302Data.product.paperWeight + this.productLaminationMediumBasicWeight + this.productLaminationBackBasicWeight;
        if (condition < 150) {
            result = 3;
        } else if (condition > 150 && condition < 200) {
            result = 2;
        } else if (condition > 550) {
            result = 1;
        }
        this.sf00302Data.product.dieCuttingWeight = result;
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

    getOtherFeeTotalCost() {
        return (+this.getProductOutputOtherFee1()) + (+this.getProductOutputOtherFee2()) + (+this.getProductOutputOtherFee3());
    }

    getColorPrintTotalCost(): number {
        if (this.sf00302Data.product.printMethod != 3) {
            return MathUtil.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostF) + MathUtil.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostB);
        } else {
            return MathUtil.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostF)
        }
    }

    getSurfaceTreatmentTotalCost(): number {
        return MathUtil.checkNaN(this.sf00302Data.productOutput.surfaceTreatmentTotalCostF) + MathUtil.checkNaN(this.sf00302Data.productOutput.surfaceTreatmentTotalCostB) + MathUtil.checkNaN(this.sf00302Data.productOutput.embossingTotalCost);
    }

    getInspectionPackingFareLineTotalCost(): number {
        return MathUtil.checkNaN(this.sf00302Data.productOutput.inspection) + MathUtil.checkNaN(this.sf00302Data.productOutput.packing) + MathUtil.checkNaN(this.sf00302Data.productOutput.fareLineService);
    }

    getDieCuttingPasteTotalCost(): number {
        return MathUtil.checkNaN(this.sf00302Data.productOutput.dieCuttingTotalCost) + MathUtil.checkNaN(this.sf00302Data.productOutput.pasteTotalCost);
    }

    getSF00302Data(): SF00302Data {
        return this.sf00302Data;
    }

    /**
     * Calculate for attributes: normValue of product output
     */
    calcNormValue(type: number) {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            let result = 0;
            if (this.sf00302Data.mstData != undefined && this.sf00302Data.product.paperNameId != undefined) {
                result = DataUtil.getData(this.sf00302Data.mstData.mstPaper, 0, this.sf00302Data.product.factoryId, this.sf00302Data.product.paperNameId, this.sf00302Data.product.paperWeight, "normValue");
                //result = DataUtil.getData(this.sf00302Data.mstData.mstPaper, 0, this.sf00302Data.product.paperNameId, this.sf00302Data.product.paperWeight, "normValue");
            }
            if (type != 1) {
                result = result * 0.8;
            }
            return result;
        }
    }

    /**
     * 通し数 (lot / 打ち抜き面付け数)
     */
    get throughNumber (): number {
        let n;
        if (this.sf00302Data.product.dieCuttingFlag == 1) {
            n = this.sf00302Data.product.dieCuttingThroughNumber;
        } else {
            n = 1;
        }
        if (!this.sf00302Data.productOutput.lot) return 0;
        return MathUtil.checkNaN(MathUtil.ceilDecimal(this.sf00302Data.productOutput.lot / n, 0));
    }
    calcThroughNumber() {
        return this.throughNumber;
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

    /**
     * Calculate for attributes: colorPlateCost of product output
     * @param {number} id: define calculate front or back color
     */
    calcColorPlateCost(id: number) {
        this.calculateAllOutput(() => {
            let result = 0;
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0) {
                if (id == 1 && this.sf00302Data.product.colorIdF > 1) {
                    if (this.sf00302Data.product.surfaceTreatmentIdF != 8) {
                        result = (this.sf00302Data.product.colorIdF - 1) * 3000;
                    } else {
                        result = this.sf00302Data.product.colorIdF * 3000;
                    }
                } else if (id == 2 && this.sf00302Data.product.colorIdB > 1) {
                    if (this.sf00302Data.product.surfaceTreatmentIdB != 8) {
                        result = (this.sf00302Data.product.colorIdB - 1) * 3000;
                    } else {
                        result = this.sf00302Data.product.colorIdB * 3000;
                    }
                }
            }
            result = MathUtil.checkNaN(result);
            if (id == 1) {
                this.getSF00302Data().productOutput.colorPlateCostF = result;
            } else {
                this.getSF00302Data().productOutput.colorPlateCostB = result;
            }

        });
        this.calcColorTotalCost(id);
    }


    /**
     * Calculate for attributes: colorThroughWage of product output
     * @param {number} id: define calculate front or back color
     */
    calcColorThroughWage(id: number) {
        this.calculateAllOutput(() => {
            let result = 0;
            let condition = 0;
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().mstData != undefined) {
                if (this.getSF00302Data().product.printMethod != 3) {
                    if (id == 1 && this.getSF00302Data().product.colorIdF != 0 && this.getSF00302Data().product.colorIdF > 1) {
                        condition = this.sf00302Data.product.colorIdF;
                        if (!(this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 9)) {
                            condition = this.sf00302Data.product.colorIdF - 1;
                        }
                        if (this.getSF00302Data().product.colorIdF == 1 && this.getSF00302Data().product.colorIdB == 1) {
                            condition = 0;
                        } else if ((this.getSF00302Data().product.colorIdF == 1 && this.getSF00302Data().product.colorIdB == 9) || (this.getSF00302Data().product.colorIdF == 9 && this.getSF00302Data().product.colorIdB == 1)) {
                            condition = 8;
                        } else if ((this.getSF00302Data().product.colorIdF == 1 && this.getSF00302Data().product.colorIdB == 10) || (this.getSF00302Data().product.colorIdF == 10 && this.getSF00302Data().product.colorIdB == 1)) {
                            condition = 9;
                        } else if (this.getSF00302Data().product.colorIdF == 9 && this.getSF00302Data().product.colorIdB == 9) {
                            condition = 10;
                        } else if ((this.getSF00302Data().product.colorIdF == 10 && this.getSF00302Data().product.colorIdB == 9) || (this.getSF00302Data().product.colorIdF == 9 && this.getSF00302Data().product.colorIdB == 10)) {
                            condition = 11;
                        } else if (this.getSF00302Data().product.colorIdF == 10 && this.getSF00302Data().product.colorIdB == 10) {
                            condition = 12;
                        } else if ((this.getSF00302Data().product.colorIdF == 1 && this.getSF00302Data().product.colorIdB == 11) || (this.getSF00302Data().product.colorIdF == 11 && this.getSF00302Data().product.colorIdB == 1)) {
                            condition = 13;
                        } else if ((this.getSF00302Data().product.colorIdF == 11 && this.getSF00302Data().product.colorIdB == 9) || (this.getSF00302Data().product.colorIdF == 9 && this.getSF00302Data().product.colorIdB == 11)) {
                            condition = 14;
                        } else if ((this.getSF00302Data().product.colorIdF == 11 && this.getSF00302Data().product.colorIdB == 10) || (this.getSF00302Data().product.colorIdF == 10 && this.getSF00302Data().product.colorIdB == 11)) {
                            condition = 15;
                        } else if ((this.getSF00302Data().product.colorIdF == 11 && this.getSF00302Data().product.colorIdB == 11) || (this.getSF00302Data().product.colorIdF == 11 && this.getSF00302Data().product.colorIdB == 11)) {
                            condition = 16;
                        }
                        result = DataUtil.getData(this.getSF00302Data().mstData.mstColor, 0, condition, "throughWage");
                    } else if (id == 2 && this.getSF00302Data().product.colorIdB != 0 && this.getSF00302Data().product.colorIdB > 1) {
                        condition = this.sf00302Data.product.colorIdB;
                        if (!(this.sf00302Data.product.surfaceTreatmentIdB == 8 || this.sf00302Data.product.surfaceTreatmentIdB == 9)) {
                            condition = this.sf00302Data.product.colorIdB - 1;
                        }
                        result = DataUtil.getData(this.sf00302Data.mstData.mstColor, 0, condition, "throughWage");
                    }
                } else {
                    let number = this.throughNumber;
                    let conditions = [1000, 2000, 3000, 3001, 5001];
                    let index = 0;
                    let conditionNumber = 1000;
                    while (index < conditions.length) {
                        if (conditions[index] >= number) {
                            conditionNumber = conditions[index];
                            index = conditions.length + 1;
                        } else {
                            index++;
                        }
                    }
                    if (id == 1 && this.getSF00302Data().product.colorIdF != 0 && this.getSF00302Data().product.colorIdF > 1) {
                        condition = this.sf00302Data.product.colorIdF;
                        if (!(this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 9)) {
                            condition = this.sf00302Data.product.colorIdF - 1;
                        }
                        result = DataUtil.getData(this.getSF00302Data().mstData.mstColorFlexo, 0, condition, conditionNumber, "throughWage");
                    }

                }
            }
            result = MathUtil.checkNaN(result);
            if (id == 1) {
                this.getSF00302Data().productOutput.colorPrintThroughWageF = result;
            } else {
                this.getSF00302Data().productOutput.colorPrintThroughWageB = result;
            }
        });
        this.calcColorSpecial(id);
        this.calcColorTotalCost(id);
    }

    /**
     * Calculate for attributes: colorCostPerPacket of product output
     * @param {number} id: define calculate front or back color
     */
    calcColorCostPerPacket(id: number) {
        this.calculateAllOutput(() => {
            let result = 0;
            let condition = 0;
            if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.mstData != undefined) {
                if (id == 1 && this.sf00302Data.product.colorIdF != 0 && this.sf00302Data.product.colorIdF > 1) {
                    condition = this.sf00302Data.product.colorIdF;
                    if (!(this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 9)) {
                        condition = this.sf00302Data.product.colorIdF - 1;
                    }
                    result = DataUtil.getData(this.sf00302Data.mstData.mstColor, 0, condition, "costPerPacket");
                } else if (id == 2 && this.sf00302Data.product.colorIdB != 0 && this.sf00302Data.product.colorIdB > 1) {
                    condition = this.sf00302Data.product.colorIdB;
                    if (!(this.sf00302Data.product.surfaceTreatmentIdB == 8 || this.sf00302Data.product.surfaceTreatmentIdB == 9)) {
                        condition = this.sf00302Data.product.colorIdB - 1;
                    }
                    result = DataUtil.getData(this.sf00302Data.mstData.mstColor, 0, condition, "costPerPacket");
                }
            }
            result = MathUtil.checkNaN(result);
            if (id == 1) {
                this.sf00302Data.productOutput.colorPrintPerPacketCostF = result;
            } else {
                this.sf00302Data.productOutput.colorPrintPerPacketCostB = result;
            }
        });
        this.calcColorTotalCost(id);

    }

    /**
     * Calculate for attributes: surfaceBasicCost of product output
     * @param {number} id: define calculate front or back or embossing
     */
    calcSurfaceBasicCost(id: number) {
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
    }

    /**
     * Calculate for attributes: surfaceThroughWage of product output
     * @param {number} id: define calculate front or back or embossing
     */
    calcSurfaceThroughWage(id: number) {
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
    }

    /**
     * Calculate for attributes: surfaceTotalCost of product output
     * @param {number} id: define calculate front or back or embossing
     */
    calcSurfaceTotalCost(id: number) {
        this.calculateAllOutput(() => {
            let result = 0;
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0) {
                if (id == 1) {
                    if (this.getSF00302Data().product.surfaceTreatmentIdF == 8 || this.getSF00302Data().product.surfaceTreatmentIdF == 9 ||
                        this.getSF00302Data().product.surfaceTreatmentIdF == 0) {
                        result = 0;
                    } else {
                        result = (+this.getSF00302Data().productOutput.surfaceTreatmentBasicCostF) + (+this.getSF00302Data().productOutput.surfaceTreatmentThroughWageF) * this.throughNumber;
                    }
                    result = MathUtil.checkNaN(result);
                    this.getSF00302Data().productOutput.surfaceTreatmentTotalCostF = result;
                } else if (id == 2) {
                    if (this.getSF00302Data().product.surfaceTreatmentIdB == 8 || this.getSF00302Data().product.surfaceTreatmentIdB == 9 ||
                        this.getSF00302Data().product.surfaceTreatmentIdB == 0) {
                        result = 0;
                    } else {
                        result = (+this.getSF00302Data().productOutput.surfaceTreatmentBasicCostB) + (+this.getSF00302Data().productOutput.surfaceTreatmentThroughWageB) * this.throughNumber;
                    }
                    result = MathUtil.checkNaN(result);
                    this.getSF00302Data().productOutput.surfaceTreatmentTotalCostB = result;
                } else {
                    if (MathUtil.checkNaN(this.getSF00302Data().product.embossingID)) {
                        result = this.getSF00302Data().productOutput.embossingBasicCost + this.getSF00302Data().productOutput.embossingThroughWage * this.throughNumber;
                    } else {
                        result = 0;
                    }
                }
            }
            if (id == 1) {
                // TODO
                this.getSF00302Data().productOutput.surfaceTreatmentTotalCostF = result;
            } else if (id == 2) {
                this.getSF00302Data().productOutput.surfaceTreatmentTotalCostB = result;
            } else {
                this.getSF00302Data().productOutput.embossingTotalCost = result;
            }
        });

        this.calcDieCuttingLoss();
        this.calcSubTotal();
    }

    /**
     * Calculate stampingFoildNumber of productOutputs
     */
    calcStampingPointsNumber() {
        //new stamping points number's place holder
        let result = 0;

        //stamping points number only valid when stamping mode is Foil Stamping
        if (this.getSF00302Data().product.stampingId != 0) {
            //prepare a speadsheet for counting
            let stampingSizes = [
                {w: this.productStampingSizeW1, h: this.productStampingSizeH1},
                {w: this.productStampingSizeW2, h: this.productStampingSizeH2},
                {w: this.productStampingSizeW3, h: this.productStampingSizeH3},
                {w: this.productStampingSizeW4, h: this.productStampingSizeH4}
            ];

            //counting stamping points number
            stampingSizes.forEach(item => {
                if (item.w != null && item.w > 0 && item.h != null && item.h > 0) {
                    result++;
                }
            });
        }

        //set result to all product output
        this.getSF00302Data().product.stampingPointsNumber = result;
    }

    /**
     * Calculate for attributes: stampingBasicCost of product output
     */
    calcStampingBasicCost() {
        this.calculateAllOutput(() => {
            let result = 0;
            let big = 0;
            let small = 0;
            if (this.getSF00302Data().product.cutPaperSizeH > this.getSF00302Data().product.cutPaperSizeW) {
                big = this.getSF00302Data().product.cutPaperSizeH;
                small = this.getSF00302Data().product.cutPaperSizeW;
            } else {
                small = this.getSF00302Data().product.cutPaperSizeH;
                big = this.getSF00302Data().product.cutPaperSizeW;
            }
            let cutSize = 1;
            if (big <= 550 && small <= 400) {
                cutSize = 3;
            } else if (big < 800 && small < 551) {
                cutSize = 2;
            }
            if (this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().product.stampingId != undefined && this.getSF00302Data().mstData != undefined) {
                result = DataUtil.getData(this.getSF00302Data().mstData.mstStamping, 0, this.getSF00302Data().product.stampingId, cutSize, "basicCost");
            }
            this.getSF00302Data().productOutput.stampingBasicCost = result;
        });

        this.calcStampingTotalCost();

    }

    /**
     * Calculate for attributes: stampingThroughWage of product output
     */
    calcStampingThroughWage() {
        this.calculateAllOutput(() => {
            let result = 0;
            let big = 0;
            let small = 0;
            if (this.getSF00302Data().product.cutPaperSizeH > this.getSF00302Data().product.cutPaperSizeW) {
                big = this.getSF00302Data().product.cutPaperSizeH;
                small = this.getSF00302Data().product.cutPaperSizeW;
            } else {
                small = this.getSF00302Data().product.cutPaperSizeH;
                big = this.getSF00302Data().product.cutPaperSizeW;
            }
            let cutSize = 1;
            if (big <= 550 && small <= 400) {
                cutSize = 3;
            } else if (big < 800 && small < 551) {
                cutSize = 2;
            }
            let size1 = 0;
            let size2 = 0;
            let size3 = 0;
            let size4 = 0;
            if (this.productStampingSizeH1 != 0 && this.productStampingSizeW1 != 0) {
                size1 = MathUtil.checkNaN((this.productStampingSizeH1 + 10) * (this.productStampingSizeW1 + 10) / 100 / 100 * 2.4);
            }
            if (this.productStampingSizeH2 != 0 && this.productStampingSizeW2 != 0) {
                size2 = MathUtil.checkNaN((this.productStampingSizeH2 + 10) * (this.productStampingSizeW2 + 10) / 100 / 100 * 2.4);
            }
            if (this.productStampingSizeH3 != 0 && this.productStampingSizeW3 != 0) {
                size3 = MathUtil.checkNaN((this.productStampingSizeH3 + 10) * (this.productStampingSizeW3 + 10) / 100 / 100 * 2.4);
            }
            if (this.productStampingSizeH4 != 0 && this.productStampingSizeW4 != 0) {
                size4 = MathUtil.checkNaN((this.productStampingSizeH4 + 10) * (this.productStampingSizeW4 + 10) / 100 / 100 * 2.4);
            }
            let sumSize = size1 + size2 + size3 + size4;

            if (this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().mstData != undefined) {
                if (this.getSF00302Data().product.stampingId != 0) {
                    result = DataUtil.getData(this.getSF00302Data().mstData.mstStamping, 0, this.getSF00302Data().product.stampingId, cutSize, "throughWage");
                    if (this.getSF00302Data().product.stampingId == 1 || this.getSF00302Data().product.stampingId == 2) {
                        result = result + MathUtil.checkNaN(sumSize);
                    }
                    if (this.getSF00302Data().product.stampingPointsNumber > 1) {
                        result = result + (this.getSF00302Data().product.stampingPointsNumber - 1) * 0.8;
                    }
                }
            }
            result = MathUtil.checkNaN(MathUtil.round(result, 2));
            this.getSF00302Data().productOutput.stampingThroughWage = result;
        });

        this.calcStampingTotalCost();
    }

    /**
     * Calculate for attributes: stampingTotalCost of product output
     */
    calcStampingTotalCost() {
        this.calculateAllOutput(() => {
            this.getSF00302Data().productOutput.stampingTotalCost = MathUtil.checkNaN(this.getSF00302Data().productOutput.stampingBasicCost + this.getSF00302Data().productOutput.stampingThroughWage * this.getSF00302Data().productOutput.lot)
        });

        this.calcSubTotal();
    }

    /**
     * Calculate for attributes: inspection of product output
     */
    calcInspection() {
        this.calculateAllOutput(() => {
            let tmp = 0;
            if (this.getSF00302Data().product.inspectionId == 2) {
                tmp = 1;
            } else if (this.getSF00302Data().product.inspectionId == 3) {
                tmp = 0.5
            } else if (this.getSF00302Data().product.inspectionId == 4) {
                tmp = 0.3
            }
            this.getSF00302Data().productOutput.inspection = MathUtil.checkNaN(tmp * this.getSF00302Data().productOutput.lot);
        });

        this.calcEstimateTotal();
    }

    /**
     * Calculate for attributes: managementCost of product output
     */
    calcManagementCost() {
        this.calculateAllOutput(() => {
            let result = 0;
            if (this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.subtotal != undefined && this.getSF00302Data().productOutput.subtotal != 0) {
                //TODO: wait for confirm
                //if (this.getSF00302Data().productOutput.paperUnitPrice == 0) {
                result = 0.3 * this.getSF00302Data().productOutput.subtotal;
                // } else {
                //     result = 0.15 * this.getSF00302Data().productOutput.subtotal;
                // }
                if (result <= 10000 && result != 0) {
                    result = 10000;
                }
            }
            this.getSF00302Data().productOutput.managementCost = MathUtil.checkNaN(MathUtil.roundDecimal(result, 2));
        });
    }

    /**
     * Calculate for attributes: subTotal of product output
     */
    calcSubTotal() {
        this.calculateAllOutput(() => {
            let productOutput = this.getSF00302Data().productOutput;
            let firstSubtotal = MathUtil.checkNaN(
                productOutput.paperTotalCost +
                productOutput.laminationTotalCost +
                productOutput.colorPrintTotalCostF +
                productOutput.surfaceTreatmentTotalCostF +
                productOutput.surfaceTreatmentTotalCostB +
                productOutput.embossingTotalCost +
                productOutput.dieCuttingTotalCost +
                productOutput.stampingTotalCost +
                productOutput.windowTotalCost +
                productOutput.pasteTotalCost +
                this.getProductOutputOtherFee1() +
                this.getProductOutputOtherFee2() +
                this.getProductOutputOtherFee3() +
                MathUtil.checkNaN(productOutput.cartonSpecialFare)
            );
            let subtotal = 0;
            subtotal = MathUtil.checkNaN(productOutput.packing + firstSubtotal + productOutput.inspection);
            productOutput.subtotal = subtotal;
        });

        this.calcManagementCost();
        this.calcEstimateTotal();
    }

    /**
     * Calculate for attributes: estimatedTotal of product output
     */
    calcEstimateTotal() {
        this.calculateAllOutput(() => {
            let productOutput = this.getSF00302Data().productOutput;
            productOutput.estimatedTotal = MathUtil.checkNaN((+productOutput.subtotal) + (+productOutput.managementCost));
            if (productOutput.fareLineService != undefined) {
                productOutput.estimatedTotal = productOutput.estimatedTotal + MathUtil.checkNaN(+productOutput.fareLineService);
            }
            productOutput.estimatedTotal = MathUtil.roundDecimal(productOutput.estimatedTotal, 2);
        });

        this.calcEstimateUnitPrice();
    }

    /**
     * Calculate for attributes: estimatedUnitPrice of product output
     */
    calcEstimateUnitPrice() {
        this.calculateAllOutput(() => {
            let unitPrice = 0;
            if (this.getSF00302Data().productOutput.estimatedTotal != 0) {
                unitPrice = MathUtil.checkNaN(MathUtil.ceilDecimal(this.getSF00302Data().productOutput.estimatedTotal / this.getSF00302Data().productOutput.lot, 2));
            }
            this.getSF00302Data().productOutput.estimatedUnitPrice = unitPrice;
        });
        this.calcEstimateDiff(1);
        this.calcEstimateDiff(2);
    }

    calcOtherFee() {
        this.calculateAllOutput(() => {
            this.calcSubTotal();
            this.calcEstimateTotal();
            this.getSF00302Data().productOutput.estimatedTotal = this.getSF00302Data().productOutput.estimatedTotal + this.getProductOutputOtherFee1();
            this.getSF00302Data().productOutput.estimatedTotal = this.getSF00302Data().productOutput.estimatedTotal + this.getProductOutputOtherFee2();
            this.getSF00302Data().productOutput.estimatedTotal = this.getSF00302Data().productOutput.estimatedTotal + this.getProductOutputOtherFee3();
            this.calcEstimateTotal();
        });
    }

    calcEstimateDiff(type: number) {
        this.calculateAllOutput(() => {
            let estimatedDiff = 0;
            if (type == 1 && this.getSF00302Data().product.shapeId == this.getSF00302Data().DECORATIVE_ID) {
                if (this.getSF00302Data().indexOffer.total != 0) {
                    this.getSF00302Data().indexOffer.profitRate = MathUtil.checkNaN(MathUtil.roundDecimal((this.getSF00302Data().indexOffer.unitPrice - this.getSF00302Data().productOutput.estimatedUnitPrice) / this.getSF00302Data().productOutput.estimatedUnitPrice * 100, 2));
                } else {
                    this.getSF00302Data().indexOffer.profitRate = 0;
                }
            }
        });
    }

    get productLaminationBackBasicWeight() {
        if (this.sf00302Data.product.laminationFlute == 1) {
            return 0;
        } else {
            return this.sf00302Data.product.laminationBackBasicWeight;
        }
    }

    get productLaminationMediumBasicWeight() {
        if (this.sf00302Data.product.laminationFlute == 1) {
            return 0;
        } else {
            return this.sf00302Data.product.laminationMediumBasicWeight;
        }
    }

    get productLaminationFrontBasicWeight() {
        if (this.sf00302Data.product.laminationFlute == 1) {
            return 0;
        } else {
            return this.sf00302Data.product.laminationFrontBasicWeight;
        }
    }

    get productLaminationBackThroughWage() {
        if (this.sf00302Data.product.laminationFlute == 1) {
            return 0;
        } else {
            return this.sf00302Data.product.laminationBackThroughWage;
        }
    }

    get productLaminationMediumThroughWage() {
        if (this.sf00302Data.product.laminationFlute == 1) {
            return 0;
        } else {
            return this.sf00302Data.product.laminationMediumThroughWage;
        }
    }

    get productLaminationFrontThroughWage() {
        if (this.sf00302Data.product.laminationFlute == 1) {
            return 0;
        } else {
            return this.sf00302Data.product.laminationFrontThroughWage;
        }
    }

    get productLaminationCuttingFlow() {
        if (this.sf00302Data.product.laminationFlute == 1) {
            return 0;
        } else {
            return this.sf00302Data.product.laminationCuttingFlow;
        }
    }

    get productLaminationWidth() {
        if (this.sf00302Data.product.laminationFlute == 1) {
            return 0;
        } else {
            return this.sf00302Data.product.laminationWidth;
        }
    }

    get productLaminationNumber() {
        if (this.sf00302Data.product.laminationFlute == 1) {
            return 0;
        } else {
            return this.sf00302Data.product.laminationNumber;
        }
    }

    get productStampingSizeW1() {
        if (this.sf00302Data.product.stampingId == 0) {
            return 0;
        } else {
            return this.sf00302Data.product.stampingSizeW1;
        }
    }

    get productStampingSizeW2() {
        if (this.sf00302Data.product.stampingId == 0) {
            return 0;
        } else {
            return this.sf00302Data.product.stampingSizeW2;
        }
    }

    get productStampingSizeW3() {
        if (this.sf00302Data.product.stampingId == 0) {
            return 0;
        } else {
            return this.sf00302Data.product.stampingSizeW3;
        }
    }

    get productStampingSizeW4() {
        if (this.sf00302Data.product.stampingId == 0) {
            return 0;
        } else {
            return this.sf00302Data.product.stampingSizeW4;
        }
    }

    get productStampingSizeH1() {
        if (this.sf00302Data.product.stampingId == 0) {
            return 0;
        } else {
            return this.sf00302Data.product.stampingSizeH1;
        }
    }

    get productStampingSizeH2() {
        if (this.sf00302Data.product.stampingId == 0) {
            return 0;
        } else {
            return this.sf00302Data.product.stampingSizeH2;
        }
    }

    get productStampingSizeH3() {
        if (this.sf00302Data.product.stampingId == 0) {
            return 0;
        } else {
            return this.sf00302Data.product.stampingSizeH3;
        }
    }

    get productStampingSizeH4() {
        if (this.sf00302Data.product.stampingId == 0) {
            return 0;
        } else {
            return this.sf00302Data.product.stampingSizeH4;
        }
    }

    getProductOutputOtherFee1(): number {
        return MathUtil.checkNaN(this.sf00302Data.product.otherUnitType1 == 1 ? this.sf00302Data.product.otherWage1 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage1);
    }

    getProductOutputOtherFee2(): number {
        return MathUtil.checkNaN(this.sf00302Data.product.otherUnitType2 == 1 ? this.sf00302Data.product.otherWage2 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage2);
    }

    getProductOutputOtherFee3(): number {
        return MathUtil.checkNaN(this.sf00302Data.product.otherUnitType3 == 1 ? this.sf00302Data.product.otherWage3 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage3);
    }

    public validateForm(): boolean {
        let isValidate = true,
            product = this.getSF00302Data().product,
            productRequiredItem = this.getSF00302Data().productRequiredItem,
            productOutput = this.getSF00302Data().productOutput,
            indexOffer = this.getSF00302Data().indexOffer;

        // http://fridaynight.vnext.vn/issues/3369
        if (product.requestDesignFlag == 1) {
            return true;
        }

        if (!product.productName) {
            productRequiredItem.isSaveProductName = true;
            // check validate false
            isValidate = false;
        } else {
            productRequiredItem.isSaveProductName = false;
        }

        if (product.id) {

            if (productOutput.lot == undefined) {
                productRequiredItem.isSaveLot = true;
                // check validate false
                isValidate = false;
            } else {
                productRequiredItem.isSaveLot = false;
            }

            if (indexOffer.unitPrice == undefined) {
                productRequiredItem.isSaveSubmittedUnitPrice = true;
                // check validate false
                isValidate = false;
            } else {
                productRequiredItem.isSaveSubmittedUnitPrice = false;
            }

            // フルート
            if (product.laminationFlute == undefined || this.getSF00302Data().product.laminationFlute == 1) {
                productRequiredItem.isSaveFlute = true;
                // check validate false
                isValidate = false;
            } else {
                productRequiredItem.isSaveFlute = false;
            }

            // 原紙巾
            if (!product.paperSizeW) {
                productRequiredItem.isSavePaperSizeW = true;
                // check validate false
                isValidate = false;
            } else {
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
            } else {
                productRequiredItem.isSaveCutSizeW = false;
            }

            if (!product.cutPaperSizeH) {
                productRequiredItem.isSaveCutSizeH = true;
                // check validate false
                isValidate = false;
            } else {
                productRequiredItem.isSaveCutSizeH = false;
            }

            // 展開寸法 (mm)
            if (!product.blankPaperSizeW) {
                productRequiredItem.isSaveBlankSizeW = true;
                // check validate false
                isValidate = false;
            } else {
                productRequiredItem.isSaveBlankSizeW = false;
            }

            if (!product.blankPaperSizeH) {
                productRequiredItem.isSaveBlankSizeH = true;
                // check validate false
                isValidate = false;
            } else {
                productRequiredItem.isSaveBlankSizeH = false;
            }


            // 表ライナー（g/㎡）
            if (product.laminationPaperTypeFront == undefined || product.laminationPaperTypeFront == 0) {
                productRequiredItem.isSaveLaminationPaperTypeFront = true;
                // check validate false
                isValidate = false;
            } else {
                productRequiredItem.isSaveLaminationPaperTypeFront = false;
            }
            // validate laminationFrontBasicWeight
            if (product.laminationPaperTypeFront == 0) {
                if (product.laminationFrontBasicWeight == undefined
                    || product.laminationFrontBasicWeight == 0) {
                    productRequiredItem.isSaveLaminationFrontBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    productRequiredItem.isSaveLaminationFrontBasicWeight = false;
                }
            } else {
                if (product.laminationFrontBasicWeight == undefined) {
                    productRequiredItem.isSaveLaminationFrontBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    productRequiredItem.isSaveLaminationFrontBasicWeight = false;
                }
            }
            if (product.laminationPaperTypeFront == 8) {
                if (product.laminationFrontThroughWage == undefined) {
                    productRequiredItem.isSaveLaminationFrontThroughWage = true;
                    // check validate false
                    isValidate = false;
                } else {
                    productRequiredItem.isSaveLaminationFrontThroughWage = false;
                }
            } else {
                productRequiredItem.isSaveLaminationFrontThroughWage = false;
            }

            // 中芯（g/㎡）
            if (product.laminationPaperTypeMedium == undefined || product.laminationPaperTypeMedium == 0) {
                productRequiredItem.isSaveLaminationPaperTypeMedium = true;
                // check validate false
                isValidate = false;
            } else {
                productRequiredItem.isSaveLaminationPaperTypeMedium = false;
            }
            // validate laminationMediumBasicWeight
            if (product.laminationPaperTypeMedium == 0) {
                if (product.laminationMediumBasicWeight == undefined
                    || product.laminationMediumBasicWeight == 0) {
                    productRequiredItem.isSaveLaminationMediumBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            } else {
                if (product.laminationMediumBasicWeight == undefined) {
                    productRequiredItem.isSaveLaminationMediumBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            }
            if (product.laminationPaperTypeMedium == 8) {
                if (product.laminationMediumThroughWage == undefined) {
                    productRequiredItem.isSaveLaminationMediumThroughWage = true;
                    // check validate false
                    isValidate = false;
                } else {
                    productRequiredItem.isSaveLaminationMediumThroughWage = false;
                }
            } else {
                productRequiredItem.isSaveLaminationMediumThroughWage = false;
            }

            // 裏ライナー（g/㎡）
            if (product.laminationPaperTypeBack == undefined || product.laminationPaperTypeBack == 0) {
                productRequiredItem.isSaveLaminationPaperTypeBack = true;
                // check validate false
                isValidate = false;
            } else {
                productRequiredItem.isSaveLaminationPaperTypeBack = false;
            }

            // validate laminationBackBasicWeight
            if (product.laminationPaperTypeBack == 0) {
                if (product.laminationBackBasicWeight == undefined
                    || product.laminationBackBasicWeight == 0) {
                    productRequiredItem.isSaveLaminationBackBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            } else {
                if (product.laminationBackBasicWeight == undefined) {
                    productRequiredItem.isSaveLaminationBackBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    productRequiredItem.isSaveLaminationBackBasicWeight = false;
                }
            }
            if (product.laminationPaperTypeBack == 8) {
                if (product.laminationBackThroughWage == undefined) {
                    productRequiredItem.isSaveLaminationBackThroughWage = true;
                    // check validate false
                    isValidate = false;
                } else {
                    productRequiredItem.isSaveLaminationBackThroughWage = false;
                }
            } else {
                productRequiredItem.isSaveLaminationBackThroughWage = false;
            }

            // 取数（丁）
            if (product.takenNumber == undefined || FormatUtil.isNaN(product.takenNumber) == 0) {
                productRequiredItem.isSaveTakenNumber = true;
                // check validate false
                isValidate = false;
            } else {
                productRequiredItem.isSaveTakenNumber = false;
            }

            // 面付数（丁）
            if (product.impositionNumber == undefined || FormatUtil.isNaN(product.impositionNumber) == 0) {
                productRequiredItem.isSaveImpositionNumber = true;
                // check validate false
                isValidate = false;
            } else {
                productRequiredItem.isSaveImpositionNumber = false;
            }


        }
        return isValidate;
    }

    // check data on change in product info area - follow 3057
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
            } else if (!this.isEquals(currentProduct.shapeId, oldProduct.shapeId)) {
                // 紙器タイプ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.sizeW, oldProduct.sizeW)) {
                // 製品寸法 - sizeW
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.sizeD, oldProduct.sizeD)) {
                // 製品寸法 - sizeD
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.sizeH, oldProduct.sizeH)) {
                // 製品寸法 - sizeH
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.blankPaperSizeW, oldProduct.blankPaperSizeW)) {
                // 展開寸法 - blank paper size W
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.blankPaperSizeH, oldProduct.blankPaperSizeH)) {
                // 展開寸法 - blank paper size H
                this.getSF00302Data().checkInputSave = true;

                // II. 材料 - material area
            } else if (!this.isEquals(currentProduct.paperNameId, oldProduct.paperNameId)) {
                // 原紙名
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.paperWeight, oldProduct.paperWeight)) {
                // 坪量
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.paperHeadApprovalFlag, oldProduct.paperHeadApprovalFlag)) {
                //  部門長建値を使用
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.paperSizeW, oldProduct.paperSizeW)) {
                //  原紙サイズ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.paperSizeH, oldProduct.paperSizeH)) {
                //  原紙サイズ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.cutPaperSizeW, oldProduct.cutPaperSizeW)) {
                //  断裁サイズ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.cutPaperSizeH, oldProduct.cutPaperSizeH)) {
                //  断裁サイズ
                this.getSF00302Data().checkInputSave = true;

                /// III.  貼合/ Lamination area
            } else if (!this.isEquals(currentProduct.laminationFlute, oldProduct.laminationFlute)) {
                //  フルート
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationWidth, oldProduct.laminationWidth)) {
                //  片段断寸
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationCuttingFlow, oldProduct.laminationCuttingFlow)) {
                //  片段断寸
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationFrontId, oldProduct.laminationFrontId)) {
                //  表ライナー（g/㎡）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationFrontBasicWeight, oldProduct.laminationFrontBasicWeight)) {
                //  表ライナー（g/㎡）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationFrontThroughWage, oldProduct.laminationFrontThroughWage)) {
                //  表ライナー（g/㎡）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationMediumId, oldProduct.laminationMediumId)) {
                //  中芯
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationMediumBasicWeight, oldProduct.laminationMediumBasicWeight)) {
                //  中芯
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationMediumThroughWage, oldProduct.laminationMediumThroughWage)) {
                //  中芯
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationBackId, oldProduct.laminationBackId)) {
                //  裏ライナ （g/㎡）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationBackBasicWeight, oldProduct.laminationBackBasicWeight)) {
                //  裏ライナ （g/㎡）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationBackThroughWage, oldProduct.laminationBackThroughWage)) {
                //  裏ライナ （g/㎡）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationNumber, oldProduct.laminationNumber)) {
                //  片段取数
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.takenNumber, oldProduct.takenNumber)) {
                //  取数
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.impositionNumber, oldProduct.impositionNumber)) {
                //  面付数
                this.getSF00302Data().checkInputSave = true;

                // IV. 印刷/ printing area
            } else if (!this.isEquals(currentProduct.printMethod, oldProduct.printMethod)) {
                //  印刷方法
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.colorIdF, oldProduct.colorIdF)) {
                //  印刷方法
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.specialColorF, oldProduct.specialColorF)) {
                //  特殊色数（表）
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
            } else if (!this.isEquals(currentProduct.colorFText4, oldProduct.colorFText4)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.colorFText5, oldProduct.colorFText5)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.colorFText6, oldProduct.colorFText6)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.colorFText7, oldProduct.colorFText7)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.colorFText8, oldProduct.colorFText8)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.colorIdB, oldProduct.colorIdB)) {
                //  印刷方法
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.specialColorB, oldProduct.specialColorB)) {
                //  特殊色数（表）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.colorBText1, oldProduct.colorBText1)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.colorBText2, oldProduct.colorBText2)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.colorBText3, oldProduct.colorBText3)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.colorBText4, oldProduct.colorBText4)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;

                // V. 表面加工/ surfaceTreatment area
            } else if (!this.isEquals(currentProduct.surfaceTreatmentIdF, oldProduct.surfaceTreatmentIdF)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.surfaceTreatmentIdB, oldProduct.surfaceTreatmentIdB)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.embossingCode, oldProduct.embossingCode)) {
                //  使用色（表）
                this.getSF00302Data().checkInputSave = true;

                // VI. 型出し・箔押し加工/ stamping area
            } else if (!this.isEquals(currentProduct.foilColor1, oldProduct.foilColor1)) {
                //  箔色
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.foilColor2, oldProduct.foilColor2)) {
                //  箔色
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.foilColor3, oldProduct.foilColor3)) {
                //  箔色
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.stampingId, oldProduct.stampingId)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.stampingNumber, oldProduct.stampingNumber)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.stampingSizeH1, oldProduct.stampingSizeH1)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.stampingSizeW1, oldProduct.stampingSizeW1)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.stampingSizeH2, oldProduct.stampingSizeH2)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.stampingSizeW2, oldProduct.stampingSizeW2)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.stampingSizeH3, oldProduct.stampingSizeH3)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.stampingSizeW3, oldProduct.stampingSizeW3)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;

                // VII. 窓貼り加工/ window
            } else if (!this.isEquals(currentProduct.windowSizeH, oldProduct.windowSizeH)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.windowSizeW, oldProduct.windowSizeW)) {
                //  タイプ
                this.getSF00302Data().checkInputSave = true;

                // VIII. 打抜・貼り工程/ Punching area
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

                // IX. 検品・梱包・配送/ Inspection, packing, delivery area
            } else if (!this.isEquals(currentProduct.inspectionId, oldProduct.inspectionId)) {
                //  検品
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.packingId, oldProduct.packingId)) {
                //  梱包
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.packingInputNumber, oldProduct.packingInputNumber)) {
                //  入り数
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.passageNo, oldProduct.passageNo)) {
                //  通函No
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.packingNote, oldProduct.packingNote)) {
                //  梱包備考
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.shippingCostId, oldProduct.shippingCostId)) {
                //  納入先距離
                this.getSF00302Data().checkInputSave = true;

                // X. 備考（製造仕様書に表示）/ memo area
            } else if (!this.isEquals(currentProduct.memo1, oldProduct.memo1)) {
                //  備考1
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.memo2, oldProduct.memo2)) {
                //  備考2
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.memo3, oldProduct.memo3)) {
                //  備考3
                this.getSF00302Data().checkInputSave = true;

                // XI.その他（製造単価に含める特殊加工工賃等）/ ohther area
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

    isEquals(a: any, b: any) {
        return Object.is(a, b);
    }


    calcAdditionFare() {
        this.calculateAllOutput(() => {
            let result = 0;
            if (this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.requiredAdditionalWork == 1) {
                result = 10000;
            }
            this.sf00302Data.productOutput.cartonSpecialFare = result;
        });
        this.calcSubTotal();
    }

    calcCartonLotGap() {
    }
}