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
var validator_util_1 = require("../../../util/validator-util");
var CheckSheet_model_1 = require("../COMMON/checksheet/model/CheckSheet.model");
var common_page_1 = require("../COMMON/common.page");
var Header_provider_1 = require("../SF00100/Header.provider");
var SF00306_helper_1 = require("./SF00306.helper");
var SF00306_service_1 = require("./SF00306.service");
var SF00306_constants_1 = require("./SF00306.constants");
var path_util_1 = require("../../../util/path-util");
var SF00306_PAGE_TITLE = "設計依頼";
var SF00306Page = (function (_super) {
    __extends(SF00306Page, _super);
    /**
     * Constructor page
     * @param router
     * @param route
     * @param pageService
     * @param headerProvider
     * @param location
     */
    function SF00306Page(router, route, pageService, headerProvider) {
        _super.call(this, router, route, headerProvider);
        this.pageService = pageService;
    }
    SF00306Page.prototype.ngOnInit = function () {
        this.pageService.navigateTo("設計依頼", this.router.url);
    };
    // init breadcrumb
    SF00306Page.prototype.initBreadcrumb = function () {
        var self = this;
        var sf0301Path = "/home/deal/" + self.route.snapshot.params["dealCode"];
        self.headerProvider.reset();
        self.headerProvider.pageName = SF00306_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]); //Dashboard
        self.headerProvider.addBreadCrumb(constants_1.Constants.DEAL_OVERVIEW_BREADCRUMB, [sf0301Path]); //SF003-01
        self.headerProvider.addBreadCrumb(SF00306_PAGE_TITLE);
    };
    Object.defineProperty(SF00306Page.prototype, "pageData", {
        get: function () {
            return this.pageService.pageData;
        },
        enumerable: true,
        configurable: true
    });
    SF00306Page.prototype.showMailModal = function () {
        // #2583
        if (this.inputValidateCheckSheet()) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00301.WRN002) }, { type: 'danger' });
            return;
        }
        //#2206
        if (validator_util_1.default.isEmpty(this.pageData.dealInfo.customerCode)) {
            // reset checkbox state which already checked to un-checked
            this.pageData.productBoxs.filter(function (productBox) { return productBox.checked == true; }).forEach(function (productBox) {
                productBox.checked = false;
            });
            $.notify({ message: message_1.default.get(message_1.MSG.SF00301.WRN001) }, { type: 'danger' });
            return;
        }
        // reset address to and cc
        this.pageData.mailModelScreen.addressTo = [];
        this.pageData.mailModelScreen.addressCc = [];
        // find data default
        this.pageData.mailModelScreen = SF00306_helper_1.SF00306Helper.cloneMailModel(this.pageData.mailModel);
        // add product checkbox
        var selectedProducts = this.pageData.productBoxs.filter(function (pb) { return pb.checked; }).map(function (pb) { return pb.product; });
        // note content mail
        this.pageData.mailModelScreen.content = SF00306_helper_1.SF00306Helper.updateMailContent(this.pageData.dealInfo, selectedProducts);
        // open modal search pic
        this.openMailModal();
    };
    SF00306Page.prototype.openMailModal = function () {
        $("#sendRequestModal").modal('show');
    };
    SF00306Page.prototype.closeMailModal = function () {
        $("#sendRequestModal").modal('hide');
    };
    SF00306Page.prototype.showCompleteModal = function () {
        $("#sendCompleteModal").modal('show');
    };
    SF00306Page.prototype.closeCompleteModal = function () {
        $("#sendCompleteModal").modal('hide');
    };
    SF00306Page.prototype.sendMail = function () {
        var _this = this;
        var self = this;
        App.loader('show');
        this.pageService.sendMail().then(function (res) {
            App.loader('hide');
            self.closeMailModal();
            swal({
                title: constants_1.Constants.BLANK,
                confirmButtonColor: "#66ccff",
                confirmButtonText: "案件情報TOPへ",
                text: _this.pageData.messageMail,
                html: true,
            }, function () {
                self.router.navigate(['/home/deal', self.pageData.dealInfo.dealCode]);
            });
        }).catch(function (err) {
            //3. Request design error
            // Send in form mail fail
            App.loader('hide');
            self.closeMailModal();
            swal(constants_1.Constants.BLANK, _this.pageData.messageMail, "error");
        });
    };
    SF00306Page.prototype.viewCheckSheet = function () {
        this.router
            .navigate([("/home/deal/" + this.pageData.dealInfo.dealCode + "/dealCheckSheet")]).then(null);
    };
    SF00306Page.prototype.viewProductInfo = function (product) {
        path_util_1.PathUtil.redirectToPageProduct(this.router, this.pageData.dealInfo.dealCode, product.productCode, product.productType, product.shapeId, product.cartonShippingType);
    };
    SF00306Page.prototype.backToSF00301 = function () {
        this.closeMailModal();
        this.closeCompleteModal();
        this.router.navigate(["home/deal", this.pageData.dealInfo.dealCode]).then(null);
    };
    SF00306Page.prototype.productBoxChecked = function (productBox, event) {
        if (event.target.checked) {
            if (productBox.product.requestDesignFlag == 1) {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00306.ERR009) }, { type: 'danger' });
                productBox.checked = false;
                $("#checkbox" + productBox.product.id).attr('checked', false);
            }
            else {
                productBox.checked = true;
            }
        }
        else {
            productBox.checked = false;
        }
    };
    SF00306Page.prototype.addMailPic = function () {
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
        this.showRequest();
    };
    SF00306Page.prototype.parseEmail = function (userPic) {
        return userPic.username + "<" + userPic.email + ">";
    };
    SF00306Page.prototype.checkEmailAddress = function (object, typeAddress, typeObject) {
        var address;
        if (typeObject == SF00306_constants_1.SF00306Constants.TYPE_OBJECT) {
            // http://fridaynight.vnext.vn/issues/2979
            // replace halfsize space by fullsize space
            address = object["department"].replace(" ", "　");
        }
        else {
            // http://fridaynight.vnext.vn/issues/2979
            // replace halfsize space by fullsize space
            address = this.parseEmail(object).replace(" ", "　");
        }
        var index;
        if (typeAddress == SF00306_constants_1.SF00306Constants.TYPE_ADDRESS_TO) {
            index = this.pageData.mailModelScreen.addressTo.findIndex(function (item) {
                return address == item;
            });
        }
        if (typeAddress == SF00306_constants_1.SF00306Constants.TYPE_ADDRESS_CC) {
            index = this.pageData.mailModelScreen.addressCc.findIndex(function (item) {
                return address == item;
            });
        }
        if (index >= 0)
            return false;
        return true;
    };
    SF00306Page.prototype.showRequest = function () {
        $("#sendRequestModal").modal('show');
    };
    SF00306Page.prototype.inputValidateCheckSheet = function () {
        var _this = this;
        var checkInput = false;
        var question = this.getAnswerByQuestionCode(1003);
        if (validator_util_1.default.isEmpty(question.radioButton)) {
            checkInput = true;
        }
        question = this.getAnswerByQuestionCode(1010);
        if (validator_util_1.default.isEmpty(question.selectBox1)) {
            checkInput = true;
        }
        question = this.getAnswerByQuestionCode(1011);
        if (validator_util_1.default.isEmpty(question.selectBox1) || validator_util_1.default.isEmpty(question.selectBox2)
            || validator_util_1.default.isEmpty(question.radioButton)) {
            checkInput = true;
        }
        // バーコードにチェックが入っていて、該当値がない場合にエラーとする
        [2061, 2062, 2063, 2064].map(function (key) {
            var question = _this.getAnswerByQuestionCode(key);
            if (question.checkBox1 == 1 && validator_util_1.default.isEmpty(question.textArea1)) {
                checkInput = true;
            }
        });
        return checkInput;
    };
    SF00306Page.prototype.getAnswerByQuestionCode = function (value) {
        var answer = this.pageData.checkSheets[value];
        if (!!answer)
            return answer;
        return new CheckSheet_model_1.CheckSheetModel();
    };
    SF00306Page.prototype.changeProductLot = function (product) {
        var productBox = this.pageData.productBoxs.find(function (item) {
            return item.product.id == product.id;
        });
        productBox.product.requestLot = product.requestLot;
    };
    Object.defineProperty(SF00306Page.prototype, "isJobInprocess", {
        // deal call job inprocess
        get: function () {
            return this.pageData.dealInfo.jobInprocess == 1;
        },
        enumerable: true,
        configurable: true
    });
    SF00306Page.prototype.exportPdf = function (productCode) {
        this.pageService.SF0030604(productCode)
            .then(function (result) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00306.INF002) }, { type: 'success' });
            var link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.href = result.filePath;
            link.click();
        })
            .catch(function (err) {
            swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00306.ERR011), "error");
        });
    };
    SF00306Page = __decorate([
        core_1.Component({
            templateUrl: 'SF00306.page.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, SF00306_service_1.SF00306Service, Header_provider_1.HeaderProvider])
    ], SF00306Page);
    return SF00306Page;
}(common_page_1.CommonPage));
exports.SF00306Page = SF00306Page;
//# sourceMappingURL=SF00306.page.js.map