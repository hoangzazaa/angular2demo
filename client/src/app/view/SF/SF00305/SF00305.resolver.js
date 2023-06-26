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
var router_1 = require("@angular/router");
var common_resolver_1 = require("../../../resolver/common-resolver");
var SF00305_service_1 = require("./SF00305.service");
/**
 * Created by VuPT on 11/17/2016.
 */
var SF00305Resolver = (function (_super) {
    __extends(SF00305Resolver, _super);
    function SF00305Resolver(sf00305Service, router) {
        _super.call(this, router);
        this.sf00305Service = sf00305Service;
    }
    SF00305Resolver.prototype.resolve = function (route, state) {
        var _this = this;
        var quotationCode = route.params["quotationCode"];
        return this.sf00305Service.getInit(quotationCode).catch(function (err) {
            _this.doCheck("");
        });
    };
    SF00305Resolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SF00305_service_1.SF00305Service, router_1.Router])
    ], SF00305Resolver);
    return SF00305Resolver;
}(common_resolver_1.CommonResolver));
exports.SF00305Resolver = SF00305Resolver;
//# sourceMappingURL=SF00305.resolver.js.map