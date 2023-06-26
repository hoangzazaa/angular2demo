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
var data_util_1 = require("../../../../util/data-util");
var mst_data_type_1 = require("../../../../helper/mst-data-type");
var SF00101_page_1 = require("../SF00101.page");
/**
 * Created by manhnv on 6/5/2017.
 */
var SF0010101FilterTab1Component = (function () {
    function SF0010101FilterTab1Component(page) {
        this.page = page;
        this.mstPeriods = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.PERIODS_TAB1);
    }
    Object.defineProperty(SF0010101FilterTab1Component.prototype, "sysDate", {
        get: function () {
            return this.pageData.systemDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010101FilterTab1Component.prototype, "pageData", {
        get: function () {
            return this.page.pageService.pageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010101FilterTab1Component.prototype, "departments", {
        get: function () {
            return this.pageData.departments;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010101FilterTab1Component.prototype, "department", {
        get: function () {
            return this.pageData.modelFilterTab1.departmentID;
        },
        set: function (value) {
            // set value department
            this.pageData.modelFilterTab1.departmentID = value;
            // if whole company selected then set 指定なし for the second filter
            if (value != 0) {
                var department = this.pageData.departments.find(function (item) {
                    return item.id == value;
                });
                this.pageData.salesTab1 = department.users;
            }
            this.pageData.modelFilterTab1.picId = 0;
            // filter
            this.page.filterDataTab1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010101FilterTab1Component.prototype, "sales", {
        get: function () {
            return this.pageData.salesTab1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010101FilterTab1Component.prototype, "sale", {
        get: function () {
            return this.pageData.modelFilterTab1.picId;
        },
        set: function (value) {
            // set value department
            this.pageData.modelFilterTab1.picId = value;
            // filter
            this.page.filterDataTab1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010101FilterTab1Component.prototype, "period", {
        get: function () {
            return this.pageData.modelFilterTab1.timeFilter;
        },
        set: function (value) {
            this.pageData.modelFilterTab1.timeFilter = value;
            // filter
            this.page.filterDataTab1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010101FilterTab1Component.prototype, "isWholeCompany", {
        get: function () {
            if (this.pageData.modelFilterTab1.departmentID == 0)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    SF0010101FilterTab1Component = __decorate([
        core_1.Component({
            selector: 'sf0010101-filter-tab1',
            templateUrl: 'SF0010101.FilterTab1.component.html',
            styleUrls: ['SF00101.Filter.component.css']
        }), 
        __metadata('design:paramtypes', [SF00101_page_1.SF00101Page])
    ], SF0010101FilterTab1Component);
    return SF0010101FilterTab1Component;
}());
exports.SF0010101FilterTab1Component = SF0010101FilterTab1Component;
//# sourceMappingURL=SF0010101.FilterTab1.component.js.map