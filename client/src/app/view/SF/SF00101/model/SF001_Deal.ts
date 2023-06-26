import {Activity} from "../../../../component/activity/model/activity.model";
import {BaseModel} from "../../../../model/core/BaseModel.model";
import {ProductInfoModel} from "../../COMMON/productinfo/model/ProductInfo.model";

/**
 * Created by ASUS on 6/5/2017.
 */
export class DealModel extends BaseModel {
    public dealName: string;

    public customerName: string;

    public saleName: string;

    public dealCode: string;

    public dealType: number;

    public estTotalDeal: number;

    public deliveryDate: Date;

    public dealStatus: number;

    public images: string[];

    public isInMybox: boolean;

    public selectedProductId: number;

    public invoiceDate: Date;

    public products: ProductInfoModel[];

    /* deal activity list */
    activity: Activity = new Activity();

    isEdit: boolean;
}