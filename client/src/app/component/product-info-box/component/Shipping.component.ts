import {Component, Input, OnInit} from "@angular/core";
import {PIBShipping} from "../model/PIBShipping.model";
import {ProductInfoBoxComponent} from "../ProductInfoBox.component";
import {CommonHelper, Option} from "../../../helper/common-helper";
import {SHIPPING_COMPANY} from "../../../helper/mst-data-type";
import {SDMDestination} from "../../shipping-destination-modal/model/SDMDestination.model";
import {Constants} from "../../../helper/constants";
import {MSG} from "../../../helper/message";
import { PIBLoading } from "../model/PIBLoading.model"

const SHIPPING_COMPANY_OPTIONS = CommonHelper.getList([0, 1, 2, 3, 4, 5, 6, 7, 8], SHIPPING_COMPANY);

@Component({
    selector: "[shipping]",
    templateUrl: "Shipping.component.html"
})
export class ShippingComponent implements OnInit {

    @Input() index: number;
    shippingPlan: PIBShipping;
    loadingsCodeMap: Object;

    constructor(private component: ProductInfoBoxComponent) {
        this.loadingsCodeMap = {};
    }

    ngOnInit(): void {
        this.shippingPlan = this.component.data.shippings[this.index];
        this.shippingPlan.pib_no = this.index;

        // 無理やりcodeを引っ張る
        let len = this.component.data.loadings.length;
        for (let i = 0; i < len; i++) {
            this.loadingsCodeMap[this.component.data.loadings[i].pib_code] = i;
            if (this.component.data.loadings[i].pib_id == this.shipping.pib_loadingAddressId) {
                this.shipping.pib_loadingAddressCode = this.component.data.loadings[i].pib_code;
            }
        }
    }

    //region Bindings

    get shipping(): PIBShipping {
        return this.shippingPlan;
    }

    get shippingCompanyOptions(): Option[] {
        return SHIPPING_COMPANY_OPTIONS;
    }

    get destinationList(): SDMDestination[] {
        return this.component.data.destinations;
    }

    get canDelete(): boolean {
        return (this.index > 0);
    }

    get multiShip(): boolean {
        return (this.index > 0);
    }

    isInput(value: any): boolean {
        return (this.component.checked && (value == undefined));
    }

    //endregion

    //region Actions

    removeShipping() {
        let self = this;
        swal({
                title: Constants.BLANK,
                text: MSG.COMPONENT.PRODUCT_INFO_BOX.WRN001,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d26a5c",
                confirmButtonText: "OK",
                closeOnConfirm: true
            },
            () => {
                this.component.removeShipping(this.index);
            });
    }

    addShipping() {
        this.component.addShipping(this.index);
    }

    pickSpecifyTime() {
        this.component.pickSpecifyTime(this.index);
    }

    viewDetailDestination() {
        this.component.viewDestination(this.index);
    }

    selectLoadingAddress() {
        this.component.selectLoadingAddress(this.index);
    }

    set loadingAddressName(value: string){
        this.shipping.pib_loadingAddressName = value;
        this.shipping.pib_loadingAddressId = undefined;
    }

    get loadingAddressName(): string{
        return this.shipping.pib_loadingAddressName;
    }

    set loadingAddressCode(value: string) {
        this.shipping.pib_loadingAddressCode = value;
        if ( this.loadingsCodeMap[value] ) {
            let i = this.loadingsCodeMap[value];
            let o:PIBLoading = this.component.data.loadings[i];
            this.shipping.pib_loadingAddressName = o.pib_name;
            this.shipping.pib_loadingAddressId = o.pib_id;
        }
        else {
            this.loadingAddressName = undefined;
            this.shipping.pib_loadingAddressId = undefined;
        }
    }

    get loadingAddressCode(): string {
        return this.shipping.pib_loadingAddressCode;
    }

    //endregion
}