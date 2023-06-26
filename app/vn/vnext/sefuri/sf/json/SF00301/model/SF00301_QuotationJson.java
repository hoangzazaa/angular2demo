package vn.vnext.sefuri.sf.json.SF00301.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.QuotationDto;
import vn.vnext.sefuri.sf.json.common.BaseJson;

import java.math.BigDecimal;

/**
 * Contain information about quotations of deals
 *
 * @author vupt
 */
public class SF00301_QuotationJson extends BaseJson<QuotationDto> {
    //dealId
    @JsonProperty("dealId")
    private Integer dealId;

    //quotationCode
    @JsonProperty("quotationCode")
    private String quotationCode;

    //subject
    @JsonProperty("subject")
    private String subject;

    //lot
    @JsonProperty("lot")
    private Integer lot; //this.dto.quotationItems[0].dealProduct.offers[0].productOutput.lot; //FIXME - will be
    // calculate

    //submittedUnitPrice
    @JsonProperty("unitPrice")
    private BigDecimal unitPrice; //this.dto..quotationItems[0].dealProduct.offers[0].unitPrice; //FIXME - will be
    // calculate

    //提出金額合計 / 合計（税込）
    @JsonProperty("totalCost")
    private BigDecimal totalCost; //this.dto.quotationItems[0].dealProduct.offers[0].total; //FIXME - will be calculate

    //利益率
    @JsonProperty("interestRate")
    private BigDecimal interestRate;

    //見積メモ
    @JsonProperty("memo")
    private String memo;

    /* image file path */
    @JsonProperty("srcImg")
    private String srcImg; //FIXME - will be calculate

    @JsonProperty("highlightFlag")
    private Integer highlightFlag;

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(final Integer dealId) {
        this.dealId = dealId;
    }

    public String getQuotationCode() {
        return quotationCode;
    }

    public void setQuotationCode(final String quotationCode) {
        this.quotationCode = quotationCode;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(final String subject) {
        this.subject = subject;
    }

    public Integer getLot() {
        return lot;
    }

    public void setLot(final Integer lot) {
        this.lot = lot;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(final BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(final BigDecimal totalCost) {
        this.totalCost = totalCost;
    }

    public BigDecimal getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(final BigDecimal interestRate) {
        this.interestRate = interestRate;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(final String memo) {
        this.memo = memo;
    }

    public String getSrcImg() {
        return srcImg;
    }

    public void setSrcImg(final String srcImg) {
        this.srcImg = srcImg;
    }

    @Override
    public QuotationDto getModel() {
        return null;
    }

    public Integer getHighlightFlag() {
        return highlightFlag;
    }

    public void setHighlightFlag(Integer highlightFlag) {
        this.highlightFlag = highlightFlag;
    }

    @Override
    public void setModel(final QuotationDto dto) {
        if (dto != null) {
            setData(dto);

            this.dealId = dto.getDealId();
            this.quotationCode = dto.getQuotationCode();
            this.subject = dto.getSubject();
            this.interestRate = dto.getInterestRate();
            this.memo = dto.getMemo();
            this.highlightFlag = dto.getHighlightFlag();
        }
    }
}
