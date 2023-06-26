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
var screen_url_1 = require("../../../helper/screen-url");
var common_page_1 = require("../../SF/COMMON/common.page");
var Error404Page = (function (_super) {
    __extends(Error404Page, _super);
    function Error404Page(router, route) {
        _super.call(this, router, route);
    }
    Error404Page.prototype.back = function () {
        /*Back to Dashboard screen*/
        this.navigate(screen_url_1.ScreenUrl.SF001);
    };
    Error404Page = __decorate([
        core_1.Component({
            templateUrl: "./error-404.page.html"
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute])
    ], Error404Page);
    return Error404Page;
}(common_page_1.CommonPage));
exports.Error404Page = Error404Page;
//# sourceMappingURL=error-404.page.js.map