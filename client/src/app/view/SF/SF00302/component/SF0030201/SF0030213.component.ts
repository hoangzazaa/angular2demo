import {Component, Input} from "@angular/core";
import {SF0030213Helper} from "./SF0030213.helper";
import DataUtil from "../../../../../util/data-util";
import {INSPECTION_ID, PACKING_ID, SHIPPING_COST_ID} from "../../helper/master-option";

declare var $: JQueryStatic;
declare var App: any;
@Component({
    templateUrl: "SF0030213.component.html",
    selector: 'sf0030213'
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030213Component {
    @Input()
    helper:SF0030213Helper;

    get isRequestDesign(){
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
    get stateProductOther() {
        if (this.helper.getSF00302Data().product.shippingCostId != undefined
            && this.helper.getSF00302Data().product.inspectionId != undefined
            && this.helper.getSF00302Data().product.packingId != undefined) {
            return true;
        } else {
            return false;
        }
    }

    // inspectionId
    get inspectionId(): number {
        if (this.helper.getSF00302Data().product.inspectionId == undefined || this.helper.getSF00302Data().product.inspectionId == 1) {
            this.helper.getSF00302Data().product.inspectionId = 1;
        }
        return this.helper.getSF00302Data().product.inspectionId;
    }

    set inspectionId(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('inspectionId');
        this.setInspectionConcealed(value);

    }

    // packingId
    get packingId(): number {
        if (this.helper.getSF00302Data().product.packingId == undefined) {
            this.helper.getSF00302Data().product.packingId = 0;
        }
        return this.helper.getSF00302Data().product.packingId;
    }

    set packingId(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('packingId');
        this.setPackingConcealed(value);

    }

    get checkBorderRequiredAdditionalWork(): { style: string, radius: string } {
        return { style: "solid 2px #5c90d2", radius: "50%" };
    }

    get requiredAdditionalWork() {
        if (this.helper.getSF00302Data().product.requiredAdditionalWork == undefined) {
            this.helper.getSF00302Data().product.requiredAdditionalWork = 0;
        }
        return this.helper.getSF00302Data().product.requiredAdditionalWork;
    }

    set requiredAdditionalWork(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('requiredAdditionalWork');
        this.helper.getSF00302Data().product.requiredAdditionalWork = value;
        this.helper.calcAdditionFare();
    }

    setRequiredAdditionalWork(value: number) {
        this.requiredAdditionalWork = value;
    }

    // fareId
    get shippingCostId(): number {
        if (this.helper.getSF00302Data().product.shippingCostId == undefined) {
            this.helper.getSF00302Data().product.shippingCostId = 0;
        }
        return this.helper.getSF00302Data().product.shippingCostId;
    }

    set shippingCostId(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('shippingCostId');
        this.setShippingConcealed(value);

    }

    setPackingConcealed(value: number) {
        this.helper.getSF00302Data().product.packingId = value;
            this.helper.calcPacking();

    }

    setShippingConcealed(value: number) {
        this.helper.getSF00302Data().product.shippingCostId = value;
            this.helper.calcShippingCost();
    }

    setInspectionConcealed(value: number) {
        this.helper.getSF00302Data().product.inspectionId = value;
            this.helper.calcInspection();
            this.helper.calcPacking();
    }

    get checkOverWeight(): boolean {
        return this.helper.getSF00302Data().checkOverWeight;
    }

    //3007
    inspectionOption = DataUtil.toSelectBoxDataSource(INSPECTION_ID);

    packingOption = DataUtil.toSelectBoxDataSource(PACKING_ID);

    shippingCostOption = DataUtil.toSelectBoxDataSource(SHIPPING_COST_ID);

    // packingInputNumber
    get packingInputNumber() {
        return this.helper.getSF00302Data().product.packingInputNumber;
    }

    set packingInputNumber(value: string) {
        this.helper.getSF00302Data().product.packingInputNumber = value;
    }

    // passageNo
    get passageNo() {
        return this.helper.getSF00302Data().product.passageNo;
    }

    set passageNo(value: string) {
        this.helper.getSF00302Data().product.passageNo = value;
    }
    // packingNote
    get packingNote() {
        return this.helper.getSF00302Data().product.packingNote;
    }

    set packingNote(value: string) {
        this.helper.getSF00302Data().product.packingNote = value;
    }
}
