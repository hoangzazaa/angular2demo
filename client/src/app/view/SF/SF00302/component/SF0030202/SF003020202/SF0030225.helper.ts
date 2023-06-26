import {SF00302Helper} from "../../../SF00302.helper";

export interface SF0030225Helper extends SF00302Helper{
    calcDieCuttingThroughWage();
    calcPasteBasicCost();
    calcPasteThroughWage();
    calcMaterialCostCarton();
    calcShipFareCarton();
    calcTotalCarton();
    calcAdditionFare();
    calcCartonLotGap();
}