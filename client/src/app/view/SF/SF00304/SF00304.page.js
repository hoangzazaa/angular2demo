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
/**
 * Created by haipt on 11/8/2016.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var SF00304_service_1 = require("./SF00304.service");
var Header_provider_1 = require("../SF00100/Header.provider");
var constants_1 = require("../../../helper/constants");
var common_page_1 = require("../COMMON/common.page");
var message_1 = require("../../../helper/message");
var message_2 = require("../../../helper/message");
var SF00304_PAGE_TITLE = "見積書出力";
var SF00304Page = (function (_super) {
    __extends(SF00304Page, _super);
    function SF00304Page(route, router, headerProvider, sv00304Service) {
        _super.call(this, router, route, headerProvider);
        this.sv00304Service = sv00304Service;
        this.quotationTemplateModel = [];
    }
    SF00304Page.prototype.ngOnInit = function () {
        this.sv00304Service.navigateTo("見積書出力", this.router.url);
        this.quotationTemplateModel = this.route.snapshot.data["quotationTemplates"]["quotationTemplates"];
        this.sortQuotationtemplateModel();
    };
    SF00304Page.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.quotationCode = this.route.snapshot.params["quotationCode"];
        var option = this.route.snapshot.params["option"];
        this.option = option;
        this.fileName = "見積書" + this.quotationCode;
        this.quotationTemplateModel.map(function (tmp) {
            if (tmp.selectOption == _this.option) {
                _this.generateFiles(tmp);
            }
        });
        $("#fileName").rules("add", {
            required: true,
            messages: {
                required: "Please enter file name"
            }
        });
    };
    // DBを変更するのを避けるためJSにて表示調整
    // 以下に並べ替え。そしえて横レイアウトのみにフィルタリング
    /*
        3: サガシキ標準：横（角印あり）
        4: サガシキ標準：横（角印なし）
        1: サガシキ標準：縦（角印あり）
        2: サガシキ標準：縦（角印なし）
        7: アクトン標準：横（角印あり）
        8: アクトン標準：横（角印なし）
        5: アクトン標準：縦（角印あり）
        6: アクトン標準：縦（角印なし）
    */
    SF00304Page.prototype.sortQuotationtemplateModel = function () {
        var id_order = [3, 4, 7, 8];
        this.quotationTemplateModel = this.quotationTemplateModel
            .filter(function (o) {
            return id_order.indexOf(o.id) > -1;
        })
            .sort(function (a, b) {
            var ao = id_order.indexOf(a.id), bo = id_order.indexOf(b.id);
            if (ao < bo)
                return -1;
            else
                return 1;
        });
    };
    SF00304Page.prototype.initBreadcrumb = function () {
        var self = this;
        var sf0301Path = "/home/deal/" + self.route.snapshot.params["dealCode"]; //SF003-01
        var sf0303Path = sf0301Path + "/quotation/" + self.route.snapshot.params["quotationCode"]; //SF003-03
        self.headerProvider.reset();
        self.headerProvider.pageName = SF00304_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]);
        self.headerProvider.addBreadCrumb(constants_1.Constants.DEAL_OVERVIEW_BREADCRUMB, [sf0301Path]);
        self.headerProvider.addBreadCrumb("見積情報", [sf0303Path]);
        self.headerProvider.addBreadCrumb(SF00304_PAGE_TITLE);
    };
    SF00304Page.prototype.exportQuotation = function () {
        if (this.selectedTemplate == undefined || this.selectedTemplate == null) {
            this.selectedTemplate = this.quotationTemplateModel[0];
        }
        this.sv00304Service.exportPdf(this.quotationCode, this.selectedTemplate.selectOption, this.fileName)
            .then(function (result) {
            window.open(result.pdfFilePath, '_blank');
        })
            .catch(function (err) {
            swal(constants_1.Constants.BLANK, message_1.default.get(message_2.MSG.SF00305.ERR007), "error");
        });
    };
    SF00304Page.prototype.generateFiles = function (quotationTemplate) {
        var _this = this;
        if ($("#validateForm").valid()) {
            this.selectedTemplate = quotationTemplate;
            this.templateName = quotationTemplate.fileName;
            this.templateApplication = quotationTemplate.application;
            this.templateDate = quotationTemplate.updatedDate;
            this.option = quotationTemplate.selectOption;
            this.sv00304Service.exportFiles(this.quotationCode, quotationTemplate.selectOption, this.fileName).then(function (data) {
                // this.createdTimestamp = data["filePath"];
                _this.image = data["pngFilePath"];
            }).catch(function (err) {
                swal(constants_1.Constants.BLANK, message_1.default.get(message_2.MSG.SF00305.ERR008), "error");
            });
        }
    };
    SF00304Page.prototype.backToPrevious = function () {
        this.router.navigate(['home/deal', this.route.snapshot.params["dealCode"], "quotation", this.quotationCode]);
    };
    SF00304Page.prototype.sendQuotationMail = function () {
        this.router.navigate(['home/deal', this.route.snapshot.params["dealCode"], "mailQuotation", this.quotationCode]);
    };
    SF00304Page = __decorate([
        core_1.Component({
            templateUrl: "./SF00304.page.html",
            styleUrls: ["SF00304.page.css"],
            providers: [SF00304_service_1.SF00304Service]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, Header_provider_1.HeaderProvider, SF00304_service_1.SF00304Service])
    ], SF00304Page);
    return SF00304Page;
}(common_page_1.CommonPage));
exports.SF00304Page = SF00304Page;
//# sourceMappingURL=SF00304.page.js.map