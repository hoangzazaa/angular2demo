import {SF00302Helper} from "../../SF00302.helper";
/**
 * Created by VuPT on 5/9/2017.
 */
export interface SF0030210Helper extends SF00302Helper{
    calcStampingPointsNumber();
    calcStampingBasicCost();
    calcStampingThroughWage();
    calcMoldFee();
}