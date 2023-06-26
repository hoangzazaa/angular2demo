/**
 * Contain information of file of deal 
 * @author vupt
 */

import {Deal} from "./Deal.model";
import {File} from "./File.model";
import {BaseModel} from "./BaseModel.model";

export class DealFile extends BaseModel{

	/* ファイルID */
	public fileId: number;

	/* ファイル名称 */
	public originalName: string;

	/* dealId */
	public dealId: number;

	/* dealFileId */
	public dealFileId: string;

	/* dealFileName */
	public dealFileName: string;

	/* メモ */
	public memo: string;

	/* highlightFlag */
	public highlightFlag: number;

	/* dealRsDealFile */
	public deal: Deal;

	/* fileRsDealFile */
	public file: File;

	public setDealFile(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.fileId = data["fileId"];
		this.originalName = data["originalName"];
		this.dealId = data["dealId"];
		this.dealFileId = data["dealFileId"];
		this.dealFileName = data["dealFileName"];
		this.memo = data["memo"];
		this.highlightFlag = data["highlightFlag"];

		if(data["deal"] !== undefined){
			this.deal = new Deal();
			this.deal.setDeal(data["deal"]);
		}

		if(data["file"] !== undefined){
			this.file = new File();
			this.file.setFile(data["file"]);
		}

	}
}