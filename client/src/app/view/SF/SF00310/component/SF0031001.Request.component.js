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
var SF00310_service_1 = require("../SF00310.service");
var data_util_1 = require("../../../../util/data-util");
var SF00310_MstData_1 = require("../SF00310.MstData");
var SF0031001RequestProduct = (function () {
    function SF0031001RequestProduct(pageService) {
        this.pageService = pageService;
        // get mstRank(): SelectBoxOption[] {
        //     return DataUtil.toSelectBoxDataSource(RANK);
        // }
        this.mstRank = data_util_1.default.toSelectBoxDataSource(SF00310_MstData_1.RANK);
    }
    SF0031001RequestProduct.prototype.changeData = function () {
        this.pageService.pageData.changeEditData();
    };
    Object.defineProperty(SF0031001RequestProduct.prototype, "requestModel", {
        get: function () {
            return this.pageService.pageData.requestModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0031001RequestProduct.prototype, "defaultDesiredDeliveryDate", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0031001RequestProduct.prototype, "defaultSubmissionDeadline", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0031001RequestProduct.prototype, "rank", {
        get: function () {
            return this.requestModel.rank;
        },
        set: function (value) {
            this.requestModel.rank = value;
            this.changeData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0031001RequestProduct.prototype, "target", {
        get: function () {
            return this.requestModel.target;
        },
        set: function (value) {
            this.requestModel.target = value;
            this.changeData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0031001RequestProduct.prototype, "rse", {
        get: function () {
            return this.requestModel.rse;
        },
        set: function (value) {
            this.requestModel.rse = value;
            this.changeData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0031001RequestProduct.prototype, "department", {
        get: function () {
            return this.requestModel.department;
        },
        set: function (value) {
            this.requestModel.department = value;
            this.changeData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0031001RequestProduct.prototype, "designConcept", {
        get: function () {
            return this.requestModel.designConcept;
        },
        set: function (value) {
            this.requestModel.designConcept = value;
            this.changeData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0031001RequestProduct.prototype, "methodStereoscopicDummy", {
        get: function () {
            return this.requestModel.methodStereoscopicDummy;
        },
        set: function (value) {
            this.requestModel.methodStereoscopicDummy = value;
            this.changeData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0031001RequestProduct.prototype, "flatOutput", {
        get: function () {
            return this.requestModel.flatOutput;
        },
        set: function (value) {
            this.requestModel.flatOutput = value;
            this.changeData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0031001RequestProduct.prototype, "desiredDeliveryDate", {
        get: function () {
            return this.requestModel.desiredDeliveryDate;
        },
        enumerable: true,
        configurable: true
    });
    SF0031001RequestProduct.prototype.setDesiredDelivery = function (value) {
        this.requestModel.desiredDeliveryDate = value;
        this.changeData();
    };
    Object.defineProperty(SF0031001RequestProduct.prototype, "submissionDeadline", {
        get: function () {
            return this.requestModel.submissionDeadline;
        },
        enumerable: true,
        configurable: true
    });
    SF0031001RequestProduct.prototype.setSubmissionDeadline = function (value) {
        this.requestModel.submissionDeadline = value;
        this.changeData();
    };
    Object.defineProperty(SF0031001RequestProduct.prototype, "memo", {
        get: function () {
            return this.requestModel.memo;
        },
        set: function (val) {
            this.requestModel.memo = val;
            this.changeData();
        },
        enumerable: true,
        configurable: true
    });
    SF0031001RequestProduct = __decorate([
        core_1.Component({
            selector: '[sf0031001]',
            templateUrl: 'SF0031001.Request.component.html',
            styleUrls: ["SF0031001.Request.component.css"]
        }), 
        __metadata('design:paramtypes', [SF00310_service_1.SF00310Service])
    ], SF0031001RequestProduct);
    return SF0031001RequestProduct;
}());
exports.SF0031001RequestProduct = SF0031001RequestProduct;
//# sourceMappingURL=SF0031001.Request.component.js.map