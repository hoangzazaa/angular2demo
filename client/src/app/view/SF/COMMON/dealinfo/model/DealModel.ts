import {DEAL_STATUS_VALUES} from "../../../../../helper/mst-data-type";
export class DealInfoModel {
    dealId: number;
    dealCode: string;
    dealName: string;
    customerCode: string;
    customerName: string;
    saleName: string;
    dealType: number;
    deliveryDate: Date;
    estimateTotal: number;
    dealStatus: number;
    templateFlag: number;
    closedFlag: number;
    jobInprocess: number;

    get confirmedOrder() {
        return this.dealStatus == DEAL_STATUS_VALUES.SHIPMENT_CONFIRMED;
    }
}
