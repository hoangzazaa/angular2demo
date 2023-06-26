import {BaseModel} from "./BaseModel.model";

export class MstLamination extends BaseModel {
    public paperName: string;
    public weight: number;
    public paperMaterialCode: string;
    public paperCode: string;
    public commonFlag: number;
    public abbr: string;
    public sagaNormValue: number;
    public sagaHeadValue: number;
    public onoNormValue: number;
    public onoHeadValue: number;
    public takuNormValue: number;
    public takuHeadValue: number;
    public materialName: string;
    public paperId: number;

    public setMstLamination(data: any) {
        this.id                = data["id"];
        this.createdUser       = data["createdUser"];
        this.updatedUser       = data["updatedUser"];
        this.createdDate       = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate       = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.paperName         = data["paperName"];
        this.weight            = data["weight"];
        this.paperMaterialCode = data["paperMaterialCode"];
        this.paperCode         = data["paperCode"];
        this.commonFlag        = data["commonFlag"];
        this.abbr              = data["abbr"];
        this.sagaNormValue     = data["sagaNormValue"];
        this.sagaHeadValue     = data["sagaHeadValue"];
        this.onoNormValue      = data["onoNormValue"];
        this.onoHeadValue      = data["onoHeadValue"];
        this.takuNormValue     = data["takuNormValue"];
        this.takuHeadValue     = data["takuHeadValue"];
        this.materialName      = data["materialName"];
        this.paperId           = data["paperId"];
    }

}
