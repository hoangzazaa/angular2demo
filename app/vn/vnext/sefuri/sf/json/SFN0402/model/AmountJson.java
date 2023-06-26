package vn.vnext.sefuri.sf.json.SFN0402.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

/**
 * Created by Teddy on 7/30/2017.
 */
public class AmountJson {

    @JsonProperty("month")
    private int month;
    @JsonProperty("value")
    private BigDecimal value;

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }
}
