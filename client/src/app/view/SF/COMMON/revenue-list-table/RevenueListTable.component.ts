import {ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild, ViewEncapsulation} from "@angular/core";
import {CommonEvents} from "../../../../helper/common-events";
import {RevenueListTableModel} from "./RevenueListTable.model";
import {GenericProvider} from "../../../../component/GenericProvider";
import {RevenueListTableData} from "./RevenueListTable.data";
import {DateUtil} from "../../../../util/date-util";
import DataUtil from "../../../../util/data-util";

@Component({
    selector: "[revenue-list-table]",
    templateUrl: "RevenueListTable.component.html",
    styleUrls: ["RevenueListTable.component.css"],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevenueListTableComponent {

    // elements
    @ViewChild("hot") hotE: ElementRef;
    // hot
    private hot: ht.Methods;
    // vars
    model: RevenueListTableModel;
    data: RevenueListTableData;

    constructor(@Inject(RevenueListTableModel.PROVIDER) rltProvider: GenericProvider<RevenueListTableModel>) {
        this.model = rltProvider.provider;
        this.data = this.model.data;
    }

    ngAfterViewInit(): void {
        // init hot
        let container = this.hotE.nativeElement;
        this.hot = new Handsontable(container, {
            columns: this.getColumnsSetting(),
            columnSorting: false,
            stretchH: 'all',
            height: 380,
            minRows: 10,
            maxRows: 10
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
        this.sortData();
        this.reloadData(false);
    }

    // region Actions

    reloadData(reset: boolean): void {
        if (reset) {
            this.data.sortCol = undefined;
            this.data.sortOrder = undefined;
            this.sortData();
        }
        // display indicator
        this.updateIndicator();

        this.data.dataList = this.model.getDataList();
        this.hot.loadData(this.data.dataList);
    }

    goDetail(row: number, col: number) {
        if (col == 2) {
            // view deal
            let revenue = this.data.dataList[row];
            this.model.navigateToDeal(revenue);
        } else if (col == 3 || col == 4) {
            // view product
            let revenue = this.data.dataList[row];
            this.model.navigateToProduct(revenue);
        }
    }

    doCheck(row: number, checked: boolean) {
        this.model.onCheck(row, checked);
        this.refreshTable();
    }

    refreshTable() {
        this.hot.render();
    }

    //endregion

    //region functions

    hotOnClickHeader(column: number): void {
        if (column == 0 || column == 1 || column == 9) {
            // ignore sort on 選択, 売上日, 備考
            return;
        } else {
            let sortCol = this.data.sortCol;
            let sortOrder = this.data.sortOrder;

            // update sort column and order
            if (sortCol != column) {
                // sort column changed, reset sort order
                sortOrder = undefined;
            }
            // get new sort order
            if (sortOrder == undefined) {
                // default -> asc
                sortOrder = true;
            } else if (sortOrder) {
                // asc -> desc
                sortOrder = false;
            } else {
                // desc -> default
                sortOrder = undefined;
            }
            // get new sort column
            if (sortOrder == undefined) {
                // sort by 売上日 on default
                sortCol = 1;
            } else {
                sortCol = column;
            }
            this.data.sortCol = sortCol;
            this.data.sortOrder = sortOrder;

            // sort data
            this.sortData();
            // reload
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
        let link = $('<a>');
        link.html(value);
        link.attr('role', 'button');
        $(td).empty().append(link);
        link.on("click touchend", event => {
            this.goDetail(row, col);
        });
        return td;
    }

    sortData() {
        let dataList = this.model.getFullData();
        let sortCol = this.data.sortCol;
        let sortOrder = this.data.sortOrder;
        // sort by column, asc
        if (sortCol == undefined || sortCol == 1) {
            // sort 売上日
            dataList.sort((a, b) => DateUtil.getTime(a.rlt_salesDate) - DateUtil.getTime(b.rlt_salesDate));
        } else if (sortCol == 2) {
            // sort 案件ID
            dataList.sort((a, b) => a.rlt_dealCode.localeCompare(b.rlt_dealCode));
        } else if (sortCol == 3) {
            // sort 品名
            dataList.sort((a, b) => a.rlt_itemCode.localeCompare(b.rlt_itemCode));
        } else if (sortCol == 4) {
            // sort 品名
            dataList.sort((a, b) => a.rlt_productName.localeCompare(b.rlt_productName));
        } else if (sortCol == 5) {
            // sort 内容
            dataList.sort((a, b) => a.rlt_productDescription.localeCompare(b.rlt_productDescription));
        } else if (sortCol == 6) {
            // sort 数量
            dataList.sort((a, b) => a.rlt_quantity - b.rlt_quantity);
        } else if (sortCol == 7) {
            // sort 単価
            dataList.sort((a, b) => a.rlt_unitPrice - b.rlt_unitPrice);
        } else if (sortCol == 8) {
            // sort 合計
            dataList.sort((a, b) => a.rlt_total - b.rlt_total);
        }
        // sort order
        if (sortOrder == undefined) {
            // sort 売上日 desc by default
            dataList.reverse();
        } else if (!sortOrder) {
            // sort desc
            dataList.reverse();
        }
    }

    updateIndicator() {
        let sortCol = this.data.sortCol;
        let sortOrder = this.data.sortOrder;

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
        let isSupplier = this.data.isSupplier;
        return [
            {
                data: DataUtil.data("rlt_selected"),
                renderer: checkboxRenderer,
                readOnly: true,
                title: "選択",
                width: 40
            },
            {
                data: DataUtil.data("rlt_salesDateStr"),
                type: "text",
                readOnly: true,
                title: isSupplier ? "発注日" : "売上日",
                width: 90
            },
            {
                data: DataUtil.data("rlt_dealCode"),
                renderer: linkRenderer,
                readOnly: true,
                title: "案件ID",
                width: 100
            },
            {
                data: DataUtil.data("rlt_itemCode"),
                renderer: linkRenderer,
                readOnly: true,
                title: "製品番号",
                width: 160
            }
            ,
            {
                data: DataUtil.data("rlt_productName"),
                renderer: linkRenderer,
                readOnly: true,
                title: "品名",
                width: 160
            },
            {
                data: DataUtil.data("rlt_productDescription"),
                type: "text",
                readOnly: true,
                title: "内容",
                width: 220
            },
            {
                data: DataUtil.data("rlt_quantity"),
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "数量",
                width: 80
            },
            {
                data: DataUtil.data("rlt_unitPrice"),
                type: "numeric",
                format: "0,0.00",
                readOnly: true,
                title: "単価",
                width: 80
            },
            {
                data: DataUtil.data("rlt_total"),
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "合計",
                width: 100
            },
            {
                data: DataUtil.data("rlt_note"),
                type: "text",
                readOnly: true,
                title: "備考",
                width: 40
            }
        ];
    }
}
