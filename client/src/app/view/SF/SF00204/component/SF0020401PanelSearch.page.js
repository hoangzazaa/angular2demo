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
var SF00204Filter_model_1 = require("../model/SF00204Filter.model");
/** 案件区分の選択オプション */
var DEAL_TYPE_OPTIONS = [{ id: SF00204Filter_model_1.SF00204FilterModel.DEAL_TYPE_NONE, name: "指定なし" }]
    .concat(data_util_1.default.toSelectBoxDataSource(mst_data_type_1.DEAL_TYPE));
var SF0020401PanelSearch = (function () {
    function SF0020401PanelSearch() {
        this.advanceSearchRequested = new core_1.EventEmitter();
        this.ruleFilter = new SF00204Filter_model_1.SF00204FilterModel();
        //3007
        this.mstDealStatus = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.DEAL_STATUS);
        this.mstShape = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SHAPE);
        this.mstPeriodType = data_util_1.default.toSelectBoxDataSource({ 1: "納品日", 2: "作成日" });
        this.printMethods = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.PRINT_METHOD);
    }
    Object.defineProperty(SF0020401PanelSearch.prototype, "defaultPeriodFrom", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020401PanelSearch.prototype, "defaultPeriodTo", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020401PanelSearch.prototype, "printMethod", {
        get: function () {
            return this.ruleFilter.printMethod;
        },
        set: function (val) {
            this.ruleFilter.printMethod = parseInt(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020401PanelSearch.prototype, "dealStatus", {
        get: function () {
            return this.ruleFilter.dealStatus;
        },
        set: function (val) {
            this.ruleFilter.dealStatus = parseInt(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020401PanelSearch.prototype, "shapeId", {
        get: function () {
            return this.ruleFilter.shapeId;
        },
        set: function (val) {
            this.ruleFilter.shapeId = parseInt(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020401PanelSearch.prototype, "dealType", {
        get: function () {
            return this.ruleFilter.dealType;
        },
        set: function (val) {
            this.ruleFilter.dealType = parseInt(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0020401PanelSearch.prototype, "periodType", {
        get: function () {
            return this.ruleFilter.periodType;
        },
        set: function (val) {
            this.ruleFilter.periodType = parseInt(val);
        },
        enumerable: true,
        configurable: true
    });
    SF0020401PanelSearch.prototype.resetAllFilters = function () {
        this.ruleFilter = new SF00204Filter_model_1.SF00204FilterModel();
        $("#resetFilters").blur();
    };
    SF0020401PanelSearch.prototype.requestAdvanceSearch = function () {
        this.advanceSearchRequested.emit(this.ruleFilter.clone());
    };
    Object.defineProperty(SF0020401PanelSearch.prototype, "dealTypes", {
        get: function () {
            return DEAL_TYPE_OPTIONS;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0020401PanelSearch.prototype, "advanceSearchRequested", void 0);
    SF0020401PanelSearch = __decorate([
        core_1.Component({
            selector: "sf0020401-filter",
            templateUrl: 'SF0020401PanelSearch.component.html',
            styleUrls: ["SF0020401PanelSearch.component.css"]
        }), 
        __metadata('design:paramtypes', [])
    ], SF0020401PanelSearch);
    return SF0020401PanelSearch;
}());
exports.SF0020401PanelSearch = SF0020401PanelSearch;
//# sourceMappingURL=SF0020401PanelSearch.page.js.map