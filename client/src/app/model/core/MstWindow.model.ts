/**
 * Contain window creating master data used for simulation 
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class MstWindow extends BaseModel{

	/* 寸法 */
	public windowSize: number;

	/* ロット */
	public windowLot: number;

	/* 材質 */
	public windowMaterial: number;

	/* 準備料 */
	public windowPreparationFee: number;

	/* 通工賃 */
	public windowThroughWage: number;

	public setMstWindow(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.windowSize = data["windowSize"];
		this.windowLot = data["windowLot"];
		this.windowMaterial = data["windowMaterial"];
		this.windowPreparationFee = data["windowPreparationFee"];
		this.windowThroughWage = data["windowThroughWage"];

	}
}