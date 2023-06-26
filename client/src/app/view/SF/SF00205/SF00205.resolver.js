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
var SF00205_service_1 = require("./SF00205.service");
/**
 * Created by manhnv on 6/14/2017.
 */
var SF00205Resolver = (function (_super) {
    __extends(SF00205Resolver, _super);
    function SF00205Resolver(router, service) {
        _super.call(this, router);
        this.service = service;
    }
    SF00205Resolver.prototype.resolve = function (route, state) {
        var _this = this;
        return this.service.init().catch(function () {
            _this.service.navigateTo("500 error", '/error/500');
            _this.router.navigate(['/error/500']);
        });
    };
    SF00205Resolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, SF00205_service_1.SF00205Service])
    ], SF00205Resolver);
    return SF00205Resolver;
}(common_resolver_1.CommonResolver));
exports.SF00205Resolver = SF00205Resolver;
//# sourceMappingURL=SF00205.resolver.js.map