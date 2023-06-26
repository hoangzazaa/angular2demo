package vn.vnext.sefuri.sf.common.enums;

import java.util.Map;
import java.util.Objects;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * よく使われる原紙の区分値 (sfr_sf_product.paper_name_id)
 */
public enum PaperName {

    /** MCFコート */
    MCF_COAT(1, "MCFコート"),
    /** NSコート */
    NS_COAT(2, "NSコート"),
    /** サンコート */
    SUN_COAT(3, "サンコート"),
    // 4: "サンダイヤ",
    /** SQカード */
    SQ_CARD(5, "SQカード"),
    // 6: "ＪＥＴスター",
    /** JETエースW */
    JET_ACE_W(7, "JETエースW"),
    // 8: "NEWウルトラＨ",
    // 9: "ウルトラＨ",
    // 10: "ユニフェイス",
    // 11: "アイベスト",
    /** TitanBoard */
    TITAN_BOARD(12, "TitanBoard"),
    /** SCコート */
    SC_COAT(13, "SCコート"),
    // 14: "ＳＩコート",
    // 15: "キングシルバー",
    // 16: "キングゴールド",
    // 17: "エコバリーＫ",
    // 18: "エコバリーV",
    // 19: "ＴＳ耐水紙",
    /** NEWピジョン */
    NEW_PIGEON(20, "NEWピジョン"),
    // 21: "新耐油紙",
    /** CRC */
    CRC(22, "CRC");

    /** その他(板紙・ライナー) の区分値 */
    public static final int OTHERS = 100;


    /** 区分値 (sfr_sf_product.paper_name_id) */
    private final Integer id;
    /** 画面表示名 */
    private final String displayName;

    /** ID → enum 変換表 */
    private static final Map<Integer, PaperName> idMap
        = CollectionUtil.toUnmodifiableMap(values(), PaperName::getId);

    /**
     * コンストラクタ
     *
     * @param id 区分値
     * @param displayName 画面表示名
     */
    PaperName(Integer id, String displayName) {
        this.id = id;
        this.displayName = displayName;
    }

    /**
     * @return 区分値
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
     * id を元に PaperName を解決する
     *
     * @param id ID 値
     * @return PaperName (null: id 値不正)
     */
    public static PaperName valueOf(Integer id) {
        return idMap.get(id);
    }

    /**
     * その他(板紙・ライナー) かどうか判定する
     *
     * @param id ID 値
     * @return true: その他(板紙・ライナー) である false: その他(板紙・ライナー) ではない
     */
    public static boolean isOthers(Integer id) {
        return id != null && id == OTHERS;
    }

}
