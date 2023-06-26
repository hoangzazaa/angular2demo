package vn.vnext.sefuri.sf.json.SF00307.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class SF00307_ShippingInstruction {
    @JsonProperty("productId")
    protected Integer productId;

    @JsonProperty("productCode")
    protected String productCode;

    @JsonProperty("productName")
    protected String productName;

    @JsonProperty("loadingAddressId")
    protected Integer loadingAddressId;

    @JsonProperty("quantity")
    protected Integer quantity;

    @JsonProperty("submittedPrice")
    protected BigDecimal submittedPrice;

    @JsonProperty("shipDate")
    protected String shipDate;

    @JsonProperty("shippingCompanyId")
    protected Integer shippingCompanyId;

    @JsonProperty("shipTime")
    protected Integer shipTime;

    @JsonProperty("limitQuantity")
    protected Integer limitQuantity;

    @JsonProperty("memo")
    protected String memo;

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(final Integer productId) {
        this.productId = productId;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getLoadingAddressId() {
        return loadingAddressId;
    }

    public void setLoadingAddressId(Integer loadingAddressId) {
        this.loadingAddressId = loadingAddressId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getSubmittedPrice() {
        return submittedPrice;
    }

    public void setSubmittedPrice(BigDecimal submittedPrice) {
        this.submittedPrice = submittedPrice;
    }

    public String getShipDate() {
        return shipDate;
    }

    public void setShipDate(String shipDate) {
        this.shipDate = shipDate;
    }

    public Integer getShippingCompanyId() {
        return shippingCompanyId;
    }

    public void setShippingCompanyId(Integer shippingCompanyId) {
        this.shippingCompanyId = shippingCompanyId;
    }

    public Integer getShipTime() {
        return shipTime;
    }

    public void setShipTime(Integer shipTime) {
        this.shipTime = shipTime;
    }

    public Integer getLimitQuantity() {
        return limitQuantity;
    }

    public void setLimitQuantity(Integer limitQuantity) {
        this.limitQuantity = limitQuantity;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }
}
