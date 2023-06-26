import {Component, Input, OnInit} from "@angular/core";
import {SF0030201Helper} from "./SF0030201.helper";
import {FACTORY_ID, PRODUCT_TYPE} from "../../helper/master-option";
import DataUtil from "../../../../../util/data-util";
import {SF00302Data} from "../../SF00302.data";
import ValidatorUtil from "../../../../../util/validator-util";
import {FormatUtil} from "../../../../../util/format-util";

declare let $: JQueryStatic;
declare let App: any;
@Component({
    templateUrl: "SF0030201.component.html",
    selector: 'sf0030201'
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030201Component implements OnInit{
    //3007
    factoryOption: any;
    ngOnInit(): void {
        let result = DataUtil.toSelectBoxDataSource(FACTORY_ID);
        if (this.productTypeInt() == 1) {
            result.splice(2, 1);
        } else if (this.productTypeInt() == 2) {
            result.splice(1, 2);
        } else if (this.productTypeInt() == 3) {
            result.splice(0, 2);
        }
        this.factoryOption = result;
    }

    @Input()
    helper: SF0030201Helper;

    get isPaperbox():boolean{
        if(!!!this.sf00302Data.product.productType && !!!this.sf00302Data.product.shapeId)
            return true;

        return false;
    }

    get sf00302Data(): SF00302Data {
        return this.helper.getSF00302Data();
    }

    /*check if request design or not */
    get isRequestDesign() {
        return this.sf00302Data.isRequestDesign;
    }

    /* Check Mode view */
    get isView(): boolean {
        if (this.isRequestDesign) {
            return false;
        } else {
            return this.sf00302Data.isView;
        }
    }

    // customerProductCode
    get customerProductCode(): string {
        return this.sf00302Data.product.customerProductCode;
    }

    set customerProductCode(value: string) {
        this.sf00302Data.product.customerProductCode = value;
    }

    //  productCode
    get productCode() {
        return this.sf00302Data.product.productCode;
    }

    // productName
    get productName() {
        return this.sf00302Data.product.productName;
    }

    set productName(value: string) {
        this.sf00302Data.product.productName = value;
        //this.helper.validateForm();
    }

    // productType
    get productType() {
        return this.sf00302Data.product.productType;
    }

    // wooden number
    get woodenCode1(): string {
        if (this.sf00302Data.product.woodenCode != undefined) {
            let woodenCode = this.sf00302Data.product.woodenCode;
            return woodenCode;
        }
        return null;
    }

    set woodenCode1(value: string) {
        this.sf00302Data.product.woodenCode = value;
    }

    get woodenCode2(): string {
        if (this.sf00302Data.product.woodenCode2 != undefined) {
            let woodenCode = this.sf00302Data.product.woodenCode2;
            return woodenCode;
        }
        return null;
    }

    set woodenCode2(value: string) {
        this.sf00302Data.product.woodenCode2 = value;
    }


    //shareWoodenFlag1
    shareWoodenFlag1Checked(): boolean {
        if (this.sf00302Data.product.shareWoodenFlag1 == 1) {
            return true;
        }
        return false;
    }

    shareWoodenFlag1(event) {
        let value = event.target.checked;
        if(!!value)
            this.sf00302Data.product.shareWoodenFlag1 = 1;
        else
            this.sf00302Data.product.shareWoodenFlag1 = 0;

    }

    //shareWoodenFlag1
    shareWoodenFlag2Checked(): boolean {
        if (this.sf00302Data.product.shareWoodenFlag2 == 1) {
            return true;
        }
        return false;
    }

    shareWoodenFlag2(event) {
        let value = event.target.checked;
        if(!!value)
            this.sf00302Data.product.shareWoodenFlag2 = 1;
        else
            this.sf00302Data.product.shareWoodenFlag2 = 0;

    }

    // application
    get application() {
        return this.sf00302Data.product.application;
    }

    set application(value: string) {
        this.sf00302Data.product.application = value;
    }

    // filmNumber
    get filmNumber() {
        return this.sf00302Data.product.filmCode;
    }

    set filmNumber(value: string) {
        this.sf00302Data.product.filmCode = value;
    }

    // requestProduction
    get requestProduction(): number {
        if (this.sf00302Data.product.factoryId == undefined) {
            if (this.sf00302Data.product.productType == 0) {
                this.sf00302Data.product.factoryId = 1;
            } else {
                this.sf00302Data.product.factoryId = 3;
            }
        }
        return this.sf00302Data.product.factoryId;
    }

    set requestProduction(value: number) {
        this.sf00302Data.product.factoryId = value;
        //Reset Shipping distance
        this.sf00302Data.product.shippingCostId = 0;
    }

    // woodenExpiredDate
    get woodenExpiredDate(): Date {
        if (this.sf00302Data.product.wooden != null) {
            return this.sf00302Data.product.wooden.woodenExpiredDate;
        } else {
            return null;
        }
    }

    // itemCode
    get itemCode(): String {
        if (this.sf00302Data.product.itemCode != null
            && this.sf00302Data.product.denno == 1) {
            return this.sf00302Data.product.itemCode;
        } else {
            return null;
        }
    }

    // memo1
    get memo1(): string {
        return this.sf00302Data.product.memo1;
    }

    set memo1(value: string) {
        this.sf00302Data.product.memo1 = value;
    }

    // memo2
    get memo2(): string {
        return this.sf00302Data.product.memo2;
    }

    set memo2(value: string) {
        this.sf00302Data.product.memo2 = value;
    }

    // memo3
    get memo3(): string {
        return this.sf00302Data.product.memo3;
    }

    set memo3(value: string) {
        this.sf00302Data.product.memo3 = value;
    }

    get copyType(): number {
        // if it is a request design will be return 1, can edit
        if (this.isRequestDesign){
            return 1;
        } else {
            return this.sf00302Data.product.copyType;
        }
    }

    /* Get Product Type to make condition display factory */
    productTypeInt() {
        if (this.sf00302Data.product.productType == 0) {
            if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
                return 1; //Normal Product
            } else {
                return 2; //Decorative
            }
        } else if (this.sf00302Data.product.productType == 1) {
            return 3; // Carton
        }
        return 1;
    }

    productTypeOption = DataUtil.toSelectBoxDataSource(PRODUCT_TYPE);

    get checkBorderProductName(): {style: string, radius: string} {
        if (ValidatorUtil.isNotEmpty(this.sf00302Data.product.id)) {
            if (this.sf00302Data.productRequiredItem.isSaveProductName) {
                return this.sf00302Data.errFieldBorderCss;
            } else {
                return this.sf00302Data.noneFieldBorderCss;
            }
        } else {
            if (this.sf00302Data.productRequiredItem.isSaveProductName) {
                return this.sf00302Data.errFieldBorderCss;
            } else {
                return this.sf00302Data.defaultFieldBorderCss;
            }
        }

    }

    get checkBorderFactoryId(): {style: string, radius: string} {
        if (ValidatorUtil.isNotEmpty(this.sf00302Data.product.id)) {
            if (this.sf00302Data.productRequiredItem.isSaveFactoryId) {
                return this.sf00302Data.errFieldBorderCss;
            } else {
                return this.sf00302Data.noneFieldBorderCss;
            }
        } else {
            if (this.sf00302Data.productRequiredItem.isSaveFactoryId) {
                return this.sf00302Data.errFieldBorderCss;
            } else {
                return this.sf00302Data.defaultFieldBorderCss;
            }
        }

    }

    // sampleNo
    get sampleNo() {
        return this.sf00302Data.product.sampleNo;
    }

    set sampleNo(value: string) {
        this.sf00302Data.product.sampleNo = value;
    }

    get isCarton():boolean{
        return FormatUtil.isCarton3458(this.sf00302Data.product);
    }
}
