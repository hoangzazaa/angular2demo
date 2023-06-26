import {BaseModel} from "../../../../model/core/BaseModel.model";
import {MstPaper} from "../../../../model/core/MstPaper.model";
/**
 * Created by ASUS on 6/5/2017.
 */
export class ProductModel extends BaseModel {

    /* 製品名 */
    public productName: string;

    /* 製品種類 */
    public productType: number;

    /* productCode */
    public productCode: string;

    /* 仕様 */
    public specs: string;

    /* 用途 */
    public application: string;

    /* メモ */
    public memo1: string;

    /* 製品寸法 Height */
    public sizeH: number;

    /* 製品寸法 Depth */
    public sizeD: number;

    /* 製品寸法 Width */
    public sizeW: number;

    /* 原紙名 */
    public paperNameId: number;

    /* 坪量 */
    public paperWeight: number;

    /* 原紙サイズ Height */
    public paperSizeH: number;

    /* 原紙サイズ Width */
    public paperSizeW: number;

    /* 断裁サイズ Height */
    public cutPaperSizeH: number;

    /* 断裁サイズ Width */
    public cutPaperSizeW: number;

    /* ブランクサイズ Height */
    public blankPaperSizeH: number;

    /* ブランクサイズ Width */
    public blankPaperSizeW: number;

    /* 原紙 ID */
    public paperId: number;

    /* 取数 */
    public takenNumber: number;

    /* 面付数 */
    public impositionNumber: number;

    /* 色（オモテ） */
    public colorFSelect: number;

    /* 色（ウラ） */
    public colorBSelect: number;

    /* 色（オモテ）特色数 */
    public specialColorF: number;

    /* 色（ウラ）特色数 */
    public specialColorB: number;

    public colorBText: string;

    /* 印刷方法 */
    public printMethod: number;

    /* 色（オモテ）ID */
    public colorIdF: number;

    /* 色（ウラ）ID */
    public colorIdB: number;

    /* 表面加工 Front */
    public surfaceTreatmentIdF: number;

    /* 表面加工 Back */
    public surfaceTreatmentIdB: number;

    /* エンボス加工 */
    public embossingID: number;

    /* フルート */
    public laminationFlute: number;

    /* 中芯　坪量 */
    public laminationMediumBasicWeight: number;

    /* 中芯　ｋ＠ */
    public laminationMediumThroughWage: number;

    /* 裏ライナ　坪量 */
    public laminationBackBasicWeight: number;

    /* 裏ライナ　ｋ＠ */
    public laminationBackThroughWage: number;

    /* 片段取数 */
    public laminationNumber: number;

    /* 紙幅 */
    public laminationWidth: number;

    /* 断裁流れ */
    public laminationCuttingFlow: number;

    /* 打抜ID */
    public dieCuttingId: number;

    /* 打抜種類 */
    public dieCuttingThroughNumber: number;

    /* 打抜面付数 */
    public dieCuttingWeight: number;

    /* 箔押し */
    public stampingId: number;

    /* 加工種類 */
    public stampingProcessingType: number;

    /* 箔押し Width 1 */
    public stampingSizeW1: number;

    /* 箔押し Width 2 */
    public stampingSizeW2: number;

    /* 箔押し Width 3 */
    public stampingSizeW3: number;

    /* 箔押し Width 4 */
    public stampingSizeW4: number;

    /* 箔押し Height 1 */
    public stampingSizeH1: number;

    /* 箔押し Height 2 */
    public stampingSizeH2: number;

    /* 箔押し Height 3 */
    public stampingSizeH3: number;

    /* 箔押し Height 4 */
    public stampingSizeH4: number;

    /* 窓枠 ID */
    public windowId: number;

    /* 窓枠寸法_縦 */
    public windowSizeH: number;

    /* 窓枠寸法_横 */
    public windowSizeW: number;

    /* 貼り ID */
    public pasteId: number;

    /* 貼り形態 */
    public pasteForm: number;

    /* 梱包 */
    public packingId: number;

    /* 検品 */
    public inspectionId: number;

    /* 木型NO */
    public woodenId: number;

    /* woodenCode */
    public woodenCode: string;

    /* フィルムNo */
    public filmCode: string;

    /* 得意先製品番号 */
    public customerProductCode: string;

    /* 製造依頼元 */
    public factoryId: number;

    /* memo2 */
    public memo2: string;

    /* memo3 */
    public memo3: string;

    /* pasteSpecialFormFlag */
    public pasteSpecialFormFlag: number;

    /* deliveryDistance */
    public deliveryDistance: number;

    /* otherExpense1 */
    public otherExpense1: string;

    /* otherWage1 */
    public otherWage1: number;

    /* otherUnitType1 */
    public otherUnitType1: number;

    /* otherExpense2 */
    public otherExpense2: string;

    /* otherWage2 */
    public otherWage2: number;

    /* otherUnitType2 */
    public otherUnitType2: number;

    /* otherExpense3 */
    public otherExpense3: string;

    /* otherWage3 */
    public otherWage3: number;

    /* otherUnitType3 */
    public otherUnitType3: number;

    /* shippingCostId */
    public shippingCostId: number;

    /* stampingPointsNumber */
    public stampingPointsNumber: number;

    /* shapeId */
    public shapeId: number;

    /* sheetSizeId */
    public sheetSizeId: number;

    /* sheetSizeWidth */
    public sheetSizeWidth: number;

    /* sheetSizeHeight */
    public sheetSizeHeight: number;

    /* sheetSizeGrain */
    public sheetSizeGrain: number;

    /* upperFlap */
    public upperFlap: number;

    /* insertion */
    public insertion: number;

    /* grain */
    public grain: number;

    /* developmentWidth */
    public developmentWidth: number;

    /* developmentHeight */
    public developmentHeight: number;

    /* groove */
    public groove: number;

    /* colorFText1 */
    public colorFText1: string;
    /* colorFText2 */
    public colorFText2: string;
    /* colorFText3 */
    public colorFText3: string;


    /* itemCode */
    public itemCode: string;

    /* specialSizeFlag */
    public specialSizeFlag: number;

    /* specialDieCuttingNumberFlag */
    public specialDieCuttingNumberFlag: number;

    /* laminationPaperType */
    public laminationPaperTypeBack: number;

    /* laminationPaperType */
    public laminationPaperTypeMedium: number;

    /* paperHeadApprovalFlag */
    public paperHeadApprovalFlag: number;

    /*surfaceF_varnishType*/
    public surfaceF_varnishType: number;

    public laminationFrontBasicWeight: number;

    public laminationFrontThroughWage: number;

    public laminationPaperTypeFront: number;

    public laminationABasicWeight: number;

    public laminationAThroughWage: number;

    public laminationPaperTypeA: number;

    public laminationBBasicWeight: number;

    public laminationBThroughWage: number;

    public laminationPaperTypeB: number;

    public cartonShippingType: number;
    public cartonTapeCutting: number;
    public cartonLinerCutting: number;
    public handProcessingFlag: number;
    public waterRepellentFlag: number;
    public copyType: number;
    public bindingMethod: number;
    public handPosition:number;
    public specialUpperFlapFlag: number;
    public lowerFlap: number;
    public specialLowerFlapFlag: number;

    public embossingCode: string;

    public requestDesignFlag: number;

    public bindingNumber: number;
    public stringColor: number;
    public stringNumber: number;
    public handType: number;
    public handSize: number;
    public otherMethod1: number;
    public otherMethod2: number;
    public otherNote1: string;
    public otherNote2: string;
    public otherNote3: string;
    public specialNote1Flag: number;

    /* paperRsProduct */
    public paper: MstPaper;

    public setProduct(data: any) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.productName = data["productName"];
        this.productType = data["productType"];
        this.productCode = data["productCode"];
        this.specs = data["specs"];
        this.application = data["application"];
        this.memo1 = data["memo1"];
        this.memo2 = data["memo2"];
        this.memo3 = data["memo3"];
        this.sizeH = data["sizeH"];
        this.sizeD = data["sizeD"];
        this.sizeW = data["sizeW"];
        this.paperNameId = data["paperNameId"];
        this.paperWeight = data["paperWeight"];
        this.paperSizeH = data["paperSizeH"];
        this.paperSizeW = data["paperSizeW"];
        this.cutPaperSizeH = data["cutPaperSizeH"];
        this.cutPaperSizeW = data["cutPaperSizeW"];
        this.blankPaperSizeH = data["blankPaperSizeH"];
        this.blankPaperSizeW = data["blankPaperSizeW"];
        this.paperId = data["paperId"];
        this.takenNumber = data["takenNumber"];
        this.impositionNumber = data["impositionNumber"];
        this.colorFSelect = data["colorFSelect"];
        this.colorBSelect = data["colorBSelect"];
        this.specialColorF = data["specialColorF"];
        this.specialColorB = data["specialColorB"];
        this.printMethod = data["printMethod"];
        this.colorIdF = data["colorIdF"];
        this.colorIdB = data["colorIdB"];
        this.surfaceTreatmentIdF = data["surfaceTreatmentIdF"];
        this.surfaceTreatmentIdB = data["surfaceTreatmentIdB"];
        this.embossingID = data["embossingID"];
        this.laminationFlute = data["laminationFlute"];
        this.laminationMediumBasicWeight = data["laminationMediumBasicWeight"];
        this.laminationMediumThroughWage = data["laminationMediumThroughWage"];
        this.laminationBackBasicWeight = data["laminationBackBasicWeight"];
        this.laminationBackThroughWage = data["laminationBackThroughWage"];
        this.laminationNumber = data["laminationNumber"];
        this.laminationWidth = data["laminationWidth"];
        this.laminationCuttingFlow = data["laminationCuttingFlow"];
        this.dieCuttingId = data["dieCuttingId"];
        this.dieCuttingThroughNumber = data["dieCuttingThroughNumber"];
        this.dieCuttingWeight = data["dieCuttingWeight"];
        this.stampingId = data["stampingId"];
        this.stampingProcessingType = data["stampingProcessingType"];
        this.stampingSizeW1 = data["stampingSizeW1"];
        this.stampingSizeW2 = data["stampingSizeW2"];
        this.stampingSizeW3 = data["stampingSizeW3"];
        this.stampingSizeW4 = data["stampingSizeW4"];
        this.stampingSizeH1 = data["stampingSizeH1"];
        this.stampingSizeH2 = data["stampingSizeH2"];
        this.stampingSizeH3 = data["stampingSizeH3"];
        this.stampingSizeH4 = data["stampingSizeH4"];
        this.windowId = data["windowId"];
        this.windowSizeH = data["windowSizeH"];
        this.windowSizeW = data["windowSizeW"];
        this.pasteId = data["pasteId"];
        this.pasteForm = data["pasteForm"];
        this.packingId = data["packingId"];
        this.inspectionId = data["inspectionId"];
        this.woodenId = data["woodenId"];
        this.woodenCode = data["woodenCode"];
        this.filmCode = data["filmCode"];
        this.customerProductCode = data["customerProductCode"];
        this.factoryId = data["factoryId"];
        this.pasteSpecialFormFlag = data["pasteSpecialFormFlag"];
        this.deliveryDistance = data["deliveryDistance"];
        this.otherExpense1 = data["otherExpense1"];
        this.otherWage1 = data["otherWage1"];
        this.otherUnitType1 = data["otherUnitType1"];
        this.otherExpense2 = data["otherExpense2"];
        this.otherWage2 = data["otherWage2"];
        this.otherUnitType2 = data["otherUnitType2"];
        this.otherExpense3 = data["otherExpense3"];
        this.otherWage3 = data["otherWage3"];
        this.otherUnitType3 = data["otherUnitType3"];
        this.shippingCostId = data["shippingCostId"];
        this.stampingPointsNumber = data["stampingPointsNumber"];
        this.shapeId = data["shapeId"];
        this.sheetSizeId = data["sheetSizeId"];
        this.sheetSizeWidth = data["sheetSizeWidth"];
        this.sheetSizeHeight = data["sheetSizeHeight"];
        this.sheetSizeGrain = data["sheetSizeGrain"];
        this.upperFlap = data["upperFlap"];
        this.insertion = data["insertion"];
        this.grain = data["grain"];
        this.developmentWidth = data["developmentWidth"];
        this.developmentHeight = data["developmentHeight"];
        this.groove = data["groove"];
        this.colorFText1 = data["colorFText1"];
        this.colorFText2 = data["colorFText2"];
        this.colorFText3 = data["colorFText3"];
        this.colorBText = data["colorBText"];
        this.itemCode = data["itemCode"];
        this.specialSizeFlag = data["specialSizeFlag"];
        this.specialDieCuttingNumberFlag = data["specialDieCuttingNumberFlag"];
        this.laminationPaperTypeBack = data["laminationPaperTypeBack"];
        this.laminationPaperTypeMedium = data["laminationPaperTypeMedium"];
        this.paperHeadApprovalFlag = data["paperHeadApprovalFlag"];
        this.surfaceF_varnishType = data["surfaceF_varnishType"];
        this.laminationPaperTypeFront = data["laminationPaperTypeFront"];
        this.laminationFrontThroughWage = data["laminationFrontThroughWage"];
        this.laminationFrontBasicWeight = data["laminationFrontBasicWeight"];
        this.laminationPaperTypeA = data["laminationPaperTypeA"];
        this.laminationAThroughWage = data["laminationAThroughWage"];
        this.laminationABasicWeight = data["laminationABasicWeight"];
        this.laminationPaperTypeB = data["laminationPaperTypeB"];
        this.laminationBThroughWage = data["laminationBThroughWage"];
        this.laminationBBasicWeight = data["laminationBBasicWeight"];
        this.cartonShippingType = data["cartonShippingType"];
        this.cartonTapeCutting = data["cartonTapeCutting"];
        this.cartonLinerCutting = data["cartonLinerCutting"];
        this.handProcessingFlag = data["handProcessingFlag"];
        this.waterRepellentFlag = data["waterRepellentFlag"];
        this.copyType = data["copyType"];
        this.embossingCode = data["embossingCode"];
        this.requestDesignFlag = data["requestDesignFlag"];
        this.bindingMethod = data["bindingMethod"];
        this.handPosition = data["handPosition"];
        this.specialUpperFlapFlag = data["specialUpperFlapFlag"];
        this.lowerFlap = data["lowerFlap"];
        this.specialLowerFlapFlag = data["specialLowerFlapFlag"];
        this.bindingNumber = data["bindingNumber"];
        this.stringColor = data["stringColor"];
        this.stringNumber = data["stringNumber"];
        this.handType = data["handType"];
        this.handSize = data["handSize"];
        this.otherMethod1 = data["otherMethod1"];
        this.otherMethod2 = data["otherMethod2"];
        this.otherNote1 = data["otherNote1"];
        this.otherNote2 = data["otherNote2"];
        this.otherNote3 = data["otherNote3"];
        this.specialNote1Flag = data["specialNote1Flag"];

        if (data["paper"] !== undefined) {
            this.paper = new MstPaper();
            this.paper.setMstPaper(data["paper"]);
        }

    }
}
