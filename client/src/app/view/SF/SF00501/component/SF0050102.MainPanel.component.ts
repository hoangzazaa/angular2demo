import {Component} from "@angular/core";
import {SF00501Page} from "../SF00501.page";
import {ViewModeModel} from "../model/SF00501_ViewMode.model";
import {SF00501Constants} from "../SF00501.constants";
import {SF00501Helper} from "../SF00501.helper";

@Component({
    selector: "[sf0050102]",
    templateUrl: "SF0050102.MainPanel.component.html"
})
export class SF0050102Component {

    constructor(private page: SF00501Page) {
    }

    get headLine(): string {
        return this.page.pageData.headline;
    }

    get showSummaryTable(): boolean {
        return this.page.pageData.showSummaryTable;
    }

    get summaryNewAmount1(): number {
        return this.page.pageData.summary.newAmount1;
    }

    get summaryNewAmount2(): number {
        return this.page.pageData.summary.newAmount2;
    }

    get summaryNewAmount3(): number {
        return this.page.pageData.summary.newAmount3;
    }

    get summaryNewTotal(): number {
        return this.page.pageData.summary.newTotal;
    }

    get summaryOldAmount1(): number {
        return this.page.pageData.summary.oldAmount1;
    }

    get summaryOldAmount2(): number {
        return this.page.pageData.summary.oldAmount2;
    }

    get summaryOldAmount3(): number {
        return this.page.pageData.summary.oldAmount3;
    }

    get summaryOldTotal(): number {
        return this.page.pageData.summary.oldTotal;
    }

    get isNanDiffRate(): boolean {
        return isNaN(this.page.pageData.summary.diffRate) || !isFinite(this.page.pageData.summary.diffRate);
    }

    get summaryDiffRate(): number {
        return this.page.pageData.summary.diffRate;
    }

    get hasViewModes(): boolean {
        return (this.page.pageData.viewModes != undefined);
    }

    get viewModes(): ViewModeModel[] {
        return this.page.pageData.viewModes;
    }

    get viewMode(): ViewModeModel {
        return this.page.pageData.selectedViewMode;
    }

    set viewMode(value: ViewModeModel) {
        this.page.pageData.selectedViewMode = value;

        // check preview list deal by saleId and month
        if (value == SF00501Constants.OPTION_DETAIL_DEAL) {
            // get list deal
            this.page.getListDealBySaleIdAndMonth();
        } else {
            // reset view deals
            this.page.pageData.showDealList = false;
            // change and reset data
            this.page.analyzeData();
            this.page.reInitDataTable();
            this.page.checkSummaryTable();
        }

    }

    get dateList(): number[] {
        return this.page.pageData.dateList;
    }

    get displayTable(): boolean {
        return this.page.pageData.displayTable;
    }

    get displayGraph(): boolean {
        return this.page.pageData.displayGraph;
    }

    convertYenToThousanYen(value: number){
        return SF00501Helper.convertYenToThousanYen(value);
    }
}