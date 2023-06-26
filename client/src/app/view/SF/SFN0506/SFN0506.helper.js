"use strict";
var date_util_1 = require("../../../util/date-util");
/**
 * Helper class for SFN0506
 * @author haipt
 */
var SFN0506Helper = (function () {
    function SFN0506Helper() {
    }
    SFN0506Helper.getPaymentStatus = function (payDate, dueDate, currentDate) {
        var status = "";
        if (payDate != undefined) {
            // 入金済
            var payDateStr = date_util_1.DateUtil.formatDate(payDate, "M/D");
            status = "入金済（" + payDateStr + "）";
        }
        else {
            if (date_util_1.DateUtil.getTime(dueDate) >= date_util_1.DateUtil.getTime(currentDate)) {
                // 入金待ち
                status = "入金待ち";
            }
            else {
                // 未入金
                var dayDiff = date_util_1.DateUtil.dayDiff(currentDate, dueDate);
                status = "未入金（" + dayDiff + "日経過）";
            }
        }
        return status;
    };
    return SFN0506Helper;
}());
exports.SFN0506Helper = SFN0506Helper;
//# sourceMappingURL=SFN0506.helper.js.map