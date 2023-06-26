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
var SFN0506_page_1 = require("../SFN0506.page");
var common_events_1 = require("../../../../helper/common-events");
var date_util_1 = require("../../../../util/date-util");
var SFN050602Component = (function () {
    function SFN050602Component(page) {
        this.page = page;
    }
    SFN050602Component.prototype.ngAfterViewInit = function () {
        var _this = this;
        // init hot
        var container = this.hotE.nativeElement;
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
        this.hotX = new Handsontable(document.createElement("div"), { columns: this.getColumnsSetting() });
        this.exportPlugin = this.hotX.getPlugin('exportFile');
    };
    Object.defineProperty(SFN050602Component.prototype, "hits", {
        //region Bindings
        get: function () {
            return this.page.pageData.hits;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050602Component.prototype, "currentPage", {
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
    SFN050602Component.prototype.exportCsv = function () {
        this.hotX.loadData(this.page.pageData.paymentList);
        this.exportPlugin.downloadFile('csv', {
            filename: '入金状況照会',
            columnHeaders: true
        });
    };
    SFN050602Component.prototype.reloadData = function (reset) {
        if (reset) {
            this.sortCol = undefined;
            this.sortOrder = undefined;
            this.sortData();
        }
        // display indicator
        this.updateIndicator();
        var startR = (this.page.pageData.page - 1) * 10;
        this.payments = this.page.pageData.paymentList.slice(startR, startR + 10);
        this.hot.loadData(this.payments);
    };
    SFN050602Component.prototype.goDetail = function (row, col) {
        var payment = this.payments[row];
        if (col == 1) {
            // view customer
            this.page.navigateToCustomer(payment);
        }
    };
    //endregion
    //region functions
    SFN050602Component.prototype.hotOnClickHeader = function (column) {
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
        // sorting data
        this.sortData();
        this.reloadData(false);
    };
    SFN050602Component.prototype.hotLinkRenderer = function (td, row, col, value) {
        var _this = this;
        if (value != undefined && value != null) {
            var link = $('<a>');
            link.html(value);
            link.attr('role', 'button');
            $(td).empty().append(link);
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
    SFN050602Component.prototype.sortData = function () {
        var paymentList = this.page.pageData.paymentList;
        // sort by column, asc
        if (this.sortCol == 0) {
            // sort 請求ID
            paymentList.sort(function (a, b) { return a.code.localeCompare(b.code); });
        }
        else if (this.sortCol == 1) {
            // sort 得意先名
            paymentList.sort(function (a, b) { return a.customerName.localeCompare(b.customerName); });
        }
        else if (this.sortCol == 2) {
            // sort 請求額
            paymentList.sort(function (a, b) { return a.amount - b.amount; });
        }
        else if (this.sortCol == undefined || this.sortCol == 3) {
            // sort 請求締め日
            paymentList.sort(function (a, b) { return date_util_1.DateUtil.getTime(a.closingDate) - date_util_1.DateUtil.getTime(b.closingDate); });
        }
        else if (this.sortCol == 4) {
            // sort 入金期日
            paymentList.sort(function (a, b) { return date_util_1.DateUtil.getTime(a.dueDate) - date_util_1.DateUtil.getTime(b.dueDate); });
        }
        else if (this.sortCol == 5) {
            // sort 方法
            paymentList.sort(function (a, b) { return a.method.localeCompare(b.method); });
        }
        else if (this.sortCol == 6) {
            // sort 状況
            paymentList.sort(function (a, b) { return a.status.localeCompare(b.status); });
        }
        // sort order
        if (this.sortOrder == undefined) {
            // sort 請求締め日 desc by default
            paymentList.reverse();
        }
        else if (!this.sortOrder) {
            // sort desc
            paymentList.reverse();
        }
    };
    SFN050602Component.prototype.updateIndicator = function () {
        var sortCol = this.sortCol;
        var sortOrder = this.sortOrder;
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
    SFN050602Component.prototype.getColumnsSetting = function () {
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
        var statusRenderer = function (instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(_this, [instance, td, row, col, prop, value, cellProperties]);
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
    };
    __decorate([
        core_1.ViewChild("hot"), 
        __metadata('design:type', core_1.ElementRef)
    ], SFN050602Component.prototype, "hotE", void 0);
    SFN050602Component = __decorate([
        core_1.Component({
            selector: "[sfn050602]",
            templateUrl: "SFN050602.PaymentList.component.html"
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return SFN0506_page_1.SFN0506Page; }))), 
        __metadata('design:paramtypes', [SFN0506_page_1.SFN0506Page])
    ], SFN050602Component);
    return SFN050602Component;
}());
exports.SFN050602Component = SFN050602Component;
//# sourceMappingURL=SFN050602.PaymentList.component.js.map