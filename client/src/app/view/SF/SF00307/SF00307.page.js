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
var common_page_1 = require("../COMMON/common.page");
var Header_provider_1 = require("../SF00100/Header.provider");
var constants_1 = require("../../../helper/constants");
var SF00307_service_1 = require("./SF00307.service");
var message_1 = require("../../../helper/message");
var mst_data_type_1 = require("../../../helper/mst-data-type");
var SF00307_PAGE_TITLE = "受注登録（製造・出荷指示）";
var SF00307Page = (function (_super) {
    __extends(SF00307Page, _super);
    /**
     * Constructor page
     * @param router
     * @param route
     * @param pageService
     * @param headerProvider
     * @param location
     */
    function SF00307Page(router, route, pageService, headerProvider) {
        _super.call(this, router, route, headerProvider);
        this.pageService = pageService;
    }
    // init breadcrumb
    SF00307Page.prototype.initBreadcrumb = function () {
        var self = this;
        var sf0301Path = "/home/deal/" + self.route.snapshot.params["dealCode"];
        self.headerProvider.reset();
        self.headerProvider.pageName = SF00307_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]); //Dashboard
        self.headerProvider.addBreadCrumb(constants_1.Constants.DEAL_OVERVIEW_BREADCRUMB, [sf0301Path]); //SF003-01
        self.headerProvider.addBreadCrumb('受注登録');
    };
    Object.defineProperty(SF00307Page.prototype, "pageData", {
        get: function () {
            return this.pageService.pageData;
        },
        enumerable: true,
        configurable: true
    });
    SF00307Page.prototype.viewProductInfo = function (product) {
        if (product.productType == 0 && product.shapeId == 98) {
            this.router.navigate(["/home/deal", this.pageData.dealInfo.dealCode, 'product', product.productCode, 'decorative']);
        }
        else if (product.productType == 1) {
            this.router.navigate(["/home/deal", this.pageData.dealInfo.dealCode, 'product', product.productCode, 'carton']);
        }
        else {
            this.router.navigate(["/home/deal", this.pageData.dealInfo.dealCode, 'product', product.productCode]);
        }
    };
    SF00307Page.prototype.viewQuotationInfo = function (quotationCode) {
        this.router
            .navigate([("/home/deal/" + this.pageData.dealInfo.dealCode + "/quotation/" + quotationCode)])
            .then(null);
    };
    SF00307Page.prototype.findDataProductInfo = function (quotationId) {
        var _this = this;
        // get list product by quotationId
        // cal service api update list productBoxs
        this.pageService.findProductList(quotationId, this.pageData.dealInfo.dealId).catch(function (err) {
            _this.navigate('home/deal');
        });
    };
    SF00307Page.prototype.exportPdf = function (productId, dealCode) {
        var self = this;
        this.pageService.exportProduction(productId, dealCode)
            .then(function (result) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00307.INF002) }, { type: 'success' });
            var link = document.createElement('a');
            link.setAttribute('download', result.fileName);
            link.href = result.filePath;
            link.click();
        })
            .catch(function (err) {
            swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00307.ERR004), "error");
        });
    };
    SF00307Page.prototype.selectShippingDestination = function (target) {
        this.pageService.selectShippingDestination(target);
    };
    SF00307Page.prototype.setShiptimeForAllShippingInstructions = function (val) {
        this.pageService.setShiptimeForAllShippingInstructions(val);
    };
    SF00307Page.prototype.requestOrder = function () {
        var self = this;
        var urlStatus = "";
        if (this.pageData.dealInfo.dealStatus == mst_data_type_1.DEAL_STATUS_VALUES.ORDER_CONFIRMED) {
            urlStatus = "repeat-order";
        }
        else {
            urlStatus = "create-order";
        }
        // check customer in deal not null
        if (!this.pageData.dealInfo.customerCode) {
            var msgCode = "Customer is not selected yet";
            swal(constants_1.Constants.BLANK, message_1.default.get(msgCode), "error");
            return;
        }
        // check delivery date
        if (!this.pageData.dealInfo.deliveryDate) {
            var msgCode = "Delivery date is not undefined";
            swal(constants_1.Constants.BLANK, message_1.default.get(msgCode), "error");
            return;
        }
        App.loader("show");
        this.pageService.requestOrder().then(function () {
            App.loader("hide");
            var message = message_1.default.get(message_1.MSG.SF00307.INF003);
            swal({
                title: constants_1.Constants.BLANK,
                text: message,
                confirmButtonColor: '#66ccff',
                confirmButtonText: "閉じる",
            }, function () {
                self.router
                    .navigate(["home/deal", self.pageData.fallbackDeal, urlStatus])
                    .then(function () {
                    self.pageService
                        .initData(self.pageData.dealInfo.dealCode)
                        .then(function () {
                        self.initBreadcrumb();
                        $(window).scrollTop(0);
                    });
                });
            });
        }).catch(function (err) {
            var msgCode = err.code == "SF00307_ERR001" ? message_1.MSG.SF00307.ERR002 : message_1.MSG.SF00307.ERR003;
            swal(constants_1.Constants.BLANK, message_1.default.get(msgCode), "error");
        });
    };
    SF00307Page.prototype.backToSF00301 = function () {
        this.router.navigate(["home/deal", this.pageData.dealInfo.dealCode]).then(null);
    };
    SF00307Page.prototype.productBoxCheckChanged = function ($event, productBox) {
        if (!!$event.target.checked)
            if (!productBox.product.unitPrice) {
                swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00307.ERR001), "warning");
                $event.target.checked = false;
                return;
            }
            else {
                this.pageService.addProductShippingInstruction(productBox);
            }
        else {
            this.pageService.removeProductShippingInstruction(productBox);
        }
    };
    SF00307Page = __decorate([
        core_1.Component({
            templateUrl: 'SF00307.page.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, SF00307_service_1.SF00307Service, Header_provider_1.HeaderProvider])
    ], SF00307Page);
    return SF00307Page;
}(common_page_1.CommonPage));
exports.SF00307Page = SF00307Page;
//# sourceMappingURL=SF00307.page.js.map