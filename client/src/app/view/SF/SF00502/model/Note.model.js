"use strict";
var Revenue_model_1 = require("./Revenue.model");
/**
 * Prediction model for SF00502
 */
var NoteModel = (function () {
    function NoteModel() {
    }
    // calculate 前年同月比
    NoteModel.prototype.calculatePredictionDiffRate = function () {
        this.diffRate = 100 * (+this.prediction.total) / (+this.oldRevenue.total);
    };
    NoteModel.prototype.calculateRevenueDiffRate = function () {
        this.diffRate = 100 * (+this.newRevenue.total) / (+this.oldRevenue.total);
    };
    // auto fill prediction
    NoteModel.prototype.autoPrediction = function () {
        this.prediction = new Revenue_model_1.RevenueModel();
        // default prediction is old revenue
        this.prediction.amount1 = this.oldRevenue.amount1;
        this.prediction.amount2 = this.oldRevenue.amount2;
        this.prediction.amount3 = this.oldRevenue.amount3;
        this.prediction.calculateTotal();
    };
    /**
     * 別の実績データを加算する (破壊的メソッド)
     *
     * @param peer 別の NoteModel
     */
    NoteModel.prototype.addRevenue = function (peer) {
        if (peer) {
            if (!this.newRevenue) {
                this.newRevenue = new Revenue_model_1.RevenueModel();
            }
            if (!this.oldRevenue) {
                this.oldRevenue = new Revenue_model_1.RevenueModel();
            }
            this.newRevenue.add(peer.newRevenue);
            this.oldRevenue.add(peer.oldRevenue);
            this.calculateRevenueDiffRate();
        }
    };
    return NoteModel;
}());
exports.NoteModel = NoteModel;
//# sourceMappingURL=Note.model.js.map