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
var common_page_1 = require("../COMMON/common.page");
var SF00100_page_1 = require("./SF00100.page");
var SF09100Page = (function (_super) {
    __extends(SF09100Page, _super);
    function SF09100Page(router, route, sf00100page) {
        _super.call(this, router, route);
        this.sf00100page = sf00100page;
    }
    SF09100Page.prototype.navigate = function (url, isNotADashboard) {
        this.sf00100page.isShowSideMenu = false;
        OneUI.layout("sidebar_mini_off");
        return _super.prototype.navigate.call(this, url);
    };
    SF09100Page = __decorate([
        core_1.Component({
            selector: "sidebar-menu",
            templateUrl: "./SF09100.page.html"
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, SF00100_page_1.SF00100Page])
    ], SF09100Page);
    return SF09100Page;
}(common_page_1.CommonPage));
exports.SF09100Page = SF09100Page;
//# sourceMappingURL=SF09100.page.js.map