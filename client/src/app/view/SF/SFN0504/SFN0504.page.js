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
var SFN0504_service_1 = require("./SFN0504.service");
var SFN0504_data_1 = require("./SFN0504.data");
var SFN0504_constants_1 = require("./SFN0504.constants");
var constants_1 = require("../../../helper/constants");
var SFN050402_StockList_component_1 = require("./component/SFN050402.StockList.component");
var path_util_1 = require("../../../util/path-util");
var SFN0504Page = (function (_super) {
    __extends(SFN0504Page, _super);
    //region Initialize page
    function SFN0504Page(router, route, headerProvider, service, authService) {
        _super.call(this, router, route, headerProvider);
        this.router = router;
        this.route = route;
        this.headerProvider = headerProvider;
        this.service = service;
        // init page data
        this.pageData = new SFN0504_data_1.SFN0504Data();
        service.pageData = this.pageData;
        // get current user
        this.user = authService.user;
    }
    // init breadcrumb
    SFN0504Page.prototype.initBreadcrumb = function () {
        var self = this;
        self.headerProvider.reset();
        self.headerProvider.pageName = "在庫状況照会";
        self.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]); //Dashboard
        self.headerProvider.addBreadCrumb("在庫状況照会");
    };
    //endregion
    // get data on page load
    SFN0504Page.prototype.ngOnInit = function () {
        var _this = this;
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SFN0504.INF001
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        // default filter
        var currentFilter = this.pageData.currentFilter;
        currentFilter.stockDays = 0;
        currentFilter.stockType = 0;
        // load data
        this.service.sfn050401().then(function () {
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
                var cUser = SFN0504_constants_1.SFN0504Constants.OPTION_ALL_USER;
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
    SFN0504Page.prototype.selectDepartment = function (value, defaultUser) {
        if (defaultUser === void 0) { defaultUser = SFN0504_constants_1.SFN0504Constants.OPTION_ALL_USER; }
        // set department
        this.pageData.currentFilter.department = value;
        // change user list to department's user
        this.pageData.users = this.pageData.dataRepo.getUsers(this.pageData.currentFilter.department.id);
        // select default user
        this.pageData.currentFilter.user = defaultUser;
    };
    SFN0504Page.prototype.loadData = function () {
        var _this = this;
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SFN0504.INF002
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        notify.update("progress", 10);
        return this.service.sfn050402().then(function () {
            // set page to 1st
            _this.pageData.page = 1;
            // reload data
            _this.sfn050402.reloadData(true);
            // notify update and close
            _this.notifyDone(notify);
        }, function (err) {
            _this.notifyDone(notify);
            swal({
                title: "",
                text: message_1.MSG.SFN0504.WRN001,
                type: "warning",
                confirmButtonColor: "#d26a5c",
                confirmButtonText: "OK",
                html: false,
            });
        });
    };
    SFN0504Page.prototype.navigateToCustomer = function (stock) {
        var customerCode = stock.customerCode;
        this.navigate2(["home", "customer", customerCode]);
    };
    SFN0504Page.prototype.navigateToDeal = function (stock) {
        var dealCode = stock.dealCode;
        this.navigate2(['home/deal', dealCode]);
    };
    SFN0504Page.prototype.navigateToProduct = function (stock) {
        var dealCode = stock.dealCode;
        var productType = stock.productType;
        var shapeId = stock.productShapeId;
        var productCode = stock.productCode;
        var cartonShippingType = stock.cartonShippingType;
        path_util_1.PathUtil.redirectToPageProduct(this.router, dealCode, productCode, productType, shapeId, cartonShippingType);
    };
    SFN0504Page.prototype.shippingStock = function (stock) {
        this.navigate2(["home", "deal", stock.dealCode, "order"], {
            queryParams: {
                "product": stock.productCode,
                "stock": stock.quantity
            }
        });
    };
    SFN0504Page.prototype.goBack = function () {
        this.navigate(screen_url_1.ScreenUrl.SF001);
    };
    //endregion
    //region functions
    // set selected user
    SFN0504Page.prototype.notifyDone = function (notify) {
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
        core_1.ViewChild(SFN050402_StockList_component_1.SFN050402Component), 
        __metadata('design:type', SFN050402_StockList_component_1.SFN050402Component)
    ], SFN0504Page.prototype, "sfn050402", void 0);
    SFN0504Page = __decorate([
        core_1.Component({
            templateUrl: "SFN0504.page.html",
            styleUrls: ["SFN0504.page.css"],
            providers: [SFN0504_service_1.SFN0504Service],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, SFN0504_service_1.SFN0504Service, CC00100_service_1.CC00100Service])
    ], SFN0504Page);
    return SFN0504Page;
}(common_page_1.CommonPage));
exports.SFN0504Page = SFN0504Page;
//# sourceMappingURL=SFN0504.page.js.map