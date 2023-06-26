"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var DealProduct_model_1 = require("./DealProduct.model");
var DrawingImage_model_1 = require("./DrawingImage.model");
/**
 * Contain product input information.
 * @author vupt
 */
var MstColor_model_1 = require("./MstColor.model");
var MstDieCutting_model_1 = require("./MstDieCutting.model");
var MstPacking_model_1 = require("./MstPacking.model");
var MstPaper_model_1 = require("./MstPaper.model");
var MstPaste_model_1 = require("./MstPaste.model");
var MstShippingCost_model_1 = require("./MstShippingCost.model");
var MstStamping_model_1 = require("./MstStamping.model");
var MstSurfaceTreatment_model_1 = require("./MstSurfaceTreatment.model");
var MstWindow_model_1 = require("./MstWindow.model");
var MstWooden_model_1 = require("./MstWooden.model");
var ProductCommonFee_model_1 = require("./ProductCommonFee.model");
var ProductFile_model_1 = require("./ProductFile.model");
var ProductOutput_model_1 = require("./ProductOutput.model");
var Supplier_model_1 = require("./Supplier.model");
/**
 * 製品
 */
var Product = (function (_super) {
    __extends(Product, _super);
    function Product() {
        _super.apply(this, arguments);
        this.denno = 0;
    }
    Product.prototype.setProduct = function (data) {
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
        this.woodenCode2 = data["woodenCode2"];
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
        this.colorFText4 = data["colorFText4"];
        this.colorFText5 = data["colorFText5"];
        this.colorFText6 = data["colorFText6"];
        this.colorFText7 = data["colorFText7"];
        this.colorFText8 = data["colorFText8"];
        this.colorBText1 = data["colorBText1"];
        this.colorBText2 = data["colorBText2"];
        this.colorBText3 = data["colorBText3"];
        this.colorBText4 = data["colorBText4"];
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
        this.laminationAId = data["laminationAId"];
        this.laminationBId = data["laminationBId"];
        this.laminationFrontId = data["laminationFrontId"];
        this.laminationBackId = data["laminationBackId"];
        this.laminationMediumId = data["laminationMediumId"];
        this.denno = data["denno"];
        this.sampleNo = data["sampleNo"];
        this.foilColor1 = data["foilColor1"];
        this.foilColor2 = data["foilColor2"];
        this.foilColor3 = data["foilColor3"];
        this.packingInputNumber = data["packingInputNumber"];
        this.passageNo = data["passageNo"];
        this.packingNote = data["packingNote"];
        this.dieCuttingFlag = data["dieCuttingFlag"];
        this.stampingNumber = data["stampingNumber"];
        this.shareWoodenFlag1 = data["shareWoodenFlag1"];
        this.shareWoodenFlag2 = data["shareWoodenFlag2"];
        this.requiredAdditionalWork = data["requiredAdditionalWork"];
        this.specsBarcodeK1 = data["specsBarcodeK1"];
        this.specsBarcodeK2 = data["specsBarcodeK2"];
        this.specsBarcodeK3 = data["specsBarcodeK3"];
        this.specsBarcode1 = data["specsBarcode1"];
        this.specsBarcode2 = data["specsBarcode2"];
        this.specsBarcode3 = data["specsBarcode3"];
        if (data["colorF"] !== undefined) {
            this.colorF = new MstColor_model_1.MstColor();
            this.colorF.setMstColor(data["colorF"]);
        }
        if (data["colorB"] !== undefined) {
            this.colorB = new MstColor_model_1.MstColor();
            this.colorB.setMstColor(data["colorB"]);
        }
        if (data["packing"] !== undefined) {
            this.packing = new MstPacking_model_1.MstPacking();
            this.packing.setMstPacking(data["packing"]);
        }
        if (data["paper"] !== undefined) {
            this.paper = new MstPaper_model_1.MstPaper();
            this.paper.setMstPaper(data["paper"]);
        }
        if (data["paste"] !== undefined) {
            this.paste = new MstPaste_model_1.MstPaste();
            this.paste.setMstPaste(data["paste"]);
        }
        if (data["stamping"] !== undefined) {
            this.stamping = new MstStamping_model_1.MstStamping();
            this.stamping.setMstStamping(data["stamping"]);
        }
        if (data["dieCutting"] !== undefined) {
            this.dieCutting = new MstDieCutting_model_1.MstDieCutting();
            this.dieCutting.setMstDieCutting(data["dieCutting"]);
        }
        if (data["surfaceF"] !== undefined) {
            this.surfaceF = new MstSurfaceTreatment_model_1.MstSurfaceTreatment();
            this.surfaceF.setMstSurfaceTreatment(data["surfaceF"]);
        }
        if (data["surfaceB"] !== undefined) {
            this.surfaceB = new MstSurfaceTreatment_model_1.MstSurfaceTreatment();
            this.surfaceB.setMstSurfaceTreatment(data["surfaceB"]);
        }
        if (data["window"] !== undefined) {
            this.window = new MstWindow_model_1.MstWindow();
            this.window.setMstWindow(data["window"]);
        }
        if (data["dealProducts"] !== undefined) {
            this.dealProducts = [];
            for (var i = 0; i < data["dealProducts"].length; i++) {
                var tmp = new DealProduct_model_1.DealProduct();
                tmp.setDealProduct(data["dealProducts"][i]);
                this.dealProducts.push(tmp);
            }
        }
        if (data["wooden"] !== undefined) {
            this.wooden = new MstWooden_model_1.MstWooden();
            this.wooden.setMstWooden(data["wooden"]);
        }
        if (data["productFiles"] !== undefined) {
            this.productFiles = [];
            for (var i = 0; i < data["productFiles"].length; i++) {
                var tmp = new ProductFile_model_1.ProductFile();
                tmp.setProductFile(data["productFiles"][i]);
                this.productFiles.push(tmp);
            }
        }
        if (data["productOutputs"] !== undefined) {
            this.productOutputs = [];
            for (var i = 0; i < data["productOutputs"].length; i++) {
                var tmp = new ProductOutput_model_1.ProductOutput();
                tmp.setProductOutput(data["productOutputs"][i]);
                this.productOutputs.push(tmp);
            }
        }
        if (data["productCommon"] !== undefined) {
            this.productCommon = new ProductCommonFee_model_1.ProductCommonFee();
            this.productCommon.setProductCommonFee(data["productCommon"]);
        }
        if (data["shippingCost"] !== undefined) {
            this.shippingCost = new MstShippingCost_model_1.MstShippingCost();
            this.shippingCost.setMstShippingCost(data["shippingCost"]);
        }
        if (data["drawingImages"] !== undefined) {
            this.drawingImages = [];
            for (var i = 0; i < data["drawingImages"].length; i++) {
                var tmp = new DrawingImage_model_1.DrawingImage();
                tmp.setDrawingImage(data["drawingImages"][i]);
                this.drawingImages.push(tmp);
            }
        }
        if (data["supplier"] != undefined) {
            this.supplier = new Supplier_model_1.Supplier();
            this.supplier.setSupplierData(data["supplier"]);
        }
    };
    return Product;
}(BaseModel_model_1.BaseModel));
exports.Product = Product;
//# sourceMappingURL=Product.model.js.map