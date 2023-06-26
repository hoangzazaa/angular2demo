import {SFN0504DataRepo} from "./SFN0504.datarepo";
import {FilterModel} from "./model/SFN0504_Filter.model";
import {DepartmentModel} from "../SF00501/model/SF00501_Department.model";
import {UserModel} from "./model/SFN0504_User.model";
import {StockModel} from "./model/SFN0504_Stock.model";

export class SFN0504Data {

    constructor() {
        this.dataRepo = new SFN0504DataRepo();

        this.currentFilter = new FilterModel();
        this.departments = [];
        this.users = [];
        this.stockList = [];

        this.hits = 0;
    }

    //region Background data

    // data map
    dataRepo: SFN0504DataRepo;

    //endregion

    //region Screen data

    // current filter
    currentFilter: FilterModel;
    // department list
    departments: Array<DepartmentModel>;
    // user list
    users: Array<UserModel>;
    // shippingList
    stockList: Array<StockModel>;
    hits: number;
    page: number;

    //endregion
}