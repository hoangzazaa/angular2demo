import {BaseModel} from "./BaseModel.model";
/**
 * Created by VuPT on 5/11/2017.
 */
export class MstCarton extends BaseModel{
    public cartonLong: number;
    public cartonShort: number;
    public shippingType: number;
    public shippingLoss: number;
    public pasteWage: number;
    public shipFare: number;

    public setMstCarton(data:any){
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
        this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
        this.cartonLong = data["cartonLong"];
        this.cartonShort = data["cartonShort"];
        this.shippingType = data["shippingType"];
        this.shippingLoss = data["shippingLoss"];
        this.pasteWage = data["pasteWage"];
        this.shipFare = data["shipFare"];
    }
}