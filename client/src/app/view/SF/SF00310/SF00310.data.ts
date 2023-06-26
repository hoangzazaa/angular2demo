import {DealInfoModel} from "../COMMON/dealinfo/model/DealModel";
import {ProductBoxModel} from "../COMMON/productinfo/model/ProductBox.model";
import {RequestModel} from "./model/request.model";
import {MailModel} from "../../../model/common/Mail.model";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {DepartmentModel} from "../COMMON/model/DepartmentModel";
import {UserModel} from "../COMMON/model/UserModel";
import {MstLamination} from "../COMMON/model/MstLamination.model";

export class SF00310Data {
    /*deal info*/
    dealInfo: DealInfoModel;

    /*list model productBox*/
    productBoxs: ProductBoxModel[];

    /*request model*/
    requestModel: RequestModel;

    /*mail request*/
    mailRequest: MailModel;

    /*mail request backup*/
    mailRequestBackup: MailModel;

    /*count record request*/
    countRecord: number;

    /*check update data*/
    isUpdated: boolean = false;

    departments: DepartmentModel[];
    // data screen
    listDepartmentScreen: DepartmentModel[];
    listPicSearch: UserModel[];
    listPicScreen: UserModel[];

    userDepartments: UserModel[] = [];
    mstLaminations: MstLamination[];

    //search add pic
    userPicModals: UserModel[] = [];
    typeAddress: string;
    //end search add pic

    get selectedProducts(): ProductInfoModel[] {
        return (this.productBoxs || []).filter(item => item.checked).map(item => item.product);
    }

    /*check enabled request*/
    get checkEnabled(): boolean {
        return this.selectedProducts.length > 0;
    }

    changeEditData() {
        this.isUpdated = true;
    }
}
