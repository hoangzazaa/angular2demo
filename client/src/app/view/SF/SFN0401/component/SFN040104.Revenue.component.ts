import {ChangeDetectionStrategy, Component, forwardRef, Inject, OnInit, ViewChild} from "@angular/core";
import {SFN0401Page} from "../SFN0401.page";
import {RevenueListTableModel} from "../../COMMON/revenue-list-table/RevenueListTable.model";
import {GenericProvider} from "../../../../component/GenericProvider";
import {RevenueListTableComponent} from "../../COMMON/revenue-list-table/RevenueListTable.component";
import {SFN040102Component} from "./SFN040102.PartnerPanel.component";
import {RevenueModel} from "../model/SFN0401_Revenue.model";

@Component({
    selector: "[sfn040104]",
    templateUrl: "SFN040104.Revenue.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{provide: RevenueListTableModel.PROVIDER, useFactory: () => new GenericProvider<RevenueListTableModel>()}]
})
export class SFN040104Component extends RevenueListTableModel implements OnInit {

    @ViewChild(RevenueListTableComponent) revenueListTable: RevenueListTableComponent;

    constructor(private page: SFN0401Page, @Inject(forwardRef(() => SFN040102Component)) private component: SFN040102Component,
                @Inject(RevenueListTableModel.PROVIDER) provider: GenericProvider<RevenueListTableModel>) {
        super();

        provider.provider = this;

        if (this.component.data2 == undefined) {
            this.component.data2 = this.data;
        } else {
            this.data = this.component.data2;
        }

        this.data.isSupplier = this.component.isSupplier;
    }

    ngOnInit(): void {
        this.data.originDataList = this.component.partner.revenues;
    }

    //region Bindings

    //endregion

    //region Actions

    navigateToDeal(record: RevenueModel) {
        let dealCode = record.product.dealCode;
        this.page.navigateToDeal(dealCode);
    }

    navigateToProduct(record: RevenueModel) {
        let product = record.product;
        this.page.navigateToProduct(product);
    }

    onTabSelected() {
        this.revenueListTable.refreshTable();
    }

    //endregion
}