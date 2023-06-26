/**
 * Contain surface master data used for simulation 
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class MstSurfaceTreatment extends BaseModel{

	/* 板紙種類 */
	public varnishType: number;

	/* サイズ  */
	public size: number;

	/* 通数 */
	public throughNumber: number;

	/* 基本料 */
	public basicCost: number;

	/* 通工賃 */
	public throughWage: number;

	public setMstSurfaceTreatment(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.varnishType = data["varnishType"];
		this.size = data["size"];
		this.throughNumber = data["throughNumber"];
		this.basicCost = data["basicCost"];
		this.throughWage = data["throughWage"];

	}
}