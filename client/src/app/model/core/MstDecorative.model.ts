/**
 * Created by admin on 3/19/2017.
 */
import {BaseModel} from "./BaseModel.model";

export class MstDecorative extends BaseModel{
    public throughNumber: number;

    public lossPercent: number;

    public stepWage: number;

    public throughWage: number;

    public laminationType: number;

    public fare: number;

    public setMstDecorative(data: any){
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
        this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
        this.throughNumber = data["throughNumber"];
        this.lossPercent = data["lossPercent"];
        this.throughWage = data["throughWage"];
        this.stepWage = data["stepWage"];
        this.fare = data["fare"];

    }
}