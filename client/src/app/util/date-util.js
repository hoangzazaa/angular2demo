"use strict";
/**
 * Class include utilities to work with datetime
 * @author haipt
 */
var DateUtil = (function () {
    function DateUtil() {
    }
    /**
     * get financial year of given date
     *
     * @param date
     */
    DateUtil.getFinancialYear = function (date) {
        // check undefined
        if (date == undefined) {
            return undefined;
        }
        var month = date.getMonth();
        var year = date.getFullYear();
        // if month < April then down year by 1
        if (month < 3) {
            year = year - 1;
        }
        // return financial year
        return year;
    };
    DateUtil.getDate = function (dateStr) {
        if (dateStr == undefined) {
            return undefined;
        }
        else {
            var date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                return undefined;
            }
            else {
                return date;
            }
        }
    };
    DateUtil.getTime = function (date) {
        if (date == undefined || date == null) {
            return 0;
        }
        else {
            return date.getTime();
        }
    };
    DateUtil.formatDate = function (date, format) {
        var mm = moment(date);
        if (mm.isValid()) {
            return mm.format(format);
        }
        else {
            return "";
        }
    };
    DateUtil.getStartOfMonth = function (date) {
        var mm = moment(date);
        return mm.startOf("month").toDate();
    };
    // 当月から見て1年前の月を返す
    DateUtil.getStartOfOneYearAgo = function (date) {
        var month = date.getMonth();
        var year = date.getFullYear() - 1;
        return new Date(year, month, 1);
    };
    DateUtil.getEndOfMonth = function (date) {
        var mm = moment(date);
        return mm.endOf("month").startOf("day").toDate();
    };
    DateUtil.toLocalTime = function (date) {
        var mm = moment(date);
        return moment(mm).utc().add(mm.utcOffset(), 'm').toDate();
    };
    DateUtil.dayDiff = function (fromDate, toDate) {
        var fromM = moment(fromDate);
        var toM = moment(toDate);
        var diff = fromM.diff(toM, 'days');
        return diff;
    };
    return DateUtil;
}());
exports.DateUtil = DateUtil;
/**
 * 日時を比較する
 *
 * @param date 比較対象
 * @param criteria 基準日時
 * @return true: date が criteria 以前 (date &lt;= criteria), false: date が criteria より後 (date &gt; criteria), null: どちらかが null
 */
function isBeforeOrEqualDate(date, criteria) {
    if (date == null || criteria == null) {
        return null;
    }
    else {
        return date.getTime() <= criteria.getTime();
    }
}
exports.isBeforeOrEqualDate = isBeforeOrEqualDate;
/**
 * 日時を比較する
 *
 * @param date 比較対象
 * @param criteria 基準日時
 * @return true: date が criteria 以降 (date &gt;= criteria), false: date が criteria より前 (date &lt; criteria), null: どちらかが null
 */
function isAfterOrEqualDate(date, criteria) {
    if (date == null || criteria == null) {
        return null;
    }
    else {
        return date.getTime() >= criteria.getTime();
    }
}
exports.isAfterOrEqualDate = isAfterOrEqualDate;
/**
 * n ヶ月後の日付を返す
 *
 * <p>パラメーターの日以下の要素は無視される。
 * <p>返される値の 日は 1 、時刻は 00:00:00 に固定される
 *
 * @param value 日付
 * @param nth n ヶ月後
 * @return n ヶ月後の日付 (null: value が null)
 */
function nthMonth(value, nth) {
    return value ? new Date(value.getFullYear(), value.getMonth() + nth, 1) : null;
}
exports.nthMonth = nthMonth;
/**
 * 月数を計算する
 *
 * <p>パラメーターの日以下の要素は無視される。
 * <p>from = to の場合、 0 が返される
 * <p>from が to より前の場合、
 *
 * @param from 開始月(含む)
 * @param to 終了月(含む)
 * @returns 月数 (null: from and/or to が null)
 */
function diffMonth(from, to) {
    if (from && to) {
        return (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
    }
    else {
        return null;
    }
}
exports.diffMonth = diffMonth;
//# sourceMappingURL=date-util.js.map