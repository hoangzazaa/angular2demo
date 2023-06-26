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
var SF0050101Component = (function () {
    function SF0050101Component(page) {
        this.page = page;
        this.filterEnable = true;
    }
    Object.defineProperty(SF0050101Component.prototype, "departmentList", {
        //region Screen bindings
        get: function () {
            return this.page.pageData.departments;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050101Component.prototype, "selectedDepartment", {
        get: function () {
            return this.page.pageData.selectedFilter.department;
        },
        set: function (value) {
            var pageData = this.page.pageData;
            pageData.selectedFilter.department = value;
            // update staff list
            pageData.staffs = pageData.dataRepo.getStaffs(pageData.selectedFilter.department.id);
            // update selected staff to ALL_STAFF
            pageData.selectedFilter.staff = SF00501_constants_1.SF00501Constants.OPTION_ALL_STAFF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050101Component.prototype, "staffList", {
        get: function () {
            return this.page.pageData.staffs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050101Component.prototype, "selectedStaff", {
        get: function () {
            return this.page.pageData.selectedFilter.staff;
        },
        set: function (value) {
            this.page.pageData.selectedFilter.staff = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050101Component.prototype, "dateUnit", {
        get: function () {
            return this.page.pageData.selectedFilter.dateUnit;
        },
        set: function (value) {
            var pageData = this.page.pageData;
            pageData.selectedFilter.dateUnit = value;
            // update date list
            pageData.dateOptions = pageData.dataRepo.getSelectDates(pageData.selectedFilter.dateUnit);
            // change date option to match current time
            var cM = pageData.currentTime.getFullYear() * 12 + pageData.currentTime.getMonth() + 1;
            for (var _i = 0, _a = pageData.dateOptions; _i < _a.length; _i++) {
                var option = _a[_i];
                if ((cM >= option.startYear * 12 + option.startMonth)
                    && (cM <= option.endYear * 12 + option.endMonth)) {
                    this.page.pageData.selectedFilter.date = option;
                    break;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050101Component.prototype, "dateList", {
        get: function () {
            return this.page.pageData.dateOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050101Component.prototype, "selectedDate", {
        get: function () {
            return this.page.pageData.selectedFilter.date;
        },
        set: function (value) {
            this.page.pageData.selectedFilter.date = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050101Component.prototype, "customerType", {
        get: function () {
            return this.page.pageData.selectedFilter.customerType;
        },
        set: function (value) {
            this.page.pageData.selectedFilter.customerType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050101Component.prototype, "summaryType", {
        get: function () {
            return this.page.pageData.selectedFilter.sumaryType;
        },
        set: function (value) {
            this.page.pageData.selectedFilter.sumaryType = value;
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Screen actions
    // filter
    SF0050101Component.prototype.doFilter = function () {
        this.filterEnable = false;
        this.page.doFilter();
        this.filterEnable = true;
    };
    SF0050101Component = __decorate([
        core_1.Component({
            selector: "[sf0050101]",
            templateUrl: "SF0050101.FilterPanel.component.html"
        }), 
        __metadata('design:paramtypes', [SF00501_page_1.SF00501Page])
    ], SF0050101Component);
    return SF0050101Component;
}());
exports.SF0050101Component = SF0050101Component;
//# sourceMappingURL=SF0050101.FilterPanel.component.js.map