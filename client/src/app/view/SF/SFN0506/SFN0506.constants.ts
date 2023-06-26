import {DepartmentModel} from "./model/SFN0506_Department.model";
import {UserModel} from "./model/SFN0506_User.model";
import {CommonHelper} from "../../../helper/common-helper";
export class SFN0506Constants {

    // data repo map
    public static readonly MAP_DEPARTMENT: string = "dept";

    // static option
    public static readonly OPTION_ALL_COMPANY: DepartmentModel = {id: 0, name: "全社"};
    public static readonly OPTION_ALL_USER: UserModel = {id: 0, name: "指定なし", departmentId: undefined};

    // time format
    public static readonly DATE_DISPLAY = "YYYY/MM/DD";

    // payment method
    public static readonly PAYMENT_METHODS = {
        0: "すべて",
        1: "現金",
        2: "手形",
        3: "小切手",
        4: "当座振込",
        5: "普通振込"
    }
    public static readonly PAYMENT_METHOD_OPTIONS = CommonHelper.getList([0, 1, 2, 3, 4, 5], SFN0506Constants.PAYMENT_METHODS);
}