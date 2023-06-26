"use strict";
var mst_data_type_1 = require("../../helper/mst-data-type");
var SpecifyTimeModalHelper = (function () {
    function SpecifyTimeModalHelper() {
    }
    /**
     * 時間指定を表示文字列に変換する
     *
     * @param timePattern 時間指定区分値
     * @param timeHour 時
     * @param timeMinute 分
     * @returns 表示文字列
     */
    SpecifyTimeModalHelper.getSpecifyTimeName = function (timePattern, timeHour, timeMinute) {
        var name = mst_data_type_1.SPECIFY_TIME[timePattern];
        if (name == undefined) {
            return "";
        }
        else {
            if (timePattern == 2 || timePattern == 3 || timePattern == 5) {
                if (timeHour == undefined && timeMinute == undefined) {
                    return "";
                }
                else {
                    if (timePattern == 2)
                        return (timeHour == undefined ? "0時" : timeHour + "時") + (timeMinute == undefined ? "00分に" : timeMinute + "分に");
                    if (timePattern == 3)
                        return (timeHour == undefined ? "0時" : timeHour + "時") + (timeMinute == undefined ? "00分迄" : timeMinute + "分迄");
                    if (timePattern == 5)
                        return (timeHour == undefined ? "0時" : timeHour + "時") + (timeMinute == undefined ? "00分以降" : timeMinute + "分以降");
                }
            }
            else
                return name;
        }
    };
    return SpecifyTimeModalHelper;
}());
exports.SpecifyTimeModalHelper = SpecifyTimeModalHelper;
//# sourceMappingURL=SpecifyTimeModal.helper.js.map