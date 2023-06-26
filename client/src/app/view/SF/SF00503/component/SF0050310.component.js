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
var math_util_1 = require("../../../../util/math-util");
var message_1 = require("../../../../helper/message");
var message_2 = require("../../../../helper/message");
var SF00503_helper_1 = require("../SF00503.helper");
/**
 * TOP &gt; 営業目標登録 ... 個人別目標タブの担当一覧セクションの各要素
 */
var SF0050310Component = (function () {
    function SF0050310Component(sf00503Data, router) {
        this.sf00503Data = sf00503Data;
        this.router = router;
        this.onDataChanged = new core_1.EventEmitter();
        this.changeSaveCustomerGoal = new core_1.EventEmitter();
        /**
         * 次年度目標 (単位: 千円)
         * 添字: [sfr_sf_customer_goal_item.type][月]  (月は 0: 4月, 1: 5月, ..., 11: 3月)
         */
        this.goldCustomerOld = [];
        /**
         * 今年度実績 (単位: 円)
         * 添字: [sfr_sf_customer_goal_item.type][月]  (月は 0: 4月, 1: 5月, ..., 11: 3月)
         */
        this.goldCustomerOldBefore = [];
        /**
         * 次年度目標 合算 (単位: 千円)
         * 添字: [月]  (月は 0: 4月, 1: 5月, ..., 11: 3月)
         */
        this.goldOldCus = [];
        /**
         * 今年度実績 合算 (単位: 円)
         * 添字: [月]  (月は 0: 4月, 1: 5月, ..., 11: 3月)
         */
        this.goldOldBeforeCus = [];
        /**
         * 前年比 (単位: %)  または '-'
         * 添字: [月]  (月は 0: 4月, 1: 5月, ..., 11: 3月)
         */
        this.interestRateCus = [];
        /**
         * 新規比 (単位: %)  または '-'
         * 添字: [月]  (月は 0: 4月, 1: 5月, ..., 11: 3月)
         */
        this.interestRateNews = [];
        this.type1OldAfter = 0;
        this.type2OldAfter = 0;
        this.type3OldAfter = 0;
        this.type1OldBefore = 0;
        this.type2OldBefore = 0;
        this.type3OldBefore = 0;
        this.totalOldAfter = 0;
        this.totalOldBefore = 0;
        this.goldCustomerOld[constants_1.Constants.TYPE_1] = [];
        this.goldCustomerOld[constants_1.Constants.TYPE_2] = [];
        this.goldCustomerOld[constants_1.Constants.TYPE_3] = [];
        this.goldCustomerOldBefore[constants_1.Constants.TYPE_1] = [];
        this.goldCustomerOldBefore[constants_1.Constants.TYPE_2] = [];
        this.goldCustomerOldBefore[constants_1.Constants.TYPE_3] = [];
    }
    SF0050310Component.prototype.ngOnInit = function () {
        this.customerGoalOld = this.sf00503Data.customCustomerGoalTab3[this.index];
        this.updateDataByYear();
        this.calculatorData();
    };
    Object.defineProperty(SF0050310Component.prototype, "rows", {
        get: function () {
            return this.sf00503Data.rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050310Component.prototype, "columns", {
        get: function () {
            return this.sf00503Data.columns;
        },
        enumerable: true,
        configurable: true
    });
    SF0050310Component.prototype.updateDataByYear = function () {
        var _this = this;
        // create this.sf00503Data.userGoal.goalItems
        // if this.sf00503Data.userGoal.goalItems == undefined || this.sf00503Data.userGoal.goalItems.length == 0
        var goalItems_1 = this.customerGoalOld.goalItems;
        // defined list goldOld and goldNew
        var _loop_1 = function(i) {
            var _loop_2 = function(j) {
                if (goalItems_1) {
                    goalItems_1.forEach(function (goalItem) {
                        // map data goalOld
                        if (_this.sf00503Data.rows[i] == goalItem.type
                            && _this.sf00503Data.columns[j] == goalItem.month) {
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
    Object.defineProperty(SF0050310Component.prototype, "dateUpdate", {
        // get/set
        get: function () {
            return this.customerGoalOld.updatedDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050310Component.prototype, "customerCode", {
        get: function () {
            return this.customerGoalOld.customer.customerCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050310Component.prototype, "saleName", {
        get: function () {
            return this.customerGoalOld.user.username;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050310Component.prototype, "saleOld", {
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
    Object.defineProperty(SF0050310Component.prototype, "departmentId", {
        get: function () {
            if (this.customerGoalOld.user != undefined) {
                return this.customerGoalOld.user.departmentId;
            }
            return this.customerGoalOld.departmentId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050310Component.prototype, "picId", {
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
    SF0050310Component.prototype.calculatorData = function () {
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
        // calculator interestedRateOld
        if (this.totalOldBefore && this.totalOldBefore > 0) {
            this.interestRateOld = math_util_1.default.round(this.totalOldAfter * 100 / this.totalOldBefore, 1);
            if (this.interestRateOld > 1000000) {
                this.interestRateOld = '∞';
            }
        }
        else
            this.interestRateOld = constants_1.Constants.HYPHEN;
        // calculator interestedRateNew
        if (this.totalOldAfter > 0)
            this.interestRateNew
                = math_util_1.default.round(this.sumTotalCustomerGoalNew(this.customerGoalOld.interestedRateNew) * 100 / this.totalOldAfter, 1);
        else
            this.interestRateNew = constants_1.Constants.HYPHEN;
        for (var i = 0; i < this.sf00503Data.columns.length; i++) {
            this.goldOldCus[i] = format_util_1.FormatUtil.isNaN(this.goldCustomerOld[0][i])
                + format_util_1.FormatUtil.isNaN(this.goldCustomerOld[1][i]) + format_util_1.FormatUtil.isNaN(this.goldCustomerOld[2][i]);
            this.goldOldBeforeCus[i] = format_util_1.FormatUtil.isNaN(this.goldCustomerOldBefore[0][i])
                + format_util_1.FormatUtil.isNaN(this.goldCustomerOldBefore[1][i])
                + format_util_1.FormatUtil.isNaN(this.goldCustomerOldBefore[2][i]);
            if (format_util_1.FormatUtil.isNaN(this.goldOldCus[i]) == 0) {
                this.interestRateNews[i] = constants_1.Constants.HYPHEN;
            }
            else {
                this.interestRateNews[i] = math_util_1.default.round(this.customerGoalOld.interestedRateNew[i] * 100 / this.goldOldCus[i], 1);
            }
            if (format_util_1.FormatUtil.isNaN(this.goldOldBeforeCus[i]) == 0) {
                this.interestRateCus[i] = constants_1.Constants.HYPHEN;
            }
            else {
                this.interestRateCus[i] = math_util_1.default.round(this.goldOldCus[i] * 100 * 1000 / this.goldOldBeforeCus[i], 1);
            }
        }
    };
    SF0050310Component.prototype.sumTotalCustomerGoalNew = function (interestedRateNew) {
        var sum = 0;
        if (interestedRateNew) {
            interestedRateNew.forEach(function (item) {
                sum += item;
            });
        }
        return sum;
    };
    SF0050310Component.prototype.navigateSF00402 = function () {
        if (!!this.customerCode) {
            return this.router.navigate(['home/customer', this.customerCode]);
        }
        else {
            $.notify({ message: message_1.default.get(message_2.MSG.COM.INF999) }, { type: 'info' });
        }
    };
    SF0050310Component.prototype.convertYenToThousanYen = function (value) {
        return SF00503_helper_1.SF00503Helper.convertYenToThousanYen(value);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0050310Component.prototype, "index", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050310Component.prototype, "onDataChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050310Component.prototype, "changeSaveCustomerGoal", void 0);
    SF0050310Component = __decorate([
        core_1.Component({
            selector: "div[sf0050310]",
            templateUrl: "SF0050310.component.html"
        }), 
        __metadata('design:paramtypes', [SF00503_data_1.SF00503Data, router_1.Router])
    ], SF0050310Component);
    return SF0050310Component;
}());
exports.SF0050310Component = SF0050310Component;
//# sourceMappingURL=SF0050310.component.js.map