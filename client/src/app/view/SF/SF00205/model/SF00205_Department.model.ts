import {BaseModel} from "../../../../model/core/BaseModel.model";
import {SF00205User} from "./SF00205_User.model";

/**
 * Created by manhnv on 6/14/2017.
 */
export class SF00205Department extends BaseModel {
    department: string;
    departmentCode: string;
    type: number;
    users: SF00205User[] = [];
}
