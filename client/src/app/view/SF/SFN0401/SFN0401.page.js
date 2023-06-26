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
var SFN0401_service_1 = require("./SFN0401.service");
var SFN0401_data_1 = require("./SFN0401.data");
var SFN0401_constants_1 = require("./SFN0401.constants");
var path_util_1 = require("../../../util/path-util");
var SFN0401Page = (function (_super) {
    __extends(SFN0401Page, _super);
    //region Initialize page
    function SFN0401Page(router, route, headerProvider, service, authService) {
        _super.call(this, router, route, headerProvider);
        this.router = router;
        this.route = route;
        this.headerProvider = headerProvider;
        this.service = service;
        // init page data
        this.pageData = new SFN0401_data_1.SFN0401Data();
        service.pageData = this.pageData;
    }
    SFN0401Page.prototype.pageTile = function () {
        return "取引先検索";
    };
    //endregion
    // get data on page load
    SFN0401Page.prototype.ngOnInit = function () {
        this.service.navigateTo("取引先検索", this.router.url);
        // check screen mode
        this.pageData.dealCode = this.route.snapshot.params["dealCode"];
        this.pageData.productCode = this.route.snapshot.params["productCode"];
        if (this.pageData.productCode != undefined) {
            this.pageData.screenMode = SFN0401_constants_1.SFN0401Constants.MODE_SUPPLIER;
        }
        else if (this.pageData.dealCode != undefined) {
            this.pageData.screenMode = SFN0401_constants_1.SFN0401Constants.MODE_CUSTOMER;
        }
        else {
            this.pageData.screenMode = SFN0401_constants_1.SFN0401Constants.MODE_REPEAT;
        }
    };
    Object.defineProperty(SFN0401Page.prototype, "hits", {
        //region bindings
        get: function () {
            return this.pageData.hits;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN0401Page.prototype, "page", {
        get: function () {
            return this.pageData.currentFilter.page;
        },
        set: function (value) {
            // set page
            this.pageData.currentFilter.page = value;
            // apply filter
            this.doFilter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN0401Page.prototype, "partners", {
        get: function () {
            return this.pageData.partnerList;
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Actions
    SFN0401Page.prototype.navigateToPartner = function (partner, isOpeningNewTab) {
        var partnerCode = partner.code;
        var routePath;
        if (partner.type == SFN0401_constants_1.SFN0401Constants.PTYPE_CUSTOMER) {
            routePath = "customer";
        }
        else {
            // partner.type == SFN0401Constants.PTYPE_SUPPLIER
            routePath = "supplier";
        }
        if (isOpeningNewTab) {
            window.open('home/' + routePath + "/" + partnerCode, '_blank');
        }
        else {
            this.navigate2(["home", routePath, partnerCode]);
        }
    };
    SFN0401Page.prototype.navigateToDeal = function (dealCode) {
        this.navigate2(['home/deal', dealCode]);
    };
    SFN0401Page.prototype.navigateToProduct = function (product) {
        var productType = product.type;
        var shapeId = product.shapeId;
        var productCode = product.code;
        var dealCode = product.dealCode;
        var cartonShippingType = product.cartonShippingType;
        path_util_1.PathUtil.redirectToPageProduct(this.router, dealCode, productCode, productType, shapeId, cartonShippingType);
    };
    SFN0401Page.prototype.goBack = function () {
        var mode = this.pageData.screenMode;
        if (mode == SFN0401_constants_1.SFN0401Constants.MODE_REPEAT) {
            this.navigate(screen_url_1.ScreenUrl.SF001);
        }
        else if (mode == SFN0401_constants_1.SFN0401Constants.MODE_CUSTOMER) {
            this.navigateToDeal(this.pageData.dealCode);
        }
        else if (mode == SFN0401_constants_1.SFN0401Constants.MODE_SUPPLIER) {
        }
    };
    SFN0401Page.prototype.doFilter = function () {
        var _this = this;
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SFN0401.INF001
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        notify.update("progress", 10);
        var service = Promise.resolve();
        if (this.pageData.currentFilter.type == SFN0401_constants_1.SFN0401Constants.PTYPE_CUSTOMER) {
            service = this.service.sfn040101();
        }
        else if (this.pageData.currentFilter.type == SFN0401_constants_1.SFN0401Constants.PTYPE_SUPPLIER) {
            service = this.service.sfn040102();
        }
        return service.then(function () {
            // scroll top
            _this.$scrollTop();
            // notify update and close
            _this.notifyDone(notify);
        });
    };
    SFN0401Page.prototype.selectCustomer = function () {
        var _this = this;
        this.pageData.canSelectPartner = false;
        $.notify({ message: message_1.MSG.COM.INF999 }, { delay: 1000 });
        return Promise.resolve().then(function () {
            _this.pageData.canSelectPartner = true;
        });
    };
    SFN0401Page.prototype.selectSupplier = function () {
        var _this = this;
        this.pageData.canSelectPartner = false;
        $.notify({ message: message_1.MSG.COM.INF999 }, { delay: 1000 });
        return Promise.resolve().then(function () {
            _this.pageData.canSelectPartner = true;
        });
    };
    //endregion
    //region functions
    // set selected user
    SFN0401Page.prototype.notifyDone = function (notify) {
        // notify update and close
        notify.update("progress", 100);
        notify.update("type", "success");
        setTimeout(function (ntf) {
            ntf.close();
        }, 1000, notify);
        // hide content loader
        OneUI.contentLoader('hide');
    };
    SFN0401Page = __decorate([
        core_1.Component({
            templateUrl: "SFN0401.page.html",
            styleUrls: ["SFN0401.page.css"],
            providers: [SFN0401_service_1.SFN0401Service],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, SFN0401_service_1.SFN0401Service, CC00100_service_1.CC00100Service])
    ], SFN0401Page);
    return SFN0401Page;
}(common_page_1.CommonPage));
exports.SFN0401Page = SFN0401Page;
//# sourceMappingURL=SFN0401.page.js.map