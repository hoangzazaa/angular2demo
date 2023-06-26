import {AfterViewInit, Component, Input} from "@angular/core";
import {SF00302Data} from "../../SF00302.data";
import {SF00302Service} from "../../SF00302.service";
import Messages, {MSG} from "../../../../../helper/message";
import {ProductCommonFee} from "../../../../../model/core/ProductCommonFee.model";
import ValidatorUtil from "../../../../../util/validator-util";
import {SF003020101Helper} from "../SF0030201/SF003020101/SF003020101.helper";
import {SF0030203Helper} from "./SF0030203.helper";

declare var $: JQueryStatic;
declare var App: any;
@Component({
    selector: "sf0030203",
    templateUrl: "SF0030203.component.html"
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030203Component implements AfterViewInit{

    @Input()
    helper:SF0030203Helper;

    ngAfterViewInit(): void {
        if (this.helper.getSF00302Data().productCommonFee != undefined) {
            this.helper.getSF00302Data().indexProductCommonFee = new ProductCommonFee();
            Object.assign(this.helper.getSF00302Data().indexProductCommonFee, this.helper.getSF00302Data().productCommonFee);
        }
    }
    get isRequestDesign(){
        return this.helper.getSF00302Data().isRequestDesign;
    }

    get isCreateNewProduct () {
        return this.helper.getSF00302Data().isCreateNewProduct;
    }

    constructor(public sv00302Service: SF00302Service) {

    }


    /**
     * Reset update product common
     *
     * */
    resetProductCommon() {
        // set product common fee
        this.helper.getSF00302Data().productCommonFee.designFee = this.helper.getSF00302Data().indexProductCommonFee.designFee;
        this.helper.getSF00302Data().productCommonFee.moldFee = this.helper.getSF00302Data().indexProductCommonFee.moldFee;
        this.helper.getSF00302Data().productCommonFee.woodenFee = this.helper.getSF00302Data().indexProductCommonFee.woodenFee;
        this.helper.getSF00302Data().productCommonFee.resinFee = this.helper.getSF00302Data().indexProductCommonFee.resinFee;
        this.helper.getSF00302Data().productCommonFee.plateMakingFee = this.helper.getSF00302Data().indexProductCommonFee.plateMakingFee;
        this.helper.getSF00302Data().checkCommonSave = true;

    }

    /**
     * Save productCommonFee
     *
     * */
    saveProductCommon() {
        if (this.helper.getSF00302Data().product.id != undefined) {
            this.sv00302Service.sv0030210UpdateProductCommonFee(this.helper.getSF00302Data().productCommonFee).then(data => {
                $.notify({
                    message: Messages.get(MSG.SF00302.INF006)
                }, {
                    type: 'success'
                });
                this.helper.getSF00302Data().indexProductCommonFee.designFee = this.helper.getSF00302Data().productCommonFee.designFee;
                this.helper.getSF00302Data().indexProductCommonFee.moldFee = this.helper.getSF00302Data().productCommonFee.moldFee;
                this.helper.getSF00302Data().indexProductCommonFee.woodenFee = this.helper.getSF00302Data().productCommonFee.woodenFee;
                this.helper.getSF00302Data().indexProductCommonFee.resinFee = this.helper.getSF00302Data().productCommonFee.resinFee;
                this.helper.getSF00302Data().indexProductCommonFee.plateMakingFee = this.helper.getSF00302Data().productCommonFee.plateMakingFee;
                this.helper.getSF00302Data().checkCommonSave = false;
            }, err => {
                $.notify({
                    message: Messages.get(MSG.SF00302.ERR003)
                }, {
                    type: 'danger'
                });
            })
        } else {
            $.notify({
                message: Messages.get(MSG.SF00302.ERR003)
            }, {
                type: 'danger'
            });
        }
    }

    get checkCreate() {
        if (this.helper.getSF00302Data().product.id == null) {
            return false;
        }
        return true;
    }

    get isView() {
        if(this.isRequestDesign) {
            return false
        } else {
            return this.helper.getSF00302Data().isView;
        }
    }

    get designFee(): number {
        return this.helper.getSF00302Data().productCommonFee.designFee;
    }

    set designFee(value: number) {
        this.helper.getSF00302Data().productCommonFee.designFee = value;
        this.helper.getSF00302Data().checkCommonSave = true;
    }

    get plateMakingFee(): number {
        return this.helper.getSF00302Data().productCommonFee.plateMakingFee;
    }

    set plateMakingFee(value: number) {
        this.helper.getSF00302Data().productCommonFee.plateMakingFee = value;
        this.helper.getSF00302Data().checkCommonSave = true;
    }

    get woodenFee(): number {
        return this.helper.getSF00302Data().productCommonFee.woodenFee;
    }

    set woodenFee(value: number) {
        this.helper.getSF00302Data().productCommonFee.woodenFee = value;
        this.helper.getSF00302Data().checkCommonSave = true;
    }

    get moldFee(): number {
        return this.helper.getSF00302Data().productCommonFee.moldFee;
    }

    set moldFee(value: number) {
        this.helper.getSF00302Data().productCommonFee.moldFee = value;
        this.helper.getSF00302Data().checkCommonSave = true;
    }

    get resinFee(): number {
        return this.helper.getSF00302Data().productCommonFee.resinFee;
    }

    set resinFee(value: number) {
        this.helper.getSF00302Data().productCommonFee.resinFee = value;
        this.helper.getSF00302Data().checkCommonSave = true;
    }
}
