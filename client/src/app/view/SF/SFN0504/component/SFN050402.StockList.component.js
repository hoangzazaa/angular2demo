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
var SFN0504_page_1 = require("../SFN0504.page");
var common_events_1 = require("../../../../helper/common-events");
var date_util_1 = require("../../../../util/date-util");
var SFN050402Component = (function () {
    function SFN050402Component(page) {
        this.page = page;
        this.hasChecked = false;
    }
    SFN050402Component.prototype.ngAfterViewInit = function () {
        var _this = this;
        // init hot
        var container = this.hotE.nativeElement;
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
        this.reloadData(true);
        // init export support
        this.hotX = new Handsontable(document.createElement("div"), { columns: this.getColumnsSetting(true) });
        this.exportPlugin = this.hotX.getPlugin('exportFile');
    };
    Object.defineProperty(SFN050402Component.prototype, "hits", {
        //region Bindings
        get: function () {
            return this.page.pageData.hits;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050402Component.prototype, "currentPage", {
        get: function () {
            return this.page.pageData.page;
        },
        set: function (page) {
            this.page.pageData.page = page;
            this.reloadData(false);
        },
        enumerable: true,
        configurable: true
    });
    //endregioin
    //region Actions
    SFN050402Component.prototype.exportCsv = function () {
        this.hotX.loadData(this.page.pageData.stockList);
        this.exportPlugin.downloadFile('csv', {
            filename: '在庫状況照会',
            columnHeaders: true
        });
    };
    SFN050402Component.prototype.reloadData = function (reset) {
        if (reset) {
            this.sortCol = undefined;
            this.sortOrder = undefined;
            this.sortData();
        }
        var startR = (this.page.pageData.page - 1) * 10;
        this.stocks = this.page.pageData.stockList.slice(startR, startR + 10);
        this.hot.loadData(this.stocks);
    };
    SFN050402Component.prototype.goDetail = function (row, col) {
        var stock = this.stocks[row];
        if (col == 2) {
            // view customer
            this.page.navigateToCustomer(stock);
        }
        else if (col == 3) {
            // view deal
            this.page.navigateToDeal(stock);
        }
        else if (col == 4) {
            // view product
            this.page.navigateToProduct(stock);
        }
    };
    SFN050402Component.prototype.doCheck = function (row, checked) {
        if (checked) {
            var stockList = this.page.pageData.stockList;
            for (var _i = 0, stockList_1 = stockList; _i < stockList_1.length; _i++) {
                var stock = stockList_1[_i];
                if (stock.selected != undefined) {
                    stock.selected = false;
                }
            }
            this.stocks[row].selected = true;
            this.hasChecked = true;
        }
        else {
            this.stocks[row].selected = false;
            this.hasChecked = false;
        }
        this.refreshTable();
    };
    SFN050402Component.prototype.refreshTable = function () {
        this.hot.render();
    };
    SFN050402Component.prototype.shippingStock = function () {
        var selectedStock;
        for (var _i = 0, _a = this.stocks; _i < _a.length; _i++) {
            var stock = _a[_i];
            if (stock.selected) {
                selectedStock = stock;
                break;
            }
        }
        this.page.shippingStock(selectedStock);
    };
    //endregion
    //region functions
    SFN050402Component.prototype.hotOnClickHeader = function (column) {
        if (column == 0 || column == 1 || column == 10) {
            // ignore sort on 選択, 種別,備考
            return;
        }
        else {
            // update sort column and order
            if (this.sortCol != column) {
                // sort column changed, reset sort order
                this.sortOrder = undefined;
            }
            // get new sort order
            if (this.sortOrder == undefined) {
                // default -> asc
                this.sortOrder = true;
            }
            else if (this.sortOrder) {
                // asc -> desc
                this.sortOrder = false;
            }
            else {
                // desc -> default
                this.sortOrder = undefined;
            }
            // get new sort column
            if (this.sortOrder == undefined) {
                // sort by 保管日数 on default
                this.sortCol = 9;
            }
            else {
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
            }
            else {
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
    };
    SFN050402Component.prototype.hotCheckBoxRenderer = function (td, row, col, value) {
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
    SFN050402Component.prototype.hotLinkRenderer = function (td, row, col, value) {
        var _this = this;
        if (value != undefined && value != null) {
            var link = $('<a>');
            link.html(value);
            link.attr('role', 'button');
            $(td).empty().append(link);
            var self_1 = this;
            link.on("click touchend", function (event) {
                _this.goDetail(row, col);
            });
        }
        else {
            // render as text
            Handsontable.renderers.TextRenderer.apply(this, arguments);
        }
        return td;
    };
    SFN050402Component.prototype.sortData = function () {
        var stockList = this.page.pageData.stockList;
        // sort by column, asc
        if (this.sortCol == 2) {
            // sort 得意先名
            stockList.sort(function (a, b) { return a.customerName.localeCompare(b.customerName); });
        }
        else if (this.sortCol == 3) {
            // sort 案件ID
            stockList.sort(function (a, b) { return a.dealCode.localeCompare(b.dealCode); });
        }
        else if (this.sortCol == 4) {
            // sort 品名
            stockList.sort(function (a, b) { return a.productName.localeCompare(b.productName); });
        }
        else if (this.sortCol == 5) {
            // sort 数量
            stockList.sort(function (a, b) { return a.quantity - b.quantity; });
        }
        else if (this.sortCol == 6) {
            // sort 単価
            stockList.sort(function (a, b) { return a.unitPrice - b.unitPrice; });
        }
        else if (this.sortCol == 7) {
            // sort 合計
            stockList.sort(function (a, b) { return a.total - b.total; });
        }
        else if (this.sortCol == 8) {
            // sort 製造日
            stockList.sort(function (a, b) { return date_util_1.DateUtil.getTime(a.manufactureDate) - date_util_1.DateUtil.getTime(b.manufactureDate); });
        }
        else if (this.sortCol == undefined || this.sortCol == 9) {
            // sort 保管日数
            stockList.sort(function (a, b) { return a.storageDays - b.storageDays; });
        }
        // sort order
        if (this.sortOrder == undefined) {
            // sort 保管日数 desc by default
            stockList.reverse();
        }
        else if (!this.sortOrder) {
            // sort desc
            stockList.reverse();
        }
    };
    SFN050402Component.prototype.getColumnsSetting = function (csv) {
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
        var columns = [];
        if (!csv) {
            columns.push({
                data: "selected",
                renderer: checkboxRenderer,
                readOnly: true,
                title: "選択",
                width: 40
            });
        }
        columns.push({
            data: "typeStr",
            type: "text",
            readOnly: true,
            title: "種別",
            width: 40
        }, {
            data: "customerName",
            renderer: linkRenderer,
            readOnly: true,
            title: "得意先名",
            width: 100
        }, {
            data: "dealCode",
            renderer: linkRenderer,
            readOnly: true,
            title: "案件ID",
            width: 100
        }, {
            data: "productName",
            renderer: linkRenderer,
            readOnly: true,
            title: "品名",
            width: 120
        }, {
            data: "quantity",
            type: "numeric",
            format: "0,0",
            readOnly: true,
            title: "数量",
            width: 80
        }, {
            data: "unitPrice",
            type: "numeric",
            format: "0,0.00",
            readOnly: true,
            title: "単価",
            width: 80
        }, {
            data: "total",
            type: "numeric",
            format: "0,0",
            readOnly: true,
            title: "合計",
            width: 100
        }, {
            data: "manufactureDateStr",
            type: "text",
            readOnly: true,
            title: "製造日",
            width: 90
        }, {
            data: "storageDays",
            type: "numeric",
            format: "0,0",
            readOnly: true,
            title: "保管日数",
            width: 80
        }, {
            data: "note",
            type: "text",
            readOnly: true,
            title: "備考",
            width: 40
        });
        return columns;
    };
    __decorate([
        core_1.ViewChild("hot"), 
        __metadata('design:type', core_1.ElementRef)
    ], SFN050402Component.prototype, "hotE", void 0);
    SFN050402Component = __decorate([
        core_1.Component({
            selector: "[sfn050402]",
            templateUrl: "SFN050402.StockList.component.html"
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return SFN0504_page_1.SFN0504Page; }))), 
        __metadata('design:paramtypes', [SFN0504_page_1.SFN0504Page])
    ], SFN050402Component);
    return SFN050402Component;
}());
exports.SFN050402Component = SFN050402Component;
//# sourceMappingURL=SFN050402.StockList.component.js.map