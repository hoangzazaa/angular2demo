import {PartnerModel} from "./model/SFN0402_Partner.model";
import {RevenueModel} from "./model/SFN0402_Revenue.model";
import {InventoryModel} from "./model/SFN0402_Inventory.model";
import {ProductModel} from "./model/SFN0402_Product.model";
import {SummaryModel} from "./model/SFN0402_Summary.model";
import {MailModel} from "./model/SFN0402_Mail.model";

export class SFN0402Data {

    constructor() {
        this.partner = new PartnerModel();

        this.revenues = [];
        this.inventories = [];
        this.products = [];
    }

    //region Background data

    // current time
    currentTime: Date;
    // partnerType
    partnerType: number;
    // partnerCode
    partnerCode: string;
    // 備考(営業カルテ) キャンセルボタンでのロールバック用
    partnerMemo: string;
    // 備考(出荷部門用カルテ) キャンセルボタンでのロールバック用
    remarksForShipping: string;
    // customer summary;
    summary: SummaryModel;
    // mail
    productDisposalMail: MailModel;
    woodenReturnMail: MailModel;
    woodenPendingMail: MailModel;
    mail: MailModel;
    // selected product
    selectedProduct: ProductModel;
    selectedInventory: InventoryModel;

    //endregion

    //region Screen data

    // partners
    partner: PartnerModel;
    // revenue
    revenues: RevenueModel[];
    revenueHits: number;
    // inventory
    inventories: InventoryModel[];
    inventoryHits: number;
    // product
    products: ProductModel[];
    productHits: number;

    // 売上実績
    spSelectedYear: number;
    spYearList: number[];
    // 取引実績
    rpcStartDate: Date;
    rpcEndDate: Date;
    rpcKeyword: string;
    // 在庫状況
    spcStockDays: number;
    spcStockType: number;
    // 製品一覧
    ppcStartDate: Date;
    ppcEndDate: Date;
    ppcKeyword: string;

    //endregion
}