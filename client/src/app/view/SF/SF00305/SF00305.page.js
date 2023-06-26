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
var SF00305_service_1 = require("./SF00305.service");
var common_page_1 = require("../COMMON/common.page");
var constants_1 = require("../../../helper/constants");
var message_1 = require("../../../helper/message");
var validator_util_1 = require("../../../util/validator-util");
var SF00305_PAGE_TITLE = "見積書をメールで送る";
var MAX_NUMBER_FILE = 6;
var FILE_SIZE = 6;
var SF00305Page = (function (_super) {
    __extends(SF00305Page, _super);
    /**
     * Constructor call super common page
     *
     * @param sv00305Service
     * @param route
     * @param headerProvider
     * @param router
     */
    function SF00305Page(sv00305Service, route, headerProvider, router) {
        _super.call(this, router, route, headerProvider);
        this.sv00305Service = sv00305Service;
    }
    SF00305Page.prototype.ngOnInit = function () {
        this.sv00305Service.navigateTo("メール送信", this.router.url);
        this.pageData.quotationCode = this.route.snapshot.params["quotationCode"];
        this.pageData.dealCode = this.route.snapshot.params["dealCode"];
    };
    SF00305Page.prototype.ngAfterViewInit = function () {
        var self = this;
        this.pageData.subject = "お見積送付のお知らせ（株式会社サガシキ）";
        $("#contentMail").rules("add", {
            required: true,
            maxlength: 480,
            messages: {
                required: "Please enter content mail",
                maxlength: "Max length: 480"
            }
        });
        $("#subject").rules("add", {
            required: true,
            maxlength: 50,
            messages: {
                required: "Please enter subject",
                maxlength: "Max length: 50"
            }
        });
        var dropZone = new Dropzone(".dropzone", {
            url: "/CM0010101",
            addRemoveLinks: true,
            uploadMultiple: false,
            parallelUploads: 1,
            maxFilesize: FILE_SIZE,
            thumbnailWidth: 100,
            thumbnailHeight: 200,
            acceptedFiles: ".png,.pdf,.jpg,.gif,.zip",
            error: function (err) {
                var ref = err.previewElement;
                if (ref != null) {
                    ref.parentNode.removeChild(err.previewElement);
                }
                $.notify({ message: message_1.default.get(message_1.MSG.SF00305.ERR003) }, { type: 'danger' });
            },
            success: function (file, response) {
                var ref = file.previewElement;
                var size = self.pageData.totalSize + file.size;
                var maxSize = 5 * 1024 * 1024;
                if (size > maxSize) {
                    var ref_1 = file.previewElement;
                    if (ref_1 != null) {
                        ref_1.parentNode.removeChild(file.previewElement);
                    }
                    $.notify({ message: message_1.default.get(message_1.MSG.SF00305.ERR004) }, { type: 'danger' });
                }
                else {
                    var res = JSON.parse(response + '').res;
                    if (!!res && res.messageCode != "CC00101_ERR002" && self.pageData.attachFiles.length < MAX_NUMBER_FILE) {
                        self.pageData.totalSize = size;
                        self.pageData.mimeTypes.push(file.type);
                        // parse data to jsonFileName
                        self.pageData.attachFiles.push(res.data.fileName);
                        // store original file name
                        var index = self.pageData.originalName.indexOf(file.name);
                        if (index === -1) {
                            self.pageData.originalName.push(file.name);
                        }
                        // check upload file
                        self.pageData.checkCreateUpload = true;
                        if (!!res.data.thumbnail) {
                            dropZone.emit('thumbnail', file, "/CM0010102/" + res.data.thumbnail);
                        }
                    }
                    else if (!!res && res.messageCode == "CC00101_ERR002") {
                        ref.parentNode.removeChild(file.previewElement);
                        $.notify({ message: message_1.default.get(message_1.MSG.SF00301.ERR003) }, { type: 'danger' });
                    }
                    else if (!!res) {
                        ref.parentNode.removeChild(file.previewElement);
                        $.notify({ message: message_1.default.get(message_1.MSG.SF00305.ERR006) }, { type: 'danger' });
                    }
                }
            },
            removedfile: function (file) {
                // self.removeQuotationFile(file.name);
                var ref = file.previewElement;
                if (ref != null) {
                    ref.parentNode.removeChild(file.previewElement);
                    self.pageData.totalSize = self.pageData.totalSize - file.size;
                }
                var index = self.pageData.originalName.indexOf(file.name);
                if (index !== -1) {
                    self.pageData.originalName.splice(index, 1);
                    self.pageData.attachFiles.splice(index + 1, 1);
                    self.pageData.mimeTypes.splice(index + 1, 1);
                }
            }
        });
        var quotationFile = {
            name: "見積書" + this.pageData.quotationCode + ".pdf",
            status: Dropzone.SUCCESS,
            accepted: true,
            size: '0',
            type: "pdf"
        };
        this.pageData.quotationImage =
            "/CM0010105/" + this.pageData.timestamp + "/"
                + "見積書" + this.pageData.quotationCode + ".png/QUOTATION";
        this.pageData.attachFiles
            .push("見積書" + this.pageData.quotationCode);
        dropZone.addFile.call(dropZone, quotationFile);
        dropZone.emit("thumbnail", quotationFile, this.pageData.attachFileUri);
        $(".dz-remove").eq(0).addClass("hidden");
        $(".dz-size").eq(0).addClass("hidden");
        dropZone.on("addedfile", function (file) {
            if (this.files.length) {
                var _i = void 0, _len = void 0;
                for (_i = 0, _len = this.files.length; _i < _len - 1; _i++) {
                    if (this.files[_i].name ===
                        file.name && this.files[_i].size === file.size && this.files[_i].lastModifiedDate.toString() === file.lastModifiedDate.toString()) {
                        this.removeFile(file);
                    }
                }
            }
        });
    };
    SF00305Page.prototype.initBreadcrumb = function () {
        var self = this;
        var sf0301Path = "/home/deal/" + self.route.snapshot.params["dealCode"]; //SF003-01
        var sf0303Path = sf0301Path + "/quotation/" + self.route.snapshot.params["quotationCode"]; //SF003-03
        var sf0304Path = sf0301Path + "/exportQuotation/" + self.route.snapshot.params["quotationCode"] + "/1"; //SF003-04
        self.headerProvider.reset();
        self.headerProvider.pageName = SF00305_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]);
        self.headerProvider.addBreadCrumb(constants_1.Constants.DEAL_OVERVIEW_BREADCRUMB, [sf0301Path]);
        self.headerProvider.addBreadCrumb("見積情報", [sf0303Path]);
        self.headerProvider.addBreadCrumb("見積書出力", [sf0304Path]);
        self.headerProvider.addBreadCrumb("メール送信");
    };
    Object.defineProperty(SF00305Page.prototype, "pageData", {
        get: function () {
            return this.sv00305Service.pageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00305Page.prototype, "addressCc", {
        get: function () {
            return this.pageData.cc;
        },
        enumerable: true,
        configurable: true
    });
    SF00305Page.prototype._setAddressTo = function (value) {
        this.pageData.recipients = [];
        this.pageData.recipients = value.filter(function (item) {
            return item != undefined;
        });
    };
    SF00305Page.prototype._setAddressCc = function (value) {
        this.pageData.cc = [];
        this.pageData.cc = value.filter(function (item) {
            return item != undefined;
        });
    };
    Object.defineProperty(SF00305Page.prototype, "addressTo", {
        get: function () {
            return this.pageData.recipients;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00305Page.prototype, "subject", {
        get: function () {
            return this.pageData.subject;
        },
        set: function (value) {
            this.pageData.subject = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Send mail to customer call api server
     */
    SF00305Page.prototype.sendQuotationMail = function () {
        var self = this;
        // check size
        if (this.pageData.totalSize > this.pageData.TOTAL_SIZE_DEFAULT) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00305.ERR001) }, { type: 'danger' });
            return;
        }
        // check mail recipients
        if (this.pageData.recipients.length == 0) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00305.ERR002) }, { type: 'danger' });
            return;
        }
        // check email validate
        if (!this.checkItemEmailValidate(this.pageData.recipients)) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00305.ERR005) }, { type: 'danger' });
            return;
        }
        if (!this.checkItemEmailValidate(this.pageData.cc)) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00305.ERR005) }, { type: 'danger' });
            return;
        }
        if ($("#validateForm").valid() && this.pageData.totalSize <= this.pageData.TOTAL_SIZE_DEFAULT) {
            App.loader('show');
            self.sv00305Service
                .sendMail(this.pageData)
                .then(function () {
                App.loader('hide');
                swal({
                    title: "メールは正常に送信されました。",
                    confirmButtonColor: "#d26a5c",
                    confirmButtonText: "案件情報TOPへ",
                }, function () {
                    self.router.navigate(['/home/deal', self.route.snapshot.params["dealCode"]]);
                });
            })
                .catch(function (err) {
                App.loader('hide');
                if ("SF00305_ERR005" === err.code) {
                    swal({
                        title: "Email Invalid",
                        text: message_1.default.get(message_1.MSG.SF00305.ERR005),
                    });
                }
                else {
                    swal({
                        title: "Send error",
                        text: "Something wrong! Please Try Again",
                    });
                }
            });
        }
    };
    /**
     * Remove quotationFile by fileName
     *
     * @param fileName
     */
    SF00305Page.prototype.removeQuotationFile = function (fileName) {
        this.pageData.attachFiles.splice(this.pageData.attachFiles.indexOf(fileName));
    };
    /**
     * Back to SF00304
     */
    SF00305Page.prototype.backToPrevious = function () {
        this.router.navigate(['/home/deal/', this.pageData.dealCode, "exportQuotation", this.pageData.quotationCode, 1]);
    };
    Object.defineProperty(SF00305Page.prototype, "quotationImage", {
        get: function () {
            return this.pageData.quotationImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00305Page.prototype, "contentMail", {
        get: function () {
            return this.pageData.mailContent;
        },
        set: function (value) {
            this.pageData.mailContent = value;
        },
        enumerable: true,
        configurable: true
    });
    SF00305Page.prototype.checkItemEmailValidate = function (emails) {
        var checkEmailValidate = true;
        if (emails) {
            emails.forEach(function (item) {
                if (validator_util_1.default.isValidEmail(item) == false) {
                    checkEmailValidate = false;
                }
            });
        }
        return checkEmailValidate;
    };
    SF00305Page = __decorate([
        core_1.Component({
            templateUrl: "./SF00305.page.html",
            styleUrls: ["SF00305.page.css"]
        }), 
        __metadata('design:paramtypes', [SF00305_service_1.SF00305Service, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, router_1.Router])
    ], SF00305Page);
    return SF00305Page;
}(common_page_1.CommonPage));
exports.SF00305Page = SF00305Page;
//# sourceMappingURL=SF00305.page.js.map