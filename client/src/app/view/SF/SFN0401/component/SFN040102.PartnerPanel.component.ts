import {ApplicationRef, Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {SFN0401Page} from "../SFN0401.page";
import {SFN040104Component} from "./SFN040104.Revenue.component";
import {SFN040105Component} from "./SFN040105.Stock.component";
import {SFN040106Component} from "./SFN040106.Product.component";
import {PartnerModel} from "../model/SFN0401_Partner.model";
import {SFN0401Constants} from "../SFN0401.constants";
import {RevenueListTableData} from "../../COMMON/revenue-list-table/RevenueListTable.data";
import {StockListTableData} from "../../COMMON/stock-list-table/StockListTable.data";
import {ProductListTableData} from "../../COMMON/product-list-table/ProductListTable.data";

@Component({
    selector: "[sfn040102]",
    templateUrl: "SFN040102.PartnerPanel.component.html"
})
export class SFN040102Component implements OnInit {

    @ViewChild("boxBody") boxBody: ElementRef;
    @ViewChild(SFN040104Component) sfn040104: SFN040104Component;
    @ViewChild(SFN040105Component) sfn040105: SFN040105Component;
    @ViewChild(SFN040106Component) sfn040106: SFN040106Component;
    currentTab: number;
    @Input() index: number;
    partner: PartnerModel;
    // data cache
    data2: RevenueListTableData;
    data3: StockListTableData;
    data4: ProductListTableData;

    constructor(private page: SFN0401Page, private ref: ApplicationRef) {
        this.currentTab = 1;
        this.partner = new PartnerModel();
    }

    ngOnInit(): void {
        this.partner = this.page.pageData.partnerList[this.index];
    }

    //region Bindings

    isTabActive(tab: number): boolean {
        return (this.currentTab == tab);
    }

    selectTab(tab: number) {
        if (tab !== this.currentTab) {
            this.currentTab = tab;
            this.ref.tick();
            if (this.currentTab == 2) {
                this.sfn040104.onTabSelected();
            } else if (this.currentTab == 3) {
                this.sfn040105.onTabSelected();
            } else if (this.currentTab == 4) {
                this.sfn040106.onTabSelected();
            }
        }
    }

    viewDetail() {
        this.page.navigateToPartner(this.partner);
    }

    get canSelectCustomer(): boolean {
        return (this.page.pageData.screenMode == SFN0401Constants.MODE_CUSTOMER);
    }

    get canSelectSupplier(): boolean {
        return (this.page.pageData.screenMode == SFN0401Constants.MODE_SUPPLIER);
    }

    get isCustomer(): boolean {
        return (this.partner.type == SFN0401Constants.PTYPE_CUSTOMER);
    }

    get isSupplier(): boolean {
        return (this.partner.type == SFN0401Constants.PTYPE_SUPPLIER);
    }

    get canSelectPartner(): boolean {
        return this.page.pageData.canSelectPartner;
    }

//endregion

    //region Actions

    toggleBox() {
        $(this.boxBody.nativeElement).collapse('toggle');
    }

    selectCustomer() {
        this.page.selectCustomer();
    }

    selectSupplier() {
        this.page.selectSupplier();
    }

    //endregion
}