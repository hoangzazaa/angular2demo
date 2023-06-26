import {SF00501Helper} from "../SF00501.helper";
/**
 * Detail model for SF00501
 */
export class DetailModel {

    /* amount type */
    amountType: number;
    /* product type */
    productType: number;
    /* support id */
    id: number;
    /* name */
    name: string;
    /* amounts */
    amounts: { [date: number]: number};
    amountsTmp: { [date: number]: number};
    /* total amount */
    totalAmount: number;

    constructor() {
        this.amounts = {};
        this.amountsTmp = {};
    }

    calculateTotal() {
        let totalAmount = 0;
        for (var date in this.amounts) {
            totalAmount += (+this.amounts[date] | 0);
        }

        this.totalAmount = totalAmount;
    }

    calculateTotal3427() {
        let totalAmount = 0;
        for (var date in this.amountsTmp) {
            if (this.amountsTmp[date] != undefined) totalAmount += Number(this.amountsTmp[date]);
        }

        this.totalAmount = SF00501Helper.convertYenToThousanYen(totalAmount);
    }

    roundAmounts(){
        for (var date in this.amounts) {
            this.amounts[date] = SF00501Helper.convertYenToThousanYen(this.amounts[date]);
        }
    }
}