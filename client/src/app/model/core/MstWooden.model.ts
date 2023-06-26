/**
 * Contain master wooden 
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class MstWooden extends BaseModel{

	/* woodenCode */
	public woodenCode: string;

	/* woodenTotalNumber */
	public woodenTotalNumber: number;

	/* woodenExpiredDate */
	public woodenExpiredDate: Date;

	public setMstWooden(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.woodenCode = data["woodenCode"];
		this.woodenTotalNumber = data["woodenTotalNumber"];
		this.woodenExpiredDate = data["woodenExpiredDate"] !=undefined ? new Date(data["woodenExpiredDate"]): undefined;

	}
}