import {SFN0505DataRepo} from "./SFN0505.datarepo";
import {FilterModel} from "./model/SFN0505_Filter.model";
import {ShippingModel} from "./model/SFN0505_Shipping.model";
import {DepartmentModel} from "../SF00501/model/SF00501_Department.model";
import {UserModel} from "./model/SFN0505_User.model";

export class SFN0505Data {

    constructor() {
        this.dataRepo = new SFN0505DataRepo();

        this.currentFilter = new FilterModel();
        this.departments = [];
        this.users = [];
        this.shippingList = [];

        this.hits = 0;
    }

    //region Background data

    // current time
    currentTime: Date;
    // data map
    dataRepo: SFN0505DataRepo;

    //endregion

    //region Screen data

    // current filter
    currentFilter: FilterModel;
    // department list
    departments: Array<DepartmentModel>;
    // user list
    users: Array<UserModel>;
    // shippingList
    shippingList: Array<ShippingModel>;
    hits: number;
    page: number;

    //endregion
}