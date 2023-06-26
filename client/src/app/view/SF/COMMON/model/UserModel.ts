import {BaseModel} from "../../../../model/core/BaseModel.model";
/**
 * Created by ASUS on 6/5/2017.
 */
export class UserModel extends BaseModel {
    /* username */
    public username: string;

    /* enableFlag */
    public enableFlag: number;

    /* role */
    public role: string;

    /* email */
    public email: string;

    /* departmentId */
    public departmentId: number;

    /* departmentCode */
    public departmentCode: string;

    /* deleteFlag */
    public deleteFlag: number;

    /* userCode */
    public userCode: string;

    public setUser(data: any) {
        if (!!data) {
            this.setData(data);

            this.username = data["username"];
            this.enableFlag = data["enableFlag"];
            this.role = data["role"];
            this.email = data["email"];
            this.departmentId = data["departmentId"];
            this.departmentCode = data["departmentCode"];
            this.deleteFlag = data["deleteFlag"];
            this.userCode = data["userCode"];
        }
    }
}