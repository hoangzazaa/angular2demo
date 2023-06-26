import {SaleDataItem} from "./SaleDataItem.model";
/**
 * Created by hoangtd on 2/14/2017.
 */
export class SaleData {
    year: number;
    saleDataItems: SaleDataItem[] = [];

    public setSaleData(data: any) {
        this.year = data["year"];

        if (data["saleDataItems"] !== undefined) {
            this.saleDataItems = [];
            for (var i = 0; i < data["saleDataItems"].length; i++) {
                let tmp = new SaleDataItem();
                tmp.setSaleDataItem(data["saleDataItems"][i]);

                this.saleDataItems.push(tmp);
            }
        }
    }

}
