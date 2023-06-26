import {Constants} from "../../../../helper/constants";
import {FACTORY, PAPER, PRINT_METHOD, SURFACE_TREATMENT} from "../../../../helper/mst-data-type";
import {BaseModel} from "../../../../model/core/BaseModel.model";
import {MstPaper} from "../../../../model/core/MstPaper.model";
import DataUtil from "../../../../util/data-util";
import {FormatUtil} from "../../../../util/format-util";
import {MstLamination} from "./MstLamination.model";

/**
 * The common product model based on product entity.
 * @author manhnv
 */
export class ProductModel extends BaseModel {
    productName: string;
    productType: number;
    productCode: string;
    sizeH: number;
    sizeD: number;
    sizeW: number;
    memo1: string;
    memo2: string;
    memo3: string;
    paperNameId: number;
    paperWeight: number;
    paperSizeH: number;
    paperSizeW: number;
    cutPaperSizeH: number;
    cutPaperSizeW: number;
    blankPaperSizeH: number;
    blankPaperSizeW: number;
    impositionNumber: number;

    woodenCode: string;
    woodenExpiredDate: Date;
    customerProductCode: string;

    colorIdF: number;
    colorFSelect: number;
    specialColorF: number;

    colorIdB: number;
    colorBSelect: number;
    specialColorB: number;

    factoryId: number;
    shapeId: number;
    printMethod: number;

    surfaceTreatmentIdF: number;
    surfaceTreatmentIdB: number;

    cartonShippingType: number;

    laminationFlute: number;
    laminationPaperTypeBack: number;
    laminationPaperTypeMedium: number;
    laminationPaperTypeA: number;
    laminationPaperTypeB: number;
    laminationABasicWeight: number;
    laminationBBasicWeight: number;
    laminationPaperTypeFront: number;
    laminationFrontBasicWeight: number;
    laminationMediumBasicWeight: number;
    laminationBackBasicWeight: number;

    laminationAId: number;
    laminationBId: number;
    laminationFrontId: number;
    laminationBackId: number;
    laminationMediumId: number;
    requestDesignFlag: number;
    requestLot: number;

    srcImg: string;
    estimatedUnitPrice: number;
    quantityStock: number;
    lot: number;

    originalName: string;
    memo: string;
    unitPrice: number;
    totalCost: number;
    requestProduction: number;

    paper: MstPaper = new MstPaper();

    public setData(data: any): any {
        if (!!data) {
            super.setData(data);

            this.productName = data["productName"];
            this.productType = data["productType"];
            this.productCode = data["productCode"];
            this.sizeH = data["sizeH"];
            this.sizeD = data["sizeD"];
            this.sizeW = data["sizeW"];

            this.memo1 = data["memo1"];
            this.memo2 = data["memo2"];
            this.memo3 = data["memo3"];

            this.paperNameId = data["paperNameId"];
            this.paperWeight = data["paperWeight"];

            this.paperSizeH = data["paperSizeH"];
            this.paperSizeW = data["paperSizeW"];
            this.cutPaperSizeH = data["cutPaperSizeH"];
            this.cutPaperSizeW = data["cutPaperSizeW"];
            this.blankPaperSizeH = data["blankPaperSizeH"];
            this.blankPaperSizeW = data["blankPaperSizeW"];
            this.woodenCode = data["woodenCode"];
            this.woodenExpiredDate = data["woodenExpiredDate"];
            this.customerProductCode = data["customerProductCode"];
            this.impositionNumber = data["impositionNumber"];
            this.colorIdF = data["colorIdF"];
            this.colorFSelect = data["colorFSelect"];
            this.specialColorF = data["specialColorF"];
            this.colorIdB = data["colorIdB"];
            this.colorBSelect = data["colorBSelect"];
            this.specialColorB = data["specialColorB"];

            this.factoryId = data["factoryId"];
            this.shapeId = data["shapeId"];
            this.printMethod = data["printMethod"];

            this.surfaceTreatmentIdF = data["surfaceTreatmentIdF"];
            this.surfaceTreatmentIdB = data["surfaceTreatmentIdB"];
            this.cartonShippingType = data["cartonShippingType"];
            this.laminationFlute = data["laminationFlute"];
            this.laminationPaperTypeBack = data["laminationPaperTypeBack"];
            this.laminationPaperTypeMedium = data["laminationPaperTypeMedium"];

            this.laminationPaperTypeA = data["laminationPaperTypeA"];
            this.laminationPaperTypeB = data["laminationPaperTypeB"];
            this.laminationABasicWeight = data["laminationABasicWeight"];
            this.laminationBBasicWeight = data["laminationBBasicWeight"];

            this.laminationPaperTypeFront = data["laminationPaperTypeFront"];
            this.laminationFrontBasicWeight = data["laminationFrontBasicWeight"];
            this.laminationMediumBasicWeight = data["laminationMediumBasicWeight"];
            this.laminationBackBasicWeight = data["laminationBackBasicWeight"];

            this.laminationAId = data["laminationAId"];
            this.laminationBId = data["laminationBId"];
            this.laminationFrontId = data["laminationFrontId"];
            this.laminationBackId = data["laminationBackId"];
            this.laminationMediumId = data["laminationMediumId"];

            this.requestDesignFlag = data["requestDesignFlag"];
            this.requestLot = data["requestLot"];
            this.srcImg = data["srcImg"];
            this.estimatedUnitPrice = data["estimatedUnitPrice"];
            this.quantityStock = data["quantityStock"];
            this.lot = data["lot"];

            this.originalName = data["originalName"];
            this.memo = data["memo"];
            this.unitPrice = data["unitPrice"];
            this.totalCost = data["totalCost"];
            this.requestProduction = data["requestProduction"];

            this.paper = new MstPaper();
            if (!!data["paper"]) {
                this.paper.setMstPaper(data["paper"]);
            }
        }
    }

    /**
     * Get product's dimension.
     * @return {string|string|string}
     */
    getDimension(): string {
        //#2519
        if (this.productType == 0 && this.shapeId == 98) {
            // My pham ->  paperSizeW + paperSizeH
            return FormatUtil.formatDimension(Constants.X_SEPARATOR, this.paperSizeW, this.paperSizeH);
        } else if(this.productType ==1 && this.cartonShippingType==1){
            return FormatUtil.formatDimension(Constants.X_SEPARATOR, this.blankPaperSizeW, this.blankPaperSizeH);
        }

        return FormatUtil.formatDimension(Constants.X_SEPARATOR, this.sizeW, this.sizeD, this.sizeH);
    }

    /**
     * Get product's paper.
     * @see http://fridaynight.vnext.vn/issues/2462
     * @return {string}
     */
    getPaperName(laminations: MstLamination[]): string {
        return FormatUtil.getPaperName(this, laminations);
    }

    getColor(): string {
        return FormatUtil.formatColorsViaPrintMethod(this);
    }

    getImposition(): string {
        if (this.impositionNumber != undefined)
            return this.impositionNumber + Constants.IMPOSITION_SIGN;

        return null;
    }

    getSurfaceTreatment(side?: number): string {
        if (side == undefined)
            return DataUtil.getData(SURFACE_TREATMENT, null, this.surfaceTreatmentIdF);

        return DataUtil.getData(SURFACE_TREATMENT, null, this.surfaceTreatmentIdB);
    }

    getPrintMethod(): string {
        if (this.printMethod != undefined)
            return DataUtil.getData(PRINT_METHOD, null, this.printMethod);

        return null;
    }

    getProductDescription(laminations: MstLamination[]): string {
        return FormatUtil.formatProductDescription(this, laminations);
    }

    getFactory(): string {
        return DataUtil.getData(FACTORY, null, this.factoryId);
    }

    /* material's product format as 'paperNameId-paperWeight'*/
    material(laminations: MstLamination[]): string {
            return FormatUtil.getPaperName(this, laminations);
    }

}