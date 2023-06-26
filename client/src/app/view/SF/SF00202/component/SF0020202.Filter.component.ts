import {Component, EventEmitter, Output} from "@angular/core";
import {SF00202RuleFilter} from "../model/SF00202.filter";
import DataUtil from "../../../../util/data-util";
import {DEAL_STATUS, DEAL_STATUS_VALUES, DEAL_TYPE, PRINT_METHOD, SHAPE} from "../../../../helper/mst-data-type";

declare let App: any;

@Component({
    selector:    "sf0020202-filter",
    templateUrl: "SF0020202.Filter.component.html",
    styleUrls: ["SF0020202.Filter.component.css"]
})
export class SF0020202FilterComponent {
    @Output() advanceSearchRequested: EventEmitter<SF00202RuleFilter> = new EventEmitter<SF00202RuleFilter>();

    private ruleFilter: SF00202RuleFilter = new SF00202RuleFilter();

    constructor() { }

    get defaultPeriodFrom(): Date {
        return null;
    }

    get defaultPeriodTo(): Date {
        return null;
    }

    get printMethod() {
        return this.ruleFilter.printMethod;
    }

    set printMethod(val: any) {
        this.ruleFilter.printMethod = parseInt(val);
    }

    private ACCEPTED_STATUS = [
        DEAL_STATUS_VALUES.ORDER_CONFIRMED,
        DEAL_STATUS_VALUES.SHIPMENT_CONFIRMED,
        DEAL_STATUS_VALUES.WAITING_FOR_PARTIAL_SHIPMENT,
        DEAL_STATUS_VALUES.SHIPPED
    ];

    //3007
    mstDealStatus = DataUtil
            .toSelectBoxDataSource(DEAL_STATUS)
            .filter(s => this.ACCEPTED_STATUS.indexOf(s.id) > 0);

    get dealStatus() {
        return this.ruleFilter.dealStatus;
    }

    set dealStatus(val: any) {
        this.ruleFilter.dealStatus = parseInt(val);
    }

    mstShape = DataUtil.toSelectBoxDataSource(SHAPE);

    get shapeId() {
        return this.ruleFilter.shapeId;
    }

    set shapeId(val: any) {
        this.ruleFilter.shapeId = parseInt(val);
    }

    get dealType() {
        return this.ruleFilter.dealType;
    }

    set dealType(val: any) {
        this.ruleFilter.dealType = parseInt(val);
    }

    get periodType() {
        return this.ruleFilter.periodType;
    }

    set periodType(val: any) {
        this.ruleFilter.periodType = parseInt(val);
    }

    mstPeriodType = DataUtil.toSelectBoxDataSource({1: "納品日", 2: "作成日"});

    printMethods =  DataUtil.toSelectBoxDataSource(PRINT_METHOD);

    resetAllFilters(): void {
        this.ruleFilter = new SF00202RuleFilter();
        $("#resetFilters").blur();
        this.requestAdvanceSearch();
    }

    requestAdvanceSearch(): void {
        this.advanceSearchRequested.emit(this.ruleFilter.clone());
    }

    // dealTypes = DataUtil.toSelectBoxDataSource(DEAL_TYPE);
    // To place "指定なし" item at the top...
    dealTypes = [{ id: 99, name: "指定なし" }].concat(DataUtil.toSelectBoxDataSource(DEAL_TYPE));
}
