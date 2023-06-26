/**
 * Contain balance of stock (imported by batch) 
 * @author vupt
 */

import {OrderItem} from "./OrderItem.model";
import {BaseModel} from "./BaseModel.model";

export class BalanceOfStock extends BaseModel{

	/* orderItemId */
	public orderItemId: number;

	/* value */
	public value: number;

	/* type */
	public type: number;

	/* orderItemRsStock */
	public OrderItem: OrderItem;

	public setBalanceOfStock(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.orderItemId = data["orderItemId"];
		this.value = data["value"];
		this.type = data["type"];

		if(data["OrderItem"] !== undefined){
			this.OrderItem = new OrderItem();
			this.OrderItem.setOrderItem(data["OrderItem"]);
		}

	}
}