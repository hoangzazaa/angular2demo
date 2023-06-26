import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from "@angular/core";
import {SFN0402Page} from "../SFN0402.page";
import {StockListTableModel} from "../../COMMON/stock-list-table/StockListTable.model";
import {GenericProvider} from "../../../../component/GenericProvider";
import {StockListTableComponent} from "../../COMMON/stock-list-table/StockListTable.component";
import {InventoryModel} from "../model/SFN0402_Inventory.model";
import DataUtil from "../../../../util/data-util";
import {SFN0402Constants} from "../SFN0402.constants";

@Component({
    selector: "[sfn040204]",
    templateUrl: "SFN040204.StockPanel.component.html",
    providers: [{provide: StockListTableModel.PROVIDER, useFactory: () => new GenericProvider<StockListTableModel>()}]
})
export class SFN040204Component extends StockListTableModel implements AfterViewInit {

    @ViewChild(StockListTableComponent) stockListTable: StockListTableComponent;
    curPage: number;
    hasChecked: boolean;
    exportEnabled: boolean;
    /* csv */
    private hot: ht.Methods;
    private exportPlugin: any;

    constructor(private page: SFN0402Page, private el: ElementRef,
                @Inject(StockListTableModel.PROVIDER) provider: GenericProvider<StockListTableModel>) {
        super();

        provider.provider = this;

        // default
        this.page.pageData.inventoryHits = 0;
        this.page.pageData.spcStockDays = 0;
        this.page.pageData.spcStockType = 0;
        this.curPage = 1;
        this.hasChecked = false;
        this.exportEnabled = false;

        // init hot csv
        this.initCsvPlugin();
    }

    ngAfterViewInit(): void {
        this.doFilter();
    }

    //region Bindings

    get hits(): number {
        return this.page.pageData.inventoryHits;
    }

    get stockDays(): number {
        return this.page.pageData.spcStockDays;
    }

    set stockDays(value: number) {
        this.page.pageData.spcStockDays = value;
        this.doFilter();
    }

    get stockType(): number {
        return this.page.pageData.spcStockType;
    }

    set stockType(value: number) {
        this.page.pageData.spcStockType = value;
        this.doFilter();
    }

    get currentPage(): number {
        return this.curPage;
    }

    set currentPage(value: number) {
        this.curPage = value;

        this.stockListTable.reloadData(false);
    }

    get hasRecords(): boolean {
        return (this.page.pageData.inventoryHits > 0);
    }

    //endregion

    //region Actions

    exportCsv() {
        this.hot.loadData(this.getFullData());

        let fileName = this.page.pageData.partnerCode + "_在庫状況";
        this.exportPlugin.downloadFile('csv', {
            filename: fileName,
            columnHeaders: true
        });
    }

    navigateToDeal(record: InventoryModel) {
        let dealCode = record.product.dealCode;
        this.page.navigateToDeal(dealCode);
    }

    navigateToProduct(record: InventoryModel) {
        let product = record.product;
        this.page.navigateToProduct(product);
    }

    doFilter() {
        OneUI.blocks(this.el.nativeElement, "state_loading");

        this.page.loadStockPanel().then(() => {
            this.stockListTable.reloadData(true);

            OneUI.blocks(this.el.nativeElement, "state_normal");
        });
    }

    disposalProduct() {
        this.page.showMail(SFN0402Constants.MAIL_PRODUCT_DISPOSAL);
    }

    shippingStock() {
        // get selected product
        let pageData = this.page.pageData;
        pageData.selectedInventory = undefined;
        for (let inventory of pageData.inventories) {
            if (inventory != undefined && inventory.slt_selected) {
                pageData.selectedInventory = inventory;
                break;
            }
        }

        // do shipping stock
        this.page.shippingStock();
    }

    exportStocks() {
        this.exportEnabled = false;
        this.page.exportStocks().then(() => {
            this.exportEnabled = true;
        });
    }

    //endregion

    //region Functions

    getDataList(): InventoryModel[] {
        let startR = (this.curPage - 1) * 10;
        return this.page.pageData.inventories.slice(startR, startR + 10);
    }

    getFullData(): InventoryModel[] {
        return this.page.pageData.inventories;
    }

    onCheck(row: number, checked: boolean) {
        for (let inventory of this.page.pageData.inventories) {
            inventory.slt_selected = false;
        }

        super.onCheck(row, checked);

        if (checked) {
            this.hasChecked = true;
        } else {
            this.hasChecked = false;
        }
    }

    private initCsvPlugin() {
        this.hot = new Handsontable(document.createElement("div"), {
            columns: [
                {
                    data: DataUtil.data("slt_classify"),
                    title: "種別"
                },
                {
                    data: DataUtil.data("slt_dealCode"),
                    title: "案件ID"
                },
                {
                    data: DataUtil.data("slt_productName"),
                    title: "品名"
                },
                {
                    data: DataUtil.data("slt_productDescription"),
                    title: "内容"
                },
                {
                    data: DataUtil.data("slt_quantity"),
                    title: "数量"
                },
                {
                    data: DataUtil.data("slt_unitPrice"),
                    title: "単価"
                },
                {
                    data: DataUtil.data("slt_total"),
                    title: "合計"
                },
                {
                    data: DataUtil.data("slt_productionDateStr"),
                    title: "製造日"
                },
                {
                    data: DataUtil.data("slt_storageDays"),
                    title: "保管日数"
                },
                {
                    data: DataUtil.data("slt_note"),
                    title: "備考"
                }
            ]
        });
        this.exportPlugin = this.hot.getPlugin('exportFile');
    }

    //endregion
}