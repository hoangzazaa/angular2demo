/**
 * Created by hoangtd on 2/14/2017.
 */
export class CustomerDataItem {
    month: number;
    productType: number;
    totalMoney: number;
    numberOfOrder: number;

    public setCustomerDataItem(data: any) {
        this.month = data["month"];
        this.productType = data["productType"];
        this.totalMoney = data["totalMoney"];
        this.numberOfOrder = data["numberOfOrder"];
    }

}
