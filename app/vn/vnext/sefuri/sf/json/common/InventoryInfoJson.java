package vn.vnext.sefuri.sf.json.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.DealDto;

import javax.persistence.criteria.CriteriaBuilder;
import java.math.BigDecimal;

/**
 * Created by manhnv on 4/11/2017.
 */
public abstract class InventoryInfoJson {
    /* 製品名 */
    @JsonProperty("productName")
    protected String productName;

    /*Quantity Stock*/
    @JsonProperty("quantity")
    protected Integer quantity;

    //estimatedUnitPrice
    @JsonProperty("unitPrice")
    protected BigDecimal unitPrice;

    /*日数*/
    @JsonProperty("days")
    protected Integer days;

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
    }
}
