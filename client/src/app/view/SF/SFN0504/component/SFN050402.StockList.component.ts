import {AfterViewInit, Component, ElementRef, forwardRef, Inject, ViewChild} from "@angular/core";
import {SFN0504Page} from "../SFN0504.page";
import {CommonEvents} from "../../../../helper/common-events";
import {StockModel} from "../model/SFN0504_Stock.model";
import {DateUtil} from "../../../../util/date-util";

@Component({
    selector: "[sfn050402]",
    templateUrl: "SFN050402.StockList.component.html"
})
export class SFN050402Component implements AfterViewInit {

    // elements
    @ViewChild("hot") hotE: ElementRef;
    // hot
    private hot: ht.Methods;
    private hotX: ht.Methods;
    private exportPlugin: any;
    // data cache
    private stocks: StockModel[];
    hasChecked: boolean;
    // sort vars
    private sortCol: number;
    private sortOrder: boolean;

    constructor(@Inject(forwardRef(() => SFN0504Page)) private page: SFN0504Page) {

        this.hasChecked = false;
    }

    ngAfterViewInit(): void {
        // init hot
        let container = this.hotE.nativeElement;
        this.hot = new Handsontable(container, {
            columns: this.getColumnsSetting(false),
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
        this.hotX = new Handsontable(document.createElement("div"), {columns: this.getColumnsSetting(true)});
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
        this.hotX.loadData(this.page.pageData.stockList);
        this.exportPlugin.downloadFile('csv', {
            filename: '在庫状況照会',
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
        this.stocks = this.page.pageData.stockList.slice(startR, startR + 10);
        this.hot.loadData(this.stocks);
    }

    goDetail(row: number, col: number) {
        let stock = this.stocks[row];
        if (col == 2) {
            // view customer
            this.page.navigateToCustomer(stock);
        } else if (col == 3) {
            // view deal
            this.page.navigateToDeal(stock);
        } else if (col == 4) {
            // view product
            this.page.navigateToProduct(stock);
        }
    }

    doCheck(row: number, checked: boolean) {
        if (checked) {
            let stockList = this.page.pageData.stockList;
            for (let stock of stockList) {
                if (stock.selected != undefined) {
                    stock.selected = false;
                }
            }
            this.stocks[row].selected = true;
            this.hasChecked = true;
        } else {
            this.stocks[row].selected = false;
            this.hasChecked = false;
        }
        this.refreshTable();
    }

    refreshTable() {
        this.hot.render();
    }

    shippingStock() {
        let selectedStock;
        for (let stock of this.stocks) {
            if (stock.selected) {
                selectedStock = stock;
                break;
            }
        }
        this.page.shippingStock(selectedStock);
    }

    //endregion

    //region functions

    hotOnClickHeader(column: number): void {
        if (column == 0 || column == 1 || column == 10) {
            // ignore sort on 選択, 種別,備考
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
                // sort by 保管日数 on default
                this.sortCol = 9;
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

    hotCheckBoxRenderer(td, row, col, value) {
        let input = $("<input>", {
            type: "checkbox",
        });
        if (value == 1) {
            input.attr("checked", "checked");
        }
        let self = this;
        input.on("change", function () {
            if (this.checked) {
                self.doCheck(row, true);
            } else {
                self.doCheck(row, false);
            }
        });

        let checkbox = $("<label>", {
            class: "css-input css-checkbox css-checkbox-sm css-checkbox-primary",
        });
        checkbox.append(input).append($("<span>"))
        $(td).empty().append(checkbox);
        return td;
    }

    hotLinkRenderer(td, row, col, value) {
        if (value != undefined && value != null) {
            let link = $('<a>');
            link.html(value);
            link.attr('role', 'button');
            $(td).empty().append(link);
            let self = this;
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
        let stockList = this.page.pageData.stockList;
        // sort by column, asc
        if (this.sortCol == 2) {
            // sort 得意先名
            stockList.sort((a, b) => a.customerName.localeCompare(b.customerName));
        } else if (this.sortCol == 3) {
            // sort 案件ID
            stockList.sort((a, b) => a.dealCode.localeCompare(b.dealCode));
        } else if (this.sortCol == 4) {
            // sort 品名
            stockList.sort((a, b) => a.productName.localeCompare(b.productName));
        } else if (this.sortCol == 5) {
            // sort 数量
            stockList.sort((a, b) => a.quantity - b.quantity);
        } else if (this.sortCol == 6) {
            // sort 単価
            stockList.sort((a, b) => a.unitPrice - b.unitPrice);
        } else if (this.sortCol == 7) {
            // sort 合計
            stockList.sort((a, b) => a.total - b.total);
        } else if (this.sortCol == 8) {
            // sort 製造日
            stockList.sort((a, b) => DateUtil.getTime(a.manufactureDate) - DateUtil.getTime(b.manufactureDate));
        } else if (this.sortCol == undefined || this.sortCol == 9) {
            // sort 保管日数
            stockList.sort((a, b) => a.storageDays - b.storageDays);
        }
        // sort order
        if (this.sortOrder == undefined) {
            // sort 保管日数 desc by default
            stockList.reverse();
        } else if (!this.sortOrder) {
            // sort desc
            stockList.reverse();
        }
    }

    getColumnsSetting(csv: boolean) {
        let checkboxRenderer = (instance, td, row, col, prop, value, cellProperties) => {
            if (value != undefined && value != null) {
                this.hotCheckBoxRenderer(td, row, col, value);
            } else {
                value = "";
                Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
            }
            return td;
        };
        let linkRenderer = (instance, td, row, col, prop, value, cellProperties) => {
            if (value != undefined && value != null) {
                this.hotLinkRenderer(td, row, col, value);
            } else {
                value = "";
                Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
            }
            return td;
        };
        let columns = [];
        if (!csv) {
            columns.push(
                {
                    data: "selected",
                    renderer: checkboxRenderer,
                    readOnly: true,
                    title: "選択",
                    width: 40
                });
        }
        columns.push(
            {
                data: "typeStr",
                type: "text",
                readOnly: true,
                title: "種別",
                width: 40
            },
            {
                data: "customerName",
                renderer: linkRenderer,
                readOnly: true,
                title: "得意先名",
                width: 100
            },
            {
                data: "dealCode",
                renderer: linkRenderer,
                readOnly: true,
                title: "案件ID",
                width: 100
            },
            {
                data: "productName",
                renderer: linkRenderer,
                readOnly: true,
                title: "品名",
                width: 120
            },
            {
                data: "quantity",
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "数量",
                width: 80
            },
            {
                data: "unitPrice",
                type: "numeric",
                format: "0,0.00",
                readOnly: true,
                title: "単価",
                width: 80
            },
            {
                data: "total",
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "合計",
                width: 100
            },
            {
                data: "manufactureDateStr",
                type: "text",
                readOnly: true,
                title: "製造日",
                width: 90
            },
            {
                data: "storageDays",
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "保管日数",
                width: 80
            },
            {
                data: "note",
                type: "text",
                readOnly: true,
                title: "備考",
                width: 40
            }
        );
        return columns;
    }

    //endregion
}