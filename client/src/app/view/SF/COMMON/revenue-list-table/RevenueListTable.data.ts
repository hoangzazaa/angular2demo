import {RLTRevenue} from "./model/RLTRevenue.model";
export class RevenueListTableData {

    constructor() {
        this.originDataList = [];
        this.dataList = [];
        this.isSupplier = false;
    }

    //region Background data

    originDataList: RLTRevenue[];
    isSupplier: boolean;

    //endregion

    //region Screen data

    dataList: RLTRevenue[];

    // sort vars
    sortCol: number;
    sortOrder: boolean;

    //endregion
}