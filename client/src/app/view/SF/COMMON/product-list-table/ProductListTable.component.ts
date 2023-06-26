import {ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild, ViewEncapsulation} from "@angular/core";
import {CommonEvents} from "../../../../helper/common-events";
import {ProductListTableModel} from "./ProductListTable.model";
import {GenericProvider} from "../../../../component/GenericProvider";
import {ProductListTableData} from "./ProductListTable.data";
import DataUtil from "../../../../util/data-util";

@Component({
    selector: "[product-list-table]",
    templateUrl: "ProductListTable.component.html",
    styleUrls: ["ProductListTable.component.css"],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListTableComponent {

    // elements
    @ViewChild("hot") hotE: ElementRef;
    // hot
    private hot: ht.Methods;
    // vars
    model: ProductListTableModel;
    data: ProductListTableData;

    constructor(@Inject(ProductListTableModel.PROVIDER) rltProvider: GenericProvider<ProductListTableModel>) {
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
        if (col == 1 || col == 2) {
            // view product
            let product = this.data.dataList[row];
            this.model.navigateToProduct(product);
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
        if (column == 0) {
            // ignore sort on 選択
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
                // sort by 通算生産数 on default
                sortCol = 8;
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
        if (sortCol == 1) {
            // sort 製品番号
            dataList.sort((a, b) => a.plt_productNo.localeCompare(b.plt_productNo));
        } else if (sortCol == 2) {
            // sort 品名
            dataList.sort((a, b) => a.plt_productName.localeCompare(b.plt_productName));
        } else if (sortCol == 3) {
            // sort 内容
            dataList.sort((a, b) => a.plt_productDescription.localeCompare(b.plt_productDescription));
        } else if (sortCol == 4) {
            // sort 数量
            dataList.sort((a, b) => a.plt_quantity - b.plt_quantity);
        } else if (sortCol == 5) {
            // sort 単価
            dataList.sort((a, b) => a.plt_unitPrice - b.plt_unitPrice);
        } else if (sortCol == 6) {
            // sort 通算生産数
            dataList.sort((a, b) => a.plt_production - b.plt_production);
        } else if (sortCol == 7) {
            // sort 木型
            dataList.sort((a, b) => a.plt_wooden.localeCompare(b.plt_wooden));
        } else if (sortCol == 8 || sortCol == undefined) {
            // sort 通算生産数
            dataList.sort((a, b) => {
                let aExp = a.plt_woodenExp;
                let bExp = b.plt_woodenExp;
                if (aExp == undefined) {
                    return -1;
                } else if (isNaN(+aExp)) {
                    if (isNaN(+bExp)) {
                        return aExp.localeCompare(bExp);
                    } else {
                        return -1;
                    }
                } else {
                    if (isNaN(+bExp)) {
                        return 1;
                    } else {
                        return (+aExp) - (+bExp);
                    }
                }
            });
        }
        // sort order
        if (sortOrder == undefined) {
            // sort 通算生産数 desc by default
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
        return [
            {
                data: DataUtil.data("plt_selected"),
                renderer: checkboxRenderer,
                readOnly: true,
                title: "選択",
                width: 40
            },
            {
                data: DataUtil.data("plt_productNo"),
                renderer: linkRenderer,
                readOnly: true,
                title: "製品番号",
                width: 120
            },
            {
                data: DataUtil.data("plt_productName"),
                renderer: linkRenderer,
                readOnly: true,
                title: "品名",
                width: 160
            },
            {
                data: DataUtil.data("plt_productDescription"),
                type: "text",
                readOnly: true,
                title: "内容",
                width: 200
            },
            {
                data: DataUtil.data("plt_quantity"),
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "数量",
                width: 80
            },
            {
                data: DataUtil.data("plt_unitPrice"),
                type: "numeric",
                format: "0,0.00",
                readOnly: true,
                title: "単価",
                width: 80
            },
            {
                data: DataUtil.data("plt_production"),
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "通算生産数",
                width: 100
            },
            {
                data: DataUtil.data("plt_wooden"),
                type: "text",
                readOnly: true,
                title: "木型",
                width: 100
            },
            {
                data: DataUtil.data("plt_woodenExp"),
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "木型有効期限",
                width: 100
            }
        ];
    }
}
