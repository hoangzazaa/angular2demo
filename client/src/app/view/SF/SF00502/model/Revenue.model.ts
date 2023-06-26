/**
 * Revenue model for SF00502
 */
export class RevenueModel {

    /** 段ボール */
    amount1: number;
    /** 紙器 */
    amount2: number;
    /** 商事 */
    amount3: number;
    /** 合計 */
    total: number;

    constructor() {
        this.amount1 = 0;
        this.amount2 = 0;
        this.amount3 = 0;
        this.total = 0;
    }

    // calculate new 合計
    calculateTotal() {
        this.total = +this.amount1 + this.amount2 + this.amount3;
    }

    /**
     * 実績データを加算する (破壊的メソッド)
     *
     * @param peer 実績データ
     */
    add(peer: RevenueModel): void {
        if (peer) {
            this.amount1 += peer.amount1;
            this.amount2 += peer.amount2;
            this.amount3 += peer.amount3;
            this.total += peer.total;
        }
    }

}