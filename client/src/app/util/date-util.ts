/**
 * Class include utilities to work with datetime
 * @author haipt
 */
export class DateUtil {

    /**
     * get financial year of given date
     *
     * @param date
     */
    static getFinancialYear(date: Date): number {
        // check undefined
        if (date == undefined) {
            return undefined;
        }

        let month = date.getMonth();
        let year = date.getFullYear();
        // if month < April then down year by 1
        if (month < 3) {
            year = year - 1
        }
        // return financial year
        return year;
    }

    static getDate(dateStr: string): Date {
        if (dateStr == undefined) {
            return undefined;
        } else {
            let date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                return undefined;
            } else {
                return date;
            }
        }
    }

    static getTime(date: Date): number {
        if (date == undefined || date == null) {
            return 0;
        } else {
            return date.getTime();
        }
    }

    static formatDate(date: Date, format: string): string {
        let mm = moment(date);
        if (mm.isValid()) {
            return mm.format(format);
        } else {
            return "";
        }
    }

    static getStartOfMonth(date: Date): Date {
        let mm = moment(date);
        return mm.startOf("month").toDate();
    }

    // 当月から見て1年前の月を返す
    static getStartOfOneYearAgo(date: Date): Date {
        let month = date.getMonth();
        let year = date.getFullYear() - 1;
        return new Date(year, month, 1);
    }

    static getEndOfMonth(date: Date): Date {
        let mm = moment(date);
        return mm.endOf("month").startOf("day").toDate();
    }

    static toLocalTime(date: Date): Date {
        let mm = moment(date);
        return moment(mm).utc().add(mm.utcOffset(), 'm').toDate();
    }

    static dayDiff(fromDate: Date, toDate: Date): number {
        let fromM = moment(fromDate);
        let toM = moment(toDate);
        let diff = fromM.diff(toM, 'days');
        return diff;
    }
}

/**
 * 日時を比較する
 *
 * @param date 比較対象
 * @param criteria 基準日時
 * @return true: date が criteria 以前 (date &lt;= criteria), false: date が criteria より後 (date &gt; criteria), null: どちらかが null
 */
export function isBeforeOrEqualDate(date: Date|null, criteria: Date|null): boolean|null {
    if (date == null || criteria == null) {
        return null;
    } else {
        return date.getTime() <= criteria.getTime();
    }
}

/**
 * 日時を比較する
 *
 * @param date 比較対象
 * @param criteria 基準日時
 * @return true: date が criteria 以降 (date &gt;= criteria), false: date が criteria より前 (date &lt; criteria), null: どちらかが null
 */
export function isAfterOrEqualDate(date: Date|null, criteria: Date|null): boolean|null {
    if (date == null || criteria == null) {
        return null;
    } else {
        return date.getTime() >= criteria.getTime();
    }
}

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
export function nthMonth(value: Date|null, nth: number): Date|null {
    return value ? new Date(value.getFullYear(), value.getMonth() + nth, 1) : null;
}

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
export function diffMonth(from: Date|null, to: Date|null): number|null {
    if (from && to) {
        return (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
    } else {
        return null;
    }
}
