import {Injectable} from "@angular/core";
import {File} from "../../../model/core/File.model";
import {CheckSheetModel} from "../COMMON/checksheet/model/CheckSheet.model";
import {MstLamination} from "../COMMON/model/MstLamination.model";
import {SF00301_Comment} from "./model/SF00301_Comment.model";
import {SF00301_Customer} from "./model/SF00301_Customer.model";
import {SF00301_Deal} from "./model/SF00301_Deal.model";
import {SF00301_Department} from "./model/SF00301_Department.model";
import {SF00301_FileItem} from "./model/SF00301_Modal.modal";
import {SF00301_OrderItem} from "./model/SF00301_OrderItems.model";
import {SF00301_User} from "./model/SF00301_User.model";

type SF00301_ConcernItem = {
    id: number;
    category: symbol;
}

@Injectable()
export class SF00301Data {
    static CATEGORY = {
        ANY: Symbol("SF00301_ConcernItem.Category.ANY"),
        PRODUCT: Symbol("SF00301_ConcernItem.Category.PRODUCT"),
        DEAL_FILE: Symbol("SF00301_ConcernItem.Category.DEAL_FILE"),
        QUOTATION: Symbol("SF00301_ConcernItem.Category.QUOTATION"),
        PRODUCT_FILE: Symbol("SF00301_ConcernItem.Category.PRODUCT_FILE"),
        COMMENT_FILE: Symbol("SF00301_ConcernItem.Category.COMMENT_FILE"),
        ANY_FILE: Symbol("SF00301_ConcernItem.Category.ANY_FILE") // DO NOT assign this category to any item, it's used special for filter
    };

    screenMode: symbol;

    // itemType: symbol;

    user: SF00301_User;

    /* Deal model */
    deal: SF00301_Deal = new SF00301_Deal();

    defaultDeliveryDate: Date;

    /* deal's concern items */
    concernsItems: SF00301_ConcernItem[] = [];

    /* list comment on deal */
    comments: SF00301_Comment[] = [];

    /* rule for filter concern itmes */
    filter: symbol = SF00301Data.CATEGORY.ANY;

    /* list departments, use for select PIC */
    departments: SF00301_Department[];

    /*list order item*/
    orderItems: SF00301_OrderItem[];

    /* list departments, use for select PIC */
    customers: SF00301_Customer[];

    fileUploadInProgress: boolean = false;

    mstLaminations: MstLamination[] = [];

    /*deal file*/
    stagingFileItem: SF00301_FileItem = new SF00301_FileItem();

    /*file*/
    file: File = new File();

    checkSheets: CheckSheetModel[];

    isUpdated: boolean = false;

    // http://fridaynight.vnext.vn/issues/2795
    // customer, sale, pic tmp
    customerTmp: SF00301_Customer;

    departmentIdTmp: number;


    // get total comments
    totalComments: number = 0;


    /**
     * 関連案件 (元案件, リピート案件)
     *
     * <p>リピート案件なしの場合は空配列が応答される。
     */
    public relatedDeals: SF00301_Deal[];

    public answerMap(key: number) {
        // get answer by questionCode = key
        let answer = this.checkSheets[key];
        // check answer undefined => new CheckSheet() with questionCode = key
        if (answer == undefined) {
            answer = new CheckSheetModel();
        }

        return answer;
    }

    public valueItem(data: any): string {
        if (data)
            return data.name;

        return '';
    }

}




