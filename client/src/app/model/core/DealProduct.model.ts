/**
 * Contain deal products in deal. 
 * @author vupt
 */

import {Deal} from "./Deal.model";
import {Product} from "./Product.model";
import {QuotationItem} from "./QuotationItem.model";
import {Offer} from "./Offer.model";
import {BaseModel} from "./BaseModel.model";

export class DealProduct extends BaseModel{

	/* dealId */
	public dealId: number;

	/* productId */
	public productId: number;

	/* highlightFlag */
	public highlightFlag: number;

	/* type */
	public type: number;

	/* dealRsDealProduct */
	public deal: Deal;

	/* productRsDealProduct */
	public product: Product;

	/* dealProductRsQuotationItem */
	public quotationItems: QuotationItem[];

	/* dealProductRsOffer */
	public offers: Offer[];

	public setDealProduct(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.dealId = data["dealId"];
		this.productId = data["productId"];
		this.highlightFlag = data["highlightFlag"];
		this.type = data["type"];

		if(data["deal"] !== undefined){
			this.deal = new Deal();
			this.deal.setDeal(data["deal"]);
		}

		if(data["product"] !== undefined){
			this.product = new Product();
			this.product.setProduct(data["product"]);
		}

		if(data["quotationItems"] !== undefined){
			this.quotationItems=[];
			for (var i = 0; i < data["quotationItems"].length; i++) {
				let tmp = new QuotationItem();
				tmp.setQuotationItem(data["quotationItems"][i]);
				this.quotationItems.push(tmp);
			}
		}
		if(data["offers"] !== undefined){
			this.offers=[];
			for (var i = 0; i < data["offers"].length; i++) {
				let tmp = new Offer();
				tmp.setOffer(data["offers"][i]);
				this.offers.push(tmp);
			}
		}
	}
}