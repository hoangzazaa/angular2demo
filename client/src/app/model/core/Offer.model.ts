/**
 * Contain offer info 
 * @author vupt
 */

import {DealProduct} from "./DealProduct.model";
import {ProductOutput} from "./ProductOutput.model";
import {BaseModel} from "./BaseModel.model";

export class Offer extends BaseModel{

	/* dealProductId */
	public dealProductId: number;

	/* unitPrice */
	public unitPrice: number;

	/* total */
	public total: number;

	/* profitRate */
	public profitRate: number;

	/* productOutputId */
	public productOutputId: number;

	/* dealProductRsOffer */
	public dealProduct: DealProduct;

	/* productOutputRsOffer */
	public productOutput: ProductOutput;

	public setOffer(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.dealProductId = data["dealProductId"];
		this.unitPrice = data["unitPrice"];
		this.total = data["total"];
		this.profitRate = data["profitRate"];
		this.productOutputId = data["productOutputId"];

		if(data["dealProduct"] !== undefined){
			this.dealProduct = new DealProduct();
			this.dealProduct.setDealProduct(data["dealProduct"]);
		}

		if(data["productOutput"] !== undefined){
			this.productOutput = new ProductOutput();
			this.productOutput.setProductOutput(data["productOutput"]);
		}

	}
}