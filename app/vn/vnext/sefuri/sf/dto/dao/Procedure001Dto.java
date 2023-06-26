package vn.vnext.sefuri.sf.dto.dao;

import java.math.BigDecimal;

public class Procedure001Dto {

    private int year;
    private int month;
    private int customerId;
    private BigDecimal revenue1;
    private BigDecimal revenue2;
    private BigDecimal revenue3;

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public BigDecimal getRevenue1() {
        return revenue1;
    }

    public void setRevenue1(BigDecimal revenue1) {
        this.revenue1 = revenue1;
    }

    public BigDecimal getRevenue2() {
        return revenue2;
    }

    public void setRevenue2(BigDecimal revenue2) {
        this.revenue2 = revenue2;
    }

    public BigDecimal getRevenue3() {
        return revenue3;
    }

    public void setRevenue3(BigDecimal revenue3) {
        this.revenue3 = revenue3;
    }
}
