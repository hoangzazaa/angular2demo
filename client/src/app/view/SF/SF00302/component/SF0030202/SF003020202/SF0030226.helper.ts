import {SF00302Helper} from "../../../SF00302.helper";

export interface SF0030226Helper extends SF00302Helper{

    /**
     * 運賃(@㎡)を計算する
     */
    calcShipFareCarton(): void;
    /**
     * 割増運賃を取得する
     *
     * @return 割増運賃 (円/㎡)
     */
    getAdditionalSipFareCarton(): number;
    calcUsageColorCostCarton();

    calcWaterRepellentCarton();
    calcMaterialCostCarton();
    /**
     * 見積金額合計を計算する
     */
    calcTotalCarton();
    calcUnitPriceCarton();
    calcEstimateDiffCarton(id:number);
    /**
     * ロット格差を計算する
     */
    calcCartonLotGap(): void;
    calcSubTotal();
    calcSubmittedTotal();
    getOtherFeeTotalCost();
    calcDimension();

    calcEstimatedM2PriceCarton();
    calcDieCuttingThroughWage();
    calcPasteBasicCost();
    calcPasteThroughWage();
    getDieCuttingPasteTotalCost();
    calcAdditionFare();
}