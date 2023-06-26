import {MailModel} from "../../../model/common/Mail.model";
import {UserModel} from "../COMMON/model/UserModel";
import {DepartmentModel} from "../COMMON/model/DepartmentModel";
/**
 * Created by ASUS on 5/8/2017.
 */
export class SF00310Helper {
    /*method static calculator and cloneObject*/
    static cloneMailModel(email: MailModel) {
        let mail       = new MailModel();
        mail.addressTo = email.addressTo.map(item => item);
        mail.addressCc = email.addressCc.map(item => item);
        mail.content   = email.content;
        mail.subject   = email.subject;

        return mail;
    }
    static indexItem(users: UserModel[], user: UserModel): number {
        let index = null;
        if (users) {
            index = users.findIndex(item => {
                return item.id == user.id;
            })
        }

        return index;
    }

    static cloneDepartmentModel(departments: DepartmentModel[]): DepartmentModel[] {
        let departmentNews = [];
        if (!!departments) {
            departments.forEach(department => {
                let departmentModel = new DepartmentModel();

                departmentModel.id         = department.id;
                departmentModel.department = department.department;
                departmentModel.mailGroupFlag = department.mailGroupFlag;
                // clone users
                if (department.users) {
                    departmentModel.users = SF00310Helper.cloneUserModel(department.users);
                }

                departmentNews.push(departmentModel)
            })
        }

        return departmentNews;
    }

    static cloneUserModel(userModels: UserModel[]): UserModel[] {
        let userNews = [];
        if (!!userModels) {
            userModels.forEach(user => {
                let userModel = new UserModel();

                userModel.id           = user.id;
                userModel.username     = user.username;
                userModel.departmentId = user.departmentId;
                userModel.email        = user.email;

                userNews.push(userModel)
            })
        }

        return userNews;
    }

}