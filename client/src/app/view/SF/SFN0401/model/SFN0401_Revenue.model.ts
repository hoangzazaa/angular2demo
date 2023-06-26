import {ProductModel} from "./SFN0401_Product.model";
import {RLTRevenue} from "../../COMMON/revenue-list-table/model/RLTRevenue.model";
export class RevenueModel implements RLTRevenue {

    // 売上日
    salesDate: Date;
    salesDateStr: string;
    // 品名/内容
    product: ProductModel;

    //region RTLReveneu
    rlt_selected: boolean;

    get rlt_salesDate(): Date {
        return this.salesDate;
    }

    set rlt_salesDate(value: Date) {
        this.salesDate = value;
    }

    get rlt_salesDateStr(): string {
        return this.salesDateStr;
    }

    set rlt_salesDateStr(value: string) {
        this.salesDateStr = value;
    }

    get rlt_dealCode(): string {
        return this.product.dealCode;
    }

    set rlt_dealCode(value: string) {
        this.product.dealCode = value;
    }

    get rlt_productName(): string {
        return this.product.name;
    }

    set rlt_productName(value: string) {
        this.product.name = value;
    }

    get rlt_productDescription(): string {
        return this.product.description;
    }

    set rlt_productDescription(value: string) {
        this.product.description = value;
    }

    get rlt_quantity(): number {
        return this.product.quantity;
    }

    set rlt_quantity(value: number) {
        this.product.quantity = value;
    }

    get rlt_unitPrice(): number {
        return this.product.unitPrice;
    }

    set rlt_unitPrice(value: number) {
        this.product.unitPrice = value;
    }

    get rlt_total(): number {
        return this.product.total;
    }

    set rlt_total(value: number) {
        this.product.total = value;
    }

    get rlt_itemCode(): string {
        return this.product.itemCode;
    }

    set rlt_itemCode(value: string) {
        this.product.itemCode = value;
    }
    //endregion
}