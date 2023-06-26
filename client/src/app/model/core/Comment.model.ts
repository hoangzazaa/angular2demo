/**
 * Contain comments of user for each deal 
 * @author vupt
 */

import {Deal} from "./Deal.model";
import {User} from "./User.model";
import {BaseModel} from "./BaseModel.model";

export class Comment extends BaseModel{

	/* 活動状況 */
	public value: string;

	/* userId */
	public userId: number;

	/* dealId */
	public dealId: number;

	/* dealRsComment */
	public deal: Deal;

	/* userRsComment */
	public user: User;

	public setComment(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.value = data["value"];
		this.userId = data["userId"];
		this.dealId = data["dealId"];

		if(data["deal"] !== undefined){
			this.deal = new Deal();
			this.deal.setDeal(data["deal"]);
		}

		if(data["user"] !== undefined){
			this.user = new User();
			this.user.setUser(data["user"]);
		}

	}
}