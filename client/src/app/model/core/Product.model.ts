import {BaseModel} from "./BaseModel.model";
import {DealProduct} from "./DealProduct.model";
import {DrawingImage} from "./DrawingImage.model";
/**
 * Contain product input information.
 * @author vupt
 */
import {MstColor} from "./MstColor.model";
import {MstDieCutting} from "./MstDieCutting.model";
import {MstPacking} from "./MstPacking.model";
import {MstPaper} from "./MstPaper.model";
import {MstPaste} from "./MstPaste.model";
import {MstShippingCost} from "./MstShippingCost.model";
import {MstStamping} from "./MstStamping.model";
import {MstSurfaceTreatment} from "./MstSurfaceTreatment.model";
import {MstWindow} from "./MstWindow.model";
import {MstWooden} from "./MstWooden.model";
import {ProductCommonFee} from "./ProductCommonFee.model";
import {ProductFile} from "./ProductFile.model";
import {ProductOutput} from "./ProductOutput.model";
import {Supplier} from "./Supplier.model";

/**
 * 製品
 */
export class Product extends BaseModel {

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

    /** 取数 */
    public takenNumber: number;

    /** 面付数 */
    public impositionNumber: number;

    /* 色（オモテ） */
    public colorFSelect: number;

    /* 色（ウラ） */
    public colorBSelect: number;

    /* 色（オモテ）特色数 */
    public specialColorF: number;

    /* 色（ウラ）特色数 */
    public specialColorB: number;

    public colorBText1: string;
    public colorBText2: string;
    public colorBText3: string;
    public colorBText4: string;

    public colorFText1: string;
    public colorFText2: string;
    public colorFText3: string;
    public colorFText4: string;
    public colorFText5: string;
    public colorFText6: string;
    public colorFText7: string;
    public colorFText8: string;

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

    /* 打抜種類   (A式以外段ボールでは打抜面付数)  FIXME: 要調査 */
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

    /* woodenCode 2*/
    public woodenCode2: string;

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
    public handPosition: number;
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

    public laminationAId: number;
    public laminationBId: number;
    public laminationFrontId: number;
    public laminationBackId: number;
    public laminationMediumId: number;
    public requiredAdditionalWork: number;

    /* colorFRsProduct */
    public colorF: MstColor;

    /* colorBRsProduct */
    public colorB: MstColor;

    /* packingRsProduct */
    public packing: MstPacking;

    /* paperRsProduct */
    public paper: MstPaper;

    /* pasteRsProduct */
    public paste: MstPaste;

    /* stampingRsProduct */
    public stamping: MstStamping;

    /* dieCuttingRsProduct */
    public dieCutting: MstDieCutting;

    /* surfaceTreatmentFRsProduct */
    public surfaceF: MstSurfaceTreatment;

    /* surfaceTreatmentBRsProduct */
    public surfaceB: MstSurfaceTreatment;

    /* windowRsProduct */
    public window: MstWindow;

    /* productRsDealProduct */
    public dealProducts: DealProduct[];

    /* woodenRsProduct */
    public wooden: MstWooden;

    /* productRsProductFiles */
    public productFiles: ProductFile[];

    /* productRsProductOutput */
    public productOutputs: ProductOutput[];

    /* productRsProductCommonFee */
    public productCommon: ProductCommonFee;

    /* productRsShippingCost */
    public shippingCost: MstShippingCost;

    /* productRsDrawingImage */
    public drawingImages: DrawingImage[];

    public supplier: Supplier;

    public denno: number = 0;

    public sampleNo: string;
    public foilColor1: string;
    public foilColor2: string;
    public foilColor3: string;
    public packingInputNumber: string;
    public passageNo: string;
    public packingNote: string;
    public dieCuttingFlag: number;
    public stampingNumber: number;

    public shareWoodenFlag1: number;
    public shareWoodenFlag2: number;

    /** バーコード1区分値 */
    public specsBarcodeK1: string;
    /** バーコード2区分値 */
    public specsBarcodeK2: string;
    /** バーコード3区分値 */
    public specsBarcodeK3: string;
    /** バーコード1値 */
    public specsBarcode1: string;
    /** バーコード2値 */
    public specsBarcode2: string;
    /** バーコード3値 */
    public specsBarcode3: string;


    public setProduct(data: any) {
        this.id                          = data["id"];
        this.createdUser                 = data["createdUser"];
        this.updatedUser                 = data["updatedUser"];
        this.createdDate                 = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate                 = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.productName                 = data["productName"];
        this.productType                 = data["productType"];
        this.productCode                 = data["productCode"];
        this.specs                       = data["specs"];
        this.application                 = data["application"];
        this.memo1                       = data["memo1"];
        this.memo2                       = data["memo2"];
        this.memo3                       = data["memo3"];
        this.sizeH                       = data["sizeH"];
        this.sizeD                       = data["sizeD"];
        this.sizeW                       = data["sizeW"];
        this.paperNameId                 = data["paperNameId"];
        this.paperWeight                 = data["paperWeight"];
        this.paperSizeH                  = data["paperSizeH"];
        this.paperSizeW                  = data["paperSizeW"];
        this.cutPaperSizeH               = data["cutPaperSizeH"];
        this.cutPaperSizeW               = data["cutPaperSizeW"];
        this.blankPaperSizeH             = data["blankPaperSizeH"];
        this.blankPaperSizeW             = data["blankPaperSizeW"];
        this.paperId                     = data["paperId"];
        this.takenNumber                 = data["takenNumber"];
        this.impositionNumber            = data["impositionNumber"];
        this.colorFSelect                = data["colorFSelect"];
        this.colorBSelect                = data["colorBSelect"];
        this.specialColorF               = data["specialColorF"];
        this.specialColorB               = data["specialColorB"];
        this.printMethod                 = data["printMethod"];
        this.colorIdF                    = data["colorIdF"];
        this.colorIdB                    = data["colorIdB"];
        this.surfaceTreatmentIdF         = data["surfaceTreatmentIdF"];
        this.surfaceTreatmentIdB         = data["surfaceTreatmentIdB"];
        this.embossingID                 = data["embossingID"];
        this.laminationFlute             = data["laminationFlute"];
        this.laminationMediumBasicWeight = data["laminationMediumBasicWeight"];
        this.laminationMediumThroughWage = data["laminationMediumThroughWage"];
        this.laminationBackBasicWeight   = data["laminationBackBasicWeight"];
        this.laminationBackThroughWage   = data["laminationBackThroughWage"];
        this.laminationNumber            = data["laminationNumber"];
        this.laminationWidth             = data["laminationWidth"];
        this.laminationCuttingFlow       = data["laminationCuttingFlow"];
        this.dieCuttingId                = data["dieCuttingId"];
        this.dieCuttingThroughNumber     = data["dieCuttingThroughNumber"];
        this.dieCuttingWeight            = data["dieCuttingWeight"];
        this.stampingId                  = data["stampingId"];
        this.stampingProcessingType      = data["stampingProcessingType"];
        this.stampingSizeW1              = data["stampingSizeW1"];
        this.stampingSizeW2              = data["stampingSizeW2"];
        this.stampingSizeW3              = data["stampingSizeW3"];
        this.stampingSizeW4              = data["stampingSizeW4"];
        this.stampingSizeH1              = data["stampingSizeH1"];
        this.stampingSizeH2              = data["stampingSizeH2"];
        this.stampingSizeH3              = data["stampingSizeH3"];
        this.stampingSizeH4              = data["stampingSizeH4"];
        this.windowId                    = data["windowId"];
        this.windowSizeH                 = data["windowSizeH"];
        this.windowSizeW                 = data["windowSizeW"];
        this.pasteId                     = data["pasteId"];
        this.pasteForm                   = data["pasteForm"];
        this.packingId                   = data["packingId"];
        this.inspectionId                = data["inspectionId"];
        this.woodenId                    = data["woodenId"];
        this.woodenCode                  = data["woodenCode"];
        this.woodenCode2                 = data["woodenCode2"];
        this.filmCode                    = data["filmCode"];
        this.customerProductCode         = data["customerProductCode"];
        this.factoryId                   = data["factoryId"];
        this.pasteSpecialFormFlag        = data["pasteSpecialFormFlag"];
        this.deliveryDistance            = data["deliveryDistance"];
        this.otherExpense1               = data["otherExpense1"];
        this.otherWage1                  = data["otherWage1"];
        this.otherUnitType1              = data["otherUnitType1"];
        this.otherExpense2               = data["otherExpense2"];
        this.otherWage2                  = data["otherWage2"];
        this.otherUnitType2              = data["otherUnitType2"];
        this.otherExpense3               = data["otherExpense3"];
        this.otherWage3                  = data["otherWage3"];
        this.otherUnitType3              = data["otherUnitType3"];
        this.shippingCostId              = data["shippingCostId"];
        this.stampingPointsNumber        = data["stampingPointsNumber"];
        this.shapeId                     = data["shapeId"];
        this.sheetSizeId                 = data["sheetSizeId"];
        this.sheetSizeWidth              = data["sheetSizeWidth"];
        this.sheetSizeHeight             = data["sheetSizeHeight"];
        this.sheetSizeGrain              = data["sheetSizeGrain"];
        this.upperFlap                   = data["upperFlap"];
        this.insertion                   = data["insertion"];
        this.grain                       = data["grain"];
        this.developmentWidth            = data["developmentWidth"];
        this.developmentHeight           = data["developmentHeight"];
        this.groove                      = data["groove"];
        this.colorFText1                 = data["colorFText1"];
        this.colorFText2                 = data["colorFText2"];
        this.colorFText3                 = data["colorFText3"];
        this.colorFText4                 = data["colorFText4"];
        this.colorFText5                 = data["colorFText5"];
        this.colorFText6                 = data["colorFText6"];
        this.colorFText7                 = data["colorFText7"];
        this.colorFText8                 = data["colorFText8"];

        this.colorBText1 = data["colorBText1"];
        this.colorBText2 = data["colorBText2"];
        this.colorBText3 = data["colorBText3"];
        this.colorBText4 = data["colorBText4"];

        this.itemCode                    = data["itemCode"];
        this.specialSizeFlag             = data["specialSizeFlag"];
        this.specialDieCuttingNumberFlag = data["specialDieCuttingNumberFlag"];
        this.laminationPaperTypeBack     = data["laminationPaperTypeBack"];
        this.laminationPaperTypeMedium   = data["laminationPaperTypeMedium"];
        this.paperHeadApprovalFlag       = data["paperHeadApprovalFlag"];
        this.surfaceF_varnishType        = data["surfaceF_varnishType"];
        this.laminationPaperTypeFront    = data["laminationPaperTypeFront"];
        this.laminationFrontThroughWage  = data["laminationFrontThroughWage"];
        this.laminationFrontBasicWeight  = data["laminationFrontBasicWeight"];
        this.laminationPaperTypeA        = data["laminationPaperTypeA"];
        this.laminationAThroughWage      = data["laminationAThroughWage"];
        this.laminationABasicWeight      = data["laminationABasicWeight"];
        this.laminationPaperTypeB        = data["laminationPaperTypeB"];
        this.laminationBThroughWage      = data["laminationBThroughWage"];
        this.laminationBBasicWeight      = data["laminationBBasicWeight"];
        this.cartonShippingType          = data["cartonShippingType"];
        this.cartonTapeCutting           = data["cartonTapeCutting"];
        this.cartonLinerCutting          = data["cartonLinerCutting"];
        this.handProcessingFlag          = data["handProcessingFlag"];
        this.waterRepellentFlag          = data["waterRepellentFlag"];
        this.copyType                    = data["copyType"];
        this.embossingCode               = data["embossingCode"];
        this.requestDesignFlag           = data["requestDesignFlag"];
        this.bindingMethod               = data["bindingMethod"];
        this.handPosition                = data["handPosition"];
        this.specialUpperFlapFlag        = data["specialUpperFlapFlag"];
        this.lowerFlap                   = data["lowerFlap"];
        this.specialLowerFlapFlag        = data["specialLowerFlapFlag"];
        this.bindingNumber               = data["bindingNumber"];
        this.stringColor                 = data["stringColor"];
        this.stringNumber                = data["stringNumber"];
        this.handType                    = data["handType"];
        this.handSize                    = data["handSize"];
        this.otherMethod1                = data["otherMethod1"];
        this.otherMethod2                = data["otherMethod2"];
        this.otherNote1                  = data["otherNote1"];
        this.otherNote2                  = data["otherNote2"];
        this.otherNote3                  = data["otherNote3"];
        this.specialNote1Flag            = data["specialNote1Flag"];

        this.laminationAId      = data["laminationAId"];
        this.laminationBId      = data["laminationBId"];
        this.laminationFrontId  = data["laminationFrontId"];
        this.laminationBackId   = data["laminationBackId"];
        this.laminationMediumId = data["laminationMediumId"];

        this.denno              = data["denno"];
        this.sampleNo           = data["sampleNo"];
        this.foilColor1         = data["foilColor1"];
        this.foilColor2         = data["foilColor2"];
        this.foilColor3         = data["foilColor3"];
        this.packingInputNumber = data["packingInputNumber"];
        this.passageNo          = data["passageNo"];
        this.packingNote        = data["packingNote"];
        this.dieCuttingFlag     = data["dieCuttingFlag"];
        this.stampingNumber     = data["stampingNumber"];
        this.shareWoodenFlag1   = data["shareWoodenFlag1"];
        this.shareWoodenFlag2   = data["shareWoodenFlag2"];
        this.requiredAdditionalWork = data["requiredAdditionalWork"]
        this.specsBarcodeK1     = data["specsBarcodeK1"];
        this.specsBarcodeK2     = data["specsBarcodeK2"];
        this.specsBarcodeK3     = data["specsBarcodeK3"];
        this.specsBarcode1      = data["specsBarcode1"];
        this.specsBarcode2      = data["specsBarcode2"];
        this.specsBarcode3      = data["specsBarcode3"];

        if (data["colorF"] !== undefined) {
            this.colorF = new MstColor();
            this.colorF.setMstColor(data["colorF"]);
        }

        if (data["colorB"] !== undefined) {
            this.colorB = new MstColor();
            this.colorB.setMstColor(data["colorB"]);
        }

        if (data["packing"] !== undefined) {
            this.packing = new MstPacking();
            this.packing.setMstPacking(data["packing"]);
        }

        if (data["paper"] !== undefined) {
            this.paper = new MstPaper();
            this.paper.setMstPaper(data["paper"]);
        }

        if (data["paste"] !== undefined) {
            this.paste = new MstPaste();
            this.paste.setMstPaste(data["paste"]);
        }

        if (data["stamping"] !== undefined) {
            this.stamping = new MstStamping();
            this.stamping.setMstStamping(data["stamping"]);
        }

        if (data["dieCutting"] !== undefined) {
            this.dieCutting = new MstDieCutting();
            this.dieCutting.setMstDieCutting(data["dieCutting"]);
        }

        if (data["surfaceF"] !== undefined) {
            this.surfaceF = new MstSurfaceTreatment();
            this.surfaceF.setMstSurfaceTreatment(data["surfaceF"]);
        }

        if (data["surfaceB"] !== undefined) {
            this.surfaceB = new MstSurfaceTreatment();
            this.surfaceB.setMstSurfaceTreatment(data["surfaceB"]);
        }

        if (data["window"] !== undefined) {
            this.window = new MstWindow();
            this.window.setMstWindow(data["window"]);
        }

        if (data["dealProducts"] !== undefined) {
            this.dealProducts = [];
            for (var i = 0; i < data["dealProducts"].length; i++) {
                let tmp = new DealProduct();
                tmp.setDealProduct(data["dealProducts"][i]);
                this.dealProducts.push(tmp);
            }
        }
        if (data["wooden"] !== undefined) {
            this.wooden = new MstWooden();
            this.wooden.setMstWooden(data["wooden"]);
        }

        if (data["productFiles"] !== undefined) {
            this.productFiles = [];
            for (var i = 0; i < data["productFiles"].length; i++) {
                let tmp = new ProductFile();
                tmp.setProductFile(data["productFiles"][i]);
                this.productFiles.push(tmp);
            }
        }
        if (data["productOutputs"] !== undefined) {
            this.productOutputs = [];
            for (var i = 0; i < data["productOutputs"].length; i++) {
                let tmp = new ProductOutput();
                tmp.setProductOutput(data["productOutputs"][i]);
                this.productOutputs.push(tmp);
            }
        }
        if (data["productCommon"] !== undefined) {
            this.productCommon = new ProductCommonFee();
            this.productCommon.setProductCommonFee(data["productCommon"]);
        }

        if (data["shippingCost"] !== undefined) {
            this.shippingCost = new MstShippingCost();
            this.shippingCost.setMstShippingCost(data["shippingCost"]);
        }

        if (data["drawingImages"] !== undefined) {
            this.drawingImages = [];
            for (var i = 0; i < data["drawingImages"].length; i++) {
                let tmp = new DrawingImage();
                tmp.setDrawingImage(data["drawingImages"][i]);
                this.drawingImages.push(tmp);
            }
        }

        if (data["supplier"] != undefined) {
            this.supplier = new Supplier();
            this.supplier.setSupplierData(data["supplier"]);
        }
    }
}
