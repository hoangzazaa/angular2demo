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
var SF00204_service_1 = require("./SF00204.service");
var common_page_1 = require("../COMMON/common.page");
var router_1 = require("@angular/router");
var Header_provider_1 = require("../SF00100/Header.provider");
var constants_1 = require("../../../helper/constants");
var message_1 = require("../../../helper/message");
var path_util_1 = require("../../../util/path-util");
var SF00204_PAGE_TITLE = "製品検索";
var SF00204Page = (function (_super) {
    __extends(SF00204Page, _super);
    function SF00204Page(route, router, pageService, headerProvider) {
        _super.call(this, router, route, headerProvider);
        this.pageService = pageService;
    }
    SF00204Page.prototype.ngOnInit = function () {
        // get dealCode
        this.pageData.dealCode = this.route.snapshot.params["dealCode"];
        this.pageService.navigateTo("製品検索", this.router.url);
    };
    Object.defineProperty(SF00204Page.prototype, "pageData", {
        get: function () {
            return this.pageService.pageData;
        },
        enumerable: true,
        configurable: true
    });
    // init breadcrumb
    SF00204Page.prototype.initBreadcrumb = function () {
        var self = this;
        var sf0301Path = "/home/deal/" + self.route.snapshot.params["dealCode"];
        self.headerProvider.reset();
        self.headerProvider.pageName = SF00204_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]); //Dashboard
        self.headerProvider.addBreadCrumb(constants_1.Constants.DEAL_OVERVIEW_BREADCRUMB, [sf0301Path]); //SF003-01
        self.headerProvider.addBreadCrumb(SF00204_PAGE_TITLE);
    };
    //1. page change data
    SF00204Page.prototype.onPageChanged = function (pageIndex) {
        var _this = this;
        App.loader('show');
        this.pageService
            .getResult(pageIndex)
            .then(function () { return _this.$scrollTop("#productsList"); })
            .then(function () { return App.loader('hide'); })
            .catch(function (err) { return _this.navigate("/home"); });
    };
    //2. add product to deal
    SF00204Page.prototype.addProductToDeal = function (productBox) {
        var _this = this;
        this.pageService.addProductToDeal(productBox.product.id, productBox.dealCode, this.pageData.dealCode).then(function (productCode) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00204.INF001) }, { type: 'info' });
            // redirect to deal
            _this.navigate("/home/deal/" + _this.pageData.dealCode);
        }).catch(function (err) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00204.ERR001) }, { type: 'danger' });
        });
    };
    SF00204Page.prototype.viewProductInfo = function (product, dealCode) {
        path_util_1.PathUtil.redirectToPageProduct(this.router, dealCode, product.productCode, product.productType, product.shapeId, product.cartonShippingType);
    };
    // check add product to deal == true
    SF00204Page.prototype.isAddProductToDeal = function (productBox) {
        return productBox.product.requestDesignFlag != 1;
    };
    SF00204Page.prototype.setAdvancedSearchOnAndStartSearch = function (ruleFilter) {
        var _this = this;
        this.pageData.advancedSearchFlg = true;
        this.pageData.ruleFilter = ruleFilter;
        App.loader('show');
        this.pageService.getResult().then(function () { return App.loader('hide'); }).catch(function (err) {
            return _this.navigate("/home");
        });
    };
    SF00204Page.prototype.onKeywordsChange = function (tags) {
        this.pageService.pageData.keywords = tags;
        this.onPageChanged();
    };
    SF00204Page.prototype.backToSF00301 = function () {
        this.navigate("/home/deal/" + this.pageData.dealCode);
    };
    SF00204Page = __decorate([
        core_1.Component({
            templateUrl: 'SF00204.page.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, SF00204_service_1.SF00204Service, Header_provider_1.HeaderProvider])
    ], SF00204Page);
    return SF00204Page;
}(common_page_1.CommonPage));
exports.SF00204Page = SF00204Page;
//# sourceMappingURL=SF00204.page.js.map