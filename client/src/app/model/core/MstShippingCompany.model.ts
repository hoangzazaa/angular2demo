/**
 * Contain master shipping company 
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class MstShippingCompany extends BaseModel{

	/* companyId */
	public companyId: number;

	/* companyName */
	public companyName: string;

	public setMstShippingCompany(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.companyId = data["companyId"];
		this.companyName = data["companyName"];

	}
}