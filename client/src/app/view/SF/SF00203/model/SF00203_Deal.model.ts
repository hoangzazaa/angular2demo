import {BaseModel} from "../../../../model/core/BaseModel.model";
import {SF00203_Product} from "./SF00203_Product.model";
import {SF00203_OrderItem} from "./SF00203_OrderItems.model";
export class SF00203_Deal extends BaseModel {

    public dealName: string;

    public customerName: string;

    public saleName: string;

    public dealCode: string;

    public dealType: number;

    public estTotalDeal: number;

    public deliveryDate: Date;

    public dealStatus: number;

    public images: string[];

    public products: SF00203_Product[];

    public orderItems: SF00203_OrderItem[];

    public isInMybox: boolean;

    public templateFlag: number;
}
