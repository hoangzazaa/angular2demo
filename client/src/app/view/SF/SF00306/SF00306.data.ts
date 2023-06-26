import {CheckSheetModel} from "../COMMON/checksheet/model/CheckSheet.model";
import {DealInfoModel} from "../COMMON/dealinfo/model/DealModel";
import {ProductBoxModel} from "./model/ProductBox.model";
import {MailModel} from "../../../model/common/Mail.model";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {DepartmentModel} from "../COMMON/model/DepartmentModel";
import {UserModel} from "../COMMON/model/UserModel";
import {MstLamination} from "../COMMON/model/MstLamination.model";

export class SF00306Data {
    constructor(){
        this.checkSheets = [];
        this.productBoxs = [];
        this.departments = [];
        this.userDepartments = [];

        this.listDepartmentScreen = [];
        this.listPicSearch = [];
        this.listPicScreen = [];

        this.userPicModals = [];

        this.mstLaminations = [];
    }

    checkSheets: CheckSheetModel[];

    dealInfo: DealInfoModel;

    productBoxs: ProductBoxModel[];

    mailModel: MailModel;

    mailModelScreen: MailModel;

    // data get from server
    departments: DepartmentModel[];

    userDepartments: UserModel[];

    // data screen
    listDepartmentScreen: DepartmentModel[];
    listPicSearch: UserModel[];
    listPicScreen: UserModel[];

    userPicModals: UserModel[];

    // message
    messageMail: string = "";
    messageRequest: string = "";
    message: string = "";

    typeAddress: string;

    mstLaminations: MstLamination[];

    get selectedProducts(): ProductInfoModel[] {
        return (this.productBoxs || []).filter(item => item.checked).map(item => item.product);
    }

    get checkEnabled(): boolean {
        let anyProductbox = (this.productBoxs || []).find(item => item.checked);
        return !!anyProductbox;
    }


}
