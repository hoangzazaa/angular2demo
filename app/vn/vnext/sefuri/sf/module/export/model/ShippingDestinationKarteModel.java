package vn.vnext.sefuri.sf.module.export.model;

import java.time.LocalDate;
import java.time.chrono.JapaneseDate;
import java.time.chrono.JapaneseEra;
import java.time.temporal.ChronoField;
import java.util.Objects;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;

import vn.vnext.sefuri.sf.common.enums.ExtraMethodKubun;
import vn.vnext.sefuri.sf.common.enums.LiftUserInUnloading;
import vn.vnext.sefuri.sf.common.enums.LimitQuantity;
import vn.vnext.sefuri.sf.common.enums.SpecifyVehicle;
import vn.vnext.sefuri.sf.common.enums.UpstairsDetail;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.ShippingDestinationDto;
import vn.vnext.sefuri.sf.dto.UserDto;

/**
 * 届け先カルテ PDF 出力用モデル
 *
 * <p>帳票出力用に届け先各項目を整形します。
 */
public class ShippingDestinationKarteModel {

    /** 得意先 */
    private final CustomerDto customer;
    /** 届け先詳細 */
    private final ShippingDestinationDto shippingDestination;
    /** 得意先営業担当 */
    private final UserDto picSales;
    /** 得意先業務担当 */
    private final UserDto picOperation;


    /**
     * コンストラクタ
     *
     * @param customer 得意先
     * @param shippingDestination 届け先
     */
    public ShippingDestinationKarteModel(
            @Nonnull CustomerDto customer,
            @Nonnull ShippingDestinationDto shippingDestination,
            UserDto picSales,
            UserDto picOperation) {
        this.customer = Objects.requireNonNull(customer);
        this.shippingDestination = Objects.requireNonNull(shippingDestination);
        this.picSales = picSales;
        this.picOperation = picOperation;
    }

    /**
     * @return 更新日 (元号+年+月)
     */
    public String getUpdatedEraYearMonth() {
        return getUpdatedEraName() + getUpdatedEraYear() + '年' + getUpdatedMonth() + '月';
    }

    /**
     * @return 更新日 (元号)
     */
    public String getUpdatedEraName() {
        LocalDate localDate = toLocalDate(shippingDestination.getUpdatedDate());
        if (localDate == null) {
            return "";
        }

        // 和暦に変換
        JapaneseEra era = JapaneseDate.from(localDate).getEra();
        if (era.getValue() == JapaneseEra.HEISEI.getValue()) {
            return "平成";
        } else {
            return ""; // TODO: 新元号が決まったら変更してください。
        }
    }

    /**
     * @return 更新日 (年)
     */
    public String getUpdatedEraYear() {
        LocalDate localDate = toLocalDate(shippingDestination.getUpdatedDate());
        if (localDate == null) {
            return "";
        }

        // 和暦に変換
        JapaneseDate date = JapaneseDate.from(localDate);
        return Integer.toString(date.get(ChronoField.YEAR_OF_ERA));
    }


    /**
     * @return 更新日 (月)
     */
    public String getUpdatedMonth() {
        // 月は和暦と西暦で変わらない
        LocalDate localDate = toLocalDate(shippingDestination.getUpdatedDate());
        return localDate != null ? Integer.toString(localDate.getMonthValue()) : "";
    }

    /**
     * joda datetime を LocalDate に変換する
     *
     * @oaram datetime 日時
     * @return LocalDate (null: datetime が null)
     */
    private static LocalDate toLocalDate(org.joda.time.DateTime datetime) {
        return datetime != null
                ? LocalDate.of(datetime.getYear(), datetime.getMonthOfYear(), datetime.getDayOfMonth()) : null;
    }

    /**
     * @return 営業担当
     */
    public String getSalesPicName() {
        if (picSales != null) {
            return picSales.getUsername();
        } else {
            return null;
        }
    }

    /**
     * @return 業務担当
     */
    public String getOperationPicName() {
        if (picOperation != null) {
            return picOperation.getUsername();
        } else {
            return null;
        }
    }

    /**
     * @return 得意先コード (DFW_M30M.取引先C)  帳票出力では使用せず
     */
    public String getCustomerCode() {
        return customer.getCustomerCode();
    }

    /**
     * @return 得意先名 (DFW_M30M.取引先名1)  帳票出力では使用せず
     */
    public String getCustomerName() {
        return customer.getName();
    }

    /**
     * @return 届け先コード (帳票上では得意先コード)
     */
    public String getShippingDestinationCode() {
        return shippingDestination.getDennoPartnerCode();
    }

    /**
     * @return 届け先名 (帳票上では得意先名)
     */
    public String getShippingDestinationName() {
        return shippingDestination.getDeliveryName();
    }

    /**
     * @return 届け先住所 (帳票上では得意先住所)
     */
    public String getAddress() {
        return StringUtils.trimToNull(StringUtils.join(
                shippingDestination.getDeliveryAddress1(),
                shippingDestination.getDeliveryAddress2()));
    }

    /**
     * @return TEL
     */
    public String getTel() {
        String tel = shippingDestination.getTel();
        if (tel == null) {
            return null;
        }

        String extension = StringUtils.trimToNull(shippingDestination.getExtension());
        return extension == null ? tel : tel + " (" + extension + ')';
    }

    /**
     * @return FAX
     */
    public String getFax() {
        return shippingDestination.getFax();
    }

    /**
     * @return 専用伝票表示文字列
     */
    public String getExtraMethod() {
        ExtraMethodKubun extraMethod = ExtraMethodKubun.of(shippingDestination.getExtraMethod());
        if (extraMethod == null) {
            return null;          // 空欄
        } else if (extraMethod == ExtraMethodKubun.SPECIAL || extraMethod == ExtraMethodKubun.BOTH) {
            return "有";         // 専用伝票あり or 両方添付
        } else {
            return "無";         // 出荷案内書 or 添付なし
        }
    }

    /**
     * @return 路線会社指定
     */
    public String getDeliveryCompany() {
        return StringUtils.defaultIfEmpty(shippingDestination.getDeliveryCompany(), "無");
    }

    /**
     * @return 配送車両指定
     */
    public String getSpecifyVehicle() {
        SpecifyVehicle specifyVehcle = SpecifyVehicle.valueOf(shippingDestination.getSpecifyVehicle());
        if (specifyVehcle == null) {
            return null;          // 空欄
        }

        String result = specifyVehcle.getDiaplayName();
        if (specifyVehcle == SpecifyVehicle.OTHERS) {
            // その他の場合 ... その他欄の記入内容を付加する
            String specifyVehcleOthers = StringUtils.trimToNull(shippingDestination.getSpecifyVehicleOthers());
            if (specifyVehcleOthers != null) {
                result += '(' + specifyVehcleOthers + ')';
            }
        }
        return result;
    }

    /**
     * @return 納品時間
     */
    public String getDeliveryTime() {
        return shippingDestination.getDeliveryTime();
    }

    /**
     * @return 納品前TEL
     */
    public String getTelBeforeDelivery() {
        return toDisplayString(shippingDestination.getTelBeforeDelivery(), "要", "不要");
    }

    /**
     * @return エボ添付
     */
    public String getAttachmentEbo() {
        return toDisplayString(shippingDestination.getAttachmentEbo(), "要", "不要");
    }

    /**
     * @return 天候不良時納品
     */
    public String getDeliveryInCaseOfBadWeather() {
        return toDisplayString(shippingDestination.getDeliveryInCaseOfBadWeather(), "可", "不可");
    }

    /**
     * @return ストレッチフィルム巻き
     */
    public String getStretchFilm() {
        return toDisplayString(shippingDestination.getStretchFilm(), "有", "無");
    }

    /**
     * @return 2F上げ
     */
    public String getUpstairs() {
        if (shippingDestination.getUpstairs() == null) {
            return null;          // 未記入
        } else if (shippingDestination.getUpstairs() == true) {
            // 有の場合
            UpstairsDetail detail = UpstairsDetail.valueOf(shippingDestination.getUpstairsDetail());
            if (detail != null) {
                StringBuilder str = new StringBuilder();
                str.append("有 ").append(detail.getDiaplayName());

                if (detail == UpstairsDetail.OTHERS) {
                    // 2F上げ = その他の場合 ... その他欄の記入内容を付加する
                    String others = StringUtils.trimToNull(shippingDestination.getUpstairsDetailOthers());
                    if (others != null) {
                        str.append('(').append(others).append(')');
                    }
                }
                return str.toString();
            } else {
                return "有";
            }
        } else {
            // 無の場合
            return "無";
        }
    }

    /**
     * @return パレット納品
     */
    public String getPaletteDelivery() {
        return toDisplayString(shippingDestination.getPaletteDelivery(), "有", "無");
    }

    /**
     * @return パレット引取
     */
    public String getPaletteTakeBack() {
        return toDisplayString(shippingDestination.getPaletteTakeBack(), "有", "無");
    }

    /**
     * @return 出荷数量制限
     */
    public String getLimitQuantity() {
        LimitQuantity limitQuantity = LimitQuantity.valueOf(shippingDestination.getLimitQuantity());
        return limitQuantity != null ? limitQuantity.getDiaplayName() : null;
    }

    /**
     * @return 降ろし場所指定
     */
    public String getUnloadingPlace() {
        return shippingDestination.getUnloadingPlace();
    }

    /**
     * @return 車両停車位置
     */
    public String getParkingPlace() {
        return shippingDestination.getParkingPlace();
    }

    /**
     * return 荷降ろし時のリフト使用者
     */
    public String getLiftUserInUnloading() {
        LiftUserInUnloading liftUserInUnloading = LiftUserInUnloading.valueOf(shippingDestination.getLiftUserInUnloading());
        return liftUserInUnloading != null ? liftUserInUnloading.getDiaplayName() : null;
    }

    /**
     * @return 荷降ろし形態
     */
    public String getUnloadForm() {
        return shippingDestination.getUnloadForm();
    }

    /**
     * @return その他注意事項
     */
    public String getAttention() {
        StringBuilder text = new StringBuilder();
        String remarksForShipping = StringUtils.defaultString(customer.getRemarksForShipping());
        String attention = StringUtils.defaultString(shippingDestination.getAttention());


        // 得意先の備考(出荷部門向けカルテ)
        text.append(remarksForShipping);
        if (remarksForShipping.length() > 0 && !remarksForShipping.endsWith("\n")) {
            text.append('\n');
        }

        // 区切り
        if (remarksForShipping.length() > 0 && attention.length() > 0) {
            text.append('\n');
        }

        // その他注意事項
        text.append(attention);

        return StringUtils.defaultIfEmpty(text.toString(), null);
    }

    /**
     * 添付画像が存在するかどうか
     */
    public boolean isHavingAttachmentImages() {
        return !shippingDestination.getImageList().isEmpty();
    }


    /**
     * Boolean 項目を文字列に変換する
     *
     * @param value Boolean 値
     * @param ifTrue true 時の表示文字列
     * @param ifFalse false 時の表示文字列
     * @return 表示文字列
     */
    private static String toDisplayString(Boolean value, String ifTrue, String ifFalse) {
        if (value == null) {
            return null;
        } else {
            return value ? ifTrue : ifFalse;
        }
    }
}
