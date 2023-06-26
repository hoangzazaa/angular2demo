import {Component, Input, Output, EventEmitter} from "@angular/core";
import {SF00301_Quotation} from "../model/SF00301_Quotation.model";

@Component({
    selector: "div[sf0030104-quotationInfo]",
    templateUrl: "SF0030104.QuotationInfo.component.html"
})
export class SF0030104Component {
    @Input() item: SF00301_Quotation;
    @Input() index: number;
    @Input() canViewDetailed: boolean;
    @Input() canRemove: boolean;

    @Output() requestRemoveQuotation: EventEmitter<any> = new EventEmitter<any>();
    @Output() requestViewQuotationInfo: EventEmitter<any> = new EventEmitter<any>();
    @Output() requestHighlightFlag: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    get interestRate(): number {
        return this.item.interestRate || 0;
    }

    get submittedTotal(): number {
        return this.item.totalCost;
    }

    get lot(): number {
        return this.item.lot;
    }

    get submittedUnitPrice(): number {
        return this.item.unitPrice;
    }

    updateHighlightFlag(){
        this.requestHighlightFlag.emit(this.item);
    }

    navigateSF00303() {
        if (!this.canViewDetailed)
            return;
        this.requestViewQuotationInfo.emit(this.item);
    }

    removeMe() {
        this.requestRemoveQuotation.emit(this.item);
    }

}
