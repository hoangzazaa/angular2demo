import {BaseModel} from "../../../../model/core/BaseModel.model";
/**
 * Created by hoangtd on 4/14/2017.
 */
export class OrderItemModel extends BaseModel {
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

    public setOrderItem(data: any) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
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

    }
}