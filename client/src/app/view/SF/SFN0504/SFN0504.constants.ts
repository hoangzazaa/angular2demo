import {DepartmentModel} from "./model/SFN0504_Department.model";
import {UserModel} from "./model/SFN0504_User.model";
export class SFN0504Constants {

    // data repo map
    public static readonly MAP_DEPARTMENT: string = "dept";

    // static option
    public static readonly OPTION_ALL_COMPANY: DepartmentModel = {id: 0, name: "全社"};
    public static readonly OPTION_ALL_USER: UserModel = {id: 0, name: "指定なし", departmentId: undefined};

    // time format
    public static readonly DATE_DISPLAY = "YYYY/MM/DD";
}