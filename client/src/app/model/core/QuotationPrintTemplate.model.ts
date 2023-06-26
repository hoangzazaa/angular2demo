/**
 * Contain quotation template to export PDF 
 * @author vupt
 */

import {Quotation} from "./Quotation.model";
import {BaseModel} from "./BaseModel.model";

export class QuotationPrintTemplate extends BaseModel{

	/* selectOption */
	public selectOption: number;

	/* path */
	public path: string;

	/* fileName */
	public fileName: string;

	/* application */
	public application: string;

	/* quotationRsQuotationTemplate */
	public quotation: Quotation[];

	public setQuotationPrintTemplate(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.selectOption = data["selectOption"];
		this.path = data["path"];
		this.fileName = data["fileName"];
		this.application = data["application"];

		if(data["quotation"] !== undefined){
			this.quotation=[];
			for (var i = 0; i < data["quotation"].length; i++) {
				let tmp = new Quotation();
				tmp.setQuotation(data["quotation"][i]);
				this.quotation.push(tmp);
			}
		}
	}
}