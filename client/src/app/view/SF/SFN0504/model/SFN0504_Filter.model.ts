import {DepartmentModel} from "./SFN0504_Department.model";
import {UserModel} from "./SFN0504_User.model";
/**
 * Filter model for SF00501
 */
export class FilterModel {

    // department
    department: DepartmentModel;
    // user
    user: UserModel;
    // storage days
    stockDays: number;
    // storage type
    stockType: number;
}