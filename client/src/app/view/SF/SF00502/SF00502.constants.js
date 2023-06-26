"use strict";
/**
 * Defined the constants key use in the application.
 * @author manhnv
 */
var SF00502Constants = (function () {
    function SF00502Constants() {
    }
    // screen mode
    SF00502Constants.SCREEN_MODE_ACHIEVEMENT = 1;
    SF00502Constants.SCREEN_MODE_PREDICTION = 2;
    // table type
    SF00502Constants.TABLE_TYPE_INCREASE = 1;
    SF00502Constants.TABLE_TYPE_DECREASE = 2;
    // data repo map
    SF00502Constants.MAP_DEPARTMENT = "dept";
    SF00502Constants.MAP_SUMMARY = "summary";
    SF00502Constants.MAP_CUSTOMER_INCREASE = "cus_inc";
    SF00502Constants.MAP_CUSTOMER_DECREASE = "cus_dec";
    SF00502Constants.MAP_STAFF_CUSTOMER = "staff_cus";
    SF00502Constants.MAP_CUSTOMER = "customer";
    SF00502Constants.MAP_CUSTOMER_NOTE = "cus_note";
    // static option
    SF00502Constants.OPTION_ALL_COMPANY = { id: 0, name: "全社" };
    SF00502Constants.OPTION_ALL_STAFF = { id: 0, name: "指定なし", departmentId: undefined };
    // list limit
    SF00502Constants.LIMIT_LIST = 10;
    // note type
    SF00502Constants.HEAD_NOTE = 1;
    return SF00502Constants;
}());
exports.SF00502Constants = SF00502Constants;
//# sourceMappingURL=SF00502.constants.js.map