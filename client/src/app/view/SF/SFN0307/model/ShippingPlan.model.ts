import {PIBShipping} from "../../../../component/product-info-box/model/PIBShipping.model";
/**
 * Plan model for SFN0307
 */
export class ShippingPlanModel implements PIBShipping {

    id: number;
    no: number;
    shippingDate: Date;
    deliveryDate: Date;
    loadingAddressId: number;
    loadingAddressName: string;
    loadingAddressCode: string;
    quantity: number;
    shippingCompany: number;
    specifyTime: number;
    specifyTimeHour: number;
    specifyTimeMinute: number;
    specifyTimePeriod: number;
    destinationId: number;
    specifyTimeStr: string;

    get pib_no(): number {
        return this.no;
    }

    set pib_no(value: number) {
        this.no = value;
    }

    get pib_shippingDate(): Date {
        return this.shippingDate;
    }

    set pib_shippingDate(value: Date) {
        this.shippingDate = value;
    }

    get pib_deliveryDate(): Date {
        return this.deliveryDate;
    }

    set pib_deliveryDate(value: Date) {
        this.deliveryDate = value;
    }

    get pib_loadingAddressId(): number {
        return this.loadingAddressId;
    }

    set pib_loadingAddressId(value: number) {
        this.loadingAddressId = value;
    }

    get pib_loadingAddressName(): string {
        return this.loadingAddressName;
    }

    set pib_loadingAddressName(value: string) {
        this.loadingAddressName = value;
    }

    get pib_loadingAddressCode(): string {
        return this.loadingAddressCode;
    }

    set pib_loadingAddressCode(value: string) {
        this.loadingAddressCode = value;
    }

    get pib_quantity(): number {
        return this.quantity;
    }

    set pib_quantity(value: number) {
        this.quantity = value;
    }

    get pib_shippingCompany(): number {
        return this.shippingCompany;
    }

    set pib_shippingCompany(value: number) {
        this.shippingCompany = value;
    }

    get pib_destinationId(): number {
        return this.destinationId;
    }

    set pib_destinationId(value: number) {
        this.destinationId = value;
    }

    get pib_specifyTime(): string {
        return this.specifyTimeStr;
    }

    set pib_specifyTime(value: string) {
        this.specifyTimeStr = value;
    }

    get stm_pattern(): number {
        return this.specifyTime;
    }

    set stm_pattern(value: number) {
        this.specifyTime = value;
    }

    get stm_hour(): number {
        return this.specifyTimeHour;
    }

    set stm_hour(value: number) {
        this.specifyTimeHour = value;
    }

    get stm_minute(): number {
        return this.specifyTimeMinute;
    }

    set stm_minute(value: number) {
        this.specifyTimeMinute = value;
    }

    get stm_period(): number {
        return this.specifyTimePeriod;
    }

    set stm_period(value: number) {
        this.specifyTimePeriod = value;
    }
}