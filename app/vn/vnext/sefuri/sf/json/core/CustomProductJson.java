package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

/**
 * Created by TungNT on 2/9/2017.
 */
public class CustomProductJson {
    @JsonProperty("year")
    private Integer year;
    @JsonProperty("month")
    private Integer month;
    @JsonProperty("productType")
    private Integer productType;
    @JsonProperty("totalMoney")
    private BigDecimal totalMoney;
    @JsonProperty("userId")
    private Integer userId;
    @JsonProperty("userName")
    private String userName;

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

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
