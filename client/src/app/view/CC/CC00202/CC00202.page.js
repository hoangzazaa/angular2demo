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
var CC00202_service_1 = require("./CC00202.service");
var router_1 = require("@angular/router");
var message_1 = require("../../../helper/message");
var constants_1 = require("../../../helper/constants");
var CC00100_service_1 = require("../CC00100/CC00100.service");
var CC00202Page = (function () {
    function CC00202Page(router, route, service, authService) {
        this.router = router;
        this.route = route;
        this.service = service;
        this.authService = authService;
        this.token = this.route.snapshot.params["tokenKey"];
    }
    CC00202Page.prototype.ngAfterViewInit = function () {
        (function ($) {
            $(generateValidationRules);
            function generateValidationRules() {
                var $password = $("#new-passwd");
                var $confirmPassword = $("#confirm-new-passwd");
                $password.rules("add", {
                    required: true,
                    minlength: 6,
                    messages: {
                        required: message_1.default.get(message_1.MSG.CC00202.ERR001),
                        minlength: message_1.default.get(message_1.MSG.CC00202.ERR003, 6, 30)
                    }
                });
                $confirmPassword.rules("add", {
                    required: true,
                    minlength: 6,
                    equalTo: $password,
                    messages: {
                        required: message_1.default.get(message_1.MSG.CC00202.ERR002),
                        equalTo: message_1.default.get(message_1.MSG.CC00202.ERR004),
                        minlength: message_1.default.get(message_1.MSG.CC00202.ERR003, 6, 30)
                    }
                });
            }
        })(jQuery);
    };
    CC00202Page.prototype.resetPassword = function () {
        var self = this;
        (function ($) {
            if ($("#cc00202-reset-password").valid()) {
                self.service
                    .resetPassword(self.token, self.password)
                    .then(showSuccessForUser)
                    .catch(handleError);
            }
            function showSuccessForUser(res) {
                /* Password has been reset, please login.*/
                swal({
                    title: constants_1.Constants.BLANK,
                    text: message_1.default.get(message_1.MSG.CC00202.INF001),
                    type: 'success',
                    confirmButtonText: constants_1.Constants.BACK_TO_LOGIN
                }, function () {
                    self.authService.isLoggedIn = false;
                    self.router.navigate(['/login']);
                });
            }
            function handleError(err) {
                var errorCode = err.code;
                var msg = constants_1.Constants.BLANK;
                if (errorCode === "ERR_CC00202_INVALID_TOKEN") {
                    // when recover link was expired!
                    msg = message_1.default.get(message_1.MSG.CC00202.ERR005);
                }
                else if (errorCode === "ERR_USER_NOT_EXIST") {
                    // This user is inactive or was deleted!
                    msg = message_1.default.get(message_1.MSG.CC00202.ERR006);
                }
                showErrorForUser(msg);
            }
            function showErrorForUser(msg) {
                swal({
                    title: constants_1.Constants.BLANK,
                    text: msg,
                    type: 'error',
                    confirmButtonText: constants_1.Constants.BACK
                });
            }
        })(jQuery);
    };
    CC00202Page = __decorate([
        core_1.Component({
            selector: "reset-password",
            templateUrl: "./CC00202.page.html",
            providers: [CC00202_service_1.CC00202Service]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, CC00202_service_1.CC00202Service, CC00100_service_1.CC00100Service])
    ], CC00202Page);
    return CC00202Page;
}());
exports.CC00202Page = CC00202Page;
//# sourceMappingURL=CC00202.page.js.map