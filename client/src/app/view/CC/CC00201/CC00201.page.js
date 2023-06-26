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
var CC00201_service_1 = require("./CC00201.service");
var router_1 = require("@angular/router");
var message_1 = require("../../../helper/message");
var constants_1 = require("../../../helper/constants");
var CC00100_service_1 = require("../CC00100/CC00100.service");
var CC00201Page = (function () {
    function CC00201Page(router, service, authService) {
        this.router = router;
        this.service = service;
        this.authService = authService;
    }
    CC00201Page.prototype.ngAfterViewInit = function () {
        (function ($) {
            $("#request-email").rules("add", {
                required: true,
                email: true,
                messages: {
                    required: message_1.default.get(message_1.MSG.CC00201.ERR001),
                    email: message_1.default.get(message_1.MSG.CC00201.ERR002)
                }
            });
        })(jQuery);
    };
    CC00201Page.prototype.sendMail = function () {
        var self = this;
        if ($("#cc00201-request-form").valid()) {
            self.service
                .recoverPassword(self.email)
                .then(function () {
                self.showSuccessAlert();
            })
                .catch(function (err) {
                if (err.code === 'CC00201_ERR001') {
                    self.showNotExistErrMsg();
                }
                else {
                    self.showInternalErrAlert();
                }
            });
        }
    };
    CC00201Page.prototype.showNotExistErrMsg = function () {
        $("#fg-email-container").addClass("has-error");
        var $errEl = $("#not-exist-email-error");
        if ($errEl.length > 0) {
            $errEl.text(message_1.MSG.CC00201.ERR004);
            $errEl.show();
            return false;
        }
        var el = {
            id: "not-exist-email-error",
            text: message_1.MSG.CC00201.ERR004
        };
        $errEl = jQuery('<div/>', el).addClass("help-block text-right animated fadeInDown");
        $("#email-container").append($errEl);
        return false;
    };
    CC00201Page.prototype.clearNotExistEmailErrMsg = function () {
        $("#not-exist-email-error").remove();
        $("#fg-email-container").removeClass("has-error");
    };
    CC00201Page.prototype.showInternalErrAlert = function () {
        swal({
            title: constants_1.Constants.BLANK,
            text: message_1.MSG.CC00201.ERR003,
            type: 'error',
            confirmButtonText: constants_1.Constants.BACK
        });
    };
    CC00201Page.prototype.showSuccessAlert = function () {
        var self = this;
        swal({
            title: constants_1.Constants.BLANK,
            text: message_1.default.get(message_1.MSG.CC00201.INF001),
            type: 'success',
            confirmButtonText: constants_1.Constants.BACK_TO_LOGIN
        }, function () {
            self.authService.isLoggedIn = false;
            self.router.navigate(['/login']);
        });
    };
    CC00201Page = __decorate([
        core_1.Component({
            selector: "recover-password",
            templateUrl: "./CC00201.page.html",
            providers: [CC00201_service_1.CC00201Service]
        }), 
        __metadata('design:paramtypes', [router_1.Router, CC00201_service_1.CC00201Service, CC00100_service_1.CC00100Service])
    ], CC00201Page);
    return CC00201Page;
}());
exports.CC00201Page = CC00201Page;
//# sourceMappingURL=CC00201.page.js.map