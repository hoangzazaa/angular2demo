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
var CC00100_service_1 = require("../../CC/CC00100/CC00100.service");
var common_page_1 = require("../COMMON/common.page");
var SF09000Page = (function (_super) {
    __extends(SF09000Page, _super);
    function SF09000Page(authService, router, route) {
        _super.call(this, router, route);
        this.authService = authService;
        if (authService.user != undefined) {
            this.username = authService.user.username;
        }
    }
    SF09000Page.prototype.logout = function () {
        if (!this.authService.logout()) {
            this.router.navigate(['login']);
        }
    };
    SF09000Page = __decorate([
        core_1.Component({
            selector: "header-component",
            templateUrl: "./SF09000.page.html"
        }), 
        __metadata('design:paramtypes', [CC00100_service_1.CC00100Service, router_1.Router, router_1.ActivatedRoute])
    ], SF09000Page);
    return SF09000Page;
}(common_page_1.CommonPage));
exports.SF09000Page = SF09000Page;
//# sourceMappingURL=SF09000.page.js.map