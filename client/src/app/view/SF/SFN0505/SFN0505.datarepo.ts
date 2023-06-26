import DataUtil from "../../../util/data-util";
import {SFN0505Constants} from "./SFN0505.constants";
import {UserModel} from "./model/SFN0505_User.model";

export class SFN0505DataRepo {

    // data map
    private dataRepo: any = {};

    //region user: departmentid - user[]
    getUsers(departmentId: number): UserModel[] {
        return DataUtil.getData(this.dataRepo, [], SFN0505Constants.MAP_DEPARTMENT, departmentId);
    }

    addUser(user: UserModel, departmentId: number): void {
        let users = DataUtil.getData(this.dataRepo, undefined, SFN0505Constants.MAP_DEPARTMENT, departmentId);
        if (users == undefined) {
            users = [];
            DataUtil.pushData(this.dataRepo, users, departmentId, SFN0505Constants.MAP_DEPARTMENT);
        }
        users.push(user);
    }

    //endregion
}