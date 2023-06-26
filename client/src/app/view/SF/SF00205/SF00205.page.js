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
var CC00100_service_1 = require("../../CC/CC00100/CC00100.service");
var common_page_1 = require("../COMMON/common.page");
var Header_provider_1 = require("../SF00100/Header.provider");
var SF00205_Request_model_1 = require("./model/SF00205_Request.model");
var SF00205_service_1 = require("./SF00205.service");
var SF00205_PAGE_TITLE = "案件検索（仕掛中）";
var SF00205Page = (function (_super) {
    __extends(SF00205Page, _super);
    function SF00205Page(router, route, headerProvider, authService, service) {
        _super.call(this, router, route, headerProvider);
        this.authService = authService;
        this.service = service;
    }
    SF00205Page.prototype.pageTile = function () {
        return SF00205_PAGE_TITLE;
    };
    SF00205Page.prototype.ngOnInit = function () {
        this.service.navigateTo("案件検索（仕掛中）", this.router.url);
        var departmentId = this.authService.user.departmentId;
        var picId = this.authService.user.id;
        // get department
        var department = this.pageData.departments.find(function (department) {
            return department.id == departmentId;
        });
        if (!!department) {
            // list pics by departments
            this.pageData.pics = department.users;
        }
        else {
            departmentId = 0;
            picId = 0;
        }
        // store default value of department id & pic id
        this.pageData.defaultDepartmentId = departmentId;
        this.pageData.defaultPicId = picId;
        // init filter
        this.pageData.requestModel.filter.selectedDepartmentId = departmentId;
        this.pageData.requestModel.filter.selectedPicId = picId;
    };
    Object.defineProperty(SF00205Page.prototype, "pageData", {
        get: function () {
            return this.service.pageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00205Page.prototype, "deals", {
        get: function () {
            return this.pageData.deals;
        },
        enumerable: true,
        configurable: true
    });
    SF00205Page.prototype.searchDeal = function (filter) {
        var _this = this;
        this.pageData.isDisable = true;
        var req = new SF00205_Request_model_1.SF00205Request();
        req.filter = filter;
        this.service.getDeals(req).then(function () { return _this.pageData.isDisable = false; }).catch(function (err) {
            console.log('SF00205Page#searchDeal -> ' + err.statusText);
        });
    };
    SF00205Page.prototype.viewDealDetail = function (deal) {
        if (deal.isOpeningNewTab) {
            window.open('home/deal/' + deal.dealCode, '_blank');
        }
        else {
            this.navigate('/home/deal/' + deal.dealCode);
        }
    };
    SF00205Page.prototype.bookmarkDeal = function (deal) {
        this.service.bookmarkDeal(deal).then(function () {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00205.INF001) }, { type: 'success' });
        });
    };
    SF00205Page.prototype.copyDeal = function (deal) {
        this.navigate('home/deal/create', { queryParams: { from: deal.dealCode } });
    };
    Object.defineProperty(SF00205Page.prototype, "pageSize", {
        get: function () {
            return this.pageData.pageSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00205Page.prototype, "totalRecords", {
        get: function () {
            return this.pageData.totalRecords;
        },
        enumerable: true,
        configurable: true
    });
    SF00205Page.prototype.onPageChange = function (currentPage) {
        var _this = this;
        var offset = ((currentPage || constants_1.Constants.FIRST_PAGE) - 1) * this.pageData.pageSize;
        var limit = this.pageData.pageSize;
        var req = this.pageData.requestModel;
        req.indexFrom = offset;
        req.indexTo = limit;
        this.service.getDeals(req).then(function () { return _this.$scrollTop("#dealInfo"); }).catch(function (err) { return console.log(err.statusText); });
    };
    SF00205Page = __decorate([
        core_1.Component({
            templateUrl: "SF00205.page.html"
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, CC00100_service_1.CC00100Service, SF00205_service_1.SF00205Service])
    ], SF00205Page);
    return SF00205Page;
}(common_page_1.CommonPage));
exports.SF00205Page = SF00205Page;
//# sourceMappingURL=SF00205.page.js.map