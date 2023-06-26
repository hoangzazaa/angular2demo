import {BaseModel} from "../../../../model/core/BaseModel.model";

export class SF00301_Quotation extends BaseModel {
    /* 案件ID */
    public dealId: number;

    /* quotationCode */
    public quotationCode: string;

    /* subject */
    public subject: string;

    /* 利益率 */
    public lot: number;

    /* 利益率 */
    public unitPrice: number;

    /* 提出金額合計 / 合計（税込） */
    public totalCost: number;

    /* 利益率 */
    public interestRate: number;

    /* 見積メモ */
    public memo: string;

    /* image file path */
    public srcImg: string;

    public highlightFlag: number;

    public category: symbol;

    // /* quotationItems */
    // public quotationItems: SF00301_QuotationItem[] = [];

    public setQuotation(data: any) {
        if (!data)
            return;

        //set basic info & binding value to properties
        this.setData(data);

        this.dealId = data["dealId"];
        this.quotationCode = data["quotationCode"];
        this.subject = data["subject"];
        this.lot = data["lot"]; //this.quotationItems[0].dealProduct.offers[0].productOutput.lot;
        this.unitPrice = data["unitPrice"]; //return this.quotationItems[0].dealProduct.offers[0].unitPrice;
        this.totalCost = data["totalCost"]; //return this.quotationItems[0].dealProduct.offers[0].total;
        this.interestRate = data["interestRate"];
        this.memo = data["memo"];
        this.highlightFlag = data["highlightFlag"];
        this.srcImg = data["srcImg"];
    }
}
