import {AfterViewInit, Component, ElementRef, forwardRef, Inject, ViewChild} from "@angular/core";
import {SFN0506Page} from "../SFN0506.page";
import {CommonEvents} from "../../../../helper/common-events";
import {PaymentModel} from "../model/SFN0506_Payment.model";
import {DateUtil} from "../../../../util/date-util";

@Component({
    selector: "[sfn050602]",
    templateUrl: "SFN050602.PaymentList.component.html"
})
export class SFN050602Component implements AfterViewInit {

    // elements
    @ViewChild("hot") hotE: ElementRef;
    // hot
    private hot: ht.Methods;
    private hotX: ht.Methods;
    private exportPlugin: any;
    // data cache
    private payments: PaymentModel[];
    // sort vars
    private sortCol: number;
    private sortOrder: boolean;

    constructor(@Inject(forwardRef(() => SFN0506Page)) private page: SFN0506Page) {
    }

    ngAfterViewInit(): void {
        // init hot
        let container = this.hotE.nativeElement;
        this.hot = new Handsontable(container, {
            columns: this.getColumnsSetting(),
            columnSorting: true,
            stretchH: 'all',
            height: 380,
            minRows: 10,
            maxRows: 10
        });
        this.hot.updateSettings({
            columnSorting: false,
            sortIndicator: true
        });
        // register hooks
        this.hot.addHook("afterOnCellMouseDown", (event, coords, td) => {
            if (coords.row == -1) {
                this.hotOnClickHeader(coords.col);
            }
        });
        Handsontable.dom.addEvent(container, 'mousedown', function (event) {
            event.stopPropagation();
        });

        // register hot change
        $(window).on(CommonEvents.LAYOUT_CHANGE, () => {
            this.hot.render();
        });
        // init hot data 1st time
        this.reloadData(true);

        // init export support
        this.hotX = new Handsontable(document.createElement("div"), {columns: this.getColumnsSetting()});
        this.exportPlugin = this.hotX.getPlugin('exportFile');
    }

    //region Bindings

    get hits(): number {
        return this.page.pageData.hits;
    }

    get currentPage(): number {
        return this.page.pageData.page;
    }

    set currentPage(page: number) {
        this.page.pageData.page = page;
        this.reloadData(false);
    }

    //endregioin

    //region Actions

    exportCsv(): void {
        this.hotX.loadData(this.page.pageData.paymentList);
        this.exportPlugin.downloadFile('csv', {
            filename: '入金状況照会',
            columnHeaders: true
        });
    }

    reloadData(reset: boolean): void {
        if (reset) {
            this.sortCol = undefined;
            this.sortOrder = undefined;
            this.sortData();
        }
        // display indicator
        this.updateIndicator();

        let startR = (this.page.pageData.page - 1) * 10;
        this.payments = this.page.pageData.paymentList.slice(startR, startR + 10);
        this.hot.loadData(this.payments);
    }

    goDetail(row: number, col: number) {
        let payment = this.payments[row];
        if (col == 1) {
            // view customer
            this.page.navigateToCustomer(payment);
        }
    }

    //endregion

    //region functions

    hotOnClickHeader(column: number): void {
        // update sort column and order
        if (this.sortCol != column) {
            // sort column changed, reset sort order
            this.sortOrder = undefined;
        }
        // get new sort order
        if (this.sortOrder == undefined) {
            // default -> asc
            this.sortOrder = true;
        } else if (this.sortOrder) {
            // asc -> desc
            this.sortOrder = false;
        } else {
            // desc -> default
            this.sortOrder = undefined;
        }
        // get new sort column
        if (this.sortOrder == undefined) {
            // sort by 出荷予定日 on default
            this.sortCol = 0;
        } else {
            this.sortCol = column;
        }

        // sorting data
        this.sortData();
        this.reloadData(false);
    }

    hotLinkRenderer(td, row, col, value) {
        if (value != undefined && value != null) {
            let link = $('<a>');
            link.html(value);
            link.attr('role', 'button');
            $(td).empty().append(link);
            link.on("click touchend", event => {
                this.goDetail(row, col);
            });
        } else {
            // render as text
            Handsontable.renderers.TextRenderer.apply(this, arguments);
        }
        return td;
    }

    sortData() {
        let paymentList = this.page.pageData.paymentList;
        // sort by column, asc
        if (this.sortCol == 0) {
            // sort 請求ID
            paymentList.sort((a, b) => a.code.localeCompare(b.code));
        } else if (this.sortCol == 1) {
            // sort 得意先名
            paymentList.sort((a, b) => a.customerName.localeCompare(b.customerName));
        } else if (this.sortCol == 2) {
            // sort 請求額
            paymentList.sort((a, b) => a.amount - b.amount);
        } else if (this.sortCol == undefined || this.sortCol == 3) {
            // sort 請求締め日
            paymentList.sort((a, b) => DateUtil.getTime(a.closingDate) - DateUtil.getTime(b.closingDate));
        } else if (this.sortCol == 4) {
            // sort 入金期日
            paymentList.sort((a, b) => DateUtil.getTime(a.dueDate) - DateUtil.getTime(b.dueDate));
        } else if (this.sortCol == 5) {
            // sort 方法
            paymentList.sort((a, b) => a.method.localeCompare(b.method));
        } else if (this.sortCol == 6) {
            // sort 状況
            paymentList.sort((a, b) => a.status.localeCompare(b.status));
        }
        // sort order
        if (this.sortOrder == undefined) {
            // sort 請求締め日 desc by default
            paymentList.reverse();
        } else if (!this.sortOrder) {
            // sort desc
            paymentList.reverse();
        }
    }

    updateIndicator() {
        let sortCol = this.sortCol;
        let sortOrder = this.sortOrder;

        if (sortCol == undefined || sortOrder == undefined) {
            // default table sort
            this.hot.updateSettings({
                columnSorting: false,
                sortIndicator: false
            });
            // hot bug, temporary fix
            $(this.hotE.nativeElement).find("th span.descending").removeClass("descending");
        } else {
            // sort column
            this.hot.updateSettings({
                columnSorting: {
                    column: sortCol,
                    sortOrder: sortOrder
                },
                sortIndicator: true
            });
            this.hot.updateSettings({
                columnSorting: false,
                sortIndicator: true
            });
        }
    }

    getColumnsSetting() {
        let linkRenderer = (instance, td, row, col, prop, value, cellProperties) => {
            if (value != undefined && value != null) {
                this.hotLinkRenderer(td, row, col, value);
            } else {
                value = "";
                Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
            }
            return td;
        };
        let statusRenderer = (instance, td, row, col, prop, value, cellProperties) => {
            Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
            // check for hightlight
            if (value != undefined && value != null && value.indexOf("未入金") > -1) {
                td.className = 'status-highlight';
            }
            return td;
        };
        return [
            {
                data: "code",
                renderer: linkRenderer,
                readOnly: true,
                title: "請求ID",
                width: 120
            },
            {
                data: "customerName",
                renderer: linkRenderer,
                readOnly: true,
                title: "得意先名",
                width: 250
            },
            {
                data: "amount",
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "請求額",
                width: 100
            },
            {
                data: "closingDateStr",
                type: "text",
                readOnly: true,
                title: "請求締め日",
                width: 100
            },
            {
                data: "dueDateStr",
                type: "text",
                readOnly: true,
                title: "入金期日",
                width: 100
            },
            {
                data: "method",
                type: "text",
                readOnly: true,
                title: "方法",
                width: 100
            },
            {
                data: "status",
                renderer: statusRenderer,
                readOnly: true,
                title: "状況",
                width: 150
            }
        ];
    }

    //endregion
}