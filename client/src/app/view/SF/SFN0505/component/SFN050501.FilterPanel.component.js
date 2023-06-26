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
var SFN0505_page_1 = require("../SFN0505.page");
var SFN0505_constants_1 = require("../SFN0505.constants");
var SFN050501Component = (function () {
    function SFN050501Component(page) {
        this.page = page;
        this.filterEnable = true;
        this.currentFilter = this.page.pageData.currentFilter;
        // calculate min start date: first day of previous month
        this.minStartDate = moment().startOf('month').subtract(1, 'M').toDate();
    }
    Object.defineProperty(SFN050501Component.prototype, "departmentList", {
        //region Screen bindings
        get: function () {
            return this.page.pageData.departments;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050501Component.prototype, "selectedDepartment", {
        get: function () {
            return this.page.pageData.currentFilter.department;
        },
        set: function (value) {
            var pageData = this.page.pageData;
            pageData.currentFilter.department = value;
            // update staff list
            pageData.users = pageData.dataRepo.getUsers(pageData.currentFilter.department.id);
            // update selected staff to ALL_STAFF
            pageData.currentFilter.user = SFN0505_constants_1.SFN0505Constants.OPTION_ALL_USER;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050501Component.prototype, "userList", {
        get: function () {
            return this.page.pageData.users;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050501Component.prototype, "selectedUser", {
        get: function () {
            return this.page.pageData.currentFilter.user;
        },
        set: function (value) {
            this.currentFilter.user = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050501Component.prototype, "startDate", {
        get: function () {
            return this.currentFilter.startDate;
        },
        set: function (value) {
            this.currentFilter.startDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050501Component.prototype, "endDate", {
        get: function () {
            return this.currentFilter.endDate;
        },
        set: function (value) {
            this.currentFilter.endDate = value;
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Screen actions
    // filter
    SFN050501Component.prototype.doFilter = function () {
        var _this = this;
        this.filterEnable = false;
        this.page.loadData().then(function () {
            _this.filterEnable = true;
        });
    };
    SFN050501Component = __decorate([
        core_1.Component({
            selector: "[sfn050501]",
            templateUrl: "SFN050501.FilterPanel.component.html"
        }), 
        __metadata('design:paramtypes', [SFN0505_page_1.SFN0505Page])
    ], SFN050501Component);
    return SFN050501Component;
}());
exports.SFN050501Component = SFN050501Component;
//# sourceMappingURL=SFN050501.FilterPanel.component.js.map