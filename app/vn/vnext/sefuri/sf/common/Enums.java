package vn.vnext.sefuri.sf.common;

import java.util.Map;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.module.export.helper.EnumsPDF.CartonType;
import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * This class provides some common type of file, ect.
 *
 * @author manhnv
 */
public final class Enums {
    /*for file type*/
    public enum FileType {
        PNG(".png"),
        JPG(".jpg"),
        JPEG(".jpeg"),
        GIF(".gif"),
        PDF(".pdf"),
        CSV(".csv"),
        DOCX(".docx"),
        XLSX(".xlsx"),
        DXF(".dxf"),
        DWG(".dwg"),//AutoCAD
        AI(".ai"),//AutoCAD
        AIT(".ait"),//Adobe Illustrator
        ZIP(".zip"),
        JASPER(".jasper"),
        JRPRINT(".jrprint");

        private String extension;

        FileType(final String fileExtension) {
            this.extension = fileExtension;
        }

        public String getExtension() {
            return extension;
        }

        @Override
        public String toString() {
            return extension;
        }
    }

    /*for mime type*/
    public enum MimeType {
        PNG("image/png"),
        PDF("application/pdf"),
        JPG("image/jpg"),
        JPEG("image/jpeg"),
        GIF("image/gif"),
        ZIP("application/zip"),
        CSV("text/csv");

        private String type;

        MimeType(final String mimeType) {
            this.type = mimeType;
        }

        public String getType() {
            return type;
        }

        @Override
        public String toString() {
            return type;
        }
    }

    /*for module type*/
    public enum ModuleType {
        DEAL_FILE(0, "deal-file"),
        PRODUCT_FILE(1, "product-file"),
        QUOTATION_FILE(2, "quotation-file"),
        COMMENT_FILE(3,"comment-file"),
        /** 届け先画像 */
        SHIPPING_DESTINATION_FILE(4, "shipping-destination");

        private int code; // define type to separate item to folder name
        private String name; // define for folder name

        ModuleType(final int code, final String name) {
            this.code = code;
            this.name = name;
        }

        public int getCode() {
            return code;
        }

        public String getName() {
            return name;
        }
    }

    /**
     * Deal type definition.
     * <code>
     * 新版/New edition(0): as create new Deal 「新版/ New version」
     * 在版/Repeat(1): as repeat Deal「在版/ Existing version」
     * </code>
     */
    public enum DealType {
        //0	新版
        NEW_EDITION(0),

        //1	在版
        REPEAT(1);

        private Integer type;

        DealType(final Integer type) {
            this.type = type;
        }

        public Integer getType() {
            return type;
        }
    }

    /**
     * Deal status definition.
     * <code>
     * 仕掛中/In-progress(1)
     * 設計依頼中/Design request In-progress(2)
     * 設計完了/Design complete(3)
     * 受注確定/Order confirmation(4)
     * 出荷待ち/Waiting for shipment(5)
     * Waiting for partial shipment(6)
     * 出荷済/Shipped(7)
     * </code>
     */
    public enum DealStatus {
        //1	仕掛中
        IN_PROGRESS(1),

        //2	設計依頼中
        DESIGN_REQUEST_IN_PROGRESS(2),

        //3	設計完了
        DESIGN_COMPLETE(3),

        //4	受注確定
        ORDER_CONFIRMATION(4),

        //5	出荷待ち
        WAITING_FOR_SHIPMENT(5),

        //6: SGSK-SF_Requirement_REQ bo sung_20170727.xlsx
        WAITING_FOR_PARTIAL_SHIPMENT(6),

        //7	出荷済
        SHIPPED(7);

        private Integer status;

        DealStatus(final Integer status) {
            this.status = status;
        }

        public Integer getStatus() {
            return status;
        }
    }

    /**
     * Define status for {primary_flag, highlight_flag}.
     */
    public enum Status {
        PRIMARY_FLAG_ON(1),
        PRIMARY_FLAG_OFF(0),
        HIGHLIGHT_FLAG_ON(1),
        HIGHLIGHT_FLAG_OFF(0),
        ENABLE_FLAG_ON(1),
        ENABLE_FLAG_OFF(0),
        DELETE_FLAG_ON(1),
        DELETE_FLAG_OFF(0),
        DEAL_LOCK_FLAG_ON(1),
        DEAL_LOCK_FLAG_OFF(0);

        private int status;

        Status(final int status) {
            this.status = status;
        }

        public int getStatus() {
            return status;
        }
    }

    /**
     * Department type defination.
     * <code>
     * 1. Sales department
     * 2. Support department
     * </code>
     */
    public enum DepartType {
        SALE(1),
        SUPPORT(2);

        private Integer type;

        DepartType(final Integer type) {
            this.type = type;
        }

        public Integer getType() {
            return type;
        }
    }

    public enum ExportType {
        INVENTORY("INVENTORY"),
        QUOTATION("QUOTATION"),
        PRODUCT_SHAPE("PRODUCT_SHAPE"),
        PRODUCT_CARTON("PRODUCT_CARTON"),
        CUSTOMER_KARTE("CUSTOMER_KARTE"),
        SHIPPING_DESTINATION_KARTE("SHIPPING_DESTINATION_KARTE");

        private final String type;

        ExportType(final String type) {
            this.type = type;
        }

        public String getType() {
            return type;
        }
    }

    /*Packaging method*/
    public enum PackagingMethod {
        NORMAL(1, "一次包装"),
        ABNORMAL(2, "一次包装以外");

        private int key;
        private String value;

        PackagingMethod(final int key, final String value) {
            this.key = key;
            this.value = value;
        }

        public int getKey() {
            return key;
        }

        public String getValue() {
            return value;
        }
    }

    /*Boolean type*/
    public enum BooleanType {
        TRUE("true"),
        FALSE("false");

        private String value;

        BooleanType(final String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        @Override
        public String toString() {
            return value;
        }
    }

    /**
     * Email's request type.
     * <code>
     * SF003-10: design_request_to(1)
     * SF003-09: sample_request_to(2)
     * SF003-11: samplecut_request_to(3)
     * SF003-06: request_design_to(4)
     * </code>
     */
    public enum RequestType {
        DESIGN_REQUEST_TO(1),
        SAMPLE_REQUEST_TO(2),
        SAMPLECUT_REQUEST_TO(3),
        REQUEST_DESIGN_TO(4);

        private int reqType;

        RequestType(final int reqType) {
            this.reqType = reqType;
        }

        public int getReqType() {
            return reqType;
        }
    }

    /**
     * Product type definition.
     * <code>
     * 紙器/Paper(0)
     * 段ボール/Carton(1)
     * 美粧シート/Makeup(2)
     * </code>
     *
     * sfr_sf_product.product_type
     */
    public enum ProductType {
        //0	紙器
        PAPER(0, "紙器"),

        //1	段ボール
        CARTON(1, "段ボール"),

        //2	美粧シート
        MAKEUP(2, "美粧シート");

        private Integer type;
        private String name;

        /** ID → enum 変換表 */
        private static final Map<Integer, ProductType> idMap
            = CollectionUtil.toUnmodifiableMap(values(), ProductType::getType);

        ProductType(Integer type, String name) {
            this.name = name;
            this.type = type;
        }

        public Integer getType() {
            return type;
        }

        public String getName() {
            return name;
        }

        /**
         * id を元に ProductType を解決する
         *
         * @param id ID 値
         * @return ProductType (null: id 値不正)
         */
        public static ProductType valueOf(Integer id) {
            return idMap.get(id);
        }
    }

    /**
     * 段ボール種別 (sfr_sf_product.carton_shipping_type)
     */
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

    /**
     * Product status definition.
     * <code>
     * Product does not have any request design (new edition)/New edition(null)
     * Product have request design in progress/Design request In-progress(0)
     * Product already designed/Design complete(1)
     * </code>
     */
    public enum ProductStatus {
        //null Product does not have any request design (new edition)
        NEW_EDITION(null),

        //0 Product have request design in progress
        DESIGN_REQUEST_IN_PROGRESS(0),

        //1	Product already designed
        DESIGN_COMPLETE(1);

        private Integer status;

        ProductStatus(final Integer status) {
            this.status = status;
        }

        public Integer getStatus() {
            return status;
        }
    }

    public enum CommentType {
        ACTIVITY_LOG(0),
        PRODUCT_DESIGN_REQUEST(1),
        NORMAL_SAMPLE_REQUEST(2),
        PACKAGED_SAMPLE_REQUEST(3),
        LAYOUT_DESIGN_REQUEST(4),
        DTP_REQUEST(5),
        DUMMY_REQUEST(6);

        private Integer type;

        CommentType(Integer type){
            this.type = type;
        }

        public Integer getType(){
            return this.type;
        }
    }


    /**
     * 段ボール梱包方法
     *
     * sfr_sf_product.packing_id
     */
    public enum CartonPacking {
        /** ｸﾗﾌﾄ梱包（ワークピア天山） */
        CRAFT_WORKPIA_TENZAN(1, "ｸﾗﾌﾄ梱包（ワークピア天山）"),
        /** ｸﾗﾌﾄ梱包（コダマ）*/
        CRAFT_KODAMA(2, "ｸﾗﾌﾄ梱包（コダマ）"),
        /** ｸﾗﾌﾄ梱包（佐賀） */
        CRAFT_SAGA(3, "ｸﾗﾌﾄ梱包（佐賀）"),
        /** クラフト胴巻き */
        CRAFT_WRAPPING(4, "クラフト胴巻き"),
        /** シュリンク梱包 */
        SHRINK(5, "シュリンク梱包"),
        /** 段ﾎﾞｰﾙ梱包（社用） */
        CARTON_IN_HOUSE(6, "段ﾎﾞｰﾙ梱包（社用）"),
        /** 段ﾎﾞｰﾙ梱包（専用） */
        CARTON_SPECIAL(7, "段ﾎﾞｰﾙ梱包（専用）"),
        /** パレット板締め */
        PALETTE(8, "パレット板締め"),
        /** 結束 */
        BAND(9, "結束");

        /** ID 値 (sfr_sf_product.packing_id) */
        private final int id;
        /** 画面表示名 */
        private final String displayName;

        /** ID → enum 変換表 */
        private static final Map<Integer, CartonPacking> idMap
            = CollectionUtil.toUnmodifiableMap(values(), CartonPacking::getId);

        /**
         * コンストラクタ
         *
         * @param id ID 値
         * @param displayName 画面表示名
         */
        CartonPacking(int id, String displayName) {
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
         * id を元に CartonPacking を解決する
         *
         * @param id ID 値
         * @return CartonPacking (null: id 値不正)
         */
        public static CartonPacking valueOf(Integer id) {
            return idMap.get(id);
        }
    }

    /**
     * 別加工: 撥水加工 (段ボール)
     *
     * sfr_sf_product.water_repellent_flag
     */
    public enum WaterRepellent {
        /** 片面（表） */
        FRONT(1, "片面（表）"),
        /** 片面（裏）*/
        BACK(2, "片面（裏）"),
        /** 両面 */
        FRONT_BACK(3, "両面");

        /** ID 値 (sfr_sf_product.water_repellent_flag) */
        private final int id;
        /** 画面表示名 */
        private final String displayName;

        /** ID → enum 変換表 */
        private static final Map<Integer, WaterRepellent> idMap
            = CollectionUtil.toUnmodifiableMap(values(), WaterRepellent::getId);

        /**
         * コンストラクタ
         *
         * @param id ID 値
         * @param displayName 画面表示名
         */
        WaterRepellent(int id, String displayName) {
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
         * id を元に WaterRepellent を解決する
         *
         * @param id ID 値
         * @return WaterRepellent (null: id 値不正)
         */
        public static WaterRepellent valueOf(Integer id) {
            return idMap.get(id);
        }
    }

    /**
     * 別加工: その他
     *
     * sfr_sf_product.other_method1, sfr_sf_product.other_method2
     */
    public enum ProcessOtherMethod {
        /** 地刷り */
        JIZURI(1, "地刷り"),
        /** コダマシキ外注 */
        OUTSOURCING_KODAMA(2, "コダマシキ外注"),
        /** コダマシキ打抜き */
        DIE_CUTTING_KODAMA(3, "コダマシキ打抜き"),
        /** 変形フラップ */
        FLAP_MODIFICATION(4, "変形フラップ"),
        /** 二分切り仕切 */
        NIBUNGIRI_SHIKIRI(5, "二分切り仕切"),
        /** 仕切組立 */
        SHIKIRI_KUMITATE(6, "仕切組立"),
        /** ジョイントカット上 */
        JOINT_CUT_UP(7, "ジョイントカット上"),
        /** ジョイントカット下 */
        JOINT_CUT_DOWN(8, "ジョイントカット下"),
        /** ジョイントカット上下 */
        JOINT_CUT_UP_DOWN(9, "ジョイントカット上下"),
        /** 佐賀工場通函 */
        SHIPPING_CARTON_SAGA(10, "佐賀工場通函"),
        /** 多久工場通函 */
        SHIPPING_CARTON_TAKU(11, "多久工場通函");


        /** ID 値 (sfr_sf_product.other_method1, sfr_sf_product.other_method2) */
        private final int id;
        /** 画面表示名 */
        private final String displayName;

        /** ID → enum 変換表 */
        private static final Map<Integer, ProcessOtherMethod> idMap
            = CollectionUtil.toUnmodifiableMap(values(), ProcessOtherMethod::getId);

        /**
         * コンストラクタ
         *
         * @param id ID 値
         * @param displayName 画面表示名
         */
        ProcessOtherMethod(int id, String displayName) {
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
         * id を元に ProcessOtherMethod を解決する
         *
         * @param id ID 値
         * @return ProcessOtherMethod (null: id 値不正)
         */
        public static ProcessOtherMethod valueOf(Integer id) {
            return idMap.get(id);
        }
    }

    /**
     * 見積書の単位
     *
     * sfr_sf_quotation_item.product_type
     */
    public enum QuotationItemUnit {
        /* 1: 個 */
        KO(1, "個"),
        /* 2: 部 */
        BU(2, "部"),
        /* 3: 枚 */
        MAI(3, "枚"),
        /* 4: 式 */
        SHIKI(4, "式"),
        /* 5: セット */
        SET(5, "セット");

        /** ID 値 (sfr_sf_quotation_item.product_type) */
        private final int id;
        /** 画面表示名 */
        @Nonnull
        private final String displayName;

        /** ID → enum 変換表 */
        private static final Map<Integer, QuotationItemUnit> idMap
            = CollectionUtil.toUnmodifiableMap(values(), QuotationItemUnit::getId);

        /**
         * コンストラクタ
         *
         * @param id ID 値
         * @param displayName 画面表示名
         */
        QuotationItemUnit(int id, @Nonnull String displayName) {
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
        public @Nonnull String getDiaplayName() {
            return displayName;
        }

        /**
         * id を元に QuotationItemUnit を解決する
         *
         * @param id ID 値
         * @return QuotationItemUnit (null: id 値不正)
         */
        public static QuotationItemUnit valueOf(Integer id) {
            return idMap.get(id);
        }

    }

}
