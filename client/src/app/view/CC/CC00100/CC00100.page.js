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
var router_1 = require("@angular/router");
var constants_1 = require("../../../helper/constants");
var message_1 = require("../../../helper/message");
var CC00100_service_1 = require("./CC00100.service");
var CC00100Page = (function () {
    function CC00100Page(router, route, authService) {
        this.router = router;
        this.route = route;
        this.authService = authService;
    }
    /**
     * @Override interface OnInit
     * */
    CC00100Page.prototype.ngOnInit = function () {
        // restore checkbox's state
        this.remember = (localStorage.getItem("isRemember") == "true");
        var self = this;
        if (this.authService.isLoggedIn) {
            this.router.navigate(['/']);
            return;
        }
        this.navSub = this.route.queryParams.subscribe(function (params) {
            self.redirectUrl = params["back_url"];
        });
    };
    CC00100Page.prototype.ngOnDestroy = function () {
        if (!!this.navSub)
            this.navSub.unsubscribe();
    };
    /**
     * Submit login user
     * @return: redirect page
     */
    CC00100Page.prototype.login = function () {
        var _this = this;
        if ($("#cc00100-login-form").valid()) {
            this.authService.login(this.email, this.password, this.remember)
                .then(function () {
                // set checkbox's state
                if (_this.remember)
                    localStorage.setItem("isRemember", "true");
                else
                    localStorage.setItem("isRemember", "false");
                if (!!_this.redirectUrl) {
                    _this.router.navigate([_this.redirectUrl]);
                    _this.redirectUrl = null;
                }
                else {
                    _this.router.navigate(['/home']);
                }
            })
                .catch(function (err) {
                swal({
                    title: constants_1.Constants.BLANK,
                    text: message_1.default.get(message_1.MSG.CC00100.ERR004),
                    type: "error",
                    confirmButtonText: constants_1.Constants.TRY_AGAIN
                });
                _this.password = null;
                _this.remember = false;
                localStorage.setItem("isRemember", "false");
            });
        }
    };
    /**
     * @Override interface AfterViewInit
     */
    CC00100Page.prototype.ngAfterViewInit = function () {
        $("#login-email").rules("add", {
            required: true,
            email: true,
            messages: {
                required: message_1.default.get(message_1.MSG.CC00100.ERR001),
                email: message_1.default.get(message_1.MSG.CC00100.ERR003)
            }
        });
        $("#login-password").rules("add", {
            required: true,
            messages: {
                required: message_1.default.get(message_1.MSG.CC00100.ERR002)
            }
        });
    };
    CC00100Page = __decorate([
        core_1.Component({
            selector: "login-page",
            templateUrl: "./CC00100.page.html"
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, CC00100_service_1.CC00100Service])
    ], CC00100Page);
    return CC00100Page;
}());
exports.CC00100Page = CC00100Page;
//# sourceMappingURL=CC00100.page.js.map