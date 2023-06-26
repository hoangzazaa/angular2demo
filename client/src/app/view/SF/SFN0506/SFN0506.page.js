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
var message_1 = require("../../../helper/message");
var CC00100_service_1 = require("../../CC/CC00100/CC00100.service");
var screen_url_1 = require("../../../helper/screen-url");
var SFN0506_service_1 = require("./SFN0506.service");
var SFN0506_data_1 = require("./SFN0506.data");
var SFN0506_constants_1 = require("./SFN0506.constants");
var constants_1 = require("../../../helper/constants");
var SFN050602_PaymentList_component_1 = require("./component/SFN050602.PaymentList.component");
var date_util_1 = require("../../../util/date-util");
var SFN0506Page = (function (_super) {
    __extends(SFN0506Page, _super);
    //region Initialize page
    function SFN0506Page(router, route, headerProvider, service, authService) {
        _super.call(this, router, route, headerProvider);
        this.router = router;
        this.route = route;
        this.headerProvider = headerProvider;
        this.service = service;
        // init page data
        this.pageData = new SFN0506_data_1.SFN0506Data();
        service.pageData = this.pageData;
        // get current user
        this.user = authService.user;
    }
    SFN0506Page.prototype.pageTile = function () {
        return "入金状況照会";
    };
    //endregion
    // get data on page load
    SFN0506Page.prototype.ngOnInit = function () {
        var _this = this;
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SFN0506.INF001
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        // setting default filter
        var currentFilter = this.pageData.currentFilter;
        currentFilter.dateType = 1;
        currentFilter.method = 0;
        // load data
        this.service.sfn050601().then(function () {
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
                // find default user
                var cUser = SFN0506_constants_1.SFN0506Constants.OPTION_ALL_USER;
                if (_this.user.role == constants_1.Constants.USER_ROLE_STAFF) {
                    // find current user
                    var userList = _this.pageData.dataRepo.getUsers(curDepartment.id);
                    for (var _b = 0, userList_1 = userList; _b < userList_1.length; _b++) {
                        var user = userList_1[_b];
                        if (user.id == _this.user.id) {
                            cUser = user;
                            break;
                        }
                    }
                }
                // department found, select department
                _this.selectDepartment(curDepartment, cUser);
            }
            else {
                // default select department[0]
                if (_this.pageData.departments.length > 0) {
                    _this.selectDepartment(_this.pageData.departments[0]);
                }
            }
            // set filter time
            currentFilter.startDate = date_util_1.DateUtil.toLocalTime(date_util_1.DateUtil.getStartOfMonth(_this.pageData.currentTime));
            currentFilter.endDate = date_util_1.DateUtil.toLocalTime(date_util_1.DateUtil.getEndOfMonth(_this.pageData.currentTime));
            // notify update and close
            _this.notifyDone(notify);
            // load data
            _this.loadData();
        });
    };
    //region bindings
    //endregion
    //region Actions
    // set selected department
    SFN0506Page.prototype.selectDepartment = function (value, defaultUser) {
        if (defaultUser === void 0) { defaultUser = SFN0506_constants_1.SFN0506Constants.OPTION_ALL_USER; }
        // set department
        this.pageData.currentFilter.department = value;
        // change user list to department's user
        this.pageData.users = this.pageData.dataRepo.getUsers(this.pageData.currentFilter.department.id);
        // select default user
        this.pageData.currentFilter.user = defaultUser;
    };
    SFN0506Page.prototype.loadData = function () {
        var _this = this;
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SFN0506.INF002
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        notify.update("progress", 10);
        return this.service.sfn050602().then(function () {
            // set page to 1st
            _this.pageData.page = 1;
            // reload data
            _this.sfn050602.reloadData(true);
            // notify update and close
            _this.notifyDone(notify);
        }, function (err) {
            _this.notifyDone(notify);
            swal({
                title: "",
                text: message_1.MSG.SFN0506.WRN001,
                type: "warning",
                confirmButtonColor: "#d26a5c",
                confirmButtonText: "OK",
                html: false,
            });
        });
    };
    SFN0506Page.prototype.navigateToCustomer = function (payment) {
        var customerCode = payment.customerCode;
        this.navigate2(["home", "customer", customerCode]);
    };
    SFN0506Page.prototype.goBack = function () {
        this.navigate(screen_url_1.ScreenUrl.SF001);
    };
    //endregion
    //region functions
    // set selected user
    SFN0506Page.prototype.notifyDone = function (notify) {
        // notify update and close
        notify.update("progress", 100);
        notify.update("type", "success");
        setTimeout(function (ntf) {
            ntf.close();
        }, 1000, notify);
        // hide content loader
        OneUI.contentLoader('hide');
    };
    __decorate([
        core_1.ViewChild(SFN050602_PaymentList_component_1.SFN050602Component), 
        __metadata('design:type', SFN050602_PaymentList_component_1.SFN050602Component)
    ], SFN0506Page.prototype, "sfn050602", void 0);
    SFN0506Page = __decorate([
        core_1.Component({
            templateUrl: "SFN0506.page.html",
            styleUrls: ["SFN0506.page.css"],
            providers: [SFN0506_service_1.SFN0506Service],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, SFN0506_service_1.SFN0506Service, CC00100_service_1.CC00100Service])
    ], SFN0506Page);
    return SFN0506Page;
}(common_page_1.CommonPage));
exports.SFN0506Page = SFN0506Page;
//# sourceMappingURL=SFN0506.page.js.map