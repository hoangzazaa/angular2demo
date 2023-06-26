/**
 * Contain revenue imported by batch 
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class Revenue extends BaseModel{

	/* 売上SEQ */
	public salesSeq: number;

	/* 受注番号 */
	public orderCode: string;

	/* 電脳得意先C */
	public dennoCustomerCode: string;

	/* 売上日 */
	public salesDate: Date;

	/* 請求売上日 */
	public invoiceSalesDate: Date;

	/* 売上区分 */
	public salesCategory: number;

	/* 売上金額 */
	public salesAmount: number;

	/* 営業部署 */
	public departmentCode: string;

	/* 担当営業 */
	public salesRep: string;

	/* 売上数 */
	public salesNumber: number;

	/* 売上単価 */
	public salesUnitPrice: number;

	/* 製造依頼先 */
	public manufactureRequest: string;

	/* 電脳品目コード */
	public itemCode: string;

	/* 製品名 */
	public productName: string;

	/* productType */
	public productType: number;

	public setRevenue(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.salesSeq = data["salesSeq"];
		this.orderCode = data["orderCode"];
		this.dennoCustomerCode = data["dennoCustomerCode"];
		this.salesDate = data["salesDate"] !=undefined ? new Date(data["salesDate"]): undefined;
		this.invoiceSalesDate = data["invoiceSalesDate"] !=undefined ? new Date(data["invoiceSalesDate"]): undefined;
		this.salesCategory = data["salesCategory"];
		this.salesAmount = data["salesAmount"];
		this.departmentCode = data["departmentCode"];
		this.salesRep = data["salesRep"];
		this.salesNumber = data["salesNumber"];
		this.salesUnitPrice = data["salesUnitPrice"];
		this.manufactureRequest = data["manufactureRequest"];
		this.itemCode = data["itemCode"];
		this.productName = data["productName"];
		this.productType = data["productType"];

	}
}