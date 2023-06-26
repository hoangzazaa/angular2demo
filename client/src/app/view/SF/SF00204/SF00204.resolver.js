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
var SF00204_service_1 = require("./SF00204.service");
var SF00204Resolver = (function (_super) {
    __extends(SF00204Resolver, _super);
    function SF00204Resolver(pageService, router) {
        _super.call(this, router);
        this.pageService = pageService;
    }
    SF00204Resolver.prototype.resolve = function (route, state) {
        var _this = this;
        return this.pageService.initData().catch(function (err) {
            return _this.url();
        });
    };
    SF00204Resolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SF00204_service_1.SF00204Service, router_1.Router])
    ], SF00204Resolver);
    return SF00204Resolver;
}(common_resolver_1.CommonResolver));
exports.SF00204Resolver = SF00204Resolver;
//# sourceMappingURL=SF00204.resolver.js.map