package vn.vnext.sefuri.sf.common.enums;

import java.util.Map;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * 表面加工の区分値
 *
 * <p>sfr_sf_product.surface_treatment_id_f, sfr_sf_product.surface_treatment_id_b
 * <p>対応する TypeScript は client/src/app/view/SF/SF00302/helper/master-option.ts の SURFACE_TREATMENT
 */
public enum SurfaceTreatment {

    /** UVOPニス */
    UVOP_VARNISH(8, "UVOPニス"),
    /** UVOPマット */
    UVOP_MATTE(17, "UVOPマット"),
    /** UVクリアニス（インライン） */
    UVOP_CLEAR_VARNISH_INLINE(6, "UVクリアニス（インライン）"),
    /** UVクリアニス（オフライン） */
    //UVOP_CLEAR_VARNISH_OFFLINE(15, "UVクリアニス（オフライン）"),
    /** UVマットニス（インライン） */
    UVOP_MATTE_VARNISH_INLINE(7, "UVマットニス（インライン）"),
    /** UVマットニス（オフライン） */
    //UVOP_MATTE_VARNISH_OFFLINE(16, "UVマットニス（オフライン）"),
    /** 水性ニス */
    AQUEOUS_VARNISH(9, "水性ニス"),
    /** 水性プレス */
    AQUEOUS_PRESS(1, "水性プレス"),
    /** ビニール引き（インライン） */
    VINYL_ARGUMENT_INLINE(2, "ビニール引き（インライン）"),
    /** ビニール引き（オフライン） */
    VINYL_ARGUMENT_OFFLINE(3, "ビニール引き（オフライン）"),
    /** ビニール引き（マット・インライン） */
    VINYL_ARGUMENT_MATTE_INLINE(10, "ビニール引き（マット・インライン）"),
    /** ビニール引き（マット・オフライン） */
    VINYL_ARGUMENT_MATTE_OFFLINE(11, "ビニール引き（マット・オフライン）"),
    /** PP貼り */
    PP(4, "PP貼り", true),
    /** PPベタ窓 */
    PP_SOLID_WINDOW(12, "PPベタ窓", true),
    /** PP20μ */
    PP_20u(13, "PP20μ", true),
    /** PP20μベタ窓 */
    PP_20u_SOLID_WINDOW(18, "PP20μベタ窓", true),
    /** プレスコート（またはクリスタルP） */
    PRESS_COAT_OR_CRYSTAL_P(14, "プレスコート（またはクリスタルP）"),
    /** スポットニス */
    SPOT_VARNISH(19, "スポットニス"),
    /** 疑似エンボス（OPクリア／UVマット・ハード） */
    //PSEUDO_EMBOSS(20, "疑似エンボス（OPクリア／UVマット・ハード）"),
    /** 疑似エンボスソフト */
    PSEUDO_EMBOSS_SOFT(21, "疑似エンボスソフト"),
    /** 疑似エンボスハード */
    PSEUDO_EMBOSS_HARD(22, "疑似エンボスハード");


    /** ID 値 (sfr_sf_product.surface_treatment_id_f, sfr_sf_product.surface_treatment_id_b) */
    private final int id;
    /** 画面表示名 */
    private final String displayName;
    /** PP かどうか true: PP, false: PP ではない */
    private final boolean pp;

    /** ID → enum 変換表 */
    private static final Map<Integer, SurfaceTreatment> idMap
        = CollectionUtil.toUnmodifiableMap(values(), SurfaceTreatment::getId);

    /**
     * コンストラクタ (PP ではない)
     *
     * @param id ID 値
     * @param displayName 画面表示名
     */
    private SurfaceTreatment(int id, String displayName) {
        this(id, displayName, false);
    }

    /**
     * コンストラクタ
     *
     * @param id ID 値
     * @param displayName 画面表示名
     * @param pp PP かどうか true: PP, false: PP ではない
     */
    private SurfaceTreatment(int id, String displayName, boolean pp) {
        this.id = id;
        this.displayName = displayName;
        this.pp = pp;
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
    public @Nonnull String getDiaplayName() {
        return displayName;
    }

    /**
     * @return PP かどうか true: PP, false: PP ではない
     */
    public boolean isPp() {
        return pp;
    }

    /**
     * id を元に UpstairsDetail を解決する
     *
     * @param id ID 値
     * @return UpstairsDetail (null: id 値不正)
     */
    public static SurfaceTreatment valueOf(Integer id) {
        return idMap.get(id);
    }
}
