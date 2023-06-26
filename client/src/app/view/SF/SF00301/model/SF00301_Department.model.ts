import {BaseModel} from "../../../../model/core/BaseModel.model";
import {SF00301_User} from "./SF00301_User.model";

export class SF00301_Department extends BaseModel {
    public departmentName: string;

    public departmentCode: string;

    public users: SF00301_User[];

    public hasUser(user: SF00301_User) {
        if (!user || !user.id)
            return false;
        return (this.users || []).findIndex(usr => usr.id === user.id) >= 0;
    }

    public setDepartment(data: any) {
        if (!data)
            return;

        this.setData(data);

        this.departmentName = data["departmentName"];
        this.departmentCode = data["departmentCode"];
        this.users = (data["users"] || []).map(item => {
            let user = new SF00301_User();
            user.setUser(item);
            user.department = this;
            return user;
        });

    }
}
