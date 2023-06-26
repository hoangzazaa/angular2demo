package vn.vnext.sefuri.sf.module.export.model;

import java.util.Objects;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.common.enums.BillingMethodKubun;
import vn.vnext.sefuri.sf.dto.CustomerDto;

/**
 * 得意先カルテ PDF 出力用モデル
 *
 */
public class CustomerKarteModel {

    /** 得意先 */
    private final CustomerDto customer;

    /**
     * コンストラクタ
     *
     * @param customer 得意先
     */
    public CustomerKarteModel(@Nonnull CustomerDto customer) {
        this.customer = Objects.requireNonNull(customer);
    }

    /**
     * @return 得意先 ID (SF 上の ID)
     */
    public int getId() {
        return customer.getId();
    }

    /**
     * @return 得意先コード (DFW_M30M.取引先C)
     */
    public String getCustomerCode() {
        return customer.getCustomerCode();
    }

    /**
     * @return 得意先名 (DFW_M30M.取引先名1)
     */
    public String getName() {
        return customer.getName();
    }

    /**
     * @return 略称 (DFW_M30M.略称漢字)
     */
    public String getAbbreviation() {
        return customer.getAbbreviation();
    }

    /**
     * @return ふりがな (DFW_M30M.フリガナ)
     */
    public String getFurigana() {
        return customer.getFurigana();
    }

    /**
     * @return 略称ふりがな (DFW_M30M.略称カナ)
     */
    public String getAbbrFurigana() {
        return customer.getAbbrFurigana();
    }


    public String getSalerName() {
        return customer.getSalerName();
    }

    /**
     * HP 経由 (DFW_M30M.暑中見舞)
     *
     * @return HP 経由かどうか true: HP 経由, false: HP 経由ではない or null
     */
    public boolean isHpInfo() {
        return Integer.valueOf(1).equals(customer.getHpInfo());
    }

    /**
     * HP 経由 (DFW_M30M.暑中見舞) 表示文字列
     *
     * @return HP 経由表示文字列
     */
    public String getHpInfoDisplayName() {
        int hpInfo = customer.getHpInfo() != null ? customer.getHpInfo() : -1;
        if (hpInfo == 1) {
            return "はい";
        } else if (hpInfo == 0) {
            return "いいえ";
        } else {
            return "";
        }
    }

    /**
     * @return 客先代表者名 (DFW_M30M.客先代表者名)
     */
    public String getCustomerRep() {
        return customer.getCustomerRep();
    }

    /**
     * @return 客先担当者名 (DFW_M30M.客先担当者名)
     */
    public String getCustomerContact() {
        return customer.getCustomerContact();
    }

    /**
     * @return 取引開始年度
     */
    public Integer getStartYear() {
        return customer.getStartYear();
    }

    /**
     * @return 請求方法区分値
     */
    public String getBillingMethod() {
        return customer.getBillingMethod();
    }

    /**
     * @return 請求方法区分表示文字列
     */
    public String getBillingMethodDisplayName() {
        BillingMethodKubun kubun = BillingMethodKubun.of(customer.getBillingMethod());
        return kubun != null ? kubun.getDiaplayName() : "";
    }

    /**
     * @return 備考 (営業カルテ)
     */
    public String getMemo() {
        return customer.getMemo();
    }

    /**
     * @return 備考 (出荷部門用カルテ)
     */
    public String getRemarksForShipping() {
        return customer.getRemarksForShipping();
    }
}
