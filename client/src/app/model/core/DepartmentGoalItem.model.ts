/**
 * Contain department goal item 
 * @author vupt
 */

import {DepartmentGoal} from "./DepartmentGoal.model";
import {BaseModel} from "./BaseModel.model";

export class DepartmentGoalItem extends BaseModel{

	/* type */
	public type: number;

	/* goal */
	public goal: number;

	/* month */
	public month: number;

	/* departmentGoalId */
	public departmentGoalId: number;

	/* customerType */
	public customerType: number;

	/* departmentGoalRsDepartmentGoalItem */
	public departmentGoal: DepartmentGoal;

	public setDepartmentGoalItem(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.type = data["type"];
		this.goal = data["goal"];
		this.month = data["month"];
		this.departmentGoalId = data["departmentGoalId"];
		this.customerType = data["customerType"];

		if(data["departmentGoal"] !== undefined){
			this.departmentGoal = new DepartmentGoal();
			this.departmentGoal.setDepartmentGoal(data["departmentGoal"]);
		}

	}
}