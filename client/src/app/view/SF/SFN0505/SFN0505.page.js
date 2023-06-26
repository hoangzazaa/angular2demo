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
var SFN0505_service_1 = require("./SFN0505.service");
var SFN0505_data_1 = require("./SFN0505.data");
var SFN0505_constants_1 = require("./SFN0505.constants");
var constants_1 = require("../../../helper/constants");
var SFN050502_ShippingList_component_1 = require("./component/SFN050502.ShippingList.component");
var path_util_1 = require("../../../util/path-util");
var SFN0505Page = (function (_super) {
    __extends(SFN0505Page, _super);
    //region Initialize page
    function SFN0505Page(router, route, headerProvider, service, authService) {
        _super.call(this, router, route, headerProvider);
        this.router = router;
        this.route = route;
        this.headerProvider = headerProvider;
        this.service = service;
        // init page data
        this.pageData = new SFN0505_data_1.SFN0505Data();
        service.pageData = this.pageData;
        // get current user
        this.user = authService.user;
    }
    SFN0505Page.prototype.pageTile = function () {
        return "出荷状況照会";
    };
    //endregion
    // get data on page load
    SFN0505Page.prototype.ngOnInit = function () {
        var _this = this;
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SFN0505.INF001
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        // setting default start/end date
        var now = moment();
        this.pageData.currentFilter.startDate = moment.utc().startOf("month").toDate();
        this.pageData.currentFilter.endDate = moment.utc().endOf("month").toDate();
        // load data
        this.service.sfn050501().then(function () {
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
                var cUser = SFN0505_constants_1.SFN0505Constants.OPTION_ALL_USER;
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
    SFN0505Page.prototype.selectDepartment = function (value, defaultUser) {
        if (defaultUser === void 0) { defaultUser = SFN0505_constants_1.SFN0505Constants.OPTION_ALL_USER; }
        // set department
        this.pageData.currentFilter.department = value;
        // change user list to department's user
        this.pageData.users = this.pageData.dataRepo.getUsers(this.pageData.currentFilter.department.id);
        // select default user
        this.pageData.currentFilter.user = defaultUser;
    };
    SFN0505Page.prototype.loadData = function () {
        var _this = this;
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SFN0505.INF002
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        notify.update("progress", 10);
        return this.service.sfn050502().then(function () {
            // set page to 1st
            _this.pageData.page = 1;
            // reload data
            _this.sfn050502.reloadData(true);
            // notify update and close
            _this.notifyDone(notify);
        }, function (err) {
            _this.notifyDone(notify);
            swal({
                title: "",
                text: message_1.MSG.SFN0505.WRN001,
                type: "warning",
                confirmButtonColor: "#d26a5c",
                confirmButtonText: "OK",
                html: false,
            });
        });
    };
    SFN0505Page.prototype.navigateToCustomer = function (shipping) {
        var customerCode = shipping.customerCode;
        this.navigate2(["home", "customer", customerCode]);
    };
    SFN0505Page.prototype.navigateToDeal = function (shipping) {
        var dealCode = shipping.dealCode;
        this.navigate2(['home/deal', dealCode]);
    };
    SFN0505Page.prototype.navigateToProduct = function (shipping) {
        var dealCode = shipping.dealCode;
        var productType = shipping.productType;
        var shapeId = shipping.productShapeId;
        var productCode = shipping.productCode;
        var cartonShippingType = shipping.cartonShippingType;
        path_util_1.PathUtil.redirectToPageProduct(this.router, dealCode, productCode, productType, shapeId, cartonShippingType);
    };
    SFN0505Page.prototype.goBack = function () {
        this.navigate(screen_url_1.ScreenUrl.SF001);
    };
    //endregion
    //region functions
    // set selected user
    SFN0505Page.prototype.notifyDone = function (notify) {
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
        core_1.ViewChild(SFN050502_ShippingList_component_1.SFN050502Component), 
        __metadata('design:type', SFN050502_ShippingList_component_1.SFN050502Component)
    ], SFN0505Page.prototype, "sfn050502", void 0);
    SFN0505Page = __decorate([
        core_1.Component({
            templateUrl: "SFN0505.page.html",
            styleUrls: ["SFN0505.page.css"],
            providers: [SFN0505_service_1.SFN0505Service],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, SFN0505_service_1.SFN0505Service, CC00100_service_1.CC00100Service])
    ], SFN0505Page);
    return SFN0505Page;
}(common_page_1.CommonPage));
exports.SFN0505Page = SFN0505Page;
//# sourceMappingURL=SFN0505.page.js.map