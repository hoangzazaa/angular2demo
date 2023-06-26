import {PLTProduct} from "../../COMMON/product-list-table/model/PLTProduct.model";
import {type} from "os";
export class ProductModel implements PLTProduct {

    // dealCode
    dealCode: string;
    // product code
    code: string;
    type: number;
    shapeId: number;
    // itemC
    itemCode: string;
    // 品名
    name: string;
    // 内容
    description: string;
    // 数量
    quantity: number;
    // 単価
    unitPrice: number;
    // 合計
    total: number;
    // 木型
    wooden: string;
    // 木型有効期限
    woodenExp: number;
    woodenStatus: string;
    woodenExpStr: string;
    cartonShippingType: number;

    //region PLTProduct
    plt_selected: boolean;

    get plt_productNo(): string {
        return this.itemCode;
    }

    set plt_productNo(value: string) {
        this.itemCode = value;
    }

    get plt_productCode(): string {
        return this.code;
    }

    set plt_productCode(value: string) {
        this.code = value;
    }

    get plt_productName(): string {
        return this.name;
    }

    set plt_productName(value: string) {
        this.name = value;
    }

    get plt_productDescription(): string {
        return this.description;
    }

    set plt_productDescription(value: string) {
        this.description = value;
    }

    get plt_quantity(): number {
        return this.quantity;
    }

    set plt_quantity(value: number) {
        this.quantity = value;
    }

    get plt_unitPrice(): number {
        return this.unitPrice;
    }

    set plt_unitPrice(value: number) {
        this.unitPrice = value;
    }

    get plt_production(): number {
        return this.total;
    }

    set plt_production(value: number) {
        this.total = value;
    }

    get plt_wooden(): string {
        return this.wooden;
    }

    set plt_wooden(value: string) {
        this.wooden = value;
    }

    get plt_woodenExp(): string {
        return this.woodenExpStr;
    }

    set plt_woodenExp(value: string) {
        this.woodenExpStr = value;
    }
    //endregion
    get productType(){
        return this.type;
    }
}