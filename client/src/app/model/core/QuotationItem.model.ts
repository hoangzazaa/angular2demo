/**
 * Contain information of item in quotation
 * @author vupt
 */

import {Quotation} from "./Quotation.model";
import {DealProduct} from "./DealProduct.model";
import {BaseModel} from "./BaseModel.model";
import {PRODUCT_UNIT_VALUE} from "../../helper/mst-data-type";

export class QuotationItem extends BaseModel{

	private static identity = 0;

	public identity: number = QuotationItem.identity++;

	/* no */
	public no: number;

	/* itemIndex */
	public itemIndex: number;

	/* itemType */
	public itemType: number;

	/* 品名 */
	public name: string;

	/* 仕様 */
	public description: string;

	/* 単価 */
	public submittedPrice: number;

	/* 数量 */
	public quantity: number;

	/* 金額 */
	public total: number;

	/* 単位 */
	public productType: number = PRODUCT_UNIT_VALUE.SHEET;

	/* setClosedFlag */
	public setClosedFlag: number;

	/* parentId */
	public parentId: number;

	/* quotationId */
	public quotationId: number;

	/* dealProductId */
	public dealProductId: number;

	/* interestRate */
	public interestRate: number;

	/* quotationRsQuotationItem */
	public quotation: Quotation;

	/* quotationItemRsDealProduct */
	public dealProduct: DealProduct;

	public productTypeName: string;

	public setQuotationItem(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.no = data["no"];
		this.itemIndex = data["itemIndex"];
		this.itemType = data["itemType"];
		this.name = data["name"];
		this.description = data["description"];
		this.submittedPrice = data["submittedPrice"];
		this.quantity = data["quantity"];
		this.total = data["total"];
		this.productType = data["productType"];
		this.productTypeName = data["productTypeName"];
		this.setClosedFlag = data["setClosedFlag"];
		this.parentId = data["parentId"];
		this.quotationId = data["quotationId"];
		this.dealProductId = data["dealProductId"];
		this.interestRate = data["interestRate"];

		if(data["quotation"] !== undefined){
			this.quotation = new Quotation();
			this.quotation.setQuotation(data["quotation"]);
		}

		if(data["dealProduct"] !== undefined){
			this.dealProduct = new DealProduct();
			this.dealProduct.setDealProduct(data["dealProduct"]);
		}
	}
}
