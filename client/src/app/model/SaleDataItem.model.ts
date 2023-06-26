/**
 * Created by hoangtd on 2/14/2017.
 */
export class SaleDataItem {
    month: number;
    productType: number;
    totalMoney: number;

    public setSaleDataItem(data: any) {
        this.month = data["month"];
        this.productType = data["productType"];
        this.totalMoney = data["totalMoney"];
    }
}