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
var CC00300_service_1 = require("./CC00300.service");
var message_1 = require("../../../helper/message");
var router_1 = require("@angular/router");
var CC00100_service_1 = require("../CC00100/CC00100.service");
var CC00300Page = (function () {
    function CC00300Page(router, service, authService) {
        this.router = router;
        this.service = service;
        this.authService = authService;
    }
    /**
     * Method use to change password.
     */
    CC00300Page.prototype.changePassword = function () {
        var self = this;
        if ($("#cc003-form").valid()) {
            if (self._newPassword == self._currentPassword) {
                swal({ title: message_1.default.get(message_1.MSG.CC00300.ERR007), type: "error" });
                return;
            }
            self.service.changePassword(self._currentPassword, self._newPassword, self._confirmNewPassword)
                .then(function () {
                swal({ title: message_1.default.get(message_1.MSG.CC00300.INF001), type: "success" }, function () {
                    self.authService.isLoggedIn = false;
                    self.router.navigate(['/login']).then(null);
                });
            })
                .catch(function () { return swal({ title: message_1.default.get(message_1.MSG.CC00300.ERR006), type: "error" }); });
        }
    };
    CC00300Page.prototype.ngAfterViewInit = function () {
        $("#current-passwd").rules("add", {
            required: true,
            messages: {
                required: message_1.default.get(message_1.MSG.CC00300.ERR001)
            }
        });
        $("#new-passwd").rules("add", {
            required: true,
            minlength: 6,
            messages: {
                required: message_1.default.get(message_1.MSG.CC00300.ERR002),
                minlength: message_1.default.get(message_1.MSG.CC00300.ERR003, 6, 30)
            }
        });
        $("#confirm-new-passwd").rules("add", {
            required: true,
            minlength: 6,
            equalTo: "#new-passwd",
            messages: {
                required: message_1.default.get(message_1.MSG.CC00300.ERR004),
                equalTo: message_1.default.get(message_1.MSG.CC00300.ERR005),
                minlength: message_1.default.get(message_1.MSG.CC00300.ERR003, 6, 30)
            }
        });
    };
    Object.defineProperty(CC00300Page.prototype, "currentPassword", {
        get: function () {
            return this._currentPassword;
        },
        set: function (value) {
            this._currentPassword = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CC00300Page.prototype, "newPassword", {
        get: function () {
            return this._newPassword;
        },
        set: function (value) {
            this._newPassword = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CC00300Page.prototype, "confirmNewPassword", {
        get: function () {
            return this._confirmNewPassword;
        },
        set: function (value) {
            this._confirmNewPassword = value;
        },
        enumerable: true,
        configurable: true
    });
    CC00300Page = __decorate([
        core_1.Component({
            templateUrl: "CC00300.page.html",
            providers: [CC00300_service_1.CC00300Service]
        }), 
        __metadata('design:paramtypes', [router_1.Router, CC00300_service_1.CC00300Service, CC00100_service_1.CC00100Service])
    ], CC00300Page);
    return CC00300Page;
}());
exports.CC00300Page = CC00300Page;
//# sourceMappingURL=CC00300.page.js.map