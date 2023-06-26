package vn.vnext.sefuri.sf.common.enums;

import java.util.Map;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * 数量制限の区分値
 *
 * <p>sfr_sf_shipping_destination.limit_quantity
 * <p>sfr_sf_checksheet.selectbox1 (question_code=1008)
 */
public enum LimitQuantity {
    /** ◯ / ◯ */
    TYPE1(1, "◯ / ◯"),
    /** ◯ / × */
    TYPE2(2, "◯ / ×"),
    /** × / ◯ */
    TYPE3(3, "× / ◯"),
    /** × / × */
    TYPE4(4, "× / ×"),
    /** ＃ / ◯ */
    TYPE5(5, "＃ / ◯"),
    /** ◯ / ＃ */
    TYPE6(6, "◯ / ＃"),
    /** ＃ / × */
    TYPE7(7, "＃ / ×"),
    /** × / ＃ */
    TYPE8(8, "× / ＃"),
    /** ＃ / ＃ */
    TYPE9(9, "＃ / ＃");

    /** ID 値 (sfr_sf_shipping_destination.limit_quantity) */
    private final int id;
    /** 画面表示名 */
    private final String displayName;

    /** ID → enum 変換表 */
    private static final Map<Integer, LimitQuantity> idMap
        = CollectionUtil.toUnmodifiableMap(values(), LimitQuantity::getId);

    /**
     * コンストラクタ
     *
     * @param id ID 値
     * @param displayName 画面表示名
     */
    LimitQuantity(int id, String displayName) {
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
     * id を元に LimitQuantity を解決する
     *
     * @param id ID 値
     * @return LimitQuantity (null: id 値不正)
     */
    public static LimitQuantity valueOf(Integer id) {
        return idMap.get(id);
    }
}
