import {DepartmentModel} from "./model/SFN0505_Department.model";
import {UserModel} from "./model/SFN0505_User.model";
export class SFN0505Constants {

    // data repo map
    public static readonly MAP_DEPARTMENT: string = "dept";

    // static option
    public static readonly OPTION_ALL_COMPANY: DepartmentModel = {id: 0, name: "全社"};
    public static readonly OPTION_ALL_USER: UserModel = {id: 0, name: "指定なし", departmentId: undefined};

    // time format
    public static readonly DATE_DISPLAY = "YYYY/M/D";

    // status string
    public static readonly STATUS_1 = "出荷待ち";
    public static readonly STATUS_2 = "出荷済";
    public static readonly STATUS_3 = "出荷済（超過）";
    public static readonly STATUS_4 = "出荷済（不足）";

}