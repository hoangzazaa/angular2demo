/**
 * Summary model for SF00501
 */
export class SummaryModel {

    /* new 段ボール */
    newAmount1: number;
    /* new 紙器 */
    newAmount2: number;
    /* new 商事 */
    newAmount3: number;
    /* new 合計 */
    newTotal: number;
    /* old 段ボール */
    oldAmount1: number;
    /* old 紙器 */
    oldAmount2: number;
    /* old 商事 */
    oldAmount3: number;
    /* old 合計 */
    oldTotal: number;
    /* 前年比 */
    diffRate: number;

    constructor() {
        this.newAmount1 = 0;
        this.newAmount2 = 0;
        this.newAmount3 = 0;
        this.oldAmount1 = 0;
        this.oldAmount2 = 0;
        this.oldAmount3 = 0;
    }

    // calculate total and rate
    calculateSummary() {
        this.newTotal = this.newAmount1 + this.newAmount2 + this.newAmount3;
        this.oldTotal = this.oldAmount1 + this.oldAmount2 + this.oldAmount3;
        this.diffRate = 100 * this.newTotal / this.oldTotal;
    }
}