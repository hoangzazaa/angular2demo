"use strict";
/**
 * Summary model for SF00501
 */
var SummaryModel = (function () {
    function SummaryModel() {
        this.newAmount1 = 0;
        this.newAmount2 = 0;
        this.newAmount3 = 0;
        this.oldAmount1 = 0;
        this.oldAmount2 = 0;
        this.oldAmount3 = 0;
    }
    // calculate total and rate
    SummaryModel.prototype.calculateSummary = function () {
        this.newTotal = this.newAmount1 + this.newAmount2 + this.newAmount3;
        this.oldTotal = this.oldAmount1 + this.oldAmount2 + this.oldAmount3;
        this.diffRate = 100 * this.newTotal / this.oldTotal;
    };
    return SummaryModel;
}());
exports.SummaryModel = SummaryModel;
//# sourceMappingURL=SF00501_Summary.model.js.map