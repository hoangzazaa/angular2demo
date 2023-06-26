/**
 * Contain stamping master data used for simulation 
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class MstStamping extends BaseModel{

	/* 加工種類 */
	public processingType: number;

	/* ﾌﾞﾗﾝｸ */
	public blank: number;

	/* 基本料 */
	public basicCost: number;

	/* 工賃 */
	public throughWage: number;

	public setMstStamping(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.processingType = data["processingType"];
		this.blank = data["blank"];
		this.basicCost = data["basicCost"];
		this.throughWage = data["throughWage"];

	}
}