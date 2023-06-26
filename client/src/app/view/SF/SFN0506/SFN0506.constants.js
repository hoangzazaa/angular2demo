"use strict";
var common_helper_1 = require("../../../helper/common-helper");
var SFN0506Constants = (function () {
    function SFN0506Constants() {
    }
    // data repo map
    SFN0506Constants.MAP_DEPARTMENT = "dept";
    // static option
    SFN0506Constants.OPTION_ALL_COMPANY = { id: 0, name: "全社" };
    SFN0506Constants.OPTION_ALL_USER = { id: 0, name: "指定なし", departmentId: undefined };
    // time format
    SFN0506Constants.DATE_DISPLAY = "YYYY/MM/DD";
    // payment method
    SFN0506Constants.PAYMENT_METHODS = {
        0: "すべて",
        1: "現金",
        2: "手形",
        3: "小切手",
        4: "当座振込",
        5: "普通振込"
    };
    SFN0506Constants.PAYMENT_METHOD_OPTIONS = common_helper_1.CommonHelper.getList([0, 1, 2, 3, 4, 5], SFN0506Constants.PAYMENT_METHODS);
    return SFN0506Constants;
}());
exports.SFN0506Constants = SFN0506Constants;
//# sourceMappingURL=SFN0506.constants.js.map