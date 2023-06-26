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
var format_util_1 = require("../../../../util/format-util");
var constants_1 = require("../../../../helper/constants");
var CustomerGoalItem_model_1 = require("../../../../model/core/CustomerGoalItem.model");
var router_1 = require("@angular/router");
var ItemEmit_1 = require("../../../../model/ItemEmit");
var message_1 = require("../../../../helper/message");
/**
 * TOP &gt; 営業目標登録 ... 得意先別目標タブの既存得意先(その他)セクションの各要素
 */
var SF0050312Component = (function () {
    function SF0050312Component(sf00503Data, router) {
        this.sf00503Data = sf00503Data;
        this.router = router;
        this.onDataChanged = new core_1.EventEmitter();
        this.changeDeleteItem = new core_1.EventEmitter();
        this.changeCreateCustomerGoal = new core_1.EventEmitter();
        this.goldCustomerOther = [];
        this.goldOldCus = [];
        // goldItemsYear: CustomerGoalItem[] = [];
        this.type1Other = 0;
        this.type2Other = 0;
        this.type3Other = 0;
        this.typeYear = 0;
        this.totalType = 0;
        this.goldCustomerOther[constants_1.Constants.TYPE_1] = [];
        this.goldCustomerOther[constants_1.Constants.TYPE_2] = [];
        this.goldCustomerOther[constants_1.Constants.TYPE_3] = [];
    }
    SF0050312Component.prototype.ngOnInit = function () {
        this.customerGoalOther = this.sf00503Data.customerGoalOthers[this.index];
        this.updateDataByYear();
        this.calculatorData();
    };
    Object.defineProperty(SF0050312Component.prototype, "rows", {
        get: function () {
            return this.sf00503Data.rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050312Component.prototype, "columns", {
        get: function () {
            return this.sf00503Data.columns;
        },
        enumerable: true,
        configurable: true
    });
    // create new customerGoal if customerGoal = undefined
    SF0050312Component.prototype.createCustomerGoal = function () {
        if (this.customerGoalOther.picId == undefined) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00503.INF006) }, { type: 'danger' });
            return;
        }
        this.convertDataArrToUserGoal();
        var itemEmit = new ItemEmit_1.ItemEmit();
        itemEmit.index = this.index;
        itemEmit.data = this.customerGoalOther;
        this.changeCreateCustomerGoal.emit(itemEmit);
    };
    SF0050312Component.prototype.updateDataChange = function (value) {
        this.calculatorData();
        this.convertDataArrToUserGoal();
        this.sf00503Data.calculatorCustomer();
    };
    SF0050312Component.prototype.updateDataByYear = function () {
        var _this = this;
        // create this.sf00503Data.userGoal.goalItems
        // if this.sf00503Data.userGoal.goalItems == undefined || this.sf00503Data.userGoal.goalItems.length == 0
        var type = 0;
        if (!this.customerGoalOther.goalItems
            || this.customerGoalOther.goalItems.length == 0) {
            this.customerGoalOther.goalItems = [];
            for (var i = 0; i < 36; i++) {
                this.customerGoalOther.goalItems[i] = new CustomerGoalItem_model_1.CustomerGoalItem();
                this.customerGoalOther.goalItems[i].goal = 0;
                this.customerGoalOther.goalItems[i].customerGoalId = this.customerGoalOther.id;
                // month
                var indexMonth = i % 12;
                // type
                if (indexMonth == 0) {
                    // if type == 3 -> reset type = 0
                    if (type % 3 == 0) {
                        type = 0;
                    }
                    type++;
                }
                // set type
                this.customerGoalOther.goalItems[i].type = type - 1;
                // set month
                this.customerGoalOther.goalItems[i].month = this.sf00503Data.columns[indexMonth];
                this.customerGoalOther.goalItems[i].customerType = constants_1.Constants.CUSTOMER_OTHER;
            }
        }
        var goalItems_1 = this.customerGoalOther.goalItems;
        // defined list goldOld and goldNew
        var _loop_1 = function(i) {
            var _loop_2 = function(j) {
                if (goalItems_1) {
                    goalItems_1.forEach(function (goalItem) {
                        // map data goalOld
                        if (i == goalItem.type
                            && _this.sf00503Data.columns[j] == goalItem.month
                            && goalItem.customerType == constants_1.Constants.CUSTOMER_OTHER) {
                            _this.goldCustomerOther[i][j] = goalItem.goal;
                        }
                    });
                }
            };
            for (var j = 0; j < this_1.sf00503Data.columns.length; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.sf00503Data.rows.length; i++) {
            _loop_1(i);
        }
        // for (let i = 36; i < 48; i++) {
        //     this.goldItemsYear[i % 36] = new CustomerGoalItem();
        //     if (goalItems_1) {
        //         this.goldItemsYear[i % 36].goal = goalItems_1[i].goal;
        //     }
        // }
    };
    // delete
    SF0050312Component.prototype.deleteCustomerGoal = function () {
        var itemEmit = new ItemEmit_1.ItemEmit();
        itemEmit.index = this.index;
        itemEmit.data = this.customerGoalOther;
        this.changeDeleteItem.emit(itemEmit);
    };
    SF0050312Component.prototype.emitDataChangedEvent = function () {
        this.onDataChanged.emit();
    };
    //search user goal
    SF0050312Component.prototype.searchUserPic = function () {
        var _this = this;
        // clear color active user
        this.sf00503Data.departments.forEach(function (data) {
            data["active"] = false;
            data.users.forEach(function (user) {
                user["active"] = false;
            });
        });
        // set active department and user
        this.sf00503Data.departments.forEach(function (data) {
            if (data.id == _this.departmentId) {
                _this.sf00503Data.userDepartments = data.users;
                data["active"] = true;
                if (_this.picId) {
                    data.users.forEach(function (user) {
                        if (user.id == _this.picId) {
                            user["active"] = true;
                            _this.sf00503Data.userPicModal = user;
                        }
                    });
                }
                else {
                    _this.sf00503Data.userDepartments[0]["active"] = true;
                    _this.sf00503Data.userPicModal = _this.sf00503Data.userDepartments[0];
                }
            }
        });
        $("#searchModal" + this.index + "Other").modal('show');
    };
    Object.defineProperty(SF0050312Component.prototype, "dateUpdate", {
        // get/set
        get: function () {
            return this.customerGoalOther.updatedDate;
        },
        enumerable: true,
        configurable: true
    });
    SF0050312Component.prototype.setUserPicToCustomerGoal = function (value) {
        this.customerGoalOther.picId = value.id;
        // set user pic
        this.customerGoalOther.user = value;
        // set department
        this.customerGoalOther.departmentId = value.departmentId;
        this.onDataChanged.emit();
    };
    SF0050312Component.prototype.calculatorData = function () {
        //東京支店 2.
        var type1Other = 0;
        var type2Other = 0;
        var type3Other = 0;
        var typeYear = 0;
        for (var i = 0; i < this.sf00503Data.columns.length; i++) {
            type1Other += format_util_1.FormatUtil.isNaN(this.goldCustomerOther[0][i]);
            type2Other += format_util_1.FormatUtil.isNaN(this.goldCustomerOther[1][i]);
            type3Other += format_util_1.FormatUtil.isNaN(this.goldCustomerOther[2][i]);
        }
        this.type1Other = format_util_1.FormatUtil.isNaN(type1Other);
        this.type2Other = format_util_1.FormatUtil.isNaN(type2Other);
        this.type3Other = format_util_1.FormatUtil.isNaN(type3Other);
        this.typeYear = format_util_1.FormatUtil.isNaN(typeYear);
        this.totalType = this.type1Other + this.type2Other + this.type3Other;
        for (var i = 0; i < this.sf00503Data.columns.length; i++) {
            this.goldOldCus[i] = format_util_1.FormatUtil.isNaN(this.goldCustomerOther[0][i])
                + format_util_1.FormatUtil.isNaN(this.goldCustomerOther[1][i]) + format_util_1.FormatUtil.isNaN(this.goldCustomerOther[2][i]);
        }
    };
    SF0050312Component.prototype.convertDataArrToUserGoal = function () {
        var _this = this;
        var _loop_3 = function(i) {
            var _loop_4 = function(j) {
                this_2.customerGoalOther.goalItems.forEach(function (item) {
                    if (item.month == _this.sf00503Data.columns[j]
                        && item.type == i
                        && item.customerType == constants_1.Constants.CUSTOMER_OTHER) {
                        item.goal = _this.goldCustomerOther[i][j];
                    }
                });
            };
            for (var j = 0; j < this_2.sf00503Data.columns.length; j++) {
                _loop_4(j);
            }
        };
        var this_2 = this;
        for (var i = 0; i < this.sf00503Data.rows.length; i++) {
            _loop_3(i);
        }
        // for (let j = 0; j < this.sf00503Data.columns.length; j++) {
        //     this.customerGoalOther.goalItems[j + 36].goal = this.goldItemsYear[j].goal;
        // }
        this.sf00503Data.customerGoalOthersYear.splice(this.indexCustomerGoal(), 1, this.customerGoalOther);
    };
    SF0050312Component.prototype.indexCustomerGoal = function () {
        // get index by id customerGoal
        for (var i = 0; i < this.sf00503Data.customerGoalOthersYear.length; i++) {
            if (this.sf00503Data.customerGoalOthersYear[i].year == this.customerGoalOther.year
                && this.sf00503Data.customerGoalOthersYear[i].picId == this.customerGoalOther.picId
                && this.sf00503Data.customerGoalOthersYear[i].customerId == this.customerGoalOther.customerId) {
                return i;
            }
        }
    };
    Object.defineProperty(SF0050312Component.prototype, "picCustomerGoal", {
        get: function () {
            if (!this.customerGoalOther.user.username) {
                return "担当";
            }
            return this.customerGoalOther.user.username;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050312Component.prototype, "picId", {
        get: function () {
            return this.customerGoalOther.picId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050312Component.prototype, "departmentId", {
        get: function () {
            return this.customerGoalOther.departmentId;
        },
        enumerable: true,
        configurable: true
    });
    // checkInput(evt) {
    //     if (evt.which < 48 || evt.which > 57) {
    //         evt.preventDefault();
    //         return;
    //     }
    // }
    SF0050312Component.prototype.valuePicName = function () {
        if (!this.customerGoalOther.user.username) {
            return undefined;
        }
        else {
            return this.customerGoalOther.user.username;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0050312Component.prototype, "index", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050312Component.prototype, "onDataChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050312Component.prototype, "changeDeleteItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050312Component.prototype, "changeCreateCustomerGoal", void 0);
    SF0050312Component = __decorate([
        core_1.Component({
            selector: "div[sf0050312]",
            templateUrl: "SF0050312.component.html"
        }), 
        __metadata('design:paramtypes', [SF00503_data_1.SF00503Data, router_1.Router])
    ], SF0050312Component);
    return SF0050312Component;
}());
exports.SF0050312Component = SF0050312Component;
//# sourceMappingURL=SF0050312.component.js.map