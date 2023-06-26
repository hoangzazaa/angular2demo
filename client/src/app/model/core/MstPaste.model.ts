/**
 * Contain paste master data used for simulation 
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class MstPaste extends BaseModel{

	/* 紙種類 */
	public paperType: number;

	/* ロット */
	public form: number;

	/* ﾌﾞﾗﾝｸｻｲｽﾞ */
	public blankSize: number;

	/* 基本料 */
	public basicCost: number;

	/* 工賃 */
	public throughWage: number;

	public setMstPaste(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.paperType = data["paperType"];
		this.form = data["form"];
		this.blankSize = data["blankSize"];
		this.basicCost = data["basicCost"];
		this.throughWage = data["throughWage"];

	}
}