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
var StockListTable_model_1 = require("../../COMMON/stock-list-table/StockListTable.model");
var GenericProvider_1 = require("../../../../component/GenericProvider");
var StockListTable_component_1 = require("../../COMMON/stock-list-table/StockListTable.component");
var data_util_1 = require("../../../../util/data-util");
var SFN0402_constants_1 = require("../SFN0402.constants");
var SFN040204Component = (function (_super) {
    __extends(SFN040204Component, _super);
    function SFN040204Component(page, el, provider) {
        _super.call(this);
        this.page = page;
        this.el = el;
        provider.provider = this;
        // default
        this.page.pageData.inventoryHits = 0;
        this.page.pageData.spcStockDays = 0;
        this.page.pageData.spcStockType = 0;
        this.curPage = 1;
        this.hasChecked = false;
        this.exportEnabled = false;
        // init hot csv
        this.initCsvPlugin();
    }
    SFN040204Component.prototype.ngAfterViewInit = function () {
        this.doFilter();
    };
    Object.defineProperty(SFN040204Component.prototype, "hits", {
        //region Bindings
        get: function () {
            return this.page.pageData.inventoryHits;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040204Component.prototype, "stockDays", {
        get: function () {
            return this.page.pageData.spcStockDays;
        },
        set: function (value) {
            this.page.pageData.spcStockDays = value;
            this.doFilter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040204Component.prototype, "stockType", {
        get: function () {
            return this.page.pageData.spcStockType;
        },
        set: function (value) {
            this.page.pageData.spcStockType = value;
            this.doFilter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040204Component.prototype, "currentPage", {
        get: function () {
            return this.curPage;
        },
        set: function (value) {
            this.curPage = value;
            this.stockListTable.reloadData(false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040204Component.prototype, "hasRecords", {
        get: function () {
            return (this.page.pageData.inventoryHits > 0);
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Actions
    SFN040204Component.prototype.exportCsv = function () {
        this.hot.loadData(this.getFullData());
        var fileName = this.page.pageData.partnerCode + "_在庫状況";
        this.exportPlugin.downloadFile('csv', {
            filename: fileName,
            columnHeaders: true
        });
    };
    SFN040204Component.prototype.navigateToDeal = function (record) {
        var dealCode = record.product.dealCode;
        this.page.navigateToDeal(dealCode);
    };
    SFN040204Component.prototype.navigateToProduct = function (record) {
        var product = record.product;
        this.page.navigateToProduct(product);
    };
    SFN040204Component.prototype.doFilter = function () {
        var _this = this;
        OneUI.blocks(this.el.nativeElement, "state_loading");
        this.page.loadStockPanel().then(function () {
            _this.stockListTable.reloadData(true);
            OneUI.blocks(_this.el.nativeElement, "state_normal");
        });
    };
    SFN040204Component.prototype.disposalProduct = function () {
        this.page.showMail(SFN0402_constants_1.SFN0402Constants.MAIL_PRODUCT_DISPOSAL);
    };
    SFN040204Component.prototype.shippingStock = function () {
        // get selected product
        var pageData = this.page.pageData;
        pageData.selectedInventory = undefined;
        for (var _i = 0, _a = pageData.inventories; _i < _a.length; _i++) {
            var inventory = _a[_i];
            if (inventory != undefined && inventory.slt_selected) {
                pageData.selectedInventory = inventory;
                break;
            }
        }
        // do shipping stock
        this.page.shippingStock();
    };
    SFN040204Component.prototype.exportStocks = function () {
        var _this = this;
        this.exportEnabled = false;
        this.page.exportStocks().then(function () {
            _this.exportEnabled = true;
        });
    };
    //endregion
    //region Functions
    SFN040204Component.prototype.getDataList = function () {
        var startR = (this.curPage - 1) * 10;
        return this.page.pageData.inventories.slice(startR, startR + 10);
    };
    SFN040204Component.prototype.getFullData = function () {
        return this.page.pageData.inventories;
    };
    SFN040204Component.prototype.onCheck = function (row, checked) {
        for (var _i = 0, _a = this.page.pageData.inventories; _i < _a.length; _i++) {
            var inventory = _a[_i];
            inventory.slt_selected = false;
        }
        _super.prototype.onCheck.call(this, row, checked);
        if (checked) {
            this.hasChecked = true;
        }
        else {
            this.hasChecked = false;
        }
    };
    SFN040204Component.prototype.initCsvPlugin = function () {
        this.hot = new Handsontable(document.createElement("div"), {
            columns: [
                {
                    data: data_util_1.default.data("slt_classify"),
                    title: "種別"
                },
                {
                    data: data_util_1.default.data("slt_dealCode"),
                    title: "案件ID"
                },
                {
                    data: data_util_1.default.data("slt_productName"),
                    title: "品名"
                },
                {
                    data: data_util_1.default.data("slt_productDescription"),
                    title: "内容"
                },
                {
                    data: data_util_1.default.data("slt_quantity"),
                    title: "数量"
                },
                {
                    data: data_util_1.default.data("slt_unitPrice"),
                    title: "単価"
                },
                {
                    data: data_util_1.default.data("slt_total"),
                    title: "合計"
                },
                {
                    data: data_util_1.default.data("slt_productionDateStr"),
                    title: "製造日"
                },
                {
                    data: data_util_1.default.data("slt_storageDays"),
                    title: "保管日数"
                },
                {
                    data: data_util_1.default.data("slt_note"),
                    title: "備考"
                }
            ]
        });
        this.exportPlugin = this.hot.getPlugin('exportFile');
    };
    __decorate([
        core_1.ViewChild(StockListTable_component_1.StockListTableComponent), 
        __metadata('design:type', StockListTable_component_1.StockListTableComponent)
    ], SFN040204Component.prototype, "stockListTable", void 0);
    SFN040204Component = __decorate([
        core_1.Component({
            selector: "[sfn040204]",
            templateUrl: "SFN040204.StockPanel.component.html",
            providers: [{ provide: StockListTable_model_1.StockListTableModel.PROVIDER, useFactory: function () { return new GenericProvider_1.GenericProvider(); } }]
        }),
        __param(2, core_1.Inject(StockListTable_model_1.StockListTableModel.PROVIDER)), 
        __metadata('design:paramtypes', [SFN0402_page_1.SFN0402Page, core_1.ElementRef, GenericProvider_1.GenericProvider])
    ], SFN040204Component);
    return SFN040204Component;
}(StockListTable_model_1.StockListTableModel));
exports.SFN040204Component = SFN040204Component;
//# sourceMappingURL=SFN040204.StockPanel.component.js.map