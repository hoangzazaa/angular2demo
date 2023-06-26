import {Component, OnInit} from "@angular/core";
import {SFN0401Page} from "../SFN0401.page";
import {FilterModel} from "../model/SFN0401_Filter.model";
import {SFN0401Helper} from "../SFN0401.helper";
import {SFN0401Constants} from "../SFN0401.constants";

@Component({
    selector: "[sfn040101]",
    templateUrl: "SFN040101.FilterPanel.component.html"
})
export class SFN040101Component implements OnInit {

    // tmp select value
    // enable filter
    filterEnable: boolean;
    currentFilter: FilterModel;

    constructor(private page: SFN0401Page) {

        this.filterEnable = true;
        this.currentFilter = new FilterModel();
    }

    ngOnInit(): void {
        // trigger clear filter
        this.clearFilter();
    }

    //region Screen bindings

    get filter(): FilterModel {
        return this.currentFilter;
    }

    get keywords(): string[] {
        return this.currentFilter.keywords;
    }

    set keywords(value: string[]) {
        this.currentFilter.keywords = value;
        this.doFilter();
    }

    get canChangeType(): boolean {
        return (this.page.pageData.screenMode == SFN0401Constants.MODE_REPEAT);
    }

    //endregion

    //region Screen actions

    // clear filter
    clearFilter() {
        this.currentFilter = SFN0401Helper.getDefaultFilter(this.page.pageData.screenMode);

        this.doFilter();
    }

    // filter
    doFilter() {
        // disable filter
        this.filterEnable = false;

        // apply filter
        let filter = this.page.pageData.currentFilter;
        filter.type = this.currentFilter.type
        filter.keywords = this.currentFilter.keywords;
        filter.code = this.currentFilter.code;
        filter.name = this.currentFilter.name;
        filter.contactName = this.currentFilter.contactName;
        filter.salesName = this.currentFilter.salesName;
        filter.page = 1;

        this.page.doFilter().then(() => {
            // enable filter
            this.filterEnable = true;
        });
    }

    //endregion
}