/**
 * Contain all information of items included in my box 
 * @author vupt
 */

import {User} from "./User.model";
import {Deal} from "./Deal.model";
import {BaseModel} from "./BaseModel.model";

export class MyboxItem extends BaseModel{

	/* userId */
	public userId: number;

	/* dealId */
	public dealId: number;

	/* userRsMyboxItem */
	public user: User;

	/* dealRsMyboxItem */
	public deal: Deal;

	public setMyboxItem(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.userId = data["userId"];
		this.dealId = data["dealId"];

		if(data["user"] !== undefined){
			this.user = new User();
			this.user.setUser(data["user"]);
		}

		if(data["deal"] !== undefined){
			this.deal = new Deal();
			this.deal.setDeal(data["deal"]);
		}

	}
}