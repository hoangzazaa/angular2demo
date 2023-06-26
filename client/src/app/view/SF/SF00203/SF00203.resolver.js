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
///<reference path="../../../../../typings/globals/core-js/index.d.ts"/>
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_resolver_1 = require("../../../resolver/common-resolver");
var constants_1 = require("../../../helper/constants");
var SF00203_service_1 = require("./SF00203.service");
var SF00203Resolver = (function (_super) {
    __extends(SF00203Resolver, _super);
    function SF00203Resolver(sf00203Service, router) {
        _super.call(this, router);
        this.sf00203Service = sf00203Service;
    }
    SF00203Resolver.prototype.resolve = function (route, state) {
        return this.sf00203Service.getResults(constants_1.Constants.FIRST_PAGE);
    };
    SF00203Resolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SF00203_service_1.SF00203Service, router_1.Router])
    ], SF00203Resolver);
    return SF00203Resolver;
}(common_resolver_1.CommonResolver));
exports.SF00203Resolver = SF00203Resolver;
//# sourceMappingURL=SF00203.resolver.js.map