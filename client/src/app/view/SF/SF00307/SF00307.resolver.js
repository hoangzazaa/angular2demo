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
/**
 * Created by hoangtd on 4/11/2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_resolver_1 = require("../../../resolver/common-resolver");
var screen_url_1 = require("../../../helper/screen-url");
var SF00307_service_1 = require("./SF00307.service");
var constants_1 = require("../../../helper/constants");
var SF00307Resolver = (function (_super) {
    __extends(SF00307Resolver, _super);
    function SF00307Resolver(router, service) {
        _super.call(this, router);
        this.service = service;
    }
    SF00307Resolver.prototype.resolve = function (route, state) {
        var _this = this;
        this.dealCode = route.params["dealCode"];
        return this.service.initData(this.dealCode).catch(function () {
            return _this.doCheck(_this.dealCode);
        });
    };
    SF00307Resolver.prototype.url = function () {
        return screen_url_1.ScreenUrl.SF00301 + constants_1.Constants.SLASH + this.dealCode;
    };
    SF00307Resolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, SF00307_service_1.SF00307Service])
    ], SF00307Resolver);
    return SF00307Resolver;
}(common_resolver_1.CommonResolver));
exports.SF00307Resolver = SF00307Resolver;
//# sourceMappingURL=SF00307.resolver.js.map