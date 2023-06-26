import {Component, Input, Output, EventEmitter} from "@angular/core";
import {QuotationModel} from "../model/Quotation.model";
import {FormatUtil} from "../../../../util/format-util";
import {DealInfoModel} from "../../COMMON/dealinfo/model/DealModel";

declare let $: JQueryStatic;
@Component({
    selector: "quotation-information",
    templateUrl: "SF0030701.QuotationInfor.component.html"
})

export class SF0030701QuotationInfor {
    @Input() quotations: QuotationModel[];
    @Input() dealInfo: DealInfoModel;

    @Output() emitViewQuotationInfo: EventEmitter<any> = new EventEmitter<any>();
    @Output() emitFindDataProductInfo: EventEmitter<any> = new EventEmitter<any>();

    viewQuotationInfo(quotation: QuotationModel) {
        this.emitViewQuotationInfo.emit(quotation.quotationCode);
    }

    viewDataProductInfo(quotation: QuotationModel) {
        this.emitFindDataProductInfo.emit(quotation.id);
    }

    unitPrice(quotation: QuotationModel): string {
        if (quotation.unitPrice) {
            return '@' + FormatUtil.formatNumber(quotation.unitPrice);
        }

        return '';
    }

    totalCost(quotation: QuotationModel): string {
        if (quotation.totalCost) {
            return FormatUtil.formatNumber(quotation.totalCost) + '円';
        }

        return '';
    }
}
