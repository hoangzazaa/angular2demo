import {BaseModel} from "../../../../model/core/BaseModel.model";
export class ShippingInstructionModel extends BaseModel {

    public productId: number;

    public productCode: string;

    public productName: string;

    public loadingAddressId: number;

    public quantity: number;

    public submittedPrice: number;

    public shipDate: Date;

    public defaultShipDate: Date;

    public shippingCompanyId: number;

    public shipTime: number;

    public limitQuantity: number;

    public memo: string;

    public setShipdate(date: Date) {
        this.shipDate = date;
    }
}
