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
var SF00202_filter_1 = require("../model/SF00202.filter");
var data_util_1 = require("../../../../util/data-util");
var mst_data_type_1 = require("../../../../helper/mst-data-type");
var SF0020202FilterComponent = (function () {
    function SF0020202FilterComponent() {
        var _this = this;
        this.advanceSearchRequested = new core_1.EventEmitter();
        this.ruleFilter = new SF00202_filter_1.SF00202RuleFilter();
        this.ACCEPTED_STATUS = [
            mst_data_type_1.DEAL_STATUS_VALUES.ORDER_CONFIRMED,
            mst_data_type_1.DEAL_STATUS_VALUES.SHIPMENT_CONFIRMED,
            mst_data_type_1.DEAL_STATUS_VALUES.WAITING_FOR_PARTIAL_SHIPMENT,
            mst_data_type_1.DEAL_STATUS_VALUES.SHIPPED
        ];
        //3007
        this.mstDealStatus = data_util_1.default
            .toSelectBoxDataSource(mst_data_type_1.DEAL_STATUS)
            .filter(function (s) { return _this.ACCEPTED_STATUS.indexOf(s.id) > 0; });
        this.mstShape = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SHAPE);
        this.mstPeriodType = data_util_1.default.toSelectBoxDataSource({ 1: "納品日", 2: "作成日" });
        this.printMethods = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.PRINT_METHOD);
        // dealTypes = DataUtil.toSelectBoxDataSource(DEAL_TYPE);
        // To place "指定なし" item at the top...
        this.dealTypes = [{ id: 99, name: "指定なし" }].concat(data_util_1.default.toSelectBoxDataSource(mst_data_type_1.DEAL_TYPE));
    }
    Object.defineProperty(SF0020202FilterComponent.prototype, "defaultPeriodFrom", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020202FilterComponent.prototype, "defaultPeriodTo", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020202FilterComponent.prototype, "printMethod", {
        get: function () {
            return this.ruleFilter.printMethod;
        },
        set: function (val) {
            this.ruleFilter.printMethod = parseInt(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020202FilterComponent.prototype, "dealStatus", {
        get: function () {
            return this.ruleFilter.dealStatus;
        },
        set: function (val) {
            this.ruleFilter.dealStatus = parseInt(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020202FilterComponent.prototype, "shapeId", {
        get: function () {
            return this.ruleFilter.shapeId;
        },
        set: function (val) {
            this.ruleFilter.shapeId = parseInt(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020202FilterComponent.prototype, "dealType", {
        get: function () {
            return this.ruleFilter.dealType;
        },
        set: function (val) {
            this.ruleFilter.dealType = parseInt(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020202FilterComponent.prototype, "periodType", {
        get: function () {
            return this.ruleFilter.periodType;
        },
        set: function (val) {
            this.ruleFilter.periodType = parseInt(val);
        },
        enumerable: true,
        configurable: true
    });
    SF0020202FilterComponent.prototype.resetAllFilters = function () {
        this.ruleFilter = new SF00202_filter_1.SF00202RuleFilter();
        $("#resetFilters").blur();
        this.requestAdvanceSearch();
    };
    SF0020202FilterComponent.prototype.requestAdvanceSearch = function () {
        this.advanceSearchRequested.emit(this.ruleFilter.clone());
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0020202FilterComponent.prototype, "advanceSearchRequested", void 0);
    SF0020202FilterComponent = __decorate([
        core_1.Component({
            selector: "sf0020202-filter",
            templateUrl: "SF0020202.Filter.component.html",
            styleUrls: ["SF0020202.Filter.component.css"]
        }), 
        __metadata('design:paramtypes', [])
    ], SF0020202FilterComponent);
    return SF0020202FilterComponent;
}());
exports.SF0020202FilterComponent = SF0020202FilterComponent;
//# sourceMappingURL=SF0020202.Filter.component.js.map