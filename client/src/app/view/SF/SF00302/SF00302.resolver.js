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
var SF00302_service_1 = require("./SF00302.service");
var common_resolver_1 = require("../../../resolver/common-resolver");
/**
 * Created by DungTQ on 12/12/2016
 */
var SF00302Resolver = (function (_super) {
    __extends(SF00302Resolver, _super);
    function SF00302Resolver(sv00302Service, router) {
        _super.call(this, router);
        this.sv00302Service = sv00302Service;
    }
    SF00302Resolver.prototype.resolve = function (route, state) {
        // get params url
        var dealCode = route.params['dealCode'];
        var productCode = route.params['productCode'];
        // call service get data info
        return this.sv00302Service.sv0030201GetDealProduct(dealCode, productCode).then(function (res) {
            return res;
        });
    };
    SF00302Resolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SF00302_service_1.SF00302Service, router_1.Router])
    ], SF00302Resolver);
    return SF00302Resolver;
}(common_resolver_1.CommonResolver));
exports.SF00302Resolver = SF00302Resolver;
//# sourceMappingURL=SF00302.resolver.js.map