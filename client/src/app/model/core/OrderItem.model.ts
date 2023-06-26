/**
 * Contain information of item in order 
 * @author vupt
 */

import {Order} from "./Order.model";
import {Product} from "./Product.model";
import {LoadingAddress} from "./LoadingAddress.model";
import {BalanceOfStock} from "./BalanceOfStock.model";
import {MstShippingCompany} from "./MstShippingCompany.model";
import {BaseModel} from "./BaseModel.model";

export class OrderItem extends BaseModel{

	/* orderId */
	public orderId: number;

	/* productId */
	public productId: number;

	/* loadingAddressId */
	public loadingAddressId: number;

	/* deliveryType */
	public deliveryType: number;

	/* deliveryStatus */
	public deliveryStatus: number;

	/* quantity */
	public quantity: number;

	/* shipDate */
	public shipDate: string;

	/* shippingCompanyId */
	public shippingCompanyId: number;

	/* shipTime */
	public shipTime: string;

	/* limitQuantity */
	public limitQuantity: number;

	/* memo */
	public memo: string;

	/* orderRsOrderItem */
	public order: Order;

	/* orderItemRsProduct */
	public product: Product;

	/* orderItemRsLoadingAddress */
	public loadingAddress: LoadingAddress;

	/* orderItemRsStock */
	public balanceOfStocks: BalanceOfStock[];

	/* orderItemRsShippingCompany */
	public shippingCompany: MstShippingCompany;

	public setOrderItem(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.orderId = data["orderId"];
		this.productId = data["productId"];
		this.loadingAddressId = data["loadingAddressId"];
		this.deliveryType = data["deliveryType"];
		this.deliveryStatus = data["deliveryStatus"];
		this.quantity = data["quantity"];
		this.shipDate = data["shipDate"];
		this.shippingCompanyId = data["shippingCompanyId"];
		this.shipTime = data["shipTime"];
		this.limitQuantity = data["limitQuantity"];
		this.memo = data["memo"];

		if(data["order"] !== undefined){
			this.order = new Order();
			this.order.setOrder(data["order"]);
		}

		if(data["product"] !== undefined){
			this.product = new Product();
			this.product.setProduct(data["product"]);
		}

		if(data["loadingAddress"] !== undefined){
			this.loadingAddress = new LoadingAddress();
			this.loadingAddress.setLoadingAddress(data["loadingAddress"]);
		}

		if(data["balanceOfStocks"] !== undefined){
			this.balanceOfStocks=[];
			for (var i = 0; i < data["balanceOfStocks"].length; i++) {
				let tmp = new BalanceOfStock();
				tmp.setBalanceOfStock(data["balanceOfStocks"][i]);
				this.balanceOfStocks.push(tmp);
			}
		}
		if(data["shippingCompany"] !== undefined){
			this.shippingCompany = new MstShippingCompany();
			this.shippingCompany.setMstShippingCompany(data["shippingCompany"]);
		}

	}
}