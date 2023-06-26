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
var constants_1 = require("../../../../helper/constants");
var message_1 = require("../../../../helper/message");
var validator_util_1 = require("../../../../util/validator-util");
var SF00306_service_1 = require("../SF00306.service");
var SF00306_helper_1 = require("../SF00306.helper");
var SF00306MailModalComponent = (function () {
    function SF00306MailModalComponent(sf00306Service) {
        this.sf00306Service = sf00306Service;
        this.applyMail = new core_1.EventEmitter();
    }
    SF00306MailModalComponent.prototype.ngAfterViewInit = function () {
        // disabled input tags
        $('.tagsinput input').attr("readonly", true);
    };
    Object.defineProperty(SF00306MailModalComponent.prototype, "pageData", {
        get: function () {
            return this.sf00306Service.pageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00306MailModalComponent.prototype, "to", {
        get: function () {
            return this.pageData.mailModelScreen.addressTo;
        },
        set: function (address) {
            this.pageData.mailModelScreen.addressTo = (address || []).filter(function (item) { return !!item; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00306MailModalComponent.prototype, "cc", {
        get: function () {
            return this.pageData.mailModelScreen.addressCc;
        },
        set: function (address) {
            this.pageData.mailModelScreen.addressCc = (address || []).filter(function (item) { return !!item; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00306MailModalComponent.prototype, "subject", {
        get: function () {
            return this.pageData.mailModelScreen.subject;
        },
        set: function (val) {
            this.pageData.mailModelScreen.subject = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00306MailModalComponent.prototype, "content", {
        get: function () {
            return this.pageData.mailModelScreen.content;
        },
        set: function (val) {
            this.pageData.mailModelScreen.content = val;
        },
        enumerable: true,
        configurable: true
    });
    SF00306MailModalComponent.prototype.valid = function () {
        if (validator_util_1.default.isEmpty(this.pageData.mailModelScreen.addressTo)) {
            swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00306.ERR004), "error");
            return false;
        }
        if (validator_util_1.default.isEmpty(this.pageData.mailModelScreen.subject)) {
            swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00306.ERR003), "error");
            return false;
        }
        if (validator_util_1.default.isEmpty(this.pageData.mailModelScreen.content)) {
            swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00306.ERR005), "error");
            return false;
        }
        return true;
    };
    SF00306MailModalComponent.prototype.send = function () {
        if (this.valid()) {
            this.applyMail.emit();
        }
    };
    SF00306MailModalComponent.prototype.closeRequest = function () {
        $("#sendRequestModal").modal('hide');
    };
    SF00306MailModalComponent.prototype.showRequest = function () {
        $("#sendRequestModal").modal('show');
    };
    SF00306MailModalComponent.prototype.showPic = function () {
        // reset list user pic
        this.pageData.userPicModals = [];
        // set default department
        this.pageData.listDepartmentScreen = SF00306_helper_1.SF00306Helper.cloneDepartmentModel(this.pageData.departments);
        this.pageData.listDepartmentScreen.forEach(function (data) {
            data["active"] = false;
        });
        this.pageData.listPicScreen = this.pageData.listDepartmentScreen[0].users;
        this.pageData.listDepartmentScreen[0]['active'] = true;
        // show modal search pic
        $("#searchModal").modal('show');
        $('.tagsinput input').removeAttr("readonly");
        setTimeout(function () {
            //scoll userPic
            //waiting render modal 0.3 s
            $('#table-body-userPic').scrollTop(0);
            $('#table-body-department').scrollTop(0);
        }, 300);
    };
    SF00306MailModalComponent.prototype.searchUserPicTO = function () {
        this.closeRequest();
        this.pageData.typeAddress = "TO";
        this.showPic();
    };
    SF00306MailModalComponent.prototype.searchUserPicCC = function () {
        this.closeRequest();
        this.pageData.typeAddress = "CC";
        this.showPic();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF00306MailModalComponent.prototype, "applyMail", void 0);
    SF00306MailModalComponent = __decorate([
        core_1.Component({
            selector: "sf00306Mail",
            templateUrl: "SF00306.MailModal.component.html"
        }), 
        __metadata('design:paramtypes', [SF00306_service_1.SF00306Service])
    ], SF00306MailModalComponent);
    return SF00306MailModalComponent;
}());
exports.SF00306MailModalComponent = SF00306MailModalComponent;
//# sourceMappingURL=SF00306.MailModal.component.js.map