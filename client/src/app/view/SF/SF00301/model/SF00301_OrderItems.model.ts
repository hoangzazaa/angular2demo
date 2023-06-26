import {BaseModel} from "../../../../model/core/BaseModel.model";

export class SF00301_OrderItem extends BaseModel {
    /*productId*/
    public productId: number;
    /*quantity*/
    public quantity: number;
    /*submittedPrice*/
    public submittedPrice: number;
    /*total*/
    public total: number;

    public setOrderItem(data: any) {
        if (!data)
            return;

        //set basic info & binding value to properties
        this.setData(data);
        this.productId = data["productId"];
        this.quantity = data["quantity"];
        this.submittedPrice = data["submittedPrice"];
        this.total = data["total"];
    }
}
