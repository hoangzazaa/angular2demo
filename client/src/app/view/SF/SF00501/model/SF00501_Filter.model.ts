import {DepartmentModel} from "./SF00501_Department.model";
import {StaffModel} from "./SF00501_Staff.model";
import {DateModel} from "./SF00501_Date.model";
/**
 * Filter model for SF00501
 */
export class FilterModel {

    // selected month
    department: DepartmentModel;
    // selected staff
    staff: StaffModel;
    // selected date unit
    dateUnit: number;
    // selected date by index
    date: DateModel;
    // selected customer type
    customerType: number;
    // selected summary type
    sumaryType: number;
}