import {StaffModel} from "./model/Staff.model";
import {DepartmentModel} from "./model/Department.model";
/**
 * Defined the constants key use in the application.
 * @author manhnv
 */
export class SF00502Constants {

    // screen mode
    public static readonly SCREEN_MODE_ACHIEVEMENT: number = 1;
    public static readonly SCREEN_MODE_PREDICTION: number = 2;

    // table type
    public static readonly TABLE_TYPE_INCREASE: number = 1;
    public static readonly TABLE_TYPE_DECREASE: number = 2;

    // data repo map
    public static readonly MAP_DEPARTMENT: string = "dept";
    public static readonly MAP_SUMMARY: string = "summary";
    public static readonly MAP_CUSTOMER_INCREASE: string = "cus_inc";
    public static readonly MAP_CUSTOMER_DECREASE: string = "cus_dec";
    public static readonly MAP_STAFF_CUSTOMER: string = "staff_cus";
    public static readonly MAP_CUSTOMER: string = "customer";
    public static readonly MAP_CUSTOMER_NOTE: string = "cus_note";

    // static option
    public static readonly OPTION_ALL_COMPANY: DepartmentModel = {id: 0, name: "全社"};
    public static readonly OPTION_ALL_STAFF: StaffModel = {id: 0, name: "指定なし", departmentId: undefined};

    // list limit
    public static readonly LIMIT_LIST: number = 10;

    // note type
    public static readonly HEAD_NOTE: number = 1;
}