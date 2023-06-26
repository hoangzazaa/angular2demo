/**
 * Created by admin on 5/9/2017.
 */
import {SF00302Helper} from "../../../SF00302.helper";

export interface SF0030207Helper extends SF00302Helper {
    calcLaminationUnitPrice();
    calcLaminationSheetCost();
    calcLaminationTotalCost();
    calcWindowTotalCost();
    calcDieCuttingBasicCost();
    calcDieCuttingThroughWage();
    calcPasteBasicCost();
    calcPasteThroughWage();

}