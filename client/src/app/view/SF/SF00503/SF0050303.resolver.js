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
var SF00503_service_1 = require("./SF00503.service");
var CC00100_service_1 = require("../../CC/CC00100/CC00100.service");
/**
 * Data quotation info page SF00303
 *
 * 使用する API は /SF0050301 と /SF0050305
 * @author hoangtd
 */
var SF0050303Resolver = (function (_super) {
    __extends(SF0050303Resolver, _super);
    function SF0050303Resolver(router, sf00503Service, authService) {
        _super.call(this, router);
        this.sf00503Service = sf00503Service;
        this.authService = authService;
    }
    SF0050303Resolver.prototype.resolve = function (route, state) {
        var _this = this;
        var departmentId = 0;
        if (this.authService.user != undefined) {
            departmentId = this.authService.user.departmentId;
        }
        return this.sf00503Service.getDepartment().then(function (data) {
            var isSalesDepartment = false;
            if (departmentId > 0) {
                data.departments.forEach(function (department) {
                    if (department.id == departmentId) {
                        isSalesDepartment = true;
                    }
                });
            }
            if (!isSalesDepartment) {
                departmentId = data.departments[0].id;
            }
            return _this.sf00503Service.getInitTab2(departmentId, undefined).then(function (data) {
                return data;
            });
        });
    };
    SF0050303Resolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, SF00503_service_1.SF00503Service, CC00100_service_1.CC00100Service])
    ], SF0050303Resolver);
    return SF0050303Resolver;
}(common_resolver_1.CommonResolver));
exports.SF0050303Resolver = SF0050303Resolver;
//# sourceMappingURL=SF0050303.resolver.js.map