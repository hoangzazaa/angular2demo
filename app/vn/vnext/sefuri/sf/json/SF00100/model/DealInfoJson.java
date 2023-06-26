package vn.vnext.sefuri.sf.json.SF00100.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class DealInfoJson {

    @JsonProperty("invoiceDate")
    private String invoiceDate;

    @JsonProperty("dealCode")
    private String dealCode;

    @JsonProperty("dealName")
    private String dealName;

    @JsonProperty("productType")
    private Integer productType;

    @JsonProperty("shapeId")
    private Integer shapeId;

    @JsonProperty("numberOfOrder")
    private BigDecimal numberOfOrder;

    @JsonProperty("unitPrice")
    private BigDecimal unitPrice;

    @JsonProperty("amountOfMoney")
    private BigDecimal amountOfMoney;

    public Integer getShapeId() {
        return shapeId;
    }

    public void setShapeId(Integer shapeId) {
        this.shapeId = shapeId;
    }

    public String getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(String invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }

    public String getDealName() {
        return dealName;
    }

    public void setDealName(String dealName) {
        this.dealName = dealName;
    }

    public Integer getProductType() {
        return productType;
    }

    public void setProductType(Integer productType) {
        this.productType = productType;
    }

    public BigDecimal getNumberOfOrder() {
        return numberOfOrder;
    }

    public void setNumberOfOrder(BigDecimal numberOfOrder) {
        this.numberOfOrder = numberOfOrder;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getAmountOfMoney() {
        return amountOfMoney;
    }

    public void setAmountOfMoney(BigDecimal amountOfMoney) {
        this.amountOfMoney = amountOfMoney;
    }
}
