import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from "@angular/core";
import {SFN0402Page} from "../SFN0402.page";
import {RevenueListTableModel} from "../../COMMON/revenue-list-table/RevenueListTable.model";
import {GenericProvider} from "../../../../component/GenericProvider";
import {RevenueListTableComponent} from "../../COMMON/revenue-list-table/RevenueListTable.component";
import {RevenueModel} from "../model/SFN0402_Revenue.model";
import {DateUtil} from "../../../../util/date-util";
import DataUtil from "../../../../util/data-util";
import {SFN0402Constants} from "../SFN0402.constants";

@Component({
    selector: "[sfn040203]",
    templateUrl: "SFN040203.RevenuePanel.component.html",
    providers: [{provide: RevenueListTableModel.PROVIDER, useFactory: () => new GenericProvider<RevenueListTableModel>()}]
})
export class SFN040203Component extends RevenueListTableModel implements AfterViewInit {

    @ViewChild(RevenueListTableComponent) revenueListTable: RevenueListTableComponent;
    curPage: number;
    hasChecked: boolean;
    /* csv */
    private hot: ht.Methods;
    private exportPlugin: any;

    constructor(private page: SFN0402Page, private el: ElementRef,
                @Inject(RevenueListTableModel.PROVIDER) provider: GenericProvider<RevenueListTableModel>) {
        super();

        provider.provider = this;

        // default
        this.page.pageData.revenueHits = 0;
        this.page.pageData.rpcStartDate = DateUtil.toLocalTime(DateUtil.getStartOfOneYearAgo(this.page.pageData.currentTime));
        this.page.pageData.rpcEndDate = DateUtil.toLocalTime(DateUtil.getEndOfMonth(this.page.pageData.currentTime));
        this.page.pageData.rpcKeyword = "";
        this.curPage = 1;
        this.hasChecked = false;

        if (this.page.pageData.partnerType == SFN0402Constants.TYPE_SUPPLIER) {
            this.data.isSupplier = true;
        }

        // init hot csv
        this.initCsvPlugin();
    }

    ngAfterViewInit(): void {
        this.doFilter();
    }

    //region Bindings

    get startDate(): Date {
        return this.page.pageData.rpcStartDate;
    }

    set startDate(value: Date) {
        let oldValue = this.page.pageData.rpcStartDate;
        this.page.pageData.rpcStartDate = value;
        if (DateUtil.getTime(oldValue) != DateUtil.getTime(value)) {
            this.doFilter();
        }
    }

    get endDate(): Date {
        return this.page.pageData.rpcEndDate;
    }

    set endDate(value: Date) {
        let oldValue = this.page.pageData.rpcEndDate;
        this.page.pageData.rpcEndDate = value;
        if (DateUtil.getTime(oldValue) != DateUtil.getTime(value)) {
            this.doFilter();
        }
    }

    get keyword(): string {
        return this.page.pageData.rpcKeyword;
    }

    set keyword(value: string) {
        this.page.pageData.rpcKeyword = value;
    }

    get hits(): number {
        return this.page.pageData.revenueHits;
    }

    get currentPage(): number {
        return this.curPage;
    }

    set currentPage(value: number) {
        this.curPage = value;

        this.revenueListTable.reloadData(false);
    }

    //endregion

    //region Actions

    exportCsv() {
        this.hot.loadData(this.getFullData());

        let fileName = this.page.pageData.partnerCode + "_取引実績";
        this.exportPlugin.downloadFile('csv', {
            filename: fileName,
            columnHeaders: true
        });
    }

    navigateToDeal(record: RevenueModel) {
        let dealCode = record.product.dealCode;
        this.page.navigateToDeal(dealCode);
    }

    navigateToProduct(record: RevenueModel) {
        let product = record.product;
        this.page.navigateToProduct(product);
    }

    doFilter() {
        OneUI.blocks(this.el.nativeElement, "state_loading");

        this.page.loadRevenuePanel().then(() => {
            this.revenueListTable.reloadData(true);

            OneUI.blocks(this.el.nativeElement, "state_normal");
        });
    }

    repeatOrder() {
        // get selected stock
        let pageData = this.page.pageData;
        pageData.selectedProduct = undefined;
        for (let revenue of pageData.revenues) {
            if (revenue != undefined && revenue.rlt_selected) {
                pageData.selectedProduct = revenue.product;
                break;
            }
        }

        this.page.repeatOrder();
    }

    //endregion

    //region Functions

    getDataList(): RevenueModel[] {
        let startR = (this.curPage - 1) * 10;
        return this.page.pageData.revenues.slice(startR, startR + 10);
    }

    getFullData(): RevenueModel[] {
        return this.page.pageData.revenues;
    }

    onCheck(row: number, checked: boolean) {
        for (let revenue of this.page.pageData.revenues) {
            revenue.rlt_selected = false;
        }

        super.onCheck(row, checked);

        if (checked) {
            this.hasChecked = true;
        } else {
            this.hasChecked = false;
        }
    }

    private initCsvPlugin() {
        let isSupplier = this.data.isSupplier;
        this.hot = new Handsontable(document.createElement("div"), {
            columns: [
                {
                    data: DataUtil.data("rlt_salesDateStr"),
                    title: isSupplier ? "発注日" : "売上日"
                },
                {
                    data: DataUtil.data("rlt_dealCode"),
                    title: "案件ID"
                },
                {
                    data: DataUtil.data("rlt_itemCode"),
                    title: "製品番号"
                },
                {
                    data: DataUtil.data("rlt_productName"),
                    title: "品名"
                },
                {
                    data: DataUtil.data("rlt_productDescription"),
                    title: "内容"
                },
                {
                    data: DataUtil.data("rlt_quantity"),
                    title: "数量"
                },
                {
                    data: DataUtil.data("rlt_unitPrice"),
                    title: "単価"
                },
                {
                    data: DataUtil.data("rlt_total"),
                    title: "合計"
                },
                {
                    data: DataUtil.data("rlt_note"),
                    title: "備考"
                }
            ]
        });
        this.exportPlugin = this.hot.getPlugin('exportFile');
    }

    //endregion

}