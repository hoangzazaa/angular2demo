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
var SF00201_service_1 = require("./SF00201.service");
var common_resolver_1 = require("../../../resolver/common-resolver");
var constants_1 = require("../../../helper/constants");
var SF00201Resolver = (function (_super) {
    __extends(SF00201Resolver, _super);
    function SF00201Resolver(sf00201Service, router) {
        _super.call(this, router);
        this.sf00201Service = sf00201Service;
    }
    SF00201Resolver.prototype.resolve = function (route, state) {
        return this.sf00201Service.getData(constants_1.Constants.FIRST_PAGE);
    };
    SF00201Resolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SF00201_service_1.SF00201Service, router_1.Router])
    ], SF00201Resolver);
    return SF00201Resolver;
}(common_resolver_1.CommonResolver));
exports.SF00201Resolver = SF00201Resolver;
//# sourceMappingURL=SF00201.resolver.js.map