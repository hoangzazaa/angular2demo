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
var SF00301_service_1 = require("./SF00301.service");
var common_resolver_1 = require("../../../resolver/common-resolver");
var message_1 = require("../../../helper/message");
var SF0030102CreateResolver = (function (_super) {
    __extends(SF0030102CreateResolver, _super);
    function SF0030102CreateResolver(router, service) {
        _super.call(this, router);
        this.service = service;
    }
    SF0030102CreateResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var dealCode = route.queryParams['from'];
        if (dealCode === '0') {
            _super.prototype.doCheck.call(this, message_1.MSG.SF00301.ERR002);
        }
        else if (!dealCode) {
            return this.service.initData(SF00301_service_1.SF00301Service.MODE_CREATE);
        }
        else {
            return this.service.initData(SF00301_service_1.SF00301Service.MODE_COPY, dealCode).catch(function (err) {
                _super.prototype.doCheck.call(_this, err);
            });
        }
    };
    SF0030102CreateResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, SF00301_service_1.SF00301Service])
    ], SF0030102CreateResolver);
    return SF0030102CreateResolver;
}(common_resolver_1.CommonResolver));
exports.SF0030102CreateResolver = SF0030102CreateResolver;
//# sourceMappingURL=SF0030102Create.resolver.js.map