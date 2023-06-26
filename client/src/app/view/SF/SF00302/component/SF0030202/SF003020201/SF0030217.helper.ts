import {SF00302Helper} from "../../../SF00302.helper";
/**
 * Created by VuPT on 5/10/2017.
 */
export interface SF0030217Helper extends SF00302Helper{
    calcMaterialCostTotalCarton();
    calcMaterialLossCarton();
    calcMaterialLaminationCarton();
    calcMaterialUnitPriceCarton()
    calcShipFareCarton();
    calcShipTotalCarton();
    calcProcessingTotalCarton();
    calcFlap(cartonType:number,flute:number,sizeD:number);
    calcDimension();
    calcSurcharge();
    calcMaterialTotalCostCarton();
    calcUsageColorCostCarton();
    calcTapeCutCarton();
    calcLinerCutCarton();
    calcCartonHandProcessingCarton();
    calcWaterRepellentCarton();
    calcProcessingUnitPriceCarton();
    calcTotalCarton();
    calcUnitPriceCarton();
    calcSubTotal();
    calcEstimateDiffCarton(id:number);
    calcSubmittedTotal();
}