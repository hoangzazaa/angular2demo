package vn.vnext.sefuri.sf.dto;

import java.math.BigDecimal;

/**
 * Created by DungTQ on 2/14/2017.
 */
public class SalerDataDto {
    private Integer year;
    private Integer month;
    private Integer productType;
    private BigDecimal totalMoney;

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

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
