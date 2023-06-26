"use strict";
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
var SF00304_service_1 = require("./SF00304.service");
/**
 * Created by VuPT on 11/14/2016.
 */
var QuotationPrintTemplateResolver = (function () {
    function QuotationPrintTemplateResolver(sf00304Service, router) {
        this.sf00304Service = sf00304Service;
        this.router = router;
    }
    QuotationPrintTemplateResolver.prototype.resolve = function (route, state) {
        return this.sf00304Service.getAllQuotationTemplates().then(function (data) {
            return data;
        });
    };
    QuotationPrintTemplateResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SF00304_service_1.SF00304Service, router_1.Router])
    ], QuotationPrintTemplateResolver);
    return QuotationPrintTemplateResolver;
}());
exports.QuotationPrintTemplateResolver = QuotationPrintTemplateResolver;
//# sourceMappingURL=SF00304.resolver.js.map