import {SF00302Data} from "../../../SF00302.data";
import {Injectable} from "@angular/core";
import {SF0030201Helper} from "../../common/SF0030201.helper";
import {SF0030204Helper} from "../SF003020101/SF0030204.helper";
import {SF0030215Helper} from "../SF003020102/SF0030215.helper";
import {SF0030210Helper} from "../SF0030210.helper";
import {SF0030212Helper} from "../SF0030212.helper";
import {SF0030213Helper} from "../SF0030213.helper";
import {SF0030223Helper} from "../../common/SF0030223.helper";
import {SF0030214Helper} from "../../common/SF0030214.helper";
import {SF0030205Helper} from "../../common/SF0030205.helper";
import {SF0030224Helper} from "./SF0030224.helper";
import MathUtil from "../../../../../../util/math-util";
import DataUtil from "../../../../../../util/data-util";
import {SF0030211Helper} from "../SF0030211.helper";
import {FormatUtil} from "../../../../../../util/format-util";


@Injectable()
export class SF003020103Helper implements SF0030201Helper, SF0030204Helper, SF0030215Helper, SF0030210Helper, SF0030212Helper, SF0030213Helper, SF0030223Helper, SF0030214Helper, SF0030205Helper, SF0030224Helper, SF0030211Helper {
    getDieCuttingPasteTotalCost(): number {
        return MathUtil.checkNaN(this.sf00302Data.productOutput.dieCuttingTotalCost) + MathUtil.checkNaN(this.sf00302Data.productOutput.pasteTotalCost);
    }

    validateForm(): boolean {
        let isValidate = true;
        // http://fridaynight.vnext.vn/issues/3369
        if(this.sf00302Data.product.requestDesignFlag == 1){
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
            if (this.getSF00302Data().product.laminationFlute == undefined || this.getSF00302Data().product.laminationFlute == 1) {
                this.getSF00302Data().productRequiredItem.isSaveFlute = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveFlute = false;
            }

            // シート寸法 (mm)
            if (!this.getSF00302Data().product.paperSizeW) {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeW = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSavePaperSizeW = false;
            }

            // シート寸法 (mm)
            if (!this.getSF00302Data().product.cutPaperSizeW) {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeW = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeW = false;
            }

            if (!this.getSF00302Data().product.cutPaperSizeH) {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeH = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveCutSizeH = false;
            }

            // 中芯（g/㎡）
            if (this.getSF00302Data().product.laminationPaperTypeMedium == undefined || this.getSF00302Data().product.laminationPaperTypeMedium == 0) {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeMedium = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeMedium = false;
            }
            // validate laminationMediumBasicWeight
            if (this.getSF00302Data().product.laminationPaperTypeMedium == 0) {
                if (this.getSF00302Data().product.laminationMediumBasicWeight == undefined
                    || this.getSF00302Data().product.laminationMediumBasicWeight == 0) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            } else {
                if (this.getSF00302Data().product.laminationMediumBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            }
            if (this.getSF00302Data().product.laminationPaperTypeMedium == 8) {
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

            // 裏ライナー（g/㎡）
            if (this.getSF00302Data().product.laminationPaperTypeBack == undefined || this.getSF00302Data().product.laminationPaperTypeBack == 0) {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeBack = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveLaminationPaperTypeBack = false;
            }

            // validate laminationBackBasicWeight
            if (this.getSF00302Data().product.laminationPaperTypeBack == 0) {
                if (this.getSF00302Data().product.laminationBackBasicWeight == undefined
                    || this.getSF00302Data().product.laminationBackBasicWeight == 0) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationMediumBasicWeight = false;
                }
            } else {
                if (this.getSF00302Data().product.laminationBackBasicWeight == undefined) {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackBasicWeight = true;
                    // check validate false
                    isValidate = false;
                } else {
                    this.getSF00302Data().productRequiredItem.isSaveLaminationBackBasicWeight = false;
                }
            }
            if (this.getSF00302Data().product.laminationPaperTypeBack == 8) {
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

            // 取数（丁）
            if (this.getSF00302Data().product.takenNumber == undefined || FormatUtil.isNaN(this.getSF00302Data().product.takenNumber) == 0) {
                this.getSF00302Data().productRequiredItem.isSaveTakenNumber = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveTakenNumber = false;
            }

            // 面付数（丁）
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

    checkChangeDataOffer() {
    }

    /**
     * Calculate for attributes: windowMaterialFee of product output
     */
    calcWindowMaterialFee() {
        this.calculateAllOutput(() => {
            let result = 0;
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().product.windowSizeW != 0 && this.getSF00302Data().product.windowSizeW != undefined) {
                let condition = (+this.getSF00302Data().product.windowSizeW + 40) * (+this.getSF00302Data().product.windowSizeH + 40) * 20 / 1000000;
                if (condition < 0.7) {
                    result = 0.7;
                } else {
                    result = 1;
                }
            }
            this.getSF00302Data().productOutput.windowMaterialFee = MathUtil.checkNaN(result);
        });

        this.calcWindowTotalCost();
    }

    /**
     * Calculate for attributes: windowTotalCost of product output
     */
    calcWindowTotalCost() {
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
            var size = 2;
            if (big > 400 || small > 350) {
                size = 1;
            }
            let lot = 2;
            if (this.getSF00302Data().productOutput.lot <= 1000) {
                lot = 1;
            }
            let material = 2;
            if (this.getSF00302Data().product.laminationFlute == 1) {
                material = 1;
            }
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().mstData != undefined && this.getSF00302Data().product.windowSizeW != 0 && this.getSF00302Data().product.windowSizeW != undefined) {
                result = MathUtil.checkNaN((+DataUtil.getData(this.getSF00302Data().mstData.mstWindow, 0, size, lot, material, "windowPreparationFee")) + ((+DataUtil.getData(this.getSF00302Data().mstData.mstWindow, 0, size, lot, material, "windowThroughWage")) + (+this.getSF00302Data().productOutput.windowMaterialFee)) * this.getSF00302Data().productOutput.lot);
            }
            this.getSF00302Data().productOutput.windowTotalCost = MathUtil.checkNaN(result);
        });

        this.calcSubTotal();
    }

    calcSurfaceBasicCost(id: number) {
    }

    calcSurfaceThroughWage(id: number) {
    }

    calcSurfaceTotalCost(id: number) {
    }

    calcColorPlateCost(id: number) {
    }

    calcColorPrintLoss(id: number) {
    }

    calcColorCostPerPacket(id: number) {
    }

    calcColorBasicCost(id: number) {
    }

    calcColorThroughWage(id: number) {
    }

    calcColorSpecial(id: number) {
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

    calcEstimateDiff(id: number) {
        this.calculateAllOutput(() => {
            let estimatedDiff = 0;
            if (id == 1 && this.getSF00302Data().product.shapeId == this.getSF00302Data().DECORATIVE_ID) {
                if (this.getSF00302Data().indexOffer.total != 0) {
                    this.getSF00302Data().indexOffer.profitRate = MathUtil.checkNaN(MathUtil.roundDecimal((this.getSF00302Data().indexOffer.unitPrice - this.getSF00302Data().productOutput.estimatedUnitPrice) / this.getSF00302Data().productOutput.estimatedUnitPrice * 100, 2));
                } else {
                    this.getSF00302Data().indexOffer.profitRate = 0;
                }
            }
        });
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

    /**
     * Calculate for attributes: dieCuttingLoss of product output
     */
    calcDieCuttingLoss() {
        this.calculateAllOutput(() => {
            let result = 0;
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().product.dieCuttingThroughNumber != 0
                && this.sf00302Data.product.dieCuttingFlag == 1) {
                result = MathUtil.checkNaN(MathUtil.ceilDecimal((MathUtil.checkNaN(this.getSF00302Data().productOutput.paperTotalCost)
                    + MathUtil.checkNaN(this.getSF00302Data().productOutput.laminationTotalCost)) * 0.01, 0));
            }
            this.getSF00302Data().productOutput.dieCuttingLoss = result;
        });
        this.calcPasteLoss();
        this.calcDieCuttingTotalCost();
    }

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

    calcPaperTotalCost() {
        this.calculateAllOutput(() => {
            let paperTotalCost = 0;
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().product.laminationFlute != 1) {
                if (this.getSF00302Data().product.laminationFlute != 0) {
                    let fluteFactor;
                    if (this.getSF00302Data().product.laminationFlute == 3) {
                        fluteFactor = 1.4;
                    } else {
                        fluteFactor = 1.3;
                    }
                    paperTotalCost = MathUtil.checkNaN(MathUtil.roundDecimal(fluteFactor * this.productLaminationMediumBasicWeight * this.productLaminationMediumThroughWage / 1000
                        + this.productLaminationBackBasicWeight * this.productLaminationBackThroughWage / 1000, 2));
                }
            }
            this.getSF00302Data().productOutput.paperTotalCost = paperTotalCost;
            this.calcLaminationUnitPrice();
        });
    }

    calcLaminationSize() {
        this.calculateAllOutput(() => {
            let result = 0;
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().product.laminationFlute != 1) {
                let longValue = this.getSF00302Data().product.paperSizeW;
                if (this.getSF00302Data().product.paperSizeH > this.getSF00302Data().product.paperSizeW) {
                    longValue = this.getSF00302Data().product.paperSizeH;
                }
                let shortCutValue = this.getSF00302Data().product.cutPaperSizeW;
                let longCutValue = this.getSF00302Data().product.cutPaperSizeH;
                if (this.getSF00302Data().product.cutPaperSizeH < this.getSF00302Data().product.cutPaperSizeW) {
                    shortCutValue = this.getSF00302Data().product.cutPaperSizeH;
                    longCutValue = this.getSF00302Data().product.cutPaperSizeW;
                }
                result = MathUtil.checkNaN(longValue / 1000 / (MathUtil.floorDecimal(longValue / shortCutValue, 0)) * longCutValue / 1000);
            }
            this.getSF00302Data().productOutput.laminationSize = result;
            this.calcLaminationUnitPrice();
        });
    }

    calcLaminationUnitPrice() {
        this.calculateAllOutput(() => {
            let result = 0;
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().product.laminationFlute != 1) {
                result = MathUtil.checkNaN(this.getSF00302Data().productOutput.laminationSize * this.getSF00302Data().productOutput.paperTotalCost);
            }
            this.getSF00302Data().productOutput.laminationUnitPrice = result;
            this.calcLaminationTotalCost();
        });
    }

    calcLaminationTotalCost() {
        this.calculateAllOutput(() => {
            let laminationTotalCost = 0;
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().product.laminationFlute != 1) {
                if (this.getSF00302Data().product.laminationFlute != 0) {
                    laminationTotalCost = MathUtil.checkNaN(this.getSF00302Data().productOutput.laminationUnitPrice * this.calcThroughNumber());
                }
            }
            this.getSF00302Data().productOutput.laminationTotalCost = laminationTotalCost;
            this.calccartonMaterialLoss();
            this.calcDieCuttingLoss();
            this.calcPacking();
            this.calcSubTotal();
        });
    }

    calcDieCuttingBasicCost() {
        this.calculateAllOutput(() => {
            let result = 0;
            let size = 1;
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0) {
                let condition = this.getSF00302Data().product.cutPaperSizeH * this.getSF00302Data().product.cutPaperSizeW;
                if (condition < 309000) {
                    size = 3;
                } else if (condition <= 617500) {
                    size = 2;
                }
            }
            let number = 1;
            if (this.getSF00302Data().productOutput.lot / this.getSF00302Data().product.takenNumber <= 1000) {
                number = 2;
            }
            if (this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().product.dieCuttingThroughNumber != 0 && this.getSF00302Data().mstData != undefined
                && this.getSF00302Data().product.dieCuttingFlag == 1) {
                result = DataUtil.getData(this.getSF00302Data().mstData.mstDieCutting, 0, this.getSF00302Data().product.laminationFlute, size, this.getSF00302Data().product.dieCuttingThroughNumber, number, "basicCost");
            }
            this.getSF00302Data().productOutput.dieCuttingBasicCost = result;
        });
        this.calcDieCuttingTotalCost();
    }

    /**
     * Calculate for attributes: dieCuttingThroughWage of product output
     */
    calcDieCuttingThroughWage() {
        this.calculateAllOutput(() => {
            let result = 0;
            let size = 1;
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0) {
                let condition = this.getSF00302Data().product.cutPaperSizeH * this.getSF00302Data().product.cutPaperSizeW;
                if (condition < 309000) {
                    size = 3;
                } else if (condition <= 617500) {
                    size = 2;
                }
            }
            let number = 1;
            if (this.getSF00302Data().productOutput.lot / this.getSF00302Data().product.takenNumber <= 1000) {
                number = 2;
            }
            if (this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().product.dieCuttingThroughNumber != 0 && this.getSF00302Data().mstData != undefined
                && this.getSF00302Data().product.dieCuttingFlag == 1) {
                result = DataUtil.getData(this.getSF00302Data().mstData.mstDieCutting, 0, this.getSF00302Data().product.laminationFlute, size, this.getSF00302Data().product.dieCuttingThroughNumber, number, "throughWage");
                if (this.getSF00302Data().product.dieCuttingWeight == 1) {
                    result = result * 1.2;
                } else if (this.getSF00302Data().product.dieCuttingWeight == 2) {
                    result = result * 1.5;
                } else if (this.getSF00302Data().product.dieCuttingWeight == 3) {
                    result = result * 2;
                }
            }
            this.getSF00302Data().productOutput.dieCuttingThroughWage = result;
        });

        this.calcDieCuttingTotalCost();
    }

    calccartonMaterialLoss() {
        this.calculateAllOutput(() => {
            let cartonMaterialLoss = 0;
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().product.laminationFlute != 1) {
                let conditions = [1000, 2000, 3000, 5000, 7000, 10000, 20000];
                let index = 0;
                let condition = 1000;
                while (index < conditions.length) {
                    if (conditions[index] >= this.getSF00302Data().productOutput.lot) {
                        condition = conditions[index];
                        index = conditions.length + 1;
                    } else {
                        index++;
                    }
                }
                if (this.getSF00302Data().productOutput.lot >= 20000) {
                    condition = 20000;
                }
                cartonMaterialLoss = MathUtil.checkNaN(this.getSF00302Data().productOutput.paperTotalCost * DataUtil.getData(this.getSF00302Data().mstData.mstDecorative, 0, condition, "lossPercent"));
            }
            this.getSF00302Data().productOutput.cartonMaterialLoss = cartonMaterialLoss;
            this.calclaminationSheetCost();
        });
    }

    calcPasteStepWage() {
        this.calculateAllOutput(() => {
            let pasteStepWage = 0;
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().product.laminationFlute != 1) {
                let conditions = [1000, 2000, 3000, 5000, 7000, 10000, 20000];
                let index = 0;
                let condition = 1000;
                while (index < conditions.length) {
                    if (conditions[index] >= this.getSF00302Data().productOutput.lot) {
                        condition = conditions[index];
                        index = conditions.length + 1;
                    } else {
                        index++;
                    }
                }
                if (this.getSF00302Data().productOutput.lot >= 20000) {
                    condition = 20000;
                }
                pasteStepWage = MathUtil.checkNaN(DataUtil.getData(this.getSF00302Data().mstData.mstDecorative, 0, condition, "stepWage"));
            }
            this.getSF00302Data().productOutput.pasteStepWage = pasteStepWage;
            this.calclaminationSheetCost();
        });
    }

    calclaminationSheetCost() {
        this.calculateAllOutput(() => {
            let laminationSheetCost = 0;

            this.getSF00302Data().productOutput.laminationSheetCost = MathUtil.checkNaN((+this.getSF00302Data().productOutput.cartonMaterialLoss + (+this.getSF00302Data().productOutput.pasteStepWage)) * this.getSF00302Data().productOutput.lot);
            this.calcSubTotal();
        });
    }

    calcDieCuttingTotalCost() {
        this.calculateAllOutput(() => {
            let result = 0;
            if (this.getSF00302Data().productOutput.lot != undefined && this.getSF00302Data().productOutput.lot != 0 && this.getSF00302Data().product.dieCuttingThroughNumber != 0
                && this.sf00302Data.product.dieCuttingFlag == 1) {
                result = MathUtil.checkNaN(this.getSF00302Data().productOutput.dieCuttingLoss + this.getSF00302Data().productOutput.dieCuttingBasicCost + this.getSF00302Data().productOutput.dieCuttingThroughWage * this.getSF00302Data().productOutput.lot / this.getSF00302Data().product.takenNumber);
            }
            this.getSF00302Data().productOutput.dieCuttingTotalCost = MathUtil.roundDecimal(result, 0);
        });

        this.calcSubTotal();
    }

    calcPacking() {
        this.calculateAllOutput(() => {
            let firstSubtotal = MathUtil.checkNaN(this.getSF00302Data().productOutput.paperTotalCost + this.getSF00302Data().productOutput.colorPrintTotalCostF + this.getSF00302Data().productOutput.colorPrintTotalCostB +
                this.getSF00302Data().productOutput.surfaceTreatmentTotalCostF + this.getSF00302Data().productOutput.surfaceTreatmentTotalCostB +
                this.getSF00302Data().productOutput.embossingTotalCost + this.getSF00302Data().productOutput.laminationTotalCost + this.getSF00302Data().productOutput.dieCuttingTotalCost +
                this.getSF00302Data().productOutput.stampingTotalCost + this.getSF00302Data().productOutput.windowTotalCost + this.getProductOutputOtherFee1() + this.getProductOutputOtherFee2() + this.getProductOutputOtherFee3() + this.getSF00302Data().productOutput.laminationSheetCost);
            if (this.getSF00302Data().mstData != undefined) {
                let lot = 2;
                if (this.calcThroughNumber() > 1000) {
                    lot = 1;
                }
                let packing = MathUtil.checkNaN(DataUtil.getData(this.getSF00302Data().mstData.mstPacking, 0, this.getSF00302Data().product.packingId, lot, "percent") * (firstSubtotal + this.getSF00302Data().productOutput.inspection));
                this.getSF00302Data().productOutput.packing = MathUtil.round(packing, 2);
            }
        });
        this.calcSubTotal();
        this.calcEstimateTotal();
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

    calcShippingCost() {
        this.calculateAllOutput(() => {
            let conditions = [1000, 2000, 3000, 5000, 7000, 10000, 20000];
            let index = 0;
            let condition = 1000;
            while (index < conditions.length) {
                if (conditions[index] >= this.getSF00302Data().productOutput.lot) {
                    condition = conditions[index];
                    index = conditions.length + 1;
                } else {
                    index++;
                }
            }
            if (this.getSF00302Data().productOutput.lot >= 20000) {
                condition = 20000;
            }
            let flute = this.getSF00302Data().product.laminationFlute;
            if (flute == 4) {
                flute = 2;
            }
            let factor = DataUtil.getData(this.getSF00302Data().mstData.mstDecorative, 0, condition, flute, "fare");
            let result = 0;
            if (this.getSF00302Data().product.shippingCostId.toString() != "0") {
                if (this.getSF00302Data().product.laminationFlute == 3) {
                    factor = factor * 0.9;
                } else if (this.getSF00302Data().product.laminationFlute == 2) {
                    factor = factor * 0.6;
                } else if (this.getSF00302Data().product.laminationFlute == 4) {
                    factor = factor * 0.4;
                }
                result = MathUtil.checkNaN(factor * this.getSF00302Data().product.cutPaperSizeH * this.getSF00302Data().product.cutPaperSizeW / 1000 / 1000 * this.getSF00302Data().productOutput.lot);
            }
            this.getSF00302Data().productOutput.fareLineService = result;
            this.calcSubTotal();
        });
    }

    sf00302Data: SF00302Data;

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

    getSF00302Data(): SF00302Data {
        return this.sf00302Data;
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

    /**
     * Calculate for attributes: subTotal of product output
     */
    calcSubTotal() {
        this.calculateAllOutput(() => {
            let firstSubtotal = MathUtil.checkNaN(this.getSF00302Data().productOutput.laminationTotalCost + this.getSF00302Data().productOutput.dieCuttingTotalCost +
                this.getSF00302Data().productOutput.stampingTotalCost + this.getSF00302Data().productOutput.windowTotalCost + this.getSF00302Data().productOutput.pasteTotalCost + this.getSF00302Data().productOutput.laminationSheetCost + this.getProductOutputOtherFee1() + this.getProductOutputOtherFee2() + +this.getProductOutputOtherFee3()
                + MathUtil.checkNaN(this.getSF00302Data().productOutput.cartonSpecialFare)
            );
            let subtotal = 0;
            subtotal = MathUtil.checkNaN(
                this.getSF00302Data().productOutput.packing
                + firstSubtotal
                + this.getSF00302Data().productOutput.inspection
            );
            this.getSF00302Data().productOutput.subtotal = subtotal;
        });

        this.calcManagementCost();
        this.calcEstimateTotal();
    }

    calcThroughNumber() {
        return MathUtil.checkNaN(MathUtil.ceilDecimal(this.sf00302Data.productOutput.lot / this.sf00302Data.product.takenNumber, 0));
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
     * Calculate for attributes: estimatedTotal of product output
     */
    calcEstimateTotal() {
        this.calculateAllOutput(() => {
            this.getSF00302Data().productOutput.estimatedTotal = MathUtil.checkNaN((+this.getSF00302Data().productOutput.subtotal) + (+this.getSF00302Data().productOutput.managementCost));
            if (this.getSF00302Data().productOutput.fareLineService != undefined) {
                this.getSF00302Data().productOutput.estimatedTotal = this.getSF00302Data().productOutput.estimatedTotal + MathUtil.checkNaN(+this.getSF00302Data().productOutput.fareLineService);
            }
            this.getSF00302Data().productOutput.estimatedTotal = MathUtil.roundDecimal(this.getSF00302Data().productOutput.estimatedTotal, 2);
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

    getInspectionPackingFareLineTotalCost(): number {
        return MathUtil.checkNaN(this.sf00302Data.productOutput.inspection) + MathUtil.checkNaN(this.sf00302Data.productOutput.packing) + MathUtil.checkNaN(this.sf00302Data.productOutput.fareLineService);
    }

    getOtherFeeTotalCost() {
        return (+this.getProductOutputOtherFee1()) + (+this.getProductOutputOtherFee2()) + (+this.getProductOutputOtherFee3());
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