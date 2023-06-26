import {SF00301_Comment} from "../model/SF00301_Comment.model";
import {SF00301_Deal} from "../model/SF00301_Deal.model";
import {SF00301_Department} from "../model/SF00301_Department.model";
import {SF00301_OrderItem} from "../model/SF00301_OrderItems.model";
import {SF00301_User} from "../model/SF00301_User.model";
import {CheckSheetModel} from "../../COMMON/checksheet/model/CheckSheet.model";
import {MstLamination} from "../../COMMON/model/MstLamination.model";
import {SF00301_Product} from "../model/SF00301_Product.model";
import {SF00301_Quotation} from "../model/SF00301_Quotation.model";
import {SF00301_ProductFile} from "../model/SF00301_ProductFile.model";
import {SF00301_DealFile} from "../model/SF00301_DealFile.model";

export class SF0030101Res {
    user: SF00301_User;
    comments: SF00301_Comment[] = [];
    deal: SF00301_Deal = new SF00301_Deal();
    departments: SF00301_Department[] = [];
    baseModels: (SF00301_Product | SF00301_Quotation | SF00301_ProductFile | SF00301_DealFile)[] = [];
    checkSheets: CheckSheetModel[];
    orderItems: SF00301_OrderItem[] = [];
    mstLaminations: MstLamination[] = [];
    relatedDeals: SF00301_Deal[] = [];
}
