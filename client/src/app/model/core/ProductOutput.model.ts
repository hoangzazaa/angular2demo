/**
 * Contain products output in deal.
 * @author vupt
 */

import {Product} from "./Product.model";
import {Offer} from "./Offer.model";
import {BaseModel} from "./BaseModel.model";

export class ProductOutput extends BaseModel {

    /** 紙器用板紙代 - 連量 */
    public paperActualWeight: number;

    /** 紙器用板紙代 - 枚単価 */
    public paperUnitPrice: number;

    /** 紙器用板紙代 - 板紙代計 */
    public paperTotalCost: number;

    /** 印刷代　- 刷版代 Front */
    public colorPlateCostF: number;

    /** 印刷代　- 刷版代 Back */
    public colorPlateCostB: number;

    /** 印刷代 - 印刷ロス Front */
    public colorPrintLossF: number;

    /** 印刷代 - 印刷ロス Back */
    public colorPrintLossB: number;

    /** 印刷代 - 一律 Front */
    public colorPrintPerPacketCostF: number;

    /** 印刷代 - 一律 Back */
    public colorPrintPerPacketCostB: number;

    /** 印刷代 - 基本料 Front */
    public colorPrintBasicCostF: number;

    /** 印刷代 - 基本料 Back */
    public colorPrintBasicCostB: number;

    /** 印刷代 - 色通工賃 Front */
    public colorPrintThroughWageF: number;

    /** 印刷代 - 色通工賃 Back */
    public colorPrintThroughWageB: number;

    /** 印刷代 - 印刷割増（色） Front */
    public colorPrintSpecialCostF: number;

    /** 印刷代 - 印刷割増（色） Back */
    public colorPrintSpecialCostB: number;

    /** 印刷代 - 印刷代計 Front */
    public colorPrintTotalCostF: number;

    /** 印刷代 - 印刷代計 Back */
    public colorPrintTotalCostB: number;

    /** 表面加工 - 基本料 Front */
    public surfaceTreatmentBasicCostF: string;

    /** 表面加工 - 基本料 Back */
    public surfaceTreatmentBasicCostB: string;

    /** 表面加工 - 通工賃 Front */
    public surfaceTreatmentThroughWageF: string;

    /** 表面加工 - 通工賃 Back */
    public surfaceTreatmentThroughWageB: string;

    /** 表面加工  - 表面加工代計 Front */
    public surfaceTreatmentTotalCostF: number;

    /** 表面加工  - 表面加工代計 Back */
    public surfaceTreatmentTotalCostB: number;

    /** エンボス - 基本料 */
    public embossingBasicCost: number;

    /** エンボス - 通工賃 */
    public embossingThroughWage: number;

    /** エンボス - エンボス代計 */
    public embossingTotalCost: number;

    /** 片段ラミネート - 紙代㎡＠ */
    public laminationUnitPrice: number;

    /** 片段ラミネート - シート代 */
    public laminationSheetCost: number;

    /** 片段ラミネート - ラミネート代計 */
    public laminationTotalCost: number;

    /** 打抜き - 打抜ロス */
    public dieCuttingLoss: number;

    /** 打抜き - 基本料 */
    public dieCuttingBasicCost: number;

    /** 打抜き - 通工賃 */
    public dieCuttingThroughWage: number;

    /** 打抜き - 打抜代計 */
    public dieCuttingTotalCost: number;

    /** 箔押し代 - 基本料 */
    public stampingBasicCost: number;

    /** 箔押し代 - 工賃 */
    public stampingThroughWage: number;

    /** 箔押し代 - 箔押し代 */
    public stampingTotalCost: number;

    /** 窓貼り代 - 材料代 */
    public windowMaterialFee: number;

    /** 窓貼り代 - 窓貼代計 */
    public windowTotalCost: number;

    /** 貼り - 貼ロス */
    public pasteLoss: number;

    /** 貼り - 基本料 */
    public pasteBasicCost: number;

    /** 貼り - 工賃 */
    public pasteThroughWage: number;

    /** 貼り - 貼り代計 */
    public pasteTotalCost: number;

    /** 小計 */
    public subtotal: number;

    /** 販管・配送 - 販売管理費 */
    public managementCost: number;

    /** 販管・配送 - 運賃 */
    public fareCost: number;

    /** 販管・配送 - 運賃（路線便） */
    public fareLineService: number;

    /** 見積額 - 合計 */
    public estimatedTotal: number;

    /** 見積額 - 見積単価 */
    public estimatedUnitPrice: number;

    /** productId */
    public productId: number;

    /** 検品 */
    public inspection: number;

    /** 梱包 */
    public packing: number;

    /** lot */
    public lot: number;

    /** primaryFlag */
    public primaryFlag: number;

    public pasteStepWage: number;

    public laminationSize: number;

    public cartonMaterialCost: number;
    public cartonMaterialLoss: number;
    public cartonMaterialLamination: number;
    public cartonMaterialUnitPrice: number;
    public cartonMaterialTotalCost: number;

    /** 運賃　(円/㎡)  割増運賃含まず */
    public cartonShipFare: number;
    /** 運賃合計 割増運賃を含む */
    public cartonShipTotal: number;

    public cartonUsageColorCost: number;
    public cartonTapeCut: number;
    public cartonLinerCut: number;
    public cartonHandProcessing: number;
    /** 撥水加工賃 (円/㎡) */
    public cartonWaterRepellent: number;
    public cartonProcessingUnitPrice: number;
    public cartonProcessingTotalCost: number;
    public dimension: number;
    public surcharge: number;
    public supplierLot: number;
    public digitalBasicCost: number;
    public digitalThroughWage: number;
    public digitalTotalCost: number;
    public cartonLotGap: number;
    public cartonSpecialFare: number;
    /* productRsProductOutput */
    public product: Product;

    /* productOutputRsOfffer */
    public offers: Offer[];

    public setProductOutput(data: any) {
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
            this.product = new Product();
            this.product.setProduct(data["product"]);
        }

        if (data["offers"] !== undefined) {
            this.offers = [];
            for (var i = 0; i < data["offers"].length; i++) {
                let tmp = new Offer();
                tmp.setOffer(data["offers"][i]);
                this.offers.push(tmp);
            }
        }
    }
}