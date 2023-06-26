package vn.vnext.sefuri.sf.module.export.model;

import java.math.BigDecimal;
import java.text.DecimalFormat;

import org.apache.commons.lang3.StringUtils;

import vn.vnext.sefuri.sf.common.Enums.QuotationItemUnit;
import vn.vnext.sefuri.sf.dto.QuotationItemDto;

/**
 * Created by VuPT on 11/10/2016.
 */
public class QuotationItemModel {
    Integer no;

    String name;

    String description;

    BigDecimal quantity;

    BigDecimal total;

    Integer productType;

    BigDecimal submittedPrice;

    String productTypeName;

    public QuotationItemModel(QuotationItemDto dto) {
        this.no = dto.getNo();
        this.description = dto.getDescription();
        this.name = dto.getName();
        this.quantity = dto.getQuantity();
        this.total = dto.getTotal();
        this.productType = dto.getProductType();
        this.submittedPrice = dto.getSubmittedPrice();
        this.productTypeName = dto.getProductTypeName();
    }

    public String getProductTypeName() {
        return productTypeName;
    }

    public void setProductTypeName(String productTypeName) {
        this.productTypeName = productTypeName;
    }

    public Integer getNo() {
        return no;
    }

    public void setNo(Integer no) {
        this.no = no;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Integer getProductType() {
        return productType;
    }

    public void setProductType(Integer productType) {
        this.productType = productType;
    }

    public BigDecimal getSubmittedPrice() {
        return submittedPrice;
    }

    public void setSubmittedPrice(BigDecimal submittedPrice) {
        this.submittedPrice = submittedPrice;
    }

    /**
     * 品名の帳票出力形式
     *
     * <pre>
     * $F{name} == null ? "" : ($F{productType} == null ? ( $F{name} ) : $F{name})
     * </pre>
     * @return 品名の帳票出力形式
     */
    public String getReportProductName() {
        return StringUtils.defaultString(name);
    }

    /**
     * 仕様の帳票出力形式
     *
     * <pre>
     * $F{description} == null ? "" : $F{description}
     * </pre>
     * @return 仕様の帳票出力形式
     */
    public String getReportDescription() {
        return StringUtils.defaultString(description);
    }

    /**
     * 数量の帳票出力形式
     *
     * <pre>
     * $F{name} !="" ? ($F{description} !="" ? (( $F{quantity} == null ? "" : $F{quantity}.compareTo(new BigDecimal("999")) == 1 ?    new DecimalFormat("#,000").format($F{quantity}) : new DecimalFormat("#0").format($F{quantity})) ) : ""): ""
     * </pre>
     * @return 数量の帳票出力形式
     */
    public String getReportQuantity() {
        if (quantity == null || quantity.equals(BigDecimal.ZERO)) {
            return "";
        } else if (StringUtils.isEmpty(getReportUnit())) {
            // 単位なしの場合は空欄
            return "";
        } else {
            return formatNumber(quantity, "");
        }
    }

    /**
     * 単位の帳票出力形式
     *
     * <pre>
     * $F{name} !="" ? ( ($F{description} !="" && $F{description} !=null) ?
($F{productType} == null ? ($F{productTypeName} == null? "":$F{productTypeName}) : ($F{productType} == 1 ? "個" : ( $F{productType} == 2 ? " 部" : ( $F{productType} == 3 ?
"枚" :  ( $F{productType} == 4 ?
"式" :  ( $F{productType} == 5 ?
"セット": "" )))))
) : ""): ""
     * </pre>
     * @return 単位の帳票出力形式
     */
    public String getReportUnit() {
        if (quantity == null || quantity.equals(BigDecimal.ZERO)) {
            // 品名 or 仕様が空欄
            return "";
        } else if (productType == null) {
            // 任意入力時
            return StringUtils.defaultString(productTypeName);
        } else {
            // 既定の単位の場合
            QuotationItemUnit unit = QuotationItemUnit.valueOf(productType);
            return unit != null ? unit.getDiaplayName() : "";
        }
    }

    /**
     * 単価の帳票出力形式
     *
     * <pre>
     * $F{name} !="" ? ($F{description} !="" ? ($F{submittedPrice} == null ? "" : ($F{submittedPrice}.compareTo(new BigDecimal("999")) == 1 ? new DecimalFormat("#,000.00").format($F{submittedPrice}) :  new DecimalFormat("#0.00").format($F{submittedPrice}))): ""): ""
     * </pre>
     * @return 単価の帳票出力形式
     */
    public String getReportSubmittedPrice() {
        if (quantity == null || quantity.equals(BigDecimal.ZERO)) {
            // 品名 or 仕様が空欄
            return "";
        } else if (StringUtils.isEmpty(getReportUnit())) {
            // 単位なしの場合は空欄
            return "";
        } else {
            return formatDecimalPointNumber(submittedPrice, "");
        }
    }

    /**
     * 金額の帳票出力形式
     *
     * <pre>
     * ($F{no} == null && $F{submittedPrice} == null && $F{quantity} == null )? "" : ($F{total} == null? "0円" : ($F{no} == null ? (($F{submittedPrice} == null || $F{quantity} == null ) ? "" : ($F{submittedPrice}.multiply($F{quantity}).compareTo(new BigDecimal("999") ) == 1 ? new DecimalFormat("#,000").format($F{submittedPrice}.multiply($F{quantity}))  + "円": new DecimalFormat("#0").format($F{submittedPrice}.multiply($F{quantity})) + "円")):$F{total}.compareTo(new BigDecimal("999") ) == 1? new DecimalFormat("#,000").format($F{total})  + "円" :new DecimalFormat("#0").format($F{total})  + "円"))
     * </pre>
     * @return 金額の帳票出力形式
     */
    public String getReportTotal() {
        if (no == null && submittedPrice == null && quantity == null) {
            return "";
        } else if (quantity == null || quantity.equals(BigDecimal.ZERO)) {
            return "";
        } else if (StringUtils.isEmpty(getReportUnit())) {
            // 単位なしの場合は空欄
            return "";
        } else if (total == null) {
            return "0円";
        } else if (no != null) {
            return formatNumber(total, "円");
        } else if (submittedPrice != null && quantity != null) {
            return formatNumber(submittedPrice.multiply(quantity), "円");
        } else {
            return "";
        }
    }

    /**
     * 数値を帳票出力形式(3桁,区切り)に整形する
     *
     * @param number 数値
     * @param suffix 数値があるときに付加する文字列
     * @return 出力形式
     */
    private static String formatNumber(Number number, String suffix) {
        if (number == null) {
            return "";
        } else if (number.intValue() > 999) {
            return new DecimalFormat("#,000").format(number) + suffix;
        } else {
            return new DecimalFormat("#0").format(number) + suffix;
        }
    }

    /**
     * 数値を帳票出力形式(3桁,区切り、小数点第二位未満四捨五入)に整形する
     *
     * @param number 数値
     * @param suffix 数値があるときに付加する文字列
     * @return 出力形式
     */
    private static String formatDecimalPointNumber(Number number, String suffix) {
        if (number == null) {
            return "";
        } else if (number.intValue() > 999) {
            return new DecimalFormat("#,000.00").format(number) + suffix;
        } else {
            return new DecimalFormat("#0.00").format(number) + suffix;
        }
    }
}
