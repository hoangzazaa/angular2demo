/**
 * Created by manhnv on 6/14/2017.
 */
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
var SF00205_service_1 = require("../SF00205.service");
var SF0020501FilterComponent = (function () {
    function SF0020501FilterComponent(service) {
        this.service = service;
        this.search = new core_1.EventEmitter();
        //3007
        this.mstPeriodType = data_util_1.default.toSelectBoxDataSource({ 1: "納品日", 2: "作成日" });
    }
    Object.defineProperty(SF0020501FilterComponent.prototype, "pageData", {
        get: function () {
            return this.service.pageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020501FilterComponent.prototype, "filter", {
        get: function () {
            return this.pageData.requestModel.filter;
        },
        set: function (value) {
            this.pageData.requestModel.filter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020501FilterComponent.prototype, "sysDate", {
        get: function () {
            return new Date();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020501FilterComponent.prototype, "fromDate", {
        get: function () {
            return this.filter.fromDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020501FilterComponent.prototype, "toDate", {
        get: function () {
            return this.filter.toDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020501FilterComponent.prototype, "departments", {
        get: function () {
            return this.pageData.departments;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020501FilterComponent.prototype, "selectedDepartmentId", {
        get: function () {
            return this.filter.selectedDepartmentId;
        },
        set: function (value) {
            this.filter.selectedDepartmentId = value;
            var department = this.pageData.departments.find(function (item) {
                return item.id == value;
            });
            // update list pics when department changes
            if (!!department) {
                this.pageData.pics = department.users;
            }
            if (this.filter.selectedDepartmentId == this.pageData.defaultDepartmentId) {
                this.selectedPicId = this.pageData.defaultPicId;
            }
            else {
                this.selectedPicId = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0020501FilterComponent.prototype.dateChange = function (value, type) {
        if (type == 1)
            this.filter.fromDate = value;
        else
            this.filter.toDate = value;
    };
    Object.defineProperty(SF0020501FilterComponent.prototype, "pics", {
        get: function () {
            return this.pageData.pics;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020501FilterComponent.prototype, "selectedPicId", {
        get: function () {
            return this.filter.selectedPicId;
        },
        set: function (value) {
            this.filter.selectedPicId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020501FilterComponent.prototype, "periodType", {
        get: function () {
            return this.filter.periodType;
        },
        set: function (value) {
            this.filter.periodType = value;
        },
        enumerable: true,
        configurable: true
    });
    SF0020501FilterComponent.prototype.reset = function () {
        this.resetDefaultFilter();
        this.doSearch();
    };
    SF0020501FilterComponent.prototype.doSearch = function () {
        this.search.emit(this.filter);
    };
    Object.defineProperty(SF0020501FilterComponent.prototype, "isDisable", {
        get: function () {
            return this.pageData.isDisable;
        },
        enumerable: true,
        configurable: true
    });
    SF0020501FilterComponent.prototype.resetDefaultFilter = function () {
        this.filter.periodType = 1;
        this.filter.fromDate = null;
        this.filter.toDate = null;
        this.selectedDepartmentId = this.pageData.defaultDepartmentId;
        this.selectedPicId = this.pageData.defaultPicId;
        this.filter.dealCode = null;
        this.filter.dealName = null;
        this.filter.customerCode = null;
        this.filter.customerName = null;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0020501FilterComponent.prototype, "search", void 0);
    SF0020501FilterComponent = __decorate([
        core_1.Component({
            selector: "sf0020501-filter",
            templateUrl: "SF0020501Filter.component.html",
            styleUrls: ["SF0020501Filter.component.css"]
        }), 
        __metadata('design:paramtypes', [SF00205_service_1.SF00205Service])
    ], SF0020501FilterComponent);
    return SF0020501FilterComponent;
}());
exports.SF0020501FilterComponent = SF0020501FilterComponent;
//# sourceMappingURL=SF0020501Filter.component.js.map