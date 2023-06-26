/**
 * Contain question for checklist 
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class Question extends BaseModel{

	/* question */
	public question: string;

	/* questionId */
	public questionId: number;

	public setQuestion(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.question = data["question"];
		this.questionId = data["questionId"];

	}
}