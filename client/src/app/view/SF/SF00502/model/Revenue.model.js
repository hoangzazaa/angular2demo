"use strict";
/**
 * Revenue model for SF00502
 */
var RevenueModel = (function () {
    function RevenueModel() {
        this.amount1 = 0;
        this.amount2 = 0;
        this.amount3 = 0;
        this.total = 0;
    }
    // calculate new 合計
    RevenueModel.prototype.calculateTotal = function () {
        this.total = +this.amount1 + this.amount2 + this.amount3;
    };
    /**
     * 実績データを加算する (破壊的メソッド)
     *
     * @param peer 実績データ
     */
    RevenueModel.prototype.add = function (peer) {
        if (peer) {
            this.amount1 += peer.amount1;
            this.amount2 += peer.amount2;
            this.amount3 += peer.amount3;
            this.total += peer.total;
        }
    };
    return RevenueModel;
}());
exports.RevenueModel = RevenueModel;
//# sourceMappingURL=Revenue.model.js.map