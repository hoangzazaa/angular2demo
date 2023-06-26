/**
 * Contain customer goal items 
 * @author vupt
 */

import {CustomerGoal} from "./CustomerGoal.model";
import {BaseModel} from "./BaseModel.model";

export class CustomerGoalItem extends BaseModel{

	/* type */
	public type: number;

	/* goal */
	public goal: number;

	/* month */
	public month: number;

	/* customerGoalId */
	public customerGoalId: number;

	/* customerType */
	public customerType: number;

	/* customerGoalRsGoalItem */
	public customerGoal: CustomerGoal;

	public setCustomerGoalItem(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.type = data["type"];
		this.goal = data["goal"];
		this.month = data["month"];
		this.customerGoalId = data["customerGoalId"];
		this.customerType = data["customerType"];

		if(data["customerGoal"] !== undefined){
			this.customerGoal = new CustomerGoal();
			this.customerGoal.setCustomerGoal(data["customerGoal"]);
		}

	}
}