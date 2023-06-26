"use strict";
var SF00502_datarepo_1 = require("./SF00502.datarepo");
var SF00502Data = (function () {
    function SF00502Data() {
        this.dataRepo = new SF00502_datarepo_1.SF00502DataRepo();
        this.departments = [];
        this.customers = [];
        this.staffs = [];
        this.customerNotes = [];
    }
    Object.defineProperty(SF00502Data.prototype, "maxAchievmentDate", {
        //endregion
        /**
         * 表示可能な実績モードの日付最大値 (この値を含む)
         *
         * <p>currentTime 前月の最終日の 23:59:59.999 が返される
         *
         * @return 表示可能な実績モードの日付最大値 (この値を含む)  (null: currentTime が null)
         */
        get: function () {
            var now = this.currentTime;
            return now ? new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, -1) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00502Data.prototype, "selectedMonth", {
        /** 表示開始月 (from) */
        get: function () {
            return this.selectedMonthTerm ? this.selectedMonthTerm.date : null;
        },
        /** 表示開始月 (from) */
        set: function (value) {
            this.selectedMonthTerm = {
                date: value,
                term: this.selectedTerm
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00502Data.prototype, "selectedTerm", {
        /** 期間 (実績を表示している場合のみ有効)  単位: 月 */
        get: function () {
            return this.selectedMonthTerm ? this.selectedMonthTerm.term : 1;
        },
        /** 期間 (実績を表示している場合のみ有効)  単位: 月 */
        set: function (value) {
            this.selectedMonthTerm = {
                date: this.selectedMonth,
                term: this.selectedTerm
            };
        },
        enumerable: true,
        configurable: true
    });
    return SF00502Data;
}());
exports.SF00502Data = SF00502Data;
//# sourceMappingURL=SF00502.data.js.map