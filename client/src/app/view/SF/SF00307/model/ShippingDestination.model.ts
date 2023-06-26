import {BaseModel} from "../../../../model/core/BaseModel.model";
/**
 * Contain customer address
 * @author vupt
 */


export class ShippingDestinationModel extends BaseModel {

    deliveryName: string;
    deliveryAddress1: string;
    tel: string;
    fax: string;
    availableVehicleSize: number;
    requiredTime: string;
    extraWork: string;
    extraMethod: string;
    memo1: string;
    saveToDennoFlag: number = 0;
    customerId: number;
    districtCode: string;
    abbreviation: string;
    furigana: string;
    abbrFurigana: string;
    postalCode: string;
    deliveryAddress2: string;
    extension: string;
    timePermission: number;
    defaultFlag: number = 0;
    deptName: string;
    salerName: string;
    formNameId: number;
    dennoPartnerCode: string;

    public get selectName() {
        return ("000" + this.id).slice(-3) + "：" + this.abbreviation;
    }

    public setShippingDestination(data: any) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.deliveryName = data["deliveryName"];
        this.deliveryAddress1 = data["deliveryAddress1"];
        this.tel = data["tel"];
        this.fax = data["fax"];
        this.availableVehicleSize = data["availableVehicleSize"];
        this.requiredTime = data["requiredTime"];
        this.extraWork = data["extraWork"];
        this.extraMethod = data["extraMethod"];
        this.memo1 = !!data["memo2"] ? (data["memo1"] || "") + "\n" + (data["memo2"]) : data["memo1"] || "";
        this.saveToDennoFlag = data["saveToDennoFlag"];
        this.customerId = data["customerId"];
        this.districtCode = data["districtCode"];
        this.abbreviation = data["abbreviation"];
        this.furigana = data["furigana"];
        this.abbrFurigana = data["abbrFurigana"];
        this.postalCode = data["postalCode"];
        this.deliveryAddress2 = data["deliveryAddress2"];
        this.extension = data["extension"];
        this.timePermission = data["timePermission"];
        this.defaultFlag = data["defaultFlag"];
        this.dennoPartnerCode = data["dennoPartnerCode"];
        this.deptName = data["deptName"];
        this.salerName = data["salerName"];
        this.formNameId = data["formNameId"];
    }
}
