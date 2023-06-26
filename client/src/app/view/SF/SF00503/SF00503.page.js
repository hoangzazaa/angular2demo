"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var Header_provider_1 = require("../SF00100/Header.provider");
var router_1 = require("@angular/router");
var SF00503_data_1 = require("./SF00503.data");
var message_1 = require("../../../helper/message");
var SF00503_service_1 = require("./SF00503.service");
var CC00100_service_1 = require("../../CC/CC00100/CC00100.service");
var constants_1 = require("../../../helper/constants");
var DepartmentGoal_model_1 = require("../../../model/core/DepartmentGoal.model");
var DepartmentGoalItem_model_1 = require("../../../model/core/DepartmentGoalItem.model");
var SaleData_model_1 = require("../../../model/SaleData.model");
var DepartmentGoalsStateControl_1 = require("./DepartmentGoalsStateControl");
var IndividualGoalsStateControl_1 = require("./IndividualGoalsStateControl");
var data_util_1 = require("../../../util/data-util");
var validator_util_1 = require("../../../util/validator-util");
var math_util_1 = require("../../../util/math-util");
var common_page_1 = require("../COMMON/common.page");
var SF00503_helper_1 = require("./SF00503.helper");
var SF00503_PAGE_TITLE = "営業目標登録";
/**
 * TOP &gt; 営業目標登録
 *
 * <pre>
 * 営業目標登録画面で使用されている Angular Component
 *
 * Component タブ           内容
 * --------------------------------------------------------------------------------
 * sf0050301 (共通)         ヘッダ (年度セレクターとサマリー(支店全体での集計結果))
 * sf0050302 部門目標       既存得意先セクション
 * sf0050303 部門目標       新規得意先セクション
 * sf0050304 得意先別目標   既存得意先セクション
 * sf0050305 得意先別目標   新規得意先セクション
 * sf0050306 得意先別目標     既存得意先セクションの各要素
 * sf0050307 得意先別目標     新規得意先セクションの各要素
 * sf0050308 得意先別目標     担当者検索モーダル
 * sf0050309 個人別目標     担当一覧セクション
 * sf0050310 個人別目標       担当一覧セクションの各要素
 * sf0050311 得意先別目標   既存得意先(その他)セクション
 * sf0050312 得意先別目標     既存得意先(その他)セクションの各要素
 * </pre>
 */
var SF00503Page = (function (_super) {
    __extends(SF00503Page, _super);
    function SF00503Page(router, headerProvider, route, sf00503Data, sf00503Service, authService) {
        _super.call(this, router, route, headerProvider);
        this.sf00503Data = sf00503Data;
        this.sf00503Service = sf00503Service;
        this.authService = authService;
        this.departmentGoalsStates = new DepartmentGoalsStateControl_1.DepartmentGoalsStateControl();
        this.individualGoalsStates = new IndividualGoalsStateControl_1.IndividualGoalsStateControl();
        // reset and create list data
        this.sf00503Data.resetListData();
        // get user auth
        this.sf00503Data.user = authService.user;
        this.sf00503Data.salePerson = this.sf00503Data.ANY_RESPONSIBLE_PERSON;
    }
    SF00503Page.prototype.pageTile = function () {
        return SF00503_PAGE_TITLE;
    };
    /**
     * 画面表示前の初期処理 (sf00503Data の初期化など)
     */
    SF00503Page.prototype.ngOnInit = function () {
        var _this = this;
        this.sf00503Service.navigateTo("営業目標登録", this.router.url);
        // API /SF0050301 の応答を sf00503Data に記入 (部門目標と実績)
        this.sf00503Data.tabCurrent = this.sf00503Data.TAB_01_INDEX;
        this.sf00503Data.departmentGoals = this.route.snapshot.data["dataTab1"].departmentGoals;
        this.sf00503Data.saleData = this.route.snapshot.data["dataTab1"].saleData;
        // API /SF0050305 の応答を sf00503Data に記入 (得意先別目標)
        this.sf00503Data.customerGoals = this.route.snapshot.data["dataTab2"].customerGoals;
        // API /SF0050300 の応答を sf00503Data に記入 (営業部門のリスト)
        this.sf00503Data.departments = this.route.snapshot.data["departmentData"].departments;
        // 現在の年度を選択 (現在日時の年がデフォルト表示の年度となる。 例: 現在が2018/2 なら 2018年度がデフォルト値)
        this.sf00503Data.years = this.route.snapshot.data["timeData"];
        this.sf00503Data.year = this.sf00503Data.years[0];
        // 現在ログインしているユーザーの部門 ID を選択 (見つからなければ最初の部門が選択される)
        this.sf00503Data.department
            = this.sf00503Data.departments
                .find(function (department) { return department.id === _this.sf00503Data.user.departmentId; }) || this.sf00503Data.departments[0];
        this.sf00503Data.users = this.sf00503Data.department.users;
        this.selectDefaultPIC();
        // hide image loading data
        App.loader('hide');
        // get and update data by year
        this.updateDataByYear();
        this.sf00503Data.filters = {
            limitRule: this.sf00503Data.displayLimit.NONE,
            sortRule: this.sf00503Data.sort.SALES_PERFORMANCE,
            customerName: constants_1.Constants.BLANK
        };
        this.applyFilters();
    };
    SF00503Page.prototype.selectDefaultPIC = function () {
        var _this = this;
        var ROLE_STAFF = '2';
        var isStaff = this.sf00503Data.user.role === ROLE_STAFF;
        var isSaler = !!(this.sf00503Data.users.find(function (user) { return user.id === _this.sf00503Data.user.id; }));
        if (isStaff || !isSaler) {
            this.sf00503Data.salePerson = this.sf00503Data.ANY_RESPONSIBLE_PERSON;
        }
        else {
            this.sf00503Data.salePerson = this.sf00503Data.user.id;
        }
    };
    Object.defineProperty(SF00503Page.prototype, "tab01Index", {
        get: function () {
            return this.sf00503Data.TAB_01_INDEX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00503Page.prototype, "tab02Index", {
        get: function () {
            return this.sf00503Data.TAB_02_INDEX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00503Page.prototype, "tab03Index", {
        get: function () {
            return this.sf00503Data.TAB_03_INDEX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00503Page.prototype, "isCurrentTabDatasSaved", {
        get: function () {
            if (this.sf00503Data.tabCurrent == null || this.sf00503Data.tabCurrent === this.sf00503Data.TAB_01_INDEX) {
                return this.departmentGoalsStates.isAllStatesSaved;
            }
            else {
                return this.individualGoalsStates.isAllStatesSaved;
            }
        },
        enumerable: true,
        configurable: true
    });
    SF00503Page.prototype.confirmToIgnoreUnsaved = function (onConfirmed) {
        // confirm to switch tab view
        swal({
            title: "",
            text: message_1.default.get(message_1.MSG.SF00503.INF002),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d26a5c",
            confirmButtonText: message_1.default.get(message_1.MSG.SF00503.INF007),
            closeOnConfirm: true
        }, (onConfirmed));
    };
    /**
     * remove change and to back
     */
    SF00503Page.prototype.cancel = function () {
        var self = this;
        if (!self.isCurrentTabDatasSaved) {
            // confirm to switch tab view
            self.confirmToIgnoreUnsaved(function (confirmed) {
                if (confirmed) {
                    back();
                }
            });
        }
        else {
            back();
        }
        function back() {
            self.router.navigate(["/home"]);
        }
    };
    // save sale goal
    SF00503Page.prototype.saveSaleGoal = function () {
        var _this = this;
        this.convertDataArrToUserGoal();
        var message = "";
        this.sf00503Service.saveDepartmentGoal(this.sf00503Data.departmentGoal).then(function (data) {
            if (_this.sf00503Data.departmentGoal.id) {
                message = "Update department goal successfully";
            }
            else {
                message = "Create department goal successfully";
                _this.sf00503Data.departmentGoals.push(data.departmentGoal);
            }
            _this.sf00503Data.departmentGoal = data.departmentGoal;
            _this.sf00503Data.departmentGoals.forEach(function (item) {
                if (item.id == _this.sf00503Data.departmentGoal.id) {
                    item.activityPolicy = data.departmentGoal.activityPolicy;
                    for (var i = 0; i < item.goalItems.length; i++) {
                        item.goalItems[i].goal = _this.sf00503Data.departmentGoal.goalItems[i].goal;
                    }
                }
            });
            _this.departmentGoalsStates.resetAllStates();
            $.notify({ message: message }, { type: 'success' });
        });
    };
    // Change tab
    SF00503Page.prototype.changeTab = function (target) {
        var self = this;
        // current tab clicked, do nothing
        if (self.sf00503Data.tabCurrent === target) {
            return false;
        }
        var previousTab = self.sf00503Data.tabCurrent;
        var previsousPage = self.sf00503Data.currentPageIndexCustomerGoals;
        // check for unsaved flag
        if (!self.isCurrentTabDatasSaved) {
            // confirm to switch tab view
            this.confirmToIgnoreUnsaved(function (confirmed) {
                if (confirmed) {
                    App.loader('show');
                    // wait load data
                    self.sf00503Service.getInitTab2(self.sf00503Data.department.id, self.sf00503Data.year).then(function (data) {
                        // update data
                        self.sf00503Data.customerGoals = data.customerGoals;
                        resetDataToInitialAndDoSwitchTab();
                        if (previousTab === self.tab02Index) {
                            self.applyFilters();
                            self.applyOldCustomerGoalsPaging(previsousPage);
                        }
                        if (target === self.tab03Index)
                            self.sf00503Data.updateDataTab3();
                        App.loader('hide');
                    });
                }
            });
        }
        else {
            if (target === self.tab03Index) {
                App.loader('show');
                // wait load data
                self.sf00503Service.getInitTab2(self.sf00503Data.department.id, self.sf00503Data.year).then(function (data) {
                    App.loader('hide');
                    // update data
                    self.sf00503Data.customerGoals = data.customerGoals;
                    resetDataToInitialAndDoSwitchTab();
                    if (previousTab === self.tab02Index) {
                        self.applyFilters();
                        self.applyOldCustomerGoalsPaging(previsousPage);
                    }
                    self.sf00503Data.updateDataTab3();
                    // switch immediated to given tab
                });
            }
            showTab(target);
        }
        function resetDataToInitialAndDoSwitchTab() {
            //reset viewing datas, unsaved flag, and change tab view
            self.updateDataByYear(self.sf00503Data.currentPageIndexCustomerGoals, self.sf00503Data.currentPageIndexCustomerGoalNews);
            self.departmentGoalsStates.setSavedDepartmentGoalsFlg();
            self.individualGoalsStates.setSavedNewCustomerGoals();
            self.individualGoalsStates.resetOldCustomerGoalsStates();
            showTab(target);
        }
        function showTab(tabIndex) {
            if (tabIndex === self.sf00503Data.TAB_01_INDEX) {
                $('#tab-head-01').addClass('active');
                $('#tab-head-02').removeClass('active');
                $('#tab-head-03').removeClass('active');
                $('#tab-body-01').addClass("in active");
                $('#tab-body-02').removeClass("in active");
                $('#tab-body-03').removeClass("in active");
            }
            else if (tabIndex === self.sf00503Data.TAB_02_INDEX) {
                $('#tab-head-02').addClass('active');
                $('#tab-head-01').removeClass('active');
                $('#tab-head-03').removeClass('active');
                $('#tab-body-02').addClass("in active");
                $('#tab-body-01').removeClass("in active");
                $('#tab-body-03').removeClass("in active");
            }
            else if (tabIndex === self.sf00503Data.TAB_03_INDEX) {
                $('#tab-head-03').addClass('active');
                $('#tab-head-01').removeClass('active');
                $('#tab-head-02').removeClass('active');
                $('#tab-body-03').addClass("in active");
                $('#tab-body-01').removeClass("in active");
                $('#tab-body-02').removeClass("in active");
            }
            self.sf00503Data.tabCurrent = tabIndex;
        }
    };
    // emit change year component to parent
    SF00503Page.prototype.changeDataByYear = function (year) {
        var self = this;
        if (year == self.sf00503Data.year) {
            return false;
        }
        if (!self.isCurrentTabDatasSaved) {
            self.confirmToIgnoreUnsaved(function (confirmed) {
                if (confirmed) {
                    updateYear(year);
                }
                else {
                    rollbackYear();
                }
            });
            return;
        }
        else {
            updateYear(year);
            return;
        }
        // set emitted value to model and update data
        function updateYear(year) {
            self.sf00503Data.year = year;
            App.loader('show');
            self.sf00503Service.getInitTab2(self.sf00503Data.department.id, year).then(function (data) {
                App.loader('hide');
                // update data
                self.sf00503Data.customerGoals = data.customerGoals;
                self.updateDataByYear();
                self.applyOldCustomerGoalsPaging(1);
                self.applyFilters();
                if (self.sf00503Data.tabCurrent == self.sf00503Data.TAB_03_INDEX) {
                    self.sf00503Data.updateDataTab3();
                }
            });
        }
        function rollbackYear() {
            $("select option[value=" + self.sf00503Data.year + "]").prop("selected", true);
        }
    };
    Object.defineProperty(SF00503Page.prototype, "departments", {
        get: function () {
            return this.sf00503Data.departments;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00503Page.prototype, "users", {
        get: function () {
            return this.sf00503Data.users;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00503Page.prototype, "department", {
        //departmentId
        get: function () {
            return this.sf00503Data.department;
        },
        set: function (value) {
            // set value department
            this.sf00503Data.department = value;
            this.sf00503Data.users = value.users;
            // get users by department id
            this.filterDepartment(value.id);
        },
        enumerable: true,
        configurable: true
    });
    SF00503Page.prototype.filterDepartment = function (departmentId) {
        var _this = this;
        this.sf00503Data.department.id = departmentId;
        App.loader('show');
        this.sf00503Service.getInitTab1(departmentId).then(function (data) {
            _this.sf00503Data.departmentGoals = data.departmentGoals;
            _this.sf00503Data.saleData = data.saleData;
            // wait load data
            _this.sf00503Service.getInitTab2(departmentId, _this.sf00503Data.year).then(function (data) {
                // update data
                _this.sf00503Data.customerGoals = data.customerGoals;
                _this.updateDataByYear();
                _this.selectDefaultPIC();
                _this.sf00503Data.filters.limitRule = _this.sf00503Data.displayLimit.NONE;
                _this.sf00503Data.filters.sortRule = _this.sf00503Data.sort.SALES_PERFORMANCE;
                _this.sf00503Data.filters.customerName = constants_1.Constants.BLANK;
                _this.applyFilters();
                if (_this.sf00503Data.tabCurrent == _this.sf00503Data.TAB_03_INDEX) {
                    _this.sf00503Data.updateDataTab3();
                }
                App.loader('hide');
            });
        });
    };
    // convert data arr to data department goal
    SF00503Page.prototype.convertDataArrToUserGoal = function () {
        var _this = this;
        var _loop_1 = function(i) {
            var _loop_2 = function(j) {
                this_1.sf00503Data.departmentGoal.goalItems.forEach(function (item) {
                    if (item.month == _this.sf00503Data.columns[j]
                        && item.type == i
                        && item.customerType == constants_1.Constants.CUSTOMER_OLD) {
                        item.goal = _this.sf00503Data.goldOld[i][j];
                    }
                    if (item.month == _this.sf00503Data.columns[j]
                        && item.type == i
                        && item.customerType == constants_1.Constants.CUSTOMER_NEW) {
                        item.goal = _this.sf00503Data.goldNew[i][j];
                    }
                });
            };
            for (var j = 0; j < this_1.sf00503Data.columns.length; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.sf00503Data.rows.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * サーバーから取得したデータを年度や部門の選択状態に応じて sf00503 に記入する。
     *
     * @param [andApplyPagingForOldCustomers] 得意先別目標タブ 既存得意先セクションのページ番号(1-)
     * @param [andApplyPagingForNewCustomers] 得意先別目標タブ 新規得意先セクションのページ番号(1-)
     * @param [andApplyPagingForOtherCustomers] 得意先別目標タブ 既存得意先(その他)セクションのページ番号(1-)
     */
    SF00503Page.prototype.updateDataByYear = function (andApplyPagingForOldCustomers, andApplyPagingForNewCustomers, andApplyPagingForOtherCustomers) {
        var _this = this;
        this.sf00503Data.saleDatum = new SaleData_model_1.SaleData();
        this.sf00503Data.resetListData();
        // 表示中の年度の部門目標を選択
        this.sf00503Data.departmentGoal = data_util_1.default.cloneObject(this.sf00503Data.departmentGoals.find(function (departmentGoal) {
            return _this.sf00503Data.year == departmentGoal.year;
        }) || new DepartmentGoal_model_1.DepartmentGoal());
        // 得意先別目標を 現在選択年, 新規, 既存, 既存(その他) で仕分け
        this.sf00503Data.customerGoals.forEach(function (item) {
            if (item.year == _this.sf00503Data.year) {
                _this.sf00503Data.customerGoalsYear.push(item);
                // 新規得意先
                if (item.goalType == 1) {
                    _this.sf00503Data.customerGoalNews.push(item);
                }
                else if (item.goalType == 2) {
                    _this.sf00503Data.customerGoalOthers.push(item);
                }
                else {
                    _this.sf00503Data.customerGoalOlds.push(item);
                }
            }
        });
        // copy this.sf00503Data.customerGoalOlds datasource to display datasource without modified original datasource
        this.sf00503Data.displayCustomerGoalOlds = data_util_1.default.cloneObject(this.sf00503Data.customerGoalOlds);
        // check departmentGoal
        if (!this.sf00503Data.departmentGoal.id) {
            this.sf00503Data.departmentGoal = new DepartmentGoal_model_1.DepartmentGoal();
            // set year
            this.sf00503Data.departmentGoal.year = this.sf00503Data.year;
            this.sf00503Data.departmentGoal.departmentId = this.sf00503Data.department.id;
        }
        // 前年度の売上実績を選択
        this.sf00503Data.saleData.forEach(function (item) {
            if (_this.sf00503Data.year - 1 == item.year) {
                _this.sf00503Data.saleDatum = item;
            }
        });
        // create this.sf00503Data.userGoal.goalItems
        // if this.sf00503Data.userGoal.goalItems == undefined || this.sf00503Data.userGoal.goalItems.length == 0
        if (this.sf00503Data.departmentGoal.goalItems == undefined
            || this.sf00503Data.departmentGoal.goalItems.length == 0) {
            this.sf00503Data.departmentGoal.goalItems = [];
            this.createDepartmentGoal();
        }
        var goalItems_1 = this.sf00503Data.departmentGoal.goalItems;
        // defined list goldOld and goldNew
        var _loop_3 = function(i) {
            var _loop_4 = function(j) {
                if (goalItems_1 && goalItems_1.length > 0) {
                    goalItems_1.forEach(function (goalItem) {
                        // map data goalOld
                        if (_this.sf00503Data.rows[i] == goalItem.type
                            && _this.sf00503Data.columns[j] == goalItem.month
                            && goalItem.customerType == constants_1.Constants.CUSTOMER_OLD) {
                            _this.sf00503Data.goldOld[i][j] = goalItem.goal;
                        }
                        // map data goalNew
                        if (_this.sf00503Data.rows[i] == goalItem.type
                            && _this.sf00503Data.columns[j] == goalItem.month
                            && goalItem.customerType == constants_1.Constants.CUSTOMER_NEW) {
                            _this.sf00503Data.goldNew[i][j] = math_util_1.default.round(goalItem.goal, 0);
                        }
                        // map data goalOther
                        if (_this.sf00503Data.rows[i] == goalItem.type
                            && _this.sf00503Data.columns[j] == goalItem.month
                            && goalItem.customerType == constants_1.Constants.CUSTOMER_OTHER) {
                            _this.sf00503Data.goldOther[i][j] = math_util_1.default.round(goalItem.goal, 0);
                        }
                    });
                }
                else {
                    this_2.sf00503Data.goldOld[i][j] = 0;
                    this_2.sf00503Data.goldOther[i][j] = 0;
                    this_2.sf00503Data.goldNew[i][j] = 0;
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
        // get userGoalBefore by year -1
        var saleDataItems = this.sf00503Data.saleDatum.saleDataItems;
        var _loop_5 = function(i) {
            var _loop_6 = function(j) {
                if (saleDataItems && saleDataItems.length > 0) {
                    saleDataItems.forEach(function (saleDataItem) {
                        // map data goldOldBefore
                        if (_this.sf00503Data.rows[i] == saleDataItem.productType
                            && _this.sf00503Data.columns[j] == saleDataItem.month) {
                            _this.sf00503Data.goldOldBefore[i][j] = saleDataItem.totalMoney;
                        }
                    });
                }
                else {
                    this_3.sf00503Data.goldOldBefore[i][j] = 0;
                }
            };
            for (var j = 0; j < this_3.sf00503Data.columns.length; j++) {
                _loop_6(j);
            }
        };
        var this_3 = this;
        for (var i = 0; i < this.sf00503Data.rows.length; i++) {
            _loop_5(i);
        }
        // 前年度実績と今年度目標を集計する
        this.sf00503Data.calculatorDepartmentBefore();
        this.sf00503Data.calculatorDepartmentAfter();
        // 今年度の得意先別目標を集計する
        this.sf00503Data.calculatorCustomer();
        this.individualGoalsStates.resetAllStates();
        this.departmentGoalsStates.resetAllStates();
        // 得意先別目標タブ内の各セクションページ切り替え
        this.applyOldCustomerGoalsPaging(andApplyPagingForOldCustomers);
        this.applyOtherCustomerGoalsPaging(andApplyPagingForOtherCustomers);
        this.applyNewCustomerGoalsPaging(andApplyPagingForNewCustomers);
    };
    SF00503Page.prototype.applyFilters = function () {
        var _this = this;
        var self = this;
        var filters = self.sf00503Data.filters;
        if (!self.individualGoalsStates.isAllOldCustomerGoalsSaved) {
            self.confirmToIgnoreUnsaved(function (confirmed) {
                if (confirmed) {
                    App.loader('show');
                    self.sf00503Data.customerGoals = [];
                    self.sf00503Data.customerGoalOlds = [];
                    self.sf00503Data.customerGoalsYear = [];
                    self.sf00503Data.displayCustomerGoalOlds = [];
                    self.sf00503Data.paginatedCustomerGoals = [];
                    self.sf00503Service.getInitTab2(self.sf00503Data.department.id, self.sf00503Data.year).then(function (data) {
                        // update data
                        self.sf00503Data.customerGoals = data.customerGoals;
                        // wait
                        App.loader('hide');
                        // filter CustomCustomerGoalOld and CustomCustomerGoalNew
                        self.sf00503Data.customerGoals.forEach(function (item) {
                            if (item.year == self.sf00503Data.year) {
                                self.sf00503Data.customerGoalsYear.push(item);
                                // check customer new or old all
                                if (item.customerId) {
                                    self.sf00503Data.customerGoalOlds.push(data_util_1.default.cloneObject(item));
                                }
                            }
                        });
                        // copy this.sf00503Data.customerGoalOlds datasource to display datasource without modified original datasource
                        self.sf00503Data.displayCustomerGoalOlds = data_util_1.default.cloneObject(_this.sf00503Data.customerGoalOlds);
                        // reset all change
                        self.individualGoalsStates.resetOldCustomerGoalsStates();
                        self.sf00503Data.calculatorCustomer();
                        return displayFiltered();
                    });
                }
            });
        }
        else {
            return displayFiltered();
        }
        function displayFiltered() {
            var goalsComparator = getComparatorByRule(filters.sortRule);
            self.sf00503Data.customerGoalOlds = self.sf00503Data
                .customerGoalsYear
                .filter(function (item) {
                return !!item.customerId // has customer
                    && item.year == self.sf00503Data.year // same year
                    && (self.sf00503Data.salePerson == self.sf00503Data.ANY_RESPONSIBLE_PERSON ? true
                        : item.picId == self.sf00503Data.salePerson // filter by PIC
                    )
                    && (validator_util_1.default.isNullOrBlank(filters.customerName) ? true
                        : self.matchCustomerName(filters.customerName, item.customer.name) // filter by
                    );
            })
                .sort(goalsComparator);
            var limit = parseLimitFromRule(filters.limitRule);
            if (self.sf00503Data.customerGoalOlds.length < limit) {
                limit = self.sf00503Data.customerGoalOlds.length;
            }
            var filteredGoals = [];
            for (var i = 0; i < limit; i++) {
                filteredGoals[i] = data_util_1.default.cloneObject(self.sf00503Data.customerGoalOlds[i]);
            }
            self.sf00503Data.displayCustomerGoalOlds = filteredGoals;
            self.applyOldCustomerGoalsPaging(1);
            self.individualGoalsStates.resetOldCustomerGoalsStates();
        }
        function getComparatorByRule(sortRule) {
            switch (sortRule) {
                case self.sf00503Data.sort.SALES_PERFORMANCE:
                    return function (c1, c2) {
                        var totalC1 = c1.customerDataItems.reduce(function (total, value) {
                            return total + value.totalMoney;
                        }, 0);
                        var totalC2 = c2.customerDataItems.reduce(function (total, value) {
                            return total + value.totalMoney;
                        }, 0);
                        return data_util_1.default.compareNumber(totalC1, totalC2, true);
                    };
                case self.sf00503Data.sort.ORDER_NUMBER:
                    return function (c1, c2) {
                        var totalC1 = c1.customerDataItems.reduce(function (total, value) {
                            return total + value.numberOfOrder;
                        }, 0);
                        var totalC2 = c2.customerDataItems.reduce(function (total, value) {
                            return total + value.numberOfOrder;
                        }, 0);
                        return data_util_1.default.compareNumber(totalC1, totalC2, true);
                    };
                default:
                    // this implement will avoid sort rule in case we got an invalid sort rule
                    return function () { return 0; };
            }
        }
        function parseLimitFromRule(limitRule) {
            switch (limitRule) {
                case self.sf00503Data.displayLimit.FIRST_10:
                    return 10;
                case self.sf00503Data.displayLimit.FIRST_20:
                    return 20;
                case self.sf00503Data.displayLimit.FIRST_30:
                    return 30;
                default:
                    return Number.MAX_SAFE_INTEGER;
            }
        }
    };
    SF00503Page.prototype.matchCustomerName = function (pattern, name) {
        return name.trim().indexOf(pattern.trim()) >= 0;
    };
    SF00503Page.prototype.applyOldCustomerGoalsPaging = function (pageIndex) {
        if (!pageIndex || pageIndex <= 0) {
            pageIndex = 1;
        }
        var offset = (pageIndex - 1) * this.sf00503Data.CUSTOMER_GOAL_PAGE_SIZE;
        this.sf00503Data.paginatedCustomerGoals =
            this.sf00503Data.displayCustomerGoalOlds.slice(offset, offset + this.sf00503Data.CUSTOMER_GOAL_PAGE_SIZE);
        this.sf00503Data.currentPageIndexCustomerGoals = pageIndex;
        this.$scrollTop("#customerGoalList");
    };
    SF00503Page.prototype.applyNewCustomerGoalsPaging = function (pageIndex) {
        if (!pageIndex || pageIndex <= 0) {
            pageIndex = 1;
        }
        var offset = (pageIndex - 1) * this.sf00503Data.CUSTOMER_GOAL_PAGE_SIZE;
        // this.sf00503Data.paginatedcustomerGoalNews =
        //     this.sf00503Data.customerGoalNews.slice(offset, offset + this.sf00503Data.CUSTOMER_GOAL_PAGE_SIZE);
        this.sf00503Data.currentPageIndexCustomerGoalNews = pageIndex;
    };
    SF00503Page.prototype.applyOtherCustomerGoalsPaging = function (pageIndex) {
        if (!pageIndex || pageIndex <= 0) {
            pageIndex = 1;
        }
        var offset = (pageIndex - 1) * this.sf00503Data.CUSTOMER_GOAL_PAGE_SIZE;
        // this.sf00503Data.paginatedcustomerGoalNews =
        //     this.sf00503Data.customerGoalNews.slice(offset, offset + this.sf00503Data.CUSTOMER_GOAL_PAGE_SIZE);
        this.sf00503Data.currentPageIndexCustomerGoalOthers = pageIndex;
    };
    /**
     * 表示用の部門目標リストを生成する
     */
    SF00503Page.prototype.createDepartmentGoal = function () {
        var _this = this;
        var type = 0;
        var _loop_7 = function(i) {
            this_4.sf00503Data.departmentGoal.goalItems[i] = new DepartmentGoalItem_model_1.DepartmentGoalItem();
            this_4.sf00503Data.departmentGoal.goalItems[i].goal = 0;
            this_4.sf00503Data.departmentGoal.goalItems[i].departmentGoalId = this_4.sf00503Data.departmentGoal.id;
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
            this_4.sf00503Data.departmentGoal.goalItems[i].type = type - 1;
            // set month
            this_4.sf00503Data.departmentGoal.goalItems[i].month = this_4.sf00503Data.columns[indexMonth];
            // check gold customerType
            if (i < 36) {
                this_4.sf00503Data.departmentGoal.goalItems[i].customerType = constants_1.Constants.CUSTOMER_OLD;
            }
            else {
                this_4.sf00503Data.departmentGoal.goalItems[i].customerType = constants_1.Constants.CUSTOMER_NEW;
            }
            this_4.sf00503Data.saleDatum.saleDataItems.forEach(function (item) {
                if (_this.sf00503Data.departmentGoal.goalItems[i].type == item.productType
                    && _this.sf00503Data.departmentGoal.goalItems[i].month == item.month
                    && _this.sf00503Data.departmentGoal.goalItems[i].customerType == constants_1.Constants.CUSTOMER_OLD) {
                    _this.sf00503Data.departmentGoal.goalItems[i].goal = SF00503_helper_1.SF00503Helper.convertYenToThousanYen(item.totalMoney);
                }
            });
        };
        var this_4 = this;
        for (var i = 0; i < 72; i++) {
            _loop_7(i);
        }
    };
    SF00503Page = __decorate([
        core_1.Component({
            templateUrl: "SF00503.page.html",
            providers: [SF00503_data_1.SF00503Data, SF00503_service_1.SF00503Service],
        }), 
        __metadata('design:paramtypes', [router_1.Router, Header_provider_1.HeaderProvider, router_1.ActivatedRoute, SF00503_data_1.SF00503Data, SF00503_service_1.SF00503Service, CC00100_service_1.CC00100Service])
    ], SF00503Page);
    return SF00503Page;
}(common_page_1.CommonPage));
exports.SF00503Page = SF00503Page;
//# sourceMappingURL=SF00503.page.js.map