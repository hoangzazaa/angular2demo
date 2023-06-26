/**
 * Contain information about quotations of deals
 * @author vupt
 */
import {Deal} from "./Deal.model";
import {QuotationPrintTemplate} from "./QuotationPrintTemplate.model";
import {QuotationItem} from "./QuotationItem.model";
import {BaseModel} from "./BaseModel.model";

export class Quotation extends BaseModel {

    /* dealId */
    public dealId: number;

    /* printTemplateId */
    public printTemplateId: number;

    /* 利益率 */
    public interestRate: number;

    /* 状況 */
    public quotationStatus: number;

    /* 提出金額合計 / 合計（税込） */
    public totalCost: number;

    /* 見積メモ */
    public memo: string;

    /* 備考欄 */
    public remark: string;

    /* 見積提出日 */
    public estimateDate: Date;

    /* 納期 */
    public invoiceDeliveryDate: string;

    /* 納入場所 */
    public invoiceDeliveryPlace: string;

    /* 支払い条件 */
    public invoicePaymentTerm: string;

    /* 得意先名 */
    public invoiceCustomerName: string;

    /* 担当部署 */
    public invoiceDeptName: string;

    /* 担当者名 */
    public invoicePic: string;

    /* 住所 */
    public invoiceAddress: string;

    /* メールアドレス */
    public invoiceMailAddress: string;

    /* 連絡先 */
    public invoicePhoneNumber: string;

    /* 見積書有効期限 */
    public invoiceExpirationDate: Date;

    /* quotationCode */
    public quotationCode: string;

    /* quotationType */
    public quotationType: number;

    /* subject */
    public subject: string;

    /* consumptionTax */
    public consumptionTax: number;

    /* totalExcludedTax */
    public totalExcludedTax: number;

    /* highlightFlag */
    public highlightFlag: number;

    /* stereoType1Flag */
    public stereoType1Flag: number;

    /* stereoType2Flag */
    public stereoType2Flag: number;

    /* stereoType3Flag */
    public stereoType3Flag: number;

    /* stereoType4Flag */
    public stereoType4Flag: number;

    public deliveryMethod: string;

    public title: number = 1;

    /* dealRsQuotation */
    public deal: Deal;

    /* quotationRsQuotationTemplate */
    public quotationPrintTemplate: QuotationPrintTemplate;

    /* quotationRsQuotationItem */
    public quotationItems: QuotationItem[];

    public setQuotation(data: any) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.dealId = data["dealId"];
        this.printTemplateId = data["printTemplateId"];
        this.interestRate = data["interestRate"];
        this.quotationStatus = data["quotationStatus"];
        this.totalCost = data["totalCost"];
        this.memo = data["memo"];
        this.remark = data["remark"];
        this.estimateDate = data["estimateDate"] != undefined ? new Date(data["estimateDate"]) : undefined;
        this.invoiceDeliveryDate = data["invoiceDeliveryDate"];
        this.invoiceDeliveryPlace = data["invoiceDeliveryPlace"];
        this.invoicePaymentTerm = data["invoicePaymentTerm"];
        this.deliveryMethod = data["deliveryMethod"];
        this.invoiceCustomerName = data["invoiceCustomerName"];
        this.invoiceDeptName = data["invoiceDeptName"];
        this.invoicePic = data["invoicePic"];
        this.invoiceAddress = data["invoiceAddress"];
        this.invoiceMailAddress = data["invoiceMailAddress"];
        this.invoicePhoneNumber = data["invoicePhoneNumber"];
        this.invoiceExpirationDate = data["invoiceExpirationDate"] != undefined ? new Date(data["invoiceExpirationDate"]) : undefined;
        this.quotationCode = data["quotationCode"];
        this.quotationType = data["quotationType"];
        this.subject = data["subject"];
        this.consumptionTax = data["consumptionTax"];
        this.totalExcludedTax = data["totalExcludedTax"];
        this.highlightFlag = data["highlightFlag"];
        this.stereoType1Flag = data["stereoType1Flag"];
        this.stereoType2Flag = data["stereoType2Flag"];
        this.stereoType3Flag = data["stereoType3Flag"];
        this.stereoType4Flag = data["stereoType4Flag"];
        this.title = data["title"];

        if (data["deal"] !== undefined) {
            this.deal = new Deal();
            this.deal.setDeal(data["deal"]);
        }

        if (data["quotationPrintTemplate"] !== undefined) {
            this.quotationPrintTemplate = new QuotationPrintTemplate();
            this.quotationPrintTemplate.setQuotationPrintTemplate(data["quotationPrintTemplate"]);
        }

        if (data["quotationItems"] !== undefined) {
            this.quotationItems = [];
            for (let i = 0; i < data["quotationItems"].length; i++) {
                let tmp = new QuotationItem();
                tmp.setQuotationItem(data["quotationItems"][i]);
                this.quotationItems.push(tmp);
            }
        }
    }
}
