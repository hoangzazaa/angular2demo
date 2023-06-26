import {ChangeDetectionStrategy, Component, forwardRef, Inject, OnInit, ViewChild} from "@angular/core";
import {SFN0401Page} from "../SFN0401.page";
import {ProductListTableModel} from "../../COMMON/product-list-table/ProductListTable.model";
import {GenericProvider} from "../../../../component/GenericProvider";
import {ProductListTableComponent} from "../../COMMON/product-list-table/ProductListTable.component";
import {SFN040102Component} from "./SFN040102.PartnerPanel.component";
import {ProductModel} from "../model/SFN0401_Product.model";

@Component({
    selector: "[sfn040106]",
    templateUrl: "SFN040106.Product.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{provide: ProductListTableModel.PROVIDER, useFactory: () => new GenericProvider<ProductListTableModel>()}]
})
export class SFN040106Component extends ProductListTableModel implements OnInit {

    @ViewChild(ProductListTableComponent) stockListTable: ProductListTableComponent;

    constructor(private page: SFN0401Page, @Inject(forwardRef(() => SFN040102Component)) private component: SFN040102Component,
                @Inject(ProductListTableModel.PROVIDER) provider: GenericProvider<ProductListTableModel>) {
        super();

        provider.provider = this;

        if (this.component.data4 == undefined) {
            this.component.data4 = this.data;
        } else {
            this.data = this.component.data4;
        }
    }

    ngOnInit(): void {
        this.data.originDataList = this.component.partner.products;
    }

    //region Bindings

    //endregion

    //region Actions

    navigateToProduct(record: ProductModel) {
        this.page.navigateToProduct(record);
    }

    onTabSelected() {
        this.stockListTable.refreshTable();
    }

    //endregion
}