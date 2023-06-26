import {BaseModel} from "../../../../model/core/BaseModel.model";
import {SF00202_Product} from "./SF00202_Product.model";
import {SF00202_OrderItems} from "./SF00202_OrderItems.model";
export class SF00202_Deal extends BaseModel {

    public dealName: string;

    public customerName: string;

    public saleName: string;

    public dealCode: string;

    public dealType: number;

    public estTotalDeal: number;

    public deliveryDate: Date;

    public dealStatus: number;

    public images: string[];

    public products: SF00202_Product[];

    public orderItems: SF00202_OrderItems[];

    public isInMybox: boolean;

    public closedFlag: number;

    public selectedProductId: number;

    public isOpeningNewTab: boolean;

    get hasAtLeastOneProduct(): boolean {
        return !!this.products && this.products.length > 0;
    }

    get isClosed(): boolean {
        return !!this.closedFlag;
    }

    /**
     * Check permission to view for editing.
     * <code>
     *     1.Login-user in support department.
     *     2.Only deal in owner department.
     * </code>
     */
    isEdit: boolean;
}
