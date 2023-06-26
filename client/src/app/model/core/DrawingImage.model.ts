/**
 * Contain drawing image used for SF008 
 * @author vupt
 */

import {Product} from "./Product.model";
import {BaseModel} from "./BaseModel.model";

export class DrawingImage extends BaseModel{

	/* productId */
	public productId: number;

	/* x */
	public x: number;

	/* y */
	public y: number;

	/* rotate */
	public rotate: number;

	/* productRsDrawingImage */
	public product: Product;

	public setDrawingImage(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.productId = data["productId"];
		this.x = data["x"];
		this.y = data["y"];
		this.rotate = data["rotate"];

		if(data["product"] !== undefined){
			this.product = new Product();
			this.product.setProduct(data["product"]);
		}

	}
}