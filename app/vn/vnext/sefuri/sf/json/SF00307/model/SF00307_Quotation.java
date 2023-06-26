package vn.vnext.sefuri.sf.json.SF00307.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;

import java.math.BigDecimal;

public class SF00307_Quotation {

    @JsonProperty("id")
    protected Integer id;

    @JsonProperty("updatedDate")
    protected DateTime updatedDate;

    @JsonProperty("quotationCode")
    protected String quotationCode;

    @JsonProperty("dealId")
    private Integer dealId;

    @JsonProperty("subject")
    private String subject;

    @JsonProperty("lot")
    private Integer lot;

    @JsonProperty("unitPrice")
    private BigDecimal unitPrice;

    @JsonProperty("totalCost")
    private BigDecimal totalCost;

    @JsonProperty("interestRate")
    private BigDecimal interestRate;

    @JsonProperty("memo")
    private String memo;

    public Integer getId() {
        return id;
    }

    public DateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(DateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getQuotationCode() {
        return quotationCode;
    }

    public void setQuotationCode(String quotationCode) {
        this.quotationCode = quotationCode;
    }

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(Integer dealId) {
        this.dealId = dealId;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Integer getLot() {
        return lot;
    }

    public void setLot(Integer lot) {
        this.lot = lot;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }

    public BigDecimal getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }
}
