import {Component, Input} from "@angular/core";
import {SF00302Data} from "../../SF00302.data";
import {SF0030219Helper} from "./SF0030219.helper";
import {CARTON_BINDING_METHOD, CARTON_PACKING, SHIPPING_COST_ID, STRING_COLOR} from "../../helper/master-option";
import DataUtil from "../../../../../util/data-util";
import ValidatorUtil from "../../../../../util/validator-util";

declare var $: JQueryStatic;
declare var App: any;

@Component({
    selector: "sf0030219",
    templateUrl: "SF0030219.component.html"
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030219Component {
    @Input()
    helper: SF0030219Helper;

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

    get checkBorderRequiredAdditionalWork(): { style: string, radius: string } {
        return {style: "solid 2px #5c90d2", radius: "50%"};
    }

    get isView() {
        if (this.isRequestDesign) {
            return false;
        } else {
            return this.helper.getSF00302Data().isView;
        }
    }

    get shippingCostId(): number {
        if (this.helper.getSF00302Data().product.shippingCostId == undefined) {
            this.helper.getSF00302Data().product.shippingCostId = 30;
        }
        return this.helper.getSF00302Data().product.shippingCostId;
    }

    set shippingCostId(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('shippingCostId');
        this.setShippingConcealed(value);

        this.helper.validateForm();
    }

    setShippingConcealed(value: number) {
        this.helper.getSF00302Data().product.shippingCostId = value;
        this.helper.calcShipFareCarton();
    }

    get shippingCostOption() {
        let map = this.helper.getSF00302Data().mstData.mstCartonShipping;
        let keys = Object.keys(map), options = { 0: "" };
        let max_distance = 0;
        keys.map((k)=> {
            Object.keys(map[k]).map((distance)=>{
                options[distance] = `${distance}kmまで`
                max_distance = Math.max(max_distance, parseInt(distance));
            })
        });
        return DataUtil.toSelectBoxDataSource(options);
    }
    // shippingCostOption = DataUtil.toSelectBoxDataSource(SHIPPING_COST_ID);

    bindingMethodOption = DataUtil.toSelectBoxDataSource(CARTON_BINDING_METHOD);

    stringColorOption = DataUtil.toSelectBoxDataSource(STRING_COLOR);

    packingIdOption = DataUtil.toSelectBoxDataSource(CARTON_PACKING);


    // KH yêu cầu ko cần validate #2224
    /*get checkBorderShippingCostId(): {style: string, radius: string} {
        if (this.helper.getSF00302Data().zCheck) {
            return this.helper.getSF00302Data().defaultFieldBorderCss;
        } else {
            if (this.helper.getSF00302Data().yCheck) {
                if (this.helper.getSF00302Data().productRequiredItem.isSaveCartonShippingCost) {
                    return this.helper.getSF00302Data().errFieldBorderCss;
                } else {
                    if (this.helper.getSF00302Data().xCheck) {
                        return this.helper.getSF00302Data().defaultFieldBorderCss;
                    } else {
                        return this.helper.getSF00302Data().noneFieldBorderCss;
                    }
                }
            } else {
                if (this.helper.getSF00302Data().xCheck) {
                    return this.helper.getSF00302Data().defaultFieldBorderCss;
                } else {
                    return this.helper.getSF00302Data().noneFieldBorderCss;
                }
            }
        }
    }*/

    set bindingMethod(value: any) {
        this.helper.getSF00302Data().product.bindingMethod = value;
        this.helper.getSF00302Data().highlightedTracker.touch('bindingMethod');
    }

    get bindingMethod() {
        return this.helper.getSF00302Data().product.bindingMethod;
    }

    set bindingNumber(value: any) {
        this.helper.getSF00302Data().product.bindingNumber = value;
        this.helper.getSF00302Data().highlightedTracker.touch('bindingMethod');
    }

    get bindingNumber() {
        return this.helper.getSF00302Data().product.bindingNumber;
    }

    set stringColor(value: any) {
        this.helper.getSF00302Data().product.stringColor = value;
        this.helper.getSF00302Data().highlightedTracker.touch('stringColor');
    }

    get stringColor() {
        return this.helper.getSF00302Data().product.stringColor;
    }

    set stringNumber(value: any) {
        this.helper.getSF00302Data().product.stringNumber = value;
        this.helper.getSF00302Data().highlightedTracker.touch('stringColor');
    }

    get stringNumber() {
        return this.helper.getSF00302Data().product.stringNumber;
    }

    set packingId(value: any) {
        this.helper.getSF00302Data().product.packingId = value;
        this.helper.getSF00302Data().highlightedTracker.touch('packingId');
        this.helper.calcPacking();
    }

    get packingId() {

        // packingIdが初期値である場合は「0: ""」を設定する。
        if(this.helper.getSF00302Data().product.packingId == undefined){
            this.helper.getSF00302Data().product.packingId = 0;
            this.helper.calcPacking();
        }
        return this.helper.getSF00302Data().product.packingId;
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
}