/**
 * Contain information of loading address 
 * @author vupt
 */

import {OrderItem} from "./OrderItem.model";
import {BaseModel} from "./BaseModel.model";

export class LoadingAddress extends BaseModel{

	/* value */
	public value: string;

	/* loadingAddressRsShipping */
	public orderItem: OrderItem[];

	public setLoadingAddress(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.value = data["value"];

		if(data["orderItem"] !== undefined){
			this.orderItem=[];
			for (var i = 0; i < data["orderItem"].length; i++) {
				let tmp = new OrderItem();
				tmp.setOrderItem(data["orderItem"][i]);
				this.orderItem.push(tmp);
			}
		}
	}
}