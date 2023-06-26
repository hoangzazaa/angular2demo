"use strict";
var SFN0505Constants = (function () {
    function SFN0505Constants() {
    }
    // data repo map
    SFN0505Constants.MAP_DEPARTMENT = "dept";
    // static option
    SFN0505Constants.OPTION_ALL_COMPANY = { id: 0, name: "全社" };
    SFN0505Constants.OPTION_ALL_USER = { id: 0, name: "指定なし", departmentId: undefined };
    // time format
    SFN0505Constants.DATE_DISPLAY = "YYYY/M/D";
    // status string
    SFN0505Constants.STATUS_1 = "出荷待ち";
    SFN0505Constants.STATUS_2 = "出荷済";
    SFN0505Constants.STATUS_3 = "出荷済（超過）";
    SFN0505Constants.STATUS_4 = "出荷済（不足）";
    return SFN0505Constants;
}());
exports.SFN0505Constants = SFN0505Constants;
//# sourceMappingURL=SFN0505.constants.js.map