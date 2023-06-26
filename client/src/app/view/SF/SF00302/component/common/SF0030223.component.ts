import {Component, Input} from "@angular/core";
import {SF00302Data} from "../../SF00302.data";
import {SF0030223Helper} from "./SF0030223.helper";
import {SF00302Helper} from "../../SF00302.helper";
/**
 * Created by vupt9 on 5/30/2017.
 */
declare var $: JQueryStatic;
declare var App: any;

@Component({
    selector: "sf0030223",
    templateUrl: "SF0030223.component.html"
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030223Component {
    @Input()
    helper: SF00302Helper;

    get isRequestDesign() {
        return this.helper.getSF00302Data().isRequestDesign;
    }

    constructor(public sf00302Data: SF00302Data) {
    }

    get isCreateNewProduct() {
        return this.helper.getSF00302Data().isCreateNewProduct;
    }

    isHighlighted(input) {
        return this.helper.getSF00302Data().highlightedTracker.isHighlightedProperty(input);
    }

    get isView() {
        if (this.isRequestDesign) {
            return false;
        } else {
            return this.helper.getSF00302Data().isView;
        }
    }

    set memo1(value: any) {
        this.helper.getSF00302Data().product.memo1 = value;
        this.helper.getSF00302Data().highlightedTracker.touch('otherNote1');
        this.helper.getSF00302Data().product.specialNote1Flag = 1;
    }

    get memo1() {
        return this.helper.getSF00302Data().product.memo1;
    }

    set memo2(value: any) {
        this.helper.getSF00302Data().product.memo2 = value;
        this.helper.getSF00302Data().highlightedTracker.touch('otherNote2');
    }

    get memo2() {
        return this.helper.getSF00302Data().product.memo2;
    }

    set memo3(value: any) {
        this.helper.getSF00302Data().product.memo3 = value;
        this.helper.getSF00302Data().highlightedTracker.touch('otherNote3');
    }

    get memo3() {
        return this.helper.getSF00302Data().product.memo3;
    }

    get stateOtherNote() {
        if (this.helper.getSF00302Data().product.memo3 != undefined && this.helper.getSF00302Data().product.memo3 != ""
            && this.helper.getSF00302Data().product.memo3 != undefined && this.helper.getSF00302Data().product.memo3 != ""
            && this.helper.getSF00302Data().product.memo3 != undefined && this.helper.getSF00302Data().product.memo3 != "") {
            return true;
        } else {
            return false;
        }
    }
}
