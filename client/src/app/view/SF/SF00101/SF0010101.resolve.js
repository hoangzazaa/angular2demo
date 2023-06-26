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
var SF00101_service_1 = require("./SF00101.service");
/**
 * Created by ASUS on 6/6/2017.
 * Init data department and user
 */
var SF0010101Resolve = (function (_super) {
    __extends(SF0010101Resolve, _super);
    function SF0010101Resolve(pageService, router) {
        _super.call(this, router);
        this.pageService = pageService;
    }
    SF0010101Resolve.prototype.resolve = function (route, state) {
        return this.pageService.initDataScreen();
    };
    SF0010101Resolve = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SF00101_service_1.SF00101Service, router_1.Router])
    ], SF0010101Resolve);
    return SF0010101Resolve;
}(common_resolver_1.CommonResolver));
exports.SF0010101Resolve = SF0010101Resolve;
//# sourceMappingURL=SF0010101.resolve.js.map