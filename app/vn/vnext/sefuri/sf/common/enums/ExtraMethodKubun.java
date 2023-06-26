package vn.vnext.sefuri.sf.common.enums;

import java.util.Map;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * 専用伝票区分値 (電脳的には系列C)
 *
 * str_sf_shipping_destination.extra_method
 */
public enum ExtraMethodKubun {
    /** 出荷案内書 */
    GUIDE("00", "出荷案内書"),
    /** 専用伝票 */
    SPECIAL("01", "専用伝票"),
    /** 両方添付 */
    BOTH("02", "両方添付"),
    /** 添付なし */
    NONE("03", "添付なし");


    /** 区分値 (str_sf_shipping_destination.extra_method, 系列C) */
    private final String id;
    /** 画面表示名 */
    private final String displayName;

    /** ID → enum 変換表 */
    private static final Map<String, ExtraMethodKubun> idMap
        = CollectionUtil.toUnmodifiableMap(values(), ExtraMethodKubun::getId);


    /**
     * コンストラクタ
     *
     * @param id 区分値
     * @param displayName 画面表示名
     */
    ExtraMethodKubun(String id, String displayName) {
        this.id = id;
        this.displayName = displayName;
    }

    /**
     * @return 区分値
     */
    public @Nonnull String getId() {
        return id;
    }

    /**
     * @return 画面表示名
     */
    public String getDiaplayName() {
        return displayName;
    }

    /**
     * id を元に ExtraMethodKubun を解決する
     *
     * @param id ID 値
     * @return ExtraMethodKubun (null: id 値不正)
     */
    public static ExtraMethodKubun of(String id) {
        return idMap.get(id);
    }
}
