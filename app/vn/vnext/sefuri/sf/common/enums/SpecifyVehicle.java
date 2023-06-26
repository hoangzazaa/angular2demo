package vn.vnext.sefuri.sf.common.enums;

import java.util.Map;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * 配送車両指定の区分値
 *
 * <p>sfr_sf_shipping_destination.spcify_vehicle
 */
public enum SpecifyVehicle {
    /** 2t未満 */
    BELOW_2T(1, "2t未満"),
    /** 2t迄 */
    LIMIT_2T(2, "2t迄"),
    /** 4t迄 */
    LIMIT_4T(3, "4t迄"),
    /** 10t可 */
    AVAILABLE_10T(4, "10t可"),
    /** その他 */
    OTHERS(9999, "その他");

    /** ID 値 (sfr_sf_shipping_destination.spcify_vehicle) */
    private final int id;
    /** 画面表示名 */
    private final String displayName;

    /** ID → enum 変換表 */
    private static final Map<Integer, SpecifyVehicle> idMap
        = CollectionUtil.toUnmodifiableMap(values(), SpecifyVehicle::getId);

    /**
     * コンストラクタ
     *
     * @param id ID 値
     * @param displayName 画面表示名
     */
    SpecifyVehicle(int id, String displayName) {
        this.id = id;
        this.displayName = displayName;
    }

    /**
     * @return ID 値
     */
    public @Nonnull Integer getId() {
        return id;
    }

    /**
     * @return 画面表示名
     */
    public String getDiaplayName() {
        return displayName;
    }

    /**
     * id を元に SpecifyVehicle を解決する
     *
     * @param id ID 値
     * @return SpecifyVehicle (null: id 値不正)
     */
    public static SpecifyVehicle valueOf(Integer id) {
        return idMap.get(id);
    }
}
