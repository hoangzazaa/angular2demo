import {Component, ChangeDetectionStrategy, OnInit} from "@angular/core";
import {SF00501Page} from "../SF00501.page";
import {DealModel} from "../model/SF00501_Deal.model";
import {SF00501Constants} from "../SF00501.constants";
import {SF00501Service} from "../SF00501.service";
import {Constants} from "../../../../helper/constants";
import ColumnDefsSettings = DataTables.ColumnDefsSettings;

@Component({
    selector: "[sf0050106]",
    templateUrl: "SF0050106.DealList.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SF0050106Component implements OnInit {

    // selected page
    selectedPage: number;
    // deal count
    dealCount: number;
    // filtered deals
    filterDeals: DealModel[];
    // display deals
    displayDeals: DealModel[];

    constructor(private page: SF00501Page, private service: SF00501Service) {
        this.page.pageData.selectedDealType = SF00501Constants.OPTION_DEAL_ALL;
        this.selectedPage = 1;
        this.dealCount = 0;
        this.displayDeals = [];
    }

    ngOnInit(): void {
        // update deal list filter default
        this.updateDealList();
    }

    get dealType(): number {
        return this.page.pageData.selectedDealType;
    }

    set dealType(value: number) {
        this.page.pageData.selectedDealType = value;
        this.selectedPage = 1;
        this.updateDealList();
    }

    get dealList(): DealModel[] {
        return this.displayDeals;
    }

    get dealTotal() {
        return this.dealCount;
    }

    selectPage(pageIndex: number) {
        this.selectedPage = pageIndex;
        this.updateDealList();

        $('#dealRecords').find('tbody').scrollTop(0 - $("#dealRecordsCount").height());
    }

    updateDealList() {
        // filter deals
        this.filterDeals = [];
        if (this.dealType == SF00501Constants.OPTION_DEAL_NEW) {
            this.filterDeals = this.page.pageData.deals.filter(deal => {
                return deal.dealType == Constants.DEAL_NEW;
            });
        } else if (this.dealType == SF00501Constants.OPTION_DEAL_REUSE) {
            this.filterDeals = this.page.pageData.deals.filter(deal => {
                return deal.dealType == Constants.DEAL_REUSE;
            });
        } else {
            this.filterDeals = this.page.pageData.deals;
        }

        // update count
        this.dealCount = this.filterDeals.length;
        // update data paging
        let offset: number = (this.selectedPage - 1) * Constants.PAGE_SIZE;

        this.filterDeals = this.filterDeals.slice(offset, offset + Constants.PAGE_SIZE);

    }
}
