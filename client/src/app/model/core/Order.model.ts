/**
 * Contain all order  
 * @author vupt
 */

import {Quotation} from "./Quotation.model";
import {OrderItem} from "./OrderItem.model";
import {Deal} from "./Deal.model";
import {BaseModel} from "./BaseModel.model";

export class Order extends BaseModel{

	/* quotationId */
	public quotationId: number;

	/* dealId */
	public dealId: number;

	/* quotationRsOrder */
	public quotation: Quotation;

	/* orderRsOrderItem */
	public orderItems: OrderItem[];

	/* dealRsOrder */
	public deal: Deal;

	public setOrder(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.quotationId = data["quotationId"];
		this.dealId = data["dealId"];

		if(data["quotation"] !== undefined){
			this.quotation = new Quotation();
			this.quotation.setQuotation(data["quotation"]);
		}

		if(data["orderItems"] !== undefined){
			this.orderItems=[];
			for (var i = 0; i < data["orderItems"].length; i++) {
				let tmp = new OrderItem();
				tmp.setOrderItem(data["orderItems"][i]);
				this.orderItems.push(tmp);
			}
		}
		if(data["deal"] !== undefined){
			this.deal = new Deal();
			this.deal.setDeal(data["deal"]);
		}

	}
}