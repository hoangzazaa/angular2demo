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
var ProductListTable_model_1 = require("../../COMMON/product-list-table/ProductListTable.model");
var GenericProvider_1 = require("../../../../component/GenericProvider");
var ProductListTable_component_1 = require("../../COMMON/product-list-table/ProductListTable.component");
var date_util_1 = require("../../../../util/date-util");
var data_util_1 = require("../../../../util/data-util");
var SFN0402_constants_1 = require("../SFN0402.constants");
var SFN040205Component = (function (_super) {
    __extends(SFN040205Component, _super);
    function SFN040205Component(page, el, provider) {
        _super.call(this);
        this.page = page;
        this.el = el;
        provider.provider = this;
        // default
        this.page.pageData.productHits = 0;
        this.page.pageData.ppcStartDate = date_util_1.DateUtil.toLocalTime(date_util_1.DateUtil.getStartOfOneYearAgo(this.page.pageData.currentTime));
        this.page.pageData.ppcEndDate = date_util_1.DateUtil.toLocalTime(date_util_1.DateUtil.getEndOfMonth(this.page.pageData.currentTime));
        this.page.pageData.ppcKeyword = "";
        this.curPage = 1;
        this.hasChecked = false;
        this.allowRequest = false;
        this.exportEnabled = false;
        // init hot csv
        this.initCsvPlugin();
    }
    SFN040205Component.prototype.ngAfterViewInit = function () {
        this.doFilter();
    };
    Object.defineProperty(SFN040205Component.prototype, "startDate", {
        //region Bindings
        get: function () {
            return this.page.pageData.ppcStartDate;
        },
        set: function (value) {
            var oldValue = this.page.pageData.ppcStartDate;
            this.page.pageData.ppcStartDate = value;
            if (date_util_1.DateUtil.getTime(oldValue) != date_util_1.DateUtil.getTime(value)) {
                this.doFilter();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040205Component.prototype, "endDate", {
        get: function () {
            return this.page.pageData.ppcEndDate;
        },
        set: function (value) {
            var oldValue = this.page.pageData.ppcEndDate;
            this.page.pageData.ppcEndDate = value;
            if (date_util_1.DateUtil.getTime(oldValue) != date_util_1.DateUtil.getTime(value)) {
                this.doFilter();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040205Component.prototype, "keyword", {
        get: function () {
            return this.page.pageData.ppcKeyword;
        },
        set: function (value) {
            this.page.pageData.ppcKeyword = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040205Component.prototype, "hits", {
        get: function () {
            return this.page.pageData.productHits;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040205Component.prototype, "hasRecords", {
        get: function () {
            return (this.page.pageData.productHits > 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040205Component.prototype, "currentPage", {
        get: function () {
            return this.curPage;
        },
        set: function (value) {
            this.curPage = value;
            this.productListTable.reloadData(false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040205Component.prototype, "requestDisabled", {
        get: function () {
            return !(this.hasChecked && this.allowRequest);
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Actions
    SFN040205Component.prototype.exportCsv = function () {
        this.hot.loadData(this.getFullData());
        var fileName = this.page.pageData.partnerCode + "_製品一覧";
        this.exportPlugin.downloadFile('csv', {
            filename: fileName,
            columnHeaders: true
        });
    };
    SFN040205Component.prototype.navigateToProduct = function (record) {
        this.page.navigateToProduct(record);
    };
    SFN040205Component.prototype.doFilter = function () {
        var _this = this;
        OneUI.blocks(this.el.nativeElement, "state_loading");
        this.page.loadProductPanel().then(function () {
            _this.productListTable.reloadData(true);
            OneUI.blocks(_this.el.nativeElement, "state_normal");
        });
    };
    SFN040205Component.prototype.returnWooden = function () {
        this.page.showMail(SFN0402_constants_1.SFN0402Constants.MAIL_WOODEN_RETURN);
    };
    SFN040205Component.prototype.pendingWooden = function () {
        this.page.showMail(SFN0402_constants_1.SFN0402Constants.MAIL_WOODEN_PENDING);
    };
    SFN040205Component.prototype.exportProducts = function () {
        var _this = this;
        this.exportEnabled = false;
        this.page.exportProducts().then(function () {
            _this.exportEnabled = true;
        });
    };
    //endregion
    //region Functions
    SFN040205Component.prototype.getDataList = function () {
        var startR = (this.curPage - 1) * 10;
        return this.page.pageData.products.slice(startR, startR + 10);
    };
    SFN040205Component.prototype.getFullData = function () {
        return this.page.pageData.products;
    };
    SFN040205Component.prototype.onCheck = function (row, checked) {
        for (var _i = 0, _a = this.page.pageData.products; _i < _a.length; _i++) {
            var product = _a[_i];
            product.plt_selected = false;
        }
        _super.prototype.onCheck.call(this, row, checked);
        if (checked) {
            this.hasChecked = true;
        }
        else {
            this.hasChecked = false;
        }
        // status of checked row
        if (checked) {
            for (var _b = 0, _c = this.page.pageData.products; _b < _c.length; _b++) {
                var product = _c[_b];
                if (product.plt_selected) {
                    if (product.woodenStatus == undefined
                        || product.woodenStatus == "") {
                        this.allowRequest = true;
                    }
                    else {
                        this.allowRequest = false;
                    }
                    break;
                }
            }
        }
    };
    SFN040205Component.prototype.initCsvPlugin = function () {
        this.hot = new Handsontable(document.createElement("div"), {
            columns: [
                {
                    data: data_util_1.default.data("plt_productNo"),
                    title: "製品番号"
                },
                {
                    data: data_util_1.default.data("plt_productName"),
                    title: "品名"
                },
                {
                    data: data_util_1.default.data("plt_productDescription"),
                    title: "内容"
                },
                {
                    data: data_util_1.default.data("plt_quantity"),
                    title: "数量"
                },
                {
                    data: data_util_1.default.data("plt_unitPrice"),
                    title: "単価"
                },
                {
                    data: data_util_1.default.data("plt_production"),
                    title: "通算生産数"
                },
                {
                    data: data_util_1.default.data("plt_wooden"),
                    title: "木型"
                },
                {
                    data: data_util_1.default.data("plt_woodenExp"),
                    title: "木型有効期限"
                }
            ]
        });
        this.exportPlugin = this.hot.getPlugin('exportFile');
    };
    __decorate([
        core_1.ViewChild(ProductListTable_component_1.ProductListTableComponent), 
        __metadata('design:type', ProductListTable_component_1.ProductListTableComponent)
    ], SFN040205Component.prototype, "productListTable", void 0);
    SFN040205Component = __decorate([
        core_1.Component({
            selector: "[sfn040205]",
            templateUrl: "SFN040205.ProductPanel.component.html",
            providers: [{ provide: ProductListTable_model_1.ProductListTableModel.PROVIDER, useFactory: function () { return new GenericProvider_1.GenericProvider(); } }]
        }),
        __param(2, core_1.Inject(ProductListTable_model_1.ProductListTableModel.PROVIDER)), 
        __metadata('design:paramtypes', [SFN0402_page_1.SFN0402Page, core_1.ElementRef, GenericProvider_1.GenericProvider])
    ], SFN040205Component);
    return SFN040205Component;
}(ProductListTable_model_1.ProductListTableModel));
exports.SFN040205Component = SFN040205Component;
//# sourceMappingURL=SFN040205.ProductPanel.component.js.map