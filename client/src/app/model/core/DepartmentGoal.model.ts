/**
 * Contain department goal 
 * @author vupt
 */

import {Department} from "./Department.model";
import {DepartmentGoalItem} from "./DepartmentGoalItem.model";
import {BaseModel} from "./BaseModel.model";

export class DepartmentGoal extends BaseModel{

	/* year */
	public year: number;

	/* activityPolicy */
	public activityPolicy: string;

	/* departmentId */
	public departmentId: number;

	/* departmentRsDepartmentGoal */
	public department: Department;

	/* departmentGoalRsDepartmentGoalItem */
	public goalItems: DepartmentGoalItem[];

	public setDepartmentGoal(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.year = data["year"];
		this.activityPolicy = data["activityPolicy"];
		this.departmentId = data["departmentId"];

		if(data["department"] !== undefined){
			this.department = new Department();
			this.department.setDepartment(data["department"]);
		}

		if(data["goalItems"] !== undefined){
			this.goalItems=[];
			for (var i = 0; i < data["goalItems"].length; i++) {
				let tmp = new DepartmentGoalItem();
				tmp.setDepartmentGoalItem(data["goalItems"][i]);
				this.goalItems.push(tmp);
			}
		}
	}
}