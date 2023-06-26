/**
 * Contain department info 
 * @author vupt
 */

import {User} from "./User.model";
import {DepartmentGoal} from "./DepartmentGoal.model";
import {CustomerGoal} from "./CustomerGoal.model";
import {BaseModel} from "./BaseModel.model";

export class Department extends BaseModel{

	/* department */
	public department: string;

	/* departmentCode */
	public departmentCode: string;

	/* type */
	public type: number;

	/* departmentRsUser */
	public users: User[];

	public mailGroupFlag: number;

	/* departmentRsDepartmentGoal */
	public departmentGoals: DepartmentGoal[];

	/* departmentRsCustomerGoal */
	public customerGoals: CustomerGoal[];

	public setDepartment(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.department = data["department"];
		this.departmentCode = data["departmentCode"];
		this.mailGroupFlag = data["mailGroupFlag"];
		this.type = data["type"];

		if(data["users"] !== undefined){
			this.users=[];
			for (var i = 0; i < data["users"].length; i++) {
				let tmp = new User();
				tmp.setUser(data["users"][i]);
				this.users.push(tmp);
			}
		}
		if(data["departmentGoals"] !== undefined){
			this.departmentGoals=[];
			for (var i = 0; i < data["departmentGoals"].length; i++) {
				let tmp = new DepartmentGoal();
				tmp.setDepartmentGoal(data["departmentGoals"][i]);
				this.departmentGoals.push(tmp);
			}
		}
		if(data["customerGoals"] !== undefined){
			this.customerGoals=[];
			for (var i = 0; i < data["customerGoals"].length; i++) {
				let tmp = new CustomerGoal();
				tmp.setCustomerGoal(data["customerGoals"][i]);
				this.customerGoals.push(tmp);
			}
		}
	}
}