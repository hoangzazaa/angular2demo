import {SF0030201Helper} from "../../common/SF0030201.helper";
import {SF0030203Helper} from "../../common/SF0030203.helper";
import {SF0030205Helper} from "../../common/SF0030205.helper";
import {SF0030217Helper} from "./SF0030217.helper";
import {SF0030218Helper} from "../SF0030218.helper";
import {SF0030219Helper} from "../SF0030219.helper";
import {SF0030220Helper} from "../SF0030220.helper";
import {SF0030221Helper} from "./SF0030221.helper";
import MathUtil from "../../../../../../util/math-util";
import {SF00302Data} from "../../../SF00302.data";
import DataUtil from "../../../../../../util/data-util";
import {FormatUtil} from "../../../../../../util/format-util";
import {isNullOrUndefined} from "util";
import { ProductOutput } from '../../../../../../model/core/ProductOutput.model';
import { Product } from '../../../../../../model/core/Product.model';

/**
 * Created by VuPT on 5/10/2017.
 */
export class SF003020201Helper implements SF0030221Helper {
    calcAdditionFare() {
        this.calculateAllOutput(() => {
            let result = 0;
            let productOutput: ProductOutput = this.sf00302Data.productOutput;
            let product: Product = this.sf00302Data.product;
            if (productOutput.lot != 0 && product.requiredAdditionalWork == 1) {
                let condition = MathUtil.checkNaN(productOutput.lot / product.takenNumber
                    * product.blankPaperSizeH * product.blankPaperSizeW / 1000 / 1000);
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
    calcPacking() {
    }
    public calcDimension(): void {
        this.calculateAllOutput(() => {
            var result = 0;
            if (this.getSF00302Data().productOutput.lot != 0) {
                if (this.getSF00302Data().product.laminationFlute != 0) {
                    result = this.getSF00302Data().product.sizeD + this.getSF00302Data().product.sizeW;
                    if (this.getSF00302Data().product.sizeW >= 3) {
                        result = result + MathUtil.checkNaN(this.getSF00302Data().product.sizeW - 3);
                    }
                    if (this.getSF00302Data().product.laminationFlute == 1) {
                        result = result + this.getSF00302Data().product.sizeD - 3 + 35;
                    } else if (this.getSF00302Data().product.laminationFlute == 2) {
                        result = result + this.getSF00302Data().product.sizeD - 2 + 30;
                    } else if (this.getSF00302Data().product.laminationFlute == 3) {
                        result = result + this.getSF00302Data().product.sizeD - 4 + 40;
                    } else if (this.getSF00302Data().product.laminationFlute == 4) {
                        result = result + this.getSF00302Data().product.sizeD - 4 + 35;
                    }
                    var factor = this.getSF00302Data().product.sizeH + this.getSF00302Data().product.upperFlap + this.getSF00302Data().product.lowerFlap;
                    if (this.getSF00302Data().product.laminationFlute == 1) {
                        result = MathUtil.roundDecimal(MathUtil.checkNaN(result / 1000 * factor / 1000), 4);
                    } else if (this.getSF00302Data().product.laminationFlute == 2) {
                        result = MathUtil.roundDecimal(MathUtil.checkNaN(result / 1000 * factor / 1000), 4);
                    } else if (this.getSF00302Data().product.laminationFlute == 3) {
                        result = MathUtil.roundDecimal(MathUtil.checkNaN(result / 1000 * factor / 1000 * 1.5), 4);
                    } else if (this.getSF00302Data().product.laminationFlute == 4) {
                        result = MathUtil.roundDecimal(MathUtil.checkNaN(result / 1000 * factor / 1000), 4);
                    }
                }
            }
            this.sf00302Data.productOutput.dimension = MathUtil.checkNaN(result);
        });
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

    getSF00302Data(): SF00302Data {
        return this.sf00302Data;
    }

    sf00302Data: SF00302Data;

    /** @inheritDoc */
    public calcMaterialSizeCarton(): number {
        if (this.getSF00302Data().product.laminationFlute != undefined && this.getSF00302Data().product.laminationFlute != 0) {
            let lengthWidthSize;
            let heightWidthSize;
            lengthWidthSize = (MathUtil.checkNaN(this.getSF00302Data().product.sizeD)
                + MathUtil.checkNaN(this.getSF00302Data().product.sizeW)) * 2
                + (+DataUtil.getData(this.getSF00302Data().mstData.mstCartonFlute, 0, this.getSF00302Data().product.laminationFlute, "long"));
            heightWidthSize = (MathUtil.checkNaN(this.getSF00302Data().product.sizeH)
                + MathUtil.checkNaN(this.getSF00302Data().product.sizeD))
                + (+DataUtil.getData(this.getSF00302Data().mstData.mstCartonFlute, 0, this.getSF00302Data().product.laminationFlute, "short"));
            return MathUtil.checkNaN(lengthWidthSize / 1000 * heightWidthSize / 1000);
        }
        return 0;
    }

    calcMaterialCostCarton() {
        let result = 0;
        if (this.getSF00302Data().productOutput.lot != 0) {
            result = MathUtil.checkNaN(MathUtil.checkNaN(this.getSF00302Data().product.laminationBackBasicWeight * this.getSF00302Data().product.laminationBackThroughWage / 1000)
                + MathUtil.checkNaN(this.getSF00302Data().product.laminationFrontBasicWeight * this.getSF00302Data().product.laminationFrontThroughWage / 1000));
            if (this.getSF00302Data().product.laminationFlute == 3) {
                result = result + MathUtil.checkNaN(this.getSF00302Data().product.laminationABasicWeight * this.getSF00302Data().product.laminationAThroughWage / 1000 * 1.5)
                    + MathUtil.checkNaN(this.getSF00302Data().product.laminationBBasicWeight * this.getSF00302Data().product.laminationBThroughWage / 1000 * 1.5);
            }
        }
        if (this.getSF00302Data().product.laminationFlute != 3) {
            result = MathUtil.checkNaN(result + MathUtil.checkNaN(this.getSF00302Data().product.laminationMediumBasicWeight * this.getSF00302Data().product.laminationMediumThroughWage / 1000 * 1.5));
        } else {
            result = MathUtil.checkNaN(result + MathUtil.checkNaN(this.getSF00302Data().product.laminationMediumBasicWeight * this.getSF00302Data().product.laminationMediumThroughWage / 1000));
        }
        return result;
    }

    calcMaterialCostTotalCarton() {
        this.calculateAllOutput(() => {
            this.getSF00302Data().productOutput.cartonMaterialCost = MathUtil.checkNaN(this.calcMaterialCostCarton() * this.calcMaterialSizeCarton());
        });
        this.calcTotalCarton();
    }

    calcMaterialLossCarton() {
        this.calculateAllOutput(() => {
            if (this.getSF00302Data().product.laminationFlute != undefined && this.getSF00302Data().product.laminationFlute != 0 && this.getSF00302Data().product.cartonShippingType != undefined && this.getSF00302Data().product.cartonShippingType != 0) {
                this.getSF00302Data().productOutput.cartonMaterialLoss = MathUtil.checkNaN(this.calcMaterialCostCarton() * (+DataUtil.getData(this.getSF00302Data().mstData.mstCartonFlute, 0, this.getSF00302Data().product.laminationFlute, this.getSF00302Data().product.cartonShippingType, "loss")));
            }
        });
        this.calcMaterialUnitPriceCarton();
        this.calcTotalCarton();
    }

    calcMaterialLaminationCarton() {
        this.calculateAllOutput(() => {
            if (this.getSF00302Data().product.laminationFlute != undefined && this.getSF00302Data().product.cartonShippingType != undefined && this.getSF00302Data().product.cartonShippingType != 0 && this.getSF00302Data().product.laminationFlute != 0) {
                this.getSF00302Data().productOutput.cartonMaterialLamination = MathUtil.checkNaN(DataUtil.getData(this.getSF00302Data().mstData.mstCartonFlute, 0, this.getSF00302Data().product.laminationFlute, this.getSF00302Data().product.cartonShippingType, "pasteWage"));
            }
        });
        this.calcMaterialUnitPriceCarton();
        this.calcTotalCarton();
    }

    calcMaterialUnitPriceCarton() {
        this.calculateAllOutput(() => {
            let result = 0;
            if (this.getSF00302Data().productOutput.lot != 0) {
                result = MathUtil.checkNaN(this.getSF00302Data().productOutput.cartonMaterialCost + (this.getSF00302Data().productOutput.cartonMaterialLoss + this.getSF00302Data().productOutput.cartonMaterialLamination) * this.calcMaterialSizeCarton());
            }
            this.getSF00302Data().productOutput.cartonMaterialUnitPrice = result;
        });
        this.calcMaterialTotalCostCarton();
    }

    calcMaterialTotalCostCarton() {
        this.calculateAllOutput(() => {
            let result = 0;
            if (this.getSF00302Data().productOutput.lot != 0) {
                result = MathUtil.checkNaN(this.getSF00302Data().productOutput.cartonMaterialUnitPrice * this.getSF00302Data().productOutput.lot);
            }
            this.getSF00302Data().productOutput.cartonMaterialTotalCost = result;
        });
    }

    /** @inheritDoc */
    public calcShipFareCarton(): void {
        this.calculateAllOutput(() => {
            if (this.getSF00302Data().product.shippingCostId != undefined && this.getSF00302Data().product.shippingCostId != 0) {
                let fluteType = 1;
                if (this.getSF00302Data().product.laminationFlute == 3) {
                    fluteType = 3;
                }
                let distance = this.getSF00302Data().product.shippingCostId;
                let factor = 1;
                if (!isNullOrUndefined(this.sf00302Data.product.laminationFlute)) {
                    if (this.sf00302Data.product.laminationFlute == 2) {
                        factor = 0.8;
                    } else if (this.sf00302Data.product.laminationFlute == 3) {
                        factor = 1.5;
                    } else if (this.sf00302Data.product.laminationFlute == 4) {
                        factor = 0.9;
                    }
                }
                this.getSF00302Data().productOutput.cartonShipFare = MathUtil.checkNaN(DataUtil.getData(this.getSF00302Data().mstData.mstCartonShipping, 0, fluteType, distance)) * factor;
            }
        });
        this.calcShipTotalCarton();
    }

    /**
     * @inheritDoc
     * @see SF003020202Helper#getAdditionalSipFareCarton 同じコード
     */
    public getAdditionalSipFareCarton(): number {
        let productOutput = this.getSF00302Data().productOutput;
        let product = this.getSF00302Data().product;
        let mm_v = product.blankPaperSizeH * product.blankPaperSizeW / 1e6;
        return ((mm_v * productOutput.lot) <= 500) ? 7 : 0;
    }

    /**
     * 運賃合計を計算する
     */
    public calcShipTotalCarton(): void {
        this.calculateAllOutput(() => {
            let productOutput = this.getSF00302Data().productOutput;
            let product = this.getSF00302Data().product;
            if (productOutput.cartonShipFare != undefined) {
                let add_fare = this.getAdditionalSipFareCarton();   // 割増運賃
                productOutput.cartonShipTotal = MathUtil.checkNaN((productOutput.cartonShipFare + add_fare) * this.calcMaterialSizeCarton() * productOutput.lot);
            }
        });
        this.calcTotalCarton();
    }

    calcUsageColorCostCarton() {
        this.calculateAllOutput(() => {
            this.getSF00302Data().productOutput.cartonUsageColorCost = MathUtil.checkNaN(DataUtil.getData(this.getSF00302Data().mstData.mstColor, 0, this.getSF00302Data().product.colorIdF - 1, "basicCost"));
        });
        this.calcProcessingUnitPriceCarton();
    }

    calcTapeCutCarton() {
        this.calculateAllOutput(() => {
            this.getSF00302Data().productOutput.cartonTapeCut = MathUtil.checkNaN(this.getSF00302Data().product.cartonTapeCutting / 1000 * 3);
        });
        this.calcProcessingUnitPriceCarton();
    }

    calcLinerCutCarton() {
        this.calculateAllOutput(() => {
            this.getSF00302Data().productOutput.cartonLinerCut = MathUtil.checkNaN(this.getSF00302Data().product.cartonLinerCutting * 12);
        });
        this.calcProcessingUnitPriceCarton();
    }

    calcCartonHandProcessingCarton() {
        this.calculateAllOutput(() => {
            if (this.getSF00302Data().product.handProcessingFlag == 1) {
                this.getSF00302Data().productOutput.cartonHandProcessing = 1000;
            } else {
                this.getSF00302Data().productOutput.cartonHandProcessing = 0;
            }
        });
        this.calcProcessingTotalCarton();
    }

    calcWaterRepellentCarton() {
        this.calculateAllOutput(() => {
            if (this.getSF00302Data().product.waterRepellentFlag == 0) {
                this.getSF00302Data().productOutput.cartonWaterRepellent = 0;
            } else if (this.getSF00302Data().product.waterRepellentFlag == 1 || this.getSF00302Data().product.waterRepellentFlag == 2) {
                this.getSF00302Data().productOutput.cartonWaterRepellent = 3;
            } else {
                this.getSF00302Data().productOutput.cartonWaterRepellent = 6;
            }
        });
        this.calcProcessingUnitPriceCarton();
    }

    calcProcessingUnitPriceCarton() {
        this.calculateAllOutput(() => {
            this.getSF00302Data().productOutput.cartonProcessingUnitPrice = MathUtil.checkNaN(this.getSF00302Data().productOutput.cartonUsageColorCost + this.getSF00302Data().productOutput.cartonTapeCut + this.getSF00302Data().productOutput.cartonLinerCut + this.getSF00302Data().productOutput.cartonWaterRepellent);
        });
        this.calcProcessingTotalCarton();
        this.calcTotalCarton();
    }

    calcProcessingTotalCarton() {
        this.calculateAllOutput(() => {
            this.getSF00302Data().productOutput.cartonProcessingTotalCost = MathUtil.checkNaN(this.getSF00302Data().productOutput.cartonProcessingUnitPrice * this.getSF00302Data().productOutput.lot * this.calcMaterialSizeCarton() + this.getSF00302Data().productOutput.cartonHandProcessing);
        });
    }

    calcUnitPriceCarton() {
        this.calculateAllOutput(() => {
            this.getSF00302Data().productOutput.estimatedUnitPrice = MathUtil.checkNaN(this.getSF00302Data().productOutput.estimatedTotal / this.getSF00302Data().productOutput.lot);
        });
    }

    calcTotalCarton() {
        this.calculateAllOutput(() => {
            let productOutput: ProductOutput = this.getSF00302Data().productOutput;

            // ロット単位で計算する項目: 材料代・加工代
            let unitPricePerLot
                = productOutput.cartonMaterialCost
                + (productOutput.cartonMaterialLoss + productOutput.cartonMaterialLamination) * this.calcMaterialSizeCarton();

            // ロットとは別に計算する項目: 配送代、別加工代, その他, 特別費用
            let priceOthers
                = productOutput.cartonShipTotal             // 配送代
                + productOutput.cartonProcessingTotalCost   // 別加工代
                + this.getProductOutputOtherFee1()          // その他1
                + this.getProductOutputOtherFee2()          // その他2
                + this.getProductOutputOtherFee3()          // その他3
                + MathUtil.checkNaN(productOutput.cartonSpecialFare)   // 特別運賃(助手手当など)
                + productOutput.cartonLotGap;

            // 見積金額
            let estimatedTotal = unitPricePerLot * productOutput.lot + priceOthers;
            productOutput.estimatedTotal = MathUtil.checkNaN(estimatedTotal);
        });
        this.calcUnitPriceCarton();
    }

    calcEstimateDiffCarton(type: number) {
        if (this.getSF00302Data().product.shapeId != this.getSF00302Data().DECORATIVE_ID) {
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

    getProductOutputOtherFee1(): number {
        return MathUtil.checkNaN(this.sf00302Data.product.otherUnitType1 == 1 ? this.sf00302Data.product.otherWage1 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage1);
    }

    getProductOutputOtherFee2(): number {
        return MathUtil.checkNaN(this.sf00302Data.product.otherUnitType2 == 1 ? this.sf00302Data.product.otherWage2 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage2);
    }

    getProductOutputOtherFee3(): number {
        return MathUtil.checkNaN(this.sf00302Data.product.otherUnitType3 == 1 ? this.sf00302Data.product.otherWage3 * this.sf00302Data.productOutput.lot : this.sf00302Data.product.otherWage3);
    }

    calcOtherFee() {
        this.calculateAllOutput(() => {
            this.calcSubTotal();
            this.calcTotalCarton();
            this.getSF00302Data().productOutput.estimatedTotal = this.getSF00302Data().productOutput.estimatedTotal + this.getProductOutputOtherFee1();
            this.getSF00302Data().productOutput.estimatedTotal = this.getSF00302Data().productOutput.estimatedTotal + this.getProductOutputOtherFee2();
            this.getSF00302Data().productOutput.estimatedTotal = this.getSF00302Data().productOutput.estimatedTotal + this.getProductOutputOtherFee3();
            this.calcTotalCarton();
        });
    }

    calcSubTotal() {
        this.calculateAllOutput(() => {
            let firstSubtotal = MathUtil.checkNaN(this.getSF00302Data().productOutput.laminationTotalCost + this.getSF00302Data().productOutput.colorPrintTotalCostF + this.getSF00302Data().productOutput.colorPrintTotalCostB +
                this.getSF00302Data().productOutput.surfaceTreatmentTotalCostF + this.getSF00302Data().productOutput.surfaceTreatmentTotalCostB +
                this.getSF00302Data().productOutput.embossingTotalCost + this.getSF00302Data().productOutput.dieCuttingTotalCost +
                this.getSF00302Data().productOutput.stampingTotalCost + this.getSF00302Data().productOutput.windowTotalCost + this.getSF00302Data().productOutput.pasteTotalCost + this.getProductOutputOtherFee1() + this.getProductOutputOtherFee2() + +this.getProductOutputOtherFee3());
            let subtotal = 0;
            subtotal = MathUtil.checkNaN(this.getSF00302Data().productOutput.packing + firstSubtotal + this.getSF00302Data().productOutput.inspection);
            this.getSF00302Data().productOutput.subtotal = subtotal;
        });

        this.calcManagementCost();
        this.calcTotalCarton();
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

    calcFlap(cartonType: number, flute: number, sizeD: number) {
        if (MathUtil.checkNaN(sizeD) == 0) {
            return 0;
        }
        if (cartonType == 2) {
            if (flute == 1) {
                return MathUtil.floorDecimal(MathUtil.checkNaN(sizeD / 2 + 2), 0);
            } else if (flute == 2 || flute == 4) {
                return MathUtil.floorDecimal(MathUtil.checkNaN(sizeD / 2 + 1.5), 0);
            } else if (flute == 3) {
                return MathUtil.floorDecimal(MathUtil.checkNaN(sizeD / 2 + 3), 0);
            } else {
                return 0;
            }
        }
    }

    public validateForm(): boolean {
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

        if (!!this.getSF00302Data().product.id) {

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
            // 製品寸法（mm)
            if (this.getSF00302Data().product.sizeW == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveSizeW = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveSizeW = false;
            }


            if (this.getSF00302Data().product.sizeD == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveSizeD = true;
                // check validate false
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveSizeD = false;
            }


            if (this.getSF00302Data().product.sizeH == undefined) {
                this.getSF00302Data().productRequiredItem.isSaveSizeH = true;
                isValidate = false;
            } else {
                this.getSF00302Data().productRequiredItem.isSaveSizeH = false;
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
            // 納入先距離
            // KH yêu cầu không cần validation #2224
            /*if (this.getSF00302Data().product.shippingCostId == undefined) {
             if (this.getSF00302Data().product.shippingCostId == undefined) {
             this.getSF00302Data().productRequiredItem.isSaveCartonShippingCost = true;
             // check validate false
             isValidate = false;
             } else {
             this.getSF00302Data().productRequiredItem.isSaveCartonShippingCost = false;
             }*/
        }

        if (this.checkProcessCase()) {
            this.getSF00302Data().productRequiredItem.isSaveFlute = false;
        }

        return isValidate;
    }

    checkProcessCase() {
        let createDate = this.getSF00302Data().product.createdDate;
        let updateDate = this.getSF00302Data().product.updatedDate;
        if (createDate != undefined
            && updateDate != undefined
            && createDate.getTime() == updateDate.getTime()) {
            return true;
        } else {
            return false;
        }
    }

    /** @return 見積金額単価 (円/㎡) */
    calcEstimatedM2PriceCarton(): number {
        //return MathUtil.checkNaN(MathUtil.roundDecimal(this.getSF00302Data().productOutput.estimatedTotal,2) / this.calcMaterialSizeCarton());
        return MathUtil.checkNaN(this.getSF00302Data().productOutput.estimatedTotal / this.calcMaterialSizeCarton() / this.getSF00302Data().productOutput.lot);
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
            } else if (!this.isEquals(currentProduct.laminationFlute, oldProduct.laminationFlute)) {
                // フルート
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.takenNumber, oldProduct.takenNumber)) {
                // 取数
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.cartonShippingType, oldProduct.cartonShippingType)) {
                // 製品寸法
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.sizeD, oldProduct.sizeD)) {
                // 製品寸法 - sizeD
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.sizeH, oldProduct.sizeH)) {
                // 製品寸法 - sizeH
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.sizeW, oldProduct.sizeW)) {
                // 製品寸法 - sizeW
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.upperFlap, oldProduct.upperFlap)) {
                // 上フラップ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.lowerFlap, oldProduct.lowerFlap)) {
                // 上フラップ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.blankPaperSizeW, oldProduct.blankPaperSizeW)) {
                // 上フラップ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.blankPaperSizeH, oldProduct.blankPaperSizeH)) {
                // 下フラップ
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
            } else if (!this.isEquals(currentProduct.laminationMediumId, oldProduct.laminationMediumId)) {
                //  断裁サイズ
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationMediumBasicWeight, oldProduct.laminationMediumBasicWeight)) {
                //  取数
                this.getSF00302Data().checkInputSave = true;
            } else if (!this.isEquals(currentProduct.laminationMediumThroughWage, oldProduct.laminationMediumThroughWage)) {
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

    isEquals(a: any, b: any) {
        return Object.is(a, b);
    }

    /** @inheritDoc */
    public calcCartonLotGap(): void {
        this.calculateAllOutput(() => {
            // ロット格差 ・・・ 300枚未満は準備費(3000円一律)を見積もりに含める
            let lotGap = 0;
            let productOutput = this.sf00302Data.productOutput;
            let product = this.sf00302Data.product;
            if (productOutput.lot != 0 && MathUtil.checkNaN(productOutput.lot) < 300) {
                 lotGap = 3000;
            }
            this.sf00302Data.productOutput.cartonLotGap = lotGap;
        });
        this.calcTotalCarton();
    }
}
