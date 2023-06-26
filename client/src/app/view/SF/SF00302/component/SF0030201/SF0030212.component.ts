import {Component, Input} from "@angular/core";
import ValidatorUtil from "../../../../../util/validator-util";
import {SF0030212Helper} from "./SF0030212.helper";
import DataUtil from "../../../../../util/data-util";
import {DIE_CUTTING_FLAG, PASTE_ID, PASTE_ID_NOT_A} from "../../helper/master-option";
import MathUtil from "../../../../../util/math-util";

declare var $: JQueryStatic;
declare var App: any;

/**
 * 打抜・貼り工程セクション
 * @author DungTQ
 */
@Component({
    templateUrl: "SF0030212.component.html",
    selector: 'sf0030212'
})
export class SF0030212Component {
    @Input()
    helper: SF0030212Helper;

    get isRequestDesign() {
        return this.helper.getSF00302Data().isRequestDesign;
    }

    isNumeric($event) {
        return ValidatorUtil.isNumeric($event);
    }

    get isView() {
        if (this.isRequestDesign) {
            return false;
        } else {
            return this.helper.getSF00302Data().isView;
        }
    }

    get isCreateNewProduct () {
        return this.helper.getSF00302Data().isCreateNewProduct;
    }

    isHighlighted(input) {
        return this.helper.getSF00302Data().highlightedTracker.isHighlightedProperty(input);
    }

    /**
     * Get state if Product Stamping Accordion is filled with data or not
     * */
    get stateProductDieCutting() {
        if (this.helper.getSF00302Data().product.dieCuttingThroughNumber != undefined
            && this.helper.getSF00302Data().product.pasteId != undefined
            && this.helper.getSF00302Data().product.dieCuttingThroughNumber.toString() != "") {
            return true;
        } else {
            return false;
        }
    }

    // dieCuttingThroughNumber
    get dieCuttingThroughNumber(): number {
        this.helper.getSF00302Data().product.dieCuttingThroughNumber = MathUtil.checkNaN(this.helper.getSF00302Data().product.dieCuttingThroughNumber);
        return this.helper.getSF00302Data().product.dieCuttingThroughNumber;
    }

    set dieCuttingThroughNumber(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('dieCuttingThroughNumber');
        if (this.helper.getSF00302Data().product.dieCuttingThroughNumber !== value) {
            this.helper.getSF00302Data().product.specialDieCuttingNumberFlag = 1;
        }
        this.helper.getSF00302Data().product.dieCuttingThroughNumber = value;
        this.helper.calcDieCuttingWeight();
        this.helper.calcDieCuttingLoss();
        this.helper.calcDieCuttingBasicCost();
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcDieCuttingTotalCost();

    }

    // pasteId
    get pasteId(): number {
        if (this.helper.getSF00302Data().product.pasteId == undefined) {
            this.helper.getSF00302Data().product.pasteId = 0;
        }
        return this.helper.getSF00302Data().product.pasteId;
    }

    set pasteId(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('pasteId');

        if (value == 0) {
            value = null;
        }
        this.setPasteSpecialFormFlagConcealed(value == 7);
        this.helper.getSF00302Data().product.pasteId = value;
        this.helper.calcPasteLoss();
        this.helper.calcPasteBasicCost();
        this.helper.calcPasteThroughWage();

    }

    get pasteSpecialFormFlag(): boolean {
        if (this.helper.getSF00302Data().product.pasteSpecialFormFlag > 0) {
            return true;
        } else {
            return false;
        }
    }

    setPasteSpecialFormFlagConcealed(value: boolean) {
        if (value) {
            this.helper.getSF00302Data().product.pasteSpecialFormFlag = 1;
        } else {
            this.helper.getSF00302Data().product.pasteSpecialFormFlag = 0;
        }
    }

    set pasteSpecialFormFlag(value: boolean) {
        if (value != this.pasteSpecialFormFlag) {
            this.helper.getSF00302Data().highlightedTracker.touch('pasteSpecialFormFlag');
        }
        this.setPasteSpecialFormFlagConcealed(value);
        this.helper.calcPasteBasicCost();
        this.helper.calcPasteThroughWage();

    }

    //3007
    pasteIdOption = DataUtil.toSelectBoxDataSource(PASTE_ID);

    pasteNotAOption = DataUtil.toSelectBoxDataSource(PASTE_ID_NOT_A);

    get pasteOption(){
        if(this.helper.getSF00302Data().product.productType==0){
            return this.pasteIdOption;
        } else {
            return this.pasteNotAOption;
        }
    }

    get dieCuttingFlag(): number {
        if(this.helper.getSF00302Data().product.dieCuttingFlag==undefined){
            this.helper.getSF00302Data().product.dieCuttingFlag=0;
        }
        return this.helper.getSF00302Data().product.dieCuttingFlag;
    }
    set dieCuttingFlag(value: number) {
        if (value != this.dieCuttingFlag) {
            this.helper.getSF00302Data().highlightedTracker.touch('dieCuttingFlag');
        }
        this.helper.getSF00302Data().product.dieCuttingFlag = value;
        if (this.helper.getSF00302Data().product.productType == 0 && this.helper.getSF00302Data().product.shapeId == 98) {
            this.helper.calcPaperTotalCost();
            this.helper.calcLaminationTotalCost();
            this.helper.calcColorBasicCost(1);
            this.helper.calcColorPrintLoss(1);
            this.helper.calcColorBasicCost(2);
            this.helper.calcColorPrintLoss(2);
            this.helper.calcPasteBasicCost();
            this.helper.calcPasteThroughWage();
            this.helper.calcPacking();
        } else if (this.helper.getSF00302Data().product.productType == 1 && this.helper.sf00302Data.product.cartonShippingType == 1) {
            this.helper.calcPasteTotalCost();
            this.helper.calcCartonLotGap();
        }
        this.helper.calcDieCuttingWeight();
        this.helper.calcDieCuttingLoss();
        this.helper.calcDieCuttingBasicCost();
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcDieCuttingTotalCost();

    }

    get dieCuttingFlagOption(){
        return DIE_CUTTING_FLAG;
    }
}
