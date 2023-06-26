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
var common_page_1 = require("../COMMON/common.page");
var SF00203_service_1 = require("./SF00203.service");
var SF00203_PAGE_TITLE = "新規案件追加";
var SF00203Page = (function (_super) {
    __extends(SF00203Page, _super);
    function SF00203Page(router, route, headerProvider, sf00203Service) {
        _super.call(this, router, route, headerProvider);
        this.sf00203Service = sf00203Service;
    }
    SF00203Page.prototype.pageTile = function () {
        return SF00203_PAGE_TITLE;
    };
    Object.defineProperty(SF00203Page.prototype, "pageData", {
        get: function () {
            return this.sf00203Service.sf00203Data;
        },
        enumerable: true,
        configurable: true
    });
    SF00203Page.prototype.viewDealDetail = function (deal) {
        this.router.navigate(['home/deal', deal.dealCode]).then(function () {
        });
    };
    SF00203Page.prototype.copyDeal = function (deal) {
        this.router.navigate(['home/deal/create'], { queryParams: { from: deal.dealCode } }).then(function () {
        });
    };
    SF00203Page.prototype.getResult = function (pageIndex) {
        var _this = this;
        App.loader('show');
        this.sf00203Service
            .getResults(pageIndex)
            .then(function () { return _this.$scrollTop("#myboxItems"); })
            .then(function () { return App.loader('hide'); });
    };
    SF00203Page = __decorate([
        core_1.Component({
            templateUrl: "./SF00203.page.html"
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, SF00203_service_1.SF00203Service])
    ], SF00203Page);
    return SF00203Page;
}(common_page_1.CommonPage));
exports.SF00203Page = SF00203Page;
//# sourceMappingURL=SF00203.page.js.map