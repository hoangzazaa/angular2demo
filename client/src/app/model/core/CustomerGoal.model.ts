/**
 * Contain customer goal 
 * @author vupt
 */

import {Customer} from "./Customer.model";
import {CustomerGoalItem} from "./CustomerGoalItem.model";
import {User} from "./User.model";
import {Department} from "./Department.model";
import {BaseModel} from "./BaseModel.model";

export class CustomerGoal extends BaseModel{

	/* year */
	public year: number;

	/* activityPolicy */
	public activityPolicy: string;

	/* customerId */
	public customerId: number;

	/* picId */
	public picId: number;

	/* departmentId */
	public departmentId: number;

	/* customerRsCustomerGoal */
	public customer: Customer;

	/**
	 * 目標値
	 */
	public goalItems: CustomerGoalItem[];

	/* customerRsUser */
	public user: User;

	/* departmentRsDepartmentGoal */
	public department: Department;

	public setCustomerGoal(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.year = data["year"];
		this.activityPolicy = data["activityPolicy"];
		this.customerId = data["customerId"];
		this.picId = data["picId"];
		this.departmentId = data["departmentId"];

		if(data["customer"] !== undefined){
			this.customer = new Customer();
			this.customer.setCustomer(data["customer"]);
		}

		if(data["goalItems"] !== undefined){
			this.goalItems=[];
			for (var i = 0; i < data["goalItems"].length; i++) {
				let tmp = new CustomerGoalItem();
				tmp.setCustomerGoalItem(data["goalItems"][i]);
				this.goalItems.push(tmp);
			}
		}
		if(data["user"] !== undefined){
			this.user = new User();
			this.user.setUser(data["user"]);
		}

		if(data["department"] !== undefined){
			this.department = new Department();
			this.department.setDepartment(data["department"]);
		}

	}
}