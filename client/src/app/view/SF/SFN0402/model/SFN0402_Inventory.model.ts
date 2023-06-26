import {ProductModel} from "./SFN0402_Product.model";
import {SLTStock} from "../../COMMON/stock-list-table/model/SLTStock.model";
export class InventoryModel implements SLTStock {

    // id
    id: number;
    // 種別
    type: number;
    typeStr: string;
    // 品名/内容
    product: ProductModel;
    // 製造日
    manufactureDate: Date;
    manufactureDateStr: string;
    // 保管日数
    storageDays: number;

    //region SLT
    slt_selected: boolean;

    get slt_classify(): string {
        return this.typeStr;
    }

    set slt_classify(value: string) {
        this.typeStr = value;
    }

    get slt_dealCode(): string {
        return this.product.dealCode;
    }

    set slt_dealCode(value: string) {
        this.product.dealCode = value;
    }

    get slt_productName(): string {
        return this.product.name;
    }

    set slt_productName(value: string) {
        this.product.name = value;
    }

    get slt_productDescription(): string {
        return this.product.description;
    }

    set slt_productDescription(value: string) {
        this.product.description = value;
    }

    get slt_quantity(): number {
        return this.product.quantity;
    }

    set slt_quantity(value: number) {
        this.product.quantity = value;
    }

    get slt_unitPrice(): number {
        return this.product.unitPrice;
    }

    set slt_unitPrice(value: number) {
        this.product.unitPrice = value;
    }

    get slt_total(): number {
        return this.product.total;
    }

    set slt_total(value: number) {
        this.product.total = value;
    }

    get slt_productionDate(): Date {
        return this.manufactureDate;
    }

    set slt_productionDate(value: Date) {
        this.manufactureDate = value;
    }

    get slt_productionDateStr(): string {
        return this.manufactureDateStr;
    }

    set slt_productionDateStr(value: string) {
        this.manufactureDateStr = value;
    }

    get slt_storageDays(): number {
        return this.storageDays;
    }

    set slt_storageDays(value: number) {
        this.storageDays = value;
    }

    //endregion
}