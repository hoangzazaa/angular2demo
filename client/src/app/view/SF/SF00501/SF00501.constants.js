"use strict";
/**
 * Defined the constants key use in the application.
 * @author manhnv
 */
var SF00501Constants = (function () {
    function SF00501Constants() {
    }
    // data repo map
    SF00501Constants.MAP_DEPARTMENT_STAFF = "dept";
    SF00501Constants.MAP_DATE_SELECT = "date_unit";
    SF00501Constants.MAP_AGENT = "agent";
    // 指定なし option
    SF00501Constants.OPTION_ALL_STAFF = { id: 0, name: "指定なし", departmentId: undefined };
    // 全社 option
    SF00501Constants.OPTION_ALL_DEPT = { id: 0, name: "全社" };
    // date unit options
    SF00501Constants.OPTION_DATE_UNIT_YEAR = 1;
    SF00501Constants.OPTION_DATE_UNIT_HALF_YEAR = 2;
    SF00501Constants.OPTION_DATE_UNIT_QUARTER = 3;
    SF00501Constants.OPTION_DATE_UNIT_MONTH = 4;
    // customer options
    SF00501Constants.OPTION_CUSTOMER_ALL = 1;
    SF00501Constants.OPTION_CUSTOMER_OLD = 2;
    SF00501Constants.OPTION_CUSTOMER_NEW = 3;
    // option summary type
    SF00501Constants.OPTION_SUMMARY_PERFORMANCE = 1;
    SF00501Constants.OPTION_SUMMARY_INPROCESS = 2;
    // option deal type
    SF00501Constants.OPTION_DEAL_ALL = 1;
    SF00501Constants.OPTION_DEAL_NEW = 2;
    SF00501Constants.OPTION_DEAL_REUSE = 3;
    // option detail view types
    SF00501Constants.OPTION_DETAIL_PRODUCT = { id: 1, name: "製品種類別" };
    SF00501Constants.OPTION_DETAIL_DEPT = { id: 2, name: "グループ別" };
    SF00501Constants.OPTION_DETAIL_STAFF = { id: 3, name: "スタッフ別" };
    SF00501Constants.OPTION_DETAIL_DEAL = { id: 4, name: "案件一覧" };
    // product type and amountType
    SF00501Constants.TYPE_PRODUCT_1 = 0;
    SF00501Constants.TYPE_PRODUCT_2 = 1;
    SF00501Constants.TYPE_PRODUCT_3 = 2;
    SF00501Constants.TYPE_AMOUNT_OLD = 1;
    SF00501Constants.TYPE_AMOUNT_NEW = 2;
    SF00501Constants.TYPE_AMOUNT_GOAL = 3;
    // detail wrapper type
    SF00501Constants.TYPE_WRAPPER_NORMAL = 0;
    SF00501Constants.TYPE_WRAPPER_TOTAL = 1;
    SF00501Constants.TYPE_WRAPPER_OLD_TOTAL = 2;
    SF00501Constants.TYPE_WRAPPER_GOAL = 3;
    SF00501Constants.TYPE_WRAPPER_RATE = 4;
    // title name
    SF00501Constants.TITLE_PRODUCT_1 = "段ボール";
    SF00501Constants.TITLE_PRODUCT_2 = "紙器";
    SF00501Constants.TITLE_PRODUCT_3 = "商事";
    SF00501Constants.TITLE_TOTAL = "合計";
    SF00501Constants.TITLE_REVENUEL = "前年";
    SF00501Constants.TITLE_REVENUE_RATE = "前年比";
    SF00501Constants.TITLE_GOAL = "目標";
    SF00501Constants.TITLE_GOAL_RATE = "目標比";
    // parameter
    SF00501Constants.CONST_SLIDE_TIME = 300;
    // colors
    SF00501Constants.COLOR_GOAL = "rgba(151, 235, 171, 1)";
    SF00501Constants.COLOR_RESOURCE = "rgba(251, 219, 147, 1)";
    SF00501Constants.COLOR_ORDER = "rgba(55, 158, 79, 1)";
    SF00501Constants.COLOR_PLAN_ORDER = "rgba(248, 191, 61, 1)";
    SF00501Constants.LABEL_GOAL = "目標";
    SF00501Constants.LABEL_PERFORMANCE = "実績";
    SF00501Constants.LABEL_RESOURCE = "予材";
    return SF00501Constants;
}());
exports.SF00501Constants = SF00501Constants;
//# sourceMappingURL=SF00501.constants.js.map