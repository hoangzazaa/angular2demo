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
var router_1 = require("@angular/router");
var common_resolver_1 = require("../../../resolver/common-resolver");
var SF00310_service_1 = require("./SF00310.service");
var core_1 = require("@angular/core");
/**
 * Created by ASUS on 5/8/2017.
 */
var SF00310Resolve = (function (_super) {
    __extends(SF00310Resolve, _super);
    /*override*/
    function SF00310Resolve(router, pageService) {
        _super.call(this, router);
        this.pageService = pageService;
    }
    /*init data page*/
    SF00310Resolve.prototype.resolve = function (route, state) {
        var _this = this;
        var dealCode = route.params["dealCode"];
        return this.pageService.initData(dealCode).catch(function () {
            return _this.doCheck(dealCode);
        });
    };
    SF00310Resolve = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, SF00310_service_1.SF00310Service])
    ], SF00310Resolve);
    return SF00310Resolve;
}(common_resolver_1.CommonResolver));
exports.SF00310Resolve = SF00310Resolve;
//# sourceMappingURL=SF00310.resolve.js.map