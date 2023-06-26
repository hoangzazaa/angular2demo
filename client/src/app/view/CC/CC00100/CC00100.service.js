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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
require("rxjs/add/operator/toPromise");
var User_model_1 = require("../../../model/core/User.model");
var common_service_1 = require("../../../service/common.service");
var md5_1 = require('ts-md5/dist/md5');
var CC00100Service = (function (_super) {
    __extends(CC00100Service, _super);
    function CC00100Service(http, router) {
        _super.call(this, http, router);
    }
    CC00100Service.prototype.login = function (email, password, remember) {
        var self = this;
        var req = {
            email: email,
            password: md5_1.Md5.hashStr(password),
            rememberMe: remember
        };
        return self.postApi("/CC00101", req).then(function (res) {
            self.isLoggedIn = true;
            self.user = self.getLoginUser(res.data);
        }, function (err) {
            self.isLoggedIn = false;
            throw err;
        });
    };
    CC00100Service.prototype.authorize = function () {
        var _this = this;
        return this.getApi("/CC00102").then(function (res) {
            _this.isLoggedIn = true;
            _this.user = _this.getLoginUser(res.data);
        }, function (err) {
            console.log(err);
        });
    };
    CC00100Service.prototype.logout = function () {
        var _this = this;
        return this.getApi("/CC00103").then(function (data) {
            _this.isLoggedIn = false;
            _this.user = new User_model_1.User();
            _this.router.navigate(['/login']);
            return data;
        }, function (err) {
            console.log(err);
            return err;
        });
    };
    CC00100Service.prototype.getLoginUser = function (data) {
        var login = new User_model_1.User();
        login.setUser(data);
        return login;
    };
    CC00100Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], CC00100Service);
    return CC00100Service;
}(common_service_1.CommonService));
exports.CC00100Service = CC00100Service;
//# sourceMappingURL=CC00100.service.js.map