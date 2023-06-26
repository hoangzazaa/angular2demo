/**
 * Contain die cutting master data used for simulation 
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class MstDieCutting extends BaseModel{

	/* 板紙種類 */
	public paperboardType: number;

	/* サイズ  */
	public size: number;

	/* 面付 */
	public impositionNumber: number;

	/* 通数 */
	public throughNumber: number;

	/* 基本料 */
	public basicCost: number;

	/* 通工賃 */
	public throughWage: number;

	public setMstDieCutting(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.paperboardType = data["paperboardType"];
		this.size = data["size"];
		this.impositionNumber = data["impositionNumber"];
		this.throughNumber = data["throughNumber"];
		this.basicCost = data["basicCost"];
		this.throughWage = data["throughWage"];

	}
}