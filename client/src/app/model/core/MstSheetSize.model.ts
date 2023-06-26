/**
 * Contain master sheet size 
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class MstSheetSize extends BaseModel{

	/* name */
	public name: string;

	/* width */
	public width: number;

	/* height */
	public height: number;

	/* grain */
	public grain: number;

	public paperId: number;

	public paperCode: string;

	/* popular */
	public popular: number;

	public wastePaperFlag: number;

	public specialSizeFlag: number;

	public setMstSheetSize(data: any){
		if (!!data) {
			this.setData(data);

			this.name = data["name"];
			this.width = data["width"];
			this.height = data["height"];
			this.paperId = data["paperId"];
			this.paperCode = data["paperCode"];
			this.grain = data["grain"];
			this.popular = data["popular"];
			this.wastePaperFlag    = data["wastePaperFlag"];
			this.specialSizeFlag   = data["specialSizeFlag"];
		}
	}
}