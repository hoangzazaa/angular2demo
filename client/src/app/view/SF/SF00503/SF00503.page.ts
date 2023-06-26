import {Component, OnInit} from "@angular/core";
import {HeaderProvider} from "../SF00100/Header.provider";
import {Router, ActivatedRoute} from "@angular/router";
import {SF00503Data} from "./SF00503.data";
import {MSG, default as Messages} from "../../../helper/message";
import {SF00503Service} from "./SF00503.service";
import {CC00100Service} from "../../CC/CC00100/CC00100.service";
import {Constants} from "../../../helper/constants";
import {DepartmentGoal} from "../../../model/core/DepartmentGoal.model";
import {DepartmentGoalItem} from "../../../model/core/DepartmentGoalItem.model";
import {SaleData} from "../../../model/SaleData.model";
import {Department} from "../../../model/core/Department.model";
import {DepartmentGoalsStateControl} from "./DepartmentGoalsStateControl";
import {IndividualGoalsStateControl} from "./IndividualGoalsStateControl";
import DataUtil from "../../../util/data-util";
import {CustomCustomerGoal} from "../../../model/CustomCustomerGoal.model";
import {CustomerDataItem} from "../../../model/CustomerDataItem.model";
import ValidatorUtil from "../../../util/validator-util";
import MathUtil from "../../../util/math-util";
import {CommonPage} from "../COMMON/common.page";
import {SF00503Helper} from "./SF00503.helper";

const SF00503_PAGE_TITLE: string = "営業目標登録";
declare let $: JQueryStatic;
declare let App: any;

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
@Component({
    templateUrl: "SF00503.page.html",
    providers: [SF00503Data, SF00503Service],
})
export class SF00503Page extends CommonPage implements OnInit {
    private departmentGoalsStates: DepartmentGoalsStateControl = new DepartmentGoalsStateControl();
    private individualGoalsStates: IndividualGoalsStateControl = new IndividualGoalsStateControl();

    constructor(router: Router, headerProvider: HeaderProvider, route: ActivatedRoute,
                public sf00503Data: SF00503Data, public sf00503Service: SF00503Service,
                public authService: CC00100Service) {

        super(router, route, headerProvider);

        // reset and create list data
        this.sf00503Data.resetListData();
        // get user auth
        this.sf00503Data.user = authService.user;
        this.sf00503Data.salePerson = this.sf00503Data.ANY_RESPONSIBLE_PERSON;

    }

    protected pageTile(): string {
        return SF00503_PAGE_TITLE;
    }

    /**
     * 画面表示前の初期処理 (sf00503Data の初期化など)
     */
    ngOnInit(): void {

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
                .find(department => department.id === this.sf00503Data.user.departmentId) || this.sf00503Data.departments[0];
        this.sf00503Data.users = this.sf00503Data.department.users;

        this.selectDefaultPIC();

        // hide image loading data
        App.loader('hide');
        // get and update data by year
        this.updateDataByYear();

        this.sf00503Data.filters = {
            limitRule: this.sf00503Data.displayLimit.NONE,
            sortRule: this.sf00503Data.sort.SALES_PERFORMANCE,
            customerName: Constants.BLANK
        };

        this.applyFilters();
    }

    private selectDefaultPIC() {

        const ROLE_STAFF = '2';
        let isStaff = this.sf00503Data.user.role === ROLE_STAFF;
        let isSaler = !!(this.sf00503Data.users.find(user => user.id === this.sf00503Data.user.id));
        if (isStaff || !isSaler) {
            this.sf00503Data.salePerson = this.sf00503Data.ANY_RESPONSIBLE_PERSON
        } else {
            this.sf00503Data.salePerson = this.sf00503Data.user.id;
        }
    }

    get tab01Index() {
        return this.sf00503Data.TAB_01_INDEX;
    }

    get tab02Index() {
        return this.sf00503Data.TAB_02_INDEX;
    }

    get tab03Index() {
        return this.sf00503Data.TAB_03_INDEX;
    }

    get isCurrentTabDatasSaved(): boolean {
        if (this.sf00503Data.tabCurrent == null || this.sf00503Data.tabCurrent === this.sf00503Data.TAB_01_INDEX) {
            return this.departmentGoalsStates.isAllStatesSaved;
        } else {
            return this.individualGoalsStates.isAllStatesSaved;
        }
    }


    private confirmToIgnoreUnsaved(onConfirmed: (confirmed: boolean) => any) {
        // confirm to switch tab view
        swal({
                title: "",
                text: Messages.get(MSG.SF00503.INF002),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d26a5c",
                confirmButtonText: Messages.get(MSG.SF00503.INF007),
                closeOnConfirm: true
            },
            (onConfirmed)
        );
    }


    /**
     * remove change and to back
     */
    cancel() {
        let self = this;

        if (!self.isCurrentTabDatasSaved) {
            // confirm to switch tab view
            self.confirmToIgnoreUnsaved((confirmed: boolean) => {
                if (confirmed) {
                    back();
                }
            });
        } else {
            back();
        }

        function back() {
            self.router.navigate(["/home"]);
        }

    }

    // save sale goal
    saveSaleGoal() {
        this.convertDataArrToUserGoal();
        let message = "";

        this.sf00503Service.saveDepartmentGoal(this.sf00503Data.departmentGoal).then(data => {
            if (this.sf00503Data.departmentGoal.id) {
                message = "Update department goal successfully";
            } else {
                message = "Create department goal successfully";
                this.sf00503Data.departmentGoals.push(data.departmentGoal);
            }

            this.sf00503Data.departmentGoal = data.departmentGoal;
            this.sf00503Data.departmentGoals.forEach(item => {
                if (item.id == this.sf00503Data.departmentGoal.id) {
                    item.activityPolicy = data.departmentGoal.activityPolicy;
                    for (let i = 0; i < item.goalItems.length; i++) {
                        item.goalItems[i].goal = this.sf00503Data.departmentGoal.goalItems[i].goal;
                    }
                }
            });
            this.departmentGoalsStates.resetAllStates();
            $.notify({message: message}, {type: 'success'});
        });
    }

    // Change tab
    changeTab(target) {
        let self = this;

        // current tab clicked, do nothing
        if (self.sf00503Data.tabCurrent === target) {
            return false;
        }

        let previousTab = self.sf00503Data.tabCurrent;
        let previsousPage = self.sf00503Data.currentPageIndexCustomerGoals;

        // check for unsaved flag
        if (!self.isCurrentTabDatasSaved) {
            // confirm to switch tab view
            this.confirmToIgnoreUnsaved((confirmed: boolean) => {
                if (confirmed) {
                    App.loader('show');

                    // wait load data
                    self.sf00503Service.getInitTab2(self.sf00503Data.department.id, self.sf00503Data.year).then(data => {
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
        } else {
            if (target === self.tab03Index) {
                App.loader('show');
                // wait load data
                self.sf00503Service.getInitTab2(self.sf00503Data.department.id, self.sf00503Data.year).then(data => {
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
            } else if (tabIndex === self.sf00503Data.TAB_02_INDEX) {
                $('#tab-head-02').addClass('active');
                $('#tab-head-01').removeClass('active');
                $('#tab-head-03').removeClass('active');

                $('#tab-body-02').addClass("in active");
                $('#tab-body-01').removeClass("in active");
                $('#tab-body-03').removeClass("in active");
            } else if (tabIndex === self.sf00503Data.TAB_03_INDEX) {
                $('#tab-head-03').addClass('active');
                $('#tab-head-01').removeClass('active');
                $('#tab-head-02').removeClass('active');

                $('#tab-body-03').addClass("in active");
                $('#tab-body-01').removeClass("in active");
                $('#tab-body-02').removeClass("in active");
            }

            self.sf00503Data.tabCurrent = tabIndex;
        }

    }

    // emit change year component to parent
    changeDataByYear(year) {
        let self = this;

        if (year == self.sf00503Data.year) {
            return false;
        }

        if (!self.isCurrentTabDatasSaved) {
            self.confirmToIgnoreUnsaved((confirmed: boolean) => {
                if (confirmed) {
                    updateYear(year);
                } else {
                    rollbackYear();
                }
            });
            return;
        } else {
            updateYear(year);
            return;
        }

        // set emitted value to model and update data
        function updateYear(year) {
            self.sf00503Data.year = year;
            App.loader('show');

            self.sf00503Service.getInitTab2(self.sf00503Data.department.id, year).then(data => {
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

    }

    get departments() {
        return this.sf00503Data.departments;
    }

    get users() {
        return this.sf00503Data.users;
    }

    //departmentId
    get department(): Department {
        return this.sf00503Data.department;
    }

    set department(value: Department) {
        // set value department
        this.sf00503Data.department = value;

        this.sf00503Data.users = value.users;

        // get users by department id
        this.filterDepartment(value.id);

    }


    filterDepartment(departmentId: number) {
        this.sf00503Data.department.id = departmentId;
        App.loader('show');

        this.sf00503Service.getInitTab1(departmentId).then(data => {

            this.sf00503Data.departmentGoals = data.departmentGoals;
            this.sf00503Data.saleData = data.saleData;
            // wait load data
            this.sf00503Service.getInitTab2(departmentId, this.sf00503Data.year).then(data => {
                // update data
                this.sf00503Data.customerGoals = data.customerGoals;

                this.updateDataByYear();
                this.selectDefaultPIC();

                this.sf00503Data.filters.limitRule = this.sf00503Data.displayLimit.NONE;
                this.sf00503Data.filters.sortRule = this.sf00503Data.sort.SALES_PERFORMANCE;
                this.sf00503Data.filters.customerName = Constants.BLANK;
                this.applyFilters();

                if (this.sf00503Data.tabCurrent == this.sf00503Data.TAB_03_INDEX) {
                    this.sf00503Data.updateDataTab3();
                }
                App.loader('hide');
            });
        });

    }

    // convert data arr to data department goal
    convertDataArrToUserGoal() {
        for (let i = 0; i < this.sf00503Data.rows.length; i++) {
            for (let j = 0; j < this.sf00503Data.columns.length; j++) {
                this.sf00503Data.departmentGoal.goalItems.forEach(item => {
                    if (item.month == this.sf00503Data.columns[j]
                        && item.type == i
                        && item.customerType == Constants.CUSTOMER_OLD) {
                        item.goal = this.sf00503Data.goldOld[i][j];
                    }

                    if (item.month == this.sf00503Data.columns[j]
                        && item.type == i
                        && item.customerType == Constants.CUSTOMER_NEW) {
                        item.goal = this.sf00503Data.goldNew[i][j];
                    }
                })
            }
        }

    }

    /**
     * サーバーから取得したデータを年度や部門の選択状態に応じて sf00503 に記入する。
     * 
     * @param [andApplyPagingForOldCustomers] 得意先別目標タブ 既存得意先セクションのページ番号(1-)
     * @param [andApplyPagingForNewCustomers] 得意先別目標タブ 新規得意先セクションのページ番号(1-)
     * @param [andApplyPagingForOtherCustomers] 得意先別目標タブ 既存得意先(その他)セクションのページ番号(1-)
     */
    updateDataByYear(andApplyPagingForOldCustomers?: number, andApplyPagingForNewCustomers?: number, andApplyPagingForOtherCustomers?: number) {
        this.sf00503Data.saleDatum = new SaleData();

        this.sf00503Data.resetListData();

        // 表示中の年度の部門目標を選択
        this.sf00503Data.departmentGoal = DataUtil.cloneObject(this.sf00503Data.departmentGoals.find(departmentGoal => {
                return this.sf00503Data.year == departmentGoal.year;
            }) || new DepartmentGoal());


        // 得意先別目標を 現在選択年, 新規, 既存, 既存(その他) で仕分け
        this.sf00503Data.customerGoals.forEach(item => {
            if (item.year == this.sf00503Data.year) {
                this.sf00503Data.customerGoalsYear.push(item);

                // 新規得意先
                if (item.goalType == 1) {
                    this.sf00503Data.customerGoalNews.push(item);

                // 既存得意先(その他合計)
                } else if(item.goalType == 2) {
                    this.sf00503Data.customerGoalOthers.push(item);

                // 既存得意先     (item.goalType == 0)
                } else {
                    this.sf00503Data.customerGoalOlds.push(item);
                }
            }
        });

        // copy this.sf00503Data.customerGoalOlds datasource to display datasource without modified original datasource
        this.sf00503Data.displayCustomerGoalOlds = DataUtil.cloneObject(this.sf00503Data.customerGoalOlds);

        // check departmentGoal
        if (!this.sf00503Data.departmentGoal.id) {
            this.sf00503Data.departmentGoal = new DepartmentGoal();
            // set year
            this.sf00503Data.departmentGoal.year = this.sf00503Data.year;
            this.sf00503Data.departmentGoal.departmentId = this.sf00503Data.department.id;
        }

        // 前年度の売上実績を選択
        this.sf00503Data.saleData.forEach(item => {
            if (this.sf00503Data.year - 1 == item.year) {
                this.sf00503Data.saleDatum = item;
            }
        });

        // create this.sf00503Data.userGoal.goalItems
        // if this.sf00503Data.userGoal.goalItems == undefined || this.sf00503Data.userGoal.goalItems.length == 0
        if (this.sf00503Data.departmentGoal.goalItems == undefined
            || this.sf00503Data.departmentGoal.goalItems.length == 0) {
            this.sf00503Data.departmentGoal.goalItems = [];
            this.createDepartmentGoal();
        }

        let goalItems_1 = this.sf00503Data.departmentGoal.goalItems;

        // defined list goldOld and goldNew
        for (let i = 0; i < this.sf00503Data.rows.length; i++) {
            for (let j = 0; j < this.sf00503Data.columns.length; j++) {
                if (goalItems_1 && goalItems_1.length > 0) {
                    goalItems_1.forEach(goalItem => {
                        // map data goalOld
                        if (this.sf00503Data.rows[i] == goalItem.type
                            && this.sf00503Data.columns[j] == goalItem.month
                            && goalItem.customerType == Constants.CUSTOMER_OLD) {
                            this.sf00503Data.goldOld[i][j] = goalItem.goal;
                        }
                        // map data goalNew
                        if (this.sf00503Data.rows[i] == goalItem.type
                            && this.sf00503Data.columns[j] == goalItem.month
                            && goalItem.customerType == Constants.CUSTOMER_NEW) {
                            this.sf00503Data.goldNew[i][j] = MathUtil.round(goalItem.goal, 0);
                        }
                        // map data goalOther
                        if (this.sf00503Data.rows[i] == goalItem.type
                            && this.sf00503Data.columns[j] == goalItem.month
                            && goalItem.customerType == Constants.CUSTOMER_OTHER) {
                            this.sf00503Data.goldOther[i][j] = MathUtil.round(goalItem.goal, 0);
                        }
                    });
                } else {
                    this.sf00503Data.goldOld[i][j] = 0;
                    this.sf00503Data.goldOther[i][j] = 0;
                    this.sf00503Data.goldNew[i][j] = 0;
                }
            }
        }

        // get userGoalBefore by year -1
        let saleDataItems = this.sf00503Data.saleDatum.saleDataItems;

        for (let i = 0; i < this.sf00503Data.rows.length; i++) {
            for (let j = 0; j < this.sf00503Data.columns.length; j++) {
                if (saleDataItems && saleDataItems.length > 0) {
                    saleDataItems.forEach(saleDataItem => {
                        // map data goldOldBefore
                        if (this.sf00503Data.rows[i] == saleDataItem.productType
                            && this.sf00503Data.columns[j] == saleDataItem.month) {

                            this.sf00503Data.goldOldBefore[i][j] = saleDataItem.totalMoney;
                        }
                    });
                } else {
                    this.sf00503Data.goldOldBefore[i][j] = 0;
                }
            }
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
    }

    applyFilters() {
        let self = this;
        let filters = self.sf00503Data.filters;

        if (!self.individualGoalsStates.isAllOldCustomerGoalsSaved) {
            self.confirmToIgnoreUnsaved((confirmed: boolean) => {
                if (confirmed) {

                    App.loader('show');
                    self.sf00503Data.customerGoals = [];
                    self.sf00503Data.customerGoalOlds = [];
                    self.sf00503Data.customerGoalsYear = [];
                    self.sf00503Data.displayCustomerGoalOlds = [];
                    self.sf00503Data.paginatedCustomerGoals = [];
                    self.sf00503Service.getInitTab2(self.sf00503Data.department.id, self.sf00503Data.year).then(data => {
                        // update data
                        self.sf00503Data.customerGoals = data.customerGoals;
                        // wait
                        App.loader('hide');

                        // filter CustomCustomerGoalOld and CustomCustomerGoalNew
                        self.sf00503Data.customerGoals.forEach(item => {
                            if (item.year == self.sf00503Data.year) {
                                self.sf00503Data.customerGoalsYear.push(item);
                                // check customer new or old all
                                if (item.customerId) {
                                    self.sf00503Data.customerGoalOlds.push(DataUtil.cloneObject(item));
                                }
                            }
                        });

                        // copy this.sf00503Data.customerGoalOlds datasource to display datasource without modified original datasource
                        self.sf00503Data.displayCustomerGoalOlds = DataUtil.cloneObject(this.sf00503Data.customerGoalOlds);

                        // reset all change
                        self.individualGoalsStates.resetOldCustomerGoalsStates();

                        self.sf00503Data.calculatorCustomer();

                        return displayFiltered();
                    });

                }
            });


        } else {
            return displayFiltered();
        }

        function displayFiltered() {
            let goalsComparator = getComparatorByRule(filters.sortRule);
            self.sf00503Data.customerGoalOlds = self.sf00503Data
                .customerGoalsYear
                .filter(item => {
                    return !!item.customerId // has customer
                        && item.year == self.sf00503Data.year // same year
                        && (self.sf00503Data.salePerson == self.sf00503Data.ANY_RESPONSIBLE_PERSON ? true
                                : item.picId == self.sf00503Data.salePerson  // filter by PIC
                        )
                        && (ValidatorUtil.isNullOrBlank(filters.customerName) ? true
                                : self.matchCustomerName(filters.customerName, item.customer.name) // filter by
                            // customer name if user need
                        );
                })
                .sort(goalsComparator);

            let limit = parseLimitFromRule(filters.limitRule);
            if (self.sf00503Data.customerGoalOlds.length < limit) {
                limit = self.sf00503Data.customerGoalOlds.length;
            }

            let filteredGoals = [];
            for (let i = 0; i < limit; i++) {
                filteredGoals[i] = DataUtil.cloneObject(self.sf00503Data.customerGoalOlds[i]);
            }

            self.sf00503Data.displayCustomerGoalOlds = filteredGoals;
            self.applyOldCustomerGoalsPaging(1);


            self.individualGoalsStates.resetOldCustomerGoalsStates();

        }

        function getComparatorByRule(sortRule: symbol): (c1: CustomCustomerGoal, c2: CustomCustomerGoal) => number {
            switch (sortRule) {
                case self.sf00503Data.sort.SALES_PERFORMANCE:
                    return (c1: CustomCustomerGoal, c2: CustomCustomerGoal) => {
                        let totalC1: number = c1.customerDataItems.reduce((total: number, value: CustomerDataItem) => {
                            return total + value.totalMoney;
                        }, 0);
                        let totalC2: number = c2.customerDataItems.reduce((total: number, value: CustomerDataItem) => {
                            return total + value.totalMoney;
                        }, 0);

                        return DataUtil.compareNumber(totalC1, totalC2, true);
                    };
                case self.sf00503Data.sort.ORDER_NUMBER:
                    return (c1: CustomCustomerGoal, c2: CustomCustomerGoal) => {
                        let totalC1: number = c1.customerDataItems.reduce((total: number, value: CustomerDataItem) => {
                            return total + value.numberOfOrder;
                        }, 0);
                        let totalC2: number = c2.customerDataItems.reduce((total: number, value: CustomerDataItem) => {
                            return total + value.numberOfOrder;
                        }, 0);

                        return DataUtil.compareNumber(totalC1, totalC2, true);
                    };
                default:
                    // this implement will avoid sort rule in case we got an invalid sort rule
                    return () => 0;
            }
        }

        function parseLimitFromRule(limitRule: symbol): number {
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
    }

    private matchCustomerName(pattern: string, name: string) {
        return name.trim().indexOf(pattern.trim()) >= 0;
    }

    applyOldCustomerGoalsPaging(pageIndex: number) {
        if (!pageIndex || pageIndex <= 0) {
            pageIndex = 1;
        }
        let offset: number = (pageIndex - 1) * this.sf00503Data.CUSTOMER_GOAL_PAGE_SIZE;

        this.sf00503Data.paginatedCustomerGoals =
            this.sf00503Data.displayCustomerGoalOlds.slice(offset, offset + this.sf00503Data.CUSTOMER_GOAL_PAGE_SIZE);

        this.sf00503Data.currentPageIndexCustomerGoals = pageIndex;

        this.$scrollTop("#customerGoalList");
    }

    applyNewCustomerGoalsPaging(pageIndex: number) {
        if (!pageIndex || pageIndex <= 0) {
            pageIndex = 1;
        }
        let offset: number = (pageIndex - 1) * this.sf00503Data.CUSTOMER_GOAL_PAGE_SIZE;
        // this.sf00503Data.paginatedcustomerGoalNews =
        //     this.sf00503Data.customerGoalNews.slice(offset, offset + this.sf00503Data.CUSTOMER_GOAL_PAGE_SIZE);
        this.sf00503Data.currentPageIndexCustomerGoalNews = pageIndex;
    }

    applyOtherCustomerGoalsPaging(pageIndex: number) {
        if (!pageIndex || pageIndex <= 0) {
            pageIndex = 1;
        }
        let offset: number = (pageIndex - 1) * this.sf00503Data.CUSTOMER_GOAL_PAGE_SIZE;
        // this.sf00503Data.paginatedcustomerGoalNews =
        //     this.sf00503Data.customerGoalNews.slice(offset, offset + this.sf00503Data.CUSTOMER_GOAL_PAGE_SIZE);
        this.sf00503Data.currentPageIndexCustomerGoalOthers = pageIndex;
    }

    /**
     * 表示用の部門目標リストを生成する
     */
    createDepartmentGoal() {
        let type = 0;
        for (let i = 0; i < 72; i++) {
            this.sf00503Data.departmentGoal.goalItems[i] = new DepartmentGoalItem();
            this.sf00503Data.departmentGoal.goalItems[i].goal = 0;
            this.sf00503Data.departmentGoal.goalItems[i].departmentGoalId = this.sf00503Data.departmentGoal.id;
            // month
            let indexMonth = i % 12;

            // type
            if (indexMonth == 0) {
                // if type == 3 -> reset type = 0
                if (type % 3 == 0) {
                    type = 0;
                }

                type++;
            }
            // set type
            this.sf00503Data.departmentGoal.goalItems[i].type = type - 1;
            // set month
            this.sf00503Data.departmentGoal.goalItems[i].month = this.sf00503Data.columns[indexMonth];

            // check gold customerType
            if (i < 36) {
                this.sf00503Data.departmentGoal.goalItems[i].customerType = Constants.CUSTOMER_OLD;
            } else {
                this.sf00503Data.departmentGoal.goalItems[i].customerType = Constants.CUSTOMER_NEW;
            }

            this.sf00503Data.saleDatum.saleDataItems.forEach(item => {
                if (this.sf00503Data.departmentGoal.goalItems[i].type == item.productType
                    && this.sf00503Data.departmentGoal.goalItems[i].month == item.month
                    && this.sf00503Data.departmentGoal.goalItems[i].customerType == Constants.CUSTOMER_OLD) {
                    this.sf00503Data.departmentGoal.goalItems[i].goal = SF00503Helper.convertYenToThousanYen(item.totalMoney);
                }
            })

        }
    }
}
