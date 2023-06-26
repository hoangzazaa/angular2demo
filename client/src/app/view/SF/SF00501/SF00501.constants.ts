import {StaffModel} from "./model/SF00501_Staff.model";
import {DepartmentModel} from "./model/SF00501_Department.model";
import {ViewModeModel} from "./model/SF00501_ViewMode.model";
/**
 * Defined the constants key use in the application.
 * @author manhnv
 */
export class SF00501Constants {

    // data repo map
    public static readonly MAP_DEPARTMENT_STAFF: string = "dept";
    public static readonly MAP_DATE_SELECT: string = "date_unit";
    public static readonly MAP_AGENT: string = "agent";

    // 指定なし option
    public static readonly OPTION_ALL_STAFF: StaffModel = {id: 0, name: "指定なし", departmentId: undefined};
    // 全社 option
    public static readonly OPTION_ALL_DEPT: DepartmentModel = {id: 0, name: "全社"};

    // date unit options
    public static readonly OPTION_DATE_UNIT_YEAR = 1;
    public static readonly OPTION_DATE_UNIT_HALF_YEAR = 2;
    public static readonly OPTION_DATE_UNIT_QUARTER = 3;
    public static readonly OPTION_DATE_UNIT_MONTH = 4;

    // customer options
    public static readonly OPTION_CUSTOMER_ALL = 1;
    public static readonly OPTION_CUSTOMER_OLD = 2;
    public static readonly OPTION_CUSTOMER_NEW = 3;

    // option summary type
    public static readonly OPTION_SUMMARY_PERFORMANCE = 1;
    public static readonly OPTION_SUMMARY_INPROCESS = 2;

    // option deal type
    public static readonly OPTION_DEAL_ALL = 1;
    public static readonly OPTION_DEAL_NEW = 2;
    public static readonly OPTION_DEAL_REUSE = 3;

    // option detail view types
    public static readonly OPTION_DETAIL_PRODUCT: ViewModeModel = {id: 1, name: "製品種類別"};
    public static readonly OPTION_DETAIL_DEPT: ViewModeModel = {id: 2, name: "グループ別"};
    public static readonly OPTION_DETAIL_STAFF: ViewModeModel = {id: 3, name: "スタッフ別"};
    public static readonly OPTION_DETAIL_DEAL: ViewModeModel = {id: 4, name: "案件一覧"};

    // product type and amountType
    public static readonly TYPE_PRODUCT_1: number = 0;
    public static readonly TYPE_PRODUCT_2: number = 1;
    public static readonly TYPE_PRODUCT_3: number = 2;
    public static readonly TYPE_AMOUNT_OLD: number = 1;
    public static readonly TYPE_AMOUNT_NEW: number = 2;
    public static readonly TYPE_AMOUNT_GOAL: number = 3;

    // detail wrapper type
    public static readonly TYPE_WRAPPER_NORMAL: number = 0;
    public static readonly TYPE_WRAPPER_TOTAL: number = 1;
    public static readonly TYPE_WRAPPER_OLD_TOTAL: number = 2;
    public static readonly TYPE_WRAPPER_GOAL: number = 3;
    public static readonly TYPE_WRAPPER_RATE: number = 4;

    // title name
    public static readonly TITLE_PRODUCT_1: string = "段ボール";
    public static readonly TITLE_PRODUCT_2: string = "紙器";
    public static readonly TITLE_PRODUCT_3: string = "商事";
    public static readonly TITLE_TOTAL: string = "合計";
    public static readonly TITLE_REVENUEL: string = "前年";
    public static readonly TITLE_REVENUE_RATE: string = "前年比";
    public static readonly TITLE_GOAL: string = "目標";
    public static readonly TITLE_GOAL_RATE: string = "目標比";

    // parameter
    public static readonly CONST_SLIDE_TIME = 300;

    // colors
    public static readonly COLOR_GOAL: string = "rgba(151, 235, 171, 1)";
    public static readonly COLOR_RESOURCE: string = "rgba(251, 219, 147, 1)";
    public static readonly COLOR_ORDER: string = "rgba(55, 158, 79, 1)";
    public static readonly COLOR_PLAN_ORDER: string = "rgba(248, 191, 61, 1)";
    public static readonly LABEL_GOAL: string = "目標";
    public static readonly LABEL_PERFORMANCE: string = "実績";
    public static readonly LABEL_RESOURCE: string = "予材";
}