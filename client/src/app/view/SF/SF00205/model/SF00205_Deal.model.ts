import {Activity} from "../../../../component/activity/model/activity.model";
import {BaseModel} from "../../../../model/core/BaseModel.model";
import {MstLamination} from "../../COMMON/model/MstLamination.model";
import {SF00205Product} from "./SF00205_Product.model";

/**
 * Created by manhnv on 6/14/2017.
 */
export class SF00205Deal extends BaseModel {
    dealCode: string;
    dealName: string;
    dealStatus: number;
    dealType: number;
    customerName: string;
    saleName: string;
    estTotalDeal: number;
    deliveryDate: Date;
    isInMybox: boolean;
    isOpeningNewTab: boolean;

    selectedProductId: number;

    products: SF00205Product[] = [];

    laminations: MstLamination[] = [];

    /* deal activity list */
    activity: Activity = new Activity();

    /**
     * Check permission to view for editing.
     * <code>
     *     1.Login-user in support department.
     *     2.Only deal in owner department.
     * </code>
     */
    isEdit: boolean;
}