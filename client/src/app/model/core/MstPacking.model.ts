/**
 * Contain packing master data used for simulation 
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class MstPacking extends BaseModel{

	/* 方法 */
	public method: number;

	/* ロット */
	public lot: number;

	/* ％ */
	public percent: number;

	public setMstPacking(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.method = data["method"];
		this.lot = data["lot"];
		this.percent = data["percent"];

	}
}