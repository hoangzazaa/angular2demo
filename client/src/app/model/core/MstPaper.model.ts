/**
 * Contain paper master data used for simulation 
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class MstPaper extends BaseModel{

	/* 原紙名 ID */
	public nameId: number;

	/* 坪量g/㎡ */
	public basicWeight: number;

	/* 建値k@ */
	public normValue: number;

	/* factoryId */
	public factoryId: number;

	/* userRole */
	public userRole: string;

	/* lsizeTgrain */
	public lsizeTgrain: number;

	/* lsizeYgrain */
	public lsizeYgrain: number;

	/* ksizeTgrain */
	public ksizeTgrain: number;

	/* ksizeYgrain */
	public ksizeYgrain: number;

	public name: string;

	public setMstPaper(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.nameId = data["nameId"];
		this.basicWeight = data["basicWeight"];
		this.normValue = data["normValue"];
		this.factoryId = data["factoryId"];
		this.userRole = data["userRole"];
		this.lsizeTgrain = data["lsizeTgrain"];
		this.lsizeYgrain = data["lsizeYgrain"];
		this.ksizeTgrain = data["ksizeTgrain"];
		this.ksizeYgrain = data["ksizeYgrain"];
		this.name = data["name"];

	}
}