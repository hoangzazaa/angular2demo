import {RevenueListTableData} from "./RevenueListTable.data";
import {RLTRevenue} from "./model/RLTRevenue.model";
export abstract class RevenueListTableModel {

    public static readonly PROVIDER = "RevenueListTable";

    data: RevenueListTableData;

    constructor() {
        this.data = new RevenueListTableData();
    }

    getDataList(): RLTRevenue[] {
        return this.data.originDataList.slice(0, 10);
    }

    getFullData(): RLTRevenue[] {
        return this.data.originDataList;
    }

    navigateToDeal(record: RLTRevenue) {
    }

    navigateToProduct(record: RLTRevenue) {
    }

    onCheck(row: number, checked: boolean) {
        if (checked) {
            for (let rlbRevenue of this.data.dataList) {
                if (rlbRevenue.rlt_selected != undefined) {
                    rlbRevenue.rlt_selected = false;
                }
            }
            this.data.dataList[row].rlt_selected = true;
        } else {
            this.data.dataList[row].rlt_selected = false;
        }
    }
}
