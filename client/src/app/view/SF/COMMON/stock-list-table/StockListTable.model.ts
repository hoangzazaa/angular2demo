import {StockListTableData} from "./StockListTable.data";
import {SLTStock} from "./model/SLTStock.model";
export abstract class StockListTableModel {

    public static readonly PROVIDER = "StockListTable";

    data: StockListTableData;

    constructor() {
        this.data = new StockListTableData();
    }

    getDataList(): SLTStock[] {
        return this.data.originDataList.slice(0, 10);
    }

    getFullData(): SLTStock[] {
        return this.data.originDataList;
    }

    navigateToDeal(record: SLTStock) {

    }

    navigateToProduct(record: SLTStock) {

    }

    onCheck(row: number, checked: boolean) {
        if (checked) {
            for (let sltStock of this.data.dataList) {
                if (sltStock.slt_selected != undefined) {
                    sltStock.slt_selected = false;
                }
            }
            this.data.dataList[row].slt_selected = true;
        } else {
            this.data.dataList[row].slt_selected = false;
        }
    }
}
