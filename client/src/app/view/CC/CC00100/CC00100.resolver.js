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
var CC00100_service_1 = require("./CC00100.service");
var CC00100Resolver = (function (_super) {
    __extends(CC00100Resolver, _super);
    function CC00100Resolver(authService, router) {
        _super.call(this, router);
        this.authService = authService;
    }
    CC00100Resolver.prototype.resolve = function (route, state) {
        if (this.authService.isLoggedIn != undefined) {
            return;
        }
        return this.authService.authorize();
    };
    CC00100Resolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [CC00100_service_1.CC00100Service, router_1.Router])
    ], CC00100Resolver);
    return CC00100Resolver;
}(common_resolver_1.CommonResolver));
exports.CC00100Resolver = CC00100Resolver;
//# sourceMappingURL=CC00100.resolver.js.map