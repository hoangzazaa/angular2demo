/**
 * Contain information of password recovery 
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class UserPasswordRecover extends BaseModel{

	/* tokenKey */
	public tokenKey: string;

	/* expiredDate */
	public expiredDate: Date;

	/* usedFlag */
	public usedFlag: number;

	/* activatedDate */
	public activatedDate: Date;

	/* userId */
	public userId: number;

	public setUserPasswordRecover(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.tokenKey = data["tokenKey"];
		this.expiredDate = data["expiredDate"] !=undefined ? new Date(data["expiredDate"]): undefined;
		this.usedFlag = data["usedFlag"];
		this.activatedDate = data["activatedDate"] !=undefined ? new Date(data["activatedDate"]): undefined;
		this.userId = data["userId"];

	}
}