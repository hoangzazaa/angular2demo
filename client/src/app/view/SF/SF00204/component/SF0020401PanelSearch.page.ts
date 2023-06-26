import {Component, EventEmitter, Output} from "@angular/core";
import DataUtil from "../../../../util/data-util";
import {DEAL_STATUS, DEAL_TYPE, PRINT_METHOD, SHAPE} from "../../../../helper/mst-data-type";
import {SF00204FilterModel} from "../model/SF00204Filter.model";

/** 案件区分の選択オプション */
const DEAL_TYPE_OPTIONS: {id: number, name: string}[]
    = [{ id: SF00204FilterModel.DEAL_TYPE_NONE, name: "指定なし" }]
        .concat(DataUtil.toSelectBoxDataSource(DEAL_TYPE));


@Component({
    selector: "sf0020401-filter",
    templateUrl: 'SF0020401PanelSearch.component.html',
    styleUrls: ["SF0020401PanelSearch.component.css"]
})

export class SF0020401PanelSearch {
    @Output() advanceSearchRequested: EventEmitter<SF00204FilterModel> = new EventEmitter<SF00204FilterModel>();

    private ruleFilter: SF00204FilterModel = new SF00204FilterModel();

    constructor() {
    }

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

    //3007
    mstDealStatus = DataUtil.toSelectBoxDataSource(DEAL_STATUS);

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

    printMethods = DataUtil.toSelectBoxDataSource(PRINT_METHOD);

    resetAllFilters(): void {
        this.ruleFilter = new SF00204FilterModel();
        $("#resetFilters").blur();
    }

    requestAdvanceSearch(): void {
        this.advanceSearchRequested.emit(this.ruleFilter.clone());
    }

    get dealTypes() {
        return DEAL_TYPE_OPTIONS;
    }

}
