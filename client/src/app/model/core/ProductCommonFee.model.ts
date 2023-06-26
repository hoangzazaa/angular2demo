/**
 * Contain information about common fees of a deal product 
 * @author vupt
 */

import {Product} from "./Product.model";
import {BaseModel} from "./BaseModel.model";

export class ProductCommonFee extends BaseModel{

	/* デザイン代 */
	public designFee: number;

	/* 製版代 */
	public plateMakingFee: number;

	/* 木型代 */
	public woodenFee: number;

	/* 金型代 */
	public moldFee: number;

	/* 樹脂版代 */
	public resinFee: number;

	/* productId */
	public productId: number;

	/* productRsProductCommonFee */
	public product: Product;

	public setProductCommonFee(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.designFee = data["designFee"];
		this.plateMakingFee = data["plateMakingFee"];
		this.woodenFee = data["woodenFee"];
		this.moldFee = data["moldFee"];
		this.resinFee = data["resinFee"];
		this.productId = data["productId"];

		if(data["product"] !== undefined){
			this.product = new Product();
			this.product.setProduct(data["product"]);
		}

	}
}