import {RevenueModel} from "./Revenue.model";
/**
 * Prediction model for SF00502
 */
export class NoteModel {

    /** db id*/
    id: number;
    /** 得意先 */
    customerId: number;
    /** year */
    year: number;
    /** month */
    month: number;
    /** prediction */
    prediction: RevenueModel
    /** new revenue */
    newRevenue: RevenueModel;
    /** old revenue */
    oldRevenue: RevenueModel;
    /** 前年同月比 */
    diffRate: number;
    /** コメント */
    comment: string;
    /** head prediction */
    head: number;
    /** is wait delte */
    delete: boolean;

    // calculate 前年同月比
    calculatePredictionDiffRate() {
        this.diffRate = 100 * (+this.prediction.total) / (+this.oldRevenue.total);
    }

    calculateRevenueDiffRate() {
        this.diffRate = 100 * (+this.newRevenue.total) / (+this.oldRevenue.total);
    }

    // auto fill prediction
    autoPrediction() {
        this.prediction = new RevenueModel();
        // default prediction is old revenue
        this.prediction.amount1 = this.oldRevenue.amount1;
        this.prediction.amount2 = this.oldRevenue.amount2;
        this.prediction.amount3 = this.oldRevenue.amount3;
        this.prediction.calculateTotal();
    }

    /**
     * 別の実績データを加算する (破壊的メソッド)
     *
     * @param peer 別の NoteModel
     */
    addRevenue(peer: NoteModel): void {
        if (peer) {
            if (!this.newRevenue) {
                this.newRevenue = new RevenueModel();
            }
            if (!this.oldRevenue) {
                this.oldRevenue = new RevenueModel();
            }
            this.newRevenue.add(peer.newRevenue);
            this.oldRevenue.add(peer.oldRevenue);
            this.calculateRevenueDiffRate();
        }
    }
}
