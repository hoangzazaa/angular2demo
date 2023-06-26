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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var SFN0402_page_1 = require("../SFN0402.page");
var SFN0402_constants_1 = require("../SFN0402.constants");
var MailModal_model_1 = require("../../COMMON/mail-modal/MailModal.model");
var GenericProvider_1 = require("../../../../component/GenericProvider");
var MailModal_component_1 = require("../../COMMON/mail-modal/MailModal.component");
var SFN0402_Mail_model_1 = require("../model/SFN0402_Mail.model");
var string_template_helper_1 = require("../../../../helper/string-template-helper");
var SFN040206Component = (function (_super) {
    __extends(SFN040206Component, _super);
    function SFN040206Component(page, provider) {
        _super.call(this);
        this.page = page;
        provider.provider = this;
    }
    SFN040206Component.prototype.ngOnInit = function () {
        this.isCustomer = (this.page.pageData.partnerType == SFN0402_constants_1.SFN0402Constants.TYPE_CUSTOMER);
        this.saveEnable = true;
    };
    //region Bindings
    //endregion
    //region Actions
    SFN040206Component.prototype.sendMail = function () {
        return this.page.sendMail(this.type);
    };
    SFN040206Component.prototype.show = function (type) {
        this.type = type;
        if (type == SFN0402_constants_1.SFN0402Constants.MAIL_PRODUCT_DISPOSAL) {
            this.prepareProductDisposalMail();
        }
        else if (type == SFN0402_constants_1.SFN0402Constants.MAIL_WOODEN_RETURN) {
            this.prepareWoodenReturn();
        }
        else if (type == SFN0402_constants_1.SFN0402Constants.MAIL_WOODEN_PENDING) {
            this.prepareWoodenPending();
        }
        this.mailModal.open();
    };
    //endregion
    //region Functions
    SFN040206Component.prototype.prepareProductDisposalMail = function () {
        // prepare
        var pageData = this.page.pageData;
        var customer = pageData.partner;
        var mailTemplate = pageData.productDisposalMail;
        // get selected product
        var product;
        for (var _i = 0, _a = pageData.inventories; _i < _a.length; _i++) {
            var inventory = _a[_i];
            if (inventory != undefined && inventory.slt_selected) {
                product = inventory.product;
                break;
            }
        }
        // generate mail
        var mail = new SFN0402_Mail_model_1.MailModel();
        this.page.pageData.mail = mail;
        this.data.mail = mail;
        mail.addressTo = mailTemplate.addressTo.slice(0);
        mail.addressCc = mailTemplate.addressCc.slice(0);
        mail.subject = mailTemplate.subject;
        mail.content = string_template_helper_1.StringTemplateHelper.generateString(mailTemplate.content, {
            customerCode: customer.code,
            customerName: customer.name,
            productCode: product.itemCode,
            productName: product.name
        });
    };
    SFN040206Component.prototype.prepareWoodenReturn = function () {
        // prepare
        var pageData = this.page.pageData;
        var customer = pageData.partner;
        var mailTemplate = pageData.woodenReturnMail;
        // get selected product
        var product;
        for (var _i = 0, _a = pageData.products; _i < _a.length; _i++) {
            var tProduct = _a[_i];
            if (tProduct != undefined && tProduct.plt_selected) {
                product = tProduct;
                break;
            }
        }
        // generate mail
        var mail = new SFN0402_Mail_model_1.MailModel();
        this.page.pageData.mail = mail;
        this.data.mail = mail;
        mail.addressTo = mailTemplate.addressTo.slice(0);
        mail.addressCc = mailTemplate.addressCc.slice(0);
        mail.subject = string_template_helper_1.StringTemplateHelper.generateString(mailTemplate.subject, {
            woodenCode: product.wooden
        });
        mail.content = string_template_helper_1.StringTemplateHelper.generateString(mailTemplate.content, {
            customerCode: customer.code,
            customerName: customer.name,
            productCode: product.itemCode,
            productName: product.name,
            woodenCode: product.wooden
        });
    };
    SFN040206Component.prototype.prepareWoodenPending = function () {
        // prepare
        var pageData = this.page.pageData;
        var customer = pageData.partner;
        var mailTemplate = pageData.woodenPendingMail;
        // get selected product
        var product;
        for (var _i = 0, _a = pageData.products; _i < _a.length; _i++) {
            var tProduct = _a[_i];
            if (tProduct != undefined && tProduct.plt_selected) {
                product = tProduct;
                break;
            }
        }
        // generate mail
        var mail = new SFN0402_Mail_model_1.MailModel();
        this.page.pageData.mail = mail;
        this.data.mail = mail;
        mail.addressTo = mailTemplate.addressTo.slice(0);
        mail.addressCc = mailTemplate.addressCc.slice(0);
        mail.subject = string_template_helper_1.StringTemplateHelper.generateString(mailTemplate.subject, {
            woodenCode: product.wooden
        });
        mail.content = string_template_helper_1.StringTemplateHelper.generateString(mailTemplate.content, {
            customerCode: customer.code,
            customerName: customer.name,
            productCode: product.itemCode,
            productName: product.name,
            woodenCode: product.wooden
        });
    };
    __decorate([
        core_1.ViewChild(MailModal_component_1.MailModalComponent), 
        __metadata('design:type', MailModal_component_1.MailModalComponent)
    ], SFN040206Component.prototype, "mailModal", void 0);
    SFN040206Component = __decorate([
        core_1.Component({
            selector: "sfn040206",
            template: "<div mail-modal></div>",
            providers: [{ provide: MailModal_model_1.MailModalModel.PROVIDER, useFactory: function () { return new GenericProvider_1.GenericProvider(); } }]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return SFN0402_page_1.SFN0402Page; }))),
        __param(1, core_1.Inject(MailModal_model_1.MailModalModel.PROVIDER)), 
        __metadata('design:paramtypes', [SFN0402_page_1.SFN0402Page, GenericProvider_1.GenericProvider])
    ], SFN040206Component);
    return SFN040206Component;
}(MailModal_model_1.MailModalModel));
exports.SFN040206Component = SFN040206Component;
//# sourceMappingURL=SFN040206.MailModal.component.js.map