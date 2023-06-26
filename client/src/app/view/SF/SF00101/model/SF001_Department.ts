import {UserModel} from "./SF001_User";
import {BaseModel} from "../../../../model/core/BaseModel.model";
/**
 * Created by ASUS on 6/5/2017.
 */
export class DepartmentModel extends BaseModel {

    public id: number;

    /* department */
    public department: string;

    /* departmentCode */
    public departmentCode: string;

    /* type */
    public type: number;

    /* departmentRsUser */
    public users: UserModel[];

}