package vn.vnext.sefuri.sf.procedure.dto;

import java.math.BigDecimal;

/**
 * Created by Teddy on 7/21/2017.
 */
public class SFN040201Dto {
    private int type;
    private int month;
    private BigDecimal amount;

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}