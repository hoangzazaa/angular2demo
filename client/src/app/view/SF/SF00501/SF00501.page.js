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
var Header_provider_1 = require("../SF00100/Header.provider");
var router_1 = require("@angular/router");
var common_page_1 = require("../COMMON/common.page");
var CC00100_service_1 = require("../../CC/CC00100/CC00100.service");
var screen_url_1 = require("../../../helper/screen-url");
var SF00501_data_1 = require("./SF00501.data");
var SF00501_service_1 = require("./SF00501.service");
var SF00501_constants_1 = require("./SF00501.constants");
var message_1 = require("../../../helper/message");
var constants_1 = require("../../../helper/constants");
var date_util_1 = require("../../../util/date-util");
var SF00501_Date_model_1 = require("./model/SF00501_Date.model");
var SF00501_helper_1 = require("./SF00501.helper");
var SF00501Page = (function (_super) {
    __extends(SF00501Page, _super);
    //region Initialize page
    function SF00501Page(router, route, headerProvider, service, authService, appRef) {
        _super.call(this, router, route, headerProvider);
        this.router = router;
        this.route = route;
        this.headerProvider = headerProvider;
        this.service = service;
        this.appRef = appRef;
        // init page data
        this.pageData = new SF00501_data_1.SF00501Data();
        service.pageData = this.pageData;
        // get current user
        this.user = authService.user;
        // create list deals
        this.pageData.deals = [];
        this.pageData.products = [];
    }
    SF00501Page.prototype.pageTile = function () {
        return "営業実績照会";
    };
    //endregion
    // get data on page load
    SF00501Page.prototype.ngOnInit = function () {
        var _this = this;
        this.service.navigateTo(" 営業実績照会", this.router.url);
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SF00502.INF001
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        // load data
        this.service.sf0050101().then(function () {
            // setup date options
            _this.setupDateOptions();
            // notify update and close
            _this.notifyDone(notify);
            // find current user's department
            var curDepartment;
            for (var _i = 0, _a = _this.pageData.departments; _i < _a.length; _i++) {
                var department = _a[_i];
                if (department.id == _this.user.departmentId) {
                    curDepartment = department;
                    break;
                }
            }
            // select department
            if (curDepartment != undefined) {
                // department found, select department
                _this.pageData.selectedFilter.department = curDepartment;
                // set staff list
                _this.pageData.staffs = _this.pageData.dataRepo.getStaffs(curDepartment.id);
                // find default staff
                var curStaff = void 0;
                if (_this.user.role == constants_1.Constants.USER_ROLE_STAFF) {
                    // find current staff
                    var staffList = _this.pageData.dataRepo.getStaffs(curDepartment.id);
                    for (var _b = 0, staffList_1 = staffList; _b < staffList_1.length; _b++) {
                        var staff = staffList_1[_b];
                        if (staff.id == _this.user.id) {
                            curStaff = staff;
                            break;
                        }
                    }
                }
                if (curStaff != undefined) {
                    // staff found, select staff
                    _this.pageData.selectedFilter.staff = curStaff;
                }
                else {
                    // staff not found, select all
                    _this.pageData.selectedFilter.staff = SF00501_constants_1.SF00501Constants.OPTION_ALL_STAFF;
                }
            }
            else {
                // default select all company
                _this.pageData.selectedFilter.department = SF00501_constants_1.SF00501Constants.OPTION_ALL_DEPT;
                _this.pageData.selectedFilter.staff = SF00501_constants_1.SF00501Constants.OPTION_ALL_STAFF;
                _this.pageData.staffs = _this.pageData.dataRepo.getStaffs(SF00501_constants_1.SF00501Constants.OPTION_ALL_DEPT.id);
            }
            // set default filter radio value
            _this.pageData.selectedFilter.dateUnit = SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_YEAR;
            _this.pageData.selectedFilter.customerType = SF00501_constants_1.SF00501Constants.OPTION_CUSTOMER_ALL;
            _this.pageData.selectedFilter.sumaryType = SF00501_constants_1.SF00501Constants.OPTION_SUMMARY_PERFORMANCE;
            // set default select date: current year > always [1] options
            _this.pageData.dateOptions = _this.pageData.dataRepo.getSelectDates(SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_YEAR);
            _this.pageData.selectedFilter.date = _this.pageData.dateOptions[1];
            // start first time filter
            _this.doFilter();
        });
    };
    //region Actions
    SF00501Page.prototype.doFilter = function () {
        var _this = this;
        // get header
        var headTitle = this.getHeadline();
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.default.get(message_1.MSG.SF00501.INF002, headTitle)
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        // call service filter
        this.service.sf0050102().then(function () {
            // update last filter
            _this.updateLastFilter();
            // change headline
            _this.pageData.headline = headTitle;
            // check for display
            _this.checkDateList();
            _this.checkViewMode();
            // set default view mode to product
            _this.pageData.selectedViewMode = SF00501_constants_1.SF00501Constants.OPTION_DETAIL_PRODUCT;
            // analyze data for details
            _this.analyzeData();
            // analyze graph data
            _this.pageData.graphData = SF00501_helper_1.SF00501Helper.analyzeGraph(_this.pageData);
            // check summary table
            _this.checkSummaryTable();
            // reinit datatable
            _this.reInitDataTable();
            // redraw chart
            _this.redrawGraph();
            // hide deal details
            _this.pageData.showDealList = false;
            // notify update and close
            _this.notifyDone(notify);
        }, function (reason) {
            // show warning message
            swal({
                title: "",
                text: message_1.MSG.SF00501.WRN001,
                type: "warning",
                confirmButtonColor: "#d26a5c",
                confirmButtonText: "OK",
                html: false,
            });
            // notify close
            notify.close();
            // hide content loader
            OneUI.contentLoader('hide');
        });
    };
    SF00501Page.prototype.goBack = function () {
        this.navigate(screen_url_1.ScreenUrl.SF001);
    };
    //endregion
    //region functions
    SF00501Page.prototype.getHeadline = function () {
        var headline = "";
        // department
        headline += "<span>";
        headline += this.pageData.selectedFilter.department.name;
        // user
        if (this.pageData.selectedFilter.department != SF00501_constants_1.SF00501Constants.OPTION_ALL_DEPT
            && this.pageData.selectedFilter.staff != SF00501_constants_1.SF00501Constants.OPTION_ALL_STAFF) {
            headline += "/" + this.pageData.selectedFilter.staff.name;
        }
        headline += "</span>";
        // date unit
        headline += " <span>";
        headline += " " + this.pageData.selectedFilter.date.name;
        headline += "</span>";
        // customer type
        headline += " <span>";
        if (this.pageData.selectedFilter.customerType == SF00501_constants_1.SF00501Constants.OPTION_CUSTOMER_ALL) {
            headline += "全体得意先";
        }
        else if (this.pageData.selectedFilter.customerType == SF00501_constants_1.SF00501Constants.OPTION_CUSTOMER_OLD) {
            headline += "既存得意先";
        }
        else if (this.pageData.selectedFilter.customerType == SF00501_constants_1.SF00501Constants.OPTION_CUSTOMER_NEW) {
            headline += "新規得意先";
        }
        headline += "</span>";
        // summay type
        headline += " <span>";
        if (this.pageData.selectedFilter.sumaryType == SF00501_constants_1.SF00501Constants.OPTION_SUMMARY_PERFORMANCE) {
            headline += "(実績)";
        }
        else if (this.pageData.selectedFilter.sumaryType == SF00501_constants_1.SF00501Constants.OPTION_SUMMARY_INPROCESS) {
            headline += "(仕掛り)";
        }
        headline += "</span>";
        return headline;
    };
    /**
     * update date list
     */
    SF00501Page.prototype.checkDateList = function () {
        var pageData = this.pageData;
        var dateList = [];
        if (pageData.currentFilter.dateUnit == SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_YEAR) {
            // year: [4,5...,2,3]
            dateList = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];
        }
        else if (pageData.currentFilter.dateUnit == SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_HALF_YEAR) {
            // half year
            if (pageData.currentFilter.date.startMonth == 4) {
                dateList = [4, 5, 6, 7, 8, 9];
            }
            else {
                dateList = [10, 11, 12, 1, 2, 3];
            }
        }
        else if (pageData.currentFilter.dateUnit == SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_QUARTER) {
            // quarter: [startMonth -> startMonth + 2]
            var sM = pageData.currentFilter.date.startMonth;
            dateList = [sM, sM + 1, sM + 2];
        }
        else {
            // month -> [1,2,3...]
            var days = new Date(pageData.currentFilter.date.startYear, pageData.currentFilter.date.startMonth, 0).getDate();
            dateList = [];
            for (var i = 1; i <= days; i++) {
                dateList.push(i);
            }
        }
        pageData.dateList = dateList;
    };
    /**
     * check show/hide summary table
     */
    SF00501Page.prototype.checkSummaryTable = function () {
        var show = false;
        // show if view staff - month
        if (this.pageData.currentFilter.dateUnit == SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH) {
            show = true;
        }
        // show if view by staff
        if (this.pageData.selectedViewMode == SF00501_constants_1.SF00501Constants.OPTION_DETAIL_STAFF) {
            show = true;
        }
        // show if view by group
        if (this.pageData.selectedViewMode == SF00501_constants_1.SF00501Constants.OPTION_DETAIL_DEPT) {
            show = true;
        }
        this.pageData.showSummaryTable = show;
        if (this.pageData.showSummaryTable) {
            this.pageData.summary = SF00501_helper_1.SF00501Helper.calculateSummaryData(this.pageData);
        }
    };
    SF00501Page.prototype.checkViewMode = function () {
        var viewModes;
        var selectedViewMode;
        if (this.pageData.currentFilter.department == SF00501_constants_1.SF00501Constants.OPTION_ALL_DEPT) {
            // 支店名 is 全社 -> 製品種類別, グループ別
            viewModes = [SF00501_constants_1.SF00501Constants.OPTION_DETAIL_PRODUCT, SF00501_constants_1.SF00501Constants.OPTION_DETAIL_DEPT];
            selectedViewMode = SF00501_constants_1.SF00501Constants.OPTION_DETAIL_PRODUCT;
        }
        else {
            // 支店名 is sales dept
            if (this.pageData.currentFilter.staff == SF00501_constants_1.SF00501Constants.OPTION_ALL_STAFF) {
                // 担当者名 is 指定なし -> 製品種類別, スタッフ別
                viewModes = [SF00501_constants_1.SF00501Constants.OPTION_DETAIL_PRODUCT, SF00501_constants_1.SF00501Constants.OPTION_DETAIL_STAFF];
                selectedViewMode = SF00501_constants_1.SF00501Constants.OPTION_DETAIL_PRODUCT;
            }
            else {
                // 担当者名 is sales staff
                if (this.pageData.currentFilter.dateUnit == SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH) {
                    // 期間 is 月 -> 製品種類別, 案件一覧
                    viewModes = [SF00501_constants_1.SF00501Constants.OPTION_DETAIL_PRODUCT, SF00501_constants_1.SF00501Constants.OPTION_DETAIL_DEAL];
                    selectedViewMode = SF00501_constants_1.SF00501Constants.OPTION_DETAIL_PRODUCT;
                }
            }
        }
        this.pageData.viewModes = viewModes;
        this.pageData.selectedViewMode = selectedViewMode;
    };
    SF00501Page.prototype.setupDateOptions = function () {
        var repo = this.pageData.dataRepo;
        // get current finacial year
        var fYear = date_util_1.DateUtil.getFinancialYear(this.pageData.currentTime);
        // setup date for 通期
        var yearOptions = [];
        for (var iY = fYear - 1; iY <= fYear + 1; iY++) {
            var option = new SF00501_Date_model_1.DateModel();
            yearOptions.push(option);
            // date = 4/fY -> 3/fY+1
            option.startYear = iY;
            option.startMonth = 4;
            option.endYear = iY + 1;
            option.endMonth = 3;
            option.name = option.startYear + "年";
        }
        repo.setSelectDates(yearOptions, SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_YEAR);
        // setup date for 半期
        var halfYearOptions = [];
        for (var iY = fYear - 1; iY <= fYear + 1; iY++) {
            for (var jH = 0; jH <= 1; jH++) {
                var option = new SF00501_Date_model_1.DateModel();
                halfYearOptions.push(option);
                // date = (4/fY -> 9/fY) | (10/fY -> 3/fY+1)
                option.startYear = iY;
                option.startMonth = 4 + jH * 6;
                option.endYear = iY + jH;
                option.endMonth = 9 - jH * 6;
                option.name = option.startYear + "年" + (option.startMonth == 4 ? "上期" : "下期");
            }
        }
        repo.setSelectDates(halfYearOptions, SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_HALF_YEAR);
        // setup date for 四半期
        var quarterOptions = [];
        for (var iY = fYear - 1; iY <= fYear + 1; iY++) {
            for (var jH = 0; jH <= 3; jH++) {
                var option = new SF00501_Date_model_1.DateModel();
                quarterOptions.push(option);
                // date = (4/fY -> 6/fY) | (7/fY -> 9/fY) | (10/fY -> 12/fY) | (1/fY+1 -> 3/fY+1)
                option.startYear = iY + Math.floor(jH / 3);
                option.startMonth = (4 + jH * 3) % 12;
                option.endYear = iY + Math.floor(jH / 3);
                option.endMonth = (6 + jH * 3) > 12 ? (6 + jH * 3) - 12 : (6 + jH * 3);
                option.name = option.startYear + "年" + option.startMonth + "～" + option.endMonth + "月";
            }
        }
        repo.setSelectDates(quarterOptions, SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_QUARTER);
        // setup date for 月
        var monthOptions = [];
        for (var iY = fYear - 1; iY <= fYear + 1; iY++) {
            for (var jH = 0; jH <= 11; jH++) {
                var option = new SF00501_Date_model_1.DateModel();
                monthOptions.push(option);
                // date = (4/iY) -> (3/iY+1)
                var tmpY = jH >= 9 ? iY + 1 : iY;
                var tmpM = jH >= 9 ? jH - 8 : jH + 4;
                option.startYear = tmpY;
                option.startMonth = tmpM;
                option.endYear = tmpY;
                option.endMonth = tmpM;
                option.name = option.startYear + "年" + option.startMonth + "月";
            }
        }
        repo.setSelectDates(monthOptions, SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH);
    };
    SF00501Page.prototype.notifyDone = function (notify) {
        // notify update and close
        notify.update("progress", 100);
        notify.update("type", "success");
        setTimeout(function (ntf) {
            ntf.close();
        }, 1000, notify);
        // hide content loader
        OneUI.contentLoader('hide');
    };
    SF00501Page.prototype.analyzeData = function () {
        if (this.pageData.selectedViewMode == SF00501_constants_1.SF00501Constants.OPTION_DETAIL_STAFF
            || this.pageData.selectedViewMode == SF00501_constants_1.SF00501Constants.OPTION_DETAIL_DEPT) {
            this.pageData.displayDetails = SF00501_helper_1.SF00501Helper.analyzeDataByAgent(this.pageData);
        }
        else if (this.pageData.selectedViewMode == SF00501_constants_1.SF00501Constants.OPTION_DETAIL_PRODUCT) {
            this.pageData.displayDetails = SF00501_helper_1.SF00501Helper.analyzeDataByProduct(this.pageData);
        }
    };
    SF00501Page.prototype.reInitDataTable = function () {
        this.pageData.displayTable = false;
        this.appRef.tick();
        this.pageData.displayTable = true;
    };
    SF00501Page.prototype.redrawGraph = function () {
        this.pageData.graphData = SF00501_helper_1.SF00501Helper.analyzeGraph(this.pageData);
        this.pageData.displayGraph = false;
        this.appRef.tick();
        this.pageData.displayGraph = true;
    };
    SF00501Page.prototype.updateLastFilter = function () {
        var selectedFilter = this.pageData.selectedFilter;
        var curFilter = this.pageData.currentFilter;
        curFilter.department = selectedFilter.department;
        curFilter.staff = selectedFilter.staff;
        curFilter.customerType = selectedFilter.customerType;
        curFilter.date = selectedFilter.date;
        curFilter.dateUnit = selectedFilter.dateUnit;
        curFilter.sumaryType = selectedFilter.sumaryType;
    };
    //endregion
    SF00501Page.prototype.getListDealBySaleIdAndMonth = function () {
        var _this = this;
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.default.get(message_1.MSG.SF00501.INF003)
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        this.service.sf0050103().then(function () {
            // sort data
            _this.pageData.deals.reverse();
            _this.pageData.displayTable = false;
            _this.pageData.showDealList = true;
            _this.notifyDone(notify);
        }).catch(function (err) {
            _this.notifyDone(notify);
        });
    };
    // view deal detail by deal code
    SF00501Page.prototype.dealDetail = function (dealCode) {
        this.navigate(screen_url_1.ScreenUrl.SF00301 + "/" + dealCode);
    };
    Object.defineProperty(SF00501Page.prototype, "isViewDeal", {
        get: function () {
            return this.pageData.showDealList;
        },
        enumerable: true,
        configurable: true
    });
    SF00501Page = __decorate([
        core_1.Component({
            templateUrl: "SF00501.page.html",
            styleUrls: ["SF00501.page.css"],
            providers: [SF00501_service_1.SF00501Service],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, SF00501_service_1.SF00501Service, CC00100_service_1.CC00100Service, core_1.ApplicationRef])
    ], SF00501Page);
    return SF00501Page;
}(common_page_1.CommonPage));
exports.SF00501Page = SF00501Page;
//# sourceMappingURL=SF00501.page.js.map