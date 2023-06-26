import {PLTProduct} from "./model/PLTProduct.model";
export class ProductListTableData {

    constructor() {
        this.originDataList = [];
        this.dataList = [];
    }

    //region Background data

    originDataList: PLTProduct[];

    //endregion

    //region Screen data

    dataList: PLTProduct[];

    // sort vars
    sortCol: number;
    sortOrder: boolean;

    //endregion
}