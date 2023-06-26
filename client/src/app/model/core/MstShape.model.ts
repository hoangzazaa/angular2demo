/**
 * Contain  
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class MstShape extends BaseModel{

	/* name */
	public name: string;

	/* note */
	public note: string;

	/* width */
	public width: number;

	/* height */
	public height: number;

	/* depth */
	public depth: number;

	/* flap */
	public flap: number;

	/* insertion */
	public insertion: number;

	/* grain */
	public grain: number;

	/* developmentWidth */
	public developmentWidth: number;

	/* developmentHeight */
	public developmentHeight: number;

	/* minWidth */
	public minWidth: number;

	/* minHeight */
	public minHeight: number;

	/* maxWidth */
	public maxWidth: number;

	/* maxHeight */
	public maxHeight: number;

	/* minDepth */
	public minDepth: number;

	/* maxDepth */
	public maxDepth: number;

	/* fileId */
	public fileId: number;

	public setMstShape(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.name = data["name"];
		this.note = data["note"];
		this.width = data["width"];
		this.height = data["height"];
		this.depth = data["depth"];
		this.flap = data["flap"];
		this.insertion = data["insertion"];
		this.grain = data["grain"];
		this.developmentWidth = data["developmentWidth"];
		this.developmentHeight = data["developmentHeight"];
		this.minWidth = data["minWidth"];
		this.minHeight = data["minHeight"];
		this.maxWidth = data["maxWidth"];
		this.maxHeight = data["maxHeight"];
		this.minDepth = data["minDepth"];
		this.maxDepth = data["maxDepth"];
		this.fileId = data["fileId"];

	}
}