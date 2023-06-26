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
var SF00303_service_1 = require("./SF00303.service");
var common_resolver_1 = require("../../../resolver/common-resolver");
var constants_1 = require("../../../helper/constants");
/**
 * Data quotation info page SF00303
 * @author hoangtd
 */
var SF00303Resolver = (function (_super) {
    __extends(SF00303Resolver, _super);
    function SF00303Resolver(router, sf00303Service) {
        _super.call(this, router);
        this.sf00303Service = sf00303Service;
    }
    SF00303Resolver.prototype.resolve = function (route, state) {
        var _this = this;
        var quotationCode = route.params['quotationCode'];
        var dealCode = route.params['dealCode'];
        return this.sf00303Service.getQuotationInfo(dealCode, quotationCode).then(function (data) {
            if (data)
                return data;
            _super.prototype.doCheck.call(_this, dealCode + constants_1.Constants.COMMA + quotationCode);
        }).catch(function (err) {
            return _this.url();
        });
    };
    SF00303Resolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, SF00303_service_1.SF00303Service])
    ], SF00303Resolver);
    return SF00303Resolver;
}(common_resolver_1.CommonResolver));
exports.SF00303Resolver = SF00303Resolver;
//# sourceMappingURL=SF00303.resolver.js.map