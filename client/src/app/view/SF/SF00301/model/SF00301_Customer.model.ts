import {BaseModel} from "../../../../model/core/BaseModel.model";

export class SF00301_Customer extends BaseModel {
    /* 得意先名 */
    public customerName: string;

    /* customerCode */
    public customerCode: string;

    public setCustomer(data: any) {
        if (!data)
            return;

        //set basic info & binding value to properties
        this.setData(data);

        this.customerName = data["customerName"];
        this.customerCode = data["customerCode"];
    }
}
