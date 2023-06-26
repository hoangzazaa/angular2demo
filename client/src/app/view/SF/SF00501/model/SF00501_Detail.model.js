"use strict";
var SF00501_helper_1 = require("../SF00501.helper");
/**
 * Detail model for SF00501
 */
var DetailModel = (function () {
    function DetailModel() {
        this.amounts = {};
        this.amountsTmp = {};
    }
    DetailModel.prototype.calculateTotal = function () {
        var totalAmount = 0;
        for (var date in this.amounts) {
            totalAmount += (+this.amounts[date] | 0);
        }
        this.totalAmount = totalAmount;
    };
    DetailModel.prototype.calculateTotal3427 = function () {
        var totalAmount = 0;
        for (var date in this.amountsTmp) {
            if (this.amountsTmp[date] != undefined)
                totalAmount += Number(this.amountsTmp[date]);
        }
        this.totalAmount = SF00501_helper_1.SF00501Helper.convertYenToThousanYen(totalAmount);
    };
    DetailModel.prototype.roundAmounts = function () {
        for (var date in this.amounts) {
            this.amounts[date] = SF00501_helper_1.SF00501Helper.convertYenToThousanYen(this.amounts[date]);
        }
    };
    return DetailModel;
}());
exports.DetailModel = DetailModel;
//# sourceMappingURL=SF00501_Detail.model.js.map