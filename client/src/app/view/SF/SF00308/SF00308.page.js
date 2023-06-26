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
var common_page_1 = require("../COMMON/common.page");
var router_1 = require("@angular/router");
var SF00308_service_1 = require("./SF00308.service");
var constants_1 = require("../../../helper/constants");
var math_util_1 = require("../../../util/math-util");
var Header_provider_1 = require("../SF00100/Header.provider");
var data_util_1 = require("../../../util/data-util");
var mst_data_type_1 = require("../../../helper/mst-data-type");
/**
 * Created by hoangtd on 3/16/2017.
 */
var SF00308_PAGE_TITLE = '案件チェックシート';
var SF00308Page = (function (_super) {
    __extends(SF00308Page, _super);
    function SF00308Page(router, route, pageService, headerProvider) {
        _super.call(this, router, route, headerProvider);
        this.pageService = pageService;
    }
    Object.defineProperty(SF00308Page.prototype, "pageData", {
        get: function () {
            return this.pageService.pageData;
        },
        enumerable: true,
        configurable: true
    });
    SF00308Page.prototype.ngOnInit = function () {
        this.pageService.navigateTo("案件チェックシート", this.router.url);
    };
    SF00308Page.prototype.initBreadcrumb = function () {
        var self = this;
        var sf0301Path = "/home/deal/" + self.route.snapshot.params["dealCode"]; //SF003-01
        self.headerProvider.reset();
        self.headerProvider.pageName = SF00308_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]);
        self.headerProvider.addBreadCrumb(constants_1.Constants.DEAL_OVERVIEW_BREADCRUMB, [sf0301Path]);
        self.headerProvider.addBreadCrumb("案件チェックシート");
    };
    SF00308Page.prototype.saveDataTab = function (tabNumber) {
        var answersTab = this.pageData.answersMap.filter(function (item) {
            return math_util_1.default.round(item.questionCode / 1000, 0) == tabNumber;
        });
        this.pageService.saveData(answersTab);
    };
    SF00308Page.prototype.backToSF00301 = function () {
        this.router.navigate(["home/deal", this.pageData.dealCode]);
    };
    Object.defineProperty(SF00308Page.prototype, "dealCode", {
        get: function () {
            return this.pageData.dealCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00308Page.prototype, "dealName", {
        get: function () {
            return this.pageData.dealName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00308Page.prototype, "customerCode", {
        get: function () {
            return this.pageData.customerId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00308Page.prototype, "customerName", {
        get: function () {
            return this.pageData.customerName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00308Page.prototype, "deliveryDate", {
        get: function () {
            return this.pageData.deliveryDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00308Page.prototype, "estimateMoney", {
        get: function () {
            return this.pageData.estMoney;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00308Page.prototype, "saleAndDepartment", {
        // sale name
        get: function () {
            if (this.pageData.saleName) {
                return this.pageData.saleName;
            }
            return constants_1.Constants.BLANK;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00308Page.prototype, "dealType", {
        get: function () {
            return data_util_1.default.getData(mst_data_type_1.DEAL_TYPE, constants_1.Constants.BLANK, this.pageData.dealType);
        },
        enumerable: true,
        configurable: true
    });
    SF00308Page = __decorate([
        core_1.Component({
            templateUrl: 'SF00308.page.html',
            styleUrls: ['./SF00308.page.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, SF00308_service_1.SF00308Service, Header_provider_1.HeaderProvider])
    ], SF00308Page);
    return SF00308Page;
}(common_page_1.CommonPage));
exports.SF00308Page = SF00308Page;
//# sourceMappingURL=SF00308.page.js.map