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
var SFN0401_page_1 = require("../SFN0401.page");
var SFN040102_PartnerPanel_component_1 = require("./SFN040102.PartnerPanel.component");
var SFN0401_constants_1 = require("../SFN0401.constants");
var SFN040103Component = (function () {
    function SFN040103Component(page, component) {
        this.page = page;
        this.component = component;
        this.partner = this.component.partner;
    }
    SFN040103Component.prototype.ngOnInit = function () {
        this.partner = this.component.partner;
    };
    Object.defineProperty(SFN040103Component.prototype, "isCustomer", {
        //region Bindings
        get: function () {
            return (this.partner.type == SFN0401_constants_1.SFN0401Constants.PTYPE_CUSTOMER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040103Component.prototype, "isSupplier", {
        get: function () {
            return (this.partner.type == SFN0401_constants_1.SFN0401Constants.PTYPE_SUPPLIER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040103Component.prototype, "hasStartYear", {
        get: function () {
            if (this.partner.type == SFN0401_constants_1.SFN0401Constants.PTYPE_CUSTOMER && this.partner.startYear != undefined) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    SFN040103Component = __decorate([
        core_1.Component({
            selector: "[sfn040103]",
            templateUrl: "SFN040103.BasicInfo.component.html"
        }), 
        __metadata('design:paramtypes', [SFN0401_page_1.SFN0401Page, SFN040102_PartnerPanel_component_1.SFN040102Component])
    ], SFN040103Component);
    return SFN040103Component;
}());
exports.SFN040103Component = SFN040103Component;
//# sourceMappingURL=SFN040103.BasicInfo.component.js.map