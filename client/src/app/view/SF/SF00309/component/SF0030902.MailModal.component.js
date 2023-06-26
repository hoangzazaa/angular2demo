"use strict";
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
var validator_util_1 = require("../../../../util/validator-util");
var constants_1 = require("../../../../helper/constants");
var message_1 = require("../../../../helper/message");
var SF00309_service_1 = require("../SF00309.service");
var SF00309_helper_1 = require("../SF00309.helper");
var SF00300902MailModalComponent = (function () {
    function SF00300902MailModalComponent(sf00309Service) {
        this.sf00309Service = sf00309Service;
        this.applyMail = new core_1.EventEmitter();
        this.uploadProcessing = false;
        this.currentFileData = {};
    }
    SF00300902MailModalComponent.prototype.ngAfterViewInit = function () {
        // disabled input tags
        $('.tagsinput input').attr("readonly", true);
    };
    Object.defineProperty(SF00300902MailModalComponent.prototype, "sf00309Data", {
        get: function () {
            return this.sf00309Service.pageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00300902MailModalComponent.prototype, "to", {
        get: function () {
            return this.sf00309Data.mailRequest.addressTo;
        },
        set: function (addresses) {
            this.sf00309Data.mailRequest.addressTo = (addresses || []).filter(function (item) { return !!item; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00300902MailModalComponent.prototype, "cc", {
        get: function () {
            return this.sf00309Data.mailRequest.addressCc;
        },
        set: function (addresses) {
            this.sf00309Data.mailRequest.addressCc = (addresses || []).filter(function (item) { return !!item; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00300902MailModalComponent.prototype, "subject", {
        get: function () {
            return this.sf00309Data.mailRequest.subject;
        },
        set: function (val) {
            this.sf00309Data.mailRequest.subject = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00300902MailModalComponent.prototype, "content", {
        get: function () {
            return this.sf00309Data.mailRequest.content;
        },
        set: function (val) {
            this.sf00309Data.mailRequest.content = val;
        },
        enumerable: true,
        configurable: true
    });
    SF00300902MailModalComponent.prototype.valid = function () {
        if (validator_util_1.default.isEmpty(this.sf00309Data.mailRequest.addressTo)) {
            swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00309.ERR004), "error");
            return false;
        }
        if (validator_util_1.default.isEmpty(this.sf00309Data.mailRequest.subject)) {
            swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00309.ERR003), "error");
            return false;
        }
        if (validator_util_1.default.isEmpty(this.sf00309Data.mailRequest.content)) {
            swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00309.ERR005), "error");
            return false;
        }
        return true;
    };
    SF00300902MailModalComponent.prototype.send = function () {
        if (this.valid() && !this.uploadProcessing) {
            this.applyMail.emit();
        }
    };
    SF00300902MailModalComponent.prototype.searchUserPicTO = function () {
        this.closeRequest();
        this.sf00309Data.typeAddress = "TO";
        this.showPic();
    };
    SF00300902MailModalComponent.prototype.searchUserPicCC = function () {
        this.closeRequest();
        this.sf00309Data.typeAddress = "CC";
        this.showPic();
    };
    SF00300902MailModalComponent.prototype.closeRequest = function () {
        $("#sendRequestModal").modal('hide');
    };
    SF00300902MailModalComponent.prototype.showRequest = function () {
        $("#sendRequestModal").modal('show');
    };
    SF00300902MailModalComponent.prototype.fileChange = function (event) {
        var _this = this;
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            var ext_1 = (file.name + "").split(".").pop().toUpperCase();
            if (SF00300902MailModalComponent.ACCEPTED_EXTENSIONS.find(function (el) { return el == ext_1; }) == null) {
                event.target.value = '';
                return this.handleFileUploadError("ファイル形式を確認してください。画像ファイルはJPG、PNG形式のみ対応しています。");
            }
            // check file size
            var current_size = 0;
            this.sf00309Data.mailRequest.attachmentFiles.forEach(function (f) {
                current_size += f.size;
            });
            if (current_size + file.size > SF00300902MailModalComponent.MAX_ATTACH_MENT_SIZE) {
                event.target.value = '';
                return this.handleFileUploadError("\u8CBC\u4ED8\u53EF\u80FD\u306A\u30D5\u30A1\u30A4\u30EB\u30B5\u30A4\u30BA\u306F\u5408\u8A08" + this.bytesToMegabyte(SF00300902MailModalComponent.MAX_ATTACH_MENT_SIZE) + "\u3067\u3059\u3002");
            }
            this.uploadProcessing = true;
            this.currentFileData = {
                name: file.name,
                size: file.size,
                tmpName: ""
            };
            this.sf00309Service.saveTemporaryFile(file).then(function (fileName) {
                _this.uploadProcessing = false;
                _this.currentFileData['tmpName'] = fileName;
                _this.sf00309Data.mailRequest.attachmentFiles.push(Object.assign({}, _this.currentFileData));
            }).catch(function () {
                _this.uploadProcessing = false;
                event.target.value = '';
                _this.handleFileUploadError("ファイルのアップロードに失敗しました");
            });
        }
    };
    SF00300902MailModalComponent.prototype.handleFileUploadError = function (message) {
        swal(constants_1.Constants.BLANK, message, "error");
    };
    SF00300902MailModalComponent.prototype.removeFile = function ($event, tmpName) {
        $event.preventDefault();
        this.sf00309Data.mailRequest.attachmentFiles = this.sf00309Data.mailRequest.attachmentFiles.filter(function (o) {
            return (o['tmpName'] != tmpName);
        });
    };
    SF00300902MailModalComponent.prototype.bytesToMegabyte = function (bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0)
            return '0 Byte';
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        var n = bytes / Math.pow(1024, i);
        return Math.round(n * 100) / 100 + ' ' + sizes[i];
    };
    SF00300902MailModalComponent.prototype.showPic = function () {
        // reset list user pic
        this.sf00309Data.userPicModals = [];
        // set default department
        this.sf00309Data.listDepartmentScreen = SF00309_helper_1.SF00309Helper.cloneDepartmentModel(this.sf00309Data.departments);
        this.sf00309Data.listDepartmentScreen.forEach(function (data) {
            data["active"] = false;
        });
        this.sf00309Data.listPicScreen = this.sf00309Data.listDepartmentScreen[0].users;
        this.sf00309Data.listPicScreen.forEach(function (item) {
            item["active"] = false;
        });
        this.sf00309Data.listDepartmentScreen[0]['active'] = true;
        // show modal search pic
        $("#searchModal").modal('show');
        $('.tagsinput input').removeAttr("readonly");
        setTimeout(function () {
            //scoll userPic
            $('#table-body-userPic').scrollTop(0);
            $('#table-body-department').scrollTop(0);
        }, 300);
    };
    SF00300902MailModalComponent.ACCEPTED_EXTENSIONS = ["JPG", "JPEG", "PNG", "PDF"];
    SF00300902MailModalComponent.MAX_ATTACH_MENT_SIZE = 5 * 1024 * 1024; //5MB;
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF00300902MailModalComponent.prototype, "applyMail", void 0);
    SF00300902MailModalComponent = __decorate([
        core_1.Component({
            selector: "[sf0030902]",
            templateUrl: "SF0030902.MailModal.component.html",
            styleUrls: ['SF0030902.MailModal.component.css']
        }), 
        __metadata('design:paramtypes', [SF00309_service_1.SF00309Service])
    ], SF00300902MailModalComponent);
    return SF00300902MailModalComponent;
}());
exports.SF00300902MailModalComponent = SF00300902MailModalComponent;
//# sourceMappingURL=SF0030902.MailModal.component.js.map