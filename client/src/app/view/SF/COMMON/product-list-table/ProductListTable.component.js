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
var ProductListTable_model_1 = require("./ProductListTable.model");
var GenericProvider_1 = require("../../../../component/GenericProvider");
var data_util_1 = require("../../../../util/data-util");
var ProductListTableComponent = (function () {
    function ProductListTableComponent(rltProvider) {
        this.model = rltProvider.provider;
        this.data = this.model.data;
    }
    ProductListTableComponent.prototype.ngAfterViewInit = function () {
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
    ProductListTableComponent.prototype.reloadData = function (reset) {
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
    ProductListTableComponent.prototype.goDetail = function (row, col) {
        if (col == 1 || col == 2) {
            // view product
            var product = this.data.dataList[row];
            this.model.navigateToProduct(product);
        }
    };
    ProductListTableComponent.prototype.doCheck = function (row, checked) {
        this.model.onCheck(row, checked);
        this.refreshTable();
    };
    ProductListTableComponent.prototype.refreshTable = function () {
        this.hot.render();
    };
    //endregion
    //region functions
    ProductListTableComponent.prototype.hotOnClickHeader = function (column) {
        if (column == 0) {
            // ignore sort on 選択
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
                // sort by 通算生産数 on default
                sortCol = 8;
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
    ProductListTableComponent.prototype.hotCheckBoxRenderer = function (td, row, col, value) {
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
    ProductListTableComponent.prototype.hotLinkRenderer = function (td, row, col, value) {
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
    ProductListTableComponent.prototype.sortData = function () {
        var dataList = this.model.getFullData();
        var sortCol = this.data.sortCol;
        var sortOrder = this.data.sortOrder;
        // sort by column, asc
        if (sortCol == 1) {
            // sort 製品番号
            dataList.sort(function (a, b) { return a.plt_productNo.localeCompare(b.plt_productNo); });
        }
        else if (sortCol == 2) {
            // sort 品名
            dataList.sort(function (a, b) { return a.plt_productName.localeCompare(b.plt_productName); });
        }
        else if (sortCol == 3) {
            // sort 内容
            dataList.sort(function (a, b) { return a.plt_productDescription.localeCompare(b.plt_productDescription); });
        }
        else if (sortCol == 4) {
            // sort 数量
            dataList.sort(function (a, b) { return a.plt_quantity - b.plt_quantity; });
        }
        else if (sortCol == 5) {
            // sort 単価
            dataList.sort(function (a, b) { return a.plt_unitPrice - b.plt_unitPrice; });
        }
        else if (sortCol == 6) {
            // sort 通算生産数
            dataList.sort(function (a, b) { return a.plt_production - b.plt_production; });
        }
        else if (sortCol == 7) {
            // sort 木型
            dataList.sort(function (a, b) { return a.plt_wooden.localeCompare(b.plt_wooden); });
        }
        else if (sortCol == 8 || sortCol == undefined) {
            // sort 通算生産数
            dataList.sort(function (a, b) {
                var aExp = a.plt_woodenExp;
                var bExp = b.plt_woodenExp;
                if (aExp == undefined) {
                    return -1;
                }
                else if (isNaN(+aExp)) {
                    if (isNaN(+bExp)) {
                        return aExp.localeCompare(bExp);
                    }
                    else {
                        return -1;
                    }
                }
                else {
                    if (isNaN(+bExp)) {
                        return 1;
                    }
                    else {
                        return (+aExp) - (+bExp);
                    }
                }
            });
        }
        // sort order
        if (sortOrder == undefined) {
            // sort 通算生産数 desc by default
            dataList.reverse();
        }
        else if (!sortOrder) {
            // sort desc
            dataList.reverse();
        }
    };
    ProductListTableComponent.prototype.updateIndicator = function () {
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
    ProductListTableComponent.prototype.getColumnsSetting = function () {
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
                data: data_util_1.default.data("plt_selected"),
                renderer: checkboxRenderer,
                readOnly: true,
                title: "選択",
                width: 40
            },
            {
                data: data_util_1.default.data("plt_productNo"),
                renderer: linkRenderer,
                readOnly: true,
                title: "製品番号",
                width: 120
            },
            {
                data: data_util_1.default.data("plt_productName"),
                renderer: linkRenderer,
                readOnly: true,
                title: "品名",
                width: 160
            },
            {
                data: data_util_1.default.data("plt_productDescription"),
                type: "text",
                readOnly: true,
                title: "内容",
                width: 200
            },
            {
                data: data_util_1.default.data("plt_quantity"),
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "数量",
                width: 80
            },
            {
                data: data_util_1.default.data("plt_unitPrice"),
                type: "numeric",
                format: "0,0.00",
                readOnly: true,
                title: "単価",
                width: 80
            },
            {
                data: data_util_1.default.data("plt_production"),
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "通算生産数",
                width: 100
            },
            {
                data: data_util_1.default.data("plt_wooden"),
                type: "text",
                readOnly: true,
                title: "木型",
                width: 100
            },
            {
                data: data_util_1.default.data("plt_woodenExp"),
                type: "numeric",
                format: "0,0",
                readOnly: true,
                title: "木型有効期限",
                width: 100
            }
        ];
    };
    __decorate([
        core_1.ViewChild("hot"), 
        __metadata('design:type', core_1.ElementRef)
    ], ProductListTableComponent.prototype, "hotE", void 0);
    ProductListTableComponent = __decorate([
        core_1.Component({
            selector: "[product-list-table]",
            templateUrl: "ProductListTable.component.html",
            styleUrls: ["ProductListTable.component.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __param(0, core_1.Inject(ProductListTable_model_1.ProductListTableModel.PROVIDER)), 
        __metadata('design:paramtypes', [GenericProvider_1.GenericProvider])
    ], ProductListTableComponent);
    return ProductListTableComponent;
}());
exports.ProductListTableComponent = ProductListTableComponent;
//# sourceMappingURL=ProductListTable.component.js.map