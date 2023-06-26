package vn.vnext.sefuri.sf.common.enums;

import java.util.Map;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * 請求方法区分値 (sfr_sf_customer.billing_method, DFW_M30M.FILLER20)
 */
public enum BillingMethodKubun {
    /** A: メール */
    MAIL("A", "メール"),
    /** B: 郵送 */
    POST("B", "郵送"),
    /** C: 個別対応 */
    SPECIAL("C", "個別対応"),
    /** D: 計算センター対応不要 */
    UNNECESSARY("D", "計算センター対応不要");

    /** 区分値 (sfr_sf_customer.billing_method, DFW_M30M.FILLER20) */
    private final String id;
    /** 画面表示名 */
    private final String displayName;

    /** ID → enum 変換表 */
    private static final Map<String, BillingMethodKubun> idMap
        = CollectionUtil.toUnmodifiableMap(values(), BillingMethodKubun::getId);

    /**
     * コンストラクタ
     *
     * @param id 区分値
     * @param displayName 画面表示名
     */
    BillingMethodKubun(String id, String displayName) {
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
     * id を元に BillingMethodKubun を解決する
     *
     * @param id ID 値
     * @return BillingMethodKubun (null: id 値不正)
     */
    public static BillingMethodKubun of(String id) {
        return idMap.get(id);
    }
}
