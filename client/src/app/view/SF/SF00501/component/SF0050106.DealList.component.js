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
var SF00501_page_1 = require("../SF00501.page");
var SF00501_constants_1 = require("../SF00501.constants");
var SF00501_service_1 = require("../SF00501.service");
var constants_1 = require("../../../../helper/constants");
var SF0050106Component = (function () {
    function SF0050106Component(page, service) {
        this.page = page;
        this.service = service;
        this.page.pageData.selectedDealType = SF00501_constants_1.SF00501Constants.OPTION_DEAL_ALL;
        this.selectedPage = 1;
        this.dealCount = 0;
        this.displayDeals = [];
    }
    SF0050106Component.prototype.ngOnInit = function () {
        // update deal list filter default
        this.updateDealList();
    };
    Object.defineProperty(SF0050106Component.prototype, "dealType", {
        get: function () {
            return this.page.pageData.selectedDealType;
        },
        set: function (value) {
            this.page.pageData.selectedDealType = value;
            this.selectedPage = 1;
            this.updateDealList();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050106Component.prototype, "dealList", {
        get: function () {
            return this.displayDeals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050106Component.prototype, "dealTotal", {
        get: function () {
            return this.dealCount;
        },
        enumerable: true,
        configurable: true
    });
    SF0050106Component.prototype.selectPage = function (pageIndex) {
        this.selectedPage = pageIndex;
        this.updateDealList();
        $('#dealRecords').find('tbody').scrollTop(0 - $("#dealRecordsCount").height());
    };
    SF0050106Component.prototype.updateDealList = function () {
        // filter deals
        this.filterDeals = [];
        if (this.dealType == SF00501_constants_1.SF00501Constants.OPTION_DEAL_NEW) {
            this.filterDeals = this.page.pageData.deals.filter(function (deal) {
                return deal.dealType == constants_1.Constants.DEAL_NEW;
            });
        }
        else if (this.dealType == SF00501_constants_1.SF00501Constants.OPTION_DEAL_REUSE) {
            this.filterDeals = this.page.pageData.deals.filter(function (deal) {
                return deal.dealType == constants_1.Constants.DEAL_REUSE;
            });
        }
        else {
            this.filterDeals = this.page.pageData.deals;
        }
        // update count
        this.dealCount = this.filterDeals.length;
        // update data paging
        var offset = (this.selectedPage - 1) * constants_1.Constants.PAGE_SIZE;
        this.filterDeals = this.filterDeals.slice(offset, offset + constants_1.Constants.PAGE_SIZE);
    };
    SF0050106Component = __decorate([
        core_1.Component({
            selector: "[sf0050106]",
            templateUrl: "SF0050106.DealList.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [SF00501_page_1.SF00501Page, SF00501_service_1.SF00501Service])
    ], SF0050106Component);
    return SF0050106Component;
}());
exports.SF0050106Component = SF0050106Component;
//# sourceMappingURL=SF0050106.DealList.component.js.map