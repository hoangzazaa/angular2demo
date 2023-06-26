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
/**
 * Created by hoangtd on 2/13/2017.
 */
var core_1 = require("@angular/core");
var SF00503_data_1 = require("../SF00503.data");
var SF00503_service_1 = require("../SF00503.service");
/**
 * TOP &gt; 営業目標登録 ... 得意先別目標タブの既存得意先セクション
 */
var SF0050304Component = (function () {
    function SF0050304Component(sf00503Data, sf00503Service) {
        this.sf00503Data = sf00503Data;
        this.sf00503Service = sf00503Service;
        this.onDataChanged = new core_1.EventEmitter();
        this.onDataSaved = new core_1.EventEmitter();
        this.filtersChanged = new core_1.EventEmitter();
        this.pageIndexChanged = new core_1.EventEmitter();
    }
    SF0050304Component.prototype.ngOnInit = function () {
        this.sf00503Data.paginatedCustomerGoals = this.sf00503Data.displayCustomerGoalOlds.slice(0, this.pageSize);
        this.sf00503Data.calculatorCustomer();
    };
    Object.defineProperty(SF0050304Component.prototype, "filters", {
        get: function () {
            return this.sf00503Data.filters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050304Component.prototype, "pageSize", {
        get: function () {
            return this.sf00503Data.CUSTOMER_GOAL_PAGE_SIZE;
        },
        enumerable: true,
        configurable: true
    });
    SF0050304Component.prototype.onPageChange = function (event) {
        this.pageIndexChanged.emit(event);
    };
    Object.defineProperty(SF0050304Component.prototype, "paginatedCustomerGoals", {
        get: function () {
            return this.sf00503Data.paginatedCustomerGoals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050304Component.prototype, "record", {
        get: function () {
            if (this.sf00503Data.displayCustomerGoalOlds) {
                return this.sf00503Data.displayCustomerGoalOlds.length;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050304Component.prototype, "SELECT_ANY_SALE", {
        get: function () {
            return this.sf00503Data.ANY_RESPONSIBLE_PERSON;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050304Component.prototype, "userPic", {
        get: function () {
            return this.sf00503Data.salePerson;
        },
        set: function (value) {
            this.sf00503Data.salePerson = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050304Component.prototype, "users", {
        get: function () {
            return this.sf00503Data.users;
        },
        enumerable: true,
        configurable: true
    });
    // save data customer goal
    SF0050304Component.prototype.saveCustomerGoal = function (itemEmit) {
        var _this = this;
        var message = "Customer goal item saved!";
        this.sf00503Service.saveCustomerGoal(itemEmit.data).then(function (data) {
            _this.sf00503Data.paginatedCustomerGoals[itemEmit.index].id = data.customerGoal.id;
            _this.sf00503Data.paginatedCustomerGoals[itemEmit.index].updatedDate = data.customerGoal.updatedDate;
            _this.sf00503Data.paginatedCustomerGoals[itemEmit.index].goalItems.forEach(function (item) {
                data.customerGoal.goalItems.forEach(function (newItem) {
                    item.id = newItem.id;
                });
            });
            _this.emitDataSavedEvent(itemEmit.index);
            $.notify({ message: message }, { type: 'success' });
        });
    };
    SF0050304Component.prototype.onDisplayLimitChanged = function (limitRule) {
        this.filters.limitRule = limitRule;
    };
    SF0050304Component.prototype.onSortingRuleChanged = function (sortingRule) {
        this.filters.sortRule = sortingRule;
    };
    SF0050304Component.prototype.submitFilter = function () {
        this.filtersChanged.emit();
    };
    SF0050304Component.prototype.emitDataChangedEvent = function (idx) {
        this.onDataChanged.emit(idx);
    };
    SF0050304Component.prototype.emitDataSavedEvent = function (idx) {
        this.onDataSaved.emit(idx);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050304Component.prototype, "onDataChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050304Component.prototype, "onDataSaved", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050304Component.prototype, "filtersChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050304Component.prototype, "pageIndexChanged", void 0);
    SF0050304Component = __decorate([
        core_1.Component({
            selector: "sf0050304",
            templateUrl: "SF0050304.component.html"
        }), 
        __metadata('design:paramtypes', [SF00503_data_1.SF00503Data, SF00503_service_1.SF00503Service])
    ], SF0050304Component);
    return SF0050304Component;
}());
exports.SF0050304Component = SF0050304Component;
//# sourceMappingURL=SF0050304.component.js.map