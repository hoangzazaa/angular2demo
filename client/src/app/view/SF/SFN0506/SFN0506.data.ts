import {SFN0506DataRepo} from "./SFN0506.datarepo";
import {FilterModel} from "./model/SFN0506_Filter.model";
import {DepartmentModel} from "../SF00501/model/SF00501_Department.model";
import {UserModel} from "./model/SFN0506_User.model";
import {PaymentModel} from "./model/SFN0506_Payment.model";

export class SFN0506Data {

    constructor() {
        this.dataRepo = new SFN0506DataRepo();

        this.currentFilter = new FilterModel();
        this.departments = [];
        this.users = [];
        this.paymentList = [];

        this.hits = 0;
    }

    //region Background data

    // current time
    currentTime: Date;
    // data map
    dataRepo: SFN0506DataRepo;

    //endregion

    //region Screen data

    // current filter
    currentFilter: FilterModel;
    // department list
    departments: Array<DepartmentModel>;
    // user list
    users: Array<UserModel>;
    // shippingList
    paymentList: Array<PaymentModel>;
    hits: number;
    page: number;

    //endregion
}