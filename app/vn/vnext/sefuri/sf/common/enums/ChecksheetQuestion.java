package vn.vnext.sefuri.sf.common.enums;

import java.util.Map;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * チェックシートの設問
 *
 * sfr_sf_checksheet.question_code
 */
public enum ChecksheetQuestion {

    /** バーコード: JAN */
    BARCODE_JAN(2061, "JAN"),
    /** バーコード: ITF */
    BARCODE_ITF(2062, "ITF"),
    /** バーコード: GTIN */
    BARCODE_GTIN(2063, "GTIN"),
    /** バーコード: UPC */
    BARCODE_UPC(2064, "UPC"),
    /** バーコード: その他 */
    BARCODE_OTHER(2065, "その他");

    /** ID 値 (sfr_sf_checksheet.question_code) */
    private final int id;
    /** 画面表示名 */
    private final String displayName;

    /** ID → enum 変換表 */
    private static final Map<Integer, ChecksheetQuestion> idMap
        = CollectionUtil.toUnmodifiableMap(values(), ChecksheetQuestion::getId);

    /**
     * コンストラクタ
     *
     * @param id ID 値
     * @param displayName 画面表示名
     */
    ChecksheetQuestion(int id, String displayName) {
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
     * id を元に ChecksheetQuestion を解決する
     *
     * @param id ID 値
     * @return ChecksheetQuestion (null: id 値不正)
     */
    public static ChecksheetQuestion valueOf(Integer id) {
        return idMap.get(id);
    }
}
