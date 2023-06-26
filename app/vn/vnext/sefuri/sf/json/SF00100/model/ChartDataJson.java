package vn.vnext.sefuri.sf.json.SF00100.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

/**
 * Created by DungTQ on 6/5/2017.
 */
public class ChartDataJson {
    @JsonProperty("goal")
    private BigDecimal goal;

    @JsonProperty("current")
    private BigDecimal current;

    public BigDecimal getGoal() {
        return goal;
    }

    public void setGoal(BigDecimal goal) {
        this.goal = goal;
    }

    public BigDecimal getCurrent() {
        return current;
    }

    public void setCurrent(BigDecimal current) {
        this.current = current;
    }
}
