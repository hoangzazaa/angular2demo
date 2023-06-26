package vn.vnext.sefuri.sf.common.enums;

import java.util.Map;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * 荷降ろし時のリフト使用者の区分値
 *
 * <p>sfr_sf_shipping_destination.lift_user_in_unloading
 */
public enum LiftUserInUnloading {
    /** 納品先担当者 */
    CLIENT(1, "納品先担当者"),
    /** 配送ドライバー */
    DRIVER(2, "配送ドライバー");

    /** ID 値 (sfr_sf_shipping_destination.lift_user_in_unloading) */
    private final int id;
    /** 画面表示名 */
    private final String displayName;

    /** ID → enum 変換表 */
    private static final Map<Integer, LiftUserInUnloading> idMap
        = CollectionUtil.toUnmodifiableMap(values(), LiftUserInUnloading::getId);

    /**
     * コンストラクタ
     *
     * @param id ID 値
     * @param displayName 画面表示名
     */
    LiftUserInUnloading(int id, String displayName) {
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
     * id を元に LiftUserInUnloading を解決する
     *
     * @param id ID 値
     * @return LiftUserInUnloading (null: id 値不正)
     */
    public static LiftUserInUnloading valueOf(Integer id) {
        return idMap.get(id);
    }
}
