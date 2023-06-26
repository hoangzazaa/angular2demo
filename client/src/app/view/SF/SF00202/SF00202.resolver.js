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
var SF00202_service_1 = require("./SF00202.service");
var common_resolver_1 = require("../../../resolver/common-resolver");
var SF00202Resolver = (function (_super) {
    __extends(SF00202Resolver, _super);
    function SF00202Resolver(sf00202Service, router) {
        _super.call(this, router);
        this.sf00202Service = sf00202Service;
    }
    SF00202Resolver.prototype.resolve = function (route, state) {
        return this.sf00202Service.initData();
    };
    SF00202Resolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SF00202_service_1.SF00202Service, router_1.Router])
    ], SF00202Resolver);
    return SF00202Resolver;
}(common_resolver_1.CommonResolver));
exports.SF00202Resolver = SF00202Resolver;
//# sourceMappingURL=SF00202.resolver.js.map