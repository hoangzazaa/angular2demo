import {Injectable} from "@angular/core";
import {MSG} from "../../../../../../helper/message";
import DataUtil from "../../../../../../util/data-util";
import MathUtil from "../../../../../../util/math-util";
import {SF0030208Helper} from "../SF0030208.helper";
import {SF00302Data} from "../../../SF00302.data";
import {SF0030201Helper} from "../../common/SF0030201.helper";
import {SF0030202Helper} from "./SF0030202.helper";
import {SF0030203Helper} from "../../common/SF0030203.helper";
import {SF0030204Helper} from "./SF0030204.helper";
import {SF0030205Helper} from "../../common/SF0030205.helper";
import {SF0030206Helper} from "./SF0030206.helper";
import {SF0030207Helper} from "./SF0030207.helper";
import {SF0030209Helper} from "../SF0030209.helper";
import {SF0030210Helper} from "../SF0030210.helper";
import {SF0030211Helper} from "../SF0030211.helper";
import {SF0030212Helper} from "../SF0030212.helper";
import {SF0030213Helper} from "../SF0030213.helper";
import {FormatUtil} from "../../../../../../util/format-util";
import { MstSheetSize } from "../../../../../../model/core/MstSheetSize.model";

/**
 * 紙器の製品情報入力フォームのヘルパー
 *
 * Component class to binding data on SF003-02 screen.
 * @author DungTQ
 */
@Injectable()
export class SF003020101Helper implements SF0030201Helper, SF0030202Helper, SF0030203Helper, SF0030204Helper, SF0030205Helper, SF0030206Helper, SF0030207Helper, SF0030208Helper, SF0030209Helper, SF0030210Helper, SF0030211Helper, SF0030212Helper, SF0030213Helper {
    getSF00302Data(): SF00302Data {
        return this.sf00302Data;
    }

    sf00302Data: SF00302Data;

    /** @deprecated Unused? */
    validateProductName() {
        if (!this.sf00302Data.product.productName) {
            let $err = $("#productName-error");
            if ($err.length > 0) {
                return false;
            }

            $err = jQuery('<div/>', {
                id: "productName-error",
                text: MSG.SF00302.ERR013
            })
                .addClass("help-block text-right animated fadeInDown");
            let $productNameCol = $("#productName").parent().parent();
            $productNameCol.append($err);
            $productNameCol.parent().addClass("has-error");

            return false;
        } else if (this.sf00302Data.product.productName.length > 30) {
            let $err = $("#productName-error");
            if ($err.length > 0) {
                return false;
            }

            $err = jQuery('<div/>', {
                id: "productName-error",
                text: MSG.SF00302.ERR014
            })
                .addClass("help-block text-right animated fadeInDown");
            let $productNameCol = $("#productName").parent().parent();
            $productNameCol.append($err);
            $productNameCol.parent().addClass("has-error");

            return false;
        } else {
            this.clearProductNameErrMsg();
            return true;
        }
    }

    clearProductNameErrMsg() {
        let errEl = $("#productName-error");
        errEl.parent().parent().removeClass("has-error");
        errEl.remove();
    }

    get isRequestDesign(): boolean {
        return this.sf00302Data.product.requestDesignFlag == 1;
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
     * Calculate for attributes: this.calcThroughNumber() of product output
     */
    calcThroughNumber() {
        return MathUtil.checkNaN(MathUtil.ceilDecimal(this.sf00302Data.productOutput.lot / this.sf00302Data.product.impositionNumber, 0));
    }

    /**
     * Calculate for attributes: paperActualWeight of product output
     */
    calcPaperActualWeight() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let paperActualWeight = 0;
                if (this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.paperNameId != undefined) {
                    paperActualWeight = MathUtil.checkNaN(MathUtil.roundDecimal(MathUtil.floorDecimal(this.sf00302Data.product.paperWeight * this.sf00302Data.product.paperSizeH * this.sf00302Data.product.paperSizeW / 10000000, 1) * 2, 0) / 2);
                }
                this.sf00302Data.productOutput.paperActualWeight = paperActualWeight;
            });

            this.calcPaperUnitPrice();
            this.calcPaperTotalCost();
        }
    }

    /**
     * Calculate for attributes: paperUnitPrice of product output
     */
    calcPaperUnitPrice() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let paperUnitPrice = 0;
                if (this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.paperNameId != undefined) {
                    paperUnitPrice = MathUtil.checkNaN(MathUtil.ceilDecimal(this.sf00302Data.productOutput.paperActualWeight * this.calcNormValue(1) / 100, 2));
                }
                this.sf00302Data.productOutput.paperUnitPrice = paperUnitPrice;
            });

            this.calcPaperTotalCost();
            if (this.sf00302Data.product.printMethod != 2) {
                this.calcColorPrintLoss(2);
                this.calcColorPrintLoss(1);
            }
            this.calcManagementCost();
        }
    }

    /**
     * Calculate for attributes: paperTotalCost of product output
     */
    calcPaperTotalCost() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let paperTotalCost = 0;
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0) {
                    if (this.sf00302Data.productOutput.paperActualWeight != 0) {
                        paperTotalCost = MathUtil.checkNaN(MathUtil.ceilDecimal(this.sf00302Data.productOutput.paperUnitPrice * this.sf00302Data.productOutput.lot / this.sf00302Data.product.takenNumber, 0));
                    }
                }
                this.sf00302Data.productOutput.paperTotalCost = paperTotalCost;
            });

            this.calcDieCuttingLoss();
            this.calcSubTotal();
        }
    }

    /**
     * Calculate for attributes: laminationUnitPrice of product output
     */
    calcLaminationUnitPrice() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let laminationUnitPrice = 0;
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.laminationFlute != 1) {
                    if (this.sf00302Data.product.laminationFlute != 0) {
                        let fluteFactor;
                        if (this.sf00302Data.product.laminationFlute == 3) {
                            fluteFactor = 1.4;
                        } else {
                            fluteFactor = 1.3;
                        }
                        laminationUnitPrice = MathUtil.checkNaN(MathUtil.roundDecimal(fluteFactor * this.productLaminationMediumBasicWeight * this.productLaminationMediumThroughWage / 1000
                            + this.productLaminationBackBasicWeight * this.productLaminationBackThroughWage / 1000, 2));
                    }
                }
                this.sf00302Data.productOutput.laminationUnitPrice = laminationUnitPrice;
            });

            this.calcLaminationSheetCost();
            this.calcLaminationTotalCost();
        }

    }

    /**
     * Calculate for attributes: laminationSheetCost of product output
     */
    calcLaminationSheetCost() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let laminationSheetCost = 0;
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.laminationFlute != 1) {
                    if (MathUtil.checkNaN(this.sf00302Data.product.laminationFlute)) {
                        let laminationNumberFactor1;
                        let laminationNumberCondition = this.sf00302Data.productOutput.lot / this.productLaminationNumber;
                        if (laminationNumberCondition > 10000) {
                            laminationNumberFactor1 = 1.1;
                        } else {
                            laminationNumberFactor1 = 1.07;
                        }
                        let laminationNumberFactor2;
                        //3029-comment 24
                        if (laminationNumberCondition <= 1000) {
                            laminationNumberFactor2 = 35;
                        } else if (laminationNumberCondition <= 2000) {
                            laminationNumberFactor2 = 27;
                        } else if (laminationNumberCondition <= 3000) {
                            laminationNumberFactor2 = 24;
                        } else if (laminationNumberCondition <= 5000) {
                            laminationNumberFactor2 = 22;
                        } else if (laminationNumberCondition <= 7000) {
                            laminationNumberFactor2 = 21.5;
                        } else {
                            laminationNumberFactor2 = 19;
                        }
                        laminationSheetCost = MathUtil.checkNaN(MathUtil.ceilDecimal((laminationNumberFactor1 * this.sf00302Data.productOutput.laminationUnitPrice
                            + laminationNumberFactor2) * this.productLaminationWidth * this.productLaminationCuttingFlow / 1000000 / this.productLaminationNumber, 2));
                    }
                }
                this.sf00302Data.productOutput.laminationSheetCost = laminationSheetCost;
            });

            this.calcLaminationTotalCost();
        }
    }

    /**
     * Calculate for attributes: laminationTotalCost of product output
     */
    calcLaminationTotalCost() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let laminationTotalCost = 0;
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.laminationFlute != 1) {
                    if (MathUtil.checkNaN(this.sf00302Data.product.laminationFlute)) {
                        laminationTotalCost = MathUtil.checkNaN(this.sf00302Data.productOutput.laminationSheetCost * this.sf00302Data.productOutput.lot / this.sf00302Data.product.impositionNumber);
                    }
                }
                this.sf00302Data.productOutput.laminationTotalCost = MathUtil.roundDecimal(laminationTotalCost, 2);
            });

            this.calcDieCuttingLoss();
            this.calcSubTotal();

        }
    }

    /**
     * Calculate for attributes: colorPlateCost of product output
     * @param {number} id: define calculate front or back color
     */
    calcColorPlateCost(id: number) {
        if (this.sf00302Data.product.shapeId == this.sf00302Data.DECORATIVE_ID) {
        } else {
            this.calculateAllOutput(() => {
                let result = 0,
                    unit_price_of_plate = 4000,
                    product = this.sf00302Data.product,
                    productOutput = this.sf00302Data.productOutput;

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
                            } else {
                                result = 0;
                            }
                        } else {
                            if (product.printMethod != 2) {
                                result = product.colorIdF * unit_price_of_plate;
                            } else {
                                result = unit_price_of_plate;
                            }
                        }
                    } else if (id == 2 && product.colorIdB > 0) {
                        if (!(product.surfaceTreatmentIdB == 8 || product.surfaceTreatmentIdB == 17
                                || product.surfaceTreatmentIdB > 18)) {
                            if (product.printMethod != 2) {
                                result = (product.colorIdB - 1) * unit_price_of_plate;
                            } else {
                                result = 0;
                            }
                        } else {
                            if (product.printMethod != 2) {
                                result = product.colorIdB * unit_price_of_plate;
                            } else {
                                result = unit_price_of_plate;
                            }
                        }
                    }
                }
                result = MathUtil.checkNaN(result);
                if (id != 1) {
                    productOutput.colorPlateCostB = result;
                } else {
                    productOutput.colorPlateCostF = result;
                }

            });
            this.calcColorTotalCost(id);
        }
    }

    /**
     * Calculate for attributes: colorPrintLoss of product output
     * @param {number} id: define calculate front or back color
     * @param {number} this.calcThroughNumber(): value of through number of current product output
     */
    calcColorPrintLoss(id: number) {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = 0;
                var factor;
                let productOutput = this.sf00302Data.productOutput;
                let product = this.sf00302Data.product;
                if (this.sf00302Data.product.printMethod == 0 && (this.sf00302Data.product.surfaceTreatmentIdF > 18 || this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 17)) {
                    this.sf00302Data.product.colorIdF = 2;
                }
                if (this.sf00302Data.product.printMethod == 0 && (this.sf00302Data.product.surfaceTreatmentIdB > 18 || this.sf00302Data.product.surfaceTreatmentIdB == 8 || this.sf00302Data.product.surfaceTreatmentIdB == 17)) {
                    this.sf00302Data.product.colorIdB = 2;
                }
                if (this.sf00302Data.product.printMethod != 2) {
                    if (id == 1) {
                        factor = this.sf00302Data.product.colorIdF - 1;
                    } else {
                        factor = this.sf00302Data.product.colorIdB - 1;
                    }
                } else {
                    factor = 0;
                }
                if (factor >= 0) {
                    if ((id == 1 && (this.getSF00302Data().product.surfaceTreatmentIdF == 8 || this.getSF00302Data().product.surfaceTreatmentIdF == 9 || this.sf00302Data.product.surfaceTreatmentIdF == 17
                            || this.getSF00302Data().product.surfaceTreatmentIdF > 18))
                        || (id == 2 && (this.getSF00302Data().product.surfaceTreatmentIdB == 8 || this.getSF00302Data().product.surfaceTreatmentIdB == 9 || this.sf00302Data.product.surfaceTreatmentIdB == 17
                            || this.getSF00302Data().product.surfaceTreatmentIdB > 18))) {
                        factor++;
                    }
                    if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && factor != 0) {
                        if (this.calcThroughNumber() >= 30000) {
                            result = this.calcThroughNumber() * this.sf00302Data.productOutput.paperUnitPrice * factor * 0.01;
                        } else if (this.calcThroughNumber() >= 10000) {
                            result = this.calcThroughNumber() * this.sf00302Data.productOutput.paperUnitPrice * factor * 0.015;
                        } else {
                            let rate = MathUtil.checkNaN((product.cutPaperSizeW * product.cutPaperSizeH) / (product.paperSizeW * product.paperSizeH));
                            result = MathUtil.ceilDecimal(this.sf00302Data.productOutput.paperUnitPrice * (factor * 100) * rate, 0);
                        }
                    }
                }
                result = MathUtil.checkNaN(MathUtil.round(result, 2));
                if (id == 1) {
                    this.sf00302Data.productOutput.colorPrintLossF = result;
                } else {
                    this.sf00302Data.productOutput.colorPrintLossB = result;
                }

            });
            this.calcColorTotalCost(id);
        }
    }

    /**
     * Calculate for attributes: colorBasicCost of product output
     * @param {number} id: define calculate front or back color
     */
    calcColorBasicCost(id: number) {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = 0;
                let condition = 0;
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.mstData != undefined) {
                    if (this.sf00302Data.product.printMethod == 0 && (this.sf00302Data.product.surfaceTreatmentIdF > 18 || this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 17)) {
                        this.sf00302Data.product.colorIdF = 1;
                    }
                    if (this.sf00302Data.product.printMethod == 0 && (this.sf00302Data.product.surfaceTreatmentIdB > 18 || this.sf00302Data.product.surfaceTreatmentIdB == 8 || this.sf00302Data.product.surfaceTreatmentIdB == 17)) {
                        this.sf00302Data.product.colorIdB = 1;
                    }
                    if (id == 1 && this.sf00302Data.product.colorIdF != 0 && this.sf00302Data.product.colorIdF > 0) {
                        condition = this.sf00302Data.product.colorIdF;
                        if (!(this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 17
                                || this.sf00302Data.product.surfaceTreatmentIdF > 18)) {
                            condition = this.sf00302Data.product.colorIdF - 1;
                        }
                        if (this.sf00302Data.product.printMethod == 2) {
                            condition = 1;
                        }
                        result = DataUtil.getData(this.sf00302Data.mstData.mstColor, 0, condition, "basicCost");
                    } else if (id == 2 && this.sf00302Data.product.colorIdB != 0 && this.sf00302Data.product.colorIdB > 0) {
                        condition = this.sf00302Data.product.colorIdB;
                        if (!(this.sf00302Data.product.surfaceTreatmentIdB == 8 || this.sf00302Data.product.surfaceTreatmentIdB == 17
                                || this.sf00302Data.product.surfaceTreatmentIdB > 18)) {
                            condition = this.sf00302Data.product.colorIdB - 1;
                        }
                        if (this.sf00302Data.product.printMethod == 2) {
                            condition = 1;
                        }
                        result = DataUtil.getData(this.sf00302Data.mstData.mstColor, 0, condition, "basicCost");
                    }
                }
                result = MathUtil.checkNaN(result);
                if (id == 1) {
                    this.sf00302Data.productOutput.colorPrintBasicCostF = result;
                } else {
                    this.sf00302Data.productOutput.colorPrintBasicCostB = result;
                }
            });
            this.calcColorTotalCost(id);
        }
    }

    calcDigitalBasicCost() {
        this.calculateAllOutput(() => {
            let result = 0;
            let condition = 0;
            if (MathUtil.checkNaN(this.sf00302Data.productOutput.lot) != 0 && this.sf00302Data.mstData != undefined) {
                if (this.sf00302Data.product.colorIdF == 1 && this.sf00302Data.product.colorIdB == 1 && this.sf00302Data.product.printMethod == 2) {
                    condition = 0;
                } else if ((this.sf00302Data.product.colorIdF == 1 && this.sf00302Data.product.colorIdB == 9) || (this.sf00302Data.product.colorIdF == 9 && this.sf00302Data.product.colorIdB == 1)) {
                    condition = 8;
                } else if ((this.sf00302Data.product.colorIdF == 1 && this.sf00302Data.product.colorIdB == 10) || (this.sf00302Data.product.colorIdF == 10 && this.sf00302Data.product.colorIdB == 1)) {
                    condition = 9;
                } else if (this.sf00302Data.product.colorIdF == 9 && this.sf00302Data.product.colorIdB == 9) {
                    condition = 10;
                } else if ((this.sf00302Data.product.colorIdF == 10 && this.sf00302Data.product.colorIdB == 9) || (this.sf00302Data.product.colorIdF == 9 && this.sf00302Data.product.colorIdB == 10)) {
                    condition = 11;
                } else if (this.sf00302Data.product.colorIdF == 10 && this.sf00302Data.product.colorIdB == 10) {
                    condition = 12;
                } else if ((this.sf00302Data.product.colorIdF == 1 && this.sf00302Data.product.colorIdB == 11) || (this.sf00302Data.product.colorIdF == 11 && this.sf00302Data.product.colorIdB == 1)) {
                    condition = 13;
                } else if ((this.sf00302Data.product.colorIdF == 11 && this.sf00302Data.product.colorIdB == 9) || (this.sf00302Data.product.colorIdF == 9 && this.sf00302Data.product.colorIdB == 11)) {
                    condition = 14;
                } else if ((this.sf00302Data.product.colorIdF == 11 && this.sf00302Data.product.colorIdB == 10) || (this.sf00302Data.product.colorIdF == 10 && this.sf00302Data.product.colorIdB == 11)) {
                    condition = 15;
                } else if ((this.sf00302Data.product.colorIdF == 11 && this.sf00302Data.product.colorIdB == 11) || (this.sf00302Data.product.colorIdF == 11 && this.sf00302Data.product.colorIdB == 11)) {
                    condition = 16;
                }
                result = DataUtil.getData(this.sf00302Data.mstData.mstColor, 0, condition, "basicCost");
            }
            this.sf00302Data.productOutput.digitalBasicCost = result;
            this.calcDigitalTotalCost();
        })
    }

    /**
     * Calculate for attributes: colorThroughWage of product output
     * @param {number} id: define calculate front or back color
     */
    calcColorThroughWage(id: number) {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = 0,
                    condition = 0,
                    productOutput = this.sf00302Data.productOutput,
                    product = this.sf00302Data.product;
                if (productOutput.lot != undefined && productOutput.lot != 0 && this.sf00302Data.mstData != undefined) {
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

                        result = DataUtil.getData(this.sf00302Data.mstData.mstColor, 0, condition, "throughWage");
                        if (this.sf00302Data.product.surfaceTreatmentIdF == 9 ) {
                            // For 水性ニス
                            // 水性ニスの場合は2色価格(2.5円)×3色分
                            let up = result / condition;
                            result = up * (condition + 1);
                        }
                    } else if (id == 2 && product.colorIdB != 0 && product.colorIdB > 0) {
                        condition = product.colorIdB;
                        if (!(product.surfaceTreatmentIdB == 8 || product.surfaceTreatmentIdB == 17 || product.surfaceTreatmentIdB > 18)) {
                            condition = product.colorIdB - 1;
                        }
                        if (product.printMethod == 2) {
                            condition = 1;
                        }

                        result = DataUtil.getData(this.sf00302Data.mstData.mstColor, 0, condition, "throughWage");
                        if (this.sf00302Data.product.surfaceTreatmentIdB == 9) {
                            // For 水性ニス
                            // 水性ニスの場合は2色価格(2.5円)×3色分
                            let up = result / condition;
                            result = up * (condition + 1);
                        }
                    }
                }
                result = MathUtil.checkNaN(result);
                if (id == 1) {
                    productOutput.colorPrintThroughWageF = result;
                } else {
                    productOutput.colorPrintThroughWageB = result;
                }
            });
            this.calcColorSpecial(id);
            this.calcColorTotalCost(id);
        }
    }

    calcDigitalThroughWage() {
        this.calculateAllOutput(() => {
            let result = 0;
            let condition = 0;
            if (this.sf00302Data.product.colorIdF == 1 && this.sf00302Data.product.colorIdB == 1 && this.sf00302Data.product.printMethod == 2) {
                condition = 0;
            } else if ((this.sf00302Data.product.colorIdF == 1 && this.sf00302Data.product.colorIdB == 9) || (this.sf00302Data.product.colorIdF == 9 && this.sf00302Data.product.colorIdB == 1)) {
                condition = 8;
            } else if ((this.sf00302Data.product.colorIdF == 1 && this.sf00302Data.product.colorIdB == 10) || (this.sf00302Data.product.colorIdF == 10 && this.sf00302Data.product.colorIdB == 1)) {
                condition = 9;
            } else if (this.sf00302Data.product.colorIdF == 9 && this.sf00302Data.product.colorIdB == 9) {
                condition = 10;
            } else if ((this.sf00302Data.product.colorIdF == 10 && this.sf00302Data.product.colorIdB == 9) || (this.sf00302Data.product.colorIdF == 9 && this.sf00302Data.product.colorIdB == 10)) {
                condition = 11;
            } else if (this.sf00302Data.product.colorIdF == 10 && this.sf00302Data.product.colorIdB == 10) {
                condition = 12;
            } else if ((this.sf00302Data.product.colorIdF == 1 && this.sf00302Data.product.colorIdB == 11) || (this.sf00302Data.product.colorIdF == 11 && this.sf00302Data.product.colorIdB == 1)) {
                condition = 13;
            } else if ((this.sf00302Data.product.colorIdF == 11 && this.sf00302Data.product.colorIdB == 9) || (this.sf00302Data.product.colorIdF == 9 && this.sf00302Data.product.colorIdB == 11)) {
                condition = 14;
            } else if ((this.sf00302Data.product.colorIdF == 11 && this.sf00302Data.product.colorIdB == 10) || (this.sf00302Data.product.colorIdF == 10 && this.sf00302Data.product.colorIdB == 11)) {
                condition = 15;
            } else if ((this.sf00302Data.product.colorIdF == 11 && this.sf00302Data.product.colorIdB == 11) || (this.sf00302Data.product.colorIdF == 11 && this.sf00302Data.product.colorIdB == 11)) {
                condition = 16;
            }
            result = DataUtil.getData(this.sf00302Data.mstData.mstColor, 0, condition, "throughWage");
            this.sf00302Data.productOutput.digitalThroughWage = result;
            this.calcDigitalTotalCost();
        })
    }

    /**
     * Calculate for attributes: colorSpecial of product output
     * @param {number} id: define calculate front or back color
     */
    calcColorSpecial(id: number) {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = 0;
                let condition = 0;
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0) {
                    if (this.sf00302Data.product.printMethod == 0 && (this.sf00302Data.product.surfaceTreatmentIdF > 18 || this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 17)) {
                        this.sf00302Data.product.colorIdF = 1;
                    }
                    if (this.sf00302Data.product.printMethod == 0 && (this.sf00302Data.product.surfaceTreatmentIdB > 18 || this.sf00302Data.product.surfaceTreatmentIdB == 8 || this.sf00302Data.product.surfaceTreatmentIdB == 17)) {
                        this.sf00302Data.product.colorIdB = 1;
                    }
                    if (id == 1 && this.sf00302Data.product.specialColorF != 0 && this.sf00302Data.product.specialColorF != undefined) {
                        condition = this.sf00302Data.product.colorIdF;
                        if (!(this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 9 || this.sf00302Data.product.surfaceTreatmentIdF == 17 || this.sf00302Data.product.surfaceTreatmentIdF > 18)) {
                            condition = this.sf00302Data.product.colorIdF - 1;
                        }
                        if (this.sf00302Data.product.printMethod == 2) {
                            condition = 1;
                        }
                        result = this.sf00302Data.productOutput.colorPrintThroughWageF / condition * (this.sf00302Data.product.specialColorF - 1);

                    } else if (id == 2 && this.sf00302Data.product.specialColorB != 0 && this.sf00302Data.product.specialColorB != undefined) {
                        condition = this.sf00302Data.product.colorIdB;
                        if (!(this.sf00302Data.product.surfaceTreatmentIdB == 8 || this.sf00302Data.product.surfaceTreatmentIdB == 9 || this.sf00302Data.product.surfaceTreatmentIdB == 17 || this.sf00302Data.product.surfaceTreatmentIdF > 18)) {
                            condition = this.sf00302Data.product.colorIdB - 1;
                        }
                        if (this.sf00302Data.product.printMethod == 2) {
                            condition = 1;
                        }
                        result = this.sf00302Data.productOutput.colorPrintThroughWageB / condition * (this.sf00302Data.product.specialColorB - 1);
                    }
                }
                result = MathUtil.checkNaN(MathUtil.round(result, 2));
                if (id == 1) {
                    this.sf00302Data.productOutput.colorPrintSpecialCostF = result;
                } else {
                    this.sf00302Data.productOutput.colorPrintSpecialCostB = result;
                }
            });
            this.calcColorTotalCost(id);
        }
    }

    /**
     * Calculate for attributes: colorCostPerPacket of product output
     * @param {number} id: define calculate front or back color
     */
    calcColorCostPerPacket(id: number) {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = 0;
                let condition = 0;
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.mstData != undefined) {
                    if (this.sf00302Data.product.printMethod == 0 && (this.sf00302Data.product.surfaceTreatmentIdF > 18 || this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 17)) {
                        this.sf00302Data.product.colorIdF = 1;
                    }
                    if (this.sf00302Data.product.printMethod == 0 && (this.sf00302Data.product.surfaceTreatmentIdB > 18 || this.sf00302Data.product.surfaceTreatmentIdB == 8 || this.sf00302Data.product.surfaceTreatmentIdB == 17)) {
                        this.sf00302Data.product.colorIdB = 1;
                    }
                    if (id == 1 && this.sf00302Data.product.colorIdF != 0 && this.sf00302Data.product.colorIdF > 0) {
                        condition = this.sf00302Data.product.colorIdF;
                        if (!(this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 9 || this.sf00302Data.product.surfaceTreatmentIdF == 17 || this.sf00302Data.product.surfaceTreatmentIdF > 18)) {
                            condition = this.sf00302Data.product.colorIdF - 1;
                        }
                        if (this.sf00302Data.product.printMethod == 2) {
                            condition = 1;
                        }

                        result = DataUtil.getData(this.sf00302Data.mstData.mstColor, 0, condition, "costPerPacket");
                    } else if (id == 2 && this.sf00302Data.product.colorIdB != 0 && this.sf00302Data.product.colorIdB > 0) {
                        condition = this.sf00302Data.product.colorIdB;
                        if (!(this.sf00302Data.product.surfaceTreatmentIdB == 8 || this.sf00302Data.product.surfaceTreatmentIdB == 9 || this.sf00302Data.product.surfaceTreatmentIdB == 17 || this.sf00302Data.product.surfaceTreatmentIdB > 18)) {
                            condition = this.sf00302Data.product.colorIdB - 1;
                        }
                        if (this.sf00302Data.product.printMethod == 2) {
                            condition = 1;
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
    }

    calcDigitalTotalCost() {
        this.calculateAllOutput(() => {
            let result = 0;
            result = this.sf00302Data.productOutput.digitalBasicCost + this.sf00302Data.productOutput.digitalThroughWage * this.calcThroughNumber();
            this.sf00302Data.productOutput.digitalTotalCost = result;
            this.calcDieCuttingLoss();
            this.calcSubTotal();
        })
    }

    /**
     * Calculate for attributes: colorTotalCost of product output
     * @param {number} id: define calculate front or back color
     * @param {number} this.calcThroughNumber(): value of through number of current product output
     */
    calcColorTotalCost(id: number) {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = 0;
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0) {
                    if (id == 1) {
                        let condition = this.sf00302Data.productOutput.colorPrintBasicCostF + (this.sf00302Data.productOutput.colorPrintThroughWageF + this.sf00302Data.productOutput.colorPrintSpecialCostF) * this.calcThroughNumber() + this.sf00302Data.productOutput.colorPrintLossF;
                        if (condition > this.sf00302Data.productOutput.colorPrintPerPacketCostF) {
                            result = condition + this.sf00302Data.productOutput.colorPlateCostF;
                        } else {
                            result = this.sf00302Data.productOutput.colorPrintPerPacketCostF + this.sf00302Data.productOutput.colorPlateCostF;
                        }
                    } else {
                        let condition = this.sf00302Data.productOutput.colorPrintBasicCostB + (this.sf00302Data.productOutput.colorPrintThroughWageB + this.sf00302Data.productOutput.colorPrintSpecialCostB) * this.calcThroughNumber() + this.sf00302Data.productOutput.colorPrintLossB;
                        if (condition > this.sf00302Data.productOutput.colorPrintPerPacketCostB) {
                            result = condition + this.sf00302Data.productOutput.colorPlateCostB;
                        } else {
                            result = this.sf00302Data.productOutput.colorPrintPerPacketCostB + this.sf00302Data.productOutput.colorPlateCostB;
                        }
                    }
                }
                result = MathUtil.checkNaN(MathUtil.round(result, 2));
                if (id == 1) {
                    this.sf00302Data.productOutput.colorPrintTotalCostF = result;
                } else if (id == 2) {
                    this.sf00302Data.productOutput.colorPrintTotalCostB = result;
                }
            });
            this.calcDieCuttingLoss();
            this.calcSubTotal();
        }
    }

    /**
     * Calculate for attributes: surfaceBasicCost of product output
     * @param {number} id: define calculate front or back or embossing
     */
    calcSurfaceBasicCost(id: number) {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = "0";
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.mstData != undefined) {
                    let size = 1;
                    if (this.sf00302Data.product.cutPaperSizeH * this.sf00302Data.product.cutPaperSizeW <= 220000) {
                        size = 5;
                    } else if (this.sf00302Data.product.cutPaperSizeH * this.sf00302Data.product.cutPaperSizeW <= 308750) {
                        size = 4;
                    } else if (this.sf00302Data.product.cutPaperSizeH * this.sf00302Data.product.cutPaperSizeW <= 440000) {
                        size = 3;
                    } else if (this.sf00302Data.product.cutPaperSizeH * this.sf00302Data.product.cutPaperSizeW <= 617500) {
                        size = 2;
                    }
                    let throughNumber = 1;
                    if (id != 3) {
                        if (this.sf00302Data.productOutput.lot / this.sf00302Data.product.impositionNumber <= 400 &&
                            ((id == 1 && (this.sf00302Data.product.surfaceTreatmentIdF == 4 || this.sf00302Data.product.surfaceTreatmentIdF == 12 || this.sf00302Data.product.surfaceTreatmentIdF == 13 || this.sf00302Data.product.surfaceTreatmentIdF == 18))
                                || (id == 2 && (this.sf00302Data.product.surfaceTreatmentIdB == 4 || this.sf00302Data.product.surfaceTreatmentIdB == 12 || this.sf00302Data.product.surfaceTreatmentIdB == 13 || this.sf00302Data.product.surfaceTreatmentIdB == 18)))) {
                            throughNumber = 3;
                        } else if (this.sf00302Data.productOutput.lot / this.sf00302Data.product.impositionNumber <= 1000) {
                            throughNumber = 2;
                        }
                    } else {
                        if (this.sf00302Data.productOutput.lot / this.sf00302Data.product.impositionNumber <= 1000) {
                            throughNumber = 2;
                        }
                    }
                    if (id == 1) {
                        if (this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 9 || this.sf00302Data.product.surfaceTreatmentIdF == 17) {
                            result = "印刷代に含む";
                        } else if (this.sf00302Data.product.surfaceTreatmentIdF == 0) {
                            result = "0";
                        } else {
                            let id = this.sf00302Data.product.surfaceTreatmentIdF;
                            if (id == 15 || id > 18) {
                                id = 6;
                            } else if (id == 16) {
                                id = 7;
                            }
                            result = DataUtil.getData(this.sf00302Data.mstData.mstSurfaceTreatment, 0, id, size, throughNumber, "basicCost");
                        }
                    } else if (id == 2) {
                        if (this.sf00302Data.product.surfaceTreatmentIdB == 8 || this.sf00302Data.product.surfaceTreatmentIdB == 9 || this.sf00302Data.product.surfaceTreatmentIdB == 17) {
                            result = "印刷代に含む";
                        } else if (this.sf00302Data.product.surfaceTreatmentIdB == 0) {
                            result = "0";
                        } else {
                            let id = this.sf00302Data.product.surfaceTreatmentIdB;
                            if (id == 15 || id > 18) {
                                id = 6;
                            } else if (id == 16) {
                                id = 7;
                            }
                            result = DataUtil.getData(this.sf00302Data.mstData.mstSurfaceTreatment, 0, id, size, throughNumber, "basicCost");
                        }
                    } else {
                        if (MathUtil.checkNaN(this.sf00302Data.product.embossingID)) {
                            result = DataUtil.getData(this.sf00302Data.mstData.mstSurfaceTreatment, 0, 5, size, throughNumber, "basicCost");
                        } else {
                            result = "0";
                        }
                    }
                }
                if (id == 1) {
                    this.sf00302Data.productOutput.surfaceTreatmentBasicCostF = result;
                } else if (id == 2) {
                    this.sf00302Data.productOutput.surfaceTreatmentBasicCostB = result;
                } else {
                    this.sf00302Data.productOutput.embossingBasicCost = (+result);
                }
            });

            this.calcSurfaceTotalCost(id);
        }
    }

    /**
     * Calculate for attributes: surfaceThroughWage of product output
     * @param {number} id: define calculate front or back or embossing
     */
    calcSurfaceThroughWage(id: number) {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = "0";
                let size = 1;
                if (this.sf00302Data.product.cutPaperSizeH * this.sf00302Data.product.cutPaperSizeW <= 220000) {
                    size = 5;
                } else if (this.sf00302Data.product.cutPaperSizeH * this.sf00302Data.product.cutPaperSizeW <= 308750) {
                    size = 4;
                } else if (this.sf00302Data.product.cutPaperSizeH * this.sf00302Data.product.cutPaperSizeW <= 440000) {
                    size = 3;
                } else if (this.sf00302Data.product.cutPaperSizeH * this.sf00302Data.product.cutPaperSizeW <= 617500) {
                    size = 2;
                }
                let throughNumber = 1;
                if (id != 3) {
                    if (this.sf00302Data.productOutput.lot / this.sf00302Data.product.impositionNumber <= 400 &&
                        ((id == 1 && (this.sf00302Data.product.surfaceTreatmentIdF == 4 || this.sf00302Data.product.surfaceTreatmentIdF == 12 || this.sf00302Data.product.surfaceTreatmentIdF == 13 || this.sf00302Data.product.surfaceTreatmentIdF == 18))
                            || (id == 2 && (this.sf00302Data.product.surfaceTreatmentIdB == 4 || this.sf00302Data.product.surfaceTreatmentIdB == 12 || this.sf00302Data.product.surfaceTreatmentIdB == 13 || this.sf00302Data.product.surfaceTreatmentIdB == 18)))) {
                        throughNumber = 3;
                    } else if (this.sf00302Data.productOutput.lot / this.sf00302Data.product.impositionNumber <= 1000) {
                        throughNumber = 2;
                    }
                } else {
                    if (this.sf00302Data.productOutput.lot / this.sf00302Data.product.impositionNumber <= 1000) {
                        throughNumber = 2;
                    }
                }
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.mstData != undefined) {
                    if (id == 1) {
                        if (this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 9 || this.sf00302Data.product.surfaceTreatmentIdF == 17) {
                            result = "印刷代に含む";
                        } else if (this.sf00302Data.product.surfaceTreatmentIdF == 0) {
                            result = "0";
                        } else {
                            let id = this.sf00302Data.product.surfaceTreatmentIdF;
                            if (id == 15 || id > 18) {
                                id = 6;
                            } else if (id == 16) {
                                id = 7;
                            }
                            result = DataUtil.getData(this.sf00302Data.mstData.mstSurfaceTreatment, 0, id, size, throughNumber, "throughWage");
                        }
                    } else if (id == 2) {
                        if (this.sf00302Data.product.surfaceTreatmentIdB == 8 || this.sf00302Data.product.surfaceTreatmentIdB == 9 || this.sf00302Data.product.surfaceTreatmentIdB == 17) {
                            result = "印刷代に含む";
                        } else if (this.sf00302Data.product.surfaceTreatmentIdB == 0) {
                            result = "0";
                        } else {
                            let id = this.sf00302Data.product.surfaceTreatmentIdB;
                            if (id == 15 || id > 18) {
                                id = 6;
                            } else if (id == 16) {
                                id = 7;
                            }
                            result = DataUtil.getData(this.sf00302Data.mstData.mstSurfaceTreatment, 0, id, size, throughNumber, "throughWage");
                        }
                    } else {
                        if (MathUtil.checkNaN(this.sf00302Data.product.embossingID)) {
                            result = DataUtil.getData(this.sf00302Data.mstData.mstSurfaceTreatment, 0, 5, size, throughNumber, "throughWage");
                        } else {
                            result = "0";
                        }

                    }
                }
                if (id == 1) {
                    this.sf00302Data.productOutput.surfaceTreatmentThroughWageF = result;
                } else if (id == 2) {
                    this.sf00302Data.productOutput.surfaceTreatmentThroughWageB = result;
                } else {
                    this.sf00302Data.productOutput.embossingThroughWage = +result;
                }
            });

            this.calcSurfaceTotalCost(id);
        }
    }


    /**
     * Calculate for attributes: surfaceTotalCost of product output
     * @param {number} id: define calculate front or back or embossing
     */
    calcSurfaceTotalCost(id: number) {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = 0;
                let product = this.sf00302Data.product;
                let productOutput = this.sf00302Data.productOutput;
                if (productOutput.lot != undefined && productOutput.lot != 0) {
                    if ( id == 1 || id == 2 ) {
                        let surfaceTreatmentId, surfaceTreatmentBasicCost, surfaceTreatmentThroughWage;
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

                        if (surfaceTreatmentId != 8 && surfaceTreatmentId != 9 && surfaceTreatmentId != 0 && this.isEnableSurfaceOption(product.factoryId, surfaceTreatmentId)) {
                            result = (+surfaceTreatmentBasicCost) + (+surfaceTreatmentThroughWage) * this.calcThroughNumber();
                            result = MathUtil.checkNaN(result);
                        }
                    }
                    else {
                        if (MathUtil.checkNaN(this.sf00302Data.product.embossingID)) {
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
    }


    //
    /**
     * 表面加工の選択値がその工場で利用可能かを返却
     * 取り急ぎ現状は、小野工場のPR貼り不可の件に対応するため実装
     * @param {factory_id} id: FACTORY on mst-data-type.js
     * @param {surface_id} id: SURFACE_TREATMENT on mst-data-type.js
     */
    isEnableSurfaceOption(factory_id, surface_id) {
        if (factory_id == 2 && surface_id == 4) return false;
        return true;
    }


    /**
     * Calculate stampingFoildNumber of productOutputs
     */
    calcStampingPointsNumber() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            //new stamping points number's place holder
            let result = 0;

            //stamping points number only valid when stamping mode is Foil Stamping
            if (this.sf00302Data.product.stampingId != 0 && this.isEnableStampingType() ) {
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
            this.sf00302Data.product.stampingPointsNumber = result;
        }
    }

    /**
     * Calculate for attributes: stampingBasicCost of product output
     */
    calcStampingBasicCost() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
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
                let blankSize = 1;
                if (big <= 550 && small <= 400) {
                    blankSize = 3;
                } else if (big < 800 && small < 551) {
                    blankSize = 2;
                }
                if (this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.stampingId != undefined && this.sf00302Data.mstData != undefined && this.isEnableStampingType()) {
                    result = DataUtil.getData(this.sf00302Data.mstData.mstStamping, 0, this.sf00302Data.product.stampingId, blankSize, "basicCost");
                }
                this.sf00302Data.productOutput.stampingBasicCost = result;
            });

            this.calcStampingTotalCost();
        }

    }

    /**
     * Calculate for attributes: stampingThroughWage of product output
     */
    calcStampingThroughWage() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
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
                let blankSize = 1;
                if (big <= 550 && small <= 400) {
                    blankSize = 3;
                } else if (big < 800 && small < 551) {
                    blankSize = 2;
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

                if (this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.mstData != undefined && this.isEnableStampingType()) {
                    if (this.sf00302Data.product.stampingId != 0) {
                        result = DataUtil.getData(this.sf00302Data.mstData.mstStamping, 0, this.sf00302Data.product.stampingId, blankSize, "throughWage");
                        if (this.sf00302Data.product.stampingId == 1 || this.sf00302Data.product.stampingId == 2) {
                            result = result + MathUtil.checkNaN(sumSize);
                        }
                        if (this.sf00302Data.product.stampingPointsNumber > 1) {
                            result = result + (this.sf00302Data.product.stampingPointsNumber - 1) * 0.8;
                        }
                    }
                }
                result = MathUtil.checkNaN(MathUtil.round(result, 2));
                this.sf00302Data.productOutput.stampingThroughWage = result;
            });

            this.calcStampingTotalCost();
        }
    }

    /**
     * Calculate for attributes: stampingTotalCost of product output
     */
    calcStampingTotalCost() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                this.sf00302Data.productOutput.stampingTotalCost = MathUtil.checkNaN(this.sf00302Data.productOutput.stampingBasicCost + this.sf00302Data.productOutput.stampingThroughWage * this.sf00302Data.productOutput.lot)
            });

            this.calcSubTotal();
        }
    }


    //
    /**
     * 箔押しの選択値がその工場で利用可能かを返却
     * 取り急ぎ現状は、小野工場のPR貼り不可の件に対応するため実装
     */
    isEnableStampingType() {
        if (this.sf00302Data.product.factoryId == 2 && this.sf00302Data.product.stampingId == 1) return false;
        return true;
    }

    get useDieCuttingFlatFee(): boolean {
        return this.throughNumber <= 1000;
    }


    /**
     * Calculate for attributes: dieCuttingLoss of product output
     */
    calcDieCuttingLoss() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {

            // 一律料金を使用する場合はロスを0とする
            if(this.useDieCuttingFlatFee){
                this.sf00302Data.productOutput.dieCuttingLoss = 0;

            // 一律料金を使用しない場合はロスを計算する
            } else {
                this.calculateAllOutput(() => {
                    let result = 0;
                    if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.dieCuttingThroughNumber != 0
                        && this.sf00302Data.product.dieCuttingFlag == 1) {
                        result = MathUtil.checkNaN(this.sf00302Data.productOutput.paperTotalCost)
                            + MathUtil.checkNaN(this.sf00302Data.productOutput.surfaceTreatmentTotalCostF)
                            + MathUtil.checkNaN(this.sf00302Data.productOutput.surfaceTreatmentTotalCostB)
                            + MathUtil.checkNaN(this.sf00302Data.productOutput.embossingTotalCost)
                            + MathUtil.checkNaN(this.sf00302Data.productOutput.laminationTotalCost);
                        if (this.sf00302Data.product.printMethod != 2) {
                            result = result + MathUtil.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostB) + MathUtil.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostF);
                        } else {
                            result = result + MathUtil.checkNaN(this.sf00302Data.productOutput.digitalTotalCost);
                            if (this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 17 || this.sf00302Data.product.surfaceTreatmentIdF > 18) {
                                result = result + MathUtil.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostF);
                            }
                            if (this.sf00302Data.product.surfaceTreatmentIdB == 8 || this.sf00302Data.product.surfaceTreatmentIdB == 17 || this.sf00302Data.product.surfaceTreatmentIdB > 18) {
                                result = result + MathUtil.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostB);
                            }
                        }
                        result = MathUtil.checkNaN(MathUtil.ceilDecimal(result * 0.01, 0));
                    }
                    this.sf00302Data.productOutput.dieCuttingLoss = result;
                });
            }

            this.calcDieCuttingTotalCost();
            this.calcPasteLoss();
        }
    }

    /**
     * Calculate for attributes: dieCuttingBasicCost of product output
     */
    calcDieCuttingBasicCost() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = 0;
                if ( this.sf00302Data.product.dieCuttingFlag == 1 ) {
                    let size = 1;
                    if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0) {
                        let condition = this.sf00302Data.product.cutPaperSizeH * this.sf00302Data.product.cutPaperSizeW;
                        if (condition < 309000) {
                            size = 3;
                        } else if (condition <= 617500) {
                            size = 2;
                        }
                    }
                    let number = 1;
                    if (this.sf00302Data.productOutput.lot / this.sf00302Data.product.dieCuttingThroughNumber <= 1000) {
                        number = 2;
                    }
                    if (this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.dieCuttingThroughNumber != 0 && this.sf00302Data.mstData != undefined
                        && this.sf00302Data.product.dieCuttingFlag == 1) {
                        result = DataUtil.getData(this.sf00302Data.mstData.mstDieCutting, 0, this.sf00302Data.product.laminationFlute, size, this.sf00302Data.product.dieCuttingThroughNumber, number, "basicCost");
                    }
                }
                this.sf00302Data.productOutput.dieCuttingBasicCost = result;
            });
            this.calcDieCuttingTotalCost();
        }
    }

    /**
     * Calculate for attributes: dieCuttingThroughWage of product output
     */
    calcDieCuttingThroughWage() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {

            // 一律料金を使用する場合はロスを0とする
            if(this.useDieCuttingFlatFee){
                this.sf00302Data.productOutput.dieCuttingThroughWage = 0;

            // 一律料金を使用しない場合はロスを計算する
            } else {
                this.calculateAllOutput(() => {
                    let result = 0;
                    let size = 1;
                    if (this.sf00302Data.product.dieCuttingFlag == 1) {
                        if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0) {
                            let condition = this.sf00302Data.product.cutPaperSizeH * this.sf00302Data.product.cutPaperSizeW;
                            if (condition < 309000) {
                                size = 3;
                            } else if (condition <= 617500) {
                                size = 2;
                            }
                            0
                        }
                        let number = 1;
                        if (this.throughNumber <= 1000) {
                            number = 2;
                        }
                        if (this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.dieCuttingThroughNumber != 0 && this.sf00302Data.mstData != undefined
                            && this.sf00302Data.product.dieCuttingFlag == 1) {
                            result = DataUtil.getData(this.sf00302Data.mstData.mstDieCutting, 0, this.sf00302Data.product.laminationFlute, size, this.sf00302Data.product.dieCuttingThroughNumber, number, "throughWage");
                            if (this.sf00302Data.product.dieCuttingWeight == 1) {
                                result = result * 1.2;
                            } else if (this.sf00302Data.product.dieCuttingWeight == 2) {
                                result = result * 1.5;
                            } else if (this.sf00302Data.product.dieCuttingWeight == 3) {
                                result = result * 2;
                            }
                        }
                    }
                    this.sf00302Data.productOutput.dieCuttingThroughWage = result;
                });
            }
            this.calcDieCuttingTotalCost();
        }
    }

    /**
     * Calculate for attributes: dieCuttingTotalCost of product output
     */
    calcDieCuttingTotalCost() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = 0;
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.dieCuttingThroughNumber != 0
                    && this.sf00302Data.product.dieCuttingFlag == 1) {
                    result = MathUtil.checkNaN(this.sf00302Data.productOutput.dieCuttingLoss + this.sf00302Data.productOutput.dieCuttingBasicCost + this.sf00302Data.productOutput.dieCuttingThroughWage * this.throughNumber);
                }
                this.sf00302Data.productOutput.dieCuttingTotalCost = MathUtil.roundDecimal(result, 0);
            });

            this.calcPasteLoss();
            this.calcSubTotal();
        }
    }

    /**
     * Calculate for attributes: pasteLoss of product output
     */
    calcPasteLoss() {

        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = 0;
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.pasteId != undefined && this.sf00302Data.product.pasteId != 0) {
                    result = MathUtil.checkNaN(MathUtil.ceilDecimal((MathUtil.checkNaN(this.sf00302Data.productOutput.dieCuttingLoss) * 100 + MathUtil.checkNaN(this.sf00302Data.productOutput.dieCuttingTotalCost)) * 0.01, 0));
                }
                this.sf00302Data.productOutput.pasteLoss = result;
            });

            this.calcPasteTotalCost();
        }
    }

    /**
     * Calculate for attributes: pasteBasicCost of product output
     */
    calcPasteBasicCost() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let big = 0;
                if (this.sf00302Data.product.blankPaperSizeH > MathUtil.checkNaN(this.sf00302Data.product.blankPaperSizeW)) {
                    big = MathUtil.checkNaN(this.sf00302Data.product.blankPaperSizeH);
                } else {
                    big = MathUtil.checkNaN(this.sf00302Data.product.blankPaperSizeW);
                }
                let result = 0;
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.pasteId != undefined && this.sf00302Data.product.pasteId != 0 && this.sf00302Data.mstData != undefined) {
                    result = DataUtil.getData(this.sf00302Data.mstData.mstPaste, 0, this.sf00302Data.product.laminationFlute, this.sf00302Data.product.pasteId, MathUtil.checkNaN(MathUtil.ceilDecimal(big * 2, -2) / 2).toString(), "basicCost");
                    if (this.sf00302Data.productOutput.lot / this.sf00302Data.product.impositionNumber <= 1000) {
                        result = result * 1.3;
                    }
                    if (this.sf00302Data.product.pasteSpecialFormFlag == 1) {
                        result = result * 1.2;
                    }
                }
                this.sf00302Data.productOutput.pasteBasicCost = MathUtil.checkNaN(result);
            });

            this.calcPasteTotalCost();
        }
    }

    /**
     * Calculate for attributes: pasteThroughWage of product output
     */
    calcPasteThroughWage() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {

            this.calculateAllOutput(() => {
                let big = 0;
                if (this.sf00302Data.product.blankPaperSizeH > MathUtil.checkNaN(this.sf00302Data.product.blankPaperSizeW)) {
                    big = MathUtil.checkNaN(this.sf00302Data.product.blankPaperSizeH);
                } else {
                    big = MathUtil.checkNaN(this.sf00302Data.product.blankPaperSizeW);
                }
                let result = 0;
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.pasteId != undefined && this.sf00302Data.product.pasteId != 0 && this.sf00302Data.mstData != undefined) {
                    result = DataUtil.getData(this.sf00302Data.mstData.mstPaste, 0, this.sf00302Data.product.laminationFlute, this.sf00302Data.product.pasteId, MathUtil.checkNaN(MathUtil.ceilDecimal(big * 2, -2) / 2).toString(), "throughWage");
                    if (this.sf00302Data.productOutput.lot / this.sf00302Data.product.impositionNumber <= 1000) {
                        result = result * 1.3;
                    }
                    if (this.sf00302Data.product.pasteSpecialFormFlag == 1) {
                        result = result * 1.2;
                    }
                }
                this.sf00302Data.productOutput.pasteThroughWage = MathUtil.checkNaN(MathUtil.round(result, 1));
            });

            this.calcPasteTotalCost();
        }
    }

    /**
     * Calculate for attributes: pasteTotalCost of product output
     */
    calcPasteTotalCost() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = 0;
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0) {
                    result = MathUtil.checkNaN(this.sf00302Data.productOutput.pasteBasicCost + this.sf00302Data.productOutput.pasteLoss + this.sf00302Data.productOutput.pasteThroughWage * this.sf00302Data.productOutput.lot);
                }
                this.sf00302Data.productOutput.pasteTotalCost = result;
            });
            this.calcSubTotal();
        }
    }

    /**
     * Calculate for attributes: windowMaterialFee of product output
     */
    calcWindowMaterialFee() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = 0;
                if (this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.product.windowSizeW != 0 && this.sf00302Data.product.windowSizeW != undefined) {
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
    }

    /**
     * Calculate for attributes: windowTotalCost of product output
     */
    calcWindowTotalCost() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
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
    }

    /**
     * Calculate for attributes: inspection of product output
     */
    calcInspection() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let tmp = 0;
                if (this.sf00302Data.product.inspectionId == 2) {
                    tmp = 1;
                } else if (this.sf00302Data.product.inspectionId == 3) {
                    tmp = 0.5
                } else if (this.sf00302Data.product.inspectionId == 4) {
                    tmp = 0.3
                }
                this.sf00302Data.productOutput.inspection = MathUtil.checkNaN(tmp * this.sf00302Data.productOutput.lot);
            });

            this.calcEstimateTotal();
        }
    }

    /**
     * Calculate for attributes: packing of product output
     */
    calcPacking() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let firstSubtotal = MathUtil.checkNaN(this.sf00302Data.productOutput.paperTotalCost +
                    this.sf00302Data.productOutput.surfaceTreatmentTotalCostF + this.sf00302Data.productOutput.surfaceTreatmentTotalCostB +
                    this.sf00302Data.productOutput.embossingTotalCost + this.sf00302Data.productOutput.laminationTotalCost + this.sf00302Data.productOutput.dieCuttingTotalCost +
                    this.sf00302Data.productOutput.stampingTotalCost + this.sf00302Data.productOutput.windowTotalCost
                    + this.getProductOutputOtherFee1() + this.getProductOutputOtherFee2() + this.getProductOutputOtherFee3()
                    + this.sf00302Data.productOutput.pasteTotalCost
                );
                if (this.sf00302Data.product.printMethod != 2) {
                    firstSubtotal = firstSubtotal + this.sf00302Data.productOutput.colorPrintTotalCostB + this.sf00302Data.productOutput.colorPrintTotalCostF;
                } else {
                    firstSubtotal = firstSubtotal + this.sf00302Data.productOutput.digitalTotalCost;
                    if (this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 17 || this.sf00302Data.product.surfaceTreatmentIdF > 18) {
                        firstSubtotal = firstSubtotal + MathUtil.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostF);
                    }
                    if (this.sf00302Data.product.surfaceTreatmentIdB == 8 || this.sf00302Data.product.surfaceTreatmentIdB == 17 || this.sf00302Data.product.surfaceTreatmentIdB > 18) {
                        firstSubtotal = firstSubtotal + MathUtil.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostB);
                    }

                }
                if (this.sf00302Data.mstData != undefined) {
                    let lot = 2;
                    if (this.calcThroughNumber() > 1000) {
                        lot = 1;
                    }
                    let packing = MathUtil.checkNaN(DataUtil.getData(this.sf00302Data.mstData.mstPacking, 0, this.sf00302Data.product.packingId, lot, "percent") * (firstSubtotal + this.sf00302Data.productOutput.inspection));
                    this.sf00302Data.productOutput.packing = MathUtil.round(packing, 2);
                }
            });
            this.calcSubTotal();
            this.calcEstimateTotal();
        }
    }


    /**
     * Calculate for attributes: managementCost of product output
     */
    calcManagementCost() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let result = 0;
                if (this.sf00302Data.productOutput.lot != 0 && this.sf00302Data.productOutput.lot != undefined && this.sf00302Data.productOutput.subtotal != undefined && this.sf00302Data.productOutput.subtotal != 0) {
                    if (this.sf00302Data.productOutput.paperUnitPrice == 0) {
                        result = 0.3 * this.sf00302Data.productOutput.subtotal;
                    } else {
                        result = 0.15 * this.sf00302Data.productOutput.subtotal;
                    }
                    if (result <= 10000 && result != 0) {
                        result = 10000;
                    }
                }
                this.sf00302Data.productOutput.managementCost = MathUtil.checkNaN(MathUtil.roundDecimal(result, 2));

            });
        }
    }

    /**
     * Calculate for attributes: subTotal of product output
     */
    calcSubTotal() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let firstSubtotal = MathUtil.checkNaN(this.sf00302Data.productOutput.paperTotalCost +
                    this.sf00302Data.productOutput.surfaceTreatmentTotalCostF + this.sf00302Data.productOutput.surfaceTreatmentTotalCostB +
                    this.sf00302Data.productOutput.embossingTotalCost + this.sf00302Data.productOutput.laminationTotalCost + this.sf00302Data.productOutput.dieCuttingTotalCost +
                    this.sf00302Data.productOutput.stampingTotalCost + this.sf00302Data.productOutput.windowTotalCost + this.sf00302Data.productOutput.pasteTotalCost + this.getProductOutputOtherFee1() + this.getProductOutputOtherFee2() + +this.getProductOutputOtherFee3()
                    + MathUtil.checkNaN(this.sf00302Data.productOutput.cartonSpecialFare)
                );
                if (this.sf00302Data.product.printMethod != 2) {
                    firstSubtotal = firstSubtotal + this.sf00302Data.productOutput.colorPrintTotalCostB + this.sf00302Data.productOutput.colorPrintTotalCostF;
                } else {
                    firstSubtotal = firstSubtotal + this.sf00302Data.productOutput.digitalTotalCost;
                    if (this.sf00302Data.product.surfaceTreatmentIdF == 8 || this.sf00302Data.product.surfaceTreatmentIdF == 17 || this.sf00302Data.product.surfaceTreatmentIdF > 18) {
                        firstSubtotal = firstSubtotal + MathUtil.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostF);
                    }
                    if (this.sf00302Data.product.surfaceTreatmentIdB == 8 || this.sf00302Data.product.surfaceTreatmentIdB == 17 || this.sf00302Data.product.surfaceTreatmentIdB > 18) {
                        firstSubtotal = firstSubtotal + MathUtil.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostB);
                    }
                }
                let subtotal = 0;
                subtotal = MathUtil.checkNaN(this.sf00302Data.productOutput.packing + firstSubtotal + this.sf00302Data.productOutput.inspection);
                this.sf00302Data.productOutput.subtotal = subtotal;
            });

            this.calcManagementCost();
            this.calcEstimateTotal();
        }
    }

    /**
     * Calculate for attributes: estimatedTotal of product output
     */
    calcEstimateTotal() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                this.sf00302Data.productOutput.estimatedTotal = MathUtil.checkNaN((+this.sf00302Data.productOutput.subtotal) + (+this.sf00302Data.productOutput.managementCost));
                if (this.sf00302Data.productOutput.fareLineService != undefined) {
                    this.sf00302Data.productOutput.estimatedTotal = this.sf00302Data.productOutput.estimatedTotal + MathUtil.checkNaN(+this.sf00302Data.productOutput.fareLineService);
                }
                this.sf00302Data.productOutput.estimatedTotal = MathUtil.roundDecimal(this.sf00302Data.productOutput.estimatedTotal, 2);
            });

            this.calcEstimateUnitPrice();
        }
    }

    /**
     * Calculate for attributes: estimatedUnitPrice of product output
     */
    calcEstimateUnitPrice() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let unitPrice = 0;
                if (this.sf00302Data.productOutput.estimatedTotal != 0) {
                    unitPrice = MathUtil.checkNaN(MathUtil.ceilDecimal(this.sf00302Data.productOutput.estimatedTotal / this.sf00302Data.productOutput.lot, 2));
                }
                this.sf00302Data.productOutput.estimatedUnitPrice = +unitPrice.toFixed(2);
            });

            this.calcEstimateDiff(1);
            this.calcEstimateDiff(2);
        }
    }

    /**
     * Calculate for attributes: submittedTotal of product output
     */
    calcSubmittedTotal() {
        this.calculateAllOutput(() => {
            let submittedTotal = 0;
            if (this.sf00302Data.indexOffer.unitPrice != 0) {
                submittedTotal = MathUtil.checkNaN(this.sf00302Data.indexOffer.unitPrice * this.sf00302Data.productOutput.lot);
            }
            this.sf00302Data.indexOffer.total = submittedTotal;
        });
    }

    /**
     * Calculate for attributes: operatingMargin of product output
     */
    calcEstimateDiff(type: number) {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                let estimatedDiff = 0;
                if (type == 1 && this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
                    if (this.sf00302Data.indexOffer.total != 0) {
                        this.sf00302Data.indexOffer.profitRate = MathUtil.checkNaN(MathUtil.roundDecimal((this.sf00302Data.indexOffer.unitPrice - this.sf00302Data.productOutput.estimatedUnitPrice) / this.sf00302Data.productOutput.estimatedUnitPrice * 100, 2));
                    } else {
                        this.sf00302Data.indexOffer.profitRate = 0;
                    }
                }
            });
        }
    }

    /**
     * Calculate for mold fee of product common fee
     */
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

    calcOtherFee() {
        if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
            this.calculateAllOutput(() => {
                this.calcSubTotal();
                this.calcEstimateTotal();
                this.sf00302Data.productOutput.estimatedTotal = this.sf00302Data.productOutput.estimatedTotal + this.getProductOutputOtherFee1();
                this.sf00302Data.productOutput.estimatedTotal = this.sf00302Data.productOutput.estimatedTotal + this.getProductOutputOtherFee2();
                this.sf00302Data.productOutput.estimatedTotal = this.sf00302Data.productOutput.estimatedTotal + this.getProductOutputOtherFee3();
                this.calcEstimateTotal();
            });
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

    getColorPrintTotalCost(): number {
        return MathUtil.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostF) + MathUtil.checkNaN(this.sf00302Data.productOutput.colorPrintTotalCostB);
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

    getOtherFeeTotalCost(): number {
        return (+this.getProductOutputOtherFee1()) + (+this.getProductOutputOtherFee2()) + (+this.getProductOutputOtherFee3());
    }

    calcShippingCost() {
        let options = [10, 20, 30, 40, 60, 80, 100, 120, 140, 160, 180, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
        this.sf00302Data.checkOverWeight = false;
        this.calculateAllOutput(() => {
            let weight = Math.ceil((this.sf00302Data.product.blankPaperSizeH * this.sf00302Data.product.blankPaperSizeW * this.sf00302Data.product.paperWeight * this.sf00302Data.productOutput.lot / 1000 / 1000 / 1000 + 1) / 10) * 10;

            let index = 0;
            while (index < options.length) {
                if (options[index] >= weight) {
                    weight = options[index];
                    index = options.length + 1;
                } else {
                    index++;
                }
            }
            if (this.sf00302Data.product.factoryId == 1) {
                // Saga factory

                if (this.sf00302Data.product.laminationFlute == 1) {
                    // FIXME: 4500あたりがあやしい。4t = 4000が正解なのでは？
                    this.sf00302Data.productOutput.fareLineService = 0;
                    if (weight < 4500 && +this.sf00302Data.product.shippingCostId > 0 && +this.sf00302Data.product.shippingCostId < 150) {
                        this.sf00302Data.productOutput.fareLineService = this.sf00302Data.product.blankPaperSizeH * this.sf00302Data.product.blankPaperSizeW * this.sf00302Data.product.paperWeight * this.sf00302Data.productOutput.lot / 1000 / 1000 / 1000 * 10;
                    } else if (weight < 4500 && +this.sf00302Data.product.shippingCostId >= 150) {
                        let condition = Math.min(+this.sf00302Data.product.shippingCostId, 450);

                        this.sf00302Data.productOutput.fareLineService = this.sf00302Data.product.blankPaperSizeH * this.sf00302Data.product.blankPaperSizeW * this.sf00302Data.product.paperWeight * this.sf00302Data.productOutput.lot / 1000 / 1000 / 1000 * DataUtil.getData(this.sf00302Data.mstData.mstShippingCost, 0, 0, condition, 4000, "cost");
                    }
                }
                else {
                    // EF / GF / BF
                    let size = (this.sf00302Data.product.blankPaperSizeW * this.sf00302Data.product.blankPaperSizeH) / 1e6;　// ㎜ to ㎡
                    let cost_base = size * this.sf00302Data.productOutput.lot * this.shippingEfCostPoint(this.sf00302Data.product.laminationFlute);
                    let max_capacity = 4500;
                    if (size < max_capacity && +this.sf00302Data.product.shippingCostId > 0 && +this.sf00302Data.product.shippingCostId < 150) {
                        this.sf00302Data.productOutput.fareLineService = cost_base * 10;
                    } else if (size < max_capacity && +this.sf00302Data.product.shippingCostId >= 150) {
                        let condition = Math.min(+this.sf00302Data.product.shippingCostId, 450);
                        this.sf00302Data.productOutput.fareLineService = cost_base * DataUtil.getData(this.sf00302Data.mstData.mstShippingCost, 0, 0, condition, 4000, "cost");
                    }
                }
            } else {
                let distanceOptions = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
                let distance = this.sf00302Data.product.shippingCostId;
                if (distance == 0) {
                    this.sf00302Data.productOutput.fareLineService = 0;
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
                    this.sf00302Data.productOutput.fareLineService = MathUtil.checkNaN(DataUtil.getData(this.sf00302Data.mstData.mstShippingCost, 0, 1, distance, weight, "cost"));
                }
            }
            if (this.sf00302Data.product.blankPaperSizeH * this.sf00302Data.product.blankPaperSizeW * this.sf00302Data.product.paperWeight * this.sf00302Data.productOutput.lot / 1000 / 1000 / 1000 > 4500) {
                this.sf00302Data.checkOverWeight = true;
            }
        });
        this.calcSubTotal();
    }


    shippingEfCostPoint(laminationFluteValue): number {
        if (laminationFluteValue == 3) return 0.9; //BF
        // Maybe EF or GF
        return 0.6;
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

    public validateForm(): boolean {

        let isValidate = true;

        // http://fridaynight.vnext.vn/issues/3369
        if(this.sf00302Data.product.requestDesignFlag == 1){
            return true;
        }

        // check deal name
        if (!this.getSF00302Data().product.productName) {
            this.getSF00302Data().productRequiredItem.isSaveProductName = true;
            // check validate false
            isValidate = false;
        } else {
            this.getSF00302Data().productRequiredItem.isSaveProductName = false;
        }

        if (!!this.getSF00302Data().product.id) {

            if (!this.getSF00302Data().product.factoryId) {
                this.getSF00302Data().productRequiredItem.isSaveFactoryId = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveFactoryId = false;
            }

            if (this.getSF00302Data().productOutput.lot == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveLot = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveLot = false;
            }
            ``

            if (this.getSF00302Data().indexOffer.unitPrice == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice = false;
            }

            if (this.getSF00302Data().product.paperNameId == undefined) {
                this.getSF00302Data().productRequiredItem.isSavePaperName = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSavePaperName = false;
            }

            if (this.getSF00302Data().product.paperWeight == undefined) {
                this.getSF00302Data().productRequiredItem.isSavePaperWeight = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSavePaperWeight = false;
            }

            if (this.getSF00302Data().product.paperSizeW == undefined) {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeW = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeW = false;
            }

            if (this.getSF00302Data().product.paperSizeH == undefined) {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeH = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeH = false;
            }

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

            //取数（丁）
            if (this.getSF00302Data().product.takenNumber == undefined || FormatUtil.isNaN(this.getSF00302Data().product.takenNumber) == 0) {
                this.getSF00302Data().productRequiredItem.isSaveTakenNumber = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveTakenNumber = false;
            }

            //面付数（丁）
            if (this.getSF00302Data().product.impositionNumber == undefined || FormatUtil.isNaN(this.getSF00302Data().product.impositionNumber) == 0) {
                this.getSF00302Data().productRequiredItem.isSaveImpositionNumber = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveImpositionNumber = false;
            }

        }

        return isValidate;
    }


    public validateFormOutput(): boolean {
        let isValidate = true;

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

        return isValidate;
    }

    // check data on change in product info area - follow 3057
    checkChangeDataProduct() {
        let currentProduct = this.getSF00302Data().product;
        let oldProduct = this.getSF00302Data().productOld;
        if (oldProduct.id) {
            // I. Over view area
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
            } else if (!this.isEquals(this.getSF00302Data().paperNormValue, this.getSF00302Data().paperNormValueOld)) {
                // Paper Norm Value
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
            } else if (!this.isEquals(currentProduct.takenNumber, oldProduct.takenNumber)) {
                //  取数
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.impositionNumber, oldProduct.impositionNumber)) {
                //  面付数
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

    /**
     * 通し数 (lot / 打ち抜き面付け数)
     */
    get throughNumber (): number {
        let n = this.sf00302Data.product.dieCuttingThroughNumber || 1;
        if (!this.sf00302Data.productOutput.lot) return 0;
        return MathUtil.checkNaN(MathUtil.ceilDecimal(this.sf00302Data.productOutput.lot / n, 0));
    }


    /**
     * シートサイズ選択ボックスを生成する
     *
     * @return { sheetSizes: サイズの選択肢, selectedIndex: 選択されたサイズの添字 (null: その他のサイズ) }
     */
    createSheetSizeList(): { sheetSizes: MstSheetSize[], selectedIndex: number|null } {
        let paperId;
        let pageData = this.sf00302Data;
        let product = pageData.product;
        let majorPaper = product.paperNameId != 100;
        let sheetSizes: MstSheetSize[];
        let paperModel = pageData.paperTmp;
        let sheetSizeId = product.sheetSizeId;

        // ■原紙 ID
        if (majorPaper) {
            // よく使われる原紙から選択されている場合
            // = paperNameId と坪量 で paper を、原紙サイズより sheet_size を解決する
            paperId        = DataUtil.getData(pageData.mstData.mstPaper, 0,
                product.factoryId, product.paperNameId, product.paperWeight, "paperId");
        } else {
            // モーダルで原紙が選択されている場合
            // paperId より paper, sheetSizeId より sheet_size を解決する
            paperId = paperModel ? paperModel.id : null;
        }

        // ■シートサイズ選択ボックスの選択肢を用意する
        if (majorPaper || !(paperModel && paperModel.tabNumber == 2)) {
            // 特殊原紙以外
            sheetSizes = pageData.mstSheetSizes.filter(item => {
                return item.paperId == paperId;
            });
        } else {
            // 特殊原紙の場合 ... サイズは一意に決まる
            sheetSizes = [ paperModel.toMstSheetSize() ];
        }

        // ■既選択サイズを決定する
        let index = -1;
        if (product.specialSizeFlag) {
            // その他が選択されている
        } else if (majorPaper) {
            // よく使われる原紙の場合
            // 寸法より選択されているサイズを選択する
            index = sheetSizes.findIndex(item => product.paperSizeW == item.width && product.paperSizeH == item.height);
        } else {
            // 一般原紙、特殊原紙の場合
            // sheetSizeId より選択されているサイズを選択する
            index = sheetSizes.findIndex(item => item.id == sheetSizeId);
        }

        // 戻り値
        return {
            sheetSizes: sheetSizes,
            selectedIndex: index >= 0 ? index : null
        };
    }

    calcCartonLotGap() {
    }

}
