package vn.vnext.sefuri.sf.module.export.helper;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by username on 9/5/2017.
 */
public class MstDataStep {
    static Map<String, String> MST_DATA_STEP_ARRANGE_SHAPE;
    static Map<String, String> MST_DATA_STEP_ARRANGE_CARTON_CASE;
    static Map<String, String> MST_DATA_STEP_ARRANGE_CARTON_SHEET;
    static Map<String, String> MST_DATA_STEP_ARRANGE_DECORATIVE;
    static {
        MST_DATA_STEP_ARRANGE_SHAPE =  new HashMap<>();
        // 1. 断裁/ Cutting
        MST_DATA_STEP_ARRANGE_SHAPE.put("DS001", "断裁");

        // 2. アンカーコート: Anchor Coat
        MST_DATA_STEP_ARRANGE_SHAPE.put("AK001", "アンカーコート");

        // 3. 印刷方法/ Phương pháp in
        //      3.1. オフセット/ Offset
        MST_DATA_STEP_ARRANGE_SHAPE.put("O002", "オフセット");
        //      3.2. ﾃﾞｼﾞﾀﾙ片面(ｶﾗｰ4C)
        MST_DATA_STEP_ARRANGE_SHAPE.put("D001", "ﾃﾞｼﾞﾀﾙ片面(ｶﾗｰ4C)");
        //      3.3. ﾃﾞｼﾞﾀﾙ片面(ﾓﾉｸﾛ)
        MST_DATA_STEP_ARRANGE_SHAPE.put("D002", "ﾃﾞｼﾞﾀﾙ片面(ｶﾗｰ7C)");
        //      3.4. ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ4C)
        MST_DATA_STEP_ARRANGE_SHAPE.put("D003", "ﾃﾞｼﾞﾀﾙ片面(ﾓﾉｸﾛ)");
        //      3.5. ﾃﾞｼﾞﾀﾙ両面(ﾓﾉｸﾛ)
        MST_DATA_STEP_ARRANGE_SHAPE.put("D004", "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ4C)");
        //      3.6. ﾃﾞｼﾞﾀﾙ片面(ｶﾗｰ7C)
        MST_DATA_STEP_ARRANGE_SHAPE.put("D005", "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ4C+ﾓﾉｸﾛ)");
        //      3.7. ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ4C+ﾓﾉｸﾛ)
        MST_DATA_STEP_ARRANGE_SHAPE.put("D006", "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ｶﾗｰ4C)");
        //      3.8. ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ｶﾗｰ4C)
        MST_DATA_STEP_ARRANGE_SHAPE.put("D007", "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ｶﾗｰ7C)");
        //      3.9. ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ﾓﾉｸﾛ)
        MST_DATA_STEP_ARRANGE_SHAPE.put("D008", "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ﾓﾉｸﾛ)");
        //      3.10. ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ｶﾗｰ7C)
        MST_DATA_STEP_ARRANGE_SHAPE.put("D009", "ﾃﾞｼﾞﾀﾙ両面(ﾓﾉｸﾛ)");

        // 4. 2PP_表面加工 Front/ Gia công bề mặt Front
        //      4.1. 2PP_SurfaceTreatmentId
        // TODO: chưa rõ data hiển thị
        MST_DATA_STEP_ARRANGE_SHAPE.put("NS002", "2PP 表面加工");

        // 5. 表面加工 Front/ Gia công bề mặt Front
        //      5.1. UVクリアニス インライン
        MST_DATA_STEP_ARRANGE_SHAPE.put("UV001", "UVクリアニス（インライン）");
        //      5.2. UVマットニス インライン
        MST_DATA_STEP_ARRANGE_SHAPE.put("UV003", "UVマットニス（インライン）");
        //      5.3. 水性ニス
        MST_DATA_STEP_ARRANGE_SHAPE.put("NS001", "水性ニス");
        //      5.4. ビニール引き（インライン）：ビニール（インライン）
        MST_DATA_STEP_ARRANGE_SHAPE.put("BN001", "ビニール引き（インライン）");
        //      5.5. ビニール引き（オフライン）：ビニール（オフライン）
        MST_DATA_STEP_ARRANGE_SHAPE.put("BN002", "ビニール引き（オフライン）");
        //      5.6. ビニール引き（マット・インライン）：マットビニール（インライン）(BN003)
        MST_DATA_STEP_ARRANGE_SHAPE.put("BN003", "ビニール引き（マット・インライン）");
        //      5.7. ビニール引き（マット・オフライン）：マットビニール（オフライン）(BN004)
        MST_DATA_STEP_ARRANGE_SHAPE.put("BN004", "ビニール引き（マット・オフライン）");
        //      5.8. 水性プレス
        //      5.9. プレスコート（またはクリスタルP）
        MST_DATA_STEP_ARRANGE_SHAPE.put("P001", "水性プレス");
        //      5.10. PP貼り
        MST_DATA_STEP_ARRANGE_SHAPE.put("PP001", "PP貼り");
        //      5.11. PPベタ窓
        MST_DATA_STEP_ARRANGE_SHAPE.put("PP003", "PPベタ窓");
        //      5.12. PP20
        MST_DATA_STEP_ARRANGE_SHAPE.put("PP002", "PP20");
        //      5.13. PP20μベタ窓
        MST_DATA_STEP_ARRANGE_SHAPE.put("PP004", "PP20μベタ窓");

        // 8. エンボス加工/ Gia công in nổi(emboss)
        MST_DATA_STEP_ARRANGE_SHAPE.put("EB005","キャンパス布目");
        //      8.1. エンボス キャンバス布目
        MST_DATA_STEP_ARRANGE_SHAPE.put("EB004","つむぎ");
        //      8.2. エンボス つむぎ
        MST_DATA_STEP_ARRANGE_SHAPE.put("EB006","ヘアーカール");
        //      8.3. エンボス ヘアーライン
        MST_DATA_STEP_ARRANGE_SHAPE.put("EB007","ヘアーライン");
        //      8.4. エンボス 絹目
        MST_DATA_STEP_ARRANGE_SHAPE.put("EB002","絹目");
        //      8.5. エンボス 絹目格子
        MST_DATA_STEP_ARRANGE_SHAPE.put("EB003","絹目格子");
        //      8.6. エンボス 皮絞
        MST_DATA_STEP_ARRANGE_SHAPE.put("EB008","皮紋");
        //      8.7. エンボス 布目
        MST_DATA_STEP_ARRANGE_SHAPE.put("EB009","布目");
        //      8.8. エンボス 梨地
        MST_DATA_STEP_ARRANGE_SHAPE.put("EB001","梨地");

        // 9. 片段（貼合の場合）/ 片段 (Trường hợp dán ghép)
        MST_DATA_STEP_ARRANGE_SHAPE.put("KD001","片段（貼合の場合）");

        // 8. ラミネート（貼合の場合）/ Laminate (Trường hợp dán ghép)
        MST_DATA_STEP_ARRANGE_SHAPE.put("R001","ラミネート（貼合の場合）");

        // 9. 打ち抜き/ Bế
        MST_DATA_STEP_ARRANGE_SHAPE.put("U001","打ち抜き");
        MST_DATA_STEP_ARRANGE_SHAPE.put("U002","打ち抜き");
        MST_DATA_STEP_ARRANGE_SHAPE.put("U003","打ち抜き");

        // 10. 箔押し/ Mạ
        MST_DATA_STEP_ARRANGE_SHAPE.put("HK001","箔押し");
        MST_DATA_STEP_ARRANGE_SHAPE.put("HK002","型出し・箔押し");
        MST_DATA_STEP_ARRANGE_SHAPE.put("HK003","型出し（箔なし）");

        // 11. 窓貼り/ Dán cửa sổ
        MST_DATA_STEP_ARRANGE_SHAPE.put("M001","窓貼り");

        // 12. 貼り/ Dán
        MST_DATA_STEP_ARRANGE_SHAPE.put("TE001","手貼り");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S001","機械貼り（胴貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S002","機械貼り（両サイド貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S003","機械貼り（ワンタッチ貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S004","機械貼り（四コーナー貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S005","機械貼り（六コーナー貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S006","機械貼り（胴貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S007","機械貼り（両サイド貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S008","機械貼り（ワンタッチ貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S009","機械貼り（四コーナー貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S010","機械貼り（六コーナー貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S011","機械貼り（胴貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S012","機械貼り（両サイド貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S013","機械貼り（ワンタッチ貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S014","機械貼り（四コーナー貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S015","機械貼り（四コーナー貼り）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("S016","機械貼り（四コーナー貼り）");

        // 13. 検品/ Kiểm tra
        // TODO: SF đang có 3 id. Denno chỉ có 1 mã code
        MST_DATA_STEP_ARRANGE_SHAPE.put("KP001","");

        // 14. 梱包/ Đóng gói
        MST_DATA_STEP_ARRANGE_SHAPE.put("CP001_1","ｸﾗﾌﾄ梱包（コダマ）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("CP001_2","ｸﾗﾌﾄ梱包（佐賀）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("CP002","ｼｭﾘﾝｸ梱包（佐賀）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("CP003","段ﾎﾞｰﾙ梱包（社用）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("CP004","ｸﾗﾌﾄ梱包（コダマ）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("CP005_6","段ﾎﾞｰﾙ梱包（専用）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("CP005_7","段ﾎﾞｰﾙ梱包（専用）");
        MST_DATA_STEP_ARRANGE_SHAPE.put("CP005_8","");
        MST_DATA_STEP_ARRANGE_SHAPE.put("CP005_9","");

        MST_DATA_STEP_ARRANGE_CARTON_CASE =  new HashMap<>();

        MST_DATA_STEP_ARRANGE_CARTON_SHEET =  new HashMap<>();

        MST_DATA_STEP_ARRANGE_DECORATIVE =  new HashMap<>();

    }
}
