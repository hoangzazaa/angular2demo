import {DepartmentModel} from "./SFN0505_Department.model";
import {UserModel} from "./SFN0505_User.model";
/**
 * Filter model for SF00501
 */
export class FilterModel {

    // selected month
    department: DepartmentModel;
    // selected user
    user: UserModel;
    // selected start date
    startDate: Date;
    // selected end date
    endDate: Date;
}