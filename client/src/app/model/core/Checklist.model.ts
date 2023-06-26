/**
 * Contain checklist for a deal 
 * @author vupt
 */

import {Question} from "./Question.model";
import {Deal} from "./Deal.model";
import {BaseModel} from "./BaseModel.model";

export class Checklist extends BaseModel{

	/* questionId */
	public questionId: number;

	/* answer */
	public answer: string;

	/* dealId */
	public dealId: number;

	/* answerText */
	public answerText: string;

	/* checklistRsQuestion */
	public question: Question;

	/* dealRsChecklist */
	public deal: Deal;

	public setChecklist(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.questionId = data["questionId"];
		this.answer = data["answer"];
		this.dealId = data["dealId"];
		this.answerText = data["answerText"];

		if(data["question"] !== undefined){
			this.question = new Question();
			this.question.setQuestion(data["question"]);
		}

		if(data["deal"] !== undefined){
			this.deal = new Deal();
			this.deal.setDeal(data["deal"]);
		}

	}
}