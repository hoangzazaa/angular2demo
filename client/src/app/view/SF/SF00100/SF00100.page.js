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
var Header_provider_1 = require("./Header.provider");
var common_events_1 = require("../../../helper/common-events");
var SF00100Page = (function (_super) {
    __extends(SF00100Page, _super);
    function SF00100Page(router, route, headerProvider) {
        _super.call(this, router, route);
        this.headerProvider = headerProvider;
    }
    SF00100Page.prototype.ngAfterViewInit = function () {
        OneUI.init();
        // fix for multiple modal
        $(document).on('show.bs.modal', '.modal', function (event) {
            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function () {
                $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            }, 0);
        });
        $('[data-toggle="layout"]').on('click', function () {
            $(window).trigger(common_events_1.CommonEvents.LAYOUT_CHANGE);
        });
    };
    SF00100Page = __decorate([
        core_1.Component({
            selector: "main-layout",
            templateUrl: "./SF00100.page.html"
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider])
    ], SF00100Page);
    return SF00100Page;
}(common_page_1.CommonPage));
exports.SF00100Page = SF00100Page;
//# sourceMappingURL=SF00100.page.js.map