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
var SFN0506_page_1 = require("../SFN0506.page");
var SFN0506_constants_1 = require("../SFN0506.constants");
var date_util_1 = require("../../../../util/date-util");
var SFN050601Component = (function () {
    function SFN050601Component(page) {
        this.page = page;
        this.currentFilter = this.page.pageData.currentFilter;
        // calculate min start date: first day of previous month
        this.minStartDate = moment().startOf('month').subtract(1, 'M').toDate();
    }
    Object.defineProperty(SFN050601Component.prototype, "departmentList", {
        //region Screen bindings
        get: function () {
            return this.page.pageData.departments;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050601Component.prototype, "selectedDepartment", {
        get: function () {
            return this.page.pageData.currentFilter.department;
        },
        set: function (value) {
            var pageData = this.page.pageData;
            pageData.currentFilter.department = value;
            // update staff list
            pageData.users = pageData.dataRepo.getUsers(pageData.currentFilter.department.id);
            // update selected staff to ALL_STAFF
            pageData.currentFilter.user = SFN0506_constants_1.SFN0506Constants.OPTION_ALL_USER;
            // filter
            this.doFilter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050601Component.prototype, "userList", {
        get: function () {
            return this.page.pageData.users;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050601Component.prototype, "selectedUser", {
        get: function () {
            return this.page.pageData.currentFilter.user;
        },
        set: function (value) {
            this.currentFilter.user = value;
            // filter
            this.doFilter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050601Component.prototype, "startDate", {
        get: function () {
            return this.currentFilter.startDate;
        },
        set: function (value) {
            var oldValue = this.currentFilter.startDate;
            this.currentFilter.startDate = value;
            if (date_util_1.DateUtil.getTime(oldValue) != date_util_1.DateUtil.getTime(value)) {
                // filter
                this.doFilter();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050601Component.prototype, "endDate", {
        get: function () {
            return this.currentFilter.endDate;
        },
        set: function (value) {
            var oldValue = this.currentFilter.endDate;
            this.currentFilter.endDate = value;
            if (date_util_1.DateUtil.getTime(oldValue) != date_util_1.DateUtil.getTime(value)) {
                // filter
                this.doFilter();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050601Component.prototype, "dateType", {
        get: function () {
            return this.currentFilter.dateType;
        },
        set: function (value) {
            this.currentFilter.dateType = value;
            // filter
            this.doFilter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050601Component.prototype, "paymentMethods", {
        get: function () {
            return SFN0506_constants_1.SFN0506Constants.PAYMENT_METHOD_OPTIONS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN050601Component.prototype, "paymentMethod", {
        get: function () {
            return this.currentFilter.method;
        },
        set: function (value) {
            this.currentFilter.method = value;
            // filter
            this.doFilter();
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Screen actions
    // filter
    SFN050601Component.prototype.doFilter = function () {
        this.page.loadData();
    };
    SFN050601Component = __decorate([
        core_1.Component({
            selector: "[sfn050601]",
            templateUrl: "SFN050601.FilterPanel.component.html"
        }), 
        __metadata('design:paramtypes', [SFN0506_page_1.SFN0506Page])
    ], SFN050601Component);
    return SFN050601Component;
}());
exports.SFN050601Component = SFN050601Component;
//# sourceMappingURL=SFN050601.FilterPanel.component.js.map