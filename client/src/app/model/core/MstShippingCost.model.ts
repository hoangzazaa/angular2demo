/**
 * Contain master shipping cost 
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class MstShippingCost extends BaseModel{

	/* distance */
	public distance: number;

	/* weight */
	public weight: number;

	/* cost */
	public cost: number;

	/* factoryId */
	public factoryId: number;

	public setMstShippingCost(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.distance = data["distance"];
		this.weight = data["weight"];
		this.cost = data["cost"];
		this.factoryId = data["factoryId"];

	}
}