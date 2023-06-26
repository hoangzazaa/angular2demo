/**
 * Contain products output in deal.
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Product_model_1 = require("./Product.model");
var Offer_model_1 = require("./Offer.model");
var BaseModel_model_1 = require("./BaseModel.model");
var ProductOutput = (function (_super) {
    __extends(ProductOutput, _super);
    function ProductOutput() {
        _super.apply(this, arguments);
    }
    ProductOutput.prototype.setProductOutput = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.paperActualWeight = data["paperActualWeight"];
        this.paperUnitPrice = data["paperUnitPrice"];
        this.paperTotalCost = data["paperTotalCost"];
        this.colorPlateCostF = data["colorPlateCostF"];
        this.colorPlateCostB = data["colorPlateCostB"];
        this.colorPrintLossF = data["colorPrintLossF"];
        this.colorPrintLossB = data["colorPrintLossB"];
        this.colorPrintPerPacketCostF = data["colorPrintPerPacketCostF"];
        this.colorPrintPerPacketCostB = data["colorPrintPerPacketCostB"];
        this.colorPrintBasicCostF = data["colorPrintBasicCostF"];
        this.colorPrintBasicCostB = data["colorPrintBasicCostB"];
        this.colorPrintThroughWageF = data["colorPrintThroughWageF"];
        this.colorPrintThroughWageB = data["colorPrintThroughWageB"];
        this.colorPrintSpecialCostF = data["colorPrintSpecialCostF"];
        this.colorPrintSpecialCostB = data["colorPrintSpecialCostB"];
        this.colorPrintTotalCostF = data["colorPrintTotalCostF"];
        this.colorPrintTotalCostB = data["colorPrintTotalCostB"];
        this.surfaceTreatmentBasicCostF = data["surfaceTreatmentBasicCostF"];
        this.surfaceTreatmentBasicCostB = data["surfaceTreatmentBasicCostB"];
        this.surfaceTreatmentThroughWageF = data["surfaceTreatmentThroughWageF"];
        this.surfaceTreatmentThroughWageB = data["surfaceTreatmentThroughWageB"];
        this.surfaceTreatmentTotalCostF = data["surfaceTreatmentTotalCostF"];
        this.surfaceTreatmentTotalCostB = data["surfaceTreatmentTotalCostB"];
        this.embossingBasicCost = data["embossingBasicCost"];
        this.embossingThroughWage = data["embossingThroughWage"];
        this.embossingTotalCost = data["embossingTotalCost"];
        this.laminationUnitPrice = data["laminationUnitPrice"];
        this.laminationSheetCost = data["laminationSheetCost"];
        this.laminationTotalCost = data["laminationTotalCost"];
        this.dieCuttingLoss = data["dieCuttingLoss"];
        this.dieCuttingBasicCost = data["dieCuttingBasicCost"];
        this.dieCuttingThroughWage = data["dieCuttingThroughWage"];
        this.dieCuttingTotalCost = data["dieCuttingTotalCost"];
        this.stampingBasicCost = data["stampingBasicCost"];
        this.stampingThroughWage = data["stampingThroughWage"];
        this.stampingTotalCost = data["stampingTotalCost"];
        this.windowMaterialFee = data["windowMaterialFee"];
        this.windowTotalCost = data["windowTotalCost"];
        this.pasteLoss = data["pasteLoss"];
        this.pasteBasicCost = data["pasteBasicCost"];
        this.pasteThroughWage = data["pasteThroughWage"];
        this.pasteTotalCost = data["pasteTotalCost"];
        this.subtotal = data["subtotal"];
        this.managementCost = data["managementCost"];
        this.fareCost = data["fareCost"];
        this.fareLineService = data["fareLineService"];
        this.estimatedTotal = data["estimatedTotal"];
        this.estimatedUnitPrice = data["estimatedUnitPrice"];
        this.productId = data["productId"];
        this.inspection = data["inspection"];
        this.packing = data["packing"];
        this.lot = data["lot"];
        this.primaryFlag = data["primaryFlag"];
        this.pasteStepWage = data["pasteStepWage"];
        this.laminationSize = data["laminationSize"];
        this.cartonMaterialCost = data["cartonMaterialCost"];
        this.cartonMaterialLoss = data["cartonMaterialLoss"];
        this.cartonMaterialLamination = data["cartonMaterialLamination"];
        this.cartonMaterialUnitPrice = data["cartonMaterialUnitPrice"];
        this.cartonMaterialTotalCost = data["cartonMaterialTotalCost"];
        this.cartonShipFare = data["cartonShipFare"];
        this.cartonShipTotal = data["cartonShipTotal"];
        this.cartonUsageColorCost = data["cartonUsageColorCost"];
        this.cartonTapeCut = data["cartonTapeCut"];
        this.cartonLinerCut = data["cartonLinerCut"];
        this.cartonHandProcessing = data["cartonHandProcessing"];
        this.cartonWaterRepellent = data["cartonWaterRepellent"];
        this.cartonProcessingUnitPrice = data["cartonProcessingUnitPrice"];
        this.cartonProcessingTotalCost = data["cartonProcessingTotalCost"];
        this.surcharge = data["surcharge"];
        this.dimension = data["dimension"];
        this.supplierLot = data["supplierLot"];
        this.digitalBasicCost = data["digitalBasicCost"];
        this.digitalThroughWage = data["digitalThroughWage"];
        this.digitalTotalCost = data["digitalTotalCost"];
        this.cartonLotGap = data["cartonLotGap"];
        this.cartonSpecialFare = data["cartonSpecialFare"];
        if (data["product"] !== undefined) {
            this.product = new Product_model_1.Product();
            this.product.setProduct(data["product"]);
        }
        if (data["offers"] !== undefined) {
            this.offers = [];
            for (var i = 0; i < data["offers"].length; i++) {
                var tmp = new Offer_model_1.Offer();
                tmp.setOffer(data["offers"][i]);
                this.offers.push(tmp);
            }
        }
    };
    return ProductOutput;
}(BaseModel_model_1.BaseModel));
exports.ProductOutput = ProductOutput;
//# sourceMappingURL=ProductOutput.model.js.map