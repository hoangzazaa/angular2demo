import DataUtil from "../../../util/data-util";
import {SFN0504Constants} from "./SFN0504.constants";
import {UserModel} from "./model/SFN0504_User.model";

export class SFN0504DataRepo {

    // data map
    private dataRepo: any = {};

    //region user: departmentid - user[]
    getUsers(departmentId: number): UserModel[] {
        return DataUtil.getData(this.dataRepo, [], SFN0504Constants.MAP_DEPARTMENT, departmentId);
    }

    addUser(user: UserModel, departmentId: number): void {
        let users = DataUtil.getData(this.dataRepo, undefined, SFN0504Constants.MAP_DEPARTMENT, departmentId);
        if (users == undefined) {
            users = [];
            DataUtil.pushData(this.dataRepo, users, departmentId, SFN0504Constants.MAP_DEPARTMENT);
        }
        users.push(user);
    }

    //endregion
}