import {Component, Input} from "@angular/core";
import ValidatorUtil from "../../../../../../util/validator-util";
import {Router} from "@angular/router";
import {SF00302Service} from "../../../SF00302.service";
import {SF003020101Helper} from "./SF003020101.helper";
import {SF0030204Helper} from "./SF0030204.helper";
import {SF00302Data} from "../../../SF00302.data";

declare var $: JQueryStatic;
declare var App: any;

@Component({
    templateUrl: "SF0030204.component.html",
    selector: 'sf0030204'
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030204Component {
    @Input()
    helper: SF0030204Helper;

    constructor(public sv00302Service: SF00302Service, private router: Router) {
    }

    get isRequestDesign(){
        return this.pageData.isRequestDesign;
    }

    get isView() {
        if (this.isRequestDesign) {
            return false;
        } else {
            return this.pageData.isView;
        }
    }

    get isCreateNewProduct() {
        return this.pageData.isCreateNewProduct;
    }

    get mstShapes(){
        return this.pageData.mstData.mstShapes;
    }
    get isCheckCreate() {
        return this.pageData.product.productCode == undefined;
    }

    get pageData():SF00302Data{
        return this.helper.getSF00302Data();
    }

    navigateSF008() {
        this.sv00302Service.sv003013UpdateProductImposition(this.pageData.product,this.pageData.paperModelNews).then(data => {
            this.router.navigate(["home/deal", this.pageData.dealCode, "product", this.pageData.product.productCode, "calc-imposition"]);
        });
    }

    /**
     * Get state if Product Spec Accordion is filled with data or not
     * */
    get stateProductSpec() {
        if ((this.pageData.product.sizeW != undefined
            && this.pageData.product.sizeH != undefined
            && this.pageData.product.sizeD != undefined
            && this.pageData.product.blankPaperSizeW != undefined
            && this.pageData.product.blankPaperSizeH != undefined) || this.pageData.product.shapeId == this.pageData.DECORATIVE_ID
        ||this.pageData.product.shapeId == this.pageData.ONE_STAGE) {
            if (this.pageData.product.productType != 1) {
                return true;
            } else {
                if (this.pageData.product.paperNameId != undefined) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    isHighlighted(input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    }

    get sizeW(): number {
        return this.pageData.product.sizeW;
    }

    set sizeW(value: number) {
        this.pageData.highlightedTracker.touch('size');
        this.pageData.product.sizeW = value;
    }

    get sizeD(): number {
        return this.pageData.product.sizeD;
    }

    set sizeD(value: number) {
        this.pageData.highlightedTracker.touch('size');
        this.pageData.product.sizeD = value;
    }

    get sizeH(): number {
        return this.pageData.product.sizeH;
    }

    set sizeH(value: number) {
        this.pageData.highlightedTracker.touch('size');
        this.pageData.product.sizeH = value;
    }

    get blankPaperSizeW(): number {
        return this.pageData.product.blankPaperSizeW;
    }

    set blankPaperSizeW(value: number) {
        this.pageData.highlightedTracker.touch('blankPaperSize');
        this.pageData.product.blankPaperSizeW = value;

        this.helper.calcStampingBasicCost();
        this.helper.calcStampingThroughWage();
        this.helper.calcPasteBasicCost();
        this.helper.calcPasteThroughWage();
        this.helper.calcWindowTotalCost();
        this.helper.calcShippingCost();
    }

    get blankPaperSizeH(): number {
        return this.pageData.product.blankPaperSizeH;
    }

    set blankPaperSizeH(value: number) {
        this.pageData.highlightedTracker.touch('blankPaperSize');

        this.pageData.product.blankPaperSizeH = value;

        this.helper.calcStampingBasicCost();
        this.helper.calcStampingThroughWage();
        this.helper.calcWindowTotalCost();
        this.helper.calcShippingCost();
    }


    get shapeId() {
        if (this.pageData.product.shapeId == undefined) {
            return 0;
        }
        return this.pageData.product.shapeId;
    }

    set shapeId(value: number) {
        this.pageData.highlightedTracker.touch('shapeId');
        this.setShapeIdConcealed(value);
    }

    setShapeIdConcealed(value: number) {
        this.pageData.product.shapeId = value;
    }

}
