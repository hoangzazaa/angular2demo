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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var GenericProvider_1 = require("../../../../component/GenericProvider");
var MailModal_model_1 = require("./MailModal.model");
var MailModalComponent = (function () {
    function MailModalComponent(rltProvider) {
        this.model = rltProvider.provider;
        this.data = this.model.data;
        this.sendEnable = true;
    }
    Object.defineProperty(MailModalComponent.prototype, "addressTo", {
        //region Bindings
        get: function () {
            return this.data.mail.mm_addressTo;
        },
        set: function (value) {
            this.data.mail.mm_addressTo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailModalComponent.prototype, "addressCc", {
        get: function () {
            return this.data.mail.mm_addressCc;
        },
        set: function (value) {
            this.data.mail.mm_addressCc = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailModalComponent.prototype, "subject", {
        get: function () {
            return this.data.mail.mm_subject;
        },
        set: function (value) {
            this.data.mail.mm_subject = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailModalComponent.prototype, "content", {
        get: function () {
            return this.data.mail.mm_content;
        },
        set: function (value) {
            this.data.mail.mm_content = value;
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    MailModalComponent.prototype.open = function () {
        // open modal
        $(this.modalE.nativeElement).modal('show');
    };
    MailModalComponent.prototype.close = function () {
        $(this.modalE.nativeElement).modal('hide');
    };
    MailModalComponent.prototype.cancel = function () {
        this.close();
    };
    MailModalComponent.prototype.submit = function () {
        var _this = this;
        this.sendEnable = false;
        OneUI.blocks(this.blockE.nativeElement, "state_loading");
        this.model.sendMail().catch().then(function () {
            _this.sendEnable = true;
            OneUI.blocks(_this.blockE.nativeElement, "state_normal");
            _this.close();
        });
    };
    __decorate([
        core_1.ViewChild("modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], MailModalComponent.prototype, "modalE", void 0);
    __decorate([
        core_1.ViewChild("block"), 
        __metadata('design:type', core_1.ElementRef)
    ], MailModalComponent.prototype, "blockE", void 0);
    MailModalComponent = __decorate([
        core_1.Component({
            selector: "[mail-modal]",
            templateUrl: "MailModal.component.html",
            styleUrls: ["MailModal.component.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(0, core_1.Inject(MailModal_model_1.MailModalModel.PROVIDER)), 
        __metadata('design:paramtypes', [GenericProvider_1.GenericProvider])
    ], MailModalComponent);
    return MailModalComponent;
}());
exports.MailModalComponent = MailModalComponent;
//# sourceMappingURL=MailModal.component.js.map