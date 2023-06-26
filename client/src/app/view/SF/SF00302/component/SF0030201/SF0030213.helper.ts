/**
 * Created by VuPT on 5/10/2017.
 */
import {SF00302Helper} from "../../SF00302.helper";
/**
 * Created by VuPT on 5/9/2017.
 */
export interface SF0030213Helper extends SF00302Helper{
    calcInspection();
    calcPacking();
    calcShippingCost();
    calcAdditionFare();
}