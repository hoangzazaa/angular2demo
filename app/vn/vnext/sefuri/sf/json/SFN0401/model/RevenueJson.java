package vn.vnext.sefuri.sf.json.SFN0401.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;

import java.math.BigDecimal;

public class RevenueJson {

    @JsonProperty("salesDate")
    private DateTime salesDate;
    @JsonProperty("product")
    private ProductJson product;
    @JsonProperty("quantity")
    private BigDecimal quantity;
    @JsonProperty("unitPrice")
    private BigDecimal unitPrice;
    @JsonProperty("total")
    private BigDecimal total;

    public DateTime getSalesDate() {
        return salesDate;
    }

    public void setSalesDate(DateTime salesDate) {
        this.salesDate = salesDate;
    }

    public ProductJson getProduct() {
        return product;
    }

    public void setProduct(ProductJson product) {
        this.product = product;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
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
}
