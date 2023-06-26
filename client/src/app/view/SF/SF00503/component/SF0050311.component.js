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
var message_1 = require("../../../../helper/message");
var User_model_1 = require("../../../../model/core/User.model");
var CustomCustomerGoal_model_1 = require("../../../../model/CustomCustomerGoal.model");
/**
 * TOP &gt; 営業目標登録 ... 得意先別目標タブの既存得意先(その他)セクション
 */
var SF0050311Component = (function () {
    function SF0050311Component(sf00503Data, sf00503Service) {
        this.sf00503Data = sf00503Data;
        this.sf00503Service = sf00503Service;
        this.onCustomerGoalsDataChanged = new core_1.EventEmitter();
        this.onCustomerGoalsAdded = new core_1.EventEmitter();
        this.onCustomerGoalsDeleted = new core_1.EventEmitter();
        this.onCustomerGoalsSaved = new core_1.EventEmitter();
    }
    SF0050311Component.prototype.ngOnInit = function () {
        this.sf00503Data.calculatorCustomer();
    };
    SF0050311Component.prototype.addCustomerGoalOther = function () {
        var customerGoal = new CustomCustomerGoal_model_1.CustomCustomerGoal();
        // set goal item
        customerGoal.goalItems = [];
        // set year
        customerGoal.year = this.sf00503Data.year;
        // set department user
        customerGoal.user = new User_model_1.User();
        customerGoal.departmentId = this.sf00503Data.department.id;
        customerGoal._hashCode = new Date().getTime();
        this.sf00503Data.customerGoalOthers.unshift(customerGoal);
        this.sf00503Data.customerGoalOthersYear.unshift(customerGoal);
        this.onCustomerGoalsAdded.emit();
    };
    // save customer goal
    SF0050311Component.prototype.saveCustomerGoal = function (itemEmit) {
        var _this = this;
        var message = "";
        if (itemEmit.data.id == undefined) {
            message = "Save customer goal item success";
        }
        else {
            message = "Update customer goal item success";
        }
        this.sf00503Service.saveCustomerGoal(itemEmit.data).then(function (data) {
            // update item data
            _this.sf00503Data.customerGoalOthers[itemEmit.index].id = data.customerGoal.id;
            _this.sf00503Data.customerGoalOthers[itemEmit.index].goalItems = data.customerGoal.goalItems;
            _this.onCustomerGoalsSaved.emit();
            $.notify({ message: message }, { type: 'success' });
        });
    };
    // delete customer goal
    SF0050311Component.prototype.deleteCustomerGoal = function (itemEmit) {
        var self = this;
        swal({
            title: "",
            text: message_1.default.get(message_1.MSG.SF00503.INF003),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d26a5c",
            confirmButtonText: message_1.default.get(message_1.MSG.SF00503.INF005),
            closeOnConfirm: true
        }, function () {
            self.sf00503Service.deleteCustomerGoal(itemEmit.data.id).then(function (data) {
                if (itemEmit.data._hashCode) {
                    self.sf00503Data.customerGoalOthers = $.grep(self.sf00503Data.customerGoalOthers, function (customerGoal, index) {
                        return customerGoal._hashCode !== itemEmit.data._hashCode;
                    });
                    self.sf00503Data.customerGoalOthersYear = $.grep(self.sf00503Data.customerGoalOthersYear, function (customerGoal, index) {
                        return customerGoal._hashCode !== itemEmit.data._hashCode;
                    });
                }
                else {
                    // remove item from list
                    self.sf00503Data.customerGoalOthers.splice(itemEmit.index, 1);
                    self.sf00503Data.customerGoalOthersYear.splice(self.indexCustomerGoal(itemEmit.data), 1);
                }
                self.sf00503Data.calculatorCustomer();
                $.notify({ message: 'Delete customer goal item success' }, { type: 'info' });
            });
        });
    };
    SF0050311Component.prototype.indexCustomerGoal = function (customerGoal) {
        // get index by id customerGoal
        for (var i = 0; i < this.sf00503Data.customerGoalOthersYear.length; i++) {
            if (this.sf00503Data.customerGoalOthersYear[i].year == customerGoal.year
                && this.sf00503Data.customerGoalOthersYear[i].picId == customerGoal.picId
                && !customerGoal.customerId) {
                return i;
            }
        }
    };
    SF0050311Component.prototype.emitCustomerGoalsDataChangedEvent = function () {
        this.onCustomerGoalsDataChanged.emit();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050311Component.prototype, "onCustomerGoalsDataChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050311Component.prototype, "onCustomerGoalsAdded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050311Component.prototype, "onCustomerGoalsDeleted", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050311Component.prototype, "onCustomerGoalsSaved", void 0);
    SF0050311Component = __decorate([
        core_1.Component({
            selector: "sf0050311",
            templateUrl: "SF0050311.component.html"
        }), 
        __metadata('design:paramtypes', [SF00503_data_1.SF00503Data, SF00503_service_1.SF00503Service])
    ], SF0050311Component);
    return SF0050311Component;
}());
exports.SF0050311Component = SF0050311Component;
//# sourceMappingURL=SF0050311.component.js.map