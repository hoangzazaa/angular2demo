import {ProductInfoModel} from "../../COMMON/productinfo/model/ProductInfo.model";
/**
 * Deal model for SF00501
 */
export class DealModel {
    dealId: string;
    dealName: string;
    updatedDate: Date;
    customerName: string;
    saleName: string;
    dealType: number;
    estTotalDeal: number;
    deliveryDate: Date;
    dealStatus: number;
    productIds: number [] = [];
    selectedProductId: number;

    orderItems: OrderItemModel[];
    products: ProductInfoModel[];
    closedFlag: number;

    get isClosed(): boolean {
        return !!this.closedFlag;
    }

}

export class OrderItemModel {
    productId: number;
    updatedDate: Date;
    quantity: number;
    submittedPrice: number;
    total: number;
}