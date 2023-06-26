import {MailModel} from "../../../model/common/Mail.model";
// import {RequestModel} from "./model/request.model";
import {UserModel} from "../COMMON/model/UserModel";
import {DepartmentModel} from "../COMMON/model/DepartmentModel";
import {Constants} from "../../../helper/constants";
import {PRODUCT_INFO_MAIL_TEMPLATE} from "./SF00309.MstData";
import {ProductBoxModel} from "../COMMON/productinfo/model/ProductBox.model";
import {FormatUtil} from "../../../util/format-util";
import {DealInfoModel} from "../COMMON/dealinfo/model/DealModel";
/**
 * Created by ASUS on 5/8/2017.
 */
export class SF00309Helper {
    /*method static calculator and cloneObject*/

    static cloneMailModel(email: MailModel) {
        let mail       = new MailModel();
        mail.addressTo = email.addressTo.map(item => item);
        mail.addressCc = email.addressCc.map(item => item);
        mail.content   = email.content;
        mail.subject   = email.subject;

        return mail;
    }

    // static cloneRequestModel(newRequestModel: RequestModel) {
    //     let requestModel = new RequestModel();
    //
    //     requestModel.packagingClassification = newRequestModel.packagingClassification;
    //     requestModel.inclusion               = newRequestModel.inclusion;
    //     requestModel.inclusion_text          = newRequestModel.inclusion_text;
    //     requestModel.other                   = newRequestModel.other;
    //     requestModel.endUser                 = newRequestModel.endUser;
    //     requestModel.preservationMethod      = newRequestModel.preservationMethod;
    //     requestModel.distributionRange       = newRequestModel.distributionRange;
    //     requestModel.includedWeightPerUnit   = newRequestModel.includedWeightPerUnit;
    //     requestModel.includedCount           = newRequestModel.includedCount;
    //     requestModel.salesEstimate           = newRequestModel.salesEstimate;
    //     requestModel.contactState            = newRequestModel.contactState;
    //     requestModel.material                = newRequestModel.material;
    //     requestModel.fillingMethod           = newRequestModel.fillingMethod;
    //     requestModel.material_other          = newRequestModel.material_other;
    //     requestModel.simultaneousRequestFax  = newRequestModel.simultaneousRequestFax;
    //     requestModel.simultaneousRequestPDF  = newRequestModel.simultaneousRequestPDF;
    //     requestModel.simultaneousRequestEPS  = newRequestModel.simultaneousRequestEPS;
    //     requestModel.simultaneousRequestDXF  = newRequestModel.simultaneousRequestDXF;
    //     requestModel.deliveryDate            = newRequestModel.deliveryDate;
    //     requestModel.desired                 = newRequestModel.desired;
    //     requestModel.desiredNumber           = newRequestModel.desiredNumber;
    //     requestModel.memo                    = newRequestModel.memo;
    //     requestModel.directDestination       = newRequestModel.directDestination;
    //
    //     return requestModel;
    // }

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

                departmentModel.id            = department.id;
                departmentModel.department    = department.department;
                departmentModel.mailGroupFlag = department.mailGroupFlag;
                // clone users
                if (department.users) {
                    departmentModel.users = SF00309Helper.cloneUserModel(department.users);
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