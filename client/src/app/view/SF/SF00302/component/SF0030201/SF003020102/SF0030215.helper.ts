import {SF00302Helper} from "../../../SF00302.helper";
/**
 * Created by VuPT on 5/10/2017.
 */
export interface SF0030215Helper extends SF00302Helper {
    calcPaperTotalCost();
    calcLaminationSize();
    calcLaminationUnitPrice();
    calcLaminationTotalCost();
    calcWindowTotalCost();
    calcDieCuttingBasicCost();
    calcDieCuttingThroughWage();
    calcPasteLoss();
    calccartonMaterialLoss();
    calcPasteThroughWage();
    calcSurfaceBasicCost(id:number);
    calcSurfaceThroughWage(id:number);
    calcStampingBasicCost();
    calcStampingThroughWage();
    calcShippingCost();
    calcSurfaceTotalCost(id:number);
    calcDieCuttingTotalCost();
    calcColorPlateCost(id:number);
    calcColorPrintLoss(id:number);
    calcColorCostPerPacket(id:number);
    calcColorBasicCost(id:number);
    calcColorThroughWage(id:number);
    calcColorSpecial(id:number);
    calcPasteBasicCost();
    calcPacking();
}