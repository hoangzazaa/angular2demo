import {ChangeDetectionStrategy, Component, forwardRef, Inject, OnInit, ViewChild} from "@angular/core";
import {SFN0401Page} from "../SFN0401.page";
import {StockListTableModel} from "../../COMMON/stock-list-table/StockListTable.model";
import {GenericProvider} from "../../../../component/GenericProvider";
import {StockListTableComponent} from "../../COMMON/stock-list-table/StockListTable.component";
import {SFN040102Component} from "./SFN040102.PartnerPanel.component";
import {InventoryModel} from "../model/SFN0401_Inventory.model";

@Component({
    selector: "[sfn040105]",
    templateUrl: "SFN040105.Stock.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{provide: StockListTableModel.PROVIDER, useFactory: () => new GenericProvider<StockListTableModel>()}]
})
export class SFN040105Component extends StockListTableModel implements OnInit {

    @ViewChild(StockListTableComponent) stockListTable: StockListTableComponent;

    constructor(private page: SFN0401Page, @Inject(forwardRef(() => SFN040102Component)) private component: SFN040102Component,
                @Inject(StockListTableModel.PROVIDER) provider: GenericProvider<StockListTableModel>) {
        super();

        provider.provider = this;

        if (this.component.data3 == undefined) {
            this.component.data3 = this.data;
        } else {
            this.data = this.component.data3;
        }
    }

    ngOnInit(): void {
        this.data.originDataList = this.component.partner.inventories;
    }

    //region Bindings

    //endregion

    //region Actions

    onTabSelected() {
        this.stockListTable.refreshTable();
    }

    navigateToDeal(record: InventoryModel) {
        let dealCode = record.product.dealCode;
        this.page.navigateToDeal(dealCode);
    }

    navigateToProduct(record: InventoryModel) {
        let product = record.product;
        this.page.navigateToProduct(product);
    }

    //endregion
}