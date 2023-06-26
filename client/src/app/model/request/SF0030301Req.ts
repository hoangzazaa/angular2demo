import {Quotation} from "../core/Quotation.model";
import {QuotationItem} from "../core/QuotationItem.model";
export class SF0030301Req {
    public quotation: Quotation = new Quotation();
    public quotationItems: QuotationItem[] = [];
}