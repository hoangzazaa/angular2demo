import {BaseModel} from "../../../../model/core/BaseModel.model";
/**
 * Created by ASUS on 6/22/2017.
 */
export class MstPaper extends BaseModel {
    paperName: string;
    weight: number;
    paperMaterialCode: string;
    paperCode: string;
    commonFlag: number;
    abbr: string;
    sagaNormValue: number;
    sagaHeadValue: number;
    onoNormValue: number;
    onoHeadValue: number;
    takuNormValue: number;
    takuHeadValue: number;
    wastePaperFlag: number;
    specialSizeFlag: number;
    materialName: string;
    paperId: number;
    name: string;
    public setData(data: any) {
        if (!!data) {
            super.setData(data);
            this.name              = data["name"];
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
            this.wastePaperFlag    = data["wastePaperFlag"];
            this.specialSizeFlag   = data["specialSizeFlag"];
            this.materialName      = data["materialName"];
            this.paperId           = data["paperId"];
        }
    }
}