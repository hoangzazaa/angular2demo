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
var CC00100_service_1 = require("../view/CC/CC00100/CC00100.service");
var AuthGuard = (function () {
    function AuthGuard(authService, router, neededRoles) {
        this.authService = authService;
        this.router = router;
        this.neededRoles = neededRoles;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return Promise.resolve().then(function () {
            var url = state.url;
            return _this.checkLogin(url);
        });
    };
    AuthGuard.prototype.checkLogin = function (url) {
        var _this = this;
        // immediated check role if user was authenticated
        if (this.authService.isLoggedIn) {
            return this.checkRole();
        }
        return this.authService.authorize().then(function () {
            if (_this.checkRole()) {
                return true;
            }
            if (url !== "/home") {
                _this.router.navigate(['/login'], { queryParams: { back_url: url } });
            }
            else {
                _this.router.navigate(['/login']);
            }
            return false;
        });
    };
    AuthGuard.prototype.checkRole = function () {
        if (this.authService.isLoggedIn) {
            if (this.neededRoles.length > 0) {
                //&& this.neededRoles.filter(role => this.cc00100Service.user.role == role).length > 0 /*donot check this condition at time, default full permission*/
                return true;
            }
        }
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [CC00100_service_1.CC00100Service, router_1.Router, Array])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map