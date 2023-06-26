import {SF00302Helper} from "../../SF00302.helper";
/**
 * Created by VuPT on 5/10/2017.
 */
export interface SF0030220Helper extends SF00302Helper{
    calcUsageColorCostCarton();
    calcTapeCutCarton();
    calcLinerCutCarton();
    calcWaterRepellentCarton();
    calcCartonHandProcessingCarton();
    calcFlap(cartonType:number,flute:number,sizeD:number);
}