import {Constants} from "../../../helper/constants";
import Messages, {MSG} from "../../../helper/message";
import {MailModel} from "../../../model/common/Mail.model";
import {DealInfoModel} from "../COMMON/dealinfo/model/DealModel";
import {DepartmentModel} from "../COMMON/model/DepartmentModel";
import {UserModel} from "../COMMON/model/UserModel";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {FormatUtil} from "../../../util/format-util";

export class SF00306Helper {

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
                    departmentModel.users = SF00306Helper.cloneUserModel(department.users);
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

    static updateMailContent(dealInfo: DealInfoModel = new DealInfoModel(), products: ProductInfoModel[] = []) {
        let newContent = "";
        for (let i = 0; i < products.length; i++) {
            let product = products[i];
            let numberColor = FormatUtil.formatColorsViaPrintMethod(product);
            newContent += "\n(" + (i + 1) + ")\n" + "製品：" + product.productName
                + "\n使用色数：" + (numberColor != "印刷なし"? numberColor : "なし")
                + "\nロット数：" + (product.requestLot != undefined ? product.requestLot : "")
                + "\n品目C：XXXXXXX （" + product.productCode + "の製品番号）\n";
        }

        let location = window.location.origin + "/home/deal/" + dealInfo.dealCode;
        return Messages.get(MSG.SF00306.BODY_MAIL_CONTENT, dealInfo.saleName, dealInfo.dealCode, dealInfo.dealName,
                            dealInfo.customerCode, dealInfo.customerName, newContent,
                            moment(dealInfo.deliveryDate).format(Constants.DEFAULT_DATE_FORMAT), location);
    }

}
