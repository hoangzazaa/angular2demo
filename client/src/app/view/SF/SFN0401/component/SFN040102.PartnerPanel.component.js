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
var SFN040104_Revenue_component_1 = require("./SFN040104.Revenue.component");
var SFN040105_Stock_component_1 = require("./SFN040105.Stock.component");
var SFN040106_Product_component_1 = require("./SFN040106.Product.component");
var SFN0401_Partner_model_1 = require("../model/SFN0401_Partner.model");
var SFN0401_constants_1 = require("../SFN0401.constants");
var SFN040102Component = (function () {
    function SFN040102Component(page, ref) {
        this.page = page;
        this.ref = ref;
        this.currentTab = 1;
        this.partner = new SFN0401_Partner_model_1.PartnerModel();
    }
    SFN040102Component.prototype.ngOnInit = function () {
        this.partner = this.page.pageData.partnerList[this.index];
    };
    //region Bindings
    SFN040102Component.prototype.isTabActive = function (tab) {
        return (this.currentTab == tab);
    };
    SFN040102Component.prototype.selectTab = function (tab) {
        if (tab !== this.currentTab) {
            this.currentTab = tab;
            this.ref.tick();
            if (this.currentTab == 2) {
                this.sfn040104.onTabSelected();
            }
            else if (this.currentTab == 3) {
                this.sfn040105.onTabSelected();
            }
            else if (this.currentTab == 4) {
                this.sfn040106.onTabSelected();
            }
        }
    };
    SFN040102Component.prototype.viewDetail = function (isOpeningNewTab) {
        this.page.navigateToPartner(this.partner, isOpeningNewTab);
    };
    Object.defineProperty(SFN040102Component.prototype, "canSelectCustomer", {
        get: function () {
            return (this.page.pageData.screenMode == SFN0401_constants_1.SFN0401Constants.MODE_CUSTOMER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040102Component.prototype, "canSelectSupplier", {
        get: function () {
            return (this.page.pageData.screenMode == SFN0401_constants_1.SFN0401Constants.MODE_SUPPLIER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040102Component.prototype, "isCustomer", {
        get: function () {
            return (this.partner.type == SFN0401_constants_1.SFN0401Constants.PTYPE_CUSTOMER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040102Component.prototype, "isSupplier", {
        get: function () {
            return (this.partner.type == SFN0401_constants_1.SFN0401Constants.PTYPE_SUPPLIER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040102Component.prototype, "canSelectPartner", {
        get: function () {
            return this.page.pageData.canSelectPartner;
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Actions
    SFN040102Component.prototype.toggleBox = function () {
        $(this.boxBody.nativeElement).collapse('toggle');
    };
    SFN040102Component.prototype.selectCustomer = function () {
        this.page.selectCustomer();
    };
    SFN040102Component.prototype.selectSupplier = function () {
        this.page.selectSupplier();
    };
    __decorate([
        core_1.ViewChild("boxBody"), 
        __metadata('design:type', core_1.ElementRef)
    ], SFN040102Component.prototype, "boxBody", void 0);
    __decorate([
        core_1.ViewChild(SFN040104_Revenue_component_1.SFN040104Component), 
        __metadata('design:type', SFN040104_Revenue_component_1.SFN040104Component)
    ], SFN040102Component.prototype, "sfn040104", void 0);
    __decorate([
        core_1.ViewChild(SFN040105_Stock_component_1.SFN040105Component), 
        __metadata('design:type', SFN040105_Stock_component_1.SFN040105Component)
    ], SFN040102Component.prototype, "sfn040105", void 0);
    __decorate([
        core_1.ViewChild(SFN040106_Product_component_1.SFN040106Component), 
        __metadata('design:type', SFN040106_Product_component_1.SFN040106Component)
    ], SFN040102Component.prototype, "sfn040106", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SFN040102Component.prototype, "index", void 0);
    SFN040102Component = __decorate([
        core_1.Component({
            selector: "[sfn040102]",
            templateUrl: "SFN040102.PartnerPanel.component.html"
        }), 
        __metadata('design:paramtypes', [SFN0401_page_1.SFN0401Page, core_1.ApplicationRef])
    ], SFN040102Component);
    return SFN040102Component;
}());
exports.SFN040102Component = SFN040102Component;
//# sourceMappingURL=SFN040102.PartnerPanel.component.js.map