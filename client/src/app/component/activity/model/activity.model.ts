import {Constants} from "../../../helper/constants";
import {BaseModel} from "../../../model/core/BaseModel.model";

export class Activity extends BaseModel {
    /* 活動状況 */
    public value: string;

    /* userId */
    public userId: number;

    /* dealId */
    public dealId: number;

    /* userRsComment */
    public username: string;

    public setComment(data: any) {
        if (!data)
            return;

        //set basic info & binding value to properties
        this.setData(data);

        this.value = data["value"];
        this.userId = data["userId"];
        this.dealId = data["dealId"];
        this.username = (data["departmentName"] == undefined ? '' : data["departmentName"] + Constants.SLASH_JP) + data["username"];
    }
}
