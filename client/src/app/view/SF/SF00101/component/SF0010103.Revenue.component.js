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
var SF00101_page_1 = require("../SF00101.page");
var format_util_1 = require("../../../../util/format-util");
var math_util_1 = require("../../../../util/math-util");
/**
 * Created by manhnv on 6/5/2017.
 */
var THOUSAND_YEN = 1000;
var SF0010103RevenueComponent = (function () {
    function SF0010103RevenueComponent(page) {
        this.page = page;
    }
    Object.defineProperty(SF0010103RevenueComponent.prototype, "pageData", {
        get: function () {
            return this.page.pageService.pageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010103RevenueComponent.prototype, "product_Type0", {
        get: function () {
            return math_util_1.default.round(format_util_1.FormatUtil.isNaN(this.pageData.product_Type0) / THOUSAND_YEN, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010103RevenueComponent.prototype, "product_Type1", {
        get: function () {
            return math_util_1.default.round(format_util_1.FormatUtil.isNaN(this.pageData.product_Type1) / THOUSAND_YEN, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010103RevenueComponent.prototype, "product_Type2", {
        get: function () {
            return math_util_1.default.round(format_util_1.FormatUtil.isNaN(this.pageData.product_Type2) / THOUSAND_YEN, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010103RevenueComponent.prototype, "sumTotal", {
        get: function () {
            return this.product_Type0 + this.product_Type1 + this.product_Type2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010103RevenueComponent.prototype, "dataRows", {
        get: function () {
            return this.pageData.dataTable;
        },
        enumerable: true,
        configurable: true
    });
    SF0010103RevenueComponent.prototype.forward = function (valueSelected) {
        this.page.viewDealDetail(valueSelected);
    };
    SF0010103RevenueComponent = __decorate([
        core_1.Component({
            selector: 'sf0010103-revenue',
            templateUrl: 'SF0010103.Revenue.component.html'
        }), 
        __metadata('design:paramtypes', [SF00101_page_1.SF00101Page])
    ], SF0010103RevenueComponent);
    return SF0010103RevenueComponent;
}());
exports.SF0010103RevenueComponent = SF0010103RevenueComponent;
//# sourceMappingURL=SF0010103.Revenue.component.js.map