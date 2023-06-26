package vn.vnext.sefuri.sf.json.SFN0504.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;

import java.math.BigDecimal;

public class StockJson {

    @JsonProperty("id")
    private int id;
    @JsonProperty("type")
    private int type;
    @JsonProperty("customerName")
    private String customerName;
    @JsonProperty("customerCode")
    private String customerCode;
    @JsonProperty("dealCode")
    private String dealCode;
    @JsonProperty("productCode")
    private String productCode;
    @JsonProperty("productName")
    private String productName;
    @JsonProperty("productType")
    private Integer productType;
    @JsonProperty("productShapeId")
    private Integer productShapeId;
    @JsonProperty("cartonShippingType")
    private Integer cartonShippingType;
    @JsonProperty("quantity")
    private int quantity;
    @JsonProperty("unitPrice")
    private BigDecimal unitPrice;
    @JsonProperty("total")
    private BigDecimal total;
    @JsonProperty("manufactureDate")
    private DateTime manufactureDate;
    @JsonProperty("storageDays")
    private int storageDays;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
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

    public Integer getProductType() {
        return productType;
    }

    public void setProductType(Integer productType) {
        this.productType = productType;
    }

    public Integer getProductShapeId() {
        return productShapeId;
    }

    public void setProductShapeId(Integer productShapeId) {
        this.productShapeId = productShapeId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public DateTime getManufactureDate() {
        return manufactureDate;
    }

    public void setManufactureDate(DateTime manufactureDate) {
        this.manufactureDate = manufactureDate;
    }

    public int getStorageDays() {
        return storageDays;
    }

    public void setStorageDays(int storageDays) {
        this.storageDays = storageDays;
    }

    public Integer getCartonShippingType() {
        return cartonShippingType;
    }

    public void setCartonShippingType(Integer cartonShippingType) {
        this.cartonShippingType = cartonShippingType;
    }
}
