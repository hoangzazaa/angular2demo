package vn.vnext.sefuri.sf.module.export.helper;

import java.util.Map;

import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * Created by username on 9/1/2017.
 */
public final class EnumsPDF {
    /**
     * Defind Step For Shape
     */
    public enum ShapeStep {
        // 1. 断裁/ Cutting
        CUTTING(1),
        // 2. アンカーコート/ Anchor Coat
        ANCHOR_COAT(2),
        // 3. 印刷方法/ Phương pháp in front
        PRINT_METHOD_FRONT(3),
        // 4. 印刷方法/ Phương pháp in front
        PRINT_METHOD_BACK(4),
        // 5. 2PP_表面加工 Front/ Gia công bề mặt Front
        PP_SURFACE_TREATMENT_FRONT(5),
        // 6. 打ち抜き/ Bế front
        PUNCHING_FRONT(6),
        // 7. 表面加工 Front/ Gia công bề mặt Front
        SURFACE_TREATMENT_FRONT(7),
        // 8. 2PP 表面加工 Back/ Gia công bề mặt Back
        PP_SURFACE_TREATMENT_BACK(8),
        // 9. 打ち抜き/ Bế Back
        PUNCHING_BACK(9),
        // 10. 2PP 表面加工 Back/ Gia công bề mặt Back
        SURFACE_TREATMENT_BACK(10),
        // 11. エンボス加工/ Gia công in nổi(emboss)
        EMBOSSING(11),
        // 12. 片段（貼合の場合）/ 片段 (Trường hợp dán ghép)
        ONE_STAGE(12),
        // 13.ラミネート（貼合の場合）/ Laminate (Trường hợp dán ghép)
        LAMINATE(13),
        // 14. 打ち抜き/ Bế
        PUNCHING(14),
        // 15. 箔押し/ Mạ
        STAMPING(15),
        // 16. 窓貼り/ Dán cửa sổ
        WINDOW_STICKING(16),
        // 17. 貼り/ Dán
        PASTING(17),
        // 18. 検品/ Kiểm tra
        CHECKING(18),
        // 19. 梱包/ Đóng gói
        PACKING(19);

        private Integer step;

        ShapeStep(final Integer step) {
            this.step = step;
        }

        public Integer getValue() {
            return step;
        }
    }

    /**
     * Defind Step For Carton Case
     */
    public enum CartonCaseStep {
        // 1. Công đoạn ケース
        CHOOSE_CARTON(1),
        // 2. 梱包/ Đóng gói
        PACKING(2);

        private Integer step;

        CartonCaseStep(final Integer step) {
            this.step = step;
        }

        public Integer getValue() {
            return step;
        }
    }

    /**
     * Defind Step For Carton Sheet
     */
    public enum CartonSheetStep {

        // 1. Công đoạn ケース
        CHOOSE_CARTON(1),
        // 2. Slitter スリッター
        SLITTER(2),
        // 3. Srisko スリスコ
        SRISKO(3),
        // 4. Slitter + Srisko
        SLITTER_SRISKO(4),
        // 5. 梱包/ Đóng gói
        PACKING(5),
        // 6. Buộc
        BINDING(6);

        private Integer step;

        CartonSheetStep(final Integer step) {
            this.step = step;
        }

        public Integer getValue() {
            return step;
        }
    }


    public enum CartonType {
        /** ケース (A式) */
        CARTON_CASE(2),
        /** シート (A式以外) */
        CARTON_SHEET(1);

        /** ID → enum 変換表 */
        private static final Map<Integer, CartonType> idMap
            = CollectionUtil.toUnmodifiableMap(values(), CartonType::getType);

        CartonType(Integer type) {
            this.type = type;
        }

        private final Integer type;

        public Integer getType() {
            return type;
        }

        /**
         * id を元に CartonType を解決する
         *
         * @param id ID 値
         * @return ProductType (null: id 値不正)
         */
        public static CartonType valueOf(Integer id) {
            return idMap.get(id);
        }

    }

    public enum LaminationFluteCarton {
        AF(1),
        BF(2),
        WF(3),
        CF(4);

        /** ID → enum 変換表 */
        private static final Map<Integer, LaminationFluteCarton> idMap
            = CollectionUtil.toUnmodifiableMap(values(), LaminationFluteCarton::getValue);

        LaminationFluteCarton(Integer value) {
            this.value = value;
        }

        private final Integer value;

        public Integer getValue() {
            return value;
        }

        /**
         * id を元に ProductType を解決する
         *
         * @param id ID 値
         * @return ProductType (null: id 値不正)
         */
        public static LaminationFluteCarton valueOf(Integer id) {
            return idMap.get(id);
        }

    }
}
