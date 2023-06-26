import {DealProduct} from "../model/core/DealProduct.model";

export class SF0030204Req {
    dealProduct: DealProduct;

    constructor(dealProduct: DealProduct) {
        this.dealProduct = dealProduct;
    }
}
