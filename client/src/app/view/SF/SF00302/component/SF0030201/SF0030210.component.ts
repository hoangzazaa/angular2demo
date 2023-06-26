import {Component, Input} from "@angular/core";
import ValidatorUtil from "../../../../../util/validator-util";
import {SF0030210Helper} from "./SF0030210.helper";
import DataUtil from "../../../../../util/data-util";
import {STAMPING_ID} from "../../helper/master-option";

declare var $: JQueryStatic;
declare var App: any;
@Component({
    templateUrl: "SF0030210.component.html",
    selector: 'sf0030210'
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030210Component {
    @Input()
    helper: SF0030210Helper;


    get isRequestDesign() {
        return this.helper.getSF00302Data().isRequestDesign;
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
    get stateProductStamping(): boolean {
        if ((this.helper.getSF00302Data().product.stampingId != undefined && this.helper.getSF00302Data().product.stampingSizeW1 != undefined && this.helper.getSF00302Data().product.stampingSizeH1 != undefined)
            || this.helper.getSF00302Data().product.stampingId == 0) {
            return true;
        } else {
            return false;
        }
    }

    // stampingId
    get stampingId(): number {
        if (this.helper.getSF00302Data().product.stampingId == undefined) {
            this.helper.getSF00302Data().product.stampingId = 0;
        }
        return this.helper.getSF00302Data().product.stampingId;
    }

    set stampingId(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('stampingId');
        this.setStampingIdConcealed(value);

    }

    setStampingIdConcealed(value: number) {
        this.helper.getSF00302Data().product.stampingId = value;
        if (value == 0) {
            this.helper.getSF00302Data().productOutput.stampingBasicCost = 0;
            this.helper.getSF00302Data().productOutput.stampingThroughWage = 0;
            this.helper.getSF00302Data().productOutput.stampingThroughWage = 0;
        }
        this.helper.calcStampingPointsNumber();
        this.helper.calcStampingBasicCost();
        this.helper.calcStampingThroughWage();
    }

    // stampingSizeW1
    get stampingSizeW1(): number {
        return this.helper.getSF00302Data().product.stampingSizeW1;

    }

    set stampingSizeW1(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('stampingSize1');
        if (ValidatorUtil.isNotEmpty(value)) {
            this.helper.getSF00302Data().product.stampingSizeW1 = +value;
        }
        this.helper.calcStampingPointsNumber();
        this.helper.calcStampingThroughWage();
    }

    // stampingSizeH1
    get stampingSizeH1(): number {
        return this.helper.getSF00302Data().product.stampingSizeH1;
    }

    set stampingSizeH1(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('stampingSize1');
        if (ValidatorUtil.isNotEmpty(value)) {
            this.helper.getSF00302Data().product.stampingSizeH1 = +value;
        }

        this.helper.calcStampingPointsNumber();
        this.helper.calcStampingThroughWage();
    }

    // stampingSizeW2
    get stampingSizeW2(): number {
        return this.helper.getSF00302Data().product.stampingSizeW2;
    }

    set stampingSizeW2(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('stampingSize2');
        if (ValidatorUtil.isNotEmpty(value)) {
            this.helper.getSF00302Data().product.stampingSizeW2 = +value;
        }

        this.helper.calcStampingPointsNumber();
        this.helper.calcStampingThroughWage();
    }

    // stampingSizeH2
    get stampingSizeH2(): number {
        return this.helper.getSF00302Data().product.stampingSizeH2;
    }

    set stampingSizeH2(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('stampingSize2');
        if (ValidatorUtil.isNotEmpty(value)) {
            this.helper.getSF00302Data().product.stampingSizeH2 = +value;
        }

        this.helper.calcStampingPointsNumber();
        this.helper.calcStampingThroughWage();
    }

    // stampingSizeW3
    get stampingSizeW3(): number {
        return this.helper.getSF00302Data().product.stampingSizeW3;
    }

    set stampingSizeW3(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('stampingSize3');
        if (ValidatorUtil.isNotEmpty(value)) {
            this.helper.getSF00302Data().product.stampingSizeW3 = +value;
        }

        this.helper.calcStampingPointsNumber();
        this.helper.calcStampingThroughWage();
    }

    // stampingSizeH3
    get stampingSizeH3(): number {
        return this.helper.getSF00302Data().product.stampingSizeH3;
    }

    set stampingSizeH3(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('stampingSize3');
        if (ValidatorUtil.isNotEmpty(value)) {
            this.helper.getSF00302Data().product.stampingSizeH3 = +value;
        }

        this.helper.calcStampingPointsNumber();
        this.helper.calcStampingThroughWage();
    }

    // stampingSizeW4
    get stampingSizeW4(): number {
        return this.helper.getSF00302Data().product.stampingSizeW4;
    }

    set stampingSizeW4(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('stampingSize4');
        if (ValidatorUtil.isNotEmpty(value)) {
            this.helper.getSF00302Data().product.stampingSizeW4 = +value;
        }

        this.helper.calcStampingPointsNumber();
        this.helper.calcStampingThroughWage();
    }

    // stampingSizeH4
    get stampingSizeH4(): number {
        return this.helper.getSF00302Data().product.stampingSizeH4;
    }

    set stampingSizeH4(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('stampingSize4');
        if (ValidatorUtil.isNotEmpty(value)) {
            this.helper.getSF00302Data().product.stampingSizeH4 = +value;
        }

        this.helper.calcStampingPointsNumber();
        this.helper.calcStampingThroughWage();
    }

    //3007
    stampingOption = DataUtil.toSelectBoxDataSource(STAMPING_ID);

    // foilColor1
    get foilColor1() {
        return this.helper.getSF00302Data().product.foilColor1;
    }

    set foilColor1(value: string) {
        this.helper.getSF00302Data().product.foilColor1 = value;
    }

    // foilColor2
    get foilColor2() {
        return this.helper.getSF00302Data().product.foilColor2;
    }

    set foilColor2(value: string) {
        this.helper.getSF00302Data().product.foilColor2 = value;
    }

    // foilColor3
    get foilColor3() {
        return this.helper.getSF00302Data().product.foilColor3;
    }

    set foilColor3(value: string) {
        this.helper.getSF00302Data().product.foilColor3 = value;
    }

    get stampingNumber(){
        return this.helper.getSF00302Data().product.stampingNumber;
    }

    set stampingNumber(value:number){
        this.helper.getSF00302Data().product.stampingNumber = value;
        this.helper.getSF00302Data().highlightedTracker.touch('stampingNumber');
    }
}
