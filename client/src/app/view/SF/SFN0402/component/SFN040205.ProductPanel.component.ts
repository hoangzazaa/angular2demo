import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from "@angular/core";
import {SFN0402Page} from "../SFN0402.page";
import {ProductListTableModel} from "../../COMMON/product-list-table/ProductListTable.model";
import {GenericProvider} from "../../../../component/GenericProvider";
import {ProductListTableComponent} from "../../COMMON/product-list-table/ProductListTable.component";
import {ProductModel} from "../model/SFN0402_Product.model";
import {DateUtil} from "../../../../util/date-util";
import DataUtil from "../../../../util/data-util";
import {SFN0402Constants} from "../SFN0402.constants";

@Component({
    selector: "[sfn040205]",
    templateUrl: "SFN040205.ProductPanel.component.html",
    providers: [{provide: ProductListTableModel.PROVIDER, useFactory: () => new GenericProvider<ProductListTableModel>()}]
})
export class SFN040205Component extends ProductListTableModel implements AfterViewInit {

    @ViewChild(ProductListTableComponent) productListTable: ProductListTableComponent;
    curPage: number;
    hasChecked: boolean;
    allowRequest: boolean;
    exportEnabled: boolean;
    /* csv */
    private hot: ht.Methods;
    private exportPlugin: any;

    constructor(private page: SFN0402Page, private el: ElementRef,
                @Inject(ProductListTableModel.PROVIDER) provider: GenericProvider<ProductListTableModel>) {
        super();

        provider.provider = this;

        // default
        this.page.pageData.productHits = 0;
        this.page.pageData.ppcStartDate = DateUtil.toLocalTime(DateUtil.getStartOfOneYearAgo(this.page.pageData.currentTime));
        this.page.pageData.ppcEndDate = DateUtil.toLocalTime(DateUtil.getEndOfMonth(this.page.pageData.currentTime));
        this.page.pageData.ppcKeyword = "";
        this.curPage = 1;
        this.hasChecked = false;
        this.allowRequest = false;
        this.exportEnabled = false;

        // init hot csv
        this.initCsvPlugin();
    }

    ngAfterViewInit(): void {
        this.doFilter();
    }

    //region Bindings

    get startDate(): Date {
        return this.page.pageData.ppcStartDate;
    }

    set startDate(value: Date) {
        let oldValue = this.page.pageData.ppcStartDate;
        this.page.pageData.ppcStartDate = value;
        if (DateUtil.getTime(oldValue) != DateUtil.getTime(value)) {
            this.doFilter();
        }
    }

    get endDate(): Date {
        return this.page.pageData.ppcEndDate;
    }

    set endDate(value: Date) {
        let oldValue = this.page.pageData.ppcEndDate;
        this.page.pageData.ppcEndDate = value;
        if (DateUtil.getTime(oldValue) != DateUtil.getTime(value)) {
            this.doFilter();
        }
    }

    get keyword(): string {
        return this.page.pageData.ppcKeyword;
    }

    set keyword(value: string) {
        this.page.pageData.ppcKeyword = value;
    }

    get hits(): number {
        return this.page.pageData.productHits;
    }

    get hasRecords(): boolean {
        return (this.page.pageData.productHits > 0);
    }

    get currentPage(): number {
        return this.curPage;
    }

    set currentPage(value: number) {
        this.curPage = value;

        this.productListTable.reloadData(false);
    }

    get requestDisabled() {
        return !(this.hasChecked && this.allowRequest);
    }

    //endregion

    //region Actions

    exportCsv() {
        this.hot.loadData(this.getFullData());

        let fileName = this.page.pageData.partnerCode + "_製品一覧";
        this.exportPlugin.downloadFile('csv', {
            filename: fileName,
            columnHeaders: true
        });
    }

    navigateToProduct(record: ProductModel) {
        this.page.navigateToProduct(record);
    }

    doFilter() {
        OneUI.blocks(this.el.nativeElement, "state_loading");

        this.page.loadProductPanel().then(() => {
            this.productListTable.reloadData(true);

            OneUI.blocks(this.el.nativeElement, "state_normal");
        });
    }

    returnWooden() {
        this.page.showMail(SFN0402Constants.MAIL_WOODEN_RETURN);
    }

    pendingWooden() {
        this.page.showMail(SFN0402Constants.MAIL_WOODEN_PENDING);
    }

    exportProducts() {
        this.exportEnabled = false;

        this.page.exportProducts().then(() => {
            this.exportEnabled = true;
        });
    }

    //endregion

    //region Functions

    getDataList(): ProductModel[] {
        let startR = (this.curPage - 1) * 10;
        return this.page.pageData.products.slice(startR, startR + 10);
    }

    getFullData(): ProductModel[] {
        return this.page.pageData.products;
    }

    onCheck(row: number, checked: boolean) {
        for (let product of this.page.pageData.products) {
            product.plt_selected = false;
        }

        super.onCheck(row, checked);

        if (checked) {
            this.hasChecked = true;
        } else {
            this.hasChecked = false;
        }

        // status of checked row
        if (checked) {
            for (let product of this.page.pageData.products) {
                if (product.plt_selected) {
                    if (product.woodenStatus == undefined
                        || product.woodenStatus == "") {
                        this.allowRequest = true;
                    } else {
                        this.allowRequest = false;
                    }
                    break;
                }
            }
        }
    }

    private initCsvPlugin() {
        this.hot = new Handsontable(document.createElement("div"), {
            columns: [
                {
                    data: DataUtil.data("plt_productNo"),
                    title: "製品番号"
                },
                {
                    data: DataUtil.data("plt_productName"),
                    title: "品名"
                },
                {
                    data: DataUtil.data("plt_productDescription"),
                    title: "内容"
                },
                {
                    data: DataUtil.data("plt_quantity"),
                    title: "数量"
                },
                {
                    data: DataUtil.data("plt_unitPrice"),
                    title: "単価"
                },
                {
                    data: DataUtil.data("plt_production"),
                    title: "通算生産数"
                },
                {
                    data: DataUtil.data("plt_wooden"),
                    title: "木型"
                },
                {
                    data: DataUtil.data("plt_woodenExp"),
                    title: "木型有効期限"
                }
            ]
        });
        this.exportPlugin = this.hot.getPlugin('exportFile');
    }

    //endregion
}