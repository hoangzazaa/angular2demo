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
var constants_1 = require("../../../../helper/constants");
var router_1 = require("@angular/router");
var format_util_1 = require("../../../../util/format-util");
var ItemEmit_1 = require("../../../../model/ItemEmit");
var math_util_1 = require("../../../../util/math-util");
var message_1 = require("../../../../helper/message");
var CustomerGoalItem_model_1 = require("../../../../model/core/CustomerGoalItem.model");
var SF00503_helper_1 = require("../SF00503.helper");
/**
 * TOP &gt; 営業目標登録 ... 得意先別目標タブの既存得意先セクションの各要素
 */
var SF0050306Component = (function () {
    function SF0050306Component(sf00503Data, router) {
        this.sf00503Data = sf00503Data;
        this.router = router;
        this.isCreated = false;
        this.onDataChanged = new core_1.EventEmitter();
        this.changeSaveCustomerGoal = new core_1.EventEmitter();
        this.goldCustomerOld = [];
        this.goldCustomerOldBefore = [];
        this.goldOldCus = [];
        this.goldOldBeforeCus = [];
        this.interestRateCus = [];
        this.type1OldAfter = 0;
        this.type2OldAfter = 0;
        this.type3OldAfter = 0;
        this.type1OldBefore = 0;
        this.type2OldBefore = 0;
        this.type3OldBefore = 0;
        this.totalOldAfter = 0;
        this.totalOldBefore = 0;
        this.checkSetPicSale = false;
        this.goldCustomerOld[constants_1.Constants.TYPE_1] = [];
        this.goldCustomerOld[constants_1.Constants.TYPE_2] = [];
        this.goldCustomerOld[constants_1.Constants.TYPE_3] = [];
        this.goldCustomerOldBefore[constants_1.Constants.TYPE_1] = [];
        this.goldCustomerOldBefore[constants_1.Constants.TYPE_2] = [];
        this.goldCustomerOldBefore[constants_1.Constants.TYPE_3] = [];
    }
    SF0050306Component.prototype.ngOnInit = function () {
        this.customerGoalOld = this.sf00503Data.paginatedCustomerGoals[this.index];
        this.updateDataByYear();
        this.calculatorData();
    };
    Object.defineProperty(SF0050306Component.prototype, "rows", {
        get: function () {
            return this.sf00503Data.rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050306Component.prototype, "columns", {
        get: function () {
            return this.sf00503Data.columns;
        },
        enumerable: true,
        configurable: true
    });
    // create new customerGoal if customerGoal = undefined
    SF0050306Component.prototype.saveCustomerGoal = function () {
        if (this.customerGoalOld.picId == undefined) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00503.INF006) }, { type: 'danger' });
            return;
        }
        this.convertDataArrToUserGoal();
        var itemEmit = new ItemEmit_1.ItemEmit();
        itemEmit.index = this.index;
        itemEmit.data = this.customerGoalOld;
        this.isCreated = false;
        this.changeSaveCustomerGoal.emit(itemEmit);
    };
    SF0050306Component.prototype.updateDataByYear = function () {
        var _this = this;
        // create this.sf00503Data.userGoal.goalItems
        // if this.sf00503Data.userGoal.goalItems == undefined || this.sf00503Data.userGoal.goalItems.length == 0
        var type = 0;
        if (!this.customerGoalOld.goalItems || this.customerGoalOld.goalItems.length == 0) {
            this.createDataCustomerOld();
            this.isCreated = true;
        }
        var goalItems_1 = this.customerGoalOld.goalItems;
        // defined list goldOld and goldNew
        var _loop_1 = function(i) {
            var _loop_2 = function(j) {
                if (goalItems_1) {
                    goalItems_1.forEach(function (goalItem) {
                        // map data goalOld
                        if (_this.sf00503Data.rows[i] == goalItem.type
                            && _this.sf00503Data.columns[j] == goalItem.month
                            && goalItem.customerType == constants_1.Constants.CUSTOMER_OLD) {
                            _this.goldCustomerOld[i][j] = math_util_1.default.round(goalItem.goal, 0);
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
        // get userGoalBefore by year -1
        var saleDataItems = this.customerGoalOld.customerDataItems;
        var _loop_3 = function(i) {
            var _loop_4 = function(j) {
                if (saleDataItems && saleDataItems.length > 0) {
                    saleDataItems.forEach(function (customerDataItem) {
                        // map data goldOldBefore
                        if (_this.sf00503Data.rows[i] == customerDataItem.productType
                            && _this.sf00503Data.columns[j] == customerDataItem.month) {
                            _this.goldCustomerOldBefore[i][j] = math_util_1.default.round(customerDataItem.totalMoney, 0);
                        }
                    });
                }
                else {
                    this_2.goldCustomerOldBefore[i][j] = 0;
                }
            };
            for (var j = 0; j < this_2.sf00503Data.columns.length; j++) {
                _loop_4(j);
            }
        };
        var this_2 = this;
        for (var i = 0; i < this.sf00503Data.rows.length; i++) {
            _loop_3(i);
        }
    };
    SF0050306Component.prototype.emitDataChangedEvent = function () {
        this.onDataChanged.emit();
    };
    SF0050306Component.prototype.setUserPicToCustomerGoal = function (value) {
        this.customerGoalOld.picId = value.id;
        // set user
        this.customerGoalOld.user = value;
        // set department
        this.customerGoalOld.departmentId = value.departmentId;
        this.valuePicName();
        this.onDataChanged.emit();
    };
    //search user goal
    SF0050306Component.prototype.searchUserPic = function () {
        var _this = this;
        if (this.sf00503Data.readOnlyCusGoal) {
            return;
        }
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
                _this.checkSetPicSale = true;
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
        if (!this.checkSetPicSale) {
            this.sf00503Data.departments[0]["active"] = true;
            this.sf00503Data.userDepartments = this.sf00503Data.departments[0].users;
            this.sf00503Data.userDepartments[0]["active"] = true;
            this.sf00503Data.userPicModal = this.sf00503Data.userDepartments[0];
        }
        $("#searchModal" + this.index + "Old").modal('show');
    };
    Object.defineProperty(SF0050306Component.prototype, "dateUpdate", {
        // get/set
        get: function () {
            return this.customerGoalOld.updatedDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050306Component.prototype, "customerCode", {
        get: function () {
            return this.customerGoalOld.customer.customerCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050306Component.prototype, "customerName", {
        get: function () {
            return this.customerGoalOld.customer.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050306Component.prototype, "saleOld", {
        get: function () {
            if (this.customerGoalOld.customer.customerContact == undefined) {
                return "";
            }
            else {
                return "担当: " + this.customerGoalOld.customer.customerContact;
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0050306Component.prototype.navigateSF00402 = function () {
        if (!!this.customerCode) {
            return this.router.navigate(['home/customer', this.customerCode]);
        }
        else {
            $.notify({ message: message_1.default.get(message_1.MSG.COM.INF999) }, { type: 'info' });
        }
    };
    Object.defineProperty(SF0050306Component.prototype, "departmentId", {
        get: function () {
            if (this.customerGoalOld.user != undefined) {
                return this.customerGoalOld.user.departmentId;
            }
            return this.customerGoalOld.departmentId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050306Component.prototype, "picId", {
        get: function () {
            if (this.customerGoalOld.picId != undefined) {
                this.sf00503Data.checkChangeUser = true;
                return this.customerGoalOld.picId;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050306Component.prototype, "picCustomerGoal", {
        get: function () {
            if (this.customerGoalOld.picId != undefined) {
                return this.customerGoalOld.user.username;
            }
            else {
                return this.customerGoalOld.customer.customerContact;
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0050306Component.prototype.valuePicName = function () {
        if (this.customerGoalOld.user) {
            return this.customerGoalOld.user.username;
        }
        return "";
    };
    SF0050306Component.prototype.updateDataChange = function (value) {
        this.calculatorData();
        this.convertDataArrToUserGoal();
        this.sf00503Data.calculatorCustomer();
        if (this.isCreated) {
            this.emitDataChangedEvent();
        }
    };
    SF0050306Component.prototype.calculatorData = function () {
        //東京支店 1.
        var type1OldAfter = 0;
        var type1OldBefore = 0;
        var type2OldAfter = 0;
        var type2OldBefore = 0;
        var type3OldAfter = 0;
        var type3OldBefore = 0;
        for (var i = 0; i < this.sf00503Data.columns.length; i++) {
            type1OldAfter += format_util_1.FormatUtil.isNaN(this.goldCustomerOld[0][i]);
            type1OldBefore += format_util_1.FormatUtil.isNaN(this.goldCustomerOldBefore[0][i]);
            type2OldAfter += format_util_1.FormatUtil.isNaN(this.goldCustomerOld[1][i]);
            type2OldBefore += format_util_1.FormatUtil.isNaN(this.goldCustomerOldBefore[1][i]);
            type3OldAfter += format_util_1.FormatUtil.isNaN(this.goldCustomerOld[2][i]);
            type3OldBefore += format_util_1.FormatUtil.isNaN(this.goldCustomerOldBefore[2][i]);
        }
        this.type1OldAfter = format_util_1.FormatUtil.isNaN(type1OldAfter);
        this.type1OldBefore = SF00503_helper_1.SF00503Helper.convertYenToThousanYen(format_util_1.FormatUtil.isNaN(type1OldBefore));
        this.type2OldAfter = format_util_1.FormatUtil.isNaN(type2OldAfter);
        this.type2OldBefore = SF00503_helper_1.SF00503Helper.convertYenToThousanYen(format_util_1.FormatUtil.isNaN(type2OldBefore));
        this.type3OldAfter = format_util_1.FormatUtil.isNaN(type3OldAfter);
        this.type3OldBefore = SF00503_helper_1.SF00503Helper.convertYenToThousanYen(format_util_1.FormatUtil.isNaN(type3OldBefore));
        this.totalOldAfter = this.type1OldAfter + this.type2OldAfter + this.type3OldAfter;
        this.totalOldBefore = this.type1OldBefore + this.type2OldBefore + this.type3OldBefore;
        if (this.totalOldBefore && this.totalOldBefore > 0)
            this.interestRateOld = math_util_1.default.round(this.totalOldAfter * 100 / this.totalOldBefore, 1);
        else
            this.interestRateOld = constants_1.Constants.HYPHEN;
        for (var i = 0; i < this.sf00503Data.columns.length; i++) {
            this.goldOldCus[i] = format_util_1.FormatUtil.isNaN(this.goldCustomerOld[0][i])
                + format_util_1.FormatUtil.isNaN(this.goldCustomerOld[1][i]) + format_util_1.FormatUtil.isNaN(this.goldCustomerOld[2][i]);
            var goaldOldBefore = format_util_1.FormatUtil.isNaN(this.goldCustomerOldBefore[0][i])
                + format_util_1.FormatUtil.isNaN(this.goldCustomerOldBefore[1][i])
                + format_util_1.FormatUtil.isNaN(this.goldCustomerOldBefore[2][i]);
            this.goldOldBeforeCus[i] = goaldOldBefore;
            if (format_util_1.FormatUtil.isNaN(goaldOldBefore) == 0) {
                this.interestRateCus[i] = constants_1.Constants.HYPHEN;
            }
            else {
                this.interestRateCus[i] = math_util_1.default.round(this.goldOldCus[i] * 100 * 1000 / goaldOldBefore, 1);
            }
        }
    };
    SF0050306Component.prototype.checkInput = function (evt) {
        if (evt.which < 48 || evt.which > 57) {
            evt.preventDefault();
            return;
        }
    };
    SF0050306Component.prototype.convertDataArrToUserGoal = function () {
        var _this = this;
        var _loop_5 = function(i) {
            var _loop_6 = function(j) {
                this_3.customerGoalOld.goalItems.forEach(function (item) {
                    if (item.month == _this.sf00503Data.columns[j]
                        && item.type == i
                        && item.customerType == constants_1.Constants.CUSTOMER_OLD) {
                        item.goal = _this.goldCustomerOld[i][j];
                    }
                });
            };
            for (var j = 0; j < this_3.sf00503Data.columns.length; j++) {
                _loop_6(j);
            }
        };
        var this_3 = this;
        for (var i = 0; i < this.sf00503Data.rows.length; i++) {
            _loop_5(i);
        }
        this.sf00503Data.customerGoalsYear.splice(this.indexCustomerGoal(), 1, this.customerGoalOld);
    };
    SF0050306Component.prototype.indexCustomerGoal = function () {
        // get index by id customerGoal
        for (var i = 0; i < this.sf00503Data.customerGoalsYear.length; i++) {
            if (this.sf00503Data.customerGoalsYear[i].year == this.customerGoalOld.year
                && this.sf00503Data.customerGoalsYear[i].picId == this.customerGoalOld.picId
                && this.sf00503Data.customerGoalsYear[i].customerId == this.customerGoalOld.customerId) {
                return i;
            }
        }
    };
    SF0050306Component.prototype.createDataCustomerOld = function () {
        var type = 0;
        // set departmentId
        this.customerGoalOld.goalItems = [];
        for (var i = 0; i < 36; i++) {
            this.customerGoalOld.goalItems[i] = new CustomerGoalItem_model_1.CustomerGoalItem();
            this.customerGoalOld.goalItems[i].goal = 0;
            this.customerGoalOld.goalItems[i].customerGoalId = this.customerGoalOld.id;
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
            this.customerGoalOld.goalItems[i].type = type - 1;
            // set month
            this.customerGoalOld.goalItems[i].month = this.sf00503Data.columns[indexMonth];
            this.customerGoalOld.goalItems[i].goal = 0;
            // this.customerGoalOld.customerDataItems.forEach(item => {
            //     if (this.customerGoalOld.goalItems[i].month == item.month
            //         && this.customerGoalOld.goalItems[i].type == item.productType) {
            //         this.customerGoalOld.goalItems[i].goal = SF00503Helper.convertYenToThousanYen(item.totalMoney);
            //     }
            // });
            // set customer type
            this.customerGoalOld.goalItems[i].customerType = constants_1.Constants.CUSTOMER_OLD;
        }
    };
    SF0050306Component.prototype.convertYenToThousanYen = function (value) {
        return SF00503_helper_1.SF00503Helper.convertYenToThousanYen(value);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0050306Component.prototype, "index", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050306Component.prototype, "onDataChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050306Component.prototype, "changeSaveCustomerGoal", void 0);
    SF0050306Component = __decorate([
        core_1.Component({
            selector: "div[sf0050306]",
            templateUrl: "SF0050306.component.html"
        }), 
        __metadata('design:paramtypes', [SF00503_data_1.SF00503Data, router_1.Router])
    ], SF0050306Component);
    return SF0050306Component;
}());
exports.SF0050306Component = SF0050306Component;
//# sourceMappingURL=SF0050306.component.js.map