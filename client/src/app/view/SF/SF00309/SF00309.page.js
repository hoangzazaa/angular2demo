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
var Header_provider_1 = require("../SF00100/Header.provider");
var constants_1 = require("../../../helper/constants");
var SF00309_service_1 = require("./SF00309.service");
var SF00309_MstData_1 = require("./SF00309.MstData");
var message_1 = require("../../../helper/message");
var screen_url_1 = require("../../../helper/screen-url");
var SF00309_helper_1 = require("./SF00309.helper");
var path_util_1 = require("../../../util/path-util");
var format_util_1 = require("../../../util/format-util");
var SF00309Page = (function (_super) {
    __extends(SF00309Page, _super);
    /**
     * Constructor page
     *
     * @param router
     * @param route
     * @param headerProvider
     * @param pageService
     */
    function SF00309Page(router, route, headerProvider, pageService) {
        _super.call(this, router, route, headerProvider);
        this.pageService = pageService;
    }
    SF00309Page.prototype.ngOnInit = function () {
        this.pageService.navigateTo(SF00309_MstData_1.MAIL_REQUEST_TYPE[this.route.snapshot.params["requestType"]], this.router.url);
    };
    /**
     * Init Breadcrumb
     */
    SF00309Page.prototype.initBreadcrumb = function () {
        var pageTitle = SF00309_MstData_1.MAIL_REQUEST_TYPE[this.route.snapshot.params["requestType"]];
        var self = this;
        self.headerProvider.reset();
        self.headerProvider.pageName = pageTitle;
        self.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]);
        self.headerProvider.addBreadCrumb(constants_1.Constants.DEAL_OVERVIEW_BREADCRUMB, ["/home/deal/" + this.route.snapshot.params["dealCode"]]);
        self.headerProvider.addBreadCrumb(pageTitle);
    };
    Object.defineProperty(SF00309Page.prototype, "pageData", {
        /*get pageData*/
        get: function () {
            return this.pageService.pageData;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Back and cancel go to Back SF00301
     */
    SF00309Page.prototype.goToSF00301 = function () {
        var self = this;
        // check isUpdate
        if (this.pageData.isUpdated) {
            //2. Message content khi click button [戻る/ Back]
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00309.WRN001),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00309.INF002),
                closeOnConfirm: true
            }, function () {
                return self.router.navigate([screen_url_1.ScreenUrl.SF00301, self.pageData.dealInfo.dealCode]);
            });
        }
        else {
            return this.navigate("home/deal/" + this.pageData.dealInfo.dealCode);
        }
    };
    /*Cancel page*/
    SF00309Page.prototype.cancel = function () {
        return this.navigate("home/deal/" + this.pageData.dealInfo.dealCode);
    };
    /**
     * Submit request
     */
    SF00309Page.prototype.submitRequest = function () {
        this.modalShow();
    };
    /*Call service send mail request*/
    SF00309Page.prototype.sendMail = function () {
        var _this = this;
        var self = this;
        this.pageService.sendMailRequest().then(function () {
            _this.modelHide();
            _this.resetModelRequestMail();
            var requestName = SF00309_MstData_1.MAIL_REQUEST_TYPE[_this.route.snapshot.params["requestType"]];
            //show message send mail request success
            // let message = Messages.get(MSG.SF00309.INF001);
            var message = requestName + "\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002";
            swal({
                title: constants_1.Constants.BLANK,
                text: message,
                confirmButtonColor: '#66ccff',
                confirmButtonText: "案件情報TOPへ",
            }, function () {
                self.router.navigate(['/home/deal', self.pageData.dealInfo.dealCode]);
            });
        }).catch(function (err) {
            //message send mail error
        });
    };
    /**
     * View product info
     *
     * @param product
     */
    SF00309Page.prototype.viewProductInfo = function (product) {
        path_util_1.PathUtil.redirectToPageProduct(this.router, this.pageData.dealInfo.dealCode, product.productCode, product.productType, product.shapeId, product.cartonShippingType);
    };
    SF00309Page.prototype.showCompleteModal = function () {
        $("#sendCompleteModal").modal('show');
    };
    SF00309Page.prototype.closeCompleteModal = function () {
        $("#sendCompleteModal").modal('hide');
    };
    /* show modal request */
    SF00309Page.prototype.modalShow = function () {
        this.resetModelRequestMail();
        $("#sendRequestModal").modal('show');
    };
    /* hide modal request */
    SF00309Page.prototype.modelHide = function () {
        $("#sendRequestModal").modal('hide');
    };
    SF00309Page.prototype.resetModelRequestMail = function () {
        //3. Gửi mail xong vào lại, hãy reset về mail mặc định
        this.pageData.mailRequest.addressTo = [];
        this.pageData.mailRequest.addressCc = [];
        this.pageData.mailRequest = SF00309_helper_1.SF00309Helper.cloneMailModel(this.pageData.mailRequestBackup);
        this.pageData.mailRequest.content = this.replaceTemplate(this.pageData.mailRequest.content, this.pageData.dealInfo, this.pageData.productBoxs);
    };
    SF00309Page.prototype.addMailPic = function () {
        var _this = this;
        //check add address
        if (this.pageData.typeAddress == "TO") {
            // get mailTo by id
            var $mailto_1 = $("[name='mailto']");
            // add mail user to email
            if (this.pageData.userPicModals) {
                this.pageData.userPicModals.forEach(function (item) {
                    if (_this.checkEmailAddress(item, "TO"))
                        $mailto_1.addTag(_this.parseEmail(item));
                });
            }
        }
        else {
            // get mailTo by id
            var $mailcc_1 = $("[name='mailcc']");
            // add mail user to email
            if (this.pageData.userPicModals) {
                this.pageData.userPicModals.forEach(function (item) {
                    if (_this.checkEmailAddress(item, "CC"))
                        $mailcc_1.addTag(_this.parseEmail(item));
                });
            }
        }
        // show modal request
        this.showCompleteModal();
    };
    SF00309Page.prototype.parseEmail = function (userPic) {
        return userPic.username + "<" + userPic.email + ">";
    };
    SF00309Page.prototype.checkEmailAddress = function (user, typeAddress) {
        var address = this.parseEmail(user);
        var index;
        if (typeAddress == "TO") {
            index = this.pageData.mailRequest.addressTo.findIndex(function (item) {
                return item == address;
            });
        }
        else if (typeAddress == "CC") {
            index = this.pageData.mailRequest.addressCc.findIndex(function (item) {
                return item == address;
            });
        }
        if (index >= 0)
            return false;
        return true;
    };
    SF00309Page.prototype.requestButtonValue = function () {
        return this.pageData.requestButtonLabel;
    };
    SF00309Page.prototype.disableSendMail = function () {
        var type = this.pageData.requestType;
        // if (type <= 5 && type >= 3) return false;
        // if (type < 3 || type > 7) return true;
        // return !this.pageData.checkEnabled;
        return !(type <= 7 && type >= 3);
    };
    SF00309Page.prototype.replaceTemplate = function (target, dealInfo, productInfoBoxs) {
        var content = this.replaceDealURL(target);
        var ret = this.replaceProductInfoList(content, productInfoBoxs);
        return ret;
    };
    SF00309Page.prototype.replaceDealURL = function (target) {
        return target.replace("<URL>", this.getDealURL(this.pageData.dealInfo.dealCode));
    };
    SF00309Page.prototype.replaceProductInfoList = function (target, productInfoBoxs) {
        return target.replace("<PRODUCTS>", this.generateProductInfoList(productInfoBoxs));
    };
    SF00309Page.prototype.generateProductInfoList = function (productInfoBoxs) {
        var productInfoList = "";
        var productIndex = 1;
        for (var i = 0; i < this.pageData.productBoxs.length; i++) {
            var productBox = this.pageData.productBoxs[i];
            if (productBox.checked) {
                if (productIndex > 1) {
                    productInfoList = productInfoList.concat("\n\n", "(", productIndex.toString(), ")\n", this.getReplacedProductInfo(productBox));
                }
                else {
                    productInfoList = productInfoList.concat("(", productIndex.toString(), ")\n", this.getReplacedProductInfo(productBox));
                }
                productIndex++;
            }
        }
        return productInfoList;
    };
    SF00309Page.prototype.getReplacedProductInfo = function (targetProduct) {
        return SF00309_MstData_1.PRODUCT_INFO_MAIL_TEMPLATE
            .replace("<productCode>", targetProduct.product.productCode)
            .replace("<productType>", this.getProductTypeName(targetProduct))
            .replace("<productName>", targetProduct.product.productName)
            .replace("<productURL>", this.getProductURL(targetProduct));
    };
    SF00309Page.prototype.getProductTypeName = function (target) {
        return format_util_1.FormatUtil.productType(target.product.productType, target.product.shapeId, target.product.cartonShippingType);
    };
    SF00309Page.prototype.getDealURL = function (dealCode) {
        return window.location.origin + "/home/deal/" + dealCode;
    };
    SF00309Page.prototype.getProductURL = function (target) {
        var deal_url = this.getDealURL(this.pageData.dealInfo.dealCode);
        return deal_url + "/product/" + target.product.productCode;
    };
    SF00309Page = __decorate([
        core_1.Component({
            templateUrl: 'SF00309.page.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, SF00309_service_1.SF00309Service])
    ], SF00309Page);
    return SF00309Page;
}(common_page_1.CommonPage));
exports.SF00309Page = SF00309Page;
//# sourceMappingURL=SF00309.page.js.map