/**
 * Contain user information used to authenticate and authorize 
 * @author vupt
 */

import {MyboxItem} from "./MyboxItem.model";
import {Deal} from "./Deal.model";
import {Comment} from "./Comment.model";
import {UserPasswordRecover} from "./UserPasswordRecover.model";
import {Department} from "./Department.model";
import {BaseModel} from "./BaseModel.model";

export class User extends BaseModel{

	/* username */
	public username: string;

	/* password */
	public password: string;

	/* enableFlag */
	public enableFlag: number;

	/* role */
	public role: string;

	/* email */
	public email: string;

	/* departmentId */
	public departmentId: number;

	/* departmentCode */
	public departmentCode: string;

	/* deleteFlag */
	public deleteFlag: number;

	/* userCode */
	public userCode: string;

	/* userRsMyboxItem */
	public myboxItems: MyboxItem[];

	/* userRsDeal */
	public deals: Deal[];

	/* userRsComment */
	public comments: Comment[];

	/* userRsUserPasswordRecovery */
	public userPasswordRecovers: UserPasswordRecover[];

	/* salesRsDeal */
	public salesDeals: Deal[];

	/* departmentRsUser */
	public department: Department;

	public setUser(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.username = data["username"];
		this.password = data["password"];
		this.enableFlag = data["enableFlag"];
		this.role = data["role"];
		this.email = data["email"];
		this.departmentId = data["departmentId"];
		this.departmentCode = data["departmentCode"];
		this.deleteFlag = data["deleteFlag"];
		this.userCode = data["userCode"];

		if(data["myboxItems"] !== undefined){
			this.myboxItems=[];
			for (var i = 0; i < data["myboxItems"].length; i++) {
				let tmp = new MyboxItem();
				tmp.setMyboxItem(data["myboxItems"][i]);
				this.myboxItems.push(tmp);
			}
		}
		if(data["deals"] !== undefined){
			this.deals=[];
			for (var i = 0; i < data["deals"].length; i++) {
				let tmp = new Deal();
				tmp.setDeal(data["deals"][i]);
				this.deals.push(tmp);
			}
		}
		if(data["comments"] !== undefined){
			this.comments=[];
			for (var i = 0; i < data["comments"].length; i++) {
				let tmp = new Comment();
				tmp.setComment(data["comments"][i]);
				this.comments.push(tmp);
			}
		}
		if(data["userPasswordRecovers"] !== undefined){
			this.userPasswordRecovers=[];
			for (var i = 0; i < data["userPasswordRecovers"].length; i++) {
				let tmp = new UserPasswordRecover();
				tmp.setUserPasswordRecover(data["userPasswordRecovers"][i]);
				this.userPasswordRecovers.push(tmp);
			}
		}
		if(data["salesDeals"] !== undefined){
			this.salesDeals=[];
			for (var i = 0; i < data["salesDeals"].length; i++) {
				let tmp = new Deal();
				tmp.setDeal(data["salesDeals"][i]);
				this.salesDeals.push(tmp);
			}
		}
		if(data["department"] !== undefined){
			this.department = new Department();
			this.department.setDepartment(data["department"]);
		}

	}
}