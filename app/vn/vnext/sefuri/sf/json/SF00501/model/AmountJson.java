package vn.vnext.sefuri.sf.json.SF00501.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class AmountJson {

    @JsonProperty("date")
    private int date;

    @JsonProperty("productType")
    private int productType;

    @JsonProperty("value")
    private BigDecimal value;

    public int getDate() {
        return date;
    }

    public void setDate(int date) {
        this.date = date;
    }

    public int getProductType() {
        return productType;
    }

    public void setProductType(int productType) {
        this.productType = productType;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }
}
