import {BaseModel} from "../../../../model/core/BaseModel.model";
import {SF00301_Department} from "./SF00301_Department.model";

export class SF00301_User extends BaseModel {

    public username: string;

    public userCode: string;

    public role: string;

    public department: SF00301_Department;

    public get isStaff(): boolean {
        return this.role === "2";
    }

    public setUser(data: any) {
        if (!data)
            return;
        this.setData(data);
        this.username = data["username"];
        this.userCode = data["userCode"];
        this.role = data["role"];

        if (data["department"]) {
            this.department = new SF00301_Department();
            this.department.setDepartment(data["department"]);
        }
    }
}
