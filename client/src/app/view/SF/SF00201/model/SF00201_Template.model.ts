import {BaseModel} from "../../../../model/core/BaseModel.model";
import {SF00201_Product} from "./SF00201_Product.model";
export class SF00201_Template extends BaseModel {

    public dealCode: string;

    /* 案件名 */
    public dealName: string;

    /* dealRsDealProduct */
    public product: SF00201_Product;

    /* loved */
    public isInMybox: boolean;

}
