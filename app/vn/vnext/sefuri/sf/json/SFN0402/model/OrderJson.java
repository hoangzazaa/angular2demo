package vn.vnext.sefuri.sf.json.SFN0402.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class OrderJson {

    @JsonProperty("product")
    private ProductJson product;
    @JsonProperty("quantity")
    private int quantity;
    @JsonProperty("unitPrice")
    private BigDecimal unitPrice;
    @JsonProperty("total")
    private BigDecimal total;

    public ProductJson getProduct() {
        return product;
    }

    public void setProduct(ProductJson product) {
        this.product = product;
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
}
