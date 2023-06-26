"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var common_events_1 = require("../../../../helper/common-events");
var StockListTable_model_1 = require("./StockListTable.model");
var GenericProvider_1 = require("../../../../component/GenericProvider");
var data_util_1 = require("../../../../util/data-util");
var date_util_1 = require("../../../../util/date-util");
var StockListTableComponent = (function () {
    function StockListTableComponent(rltProvider) {
        this.model = rltProvider.provider;
        this.data = this.model.data;
    }
    StockListTableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // init hot
        var container = this.hotE.nativeElement;
        this.hot = new Handsontable(container, {
            columns: this.getColumnsSetting(),
            columnSorting: false,
            stretchH: 'all',
            height: 380,
            minRows: 10,
            maxRows: 10
        });
        // register hooks
        this.hot.addHook("afterOnCellMouseDown", function (event, coords, td) {
            if (coords.row == -1) {
                _this.hotOnClickHeader(coords.col);
            }
        });
        Handsontable.dom.addEvent(container, 'mousedown', function (event) {
            event.stopPropagation();
        });
        // register hot change
        $(window).on(common_events_1.CommonEvents.LAYOUT_CHANGE, function () {
            _this.hot.render();
        });
        // init hot data 1st time
        this.sortData();
        this.reloadData(false);
    };
    // region Actions
    StockListTableComponent.prototype.reloadData = function (reset) {
        if (reset) {
            this.data.sortCol = undefined;
            this.data.sortOrder = undefined;
            this.sortData();
        }
        // display indicator
        this.updateIndicator();
        this.data.dataList = this.model.getDataList();
        this.hot.loadData(this.data.dataList);
    };
    StockListTableComponent.prototype.goDetail = function (row, col) {
        if (col == 2) {
            // view deal
            var stock = this.data.dataList[row];
            this.model.navigateToDeal(stock);
        }
        else if (col == 3) {
            // view product
            var stock = this.data.dataList[row];
            this.model.navigateToProduct(stock);
        }
    };
    StockListTableComponent.prototype.doCheck = function (row, checked) {
        this.model.onCheck(row, checked);
        this.refreshTable();
    };
    StockListTableComponent.prototype.refreshTable = function () {
        this.hot.render();
    };
    //endregion
    //region functions
    StockListTableComponent.prototype.hotOnClickHeader = function (column) {
        if (column == 0 || column == 1 || column == 10) {
            // ignore sort on 選択, 種別, 備考
            return;
        }
        else {
            var sortCol = this.data.sortCol;
            var sortOrder = this.data.sortOrder;
            // update sort column and order
            if (sortCol != column) {
                // sort column changed, reset sort order
                sortOrder = undefined;
            }
            // get new sort order
            if (sortOrder == undefined) {
                // default -> asc
                sortOrder = true;
            }
            else if (sortOrder) {
                // asc -> desc
                sortOrder = false;
            }
            else {
                // desc -> default
                sortOrder = undefined;
            }
            // get new sort column
            if (sortOrder == undefined) {
                // sort by 保管日数 on default
                sortCol = 9;
            }
            else {
                sortCol = column;
            }
            this.data.sortCol = sortCol;
            this.data.sortOrder = sortOrder;
            // sort data
            this.sortData();
            // reload
            this.reloadData(false);
        }
    };
    StockListTableComponent.prototype.hotCheckBoxRenderer = function (td, row, col, value) {
        var input = $("<input>", {
            type: "checkbox",
        });
        if (value == 1) {
            input.attr("checked", "checked");
        }
        var self = this;
        input.on("change", function () {
            if (this.checked) {
                self.doCheck(row, true);
            }
            else {
                self.doCheck(row, false);
            }
        });
        var checkbox = $("<label>", {
            class: "css-input css-checkbox css-checkbox-sm css-checkbox-primary",
        });
        checkbox.append(input).append($("<span>"));
        $(td).empty().append(checkbox);
        return td;
    };
    StockListTableComponent.prototype.hotLinkRenderer = function (td, row, col, value) {
        var _this = this;
        var link = $('<a>');
        link.html(value);
        link.attr('role', 'button');
        $(td).empty().append(link);
        link.on("click touchend", function (event) {
            _this.goDetail(row, col);
        });
        return td;
    };
    StockListTableComponent.prototype.sortData = function () {
        var dataList = this.model.getFullData();
        var sortCol = this.data.sortCol;
        var sortOrder = this.data.sortOrder;
        // sort by column, asc
        if (sortCol == 2) {
            // sort 案件ID
            dataList.sort(function (a, b) { return a.slt_dealCode.localeCompare(b.slt_dealCode); });
        }
        else if (sortCol == 3) {
            // sort 品名
            dataList.sort(function (a, b) { return a.slt_productName.localeCompare(b.slt_productName); });
        }
        else if (sortCol == 4) {
            // sort 内容
            dataList.sort(function (a, b) { return a.slt_productDescription.localeCompare(b.slt_productDescription); });
        }
        else if (sortCol == 5) {
            // sort 数量
            dataList.sort(function (a, b) { return a.slt_quantity - b.slt_quantity; });
        }
        else if (sortCol == 6) {
            // sort 単価
            dataList.sort(function (a, b) { return a.slt_unitPrice - b.slt_unitPrice; });
        }
        else if (sortCol == 7) {
            // sort 合計
            dataList.sort(function (a, b) { return a.slt_total - b.slt_total; });
        }
        else if (sortCol == 8) {
            // sort 製造日
            dataList.sort(function (a, b) { return date_util_1.DateUtil.getTime(a.slt_productionDate) - date_util_1.DateUtil.getTime(b.slt_productionDate); });
        }
        else if (sortCol == 9 || sortCol == undefined) {
            // sort 保管日数
            dataList.sort(function (a, b) { return a.slt_storageDays - b.slt_storageDays; });
        }
        // sort order
        if (sortOrder == undefined) {
            // sort 保管日数 desc by default
            dataList.reverse();
        }
        else if (!sortOrder) {
            // sort desc
            dataList.reverse();
        }
    };
    StockListTableComponent.prototype.updateIndicator = function () {
        var sortCol = this.data.sortCol;
        var sortOrder = this.data.sortOrder;
        if (sortCol == undefined || sortOrder == undefined) {
            // default table sort
            this.hot.updateSettings({
                columnSorting: false,
                sortIndicator: false
            });
            // hot bug, temporary fix
            $(this.hotE.nativeElement).find("th span.descending").removeClass("descending");
        }
        else {
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
    };
    StockListTableComponent.prototype.getColumnsSetting = function () {
        var _this = this;
        var checkboxRenderer = function (instance, td, row, col, prop, value, cellProperties) {
            if (value != undefined && value != null) {
                _this.hotCheckBoxRenderer(td, row, col, value);
            }
            else {
                value = "";
                Handsontable.renderers.TextRenderer.apply(_this, [instance, td, row, col, prop, value, cellProperties]);
            }
            return td;
        };
        var linkRenderer = function (instance, td, row, col, prop, value, cellProperties) {
            if (value != undefined && value != null) {
                _this.hotLinkRenderer(td, row, col, value);
            }
            else {
                value = "";
                Handsontable.renderers.TextRenderer.apply(_this, [instance, td, row, col, prop, value, cellProperties]);
            }
            return td;
        };
        return [
            {
                data: data_util_1.default.data("slt_selected"),
                renderer: checkboxRenderer,
                readOnly: true,
                title: "選択",
                width: 40
            },
            {
                data: data_util_1.default.data("slt_classify"),
                type: "text",
                readOnly: true,
                title: "種別",
                width: 40
            },
            {
                data: data_util_1.default.data("slt_dealCode"),
                renderer: linkRenderer,
                readOnly: true,
                title: "案件ID",
                width: 100
            },
            {
                data: data_util_1.default.data("slt_productName"),
                renderer: linkRenderer,
                readOnly: true,
                title: "品名",
                width: 120
            },
            {
                data: data_util_1.default.data("slt_productDescription"),
                type: "text",
                readOnly: true,
                title: "内容",
                width: 160
            },
            {
                data: data_util_1.default.data("slt_quantity"),
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "数量",
                width: 80
            },
            {
                data: data_util_1.default.data("slt_unitPrice"),
                type: "numeric",
                format: "0,0.00",
                readOnly: true,
                title: "単価",
                width: 80
            },
            {
                data: data_util_1.default.data("slt_total"),
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "合計",
                width: 100
            },
            {
                data: data_util_1.default.data("slt_productionDateStr"),
                type: "text",
                readOnly: true,
                title: "製造日",
                width: 90
            },
            {
                data: data_util_1.default.data("slt_storageDays"),
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "保管日数",
                width: 100
            },
            {
                data: data_util_1.default.data("slt_note"),
                type: "text",
                readOnly: true,
                title: "備考",
                width: 40
            }
        ];
    };
    __decorate([
        core_1.ViewChild("hot"), 
        __metadata('design:type', core_1.ElementRef)
    ], StockListTableComponent.prototype, "hotE", void 0);
    StockListTableComponent = __decorate([
        core_1.Component({
            selector: "[stock-list-table]",
            templateUrl: "StockListTable.component.html",
            styleUrls: ["StockListTable.component.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __param(0, core_1.Inject(StockListTable_model_1.StockListTableModel.PROVIDER)), 
        __metadata('design:paramtypes', [GenericProvider_1.GenericProvider])
    ], StockListTableComponent);
    return StockListTableComponent;
}());
exports.StockListTableComponent = StockListTableComponent;
//# sourceMappingURL=StockListTable.component.js.map