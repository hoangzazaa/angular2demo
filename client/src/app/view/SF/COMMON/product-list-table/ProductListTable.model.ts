import {ProductListTableData} from "./ProductListTable.data";
import {PLTProduct} from "./model/PLTProduct.model";
export abstract class ProductListTableModel {

    public static readonly PROVIDER = "ProductListTable";

    data: ProductListTableData;

    constructor() {
        this.data = new ProductListTableData();
    }

    getDataList(): PLTProduct[] {
        return this.data.originDataList.slice(0, 10);
    }

    getFullData(): PLTProduct[] {
        return this.data.originDataList;
    }

    navigateToProduct(record: PLTProduct) {

    }

    onCheck(row: number, checked: boolean) {
        if (checked) {
            for (let pltProduct of this.data.dataList) {
                if (pltProduct.plt_selected != undefined) {
                    pltProduct.plt_selected = false;
                }
            }
            this.data.dataList[row].plt_selected = true;
        } else {
            this.data.dataList[row].plt_selected = false;
        }
    }
}
