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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var constants_1 = require("../../../helper/constants");
var message_1 = require("../../../helper/message");
var format_util_1 = require("../../../util/format-util");
var math_util_1 = require("../../../util/math-util");
var validator_util_1 = require("../../../util/validator-util");
var CC00100_service_1 = require("../../CC/CC00100/CC00100.service");
var common_page_1 = require("../COMMON/common.page");
var Header_provider_1 = require("../SF00100/Header.provider");
var SF00101_service_1 = require("./SF00101.service");
var SF00101_PAGE_TITLE = "ダッシュボード";
var SF00101Page = (function (_super) {
    __extends(SF00101Page, _super);
    function SF00101Page(router, route, headerProvider, authService, pageService) {
        _super.call(this, router, route, headerProvider);
        this.authService = authService;
        this.pageService = pageService;
    }
    SF00101Page.prototype.ngAfterViewInit = function () {
    };
    SF00101Page.prototype.ngOnInit = function () {
        this.pageService.navigateTo("ダッシュボード", this.router.url);
        var departmentID = this.authService.user.departmentId;
        var picId = this.authService.user.id;
        // get department
        var department = this.pageData.departments.find(function (item) {
            return item.id == departmentID;
        });
        if (!!department) {
            // list sale by departments
            this.pageData.salesTab1 = department.users;
            this.pageData.salesTab2 = department.users;
        }
        else {
            departmentID = 0;
            picId = 0;
        }
        //init filter
        this.pageData.modelFilterTab1.departmentID = departmentID;
        this.pageData.modelFilterTab1.picId = picId;
        this.pageData.modelFilterTab2.departmentID = departmentID;
        this.pageData.modelFilterTab2.picId = picId;
        var seft = this;
        // init tab1
        App.loader("show");
        this.pageService.initDataTab1().then(function () {
            //
            seft.updateDataChart();
            //
            App.loader("hide");
        });
        this.pageData.loadDataTable();
    };
    SF00101Page.prototype.initBreadcrumb = function () {
        this.headerProvider.reset();
        this.headerProvider.pageName = SF00101_PAGE_TITLE;
        this.headerProvider.addBreadCrumb(constants_1.Constants.TOP, []);
    };
    SF00101Page.prototype.viewSalesPerformance = function () {
        var departmentId = this.authService.user.departmentId;
        if (validator_util_1.default.isNotEmpty(departmentId))
            return _super.prototype.navigate.call(this, '/home/view-sales-performance');
        // Fix #1747
        return swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.COM.WRN003), "error");
    };
    Object.defineProperty(SF00101Page.prototype, "pageData", {
        get: function () {
            return this.pageService.pageData;
        },
        enumerable: true,
        configurable: true
    });
    SF00101Page.prototype.filterDataTab1 = function () {
        var _this = this;
        App.loader("show");
        this.pageService.initDataTab1().then(function () {
            _this.updateDataChart();
            App.loader("hide");
        });
    };
    SF00101Page.prototype.filterDataTab2 = function () {
        App.loader("show");
        this.pageService.initDataTab2().then(function () {
            App.loader("hide");
        });
    };
    SF00101Page.prototype.viewDealDetail = function (dealCode) {
        this.router.navigate(['home/deal', dealCode]);
    };
    SF00101Page.prototype.saveDataInput = function () {
        App.loader("show");
        this.pageService.saveDataInput().then(function () {
            App.loader("hide");
            $.notify({ message: message_1.default.get(message_1.MSG.SF00100.INF001) }, { type: 'success' });
        });
    };
    SF00101Page.prototype.getPercent = function (actual, total) {
        if (total == 0 || total == undefined)
            return '( ' + constants_1.Constants.HYPHEN + ' )';
        var rs = (actual / total) * 100;
        return math_util_1.default.round(rs, 2);
    };
    SF00101Page.prototype.formatValueMax = function (value) {
        if (value > 100)
            return 100;
        return value;
    };
    SF00101Page.prototype.updateDataChart = function () {
        $('#js-pie-chart1').data('easyPieChart').update(this.formatValueMax(format_util_1.FormatUtil.isNaN(this.getPercent(this.pageData.receipts.current, this.pageData.receipts.goal))));
        $('#js-pie-chart2').data('easyPieChart').update(this.formatValueMax(format_util_1.FormatUtil.isNaN(this.getPercent(this.pageData.newReceipts.current, this.pageData.newReceipts.goal))));
        $('#js-pie-chart3').data('easyPieChart').update(this.formatValueMax(format_util_1.FormatUtil.isNaN(this.getPercent(this.pageData.recordNew.current, this.pageData.recordNew.goal))));
        $('#js-pie-chart4').data('easyPieChart').update(this.formatValueMax(format_util_1.FormatUtil.isNaN(this.getPercent(this.pageData.digitalSale.current, this.pageData.digitalSale.goal))));
    };
    Object.defineProperty(SF00101Page.prototype, "checkSalePic", {
        // check salePic
        get: function () {
            var userAuthen = this.authService.user;
            if (this.pageData.modelFilterTab1.picId == userAuthen.id)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    SF00101Page.prototype.onChangeTab = function (tabNumber) {
        var _this = this;
        var self = this;
        App.loader("show");
        if (tabNumber == 1) {
            // init tab2
            this.pageService.initDataTab1().then(function () {
                App.loader("hide");
            });
        }
        if (tabNumber == 2) {
            // init tab1
            this.pageService.initDataTab2().then(function () {
                // check list dataTable != null and dataTable.lenght>0
                if (!!self.pageData.dataTable && _this.pageData.dataTable.length > 0) {
                    setTimeout(function () {
                        self.pageData.handsonTable.render();
                    }, 50);
                }
                App.loader("hide");
            });
        }
    };
    Object.defineProperty(SF00101Page.prototype, "pageSize", {
        get: function () {
            return this.pageData.pageSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00101Page.prototype, "totalRecords", {
        get: function () {
            return this.pageData.totalRecords;
        },
        enumerable: true,
        configurable: true
    });
    SF00101Page.prototype.onPageChange = function (currentPage) {
        var _this = this;
        var limit = this.pageData.pageSize;
        var offset = ((currentPage || constants_1.Constants.FIRST_PAGE) - 1) * this.pageData.pageSize;
        var req = {
            picId: this.authService.user.id,
            departmentId: this.authService.user.departmentId,
            indexFrom: offset,
            indexTo: limit
        };
        this.pageService.getDeals(req).then(function () { return _this.$scrollTop("#dealInfo"); }).catch(function (err) { return console.log(err.statusText); });
    };
    SF00101Page = __decorate([
        core_1.Component({
            selector: "dashboard-page",
            templateUrl: "./SF00101.page.html"
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, CC00100_service_1.CC00100Service, SF00101_service_1.SF00101Service])
    ], SF00101Page);
    return SF00101Page;
}(common_page_1.CommonPage));
exports.SF00101Page = SF00101Page;
//# sourceMappingURL=SF00101.page.js.map