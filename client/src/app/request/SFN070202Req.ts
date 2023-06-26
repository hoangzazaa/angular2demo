import {Product} from "../model/core/Product.model";

export class SFN070202Req {
    dealCode: string;
    product: Product;

    constructor(dealCode: string, product: Product) {
        this.dealCode = dealCode;
        this.product = product;
    }
}
