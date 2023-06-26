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
var ProductInfoBox_component_1 = require("../ProductInfoBox.component");
var BasicInfoComponent = (function () {
    function BasicInfoComponent(component) {
        this.component = component;
    }
    Object.defineProperty(BasicInfoComponent.prototype, "product", {
        //region Bindings
        // get departmentList(): DepartmentModel[] {
        //     return this.page.pageData.departments;
        // }
        //
        // get selectedDepartment(): DepartmentModel {
        //     return this.page.pageData.selectedFilter.department;
        // }
        get: function () {
            return this.component.data.product;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicInfoComponent.prototype, "isInputLot", {
        get: function () {
            return this.component.data.isInputLot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicInfoComponent.prototype, "isInputPrice", {
        get: function () {
            return this.component.data.isInputPrice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicInfoComponent.prototype, "isDisplayAmount", {
        get: function () {
            return !this.component.data.isInputPrice;
        },
        enumerable: true,
        configurable: true
    });
    BasicInfoComponent = __decorate([
        core_1.Component({
            selector: "[basic-info]",
            templateUrl: "BasicInfo.component.html"
        }), 
        __metadata('design:paramtypes', [ProductInfoBox_component_1.ProductInfoBoxComponent])
    ], BasicInfoComponent);
    return BasicInfoComponent;
}());
exports.BasicInfoComponent = BasicInfoComponent;
//# sourceMappingURL=BasicInfo.component.js.map