package vn.vnext.sefuri.sf.common.enums;

import java.util.Map;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * 2F上げ (有の内容)の区分値
 *
 * <p>sfr_sf_shipping_destination.upstairs_detail
 */
public enum UpstairsDetail {
    /** 昇降機 */
    ELEVATOR(1, "昇降機"),
    /** 階段 */
    STAIRS(2, "階段"),
    /** その他 */
    OTHERS(9999, "その他");

    /** ID 値 (sfr_sf_shipping_destination.upstairs_detail) */
    private final int id;
    /** 画面表示名 */
    private final String displayName;

    /** ID → enum 変換表 */
    private static final Map<Integer, UpstairsDetail> idMap
        = CollectionUtil.toUnmodifiableMap(values(), UpstairsDetail::getId);

    /**
     * コンストラクタ
     *
     * @param id ID 値
     * @param displayName 画面表示名
     */
    UpstairsDetail(int id, String displayName) {
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
     * id を元に UpstairsDetail を解決する
     *
     * @param id ID 値
     * @return UpstairsDetail (null: id 値不正)
     */
    public static UpstairsDetail valueOf(Integer id) {
        return idMap.get(id);
    }
}
