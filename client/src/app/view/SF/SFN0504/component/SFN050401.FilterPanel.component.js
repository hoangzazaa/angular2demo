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
var SFN0504_page_1 = require("../SFN0504.page");
var SFN0504_constants_1 = require("../SFN0504.constants");
var SFN050401Component = (function () {
    function SFN050401Component(page) {
        this.page = page;
        this.currentFilter = this.page.pageData.currentFilter;
    }
    Object.defineProperty(SFN050401Component.prototype, "departmentList", {
        //region Screen bindings
        get: function () {
            return this.page.pageData.departments;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050401Component.prototype, "selectedDepartment", {
        get: function () {
            return this.page.pageData.currentFilter.department;
        },
        set: function (value) {
            var pageData = this.page.pageData;
            pageData.currentFilter.department = value;
            // update staff list
            pageData.users = pageData.dataRepo.getUsers(pageData.currentFilter.department.id);
            // update selected staff to ALL_STAFF
            pageData.currentFilter.user = SFN0504_constants_1.SFN0504Constants.OPTION_ALL_USER;
            // do filter
            this.doFilter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050401Component.prototype, "userList", {
        get: function () {
            return this.page.pageData.users;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050401Component.prototype, "selectedUser", {
        get: function () {
            return this.page.pageData.currentFilter.user;
        },
        set: function (value) {
            this.currentFilter.user = value;
            // do filter
            this.doFilter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050401Component.prototype, "stockDays", {
        get: function () {
            return this.currentFilter.stockDays;
        },
        set: function (value) {
            this.currentFilter.stockDays = value;
            // do filter
            this.doFilter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050401Component.prototype, "stockType", {
        get: function () {
            return this.currentFilter.stockType;
        },
        set: function (value) {
            this.currentFilter.stockType = value;
            // do filter
            this.doFilter();
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Screen actions
    // filter
    SFN050401Component.prototype.doFilter = function () {
        this.page.loadData();
    };
    SFN050401Component = __decorate([
        core_1.Component({
            selector: "[sfn050401]",
            templateUrl: "SFN050401.FilterPanel.component.html"
        }), 
        __metadata('design:paramtypes', [SFN0504_page_1.SFN0504Page])
    ], SFN050401Component);
    return SFN050401Component;
}());
exports.SFN050401Component = SFN050401Component;
//# sourceMappingURL=SFN050401.FilterPanel.component.js.map