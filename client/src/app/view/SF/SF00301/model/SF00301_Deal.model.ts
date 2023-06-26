import {Constants} from "../../../../helper/constants";
import { DEAL_STATUS_VALUES, TEMPLATE_DEAL, DEAL_STATUS } from '../../../../helper/mst-data-type';
import {BaseModel} from "../../../../model/core/BaseModel.model";
import {SF00301_Comment} from "./SF00301_Comment.model";
import {SF00301_Customer} from "./SF00301_Customer.model";
import {SF00301_OrderItem} from "./SF00301_OrderItems.model";
import {SF00301_Product} from "./SF00301_Product.model";
import {SF00301_ProductFile} from "./SF00301_ProductFile.model";
import {SF00301_Quotation} from "./SF00301_Quotation.model";
import {SF00301_User} from "./SF00301_User.model";

export class SF00301_Deal extends BaseModel {
    public dealName: string;
    public dealCode: string;
    public dealType: number;
    public estTotalDeal: number;
    public dealStatus: number;
    public deliveryDate: Date;
    public templateFlag: number;
    public closedFlag: number;
    public isInMybox: boolean;
    public isInLock: boolean;
    public customerName: string;
    public customerId: number;

    public customer: SF00301_Customer;
    public saler: SF00301_User;

    public products: SF00301_Product[] = [];
    public quotations: SF00301_Quotation[] = [];
    public productFiles: SF00301_ProductFile[] = [];
    public comments: SF00301_Comment[] = [];
    public orderItems: SF00301_OrderItem[] = [];
    public isSaved: boolean;
    /*state of customer during customer changing*/
    public hasRegisteredCustomer: boolean = true;

    isSaveCustomer: boolean = false;
    isSaveDealName: boolean = false;
    isSaveEstimate: boolean = false;
    isSaveDeliveryDate: boolean = false;
    jobInprocess: number;

    /** リピート案件フラグ true: リピート案件, false: 元案件 */
    public isRepeatDeal: boolean = false;

    /** 注文日 (関連案件内のみ) */
    public orderDate: Date;

    get isTemplate() {
        return this.templateFlag === TEMPLATE_DEAL.TRUE;
    }

    get isClosed() {
        return !!this.closedFlag;
    }

    get isRepeatedDeal(): boolean {
        //http://fridaynight.vnext.vn/issues/2944
        return false;
    }

    get isImmutableDeal(): boolean {
        //return this.isTemplate || this.isConfirmedOrder;
        return this.isTemplate || this.isClosed || this.isRepeatedDeal || this.isConfirmedOrder;
    }

    get isNewEditionDeal(): boolean {
        return this.dealStatus === DEAL_STATUS_VALUES.NEW_EDITION;
    }

    get isRequestedDesign(): boolean {
        return this.dealStatus >= DEAL_STATUS_VALUES.DESIGN_REQUESTED;
    }

    get canRequestDesign() {
        return this.isSaved
            && !this.isTemplate
            && !!(this.products || []).find(p => p.requestDesignFlag !== Constants.ONE && p.highlightFlag === Constants.ONE);
    }

    get isCompletedDesign(): boolean {
        return this.dealStatus >= DEAL_STATUS_VALUES.DESIGN_CONFIRMED;
    }

    get isConfirmedOrder(): boolean {
        return this.dealStatus >= DEAL_STATUS_VALUES.ORDER_CONFIRMED;
    }

    get isAcceptedShipping(): boolean {
        return this.dealStatus >= DEAL_STATUS_VALUES.SHIPMENT_CONFIRMED;
    }

    get isShipped(): boolean {
        return this.dealStatus >= DEAL_STATUS_VALUES.SHIPPED;
    }

    get canDelete(): boolean {
        let DEAL_CLOSED = 1;
        return this.dealStatus == DEAL_STATUS_VALUES.NEW_EDITION || this.closedFlag == DEAL_CLOSED;
    }

    // deal call job inprogress
    get isJobInprocess(): boolean {
        return this.jobInprocess == 1;
    }

    public setDeal(data: any) {
        if (!data)
            return;

        //set basic info & binding value to properties
        this.setData(data);

        this.dealName = data["dealName"];
        this.dealCode = data["dealCode"];
        this.dealType = data["dealType"];
        this.estTotalDeal = data["estTotalDeal"];
        this.dealStatus = data["dealStatus"];
        this.deliveryDate = !!data["deliveryDate"] ? new Date(data["deliveryDate"]) : undefined;
        this.templateFlag = data["templateFlag"];
        this.closedFlag = data["closedFlag"];
        this.customerName = data["customerName"];
        this.isInMybox = data["isInMybox"];
        this.jobInprocess = data["jobInprocess"];
        this.isInLock     = data["dealLockFlag"];
        this.isRepeatDeal = !!data["repeatFlag"];
        this.orderDate = !!data["orderDate"] ? new Date(data["orderDate"]) : undefined;
    }

    /**
     * 案件ステータスの表示形式
     */
    get dealStatusDisplayName(): string {
        return this.isClosed ? "終了" : (DEAL_STATUS[this.dealStatus] || '');
    }
}
