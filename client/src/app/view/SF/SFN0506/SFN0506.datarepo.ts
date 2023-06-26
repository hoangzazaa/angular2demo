import DataUtil from "../../../util/data-util";
import {SFN0506Constants} from "./SFN0506.constants";
import {UserModel} from "./model/SFN0506_User.model";

export class SFN0506DataRepo {

    // data map
    private dataRepo: any = {};

    //region user: departmentid - user[]
    getUsers(departmentId: number): UserModel[] {
        return DataUtil.getData(this.dataRepo, [], SFN0506Constants.MAP_DEPARTMENT, departmentId);
    }

    addUser(user: UserModel, departmentId: number): void {
        let users = DataUtil.getData(this.dataRepo, undefined, SFN0506Constants.MAP_DEPARTMENT, departmentId);
        if (users == undefined) {
            users = [];
            DataUtil.pushData(this.dataRepo, users, departmentId, SFN0506Constants.MAP_DEPARTMENT);
        }
        users.push(user);
    }

    //endregion
}