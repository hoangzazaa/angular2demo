/**
 * Created by VuPT on 5/10/2017.
 */
import {SF00302Helper} from "../../SF00302.helper";
/**
 * Created by VuPT on 5/9/2017.
 */
export interface SF0030212Helper extends SF00302Helper{
    calcDieCuttingWeight();
    calcDieCuttingLoss();
    calcDieCuttingBasicCost();
    calcDieCuttingThroughWage();
    calcDieCuttingTotalCost();
    calcPasteLoss();
    calcPasteBasicCost();
    calcPasteThroughWage();
    calcPaperTotalCost();
    calcLaminationTotalCost();
    calcPacking();
    calcPasteTotalCost()
    calcCartonLotGap()
    calcColorBasicCost(id:number);
    calcColorPrintLoss(id:number);
}