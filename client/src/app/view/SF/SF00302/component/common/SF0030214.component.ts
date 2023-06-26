import {Component, Input} from "@angular/core";
import {SF0030214Helper} from "./SF0030214.helper";
import DataUtil from "../../../../../util/data-util";
import {OTHER_UNIT} from "../../../../../helper/mst-data-type";

declare var $: JQueryStatic;
declare var App: any;
@Component({
    templateUrl: "SF0030214.component.html",
    selector: 'sf0030214'
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030214Component {

    @Input()
    helper: SF0030214Helper;

    get isRequestDesign() {
        return this.helper.getSF00302Data().isRequestDesign;
    }

    get isView() {
        if (this.isRequestDesign) {
            return false;
        } else {
            return this.helper.sf00302Data.isView;
        }
    }

    isHighlighted(input) {
        return this.helper.sf00302Data.highlightedTracker.isHighlightedProperty(input);
    }

    get isCreateNewProduct() {
        return this.helper.getSF00302Data().isCreateNewProduct;
    }

    /**
     * Get state if Product Stamping Accordion is filled with data or not
     * */
    get stateProductOther() {
        if (this.helper.sf00302Data.product.otherWage1 != undefined
            && this.helper.sf00302Data.product.otherWage1 != 0
            && this.helper.sf00302Data.product.otherUnitType1 != undefined &&
            this.helper.sf00302Data.product.otherWage2 != undefined
            && this.helper.sf00302Data.product.otherWage2 != 0
            && this.helper.sf00302Data.product.otherUnitType2 != undefined &&
            this.helper.sf00302Data.product.otherWage3 != undefined
            && this.helper.sf00302Data.product.otherWage3 != 0
            && this.helper.sf00302Data.product.otherUnitType3 != undefined) {
            return true;
        } else {
            return false;
        }
    }

    get otherExpense1() {
        return this.helper.sf00302Data.product.otherExpense1;
    }

    set otherExpense1(value: string) {
        this.helper.sf00302Data.highlightedTracker.touch('expense1');
        this.helper.sf00302Data.product.otherExpense1 = value;

    }

    get otherExpense2() {
        return this.helper.sf00302Data.product.otherExpense2;
    }

    set otherExpense2(value: string) {
        this.helper.sf00302Data.highlightedTracker.touch('expense2');
        this.helper.sf00302Data.product.otherExpense2 = value;

    }


    get otherExpense3() {
        return this.helper.sf00302Data.product.otherExpense3;
    }

    set otherExpense3(value: string) {
        this.helper.sf00302Data.highlightedTracker.touch('expense3');
        this.helper.sf00302Data.product.otherExpense3 = value;

    }

    get otherWage1() {
        return this.helper.sf00302Data.product.otherWage1;
    }

    set otherWage1(value: number) {
        this.helper.sf00302Data.highlightedTracker.touch('expense1');
        this.helper.sf00302Data.product.otherWage1 = value;

        if (this.helper.sf00302Data.product.shapeId != this.helper.sf00302Data.DECORATIVE_ID) {
            this.helper.calcOtherFee();
        }

    }

    get otherWage2() {
        return this.helper.sf00302Data.product.otherWage2;
    }

    set otherWage2(value: number) {
        this.helper.sf00302Data.highlightedTracker.touch('expense2');
        this.helper.sf00302Data.product.otherWage2 = value;

        if (this.helper.sf00302Data.product.shapeId != this.helper.sf00302Data.DECORATIVE_ID) {
            this.helper.calcOtherFee();
        }

    }

    get otherWage3() {
        return this.helper.sf00302Data.product.otherWage3;
    }

    set otherWage3(value: number) {
        this.helper.sf00302Data.highlightedTracker.touch('expense3');
        this.helper.sf00302Data.product.otherWage3 = value;

        if (this.helper.sf00302Data.product.shapeId != this.helper.sf00302Data.DECORATIVE_ID) {
            this.helper.calcOtherFee();
        }

    }

    get otherUnitType1() {
        if (this.helper.sf00302Data.product.otherUnitType1 == undefined) {
            this.helper.sf00302Data.product.otherUnitType1 = 1;
        }
        return this.helper.sf00302Data.product.otherUnitType1;
    }

    set otherUnitType1(value: number) {
        this.helper.sf00302Data.highlightedTracker.touch('unitType1');
        this.helper.sf00302Data.product.otherUnitType1 = value;

        if (this.helper.sf00302Data.product.shapeId != this.helper.sf00302Data.DECORATIVE_ID) {
            this.helper.calcOtherFee();
        }

    }

    get otherUnitType2() {
        if (this.helper.sf00302Data.product.otherUnitType2 == undefined) {
            this.helper.sf00302Data.product.otherUnitType2 = 1;
        }
        return this.helper.sf00302Data.product.otherUnitType2;
    }

    set otherUnitType2(value: number) {
        this.helper.sf00302Data.highlightedTracker.touch('unitType2');
        this.helper.sf00302Data.product.otherUnitType2 = value;

        if (this.helper.sf00302Data.product.shapeId != this.helper.sf00302Data.DECORATIVE_ID) {
            this.helper.calcOtherFee();
        }

    }

    get otherUnitType3() {
        if (this.helper.sf00302Data.product.otherUnitType3 == undefined) {
            this.helper.sf00302Data.product.otherUnitType3 = 1;
        }
        return this.helper.sf00302Data.product.otherUnitType3;
    }

    set otherUnitType3(value: number) {
        this.helper.sf00302Data.highlightedTracker.touch('unitType3');
        this.helper.sf00302Data.product.otherUnitType3 = value;

        if (this.helper.sf00302Data.product.shapeId != this.helper.sf00302Data.DECORATIVE_ID) {
            this.helper.calcOtherFee();
        }

    }

    unitTypes = DataUtil.toSelectBoxDataSource(OTHER_UNIT);

}
