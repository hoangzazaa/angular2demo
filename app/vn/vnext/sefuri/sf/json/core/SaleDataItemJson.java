package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

/**
 * Created by DungTQ on 2/14/2017.
 *
 */
public class SaleDataItemJson {

    @JsonProperty("month")
    private Integer month;

    @JsonProperty("productType")
    private Integer productType;

    @JsonProperty("totalMoney")
    private BigDecimal totalMoney;

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getProductType() {
        return productType;
    }

    public void setProductType(Integer productType) {
        this.productType = productType;
    }

    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }


}
