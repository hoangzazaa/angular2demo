package vn.vnext.sefuri.sf.module.export.impl;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.common.Enums.ProductType;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.module.export.helper.EnumsPDF.CartonType;

/**
 * 商品に関するヘルパー
 */
public class ProductHelper {

    /**
     * 段ボールかどうか判定する
     *
     * @param productDto 商品
     * @return true: 段ボールである, false: それ以外
     */
    boolean isCarton(@Nonnull ProductDto productDto) {
        return ProductType.valueOf(productDto.getProductType()) == ProductType.CARTON;
    }

    /**
     * 段ボール A式 (ケース) かどうか判定する
     *
     * @param productDto 商品
     * @return true: 段ボール A式 (ケース) である, false: それ以外
     */
    boolean isCartonCase(@Nonnull ProductDto productDto) {
        return isCarton(productDto) && CartonType.CARTON_CASE.getType().equals(productDto.getCartonShippingType());
    }

    /**
     * 段ボール A式以外 (シート) かどうか判定する
     *
     * @param productDto 商品
     * @return true: 段ボール A式以外 (シート) である, false: それ以外
     */
    boolean isCartonSheet(@Nonnull ProductDto productDto) {
        return isCarton(productDto) && CartonType.CARTON_SHEET.getType().equals(productDto.getCartonShippingType());
    }

}
