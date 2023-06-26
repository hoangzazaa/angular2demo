import {Injectable} from "@angular/core";
import {User} from "../../../model/core/User.model";
import {Department} from "../../../model/core/Department.model";
import {SaleData} from "../../../model/SaleData.model";
import {DepartmentGoal} from "../../../model/core/DepartmentGoal.model";
import {CustomCustomerGoal} from "../../../model/CustomCustomerGoal.model";
import {Constants} from "../../../helper/constants";
import {FormatUtil} from "../../../util/format-util";
import {CustomerGoalItem} from "../../../model/core/CustomerGoalItem.model";
import {CustomerDataItem} from "../../../model/CustomerDataItem.model";
import MathUtil from "../../../util/math-util";

@Injectable()
export class SF00503Data {
    /** 個人別目標タブに表示する個人別の目標と実績 */
    customCustomerGoalTab3: CustomCustomerGoal[] = [];
    ANY_RESPONSIBLE_PERSON: number               = 0;
    user: User                                   = new User();
    salePerson: number;
    users: User[]                                = [];
    checkChangeUser: boolean                     = false;
    userPicModal: User                           = new User();

    /** 行 (製品種別) 段ボール, 紙器, 商事 */
    rows: number[]    = [0, 1, 2];//rows
    /** 列 (月) 4月, 5月, ..., 3月 */
    columns: number[] = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];// columns

    /** 現在アクティブなタブ (TAB_0?_INDEX) */
    tabCurrent: symbol;
    /** 部門目標 */
    TAB_01_INDEX: symbol = Symbol("TAB_01_INDEX");
    /** 得意先別目標 */
    TAB_02_INDEX: symbol = Symbol("TAB_02_INDEX");
    /** 個人別目標 */
    TAB_03_INDEX: symbol = Symbol("TAB_03_INDEX");

    department: Department = new Department();
    userId: number;

    // Tab 1
    /** 選択可能な年度のリスト */
    years: number[]             = [];
    goalItems: DepartmentGoal[] = [];
    goldNewCus: number[]        = [];
    goldOtherCus: number[]        = [];
    goldOldCus: number[]        = [];
    goldOldBeforeCus: number[]  = [];
    interestRateCus: any[]      = [];

    departments: Department [] = [];
    userDepartments: User[];

    saleData: SaleData[]              = [];
    /** 部門目標のリスト */
    departmentGoals: DepartmentGoal[] = [];

    /** year年度の部門目標 departmentGoal.goalItems[] を [商品種別][月] でインデックス化したもの (新規顧客のみ) */
    goldNew: number[][]       = [];
    /** year年度の部門目標 departmentGoal.goalItems[] を [商品種別][月] でインデックス化したもの (既存顧客(その他)のみ) */
    goldOther: number[][]       = [];
    /** year年度の部門目標 departmentGoal.goalItems[] を [商品種別][月] でインデックス化したもの (既存顧客のみ) */
    goldOld: number[][]       = [];
    /** year-1年度の売上実績 saleDatum.saleDataItems[] を [商品種別][月] でインデックス化したもの */
    goldOldBefore: number[][] = [];

    /**
     * year年度の部門目標
     *
     * goalItems の添字は (既存顧客=0/新規顧客=1) * 36 + sfr_sf_customer_goal_item.type * 3 + 月  (月は 4月=0, 5月=1, ... 3月=11)
     */
    departmentGoal: DepartmentGoal = new DepartmentGoal();
    /** year-1 年度の売上実績 */
    saleDatum: SaleData            = new SaleData();

    /** 現在表示中の年度 */
    year: number;

    /** year-1 年度の段ボール(sfr_sf_revenue.product_type=0) の売上実績 (単位: 千円) 既存顧客のみ */
    type1OldBefore: number;
    /** year-1 年度の紙器(sfr_sf_revenue.product_type=1) の売上実績 (単位: 千円) 既存顧客のみ */
    type2OldBefore: number;
    /** year-1 年度の商事(sfr_sf_revenue.product_type=2) の売上実績 (単位: 千円) 既存顧客のみ */
    type3OldBefore: number;
    /** year-1 年度の売上実績 (単位: 千円) 既存顧客のみ */
    totalOldBefore: number;

    /**
     * 既存顧客の前年比(今年度目標/前年度実績) (単位: %)
     * 
     * 計算式: (totalOldAfter + totalOther) * 100 / totalOldBefore
     * totalOldBefore=0 の場合は '-'
     */
    interestRateOld: number|string;

    /**
     * 前年比(今年度目標/前年度実績) (単位: %)
     * 
     * 計算式: sumTotal * 100 / totalOldBefore
     * totalOldBefore=0 の場合は '-'
     */
    interestRate: number|string;

    //tang truong
    typeTT1: number = 0;

    typeTT2: number = 0;

    typeTT3: number = 0;

    typeTT4: number = 0;

    /** year 年度の段ボール(sfr_sf_revenue.product_type=0)　の部門目標 (単位: 千円) 既存顧客のみ */
    type1OldAfter: number;
    /** year 年度の紙器(sfr_sf_revenue.product_type=1)　の部門目標 (単位: 千円) 既存顧客のみ */
    type2OldAfter: number;
    /** year 年度の商事(sfr_sf_revenue.product_type=2)　の部門目標 (単位: 千円) 既存顧客のみ */
    type3OldAfter: number;
    /** year 年度の部門目標 (単位: 千円) 既存顧客のみ */
    totalOldAfter: number;

    /** year 年度の段ボール(sfr_sf_revenue.product_type=0)　の部門目標 (単位: 千円) 既存顧客(その他)のみ */
    type1Other: number;
    /** year 年度の紙器(sfr_sf_revenue.product_type=1)　の部門目標 (単位: 千円) 既存顧客(その他)のみ */
    type2Other: number;
    /** year 年度の商事(sfr_sf_revenue.product_type=2)　の部門目標 (単位: 千円) 既存顧客(その他)のみ */
    type3Other: number;
    /** year 年度の部門目標 (単位: 千円) 既存顧客のみ */
    totalOther: number;

    /** year 年度の段ボール(sfr_sf_revenue.product_type=0)　の部門目標 (単位: 千円) 新規顧客のみ */
    type1New: number;
    /** year 年度の紙器(sfr_sf_revenue.product_type=1)　の部門目標 (単位: 千円) 新規顧客のみ */
    type2New: number;
    /** year 年度の商事(sfr_sf_revenue.product_type=2)　の部門目標 (単位: 千円) 新規顧客のみ */
    type3New: number;
    /** year 年度の部門目標 (単位: 千円) 新規顧客のみ */
    totalNew: number;

    /** year 年度の段ボール(sfr_sf_revenue.product_type=0)　の部門目標 (単位: 千円) */
    type1: number;
    /** year 年度の紙器(sfr_sf_revenue.product_type=1)　の部門目標 (単位: 千円) */
    type2: number;
    /** year 年度の商事(sfr_sf_revenue.product_type=2)　の部門目標 (単位: 千円) */
    type3: number;
    /** year 年度の部門目標 (単位: 千円) */
    sumTotal: number;

    // Tab 2.
    /** 得意先別目標のリスト */
    customerGoals: CustomCustomerGoal[]           = [];     // 全情報
    /** year年度の得意先別目標のリスト */
    customerGoalsYear: CustomCustomerGoal[]       = [];     // 全情報

    /** 得意先別目標のリスト 既存得意先のみ */
    customerGoalOlds: CustomCustomerGoal[]        = [];     // 既存得意先
    displayCustomerGoalOlds: CustomCustomerGoal[] = [];     // 既存得意先
    currentPageIndexCustomerGoals: number         = 1;      // 既存得意先
    paginatedCustomerGoals: CustomCustomerGoal[];           // 既存得意先

    /** 得意先別目標のリスト 新規得意先のみ */
    customerGoalNews: CustomCustomerGoal[]        = [];     // 新規得意先
    currentPageIndexCustomerGoalNews: number      = 1;      // 新規得意先

    CUSTOMER_GOAL_PAGE_SIZE: number               = 10;

    customerGoalOthersYear: CustomCustomerGoal[]       = [];    // 既存得意先(その他合計)
    /** 得意先別目標のリスト 既存得意先(その他)のみ */
    customerGoalOthers: CustomCustomerGoal[]        = [];       // 既存得意先(その他合計)
    currentPageIndexCustomerGoalOthers: number      = 1;        // 既存得意先(その他合計)

    /** year 年度得意先別目標の合計 (段ボール) (単位: 千円) */
    type1Customer: number = 0;
    /** year 年度得意先別目標の合計 (紙器) (単位: 千円) */
    type2Customer: number = 0;
    /** year 年度得意先別目標の合計 (商事) (単位: 千円) */
    type3Customer: number = 0;
    /** year 年度得意先別目標の合計 (単位: 千円) */
    totalCustomer: number = 0;

    displayLimit = {
        NONE    : Symbol("displayLimit.NONE"),
        FIRST_10: Symbol("displayLimit.FIRST_10"),
        FIRST_20: Symbol("displayLimit.FIRST_20"),
        FIRST_30: Symbol("displayLimit.FIRST_30")
    };

    sort = {
        SALES_PERFORMANCE: Symbol("sort.SALES_PERFORMANCE"),
        ORDER_NUMBER     : Symbol("sort.ORDER_NUMBER")
    };

    filters: { limitRule: symbol, sortRule: symbol, customerName: string };

    get readOnlyDeptGoal(): boolean {
        // if login user is staff then readonly input text box, else input normally.
        let readOnly = !(this.user.role == "2" && this.user.departmentId == this.department.id);
        // hard code
        if (this.department.id == 43 && this.user.id == 67) {
            // G80 - user_id 67 - EE94 (dept_id = 43 )
            readOnly = false;
        } else if (this.department.id == 42 && this.user.id == 87) {
            // G10 - user_id 87 - EE92 (dept_id = 42 )
            readOnly = false;
        }
        return readOnly;
    }

    get readOnlyCusGoal(): boolean {
        // if login user is staff then readonly input text box, else input normally.
        let readOnly = this.user.departmentId != this.department.id;
        // hard code
        if (this.department.id == 43 && this.user.id == 67) {
            // G80 - user_id 67 - EE94 (dept_id = 43 )
            readOnly = false;
        } else if (this.department.id == 42 && this.user.id == 87) {
            // G10 - user_id 87 - EE92 (dept_id = 42 )
            readOnly = false;
        }
        return readOnly;
    }

    resetListData() {
        this.customerGoalOlds = [];
        this.customerGoalNews = [];
        this.customerGoalOthers = [];

        this.goldNewCus       = [];
        this.goldOtherCus     = [];
        this.goldOldCus       = [];
        this.goldOldBeforeCus = [];

        this.goldOld                 = [];
        this.goldNew                 = [];
        this.goldOther               = [];
        this.goldOldBefore           = [];
        this.customerGoalsYear       = [];
        this.displayCustomerGoalOlds = [];

        this.goldNew[Constants.TYPE_1] = [];
        this.goldNew[Constants.TYPE_2] = [];
        this.goldNew[Constants.TYPE_3] = [];

        this.goldOther[Constants.TYPE_1] = [];
        this.goldOther[Constants.TYPE_2] = [];
        this.goldOther[Constants.TYPE_3] = [];

        this.goldOld[Constants.TYPE_1] = [];
        this.goldOld[Constants.TYPE_2] = [];
        this.goldOld[Constants.TYPE_3] = [];

        this.goldOldBefore[Constants.TYPE_1] = [];
        this.goldOldBefore[Constants.TYPE_2] = [];
        this.goldOldBefore[Constants.TYPE_3] = [];
    }

    /**
     * year 年度の得意先別目標を集計する。
     * 
     * 以下の属性が更新される。
     * <ul>
     * <li>totalCustomer, type1Customer, type2Customer, type3Customer
     * </ul>
     */
    calculatorCustomer(): void {
        this.type1Customer = 0;
        this.type2Customer = 0;
        this.type3Customer = 0;
        this.totalCustomer = 0;

        // calculator data product type with list customer all
        if (this.customerGoalsYear) {
            this.customerGoalsYear.forEach(customerGoal => {
                let itemTotalType = this.calculatorCustomerGoal(customerGoal);
                this.type1Customer += itemTotalType.totalType1;
                this.type2Customer += itemTotalType.totalType2;
                this.type3Customer += itemTotalType.totalType3;
                this.totalCustomer += itemTotalType.totalSum;
            })
        }
    }

    /**
     * ある得意先の目標を集計する。
     * 
     * @param customerGoal 集計する得意先の目標
     * @return 集計結果
     */
    calculatorCustomerGoal(customerGoal: CustomCustomerGoal): ItemTotalType {
        let itemTotalType = new ItemTotalType();
        if (customerGoal.goalItems) {
            customerGoal.goalItems.forEach(item => {
                if (item.type == 0) {
                    itemTotalType.totalType1 += item.goal;
                } else if (item.type == 1) {
                    itemTotalType.totalType2 += item.goal;
                } else if (item.type == 2) {
                    itemTotalType.totalType3 += item.goal;
                }
            })
            itemTotalType.totalSum = itemTotalType.totalType1 + itemTotalType.totalType2 + itemTotalType.totalType3;
        }

        return itemTotalType;
    }

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
    calculatorDepartmentAfter(): void {


        // 部門目標を集計する (2.既存得意先(その他合計))
        let type1Other = 0;
        let type2Other = 0;
        let type3Other = 0;
        for (let i = 0; i < this.columns.length; i++) {
            type1Other += FormatUtil.isNaN(this.goldOther[0][i]);
            type2Other += FormatUtil.isNaN(this.goldOther[1][i]);
            type3Other += FormatUtil.isNaN(this.goldOther[2][i]);
        }

        this.type1Other = type1Other;
        this.type2Other = type2Other;
        this.type3Other = type3Other;

        this.totalOther = this.type1Other + this.type2Other + this.type3Other;

        // 部門目標を集計する (1. 既存得意先)
        let type1OldAfter = 0;
        let type2OldAfter = 0;
        let type3OldAfter = 0;

        for (let i = 0; i < this.columns.length; i++) {
            type1OldAfter += FormatUtil.isNaN(this.goldOld[0][i]);

            type2OldAfter += FormatUtil.isNaN(this.goldOld[1][i]);

            type3OldAfter += FormatUtil.isNaN(this.goldOld[2][i]);
        }

        this.type1OldAfter = type1OldAfter;
        this.type2OldAfter = type2OldAfter;
        this.type3OldAfter = type3OldAfter;

        this.totalOldAfter = this.type1OldAfter
            + this.type2OldAfter + this.type3OldAfter;

        let revenue = this.totalOldBefore;
        if (revenue == 0) {
            this.interestRateOld = Constants.HYPHEN;
        } else {
            this.interestRateOld = (this.totalOldAfter + this.totalOther) * 100 / revenue;
        }

        // 部門目標を集計する (3.新規得意先)
        let type1New = 0;
        let type2New = 0;
        let type3New = 0;
        for (let i = 0; i < this.columns.length; i++) {
            type1New += FormatUtil.isNaN(this.goldNew[0][i]);
            type2New += FormatUtil.isNaN(this.goldNew[1][i]);
            type3New += FormatUtil.isNaN(this.goldNew[2][i]);
        }

        this.type1New = type1New;
        this.type2New = type2New;
        this.type3New = type3New;

        this.totalNew = this.type1New + this.type2New + this.type3New;

        // 部門目標を集計する (得意先合算)
        this.type1    = this.type1New + this.type1Other + this.type1OldAfter;
        this.type2    = this.type2New + this.type2Other + this.type2OldAfter;
        this.type3    = this.type3New + this.type3Other + this.type3OldAfter;

        this.sumTotal = this.totalNew + this.totalOther + this.totalOldAfter;

        if (revenue == 0) {
            this.interestRate = Constants.HYPHEN;
        } else {
            this.interestRate = MathUtil.round(this.sumTotal * 100 / revenue, 1);
        }

        for (let i = 0; i < this.columns.length; i++) {
            this.goldOldCus[i]       = FormatUtil.isNaN(this.goldOld[0][i])
                + FormatUtil.isNaN(this.goldOld[1][i]) + FormatUtil.isNaN(this.goldOld[2][i]);
            this.goldNewCus[i]       = FormatUtil.isNaN(this.goldNew[0][i])
                + FormatUtil.isNaN(this.goldNew[1][i]) + FormatUtil.isNaN(this.goldNew[2][i]);
            this.goldOtherCus[i]       = FormatUtil.isNaN(this.goldOther[0][i])
                + FormatUtil.isNaN(this.goldOther[1][i]) + FormatUtil.isNaN(this.goldOther[2][i]);
            this.goldOldBeforeCus[i] = FormatUtil.isNaN(this.goldOldBefore[0][i])
                + FormatUtil.isNaN(this.goldOldBefore[1][i]) + FormatUtil.isNaN(this.goldOldBefore[2][i]);

            if (this.goldOldBeforeCus[i] && this.goldOldBeforeCus[i] > 0) {
                let revenue = this.goldOldBeforeCus[i];
                if (revenue == 0) {
                    this.interestRateCus[i] = Constants.HYPHEN;
                } else {
                    this.interestRateCus[i] = MathUtil.round(this.goldOldCus[i] * 100 * 1000 / revenue, 1);
                }
            } else {
                this.interestRateCus[i] = Constants.HYPHEN;
            }
        }
    }

    /**
     * 前年度実績を集計する。
     * 
     * totalOldBefore, type1OldBefore, type2OldBefore, type3OldBefore が更新される。
     * 
     * @memberof SF00503Data
     */
    calculatorDepartmentBefore(): void {
        let type1OldBefore = 0;
        let type2OldBefore = 0;
        let type3OldBefore = 0;

        for (let i = 0; i < this.columns.length; i++) {
            type1OldBefore += FormatUtil.isNaN(this.goldOldBefore[0][i]);
            type2OldBefore += FormatUtil.isNaN(this.goldOldBefore[1][i]);
            type3OldBefore += FormatUtil.isNaN(this.goldOldBefore[2][i]);
        }

        this.type1OldBefore = MathUtil.round(type1OldBefore/1000,0);
        this.type2OldBefore = MathUtil.round(type2OldBefore/1000,0);
        this.type3OldBefore = MathUtil.round(type3OldBefore/1000,0);

        this.totalOldBefore = this.type1OldBefore
            + this.type2OldBefore + this.type3OldBefore;
    }

    updateDataTab3(): void {
        // reset list data
        this.customCustomerGoalTab3 = [];
        // filter get data
        this.users.forEach(item => {
            let customCustomerGoal = this.getCustomerGoalBySaleId(item.id);
            if (customCustomerGoal) {
                this.customCustomerGoalTab3.push(customCustomerGoal);
            }
        })
    }

    /**
     * this.customerGoalsYear からユーザー ID で絞り込んで、表示用に整形した CustomCustomerGoal に変換する。
     * 
     * @param picId 営業担当 ID (sfr_sf_user.id)
     * @returns 表示用に整形した CustomCustomerGoal
     */
    getCustomerGoalBySaleId(picId: number): CustomCustomerGoal {
        let customerGoal = this.createListGoalItem();
        let userGoals: CustomCustomerGoal[]; // this.customerGoalsYear からユーザー ID で絞り込んだもの

        userGoals = this.customerGoalsYear.filter(item => {
            return item.picId == picId;
        });
        // check list customerGoal by picId
        if (userGoals.length == 0) {
            return undefined;
        }

        for (let i = 0; i < 12; i++) {
            userGoals.forEach(goal => {
                // check goalItemOld create
                if (goal.goalItems) {
                    goal.goalItems.forEach(goalItem => {
                        // get list interestedRate
                        if (this.columns[i] == goalItem.month
                            && Constants.CUSTOMER_NEW == goalItem.customerType && goalItem.type != undefined) {
                            customerGoal.interestedRateNew[i] += FormatUtil.isNaN(goalItem.goal);
                        }
                    })
                }
            })
        }

        userGoals.forEach(goal => {
            customerGoal.user         = goal.user;
            customerGoal.departmentId = goal.departmentId;
            customerGoal.year         = goal.year;
            // get list goalItems
            let goalItems             = goal.goalItems;
            if (goalItems) {
                customerGoal.goalItems.forEach(targetGoalItem => {
                    // check goalItemOld create
                    goalItems.forEach(inputGoalItem => {
                        if (targetGoalItem.month == inputGoalItem.month && targetGoalItem.type == inputGoalItem.type) {
                            targetGoalItem.goal += FormatUtil.isNaN(inputGoalItem.goal);
                        }
                    });
                });
            }
            // get list revenue
            let saleDataItems = goal.customerDataItems;
            if (saleDataItems) {
                customerGoal.customerDataItems.forEach(targetCustomerDataItem => {
                    saleDataItems.forEach(saleDataItem => {
                        if (targetCustomerDataItem.month == saleDataItem.month
                            && targetCustomerDataItem.productType == saleDataItem.productType) {
                            targetCustomerDataItem.totalMoney += FormatUtil.isNaN(saleDataItem.totalMoney);
                        }
                    });
                });
            }
        })

        return customerGoal;
    }

    /**
     * 空の CustomCustomerGoal を生成 (表示用に使用される)
     * 
     * @returns 生成した CustomCustomerGoal
     */
    createListGoalItem(): CustomCustomerGoal {
        let customerGoal       = new CustomCustomerGoal();
        customerGoal.goalItems = [];
        let type               = 0;

        customerGoal.customerDataItems = [];
        for (let i = 0; i < 36; i++) {
            if (i < 12) {
                customerGoal.interestedRateNew[i] = 0;
            }
            customerGoal.goalItems[i]         = new CustomerGoalItem();
            customerGoal.customerDataItems[i] = new CustomerDataItem();

            customerGoal.customerDataItems[i].totalMoney = 0;
            customerGoal.goalItems[i].goal               = 0;
            customerGoal.goalItems[i].customerGoalId     = customerGoal.id;
            // month
            let indexMonth                               = i % 12;

            // type
            if (indexMonth == 0) {
                // if type == 3 -> reset type = 0
                if (type % 3 == 0) {
                    type = 0;
                }

                type++;
            }
            // set type
            customerGoal.goalItems[i].type                = type - 1;
            customerGoal.customerDataItems[i].productType = type - 1;
            // set month
            customerGoal.customerDataItems[i].month       = this.columns[indexMonth];

            customerGoal.goalItems[i].month = this.columns[indexMonth];
        }
        return customerGoal;
    }
}

/**
 * 得意先別目標の集計結果
 */
class ItemTotalType {
    /** 段ボールの目標値 (単位: 千円) */
    totalType1: number = 0;
    /** 紙器の目標値 (単位: 千円) */
    totalType2: number = 0;
    /** 商事の目標値 (単位: 千円) */
    totalType3: number = 0;

    /** 目標値合計 (単位: 千円) */
    totalSum: number = 0;
}
