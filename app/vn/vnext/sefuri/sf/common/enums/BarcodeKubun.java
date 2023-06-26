package vn.vnext.sefuri.sf.common.enums;

import java.util.Map;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * バーコード区分値
 */
public enum BarcodeKubun {
    /** JAN */
    JAN("01", "JAN"),
    /** ITF */
    ITF("02", "ITF"),
    /** GTIN */
    GTIN("04", "GTIN"),
    /** UPC */
    UPC("03", "UPC"),
    /** その他 */
    OTHER("99", "その他");

    /** 区分値 (sfr_sf_product.specs_barcode_k1 〜 3) */
    private final String id;
    /** 画面表示名 */
    private final String displayName;

    /** ID → enum 変換表 */
    private static final Map<String, BarcodeKubun> idMap
        = CollectionUtil.toUnmodifiableMap(values(), BarcodeKubun::getId);

    /**
     * コンストラクタ
     *
     * @param id 区分値
     * @param displayName 画面表示名
     */
    BarcodeKubun(String id, String displayName) {
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
     * id を元に BarcodeKubun を解決する
     *
     * @param id ID 値
     * @return BarcodeKubun (null: id 値不正)
     */
    public static BarcodeKubun of(String id) {
        return idMap.get(id);
    }
}
