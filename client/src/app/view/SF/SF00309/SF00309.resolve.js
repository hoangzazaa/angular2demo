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
var SF00309_service_1 = require("./SF00309.service");
var core_1 = require("@angular/core");
/**
 * Created by ASUS on 5/8/2017.
 */
var SF00309Resolve = (function (_super) {
    __extends(SF00309Resolve, _super);
    /*override*/
    function SF00309Resolve(router, pageService) {
        _super.call(this, router);
        this.pageService = pageService;
    }
    /*init data page*/
    SF00309Resolve.prototype.resolve = function (route, state) {
        var _this = this;
        var dealCode = route.params["dealCode"];
        var requestType = route.params["requestType"];
        if (dealCode != undefined) {
            return this.pageService.initData(dealCode, requestType).catch(function (err) {
                // data deal not found
                if (err["code"] == "SF00309_WRN001") {
                    return _this.doCheck(dealCode);
                }
            });
        }
        else {
            this.url();
        }
    };
    SF00309Resolve = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, SF00309_service_1.SF00309Service])
    ], SF00309Resolve);
    return SF00309Resolve;
}(common_resolver_1.CommonResolver));
exports.SF00309Resolve = SF00309Resolve;
//# sourceMappingURL=SF00309.resolve.js.map