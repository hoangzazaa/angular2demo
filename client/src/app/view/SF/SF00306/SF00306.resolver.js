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
var SF00306_service_1 = require("./SF00306.service");
var screen_url_1 = require("../../../helper/screen-url");
var SF00306Resolver = (function (_super) {
    __extends(SF00306Resolver, _super);
    function SF00306Resolver(router, service) {
        _super.call(this, router);
        this.service = service;
    }
    SF00306Resolver.prototype.resolve = function (route, state) {
        var _this = this;
        var dealCode = route.params["dealCode"];
        return this.service.initData(dealCode).catch(function (err) {
            return _this.url();
        });
    };
    SF00306Resolver.prototype.url = function () {
        return screen_url_1.ScreenUrl.SF00201;
    };
    SF00306Resolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, SF00306_service_1.SF00306Service])
    ], SF00306Resolver);
    return SF00306Resolver;
}(common_resolver_1.CommonResolver));
exports.SF00306Resolver = SF00306Resolver;
//# sourceMappingURL=SF00306.resolver.js.map