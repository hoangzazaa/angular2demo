import {BaseModel} from "./BaseModel.model";
/**
 * Created by VuPT on 5/11/2017.
 */
export class MstCartonShipping extends BaseModel{
    public distance: number;
    public fluteType: number;
    public cost: number;

    public setMstCartonShipping(data:any){
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
        this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
        this.distance = data["distance"];
        this.fluteType = data["fluteType"];
        this.cost = data["cost"];
    }
}