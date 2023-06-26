package vn.vnext.sefuri.sf.dto.dao;


import java.math.BigDecimal;

/**
 * Created by nguyenpk on 06/06/2017.
 */
public class ProductInfoDto1 {
    Integer productType;

    Integer numberOfOrder;

    Integer unitPrice;

    BigDecimal amountOfMoney;

    public Integer getProductType() {
        return productType;
    }

    public void setProductType(Integer productType) {
        this.productType = productType;
    }

    public Integer getNumberOfOrder() {
        return numberOfOrder;
    }

    public void setNumberOfOrder(Integer numberOfOrder) {
        this.numberOfOrder = numberOfOrder;
    }

    public Integer getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Integer unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getAmountOfMoney() {
        return amountOfMoney;
    }

    public void setAmountOfMoney(BigDecimal amountOfMoney) {
        this.amountOfMoney = amountOfMoney;
    }
}
