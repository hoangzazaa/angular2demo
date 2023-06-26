import {Component, Input, OnInit} from "@angular/core";
import MathUtil from "../../../../../../util/math-util";
import {SF0030215Helper} from "./SF0030215.helper";
import {
    ONE_STAGE_FLUTE,
    PAPER_LAMINATION_FIRST_OPTION,
    PAPER_LAMINATION_FLUTE_2745,
    PAPER_LAMINATION_SECOND_OPTION
} from "../../../helper/master-option";
import DataUtil from "../../../../../../util/data-util";
import {PaperModel} from "../../../model/paper.model";
import {isNullOrUndefined} from "util";
/**
 * Created by VuPT on 3/15/2017.
 */

const PAPER_1    = 1, PAPER_2 = 2, PAPER_3 = 3, BATCH_USER = 272;
const TYPE_FRONT = 100, TYPE_B = 101, TYPE_MEDIUM = 102, TYPE_A = 103, TYPE_BACK = 104;
@Component({
    templateUrl: "SF0030215.component.html",
    selector   : 'sf0030215'
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030215Component implements OnInit {
    ngOnInit(): void {
        this.pageData.paperTmp1 = new PaperModel();
        this.pageData.paperTmp3 = new PaperModel();
        this.pageData.paperTmp5 = new PaperModel();
        // init value data
        this.initDataMst();
    }

    get paperTmp1(): PaperModel{
        return this.pageData.paperTmp1;
    }

    get paperTmp3(): PaperModel{
        return this.pageData.paperTmp3;
    }

    get paperTmp5(): PaperModel{
        return this.pageData.paperTmp5;
    }

    @Input()
    helper: SF0030215Helper;

    // value selected after
    idSelectedTmp: number;

    // input option = [1,2,3]
    inputPaperOption: number;

    _laminationWeightMediumOption: any;
    _laminationWeightBackOption: any;
    _laminationWeightFrontOption: any;

    get laminationFlute(): number {
        if (this.pageData.product.laminationFlute != 2) {
            this.pageData.product.laminationFlute = 3;
        }

        return this.pageData.product.laminationFlute;
    }

    isHighlighted(input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    }

    set laminationFlute(value: number) {
        this.pageData.highlightedTracker.touch('laminationFlute');
        this.pageData.product.laminationFlute = value;
        this.helper.calcPaperTotalCost();
        this.helper.calcLaminationSize();
        this.helper.calcLaminationUnitPrice();
        this.helper.calcLaminationTotalCost();
        this.helper.calcWindowTotalCost();
        this.helper.calcDieCuttingBasicCost();
        this.helper.calcDieCuttingThroughWage();
        if(this.shapeId==98) {
            this.helper.calcPasteLoss();
        } else {
            this.helper.calccartonMaterialLoss();
        }
        this.helper.calcShippingCost();
        this.helper.calcPasteThroughWage();

        //this.helper.validateForm();
    }

    get laminationMediumBasicWeight(): number {
        if (this.pageData.product.laminationMediumBasicWeight == undefined) {
            if (this.pageData.product.laminationPaperTypeMedium != 8
                && this.pageData.product.laminationPaperTypeMedium != TYPE_MEDIUM
                && this.pageData.product.laminationPaperTypeMedium != 0) {
                this.pageData.product.laminationMediumBasicWeight = +Object.keys(this._laminationWeightMediumOption)[0];
            } else {
                this.pageData.product.laminationMediumBasicWeight = undefined;
            }
        }
        return this.pageData.product.laminationMediumBasicWeight;
    }

    setLaminationMediumBasicWeightConcealed(value: number) {
        this.pageData.product.laminationMediumBasicWeight = value;

        if (this.pageData.product.laminationPaperTypeMedium != 0) {
            if (!isNullOrUndefined(this._laminationWeightMediumOption)) {
                this.setLaminationMediumThroughWageConcealed(MathUtil.checkNaN(this._laminationWeightMediumOption[value]["throughWage"]));
            } else {
                this.setLaminationMediumThroughWageConcealed(0);
            }
        }

        this.helper.calcPaperTotalCost();
    }

    set laminationMediumBasicWeight(value: number) {
        this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
        this.setLaminationMediumBasicWeightConcealed(value);
    }

    get laminationMediumThroughWage(): number {
        return MathUtil.checkNaN(this.pageData.product.laminationMediumThroughWage);
    }

    set laminationMediumThroughWage(value: number) {
        this.setLaminationMediumThroughWageConcealed(value);

    }

    get laminationBackBasicWeight(): number {
        if (this.pageData.product.laminationBackBasicWeight == undefined) {
            if (this.pageData.product.laminationPaperTypeBack != 8
                && this.pageData.product.laminationPaperTypeBack != TYPE_BACK
                && this.pageData.product.laminationPaperTypeBack != 0) {
                this.pageData.product.laminationBackBasicWeight = +Object.keys(this._laminationWeightBackOption)[0];
            } else {
                this.pageData.product.laminationBackBasicWeight = undefined;
            }
        }
        return this.pageData.product.laminationBackBasicWeight;
    }

    setLaminationBackBasicWeightConcealned(value: number) {
        this.pageData.product.laminationBackBasicWeight = value;
        if (this.pageData.product.laminationPaperTypeBack != 0) {
            if (!isNullOrUndefined(this._laminationWeightBackOption)) {
                this.setLaminationBackThroughWageConcealed(MathUtil.checkNaN(this._laminationWeightBackOption[value]["throughWage"]));
            } else {
                this.setLaminationBackThroughWageConcealed(0);
            }
        }
        this.helper.calcPaperTotalCost();
    }

    setLaminationBackThroughWageConcealed(value: number) {
        this.pageData.product.laminationBackThroughWage = value;
        this.helper.calcPaperTotalCost();
    }

    setLaminationMediumThroughWageConcealed(value: number) {
        this.pageData.product.laminationMediumThroughWage = value;
        this.helper.calcPaperTotalCost();
    }

    set laminationBackBasicWeight(value: number) {
        this.pageData.highlightedTracker.touch('laminationBackBasicWeight');
        this.setLaminationBackBasicWeightConcealned(value);

    }

    get laminationBackThroughWage(): number {
        return MathUtil.checkNaN(this.pageData.product.laminationBackThroughWage);
    }

    set laminationBackThroughWage(value: number) {
        this.setLaminationBackThroughWageConcealed(value);

    }


    get laminationPaperTypeBack(): number {
        if (this.pageData.product.id && this.pageData.product.laminationPaperTypeBack == TYPE_BACK) {
            this._laminationWeightBackOption = this.pageData.product.laminationPaperTypeBack;
            return this.pageData.product.laminationPaperTypeBack;
        }

        if (this.pageData.product.laminationPaperTypeBack != undefined) {
            this._laminationWeightBackOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeBack];
            return this.pageData.product.laminationPaperTypeBack;
        }
        this.pageData.product.laminationPaperTypeBack = 0;
        return 0;
    }

    set laminationPaperTypeBack(value: number) {
        //FIXME: 2408
        if (value == 8) {
            this.inputPaperOption = PAPER_3;
            this.idSelectedTmp    = DataUtil.cloneObject(this.pageData.product).laminationPaperTypeBack;
            this.modalShow();
        } else {
            this.pageData.highlightedTracker.touch('laminationBackBasicWeight');
            this.setLaminationPaperTypeBackConcealed(value);
        }
    }

    setLaminationPaperTypeBackConcealed(value: number) {
        this.pageData.product.laminationPaperTypeBack = value;
        if (value != 8 && value != 0) {
            this._laminationWeightBackOption = this.pageData.mstData.mstLamination[value];
            if (!isNullOrUndefined(this._laminationWeightBackOption)) {
                this.setLaminationBackBasicWeightConcealned(+Object.keys(this._laminationWeightBackOption)[0]);
            } else {
                this.setLaminationBackBasicWeightConcealned(0);
                this.setLaminationBackThroughWageConcealed(0);
            }
        } else {
            this.setLaminationBackBasicWeightConcealned(0);
            this.setLaminationBackThroughWageConcealed(0);
        }
    }


    get laminationWeightBackOption(): any {
        if (this._laminationWeightBackOption != undefined) {
            if (this._laminationWeightBackOption != TYPE_BACK) {
                //TODO: hard code to display only one data
                if (this.pageData.product.laminationPaperTypeBack == 4) {
                    return Object.keys(this._laminationWeightBackOption).splice(0, 4);
                } else if (this.pageData.product.laminationPaperTypeBack == 5) {
                    return Object.keys(this._laminationWeightBackOption).splice(0, 2);
                } else {
                    return Object.keys(this._laminationWeightBackOption);
                }
            } else {
                let result = [];
                result.push(this.pageData.product.laminationBackBasicWeight);
                return result;
            }
        }
        let result = [];
        result.push(0);
        return result;
    }

    get laminationPaperTypeMedium(): number {
        if (this.pageData.product.id && this.pageData.product.laminationPaperTypeMedium == TYPE_MEDIUM) {
            this._laminationWeightMediumOption = this.pageData.product.laminationPaperTypeMedium;

            return this.pageData.product.laminationPaperTypeMedium;
        }

        if (this.pageData.product.laminationPaperTypeMedium != undefined) {
            this._laminationWeightMediumOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeMedium];
            return this.pageData.product.laminationPaperTypeMedium
        }
        this.pageData.product.laminationPaperTypeMedium = 0;
        return 0;
    }

    set laminationPaperTypeMedium(value: number) {
        //FIXME: 2408
        if (value == 8) {
            this.inputPaperOption = PAPER_2;
            this.idSelectedTmp    = DataUtil.cloneObject(this.pageData.product).laminationPaperTypeMedium;
            this.modalShow();
        } else {
            this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
            this.setLaminationPaperTypeMediumConcealed(value);
        }
        //this.helper.validateForm();
    }


    setLaminationPaperTypeMediumConcealed(value: number) {
        this.pageData.product.laminationPaperTypeMedium = value;
        if (value != 8 && value != 0) {
            this._laminationWeightMediumOption = this.pageData.mstData.mstLamination[value];
            if (!isNullOrUndefined(this._laminationWeightMediumOption)) {
                this.setLaminationMediumBasicWeightConcealed(+Object.keys(this._laminationWeightMediumOption)[0]);
            } else {
                this.setLaminationMediumBasicWeightConcealed(0);
                this.setLaminationMediumThroughWageConcealed(0);
            }
        } else {
            this.setLaminationMediumBasicWeightConcealed(0);
            this.setLaminationMediumThroughWageConcealed(0);
        }
    }


    get laminationWeightMediumOption(): any {
        if (this._laminationWeightMediumOption != undefined) {
            if (this._laminationWeightMediumOption != TYPE_MEDIUM) {
                //TODO: hard code to display only one data
                if (this.pageData.product.laminationPaperTypeMedium == 4) {
                    return Object.keys(this._laminationWeightMediumOption).splice(0, 4);
                } else if (this.pageData.product.laminationPaperTypeMedium == 5) {
                    return Object.keys(this._laminationWeightMediumOption).splice(0, 2);
                } else {
                    return Object.keys(this._laminationWeightMediumOption);
                }
            } else {
                let result = [];
                result.push(this.pageData.product.laminationMediumBasicWeight);
                return result;
            }
        }
        let result = [];
        result.push(0);
        return result;
    }

    get paperSizeW(): number {
        return this.pageData.product.paperSizeW;
    }

    setPaperSizeWConcealed(value: number) {
        if (this.pageData.product.paperSizeW !== value) {
            this.pageData.product.specialSizeFlag = 1;
        }
        this.pageData.product.paperSizeW = value;

        this.helper.calcLaminationSize();
        if (this.pageData.product.printMethod == 3) {
            this.helper.calcColorPlateCost(1);
            this.helper.calcColorPrintLoss(1);
            this.helper.calcColorCostPerPacket(1);
            this.helper.calcColorBasicCost(1);
            this.helper.calcColorThroughWage(1);
            this.helper.calcColorSpecial(1);
        }
    }

    set paperSizeW(value: number) {
        this.pageData.highlightedTracker.touch('paperSize');
        this.setPaperSizeWConcealed(value);

    }

    get paperSizeH(): number {
        return this.pageData.product.paperSizeH;
    }

    setPaperSizeHConcealed(value: number) {
        if (this.pageData.product.paperSizeH !== value) {
            this.pageData.product.specialSizeFlag = 1;
        }
        this.pageData.product.paperSizeH = value;

        this.helper.calcLaminationSize();
        if (this.pageData.product.printMethod == 3) {
            this.helper.calcColorPlateCost(1);
            this.helper.calcColorPrintLoss(1);
            this.helper.calcColorCostPerPacket(1);
            this.helper.calcColorBasicCost(1);
            this.helper.calcColorThroughWage(1);
            this.helper.calcColorSpecial(1);
        }
    }

    set paperSizeH(value: number) {
        this.pageData.highlightedTracker.touch('paperSize');
        this.setPaperSizeHConcealed(value);

    }

    get cutPaperSizeW(): number {
        return this.pageData.product.cutPaperSizeW;
    }

    set cutPaperSizeW(value: number) {
        this.pageData.highlightedTracker.touch('cutPaperSize');
        this.pageData.product.cutPaperSizeW = value;

        this.helper.calcLaminationSize();
        this.helper.calcSurfaceBasicCost(1);
        this.helper.calcSurfaceBasicCost(2);
        this.helper.calcSurfaceBasicCost(3);
        this.helper.calcSurfaceThroughWage(1);
        this.helper.calcSurfaceThroughWage(2);
        this.helper.calcSurfaceThroughWage(3);
        this.helper.calcStampingBasicCost();
        this.helper.calcStampingThroughWage();
        this.helper.calcDieCuttingBasicCost();
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcWindowTotalCost();
        this.helper.calcShippingCost();
    }

    get cutPaperSizeH(): number {
        return this.pageData.product.cutPaperSizeH;
    }

    set cutPaperSizeH(value: number) {
        this.pageData.highlightedTracker.touch('cutPaperSize');
        this.pageData.product.cutPaperSizeH = value;

        this.helper.calcLaminationSize();
        this.helper.calcSurfaceBasicCost(1);
        this.helper.calcSurfaceBasicCost(2);
        this.helper.calcSurfaceBasicCost(3);
        this.helper.calcSurfaceThroughWage(1);
        this.helper.calcSurfaceThroughWage(2);
        this.helper.calcSurfaceThroughWage(3);
        this.helper.calcStampingBasicCost();
        this.helper.calcStampingThroughWage();
        this.helper.calcDieCuttingBasicCost();
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcWindowTotalCost();
        this.helper.calcShippingCost();
    }


    get blankPaperSizeW(): number {
        return this.pageData.product.blankPaperSizeW;
    }

    set blankPaperSizeW(value: number) {
        this.pageData.highlightedTracker.touch('blankPaperSize');
        this.pageData.product.blankPaperSizeW = value;
        this.onChangePaperSize();
    }

    get blankPaperSizeH(): number {
        return this.pageData.product.blankPaperSizeH;
    }

    set blankPaperSizeH(value: number) {
        this.pageData.highlightedTracker.touch('blankPaperSize');

        this.pageData.product.blankPaperSizeH = value;
        this.onChangePaperSize();
    }

    onChangePaperSize () {
        // コール関数要精査
        this.helper.calcLaminationSize();
        this.helper.calcSurfaceBasicCost(1);
        this.helper.calcSurfaceBasicCost(2);
        this.helper.calcSurfaceBasicCost(3);
        this.helper.calcSurfaceThroughWage(1);
        this.helper.calcSurfaceThroughWage(2);
        this.helper.calcSurfaceThroughWage(3);
        this.helper.calcStampingBasicCost();
        this.helper.calcStampingThroughWage();
        this.helper.calcDieCuttingBasicCost();
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcWindowTotalCost();
        this.helper.calcShippingCost();
    }

    get impositionNumber(): number {
        this.pageData.product.impositionNumber = MathUtil.checkNaN(this.pageData.product.impositionNumber);
        return this.pageData.product.impositionNumber;
    }

    set impositionNumber(value: number) {
        this.pageData.highlightedTracker.touch('impositionNumber');
        this.pageData.product.impositionNumber = value;
    }

    get isRequestDesign() {
        return this.pageData.isRequestDesign;
    }

    get isCreateNewProduct() {
        return this.pageData.isCreateNewProduct;
    }

    get takenNumber(): number {
        this.pageData.product.takenNumber = MathUtil.checkNaN(this.pageData.product.takenNumber);
        return this.pageData.product.takenNumber;
    }

    set takenNumber(value: number) {
        this.pageData.highlightedTracker.touch('takenNumber');
        this.pageData.product.takenNumber = value;
        this.helper.calcSurfaceBasicCost(1);
        this.helper.calcSurfaceThroughWage(1);
        this.helper.calcSurfaceTotalCost(1);
        this.helper.calcSurfaceBasicCost(2);
        this.helper.calcSurfaceThroughWage(2);
        this.helper.calcSurfaceTotalCost(2);
        this.helper.calcSurfaceBasicCost(3);
        this.helper.calcSurfaceThroughWage(3);
        this.helper.calcSurfaceTotalCost(3);
        this.helper.calcDieCuttingBasicCost();
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcDieCuttingTotalCost();
        this.helper.calcPasteBasicCost();
        this.helper.calcLaminationTotalCost();
        this.helper.calcPacking();
        if(this.pageData.product.printMethod==3){
            this.helper.calcColorBasicCost(1);
            this.helper.calcColorThroughWage(1);
            this.helper.calcColorSpecial(1);
        }
    }

    get laminationPaperTypeFront(): number {
        if (this.pageData.product.id && this.pageData.product.laminationPaperTypeFront == TYPE_FRONT) {
            this._laminationWeightFrontOption = this.pageData.product.laminationPaperTypeFront;
            return this.pageData.product.laminationPaperTypeFront;
        }

        if (this.pageData.product.laminationPaperTypeFront != undefined) {
            this._laminationWeightFrontOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeFront];
            return this.pageData.product.laminationPaperTypeFront
        }
        this.pageData.product.laminationPaperTypeFront = 0;
        return 0;
    }

    set laminationPaperTypeFront(value: number) {
        //FIXME: 2409
        if (value == 8) {
            this.inputPaperOption = PAPER_1;
            this.idSelectedTmp    = DataUtil.cloneObject(this.pageData.product).laminationPaperTypeFront;
            this.modalShow();
        } else {
            this.pageData.highlightedTracker.touch('laminationFrontBasicWeight');
            this.setLaminationPaperTypeFrontConcealed(value);
        }
        //this.helper.validateForm();
    }


    setLaminationPaperTypeFrontConcealed(value: number) {
        this.pageData.product.laminationPaperTypeFront = value;
        if (value != 8 && value != 0) {
            this._laminationWeightFrontOption = this.pageData.mstData.mstLamination[value];
            if (!isNullOrUndefined(this._laminationWeightFrontOption)) {
                this.setLaminationFrontBasicWeightConcealed(+Object.keys(this._laminationWeightFrontOption)[0]);
            } else {
                this.setLaminationFrontBasicWeightConcealed(0);
                this.setLaminationFrontThroughWageConcealed(0);
            }
        } else {
            this.setLaminationFrontBasicWeightConcealed(0);
            this.setLaminationFrontThroughWageConcealed(0);
        }
    }


    get laminationWeightFrontOption(): any {
        if (this._laminationWeightFrontOption != undefined) {
            if (this._laminationWeightFrontOption != TYPE_FRONT) {
                //TODO: hard code to display only one data
                if (this.pageData.product.laminationPaperTypeFront == 4) {
                    return Object.keys(this._laminationWeightFrontOption).splice(0, 4);
                } else if (this.pageData.product.laminationPaperTypeFront == 5) {
                    return Object.keys(this._laminationWeightFrontOption).splice(0, 2);
                } else {
                    return Object.keys(this._laminationWeightFrontOption);
                }
            } else {
                let result = [];
                result.push(this.pageData.product.laminationFrontBasicWeight);
                return result;
            }
        }
        let result = [];
        result.push(0);
        return result;
    }

    get laminationFrontBasicWeight(): number {
        if (this.pageData.product.laminationFrontBasicWeight == undefined) {
            if (this.pageData.product.laminationPaperTypeFront != 8
                && this.pageData.product.laminationPaperTypeFront != TYPE_FRONT
                && this.pageData.product.laminationPaperTypeFront != 0) {
                this.pageData.product.laminationFrontBasicWeight = +Object.keys(this._laminationWeightFrontOption)[0];
            } else {
                this.pageData.product.laminationFrontBasicWeight = undefined;
            }
        }
        return this.pageData.product.laminationFrontBasicWeight;
    }

    setLaminationFrontBasicWeightConcealed(value: number) {
        this.pageData.product.laminationFrontBasicWeight = value;

        if (this.pageData.product.laminationPaperTypeFront != 0) {
            if (!isNullOrUndefined(this._laminationWeightFrontOption)) {
                this.setLaminationFrontThroughWageConcealed(MathUtil.checkNaN(this._laminationWeightFrontOption[value]["throughWage"]));
            } else {
                this.setLaminationFrontThroughWageConcealed(0);
            }
        }
        this.helper.calcPaperTotalCost();
    }

    set laminationFrontBasicWeight(value: number) {
        this.pageData.highlightedTracker.touch('laminationFrontBasicWeight');
        this.setLaminationFrontBasicWeightConcealed(value);

    }

    get laminationFrontThroughWage(): number {
        return MathUtil.checkNaN(this.pageData.product.laminationFrontThroughWage);

    }

    set laminationFrontThroughWage(value: number) {
        this.setLaminationFrontThroughWageConcealed(value);
    }


    setLaminationFrontThroughWageConcealed(value: number) {
        this.pageData.product.laminationFrontThroughWage = value;
        this.helper.calcPaperTotalCost();
    }

    get stateLamination() {
        if (this.pageData.product.paperSizeW != undefined && this.pageData.product.paperSizeH != undefined
            && this.pageData.product.cutPaperSizeH != undefined && this.pageData.product.cutPaperSizeW != undefined
            && this.pageData.product.takenNumber != undefined && this.pageData.product.impositionNumber != undefined) {
            return true;
        } else {
            return false;
        }
    }

    get isView() {
        if (this.isRequestDesign) {
            return false;
        } else {
            return this.pageData.isView;
        }
    }

    get checkImposition() {
        if (MathUtil.checkNaN(this.pageData.productOutput.lot / this.pageData.product.impositionNumber) >= 10000) {
            return true;
        } else {
            return false;
        }
    }

    get laminationFluteOption() {
        if(this.pageData.product.shapeId==98) {
            return PAPER_LAMINATION_FLUTE_2745;
        } else {
            return ONE_STAGE_FLUTE;
        }
    }

    //3007
    laminationFirstOption = DataUtil.toSelectBoxDataSource(PAPER_LAMINATION_FIRST_OPTION);

    laminationSecondOption = DataUtil.toSelectBoxDataSource(PAPER_LAMINATION_SECOND_OPTION);

    // フルート
    get checkBorderLaminationFlute(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveFlute) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    // シート寸法 (mm)
    get checkBorderPaperSizeW(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSavePaperSizeW) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    get checkBorderPaperSizeH(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSavePaperSizeH) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    get checkBorderCutPaperSizeW(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveCutSizeW) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    get checkBorderCutPaperSizeH(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveCutSizeH) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    // 展開寸法（mm） * SF0030217Componentを参照
    get checkBorderBlankPaperSizeW(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveBlankSizeW) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    get checkBorderBlankPaperSizeH(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveBlankSizeH) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    get checkBorderLaminationPaperTypeFront(): { style: string, radius: string } {
    // 表ライナー（g/㎡）
        if(this.shapeId!=100){
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            } else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeFront) {
                        return this.pageData.errFieldBorderCss;
                    } else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        } else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        }else{
            return this.pageData.noneFieldBorderCss;
        }
    }

    get checkBorderLaminationFrontBasicWeight(): { style: string, radius: string } {
        if (this.shapeId != 100) {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            } else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveLaminationFrontBasicWeight) {
                        return this.pageData.errFieldBorderCss;
                    } else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        } else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        } else {
            return this.pageData.noneFieldBorderCss;
        }
    }

    get checkBorderLaminationFrontThroughWage(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveLaminationFrontThroughWage) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    // 中芯（g/㎡）
    get checkBorderLaminationPaperTypeMedium(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeMedium) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    get checkBorderLaminationMediumBasicWeight(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveLaminationMediumBasicWeight) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    get checkBorderLaminationMediumThroughWage(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveLaminationMediumThroughWage) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    // 裏ライナー（g/㎡）
    get checkBorderLaminationPaperTypeBack(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeBack) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    get checkBorderLaminationBackBasicWeight(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveLaminationBackBasicWeight) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }

    }

    get checkBorderLaminationBackThroughWage(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveLaminationBackThroughWage) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    // 取数（丁）
    get checkBorderTakenNumber(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveTakenNumber) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    // 面付数（丁）
    get checkBorderImpositionNumber(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveImpositionNumber) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    // TODO:start http://fridaynight.vnext.vn/issues/2409
    setPaperModalResult(paperModel: PaperModel) {

        //1. set option input
        paperModel.optionId  = this.inputPaperOption;
        paperModel.factoryId = this.pageData.product.factoryId;

        //2. add paper
        if(!!paperModel.paperId && !paperModel.isNew){
            switch (this.inputPaperOption) {
                //表ライナー
                case 1:
                    this.laminationPaperTypeFront = paperModel.paperId;
                    this.laminationFrontBasicWeight = paperModel.basicWeight;
                    break;
                //中芯
                case 2:
                    this.laminationPaperTypeMedium = paperModel.paperId;
                    this.laminationMediumBasicWeight = paperModel.basicWeight;
                    break;
                //B中芯
                case 3:
                    this.laminationPaperTypeBack = paperModel.paperId;
                    this.laminationBackBasicWeight = paperModel.basicWeight;
                    break;
                default:
                    break;
            }
        }else {
            // input list paper new
            this.addNewPaper(paperModel);

            // check input option
            switch (this.inputPaperOption) {
                //表ライナー
                case 1:
                    // get data tmp
                    this.pageData.paperTmp1                        = paperModel;
                    this.pageData.product.laminationFrontId        = paperModel.id;
                    this.pageData.product.laminationPaperTypeFront = TYPE_FRONT;
                    this.setLaminationFrontBasicWeightConcealed(paperModel.basicWeight);
                    this.setLaminationFrontThroughWageConcealed(paperModel.normValue);
                    // add to mst data
                    this.pageData.addPaperModel(paperModel, TYPE_FRONT);
                    break;
                //中芯
                case 2:
                    // get data tmp
                    this.pageData.paperTmp3                         = paperModel;
                    this.pageData.product.laminationMediumId        = paperModel.id;
                    this.pageData.product.laminationPaperTypeMedium = TYPE_MEDIUM;
                    this.setLaminationMediumBasicWeightConcealed(paperModel.basicWeight);
                    this.setLaminationMediumThroughWageConcealed(paperModel.normValue);
                    // add to mst data
                    this.pageData.addPaperModel(paperModel, TYPE_MEDIUM);
                    break;
                //B中芯
                case 3:
                    // get data tmp
                    this.pageData.paperTmp5                       = paperModel;
                    this.pageData.product.laminationBackId        = paperModel.id;
                    this.pageData.product.laminationPaperTypeBack = TYPE_BACK;
                    this.setLaminationBackBasicWeightConcealned(paperModel.basicWeight);
                    this.setLaminationBackThroughWageConcealed(paperModel.normValue);
                    // add to mst data
                    this.pageData.addPaperModel(paperModel, TYPE_BACK);
                    break;
                default:
                    break;
            }
        }
        //2 hide modal
        this.modalHide();

        //3. highlightedTracker
        switch (this.inputPaperOption) {
            //表ライナー
            case 1:
                // Dong thoi neu da chon thi phai xu ly phan highlightedTracker.touch
                this.pageData.highlightedTracker.touch('laminationFrontBasicWeight');
                break;
            //中芯
            case 2:
                // Dong thoi neu da chon thi phai xu ly phan highlightedTracker.touch
                this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
                break;
            //B中芯
            case 3:
                // Dong thoi neu da chon thi phai xu ly phan highlightedTracker.touch
                this.pageData.highlightedTracker.touch('laminationBackBasicWeight');
                break;
            default:
                break;
        }
    }

    modalShow() {
        this.getDataMstLaminations();

        setTimeout(function () {
            //scoll userPic
            $('.table-body-paperOther').scrollTop(0);
        },300);

        $("#paperModal").modal('show');
        $('.modal-body').css('overflow-y', 'auto');
        $('.modal-body').css('max-height', $(window).height() * 0.86);
    }

    modalHide() {
        $("#paperModal").modal('hide');
    }

    closedModal() {
        switch (this.inputPaperOption) {
            //表ライナー
            case PAPER_1:
                this.pageData.product.laminationPaperTypeFront = this.idSelectedTmp;
                break;
            //B中芯
            case PAPER_2:
                this.pageData.product.laminationPaperTypeMedium = this.idSelectedTmp;
                break;
            //中芯
            case PAPER_3:
                this.pageData.product.laminationPaperTypeBack = this.idSelectedTmp;
                break;
            default:
                break;
        }

        this.modalHide();
    }

    getDataMstLaminations() {
        // reset paper model
        this.pageData.paperModel = new PaperModel();

        this.pageData.mstPapersBackgroundTab1 = [];
        let papers: PaperModel[]              = this.pageData.mstLaminations;
        //1. role admin map normValue
        if (this.pageData.product.paperHeadApprovalFlag == 1) {
            papers = this.pageData.mstLaminationsHeader;
        }
        //2. filter data by factoryId
        this.pageData.mstPapersBackgroundTab1 = papers.filter(item => {
            // nếu paperId != null -> by theo factoryId và createdUser
            let flag_base = (item.hiddenFlag != 1 && item.commonFlag != 1 && item.commonFlag != undefined);
            if(!!!item.paperId){
                return item.createdUser == BATCH_USER && flag_base;
            }
            return flag_base;
        }).map(item => {
            let paper = DataUtil.cloneObject(item);

            return paper;
        });

        // update status selectbox
        switch (this.inputPaperOption) {
            //表ライナー
            case PAPER_1:
                this.pageData.product.laminationPaperTypeFront = 8;
                break;
            //B中芯
            case PAPER_2:
                this.pageData.product.laminationPaperTypeMedium = 8;
                break;
            //中芯
            case PAPER_3:
                this.pageData.product.laminationPaperTypeBack = 8;
                break;
            default:
                break;
        }
    }

    get mstPapersBackground() {
        return this.pageData.mstPapersBackgroundTab1;
    }

    get pageData() {
        return this.helper.getSF00302Data();
    }

    addNewPaper(paperModel: PaperModel) {
        // nếu nó khác thì sẽ push thêm vào list, nếu nó đã có thì cập nhật vào list paperModel
        let index = this.pageData.paperModelNews.findIndex(item => {
            return paperModel.optionId == item.optionId;
        })

        // nếu không có -> sẽ add vào list new
        if (index < 0 && !!paperModel.isNew) {
            this.pageData.paperModelNews.push(paperModel);
        }
        // nếu có, sẽ replace thằng cũ đi
        else if (index > 0) {
            // thay thế thằng cũ tại vị trí index, thay thế 1, và paperModel
            this.pageData.paperModelNews.splice(index, 1, paperModel);
        }
    }

    // init data
    initDataMst() {
        if (this.pageData.product.id) {
            if (this.pageData.product.laminationPaperTypeFront == TYPE_FRONT) {
                let paperModel = this.pageData.mstLaminations.find(item => {
                    return item.id == this.pageData.product.laminationFrontId;
                });

                if (!!paperModel) {
                    this.pageData.paperTmp1.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_FRONT);
                }
            }

            if (this.pageData.product.laminationPaperTypeMedium == TYPE_MEDIUM) {
                let paperModel = this.pageData.mstLaminations.find(item => {
                    return item.id == this.pageData.product.laminationMediumId;
                });
                if (!!paperModel) {
                    this.pageData.paperTmp3.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_MEDIUM);
                }
            }

            if (this.pageData.product.laminationPaperTypeBack == TYPE_BACK) {
                let paperModel = this.pageData.mstLaminations.find(item => {
                    return item.id == this.pageData.product.laminationBackId;
                });
                if (!!paperModel) {
                    this.pageData.paperTmp5.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_BACK);
                }
            }
        }
    }

    // TODO:end http://fridaynight.vnext.vn/issues/2409

    get shapeId() {
        if (this.helper.getSF00302Data().product.shapeId == undefined) {
            return 0;
        }
        return this.helper.getSF00302Data().product.shapeId;
    }
}