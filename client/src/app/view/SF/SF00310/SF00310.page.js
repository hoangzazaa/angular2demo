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
var SF00310_service_1 = require("./SF00310.service");
var message_1 = require("../../../helper/message");
var Mail_model_1 = require("../../../model/common/Mail.model");
var screen_url_1 = require("../../../helper/screen-url");
var SF00310_helper_1 = require("./SF00310.helper");
var path_util_1 = require("../../../util/path-util");
var SF00310_PAGE_TITLE = "デザイン作成依頼";
var SF00310Page = (function (_super) {
    __extends(SF00310Page, _super);
    /**
     * Constructor page
     *
     * @param router
     * @param route
     * @param headerProvider
     * @param pageService
     */
    function SF00310Page(router, route, headerProvider, pageService) {
        _super.call(this, router, route, headerProvider);
        this.pageService = pageService;
        this.pageData.mailRequest = new Mail_model_1.MailModel();
    }
    /**
     * Init Breadcrumb
     */
    SF00310Page.prototype.initBreadcrumb = function () {
        var self = this;
        self.headerProvider.reset();
        self.headerProvider.pageName = SF00310_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]);
        self.headerProvider.addBreadCrumb(constants_1.Constants.DEAL_OVERVIEW_BREADCRUMB, ["/home/deal/" + this.route.snapshot.params["dealCode"]]);
        self.headerProvider.addBreadCrumb(SF00310_PAGE_TITLE);
    };
    Object.defineProperty(SF00310Page.prototype, "pageData", {
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
    SF00310Page.prototype.goToSF00301 = function () {
        var self = this;
        // check isUpdate
        if (this.pageData.isUpdated) {
            //2. Message content khi click button [戻る/ Back]
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00310.WRN002),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00310.INF002),
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
    SF00310Page.prototype.cancel = function () {
        return this.navigate("home/deal/" + this.pageData.dealInfo.dealCode);
    };
    /**
     * Submit request
     */
    SF00310Page.prototype.submitRequest = function () {
        // check date validate
        if (!this.validateForm()) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00310.WRN001) }, { type: 'danger' });
            return;
        }
        this.modalShow();
    };
    /*Call service send mail request*/
    SF00310Page.prototype.sendMail = function () {
        var _this = this;
        var self = this;
        this.pageService.sendMailRequest().then(function () {
            _this.modelHide();
            _this.resetModelRequestMail();
            //show message send mail request success
            var message = message_1.default.get(message_1.MSG.SF00310.INF001);
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
            if ('SF00306_ERR004' == err.code)
                swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00310.ERR001), "error");
            else if ('SF00309_ERR003' == err.code)
                swal(constants_1.Constants.BLANK, 'Unable to Send Email', "error");
        });
    };
    /**
     * View product info
     *
     * @param product
     */
    SF00310Page.prototype.viewProductInfo = function (product) {
        path_util_1.PathUtil.redirectToPageProduct(this.router, this.pageData.dealInfo.dealCode, product.productCode, product.productType, product.shapeId, product.cartonShippingType);
    };
    /* show modal request */
    SF00310Page.prototype.modalShow = function () {
        this.resetModelRequestMail();
        $("#sendRequestModal").modal('show');
    };
    /* hide modal request */
    SF00310Page.prototype.modelHide = function () {
        $("#sendRequestModal").modal('hide');
    };
    SF00310Page.prototype.resetModelRequestMail = function () {
        //3. Gửi mail xong vào lại, hãy reset về mail mặc định
        this.pageData.mailRequest.addressTo = [];
        this.pageData.mailRequest.addressCc = [];
        this.pageData.mailRequest = SF00310_helper_1.SF00310Helper.cloneMailModel(this.pageData.mailRequestBackup);
    };
    // check form validate date
    SF00310Page.prototype.validateForm = function () {
        var validate = true;
        // check A > C
        var desiredDeliveryDate = this.pageData.requestModel.desiredDeliveryDate;
        var submissionDeadline = this.pageData.requestModel.submissionDeadline;
        if (!!desiredDeliveryDate && !!submissionDeadline && desiredDeliveryDate < submissionDeadline) {
            validate = false;
        }
        return validate;
    };
    SF00310Page.prototype.addMailPic = function () {
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
        $("#sendRequestModal").modal('show');
    };
    SF00310Page.prototype.parseEmail = function (userPic) {
        return userPic.username + "<" + userPic.email + ">";
    };
    SF00310Page.prototype.checkEmailAddress = function (user, typeAddress) {
        var address = this.parseEmail(user);
        var index;
        if (typeAddress == "TO") {
            index = this.pageData.mailRequest.addressTo.findIndex(function (item) {
                return item == address;
            });
        }
        if (typeAddress == "CC") {
            index = this.pageData.mailRequest.addressCc.findIndex(function (item) {
                return item == address;
            });
        }
        if (index >= 0)
            return false;
        return true;
    };
    SF00310Page = __decorate([
        core_1.Component({
            templateUrl: 'SF00310.page.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, SF00310_service_1.SF00310Service])
    ], SF00310Page);
    return SF00310Page;
}(common_page_1.CommonPage));
exports.SF00310Page = SF00310Page;
//# sourceMappingURL=SF00310.page.js.map