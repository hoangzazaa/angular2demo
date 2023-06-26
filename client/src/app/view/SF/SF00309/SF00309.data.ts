import {DealInfoModel} from "../COMMON/dealinfo/model/DealModel";
import {ProductBoxModel} from "../COMMON/productinfo/model/ProductBox.model";
import {MailModel} from "../../../model/common/Mail.model";
// import {RequestModel} from "./model/request.model";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {DepartmentModel} from "../COMMON/model/DepartmentModel";
import {UserModel} from "../COMMON/model/UserModel";
import {MstLamination} from "../COMMON/model/MstLamination.model";

export class SF00309Data {
    /*deal info*/
    dealInfo: DealInfoModel;

    /*list model productBox*/
    productBoxs: ProductBoxModel[] = [];

    /*mail request*/
    mailRequest: MailModel;

    /*mail request backup*/
    mailRequestBackup: MailModel;

    /*check update data*/
    isUpdated: boolean = false;

    countRecord: number;

    departments: DepartmentModel[];
    userDepartments: UserModel[] = [];

    // data screen
    listDepartmentScreen: DepartmentModel[];
    listPicSearch: UserModel[];
    listPicScreen: UserModel[];

    //search add pic
    userPicModals: UserModel[] = [];
    typeAddress: string;
    //end search add pic

    mstLaminations: MstLamination[] = [];

    requestType: number;
    requestButtonLabel: string;

    /*check enabled request*/
    get checkEnabled(): boolean {
        if (!!this.productBoxs) {
            let index = this.productBoxs.findIndex(item => item.checked);
            return index >= 0;
        }
        return false;
    }

    get selectedProducts(): ProductInfoModel[] {
        return (this.productBoxs || []).filter(item => item.checked).map(item => item.product);
    }

    changeEditData() {
        this.isUpdated = true;
    }
}
