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
var Header_provider_1 = require("../SF00100/Header.provider");
var router_1 = require("@angular/router");
var common_page_1 = require("../COMMON/common.page");
var SF00407Page = (function (_super) {
    __extends(SF00407Page, _super);
    function SF00407Page(router, route, headerProvider) {
        _super.call(this, router, route, headerProvider);
    }
    SF00407Page.prototype.initBreadcrumb = function () {
        var self = this;
        self.headerProvider.reset();
        self.headerProvider.pageName = "出荷状況照会";
    };
    SF00407Page = __decorate([
        core_1.Component({
            templateUrl: "SF00407.page.html"
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider])
    ], SF00407Page);
    return SF00407Page;
}(common_page_1.CommonPage));
exports.SF00407Page = SF00407Page;
//# sourceMappingURL=SF00407.page.js.map