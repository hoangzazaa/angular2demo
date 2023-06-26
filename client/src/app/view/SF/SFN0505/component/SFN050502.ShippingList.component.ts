import {AfterViewInit, Component, ElementRef, forwardRef, Inject, ViewChild} from "@angular/core";
import {SFN0505Page} from "../SFN0505.page";
import {CommonEvents} from "../../../../helper/common-events";
import {ShippingModel} from "../model/SFN0505_Shipping.model";

@Component({
    selector: "[sfn050502]",
    templateUrl: "SFN050502.ShippingList.component.html"
})
export class SFN050502Component implements AfterViewInit {

    // elements
    @ViewChild("hot") hotE: ElementRef;
    // hot
    private hot: ht.Methods;
    private hotX: ht.Methods;
    private exportPlugin: any;
    // data cache
    private shippings: ShippingModel[];
    // sort vars
    private sortCol: number;
    private sortOrder: boolean;

    constructor(@Inject(forwardRef(() => SFN0505Page)) private page: SFN0505Page) {
    }

    ngAfterViewInit(): void {
        // init hot
        let container = this.hotE.nativeElement;
        this.hot = new Handsontable(container, {
            columns: this.getColumnsSetting(),
            columnSorting: true,
            stretchH: 'last',
            height: 400,
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
        this.hot.addHook("afterRenderer", (td, row, col) => {
            this.hotHighLight(td, row, col);
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
        this.hotX.loadData(this.page.pageData.shippingList);
        this.exportPlugin.downloadFile('csv', {
            filename: '出荷状況照会',
            columnHeaders: true
        });
    }

    reloadData(reset: boolean): void {
        if (reset) {
            this.sortCol = undefined;
            this.sortOrder = undefined;
            this.sortData();
        }
        let startR = (this.page.pageData.page - 1) * 10;
        this.shippings = this.page.pageData.shippingList.slice(startR, startR + 10);
        this.hot.loadData(this.shippings);
    }

    goDetail(row: number, col: number) {
        let shipping = this.shippings[row];
        if (col == 1) {
            // view customer
            this.page.navigateToCustomer(shipping);
        } else if (col == 2) {
            // view deal
            this.page.navigateToDeal(shipping);
        } else if (col == 3) {
            // view product
            this.page.navigateToProduct(shipping);
        }
    }

    //endregion

    //region functions

    hotOnClickHeader(column: number): void {
        if (column == 8) {
            // ignore sort on 備考
            return;
        } else {
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
            // display indicator
            if (this.sortOrder == undefined) {
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
                        column: this.sortCol,
                        sortOrder: this.sortOrder
                    },
                    sortIndicator: true
                });
                this.hot.updateSettings({
                    columnSorting: false,
                    sortIndicator: true
                });
            }
            // sorting data
            this.sortData();
            this.reloadData(false);
        }
    }

    hotHighLight(td, row, col) {
        let shipping = this.shippings[row];
        if (shipping.highlight == 1) {
            // highlight
            $(td).addClass("row-highlight");
        }
    }

    hotLinkRenderer(td, row, col, value) {
        if (value != undefined && value != null) {
            let link = $('<a>');
            link.html(value);
            link.attr('role', 'button');
            $(td).empty().append(link);
            let self = this;
            link.on("mouseup touchend", event => {
                this.goDetail(row, col);
            });
        } else {
            // render as text
            Handsontable.renderers.TextRenderer.apply(this, arguments);
        }
        return td;
    }

    sortData() {
        let shippingList = this.page.pageData.shippingList;
        // sort by column, asc
        if (this.sortCol == undefined || this.sortCol == 0) {
            // sort 出荷予定日
            shippingList.sort((a, b) => a.planDate.getTime() - b.planDate.getTime());
        } else if (this.sortCol == 1) {
            // sort 得意先名
            shippingList.sort((a, b) => a.customerName.localeCompare(b.customerName));
        } else if (this.sortCol == 2) {
            // sort 案件ID
            shippingList.sort((a, b) => a.dealCode.localeCompare(b.dealCode));
        } else if (this.sortCol == 3) {
            // sort 品名
            shippingList.sort((a, b) => a.productName.localeCompare(b.productName));
        } else if (this.sortCol == 4) {
            // sort 出荷予定数
            shippingList.sort((a, b) => a.planAmount - b.planAmount);
        } else if (this.sortCol == 5) {
            // sort 出荷実績数
            shippingList.sort((a, b) => a.actualAmount - b.actualAmount);
        } else if (this.sortCol == 6) {
            // sort 制限
            shippingList.sort((a, b) => a.restriction - b.restriction);
        } else if (this.sortCol == 7) {
            // sort 状況
            shippingList.sort((a, b) => a.status - b.status);
        }
        // sort order
        if (this.sortOrder == undefined) {
            // sort 出荷予定日 asc by default
            // shippingList.reverse();
        } else if (!this.sortOrder) {
            // sort desc
            shippingList.reverse();
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
        let amountRenderer = function (instance, td, row, col, prop, value, cellProperties) {
            if (value == 0) {
                td.innerHTML = "-";
                td.align = "right";
            } else {
                Handsontable.renderers.NumericRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
            }
            return td;
        };
        return [
            {
                data: "planDateStr",
                type: "text",
                readOnly: true,
                title: "出荷予定日",
                width: 100
            },
            {
                data: "customerName",
                renderer: linkRenderer,
                readOnly: true,
                title: "得意先名",
                width: 120
            },
            {
                data: "dealCode",
                renderer: linkRenderer,
                readOnly: true,
                title: "案件ID",
                width: 80
            },
            {
                data: "productName",
                renderer: linkRenderer,
                readOnly: true,
                title: "品名",
                width: 160
            },
            {
                data: "planAmount",
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "出荷予定数",
                width: 100
            },
            {
                data: "actualAmount",
                renderer: amountRenderer,
                format: "0,0",
                readOnly: true,
                title: "出荷実績数",
                width: 100
            },
            {
                data: "restrictionStr",
                type: "text",
                readOnly: true,
                title: "制限",
                width: 70
            },
            {
                data: "statusStr",
                type: "text",
                readOnly: true,
                title: "状況",
                width: 120
            },
            {
                data: "note",
                type: "text",
                readOnly: true,
                title: "備考",
                width: 100
            }
        ];
    }

    //endregion
}