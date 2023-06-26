import {SF00302Helper} from "../../SF00302.helper";
/**
 * Created by VuPT on 5/9/2017.
 */
export interface SF0030209Helper extends SF00302Helper{
    calcColorPlateCost(id:number);
    calcSurfaceBasicCost(id:number);
    calcSurfaceThroughWage(id:number);
    calcSurfaceTotalCost(id:number);

    calcColorPrintLoss(id:number);
    calcColorCostPerPacket(id:number);
    calcColorBasicCost(id:number);
    calcColorThroughWage(id:number);
    calcColorSpecial(id:number);
}