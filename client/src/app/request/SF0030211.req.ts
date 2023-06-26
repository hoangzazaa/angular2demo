import {Offer} from "../model/core/Offer.model";
export class SF0030211Req {
    offer: Offer;
    dealCode: string;
    productCode: string;

    constructor(offer: Offer, dealCode: string,productCode: string) {
        this.offer = offer;
        this.dealCode = dealCode;
        this.productCode = productCode;
    }
}
