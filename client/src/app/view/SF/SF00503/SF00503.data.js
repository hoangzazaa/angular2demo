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
var User_model_1 = require("../../../model/core/User.model");
var Department_model_1 = require("../../../model/core/Department.model");
var SaleData_model_1 = require("../../../model/SaleData.model");
var DepartmentGoal_model_1 = require("../../../model/core/DepartmentGoal.model");
var CustomCustomerGoal_model_1 = require("../../../model/CustomCustomerGoal.model");
var constants_1 = require("../../../helper/constants");
var format_util_1 = require("../../../util/format-util");
var CustomerGoalItem_model_1 = require("../../../model/core/CustomerGoalItem.model");
var CustomerDataItem_model_1 = require("../../../model/CustomerDataItem.model");
var math_util_1 = require("../../../util/math-util");
var SF00503Data = (function () {
    function SF00503Data() {
        /** 個人別目標タブに表示する個人別の目標と実績 */
        this.customCustomerGoalTab3 = [];
        this.ANY_RESPONSIBLE_PERSON = 0;
        this.user = new User_model_1.User();
        this.users = [];
        this.checkChangeUser = false;
        this.userPicModal = new User_model_1.User();
        /** 行 (製品種別) 段ボール, 紙器, 商事 */
        this.rows = [0, 1, 2]; //rows
        /** 列 (月) 4月, 5月, ..., 3月 */
        this.columns = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3]; // columns
        /** 部門目標 */
        this.TAB_01_INDEX = Symbol("TAB_01_INDEX");
        /** 得意先別目標 */
        this.TAB_02_INDEX = Symbol("TAB_02_INDEX");
        /** 個人別目標 */
        this.TAB_03_INDEX = Symbol("TAB_03_INDEX");
        this.department = new Department_model_1.Department();
        // Tab 1
        /** 選択可能な年度のリスト */
        this.years = [];
        this.goalItems = [];
        this.goldNewCus = [];
        this.goldOtherCus = [];
        this.goldOldCus = [];
        this.goldOldBeforeCus = [];
        this.interestRateCus = [];
        this.departments = [];
        this.saleData = [];
        /** 部門目標のリスト */
        this.departmentGoals = [];
        /** year年度の部門目標 departmentGoal.goalItems[] を [商品種別][月] でインデックス化したもの (新規顧客のみ) */
        this.goldNew = [];
        /** year年度の部門目標 departmentGoal.goalItems[] を [商品種別][月] でインデックス化したもの (既存顧客(その他)のみ) */
        this.goldOther = [];
        /** year年度の部門目標 departmentGoal.goalItems[] を [商品種別][月] でインデックス化したもの (既存顧客のみ) */
        this.goldOld = [];
        /** year-1年度の売上実績 saleDatum.saleDataItems[] を [商品種別][月] でインデックス化したもの */
        this.goldOldBefore = [];
        /**
         * year年度の部門目標
         *
         * goalItems の添字は (既存顧客=0/新規顧客=1) * 36 + sfr_sf_customer_goal_item.type * 3 + 月  (月は 4月=0, 5月=1, ... 3月=11)
         */
        this.departmentGoal = new DepartmentGoal_model_1.DepartmentGoal();
        /** year-1 年度の売上実績 */
        this.saleDatum = new SaleData_model_1.SaleData();
        //tang truong
        this.typeTT1 = 0;
        this.typeTT2 = 0;
        this.typeTT3 = 0;
        this.typeTT4 = 0;
        // Tab 2.
        /** 得意先別目標のリスト */
        this.customerGoals = []; // 全情報
        /** year年度の得意先別目標のリスト */
        this.customerGoalsYear = []; // 全情報
        /** 得意先別目標のリスト 既存得意先のみ */
        this.customerGoalOlds = []; // 既存得意先
        this.displayCustomerGoalOlds = []; // 既存得意先
        this.currentPageIndexCustomerGoals = 1; // 既存得意先
        /** 得意先別目標のリスト 新規得意先のみ */
        this.customerGoalNews = []; // 新規得意先
        this.currentPageIndexCustomerGoalNews = 1; // 新規得意先
        this.CUSTOMER_GOAL_PAGE_SIZE = 10;
        this.customerGoalOthersYear = []; // 既存得意先(その他合計)
        /** 得意先別目標のリスト 既存得意先(その他)のみ */
        this.customerGoalOthers = []; // 既存得意先(その他合計)
        this.currentPageIndexCustomerGoalOthers = 1; // 既存得意先(その他合計)
        /** year 年度得意先別目標の合計 (段ボール) (単位: 千円) */
        this.type1Customer = 0;
        /** year 年度得意先別目標の合計 (紙器) (単位: 千円) */
        this.type2Customer = 0;
        /** year 年度得意先別目標の合計 (商事) (単位: 千円) */
        this.type3Customer = 0;
        /** year 年度得意先別目標の合計 (単位: 千円) */
        this.totalCustomer = 0;
        this.displayLimit = {
            NONE: Symbol("displayLimit.NONE"),
            FIRST_10: Symbol("displayLimit.FIRST_10"),
            FIRST_20: Symbol("displayLimit.FIRST_20"),
            FIRST_30: Symbol("displayLimit.FIRST_30")
        };
        this.sort = {
            SALES_PERFORMANCE: Symbol("sort.SALES_PERFORMANCE"),
            ORDER_NUMBER: Symbol("sort.ORDER_NUMBER")
        };
    }
    Object.defineProperty(SF00503Data.prototype, "readOnlyDeptGoal", {
        get: function () {
            // if login user is staff then readonly input text box, else input normally.
            var readOnly = !(this.user.role == "2" && this.user.departmentId == this.department.id);
            // hard code
            if (this.department.id == 43 && this.user.id == 67) {
                // G80 - user_id 67 - EE94 (dept_id = 43 )
                readOnly = false;
            }
            else if (this.department.id == 42 && this.user.id == 87) {
                // G10 - user_id 87 - EE92 (dept_id = 42 )
                readOnly = false;
            }
            return readOnly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00503Data.prototype, "readOnlyCusGoal", {
        get: function () {
            // if login user is staff then readonly input text box, else input normally.
            var readOnly = this.user.departmentId != this.department.id;
            // hard code
            if (this.department.id == 43 && this.user.id == 67) {
                // G80 - user_id 67 - EE94 (dept_id = 43 )
                readOnly = false;
            }
            else if (this.department.id == 42 && this.user.id == 87) {
                // G10 - user_id 87 - EE92 (dept_id = 42 )
                readOnly = false;
            }
            return readOnly;
        },
        enumerable: true,
        configurable: true
    });
    SF00503Data.prototype.resetListData = function () {
        this.customerGoalOlds = [];
        this.customerGoalNews = [];
        this.customerGoalOthers = [];
        this.goldNewCus = [];
        this.goldOtherCus = [];
        this.goldOldCus = [];
        this.goldOldBeforeCus = [];
        this.goldOld = [];
        this.goldNew = [];
        this.goldOther = [];
        this.goldOldBefore = [];
        this.customerGoalsYear = [];
        this.displayCustomerGoalOlds = [];
        this.goldNew[constants_1.Constants.TYPE_1] = [];
        this.goldNew[constants_1.Constants.TYPE_2] = [];
        this.goldNew[constants_1.Constants.TYPE_3] = [];
        this.goldOther[constants_1.Constants.TYPE_1] = [];
        this.goldOther[constants_1.Constants.TYPE_2] = [];
        this.goldOther[constants_1.Constants.TYPE_3] = [];
        this.goldOld[constants_1.Constants.TYPE_1] = [];
        this.goldOld[constants_1.Constants.TYPE_2] = [];
        this.goldOld[constants_1.Constants.TYPE_3] = [];
        this.goldOldBefore[constants_1.Constants.TYPE_1] = [];
        this.goldOldBefore[constants_1.Constants.TYPE_2] = [];
        this.goldOldBefore[constants_1.Constants.TYPE_3] = [];
    };
    /**
     * year 年度の得意先別目標を集計する。
     *
     * 以下の属性が更新される。
     * <ul>
     * <li>totalCustomer, type1Customer, type2Customer, type3Customer
     * </ul>
     */
    SF00503Data.prototype.calculatorCustomer = function () {
        var _this = this;
        this.type1Customer = 0;
        this.type2Customer = 0;
        this.type3Customer = 0;
        this.totalCustomer = 0;
        // calculator data product type with list customer all
        if (this.customerGoalsYear) {
            this.customerGoalsYear.forEach(function (customerGoal) {
                var itemTotalType = _this.calculatorCustomerGoal(customerGoal);
                _this.type1Customer += itemTotalType.totalType1;
                _this.type2Customer += itemTotalType.totalType2;
                _this.type3Customer += itemTotalType.totalType3;
                _this.totalCustomer += itemTotalType.totalSum;
            });
        }
    };
    /**
     * ある得意先の目標を集計する。
     *
     * @param customerGoal 集計する得意先の目標
     * @return 集計結果
     */
    SF00503Data.prototype.calculatorCustomerGoal = function (customerGoal) {
        var itemTotalType = new ItemTotalType();
        if (customerGoal.goalItems) {
            customerGoal.goalItems.forEach(function (item) {
                if (item.type == 0) {
                    itemTotalType.totalType1 += item.goal;
                }
                else if (item.type == 1) {
                    itemTotalType.totalType2 += item.goal;
                }
                else if (item.type == 2) {
                    itemTotalType.totalType3 += item.goal;
                }
            });
            itemTotalType.totalSum = itemTotalType.totalType1 + itemTotalType.totalType2 + itemTotalType.totalType3;
        }
        return itemTotalType;
    };
    /**
     * 今年度目標を集計する。
     *
     * 以下の属性が更新される。
     * <ul>
     * <li>totalOther, type1Other, type2Other, type3Other
     * <li>totalOldAfter, type1OldAfter, type2OldAfter, type3OldAfter
     * <li>totalNew, type1New, type2New, type3New
     * <li>sumTotal, totalNew, totalOther, totalOldAfter
     * <li>interestRateOld, interestRate
     * </ul>
     */
    SF00503Data.prototype.calculatorDepartmentAfter = function () {
        // 部門目標を集計する (2.既存得意先(その他合計))
        var type1Other = 0;
        var type2Other = 0;
        var type3Other = 0;
        for (var i = 0; i < this.columns.length; i++) {
            type1Other += format_util_1.FormatUtil.isNaN(this.goldOther[0][i]);
            type2Other += format_util_1.FormatUtil.isNaN(this.goldOther[1][i]);
            type3Other += format_util_1.FormatUtil.isNaN(this.goldOther[2][i]);
        }
        this.type1Other = type1Other;
        this.type2Other = type2Other;
        this.type3Other = type3Other;
        this.totalOther = this.type1Other + this.type2Other + this.type3Other;
        // 部門目標を集計する (1. 既存得意先)
        var type1OldAfter = 0;
        var type2OldAfter = 0;
        var type3OldAfter = 0;
        for (var i = 0; i < this.columns.length; i++) {
            type1OldAfter += format_util_1.FormatUtil.isNaN(this.goldOld[0][i]);
            type2OldAfter += format_util_1.FormatUtil.isNaN(this.goldOld[1][i]);
            type3OldAfter += format_util_1.FormatUtil.isNaN(this.goldOld[2][i]);
        }
        this.type1OldAfter = type1OldAfter;
        this.type2OldAfter = type2OldAfter;
        this.type3OldAfter = type3OldAfter;
        this.totalOldAfter = this.type1OldAfter
            + this.type2OldAfter + this.type3OldAfter;
        var revenue = this.totalOldBefore;
        if (revenue == 0) {
            this.interestRateOld = constants_1.Constants.HYPHEN;
        }
        else {
            this.interestRateOld = (this.totalOldAfter + this.totalOther) * 100 / revenue;
        }
        // 部門目標を集計する (3.新規得意先)
        var type1New = 0;
        var type2New = 0;
        var type3New = 0;
        for (var i = 0; i < this.columns.length; i++) {
            type1New += format_util_1.FormatUtil.isNaN(this.goldNew[0][i]);
            type2New += format_util_1.FormatUtil.isNaN(this.goldNew[1][i]);
            type3New += format_util_1.FormatUtil.isNaN(this.goldNew[2][i]);
        }
        this.type1New = type1New;
        this.type2New = type2New;
        this.type3New = type3New;
        this.totalNew = this.type1New + this.type2New + this.type3New;
        // 部門目標を集計する (得意先合算)
        this.type1 = this.type1New + this.type1Other + this.type1OldAfter;
        this.type2 = this.type2New + this.type2Other + this.type2OldAfter;
        this.type3 = this.type3New + this.type3Other + this.type3OldAfter;
        this.sumTotal = this.totalNew + this.totalOther + this.totalOldAfter;
        if (revenue == 0) {
            this.interestRate = constants_1.Constants.HYPHEN;
        }
        else {
            this.interestRate = math_util_1.default.round(this.sumTotal * 100 / revenue, 1);
        }
        for (var i = 0; i < this.columns.length; i++) {
            this.goldOldCus[i] = format_util_1.FormatUtil.isNaN(this.goldOld[0][i])
                + format_util_1.FormatUtil.isNaN(this.goldOld[1][i]) + format_util_1.FormatUtil.isNaN(this.goldOld[2][i]);
            this.goldNewCus[i] = format_util_1.FormatUtil.isNaN(this.goldNew[0][i])
                + format_util_1.FormatUtil.isNaN(this.goldNew[1][i]) + format_util_1.FormatUtil.isNaN(this.goldNew[2][i]);
            this.goldOtherCus[i] = format_util_1.FormatUtil.isNaN(this.goldOther[0][i])
                + format_util_1.FormatUtil.isNaN(this.goldOther[1][i]) + format_util_1.FormatUtil.isNaN(this.goldOther[2][i]);
            this.goldOldBeforeCus[i] = format_util_1.FormatUtil.isNaN(this.goldOldBefore[0][i])
                + format_util_1.FormatUtil.isNaN(this.goldOldBefore[1][i]) + format_util_1.FormatUtil.isNaN(this.goldOldBefore[2][i]);
            if (this.goldOldBeforeCus[i] && this.goldOldBeforeCus[i] > 0) {
                var revenue_1 = this.goldOldBeforeCus[i];
                if (revenue_1 == 0) {
                    this.interestRateCus[i] = constants_1.Constants.HYPHEN;
                }
                else {
                    this.interestRateCus[i] = math_util_1.default.round(this.goldOldCus[i] * 100 * 1000 / revenue_1, 1);
                }
            }
            else {
                this.interestRateCus[i] = constants_1.Constants.HYPHEN;
            }
        }
    };
    /**
     * 前年度実績を集計する。
     *
     * totalOldBefore, type1OldBefore, type2OldBefore, type3OldBefore が更新される。
     *
     * @memberof SF00503Data
     */
    SF00503Data.prototype.calculatorDepartmentBefore = function () {
        var type1OldBefore = 0;
        var type2OldBefore = 0;
        var type3OldBefore = 0;
        for (var i = 0; i < this.columns.length; i++) {
            type1OldBefore += format_util_1.FormatUtil.isNaN(this.goldOldBefore[0][i]);
            type2OldBefore += format_util_1.FormatUtil.isNaN(this.goldOldBefore[1][i]);
            type3OldBefore += format_util_1.FormatUtil.isNaN(this.goldOldBefore[2][i]);
        }
        this.type1OldBefore = math_util_1.default.round(type1OldBefore / 1000, 0);
        this.type2OldBefore = math_util_1.default.round(type2OldBefore / 1000, 0);
        this.type3OldBefore = math_util_1.default.round(type3OldBefore / 1000, 0);
        this.totalOldBefore = this.type1OldBefore
            + this.type2OldBefore + this.type3OldBefore;
    };
    SF00503Data.prototype.updateDataTab3 = function () {
        var _this = this;
        // reset list data
        this.customCustomerGoalTab3 = [];
        // filter get data
        this.users.forEach(function (item) {
            var customCustomerGoal = _this.getCustomerGoalBySaleId(item.id);
            if (customCustomerGoal) {
                _this.customCustomerGoalTab3.push(customCustomerGoal);
            }
        });
    };
    /**
     * this.customerGoalsYear からユーザー ID で絞り込んで、表示用に整形した CustomCustomerGoal に変換する。
     *
     * @param picId 営業担当 ID (sfr_sf_user.id)
     * @returns 表示用に整形した CustomCustomerGoal
     */
    SF00503Data.prototype.getCustomerGoalBySaleId = function (picId) {
        var _this = this;
        var customerGoal = this.createListGoalItem();
        var userGoals; // this.customerGoalsYear からユーザー ID で絞り込んだもの
        userGoals = this.customerGoalsYear.filter(function (item) {
            return item.picId == picId;
        });
        // check list customerGoal by picId
        if (userGoals.length == 0) {
            return undefined;
        }
        var _loop_1 = function(i) {
            userGoals.forEach(function (goal) {
                // check goalItemOld create
                if (goal.goalItems) {
                    goal.goalItems.forEach(function (goalItem) {
                        // get list interestedRate
                        if (_this.columns[i] == goalItem.month
                            && constants_1.Constants.CUSTOMER_NEW == goalItem.customerType && goalItem.type != undefined) {
                            customerGoal.interestedRateNew[i] += format_util_1.FormatUtil.isNaN(goalItem.goal);
                        }
                    });
                }
            });
        };
        for (var i = 0; i < 12; i++) {
            _loop_1(i);
        }
        userGoals.forEach(function (goal) {
            customerGoal.user = goal.user;
            customerGoal.departmentId = goal.departmentId;
            customerGoal.year = goal.year;
            // get list goalItems
            var goalItems = goal.goalItems;
            if (goalItems) {
                customerGoal.goalItems.forEach(function (targetGoalItem) {
                    // check goalItemOld create
                    goalItems.forEach(function (inputGoalItem) {
                        if (targetGoalItem.month == inputGoalItem.month && targetGoalItem.type == inputGoalItem.type) {
                            targetGoalItem.goal += format_util_1.FormatUtil.isNaN(inputGoalItem.goal);
                        }
                    });
                });
            }
            // get list revenue
            var saleDataItems = goal.customerDataItems;
            if (saleDataItems) {
                customerGoal.customerDataItems.forEach(function (targetCustomerDataItem) {
                    saleDataItems.forEach(function (saleDataItem) {
                        if (targetCustomerDataItem.month == saleDataItem.month
                            && targetCustomerDataItem.productType == saleDataItem.productType) {
                            targetCustomerDataItem.totalMoney += format_util_1.FormatUtil.isNaN(saleDataItem.totalMoney);
                        }
                    });
                });
            }
        });
        return customerGoal;
    };
    /**
     * 空の CustomCustomerGoal を生成 (表示用に使用される)
     *
     * @returns 生成した CustomCustomerGoal
     */
    SF00503Data.prototype.createListGoalItem = function () {
        var customerGoal = new CustomCustomerGoal_model_1.CustomCustomerGoal();
        customerGoal.goalItems = [];
        var type = 0;
        customerGoal.customerDataItems = [];
        for (var i = 0; i < 36; i++) {
            if (i < 12) {
                customerGoal.interestedRateNew[i] = 0;
            }
            customerGoal.goalItems[i] = new CustomerGoalItem_model_1.CustomerGoalItem();
            customerGoal.customerDataItems[i] = new CustomerDataItem_model_1.CustomerDataItem();
            customerGoal.customerDataItems[i].totalMoney = 0;
            customerGoal.goalItems[i].goal = 0;
            customerGoal.goalItems[i].customerGoalId = customerGoal.id;
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
            customerGoal.goalItems[i].type = type - 1;
            customerGoal.customerDataItems[i].productType = type - 1;
            // set month
            customerGoal.customerDataItems[i].month = this.columns[indexMonth];
            customerGoal.goalItems[i].month = this.columns[indexMonth];
        }
        return customerGoal;
    };
    SF00503Data = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SF00503Data);
    return SF00503Data;
}());
exports.SF00503Data = SF00503Data;
/**
 * 得意先別目標の集計結果
 */
var ItemTotalType = (function () {
    function ItemTotalType() {
        /** 段ボールの目標値 (単位: 千円) */
        this.totalType1 = 0;
        /** 紙器の目標値 (単位: 千円) */
        this.totalType2 = 0;
        /** 商事の目標値 (単位: 千円) */
        this.totalType3 = 0;
        /** 目標値合計 (単位: 千円) */
        this.totalSum = 0;
    }
    return ItemTotalType;
}());
//# sourceMappingURL=SF00503.data.js.map