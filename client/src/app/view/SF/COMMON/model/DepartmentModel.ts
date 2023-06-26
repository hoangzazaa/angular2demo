import {BaseModel} from "../../../../model/core/BaseModel.model";
import {UserModel} from "./UserModel";
/**
 * Created by ASUS on 6/5/2017.
 */
export class DepartmentModel extends BaseModel {
    /* department */
    public department: string;

    /* departmentCode */
    public departmentCode: string;

    /* type */
    public type: number;

    public mailGroupFlag: number;

    /* departmentRsUser */
    public users: UserModel[];

    public setDepartment(data: any) {
        if (!!data) {
            this.setData(data);

            this.department     = data["department"];
            this.departmentCode = data["departmentCode"];
            this.type           = data["type"];
            this.mailGroupFlag  = data["mailGroupFlag"];

            if (data["users"] !== undefined) {
                this.users = [];
                for (var i = 0; i < data["users"].length; i++) {
                    let tmp = new UserModel();
                    tmp.setUser(data["users"][i]);
                    this.users.push(tmp);
                }
            }
        }
    }

}