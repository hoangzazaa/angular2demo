import {Component, Input} from "@angular/core";
import ValidatorUtil from "../../../../../util/validator-util";
import {SF0030211Helper} from "./SF0030211.helper";

declare var $: JQueryStatic;
declare var App: any;
@Component({
    templateUrl: "SF0030211.component.html",
    selector: 'sf0030211'
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030211Component {
    @Input()
    helper: SF0030211Helper;


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

    get isRequestDesign() {
        return this.helper.getSF00302Data().isRequestDesign;
    }

    get isCreateNewProduct () {
        return this.helper.getSF00302Data().isCreateNewProduct;
    }

    isHighlighted(input) {
        return this.helper.getSF00302Data().highlightedTracker.isHighlightedProperty(input);
    }

    /**
     * Get state if Product Window Accordion is filled with data or not
     * */
    get stateProductWindow() {
        if (this.helper.getSF00302Data().product.windowSizeW != undefined && this.helper.getSF00302Data().product.windowSizeH != undefined
            && this.helper.getSF00302Data().product.windowSizeW != 0 && this.helper.getSF00302Data().product.windowSizeH != 0) {
            return true;
        } else {
            return false;
        }
    }

    // windowSizeW
    get windowSizeW(): number {
        return this.helper.getSF00302Data().product.windowSizeW;
    }

    set windowSizeW(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('windowSize');
        this.helper.getSF00302Data().product.windowSizeW = value;

        this.helper.calcWindowMaterialFee();

    }

    // windowSizeH
    get windowSizeH(): number {
        return this.helper.getSF00302Data().product.windowSizeH;
    }

    set windowSizeH(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('windowSize');
        this.helper.getSF00302Data().product.windowSizeH = value;

        this.helper.calcWindowMaterialFee();

    }
}
