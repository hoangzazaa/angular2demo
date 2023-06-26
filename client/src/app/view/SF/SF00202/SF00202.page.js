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
var Header_provider_1 = require("../SF00100/Header.provider");
var message_1 = require("../../../helper/message");
var common_page_1 = require("../COMMON/common.page");
var SF00202_service_1 = require("./SF00202.service");
var SF00202_PAGE_TITLE = "新規案件追加";
/**
 * 案件検索(受注後)
 */
var SF00202Page = (function (_super) {
    __extends(SF00202Page, _super);
    function SF00202Page(route, router, headerProvider, sf00202Service) {
        _super.call(this, router, route, headerProvider);
        this.sf00202Service = sf00202Service;
        this.sf00202Service.navigateTo("案件検索(受注後)", router.url);
    }
    SF00202Page.prototype.pageTile = function () {
        return SF00202_PAGE_TITLE;
    };
    Object.defineProperty(SF00202Page.prototype, "pageData", {
        get: function () {
            return this.sf00202Service.pageData;
        },
        enumerable: true,
        configurable: true
    });
    SF00202Page.prototype.copyDeal = function (deal) {
        this.router.navigate(['home/deal/create'], { queryParams: { from: deal.dealCode } }).then(function () {
        });
    };
    SF00202Page.prototype.viewDealDetail = function (deal) {
        if (deal.isOpeningNewTab) {
            window.open('home/deal/' + deal.dealCode, '_blank');
        }
        else {
            this.router.navigate(['home/deal', deal.dealCode]).then(function () {
            });
        }
    };
    // 使われない機能のため使用禁止 (trello: 1099)
    SF00202Page.prototype.bookmarkDeal = function (deal) {
        this.sf00202Service.bookmarkDeal(deal)
            .then(function () {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00202.INF001) }, { type: 'success' });
        });
    };
    SF00202Page.prototype.onPageChanged = function (pageIndex) {
        var _this = this;
        App.loader('show');
        this.sf00202Service
            .getResult(pageIndex)
            .then(function () { return _this.$scrollTop("#dealsList"); })
            .then(function () { return App.loader('hide'); });
    };
    SF00202Page.prototype.setAdvancedSearchOnAndStartSearch = function (ruleFilter) {
        this.pageData.advancedSearchFlg = true;
        this.pageData.ruleFilter = ruleFilter;
        App.loader('show');
        this.sf00202Service.getResult().then(function () { return App.loader('hide'); });
    };
    SF00202Page.prototype.onKeywordsChange = function (tags) {
        this.sf00202Service.pageData.keywords = tags;
        this.onPageChanged();
    };
    SF00202Page = __decorate([
        core_1.Component({
            templateUrl: "./SF00202.page.html"
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, Header_provider_1.HeaderProvider, SF00202_service_1.SF00202Service])
    ], SF00202Page);
    return SF00202Page;
}(common_page_1.CommonPage));
exports.SF00202Page = SF00202Page;
//# sourceMappingURL=SF00202.page.js.map