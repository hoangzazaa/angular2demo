import {SF00302Helper} from "../../../SF00302.helper";
/**
 * Created by VuPT on 5/10/2017.
 */
export interface SF0030216Helper extends SF00302Helper {
    calcThroughNumber();
    calcPaperUnitPrice();
    calcPaperTotalCost();
    calcLaminationSize();
    calcLaminationUnitPrice();
    calcLaminationTotalCost();
    calcColorPlateCost(id:number);
    calcColorPrintLoss(id:number);
    calcColorCostPerPacket(id:number);
    calcColorBasicCost(id:number);
    calcColorThroughWage(id:number);
    calcColorSpecial(id:number);
    calcColorTotalCost(id:number);
    calcSurfaceBasicCost(id:number);
    calcSurfaceThroughWage(id:number);
    calcSurfaceTotalCost(id:number);
    calcStampingPointsNumber();
    calcStampingBasicCost();
    calcStampingThroughWage();
    calcStampingTotalCost();
    calcWindowMaterialFee();
    calcWindowTotalCost();
    calcDieCuttingWeight();
    calcDieCuttingLoss();
    calcDieCuttingBasicCost();
    calcDieCuttingThroughWage();
    calcDieCuttingTotalCost();
    calcPasteLoss();
    calcPasteBasicCost();
    calcPasteThroughWage();
    calcPasteTotalCost();
    calcOtherFee();
    calcInspection();
    calcPacking();
    calcShippingCost();
    calcSubTotal();
    calcManagementCost();
    calcEstimateTotal();
    calcEstimateUnitPrice();
    calcSubmittedTotal();
    calcEstimateDiff(id:number);
    calcAdditionFare();
    getProductOutputOtherFee1();

    getProductOutputOtherFee2();

    getProductOutputOtherFee3();
    getOtherFeeTotalCost();

    getColorPrintTotalCost();

    getSurfaceTreatmentTotalCost();

    getInspectionPackingFareLineTotalCost();

    getDieCuttingPasteTotalCost();

    laminationWage: number;
    laminationLoss: number;
    throughNumber: number;
}