import {SLTStock} from "./model/SLTStock.model";
export class StockListTableData {

    constructor() {
        this.originDataList = [];
        this.dataList = [];
    }

    //region Background data

    originDataList: SLTStock[];

    //endregion

    //region Screen data

    dataList: SLTStock[];

    // sort vars
    sortCol: number;
    sortOrder: boolean;

    //endregion
}