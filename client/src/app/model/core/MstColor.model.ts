/**
 * Contain color master data used for simulation
 * @author vupt
 */

import {BaseModel} from "./BaseModel.model";

export class MstColor extends BaseModel {

    /* 色数 */
    public colorOption: number;

    /* 基本料 */
    public basicCost: number;

    /* 通工賃 */
    public throughWage: number;

    /* 一律 */
    public costPerPacket: number;

    /* 通し工賃分岐 */
    public throughWageBranch: number;

    public productType: number;

    public throughNumber: number;

    public setMstColor(data: any) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.colorOption = data["colorOption"];
        this.basicCost = data["basicCost"];
        this.throughWage = data["throughWage"];
        this.costPerPacket = data["costPerPacket"];
        this.throughWageBranch = data["throughWageBranch"];
        this.productType = data["productType"];
        this.throughNumber = data["throughNumber"];
    }
}