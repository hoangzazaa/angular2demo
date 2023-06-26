/**
 * Created by admin on 5/9/2017.
 */
import {SF00302Helper} from "../../../SF00302.helper";

export interface SF0030206Helper extends SF00302Helper {
    calcPaperActualWeight();
    calcShippingCost();
    calcSurfaceBasicCost(id: number);
    calcSurfaceThroughWage(id: number);
    calcDieCuttingBasicCost();
    calcDieCuttingThroughWage();
    calcDieCuttingTotalCost();
    calcLaminationTotalCost();
    calcSurfaceTotalCost(id:number);
    calcPasteBasicCost();
    calcPasteThroughWage();
    calcPaperTotalCost();
}