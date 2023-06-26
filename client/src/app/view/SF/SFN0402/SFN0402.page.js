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
var SFN0402_service_1 = require("./SFN0402.service");
var SFN0402_data_1 = require("./SFN0402.data");
var SFN0402_constants_1 = require("./SFN0402.constants");
var constants_1 = require("../../../helper/constants");
var message_1 = require("../../../helper/message");
var SFN040206_MailModal_component_1 = require("./component/SFN040206.MailModal.component");
var path_util_1 = require("../../../util/path-util");
/**
 * 取引先照会画面
 */
var SFN0402Page = (function (_super) {
    __extends(SFN0402Page, _super);
    //region Initialize page
    function SFN0402Page(router, route, headerProvider, service, authService) {
        _super.call(this, router, route, headerProvider);
        this.router = router;
        this.route = route;
        this.headerProvider = headerProvider;
        this.service = service;
        // init page data
        this.pageData = new SFN0402_data_1.SFN0402Data();
        service.pageData = this.pageData;
        this.showSP = false;
        this.showRPC = false;
        this.showSPC = false;
        this.showPPC = false;
        this.showSDL = false;
    }
    // init breadcrumb
    SFN0402Page.prototype.initBreadcrumb = function () {
        var self = this;
        var sfn0401Path = screen_url_1.ScreenUrl.SFN0401;
        self.headerProvider.reset();
        self.headerProvider.pageName = "取引先照会";
        self.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]); //Dashboard
        self.headerProvider.addBreadCrumb("取引先検索", [sfn0401Path]); //SF003-01
        self.headerProvider.addBreadCrumb("取引先照会");
    };
    // get data on page load
    SFN0402Page.prototype.ngOnInit = function () {
        var _this = this;
        this.service.navigateTo("取引先照会", this.router.url);
        // check screen mode
        var customerCode = this.route.snapshot.params["customerCode"];
        var supplierCode = this.route.snapshot.params["supplierCode"];
        if (customerCode != undefined) {
            this.pageData.partnerType = SFN0402_constants_1.SFN0402Constants.TYPE_CUSTOMER;
            this.pageData.partnerCode = customerCode;
        }
        else if (supplierCode != undefined) {
            this.pageData.partnerType = SFN0402_constants_1.SFN0402Constants.TYPE_SUPPLIER;
            this.pageData.partnerCode = supplierCode;
        }
        // get basic info
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SFN0402.INF001
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        this.service.sfn040201().then(function () {
            // 届け先一覧を取得する (得意先の場合のみ)
            if (_this.pageData.partnerType == SFN0402_constants_1.SFN0402Constants.TYPE_CUSTOMER) {
                return _this.service.sfn040213GetShippingDestinationList(_this.pageData.partner.code)
                    .then(function (shippingDestinationList) {
                    _this.shippingDestinationList = shippingDestinationList;
                });
            }
        })
            .then(function () {
            _this.notifyDone(notify);
            // show revenue panel
            _this.showRPC = true;
            // show other panels
            if (_this.pageData.partnerType == SFN0402_constants_1.SFN0402Constants.TYPE_CUSTOMER) {
                _this.showSP = true;
                _this.showSPC = true;
                _this.showPPC = true;
                _this.showSDL = true;
            }
        })
            .catch(function (err) {
            _this.notifyDone(notify);
            swal({
                title: "",
                text: message_1.MSG.SFN0402.ERR001,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d26a5c",
                confirmButtonText: "Yes",
                closeOnConfirm: true
            }, function (res) { return _this.goBack(); });
        });
    };
    Object.defineProperty(SFN0402Page.prototype, "isCustomer", {
        //endregion
        //region Bindings
        get: function () {
            return (this.pageData.partnerType == SFN0402_constants_1.SFN0402Constants.TYPE_CUSTOMER);
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Actions
    SFN0402Page.prototype.navigateToDeal = function (dealCode) {
        this.navigate2(['home/deal', dealCode]);
    };
    SFN0402Page.prototype.navigateToProduct = function (product) {
        var productType = product.type;
        var shapeId = product.shapeId;
        var productCode = product.code;
        var dealCode = product.dealCode;
        var cartonShippingType = product.cartonShippingType;
        path_util_1.PathUtil.redirectToPageProduct(this.router, dealCode, productCode, productType, shapeId, cartonShippingType);
    };
    SFN0402Page.prototype.goBack = function () {
        this.navigate(screen_url_1.ScreenUrl.SFN0401);
    };
    SFN0402Page.prototype.saveMemo = function () {
        var _this = this;
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SFN0402.INF002
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        return this.service.sfn040206().then(function () {
            _this.notifyDone(notify);
        });
    };
    SFN0402Page.prototype.loadSalesPerformance = function () {
        return this.service.sfn040202();
    };
    SFN0402Page.prototype.loadRevenuePanel = function () {
        if (this.pageData.partnerType == SFN0402_constants_1.SFN0402Constants.TYPE_CUSTOMER) {
            return this.service.sfn040203();
        }
        else if (this.pageData.partnerType == SFN0402_constants_1.SFN0402Constants.TYPE_SUPPLIER) {
            return this.service.sfn040212();
        }
    };
    SFN0402Page.prototype.loadStockPanel = function () {
        return this.service.sfn040204();
    };
    SFN0402Page.prototype.loadProductPanel = function () {
        return this.service.sfn040205();
    };
    SFN0402Page.prototype.showMail = function (type) {
        this.sfn040206.show(type);
    };
    SFN0402Page.prototype.sendMail = function (type) {
        var service = Promise.resolve();
        if (type == SFN0402_constants_1.SFN0402Constants.MAIL_PRODUCT_DISPOSAL) {
            service = this.service.sfn040207();
        }
        else if (type == SFN0402_constants_1.SFN0402Constants.MAIL_WOODEN_RETURN) {
            service = this.service.sfn040209();
        }
        else if (type == SFN0402_constants_1.SFN0402Constants.MAIL_WOODEN_PENDING) {
            service = this.service.sfn040210();
        }
        service = service.then(function () {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.MSG.SFN0402.INF003,
                confirmButtonColor: '#66ccff',
                confirmButtonText: "閉じる",
            });
        }, function (err) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.MSG.SFN0402.ERR002,
                type: "error",
            });
        });
        return service;
    };
    SFN0402Page.prototype.repeatOrder = function () {
        var product = this.pageData.selectedProduct;
        this.navigate2(["home", "deal", product.dealCode, "repeat-order"]);
    };
    SFN0402Page.prototype.shippingStock = function () {
        var inventory = this.pageData.selectedInventory;
        var product = inventory.product;
        this.navigate2(["home", "deal", product.dealCode, "order"], {
            queryParams: {
                "product": product.code,
                "stock": product.quantity
            }
        });
    };
    SFN0402Page.prototype.exportStocks = function () {
        return this.service.sfn040208()
            .then(function (result) {
            $.notify({ message: message_1.MSG.SFN0402.INF004 }, { type: 'success' });
            var link = document.createElement('a');
            link.setAttribute('download', result.fileName);
            link.href = result.filePath;
            link.click();
        })
            .catch(function (err) {
            swal(constants_1.Constants.BLANK, message_1.MSG.SFN0402.ERR003, "error");
        });
    };
    SFN0402Page.prototype.exportProducts = function () {
        return this.service.sfn040211()
            .then(function (result) {
            $.notify({ message: message_1.MSG.SFN0402.INF004 }, { type: 'success' });
            var link = document.createElement('a');
            link.setAttribute('download', result.fileName);
            link.href = result.filePath;
            link.click();
        })
            .catch(function (err) {
            swal(constants_1.Constants.BLANK, message_1.MSG.SFN0402.ERR003, "error");
        });
    };
    /**
     * 届け先編集画面へ遷移
     *
     * @param customerCode 得意先 ID
     * @param shippingDestinationId 届け先 ID
     */
    SFN0402Page.prototype.showShippingDestination = function (customerCode, shippingDestinationId) {
        this.router.navigate([screen_url_1.ScreenUrl.SFN0402, customerCode, 'shipping-destination', shippingDestinationId]);
    };
    //endregion
    //region functions
    SFN0402Page.prototype.notifyDone = function (notify) {
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
        core_1.ViewChild(SFN040206_MailModal_component_1.SFN040206Component), 
        __metadata('design:type', SFN040206_MailModal_component_1.SFN040206Component)
    ], SFN0402Page.prototype, "sfn040206", void 0);
    SFN0402Page = __decorate([
        core_1.Component({
            templateUrl: "SFN0402.page.html",
            styleUrls: ["SFN0402.page.css"],
            providers: [SFN0402_service_1.SFN0402Service],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, SFN0402_service_1.SFN0402Service, CC00100_service_1.CC00100Service])
    ], SFN0402Page);
    return SFN0402Page;
}(common_page_1.CommonPage));
exports.SFN0402Page = SFN0402Page;
//# sourceMappingURL=SFN0402.page.js.map