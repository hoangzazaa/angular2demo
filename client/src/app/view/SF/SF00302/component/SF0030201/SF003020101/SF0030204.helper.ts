import {SF00302Helper} from "../../../SF00302.helper";
import {SF00302Data} from "../../../SF00302.data";
/**
 * Created by admin on 5/9/2017.
 */
export interface SF0030204Helper extends SF00302Helper {
    calcStampingBasicCost();
    calcStampingThroughWage();
    calcPasteBasicCost();
    calcPasteThroughWage();
    calcWindowTotalCost();
    calcShippingCost();
    
}