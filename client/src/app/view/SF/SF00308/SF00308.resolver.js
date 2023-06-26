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
var common_resolver_1 = require("../../../resolver/common-resolver");
var router_1 = require("@angular/router");
var SF00308_service_1 = require("./SF00308.service");
/**
 * Created by hoangtd on 3/16/2017.
 */
var SF00308Resolver = (function (_super) {
    __extends(SF00308Resolver, _super);
    function SF00308Resolver(pageService, router) {
        _super.call(this, router);
        this.pageService = pageService;
    }
    SF00308Resolver.prototype.resolve = function (route, state) {
        var _this = this;
        var dealCode = route.params["dealCode"];
        return this.pageService.getInitData(dealCode).catch(function (err) {
            _this.doCheck("");
        });
    };
    SF00308Resolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SF00308_service_1.SF00308Service, router_1.Router])
    ], SF00308Resolver);
    return SF00308Resolver;
}(common_resolver_1.CommonResolver));
exports.SF00308Resolver = SF00308Resolver;
//# sourceMappingURL=SF00308.resolver.js.map