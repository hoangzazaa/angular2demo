package vn.vnext.sefuri.sf.module.export.helper;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by username on 8/29/2017.
 */
public class MstStep {
    static Map<String, Integer> MST_STEP_ARRANGE_SHAPE;
    static Map<String, Integer> MST_STEP_ARRANGE_CARTON_CASE;
    static Map<String, Integer> MST_STEP_ARRANGE_CARTON_SHEET;
    static Map<String, Integer> MST_STEP_ARRANGE_DECORATIVE;
    static {
        MST_STEP_ARRANGE_SHAPE =  new HashMap<>();
        // 1. 断裁/ Cutting
        MST_STEP_ARRANGE_SHAPE.put("DS001", 1);

        // 2. アンカーコート: Anchor Coat
        MST_STEP_ARRANGE_SHAPE.put("AK001", 2);

        // 3. 印刷方法/ Phương pháp in
        //      3.1. オフセット/ Offset
        MST_STEP_ARRANGE_SHAPE.put("O002", 3);
        //      3.2. ﾃﾞｼﾞﾀﾙ片面(ｶﾗｰ4C)
        MST_STEP_ARRANGE_SHAPE.put("D001", 3);
        //      3.3. ﾃﾞｼﾞﾀﾙ片面(ﾓﾉｸﾛ)
        MST_STEP_ARRANGE_SHAPE.put("D002", 3);
        //      3.4. ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ4C)
        MST_STEP_ARRANGE_SHAPE.put("D003", 3);
        //      3.5. ﾃﾞｼﾞﾀﾙ両面(ﾓﾉｸﾛ)
        MST_STEP_ARRANGE_SHAPE.put("D004", 3);
        //      3.6. ﾃﾞｼﾞﾀﾙ片面(ｶﾗｰ7C)
        MST_STEP_ARRANGE_SHAPE.put("D005", 3);
        //      3.7. ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ4C+ﾓﾉｸﾛ)
        MST_STEP_ARRANGE_SHAPE.put("D006", 3);
        //      3.8. ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ｶﾗｰ4C)
        MST_STEP_ARRANGE_SHAPE.put("D007", 3);
        //      3.9. ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ﾓﾉｸﾛ)
        MST_STEP_ARRANGE_SHAPE.put("D008", 3);
        //      3.10. ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ｶﾗｰ7C)
        MST_STEP_ARRANGE_SHAPE.put("D009", 3);

        // 4. 2PP_表面加工 Front/ Gia công bề mặt Front
        //      4.1. 2PP_SurfaceTreatmentId
        MST_STEP_ARRANGE_SHAPE.put("NS002", 4);

        // 5. 表面加工 Front/ Gia công bề mặt Front
        //      5.1. UVクリアニス インライン
        MST_STEP_ARRANGE_SHAPE.put("UV001", 5);
        //      5.2. UVマットニス インライン
        MST_STEP_ARRANGE_SHAPE.put("UV003", 5);
        //      5.3. 水性ニス
        MST_STEP_ARRANGE_SHAPE.put("NS001", 5);
        //      5.4. ビニール引き（インライン）：ビニール（インライン）
        MST_STEP_ARRANGE_SHAPE.put("BN001", 5);
        //      5.5. ビニール引き（オフライン）：ビニール（オフライン）
        MST_STEP_ARRANGE_SHAPE.put("BN002", 5);
        //      5.6. ビニール引き（マット・インライン）：マットビニール（インライン）(BN003)
        MST_STEP_ARRANGE_SHAPE.put("BN003", 5);
        //      5.7. ビニール引き（マット・オフライン）：マットビニール（オフライン）(BN004)
        MST_STEP_ARRANGE_SHAPE.put("BN004", 5);
        //      5.8. 水性プレス
        //      5.9. プレスコート（またはクリスタルP）
        MST_STEP_ARRANGE_SHAPE.put("P001", 5);
        //      5.10. PP貼り
        MST_STEP_ARRANGE_SHAPE.put("PP001", 5);
        //      5.11. PPベタ窓
        MST_STEP_ARRANGE_SHAPE.put("PP003", 5);
        //      5.12. PP20
        MST_STEP_ARRANGE_SHAPE.put("PP002", 5);
        //      5.13. PP20μベタ窓
        MST_STEP_ARRANGE_SHAPE.put("PP004", 5);

        // 8. エンボス加工/ Gia công in nổi(emboss)
        MST_STEP_ARRANGE_SHAPE.put("EB005",8);
        //      8.1. エンボス キャンバス布目
        MST_STEP_ARRANGE_SHAPE.put("EB004",8);
        //      8.2. エンボス つむぎ
        MST_STEP_ARRANGE_SHAPE.put("EB006",8);
        //      8.3. エンボス ヘアーライン
        MST_STEP_ARRANGE_SHAPE.put("EB007",8);
        //      8.4. エンボス 絹目
        MST_STEP_ARRANGE_SHAPE.put("EB002",8);
        //      8.5. エンボス 絹目格子
        MST_STEP_ARRANGE_SHAPE.put("EB003",8);
        //      8.6. エンボス 皮絞
        MST_STEP_ARRANGE_SHAPE.put("EB008",8);
        //      8.7. エンボス 布目
        MST_STEP_ARRANGE_SHAPE.put("EB009",8);
        //      8.8. エンボス 梨地
        MST_STEP_ARRANGE_SHAPE.put("EB001",8);

        // 9. 片段（貼合の場合）/ 片段 (Trường hợp dán ghép)
        MST_STEP_ARRANGE_SHAPE.put("KD001",9);

        // 8. ラミネート（貼合の場合）/ Laminate (Trường hợp dán ghép)
        MST_STEP_ARRANGE_SHAPE.put("R001",8);

        // 9. 打ち抜き/ Bế
        MST_STEP_ARRANGE_SHAPE.put("U001",9);
        MST_STEP_ARRANGE_SHAPE.put("U002",9);
        MST_STEP_ARRANGE_SHAPE.put("U003",9);

        // 10. 箔押し/ Mạ
        MST_STEP_ARRANGE_SHAPE.put("HK001",10);
        MST_STEP_ARRANGE_SHAPE.put("HK002",10);
        MST_STEP_ARRANGE_SHAPE.put("HK003",10);

        // 11. 窓貼り/ Dán cửa sổ
        MST_STEP_ARRANGE_SHAPE.put("M001",11);

        // 12. 貼り/ Dán
        MST_STEP_ARRANGE_SHAPE.put("TE001",12);
        MST_STEP_ARRANGE_SHAPE.put("S001",12);
        MST_STEP_ARRANGE_SHAPE.put("S002",12);
        MST_STEP_ARRANGE_SHAPE.put("S003",12);
        MST_STEP_ARRANGE_SHAPE.put("S004",12);
        MST_STEP_ARRANGE_SHAPE.put("S005",12);
        MST_STEP_ARRANGE_SHAPE.put("S006",12);
        MST_STEP_ARRANGE_SHAPE.put("S007",12);
        MST_STEP_ARRANGE_SHAPE.put("S008",12);
        MST_STEP_ARRANGE_SHAPE.put("S009",12);
        MST_STEP_ARRANGE_SHAPE.put("S010",12);
        MST_STEP_ARRANGE_SHAPE.put("S011",12);
        MST_STEP_ARRANGE_SHAPE.put("S012",12);
        MST_STEP_ARRANGE_SHAPE.put("S013",12);
        MST_STEP_ARRANGE_SHAPE.put("S014",12);
        MST_STEP_ARRANGE_SHAPE.put("S015",12);
        MST_STEP_ARRANGE_SHAPE.put("S016",12);

        // 13. 検品/ Kiểm tra
        MST_STEP_ARRANGE_SHAPE.put("KP001",13);

        // 14. 梱包/ Đóng gói
        MST_STEP_ARRANGE_SHAPE.put("CP001",14);
        MST_STEP_ARRANGE_SHAPE.put("CP002",14);
        MST_STEP_ARRANGE_SHAPE.put("CP003",14);
        MST_STEP_ARRANGE_SHAPE.put("CP004",14);
        MST_STEP_ARRANGE_SHAPE.put("CP005",14);

        MST_STEP_ARRANGE_CARTON_CASE =  new HashMap<>();

        MST_STEP_ARRANGE_CARTON_SHEET =  new HashMap<>();

        MST_STEP_ARRANGE_DECORATIVE =  new HashMap<>();

    }
}
