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
 * TOP &gt; 営業目標登録 ... 得意先別目標タブの新規得意先セクションの各要素
 */
var SF0050307Component = (function () {
    function SF0050307Component(sf00503Data, router) {
        this.sf00503Data = sf00503Data;
        this.router = router;
        this.onDataChanged = new core_1.EventEmitter();
        this.changeDeleteItem = new core_1.EventEmitter();
        this.changeCreateCustomerGoal = new core_1.EventEmitter();
        this.goldCustomerNew = [];
        this.goldOldCus = [];
        this.goldItemsYear = [];
        this.type1New = 0;
        this.type2New = 0;
        this.type3New = 0;
        this.typeYear = 0;
        this.totalType = 0;
        this.goldCustomerNew[constants_1.Constants.TYPE_1] = [];
        this.goldCustomerNew[constants_1.Constants.TYPE_2] = [];
        this.goldCustomerNew[constants_1.Constants.TYPE_3] = [];
    }
    SF0050307Component.prototype.ngOnInit = function () {
        this.customerGoalNew = this.sf00503Data.customerGoalNews[this.index];
        this.updateDataByYear();
        this.calculatorData();
    };
    Object.defineProperty(SF0050307Component.prototype, "rows", {
        get: function () {
            return this.sf00503Data.rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050307Component.prototype, "columns", {
        get: function () {
            return this.sf00503Data.columns;
        },
        enumerable: true,
        configurable: true
    });
    // create new customerGoal if customerGoal = undefined
    SF0050307Component.prototype.createCustomerGoal = function () {
        if (this.customerGoalNew.picId == undefined) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00503.INF006) }, { type: 'danger' });
            return;
        }
        this.convertDataArrToUserGoal();
        var itemEmit = new ItemEmit_1.ItemEmit();
        itemEmit.index = this.index;
        itemEmit.data = this.customerGoalNew;
        this.changeCreateCustomerGoal.emit(itemEmit);
    };
    SF0050307Component.prototype.updateDataChange = function (value) {
        this.calculatorData();
        this.convertDataArrToUserGoal();
        this.sf00503Data.calculatorCustomer();
    };
    SF0050307Component.prototype.updateDataByYear = function () {
        var _this = this;
        // create this.sf00503Data.userGoal.goalItems
        // if this.sf00503Data.userGoal.goalItems == undefined || this.sf00503Data.userGoal.goalItems.length == 0
        var type = 0;
        if (!this.customerGoalNew.goalItems
            || this.customerGoalNew.goalItems.length == 0) {
            this.customerGoalNew.goalItems = [];
            for (var i = 0; i < 36; i++) {
                this.customerGoalNew.goalItems[i] = new CustomerGoalItem_model_1.CustomerGoalItem();
                this.customerGoalNew.goalItems[i].goal = 0;
                this.customerGoalNew.goalItems[i].customerGoalId = this.customerGoalNew.id;
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
                this.customerGoalNew.goalItems[i].type = type - 1;
                // set month
                this.customerGoalNew.goalItems[i].month = this.sf00503Data.columns[indexMonth];
                this.customerGoalNew.goalItems[i].customerType = constants_1.Constants.CUSTOMER_NEW;
            }
            for (var i = 0; i < 12; i++) {
                this.goldItemsYear[i] = new CustomerGoalItem_model_1.CustomerGoalItem();
                this.goldItemsYear[i].goal = 0;
                this.goldItemsYear[i].customerGoalId = this.customerGoalNew.id;
                this.goldItemsYear[i].type = null;
                // set goldItemsYear
                this.goldItemsYear[i].month = this.sf00503Data.columns[i];
                this.goldItemsYear[i].customerType = constants_1.Constants.CUSTOMER_NEW;
                // push goalItemYear to list goalItems
                this.customerGoalNew.goalItems.push(this.goldItemsYear[i]);
            }
        }
        var goalItems_1 = this.customerGoalNew.goalItems;
        // defined list goldOld and goldNew
        var _loop_1 = function(i) {
            var _loop_2 = function(j) {
                if (goalItems_1) {
                    goalItems_1.forEach(function (goalItem) {
                        // map data goalOld
                        if (i == goalItem.type
                            && _this.sf00503Data.columns[j] == goalItem.month
                            && goalItem.customerType == constants_1.Constants.CUSTOMER_NEW) {
                            _this.goldCustomerNew[i][j] = goalItem.goal;
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
        for (var i = 36; i < 48; i++) {
            this.goldItemsYear[i % 36] = new CustomerGoalItem_model_1.CustomerGoalItem();
            if (goalItems_1) {
                this.goldItemsYear[i % 36].goal = goalItems_1[i].goal;
            }
        }
    };
    // delete
    SF0050307Component.prototype.deleteCustomerGoal = function () {
        var itemEmit = new ItemEmit_1.ItemEmit();
        itemEmit.index = this.index;
        itemEmit.data = this.customerGoalNew;
        this.changeDeleteItem.emit(itemEmit);
    };
    SF0050307Component.prototype.emitDataChangedEvent = function () {
        this.onDataChanged.emit();
    };
    //search user goal
    SF0050307Component.prototype.searchUserPic = function () {
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
        $("#searchModal" + this.index + "New").modal('show');
    };
    Object.defineProperty(SF0050307Component.prototype, "dateUpdate", {
        // get/set
        get: function () {
            return this.customerGoalNew.updatedDate;
        },
        enumerable: true,
        configurable: true
    });
    SF0050307Component.prototype.setUserPicToCustomerGoal = function (value) {
        this.customerGoalNew.picId = value.id;
        // set user pic
        this.customerGoalNew.user = value;
        // set department
        this.customerGoalNew.departmentId = value.departmentId;
        this.onDataChanged.emit();
    };
    SF0050307Component.prototype.calculatorData = function () {
        //東京支店 2.
        var type1New = 0;
        var type2New = 0;
        var type3New = 0;
        var typeYear = 0;
        for (var i = 0; i < this.sf00503Data.columns.length; i++) {
            type1New += format_util_1.FormatUtil.isNaN(this.goldCustomerNew[0][i]);
            type2New += format_util_1.FormatUtil.isNaN(this.goldCustomerNew[1][i]);
            type3New += format_util_1.FormatUtil.isNaN(this.goldCustomerNew[2][i]);
            typeYear += format_util_1.FormatUtil.isNaN(this.goldItemsYear[i].goal);
        }
        this.type1New = format_util_1.FormatUtil.isNaN(type1New);
        this.type2New = format_util_1.FormatUtil.isNaN(type2New);
        this.type3New = format_util_1.FormatUtil.isNaN(type3New);
        this.typeYear = format_util_1.FormatUtil.isNaN(typeYear);
        this.totalType = this.type1New + this.type2New + this.type3New;
        for (var i = 0; i < this.sf00503Data.columns.length; i++) {
            this.goldOldCus[i] = format_util_1.FormatUtil.isNaN(this.goldCustomerNew[0][i])
                + format_util_1.FormatUtil.isNaN(this.goldCustomerNew[1][i]) + format_util_1.FormatUtil.isNaN(this.goldCustomerNew[2][i]);
        }
    };
    SF0050307Component.prototype.convertDataArrToUserGoal = function () {
        var _this = this;
        var _loop_3 = function(i) {
            var _loop_4 = function(j) {
                this_2.customerGoalNew.goalItems.forEach(function (item) {
                    if (item.month == _this.sf00503Data.columns[j]
                        && item.type == i
                        && item.customerType == constants_1.Constants.CUSTOMER_NEW) {
                        item.goal = _this.goldCustomerNew[i][j];
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
        for (var j = 0; j < this.sf00503Data.columns.length; j++) {
            this.customerGoalNew.goalItems[j + 36].goal = this.goldItemsYear[j].goal;
        }
        this.sf00503Data.customerGoalsYear.splice(this.indexCustomerGoal(), 1, this.customerGoalNew);
    };
    SF0050307Component.prototype.indexCustomerGoal = function () {
        // get index by id customerGoal
        for (var i = 0; i < this.sf00503Data.customerGoalsYear.length; i++) {
            if (this.sf00503Data.customerGoalsYear[i].year == this.customerGoalNew.year
                && this.sf00503Data.customerGoalsYear[i].picId == this.customerGoalNew.picId
                && this.sf00503Data.customerGoalsYear[i].customerId == this.customerGoalNew.customerId) {
                return i;
            }
        }
    };
    Object.defineProperty(SF0050307Component.prototype, "picCustomerGoal", {
        get: function () {
            if (!this.customerGoalNew.user.username) {
                return "担当";
            }
            return this.customerGoalNew.user.username;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050307Component.prototype, "picId", {
        get: function () {
            return this.customerGoalNew.picId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050307Component.prototype, "departmentId", {
        get: function () {
            return this.customerGoalNew.departmentId;
        },
        enumerable: true,
        configurable: true
    });
    SF0050307Component.prototype.checkInput = function (evt) {
        if (evt.which < 48 || evt.which > 57) {
            evt.preventDefault();
            return;
        }
    };
    SF0050307Component.prototype.valuePicName = function () {
        if (!this.customerGoalNew.user.username) {
            return undefined;
        }
        else {
            return this.customerGoalNew.user.username;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0050307Component.prototype, "index", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050307Component.prototype, "onDataChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050307Component.prototype, "changeDeleteItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050307Component.prototype, "changeCreateCustomerGoal", void 0);
    SF0050307Component = __decorate([
        core_1.Component({
            selector: "div[sf0050307]",
            templateUrl: "SF0050307.component.html"
        }), 
        __metadata('design:paramtypes', [SF00503_data_1.SF00503Data, router_1.Router])
    ], SF0050307Component);
    return SF0050307Component;
}());
exports.SF0050307Component = SF0050307Component;
//# sourceMappingURL=SF0050307.component.js.map