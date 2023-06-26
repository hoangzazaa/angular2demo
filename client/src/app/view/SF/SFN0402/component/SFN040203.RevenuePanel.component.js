"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var SFN0402_page_1 = require("../SFN0402.page");
var RevenueListTable_model_1 = require("../../COMMON/revenue-list-table/RevenueListTable.model");
var GenericProvider_1 = require("../../../../component/GenericProvider");
var RevenueListTable_component_1 = require("../../COMMON/revenue-list-table/RevenueListTable.component");
var date_util_1 = require("../../../../util/date-util");
var data_util_1 = require("../../../../util/data-util");
var SFN0402_constants_1 = require("../SFN0402.constants");
var SFN040203Component = (function (_super) {
    __extends(SFN040203Component, _super);
    function SFN040203Component(page, el, provider) {
        _super.call(this);
        this.page = page;
        this.el = el;
        provider.provider = this;
        // default
        this.page.pageData.revenueHits = 0;
        this.page.pageData.rpcStartDate = date_util_1.DateUtil.toLocalTime(date_util_1.DateUtil.getStartOfOneYearAgo(this.page.pageData.currentTime));
        this.page.pageData.rpcEndDate = date_util_1.DateUtil.toLocalTime(date_util_1.DateUtil.getEndOfMonth(this.page.pageData.currentTime));
        this.page.pageData.rpcKeyword = "";
        this.curPage = 1;
        this.hasChecked = false;
        if (this.page.pageData.partnerType == SFN0402_constants_1.SFN0402Constants.TYPE_SUPPLIER) {
            this.data.isSupplier = true;
        }
        // init hot csv
        this.initCsvPlugin();
    }
    SFN040203Component.prototype.ngAfterViewInit = function () {
        this.doFilter();
    };
    Object.defineProperty(SFN040203Component.prototype, "startDate", {
        //region Bindings
        get: function () {
            return this.page.pageData.rpcStartDate;
        },
        set: function (value) {
            var oldValue = this.page.pageData.rpcStartDate;
            this.page.pageData.rpcStartDate = value;
            if (date_util_1.DateUtil.getTime(oldValue) != date_util_1.DateUtil.getTime(value)) {
                this.doFilter();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040203Component.prototype, "endDate", {
        get: function () {
            return this.page.pageData.rpcEndDate;
        },
        set: function (value) {
            var oldValue = this.page.pageData.rpcEndDate;
            this.page.pageData.rpcEndDate = value;
            if (date_util_1.DateUtil.getTime(oldValue) != date_util_1.DateUtil.getTime(value)) {
                this.doFilter();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040203Component.prototype, "keyword", {
        get: function () {
            return this.page.pageData.rpcKeyword;
        },
        set: function (value) {
            this.page.pageData.rpcKeyword = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040203Component.prototype, "hits", {
        get: function () {
            return this.page.pageData.revenueHits;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040203Component.prototype, "currentPage", {
        get: function () {
            return this.curPage;
        },
        set: function (value) {
            this.curPage = value;
            this.revenueListTable.reloadData(false);
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Actions
    SFN040203Component.prototype.exportCsv = function () {
        this.hot.loadData(this.getFullData());
        var fileName = this.page.pageData.partnerCode + "_取引実績";
        this.exportPlugin.downloadFile('csv', {
            filename: fileName,
            columnHeaders: true
        });
    };
    SFN040203Component.prototype.navigateToDeal = function (record) {
        var dealCode = record.product.dealCode;
        this.page.navigateToDeal(dealCode);
    };
    SFN040203Component.prototype.navigateToProduct = function (record) {
        var product = record.product;
        this.page.navigateToProduct(product);
    };
    SFN040203Component.prototype.doFilter = function () {
        var _this = this;
        OneUI.blocks(this.el.nativeElement, "state_loading");
        this.page.loadRevenuePanel().then(function () {
            _this.revenueListTable.reloadData(true);
            OneUI.blocks(_this.el.nativeElement, "state_normal");
        });
    };
    SFN040203Component.prototype.repeatOrder = function () {
        // get selected stock
        var pageData = this.page.pageData;
        pageData.selectedProduct = undefined;
        for (var _i = 0, _a = pageData.revenues; _i < _a.length; _i++) {
            var revenue = _a[_i];
            if (revenue != undefined && revenue.rlt_selected) {
                pageData.selectedProduct = revenue.product;
                break;
            }
        }
        this.page.repeatOrder();
    };
    //endregion
    //region Functions
    SFN040203Component.prototype.getDataList = function () {
        var startR = (this.curPage - 1) * 10;
        return this.page.pageData.revenues.slice(startR, startR + 10);
    };
    SFN040203Component.prototype.getFullData = function () {
        return this.page.pageData.revenues;
    };
    SFN040203Component.prototype.onCheck = function (row, checked) {
        for (var _i = 0, _a = this.page.pageData.revenues; _i < _a.length; _i++) {
            var revenue = _a[_i];
            revenue.rlt_selected = false;
        }
        _super.prototype.onCheck.call(this, row, checked);
        if (checked) {
            this.hasChecked = true;
        }
        else {
            this.hasChecked = false;
        }
    };
    SFN040203Component.prototype.initCsvPlugin = function () {
        var isSupplier = this.data.isSupplier;
        this.hot = new Handsontable(document.createElement("div"), {
            columns: [
                {
                    data: data_util_1.default.data("rlt_salesDateStr"),
                    title: isSupplier ? "発注日" : "売上日"
                },
                {
                    data: data_util_1.default.data("rlt_dealCode"),
                    title: "案件ID"
                },
                {
                    data: data_util_1.default.data("rlt_itemCode"),
                    title: "製品番号"
                },
                {
                    data: data_util_1.default.data("rlt_productName"),
                    title: "品名"
                },
                {
                    data: data_util_1.default.data("rlt_productDescription"),
                    title: "内容"
                },
                {
                    data: data_util_1.default.data("rlt_quantity"),
                    title: "数量"
                },
                {
                    data: data_util_1.default.data("rlt_unitPrice"),
                    title: "単価"
                },
                {
                    data: data_util_1.default.data("rlt_total"),
                    title: "合計"
                },
                {
                    data: data_util_1.default.data("rlt_note"),
                    title: "備考"
                }
            ]
        });
        this.exportPlugin = this.hot.getPlugin('exportFile');
    };
    __decorate([
        core_1.ViewChild(RevenueListTable_component_1.RevenueListTableComponent), 
        __metadata('design:type', RevenueListTable_component_1.RevenueListTableComponent)
    ], SFN040203Component.prototype, "revenueListTable", void 0);
    SFN040203Component = __decorate([
        core_1.Component({
            selector: "[sfn040203]",
            templateUrl: "SFN040203.RevenuePanel.component.html",
            providers: [{ provide: RevenueListTable_model_1.RevenueListTableModel.PROVIDER, useFactory: function () { return new GenericProvider_1.GenericProvider(); } }]
        }),
        __param(2, core_1.Inject(RevenueListTable_model_1.RevenueListTableModel.PROVIDER)), 
        __metadata('design:paramtypes', [SFN0402_page_1.SFN0402Page, core_1.ElementRef, GenericProvider_1.GenericProvider])
    ], SFN040203Component);
    return SFN040203Component;
}(RevenueListTable_model_1.RevenueListTableModel));
exports.SFN040203Component = SFN040203Component;
//# sourceMappingURL=SFN040203.RevenuePanel.component.js.map