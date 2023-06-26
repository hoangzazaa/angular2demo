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
var message_1 = require("../../../../helper/message");
var constants_1 = require("../../../../helper/constants");
var SF00310_service_1 = require("../SF00310.service");
var SF00310_helper_1 = require("../SF00310.helper");
var SF00301002MailModalComponent = (function () {
    function SF00301002MailModalComponent(sf00310Service) {
        this.sf00310Service = sf00310Service;
        this.applyMail = new core_1.EventEmitter();
    }
    SF00301002MailModalComponent.prototype.ngAfterViewInit = function () {
        // disabled input tags
        $('.tagsinput input').attr("readonly", true);
    };
    Object.defineProperty(SF00301002MailModalComponent.prototype, "sf00310Data", {
        get: function () {
            return this.sf00310Service.pageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301002MailModalComponent.prototype, "to", {
        get: function () {
            return this.sf00310Data.mailRequest.addressTo;
        },
        set: function (addresses) {
            this.sf00310Data.mailRequest.addressTo = (addresses || []).filter(function (item) { return !!item; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301002MailModalComponent.prototype, "cc", {
        get: function () {
            return this.sf00310Data.mailRequest.addressCc;
        },
        set: function (addresses) {
            this.sf00310Data.mailRequest.addressCc = (addresses || []).filter(function (item) { return !!item; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301002MailModalComponent.prototype, "subject", {
        get: function () {
            return this.sf00310Data.mailRequest.subject;
        },
        set: function (val) {
            this.sf00310Data.mailRequest.subject = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301002MailModalComponent.prototype, "content", {
        get: function () {
            return this.sf00310Data.mailRequest.content;
        },
        set: function (val) {
            this.sf00310Data.mailRequest.content = val;
        },
        enumerable: true,
        configurable: true
    });
    SF00301002MailModalComponent.prototype.valid = function () {
        if (validator_util_1.default.isEmpty(this.sf00310Data.mailRequest.addressTo)) {
            swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00310.ERR004), "error");
            return false;
        }
        if (validator_util_1.default.isEmpty(this.sf00310Data.mailRequest.subject)) {
            swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00310.ERR003), "error");
            return false;
        }
        if (validator_util_1.default.isEmpty(this.sf00310Data.mailRequest.content)) {
            swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00310.ERR005), "error");
            return false;
        }
        return true;
    };
    SF00301002MailModalComponent.prototype.send = function () {
        if (this.valid()) {
            this.applyMail.emit();
        }
    };
    SF00301002MailModalComponent.prototype.searchUserPicTO = function () {
        this.closeRequest();
        this.sf00310Data.typeAddress = "TO";
        this.showPic();
    };
    SF00301002MailModalComponent.prototype.searchUserPicCC = function () {
        this.closeRequest();
        this.sf00310Data.typeAddress = "CC";
        this.showPic();
    };
    SF00301002MailModalComponent.prototype.closeRequest = function () {
        $("#sendRequestModal").modal('hide');
    };
    SF00301002MailModalComponent.prototype.showRequest = function () {
        $("#sendRequestModal").modal('show');
    };
    SF00301002MailModalComponent.prototype.showPic = function () {
        // reset list user pic
        this.sf00310Data.userPicModals = [];
        // set default department
        this.sf00310Data.listDepartmentScreen = SF00310_helper_1.SF00310Helper.cloneDepartmentModel(this.sf00310Data.departments);
        this.sf00310Data.listDepartmentScreen.forEach(function (data) {
            data["active"] = false;
        });
        this.sf00310Data.listPicScreen = this.sf00310Data.listDepartmentScreen[0].users;
        this.sf00310Data.listPicScreen.forEach(function (item) {
            item["active"] = false;
        });
        this.sf00310Data.listDepartmentScreen[0]['active'] = true;
        // show modal search pic
        $("#searchModal").modal('show');
        $('.tagsinput input').removeAttr("readonly");
        setTimeout(function () {
            //scoll userPic
            $('#table-body-userPic').scrollTop(0);
            $('#table-body-department').scrollTop(0);
        }, 300);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF00301002MailModalComponent.prototype, "applyMail", void 0);
    SF00301002MailModalComponent = __decorate([
        core_1.Component({
            selector: "[sf0031002]",
            templateUrl: "SF0031002.MailModal.component.html"
        }), 
        __metadata('design:paramtypes', [SF00310_service_1.SF00310Service])
    ], SF00301002MailModalComponent);
    return SF00301002MailModalComponent;
}());
exports.SF00301002MailModalComponent = SF00301002MailModalComponent;
//# sourceMappingURL=SF0031002.MailModal.component.js.map