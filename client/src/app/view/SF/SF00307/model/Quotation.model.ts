import {BaseModel} from "../../../../model/core/BaseModel.model";
/**
 * Created by hoangtd on 4/13/2017.
 */
export class QuotationModel extends BaseModel {

    /* 利益率 */
    public interestRate: number;

    /* 見積メモ */
    public memo: string;

    /* 備考欄 */
    public remark: string;

    /* quotationCode */
    public quotationCode: string;

    /* subject */
    public subject: string;

    public lot: number;

    public unitPrice: number;

    public totalCost: number;
}