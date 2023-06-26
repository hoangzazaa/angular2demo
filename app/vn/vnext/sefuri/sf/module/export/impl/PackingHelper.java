package vn.vnext.sefuri.sf.module.export.impl;

import java.util.Collections;
import java.util.EnumMap;
import java.util.Map;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.common.Enums.CartonPacking;
import vn.vnext.sefuri.sf.dto.ProductDto;

/**
 * 製造仕様書 梱包関連のヘルパー
 */
public class PackingHelper {

    /** 段ボール梱包方法 → 製造仕様書 生産工程の梱包欄表示名 */
    private static final Map<CartonPacking, String> cartonPackingStepDisplayNameMap;
    static {
        Map<CartonPacking, String> map = new EnumMap<>(CartonPacking.class);
        map.put(CartonPacking.CRAFT_WORKPIA_TENZAN, "クラフト梱包");
        map.put(CartonPacking.CRAFT_KODAMA, "クラフト梱包");
        map.put(CartonPacking.CRAFT_SAGA, "クラフト梱包");
        map.put(CartonPacking.CRAFT_WRAPPING, "クラフト梱包");
        map.put(CartonPacking.SHRINK, "シュリンク梱包");
        map.put(CartonPacking.CARTON_IN_HOUSE, "段ボール梱包");
        map.put(CartonPacking.CARTON_SPECIAL, "段ボール梱包");
        map.put(CartonPacking.BAND, "結束梱包");
        cartonPackingStepDisplayNameMap = Collections.unmodifiableMap(map);
    }

    /**
     * 段ボール梱包方法から製造仕様書 生産工程の梱包欄表示名に変換する
     *
     * @param productDto 段ボールの商品情報
     * @return 梱包欄表示名 (null: 梱包工程なし)
     */
    public String cartonPackingStepDisplayName(@Nonnull ProductDto productDto) {
        // Assert productDto.productType = 1 // 段ボール

        CartonPacking cartonPacking = CartonPacking.valueOf(productDto.getPackingId());
        return cartonPackingStepDisplayNameMap.get(cartonPacking);
    }

}
