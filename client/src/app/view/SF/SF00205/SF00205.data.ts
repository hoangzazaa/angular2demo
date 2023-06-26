import {Constants} from "../../../helper/constants";
import {SF00205Deal} from "./model/SF00205_Deal.model";
import {SF00205Department} from "./model/SF00205_Department.model";
import {SF00205Request} from "./model/SF00205_Request.model";
import {SF00205User} from "./model/SF00205_User.model";
/**
 * Created by manhnv on 6/14/2017.
 */

export class SF00205Data {
    // used to enable|disable button when processing
    isDisable: boolean = false;

    // total records when search|load page
    totalRecords: number = Constants.ZERO;

    // records per page to paginator
    pageSize: number = Constants.PAGE_SIZE;

    // request model per request to server
    requestModel: SF00205Request = new SF00205Request();

    // deal list
    deals: SF00205Deal[] = [];

    // department list
    departments: SF00205Department[] = [];

    // person-in-charge list
    pics: SF00205User[] = [];

    // variable to keep default value of department id & pic id
    defaultDepartmentId: number;
    defaultPicId: number;

}