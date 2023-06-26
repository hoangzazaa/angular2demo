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
var SFN0401_Filter_model_1 = require("../model/SFN0401_Filter.model");
var SFN0401_helper_1 = require("../SFN0401.helper");
var SFN0401_constants_1 = require("../SFN0401.constants");
var SFN040101Component = (function () {
    function SFN040101Component(page) {
        this.page = page;
        this.filterEnable = true;
        this.currentFilter = new SFN0401_Filter_model_1.FilterModel();
    }
    SFN040101Component.prototype.ngOnInit = function () {
        // trigger clear filter
        this.clearFilter();
    };
    Object.defineProperty(SFN040101Component.prototype, "filter", {
        //region Screen bindings
        get: function () {
            return this.currentFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040101Component.prototype, "keywords", {
        get: function () {
            return this.currentFilter.keywords;
        },
        set: function (value) {
            this.currentFilter.keywords = value;
            this.doFilter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040101Component.prototype, "canChangeType", {
        get: function () {
            return (this.page.pageData.screenMode == SFN0401_constants_1.SFN0401Constants.MODE_REPEAT);
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Screen actions
    // clear filter
    SFN040101Component.prototype.clearFilter = function () {
        this.currentFilter = SFN0401_helper_1.SFN0401Helper.getDefaultFilter(this.page.pageData.screenMode);
        this.doFilter();
    };
    // filter
    SFN040101Component.prototype.doFilter = function () {
        var _this = this;
        // disable filter
        this.filterEnable = false;
        // apply filter
        var filter = this.page.pageData.currentFilter;
        filter.type = this.currentFilter.type;
        filter.keywords = this.currentFilter.keywords;
        filter.code = this.currentFilter.code;
        filter.name = this.currentFilter.name;
        filter.contactName = this.currentFilter.contactName;
        filter.salesName = this.currentFilter.salesName;
        filter.page = 1;
        this.page.doFilter().then(function () {
            // enable filter
            _this.filterEnable = true;
        });
    };
    SFN040101Component = __decorate([
        core_1.Component({
            selector: "[sfn040101]",
            templateUrl: "SFN040101.FilterPanel.component.html"
        }), 
        __metadata('design:paramtypes', [SFN0401_page_1.SFN0401Page])
    ], SFN040101Component);
    return SFN040101Component;
}());
exports.SFN040101Component = SFN040101Component;
//# sourceMappingURL=SFN040101.FilterPanel.component.js.map