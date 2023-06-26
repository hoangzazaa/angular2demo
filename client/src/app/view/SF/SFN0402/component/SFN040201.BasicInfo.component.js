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
var SFN0402_page_1 = require("../SFN0402.page");
var SFN0402_constants_1 = require("../SFN0402.constants");
var SFN040201Component = (function () {
    function SFN040201Component(page) {
        this.page = page;
    }
    SFN040201Component.prototype.ngOnInit = function () {
        this.isCustomer = (this.page.pageData.partnerType == SFN0402_constants_1.SFN0402Constants.TYPE_CUSTOMER);
        this.isSupplier = (this.page.pageData.partnerType == SFN0402_constants_1.SFN0402Constants.TYPE_SUPPLIER);
        this.saveEnable = true;
    };
    Object.defineProperty(SFN040201Component.prototype, "partner", {
        //region Bindings
        get: function () {
            return this.page.pageData.partner;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040201Component.prototype, "hasStartYear", {
        get: function () {
            if (this.isCustomer && this.page.pageData.partner.startYear != undefined) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Actions
    SFN040201Component.prototype.saveMemo = function () {
        var _this = this;
        this.saveEnable = false;
        this.page.saveMemo().then(function () {
            _this.saveEnable = true;
        });
    };
    SFN040201Component.prototype.resetMemo = function () {
        this.page.pageData.partner.memo = this.page.pageData.partnerMemo;
        this.page.pageData.partner.remarksForShipping = this.page.pageData.remarksForShipping;
    };
    SFN040201Component = __decorate([
        core_1.Component({
            selector: "[sfn040201]",
            templateUrl: "SFN040201.BasicInfo.component.html"
        }), 
        __metadata('design:paramtypes', [SFN0402_page_1.SFN0402Page])
    ], SFN040201Component);
    return SFN040201Component;
}());
exports.SFN040201Component = SFN040201Component;
//# sourceMappingURL=SFN040201.BasicInfo.component.js.map