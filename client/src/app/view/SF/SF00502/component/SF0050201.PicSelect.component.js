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
var SF00502_service_1 = require("../SF00502.service");
var SF00502_page_1 = require("../SF00502.page");
var SF0050201Component = (function () {
    function SF0050201Component(service, page) {
        this.service = service;
        this.page = page;
    }
    Object.defineProperty(SF0050201Component.prototype, "departmentOptions", {
        get: function () {
            return this.service.pageData.departments;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050201Component.prototype, "staffOptions", {
        get: function () {
            return this.service.pageData.availableStaffs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050201Component.prototype, "selectedDepartment", {
        get: function () {
            if (this._tmpDept != undefined) {
                return this._tmpDept;
            }
            else {
                return this.service.pageData.selectedDepartment;
            }
        },
        set: function (value) {
            var _this = this;
            this._tmpDept = value;
            this.page.confirmIgnoreChange().then(function (isConfirmed) {
                _this._tmpDept = undefined;
                if (isConfirmed) {
                    // call page function
                    _this.page.selectDepartment(value);
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050201Component.prototype, "selectedStaff", {
        get: function () {
            if (this._tmpStaff != undefined) {
                return this._tmpStaff;
            }
            else {
                return this.service.pageData.selectedStaff;
            }
        },
        set: function (value) {
            var _this = this;
            this._tmpStaff = value;
            this.page.confirmIgnoreChange().then(function (isConfirmed) {
                _this._tmpStaff = undefined;
                if (isConfirmed) {
                    // call page function
                    _this.page.selectStaff(value);
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    SF0050201Component = __decorate([
        core_1.Component({
            selector: "[sf0050201]",
            templateUrl: "SF0050201.PicSelect.component.html"
        }), 
        __metadata('design:paramtypes', [SF00502_service_1.SF00502Service, SF00502_page_1.SF00502Page])
    ], SF0050201Component);
    return SF0050201Component;
}());
exports.SF0050201Component = SF0050201Component;
//# sourceMappingURL=SF0050201.PicSelect.component.js.map