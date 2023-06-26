import {Component, Input, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {SF00501Page} from "../SF00501.page";
import {DetailWrapperModel} from "../model/SF00501_DetailWrapper.model";
import {SF00501Constants} from "../SF00501.constants";
import {SF00501Helper} from "../SF00501.helper";

declare let Chart: any;

@Component({
    selector: "[sf0050105]",
    templateUrl: "SF0050105.DetailTableRow.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SF0050105Component implements OnInit {

    // row Index
    @Input() index: number;
    // row data
    rowData: DetailWrapperModel;
    // dateList
    dateList: number[];
    // time now
    monthNow: number;

    constructor(private page: SF00501Page) {
        let timeNow = new Date();
        this.monthNow = timeNow.getFullYear() * 12 + (timeNow.getMonth() + 1);
    }

    ngOnInit(): void {
        this.rowData = this.page.pageData.displayDetails[this.index];
        this.dateList = this.page.pageData.dateList;
    }

    get hasOldDetail(): boolean {
        return (this.page.pageData.currentFilter.dateUnit != SF00501Constants.OPTION_DATE_UNIT_MONTH);
    }

    get isNormalRow(): boolean {
        return (this.rowData.type == SF00501Constants.TYPE_WRAPPER_NORMAL);
    }

    get isOldTotalRow(): boolean {
        return (this.rowData.type == SF00501Constants.TYPE_WRAPPER_OLD_TOTAL);
    }

    get isTotalRow(): boolean {
        return (this.rowData.type == SF00501Constants.TYPE_WRAPPER_TOTAL);
    }

    get isGoalRow(): boolean {
        return (this.rowData.type == SF00501Constants.TYPE_WRAPPER_GOAL);
    }

    get isRateRow(): boolean {
        return (this.rowData.type == SF00501Constants.TYPE_WRAPPER_RATE);
    }

    get isStaffView(): boolean {
        return (this.page.pageData.selectedViewMode == SF00501Constants.OPTION_DETAIL_STAFF);
    }

    get titleRow(): string {
        return this.rowData.detail.name;
    }

    get titleId(): number {
        return this.rowData.detail.id;
    }

    get hasTotalAmount(): boolean {
        return (this.rowData.detail.totalAmount != undefined);
    }

    get totalAmount(): number {
        return this.rowData.detail.totalAmount;
    }

    get totalOldAmount(): number {
        return this.rowData.oldDetail.totalAmount;
    }

    get totalGrowthRate(): number {
        let old: number = this.rowData.oldDetail.totalAmount;
        let now: number = this.rowData.detail.totalAmount;
        if(!!old && !!now && old > 0 && now > 0){
            return 100 * now / old;
        }
        return 0;
    }

    hasAmount(date: number): boolean {
        let value = this.rowData.detail.amounts[date];
        return !isNaN(value) && isFinite(value);
    }

    getAmount(date: number): number {
        return this.rowData.detail.amounts[date];
    }

    hasOldAmount(date: number): boolean {
        let value = this.rowData.oldDetail.amounts[date];
        return !isNaN(value) && isFinite(value);
    }

    isPlan(date: number): boolean {
        if (this.page.pageData.currentFilter.sumaryType == SF00501Constants.OPTION_SUMMARY_INPROCESS) {
            if (this.page.pageData.currentFilter.dateUnit != SF00501Constants.OPTION_DATE_UNIT_MONTH) {
                // convert month to financial month
                let tmpDate = date;
                let tmpYear = this.page.pageData.currentFilter.date.startYear;
                if (date < 4) {
                    tmpYear = this.page.pageData.currentFilter.date.endYear;
                }
                // compare month
                let monthSelected = tmpYear * 12 + tmpDate;
                return (monthSelected >= this.monthNow);
            } else {
                let cY = this.page.pageData.currentTime.getFullYear();
                let cM = this.page.pageData.currentTime.getMonth() + 1;
                if ((cY < this.page.pageData.currentFilter.date.startYear)
                    || (cY == this.page.pageData.currentFilter.date.startYear && cM <= this.page.pageData.currentFilter.date.startMonth)) {
                    return true;
                }
            }
        }
        return false;
    }

    getOldAmount(date: number): number {
        return this.rowData.oldDetail.amounts[date];
    }

    getGrowthRate(date: number): number {
        let old: number = this.rowData.oldDetail.amounts[date];
        let now: number = this.rowData.detail.amounts[date];
        if(!!old && !!now && old > 0 && now > 0){
            return 100 * now / old;
        }
        return 0;
    }

    convertYenToThousanYen(value: number){
        return SF00501Helper.convertYenToThousanYen(value);
    }
}