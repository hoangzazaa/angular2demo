import {SF00302Helper} from "../../../SF00302.helper";
/**
 * Created by VuPT on 5/10/2017.
 */
export interface SF0030221Helper extends SF00302Helper{
    calcMaterialCostTotalCarton();
    calcMaterialLossCarton();
    calcMaterialLaminationCarton();
    calcMaterialUnitPriceCarton();
    calcMaterialTotalCostCarton();
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
    calcTapeCutCarton();
    calcLinerCutCarton();
    calcCartonHandProcessingCarton();
    calcWaterRepellentCarton();
    calcProcessingUnitPriceCarton();
    calcProcessingTotalCarton();
    /**
     * 見積金額合計を計算する
     */
    calcTotalCarton(): void;
    calcUnitPriceCarton();
    calcEstimateDiffCarton(id:number);
    /**
     * ロット格差を計算する
     */
    calcCartonLotGap(): void;
    calcSubTotal();
    calcSubmittedTotal();
    getProductOutputOtherFee1();

    getProductOutputOtherFee2();

    getProductOutputOtherFee3();
    getOtherFeeTotalCost();
    /**
     * 才数を計算する
     */
    calcDimension(): void;

    calcEstimatedM2PriceCarton();
    calcAdditionFare();

    /** @return 展開寸法 (㎡) */
    calcMaterialSizeCarton(): number;
}