package vn.vnext.sefuri.sf.module.export.helper;

import java.math.BigDecimal;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.module.export.UpperLower;

/**
 * 製品仕様(寸法) に関するヘルパー
 */
public class ProductSizeHelper {

    /**
     * 段ボールのフラップを計算する
     *
     * client/src/app/view/SF/SF00302/component/SF0030202/SF003020201/SF003020201.helper.ts に同様のコードあり
     *
     * @param productDto 商品情報
     * @return フラップ (mm)
     */
    public BigDecimal calcDefaulFlap(@Nonnull ProductDto productDto) {
        // Assert productDto.productType = 1 // 段ボール

        if (productDto.getSizeD() != null) {
            BigDecimal result = productDto.getSizeD().divide(new BigDecimal(2));
            if (productDto.getLaminationFlute() == 1) {
                result = result.add(BigDecimal.valueOf(2));
            } else if (productDto.getLaminationFlute() == 2) {
                result = result.add(BigDecimal.valueOf(1.5));
            } else {
                result = result.add(BigDecimal.valueOf(3));
            }
            return result.setScale(0, BigDecimal.ROUND_FLOOR);
        } else {
            return BigDecimal.ZERO;
        }
    }

    /**
     * 段ボールの変形フラップ量(デフォルトに対する相対値)を計算する
     *
     * @param productDto 商品情報
     * @return 変形フラップ量 (width, depth のみ意味あり)
     */
    public UpperLower calcRelativeFlap(@Nonnull ProductDto productDto) {
        double defaultFlap = calcDefaulFlap(productDto).doubleValue();
        if (defaultFlap == 0) {
            return UpperLower.of(0.0,  0.0);    // フラップが計算できないので +- 0 で返す
        }

        double relativeUpperFlap = 0;
        double relativeLowerFlap = 0;

        // 上フラップ
        if (productDto.getUpperFlap() != null) {
            relativeUpperFlap = productDto.getUpperFlap().doubleValue() - defaultFlap;
        }

        // 下フラップ
        if (productDto.getLowerFlap() != null) {
            relativeLowerFlap = productDto.getLowerFlap().doubleValue() - defaultFlap;
        }

        //
        return UpperLower.of(relativeUpperFlap, relativeLowerFlap);
    }

}
