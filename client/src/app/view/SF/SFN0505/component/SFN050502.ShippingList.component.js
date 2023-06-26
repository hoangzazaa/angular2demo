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
var SFN0505_page_1 = require("../SFN0505.page");
var common_events_1 = require("../../../../helper/common-events");
var SFN050502Component = (function () {
    function SFN050502Component(page) {
        this.page = page;
    }
    SFN050502Component.prototype.ngAfterViewInit = function () {
        var _this = this;
        // init hot
        var container = this.hotE.nativeElement;
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
        this.hot.addHook("afterOnCellMouseDown", function (event, coords, td) {
            if (coords.row == -1) {
                _this.hotOnClickHeader(coords.col);
            }
        });
        this.hot.addHook("afterRenderer", function (td, row, col) {
            _this.hotHighLight(td, row, col);
        });
        // register hot change
        $(window).on(common_events_1.CommonEvents.LAYOUT_CHANGE, function () {
            _this.hot.render();
        });
        // init hot data 1st time
        this.reloadData(true);
        // init export support
        this.hotX = new Handsontable(document.createElement("div"), { columns: this.getColumnsSetting() });
        this.exportPlugin = this.hotX.getPlugin('exportFile');
    };
    Object.defineProperty(SFN050502Component.prototype, "hits", {
        //region Bindings
        get: function () {
            return this.page.pageData.hits;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050502Component.prototype, "currentPage", {
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
    SFN050502Component.prototype.exportCsv = function () {
        this.hotX.loadData(this.page.pageData.shippingList);
        this.exportPlugin.downloadFile('csv', {
            filename: '出荷状況照会',
            columnHeaders: true
        });
    };
    SFN050502Component.prototype.reloadData = function (reset) {
        if (reset) {
            this.sortCol = undefined;
            this.sortOrder = undefined;
            this.sortData();
        }
        var startR = (this.page.pageData.page - 1) * 10;
        this.shippings = this.page.pageData.shippingList.slice(startR, startR + 10);
        this.hot.loadData(this.shippings);
    };
    SFN050502Component.prototype.goDetail = function (row, col) {
        var shipping = this.shippings[row];
        if (col == 1) {
            // view customer
            this.page.navigateToCustomer(shipping);
        }
        else if (col == 2) {
            // view deal
            this.page.navigateToDeal(shipping);
        }
        else if (col == 3) {
            // view product
            this.page.navigateToProduct(shipping);
        }
    };
    //endregion
    //region functions
    SFN050502Component.prototype.hotOnClickHeader = function (column) {
        if (column == 8) {
            // ignore sort on 備考
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
                // sort by 出荷予定日 on default
                this.sortCol = 0;
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
    SFN050502Component.prototype.hotHighLight = function (td, row, col) {
        var shipping = this.shippings[row];
        if (shipping.highlight == 1) {
            // highlight
            $(td).addClass("row-highlight");
        }
    };
    SFN050502Component.prototype.hotLinkRenderer = function (td, row, col, value) {
        var _this = this;
        if (value != undefined && value != null) {
            var link = $('<a>');
            link.html(value);
            link.attr('role', 'button');
            $(td).empty().append(link);
            var self_1 = this;
            link.on("mouseup touchend", function (event) {
                _this.goDetail(row, col);
            });
        }
        else {
            // render as text
            Handsontable.renderers.TextRenderer.apply(this, arguments);
        }
        return td;
    };
    SFN050502Component.prototype.sortData = function () {
        var shippingList = this.page.pageData.shippingList;
        // sort by column, asc
        if (this.sortCol == undefined || this.sortCol == 0) {
            // sort 出荷予定日
            shippingList.sort(function (a, b) { return a.planDate.getTime() - b.planDate.getTime(); });
        }
        else if (this.sortCol == 1) {
            // sort 得意先名
            shippingList.sort(function (a, b) { return a.customerName.localeCompare(b.customerName); });
        }
        else if (this.sortCol == 2) {
            // sort 案件ID
            shippingList.sort(function (a, b) { return a.dealCode.localeCompare(b.dealCode); });
        }
        else if (this.sortCol == 3) {
            // sort 品名
            shippingList.sort(function (a, b) { return a.productName.localeCompare(b.productName); });
        }
        else if (this.sortCol == 4) {
            // sort 出荷予定数
            shippingList.sort(function (a, b) { return a.planAmount - b.planAmount; });
        }
        else if (this.sortCol == 5) {
            // sort 出荷実績数
            shippingList.sort(function (a, b) { return a.actualAmount - b.actualAmount; });
        }
        else if (this.sortCol == 6) {
            // sort 制限
            shippingList.sort(function (a, b) { return a.restriction - b.restriction; });
        }
        else if (this.sortCol == 7) {
            // sort 状況
            shippingList.sort(function (a, b) { return a.status - b.status; });
        }
        // sort order
        if (this.sortOrder == undefined) {
        }
        else if (!this.sortOrder) {
            // sort desc
            shippingList.reverse();
        }
    };
    SFN050502Component.prototype.getColumnsSetting = function () {
        var _this = this;
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
        var amountRenderer = function (instance, td, row, col, prop, value, cellProperties) {
            if (value == 0) {
                td.innerHTML = "-";
                td.align = "right";
            }
            else {
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
    };
    __decorate([
        core_1.ViewChild("hot"), 
        __metadata('design:type', core_1.ElementRef)
    ], SFN050502Component.prototype, "hotE", void 0);
    SFN050502Component = __decorate([
        core_1.Component({
            selector: "[sfn050502]",
            templateUrl: "SFN050502.ShippingList.component.html"
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return SFN0505_page_1.SFN0505Page; }))), 
        __metadata('design:paramtypes', [SFN0505_page_1.SFN0505Page])
    ], SFN050502Component);
    return SFN050502Component;
}());
exports.SFN050502Component = SFN050502Component;
//# sourceMappingURL=SFN050502.ShippingList.component.js.map